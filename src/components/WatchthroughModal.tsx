import React, { useState, useEffect, useRef } from 'react';
import {
  X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Gavel, Scale, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2,
  FileText, Layers, Sparkles, ArrowRight, ExternalLink, Activity
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenCase: (ticker: string) => void;
}

// Synthesize an authentic wooden courtroom gavel strike using Web Audio API
function playSynthesizedGavel() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Gavel sound: sharp woody attack + low body resonance
    const now = ctx.currentTime;
    
    // 1. Strike impact
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.18);
    
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);

    // 2. Secondary wood echo click (gavel table resonance)
    const echoOsc = ctx.createOscillator();
    const echoGain = ctx.createGain();
    echoOsc.type = 'sine';
    echoOsc.frequency.setValueAtTime(260, now + 0.05);
    echoOsc.frequency.exponentialRampToValueAtTime(60, now + 0.22);
    
    echoGain.gain.setValueAtTime(0.35, now + 0.05);
    echoGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    
    echoOsc.connect(echoGain);
    echoGain.connect(ctx.destination);
    echoOsc.start(now + 0.05);
    echoOsc.stop(now + 0.22);
  } catch (err) {
    // Audio Context not permitted without user gesture or unsupported
  }
}

export const WatchthroughModal: React.FC<Props> = ({ isOpen, onClose, onOpenCase }) => {
  const [currentAct, setCurrentAct] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const ACT_DURATION_MS = 6500; // 6.5s per act in autoplay

  const acts = [
    {
      actNumber: 1,
      tag: 'Act I: The Accusation',
      title: 'Selecting Your Defendant & Pulling Live Market Data',
      subtitle: 'Real-time Indian Stock Market (NSE/BSE) & Global Equities',
      caption: 'Instead of asking a chat assistant for an opinion, you summon a public company to stand trial. We query live market feeds from the National Stock Exchange of India (NSE) or NASDAQ.',
      badge: '🇮🇳 NSE: RELIANCE / 🇺🇸 NASDAQ: AAPL',
      visualContent: (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-amber-400 font-bold">CASE #RELIANCE-2026: Reliance Industries Ltd.</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              🟢 LIVE NSE FEED
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-500 text-[10px] block">Live Price</span>
              <span className="text-white font-bold text-sm">₹1,295.50</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-500 text-[10px] block">Daily Change</span>
              <span className="text-emerald-400 font-bold text-sm">+₹14.80 (+1.15%)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-500 text-[10px] block">P/E Ratio</span>
              <span className="text-amber-300 font-bold text-sm">22.8x</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-500 text-[10px] block">Annual Revenue</span>
              <span className="text-emerald-400 font-bold text-sm">₹9,01,064 Cr</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 font-sans">
            💡 <strong>Beginner Note:</strong> Real-time pricing is paired with official annual filings so no numbers are ever fabricated.
          </div>
        </div>
      )
    },
    {
      actNumber: 2,
      tag: 'Act II: The Tribunal Convenes',
      title: 'Convening the Prosecution, Defense & Neutral Judge',
      subtitle: 'The Tri-Partite Courtroom System Eliminates Confirmation Bias',
      caption: 'Two opposing specialist analysts are sworn in. The Bull Analyst represents the prosecution for growth; the Bear Analyst represents the skeptical counter-inquiry.',
      badge: 'COURTROOM ARCHITECTURE',
      visualContent: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-1">
            <div className="font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <span>🟢 BULL ANALYST</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Argues the positive thesis: recurring revenue streams, pricing power, and competitive moats.
            </p>
          </div>
          <div className="p-3.5 bg-red-950/30 border border-red-500/40 rounded-xl space-y-1">
            <div className="font-bold text-red-400 font-mono flex items-center gap-1.5">
              <span>🔴 BEAR ANALYST</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Exposes downside risks: multiple compression, heavy debt service, and regulatory scrutiny.
            </p>
          </div>
          <div className="p-3.5 bg-amber-950/30 border border-amber-500/40 rounded-xl space-y-1">
            <div className="font-bold text-amber-400 font-mono flex items-center gap-1.5">
              <span>⚖️ EVIDENCE JUDGE</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Neutral arbiter: checks audited 10-K / SEBI filings and rates Evidence Strength %.
            </p>
          </div>
        </div>
      )
    },
    {
      actNumber: 3,
      tag: 'Act III: The Bull Case',
      title: 'Building the Strongest Positive Evidence Case',
      subtitle: 'Every claim is scored for confidence and linked to primary filings',
      caption: 'The Bull Analyst presents material facts, distinguishing audited numbers from assumptions. Users can click [View Evidence] or [Challenge Claim] to cross-examine.',
      badge: 'EVIDENCE-BACKED THESIS',
      visualContent: (
        <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span>CLAIM #1: JIO DIGITAL HIGHWAY (RELIANCE)</span>
            <span className="font-bold">Confidence: 93%</span>
          </div>
          <h4 className="text-sm font-bold text-white">
            "Jio telecom dominates India with 480M+ subscribers and expanding ARPU."
          </h4>
          <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 text-[11px] leading-relaxed">
            <strong className="text-emerald-400">Supporting Evidence:</strong> Quarterly EBITDA surpassed ₹15,000 Cr; 5G subscriber additions exceed 130 million.
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
            <span>Source: NSE / SEBI Listing Disclosures</span>
            <span className="text-amber-400 font-bold">Interactive: [View Evidence] [Challenge Claim]</span>
          </div>
        </div>
      )
    },
    {
      actNumber: 4,
      tag: 'Act IV: The Bear Cross-Examination',
      title: 'Aggressive Risk Interrogation & Valuation Stress-Testing',
      subtitle: 'Flagging Critical Downside Triggers and Leverage Pressure',
      caption: 'The Bear Analyst refuses to accept optimistic hype. It interrogates high capital expenditures, debt covenants, and margin pressure with clear severity indicators.',
      badge: 'RISK SEVERITY AUDIT',
      visualContent: (
        <div className="p-4 bg-slate-950 border border-red-500/30 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono text-red-400">
            <span>RISK CLAIM #1: CAPEX BURDEN</span>
            <span className="font-bold px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30">
              Severity: HIGH
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">
            "Ongoing ₹1.3 Lakh Cr annual CapEx suppresses ROE below 10%."
          </h4>
          <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 text-[11px] leading-relaxed">
            <strong className="text-red-400">Critical Inquiry:</strong> High borrowings of ₹3,18,000 Cr mean less cash is immediately returned to shareholders.
          </div>
          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800 flex justify-between">
            <span>Source: Crisil Credit Rating & Balance Sheet Audit</span>
            <span className="text-amber-400 font-bold">Cross-Examination Active</span>
          </div>
        </div>
      )
    },
    {
      actNumber: 5,
      tag: 'Act V: The Judicial Fact-Check',
      title: 'Evidence Judge Independently Audits Every Assertion',
      subtitle: 'The Judge does NOT average scores — it rates Evidence Strength %',
      caption: 'The Evidence Judge tests each argument against primary records. Claims are classified as SUPPORTED, PARTIALLY SUPPORTED, or CONTRADICTED.',
      badge: 'OBJECTIVE ARBITRATION',
      visualContent: (
        <div className="p-4 bg-[#0e1728] border border-amber-500/50 rounded-2xl space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Judicial Claim Audit
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              SUPPORTED (95% Strength)
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Evidence Strength Score</span>
              <span className="text-amber-400 font-bold">95%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[95%]"></div>
            </div>
          </div>
          <p className="text-[11px] text-amber-100/90 italic bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
            <strong>Judge Notes:</strong> TRAI subscriber data and audited quarterly disclosures confirm 480M+ active users. However, green energy monetization remains an unverified multi-year assumption.
          </p>
        </div>
      )
    },
    {
      actNumber: 6,
      tag: 'Act VI: The Courtroom Debate',
      title: 'Adversarial Direct Debate with Judicial Synthesis',
      subtitle: 'Bull vs. Bear Rebuttals with Configurable Rounds',
      caption: 'Watch the analysts argue live across configurable debate rounds. The Judge synthesizes the strongest argument, weakest assertion, missing data, and conflicting facts.',
      badge: 'DEBATE CHAMBER IN SESSION',
      visualContent: (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
          <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded-lg">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-0.5">🟢 BULL ANALYST:</span>
            <span className="text-slate-200 text-[11px]">"Jio and Retail provide an unshakeable cash generation engine."</span>
          </div>
          <div className="text-center text-slate-600 text-xs">↓</div>
          <div className="p-2.5 bg-red-950/20 border border-red-500/20 rounded-lg">
            <span className="text-[10px] font-mono text-red-400 font-bold block mb-0.5">🔴 BEAR ANALYST:</span>
            <span className="text-slate-200 text-[11px]">"Yet massive green energy CapEx restricts returns on invested capital."</span>
          </div>
          <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-[10px] text-amber-300 font-mono">
            ⚖️ Judge: Identifies consumer moat as strongest fact; capex drag as critical risk.
          </div>
        </div>
      )
    },
    {
      actNumber: 7,
      tag: 'Act VII: The Final Gavel Drops',
      title: 'The Evidence-Based Research Verdict & Watchlist',
      subtitle: 'Educating You on Trade-Offs, Not Issuing Direct Buy/Sell Commands',
      caption: 'The trial concludes with an unvarnished research verdict. You receive the confidence rating, what supports the stock, what could change the ruling, and what metrics the Judge is watching next quarter.',
      badge: 'VERDICT ISSUED',
      visualContent: (
        <div className="p-4 bg-gradient-to-r from-amber-950/30 to-slate-950 border-2 border-amber-500/50 rounded-2xl space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">COURT RULING:</span>
              <h3 className="text-lg font-bold font-cinzel text-amber-300">
                🟡 CAUTIOUSLY BULLISH (79% Confidence)
              </h3>
            </div>
            <Gavel className="w-8 h-8 text-amber-400 animate-bounce" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">✓ Supports Ruling:</span>
              <span className="text-slate-300">480M+ Jio subscribers & 18,800+ Retail store network</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-orange-400 font-bold block mb-1">⚠️ Watchlist Risks:</span>
              <span className="text-slate-300">Monitor Jamnagar capex moderation and O2C margins</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 pt-1 text-center font-mono">
            Research first. Decide for yourself.
          </div>
        </div>
      )
    }
  ];

  const current = acts[currentAct];

  // Auto-advance timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    setProgress(0);
    const intervalTime = 50;
    const step = 100 / (ACT_DURATION_MS / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextAct();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentAct]);

  const handleNextAct = () => {
    if (currentAct < acts.length - 1) {
      setCurrentAct((prev) => prev + 1);
      if (soundEnabled) playSynthesizedGavel();
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevAct = () => {
    if (currentAct > 0) {
      setCurrentAct((prev) => prev - 1);
    }
  };

  const handleJumpToAct = (idx: number) => {
    setCurrentAct(idx);
    setProgress(0);
    if (soundEnabled) playSynthesizedGavel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#090d16] border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Courtroom Theater Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Gavel className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <span>STOCKCOURT AI WATCHTHROUGH</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/10 border border-amber-500/30">
                  Act {current.actNumber} of {acts.length}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-cinzel text-white line-clamp-1">
                {current.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition"
              title={soundEnabled ? 'Mute gavel sound effects' : 'Enable gavel sound effects'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition"
              title="Close Watchthrough"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Timeline Scrubber */}
        <div className="w-full bg-slate-950 border-b border-slate-900 px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {acts.map((act, idx) => (
            <button
              key={idx}
              onClick={() => handleJumpToAct(idx)}
              className={`flex-1 min-w-[70px] text-left transition cursor-pointer group`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={idx === currentAct ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                  Act {act.actNumber}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-200 ${
                    idx < currentAct
                      ? 'w-full bg-emerald-500'
                      : idx === currentAct
                      ? 'bg-amber-400'
                      : 'w-0'
                  }`}
                  style={{
                    width: idx === currentAct ? `${progress}%` : undefined
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Main Theater Display Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                {current.tag} • {current.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white mt-0.5">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {current.subtitle}
              </p>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative">
            {current.visualContent}
          </div>

          {/* Narrative Caption */}
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>{current.caption}</p>
          </div>
        </div>

        {/* Bottom Playback Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevAct}
              disabled={currentAct === 0}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white transition cursor-pointer"
              title="Previous Act"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Auto-Tour'}</span>
            </button>

            <button
              onClick={handleNextAct}
              disabled={currentAct === acts.length - 1}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white transition cursor-pointer"
              title="Next Act"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenCase('RELIANCE');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-500/30 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              Try Case: 🇮🇳 Reliance (NSE) <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenCase('AAPL');
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              Launch Courtroom Now <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
