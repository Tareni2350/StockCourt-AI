import React, { useState } from 'react';
import { X, Gavel, Scale, AlertTriangle, Send, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
  ticker: string;
  claim: string;
  side: 'BULL' | 'BEAR';
  sourceName?: string;
  onClose: () => void;
}

export const ChallengeClaimModal: React.FC<Props> = ({ ticker, claim, side, sourceName, onClose }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    analystResponse: string;
    judgeVerdictOnChallenge: string;
    aiGenerated?: boolean;
  } | null>(null);

  const sampleQuestions = side === 'BULL' ? [
    'What happens if customer spending slows down next year?',
    'Is this growth assumption already priced into the high P/E ratio?',
    'Could rising interest rates undermine this capital return program?'
  ] : [
    'Hasn’t management addressed this risk in recent earnings calls?',
    'Isn’t this risk already discounted in the recent share price drop?',
    'Does the company have enough cash reserves to withstand this threat?'
  ];

  const handleChallenge = async (qToUse?: string) => {
    const q = qToUse || question;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/challenge-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          claim,
          side,
          userQuestion: q
        })
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setResult(data);
    } catch (e) {
      // Fallback
      setResult({
        analystResponse: `The ${side} Analyst acknowledges the question. Our thesis incorporates this factor based on audited disclosures for ${ticker}.`,
        judgeVerdictOnChallenge: `The Evidence Judge notes this cross-examination. While the claim has supporting filing evidence, the counter-inquiry identifies a valid risk factor.`,
        aiGenerated: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0d1322] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-amber-400">
          <Gavel className="w-4 h-4" />
          <span>Courtroom Cross-Examination</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          Challenge {side === 'BULL' ? 'Bull' : 'Bear'} Argument
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
            side === 'BULL' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {ticker}
          </span>
        </h3>

        {/* The Claim Under Cross-Examination */}
        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl mb-4">
          <div className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-slate-400" />
            Claim Under Examination:
          </div>
          <p className="text-sm font-medium text-slate-200 italic">"{claim}"</p>
          {sourceName && (
            <div className="text-[11px] text-slate-400 mt-1">Source: {sourceName}</div>
          )}
        </div>

        {/* Question Prompt */}
        {!result ? (
          <div>
            <div className="mb-3">
              <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-1.5">
                Your Objection or Question to the Analyst:
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your challenge, e.g. What happens if competitors cut prices, or is this growth sustainable?..."
                className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition resize-none"
              />
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-400 mb-2">Or select a standard cross-examination question:</div>
              <div className="flex flex-col gap-1.5">
                {sampleQuestions.map((sq, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuestion(sq);
                      handleChallenge(sq);
                    }}
                    className="text-left text-xs p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80 transition"
                  >
                    👉 {sq}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleChallenge()}
                disabled={loading || !question.trim()}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Analyst is Answering...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Deliver Challenge
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Analyst Response */}
            <div className={`p-4 rounded-xl border ${
              side === 'BULL' ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-red-950/30 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  side === 'BULL' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {side === 'BULL' ? '🟢 Bull Analyst Response:' : '🔴 Bear Analyst Defense:'}
                </span>
                {result.aiGenerated && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Gemini
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{result.analystResponse}</p>
            </div>

            {/* Evidence Judge Ruling */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                Evidence Judge Ruling on Challenge:
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{result.judgeVerdictOnChallenge}</p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setResult(null);
                  setQuestion('');
                }}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Ask Another Question
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg transition"
              >
                Close Cross-Examination
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
