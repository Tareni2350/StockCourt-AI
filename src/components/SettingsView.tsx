import React from 'react';
import {
  Settings, ShieldCheck, Trash2, RefreshCw, Sliders, Scale,
  BookOpen, Eye, Info
} from 'lucide-react';
import { ExperienceLevel } from '../types';

interface Props {
  experienceLevel: ExperienceLevel;
  onSetExperienceLevel: (lvl: ExperienceLevel) => void;
  onClearHistory: () => void;
  onResetWatchlist: () => void;
  onOpenTour: () => void;
}

export const SettingsView: React.FC<Props> = ({
  experienceLevel,
  onSetExperienceLevel,
  onClearHistory,
  onResetWatchlist,
  onOpenTour
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Settings className="w-4 h-4" />
          <span>Court Administration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
          Settings & Platform Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize your experience level, default courtroom debates, and research preferences.
        </p>
      </div>

      {/* Experience Level Configuration */}
      <div className="p-6 bg-[#0d1322] border border-slate-800 rounded-2xl shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
          Experience Level Mode
        </h3>
        <p className="text-xs text-slate-400">
          Choose whether the interface prioritizes beginner-friendly explanations with tooltips or advanced terminal tables.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSetExperienceLevel('beginner')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer ${
              experienceLevel === 'beginner'
                ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">🌱 Beginner Mode (Default)</span>
              {experienceLevel === 'beginner' && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold font-mono">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Plain-language explanations, "ⓘ What does this mean?" buttons on all ratios, practical analogies, and guided summaries.
            </p>
          </button>

          <button
            onClick={() => onSetExperienceLevel('advanced')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer ${
              experienceLevel === 'advanced'
                ? 'bg-amber-950/30 border-amber-500 text-amber-200 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">📊 Advanced Mode</span>
              {experienceLevel === 'advanced' && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Dense financial ratio tables, direct SEC filing excerpts, valuation multiples, and compact terminal view.
            </p>
          </button>
        </div>
      </div>

      {/* Onboarding & Reset Actions */}
      <div className="p-6 bg-[#0d1322] border border-slate-800 rounded-2xl shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
          Onboarding & Storage Management
        </h3>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold text-white">First-Time User Walkthrough</div>
              <div className="text-[11px] text-slate-400">Replay the 6-step guided tour of StockCourt AI</div>
            </div>
            <button
              onClick={onOpenTour}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-semibold self-start sm:self-auto cursor-pointer"
            >
              Start Tour
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold text-white">Clear Trial Case History</div>
              <div className="text-[11px] text-slate-400">Remove all previously recorded trial dockets</div>
            </div>
            <button
              onClick={onClearHistory}
              className="px-4 py-2 bg-slate-800 hover:bg-red-950 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold self-start sm:self-auto cursor-pointer"
            >
              Clear History
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold text-white">Reset Default Watchlist</div>
              <div className="text-[11px] text-slate-400">Restore default flagship stocks (AAPL, NVDA, TSLA, MSFT)</div>
            </div>
            <button
              onClick={onResetWatchlist}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold self-start sm:self-auto cursor-pointer"
            >
              Reset Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Methodology & Safety Notice */}
      <div className="p-6 bg-[#0d1322] border border-amber-500/20 rounded-2xl shadow-xl space-y-3 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-amber-400 font-bold uppercase font-mono">
          <ShieldCheck className="w-4 h-4" />
          Evidentiary Standards & Legal Disclaimer
        </div>
        <p className="leading-relaxed">
          StockCourt AI operates on the strict separation of positive thesis formulation (Bull Analyst), skeptical risk interrogation (Bear Analyst), and independent fact-checking against audited financial filings (Evidence Judge).
        </p>
        <p className="leading-relaxed text-slate-400">
          <strong>Important:</strong> StockCourt AI provides research and educational information, not personalized financial advice. Market forecasts and scenarios are mathematical sensitivity illustrations, not guaranteed predictions. Past performance does not guarantee future results. Research first. Decide for yourself.
        </p>
      </div>
    </div>
  );
};
