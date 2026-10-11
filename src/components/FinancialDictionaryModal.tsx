import React, { useState } from 'react';
import { X, Search, BookOpen, Lightbulb, Scale, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { BEGINNER_GLOSSARY } from '../data/beginnerGlossary';
import { GlossaryTerm } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: string;
}

export const FinancialDictionaryModal: React.FC<Props> = ({ isOpen, onClose, initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Basics', 'Financial Metrics', 'Valuation', 'Courtroom Terms', 'Risk & Growth'];

  const filteredTerms = BEGINNER_GLOSSARY.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.simpleDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.relatedTerms.some((rt) => rt.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0d1322] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Financial Dictionary & Legal Glossary
              </h3>
              <p className="text-xs text-slate-400">
                Clear, jargon-free explanations for beginners to master stock research
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search a term (e.g., P/E, EPS, Free Cash Flow, Bull Case, Moat)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Grid of Terms or Detail View */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-medium">No financial terms matching "{searchTerm}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching P/E, EPS, Debt, Market Cap, or Catalyst.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((term) => (
                <div
                  key={term.id}
                  className="p-4 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition">
                          {term.term}
                        </h4>
                        {term.acronym && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                            {term.acronym}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {term.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {term.simpleDefinition}
                    </p>

                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 space-y-1 mb-2">
                      <div className="text-amber-400 font-semibold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Practical Example:
                      </div>
                      <p className="text-slate-400 leading-normal">{term.practicalExample}</p>
                    </div>

                    {term.courtroomTranslation && (
                      <div className="p-2 bg-amber-500/5 rounded-lg border border-amber-500/10 text-[11px] text-amber-200/90 italic mb-2 flex items-start gap-1.5">
                        <Scale className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                        <span>Courtroom: {term.courtroomTranslation}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Tag className="w-3 h-3" />
                      <span>Related:</span>
                      {term.relatedTerms.map((rt, i) => (
                        <button
                          key={i}
                          onClick={() => setSearchTerm(rt)}
                          className="text-amber-400/90 hover:text-amber-300 hover:underline mr-1"
                        >
                          {rt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredTerms.length} financial and legal terms</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition"
          >
            Close Dictionary
          </button>
        </div>
      </div>
    </div>
  );
};
