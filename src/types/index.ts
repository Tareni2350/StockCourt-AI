export type ExperienceLevel = 'beginner' | 'advanced';

export type VerdictType =
  | 'BULLISH'
  | 'CAUTIOUSLY BULLISH'
  | 'NEUTRAL'
  | 'CAUTIOUSLY BEARISH'
  | 'BEARISH'
  | 'INSUFFICIENT EVIDENCE';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type JudgeClassification =
  | 'SUPPORTED'
  | 'PARTIALLY SUPPORTED'
  | 'WEAKLY SUPPORTED'
  | 'CONTRADICTED'
  | 'INSUFFICIENT DATA';

export type ClaimType = 'FACT' | 'ANALYSIS' | 'ASSUMPTION' | 'SPECULATION';

export interface FinancialMetrics {
  // Fundamentals
  revenue: string;
  revenueGrowthYoY: string;
  grossMargin: string;
  operatingMargin: string;
  netIncome: string;
  eps: string;
  freeCashFlow: string;
  totalDebt: string;
  cashAndEquivalents: string;
  roe: string;
  roic: string;

  // Valuation
  peRatio: string;
  forwardPe: string;
  pegRatio: string;
  priceToSales: string;
  evToEbitda: string;
  priceToFcf: string;

  // Growth
  revenueCagr3Yr: string;
  epsGrowth3Yr: string;
  fcfGrowth3Yr: string;
  marketGrowthRate: string;

  // Risk factors
  debtToEquity: string;
  customerConcentration: string;
  geographicConcentration: string;
  regulatoryRisk: string;

  // Market
  currentPrice: number;
  currency: string;
  currencySymbol?: string;
  realTimeSource?: string;
  lastUpdated?: string;
  dailyChange: number;
  dailyChangePercent: number;
  marketCap: string;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  avgVolume: string;
  beta: string;
  exchange: string;
  sector: string;
  industry: string;
}

export interface EvidenceItem {
  id: string;
  sourceName: string;
  sourceType: 'Company Filing' | 'SEC Filing' | 'Quarterly Report' | 'Annual Report' | 'Market Data' | 'Industry Research' | 'Financial Press';
  category: 'Company Sources' | 'Market Data' | 'External Sources';
  publicationDate: string;
  dataDate: string;
  url?: string;
  citation: string;
  reliability: 'OFFICIAL' | 'VERIFIED' | 'THIRD_PARTY' | 'UNVERIFIED';
  excerpt: string;
}

export interface BullArgument {
  id: string;
  category: 'Growth Opportunity' | 'Competitive Advantage' | 'Revenue Acceleration' | 'Industry Tailwind' | 'Management Strength' | 'Catalyst' | 'Product Opportunity';
  claim: string;
  claimType: ClaimType;
  supportingEvidence: string;
  sourceName: string;
  sourceCitation: string;
  confidenceLevel: number; // 0-100%
  beginnerExplanation: string;
  whyItMatters: string;
}

export interface BearArgument {
  id: string;
  category: 'Valuation Risk' | 'Revenue Risk' | 'Competitive Threat' | 'Regulatory Concern' | 'Debt & Leverage' | 'Margin Pressure' | 'Product Dependence' | 'Macroeconomic Risk' | 'Downside Catalyst' | 'Customer Concentration';
  claim: string;
  claimType: ClaimType;
  supportingEvidence: string;
  sourceName: string;
  sourceCitation: string;
  riskSeverity: RiskLevel;
  beginnerExplanation: string;
  whyItMatters: string;
}

export interface JudgeEvaluation {
  id: string;
  targetClaimId: string;
  side: 'BULL' | 'BEAR';
  claimSummary: string;
  classification: JudgeClassification;
  evidenceStrengthPercent: number; // 0-100
  sourceQuality: 'HIGH' | 'MEDIUM' | 'LOW';
  dataRecency: 'RECENT' | 'MODERATE' | 'OUTDATED';
  judgeNotes: string;
  beginnerTakeaway: string;
}

export interface FinalVerdict {
  verdictType: VerdictType;
  confidenceScore: number; // 0-100%
  summary: string;
  beginnerExplanation: string;
  whatSupports: string[];
  whatCouldChange: string[];
  whatJudgeIsWatching: {
    metric: string;
    targetOrConcern: string;
    importance: 'HIGH' | 'CRITICAL' | 'MEDIUM';
    whyWatch: string;
  }[];
}

export interface DebateTurn {
  speaker: 'BULL' | 'BEAR' | 'JUDGE';
  round: number;
  statement: string;
  counterpointTo?: string;
  citedFact?: string;
  judgeObservation?: string;
}

export interface DebateRound {
  roundNumber: number;
  topic: string;
  bullStatement: string;
  bearRebuttal: string;
  judgeIntervention: string;
}

export interface DebateSynthesis {
  strongestBullArgument: string;
  strongestBearArgument: string;
  weakestArgument: string;
  missingEvidence: string;
  conflictingEvidence: string;
}

export interface ScenarioAssumption {
  id: 'bull' | 'base' | 'bear';
  name: string;
  description: string;
  revenueGrowthAssumption: string;
  operatingMarginAssumption: string;
  terminalMultipleAssumption: string;
  estimatedPriceRange: string;
  catalystsRequired: string[];
  downsideTriggers: string[];
  probabilityEstimate: string;
}

export interface CrossExaminationItem {
  id: string;
  examiner: 'BULL' | 'BEAR' | 'USER';
  targetSide: 'BULL' | 'BEAR';
  question: string;
  targetDefense: string;
  judicialRuling: {
    status: 'SUSTAINED' | 'OVERRULED' | 'NOTED';
    rulingExplanation: string;
    verifiedFilingBasis: string;
  };
}

export interface StockCourtCase {
  caseId: string;
  ticker: string;
  companyName: string;
  createdDate: string;
  focusQuestion: string;
  isDemo?: boolean;
  isIndian?: boolean;
  officialSourceUrl?: string;
  officialSourceName?: string;
  chartPoints?: { time: string; price: number; timestamp?: number }[];
  metrics: FinancialMetrics;
  liveMarketDataAvailable: boolean;
  bullThesis: {
    coreThesis: string;
    arguments: BullArgument[];
    bullScore: number;
  };
  bearThesis: {
    coreThesis: string;
    arguments: BearArgument[];
    bearRiskScore: number;
  };
  judgeAudits: JudgeEvaluation[];
  verdict: FinalVerdict;
  debateRounds: DebateRound[];
  debateSynthesis: DebateSynthesis;
  scenarios: ScenarioAssumption[];
  evidenceRoom: EvidenceItem[];
  crossExaminations?: CrossExaminationItem[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category: 'Basics' | 'Financial Metrics' | 'Valuation' | 'Courtroom Terms' | 'Risk & Growth';
  simpleDefinition: string;
  practicalExample: string;
  whyItMatters: string;
  whatToLookFor: string;
  courtroomTranslation?: string;
  relatedTerms: string[];
}

export interface LearningLesson {
  id: string;
  title: string;
  duration: string;
  content: string[];
  keyTakeaway: string;
  practicalExercise: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface LearningModule {
  level: number;
  title: string;
  description: string;
  badge: string;
  lessons: LearningLesson[];
}

export interface UserProfile {
  name: string;
  email: string;
  preferredLevel: ExperienceLevel;
  joinedDate: string;
  watchlist: string[]; // tickers
  caseHistory: {
    caseId: string;
    ticker: string;
    companyName: string;
    date: string;
    verdict: VerdictType;
  }[];
}
