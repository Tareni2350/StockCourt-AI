import React, { useState } from 'react';
import {
  FileText, ShieldCheck, ExternalLink, Search, Filter, AlertCircle,
  Building2, LineChart, Globe, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { StockCourtCase, EvidenceItem } from '../types';

interface Props {
  courtCase: StockCourtCase;
  onBackToDashboard: () => void;
}

export const EvidenceRoom: React.FC<Props> = ({ courtCase, onBackToDashboard }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const evidence = courtCase.evidenceRoom || [];

  const categories = ['All', 'Company Sources', 'Market Data', 'External Sources'];

  const filteredEvidence = evidence.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getReliabilityBadge = (rel: EvidenceItem['reliability']) => {
    switch (rel) {
      case 'OFFICIAL':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
      case 'VERIFIED':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold';
      case 'THIRD_PARTY':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'UNVERIFIED':
      default:
        return 'bg-red-500/20 text-red-300 border-red-500/40 font-bold';
    }
  };

  const getCategoryIcon = (cat: EvidenceItem['category']) => {
    switch (cat) {
      case 'Company Sources':
        return Building2;
      case 'Market Data':
        return LineChart;
      case 'External Sources':
      default:
        return Globe;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0d1322] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <FileText className="w-4 h-4" />
              <span>Evidentiary Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white flex items-center gap-2">
              Evidence Room: {courtCase.companyName} ({courtCase.ticker})
            </h1>
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Dashboard
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search evidence exhibits..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Strict Grounding Notice */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
        <div>
          <span className="font-bold text-white">Strict Legal Evidentiary Standard: </span>
          StockCourt AI strictly prohibits fabricating citations, analyst opinions, or financial ratios. If an exhibit cannot be validated against public filings, it is marked <strong className="text-red-400">UNVERIFIED</strong>.
        </div>
      </div>

      {/* Evidence Exhibits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvidence.map((item, idx) => {
          const CategoryIcon = getCategoryIcon(item.category);

          return (
            <div
              key={item.id || idx}
              className="p-5 bg-[#0d1322] border border-slate-800 hover:border-slate-700 rounded-2xl shadow-lg flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-900 rounded-lg text-slate-400 border border-slate-800">
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Exhibit #{idx + 1} • {item.sourceType}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        {item.sourceName}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getReliabilityBadge(
                      item.reliability
                    )}`}
                  >
                    {item.reliability}
                  </span>
                </div>

                {/* Excerpt */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-serif italic mb-3">
                  "{item.excerpt}"
                </div>

                {/* Citation */}
                <div className="text-[11px] text-slate-400 font-mono space-y-1 mb-3">
                  <div>
                    <span className="text-slate-500">Legal Citation: </span>
                    <span className="text-slate-300">{item.citation}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500">
                    <span>Published: {item.publicationDate}</span>
                    <span>Data Period: {item.dataDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500 font-mono">
                  Category: {item.category}
                </span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition text-xs"
                  >
                    Verify at SEC / Public Archive <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
