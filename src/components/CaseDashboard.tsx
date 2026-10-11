import React, { useState } from 'react';
import {
  Gavel, Scale, TrendingUp, AlertTriangle, ShieldCheck, HelpCircle,
  Eye, MessageSquare, ChevronDown, ChevronUp, Bookmark, BookmarkCheck,
  CheckCircle2, Clock, FileText, ArrowRight, Activity, Percent, DollarSign,
  Layers, ExternalLink, Info, Sparkles, BookOpen, GraduationCap, X
} from 'lucide-react';
import { StockCourtCase, ExperienceLevel, RiskLevel, JudgeClassification, ClaimType } from '../types';
import { StockPriceChart } from './StockPriceChart';
import { CourtroomCrossExamination } from './CourtroomCrossExamination';

interface Props {
  courtCase: StockCourtCase;
  experienceLevel: ExperienceLevel;
  onOpenWhatDoesThisMean: (termId: string) => void;
  onOpenChallengeClaim: (claim: string, side: 'BULL' | 'BEAR', sourceName?: string) => void;
  onOpenEvidenceRoom: () => void;
  onOpenDebate: () => void;
  onOpenScenarios: () => void;
  onOpenWatchthrough?: () => void;
  onOpenFreeResources?: () => void;
  isSavedInWatchlist: boolean;
  onToggleWatchlist: () => void;
}

export const CaseDashboard: React.FC<Props> = ({
  courtCase,
  experienceLevel,
  onOpenWhatDoesThisMean,
  onOpenChallengeClaim,
  onOpenEvidenceRoom,
  onOpenDebate,
  onOpenScenarios,
  onOpenWatchthrough,
  onOpenFreeResources,
  isSavedInWatchlist,
  onToggleWatchlist
}) => {
  const [mobileTab, setMobileTab] = useState<'bull' | 'bear' | 'judge'>('bull');
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(experienceLevel === 'advanced');
  const [verdictView, setVerdictView] = useState<'simplified' | 'judicial'>('simplified');

  const { metrics, bullThesis, bearThesis, judgeAudits, verdict } = courtCase;
  const isIndian = courtCase.isIndian || metrics.currency === 'INR' || metrics.currencySymbol === '₹';
  const currencySymbol = metrics.currencySymbol || (isIndian ? '₹' : '$');

  // Official exchange source URL fallback
  const officialSourceUrl =
    courtCase.officialSourceUrl ||
    (isIndian
      ? `https://www.nseindia.com/get-quote/equity?symbol=${encodeURIComponent(courtCase.ticker)}`
      : `https://www.nasdaq.com/market-activity/stocks/${encodeURIComponent(courtCase.ticker.toLowerCase())}`);

  const officialSourceName =
    courtCase.officialSourceName ||
    (isIndian ? 'National Stock Exchange of India (NSE Official)' : 'NASDAQ Official Exchange');

  // Helper for Judge badge colors
  const getClassificationBadge = (c: JudgeClassification) => {
    switch (c) {
      case 'SUPPORTED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'PARTIALLY SUPPORTED':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'WEAKLY SUPPORTED':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'CONTRADICTED':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'INSUFFICIENT DATA':
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600';
    }
  };

  // Helper for Risk badge colors
  const getRiskBadge = (r: RiskLevel) => {
    switch (r) {
      case 'CRITICAL':
        return 'bg-red-600/30 text-red-300 border-red-500 font-bold animate-pulse';
      case 'HIGH':
        return 'bg-orange-600/30 text-orange-300 border-orange-500 font-semibold';
      case 'MEDIUM':
        return 'bg-yellow-600/30 text-yellow-300 border-yellow-500';
      case 'LOW':
      default:
        return 'bg-slate-700/30 text-slate-300 border-slate-600';
    }
  };

  // Helper for Verdict styles
  const getVerdictStyle = (vt: string) => {
    switch (vt) {
      case 'BULLISH':
        return { text: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-950/20', icon: '🟢' };
      case 'CAUTIOUSLY BULLISH':
        return { text: 'text-amber-300', border: 'border-amber-500/40', bg: 'bg-amber-950/20', icon: '🟡' };
      case 'NEUTRAL':
        return { text: 'text-slate-300', border: 'border-slate-500/40', bg: 'bg-slate-900/40', icon: '⚪' };
      case 'CAUTIOUSLY BEARISH':
        return { text: 'text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-950/20', icon: '🟠' };
      case 'BEARISH':
        return { text: 'text-red-400', border: 'border-red-500/40', bg: 'bg-red-950/20', icon: '🔴' };
      case 'INSUFFICIENT EVIDENCE':
      default:
        return { text: 'text-slate-400', border: 'border-slate-700', bg: 'bg-slate-950', icon: '⚫' };
    }
  };

  const verdictStyle = getVerdictStyle(verdict.verdictType);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* 1. EXPERIENCE LEVEL DISTINCTION BANNER */}
      {experienceLevel === 'beginner' ? (
        <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs animate-fade-in shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🌱</span>
            <div>
              <span className="font-bold text-emerald-300 uppercase tracking-wider font-mono mr-2">
                Beginner Research Mode:
              </span>
              <span className="text-slate-200">
                Financial jargon is translated into everyday language with visual analogies and plain-English takeaways.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenFreeResources && (
              <button
                onClick={onOpenFreeResources}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1 transition cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Free Learning Hub</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3.5 bg-slate-900/90 border border-amber-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs animate-fade-in shadow-md font-mono">
          <div className="flex items-center gap-2.5">
            <span className="text-base">📊</span>
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wider mr-2">
                Advanced Terminal Mode:
              </span>
              <span className="text-slate-200 font-sans">
                Full institutional multiples (EV/EBITDA, ROIC vs WACC), regulatory item citations, and raw statutory filings.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
              High Density
            </span>
          </div>
        </div>
      )}

      {/* 2. COURT DOCKET HEADER */}
      <div className="relative bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold tracking-wider">
                {courtCase.caseId}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Filed on {courtCase.createdDate}
              </span>
              {courtCase.isDemo && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono font-bold">
                  DEMO DATA
                </span>
              )}
              {isIndian && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold flex items-center gap-1">
                  <span>🇮🇳</span>
                  <span>NSE / INDIAN MARKET</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white flex flex-wrap items-center gap-3">
              <span>THE PEOPLE vs. {courtCase.ticker}</span>
              <span className="text-xs font-sans px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-normal">
                {courtCase.companyName}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 italic">
              "{courtCase.focusQuestion}"
            </p>
          </div>

          {/* Quick Actions & Bookmark */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onToggleWatchlist}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                isSavedInWatchlist
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {isSavedInWatchlist ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-amber-400" />
                  Saved in Watchlist
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  Save to Watchlist
                </>
              )}
            </button>

            <button
              onClick={onOpenDebate}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Courtroom Debate
            </button>

            <button
              onClick={onOpenEvidenceRoom}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              Evidence Room
            </button>

            <button
              onClick={onOpenScenarios}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              What If? Scenarios
            </button>

            {onOpenWatchthrough && (
              <button
                onClick={onOpenWatchthrough}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-950/40 hover:bg-purple-900/40 text-purple-200 border border-purple-500/40 flex items-center gap-1.5 transition cursor-pointer"
                title="Watch interactive courtroom walkthrough"
              >
                <span>🎬</span>
                <span>Watch Walkthrough</span>
              </button>
            )}

            {onOpenFreeResources && (
              <button
                onClick={onOpenFreeResources}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-200 border border-emerald-500/40 flex items-center gap-1.5 transition cursor-pointer"
                title="Free Verified Stock Learning Portals"
              >
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Free Sources</span>
              </button>
            )}
          </div>
        </div>

        {/* PRICE & LIVE FEED WITH OFFICIAL REDIRECT SYMBOL */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              {currencySymbol}{metrics.currentPrice.toFixed(2)}
            </span>
            <span
              className={`text-sm sm:text-base font-mono font-bold flex items-center gap-1 ${
                metrics.dailyChange >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {metrics.dailyChange >= 0 ? '+' : ''}
              {currencySymbol}{metrics.dailyChange.toFixed(2)} (
              {metrics.dailyChange >= 0 ? '+' : ''}
              {metrics.dailyChangePercent.toFixed(2)}%)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {metrics.exchange} • {metrics.currency}
              {metrics.lastUpdated && ` • Updated ${metrics.lastUpdated}`}
            </span>
          </div>

          {/* OFFICIAL EXCHANGE REDIRECT BADGE */}
          <div className="flex items-center gap-2">
            <a
              href={officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition shadow-sm cursor-pointer"
              title={`Click to verify real-time price on official exchange: ${officialSourceName}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Feed: {isIndian ? 'NSE India' : 'NASDAQ'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>
          </div>
        </div>

        {/* 3. INTERACTIVE STOCK PRICE CHART */}
        <div className="mt-4">
          <StockPriceChart
            ticker={courtCase.ticker}
            currentPrice={metrics.currentPrice}
            dailyChange={metrics.dailyChange}
            dailyChangePercent={metrics.dailyChangePercent}
            currencySymbol={currencySymbol}
            fiftyTwoWeekHigh={metrics.fiftyTwoWeekHigh}
            fiftyTwoWeekLow={metrics.fiftyTwoWeekLow}
            exchange={metrics.exchange}
            officialSourceUrl={officialSourceUrl}
            officialSourceName={officialSourceName}
            isIndian={isIndian}
            initialPoints={courtCase.chartPoints}
          />
        </div>

        {/* 4. KEY FUNDAMENTAL NUMBERS DASHBOARD */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Key Fundamental Metrics
            </span>
            <button
              onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono transition cursor-pointer"
            >
              <span>{showAdvancedMetrics ? 'Hide Full Multiples' : 'Show Full Multiples Table'}</span>
              {showAdvancedMetrics ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Revenue */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl relative group">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Revenue (TTM)</span>
                <button
                  onClick={() => onOpenWhatDoesThisMean('revenue')}
                  className="text-slate-500 hover:text-amber-400 transition"
                  title="What is Revenue?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">{metrics.revenue}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                YoY: <span className="text-emerald-400">{metrics.revenueGrowthYoY}</span>
              </div>
              {experienceLevel === 'beginner' && (
                <div className="mt-1 text-[10px] text-emerald-400 font-sans font-medium">
                  🏷️ Total money collected
                </div>
              )}
            </div>

            {/* Operating Margin */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl relative group">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Operating Margin</span>
                <button
                  onClick={() => onOpenWhatDoesThisMean('operating-margin')}
                  className="text-slate-500 hover:text-amber-400 transition"
                  title="What is Operating Margin?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">{metrics.operatingMargin}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Gross: {metrics.grossMargin}
              </div>
              {experienceLevel === 'beginner' && (
                <div className="mt-1 text-[10px] text-emerald-400 font-sans font-medium">
                  🏷️ Profit kept per {currencySymbol}100
                </div>
              )}
            </div>

            {/* P/E Ratio */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl relative group">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>P/E Ratio</span>
                <button
                  onClick={() => onOpenWhatDoesThisMean('pe-ratio')}
                  className="text-slate-500 hover:text-amber-400 transition"
                  title="What is P/E Ratio?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-amber-300">{metrics.peRatio}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Forward P/E: {metrics.forwardPe}
              </div>
              {experienceLevel === 'beginner' && (
                <div className="mt-1 text-[10px] text-amber-300 font-sans font-medium">
                  🏷️ Price tag vs earnings
                </div>
              )}
            </div>

            {/* Free Cash Flow */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl relative group">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Free Cash Flow</span>
                <button
                  onClick={() => onOpenWhatDoesThisMean('free-cash-flow')}
                  className="text-slate-500 hover:text-amber-400 transition"
                  title="What is Free Cash Flow?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">{metrics.freeCashFlow}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                P/FCF: {metrics.priceToFcf}
              </div>
              {experienceLevel === 'beginner' && (
                <div className="mt-1 text-[10px] text-emerald-400 font-sans font-medium">
                  🏷️ Pure cash in pocket
                </div>
              )}
            </div>

            {/* Total Debt */}
            <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl relative group">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Total Debt</span>
                <button
                  onClick={() => onOpenWhatDoesThisMean('debt')}
                  className="text-slate-500 hover:text-amber-400 transition"
                  title="What is Debt?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-200">{metrics.totalDebt}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Cash: {metrics.cashAndEquivalents}
              </div>
              {experienceLevel === 'beginner' && (
                <div className="mt-1 text-[10px] text-slate-400 font-sans font-medium">
                  🏷️ Bank loans & obligations
                </div>
              )}
            </div>
          </div>

          {/* ADVANCED EXPANDED METRICS TABLE */}
          {showAdvancedMetrics && (
            <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl animate-fade-in text-xs space-y-3 font-mono">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                Institutional Financial Multiples & Efficiency
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">Market Cap</div>
                  <div className="text-white font-bold">{metrics.marketCap}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">Return on Equity (ROE)</div>
                  <div className="text-emerald-400 font-bold">{metrics.roe}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">ROIC vs WACC</div>
                  <div className="text-emerald-400 font-bold">{metrics.roic}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">PEG Ratio</div>
                  <div className="text-amber-300 font-bold">{metrics.pegRatio}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">EV / EBITDA</div>
                  <div className="text-white font-bold">{metrics.evToEbitda}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">Debt-to-Equity</div>
                  <div className="text-white font-bold">{metrics.debtToEquity}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">Price / Sales</div>
                  <div className="text-white font-bold">{metrics.priceToSales}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">3-Yr EPS CAGR</div>
                  <div className="text-emerald-400 font-bold">{metrics.epsGrowth3Yr}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">Beta (Volatility)</div>
                  <div className="text-white font-bold">{metrics.beta}</div>
                </div>
                <div className="p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">Avg Daily Volume</div>
                  <div className="text-white font-bold">{metrics.avgVolume}</div>
                </div>
                <div className="sm:col-span-2 p-2 bg-slate-900/60 rounded">
                  <div className="text-slate-500 text-[10px]">Geographic Footprint</div>
                  <div className="text-white font-bold line-clamp-1">{metrics.geographicConcentration}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE TABS (For converting 3 panels into tabs on small screens) */}
      <div className="lg:hidden flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => setMobileTab('bull')}
          className={`flex-1 py-2 font-bold rounded-lg transition ${
            mobileTab === 'bull' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400'
          }`}
        >
          🟢 BULL ANALYST
        </button>
        <button
          onClick={() => setMobileTab('bear')}
          className={`flex-1 py-2 font-bold rounded-lg transition ${
            mobileTab === 'bear' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'text-slate-400'
          }`}
        >
          🔴 BEAR ANALYST
        </button>
        <button
          onClick={() => setMobileTab('judge')}
          className={`flex-1 py-2 font-bold rounded-lg transition ${
            mobileTab === 'judge' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-400'
          }`}
        >
          ⚖️ EVIDENCE JUDGE
        </button>
      </div>

      {/* 5. BULL ANALYST & BEAR ANALYST PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PANEL 1: BULL ANALYST */}
        <div
          className={`bg-[#0d1322] border border-emerald-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between ${
            mobileTab !== 'bull' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-4">
              <h2 className="text-lg font-bold font-cinzel text-emerald-400 flex items-center gap-1.5">
                🟢 BULL ANALYST
              </h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Bull Score: {bullThesis.bullScore}/100
              </span>
            </div>

            <div className="mb-4 p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{bullThesis.coreThesis}"
              </p>
            </div>

            <div className="space-y-4">
              {bullThesis.arguments.map((arg) => (
                <div
                  key={arg.id}
                  className="p-3.5 bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-semibold uppercase">
                      {arg.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Confidence: {arg.confidenceLevel}%
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white mb-2 leading-snug">
                    {arg.claim}
                  </h3>

                  {experienceLevel === 'beginner' ? (
                    <div className="text-xs text-slate-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20 mb-2 leading-relaxed">
                      <span className="text-emerald-400 font-semibold">💡 What this means: </span>
                      {arg.beginnerExplanation}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 mb-2 leading-relaxed font-mono">
                      <span className="text-emerald-400 font-semibold">Evidence: </span>
                      {arg.supportingEvidence}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="truncate max-w-[180px]" title={arg.sourceCitation}>
                      Source: {arg.sourceName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={onOpenEvidenceRoom}
                        className="text-xs px-2 py-0.5 rounded text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition font-medium"
                      >
                        View Evidence
                      </button>
                      <button
                        onClick={() => onOpenChallengeClaim(arg.claim, 'BULL', arg.sourceName)}
                        className="text-xs px-2 py-0.5 rounded text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition font-medium"
                      >
                        Challenge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 2: BEAR ANALYST */}
        <div
          className={`bg-[#0d1322] border border-red-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between ${
            mobileTab !== 'bear' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-red-500/20 mb-4">
              <h2 className="text-lg font-bold font-cinzel text-red-400 flex items-center gap-1.5">
                🔴 BEAR ANALYST
              </h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/30">
                Risk Score: {bearThesis.bearRiskScore}/100
              </span>
            </div>

            <div className="mb-4 p-3.5 bg-red-950/20 border border-red-500/20 rounded-xl">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{bearThesis.coreThesis}"
              </p>
            </div>

            <div className="space-y-4">
              {bearThesis.arguments.map((arg) => (
                <div
                  key={arg.id}
                  className="p-3.5 bg-slate-950/80 border border-slate-800 hover:border-red-500/40 rounded-xl transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300 font-semibold uppercase">
                      {arg.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getRiskBadge(arg.riskSeverity)}`}>
                      {arg.riskSeverity} RISK
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white mb-2 leading-snug">
                    {arg.claim}
                  </h3>

                  {experienceLevel === 'beginner' ? (
                    <div className="text-xs text-slate-300 bg-red-950/20 p-2.5 rounded-lg border border-red-500/20 mb-2 leading-relaxed">
                      <span className="text-red-400 font-semibold">⚠️ Why to be cautious: </span>
                      {arg.beginnerExplanation}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 mb-2 leading-relaxed font-mono">
                      <span className="text-red-400 font-semibold">Evidence: </span>
                      {arg.supportingEvidence}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="truncate max-w-[180px]" title={arg.sourceCitation}>
                      Source: {arg.sourceName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={onOpenEvidenceRoom}
                        className="text-xs px-2 py-0.5 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition font-medium"
                      >
                        View Evidence
                      </button>
                      <button
                        onClick={() => onOpenChallengeClaim(arg.claim, 'BEAR', arg.sourceName)}
                        className="text-xs px-2 py-0.5 rounded text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition font-medium"
                      >
                        Challenge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. COURTROOM CROSS-EXAMINATION SECTION (Dedicated section directly after the analysts) */}
      <CourtroomCrossExamination
        courtCase={courtCase}
        onOpenChallengeClaim={onOpenChallengeClaim}
      />

      {/* 7. EVIDENCE JUDGE AUDIT PANEL */}
      <div
        className={`bg-[#0d1322] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl ${
          mobileTab !== 'judge' ? 'hidden lg:block' : 'block'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-4">
          <h2 className="text-xl font-bold font-cinzel text-amber-400 flex items-center gap-2">
            <span>⚖️</span>
            <span>EVIDENCE JUDGE</span>
          </h2>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Independent Audit
          </span>
        </div>

        <div className="space-y-4">
          {judgeAudits.map((audit) => (
            <div
              key={audit.id}
              className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-slate-300">
                  AUDITED CLAIM ({audit.side === 'BULL' ? '🟢 BULL' : '🔴 BEAR'}):
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getClassificationBadge(
                    audit.classification
                  )}`}
                >
                  {audit.classification}
                </span>
              </div>

              <div className="text-sm font-semibold text-white">
                "{audit.claimSummary}"
              </div>

              {/* Progress Bar of Evidence Strength */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>Evidence Strength</span>
                  <span className="text-amber-300 font-bold">{audit.evidenceStrengthPercent}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all"
                    style={{ width: `${audit.evidenceStrengthPercent}%` }}
                  />
                </div>
              </div>

              {/* Quality & Recency */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>Source Quality: <span className="text-emerald-400 font-bold">{audit.sourceQuality}</span></span>
                <span>Data Recency: <span className="text-cyan-400 font-bold">{audit.dataRecency}</span></span>
              </div>

              {/* Judge Notes */}
              <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold font-mono">Judge Ruling: </span>
                {audit.judgeNotes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. THE FINAL COURTROOM VERDICT SECTION WITH SIMPLIFIED UNDERSTANDING TOGGLE */}
      <div
        className={`relative rounded-2xl border-2 p-6 sm:p-8 shadow-2xl overflow-hidden ${verdictStyle.bg} ${verdictStyle.border}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white flex items-center gap-3">
              <span>THE VERDICT:</span>
              <span className={`${verdictStyle.text} flex items-center gap-2`}>
                <span>{verdictStyle.icon}</span>
                <span>{verdict.verdictType}</span>
              </span>
            </h2>
          </div>

          {/* Toggle between Simplified Understanding and Full Judicial Audit */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setVerdictView('simplified')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                verdictView === 'simplified'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>👶</span>
              <span>Simplified Understanding</span>
            </button>
            <button
              onClick={() => setVerdictView('judicial')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                verdictView === 'judicial'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚖️</span>
              <span>Judicial Audit Details</span>
            </button>
          </div>
        </div>

        {verdictView === 'simplified' ? (
          /* SIMPLIFIED UNDERSTANDING VIEW (Requested by User) */
          <div className="py-6 space-y-6 animate-fade-in">
            {/* The 10-Second Bottom Line */}
            <div className="p-5 bg-slate-950/90 border border-amber-500/40 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>The 10-Second Bottom Line</span>
              </div>
              <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                {verdict.beginnerExplanation}
              </p>
            </div>

            {/* Simplified What this means for everyday investors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  What Looks Great
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {verdict.whatSupports.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-orange-950/30 border border-orange-500/30 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  What Could Go Wrong
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {verdict.whatCouldChange.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-orange-400 font-bold">⚠️</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Simple checklist for beginners */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <span>💡 Plain English Takeaway:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {verdict.summary}
              </p>
            </div>
          </div>
        ) : (
          /* FULL JUDICIAL AUDIT VIEW */
          <div className="py-6 space-y-6 animate-fade-in">
            {/* Confidence Score Bar */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-slate-400">Verdict Confidence Rating</div>
                <div className="text-lg font-bold text-white font-mono">{verdict.confidenceScore}% Evidentiary Support</div>
              </div>
              <div className="w-48 bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full"
                  style={{ width: `${verdict.confidenceScore}%` }}
                />
              </div>
            </div>

            {/* Two-column analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-950/80 border border-emerald-500/30 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  What Supports The Verdict
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {verdict.whatSupports.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0 font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-950/80 border border-orange-500/30 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-orange-400 flex items-center gap-2 uppercase tracking-wider font-mono">
                  <AlertTriangle className="w-4 h-4" />
                  What Could Change The Verdict
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {verdict.whatCouldChange.map((risk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-400 shrink-0 font-bold">⚠️</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* WHAT THE JUDGE IS WATCHING (Measurable Watchlist) */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                  <Activity className="w-4 h-4" />
                  What The Judge Is Watching
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {verdict.whatJudgeIsWatching.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{item.metric}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          item.importance === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {item.importance}
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-300 font-mono">
                      Target: {item.targetOrConcern}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.whyWatch}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Disclaimer & Free Resources link */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              StockCourt AI provides research intelligence, not personalized financial advice.
            </span>
          </div>
          {onOpenFreeResources && (
            <button
              onClick={onOpenFreeResources}
              className="text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 font-mono transition cursor-pointer"
            >
              <span>Explore Verified Learning Sources →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
