import React from 'react';
import { History, ArrowRight, Gavel, Scale, Calendar, Trash2, FolderOpen } from 'lucide-react';
import { VerdictType } from '../types';

interface CaseHistoryItem {
  caseId: string;
  ticker: string;
  companyName: string;
  date: string;
  verdict: VerdictType;
  focusQuestion?: string;
}

interface Props {
  history: CaseHistoryItem[];
  onOpenCase: (ticker: string) => void;
  onClearHistory: () => void;
}

export const CaseHistory: React.FC<Props> = ({ history, onOpenCase, onClearHistory }) => {
  const getVerdictBadge = (v: VerdictType) => {
    switch (v) {
      case 'BULLISH':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'CAUTIOUSLY BULLISH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'NEUTRAL':
        return 'bg-slate-700/30 text-slate-300 border-slate-600';
      case 'CAUTIOUSLY BEARISH':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'BEARISH':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-amber-400">
              <History className="w-4 h-4" />
              <span>Court Trial Records</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
              Previous Cases & Historical Rulings
            </h1>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800 rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear History
            </button>
          )}
        </div>
      </div>

      {/* History Items List */}
      {history.length === 0 ? (
        <div className="text-center py-16 bg-[#0d1322] border border-slate-800 rounded-2xl p-6">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Previous Trials Recorded</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Once you analyze stocks in the courtroom, your case files will be cataloged here for immediate review.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#0d1322] border border-slate-800 hover:border-slate-700 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 font-mono font-bold text-sm shrink-0">
                  {item.ticker}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400">{item.caseId}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                    {item.companyName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${getVerdictBadge(
                    item.verdict
                  )}`}
                >
                  {item.verdict}
                </span>

                <button
                  onClick={() => onOpenCase(item.ticker)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  Reopen Case <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
