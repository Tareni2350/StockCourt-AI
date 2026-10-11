import React, { useState } from 'react';
import {
  Gavel, Scale, TrendingUp, AlertTriangle, ShieldCheck, Search,
  ArrowRight, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight, Activity, GraduationCap
} from 'lucide-react';
import { POPULAR_TICKERS } from '../data/mockStocks';

interface Props {
  onStartCase: (initialTicker?: string) => void;
  onExploreDemo: () => void;
  onOpenDictionary: () => void;
  onOpenLearningPath: () => void;
  onOpenWatchthrough: () => void;
  onOpenFreeResources?: () => void;
}

export const LandingPage: React.FC<Props> = ({
  onStartCase,
  onExploreDemo,
  onOpenDictionary,
  onOpenLearningPath,
  onOpenWatchthrough,
  onOpenFreeResources
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onStartCase(searchQuery.trim());
    }
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 text-center max-w-5xl mx-auto px-4">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Tagline Pill & Watchthrough trigger */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-mono shadow-md shadow-amber-500/5">
            <Gavel className="w-3.5 h-3.5 text-amber-400" />
            <span>Your AI-Powered Stock Research Courtroom</span>
          </div>

          <button
            onClick={onOpenWatchthrough}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold transition shadow-sm cursor-pointer animate-pulse"
          >
            <span>🎬</span>
            <span>Watch Courtroom Walkthrough</span>
          </button>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-cinzel text-white tracking-tight leading-none mb-6">
          StockCourt <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">AI</span>
        </h1>

        <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-6">
          Don't just ask whether a stock is good.{' '}
          <span className="font-semibold text-white">Put the investment case on trial.</span>
        </p>

        {/* PROMINENT STOCK SEARCH BAR */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Indian or global stock (e.g. Reliance, TCS, Infosys, HDFC Bank, Apple, NVIDIA)..."
              className="w-full bg-[#0d1322] border-2 border-slate-800 hover:border-slate-700 focus:border-amber-400 rounded-2xl pl-12 pr-32 py-4 text-sm sm:text-base text-white placeholder:text-slate-500 shadow-2xl focus:outline-none transition"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Bring to Trial <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Click Ticker Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-slate-500 text-[11px] font-mono">Trending Trials:</span>
            {POPULAR_TICKERS.map((item) => (
              <button
                key={item.ticker}
                onClick={() => onStartCase(item.ticker)}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 font-mono text-[11px] transition cursor-pointer flex items-center gap-1"
              >
                <span>{item.isIndian ? '🇮🇳' : '🇺🇸'}</span>
                <span>{item.ticker}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary & Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button
            onClick={() => onStartCase('RELIANCE')}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm rounded-xl transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gavel className="w-4 h-4" /> Trial: 🇮🇳 Reliance (NSE)
          </button>
          <button
            onClick={() => onStartCase('AAPL')}
            className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            Trial: 🇺🇸 Apple (AAPL) <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={onOpenWatchthrough}
            className="w-full sm:w-auto px-7 py-3.5 bg-purple-950/40 hover:bg-purple-900/40 text-purple-200 border border-purple-500/40 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            🎬 Watch Full Application Tour
          </button>
        </div>

        {/* HERO VISUAL: DIGITAL COURTROOM SCHEMATIC */}
        <div className="relative p-6 sm:p-8 bg-[#0d1322] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto text-left">
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-amber-500/10 border-b border-l border-amber-500/20 text-[11px] font-mono text-amber-300">
            COURTROOM TOPOLOGY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Bull Analyst Node */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 relative">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>BULL ANALYST</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Builds the strongest positive case using growth metrics, recurring revenue, and competitive moats.
              </p>
            </div>

            {/* Bear Analyst Node */}
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 relative">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-red-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>BEAR ANALYST</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Identifies valuation overreach, margin pressure, regulatory lawsuits, and downside catalysts.
              </p>
            </div>
          </div>

          {/* Central Down Arrow */}
          <div className="flex justify-center items-center py-1 text-slate-600">
            <span className="text-lg">↓</span>
          </div>

          {/* Evidence Judge Node */}
          <div className="p-5 rounded-2xl bg-[#0e1728] border border-amber-500/40 relative mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                <Scale className="w-4 h-4" />
                <span>EVIDENCE JUDGE (NEUTRAL FACT-CHECKER)</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                Audited Evidentiary Standard
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Audits claims against 10-K filings, real cash flows, and verifiable sources. Rates claims as SUPPORTED, PARTIALLY SUPPORTED, or CONTRADICTED. Does not simply average Bull & Bear scores.
            </p>
          </div>

          {/* Final Verdict Node */}
          <div className="flex justify-center items-center py-1 text-slate-600">
            <span className="text-lg">↓</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gavel className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  FINAL VERDICT & PROBABILITY ASSESSMENT
                </span>
                <p className="text-[11px] text-slate-400">
                  Confidence score, key supporting pillars, what could change the verdict, and watchlist.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              CAUTIOUSLY BULLISH (78%)
            </span>
          </div>
        </div>
      </section>

      {/* 2. THREE PERSPECTIVES. ONE VERDICT. */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold font-cinzel text-white">
            Three Perspectives. One Verdict.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Bull Analyst */}
          <div className="p-6 bg-[#0d1322] border border-emerald-500/30 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold text-lg">
                🟢
              </div>
              <h3 className="text-xl font-bold font-cinzel text-white mb-2">
                Bull Analyst
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Builds the strongest evidence-based positive case for the company. Explores recurring revenue acceleration, economic moats, and catalysts.
              </p>
              <ul className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2">✓ Growth opportunities</li>
                <li className="flex items-center gap-2">✓ Pricing power & margins</li>
                <li className="flex items-center gap-2">✓ Capital return discipline</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-mono">
              Mandate: Optimistic Thesis
            </div>
          </div>

          {/* Card 2: Bear Analyst */}
          <div className="p-6 bg-[#0d1322] border border-red-500/30 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 font-mono font-bold text-lg">
                🔴
              </div>
              <h3 className="text-xl font-bold font-cinzel text-white mb-2">
                Bear Analyst
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Looks for weaknesses, hidden risks, and reasons the investment thesis could fail. Never pessimistic for the sake of it — strictly fact-focused.
              </p>
              <ul className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2">⚠️ Valuation multiple risk</li>
                <li className="flex items-center gap-2">⚠️ Debt obligations & leverage</li>
                <li className="flex items-center gap-2">⚠️ Regulatory & competitive threat</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-red-400 font-mono">
              Mandate: Skeptical Interrogation
            </div>
          </div>

          {/* Card 3: Evidence Judge */}
          <div className="p-6 bg-[#0d1322] border border-amber-500/40 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 font-mono font-bold text-lg">
                ⚖️
              </div>
              <h3 className="text-xl font-bold font-cinzel text-white mb-2">
                Evidence Judge
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Checks both arguments against audited 10-K filings and verifiable cash numbers. Separates facts from speculation and issues the final verdict.
              </p>
              <ul className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2">⚖️ Independent fact audits</li>
                <li className="flex items-center gap-2">⚖️ Evidence Strength score</li>
                <li className="flex items-center gap-2">⚖️ Unvarnished final ruling</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-mono">
              Mandate: Neutral Fact-Checking
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEGINNER-FRIENDLY CALLOUT SECTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 bg-gradient-to-r from-slate-900 to-[#0e1728] border border-amber-500/30 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
              🌱 Zero Finance Experience Required
            </span>
            <h3 className="text-2xl font-bold font-cinzel text-white">
              Never Invested Before? We Teach You As You Research.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every single financial term — P/E, EPS, Free Cash Flow, Market Cap, Moats — has an instant <strong>"ⓘ What does this mean?"</strong> explanation with real-life examples.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenLearningPath}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <BookOpen className="w-4 h-4" /> Start 6-Level Learning Path
            </button>
            {onOpenFreeResources && (
              <button
                onClick={onOpenFreeResources}
                className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <GraduationCap className="w-4 h-4" /> Free Learning Sources & Links
              </button>
            )}
            <button
              onClick={onOpenDictionary}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              Browse Financial Dictionary
            </button>
          </div>
        </div>
      </section>

      {/* 4. MANDATORY DISCLAIMER */}
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-[11px] text-slate-400 leading-relaxed space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold uppercase font-mono">
            <ShieldCheck className="w-4 h-4" /> Research and Educational Notice
          </div>
          <p>
            "StockCourt AI provides research and educational information, not personalized financial advice. Past performance does not guarantee future results. Research first. Decide for yourself."
          </p>
        </div>
      </div>
    </div>
  );
};
