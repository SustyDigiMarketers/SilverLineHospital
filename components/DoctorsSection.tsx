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
        <section id="doctors-home" className="py-24 bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                            className="group block bg-white rounded-lg shadow-md overflow-hidden text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:ring-[#00B5A5]"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <EditableImage
                                    configKey={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors">{doctor.name}</h3>
                                <p className="text-[#00B5A5] font-medium">{doctor.specialty}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a
                        href="#doctor"
                        onClick={(e) => handleNavClick(e, '#doctor')}
                        className="inline-block px-8 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-xl hover:shadow-teal-400/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                    >
                        View All Doctors
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DoctorsSection;
