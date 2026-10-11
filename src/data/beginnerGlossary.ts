import { GlossaryTerm } from '../types';

export const BEGINNER_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'pe-ratio',
    term: 'P/E Ratio (Price-to-Earnings)',
    acronym: 'P/E',
    category: 'Valuation',
    simpleDefinition: "A ratio comparing a company's share price with the profit it earns per single share. In simple words: it tells you how much investors are paying for $1 (or ₹1) of the company's annual profit.",
    practicalExample: "If a company's share price is $100 and its annual earnings per share is $5, the P/E is 100 ÷ 5 = 20. You are paying $20 for every $1 of earnings.",
    whyItMatters: "Helps you gauge whether a stock is relatively expensive or cheap compared to its profits and its industry peers.",
    whatToLookFor: "Is higher always better? No! A high P/E (e.g. 50+) means investors expect rapid future growth, but it leaves little room for errors. A low P/E could mean a bargain or a struggling company.",
    courtroomTranslation: "The price tag the market has put on the defendant's ability to generate profit.",
    relatedTerms: ['EPS', 'Valuation', 'Forward P/E', 'PEG']
  },
  {
    id: 'eps',
    term: 'Earnings Per Share (EPS)',
    acronym: 'EPS',
    category: 'Financial Metrics',
    simpleDefinition: "The portion of a company's total net profit allocated to each individual share of stock.",
    practicalExample: "If a company makes $10 million in net profit and has 5 million shares outstanding, its EPS is $2.00 per share.",
    whyItMatters: "It normalizes total company profits into a per-share metric so individual shareholders know their slice of the profit pie.",
    whatToLookFor: "Look for steady year-over-year EPS growth. Consistent earnings growth is the engine that drives stock values over time.",
    courtroomTranslation: "The verifiable proof of profit generated for every single ownership unit.",
    relatedTerms: ['P/E Ratio', 'Revenue', 'Profit', 'Net Income']
  },
  {
    id: 'market-cap',
    term: 'Market Capitalization',
    acronym: 'Market Cap',
    category: 'Basics',
    simpleDefinition: "The approximate total market value of all of a company's outstanding shares combined.",
    practicalExample: "If a company has 10 million shares and each share trades at $50, the market cap is 10 million × $50 = $500 million.",
    whyItMatters: "It tells you the actual size of the company (Mega-cap $200B+, Large-cap $10B-$200B, Mid-cap $2B-$10B, Small-cap under $2B).",
    whatToLookFor: "Do not judge size by share price alone! A $10 stock can have a larger market cap than a $500 stock if it has many more shares.",
    courtroomTranslation: "The defendant's total market valuation under current public pricing.",
    relatedTerms: ['Stock', 'Share', 'Valuation']
  },
  {
    id: 'revenue',
    term: 'Revenue (Top Line)',
    category: 'Financial Metrics',
    simpleDefinition: "The total amount of money a company takes in from selling products or services before deducting any costs or expenses.",
    practicalExample: "If a bakery sells 10,000 loaves of bread at $4 each, its revenue is $40,000.",
    whyItMatters: "Without revenue, there cannot be profits. Revenue growth indicates growing customer demand for the company's offerings.",
    whatToLookFor: "Check if revenue is growing sustainably or slowing down. Also look at whether revenue growth comes from new customers or just price increases.",
    courtroomTranslation: "The top-line money entering the enterprise before any operational expenses.",
    relatedTerms: ['Profit', 'Gross Margin', 'Growth']
  },
  {
    id: 'profit',
    term: 'Net Profit / Net Income (Bottom Line)',
    category: 'Financial Metrics',
    simpleDefinition: "The money left over after all operating expenses, taxes, interest, employee salaries, and costs have been paid.",
    practicalExample: "If our bakery had $40,000 revenue and spent $25,000 on ingredients, rent, and staff, its net profit is $15,000.",
    whyItMatters: "A business cannot survive forever without generating actual profit or a clear path to profitability.",
    whatToLookFor: "High revenue with negative profit means the company is burning cash. Look for profitable companies with expanding profit margins.",
    courtroomTranslation: "The defendant's actual net surplus after fulfilling all financial obligations.",
    relatedTerms: ['Revenue', 'EPS', 'Free Cash Flow', 'Margin']
  },
  {
    id: 'free-cash-flow',
    term: 'Free Cash Flow (FCF)',
    acronym: 'FCF',
    category: 'Financial Metrics',
    simpleDefinition: "The actual cold, hard cash left over after the business pays for operating expenses and investments in buildings, equipment, or servers (CapEx).",
    practicalExample: "Accounting profit can be altered by depreciation rules, but Free Cash Flow is real cash in the bank available to pay dividends, buy back shares, or acquire competitors.",
    whyItMatters: "Often considered the single most honest measure of financial health because accounting tricks cannot fake cash in bank accounts.",
    whatToLookFor: "Positive, growing Free Cash Flow. If FCF is much lower than reported net income, investigate why cash isn't showing up.",
    courtroomTranslation: "The untouchable liquid proof of cash remaining after capital reinvestment.",
    relatedTerms: ['Net Income', 'Cash Flow', 'Debt']
  },
  {
    id: 'roe',
    term: 'Return on Equity (ROE)',
    acronym: 'ROE',
    category: 'Financial Metrics',
    simpleDefinition: "Measures how efficiently management is using shareholders' invested money to generate profits.",
    practicalExample: "An ROE of 20% means the company produces $0.20 of profit for every $1.00 of shareholder equity.",
    whyItMatters: "Tells you whether management is exceptionally smart with capital or merely coasting.",
    whatToLookFor: "15%+ is generally considered good for high-quality businesses. Beware of artificially high ROE caused by excessive debt.",
    courtroomTranslation: "The efficiency rating of management turning owner capital into net gains.",
    relatedTerms: ['ROIC', 'Profit', 'Debt']
  },
  {
    id: 'roic',
    term: 'Return on Invested Capital (ROIC)',
    acronym: 'ROIC',
    category: 'Financial Metrics',
    simpleDefinition: "Measures how effectively a company generates profits from ALL capital (both equity from shareholders AND debt from banks).",
    practicalExample: "If a company deploys $100M total capital and earns $15M after taxes, its ROIC is 15%. If its cost to borrow capital is 8%, it creates 7% of value.",
    whyItMatters: "The hallmark of great businesses with sustainable competitive advantages (economic moats).",
    whatToLookFor: "ROIC consistently above the company's cost of capital (typically >10-12%) year after year.",
    courtroomTranslation: "The true measure of competitive moat and executive capital allocation.",
    relatedTerms: ['ROE', 'Competitive Advantage', 'Debt']
  },
  {
    id: 'debt',
    term: 'Total Debt & Leverage',
    category: 'Risk & Growth',
    simpleDefinition: "The total amount of borrowed money the company owes to banks, bondholders, and financial institutions.",
    practicalExample: "If a company has $5B in debt and $1B in cash, it has $4B in net debt that requires regular interest payments.",
    whyItMatters: "Heavy debt increases financial vulnerability, especially during recessions or when interest rates rise.",
    whatToLookFor: "Compare total debt with cash reserves and annual Free Cash Flow. Can the company pay off its debt within 3 to 5 years of FCF?",
    courtroomTranslation: "The defendant's outstanding liability burden under scrutiny by the Bear Analyst.",
    relatedTerms: ['Risk', 'Free Cash Flow', 'Cash Flow']
  },
  {
    id: 'valuation',
    term: 'Valuation',
    category: 'Valuation',
    simpleDefinition: "The process of determining what a company's stock is realistically worth based on fundamentals, cash flows, and growth prospects.",
    practicalExample: "A fantastic company can be a terrible investment if you pay twice what it is worth.",
    whyItMatters: "Your long-term return depends heavily on the price you pay today relative to the company's future cash generation.",
    whatToLookFor: "Compare the valuation to historical averages, industry competitors, and realistic future growth rates.",
    courtroomTranslation: "The fundamental assessment of whether the public market has overcharged or underpriced the defendant.",
    relatedTerms: ['P/E Ratio', 'Intrinsic Value', 'Forward P/E']
  },
  {
    id: 'bull-case',
    term: 'Bull Case',
    category: 'Courtroom Terms',
    simpleDefinition: "The strongest, evidence-backed arguments explaining why the company is poised to succeed, expand profits, and reward investors.",
    practicalExample: 'E.g., "Company is launching a breakthrough AI service, recurring revenue is growing 25%, and international market share is expanding."',
    whyItMatters: "You need to understand the optimistic thesis to evaluate upside potential and market expectations.",
    whatToLookFor: "Demand concrete evidence and verifiable data, not just hyped executive speeches.",
    courtroomTranslation: "The prosecution/defense case for optimistic performance put forward by the Bull Analyst.",
    relatedTerms: ['Bear Case', 'Catalyst', 'Growth']
  },
  {
    id: 'bear-case',
    term: 'Bear Case',
    category: 'Courtroom Terms',
    simpleDefinition: "The skeptical analysis highlighting weaknesses, potential pitfalls, competitive threats, and risks that could cause the stock to drop.",
    practicalExample: 'E.g., "Valuation assumes 30% growth forever, profit margins are shrinking due to Chinese competitors, and regulatory fines loom."',
    whyItMatters: "Every company has risks. Ignoring the Bear case is the most common beginner investing mistake.",
    whatToLookFor: "Severity of the risks: are they temporary hiccups or structural existential threats?",
    courtroomTranslation: "The counter-interrogation presented by the Bear Analyst challenging the investment thesis.",
    relatedTerms: ['Bull Case', 'Risk', 'Valuation Risk']
  },
  {
    id: 'judge-verdict',
    term: 'Courtroom Verdict',
    category: 'Courtroom Terms',
    simpleDefinition: "An independent fact-checked evaluation that weighs verifiable evidence, discounts unverified hype, and delivers a reasoned research stance.",
    practicalExample: "A verdict of 'CAUTIOUSLY BULLISH' means evidence confirms solid growth, but high valuation warrants disciplined caution.",
    whyItMatters: "Prevents confirmation bias by refusing to just rubber-stamp Bull enthusiasm or Bear pessimism.",
    whatToLookFor: "Look at 'What Supports The Verdict' and 'What The Judge Is Watching' rather than treating the verdict as a buy/sell command.",
    courtroomTranslation: "The neutral judicial ruling based strictly upon documented evidence.",
    relatedTerms: ['Evidence Strength', 'Bull Case', 'Bear Case']
  },
  {
    id: 'evidence-strength',
    term: 'Evidence Strength',
    category: 'Courtroom Terms',
    simpleDefinition: "A metric scoring how rigorously a claim is substantiated by primary filings, verifiable numbers, and reliable audited sources.",
    practicalExample: "Claiming 'Revenue grew 14%' with an SEC 10-K filing has 95% strength. Claiming 'Stock will double next year' has 10% strength (pure speculation).",
    whyItMatters: "Separates factual substance from marketing narrative and social media rumors.",
    whatToLookFor: "Always distinguish between FACT, ANALYSIS, ASSUMPTION, and SPECULATION.",
    courtroomTranslation: "The evidentiary standard applied by the Evidence Judge to test claims.",
    relatedTerms: ['Judge Verdict', 'Bull Case', 'Bear Case']
  },
  {
    id: 'catalyst',
    term: 'Catalyst',
    category: 'Risk & Growth',
    simpleDefinition: "A specific future event or development expected to trigger a significant change in the company's business performance or stock price.",
    practicalExample: "A new product launch date, FDA drug approval decision, major antitrust lawsuit verdict, or quarterly earnings report.",
    whyItMatters: "Stock prices often remain stagnant until a catalyst forces the broader market to re-evaluate the company.",
    whatToLookFor: "Check if positive catalysts are already priced into the stock, or if unexpected negative catalysts could blindside investors.",
    courtroomTranslation: "A scheduled or pending event capable of dramatically altering the trial outcome.",
    relatedTerms: ['Bull Case', 'Bear Case', 'Earnings']
  },
  {
    id: 'volatility',
    term: 'Volatility & Beta',
    category: 'Risk & Growth',
    simpleDefinition: "How wildly a stock's price swings up and down over a given period of time.",
    practicalExample: "A utility company stock might only move 0.5% a day (low volatility). A high-growth crypto or tech stock might swing 8% in an afternoon (high volatility).",
    whyItMatters: "High volatility can test an investor's emotions, leading to panic selling at the worst possible moments.",
    whatToLookFor: "Beta measures volatility relative to the market (Beta of 1.0 = moves with market; Beta of 1.8 = moves 80% more dramatically than market).",
    courtroomTranslation: "The turbulence and unpredictable swings observed in the defendant's market record.",
    relatedTerms: ['Risk', 'Market Cap']
  },
  {
    id: 'margins',
    term: 'Profit Margins (Gross, Operating, Net)',
    acronym: 'Margin',
    category: 'Financial Metrics',
    simpleDefinition: "The percentage of revenue that turns into profit at various stages of the business.",
    practicalExample: "If a company earns $100 and keeps $40 as Gross Profit, its Gross Margin is 40%. If it keeps $15 as Net Income, its Net Margin is 15%.",
    whyItMatters: "High, steady margins prove pricing power: customers are willing to pay for value, and the company can absorb cost increases.",
    whatToLookFor: "Expanding margins (getting wider each quarter) vs compressing margins (shrinking due to competition or inflation).",
    courtroomTranslation: "The profitability cushion protecting the defendant against cost spikes.",
    relatedTerms: ['Revenue', 'Profit', 'Net Income']
  }
];
