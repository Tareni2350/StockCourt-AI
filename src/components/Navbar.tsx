import React, { useState } from 'react';
import {
  Gavel, Scale, Search, HelpCircle, BookOpen, User, Bell,
  Menu, X, Sparkles, GraduationCap, ChevronDown
} from 'lucide-react';
import { ExperienceLevel, UserProfile } from '../types';

interface Props {
  experienceLevel: ExperienceLevel;
  onToggleExperienceLevel: (lvl: ExperienceLevel) => void;
  onStartCase: (ticker?: string) => void;
  onOpenDictionary: () => void;
  onOpenLearningPath: () => void;
  onOpenTour: () => void;
  onOpenWatchthrough: () => void;
  onOpenFreeResources?: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
  onToggleSidebar: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<Props> = ({
  experienceLevel,
  onToggleExperienceLevel,
  onStartCase,
  onOpenDictionary,
  onOpenLearningPath,
  onOpenTour,
  onOpenWatchthrough,
  onOpenFreeResources,
  onOpenAuth,
  currentUser,
  onToggleSidebar,
  onNavigateHome
}) => {
  const [navSearch, setNavSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      onStartCase(navSearch.trim());
      setNavSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070a12]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile menu toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left group transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
              <Scale className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-extrabold font-cinzel text-base sm:text-lg text-white tracking-wider flex items-center gap-1.5 leading-none">
                <span>STOCKCOURT</span>
                <span className="text-amber-400 font-mono text-xs px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30">
                  AI
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block leading-tight">
                Virtual Research Courtroom
              </div>
            </div>
          </button>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search ticker or company (e.g. AAPL, NVDA, TSLA)..."
              className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
          </form>
        </div>

        {/* Right Controls: Experience Level Toggle, Dictionary, Tour, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Experience Level Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => onToggleExperienceLevel('beginner')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                experienceLevel === 'beginner'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Beginner mode: plain-English explanations & tooltips"
            >
              <span>🌱</span>
              <span className="hidden sm:inline">Beginner</span>
            </button>
            <button
              onClick={() => onToggleExperienceLevel('advanced')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                experienceLevel === 'advanced'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Advanced mode: direct SEC metric tables and ratios"
            >
              <span>📊</span>
              <span className="hidden sm:inline">Advanced</span>
            </button>
          </div>

          {/* Watchthrough button */}
          <button
            onClick={onOpenWatchthrough}
            className="px-2.5 py-1 text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 rounded-xl transition flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
            title="Watch full interactive courtroom walkthrough"
          >
            <span>🎬</span>
            <span className="hidden sm:inline">Watchthrough</span>
          </button>

          {/* Dictionary quick button */}
          <button
            onClick={onOpenDictionary}
            className="p-2 text-slate-400 hover:text-amber-300 hover:bg-slate-900 rounded-xl transition border border-transparent hover:border-slate-800 hidden sm:flex items-center gap-1.5 text-xs"
            title="Open Financial Dictionary"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden lg:inline">Dictionary</span>
          </button>

          {/* Free Stock Resources button */}
          {onOpenFreeResources && (
            <button
              onClick={onOpenFreeResources}
              className="p-2 text-slate-400 hover:text-emerald-300 hover:bg-slate-900 rounded-xl transition border border-transparent hover:border-slate-800 hidden xl:flex items-center gap-1.5 text-xs"
              title="Verified Free Stock Learning Portals"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Free Sources</span>
            </button>
          )}

          {/* Tour button */}
          <button
            onClick={onOpenTour}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition border border-transparent hover:border-slate-800 flex items-center gap-1 text-xs"
            title="Start Onboarding Walkthrough"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Tour</span>
          </button>

          {/* User profile / Login */}
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-2 transition cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
            </div>
            <span className="hidden sm:inline max-w-[100px] truncate">
              {currentUser ? currentUser.name : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
