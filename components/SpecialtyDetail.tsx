import React, { useState, useContext, useMemo, useEffect } from 'react';
import { specialtiesList } from '../lib/specialtiesData';
import ImageModal from './ImageModal';
import EditableImage from './MasterSetup/EditableImage';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import EditableText from './MasterSetup/EditableText';
import type { Doctor } from '../lib/doctorsData';

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

interface SpecialtyDetailProps {
  specialtyId: string;
  onBookAppointmentClick: () => void;
}

const FaqItem: React.FC<{ faq: { question: string; answer: string }; index: number; openIndex: number | null; toggleFaq: (index: number) => void }> = ({ faq, index, openIndex, toggleFaq }) => {
  const isOpen = openIndex === index;
  return (
    <div className="border border-gray-200 bg-white rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <button
        onClick={() => toggleFaq(index)}
        className="w-full flex justify-between items-center text-left font-semibold text-lg py-5 px-6 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00B5A5]"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className={isOpen ? 'text-[#00B5A5]' : 'text-gray-800'}>{faq.question}</span>
        <svg className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? '500px' : '0px' }}
      >
        <div className="px-6 pb-6 border-t border-gray-200 pt-4">
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};


const SpecialtyDetail: React.FC<SpecialtyDetailProps> = ({ specialtyId, onBookAppointmentClick }) => {
  const { config } = useContext(MasterSetupContext);
  const specialty = specialtiesList.find(s => s.id === specialtyId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showMobileCta, setShowMobileCta] = useState(false);

  const allDoctors: Doctor[] = config.doctors?.list || [];

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.hash = href;
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past the hero (approx 300px)
      if (window.scrollY > 300) {
        setShowMobileCta(true);
      } else {
        setShowMobileCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const relatedSpecialties = useMemo(() => {
    if (!specialty) return [];
    // Get 3 random specialties excluding the current one
    return specialtiesList
        .filter(s => s.id !== specialty.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
  }, [specialty]);

  if (!specialty) {
    return (
      <section className="py-20 pt-40 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0E2A47]">Specialty Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">The specialty you are looking for does not exist.</p>
          <a href="#specialties" className="mt-8 inline-block px-6 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-colors hover:bg-[#00B5A5]">
            View All Specialties
          </a>
        </div>
      </section>
    );
  }
  
  const specialtyDoctors = allDoctors.filter(doctor =>
      (specialty.keywords || []).some(keyword =>
          doctor.specialty.toLowerCase().includes(keyword.toLowerCase())
      )
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prevIndex => (prevIndex === index ? null : index));
  };
  
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white overflow-hidden"
      >
        <EditableImage 
          configKey={specialty.heroImage}
          alt={specialty.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center animate-on-scroll fade-in-up p-4 container mx-auto max-w-4xl px-4">
          <div className="flex justify-center mb-6">
             <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
               {React.cloneElement(specialty.icon as React.ReactElement<{ className?: string }>, { className: 'h-10 w-10 text-white' })}
             </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">{specialty.name}</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">{specialty.shortDescription}</p>
        </div>
      </section>
      
      {/* Main Content Section with 2-column layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm text-gray-500 animate-fade-in" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-[#00B5A5] transition-colors">Home</a>
                </li>
                <li>
                <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <a href="#specialties" onClick={(e) => handleNavClick(e, '#specialties')} className="hover:text-[#00B5A5] transition-colors">Specialties</a>
                </div>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-[#0E2A47] font-medium">{specialty.name}</span>
                </div>
                </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Left/Main Column */}
            <div className="lg:col-span-2">
              <div className="animate-on-scroll fade-in-up">
                <h2 className="text-3xl font-bold text-[#0E2A47] mb-6 relative inline-block">
                    About the Department
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#00B5A5] rounded-full"></span>
                </h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                    {specialty.description}
                </div>
              </div>
              
              <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm animate-on-scroll fade-in-up" style={{ '--stagger-delay': '150ms' } as React.CSSProperties}>
                <h2 className="text-2xl font-bold text-[#0E2A47] mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    Services Offered
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {specialty.services.map((service, index) => (
                    <li key={index} className="flex items-start bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <div className="bg-teal-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                         <svg className="w-4 h-4 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-gray-700 font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right/Sidebar Column */}
            <aside className="lg:sticky lg:top-32 self-start animate-on-scroll fade-in-left w-full">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-[#0E2A47] p-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        Our Specialists
                    </h3>
                </div>
                <div className="p-4 bg-gray-50">
                    {specialtyDoctors.length > 0 ? (
                    <ul className="space-y-4">
                        {specialtyDoctors.map(doctor => (
                        <li key={doctor.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-teal-200">
                            <a 
                                href={`#doctor-bio/${doctor.id}`} 
                                onClick={(e) => handleNavClick(e, `#doctor-bio/${doctor.id}`)}
                                className="flex items-center gap-4 mb-3"
                            >
                                <EditableImage 
                                    configKey={doctor.image} 
                                    alt={doctor.name} 
                                    className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-100"
                                />
                                <div>
                                    <h4 className="font-bold text-[#0E2A47] leading-tight hover:text-[#00B5A5] transition-colors">{doctor.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-semibold text-[#00B5A5]">View Profile</p>
                                </div>
                            </a>
                            <button 
                                onClick={onBookAppointmentClick}
                                className="w-full py-2 text-xs font-bold text-white bg-[#00B5A5] rounded-full hover:bg-[#0E2A47] transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                            >
                                Book Appointment
                            </button>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <div className="text-center py-6">
                        <p className="text-gray-600 text-sm mb-4">Our team of experts covers a wide range of needs.</p>
                        <a href="#doctor" onClick={(e) => handleNavClick(e, '#doctor')} className="text-[#00B5A5] font-bold text-sm hover:underline">Find a doctor &rarr;</a>
                    </div>
                    )}
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100 text-center">
                  <h4 className="font-bold text-[#0E2A47] mb-2">Need Assistance?</h4>
                  <p className="text-sm text-gray-600 mb-4">Call our helpline for inquiries regarding {specialty.name}.</p>
                  <a href="tel:+919677336097" className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-[#0E2A47] font-bold rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      +91 96773 36097
                  </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      {specialty.faqs && specialty.faqs.length > 0 && (
          <section className="py-16 bg-gray-50">
              <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-[#0E2A47] mb-8 text-center animate-on-scroll fade-in-up">Frequently Asked Questions</h2>
                  <div className="space-y-4 animate-on-scroll fade-in-up" style={{ '--stagger-delay': '150ms' } as React.CSSProperties}>
                      {specialty.faqs.map((faq, index) => (
                          <FaqItem key={index} faq={faq} index={index} openIndex={openFaqIndex} toggleFaq={toggleFaq} />
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* Gallery Section */}
      {specialty.gallery && specialty.gallery.length > 0 && (
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#0E2A47] mb-12 text-center animate-on-scroll fade-in-up">Department Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {specialty.gallery.map((imageRef, index) => {
                const imageUrl = getNestedObjectValue(config, imageRef);
                return (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(imageUrl)}
                      className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:ring-[#00B5A5] aspect-[4/3]"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(imageUrl)}
                    >
                      <EditableImage
                        configKey={imageRef}
                        alt={`${specialty.name} gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
      
      {/* Related Specialties Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0E2A47] mb-8 animate-on-scroll fade-in-up">Explore Other Specialties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
                {relatedSpecialties.map((relSpecialty, index) => {
                    const heroImageUrl = getNestedObjectValue(config, relSpecialty.heroImage);
                    return (
                        <a 
                            key={relSpecialty.id}
                            href={`#specialty/${relSpecialty.id}`}
                            onClick={(e) => handleNavClick(e, `#specialty/${relSpecialty.id}`)}
                            className="group relative h-48 rounded-xl overflow-hidden shadow-md animate-on-scroll fade-in-up hover:shadow-xl transition-all duration-300"
                            style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
                        >
                            <img 
                                src={heroImageUrl} 
                                alt={relSpecialty.name} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <div className="flex items-center space-x-2 text-white mb-1">
                                    <span className="bg-[#00B5A5] p-1.5 rounded-full">
                                        {React.cloneElement(relSpecialty.icon as React.ReactElement<{ className?: string }>, { className: 'h-4 w-4' })}
                                    </span>
                                    <h3 className="font-bold text-lg">{relSpecialty.name}</h3>
                                </div>
                                <p className="text-xs text-gray-300 line-clamp-1">{relSpecialty.shortDescription}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
      </section>

      {/* CTA Section (Desktop) */}
      <section className="py-20 bg-[#0E2A47] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center animate-on-scroll fade-in-up relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">Our team is here to help you on your path to better health. Schedule a consultation with one of our experts today.</p>
          <button
            onClick={onBookAppointmentClick}
            className="px-8 py-4 font-bold text-[#0E2A47] bg-white rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:text-white hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0E2A47] focus:ring-white"
          >
            Book an Appointment Now
          </button>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 transition-transform duration-300 ease-in-out ${showMobileCta ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button
            onClick={onBookAppointmentClick}
            className="w-full py-3.5 font-bold text-white bg-[#0E2A47] rounded-full shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>Book Appointment</span>
        </button>
      </div>
    </>
  );
};

export default SpecialtyDetail;