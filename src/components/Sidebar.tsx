import React from 'react';
import {
  Gavel, Scale, LayoutDashboard, Bookmark, History, GitCompare,
  FileText, BookOpen, GraduationCap, Settings, X, PlusCircle, Sparkles
} from 'lucide-react';

export type ActiveView =
  | 'dashboard'
  | 'watchlist'
  | 'history'
  | 'compare'
  | 'evidence'
  | 'dictionary'
  | 'learn'
  | 'settings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onStartNewCase: () => void;
  onOpenWatchthrough?: () => void;
  onOpenFreeResources?: () => void;
  watchlistCount: number;
}

export const Sidebar: React.FC<Props> = ({
  isOpen,
  onClose,
  activeView,
  onSelectView,
  onStartNewCase,
  onOpenWatchthrough,
  onOpenFreeResources,
  watchlistCount
}) => {
  const navItems: { id: ActiveView; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Court Dashboard', icon: LayoutDashboard },
    { id: 'watchlist', label: 'My Watchlist', icon: Bookmark, badge: watchlistCount > 0 ? String(watchlistCount) : undefined },
    { id: 'history', label: 'Previous Cases', icon: History },
    { id: 'compare', label: 'Compare Stocks', icon: GitCompare },
    { id: 'evidence', label: 'Evidence Room', icon: FileText },
    { id: 'dictionary', label: 'Financial Dictionary', icon: BookOpen },
    { id: 'learn', label: 'Learn Stock Research', icon: GraduationCap, badge: '6 Levels' },
    { id: 'settings', label: 'Court Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#090d16] border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Mobile Close */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-extrabold font-cinzel text-base tracking-wider text-white">
                STOCKCOURT
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              onStartNewCase();
              onClose();
            }}
            className="w-full mb-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Gavel className="w-4 h-4" />
            <span>Start a Case</span>
          </button>

          {onOpenWatchthrough && (
            <button
              onClick={() => {
                onOpenWatchthrough();
                onClose();
              }}
              className="w-full mb-4 py-2 px-3 bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <span>🎬</span>
              <span>Watch Courtroom Tour</span>
            </button>
          )}

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {onOpenFreeResources && (
              <button
                onClick={() => {
                  onOpenFreeResources();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 border border-emerald-500/20 transition cursor-pointer mt-2"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>Free Learning Links</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                  Verified
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* Footer Courtroom Chamber Badge */}
        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] uppercase">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>AI Evidence Engine v2.6</span>
          </div>
          <p className="text-[10px] text-slate-600">
            Educational stock trial docket. Not financial advice.
          </p>
        </div>
      </aside>
    </>
  );
};
