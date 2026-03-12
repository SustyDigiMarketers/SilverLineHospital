import React, { useState, useCallback, useRef, useMemo, useEffect, useContext } from 'react';
import DoctorProfileModal from './DoctorProfileModal';
import EditableText from './MasterSetup/EditableText';
import type { Doctor } from '../lib/doctorsData';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

const getNestedObjectValue = (obj: any, path: string): any => {
  if (!path || typeof path !== 'string') return undefined;
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) return undefined;
    result = result[key];
  }
  return result;
};



const SocialIcon: React.FC<{ type: 'linkedin' | 'twitter', href: string, label: string }> = ({ type, href, label }) => {
    const iconPath = type === 'linkedin' ? "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" : "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z";
    return (
        <a 
            href={href} 
            aria-label={label} 
            className="text-white/80 hover:text-white transition-colors transform hover:scale-110" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal opening
        >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {type === 'linkedin' && <circle cx="4" cy="4" r="2" />}
                <path d={iconPath} />
            </svg>
        </a>
    )
}

const Doctors: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const doctors: Doctor[] = config.doctors?.list || [];
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialities');
  const triggerRef = useRef<HTMLDivElement | null>(null);

  // Extract unique specialties for the filter dropdown
  const specialties = useMemo(() => {
      const specs = new Set(doctors.map(d => d.specialty));
      return ['All Specialities', ...Array.from(specs).sort()];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
        const matchesSearch = 
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesSpecialty = selectedSpecialty === 'All Specialities' || doctor.specialty === selectedSpecialty;

        return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty, doctors]);



  const openModal = (doctor: Doctor, event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    triggerRef.current = event.currentTarget;
    setSelectedDoctor(doctor);
  };

  const closeModal = useCallback(() => {
    setSelectedDoctor(null);
  }, []);



  return (
    <>
      <section id="doctor" className="py-24 pt-40 bg-slate-50 relative overflow-hidden">
        {/* Futuristic Ambient Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
           <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-[#00B5A5]/10 to-transparent blur-3xl" />
           <div className="absolute top-[40%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-[#0E2A47]/5 to-transparent blur-3xl" />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 animate-on-scroll fade-in-up">
            <EditableText
              as="h2"
              configKey="doctors.title"
              defaultValue="Meet Our Expert Doctors"
              className="text-4xl font-bold text-[#0E2A47]"
            />
            <EditableText
              as="p"
              configKey="doctors.subtitle"
              defaultValue="Our team of dedicated and experienced professionals is here to serve you."
              className="mt-4 text-lg text-gray-600"
            />
          </div>
          
          {/* Search and Filter Bar */}
          <div className="mb-12 max-w-3xl mx-auto animate-on-scroll fade-in-up delay-100">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="doctor-search"
                        aria-label="Search for doctors by name"
                        className="block w-full pl-12 pr-4 py-4 border border-white/40 rounded-full leading-5 bg-white/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-[#00B5A5]/50 focus:border-[#00B5A5]/50 focus:bg-white sm:text-sm transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-white"
                        placeholder="Search by doctor name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <div className="relative h-full">
                        <select
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                            className="block w-full h-full pl-6 pr-10 py-4 border border-white/40 rounded-full leading-5 bg-white/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] focus:outline-none focus:ring-2 focus:ring-[#00B5A5]/50 focus:border-[#00B5A5]/50 focus:bg-white sm:text-sm appearance-none transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-white cursor-pointer"
                            aria-label="Filter by speciality"
                        >
                            {specialties.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {filteredDoctors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
                {filteredDoctors.map((doctor, index) => {
                  const imageUrl = (typeof doctor.image === 'string' && doctor.image.startsWith('imagePaths.'))
                    ? getNestedObjectValue(config, doctor.image)
                    : doctor.image;
                  return (
                    <div
                      key={doctor.name}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 overflow-hidden text-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00B5A5] transition-all duration-500 ease-out hover:shadow-[0_20px_40px_-10px_rgba(0,181,165,0.25)] hover:-translate-y-2 hover:border-[#00B5A5]/30 animate-on-scroll fade-in-up relative z-10"
                      onClick={(e) => openModal(doctor, e)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openModal(doctor, e)}
                      aria-haspopup="dialog"
                      aria-label={`View profile for ${doctor.name}`}
                    >
                      <div className="relative h-80 overflow-hidden">
                        <img src={imageUrl} alt={doctor.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/95 via-[#0E2A47]/70 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-left backdrop-blur-[2px]">
                          <div className="transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 delay-100">
                              <p className="text-white text-sm mb-3 line-clamp-3">{doctor.shortBio}</p>
                              <p className="text-white/80 text-sm italic line-clamp-3">"{doctor.philosophy}"</p>
                          </div>
                          <div className="flex justify-end space-x-4 mt-4 transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 delay-200">
                              <SocialIcon type="linkedin" href={doctor.social?.linkedin || '#'} label={`View ${doctor.name}'s LinkedIn profile`} />
                              <SocialIcon type="twitter" href={doctor.social?.twitter || '#'} label={`View ${doctor.name}'s Twitter profile`} />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 relative bg-gradient-to-b from-white to-[#f8fafc]/50 group-hover:from-white group-hover:to-teal-50/20 transition-colors duration-500">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#00B5A5]/20 rounded-b-full group-hover:bg-[#00B5A5] transition-colors duration-500" />
                        <h3 className="text-xl font-extrabold text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors tracking-tight mt-2">{doctor.name}</h3>
                        <p className="text-[#00B5A5] font-medium tracking-wide uppercase text-xs mt-1">{doctor.specialty}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 animate-fade-in">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-lg text-gray-600 font-medium">No doctors found matching your criteria.</p>
                <button 
                    onClick={() => { setSearchQuery(''); setSelectedSpecialty('All Specialities'); }}
                    className="mt-4 text-[#00B5A5] hover:underline font-medium focus:outline-none"
                >
                    Clear all filters
                </button>
            </div>
          )}
        </div>
      </section>
      {selectedDoctor && <DoctorProfileModal doctor={selectedDoctor} onClose={closeModal} triggerElement={triggerRef.current} />}
    </>
  );
};

export default Doctors;
