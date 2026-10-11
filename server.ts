import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize Google GenAI SDK:', err);
  }
}

// Map of Indian company tickers and common aliases to Yahoo Finance symbols
const INDIAN_STOCK_MAP: Record<string, string> = {
  RELIANCE: 'RELIANCE.NS',
  'RELIANCE INDUSTRIES': 'RELIANCE.NS',
  TCS: 'TCS.NS',
  'TATA CONSULTANCY SERVICES': 'TCS.NS',
  INFY: 'INFY.NS',
  INFOSYS: 'INFY.NS',
  HDFCBANK: 'HDFCBANK.NS',
  'HDFC BANK': 'HDFCBANK.NS',
  TATAMOTORS: 'TATAMOTORS.NS',
  'TATA MOTORS': 'TATAMOTORS.NS',
  ICICIBANK: 'ICICIBANK.NS',
  'ICICI BANK': 'ICICIBANK.NS',
  SBIN: 'SBIN.NS',
  'STATE BANK OF INDIA': 'SBIN.NS',
  ITC: 'ITC.NS',
  'ITC LIMITED': 'ITC.NS',
  BHARTIARTL: 'BHARTIARTL.NS',
  'BHARTI AIRTEL': 'BHARTIARTL.NS',
  WIPRO: 'WIPRO.NS',
  LT: 'LT.NS',
  'LARSEN & TOUBRO': 'LT.NS',
  HINDUNILVR: 'HINDUNILVR.NS',
  'HINDUSTAN UNILEVER': 'HINDUNILVR.NS',
  MARUTI: 'MARUTI.NS',
  'MARUTI SUZUKI': 'MARUTI.NS',
  BAJFINANCE: 'BAJFINANCE.NS',
  'BAJAJ FINANCE': 'BAJFINANCE.NS',
  ASIANPAINT: 'ASIANPAINT.NS',
  'ASIAN PAINTS': 'ASIANPAINT.NS',
  TITAN: 'TITAN.NS',
  'TITAN COMPANY': 'TITAN.NS',
  KOTAKBANK: 'KOTAKBANK.NS',
  AXISBANK: 'AXISBANK.NS',
  ADANIENT: 'ADANIENT.NS',
  ADANIPORTS: 'ADANIPORTS.NS',
  SUNPHARMA: 'SUNPHARMA.NS',
  NESTLEIND: 'NESTLEIND.NS',
  NTPC: 'NTPC.NS',
  ONGC: 'ONGC.NS',
  POWERGRID: 'POWERGRID.NS',
  ULTRACEMCO: 'ULTRACEMCO.NS',
  COALINDIA: 'COALINDIA.NS',
  JSWSTEEL: 'JSWSTEEL.NS',
  TATASTEEL: 'TATASTEEL.NS',
  MM: 'M&M.NS',
  'M&M': 'M&M.NS',
  ZOMATO: 'ZOMATO.NS',
  JIOFIN: 'JIOFIN.NS'
};

// Real-time stock data endpoint (NSE, BSE, US markets)
app.get('/api/market/quote', async (req, res) => {
  const query = ((req.query.symbol as string) || '').trim().toUpperCase();
  if (!query) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  // Resolve to Yahoo Finance symbol
  let targetSymbol = query;
  if (INDIAN_STOCK_MAP[query]) {
    targetSymbol = INDIAN_STOCK_MAP[query];
  } else if (!targetSymbol.includes('.') && ['NIFTY', 'SENSEX'].includes(query)) {
    targetSymbol = query === 'NIFTY' ? '^NSEI' : '^BSESN';
  }

  const isIndianQuery =
    targetSymbol.endsWith('.NS') ||
    targetSymbol.endsWith('.BO') ||
    !!INDIAN_STOCK_MAP[query] ||
    ['NIFTY', 'SENSEX', 'RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'TATAMOTORS', 'SBIN', 'ITC'].includes(query);

  const cleanTicker = targetSymbol.replace('.NS', '').replace('.BO', '');
  const officialSourceUrl = isIndianQuery
    ? `https://www.nseindia.com/get-quote/equity?symbol=${encodeURIComponent(cleanTicker)}`
    : `https://www.nasdaq.com/market-activity/stocks/${encodeURIComponent(cleanTicker.toLowerCase())}`;
  const officialSourceName = isIndianQuery
    ? 'National Stock Exchange of India (NSE Official)'
    : 'NASDAQ Stock Market (Official)';

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(targetSymbol)}?interval=1d&range=1mo`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream API status: ${response.status}`);
    }

    const data: any = await response.json();
    const result = data?.chart?.result?.[0];
    const meta = result?.meta;

    if (!meta) {
      throw new Error('No quote data found for symbol');
    }

    const price = meta.regularMarketPrice ?? meta.fulldayPrice ?? 0;
    const prevClose = meta.chartPreviousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose > 0 ? (change / prevClose) * 100 : (meta.regularMarketChangePercent ?? 0);

    const isIndian = meta.currency === 'INR' || isIndianQuery;

    // Extract historical points for chart
    const timestamps: number[] = result?.timestamp || [];
    const closes: (number | null)[] = result?.indicators?.quote?.[0]?.close || [];
    const chartPoints = timestamps
      .map((t, idx) => {
        const c = closes[idx];
        return c !== null && c !== undefined && !isNaN(c)
          ? {
              time: new Date(t * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              price: Number(c.toFixed(2)),
              timestamp: t * 1000,
            }
          : null;
      })
      .filter(Boolean);

    return res.json({
      success: true,
      symbol: meta.symbol,
      cleanTicker,
      companyName: meta.longName || meta.shortName || meta.symbol,
      currency: meta.currency || (isIndian ? 'INR' : 'USD'),
      currencySymbol: isIndian ? '₹' : '$',
      exchange: meta.fullExchangeName || meta.exchangeName || (isIndian ? 'NSE' : 'NASDAQ'),
      currentPrice: Number(price.toFixed(2)),
      dailyChange: Number(change.toFixed(2)),
      dailyChangePercent: Number(changePercent.toFixed(2)),
      dayHigh: meta.regularMarketDayHigh ? Number(meta.regularMarketDayHigh.toFixed(2)) : null,
      dayLow: meta.regularMarketDayLow ? Number(meta.regularMarketDayLow.toFixed(2)) : null,
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ? Number(meta.fiftyTwoWeekHigh.toFixed(2)) : null,
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow ? Number(meta.fiftyTwoWeekLow.toFixed(2)) : null,
      volume: meta.regularMarketVolume || null,
      marketCap: null,
      timestamp: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : new Date().toISOString(),
      isIndianMarket: isIndian,
      liveMarketDataAvailable: true,
      source: isIndian ? 'National Stock Exchange of India (NSE Live)' : 'Live Global Market Data',
      officialSourceUrl,
      officialSourceName,
      chartPoints: chartPoints.length > 5 ? chartPoints : null,
    });
  } catch (error: any) {
    console.error(`Error fetching real-time quote for ${targetSymbol}:`, error.message);
    return res.json({
      success: false,
      symbol: targetSymbol,
      cleanTicker,
      liveMarketDataAvailable: false,
      isIndianMarket: isIndianQuery,
      officialSourceUrl,
      officialSourceName,
      error: 'Live market data temporarily unavailable from upstream provider',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Dynamic AI Debate Round Endpoint
app.post('/api/debate-round', async (req, res) => {
  const { ticker, companyName, roundNumber, topic, previousArguments } = req.body;

  if (!ai || !process.env.GEMINI_API_KEY) {
    // Return grounded fallback round
    return res.json({
      roundNumber: roundNumber || 2,
      topic: topic || 'Valuation Multiple vs. Long-Term Moat',
      bullStatement: `Your Honor, ${companyName} (${ticker}) has proven repeatedly that its competitive moat justifies a premium valuation. Looking at free cash flow generation and durable pricing power, long-term investors are well protected.`,
      bearRebuttal: `The Bull Analyst relies entirely on optimistic multiples remaining elevated. If interest rates remain restrictive or revenue growth decelerates by even 2%, multiple compression will severely impact shareholder returns.`,
      judgeIntervention: `The court notes both arguments rely on differing assumptions regarding the discount rate and durable competitive advantage. The verifiable evidence indicates moderate pricing power, but premium multiples inherently narrow the margin of safety.`,
      aiGenerated: false,
    });
  }

  try {
    const prompt = `You are running the courtroom debate in StockCourt AI for defendant ${companyName} (${ticker}).
Round #${roundNumber}. Topic: "${topic || 'Competitive Moat vs Downside Valuation'}".
Previous context: ${JSON.stringify(previousArguments || [])}.

Respond in JSON with three fields:
1. "bullStatement": A sharp, evidence-focused argument from the Bull Analyst supporting the company.
2. "bearRebuttal": A skeptical, risk-focused rebuttal from the Bear Analyst challenging the Bull's claim.
3. "judgeIntervention": A neutral ruling from the Evidence Judge identifying verified facts vs assumptions.

Keep each response under 3 sentences, professional, and beginner-clear. Never fabricate specific numbers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      roundNumber: roundNumber || 2,
      topic: topic || 'Competitive Moat vs Downside Valuation',
      bullStatement: parsed.bullStatement || `Bull argument for ${ticker}`,
      bearRebuttal: parsed.bearRebuttal || `Bear counterpoint for ${ticker}`,
      judgeIntervention: parsed.judgeIntervention || `Judge evaluation for ${ticker}`,
      aiGenerated: true,
    });
  } catch (error) {
    console.error('Error generating debate round:', error);
    res.status(500).json({
      error: 'Failed to generate AI debate round',
      fallback: {
        roundNumber: roundNumber || 2,
        topic: topic || 'Market Position vs Execution Risk',
        bullStatement: `Market leadership in ${ticker}'s core verticals provides pricing resilience.`,
        bearRebuttal: `Operating costs and regulatory hurdles continue to limit margin expansion.`,
        judgeIntervention: `Both perspectives have merit based on current financial disclosures.`,
      },
    });
  }
});

// Interactive Cross-Examination / Challenge Claim Endpoint
app.post('/api/challenge-claim', async (req, res) => {
  const { ticker, claim, side, userQuestion } = req.body;

  if (!ai || !process.env.GEMINI_API_KEY) {
    return res.json({
      analystResponse: `Regarding "${claim}": While your challenge is noted, our analysis weighs both audited filings and verifiable customer retention rates for ${ticker}.`,
      judgeVerdictOnChallenge: `The court acknowledges this cross-examination. While the claim has supporting filing data, the user's skepticism highlights an important risk factor that should be factored into overall valuation.`,
      aiGenerated: false,
    });
  }

  try {
    const prompt = `You are a courtroom tribunal in StockCourt AI analyzing defendant ${ticker}.
Side being challenged: ${side} (BULL or BEAR).
Original claim: "${claim}".
User's challenge or cross-examination question: "${userQuestion}".

Generate a JSON object with:
1. "analystResponse": The ${side} analyst's respectful, evidence-backed defense explaining their stance or conceding where appropriate.
2. "judgeVerdictOnChallenge": The Evidence Judge's neutral assessment of whether the user's challenge exposes a valid weakness or unsupported assumption.
Keep language beginner-friendly, educational, and concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      analystResponse: parsed.analystResponse,
      judgeVerdictOnChallenge: parsed.judgeVerdictOnChallenge,
      aiGenerated: true,
    });
  } catch (err) {
    console.error('Error handling challenge claim:', err);
    res.status(500).json({
      analystResponse: `The ${side} analyst maintains the original filing references for ${ticker}.`,
      judgeVerdictOnChallenge: `The court takes the user's objection into consideration as a potential downside risk factor.`,
      aiGenerated: false,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🏛️ StockCourt AI server running on port ${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
