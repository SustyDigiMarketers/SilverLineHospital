import React, { useState, useMemo, useContext, useEffect } from 'react';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import SEO from '../components/SEO';
import { generateBreadcrumbSchema, generateFAQSchema, HOSPITAL_NAP } from '../lib/seoConfig';
import { CareerHero } from '../components/Career/CareerHero';
import { JobCard } from '../components/Career/JobCard';
import { WhySilverLine } from '../components/Career/WhySilverLine';
import { CareerFAQ } from '../components/Career/CareerFAQ';
import { JobApplicationModal } from '../components/Career/JobApplicationModal';
import { JobItem } from '../components/Career/CareerTypes';
import {
  Briefcase,
  Search,
  RotateCcw,
  Heart,
  SlidersHorizontal,
  ArrowUpDown,
  Mail,
  Building2,
  CheckCircle2
} from 'lucide-react';

const CareerPage: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const careerConfig = config.career || {};

  // Raw jobs list from config or default fallback
  const rawJobs: JobItem[] = useMemo(() => {
    return Array.isArray(careerConfig.jobs) ? careerConfig.jobs : [];
  }, [careerConfig.jobs]);

  // States for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'urgent'>('default');

  // Bookmarking / saved jobs persistence
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('silverline_saved_jobs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal state
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobItem | null>(null);

  // Sync saved jobs with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('silverline_saved_jobs', JSON.stringify(savedJobIds));
    } catch {
      // ignore
    }
  }, [savedJobIds]);

  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  // Derive department list with counts
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    rawJobs.forEach((job) => {
      const dept = job.department || 'General';
      counts[dept] = (counts[dept] || 0) + 1;
    });

    const list = Object.keys(counts).map((dept) => ({
      name: dept,
      count: counts[dept],
    }));

    return [{ name: 'All', count: rawJobs.length }, ...list];
  }, [rawJobs]);

  // Derive job type list with counts
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    rawJobs.forEach((job) => {
      const type = job.type || 'Full Time';
      counts[type] = (counts[type] || 0) + 1;
    });

    const list = Object.keys(counts).map((type) => ({
      name: type,
      count: counts[type],
    }));

    return [{ name: 'All', count: rawJobs.length }, ...list];
  }, [rawJobs]);

  // Pill filter options for desktop/tablet
  const filterPillOptions = useMemo(() => {
    const foundTypes = Array.from(new Set(rawJobs.map((j) => j.type).filter(Boolean)));
    const defaultTypes = ['Full Time', 'Contract'];
    const merged = Array.from(new Set([...defaultTypes, ...foundTypes]));

    return [
      { id: 'All', label: 'All Jobs' },
      ...merged.map((t) => ({ id: t, label: t })),
    ];
  }, [rawJobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    return rawJobs
      .filter((job) => {
        // Saved filter
        if (onlySaved && !savedJobIds.includes(job.id)) {
          return false;
        }

        // Department filter
        if (selectedDepartment !== 'All' && job.department !== selectedDepartment) {
          return false;
        }

        // Type filter (with normalization)
        if (selectedType !== 'All') {
          const jobTypeNorm = (job.type || '').toLowerCase().replace(/[-_]/g, ' ').trim();
          const selectedNorm = selectedType.toLowerCase().replace(/[-_]/g, ' ').trim();
          if (jobTypeNorm !== selectedNorm) {
            return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = job.title?.toLowerCase().includes(q);
          const matchDept = job.department?.toLowerCase().includes(q);
          const matchDesc = job.description?.toLowerCase().includes(q);
          const matchLoc = job.location?.toLowerCase().includes(q);
          const matchType = job.type?.toLowerCase().includes(q);
          const matchTags = job.tags?.some((t) => t.toLowerCase().includes(q));

          return matchTitle || matchDept || matchDesc || matchLoc || matchType || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'urgent') {
          if (a.urgent && !b.urgent) return -1;
          if (!a.urgent && b.urgent) return 1;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [rawJobs, searchQuery, selectedDepartment, selectedType, onlySaved, savedJobIds, sortBy]);

  const hasActiveFilters =
    selectedDepartment !== 'All' || selectedType !== 'All' || searchQuery.trim() !== '' || onlySaved;

  const handleResetFilters = () => {
    setSelectedDepartment('All');
    setSelectedType('All');
    setSearchQuery('');
    setOnlySaved(false);
    setSortBy('default');
  };

  const handleQuickSearch = (tag: string) => {
    setSearchQuery(tag);
    setSelectedDepartment('All');
    setSelectedType('All');
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = () => {
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Structured Data Schema
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/career' },
  ]);

  const faqList = careerConfig.faqs || [
    {
      question: 'What is the recruitment process at SilverLine Hospital?',
      answer:
        'Our recruitment process includes online application review, preliminary telephone screening by HR, technical/clinical interview with department heads, and an in-person panel discussion with credential verification.',
    },
    {
      question: 'Are there hostel or accommodation facilities for outstation nursing and allied staff?',
      answer:
        'Yes, SilverLine Hospital provides secure, comfortable, and hygienic accommodation and subsidized dining facilities for outstation female nurses and healthcare technicians.',
    },
    {
      question: 'What documents should I bring for the interview?',
      answer:
        'Please carry your updated CV, educational certificates, State Medical/Nursing Council Registration Certificate, experience letters from previous employers, and government photo ID (Aadhaar/PAN).',
    },
  ];

  const faqSchema = generateFAQSchema(faqList);

  return (
    <div className="bg-white text-gray-800">
      <SEO
        title="Careers & Healthcare Job Vacancies in Trichy | SilverLine Hospital"
        description="Explore rewarding healthcare career opportunities at SilverLine Hospital Trichy. Openings for Staff Nurses, Doctors, Dialysis Technicians, Pharmacists, Radiographers & Hospital Administrators."
        canonical="/career"
        schema={[breadcrumbsSchema, faqSchema].filter(Boolean)}
      />

      {/* Hero Section */}
      <CareerHero
        badge={careerConfig.hero?.badge || 'CAREERS AT SILVERLINE'}
        title={careerConfig.hero?.title || 'Build Your Future With SilverLine Hospital'}
        subtitle={
          careerConfig.hero?.subtitle ||
          'Join a multidisciplinary team dedicated to delivering compassionate, advanced, and patient-centred healthcare across Central Tamil Nadu.'
        }
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onQuickSearch={handleQuickSearch}
        totalPositions={rawJobs.length}
      />

      {/* Main Opportunities Section */}
      <section id="open-positions" className="py-12 md:py-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Section Header & Central Controls */}
          <div className="flex flex-col gap-6 pb-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B5A5] uppercase tracking-wider mb-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Opportunities
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E2A47] tracking-tight">
                  {careerConfig.opportunitiesSection?.title || 'Current Opportunities'}
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-gray-600 max-w-2xl">
                  {careerConfig.opportunitiesSection?.subtitle ||
                    'Explore current career opportunities and find a role where you can make a meaningful difference.'}
                </p>
              </div>

              {/* Department, Sort & Saved Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Department Filter Dropdown */}
                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 shadow-xs hover:border-gray-300 transition-colors">
                  <Building2 className="w-3.5 h-3.5 text-[#00B5A5]" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    aria-label="Filter by department"
                    className="bg-transparent border-none text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Departments ({rawJobs.length})</option>
                    {departmentCounts
                      .filter((d) => d.name !== 'All')
                      .map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.count})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Sort selector */}
                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 shadow-xs hover:border-gray-300 transition-colors">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort vacancies"
                    className="bg-transparent border-none text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="default">Sort: Default</option>
                    <option value="urgent">Sort: Urgent First</option>
                    <option value="title">Sort: Job Title (A–Z)</option>
                  </select>
                </div>

                {/* Saved Jobs Filter Toggle */}
                {savedJobIds.length > 0 && (
                  <button
                    onClick={() => setOnlySaved(!onlySaved)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      onlySaved
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${onlySaved ? 'fill-current text-rose-600' : ''}`} />
                    <span>Saved Roles ({savedJobIds.length})</span>
                  </button>
                )}

                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#00B5A5] hover:text-[#0E2A47] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Employment Type Filter Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div
                className="inline-flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-full border border-gray-200/70"
                role="group"
                aria-label="Filter vacancies by employment type"
              >
                {filterPillOptions.map((pill) => {
                  const isActive =
                    (pill.id === 'All' && (selectedType === 'All' || !selectedType)) ||
                    selectedType.toLowerCase().replace(/[-_]/g, ' ') === pill.id.toLowerCase().replace(/[-_]/g, ' ');
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedType(pill.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5A5] ${
                        isActive
                          ? 'bg-[#00B5A5] text-white shadow-xs font-bold'
                          : 'text-gray-600 hover:text-[#0E2A47] hover:bg-white/80 font-medium'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>

              {/* Showing count */}
              <div className="text-xs text-gray-500 font-medium">
                Showing <span className="font-bold text-[#0E2A47]">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'}
              </div>
            </div>
          </div>

          {/* Active Filter Chips (if any active filters) */}
          {hasActiveFilters && (
            <div className="py-3.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              {selectedDepartment !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-[#00B5A5] font-medium border border-[#00B5A5]/20">
                  Dept: {selectedDepartment}
                  <button
                    onClick={() => setSelectedDepartment('All')}
                    className="hover:text-[#0E2A47] ml-0.5 font-bold"
                    aria-label="Remove department filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedType !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                  Type: {selectedType}
                  <button
                    onClick={() => setSelectedType('All')}
                    className="hover:text-black ml-0.5 font-bold"
                    aria-label="Remove type filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-blue-900 ml-0.5 font-bold"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}

              {onlySaved && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-medium">
                  Bookmarked Only
                  <button
                    onClick={() => setOnlySaved(false)}
                    className="hover:text-rose-900 ml-0.5 font-bold"
                    aria-label="Show all jobs"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Centered Vacancy Grid: 1 column on mobile (<768px), exactly 2 columns on tablet & desktop (≥768px) */}
          <div className="w-full pt-4">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(selected) => setSelectedJobForModal(selected)}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            ) : (
              /* Empty Results State */
              <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-14 text-center space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E2A47]">
                    No Open Positions Match Your Search
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                    We couldn't find any job openings matching your current search or filter criteria. Try clearing filters or submit an open application.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Reset All Filters
                  </button>
                  <a
                    href="mailto:careers@silverlinehospitals.com?subject=Open%20Application%20Resume"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00B5A5] hover:bg-[#0E2A47] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                    Email Open CV to HR
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Build Your Career At SilverLine Section */}
      <WhySilverLine
        title={careerConfig.whyJoinSection?.title}
        subtitle={careerConfig.whyJoinSection?.subtitle}
        highlights={careerConfig.whyJoinSection?.highlights}
        stats={careerConfig.cultureStats}
      />

      {/* Recruitment FAQs & HR Contact Desk */}
      <CareerFAQ
        faqs={careerConfig.faqs}
        hrContact={careerConfig.hrContact}
      />

      {/* Job Application Modal */}
      {selectedJobForModal && (
        <JobApplicationModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
        />
      )}
    </div>
  );
};

export default CareerPage;
