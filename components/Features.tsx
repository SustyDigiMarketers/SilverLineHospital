import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Globe, Users, Award, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';

const Features: React.FC = () => {
    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        window.location.hash = href;
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, rotate: -2 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 1.2, ease: "easeOut" }
        }
    };

    return (
        <section id="international-patients" className="relative py-20 bg-white overflow-hidden">
            {/* Futuristic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00B5A5]/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]"></div>
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="container mx-auto max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    
                    {/* Left Column: Text Content */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="space-y-5">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#00B5A5]/10 border border-[#00B5A5]/20 backdrop-blur-sm">
                                <Sparkles className="w-4 h-4 text-[#00B5A5]" />
                                <span className="text-xs font-bold tracking-widest uppercase text-[#00B5A5]">Global Excellence</span>
                            </div>
                            
                            <EditableText
                                as="h2"
                                configKey="internationalPatients.title"
                                defaultValue="A new standard in<br/>global healthcare"
                                className="text-5xl lg:text-6xl font-extrabold text-[#0E2A47] !leading-[1.1] tracking-tight"
                            />
                            
                            <EditableText
                                as="p"
                                configKey="internationalPatients.description"
                                defaultValue="SilverLine is here for you with world-class medical services & support from trusted clinical expertise all around the world, ensuring a seamless healthcare journey."
                                className="text-lg text-gray-600 max-w-xl leading-relaxed font-light"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
                            <a 
                                href="#aboutus" 
                                onClick={(e) => handleNavClick(e, '#aboutus')} 
                                className="group relative px-8 py-3.5 font-bold text-white overflow-hidden rounded-xl bg-[#00B5A5] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,181,165,0.3)]"
                            >
                                <span className="relative z-10 flex items-center">
                                    <EditableText as="span" configKey="internationalPatients.cta1Text" defaultValue="About Us" />
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                            
                            <a 
                                href="#international" 
                                onClick={(e) => handleNavClick(e, '#international')} 
                                className="px-8 py-3.5 font-bold text-[#0E2A47] border border-gray-200 rounded-xl backdrop-blur-md hover:bg-gray-50 transition-all duration-300"
                            >
                                <EditableText as="span" configKey="internationalPatients.cta2Text" defaultValue="Learn More" />
                            </a>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            className="grid grid-cols-3 gap-2 sm:gap-6 pt-10 border-t border-gray-100"
                        >
                            <div className="group cursor-default flex flex-col items-center text-center">
                                <div className="flex items-center space-x-1 sm:space-x-3 mb-1">
                                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B5A5] group-hover:rotate-12 transition-transform" />
                                    <EditableText as="h2" configKey="internationalPatients.stats.stat1.value" defaultValue="50+" className="text-xl sm:text-2xl font-bold text-[#0E2A47]" />
                                </div>
                                <EditableText as="p" configKey="internationalPatients.stats.stat1.label" defaultValue="Countries Served" className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8E8E93] font-bold leading-tight" />
                            </div>
                            
                            <div className="group cursor-default flex flex-col items-center text-center">
                                <div className="flex items-center space-x-1 sm:space-x-3 mb-1">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B5A5] group-hover:scale-110 transition-transform" />
                                    <EditableText as="h2" configKey="internationalPatients.stats.stat2.value" defaultValue="10K+" className="text-xl sm:text-2xl font-bold text-[#0E2A47]" />
                                </div>
                                <EditableText as="p" configKey="internationalPatients.stats.stat2.label" defaultValue="Happy Patients" className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8E8E93] font-bold leading-tight" />
                            </div>
                            
                            <div className="group cursor-default flex flex-col items-center text-center">
                                <div className="flex items-center space-x-1 sm:space-x-3 mb-1">
                                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B5A5] group-hover:-rotate-12 transition-transform" />
                                    <EditableText as="h2" configKey="internationalPatients.stats.stat3.value" defaultValue="25+" className="text-xl sm:text-2xl font-bold text-[#0E2A47]" />
                                </div>
                                <EditableText as="p" configKey="internationalPatients.stats.stat3.label" defaultValue="Specialties" className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8E8E93] font-bold leading-tight" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: High-Impact Image */}
                    <motion.div 
                        variants={imageVariants}
                        className="relative h-[450px] lg:h-[500px] hidden md:block group"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute -inset-6 border border-gray-100 rounded-[3rem] pointer-events-none"></div>
                        <div className="absolute -inset-12 border border-gray-50 rounded-[4rem] pointer-events-none opacity-50"></div>
                        
                        <div className="relative h-full w-full p-3 bg-gray-50 backdrop-blur-xl border border-gray-100 rounded-[3rem] shadow-2xl overflow-hidden">
                            <div className="w-full h-full overflow-hidden rounded-[2.5rem]">
                                <EditableImage
                                    configKey="internationalPatients.mainImage"
                                    defaultValue="/Standby/medical-tech-intl.jpg"
                                    alt="SilverLine Global Healthcare Excellence"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>
                            
                            {/* Floating Info Badge */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-[#00B5A5]/10 flex items-center justify-center">
                                        <ShieldCheck className="w-6 h-6 text-[#00B5A5]" />
                                    </div>
                                    <div>
                                        <p className="text-[#0E2A47] font-bold text-lg">World-Class Standards</p>
                                        <p className="text-gray-500 text-sm">Accredited healthcare excellence.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats Badge */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-8 right-8 p-4 bg-[#00B5A5] rounded-2xl shadow-lg border border-white/20"
                            >
                                <div className="flex items-center space-x-3">
                                    <Globe className="w-5 h-5 text-white" />
                                    <span className="text-white font-bold text-sm">Global Network</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                     {/* Mobile Image View */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:hidden mt-12 w-full pt-4"
                    >
                        <div className="relative overflow-hidden group">
                            <EditableImage
                                configKey="internationalPatients.mainImage"
                                defaultValue="/Standby/medical-tech-intl.jpg"
                                alt="SilverLine Healthcare"
                                className="w-full h-[400px] object-cover"
                            />
                            {/* Inner soft glow/border over image */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
