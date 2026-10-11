import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, User, Check, Sparkles } from 'lucide-react';
import { UserProfile, ExperienceLevel } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onUpdatePreferences: (level: ExperienceLevel) => void;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onUpdatePreferences
}) => {
  const [tab, setTab] = useState<'login' | 'signup' | 'forgot' | 'profile'>(currentUser ? 'profile' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      name: name.trim() || email.split('@')[0] || 'Research Analyst',
      email: email || 'analyst@stockcourt.ai',
      preferredLevel: 'beginner',
      joinedDate: 'October 2026',
      watchlist: ['AAPL', 'NVDA', 'MSFT'],
      caseHistory: [
        { caseId: 'CASE #AAPL-2026', ticker: 'AAPL', companyName: 'Apple Inc.', date: 'Oct 10, 2026', verdict: 'CAUTIOUSLY BULLISH' },
        { caseId: 'CASE #NVDA-2026', ticker: 'NVDA', companyName: 'NVIDIA Corporation', date: 'Oct 9, 2026', verdict: 'CAUTIOUSLY BULLISH' },
        { caseId: 'CASE #TSLA-2026', ticker: 'TSLA', companyName: 'Tesla, Inc.', date: 'Oct 8, 2026', verdict: 'NEUTRAL' }
      ]
    };
    onLogin(newUser);
    onClose();
  };

  const handleGoogleAuth = () => {
    const googleUser: UserProfile = {
      name: 'Google User',
      email: 'investor.google@gmail.com',
      preferredLevel: 'beginner',
      joinedDate: 'October 2026',
      watchlist: ['AAPL', 'NVDA', 'MSFT', 'TSLA'],
      caseHistory: [
        { caseId: 'CASE #AAPL-2026', ticker: 'AAPL', companyName: 'Apple Inc.', date: 'Oct 10, 2026', verdict: 'CAUTIOUSLY BULLISH' },
        { caseId: 'CASE #NVDA-2026', ticker: 'NVDA', companyName: 'NVIDIA Corporation', date: 'Oct 9, 2026', verdict: 'CAUTIOUSLY BULLISH' }
      ]
    };
    onLogin(googleUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0d1322] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* Profile & Preferences view */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold text-lg">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
                <div className="text-[10px] text-amber-400 font-mono mt-0.5">Member since {currentUser.joinedDate}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Experience Level Preference
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onUpdatePreferences('beginner')}
                  className={`p-3 rounded-xl text-xs font-semibold border text-left transition ${
                    currentUser.preferredLevel === 'beginner'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>🌱 Beginner</span>
                    {currentUser.preferredLevel === 'beginner' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <p className="text-[10px] text-slate-400 font-normal">
                    Plain-English explanations, tooltips, and guided definitions
                  </p>
                </button>
                <button
                  onClick={() => onUpdatePreferences('advanced')}
                  className={`p-3 rounded-xl text-xs font-semibold border text-left transition ${
                    currentUser.preferredLevel === 'advanced'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>📊 Advanced</span>
                    {currentUser.preferredLevel === 'advanced' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <p className="text-[10px] text-slate-400 font-normal">
                    Direct SEC metric tables, dense ratios, and terminal analytics
                  </p>
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs space-y-1">
              <div className="text-slate-400">Watchlist: <span className="text-white font-mono">{currentUser.watchlist.length} stocks</span></div>
              <div className="text-slate-400">Saved Cases: <span className="text-white font-mono">{currentUser.caseHistory.length} trials completed</span></div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Login / Signup Tabs */
          <div>
            <div className="flex border-b border-slate-800 mb-5">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 pb-2.5 text-xs font-semibold border-b-2 transition ${
                  tab === 'login' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 pb-2.5 text-xs font-semibold border-b-2 transition ${
                  tab === 'signup' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Quick Google Sign In */}
            <button
              onClick={handleGoogleAuth}
              className="w-full mb-4 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-800"></div>
              <span className="px-3 text-[10px] text-slate-500 uppercase tracking-widest font-mono">or email</span>
              <div className="flex-1 border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleSimulateLogin} className="space-y-3">
              {tab === 'signup' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Your Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="analyst@domain.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-semibold text-slate-400">Password</label>
                  {tab === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMessage('A password reset link has been dispatched to your email.')}
                      className="text-[10px] text-amber-400 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {message && (
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs rounded-xl">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition mt-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                {tab === 'login' ? 'Sign In to Courtroom' : 'Create Free Research Account'}
              </button>
            </form>

            <div className="mt-4 text-center text-[11px] text-slate-500">
              Demo accounts persist locally to track your watchlist and completed cases.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
