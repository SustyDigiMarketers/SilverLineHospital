import React, { useContext } from 'react';
import { specialtiesList } from '../lib/specialtiesData';
import EditableImage from '../components/MasterSetup/EditableImage';
import { MasterSetupContext, MasterSetupContextType } from '../components/MasterSetup/MasterSetupProvider';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';
import { generateBreadcrumbSchema, generateMedicalWebPageSchema } from '../lib/seoConfig';
import { hero, getSpecialtyHeroImage } from '../data/images';

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
    const { config } = useContext(MasterSetupContext) as MasterSetupContextType;
    const content = config.specialtiesPage || {};

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();
        window.location.hash = href;
    };

    const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Specialties', url: '/specialties' }
    ]);

    const pageSchema = generateMedicalWebPageSchema({
        name: 'Multispeciality Medical & Surgical Departments',
        description: 'Comprehensive 28+ multispeciality medical and surgical healthcare departments at SilverLine Hospital Trichy.',
        url: '/specialties',
        services: specialtiesList.map(s => s.name)
    });

    return (
        <>
            <SEO
                title="Specialties & Medical Departments in Trichy"
                description="Explore 28+ clinical specialties at SilverLine Hospital Trichy, including Oncology, Cardiology, Nephrology, Urology, GI Surgery, Laparoscopic Surgery, and 24/7 Emergency Care."
                keywords="hospital departments trichy, multispeciality hospital trichy, cardiology trichy, cancer care trichy, nephrology trichy, urology trichy, surgery trichy"
                canonical="/specialties"
                schema={[pageSchema, breadcrumbs]}
            />

            {/* Full-width Hero Section at the top */}
            <section 
                className="relative w-full h-[200px] sm:h-[320px] md:h-[500px] xl:h-[550px] flex items-center justify-center text-white overflow-hidden bg-[#0E2A47]"
            >
                <div className="w-full max-w-[480px] sm:max-w-none mx-auto h-full relative">
                    <EditableImage
                        configKey="specialtiesPage.heroImage"
                        defaultValue={hero.specialties}
                        alt={content.title || 'Our Specialties'}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        priority={true}
                    />
                </div>
            </section>

            {/* Specialties Grid Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <main>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
                            {specialtiesList.map((specialty, index) => {
                                const heroImageUrl = getNestedObjectValue(config, specialty.heroImage) || getSpecialtyHeroImage(specialty.id);
                                return (
                                <a
                                    key={index}
                                    href={`/specialty/${specialty.id}`}
                                    onClick={(e) => handleNavClick(e, `#specialty/${specialty.id}`)}
                                    className="group relative bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col text-left transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] animate-on-scroll fade-in-up focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#00B5A5]"
                                    style={{ '--stagger-delay': `${index * 50}ms` } as React.CSSProperties}
                                >
                                    {/* Background Image */}
                                    <img 
                                        src={heroImageUrl} 
                                        alt={specialty.name} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                                    {/* Content */}
                                    <div className="relative flex flex-col flex-grow p-6 text-white z-10">
                                        <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-full self-start transition-all duration-300 group-hover:bg-[#00B5A5] group-hover:scale-110">
                                            <EditableImage 
                                                configKey={specialty.iconPath} 
                                                defaultValue={specialty.icon}
                                                alt={specialty.name}
                                                className="h-16 w-16 object-contain brightness-0 invert"
                                            />
                                        </div>
                                        <div className="flex-grow mt-6">
                                            <h3 className="text-xl font-bold">
                                                {specialty.name}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-200 line-clamp-2 min-h-[40px]">
                                                {specialty.shortDescription}
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <span className="font-semibold text-teal-300 group-hover:text-white transition-all duration-300 flex items-center">
                                                Learn More 
                                                <span className="transition-transform duration-300 group-hover:translate-x-1.5 ml-1.5">&rarr;</span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                );
                            })}
                        </div>
                    </main>
                </div>
            </section>

             {/* Testimonials Section */}
            <Testimonials />
        </>
    );
};

export default SpecialtiesPage;
