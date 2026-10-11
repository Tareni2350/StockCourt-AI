import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Scale, ShieldCheck, Search, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartFirstCase: () => void;
}

export const FirstTimeWalkthrough: React.FC<Props> = ({ isOpen, onClose, onStartFirstCase }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const totalSteps = 6;

  const stepsData = [
    {
      step: 1,
      icon: Scale,
      color: 'text-amber-400',
      badge: 'Welcome',
      title: 'Welcome to StockCourt AI',
      subtitle: 'Your AI-powered stock research courtroom',
      description: "Think of this as a courtroom for stock research. Instead of simply asking an AI if a stock will go up or down, we put the investment thesis on trial with two opposing analysts and an independent judge.",
      visual: (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs font-mono">
            <span className="text-emerald-400 font-bold">🟢 BULL ANALYST</span>
            <span className="text-slate-500">⚖️</span>
            <span className="text-red-400 font-bold">🔴 BEAR ANALYST</span>
          </div>
          <div className="text-slate-600 text-xs">↓</div>
          <div className="text-amber-400 font-bold text-xs font-mono">⚖️ EVIDENCE JUDGE</div>
          <div className="text-slate-600 text-xs">↓</div>
          <div className="text-slate-300 font-bold text-xs">FINAL RESEARCH VERDICT</div>
        </div>
      )
    },
    {
      step: 2,
      icon: Search,
      color: 'text-cyan-400',
      badge: 'Step 2: Defendant Selection',
      title: 'Choose a Stock (Your Defendant)',
      subtitle: 'Pick any public company to put on trial',
      description: "Search for a company you're interested in — like Apple, NVIDIA, Tesla, or Reliance. We pull fundamental financial data, operating metrics, and official filings.",
      visual: (
        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
          <div className="text-slate-400 font-mono">CASE #AAPL-2026: Apple Inc.</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-950 p-2 rounded">Price: <span className="text-white font-mono font-bold">$228.45</span></div>
            <div className="bg-slate-950 p-2 rounded">P/E: <span className="text-amber-400 font-mono font-bold">33.8</span></div>
            <div className="bg-slate-950 p-2 rounded">FCF: <span className="text-emerald-400 font-mono font-bold">$108B</span></div>
          </div>
        </div>
      )
    },
    {
      step: 3,
      icon: Users,
      color: 'text-emerald-400',
      badge: 'Step 3: The Analysts',
      title: 'Meet the Opposing Analysts',
      subtitle: 'Two perspectives, zero blind spots',
      description: "🟢 The Bull Analyst builds the strongest evidence-based positive case for the company. 🔴 The Bear Analyst aggressively tests weaknesses, valuation risks, and what could go wrong.",
      visual: (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
            <div className="font-bold text-emerald-400 mb-1">🟢 Bull Case</div>
            <div className="text-slate-300 text-[11px]">Identifies growth opportunities, competitive moats, and positive catalysts.</div>
          </div>
          <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl">
            <div className="font-bold text-red-400 mb-1">🔴 Bear Case</div>
            <div className="text-slate-300 text-[11px]">Uncovers valuation risks, heavy debt, competition, and regulatory scrutiny.</div>
          </div>
        </div>
      )
    },
    {
      step: 4,
      icon: ShieldCheck,
      color: 'text-amber-400',
      badge: 'Step 4: Fact-Checking',
      title: 'The Judge Checks the Evidence',
      subtitle: 'No hype, no averages, only proof',
      description: "The Evidence Judge does NOT just average the Bull and Bear scores! It evaluates each claim against audited SEC filings and reliable data, rating Evidence Strength and categorizing claims into SUPPORTED, PARTIALLY SUPPORTED, or CONTRADICTED.",
      visual: (
        <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-xl text-xs space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-300 font-mono">Services Margin: ~74%</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">SUPPORTED (95%)</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full w-[88%]"></div>
          </div>
          <div className="text-[10px] text-slate-400">Audited SEC Form 10-K confirms $85B+ recurring revenue.</div>
        </div>
      )
    },
    {
      step: 5,
      icon: CheckCircle2,
      color: 'text-purple-400',
      badge: 'Step 5: The Verdict',
      title: 'Get Your Final Research Verdict',
      subtitle: 'Understand the reasons, not just a label',
      description: "You'll see what supports the stock, what could go wrong, and what key metrics the Judge is watching. It explains the trade-offs so you learn how to think about investing.",
      visual: (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
          <div className="font-bold text-amber-400 flex items-center gap-1.5">
            🟡 CAUTIOUSLY BULLISH (78% Confidence)
          </div>
          <div className="text-slate-300 text-[11px]">✓ Verified $108B+ Free Cash Flow</div>
          <div className="text-slate-300 text-[11px]">⚠️ Elevated P/E (33.8x) requires disciplined entry</div>
        </div>
      )
    },
    {
      step: 6,
      icon: AlertCircle,
      color: 'text-yellow-400',
      badge: 'Important Reminder',
      title: 'Remember: Research First',
      subtitle: 'StockCourt AI is an educational tool',
      description: "StockCourt AI helps you research and learn. It does not provide personalized financial advice or guarantee returns. Past performance does not guarantee future results. Research first. Decide for yourself.",
      visual: (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200/90 leading-relaxed">
          "The greatest enemy of an investment is not the market, but the investor's own emotions. Put the thesis on trial, verify the numbers, and invest with discipline."
        </div>
      )
    }
  ];

  const current = stepsData[step - 1];
  const IconComponent = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0d1322] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i + 1 === step
                    ? 'w-6 bg-amber-400'
                    : i + 1 < step
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-slate-400">
            Step {step} of {totalSteps}
          </span>
        </div>

        {/* Icon & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${current.color}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 font-mono">
            {current.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-0.5">{current.title}</h3>
        <p className="text-xs text-slate-400 mb-4">{current.subtitle}</p>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {current.description}
        </p>

        {/* Visual Element */}
        <div className="mb-6">
          {current.visual}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs text-slate-500 hover:text-slate-400 transition"
            >
              Skip Tour
            </button>
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onStartFirstCase();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Start My First Case <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
