import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveView } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { CaseDashboard } from './components/CaseDashboard';
import { CourtroomDebate } from './components/CourtroomDebate';
import { EvidenceRoom } from './components/EvidenceRoom';
import { ScenarioAnalysis } from './components/ScenarioAnalysis';
import { StockComparison } from './components/StockComparison';
import { Watchlist } from './components/Watchlist';
import { CaseHistory } from './components/CaseHistory';
import { SettingsView } from './components/SettingsView';
import { StartCaseModal } from './components/StartCaseModal';
import { WhatDoesThisMeanModal } from './components/WhatDoesThisMeanModal';
import { ChallengeClaimModal } from './components/ChallengeClaimModal';
import { FinancialDictionaryModal } from './components/FinancialDictionaryModal';
import { LearningPathModal } from './components/LearningPathModal';
import { AuthModal } from './components/AuthModal';
import { FirstTimeWalkthrough } from './components/FirstTimeWalkthrough';
import { WatchthroughModal } from './components/WatchthroughModal';
import { FreeStockResourcesModal } from './components/FreeStockResourcesModal';
import { fetchLiveStockQuote, applyLiveQuoteToCase } from './services/marketData';

import { MOCK_CASES, getOrCreateCase } from './data/mockStocks';
import { ExperienceLevel, StockCourtCase, UserProfile } from './types';

export default function App() {
  // Navigation & View State
  const [isLandingPage, setIsLandingPage] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [subView, setSubView] = useState<'case' | 'debate' | 'evidence' | 'scenarios'>('case');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Active Court Case (Default to Reliance Industries for Indian market showcase)
  const [currentCase, setCurrentCase] = useState<StockCourtCase>(MOCK_CASES.RELIANCE || MOCK_CASES.AAPL);

  // Experience Level: Default to 'beginner'
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('beginner');

  // Watchlist & History State (with localStorage persistence)
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stockcourt_watchlist');
      return saved ? JSON.parse(saved) : ['RELIANCE', 'TCS', 'AAPL', 'NVDA', 'HDFCBANK'];
    } catch {
      return ['RELIANCE', 'TCS', 'AAPL', 'NVDA', 'HDFCBANK'];
    }
  });

  const [caseHistory, setCaseHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('stockcourt_history');
      return saved ? JSON.parse(saved) : [
        {
          caseId: 'CASE #AAPL-2026',
          ticker: 'AAPL',
          companyName: 'Apple Inc.',
          date: 'Oct 10, 2026',
          verdict: 'CAUTIOUSLY BULLISH'
        },
        {
          caseId: 'CASE #NVDA-2026',
          ticker: 'NVDA',
          companyName: 'NVIDIA Corporation',
          date: 'Oct 9, 2026',
          verdict: 'CAUTIOUSLY BULLISH'
        },
        {
          caseId: 'CASE #TSLA-2026',
          ticker: 'TSLA',
          companyName: 'Tesla, Inc.',
          date: 'Oct 8, 2026',
          verdict: 'NEUTRAL'
        }
      ];
    } catch {
      return [];
    }
  });

  // Current User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('stockcourt_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals
  const [isStartCaseModalOpen, setIsStartCaseModalOpen] = useState(false);
  const [isWhatDoesThisMeanModalOpen, setIsWhatDoesThisMeanModalOpen] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [challengeTarget, setChallengeTarget] = useState<{
    claim: string;
    side: 'BULL' | 'BEAR';
    sourceName?: string;
  } | null>(null);

  const [isDictionaryModalOpen, setIsDictionaryModalOpen] = useState(false);
  const [dictionarySearch, setDictionarySearch] = useState('');

  const [isLearningPathModalOpen, setIsLearningPathModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWatchthroughOpen, setIsWatchthroughOpen] = useState(false);
  const [isFreeResourcesOpen, setIsFreeResourcesOpen] = useState(false);

  // First Time Walkthrough (Check localStorage)
  const [isTourOpen, setIsTourOpen] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('stockcourt_tour_completed');
    } catch {
      return false;
    }
  });

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem('stockcourt_watchlist', JSON.stringify(watchlist));
    } catch {}
  }, [watchlist]);

  useEffect(() => {
    try {
      localStorage.setItem('stockcourt_history', JSON.stringify(caseHistory));
    } catch {}
  }, [caseHistory]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('stockcourt_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('stockcourt_user');
      }
    } catch {}
  }, [currentUser]);

  // Actions
  const handleOpenCase = (ticker: string) => {
    const freshCase = getOrCreateCase(ticker);
    setCurrentCase(freshCase);
    setIsLandingPage(false);
    setActiveView('dashboard');
    setSubView('case');

    // Fetch real-time market data in background (supports NSE Indian stocks and global equities)
    fetchLiveStockQuote(ticker).then((liveQuote) => {
      if (liveQuote && liveQuote.success) {
        setCurrentCase((prev) => {
          if (prev.ticker.toUpperCase() === freshCase.ticker.toUpperCase()) {
            return applyLiveQuoteToCase(prev, liveQuote);
          }
          return prev;
        });
      }
    });

    // Add to history if not present
    setCaseHistory((prev) => {
      const exists = prev.some((h) => h.ticker === freshCase.ticker);
      if (!exists) {
        return [
          {
            caseId: freshCase.caseId,
            ticker: freshCase.ticker,
            companyName: freshCase.companyName,
            date: 'Today',
            verdict: freshCase.verdict.verdictType
          },
          ...prev
        ];
      }
      return prev;
    });
  };

  const handleLaunchNewCase = (ticker: string, focusQuestion: string) => {
    const freshCase = getOrCreateCase(ticker);
    freshCase.focusQuestion = focusQuestion;
    setCurrentCase(freshCase);
    setIsLandingPage(false);
    setActiveView('dashboard');
    setSubView('case');

    // Fetch real-time market data
    fetchLiveStockQuote(ticker).then((liveQuote) => {
      if (liveQuote && liveQuote.success) {
        setCurrentCase((prev) => {
          if (prev.ticker.toUpperCase() === freshCase.ticker.toUpperCase()) {
            return applyLiveQuoteToCase(prev, liveQuote);
          }
          return prev;
        });
      }
    });

    // Add to history
    setCaseHistory((prev) => [
      {
        caseId: freshCase.caseId,
        ticker: freshCase.ticker,
        companyName: freshCase.companyName,
        date: 'Today',
        verdict: freshCase.verdict.verdictType
      },
      ...prev.filter((h) => h.ticker !== freshCase.ticker)
    ]);
  };

  const handleToggleWatchlist = (ticker: string) => {
    if (watchlist.includes(ticker)) {
      setWatchlist(watchlist.filter((t) => t !== ticker));
    } else {
      setWatchlist([...watchlist, ticker]);
    }
  };

  const handleOpenWhatDoesThisMean = (termId: string) => {
    setSelectedTermId(termId);
    setIsWhatDoesThisMeanModalOpen(true);
  };

  const handleOpenChallengeClaim = (claim: string, side: 'BULL' | 'BEAR', sourceName?: string) => {
    setChallengeTarget({ claim, side, sourceName });
    setIsChallengeModalOpen(true);
  };

  const handleCompleteTour = () => {
    setIsTourOpen(false);
    try {
      localStorage.setItem('stockcourt_tour_completed', 'true');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <Navbar
        experienceLevel={experienceLevel}
        onToggleExperienceLevel={(lvl) => setExperienceLevel(lvl)}
        onStartCase={(t) => {
          if (t) {
            handleOpenCase(t);
          } else {
            setIsStartCaseModalOpen(true);
          }
        }}
        onOpenDictionary={() => {
          setDictionarySearch('');
          setIsDictionaryModalOpen(true);
        }}
        onOpenLearningPath={() => setIsLearningPathModalOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenWatchthrough={() => setIsWatchthroughOpen(true)}
        onOpenFreeResources={() => setIsFreeResourcesOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNavigateHome={() => setIsLandingPage(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        {/* Sidebar (Permanent on large desktop, Drawer on mobile/tablet) */}
        {!isLandingPage && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeView={activeView}
            onSelectView={(v) => {
              setActiveView(v);
              if (v === 'dashboard') setSubView('case');
            }}
            onStartNewCase={() => setIsStartCaseModalOpen(true)}
            onOpenWatchthrough={() => setIsWatchthroughOpen(true)}
            onOpenFreeResources={() => setIsFreeResourcesOpen(true)}
            watchlistCount={watchlist.length}
          />
        )}

        {/* Dynamic Content Area */}
        <main className={`flex-1 min-w-0 ${!isLandingPage ? 'lg:pl-68' : ''}`}>
          {isLandingPage ? (
            /* Premium Courtroom Landing Page */
            <LandingPage
              onStartCase={(initialTicker) => {
                if (initialTicker) {
                  handleOpenCase(initialTicker);
                } else {
                  setIsStartCaseModalOpen(true);
                }
              }}
              onExploreDemo={() => handleOpenCase('RELIANCE')}
              onOpenDictionary={() => {
                setDictionarySearch('');
                setIsDictionaryModalOpen(true);
              }}
              onOpenLearningPath={() => setIsLearningPathModalOpen(true)}
              onOpenWatchthrough={() => setIsWatchthroughOpen(true)}
              onOpenFreeResources={() => setIsFreeResourcesOpen(true)}
            />
          ) : (
            /* Inside Courtroom Application Views */
            <>
              {activeView === 'dashboard' && subView === 'case' && (
                <CaseDashboard
                  courtCase={currentCase}
                  experienceLevel={experienceLevel}
                  onOpenWhatDoesThisMean={handleOpenWhatDoesThisMean}
                  onOpenChallengeClaim={handleOpenChallengeClaim}
                  onOpenEvidenceRoom={() => setSubView('evidence')}
                  onOpenDebate={() => setSubView('debate')}
                  onOpenScenarios={() => setSubView('scenarios')}
                  isSavedInWatchlist={watchlist.includes(currentCase.ticker)}
                  onToggleWatchlist={() => handleToggleWatchlist(currentCase.ticker)}
                  onOpenWatchthrough={() => setIsWatchthroughOpen(true)}
                  onOpenFreeResources={() => setIsFreeResourcesOpen(true)}
                />
              )}

              {activeView === 'dashboard' && subView === 'debate' && (
                <CourtroomDebate
                  courtCase={currentCase}
                  onOpenWhatDoesThisMean={handleOpenWhatDoesThisMean}
                  onBackToDashboard={() => setSubView('case')}
                />
              )}

              {(activeView === 'evidence' || (activeView === 'dashboard' && subView === 'evidence')) && (
                <EvidenceRoom
                  courtCase={currentCase}
                  onBackToDashboard={() => {
                    setActiveView('dashboard');
                    setSubView('case');
                  }}
                />
              )}

              {(activeView === 'dashboard' && subView === 'scenarios') && (
                <ScenarioAnalysis
                  courtCase={currentCase}
                  onBackToDashboard={() => setSubView('case')}
                  onOpenWhatDoesThisMean={handleOpenWhatDoesThisMean}
                />
              )}

              {activeView === 'watchlist' && (
                <Watchlist
                  watchlistTickers={watchlist}
                  onRemoveFromWatchlist={(t) => setWatchlist(watchlist.filter((item) => item !== t))}
                  onAddToWatchlist={(t) => {
                    if (!watchlist.includes(t)) setWatchlist([...watchlist, t]);
                  }}
                  onOpenCase={handleOpenCase}
                  onStartNewCase={() => setIsStartCaseModalOpen(true)}
                />
              )}

              {activeView === 'history' && (
                <CaseHistory
                  history={caseHistory}
                  onOpenCase={handleOpenCase}
                  onClearHistory={() => setCaseHistory([])}
                />
              )}

              {activeView === 'compare' && (
                <StockComparison
                  onBackToDashboard={() => {
                    setActiveView('dashboard');
                    setSubView('case');
                  }}
                  onOpenCase={handleOpenCase}
                  onOpenWhatDoesThisMean={handleOpenWhatDoesThisMean}
                />
              )}

              {activeView === 'dictionary' && (
                <div className="py-2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold font-cinzel text-white">Financial Dictionary</h2>
                    <button
                      onClick={() => {
                        setActiveView('dashboard');
                        setSubView('case');
                      }}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg hover:text-white"
                    >
                      ← Back to Dashboard
                    </button>
                  </div>
                  {/* Embedded Dictionary */}
                  <div className="text-xs text-slate-400 mb-4">
                    Browse all plain-English definitions and legal translations:
                  </div>
                  <button
                    onClick={() => {
                      setDictionarySearch('');
                      setIsDictionaryModalOpen(true);
                    }}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Launch Full Screen Searchable Dictionary
                  </button>
                </div>
              )}

              {activeView === 'learn' && (
                <div className="py-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold font-cinzel text-white">Stock Research Learning Path</h2>
                    <button
                      onClick={() => {
                        setActiveView('dashboard');
                        setSubView('case');
                      }}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg hover:text-white"
                    >
                      ← Back to Dashboard
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    6 structured levels designed for complete beginners to understand how to read financial statements, spot risks, and think like the Evidence Judge.
                  </p>
                  <button
                    onClick={() => setIsLearningPathModalOpen(true)}
                    className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Open 6-Level Interactive Course
                  </button>
                </div>
              )}

              {activeView === 'settings' && (
                <SettingsView
                  experienceLevel={experienceLevel}
                  onSetExperienceLevel={setExperienceLevel}
                  onClearHistory={() => setCaseHistory([])}
                  onResetWatchlist={() => setWatchlist(['AAPL', 'NVDA', 'TSLA', 'MSFT'])}
                  onOpenTour={() => setIsTourOpen(true)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* MODALS */}
      {/* 1. Start Case Modal */}
      <StartCaseModal
        isOpen={isStartCaseModalOpen}
        onClose={() => setIsStartCaseModalOpen(false)}
        onLaunchCase={handleLaunchNewCase}
      />

      {/* 2. Educational "What Does This Mean?" Modal */}
      <WhatDoesThisMeanModal
        termId={selectedTermId}
        onClose={() => setIsWhatDoesThisMeanModalOpen(false)}
        onOpenFullDictionary={(term) => {
          setIsWhatDoesThisMeanModalOpen(false);
          setDictionarySearch(term || '');
          setIsDictionaryModalOpen(true);
        }}
      />

      {/* 3. Challenge Claim Cross-Examination Modal */}
      {challengeTarget && (
        <ChallengeClaimModal
          ticker={currentCase.ticker}
          claim={challengeTarget.claim}
          side={challengeTarget.side}
          sourceName={challengeTarget.sourceName}
          onClose={() => {
            setIsChallengeModalOpen(false);
            setChallengeTarget(null);
          }}
        />
      )}

      {/* 4. Full Financial Dictionary Modal */}
      <FinancialDictionaryModal
        isOpen={isDictionaryModalOpen}
        onClose={() => setIsDictionaryModalOpen(false)}
        initialSearch={dictionarySearch}
      />

      {/* 5. 6-Level Learning Path Modal */}
      <LearningPathModal
        isOpen={isLearningPathModalOpen}
        onClose={() => setIsLearningPathModalOpen(false)}
        onOpenCase={(ticker) => {
          setIsLearningPathModalOpen(false);
          handleOpenCase(ticker);
        }}
      />

      {/* 6. User Authentication & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
        onUpdatePreferences={(lvl) => setExperienceLevel(lvl)}
      />

      {/* 7. First-Time Walkthrough Tour */}
      <FirstTimeWalkthrough
        isOpen={isTourOpen}
        onClose={handleCompleteTour}
        onStartFirstCase={() => {
          handleCompleteTour();
          handleOpenCase('RELIANCE');
        }}
      />

      {/* 8. Interactive Courtroom Watchthrough Theater */}
      <WatchthroughModal
        isOpen={isWatchthroughOpen}
        onClose={() => setIsWatchthroughOpen(false)}
        onOpenCase={(ticker) => {
          setIsWatchthroughOpen(false);
          handleOpenCase(ticker);
        }}
      />

      {/* 9. Verified Free Stock Resources & Official Portals Modal */}
      <FreeStockResourcesModal
        isOpen={isFreeResourcesOpen}
        onClose={() => setIsFreeResourcesOpen(false)}
      />
    </div>
  );
}
