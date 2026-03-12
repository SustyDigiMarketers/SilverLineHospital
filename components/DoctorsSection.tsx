import React, { useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';

const DoctorsSection: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const doctors = config.doctors?.list || [];
    const featuredDoctors = doctors.slice(0, 3); // Show 3 for a nice layout

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();
        window.location.hash = href;
    };

    return (
        <section id="doctors-home" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Futuristic Ambient Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
               <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#00B5A5]/10 to-transparent blur-3xl opacity-70" />
               <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-[#0E2A47]/5 to-transparent blur-3xl" />
            </div>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 animate-on-scroll fade-in-up">
                    <EditableText
                        as="h2"
                        configKey="doctors.title" // Reusing title from full page
                        defaultValue="Meet Our Expert Doctors"
                        className="text-4xl font-bold text-[#0E2A47]"
                    />
                    <EditableText
                        as="p"
                        configKey="doctors.subtitle" // Reusing subtitle
                        defaultValue="Our team of dedicated and experienced professionals is here to serve you."
                        className="mt-4 text-lg text-gray-600"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredDoctors.map((doctor: any) => (
                        <a
                            key={doctor.id}
                            href={`#doctor-bio/${doctor.id}`}
                            onClick={(e) => handleNavClick(e, `#doctor-bio/${doctor.id}`)}
                            className="group block bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 overflow-hidden text-center transition-all duration-500 ease-out hover:shadow-[0_20px_40px_-10px_rgba(0,181,165,0.25)] hover:-translate-y-2 hover:border-[#00B5A5]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:ring-[#00B5A5] relative z-10"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none" />
                                <EditableImage
                                    configKey={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 relative bg-gradient-to-b from-white to-[#f8fafc]/50 group-hover:from-white group-hover:to-teal-50/20 transition-colors duration-500">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#00B5A5]/20 rounded-b-full group-hover:bg-[#00B5A5] transition-colors duration-500" />
                                <h3 className="text-xl font-extrabold text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors tracking-tight mt-2">{doctor.name}</h3>
                                <p className="text-[#00B5A5] font-medium tracking-wide uppercase text-xs mt-1">{doctor.specialty}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="text-center mt-12 relative z-10">
                    <a
                        href="#doctor"
                        onClick={(e) => handleNavClick(e, '#doctor')}
                        className="inline-block px-8 py-3 font-medium text-white bg-[#0E2A47]/90 backdrop-blur-sm rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-[0_0_20px_rgba(0,181,165,0.4)] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] border border-white/20"
                    >
                        View All Doctors
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DoctorsSection;
