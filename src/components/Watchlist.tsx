import React, { useState } from 'react';
import {
  Bookmark, Trash2, RefreshCw, Eye, Plus, ArrowRight, Gavel,
  Scale, TrendingUp, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { MOCK_CASES, POPULAR_TICKERS, getOrCreateCase } from '../data/mockStocks';

interface Props {
  watchlistTickers: string[];
  onRemoveFromWatchlist: (ticker: string) => void;
  onAddToWatchlist: (ticker: string) => void;
  onOpenCase: (ticker: string) => void;
  onStartNewCase: () => void;
}

export const Watchlist: React.FC<Props> = ({
  watchlistTickers,
  onRemoveFromWatchlist,
  onAddToWatchlist,
  onOpenCase,
  onStartNewCase
}) => {
  const [quickAddTicker, setQuickAddTicker] = useState('');
  const [refreshingTicker, setRefreshingTicker] = useState<string | null>(null);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickAddTicker.toUpperCase().trim();
    if (clean && !watchlistTickers.includes(clean)) {
      onAddToWatchlist(clean);
      setQuickAddTicker('');
    }
  };

  const handleSimulateReanalyze = (ticker: string) => {
    setRefreshingTicker(ticker);
    setTimeout(() => {
      setRefreshingTicker(null);
      onOpenCase(ticker);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-amber-400">
              <Bookmark className="w-4 h-4" />
              <span>Court Docket Watchlist</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
              My Watchlist ({watchlistTickers.length})
            </h1>
          </div>

          <form onSubmit={handleQuickAdd} className="flex items-center gap-2">
            <input
              type="text"
              value={quickAddTicker}
              onChange={(e) => setQuickAddTicker(e.target.value)}
              placeholder="Add ticker (e.g. MSFT)..."
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 w-44 font-mono uppercase"
            />
            <button
              type="submit"
              disabled={!quickAddTicker.trim()}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>
        </div>
      </div>

      {/* Cards Grid */}
      {watchlistTickers.length === 0 ? (
        <div className="text-center py-16 bg-[#0d1322] border border-slate-800 rounded-2xl p-6">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Your Watchlist is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Search for a stock or start a trial case to track key financial numbers, Bull scores, and Judge verdicts.
          </p>
          <button
            onClick={onStartNewCase}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Start Your First Case
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {watchlistTickers.map((ticker) => {
            const courtCase = getOrCreateCase(ticker);
            const isRefreshing = refreshingTicker === ticker;

            return (
              <div
                key={ticker}
                className="p-5 bg-[#0d1322] border border-slate-800 hover:border-slate-700 rounded-2xl shadow-xl flex flex-col justify-between transition group relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-extrabold font-mono text-white group-hover:text-amber-400 transition">
                          {ticker}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {courtCase.metrics.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">
                        {courtCase.companyName}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveFromWatchlist(ticker)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price & Change */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold font-mono text-white">
                      {courtCase.metrics.currencySymbol || (courtCase.metrics.currency === 'INR' ? '₹' : '$')}
                      {courtCase.metrics.currentPrice.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        courtCase.metrics.dailyChange >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {courtCase.metrics.dailyChange >= 0 ? '+' : ''}
                      {courtCase.metrics.currencySymbol || (courtCase.metrics.currency === 'INR' ? '₹' : '$')}
                      {courtCase.metrics.dailyChange.toFixed(2)} ({courtCase.metrics.dailyChangePercent.toFixed(2)}%)
                    </span>
                  </div>

                  {/* Scores Grid */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono mb-4">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Bull Score</span>
                      <span className="text-emerald-400 font-bold">
                        🟢 {courtCase.bullThesis.bullScore}/100
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Bear Risk</span>
                      <span className="text-red-400 font-bold">
                        🔴 {courtCase.bearThesis.bearRiskScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Judge Verdict Badge */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs mb-4">
                    <span className="text-slate-400 font-mono text-[11px]">Judge Verdict:</span>
                    <span className="font-bold text-amber-300 font-mono">
                      {courtCase.verdict.verdictType}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleSimulateReanalyze(ticker)}
                    disabled={isRefreshing}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 transition text-[11px]"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                    {isRefreshing ? 'Auditing...' : 'Re-analyze'}
                  </button>

                  <button
                    onClick={() => onOpenCase(ticker)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-1 text-xs"
                  >
                    View Case <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
