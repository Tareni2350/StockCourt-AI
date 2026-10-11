import React from 'react';
import { X, HelpCircle, BookOpen, Lightbulb, Scale } from 'lucide-react';
import { BEGINNER_GLOSSARY } from '../data/beginnerGlossary';

interface Props {
  termId: string | null;
  onClose: () => void;
  onOpenFullDictionary?: (search?: string) => void;
}

export const WhatDoesThisMeanModal: React.FC<Props> = ({ termId, onClose, onOpenFullDictionary }) => {
  if (!termId) return null;

  const item = BEGINNER_GLOSSARY.find(
    (g) => g.id === termId || g.term.toLowerCase().includes(termId.toLowerCase()) || g.acronym?.toLowerCase() === termId.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0d1322] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {item ? (
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2 font-mono text-xs tracking-wider uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Beginner Educational Guide</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              {item.term}
              {item.acronym && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  {item.acronym}
                </span>
              )}
            </h3>

            <div className="mt-4 p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                In Simple Words
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{item.simpleDefinition}</p>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Practical Example</h4>
                <p className="text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800 text-xs leading-relaxed">
                  {item.practicalExample}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Why Does It Matter?</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{item.whyItMatters}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">What Should I Look For?</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{item.whatToLookFor}</p>
              </div>

              {item.courtroomTranslation && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                    <Scale className="w-3.5 h-3.5" />
                    Courtroom Translation
                  </div>
                  <p className="text-xs text-amber-100/90 italic">{item.courtroomTranslation}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenFullDictionary) onOpenFullDictionary(item.term);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition font-medium"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Open in Financial Dictionary →
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
              >
                Got It
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <HelpCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Financial Term Definition</h3>
            <p className="text-sm text-slate-300 mb-4">
              Detailed guidance for this metric is available in our full financial dictionary.
            </p>
            <button
              onClick={() => {
                onClose();
                if (onOpenFullDictionary) onOpenFullDictionary();
              }}
              className="px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition text-xs"
            >
              Browse Full Dictionary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
