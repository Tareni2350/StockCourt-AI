import React, { useState } from 'react';
import {
  Layers, ArrowLeft, Sliders, AlertTriangle, ShieldCheck, TrendingUp,
  Percent, DollarSign, Sparkles, HelpCircle
} from 'lucide-react';
import { StockCourtCase, ScenarioAssumption } from '../types';

interface Props {
  courtCase: StockCourtCase;
  onBackToDashboard: () => void;
  onOpenWhatDoesThisMean: (termId: string) => void;
}

export const ScenarioAnalysis: React.FC<Props> = ({ courtCase, onBackToDashboard, onOpenWhatDoesThisMean }) => {
  const [activeScenario, setActiveScenario] = useState<'bull' | 'base' | 'bear'>('base');
  
  // Interactive Simulation Sliders
  const [customGrowth, setCustomGrowth] = useState<number>(6.5);
  const [customMargin, setCustomMargin] = useState<number>(31.0);
  const [customMultiple, setCustomMultiple] = useState<number>(30.0);

  const scenarios = courtCase.scenarios || [];

  // Estimated implied price calculation based on inputs
  const currentPrice = courtCase.metrics.currentPrice;
  // Normalized multiplier for interactive slider:
  const impliedPrice = (
    currentPrice *
    (1 + (customGrowth - 6.0) / 100 * 2) *
    (customMargin / 30.0) *
    (customMultiple / 30.0)
  ).toFixed(2);

  const impliedReturn = (((parseFloat(impliedPrice) - currentPrice) / currentPrice) * 100).toFixed(1);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-purple-400">
              <Layers className="w-4 h-4" />
              <span>Sensitivity Analysis Chamber</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white flex items-center gap-2">
              What If? Scenario Analysis ({courtCase.ticker})
            </h1>
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Dashboard
          </button>
        </div>

        {/* Scenario Selectors */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {scenarios.map((sc) => {
            const isSelected = activeScenario === sc.id;
            let themeColor = 'border-slate-800 text-slate-300';
            if (sc.id === 'bull') themeColor = isSelected ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10' : 'hover:border-emerald-500/40';
            if (sc.id === 'base') themeColor = isSelected ? 'bg-amber-950/30 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10' : 'hover:border-amber-500/40';
            if (sc.id === 'bear') themeColor = isSelected ? 'bg-red-950/30 border-red-500 text-red-300 shadow-lg shadow-red-500/10' : 'hover:border-red-500/40';

            return (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenario(sc.id);
                  if (sc.id === 'bull') {
                    setCustomGrowth(12.0);
                    setCustomMargin(34.0);
                    setCustomMultiple(34.0);
                  } else if (sc.id === 'base') {
                    setCustomGrowth(6.0);
                    setCustomMargin(31.0);
                    setCustomMultiple(28.0);
                  } else {
                    setCustomGrowth(2.0);
                    setCustomMargin(27.0);
                    setCustomMultiple(20.0);
                  }
                }}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${themeColor}`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      {sc.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono">
                      Est. Probability: {sc.probabilityEstimate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {sc.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-xs font-mono font-bold">
                  Target Range: {sc.estimatedPriceRange}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Scenario Detailed Breakdown */}
      {(() => {
        const selected = scenarios.find((s) => s.id === activeScenario) || scenarios[0];
        if (!selected) return null;

        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Stated Assumptions & Required Catalysts */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 bg-[#0d1322] border border-slate-800 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-cinzel">
                    {selected.name}
                  </h3>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Implied Range: {selected.estimatedPriceRange}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selected.description}
                </p>

                {/* Stated Assumptions Table */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Model Assumptions:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-slate-500 text-[10px]">Revenue Growth</div>
                      <div className="text-white font-bold">{selected.revenueGrowthAssumption}</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-slate-500 text-[10px]">Operating Margin</div>
                      <div className="text-white font-bold">{selected.operatingMarginAssumption}</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="text-slate-500 text-[10px]">Terminal Multiple</div>
                      <div className="text-white font-bold">{selected.terminalMultipleAssumption}</div>
                    </div>
                  </div>
                </div>

                {/* Catalysts Required vs Downside Triggers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
                      Required Catalysts:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selected.catalystsRequired.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-red-400 uppercase font-mono tracking-wider">
                      Downside Triggers / Risks:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selected.downsideTriggers.map((dt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-red-400 font-bold">⚠️</span>
                          <span>{dt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Sandbox Calculator */}
            <div className="p-6 bg-[#0d1322] border border-amber-500/40 rounded-2xl shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                <Sliders className="w-4 h-4" />
                Interactive Sandbox
              </div>
              <p className="text-xs text-slate-400">
                Test your own assumptions by adjusting growth, margin, and valuation parameters:
              </p>

              {/* Slider 1: Revenue Growth */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">3-Yr Annual Revenue Growth</span>
                  <span className="text-amber-400 font-bold">{customGrowth.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="35"
                  step="0.5"
                  value={customGrowth}
                  onChange={(e) => setCustomGrowth(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Slider 2: Operating Margin */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Target Operating Margin</span>
                  <span className="text-emerald-400 font-bold">{customMargin.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="55"
                  step="0.5"
                  value={customMargin}
                  onChange={(e) => setCustomMargin(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Slider 3: Terminal P/E Multiple */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Exit P/E Multiple</span>
                  <span className="text-purple-400 font-bold">{customMultiple.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="1"
                  value={customMultiple}
                  onChange={(e) => setCustomMultiple(parseFloat(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              {/* Implied Price Output */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  Calculated Implied Share Value:
                </div>
                <div className="text-2xl font-extrabold font-mono text-white">
                  {courtCase.metrics.currencySymbol || (courtCase.metrics.currency === 'INR' ? '₹' : '$')}
                  {impliedPrice}
                </div>
                <div
                  className={`text-xs font-mono font-bold ${
                    parseFloat(impliedReturn) >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {parseFloat(impliedReturn) >= 0 ? '+' : ''}
                  {impliedReturn}% vs. current ({courtCase.metrics.currencySymbol || (courtCase.metrics.currency === 'INR' ? '₹' : '$')}{currentPrice.toFixed(2)})
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Disclaimer:</strong> Scenario outputs are purely illustrative simulations testing mathematical sensitivities. They are never guaranteed predictions or price targets.
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
