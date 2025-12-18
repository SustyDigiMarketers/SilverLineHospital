import React, { useContext, useState, useMemo } from 'react';
import { specialtiesList } from '../lib/specialtiesData';
import EditableImage from '../components/MasterSetup/EditableImage';
import EditableText from '../components/MasterSetup/EditableText';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import GallerySection from '../components/GallerySection';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

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


const SpecialtiesPage: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const content = config.specialtiesPage || {};
    const [searchQuery, setSearchQuery] = useState('');

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();
        window.location.hash = href;
    };

    const filteredSpecialties = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return specialtiesList;
        return specialtiesList.filter(specialty => 
            specialty.name.toLowerCase().includes(query) ||
            specialty.shortDescription.toLowerCase().includes(query) ||
            (specialty.keywords && specialty.keywords.some(k => k.toLowerCase().includes(query)))
        );
    }, [searchQuery]);

    return (
        <div className="bg-gray-50">
            <SEO 
                title="Best Medical Treatments & Services in Trichy"
                description="SilverLine Hospital provides world-class treatments in Cardiology, Neurology, Orthopedics, Oncology, and more. Rated best in Trichy for advanced medical care."
                keywords="Cardiology Trichy, Nephrology Trichy, Best Orthopedic surgeon Trichy, Cancer treatment Trichy, Pediatric care Trichy, Top Gynaecologist Trichy"
            />
            {/* Hero Section with Fixed Background */}
            <section 
                className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white overflow-hidden pt-16"
            >
                {/* This div contains the fixed background image that stays put */}
                <div className="fixed top-0 left-0 w-full h-full -z-10">
                    <EditableImage
                        configKey="specialtiesPage.heroImage"
                        alt={content.title || 'Our Specialties'}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* This div contains the hero text content */}
                <div className="relative text-center animate-on-scroll fade-in-up p-4 container mx-auto max-w-4xl">
                    <EditableText
                        as="h1"
                        configKey="specialtiesPage.title"
                        defaultValue={content.title || ''}
                        className="text-5xl md:text-6xl font-bold mb-4"
                    />
                    <EditableText
                        as="p"
                        configKey="specialtiesPage.subtitle"
                        defaultValue={content.subtitle || ''}
                        className="text-lg text-gray-200 max-w-2xl mx-auto"
                    />
                </div>
            </section>

            {/* Specialties Grid Section - This will scroll over the fixed background */}
            <section id="specialties-list" className="relative py-16 bg-gray-50 min-h-screen">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Search Bar */}
                    <div className="relative -mt-24 mb-16 z-10">
                        <div className="bg-white p-6 rounded-xl shadow-xl max-w-3xl mx-auto border border-gray-100">
                            <label htmlFor="specialty-search" className="block text-sm font-medium text-gray-700 mb-2">Find a Department</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-6 w-6 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input
                                    type="text"
                                    id="specialty-search"
                                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all duration-300 text-lg placeholder-gray-400"
                                    placeholder="e.g. Cardiology, Oncology, MRI..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <main>
                        {filteredSpecialties.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
                                {filteredSpecialties.map((specialty, index) => {
                                    const heroImageUrl = getNestedObjectValue(config, specialty.heroImage);
                                    return (
                                    <a
                                        key={specialty.id}
                                        href={`#specialty/${specialty.id}`}
                                        onClick={(e) => handleNavClick(e, `#specialty/${specialty.id}`)}
                                        className="group relative bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col text-left transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] animate-on-scroll fade-in-up focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#00B5A5]"
                                        style={{ '--stagger-delay': `${index * 50}ms` } as React.CSSProperties}
                                    >
                                        {/* Background Image */}
                                        <img 
                                            src={heroImageUrl} 
                                            alt={specialty.name} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
                                        />
                                        
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:via-black/80 transition-colors duration-300"></div>

                                        {/* Content */}
                                        <div className="relative flex flex-col flex-grow p-8 text-white z-10">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-xl transition-all duration-300 group-hover:bg-[#00B5A5] group-hover:border-[#00B5A5] shadow-lg">
                                                    {React.cloneElement(specialty.icon as React.ReactElement<{ className?: string }>, { className: "h-8 w-8" })}
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                    <svg className="w-6 h-6 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-grow mt-8">
                                                <h3 className="text-2xl font-bold mb-3 tracking-tight">
                                                    {specialty.name}
                                                </h3>
                                                <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed group-hover:text-white transition-colors">
                                                    {specialty.shortDescription}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900">No specialties found</h3>
                                <p className="mt-2 text-gray-500">We couldn't find any departments matching "{searchQuery}".</p>
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </section>
            
            {/* Gallery Section */}
            <GallerySection />
             {/* Testimonials Section */}
            <Testimonials />
        </div>
    );
};

export default SpecialtiesPage;