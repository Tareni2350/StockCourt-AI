import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, GraduationCap, ShieldCheck, CheckCircle2, Search, Globe, Award, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Resource {
  title: string;
  provider: string;
  category: 'Indian Stock Market' | 'Global Equities' | 'Official Regulators' | 'Fundamental Analysis';
  description: string;
  badge: string;
  url: string;
  highlights: string[];
  isOfficialRegulator?: boolean;
}

export const FREE_STOCK_RESOURCES: Resource[] = [
  {
    title: 'Zerodha Varsity',
    provider: 'Zerodha',
    category: 'Indian Stock Market',
    description: 'The gold standard of free stock market education in India. Covers everything from absolute basics to reading balance sheets, P/E ratios, and risk management.',
    badge: '100% Free • Best for Indian Markets',
    url: 'https://zerodha.com/varsity/',
    highlights: ['Module 1: Introduction to Stock Markets', 'Module 2: Fundamental Analysis', 'Free Certified Quizzes'],
  },
  {
    title: 'NSE India Knowledge Hub',
    provider: 'National Stock Exchange of India (NSE)',
    category: 'Official Regulators',
    description: 'Official educational initiatives and investor learning programs directly from India’s premier stock exchange.',
    badge: 'Official Exchange • Verified',
    url: 'https://www.nseindia.com/learn/find-a-course',
    highlights: ['Official market structure', 'Listing regulations', 'Investor protection guidelines'],
    isOfficialRegulator: true,
  },
  {
    title: 'SEBI Saa₹thi Investor Portal',
    provider: 'Securities and Exchange Board of India (SEBI)',
    category: 'Official Regulators',
    description: 'The Indian capital market regulator’s official investor awareness portal. Guides retail investors on rights, grievances, and due diligence.',
    badge: 'Statutory Regulator • Official',
    url: 'https://investor.sebi.gov.in/',
    highlights: ['Investor rights & charter', 'Recognized research guidelines', 'Scam prevention'],
    isOfficialRegulator: true,
  },
  {
    title: 'Screener.in (Financial Filings)',
    provider: 'Mittal Analytics',
    category: 'Fundamental Analysis',
    description: 'Free access to 10+ years of audited annual reports, quarterly filings, conference call transcripts, and peer comparisons for all NSE & BSE listed stocks.',
    badge: '10-Year Audited Data • Free',
    url: 'https://www.screener.in/',
    highlights: ['Historical balance sheets', 'Free cash flow tracking', 'Credit rating reports'],
  },
  {
    title: 'SEC Investor.gov',
    provider: 'U.S. Securities & Exchange Commission',
    category: 'Official Regulators',
    description: 'Official US government website for retail investors. Offers free tools, compound interest calculators, and guides on understanding 10-K filings.',
    badge: 'U.S. Government • Official',
    url: 'https://www.investor.gov/',
    highlights: ['How to read SEC 10-K & 10-Q filings', 'Compound interest calculators', 'Fee analyzers'],
    isOfficialRegulator: true,
  },
  {
    title: 'Khan Academy: Finance & Capital Markets',
    provider: 'Khan Academy',
    category: 'Global Equities',
    description: 'World-renowned free visual course teaching stocks, bonds, P/E ratios, accounting statements, and valuation models step by step.',
    badge: '100% Free • Visual Learning',
    url: 'https://www.khanacademy.org/economics-finance-policy/core-finance',
    highlights: ['Stocks vs Bonds', 'P/E and Book Value', 'Income statement breakdowns'],
  },
  {
    title: 'CFA Institute Investment Foundations',
    provider: 'CFA Institute',
    category: 'Fundamental Analysis',
    description: 'Free comprehensive curriculum from the CFA Institute covering the global investment industry, ethics, microeconomics, and portfolio structure.',
    badge: 'Global Institutional Standard',
    url: 'https://www.cfainstitute.org/en/programs/investment-foundations',
    highlights: ['Financial statement analysis', 'Corporate governance', 'Equity securities'],
  },
  {
    title: 'BSE India Investor Portal',
    provider: 'Bombay Stock Exchange (BSE)',
    category: 'Official Regulators',
    description: 'Official investor guidance, corporate filings, circulars, and educational booklets from Asia’s oldest stock exchange.',
    badge: 'Official Exchange • Verified',
    url: 'https://www.bseindia.com/investors/',
    highlights: ['Listing compliance', 'Financial disclosure repository', 'Corporate governance rules'],
    isOfficialRegulator: true,
  }
];

export const FreeStockResourcesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['ALL', 'Indian Stock Market', 'Official Regulators', 'Fundamental Analysis', 'Global Equities'];

  const filtered = FREE_STOCK_RESOURCES.filter((res) => {
    const matchCat = selectedCategory === 'ALL' || res.category === selectedCategory;
    const matchSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.provider.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0d1322] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              100% FREE & VERIFIED
            </span>
            <span className="text-xs font-mono text-slate-400">Zero Paywalls • Official Regulatory Sources</span>
          </div>
          <h2 className="text-2xl font-extrabold font-cinzel text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <span>LEARN STOCK RESEARCH: VERIFIED SOURCES</span>
          </h2>
        </div>

        {/* Search & Category Filter */}
        <div className="py-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides, Zerodha Varsity, SEBI, NSE, SEC..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div
                key={item.title}
                className="p-5 bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 rounded-xl flex flex-col justify-between transition group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                        {item.provider}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                        {item.title}
                      </h3>
                    </div>
                    {item.isOfficialRegulator ? (
                      <span className="p-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400" title="Official Government / Exchange Regulator">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        <BookOpen className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg transition shadow-md shadow-amber-500/10 cursor-pointer"
                  >
                    <span>Visit Official Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
