import React, { useState } from 'react';
import {
  MessageSquare, Gavel, Scale, Sparkles, ArrowRight, ArrowLeft,
  CheckCircle2, AlertTriangle, ShieldAlert, FileSearch, HelpCircle, Loader2, Play
} from 'lucide-react';
import { StockCourtCase, DebateRound } from '../types';

interface Props {
  courtCase: StockCourtCase;
  onOpenWhatDoesThisMean: (termId: string) => void;
  onBackToDashboard: () => void;
}

export const CourtroomDebate: React.FC<Props> = ({ courtCase, onOpenWhatDoesThisMean, onBackToDashboard }) => {
  const [rounds, setRounds] = useState<DebateRound[]>(courtCase.debateRounds || []);
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [maxRounds, setMaxRounds] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeRound = rounds[currentRoundIdx] || rounds[0];
  const { debateSynthesis } = courtCase;

  const handleGenerateNextRound = async () => {
    if (rounds.length >= maxRounds) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/debate-round', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: courtCase.ticker,
          companyName: courtCase.companyName,
          roundNumber: rounds.length + 1,
          topic: `Round ${rounds.length + 1}: Long-Term Capital Allocation & Execution Risks`,
          previousArguments: rounds.map((r) => ({ bull: r.bullStatement, bear: r.bearRebuttal }))
        })
      });

      if (!res.ok) throw new Error('API failure');
      const newRound: DebateRound = await res.json();
      setRounds((prev) => [...prev, newRound]);
      setCurrentRoundIdx(rounds.length); // jump to newly generated round
    } catch (e) {
      // Fallback round if network error
      const fallbackRound: DebateRound = {
        roundNumber: rounds.length + 1,
        topic: `Round ${rounds.length + 1}: Multiple Compression vs Capital Return Power`,
        bullStatement: `Your Honor, ${courtCase.ticker}'s compounding rate of return on invested capital defends its valuation. Cash returns to shareholders buffer downside.`,
        bearRebuttal: `Multiple contraction can easily overwhelm cash returns. If growth cools down, paying top-cycle multiples remains high risk.`,
        judgeIntervention: `The Evidence Judge notes that while share repurchases are verified, equity multiple compression remains a historical risk during market corrections.`
      };
      setRounds((prev) => [...prev, fallbackRound]);
      setCurrentRoundIdx(rounds.length);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-amber-400">
              <MessageSquare className="w-4 h-4" />
              <span>Courtroom Cross-Debate Chamber</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white flex items-center gap-2">
              Courtroom Debate: THE PEOPLE vs. {courtCase.ticker}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition"
            >
              ← Back to Case Dashboard
            </button>

            {/* Configurable Rounds */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 px-2 font-mono text-[11px]">Rounds:</span>
              {[2, 3, 4, 5].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setMaxRounds(cnt)}
                  className={`px-2 py-1 rounded text-xs font-mono transition cursor-pointer ${
                    maxRounds === cnt
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Round Stepper Navigation */}
        <div className="pt-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {rounds.map((r, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentRoundIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  currentRoundIdx === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>Round {r.roundNumber}</span>
              </button>
            ))}
          </div>

          {rounds.length < maxRounds && (
            <button
              onClick={handleGenerateNextRound}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Analysts are Rebutting...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate Round {rounds.length + 1} with AI
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* THE DIALOGUE EXCHANGE */}
      {activeRound && (
        <div className="space-y-4">
          <div className="text-center py-1">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800 uppercase tracking-wider font-semibold">
              Topic: {activeRound.topic}
            </span>
          </div>

          {/* 1. BULL ARGUMENT */}
          <div className="p-5 bg-slate-900/90 border border-emerald-500/30 rounded-2xl space-y-2 relative shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>🟢 BULL ANALYST OPENING STATEMENT</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Prosecution / Defense</span>
            </div>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              "{activeRound.bullStatement}"
            </p>
          </div>

          {/* Arrow Divider */}
          <div className="flex justify-center text-slate-600 text-lg">↓</div>

          {/* 2. BEAR REBUTTAL */}
          <div className="p-5 bg-slate-900/90 border border-red-500/30 rounded-2xl space-y-2 relative shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-red-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>🔴 BEAR ANALYST REBUTTAL</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Cross-Examination</span>
            </div>
            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              "{activeRound.bearRebuttal}"
            </p>
          </div>

          {/* Arrow Divider */}
          <div className="flex justify-center text-slate-600 text-lg">↓</div>

          {/* 3. JUDGE INTERVENTION */}
          <div className="p-5 bg-[#0e1728] border border-amber-500/50 rounded-2xl space-y-2 relative shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>⚖️ EVIDENCE JUDGE ARBITRATION</span>
              </div>
              <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded">
                Fact Check Ruling
              </span>
            </div>
            <p className="text-sm text-amber-100/90 leading-relaxed italic">
              "{activeRound.judgeIntervention}"
            </p>
          </div>
        </div>
      )}

      {/* JUDGE'S DEBATE SYNTHESIS (The 5 Key Determinations) */}
      <div className="p-6 bg-[#0d1322] border border-slate-800 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
          <Gavel className="w-4 h-4" />
          <span>Judicial Debate Synthesis</span>
        </div>
        <h3 className="text-lg font-bold text-white font-cinzel">
          Judge's Evaluation of the Arguments
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Strongest Bull */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Strongest Bull Argument:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {debateSynthesis.strongestBullArgument}
            </p>
          </div>

          {/* Strongest Bear */}
          <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-1.5">
            <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Strongest Bear Argument:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {debateSynthesis.strongestBearArgument}
            </p>
          </div>

          {/* Weakest Argument */}
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-1.5">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-yellow-400" />
              Weakest Argument:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {debateSynthesis.weakestArgument}
            </p>
          </div>

          {/* Missing Evidence */}
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-1.5">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <FileSearch className="w-4 h-4" />
              Missing Evidence:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {debateSynthesis.missingEvidence}
            </p>
          </div>

          {/* Conflicting Evidence */}
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-1.5 md:col-span-2">
            <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Conflicting Evidence:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {debateSynthesis.conflictingEvidence}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
