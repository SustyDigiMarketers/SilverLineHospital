import React, { useState, useMemo, useContext, useEffect, useRef } from 'react';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import EditableImage from '../components/MasterSetup/EditableImage';

// Define the new, more detailed Job interface
interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string; // e.g., 'Full time'
  experienceLevel: string; // e.g., 'Entry level'
  description: string;
  salary: number;
  salaryType: 'hr' | 'year';
  applicants: number;
  postedAgo: string;
  tags: string[];
}

const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'expert':
      return 'bg-purple-100 text-purple-700';
    case 'intermediate':
      return 'bg-blue-100 text-blue-700';
    case 'entry level':
      return 'bg-indigo-100 text-indigo-700';
    case 'remote':
      return 'bg-green-100 text-green-700';
    case 'full-time':
      return 'bg-cyan-100 text-cyan-700';
    case 'part-time':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col h-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img src={job.logo} alt={`${job.company} logo`} className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1" />
          <div>
            <h3 className="font-bold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company} &bull; {job.applicants} Applicants</p>
          </div>
        </div>
        <button className="text-gray-300 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-2 my-4">
        {job.tags.map(tag => (
          <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-md ${getTagColor(tag)}`}>
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 flex-grow">{job.description}</p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <p className="text-lg font-bold text-gray-900">${job.salary}/<span className="text-sm font-normal text-gray-500">{job.salaryType}</span></p>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {job.postedAgo}
        </p>
      </div>
    </div>
  );
};

interface FilterPanelProps {
  jobTypes: string[];
  handleJobTypeChange: (type: string) => void;
  experienceLevels: string[];
  handleExperienceChange: (level: string) => void;
  minSalary: number;
  setMinSalary: (value: number) => void;
  maxSalary: number;
  setMaxSalary: (value: number) => void;
  clearAllFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  jobTypes,
  handleJobTypeChange,
  experienceLevels,
  handleExperienceChange,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  clearAllFilters,
}) => {
  return (
    <>
      {/* Job Type Filter */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800">Job Type</h4>
          <button onClick={clearAllFilters} className="text-sm text-red-500 hover:underline">Clear all</button>
        </div>
        <div className="mt-4 space-y-3">
          {['Full time', 'Part time', 'Internship', 'Project work', 'Volunteering'].map(type => (
              <label key={type} className="flex items-center text-gray-600">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" checked={jobTypes.includes(type)} onChange={() => handleJobTypeChange(type)} />
                <span className="ml-3">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range Filter */}
      <div className="py-6 border-b border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Salary Range</h4>
        <div className="relative h-10">
            <div className="relative h-1 bg-gray-200 rounded-full mt-2">
                <div className="absolute h-1 bg-blue-600 rounded-full" style={{ left: `${(minSalary-50)/150*100}%`, right: `${100-((maxSalary-50)/150*100)}%` }}></div>
            </div>
            <input type="range" min="50" max="200" value={minSalary} onChange={e => setMinSalary(Number(e.target.value))} className="absolute w-full h-1 opacity-0 cursor-pointer" />
            <input type="range" min="50" max="200" value={maxSalary} onChange={e => setMaxSalary(Number(e.target.value))} className="absolute w-full h-1 opacity-0 cursor-pointer" />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>${minSalary}k</span>
            <span>${maxSalary}k</span>
        </div>
      </div>

      {/* Experience Level Filter */}
      <div className="pt-6">
        <h4 className="font-semibold text-gray-800">Experience Level</h4>
          <div className="mt-4 space-y-3">
          {[ {label: 'Entry level', count: '392'}, {label: 'Intermediate', count: '124'}, {label: 'Expert', count: '3921'} ].map(level => (
              <label key={level.label} className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" checked={experienceLevels.includes(level.label)} onChange={() => handleExperienceChange(level.label)} />
                  <span className="ml-3">{level.label}</span>
                </div>
                <span className="text-sm text-gray-400">{level.count}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, children }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-drawer-title"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" onClick={onClose}></div>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id="filter-drawer-title" className="text-lg font-semibold text-gray-800">Filters</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};


const CareerPage: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    
    // State for filters
    const [jobTypes, setJobTypes] = useState<string[]>([]);
    const [experienceLevels, setExperienceLevels] = useState<string[]>([]);
    const [minSalary, setMinSalary] = useState(50);
    const [maxSalary, setMaxSalary] = useState(120);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);


    const jobs: Job[] = config.career?.jobs || [];

    const handleJobTypeChange = (type: string) => {
        setJobTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };
    
    const handleExperienceChange = (level: string) => {
        setExperienceLevels(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);
    };

    const clearAllFilters = () => {
        setJobTypes([]);
        setExperienceLevels([]);
        setMinSalary(50);
        setMaxSalary(120);
    };

    const filteredJobs = useMemo(() => {
      const search = searchQuery.toLowerCase().trim();
      const location = locationQuery.toLowerCase().trim();
      return jobs.filter(job => 
          (job.title.toLowerCase().includes(search) || job.company.toLowerCase().includes(search)) &&
          (job.location.toLowerCase().includes(location)) &&
          (jobTypes.length === 0 || jobTypes.map(t => t.toLowerCase()).includes(job.type.toLowerCase())) &&
          (experienceLevels.length === 0 || experienceLevels.map(l => l.toLowerCase()).includes(job.experienceLevel.toLowerCase())) &&
          (job.salary >= minSalary && job.salary <= maxSalary)
      );
    }, [jobs, searchQuery, locationQuery, jobTypes, experienceLevels, minSalary, maxSalary]);

    useEffect(() => {
        if (minSalary > maxSalary) {
            setMaxSalary(minSalary);
        }
    }, [minSalary]);
    
    useEffect(() => {
        if (maxSalary < minSalary) {
            setMinSalary(maxSalary);
        }
    }, [maxSalary]);
    
    const filterPanelProps: FilterPanelProps = {
      jobTypes,
      handleJobTypeChange,
      experienceLevels,
      handleExperienceChange,
      minSalary,
      setMinSalary,
      maxSalary,
      setMaxSalary,
      clearAllFilters,
    };

    return (
        <>
            {/* Hero Section with Background Image */}
            <section className="relative text-white overflow-hidden h-[50vh] md:h-auto md:pt-32 md:pb-20 flex items-center">
                <EditableImage
                    configKey="career.hero.image"
                    alt="A modern office environment with a team collaborating"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>

                <div className="relative container mx-auto max-w-5xl px-4 sm:px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-center drop-shadow-md">Find Your Dream Job Here <span className="text-[#00B5A5]">+</span></h1>

                    <form className="mt-10 bg-white p-3 rounded-xl flex flex-col md:flex-row items-center gap-4 text-gray-600 shadow-lg" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex items-center w-full md:w-2/5 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                className="w-full focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="w-full h-px md:h-10 md:w-px bg-gray-200"></div>
                        <div className="flex items-center w-full md:w-2/5 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <input
                                type="text"
                                placeholder="Add country or city"
                                className="w-full focus:outline-none"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Main Content: Filters and Listings */}
            <main className="py-16 bg-[#F8F8F8]">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Recommended jobs</h2>
                    
                    {/* Mobile Filter Button */}
                    <button 
                      onClick={() => setIsFilterDrawerOpen(true)}
                      className="lg:hidden bg-white border border-gray-200 text-gray-600 font-medium px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                      aria-label="Open filters"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                      <span>Filters</span>
                    </button>

                    {/* Desktop Sorting Button */}
                    <button className="hidden lg:flex bg-white border border-gray-200 text-gray-600 font-medium px-4 py-2 rounded-lg items-center gap-2 hover:bg-gray-50">
                      Most recent
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Sidebar - Desktop */}
                    <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-xl border border-gray-100 h-fit">
                      <FilterPanel {...filterPanelProps} />
                    </aside>

                    {/* Job Listings */}
                    <main className="lg:col-span-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
                        ) : (
                            <div className="md:col-span-2 xl:col-span-3 text-center py-16 bg-white rounded-lg">
                                <p className="text-lg text-gray-600">No open positions match your filters.</p>
                                <p className="text-sm text-gray-500 mt-2">Please try adjusting your search criteria.</p>
                            </div>
                        )}
                      </div>
                    </main>
                  </div>
                </div>
            </main>
            
            {/* Filter Drawer - Mobile */}
            <FilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)}>
                <FilterPanel {...filterPanelProps} />
            </FilterDrawer>
        </>
    );
};

export default CareerPage;