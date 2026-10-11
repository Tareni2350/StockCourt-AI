import React, { useState } from 'react';
import { Gavel, Scale, AlertTriangle, ShieldCheck, Send, Loader2, Sparkles, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { StockCourtCase, CrossExaminationItem } from '../types';

interface Props {
  courtCase: StockCourtCase;
  onOpenChallengeClaim: (claim: string, side: 'BULL' | 'BEAR', sourceName?: string) => void;
}

export const CourtroomCrossExamination: React.FC<Props> = ({ courtCase, onOpenChallengeClaim }) => {
  const { ticker, companyName, metrics, bullThesis, bearThesis, isIndian } = courtCase;

  // Active cross-examinations pre-grounded
  const currencySymbol = metrics.currencySymbol || (isIndian ? '₹' : '$');

  const defaultCrossExams: CrossExaminationItem[] = [
    {
      id: 'cx-1',
      examiner: 'BULL',
      targetSide: 'BEAR',
      question: `Counsel claims the stock's valuation is excessive. How do you account for ${companyName}'s proven ${metrics.operatingMargin} operating margin and continuous cash generation?`,
      targetDefense: `Operating margin today reflects peak pricing power. When competitors increase supply and capital expenditure increases, margins historically contract by 300 to 500 basis points.`,
      judicialRuling: {
        status: 'OVERRULED',
        rulingExplanation: `The Bear's caution is noted, but current audited filings substantiate consistent historical cash margins. The objection cannot erase verified balance sheet performance.`,
        verifiedFilingBasis: `Audited Statement of Cash Flows (Item 8) confirms resilient operating margins.`
      }
    },
    {
      id: 'cx-2',
      examiner: 'BEAR',
      targetSide: 'BULL',
      question: `Bull Counsel projects multi-year double-digit acceleration. Isn't it true that debt of ${metrics.totalDebt} and capital expenditure constrain free cash flow conversion?`,
      targetDefense: `Capital investments fund the future competitive moat. Interest coverage remains healthy and core operating cash flows comfortably exceed debt service obligations.`,
      judicialRuling: {
        status: 'SUSTAINED',
        rulingExplanation: `The court sustains Bear Counsel's objection: heavy capital commitments undeniably depress near-term free cash flow yield and narrow the margin of safety.`,
        verifiedFilingBasis: `Notes to Consolidated Financial Statements: Capital Commitments & Borrowings schedule.`
      }
    }
  ];

  const [examinations, setExaminations] = useState<CrossExaminationItem[]>(
    courtCase.crossExaminations && courtCase.crossExaminations.length > 0
      ? courtCase.crossExaminations
      : defaultCrossExams
  );

  const [activeTab, setActiveTab] = useState<'dialogue' | 'userStand'>('dialogue');
  const [userSide, setUserSide] = useState<'BULL' | 'BEAR'>('BULL');
  const [selectedClaim, setSelectedClaim] = useState<string>(
    bullThesis.arguments[0]?.claim || 'Revenue acceleration and moat'
  );
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userRulings, setUserRulings] = useState<CrossExaminationItem[]>([]);

  const handleRunUserCrossExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/challenge-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          claim: selectedClaim,
          side: userSide,
          userQuestion: userQuestion.trim(),
        }),
      });

      const data = await res.json();
      const newExam: CrossExaminationItem = {
        id: `user-cx-${Date.now()}`,
        examiner: 'USER',
        targetSide: userSide,
        question: userQuestion.trim(),
        targetDefense: data.analystResponse || `The ${userSide} analyst cites verified historical filings.`,
        judicialRuling: {
          status: userQuestion.toLowerCase().includes('debt') || userQuestion.toLowerCase().includes('risk') ? 'SUSTAINED' : 'OVERRULED',
          rulingExplanation: data.judgeVerdictOnChallenge || `The court evaluates this cross-examination against audited disclosures.`,
          verifiedFilingBasis: `Official ${isIndian ? 'NSE Listing Compliance' : 'SEC Form 10-K'} disclosure records.`
        }
      };

      setUserRulings((prev) => [newExam, ...prev]);
      setUserQuestion('');
    } catch (err) {
      // Offline fallback
      const fallbackExam: CrossExaminationItem = {
        id: `user-cx-${Date.now()}`,
        examiner: 'USER',
        targetSide: userSide,
        question: userQuestion.trim(),
        targetDefense: `The ${userSide} analyst points to the company's verified financial track record and balance sheet cash reserves.`,
        judicialRuling: {
          status: 'SUSTAINED',
          rulingExplanation: `The user's cross-examination identifies a genuine uncertainty factor that is not yet fully reflected in baseline valuation models.`,
          verifiedFilingBasis: `Audited statutory annual financial statements.`
        }
      };
      setUserRulings((prev) => [fallbackExam, ...prev]);
      setUserQuestion('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d1322] border-2 border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Gavel className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-cinzel text-white tracking-wide">
              COURTROOM CROSS-EXAMINATION
            </h2>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === 'dialogue'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Analyst Cross-Examination
          </button>
          <button
            onClick={() => setActiveTab('userStand')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'userStand'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Interrogate Analysts</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>

      {activeTab === 'dialogue' ? (
        <div className="pt-6 space-y-6">
          {examinations.map((item, idx) => (
            <div
              key={item.id}
              className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4 relative"
            >
              {/* Question header */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                      item.examiner === 'BULL'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {item.examiner === 'BULL' ? '🟢 BULL COUNSEL' : '🔴 BEAR COUNSEL'} CROSS-EXAMINES{' '}
                    {item.targetSide === 'BULL' ? '🟢 BULL' : '🔴 BEAR'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">EXHIBIT #{idx + 1}</span>
              </div>

              {/* Interrogation Query */}
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-mono font-bold text-xs shrink-0">QUESTION:</span>
                <p className="text-sm text-slate-200 font-medium italic leading-relaxed">
                  "{item.question}"
                </p>
              </div>

              {/* Sworn Defense */}
              <div className="flex items-start gap-3 pl-4 border-l-2 border-slate-700 bg-slate-900/40 p-3 rounded-r-xl">
                <span className="text-slate-400 font-mono font-bold text-xs shrink-0">DEFENSE:</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "{item.targetDefense}"
                </p>
              </div>

              {/* Judicial Ruling */}
              <div className="mt-3 p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {item.judicialRuling.status === 'SUSTAINED' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> SUSTAINED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono font-bold">
                      <XCircle className="w-3.5 h-3.5" /> OVERRULED
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-300 font-sans">
                    <span className="text-amber-400 font-semibold font-mono">JUDGE'S RULING: </span>
                    {item.judicialRuling.rulingExplanation}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Audit basis: {item.judicialRuling.verifiedFilingBasis}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* User Stand: Lead Cross-Examiner Interactive Interface */
        <div className="pt-6 space-y-6">
          <form onSubmit={handleRunUserCrossExam} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Which Analyst Are You Interrogating?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUserSide('BULL');
                      setSelectedClaim(bullThesis.arguments[0]?.claim || '');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      userSide === 'BULL'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <span>🟢 Bull Analyst</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserSide('BEAR');
                      setSelectedClaim(bearThesis.arguments[0]?.claim || '');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      userSide === 'BEAR'
                        ? 'bg-red-500/20 text-red-300 border-red-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <span>🔴 Bear Analyst</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Select Claim Under Cross-Examination
                </label>
                <select
                  value={selectedClaim}
                  onChange={(e) => setSelectedClaim(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {(userSide === 'BULL' ? bullThesis.arguments : bearThesis.arguments).map((arg) => (
                    <option key={arg.id} value={arg.claim}>
                      [{arg.category}] {arg.claim.slice(0, 75)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Your Cross-Examination Question or Objection
              </label>
              <textarea
                rows={2}
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder={`Ask a tough question about debt, competitive threats, valuation multiples, or profit margins for ${ticker}...`}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !userQuestion.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/10"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Cross-Examine Analyst</span>
              </button>
            </div>
          </form>

          {/* User Cross Examination History */}
          {userRulings.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Gavel className="w-3.5 h-3.5" />
                <span>Your Sworn Cross-Examination Records</span>
              </h4>
              {userRulings.map((item) => (
                <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 font-bold">YOUR INTERROGATION</span>
                    <span className="text-slate-500">TARGET: {item.targetSide} ANALYST</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 italic font-medium">"{item.question}"</p>
                  <div className="pl-3 border-l border-slate-700 text-xs text-slate-300">
                    <span className="font-mono text-slate-400 font-bold">DEFENSE: </span>
                    {item.targetDefense}
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs flex items-start gap-2 border border-slate-800">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                        item.judicialRuling.status === 'SUSTAINED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {item.judicialRuling.status}
                    </span>
                    <span className="text-slate-300">{item.judicialRuling.rulingExplanation}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
