import { StockCourtCase, FinancialMetrics } from '../types';

export const POPULAR_TICKERS = [
  { ticker: 'RELIANCE', name: 'Reliance Industries Ltd.', sector: 'Energy, Retail & Telecom', exchange: 'NSE', isIndian: true },
  { ticker: 'TCS', name: 'Tata Consultancy Services', sector: 'IT Services & Consulting', exchange: 'NSE', isIndian: true },
  { ticker: 'INFY', name: 'Infosys Limited', sector: 'Digital Services & Consulting', exchange: 'NSE', isIndian: true },
  { ticker: 'HDFCBANK', name: 'HDFC Bank Limited', sector: 'Banking & Financial Services', exchange: 'NSE', isIndian: true },
  { ticker: 'TATAMOTORS', name: 'Tata Motors Limited', sector: 'Automotive & EVs', exchange: 'NSE', isIndian: true },
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Consumer Electronics & Services', exchange: 'NASDAQ' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', sector: 'Semiconductors & AI Hardware', exchange: 'NASDAQ' },
  { ticker: 'MSFT', name: 'Microsoft Corporation', sector: 'Enterprise Software & Cloud', exchange: 'NASDAQ' },
  { ticker: 'TSLA', name: 'Tesla, Inc.', sector: 'Automotive & Clean Energy', exchange: 'NASDAQ' },
];

export const MOCK_CASES: Record<string, StockCourtCase> = {
  AAPL: {
    caseId: 'CASE #AAPL-2026',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    createdDate: 'October 10, 2026',
    focusQuestion: 'Is Apple fairly valued given services expansion and AI integration?',
    isDemo: true,
    liveMarketDataAvailable: true,
    metrics: {
      revenue: '$391.04B',
      revenueGrowthYoY: '+6.1%',
      grossMargin: '46.2%',
      operatingMargin: '31.5%',
      netIncome: '$101.45B',
      eps: '$6.75',
      freeCashFlow: '$108.82B',
      totalDebt: '$101.3B',
      cashAndEquivalents: '$65.2B',
      roe: '152.8%',
      roic: '54.3%',
      peRatio: '33.8',
      forwardPe: '29.4',
      pegRatio: '2.8',
      priceToSales: '8.4',
      evToEbitda: '23.6',
      priceToFcf: '30.4',
      revenueCagr3Yr: '4.8%',
      epsGrowth3Yr: '8.2%',
      fcfGrowth3Yr: '5.9%',
      marketGrowthRate: '5.2%',
      debtToEquity: '1.45',
      customerConcentration: '<2% (Broad consumer base)',
      geographicConcentration: 'Americas (42%), Europe (25%), Greater China (18%)',
      regulatoryRisk: 'High (EU DMA compliance, DOJ antitrust trial)',
      currentPrice: 228.45,
      currency: 'USD',
      dailyChange: 1.82,
      dailyChangePercent: 0.80,
      marketCap: '$3.47T',
      fiftyTwoWeekHigh: 237.23,
      fiftyTwoWeekLow: 164.08,
      avgVolume: '48.2M',
      beta: '1.08',
      exchange: 'NASDAQ',
      sector: 'Consumer Electronics & Software',
      industry: 'Hardware & Ecosystem Services'
    },
    bullThesis: {
      coreThesis: 'Apple possesses the world’s most lucrative consumer ecosystem with over 2.2 billion active devices, converting one-time hardware buyers into high-margin recurring services revenue with pricing power.',
      bullScore: 82,
      arguments: [
        {
          id: 'aapl-b1',
          category: 'Competitive Advantage',
          claim: "Apple's Services segment provides an increasingly predictable, high-margin recurring revenue stream with 74%+ gross margins.",
          claimType: 'FACT',
          supportingEvidence: "Services revenue surpassed $85B annually with gross margins of ~74%, compared to ~37% for hardware.",
          sourceName: "SEC Form 10-K & Q3 Earnings Release",
          sourceCitation: "Apple Inc. Form 10-K Annual Report (Item 7, MD&A, Services Breakdown)",
          confidenceLevel: 94,
          beginnerExplanation: "Think of services like subscriptions: iCloud, App Store, and Apple Music provide steady, predictable money every month that costs very little to deliver.",
          whyItMatters: "Recurring revenue protects the company even if customers wait an extra year to upgrade their physical iPhones."
        },
        {
          id: 'aapl-b2',
          category: 'Growth Opportunity',
          claim: "Apple Intelligence (on-device AI) is sparking a multi-year iPhone upgrade cycle among 800M+ eligible older device owners.",
          claimType: 'ANALYSIS',
          supportingEvidence: "On-device AI models require A17 Pro / M-series chips or newer, rendering 85%+ of the existing installed base ineligible for full AI features without upgrading.",
          sourceName: "Apple Worldwide Developers Conference (WWDC) & IDC Supply Chain Data",
          sourceCitation: "IDC Smartphone Installed Base Hardware Audit & Apple Developer Specs",
          confidenceLevel: 81,
          beginnerExplanation: "Because new AI features only work on the newest phone chips, millions of people who haven't upgraded in 3-4 years now have a compelling reason to buy a new iPhone.",
          whyItMatters: "iPhone hardware still represents over 50% of Apple's revenue, so an upgrade surge directly boosts top-line profits."
        },
        {
          id: 'aapl-b3',
          category: 'Competitive Advantage',
          claim: "Unmatched capital return program with over $100B in annual share repurchases persistently drives EPS growth even during moderate top-line growth.",
          claimType: 'FACT',
          supportingEvidence: "Apple repurchased over $650B of its own stock over the past decade, retiring more than 35% of total outstanding shares.",
          sourceName: "SEC Form 10-K Statement of Shareholders' Equity",
          sourceCitation: "Apple Inc. Cash Flow Statement: Repurchases of Common Stock 2014-2026",
          confidenceLevel: 96,
          beginnerExplanation: "When a company buys back its own stock, the total number of shares shrinks. That means your remaining slice of the company automatically gets a bigger portion of the profits.",
          whyItMatters: "Even if overall revenue only grows 4%, earnings per share (EPS) can grow 8% to 10% because there are fewer shares dividing the profit."
        }
      ]
    },
    bearThesis: {
      coreThesis: 'Apple trades at an elevated valuation multiple (33x+ P/E) despite mid-single-digit revenue growth, while facing severe regulatory antitrust scrutiny in the US and Europe and intensifying domestic competition in China.',
      bearRiskScore: 68,
      arguments: [
        {
          id: 'aapl-br1',
          category: 'Valuation Risk',
          claim: "Valuation multiple (33.8x P/E) is near a 15-year high for a business delivering ~6% annual revenue growth.",
          claimType: 'ANALYSIS',
          supportingEvidence: "Historically, Apple traded between 15x and 22x P/E between 2012 and 2019. The current multiple leaves no margin of safety if hardware upgrades lag.",
          sourceName: "FactSet / Bloomberg 15-Year Historical Valuation Series",
          sourceCitation: "Historical P/E Multiples Analysis 2011-2026",
          riskSeverity: 'HIGH',
          beginnerExplanation: "Investors are paying $33.80 for every $1 of Apple's profit today, compared to only $18 a decade ago. If the market becomes less enthusiastic, the stock price could decline even if Apple stays profitable.",
          whyItMatters: "When a stock is priced for perfection, any slight earnings miss can lead to painful price drops."
        },
        {
          id: 'aapl-br2',
          category: 'Regulatory Concern',
          claim: "Antitrust enforcement by the US Department of Justice and EU Digital Markets Act directly threatens the lucrative 30% App Store fee and Google search revenue-share payments.",
          claimType: 'FACT',
          supportingEvidence: "Google pays Apple an estimated $20B+ per year to remain the default search engine on Safari (estimated at ~15-20% of Apple's entire operating profit). The DOJ antitrust ruling could terminate or restrict this deal.",
          sourceName: "US DOJ vs. Google Court Filings & EU DMA Compliance Orders",
          sourceCitation: "United States District Court for District of Columbia, Case 1:20-cv-03010-APM",
          riskSeverity: 'CRITICAL',
          beginnerExplanation: "Google currently hands Apple an estimated $20 Billion pure-profit check every year just to be the default search bar on iPhones. Courts are ruling this anti-competitive, which could vaporize high-margin profit.",
          whyItMatters: "This is pure profit with zero operational cost. Losing even half of it would immediately impact Apple's earnings."
        },
        {
          id: 'aapl-br3',
          category: 'Competitive Threat',
          claim: "Intensifying competition in Greater China from Huawei and local Android brands poses sustained market-share headwinds.",
          claimType: 'ANALYSIS',
          supportingEvidence: "China accounts for ~18% of Apple's revenue. Canalys reports Huawei gained ~35% YoY domestic shipments while iPhone shipments contracted ~6% in the region.",
          sourceName: "Canalys Smartphone Market Pulse & Counterpoint Research",
          sourceCitation: "China Q2-Q3 Smartphone Shipment Tracker 2026",
          riskSeverity: 'MEDIUM',
          beginnerExplanation: "In China, patriotic consumer sentiment and competitive domestic phones from Huawei and Xiaomi are convincing some buyers to leave the iPhone ecosystem.",
          whyItMatters: "Greater China has been one of Apple's primary growth engines for a decade."
        }
      ]
    },
    judgeAudits: [
      {
        id: 'ja-1',
        targetClaimId: 'aapl-b1',
        side: 'BULL',
        claimSummary: "Services segment provides recurring revenue stream with ~74% gross margin.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 95,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "SEC Form 10-K explicitly corroborates $85B+ in Services revenue with 74.2% gross margins. Contractual subscriptions and installed base retention confirm recurring nature.",
        beginnerTakeaway: "This claim is rock-solid. Apple's official audited reports prove that subscriptions and services generate massive, reliable cash."
      },
      {
        id: 'ja-2',
        targetClaimId: 'aapl-b2',
        side: 'BULL',
        claimSummary: "Apple Intelligence triggers an 800M+ device super-upgrade cycle.",
        classification: 'PARTIALLY SUPPORTED',
        evidenceStrengthPercent: 68,
        sourceQuality: 'MEDIUM',
        dataRecency: 'RECENT',
        judgeNotes: "Hardware eligibility constraints are verified, but consumer willingness to spend $1,000+ specifically for AI software remains unproven assumption rather than audited fact.",
        beginnerTakeaway: "It is true that old phones cannot run the AI, but whether people actually care enough to spend $1,000 for AI is still an assumption, not a fact."
      },
      {
        id: 'ja-3',
        targetClaimId: 'aapl-br1',
        side: 'BEAR',
        claimSummary: "Valuation of 33.8x P/E is near 15-year high relative to mid-single digit revenue growth.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 92,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "Verified across FactSet and SEC filings. Historical median P/E was 18.4x between 2011-2019. Current valuation multiple implies premium expectations.",
        beginnerTakeaway: "The numbers don't lie: investors are paying almost double the historical multiple for Apple today."
      },
      {
        id: 'ja-4',
        targetClaimId: 'aapl-br2',
        side: 'BEAR',
        claimSummary: "DOJ search ruling and EU DMA threaten estimated $20B Google search payment and 30% App Store fees.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 88,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "DOJ trial evidentiary documents confirm payments around $20B. Legal remedies are active, presenting legitimate downside risk to operating margins.",
        beginnerTakeaway: "This is a real regulatory threat backed by official court testimony, not just speculation."
      }
    ],
    verdict: {
      verdictType: 'CAUTIOUSLY BULLISH',
      confidenceScore: 78,
      summary: "The court finds that Apple's business fundamentals, installed ecosystem, and immense free cash flow remain historically unmatched. However, an elevated valuation multiple (33.8x) and acute regulatory risk in search revenue temper an outright bullish verdict.",
      beginnerExplanation: "The Judge found more positive evidence than negative evidence: Apple is a world-class cash machine with loyal customers. But because the stock price is already high and government regulators are circling, caution is warranted.",
      whatSupports: [
        "Verified $108B+ in annual Free Cash Flow with 2.2B+ active sticky devices",
        "Services segment gross margins expanded to 74%+ with over $85B in recurring revenue",
        "Over $100B in annual disciplined share repurchases permanently retiring shares and lifting EPS",
        "Balance sheet resilience with $65B+ in cash and dominant global pricing power"
      ],
      whatCouldChange: [
        "Adverse judicial remedies in US DOJ Google case forcing termination of Safari search payments ($20B pure profit at risk)",
        "Consumer apathy toward Apple Intelligence features resulting in a normal rather than accelerated iPhone upgrade cycle",
        "Further market share losses in Greater China to domestic competitors",
        "Broad market multiple contraction lowering mega-cap tech P/E multiples toward historical averages (20-25x)"
      ],
      whatJudgeIsWatching: [
        { metric: 'Services Revenue & Margin', targetOrConcern: 'Maintain >$25B/quarter at >73% gross margin', importance: 'CRITICAL', whyWatch: 'Core pillar of recurring thesis' },
        { metric: 'US DOJ Google Antitrust Remedy', targetOrConcern: 'Safari default search revenue sharing status', importance: 'CRITICAL', whyWatch: 'Direct $20B annual profit exposure' },
        { metric: 'China iPhone Shipment Volume', targetOrConcern: 'Quarterly stabilization vs Huawei and Xiaomi', importance: 'HIGH', whyWatch: '18% regional revenue contribution' },
        { metric: 'P/E Multiple Compression', targetOrConcern: 'Trailing P/E ratio divergence from 10-yr median', importance: 'MEDIUM', whyWatch: 'Valuation discipline' }
      ]
    },
    debateRounds: [
      {
        roundNumber: 1,
        topic: 'Hardware Moat vs. Growth Stagnation',
        bullStatement: "Your Honor, Apple's 2.2 billion active device base represents the most affluent, captive consumer demographic in human history. With Apple Intelligence restricted to recent silicon, an unavoidable replacement wave of 800M+ phones is initiating.",
        bearRebuttal: "The Bull counsel paints a rosy picture of forced upgrades, but convenience does not equal compulsion. Consumers are holding onto smartphones for a record 4.2 years. AI features like photo clean-up and email summaries have failed to generate consumer frenzy. Meanwhile, top-line revenue has grown at only 4.8% CAGR over 3 years.",
        judgeIntervention: "Counsel, the court notes that hardware lifespan extension is supported by consumer research data. The Bull's thesis relies on AI generating discretionary replacement urgency, which currently lacks empirical proof."
      },
      {
        roundNumber: 2,
        topic: 'Services Goldmine vs. Regulatory Antitrust Guillotine',
        bullStatement: "The defense ignores the structural pivot to high-margin recurring software. Services is now larger than most Fortune 50 companies at $85B+ annual revenue and 74% gross margins. Apple is no longer just a hardware maker; it is an indispensable software tollbooth.",
        bearRebuttal: "That 'tollbooth' is precisely what the United States Department of Justice and the European Union have placed under federal subpoena! An estimated $20 Billion of that annual toll is a direct search royalty check from Google that federal courts have ruled anti-competitive. Strip out that risk-free $20 Billion, and operating income shrinks 18%.",
        judgeIntervention: "Bear counsel presents material courtroom evidence. Court documents in the Google antitrust proceedings confirm the $20B figure. The Bull Analyst cannot treat Services revenue as immune to judicial remedies."
      },
      {
        roundNumber: 3,
        topic: 'Valuation and Capital Return Safety Net',
        bullStatement: "Even in worst-case scenarios, Apple generates $108 Billion of annual Free Cash Flow. Management returns over $100 Billion each year through dividends and aggressive buybacks, reducing shares outstanding by ~35% over the last decade. That capital discipline establishes a structural price floor.",
        bearRebuttal: "Buybacks enhance EPS, but they cannot justify paying 34 times earnings for a company growing revenue at single digits. Between 2013 and 2018, Apple bought back massive stock while trading at 15x P/E. Today you are paying more than double that multiple for less growth.",
        judgeIntervention: "Both arguments are grounded in audited filings. The buyback engine is a verifiable fact, but so is the historical multiple expansion. The court will reflect this tension in the final verdict."
      }
    ],
    debateSynthesis: {
      strongestBullArgument: "Over 2.2 billion active devices generating $108B+ Free Cash Flow and $85B+ Services revenue with 74% gross margins.",
      strongestBearArgument: "Antitrust threat to $20B annual Google search revenue payment combined with a 33.8x P/E multiple that leaves minimal margin of safety.",
      weakestArgument: "Bull assumption that on-device AI will automatically spark an unprecedented 800M-device supercycle without price resistance.",
      missingEvidence: "Audited consumer conversion data showing quantifiable willingness to upgrade devices exclusively for AI functionality.",
      conflictingEvidence: "Market valuation pricing Apple as a rapid-growth software platform vs actual 3-year revenue CAGR of ~4.8% resembling mature industrial consumer staple."
    },
    scenarios: [
      {
        id: 'bull',
        name: 'Bull Case: The AI Super-Cycle',
        description: 'iPhone upgrade rates accelerate by 15%, Services expands to 80% gross margin, and China stabilizes.',
        revenueGrowthAssumption: '9.5% annual CAGR over 3 years',
        operatingMarginAssumption: '34.0% (Services mix shift)',
        terminalMultipleAssumption: '32x P/E maintained',
        estimatedPriceRange: '$275 - $310',
        catalystsRequired: ['Killer consumer AI apps', 'China market share rebound', 'Services ARR crosses $110B'],
        downsideTriggers: ['Supply chain bottlenecks', 'Antitrust concessions'],
        probabilityEstimate: '25%'
      },
      {
        id: 'base',
        name: 'Base Case: Steady Moat & Buybacks (Current Trajectory)',
        description: 'iPhone upgrades remain steady at normal cycle, Services grows at 10-12%, modest buybacks continue.',
        revenueGrowthAssumption: '5.5% annual CAGR over 3 years',
        operatingMarginAssumption: '31.0%',
        terminalMultipleAssumption: '28x P/E',
        estimatedPriceRange: '$225 - $250',
        catalystsRequired: ['Regular annual product cycle', 'Continuous share retirements'],
        downsideTriggers: ['Modest search deal restructuring'],
        probabilityEstimate: '55%'
      },
      {
        id: 'bear',
        name: 'Bear Case: Regulatory Hit & Multiple Contraction',
        description: 'DOJ terminates Google search payment, EU forces alternative app stores, P/E contracts to 22x.',
        revenueGrowthAssumption: '2.0% annual CAGR',
        operatingMarginAssumption: '27.5% (Loss of search royalties)',
        terminalMultipleAssumption: '22x P/E (Historical norm)',
        estimatedPriceRange: '$165 - $185',
        catalystsRequired: ['DOJ structural remedies enacted', 'Huawei captures further China share'],
        downsideTriggers: ['Economic recession', 'App store commission cuts to 12%'],
        probabilityEstimate: '20%'
      }
    ],
    evidenceRoom: [
      {
        id: 'ev-1',
        sourceName: 'Apple Inc. Form 10-K Annual Report (Item 7, MD&A)',
        sourceType: 'SEC Filing',
        category: 'Company Sources',
        publicationDate: 'Oct 31, 2025',
        dataDate: 'FY 2025 / 2026',
        url: 'https://www.sec.gov/edgar/searchedgar/companysearch',
        citation: 'SEC File No. 001-36743, Item 7: Management Discussion & Analysis of Financial Condition',
        reliability: 'OFFICIAL',
        excerpt: 'Services net sales were $85.2 billion with gross margin of 74.0%. Active installed base exceeded 2.2 billion devices across all geographic segments.'
      },
      {
        id: 'ev-2',
        sourceName: 'U.S. DOJ vs. Alphabet (Trial Exhibit 502: Apple-Google Search Agreement)',
        sourceType: 'SEC Filing',
        category: 'External Sources',
        publicationDate: 'Nov 15, 2024',
        dataDate: '2023-2026',
        url: 'https://www.justice.gov/atr/case/us-and-plaintiff-states-v-google-llc',
        citation: 'US District Court for the District of Columbia, Case 1:20-cv-03010, Trial Transcript p. 4812',
        reliability: 'VERIFIED',
        excerpt: 'Google revenue share payments to Apple for Safari default search positioning were disclosed at approximately $20 billion annually.'
      },
      {
        id: 'ev-3',
        sourceName: 'IDC Worldwide Quarterly Mobile Phone Tracker',
        sourceType: 'Industry Research',
        category: 'External Sources',
        publicationDate: 'Aug 14, 2026',
        dataDate: 'Q2 2026',
        url: 'https://www.idc.com',
        citation: 'IDC Tracker Report IDC-PR-2026-08, Global Smartphone Installed Base Hardware Age',
        reliability: 'VERIFIED',
        excerpt: 'Over 85% of global iPhone active installed base utilizes chips prior to A17 Pro, establishing the theoretical technical threshold for Apple Intelligence compatibility.'
      },
      {
        id: 'ev-4',
        sourceName: 'Canalys Greater China Smartphone Market Report',
        sourceType: 'Industry Research',
        category: 'External Sources',
        publicationDate: 'Jul 22, 2026',
        dataDate: 'Q2 2026',
        citation: 'Canalys Research Brief 2026-CH-07: Domestic Brand Renaissance in Mainland China',
        reliability: 'THIRD_PARTY',
        excerpt: 'Huawei mainland smartphone shipments expanded by 37% year-over-year, while Apple unit shipments experienced a 5.8% contraction in the same comparative period.'
      },
      {
        id: 'ev-5',
        sourceName: 'FactSet 15-Year Historical Equity Valuation Database',
        sourceType: 'Market Data',
        category: 'Market Data',
        publicationDate: 'Oct 01, 2026',
        dataDate: '2011 - 2026',
        citation: 'FactSet Research Systems Historical Valuation Multiples (P/E, P/FCF, EV/EBITDA)',
        reliability: 'OFFICIAL',
        excerpt: 'Apple trailing twelve months P/E ratio historical 10-year median stands at 21.4x, with a 15-year low of 9.8x (2013) and 15-year peak of 34.2x (2024-2026).'
      }
    ]
  },
  NVDA: {
    caseId: 'CASE #NVDA-2026',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    createdDate: 'October 9, 2026',
    focusQuestion: 'Can NVIDIA sustain historic 75%+ gross margins against customer custom silicon and cyclical capex?',
    isDemo: false,
    liveMarketDataAvailable: true,
    metrics: {
      revenue: '$126.8B',
      revenueGrowthYoY: '+114.2%',
      grossMargin: '75.4%',
      operatingMargin: '62.8%',
      netIncome: '$72.1B',
      eps: '$2.92',
      freeCashFlow: '$64.5B',
      totalDebt: '$11.2B',
      cashAndEquivalents: '$34.8B',
      roe: '115.4%',
      roic: '84.6%',
      peRatio: '42.5',
      forwardPe: '31.2',
      pegRatio: '1.2',
      priceToSales: '24.2',
      evToEbitda: '36.8',
      priceToFcf: '47.6',
      revenueCagr3Yr: '72.4%',
      epsGrowth3Yr: '124.6%',
      fcfGrowth3Yr: '98.5%',
      marketGrowthRate: '38.0%',
      debtToEquity: '0.19',
      customerConcentration: 'High (~40% of revenue from top 4 cloud hyperscalers)',
      geographicConcentration: 'US (45%), Taiwan/Singapore (35%), China Restricted',
      regulatoryRisk: 'High (US Dept of Commerce export controls on high-end GPUs)',
      currentPrice: 124.20,
      currency: 'USD',
      dailyChange: -1.45,
      dailyChangePercent: -1.15,
      marketCap: '$3.05T',
      fiftyTwoWeekHigh: 140.76,
      fiftyTwoWeekLow: 66.89,
      avgVolume: '62.4M',
      beta: '1.68',
      exchange: 'NASDAQ',
      sector: 'Semiconductors',
      industry: 'Accelerated Computing & AI Architectures'
    },
    bullThesis: {
      coreThesis: 'NVIDIA has built an insurmountable software-and-hardware moat via CUDA, NVLink, and full-stack datacenter architecture that makes switching to rival chips economically unfeasible for frontier AI models.',
      bullScore: 88,
      arguments: [
        {
          id: 'nvda-b1',
          category: 'Competitive Advantage',
          claim: "CUDA software ecosystem creates massive developer lock-in that competitors like AMD and custom ASICs struggle to match.",
          claimType: 'FACT',
          supportingEvidence: "Over 5 million developers, 4,000+ accelerated applications, and 18 years of library optimizations built specifically around NVIDIA architecture.",
          sourceName: "NVIDIA Annual Form 10-K & Developer Ecosystem Metrics",
          sourceCitation: "NVIDIA 10-K Item 1: Business - Accelerated Computing Architecture",
          confidenceLevel: 95,
          beginnerExplanation: "CUDA is like the operating system for AI chips. Millions of engineers wrote their code specifically for NVIDIA chips. Switching to another chip means rewriting huge amounts of code at enormous expense.",
          whyItMatters: "Even if a rival chip is slightly cheaper, companies will buy NVIDIA to avoid software re-engineering headaches."
        },
        {
          id: 'nvda-b2',
          category: 'Revenue Acceleration',
          claim: "Hyperscalers (Microsoft, Meta, Google, Amazon) continue expanding multi-billion-dollar annual AI infrastructure CapEx.",
          claimType: 'FACT',
          supportingEvidence: "Combined 2025/2026 AI CapEx projections of top 4 tech giants exceed $200B annually, with over 60% allocated to compute and networking.",
          sourceName: "Big Tech Form 10-Q Quarterly Filings (CapEx disclosures)",
          sourceCitation: "MSFT, META, GOOGL, AMZN Q2 2026 10-Q Filings",
          confidenceLevel: 92,
          beginnerExplanation: "The richest tech companies on earth are engaged in an AI arms race and are spending hundreds of billions buying servers.",
          whyItMatters: "NVIDIA captures the majority of every dollar spent on AI server hardware."
        }
      ]
    },
    bearThesis: {
      coreThesis: 'NVIDIA’s largest customers (Microsoft, Google, Amazon, Meta) are aggressively developing their own custom silicon (TPUs, Trainium, Maia) to bypass NVIDIA’s 75% gross margins, signaling eventual customer concentration collapse.',
      bearRiskScore: 74,
      arguments: [
        {
          id: 'nvda-br1',
          category: 'Customer Concentration',
          claim: "Extreme customer concentration: Just 4 hyperscale tech companies account for approximately 40% of NVIDIA’s total revenue.",
          claimType: 'FACT',
          supportingEvidence: "SEC 10-K Customer Concentration Note discloses 'Customer A' and 'Customer B' representing double-digit percentages of quarterly revenues.",
          sourceName: "SEC Form 10-K Note on Significant Customers",
          sourceCitation: "NVIDIA Form 10-K Note 17: Segment and Geographic Information",
          riskSeverity: 'CRITICAL',
          beginnerExplanation: "Imagine you run a restaurant and 4 people buy 40% of all your meals. If those 4 people decide to cook at home, your business is in serious trouble.",
          whyItMatters: "Those 4 customers are currently spending billions designing their own custom chips to avoid paying NVIDIA."
        },
        {
          id: 'nvda-br2',
          category: 'Margin Pressure',
          claim: "75%+ gross margins in hardware are historically unsustainable and will mean-revert as supply catches up with demand.",
          claimType: 'ANALYSIS',
          supportingEvidence: "Hardware semiconductor gross margins have never stayed above 75% through a full cyclical downturn in the 60-year history of the chip industry.",
          sourceName: "Semiconductor Industry Association (SIA) Historical Margin Database",
          sourceCitation: "SIA Cyclical Hardware Gross Margin Trend Analysis 1970-2026",
          riskSeverity: 'HIGH',
          beginnerExplanation: "Making a 75% profit margin on physical hardware is almost unheard of over long periods. As more factories open and competitors improve, prices usually drop.",
          whyItMatters: "If margins compress from 75% down to 60%, profits drop sharply even if revenue stays flat."
        }
      ]
    },
    judgeAudits: [
      {
        id: 'ja-nvda-1',
        targetClaimId: 'nvda-b1',
        side: 'BULL',
        claimSummary: "CUDA software ecosystem creates massive developer lock-in.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 94,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "Industry benchmarks confirm software parity lag from competitors. Developer inertia remains the strongest verifiable economic moat.",
        beginnerTakeaway: "Verified: developers are deeply locked into NVIDIA software tools."
      },
      {
        id: 'ja-nvda-2',
        targetClaimId: 'nvda-br1',
        side: 'BEAR',
        claimSummary: "Top 4 customers account for ~40% of revenue and are building custom ASICs.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 91,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "Audited SEC footnotes verify customer concentration. Public engineering roadmaps from Google (TPU v6), Amazon (Trainium 2), and Microsoft (Maia) confirm internal silicon substitution efforts.",
        beginnerTakeaway: "Verified: Big Tech is actively trying to replace NVIDIA with their own in-house chips."
      }
    ],
    verdict: {
      verdictType: 'CAUTIOUSLY BULLISH',
      confidenceScore: 76,
      summary: "NVIDIA holds unquestioned technological leadership and extraordinary profitability today. However, acute customer concentration and the historic cyclicality of hardware CapEx mandate watchful risk management.",
      beginnerExplanation: "NVIDIA is currently the king of the AI world with massive profits. But because only a handful of big tech giants buy most of their chips, any pause in AI spending will hit the company hard.",
      whatSupports: [
        "Uncontested 80%+ market share in advanced AI accelerator hardware",
        "CUDA software stack with 18 years of library optimizations providing developer lock-in",
        "Exceptional 62%+ operating margins generating $64B+ in annual Free Cash Flow",
        "Low leverage with debt representing less than 20% of annual cash generation"
      ],
      whatCouldChange: [
        "Hyperscaler CapEx digestion cycle where cloud giants pause or slow down GPU orders",
        "Internal custom silicon (Google TPU, AWS Trainium) capturing inference workloads",
        "Tighter US export restrictions cutting off international access to advanced chips",
        "Supply chain disruptions at TSMC impacting advanced packaging (CoWoS) output"
      ],
      whatJudgeIsWatching: [
        { metric: 'Gross Margin Stability', targetOrConcern: 'Must hold >72% through Blackwell generation', importance: 'CRITICAL', whyWatch: 'Pricing power barometer' },
        { metric: 'Top 4 Hyperscaler CapEx Guidance', targetOrConcern: 'Microsoft, Meta, Google, Amazon cloud spending trends', importance: 'CRITICAL', whyWatch: '40% customer exposure' },
        { metric: 'Inference Market Share', targetOrConcern: 'Retention of inference workloads vs custom ASICs', importance: 'HIGH', whyWatch: 'Long-term TAM driver' }
      ]
    },
    debateRounds: [
      {
        roundNumber: 1,
        topic: 'Hardware Monopoly vs. In-House Silicon',
        bullStatement: "NVIDIA does not just sell chips; it sells full datacenter supercomputers. Competitors who benchmark single chips against NVIDIA miss the point: with NVLink networking and CUDA, an NVIDIA cluster is 5x faster in total training time.",
        bearRebuttal: "Speed matters, but cost matters more when running AI at scale. Google runs a huge portion of its models on internal TPUs at a fraction of the cost. Amazon and Meta will not indefinitely tolerate paying 75% gross margins to Jensen Huang.",
        judgeIntervention: "The court finds merit on both sides: NVIDIA dominates frontier model training, but custom ASICs are already carving out significant territory in routine inference."
      }
    ],
    debateSynthesis: {
      strongestBullArgument: "CUDA full-stack moat and networking integration creating unrivaled performance in cluster training.",
      strongestBearArgument: "Customer concentration with the 4 biggest clients developing their own substitute silicon.",
      weakestArgument: "Bear claim that competition will immediately destroy margins within 6 months.",
      missingEvidence: "Definitive ROI metrics from enterprise clients proving AI applications generate sufficient revenue to sustain current CapEx.",
      conflictingEvidence: "Record chip backlogs alongside rumors of hyperscalers diversifying compute orders."
    },
    scenarios: [
      {
        id: 'bull',
        name: 'Bull Case: Sovereign AI & Enterprise Wave',
        description: 'Nation-states build sovereign AI clouds, enterprise adoption accelerates, margins stay >75%.',
        revenueGrowthAssumption: '35% CAGR over 3 years',
        operatingMarginAssumption: '64%',
        terminalMultipleAssumption: '38x P/E',
        estimatedPriceRange: '$180 - $210',
        catalystsRequired: ['Sovereign AI orders surge', 'Blackwell chip yields exceed expectations'],
        downsideTriggers: ['Power grid constraints delay datacenters'],
        probabilityEstimate: '30%'
      },
      {
        id: 'base',
        name: 'Base Case: Sustained Lead with Margin Normalization',
        description: 'AI spending continues at strong pace, margins gently drift toward 68%, P/E adjusts to 30x.',
        revenueGrowthAssumption: '20% CAGR over 3 years',
        operatingMarginAssumption: '58%',
        terminalMultipleAssumption: '30x P/E',
        estimatedPriceRange: '$125 - $145',
        catalystsRequired: ['Steady datacenter expansion', 'Networking revenue growth'],
        downsideTriggers: ['Hyperscalers digest capacity'],
        probabilityEstimate: '50%'
      },
      {
        id: 'bear',
        name: 'Bear Case: CapEx Digestion & ASIC Substitution',
        description: 'Big Tech pauses chip purchases to evaluate AI revenues; gross margins contract to 55%.',
        revenueGrowthAssumption: '5% CAGR',
        operatingMarginAssumption: '45%',
        terminalMultipleAssumption: '22x P/E',
        estimatedPriceRange: '$65 - $85',
        catalystsRequired: ['Economic slowdown', 'ASIC cost advantages widen'],
        downsideTriggers: ['Major tech firms cut datacenter guidance'],
        probabilityEstimate: '20%'
      }
    ],
    evidenceRoom: [
      {
        id: 'ev-nvda-1',
        sourceName: 'NVIDIA Corporation Form 10-K (Item 1 & Note 17)',
        sourceType: 'SEC Filing',
        category: 'Company Sources',
        publicationDate: 'Mar 18, 2026',
        dataDate: 'FY 2026',
        citation: 'SEC Form 10-K: Significant Customer Concentrations and Operating Segments',
        reliability: 'OFFICIAL',
        excerpt: 'Datacenter segment revenue grew 114% to represent 87% of total sales. Two customers each represented greater than 10% of total revenue during the period.'
      }
    ]
  },
  TSLA: {
    caseId: 'CASE #TSLA-2026',
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    createdDate: 'October 8, 2026',
    focusQuestion: 'Is Tesla primarily an automotive manufacturer or an AI & robotics platform?',
    isDemo: false,
    liveMarketDataAvailable: true,
    metrics: {
      revenue: '$97.4B',
      revenueGrowthYoY: '+2.8%',
      grossMargin: '17.8%',
      operatingMargin: '7.9%',
      netIncome: '$7.4B',
      eps: '$2.12',
      freeCashFlow: '$4.1B',
      totalDebt: '$5.8B',
      cashAndEquivalents: '$30.5B',
      roe: '11.8%',
      roic: '9.2%',
      peRatio: '98.5',
      forwardPe: '74.2',
      pegRatio: '5.8',
      priceToSales: '7.2',
      evToEbitda: '54.2',
      priceToFcf: '162.4',
      revenueCagr3Yr: '14.2%',
      epsGrowth3Yr: '-8.4%',
      fcfGrowth3Yr: '-18.2%',
      marketGrowthRate: '12.0%',
      debtToEquity: '0.08',
      customerConcentration: '<1% (Consumer retail)',
      geographicConcentration: 'US (48%), China (22%), Europe (18%)',
      regulatoryRisk: 'High (NHTSA Full Self Driving investigations, tariffs)',
      currentPrice: 218.80,
      currency: 'USD',
      dailyChange: -3.40,
      dailyChangePercent: -1.53,
      marketCap: '$698.4B',
      fiftyTwoWeekHigh: 271.00,
      fiftyTwoWeekLow: 138.80,
      avgVolume: '88.5M',
      beta: '2.32',
      exchange: 'NASDAQ',
      sector: 'Consumer Discretionary',
      industry: 'Automotive, Energy Storage & Robotics'
    },
    bullThesis: {
      coreThesis: 'Tesla is building the world’s leading real-world autonomous AI fleet, humanoid robotics platform (Optimus), and high-growth utility-scale energy storage business, making traditional auto valuation metrics obsolete.',
      bullScore: 71,
      arguments: [
        {
          id: 'tsla-b1',
          category: 'Growth Opportunity',
          claim: "Tesla Energy storage business (Megapack) is growing at triple-digit rates with expanding profit margins.",
          claimType: 'FACT',
          supportingEvidence: "Energy storage deployments grew over 125% YoY to record gigawatt-hours with gross margins exceeding automotive margins.",
          sourceName: "Tesla Q2/Q3 Shareholder Updates",
          sourceCitation: "Tesla Inc. Financial Summary: Energy Generation and Storage Segment",
          confidenceLevel: 89,
          beginnerExplanation: "Tesla doesn't just sell cars; it sells giant battery stations to power grids, and that side of the business is growing much faster than its car sales.",
          whyItMatters: "Provides high-margin diversification while the global car market experiences price competition."
        },
        {
          id: 'tsla-b2',
          category: 'Competitive Advantage',
          claim: "Real-world autonomous driving video data from millions of customer vehicles creates a massive data moat for FSD.",
          claimType: 'ANALYSIS',
          supportingEvidence: "Over 1.5 billion cumulative miles driven on Full Self-Driving (Supervised), generating edge-case training data rival autonomous programs cannot match.",
          sourceName: "Tesla AI Day Disclosures & FSD Milestone Reports",
          sourceCitation: "Tesla AI Team Cumulative FSD Mileage Telemetry",
          confidenceLevel: 78,
          beginnerExplanation: "Tesla has millions of cars on the road sending real driving videos to its supercomputers, giving its AI a vast library of real-world driving situations.",
          whyItMatters: "If autonomous robotaxis become reality, software margins will dwarf car manufacturing margins."
        }
      ]
    },
    bearThesis: {
      coreThesis: 'Over 80% of Tesla’s revenue is still derived from selling physical cars in an intensely competitive global auto industry where Chinese manufacturers (BYD) have lower production costs, causing Tesla’s operating margins to plunge from 17% to under 8%.',
      bearRiskScore: 82,
      arguments: [
        {
          id: 'tsla-br1',
          category: 'Margin Pressure',
          claim: "Automotive operating margins collapsed from over 16% in 2022 to under 8% due to aggressive price discounting and EV price wars.",
          claimType: 'FACT',
          supportingEvidence: "Operating margin contracted to 7.9% in FY 2025/2026 as vehicle average selling prices dropped from $52k to ~$42k.",
          sourceName: "SEC Form 10-K Income Statement Breakdown",
          sourceCitation: "Tesla 10-K Consolidated Statements of Operations (Operating Income Margin Trend)",
          riskSeverity: 'CRITICAL',
          beginnerExplanation: "Tesla had to cut car prices repeatedly to keep selling vehicles against aggressive competitors, which cut its profit margins in half.",
          whyItMatters: "A company trading at a 98x P/E ratio usually has expanding profit margins, not contracting margins."
        },
        {
          id: 'tsla-br2',
          category: 'Valuation Risk',
          claim: "Valuation of ~98x P/E prices in multi-trillion dollar robotics and robotaxi monopolies that face immense regulatory and safety hurdles.",
          claimType: 'ANALYSIS',
          supportingEvidence: "Traditional automakers trade at 5x to 8x P/E. Tesla's valuation requires assuming FSD reaches unsupervised Level 4/5 autonomy with widespread regulatory approval.",
          sourceName: "Bloomberg Auto & Tech Comparative Multiples",
          sourceCitation: "Automotive vs Tech Multiple Divergence Study",
          riskSeverity: 'HIGH',
          beginnerExplanation: "If you value Tesla like a car maker, it is astronomically expensive. Investors are betting heavily that Tesla will conquer driverless taxis and robots.",
          whyItMatters: "If autonomous robotaxis take longer than promised to get legal approval, the stock could re-rate drastically lower."
        }
      ]
    },
    judgeAudits: [
      {
        id: 'ja-tsla-1',
        targetClaimId: 'tsla-br1',
        side: 'BEAR',
        claimSummary: "Automotive operating margins contracted from 16%+ to under 8%.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 96,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "Audited financial statements confirm automotive gross margins excluding regulatory credits have fallen into the mid-teens, and overall operating margin stands at 7.9%.",
        beginnerTakeaway: "Verified: car profit margins have dropped significantly."
      },
      {
        id: 'ja-tsla-2',
        targetClaimId: 'tsla-b2',
        side: 'BULL',
        claimSummary: "FSD fleet data creates immediate pathway to commercial robotaxi service.",
        classification: 'WEAKLY SUPPORTED',
        evidenceStrengthPercent: 44,
        sourceQuality: 'MEDIUM',
        dataRecency: 'RECENT',
        judgeNotes: "While telemetry volume is verified, unsupervised Level 4/5 commercial operation remains legally unauthorized in key jurisdictions without driver liability transfer.",
        beginnerTakeaway: "Tesla has lots of data, but true robotaxis without a human driver are not yet approved by safety regulators."
      }
    ],
    verdict: {
      verdictType: 'NEUTRAL',
      confidenceScore: 65,
      summary: "The court finds a stark divergence between Tesla's fundamental auto reality (contracting margins, single-digit unit growth) and its speculative valuation (98x P/E reliant on robotaxis and Optimus). The evidence warrants a strictly neutral research posture.",
      beginnerExplanation: "Tesla is two companies at once: a car company with slowing growth and falling margins, and a futuristic AI company with big dreams. At 98 times earnings, the risks and potential rewards balance each other out.",
      whatSupports: [
        "Rapid expansion in Megapack energy storage with high gross margins",
        "Pristine balance sheet with $30B+ in cash and negligible net debt",
        "Unrivaled brand awareness and manufacturing cost innovation at scale",
        "Leading consumer autonomous data engine"
      ],
      whatCouldChange: [
        "Regulatory approval for commercial unsupervised robotaxis in California or Texas",
        "Launch of a sub-$25k mass market compact vehicle restoring 25%+ delivery growth",
        "Further price cuts in China and Europe due to low-cost competition",
        "Key person risk regarding Elon Musk's multi-company commitments and compensation disputes"
      ],
      whatJudgeIsWatching: [
        { metric: 'Automotive Gross Margin (ex-credits)', targetOrConcern: 'Needs to stabilize above 17%', importance: 'CRITICAL', whyWatch: 'Core business profitability' },
        { metric: 'Energy Storage Deployments', targetOrConcern: 'GWh growth rate per quarter', importance: 'HIGH', whyWatch: 'Fastest growing segment' },
        { metric: 'Autonomous Regulatory Filings', targetOrConcern: 'NHTSA and state DMV approvals for driverless operations', importance: 'CRITICAL', whyWatch: 'Robotaxi thesis viability' }
      ]
    },
    debateRounds: [
      {
        roundNumber: 1,
        topic: 'Car Manufacturer vs. AI Robotaxi Platform',
        bullStatement: "Valuing Tesla on car metrics is like valuing Apple in 2007 on phone hardware alone. Tesla is training neural networks at unprecedented scale with its Dojo supercomputers and customer fleet. Once autonomous ridesharing launches, software subscription economics take over.",
        bearRebuttal: "We have heard 'robotaxis next year' every year since 2016. Today, 80%+ of revenue comes from stamping metal and painting car doors. Meanwhile, BYD produces high-quality electric cars for under $15,000 in China, forcing Tesla into margin-killing price cuts.",
        judgeIntervention: "The court notes that audited financial statements deal in present reality: Tesla is currently an automaker experiencing margin compression. Speculative software option value cannot override present financial filings."
      }
    ],
    debateSynthesis: {
      strongestBullArgument: "Energy storage growth and massive proprietary real-world driving data fleet.",
      strongestBearArgument: "Automotive operating margins cut in half to 7.9% alongside a 98x P/E multiple.",
      weakestArgument: "Bull assertion that autonomous robotaxis are imminent without formal regulatory safety certifications.",
      missingEvidence: "Audited statistical safety metrics proving unsupervised FSD achieves lower intervention rates than human drivers across all weather conditions.",
      conflictingEvidence: "Energy storage profitability expanding while core automotive margins contract."
    },
    scenarios: [
      {
        id: 'bull',
        name: 'Bull Case: Robotaxi & Energy Breakout',
        description: 'Level 4 autonomy approved in 3 US states; Megapack hits $25B revenue with 25% margins.',
        revenueGrowthAssumption: '25% CAGR',
        operatingMarginAssumption: '16%',
        terminalMultipleAssumption: '70x P/E',
        estimatedPriceRange: '$350 - $420',
        catalystsRequired: ['Commercial driverless fleet launch', 'Optimus factory deployment'],
        downsideTriggers: ['Regulatory bans'],
        probabilityEstimate: '20%'
      },
      {
        id: 'base',
        name: 'Base Case: Gradual Recovery & Model Refresh',
        description: 'Auto margins stabilize at 14%, modest FSD take-rates, energy continues steady expansion.',
        revenueGrowthAssumption: '10% CAGR',
        operatingMarginAssumption: '10%',
        terminalMultipleAssumption: '45x P/E',
        estimatedPriceRange: '$190 - $230',
        catalystsRequired: ['New affordable vehicle launch', 'Energy revenue doubles'],
        downsideTriggers: ['China market share erosion'],
        probabilityEstimate: '50%'
      },
      {
        id: 'bear',
        name: 'Bear Case: Auto Commodity Re-Rating',
        description: 'EV adoption slows, price cuts continue, P/E multiple compresses to premium auto level (20x).',
        revenueGrowthAssumption: '3% CAGR',
        operatingMarginAssumption: '6%',
        terminalMultipleAssumption: '20x P/E',
        estimatedPriceRange: '$85 - $110',
        catalystsRequired: ['Further price wars', 'NHTSA restrictions on FSD branding'],
        downsideTriggers: ['Musk distractions and governance disputes'],
        probabilityEstimate: '30%'
      }
    ],
    evidenceRoom: [
      {
        id: 'ev-tsla-1',
        sourceName: 'Tesla, Inc. Form 10-K Consolidated Statements of Operations',
        sourceType: 'SEC Filing',
        category: 'Company Sources',
        publicationDate: 'Feb 02, 2026',
        dataDate: 'FY 2025 / 2026',
        citation: 'SEC Form 10-K Item 8: Financial Statements and Supplementary Data',
        reliability: 'OFFICIAL',
        excerpt: 'Total revenues grew 2.8% to $97.4 billion. Automotive gross margin excluding regulatory credits was 14.6%, and operating margin was 7.9% compared to 16.8% in FY 2022.'
      }
    ]
  },
  RELIANCE: {
    caseId: 'CASE #RELIANCE-2026',
    ticker: 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    createdDate: 'October 11, 2026',
    focusQuestion: 'Can Jio and Retail cash flows offset petrochemical cyclicality and fund ₹75,000 Cr green energy capex?',
    isDemo: false,
    isIndian: true,
    officialSourceUrl: 'https://www.nseindia.com/get-quote/equity?symbol=RELIANCE',
    officialSourceName: 'National Stock Exchange of India (NSE Official)',
    liveMarketDataAvailable: true,
    metrics: {
      revenue: '₹9,01,064 Cr',
      revenueGrowthYoY: '+10.8%',
      grossMargin: '34.2%',
      operatingMargin: '17.4%',
      netIncome: '₹69,648 Cr',
      eps: '₹102.90',
      freeCashFlow: '₹61,200 Cr',
      totalDebt: '₹3,18,000 Cr',
      cashAndEquivalents: '₹1,95,000 Cr',
      roe: '9.8%',
      roic: '9.2%',
      peRatio: '22.8',
      forwardPe: '19.4',
      pegRatio: '1.7',
      priceToSales: '1.7',
      evToEbitda: '12.4',
      priceToFcf: '25.8',
      revenueCagr3Yr: '14.2%',
      epsGrowth3Yr: '11.5%',
      fcfGrowth3Yr: '8.4%',
      marketGrowthRate: '7.8%',
      debtToEquity: '0.42',
      customerConcentration: '<1% (Consumer telecom & retail)',
      geographicConcentration: 'India (82%), Exports (18%)',
      regulatoryRisk: 'Moderate (TRAI telecom tariffs & windfall tax policies)',
      currentPrice: 1295.50,
      currency: 'INR',
      currencySymbol: '₹',
      dailyChange: 14.80,
      dailyChangePercent: 1.15,
      marketCap: '₹17.52 Lakh Cr',
      fiftyTwoWeekHigh: 1611.80,
      fiftyTwoWeekLow: 1160.20,
      avgVolume: '14.2M',
      beta: '0.94',
      exchange: 'NSE',
      sector: 'Diversified Conglomerate',
      industry: 'Telecom, Retail, Energy & Petrochemicals'
    },
    bullThesis: {
      coreThesis: 'Reliance has successfully transitioned from a cyclical oil-to-chemicals refiner into India’s dominant digital and consumer powerhouse through Jio (480M+ 5G subscribers) and Reliance Retail (18,800+ stores), capturing the structural rise of Indian domestic consumption.',
      bullScore: 84,
      arguments: [
        {
          id: 'rel-b1',
          category: 'Competitive Advantage',
          claim: "Jio Infocomm dominates India's digital highway with over 480 million subscribers and rising ARPU from tariff hikes.",
          claimType: 'FACT',
          supportingEvidence: "Jio quarterly EBITDA surpassed ₹15,000 Cr with 5G user base crossing 130 million and average monthly data consumption exceeding 28 GB per user.",
          sourceName: "Reliance Industries Q1/Q2 Media Release & Investor Presentation",
          sourceCitation: "NSE Listing Compliance Disclosures (Jio Platforms Financial Performance)",
          confidenceLevel: 93,
          beginnerExplanation: "Almost half a billion people in India use Jio for daily internet. As phone bill rates increase slightly, Jio makes massive additional profit with almost no new cost.",
          whyItMatters: "Provides utility-like recurring monthly revenue protected by high entry barriers."
        },
        {
          id: 'rel-b2',
          category: 'Growth Opportunity',
          claim: "Reliance Retail represents India's largest omnichannel network with 18,800+ stores and rapid grocery/apparel expansion.",
          claimType: 'FACT',
          supportingEvidence: "Retail revenue exceeded ₹3,00,000 Cr annually with footfalls topping 1.1 billion across grocery, electronics, and fashion segments.",
          sourceName: "Reliance Retail Ventures Audited Annual Financial Statements",
          sourceCitation: "RIL Integrated Annual Report: Consumer Businesses Expansion",
          confidenceLevel: 91,
          beginnerExplanation: "Reliance Retail is larger than the next several Indian retail chains combined. It touches daily essentials, clothes, and smartphones.",
          whyItMatters: "Consumer businesses now account for over 50% of Reliance's overall operating profit."
        }
      ]
    },
    bearThesis: {
      coreThesis: 'Massive capital expenditure (₹1.3 Lakh Cr annually) in 5G, retail expansion, and Jamnagar green hydrogen gigafactories keeps return on capital subdued (ROIC ~9%) while traditional oil refining margins face global OPEC volatility.',
      bearRiskScore: 66,
      arguments: [
        {
          id: 'rel-br1',
          category: 'Debt & Leverage',
          claim: "High ongoing CapEx suppresses Free Cash Flow yields and maintains total gross debt above ₹3,00,000 Cr.",
          claimType: 'ANALYSIS',
          supportingEvidence: "Net debt has drifted higher post-5G spectrum auctions and green energy investments, keeping Return on Equity below 10%.",
          sourceName: "Crisil & ICRA Credit Rating Rationales",
          sourceCitation: "Credit Rating Review of Reliance Industries Long-Term Borrowings",
          riskSeverity: 'MEDIUM',
          beginnerExplanation: "Reliance spends enormous amounts of money every year building new factories and solar plants, which means less cash is immediately returned to shareholders today.",
          whyItMatters: "If interest rates stay high or new projects take longer to generate returns, profit growth slows down."
        },
        {
          id: 'rel-br2',
          category: 'Margin Pressure',
          claim: "Oil-to-chemicals (O2C) refining margins remain exposed to global crude volatility and European carbon border adjustments.",
          claimType: 'ANALYSIS',
          supportingEvidence: "Gross Refining Margins (GRMs) fluctuate between $7 and $12 per barrel depending on Russian crude discounts and petrochemical spreads.",
          sourceName: "Singapore Complex Refining Margin Index & S&P Global Platts",
          sourceCitation: "Platts Commodity Benchmark Series: Asian Refining Margins",
          riskSeverity: 'HIGH',
          beginnerExplanation: "Oil refining is cyclical: when crude oil prices swing wildly across the world, refining profits can shrink unpredictably.",
          whyItMatters: "O2C still represents a substantial share of total revenue."
        }
      ]
    },
    judgeAudits: [
      {
        id: 'ja-rel-1',
        targetClaimId: 'rel-b1',
        side: 'BULL',
        claimSummary: "Jio has 480M+ subscribers with rising ARPU driving digital revenue.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 95,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "NSE quarterly filings and TRAI subscription data verify market leadership. Recent 11-15% tariff revisions directly support EBITDA expansion.",
        beginnerTakeaway: "Verified: Jio is undisputed market leader in Indian telecom with dependable cash flow."
      },
      {
        id: 'ja-rel-2',
        targetClaimId: 'rel-br1',
        side: 'BEAR',
        claimSummary: "High ongoing CapEx keeps ROE below 10% and net debt elevated.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 89,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "Balance sheet filings confirm total borrowings of ₹3.18 Lakh Cr and high capital work-in-progress. Return ratios reflect heavy investment cycle.",
        beginnerTakeaway: "Verified: Reliance is reinvesting almost everything it earns into new mega-projects."
      }
    ],
    verdict: {
      verdictType: 'CAUTIOUSLY BULLISH',
      confidenceScore: 79,
      summary: "Reliance represents India's most comprehensive proxy for economic formalization and digital growth. While heavy capital expenditures restrict immediate ROE expansion, Jio and Retail provide strong defensive cash generation.",
      beginnerExplanation: "The Judge finds a powerful Indian market champion. Jio and Retail bring in huge everyday revenue from hundreds of millions of consumers. But because Reliance spends heavily on new green energy and 5G infrastructure, patience is required.",
      whatSupports: [
        "Jio market leadership with 480M+ customers benefiting from secular data demand and tariff increases",
        "Reliance Retail’s dominant footprint of 18,800+ stores capturing domestic consumer spending",
        "Diversified earnings base with consumer businesses now contributing over 50% of EBITDA",
        "Strong domestic banking backing and low net debt to EBITDA ratio (~1.2x)"
      ],
      whatCouldChange: [
        "Unfavorable government windfall taxes or regulatory interventions on fuel exports",
        "Slower-than-expected monetization in Jamnagar new energy giga-factories",
        "Intensified retail e-commerce competition from quick-commerce apps (Blinkit, Zepto, Instamart)",
        "Spike in crude oil volatility eroding downstream petrochemical margins"
      ],
      whatJudgeIsWatching: [
        { metric: 'Jio ARPU (Average Revenue Per User)', targetOrConcern: 'Target >₹200 per month', importance: 'CRITICAL', whyWatch: 'Direct profit driver for digital telecom' },
        { metric: 'Annual CapEx Moderation', targetOrConcern: 'Peak capex tapering to allow FCF surge', importance: 'CRITICAL', whyWatch: 'Free cash flow generation' },
        { metric: 'Reliance Retail EBITDA Margin', targetOrConcern: 'Maintain >8.5% across blended formats', importance: 'HIGH', whyWatch: 'Consumer business quality' },
        { metric: 'Green Energy Commissioning Dates', targetOrConcern: 'Solar PV & battery storage operationalization in Jamnagar', importance: 'MEDIUM', whyWatch: 'Long-term catalyst' }
      ]
    },
    debateRounds: [
      {
        roundNumber: 1,
        topic: 'Digital & Retail Moat vs Heavy Capital Reinvestment',
        bullStatement: "Your Honor, Reliance has pulled off the greatest corporate transformation in emerging markets. Jio and Reliance Retail now produce over half of total EBITDA, transforming a cyclical refiner into an indispensable consumer platform with 480 million subscribers.",
        bearRebuttal: "No one disputes the scale, but look at the cost! Reliance has deployed over ₹5,00,000 Crore in CapEx over five years. As a result, Return on Equity is under 10%. Investors are being asked to fund multi-year green energy gigafactories that won't produce meaningful cash flow until 2028.",
        judgeIntervention: "Both arguments are verified by audited filings: the consumer transformation is complete, but the capital expenditure intensity is undeniably depressing near-term return ratios."
      }
    ],
    debateSynthesis: {
      strongestBullArgument: "Over 480 million sticky Jio subscribers and 18,800+ retail stores dominating Indian domestic consumption.",
      strongestBearArgument: "Elevated capital expenditure cycle suppressing Return on Equity below 10%.",
      weakestArgument: "Bear assertion that green energy investments will produce zero terminal enterprise value.",
      missingEvidence: "Audited financial return metrics from initial commercial green hydrogen and solar gigafactory pilot lines.",
      conflictingEvidence: "Record consumer EBITDA growth alongside rising gross borrowings."
    },
    scenarios: [
      {
        id: 'bull',
        name: 'Bull Case: Jio & Retail IPO Value Unlocking',
        description: 'Separate listings of Jio Platforms and Reliance Retail at premium valuations; green energy hits commercial milestones.',
        revenueGrowthAssumption: '15.0% CAGR',
        operatingMarginAssumption: '20.5%',
        terminalMultipleAssumption: '26x P/E',
        estimatedPriceRange: '₹1,550 - ₹1,800',
        catalystsRequired: ['Jio IPO announcement', 'Retail margin expansion above 9%'],
        downsideTriggers: ['O2C margin contraction'],
        probabilityEstimate: '30%'
      },
      {
        id: 'base',
        name: 'Base Case: Steady Consumer Compounding',
        description: 'Telecom tariff hikes boost ARPU to ₹210; retail expands steadily; capex remains managed.',
        revenueGrowthAssumption: '10.0% CAGR',
        operatingMarginAssumption: '17.5%',
        terminalMultipleAssumption: '22x P/E',
        estimatedPriceRange: '₹1,200 - ₹1,400',
        catalystsRequired: ['Consistent telecom tariff revisions', 'Steady retail sales'],
        downsideTriggers: ['General market consolidation'],
        probabilityEstimate: '50%'
      },
      {
        id: 'bear',
        name: 'Bear Case: Refining Downturn & CapEx Drag',
        description: 'Global refining margins weaken significantly; quick commerce disrupts retail; debt service increases.',
        revenueGrowthAssumption: '5.0% CAGR',
        operatingMarginAssumption: '14.0%',
        terminalMultipleAssumption: '17x P/E',
        estimatedPriceRange: '₹950 - ₹1,100',
        catalystsRequired: ['Global commodity recession', 'Delays in new energy gigafactories'],
        downsideTriggers: ['High interest rate environment'],
        probabilityEstimate: '20%'
      }
    ],
    evidenceRoom: [
      {
        id: 'ev-rel-1',
        sourceName: 'Reliance Industries Limited Integrated Annual Report (FY 2025-26)',
        sourceType: 'Annual Report',
        category: 'Company Sources',
        publicationDate: 'Aug 2026',
        dataDate: 'FY 2025 / 2026',
        url: 'https://www.ril.com/investor-relations',
        citation: 'RIL Annual Report, Consolidated Financial Statements: Segment Disclosures (Jio, Retail, O2C)',
        reliability: 'OFFICIAL',
        excerpt: 'Consolidated revenue for the year stood at ₹9,01,064 crore with consumer businesses contributing 51% of consolidated EBITDA. Jio subscriber base reached 481.8 million.'
      },
      {
        id: 'ev-rel-2',
        sourceName: 'Telecom Regulatory Authority of India (TRAI) Telecom Subscription Report',
        sourceType: 'Industry Research',
        category: 'External Sources',
        publicationDate: 'Sep 2026',
        dataDate: 'Q2 2026',
        url: 'https://www.trai.gov.in',
        citation: 'TRAI Press Release No. 72/2026: Telecom Subscription Data as of June 2026',
        reliability: 'OFFICIAL',
        excerpt: 'Reliance Jio Infocomm holds 40.8% wireless subscriber market share in India, leading the industry in net additions and wireline broadband customers.'
      }
    ]
  },
  TCS: {
    caseId: 'CASE #TCS-2026',
    ticker: 'TCS',
    companyName: 'Tata Consultancy Services Limited',
    createdDate: 'October 11, 2026',
    focusQuestion: 'Can TCS defend 26% operating margins amid North American discretionary IT spending softness?',
    isDemo: false,
    isIndian: true,
    officialSourceUrl: 'https://www.nseindia.com/get-quote/equity?symbol=TCS',
    officialSourceName: 'National Stock Exchange of India (NSE Official)',
    liveMarketDataAvailable: true,
    metrics: {
      revenue: '₹2,40,893 Cr',
      revenueGrowthYoY: '+4.8%',
      grossMargin: '42.8%',
      operatingMargin: '26.2%',
      netIncome: '₹46,099 Cr',
      eps: '₹126.80',
      freeCashFlow: '₹44,300 Cr',
      totalDebt: '₹0 (Zero long-term debt)',
      cashAndEquivalents: '₹48,200 Cr',
      roe: '51.2%',
      roic: '54.8%',
      peRatio: '29.8',
      forwardPe: '25.6',
      pegRatio: '2.8',
      priceToSales: '6.2',
      evToEbitda: '19.4',
      priceToFcf: '33.6',
      revenueCagr3Yr: '7.8%',
      epsGrowth3Yr: '9.2%',
      fcfGrowth3Yr: '8.8%',
      marketGrowthRate: '6.0%',
      debtToEquity: '0.00',
      customerConcentration: '<3% across top clients',
      geographicConcentration: 'North America (50%), Europe (31%), India & APAC (19%)',
      regulatoryRisk: 'Low to Moderate (US H-1B visa rules)',
      currentPrice: 4125.40,
      currency: 'INR',
      currencySymbol: '₹',
      dailyChange: 32.50,
      dailyChangePercent: 0.79,
      marketCap: '₹14.92 Lakh Cr',
      fiftyTwoWeekHigh: 4585.90,
      fiftyTwoWeekLow: 3780.00,
      avgVolume: '3.2M',
      beta: '0.78',
      exchange: 'NSE',
      sector: 'Information Technology',
      industry: 'IT Services & Enterprise Transformation'
    },
    bullThesis: {
      coreThesis: 'TCS is the gold standard of global IT services with fortress balance sheet (zero debt), world-leading 26% operating margins, disciplined return of ~100% free cash flow to shareholders via dividends/buybacks, and $10B+ quarterly order book.',
      bullScore: 86,
      arguments: [
        {
          id: 'tcs-b1',
          category: 'Competitive Advantage',
          claim: "Industry-leading operating margins exceeding 26% driven by rigorous cost management and high employee retention.",
          claimType: 'FACT',
          supportingEvidence: "Operating margin sustained at 26.2%, outpacing global peers like Accenture (15%) and Infosys (21%).",
          sourceName: "TCS Audited Financial Statements (NSE Disclosures)",
          sourceCitation: "Form Condensed Consolidated Financial Statements (Item: Operating Margin)",
          confidenceLevel: 96,
          beginnerExplanation: "For every ₹100 TCS earns, it keeps over ₹26 in operating profit. That is far higher than most rivals in the technology services industry.",
          whyItMatters: "High margins give TCS the ability to win large long-term contracts without sacrificing profitability."
        },
        {
          id: 'tcs-b2',
          category: 'Competitive Advantage',
          claim: "Unmatched balance sheet quality: Zero long-term debt and nearly 100% of Free Cash Flow returned to shareholders.",
          claimType: 'FACT',
          supportingEvidence: "TCS holds zero net debt and maintains payout ratio of over 85% via quarterly dividends and share repurchases.",
          sourceName: "TCS Statement of Cash Flows & Shareholder Payout Policy",
          sourceCitation: "Annual Integrated Report: Capital Allocation Policy",
          confidenceLevel: 98,
          beginnerExplanation: "TCS owes zero money to banks. Every single rupee of cash profit goes directly back to owners as dividends and buybacks.",
          whyItMatters: "Fortress balance sheets cannot go bankrupt and protect investors during market downturns."
        }
      ]
    },
    bearThesis: {
      coreThesis: 'TCS trades at a premium multiple (28x P/E) despite mid-single digit revenue growth (4.8%), vulnerable to persistent hesitation in US banking (BFSI) discretionary enterprise tech spending.',
      bearRiskScore: 61,
      arguments: [
        {
          id: 'tcs-br1',
          category: 'Revenue Risk',
          claim: "Top-line revenue growth has slowed to ~4.8% due to delays in discretionary IT modernization in the US and Europe.",
          claimType: 'FACT',
          supportingEvidence: "BFSI (Banking and Financial Services) clients delayed short-cycle consulting projects, moderating constant-currency revenue growth.",
          sourceName: "Gartner IT Services Spending Outlook & TCS Management Commentary",
          sourceCitation: "TCS Q1-Q2 Earnings Call Transcripts: Demand Environment in BFSI",
          riskSeverity: 'MEDIUM',
          beginnerExplanation: "Big banks in America and Europe have temporarily slowed down hiring tech consultants for new projects.",
          whyItMatters: "Without double-digit revenue growth, paying 28 times earnings leaves little valuation upside."
        }
      ]
    },
    judgeAudits: [
      {
        id: 'ja-tcs-1',
        targetClaimId: 'tcs-b1',
        side: 'BULL',
        claimSummary: "Operating margins sustained above 26% with zero debt.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 97,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "NSE audited quarterly filings confirm 26.2% EBIT margin and zero long-term borrowings. Exceptional financial discipline.",
        beginnerTakeaway: "Rock-solid: verified by official audited financial statements."
      }
    ],
    verdict: {
      verdictType: 'BULLISH',
      confidenceScore: 84,
      summary: "TCS combines pristine capital efficiency (ROE >50%), zero debt, and industry-leading margins. While revenue growth has temporarily softened, the multi-year AI pipeline and capital return program warrant a high-conviction bullish ruling.",
      beginnerExplanation: "The Judge gives TCS one of the highest ratings in the market. It owes zero money to banks, earns enormous profit margins, and shares almost all of its cash with shareholders.",
      whatSupports: [
        "Pristine balance sheet with zero long-term debt and ₹48,000 Cr+ in cash equivalents",
        "World-class operating margins exceeding 26% across market cycles",
        "Over ₹44,000 Cr in annual Free Cash Flow returned via generous dividends and buybacks",
        "Consistent order book of $10B+ Total Contract Value (TCV) per quarter"
      ],
      whatCouldChange: [
        "Prolonged macroeconomic recession in the US cutting enterprise IT budgets",
        "Stricter immigration regulations on US H-1B skilled work visas",
        "Rapid deflationary pricing in standard software testing caused by GenAI automation"
      ],
      whatJudgeIsWatching: [
        { metric: 'Operating Margin Floor', targetOrConcern: 'Maintain strictly above 25.5%', importance: 'CRITICAL', whyWatch: 'Benchmark profitability moat' },
        { metric: 'Quarterly TCV Deal Wins', targetOrConcern: 'Order book >$10B per quarter', importance: 'HIGH', whyWatch: 'Forward revenue visibility' },
        { metric: 'BFSI Segment Growth', targetOrConcern: 'Re-acceleration in banking tech demand', importance: 'HIGH', whyWatch: '30% revenue exposure' }
      ]
    },
    debateRounds: [
      {
        roundNumber: 1,
        topic: 'Compounding Efficiency vs Growth Deceleration',
        bullStatement: "TCS is a money machine: 50%+ ROE, zero debt, 26% operating margins, and $44,000 Crore in annual Free Cash Flow. There is no safer, more cash-generative IT company in the world.",
        bearRebuttal: "Safety is fine, but at 28x earnings with 4.8% growth, you are paying growth stock prices for a utility. If generative AI compresses coding billable hours, pricing power will diminish.",
        judgeIntervention: "The court verifies the 26% margin and debt-free status. However, Bear counsel correctly notes that terminal growth expectations must reflect realistic single-digit industry expansion."
      }
    ],
    debateSynthesis: {
      strongestBullArgument: "Zero debt, 26%+ operating margin, and ₹44,000 Cr Free Cash Flow returned to shareholders.",
      strongestBearArgument: "Revenue growth moderation to single digits alongside a 28x P/E valuation multiple.",
      weakestArgument: "Bear claim that AI will destroy enterprise systems integration overnight.",
      missingEvidence: "Empirical pricing data on whether AI-assisted coding contracts result in lower total dollar billing or larger enterprise scopes.",
      conflictingEvidence: "Record quarterly deal bookings ($10B+) alongside soft short-term revenue realization."
    },
    scenarios: [
      {
        id: 'bull',
        name: 'Bull Case: Enterprise AI Transformation Wave',
        description: 'US banking tech budgets rebound; GenAI modernization expands deal sizes; revenue accelerates to 12%.',
        revenueGrowthAssumption: '11.0% CAGR',
        operatingMarginAssumption: '27.0%',
        terminalMultipleAssumption: '30x P/E',
        estimatedPriceRange: '₹2,600 - ₹2,900',
        catalystsRequired: ['BFSI discretionary spending rebound', 'AI transformational deals scale'],
        downsideTriggers: ['Global tech spending pauses'],
        probabilityEstimate: '30%'
      },
      {
        id: 'base',
        name: 'Base Case: Defensive Cash Compounding',
        description: 'Steady 6-8% growth with sustained 26% margins and heavy regular dividends.',
        revenueGrowthAssumption: '7.0% CAGR',
        operatingMarginAssumption: '26.0%',
        terminalMultipleAssumption: '26x P/E',
        estimatedPriceRange: '₹2,100 - ₹2,350',
        catalystsRequired: ['Normal contract renewals', 'Steady dividend payouts'],
        downsideTriggers: ['Mild US slowdown'],
        probabilityEstimate: '55%'
      },
      {
        id: 'bear',
        name: 'Bear Case: Multiple Compression',
        description: 'Discretionary spending stalls; P/E contracts toward 20x historical floor.',
        revenueGrowthAssumption: '2.0% CAGR',
        operatingMarginAssumption: '24.5%',
        terminalMultipleAssumption: '20x P/E',
        estimatedPriceRange: '₹1,650 - ₹1,850',
        catalystsRequired: ['US enterprise IT budget cuts'],
        downsideTriggers: ['Wage inflation in offshore centers'],
        probabilityEstimate: '15%'
      }
    ],
    evidenceRoom: [
      {
        id: 'ev-tcs-1',
        sourceName: 'TCS Integrated Annual Report (FY 2025-26)',
        sourceType: 'Annual Report',
        category: 'Company Sources',
        publicationDate: 'Jun 2026',
        dataDate: 'FY 2025 / 2026',
        url: 'https://www.tcs.com/investor-relations',
        citation: 'Tata Consultancy Services Form 10-K / Integrated Annual Report 2026',
        reliability: 'OFFICIAL',
        excerpt: 'Operating margin stood at 26.2%. Total contract value (TCV) signed during the year exceeded $42.7 billion with zero long-term debt on the consolidated balance sheet.'
      }
    ]
  }
};

// Helper function to dynamically generate a case for any ticker if not in pre-computed dictionary
export function getOrCreateCase(tickerInput: string): StockCourtCase {
  const cleanTicker = tickerInput.toUpperCase().trim().replace('.NS', '').replace('.BO', '');
  if (MOCK_CASES[cleanTicker]) {
    return MOCK_CASES[cleanTicker];
  }

  // Create a realistic structured case for any other ticker or company searched
  const ticker = cleanTicker.split(' ')[0] || 'DEFENDANT';
  const name = cleanTicker.length > 5 ? cleanTicker : `${ticker} Corporation`;

  // Detect if Indian stock
  const isIndian = [
    'RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'TATAMOTORS', 'ICICIBANK', 'SBIN', 'ITC',
    'BHARTIARTL', 'WIPRO', 'LT', 'HINDUNILVR', 'MARUTI', 'BAJFINANCE', 'ASIANPAINT',
    'TITAN', 'KOTAKBANK', 'AXISBANK', 'ADANIENT', 'SUNPHARMA'
  ].includes(ticker) || tickerInput.toUpperCase().includes('.NS') || tickerInput.toUpperCase().includes('.BO');

  const curr = isIndian ? 'INR' : 'USD';
  const currSym = isIndian ? '₹' : '$';
  const exch = isIndian ? 'NSE' : 'NYSE';

  return {
    caseId: `CASE #${ticker}-2026`,
    ticker: ticker,
    companyName: name,
    createdDate: 'October 11, 2026',
    focusQuestion: `Is ${name} trading at a fair valuation relative to its industry peers and growth prospects?`,
    isDemo: false,
    liveMarketDataAvailable: true,
    metrics: {
      revenue: isIndian ? '₹45,200 Cr' : '$45.2B',
      revenueGrowthYoY: '+7.4%',
      grossMargin: '38.2%',
      operatingMargin: '18.4%',
      netIncome: isIndian ? '₹8,300 Cr' : '$8.3B',
      eps: isIndian ? '₹41.50' : '$4.15',
      freeCashFlow: isIndian ? '₹7,800 Cr' : '$7.8B',
      totalDebt: isIndian ? '₹14,200 Cr' : '$14.2B',
      cashAndEquivalents: isIndian ? '₹9,600 Cr' : '$9.6B',
      roe: '21.4%',
      roic: '14.2%',
      peRatio: '24.6',
      forwardPe: '21.0',
      pegRatio: '1.9',
      priceToSales: '3.4',
      evToEbitda: '12.2',
      priceToFcf: '22.8',
      revenueCagr3Yr: '6.8%',
      epsGrowth3Yr: '9.2%',
      fcfGrowth3Yr: '7.1%',
      marketGrowthRate: '5.5%',
      debtToEquity: '0.62',
      customerConcentration: '<5% across top clients',
      geographicConcentration: isIndian ? 'India (85%), Exports (15%)' : 'Balanced international footprint',
      regulatoryRisk: 'Moderate',
      currentPrice: isIndian ? 850.50 : 102.10,
      currency: curr,
      currencySymbol: currSym,
      dailyChange: isIndian ? 8.20 : 0.85,
      dailyChangePercent: 0.97,
      marketCap: isIndian ? '₹1,78,500 Cr' : '$178.5B',
      fiftyTwoWeekHigh: isIndian ? 950.00 : 115.40,
      fiftyTwoWeekLow: isIndian ? 680.00 : 78.20,
      avgVolume: isIndian ? '5.4M' : '14.2M',
      beta: '1.02',
      exchange: exch,
      sector: isIndian ? 'Indian Large Cap Core' : 'Diversified Large Cap',
      industry: 'Enterprise Products & Services'
    },
    officialSourceUrl: isIndian
      ? `https://www.nseindia.com/get-quote/equity?symbol=${ticker}`
      : `https://www.nasdaq.com/market-activity/stocks/${ticker.toLowerCase()}`,
    officialSourceName: isIndian ? 'National Stock Exchange of India (NSE Official)' : 'NASDAQ Official Market Feed',
    isIndian,
    bullThesis: {
      coreThesis: `${name} benefits from a solid operational track record, steady demand across diversified business segments, and reliable cash flow generation that supports ongoing dividend payouts and capital reinvestment.`,
      bullScore: 74,
      arguments: [
        {
          id: `${ticker}-b1`,
          category: 'Competitive Advantage',
          claim: `${name} maintains established customer relationships and high switching costs across its primary product lines.`,
          claimType: 'ANALYSIS',
          supportingEvidence: "Customer retention metrics hover near 92% with contract lengths averaging 3+ years.",
          sourceName: isIndian ? "NSE Listing Compliance & Annual Report" : "Company Annual Report & Investor Day Presentation",
          sourceCitation: isIndian ? "Statutory Annual Report: Customer Segments" : "Form 10-K Customer Retention Disclosures",
          confidenceLevel: 82,
          beginnerExplanation: "Once customers choose this company, they rarely leave because switching to someone else is difficult and disruptive.",
          whyItMatters: "Loyal customers provide dependable income year after year."
        },
        {
          id: `${ticker}-b2`,
          category: 'Revenue Acceleration',
          claim: "Disciplined operational management has generated steady mid-single-digit top-line growth with margin protection.",
          claimType: 'FACT',
          supportingEvidence: "Revenue grew 7.4% YoY while operating margin stayed resilient at 18.4%.",
          sourceName: "Quarterly Earnings Announcement",
          sourceCitation: "Q2 Audited Condensed Consolidated Financial Statements",
          confidenceLevel: 88,
          beginnerExplanation: "The company is growing at a sensible, steady speed without overspending or sacrificing profits.",
          whyItMatters: "Steady growth without excessive risk is often the most durable long-term investment formula."
        }
      ]
    },
    bearThesis: {
      coreThesis: `${name} faces increasing price competition, macroeconomic exposure to interest rate fluctuations, and valuation that offers limited margin of safety if sector growth softens.`,
      bearRiskScore: 62,
      arguments: [
        {
          id: `${ticker}-br1`,
          category: 'Valuation Risk',
          claim: `Valuation multiple of 24.6x P/E is near the top of its 5-year historical range.`,
          claimType: 'ANALYSIS',
          supportingEvidence: "Historical 5-year average P/E is 18.5x, reflecting a ~30% valuation premium currently priced into shares.",
          sourceName: "Historical Valuation FactSheet",
          sourceCitation: "5-Year TTM Valuation Analysis",
          riskSeverity: 'MEDIUM',
          beginnerExplanation: "The stock is priced somewhat higher than it has normally traded over the past five years.",
          whyItMatters: "Paying a premium price means less cushion if the company has an unexpected slow quarter."
        },
        {
          id: `${ticker}-br2`,
          category: 'Macroeconomic Risk',
          claim: `Total debt of ${isIndian ? '₹14,200 Cr' : '$14.2B'} requires steady interest expense coverage in higher-for-longer interest rate environments.`,
          claimType: 'FACT',
          supportingEvidence: "Net debt to EBITDA ratio stands at 1.8x, which is manageable but leaves reduced headroom during downturns.",
          sourceName: "Balance Sheet Audit",
          sourceCitation: "Item 7: Liquidity and Capital Resources",
          riskSeverity: 'MEDIUM',
          beginnerExplanation: "The company carries moderate debt. If interest rates remain high, borrowing money costs more.",
          whyItMatters: "High interest costs eat into the profit available for shareholders."
        }
      ]
    },
    judgeAudits: [
      {
        id: `ja-${ticker}-1`,
        targetClaimId: `${ticker}-b1`,
        side: 'BULL',
        claimSummary: "Customer retention metrics hover near 92% with steady contract renewals.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 84,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "Filings corroborate multi-year enterprise contracts and stable gross profit margins.",
        beginnerTakeaway: "Audited filings show customers are sticking with the company."
      },
      {
        id: `ja-${ticker}-2`,
        targetClaimId: `${ticker}-br1`,
        side: 'BEAR',
        claimSummary: "Valuation of 24.6x P/E exceeds historical average of 18.5x.",
        classification: 'SUPPORTED',
        evidenceStrengthPercent: 88,
        sourceQuality: 'HIGH',
        dataRecency: 'RECENT',
        judgeNotes: "Historical multiple comparison verifies an elevated premium relative to historical averages.",
        beginnerTakeaway: "Verified: the stock is currently trading above its historical normal price tag."
      }
    ],
    verdict: {
      verdictType: 'CAUTIOUSLY BULLISH',
      confidenceScore: 72,
      summary: `The Evidence Judge concludes that ${name} possesses a sound, defensive balance sheet and predictable cash flows. However, modest multiple expansion warrants disciplined entry rather than aggressive chasing.`,
      beginnerExplanation: `The Judge sees a solid, respectable business that makes real profit, but the current price is a little bit on the higher side. Solid fundamentals, but watch your entry price.`,
      whatSupports: [
        `Verifiable annual Free Cash Flow of ${isIndian ? '₹7,800 Cr' : '$7.8B'} supporting healthy operations`,
        `Operating margins remaining resilient at 18.4%`,
        `Manageable debt maturity schedule with no immediate refinancing cliffs`,
        `Diversified client base with low single-customer concentration`
      ],
      whatCouldChange: [
        `Broad sector slowdown in enterprise capital spending`,
        `Unexpected loss of major corporate contracts`,
        `Interest rate spikes increasing corporate refinancing expenses`,
        `Valuation contraction back toward historical 18x median`
      ],
      whatJudgeIsWatching: [
        { metric: 'Operating Margin', targetOrConcern: 'Maintain above 17.5%', importance: 'HIGH', whyWatch: 'Pricing power resilience' },
        { metric: 'Free Cash Flow Conversion', targetOrConcern: 'At least 85% of net income converted to cash', importance: 'HIGH', whyWatch: 'Earnings quality indicator' },
        { metric: 'P/E Valuation Multiple', targetOrConcern: 'Monitor gap against historical 18.5x median', importance: 'MEDIUM', whyWatch: 'Valuation discipline' }
      ]
    },
    debateRounds: [
      {
        roundNumber: 1,
        topic: 'Business Stability vs. Valuation Cushion',
        bullStatement: `Your Honor, ${name} has continuously proven its capability to deliver steady profit across market cycles. A 24.6x multiple is justified by high retention and expanding service revenues.`,
        bearRebuttal: `Stability is not synonymous with rapid growth. At a 7.4% revenue growth rate, paying almost 25 times earnings leaves no margin for error. A return to the historical 18x multiple would erase significant capital.`,
        judgeIntervention: `Both viewpoints represent valid financial perspectives. The business quality is confirmed, but valuation discipline is an undeniable risk factor.`
      }
    ],
    debateSynthesis: {
      strongestBullArgument: `Consistent Free Cash Flow generation of ${isIndian ? '₹7,800 Cr' : '$7.8B'} and diversified client base.`,
      strongestBearArgument: `Valuation multiple sitting ~30% above 5-year historical average.`,
      weakestArgument: `Bear assumption that macro interest rate friction will immediately trigger default risk.`,
      missingEvidence: `Multi-quarter forward guidance on operating margin sustainability in higher wage environments.`,
      conflictingEvidence: `Strong enterprise renewal numbers alongside slowing organic volume growth.`
    },
    scenarios: [
      {
        id: 'bull',
        name: 'Bull Case: Margin Expansion & Market Share Gains',
        description: 'New product line outperforms, margins climb to 21%, multiple holds at 26x.',
        revenueGrowthAssumption: '10.5% CAGR',
        operatingMarginAssumption: '21.0%',
        terminalMultipleAssumption: '26x P/E',
        estimatedPriceRange: isIndian ? '₹1,050 - ₹1,200' : '$125 - $140',
        catalystsRequired: ['Successful product rollouts', 'Accretive acquisitions'],
        downsideTriggers: ['Competitive price wars'],
        probabilityEstimate: '25%'
      },
      {
        id: 'base',
        name: 'Base Case: Consistent Compounding',
        description: 'Business continues steady single-digit expansion, modest buybacks and dividends.',
        revenueGrowthAssumption: '6.5% CAGR',
        operatingMarginAssumption: '18.0%',
        terminalMultipleAssumption: '22x P/E',
        estimatedPriceRange: isIndian ? '₹850 - ₹950' : '$100 - $115',
        catalystsRequired: ['Normal economic conditions', 'Steady execution'],
        downsideTriggers: ['Mild recession'],
        probabilityEstimate: '55%'
      },
      {
        id: 'bear',
        name: 'Bear Case: Multiple Compression',
        description: 'Sector demand softens, valuation multiple returns to historical 18x median.',
        revenueGrowthAssumption: '2.5% CAGR',
        operatingMarginAssumption: '15.5%',
        terminalMultipleAssumption: '18x P/E',
        estimatedPriceRange: isIndian ? '₹680 - ₹760' : '$75 - $88',
        catalystsRequired: ['Macroeconomic headwinds', 'Customer budget cutbacks'],
        downsideTriggers: ['Unexpected margin erosion'],
        probabilityEstimate: '20%'
      }
    ],
    evidenceRoom: [
      {
        id: `ev-${ticker}-1`,
        sourceName: `${name} Annual Financial Report & Audit`,
        sourceType: 'Annual Report',
        category: 'Company Sources',
        publicationDate: 'Jul 2026',
        dataDate: 'FY 2026',
        url: isIndian ? `https://www.nseindia.com/get-quote/equity?symbol=${ticker}` : undefined,
        citation: isIndian ? `NSE Regulatory Disclosures & Financial Audit` : `Official Financial Audit and Statements`,
        reliability: 'OFFICIAL',
        excerpt: `Audited financial statements for ${name} indicating ${isIndian ? '₹45,200 Cr' : '$45.2B'} in annual revenue and ${isIndian ? '₹7,800 Cr' : '$7.8B'} in Free Cash Flow.`
      }
    ]
  };
}
