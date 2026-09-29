import React from 'react';
import { Search, X, Briefcase, Sparkles, MapPin } from 'lucide-react';

interface CareerHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
  onQuickSearch: (tag: string) => void;
  totalPositions: number;
}

export const CareerHero: React.FC<CareerHeroProps> = ({
  badge = 'CAREERS AT SILVERLINE',
  title = 'Build Your Future With SilverLine Hospital',
  subtitle = 'Join a multidisciplinary team dedicated to delivering compassionate, advanced, and patient-centred healthcare in Central Tamil Nadu.',
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onQuickSearch,
  totalPositions,
}) => {
  const quickTags = ['Staff Nurse', 'ICU Care', 'Medical Officer', 'Dialysis', 'Radiographer', 'Pharmacy'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F9FA] via-white to-white py-14 md:py-20 border-b border-gray-100">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00B5A5]/10 blur-3xl" />
        <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-[#0E2A47]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#00B5A5]/25 shadow-xs mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B5A5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B5A5]"></span>
          </span>
          <span className="text-xs font-bold tracking-wider text-[#0E2A47] uppercase">
            {badge}
          </span>
          <span className="text-xs text-gray-400">|</span>
          <span className="text-xs font-semibold text-[#00B5A5]">
            {totalPositions} Open Positions
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E2A47] tracking-tight leading-tight max-w-3xl mx-auto">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Search Bar Container */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit(e);
            }}
            className="relative flex flex-col sm:flex-row items-stretch bg-white rounded-2xl p-2 shadow-lg shadow-slate-200/60 border border-gray-200 focus-within:border-[#00B5A5] focus-within:ring-3 focus-within:ring-[#00B5A5]/15 transition-all"
          >
            <div className="relative flex-1 flex items-center pl-3 pr-2 py-1">
              <Search className="w-5 h-5 text-gray-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search job title, department or keyword..."
                className="w-full text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent border-none focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 sm:mt-0 px-6 py-3 rounded-xl bg-[#00B5A5] hover:bg-[#0E2A47] text-white font-semibold text-sm transition-colors duration-200 shadow-sm shrink-0 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Positions</span>
            </button>
          </form>

          {/* Quick Keywords Chips */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-500">
            <span className="font-medium text-gray-600 mr-1">Popular Roles:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onQuickSearch(tag)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  searchQuery.toLowerCase().includes(tag.toLowerCase())
                    ? 'bg-[#00B5A5] text-white border-[#00B5A5]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#00B5A5] hover:text-[#00B5A5]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Location & Institution highlights */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#00B5A5]" />
            <span>Palur Campus, Trichy</span>
          </div>
          <span className="hidden sm:inline text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#00B5A5]" />
            <span>Full-Time Clinical & Allied Positions</span>
          </div>
          <span className="hidden sm:inline text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#00B5A5]" />
            <span>Equal Opportunity Employer</span>
          </div>
        </div>
      </div>
    </section>
  );
};
