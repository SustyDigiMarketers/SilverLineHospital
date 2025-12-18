import React from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';

// Helper components for decorative elements
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
    </svg>
);

const CircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`${className} rounded-full`}></div>
);


const Features: React.FC = () => {
    
    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        window.location.hash = href;
    };
    
    return (
        <section id="international-patients" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column: Text Content */}
                    <div className="animate-on-scroll fade-in-left">
                        <EditableText
                            as="h2"
                            configKey="internationalPatients.title"
                            defaultValue="A new standard in<br/>global healthcare"
                            className="text-5xl lg:text-6xl font-bold text-[#0E2A47] !leading-tight"
                        />
                        <EditableText
                            as="p"
                            configKey="internationalPatients.description"
                            defaultValue="SilverLine is here for you with world-class medical services & support from skilled doctors all around the world, ensuring a seamless healthcare journey."
                            className="mt-6 text-lg text-gray-600 max-w-lg"
                        />
                        <div className="flex flex-wrap items-center gap-4 mt-8">
                            <a href="#aboutus" onClick={(e) => handleNavClick(e, '#aboutus')} className="px-8 py-3 font-semibold text-white bg-[#00B5A5] rounded-full transition-all duration-300 ease-in-out hover:bg-[#0E2A47] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]">
                                <EditableText as="span" configKey="internationalPatients.cta1Text" defaultValue="About Us" />
                            </a>
                             <a href="#international" onClick={(e) => handleNavClick(e, '#international')} className="px-8 py-3 font-semibold text-[#0E2A47] bg-transparent border border-gray-300 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-400 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E2A47]">
                                <EditableText as="span" configKey="internationalPatients.cta2Text" defaultValue="Learn More" />
                            </a>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <div>
                                <EditableText as="h2" configKey="internationalPatients.stats.stat1.value" defaultValue="50+" className="text-4xl font-bold text-[#0E2A47]" />
                                <EditableText as="p" configKey="internationalPatients.stats.stat1.label" defaultValue="Countries Served" className="text-sm text-gray-500 mt-1" />
                            </div>
                            <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
                             <div>
                                <EditableText as="h2" configKey="internationalPatients.stats.stat2.value" defaultValue="10K+" className="text-4xl font-bold text-[#0E2A47]" />
                                <EditableText as="p" configKey="internationalPatients.stats.stat2.label" defaultValue="Happy Patients" className="text-sm text-gray-500 mt-1" />
                            </div>
                            <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
                             <div>
                                <EditableText as="h2" configKey="internationalPatients.stats.stat3.value" defaultValue="25+" className="text-4xl font-bold text-[#0E2A47]" />
                                <EditableText as="p" configKey="internationalPatients.stats.stat3.label" defaultValue="Specialties" className="text-sm text-gray-500 mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image Collage */}
                    <div className="relative h-[500px] animate-on-scroll fade-in-right hidden lg:block">
                        <div className="grid grid-cols-12 grid-rows-12 h-full gap-4">
                            {/* Image 1 */}
                            <div className="col-start-1 col-span-8 row-start-1 row-span-8 p-2 bg-teal-50 rounded-3xl shadow-lg z-10">
                                <EditableImage
                                    configKey="internationalPatients.collageImage1"
                                    alt="Smiling international patient interacting with medical professional at SilverLine Trichy"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                            {/* Image 2 */}
                            <div className="col-start-7 col-span-6 row-start-4 row-span-6 p-2 bg-blue-50 rounded-3xl shadow-lg z-20">
                                <EditableImage
                                    configKey="internationalPatients.collageImage2"
                                    alt="Doctor using modern medical technology at Trichy's best hospital"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                            {/* Image 3 */}
                            <div className="col-start-3 col-span-7 row-start-8 row-span-5 p-2 bg-gray-100 rounded-3xl shadow-lg z-10">
                                <EditableImage
                                    configKey="internationalPatients.collageImage3"
                                    alt="Diverse group of medical staff at SilverLine Multi Speciality Hospital"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* Decorative elements (positioned relative to the main container) */}
                        <StarIcon className="absolute top-1/4 -left-8 w-8 h-8 text-teal-300 transform -rotate-12" />
                        <CircleIcon className="absolute top-10 right-10 w-6 h-6 bg-blue-300" />
                        <StarIcon className="absolute bottom-1/4 right-0 w-6 h-6 text-teal-300" />
                        <CircleIcon className="absolute bottom-10 left-1/2 w-4 h-4 bg-blue-200" />
                        <div className="absolute top-10 left-[65%] w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0E2A47] z-30">
                            <svg className="w-6 h-6 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </div>
                        <div className="absolute bottom-10 left-[70%] w-24 h-12 bg-blue-100 rounded-full flex items-center justify-center p-2 shadow-lg z-20">
                            <div className="w-full h-full border-2 border-blue-300 rounded-full flex items-center justify-center gap-1">
                                <div className="w-2 h-2 rounded-full border border-blue-300"></div>
                                <div className="w-2 h-2 rounded-full border border-blue-300"></div>
                                <div className="w-2 h-2 rounded-full border border-blue-300"></div>
                                <div className="w-2 h-2 rounded-full border border-blue-300"></div>
                            </div>
                        </div>
                    </div>
                     {/* Mobile Image View */}
                    <div className="lg:hidden animate-on-scroll fade-in-up mt-12">
                         <EditableImage
                            configKey="internationalPatients.collageImage1"
                            alt="Smiling patient interacting with medical professional at SilverLine Trichy"
                            className="w-full h-80 object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;