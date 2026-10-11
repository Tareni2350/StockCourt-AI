import React, { useState } from 'react';
import { X, Search, Gavel, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { POPULAR_TICKERS } from '../data/mockStocks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLaunchCase: (ticker: string, question: string) => void;
}

export const StartCaseModal: React.FC<Props> = ({ isOpen, onClose, onLaunchCase }) => {
  const [tickerQuery, setTickerQuery] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('Full courtroom analysis');
  const [isPreparing, setIsPreparing] = useState(false);
  const [prepStep, setPrepStep] = useState(0);

  if (!isOpen) return null;

  const focusOptions = [
    'Is this stock fairly valued?',
    'Is the company growing sustainably?',
    'What are the biggest risks?',
    'Long-term investment research',
    'Compare with competitors',
    'Full courtroom analysis'
  ];

  const prepSteps = [
    'Collecting company data',
    'Gathering financial metrics',
    'Reviewing recent developments',
    'Building Bull case',
    'Building Bear case',
    'Verifying evidence',
    'Judge is reviewing the case'
  ];

  const handleStart = (tToUse?: string) => {
    const target = (tToUse || tickerQuery).trim();
    if (!target) return;

    setIsPreparing(true);
    setPrepStep(0);

    // Animate the legal preparation checklist
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < prepSteps.length) {
        setPrepStep(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsPreparing(false);
          onLaunchCase(target, selectedFocus);
          onClose();
        }, 600);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0d1322] border border-amber-500/40 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[92vh] overflow-y-auto">
        {!isPreparing && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isPreparing ? (
          /* Preparing the Courtroom Loading Experience */
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-pulse">
              <Gavel className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>StockCourt Chamber</span>
              </div>
              <h3 className="text-2xl font-bold font-cinzel text-white">
                Preparing the Courtroom...
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Convening Bull Analyst, Bear Analyst, and Evidence Judge for {tickerQuery.toUpperCase()}
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5 text-left text-xs font-mono">
              {prepSteps.map((step, idx) => {
                const isDone = idx < prepStep;
                const isCurrent = idx === prepStep;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 transition-all duration-300 ${
                      isDone
                        ? 'text-emerald-400'
                        : isCurrent
                        ? 'text-amber-400 font-bold'
                        : 'text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Normal Selection Flow */
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1 font-mono text-xs uppercase tracking-wider">
              <Gavel className="w-4 h-4" />
              <span>Initiate Trial Docket</span>
            </div>
            <h3 className="text-2xl font-bold font-cinzel text-white mb-1">
              Select Your Defendant
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Enter any company name or ticker symbol to put its investment case on trial.
            </p>

            {/* Ticker Search */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Company or Ticker Symbol:
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={tickerQuery}
                  onChange={(e) => setTickerQuery(e.target.value)}
                  placeholder="Search a company or ticker (e.g. AAPL, NVIDIA, Tesla, Microsoft, Reliance)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleStart();
                  }}
                />
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="mb-5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Popular Defendants:
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TICKERS.map((item) => (
                  <button
                    key={item.ticker}
                    onClick={() => {
                      setTickerQuery(item.ticker);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 cursor-pointer ${
                      tickerQuery.toUpperCase() === item.ticker
                        ? 'bg-amber-500 text-slate-950 font-bold border border-amber-400'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <span className="font-bold">{item.ticker}</span>
                    <span className="text-[10px] text-slate-400">({item.name.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Question Options */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                What are you trying to understand?
              </label>
              <div className="space-y-2">
                {focusOptions.map((opt) => (
                  <label
                    key={opt}
                    onClick={() => setSelectedFocus(opt)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition ${
                      selectedFocus === opt
                        ? 'bg-amber-500/10 border-amber-500/50 text-white font-medium'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="caseFocus"
                      checked={selectedFocus === opt}
                      onChange={() => setSelectedFocus(opt)}
                      className="accent-amber-500"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Launch Action */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStart()}
                disabled={!tickerQuery.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Gavel className="w-4 h-4" />
                Bring To Trial
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
