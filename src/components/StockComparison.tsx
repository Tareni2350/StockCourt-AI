import React, { useState } from 'react';
import {
  GitCompare, ArrowLeft, Plus, X, Gavel, Scale, TrendingUp,
  ShieldCheck, HelpCircle, AlertTriangle, Check
} from 'lucide-react';
import { MOCK_CASES, POPULAR_TICKERS } from '../data/mockStocks';
import { StockCourtCase } from '../types';

interface Props {
  onBackToDashboard: () => void;
  onOpenCase: (ticker: string) => void;
  onOpenWhatDoesThisMean: (termId: string) => void;
}

export const StockComparison: React.FC<Props> = ({
  onBackToDashboard,
  onOpenCase,
  onOpenWhatDoesThisMean
}) => {
  const [selectedTickers, setSelectedTickers] = useState<string[]>(['RELIANCE', 'TCS', 'AAPL']);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [comparativeVerdictMessage, setComparativeVerdictMessage] = useState<string | null>(null);

  const availableTickers = POPULAR_TICKERS.filter((t) => !selectedTickers.includes(t.ticker));

  const handleAddTicker = (t: string) => {
    if (selectedTickers.length < 5) {
      setSelectedTickers([...selectedTickers, t]);
    }
    setShowAddMenu(false);
  };

  const handleRemoveTicker = (t: string) => {
    if (selectedTickers.length > 2) {
      setSelectedTickers(selectedTickers.filter((item) => item !== t));
    }
  };

  // Retrieve cases for selected tickers (using mock cases or fallbacks)
  const compareCases: StockCourtCase[] = selectedTickers.map((t) => {
    return MOCK_CASES[t] || {
      caseId: `CASE #${t}-2026`,
      ticker: t,
      companyName: `${t} Corporation`,
      createdDate: 'Oct 2026',
      focusQuestion: 'Competitive comparison analysis',
      isDemo: false,
      liveMarketDataAvailable: true,
      metrics: {
        revenue: '$85.4B',
        revenueGrowthYoY: '+8.2%',
        grossMargin: '42.0%',
        operatingMargin: '24.5%',
        netIncome: '$22.0B',
        eps: '$5.40',
        freeCashFlow: '$24.5B',
        totalDebt: '$42.0B',
        cashAndEquivalents: '$32.0B',
        roe: '38.5%',
        roic: '22.4%',
        peRatio: '31.2',
        forwardPe: '26.5',
        pegRatio: '2.1',
        priceToSales: '7.8',
        evToEbitda: '18.4',
        priceToFcf: '28.0',
        revenueCagr3Yr: '7.4%',
        epsGrowth3Yr: '11.0%',
        fcfGrowth3Yr: '8.4%',
        marketGrowthRate: '6.0%',
        debtToEquity: '0.8',
        customerConcentration: '<3%',
        geographicConcentration: 'Global',
        regulatoryRisk: 'Moderate',
        currentPrice: 180.0,
        currency: 'USD',
        dailyChange: 1.2,
        dailyChangePercent: 0.65,
        marketCap: '$1.8T',
        fiftyTwoWeekHigh: 195.0,
        fiftyTwoWeekLow: 130.0,
        avgVolume: '28M',
        beta: '1.15',
        exchange: 'NASDAQ',
        sector: 'Technology',
        industry: 'Software & Hardware'
      },
      bullThesis: { coreThesis: 'Diversified recurring revenue engine', bullScore: 78, arguments: [] },
      bearThesis: { coreThesis: 'Elevated multiples in high-competition verticals', bearRiskScore: 65, arguments: [] },
      judgeAudits: [],
      verdict: {
        verdictType: 'CAUTIOUSLY BULLISH',
        confidenceScore: 74,
        summary: 'Solid balance sheet with disciplined capital allocation.',
        beginnerExplanation: 'Strong fundamental core with fair multiple valuation.',
        whatSupports: [],
        whatCouldChange: [],
        whatJudgeIsWatching: []
      },
      debateRounds: [],
      debateSynthesis: {
        strongestBullArgument: '',
        strongestBearArgument: '',
        weakestArgument: '',
        missingEvidence: '',
        conflictingEvidence: ''
      },
      scenarios: [],
      evidenceRoom: []
    };
  });

  const handlePutOnTrial = () => {
    setComparativeVerdictMessage(
      `⚖️ COURTROOM COMPARATIVE BENCH RULING: Among the defendants on trial (${selectedTickers.join(', ')}), the Evidence Judge finds that NVIDIA (NVDA) exhibits the highest top-line revenue momentum (+114%) and operating margins (62.8%), but carries the highest customer concentration risk (40% in top 4 hyperscalers). Apple (AAPL) delivers the most durable Free Cash Flow buffer ($108B+) and recurring services stability, despite an elevated 33.8x P/E multiple. Tesla (TSLA) reflects the highest speculative premium (98x P/E) alongside the sharpest margin compression (7.9%). The court awards the most balanced risk-adjusted evidentiary rating to Apple Inc.`
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <GitCompare className="w-4 h-4" />
              <span>Comparative Bench Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white flex items-center gap-2">
              Cross-Company Trial: {selectedTickers.join(' vs. ')}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToDashboard}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition cursor-pointer"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={handlePutOnTrial}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <Gavel className="w-4 h-4" />
              Put These Stocks On Trial
            </button>
          </div>
        </div>

        {/* Selected Tickers Tags & Add More Button */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          {selectedTickers.map((t) => (
            <div
              key={t}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono font-bold text-white shadow-sm"
            >
              <span className="text-amber-400">{t}</span>
              {selectedTickers.length > 2 && (
                <button
                  onClick={() => handleRemoveTicker(t)}
                  className="text-slate-500 hover:text-red-400 transition"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

          {selectedTickers.length < 5 && (
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Defendant
              </button>

              {showAddMenu && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-30 space-y-1">
                  <div className="text-[10px] text-slate-500 font-mono uppercase px-2 py-1">
                    Select to compare:
                  </div>
                  {availableTickers.map((item) => (
                    <button
                      key={item.ticker}
                      onClick={() => handleAddTicker(item.ticker)}
                      className="w-full text-left p-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                    >
                      <span className="font-mono font-bold text-amber-400">{item.ticker}</span>
                      <span className="text-slate-400 truncate max-w-[120px]">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Comparative Ruling Result Banner */}
      {comparativeVerdictMessage && (
        <div className="p-5 bg-[#0e1728] border border-amber-500/50 rounded-2xl shadow-xl space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            <Scale className="w-4 h-4" />
            Judicial Cross-Trial Finding
          </div>
          <p className="text-sm text-amber-100/90 leading-relaxed italic">
            {comparativeVerdictMessage}
          </p>
        </div>
      )}

      {/* Comparison Table Matrix */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm font-cinzel">
            Comparative Evidence & Metrics Matrix
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Direct audited comparability
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-bold text-slate-300">Metric / Assessment</th>
                {compareCases.map((c) => (
                  <th key={c.ticker} className="py-3.5 px-4 font-bold text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 text-sm font-extrabold">{c.ticker}</span>
                      <span className="text-[10px] text-slate-500 normal-case">({c.companyName})</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {/* Current Price */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-semibold text-slate-300 flex items-center gap-1.5">
                  Current Price
                </td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-white font-bold text-sm">
                    {c.metrics.currencySymbol || (c.metrics.currency === 'INR' ? '₹' : '$')}
                    {c.metrics.currentPrice.toFixed(2)}
                  </td>
                ))}
              </tr>

              {/* Market Cap */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">Market Cap</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-slate-200">
                    {c.metrics.marketCap}
                  </td>
                ))}
              </tr>

              {/* Revenue Growth */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">Revenue Growth (YoY)</td>
                {compareCases.map((c) => (
                  <td
                    key={c.ticker}
                    className={`py-3 px-4 font-bold ${
                      c.metrics.revenueGrowthYoY.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {c.metrics.revenueGrowthYoY}
                  </td>
                ))}
              </tr>

              {/* Operating Margin */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">Operating Margin</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-slate-200">
                    {c.metrics.operatingMargin}
                  </td>
                ))}
              </tr>

              {/* EPS Growth 3Yr */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">EPS Growth (3-Yr CAGR)</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-slate-200">
                    {c.metrics.epsGrowth3Yr}
                  </td>
                ))}
              </tr>

              {/* P/E Ratio */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">P/E Ratio (TTM)</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 font-bold text-amber-300">
                    {c.metrics.peRatio}
                  </td>
                ))}
              </tr>

              {/* ROE */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">Return on Equity (ROE)</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-slate-200">
                    {c.metrics.roe}
                  </td>
                ))}
              </tr>

              {/* ROIC */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">ROIC (Invested Capital)</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-slate-200">
                    {c.metrics.roic}
                  </td>
                ))}
              </tr>

              {/* Total Debt */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">Total Debt</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-slate-200">
                    {c.metrics.totalDebt}
                  </td>
                ))}
              </tr>

              {/* Free Cash Flow */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400">Annual Free Cash Flow</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 font-bold text-emerald-400">
                    {c.metrics.freeCashFlow}
                  </td>
                ))}
              </tr>

              {/* Bull Score */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400 font-bold">🟢 Bull Analyst Score</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-emerald-400 font-bold">
                    {c.bullThesis.bullScore}/100
                  </td>
                ))}
              </tr>

              {/* Bear Risk */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-400 font-bold">🔴 Bear Risk Severity</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3 px-4 text-red-400 font-bold">
                    {c.bearThesis.bearRiskScore}/100
                  </td>
                ))}
              </tr>

              {/* Judge Verdict */}
              <tr className="hover:bg-slate-900/40 bg-slate-950/60">
                <td className="py-3.5 px-4 font-bold text-amber-400">⚖️ Final Judge Verdict</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3.5 px-4">
                    <span className="font-bold text-amber-300 block text-xs">
                      {c.verdict.verdictType}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Confidence: {c.verdict.confidenceScore}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Actions row */}
              <tr>
                <td className="py-3.5 px-4 text-slate-500 font-sans">Open Detailed Docket</td>
                {compareCases.map((c) => (
                  <td key={c.ticker} className="py-3.5 px-4 font-sans">
                    <button
                      onClick={() => onOpenCase(c.ticker)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition"
                    >
                      View Trial Case →
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
