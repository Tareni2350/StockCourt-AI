import { StockCourtCase } from '../types';

export interface RealTimeQuoteResult {
  success: boolean;
  symbol: string;
  cleanTicker: string;
  companyName: string;
  currency: string;
  currencySymbol: string;
  exchange: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  dayHigh?: number | null;
  dayLow?: number | null;
  fiftyTwoWeekHigh?: number | null;
  fiftyTwoWeekLow?: number | null;
  volume?: number | null;
  timestamp?: string;
  isIndianMarket: boolean;
  liveMarketDataAvailable: boolean;
  source: string;
  officialSourceUrl?: string;
  officialSourceName?: string;
  chartPoints?: { time: string; price: number; timestamp?: number }[] | null;
}

/**
 * Fetches real-time stock quote from server proxy (supporting Indian NSE/BSE and global markets)
 */
export async function fetchLiveStockQuote(symbol: string): Promise<RealTimeQuoteResult | null> {
  try {
    const res = await fetch(`/api/market/quote?symbol=${encodeURIComponent(symbol.trim())}`);
    if (!res.ok) return null;
    const data: RealTimeQuoteResult = await res.json();
    return data;
  } catch (err) {
    console.warn(`Failed to fetch real-time quote for ${symbol}:`, err);
    return null;
  }
}

/**
 * Applies real-time stock quote to an existing StockCourtCase
 */
export function applyLiveQuoteToCase(courtCase: StockCourtCase, quote: RealTimeQuoteResult): StockCourtCase {
  if (!quote || !quote.success) return courtCase;

  const isINR = quote.currency === 'INR' || quote.isIndianMarket || courtCase.isIndian;

  return {
    ...courtCase,
    companyName: quote.companyName || courtCase.companyName,
    liveMarketDataAvailable: true,
    isIndian: isINR,
    officialSourceUrl: quote.officialSourceUrl || courtCase.officialSourceUrl,
    officialSourceName: quote.officialSourceName || courtCase.officialSourceName,
    chartPoints: quote.chartPoints && quote.chartPoints.length > 0 ? quote.chartPoints : courtCase.chartPoints,
    metrics: {
      ...courtCase.metrics,
      currentPrice: quote.currentPrice,
      currency: quote.currency || (isINR ? 'INR' : 'USD'),
      currencySymbol: quote.currencySymbol || (isINR ? '₹' : '$'),
      exchange: quote.exchange || (isINR ? 'NSE' : 'NASDAQ'),
      dailyChange: quote.dailyChange,
      dailyChangePercent: quote.dailyChangePercent,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh ?? courtCase.metrics.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow ?? courtCase.metrics.fiftyTwoWeekLow,
      realTimeSource: quote.source,
      lastUpdated: quote.timestamp ? new Date(quote.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString(),
    },
  };
}
