import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { useCountUp } from '../hooks/useCountUp';
import IslandBar from './IslandBar';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import StatsBar from './StatsBar';

const About: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const journey = config.about?.journey?.items || [];
  const valuesData = config.about?.values || [];
  const heroContent = config.about?.heroCarouselSlides?.[0] || {};
  const teamMembers = config.about?.team?.members || [];
  
  // Word with Carousel Logic (Auto-scroll)
  const carouselImages = config.about?.wordWithCarousel?.images ? (typeof config.about.wordWithCarousel.images === 'string' ? [config.about.wordWithCarousel.images] : config.about.wordWithCarousel.images) : [];
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  useEffect(() => {
    if (carouselImages.length > 1) {
        const interval = setInterval(() => {
            setCurrentCarouselIndex(prev => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }
  }, [carouselImages.length]);

  return (
    <div id="aboutus" className="relative">
      {/* 1. SINGLE IMAGE HERO SECTION */}
      <section 
        className="relative h-[350px] md:h-[500px] flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
            <EditableImage
                configKey="about.heroCarouselSlides[0].image"
                alt={heroContent.title}
                className="w-full h-full object-cover"
                priority={true}
            />
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative text-center z-20 animate-on-scroll fade-in-up p-4">
          <EditableText
            as="h1"
            configKey="about.heroCarouselSlides[0].title"
            defaultValue={heroContent.title || 'About Us'}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          />
          <EditableText
            as="p"
            configKey="about.heroCarouselSlides[0].subtitle"
            defaultValue={heroContent.subtitle || ''}
            className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg"
          />
        </div>
      </section>

      {/* Hero Overlap Element (for Island Bar) */}
      <div className="relative z-30">
        <IslandBar />
      </div>

      {/* 2. MISSION / VISION SECTION */}
      <section id="mission-vision" className="py-24 bg-white relative">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-teal-50/50 p-10 rounded-3xl border border-teal-100 animate-on-scroll fade-in-left group hover:shadow-2xl transition-all duration-500">
               <div className="w-16 h-16 bg-[#00B5A5]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
               </div>
               <EditableText as="h2" configKey="about.mission.title" defaultValue="Our Mission" className="text-3xl font-bold text-[#0E2A47] mb-4" />
               <EditableText as="p" configKey="about.mission.description" defaultValue="" className="text-gray-600 text-lg leading-relaxed" />
            </div>

            {/* Vision Card */}
            <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100 animate-on-scroll fade-in-right group hover:shadow-2xl transition-all duration-500">
               <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
               </div>
               <EditableText as="h2" configKey="about.vision.title" defaultValue="Our Vision" className="text-3xl font-bold text-[#0E2A47] mb-4" />
               <EditableText as="p" configKey="about.vision.description" defaultValue="" className="text-gray-600 text-lg leading-relaxed" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORD WITH CAROUSEL IMAGE SECTION (Auto Scroll Enabled) */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 animate-on-scroll fade-in-left">
                    <EditableText as="h2" configKey="about.wordWithCarousel.title" defaultValue="Our Commitment" className="text-4xl font-bold text-[#0E2A47] mb-6" />
                    <EditableText as="p" configKey="about.wordWithCarousel.message" defaultValue="" className="text-xl text-gray-600 leading-relaxed italic" />
                </div>
                <div className="flex-1 relative w-full h-[450px] rounded-[3rem] overflow-hidden shadow-2xl animate-on-scroll fade-in-right">
                    {carouselImages.map((img: string, idx: number) => (
                        <div 
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentCarouselIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <EditableImage configKey={`about.wordWithCarousel.images[${idx}]`} alt="Hospital" className="w-full h-full object-cover" />
                        </div>
                    ))}
                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                        {carouselImages.map((_: any, idx: number) => (
                            <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentCarouselIndex ? 'bg-white w-6' : 'bg-white/40'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. STATUS BAR WITH BG IMAGE */}
      <StatsBar />

      {/* 5. OUR VALUES SECTION (Premium Card Grid) */}
      <section id="our-values" className="py-24 bg-white relative">
          <div className="container mx-auto max-w-6xl px-4">
             <div className="text-center mb-16 animate-on-scroll fade-in-up">
                <EditableText as="h2" configKey="about.values.title" defaultValue="Our Core Values" className="text-4xl font-black text-[#0E2A47]" />
                <div className="w-24 h-1.5 bg-[#00B5A5] mx-auto mt-4 rounded-full"></div>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {valuesData.map((value: any, index: number) => (
                    <div key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(0,181,165,0.1)] transition-all duration-500 group animate-on-scroll fade-in-up" style={{ transitionDelay: `${index * 100}ms` }}>
                        <div className="w-14 h-14 bg-[#00B5A5]/10 rounded-2xl flex items-center justify-center text-[#00B5A5] font-black text-xl mb-6 group-hover:bg-[#00B5A5] group-hover:text-white transition-all duration-500">
                            {index + 1}
                        </div>
                        <EditableText as="h3" configKey={`about.values[${index}].title`} defaultValue={value.title} className="text-2xl font-bold text-[#0E2A47] mb-6" />
                        <ul className="space-y-4">
                            {value.points.map((point: string, pIdx: number) => (
                                <li key={pIdx} className="flex gap-4 text-gray-600 leading-relaxed">
                                    <span className="text-[#00B5A5] font-bold mt-0.5">•</span>
                                    <EditableText as="span" configKey={`about.values[${index}].points[${pIdx}]`} defaultValue={point} className="text-sm font-medium" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* 6. OUR TEAM SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 text-center">
            <EditableText as="h2" configKey="about.team.title" defaultValue="Our Core Team" className="text-4xl font-bold text-[#0E2A47] mb-4 animate-on-scroll fade-in-up" />
            <EditableText as="p" configKey="about.team.subtitle" defaultValue="" className="text-gray-600 mb-16 animate-on-scroll fade-in-up" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {teamMembers.map((member: any, idx: number) => (
                    <div key={idx} className="group animate-on-scroll fade-in-up" style={{ transitionDelay: `${idx * 150}ms` }}>
                        <div className="relative mb-6 rounded-[2.5rem] overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                            <EditableImage configKey={`about.team.members[${idx}].image`} alt={member.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <EditableText as="h3" configKey={`about.team.members[${idx}].name`} defaultValue={member.name} className="text-2xl font-black text-[#0E2A47]" />
                        <EditableText as="p" configKey={`about.team.members[${idx}].role`} defaultValue={member.role} className="text-[#00B5A5] font-bold mt-1" />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 7. YOUR JOURNEY SECTION (Zigzag Refined) */}
      <section id="journey" className="py-24 bg-white overflow-hidden">
           <div className="container mx-auto max-w-5xl px-4">
                <div className="text-center mb-24 animate-on-scroll fade-in-up">
                    <EditableText as="h2" configKey="about.journey.title" defaultValue="The Hospital Journey" className="text-4xl font-black text-[#0E2A47]" />
                    <div className="w-24 h-1.5 bg-[#00B5A5] mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="relative">
                    {/* Central Vertical Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-100 -translate-x-1/2 hidden md:block"></div>
                    
                    <div className="space-y-12 md:space-y-0 relative">
                        {journey.map((item: any, index: number) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                {/* Left/Right Side Card */}
                                <div className="flex-1 w-full md:px-16 animate-on-scroll" style={{ animationName: index % 2 === 0 ? 'fade-in-left' : 'fade-in-right' }}>
                                    <div className={`p-10 bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-gray-50 hover:border-[#00B5A5]/30 hover:shadow-[0_40px_90px_rgba(0,181,165,0.1)] transition-all duration-500 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <span className="text-5xl font-black text-[#00B5A5]/10 mb-4 block">{item.year}</span>
                                        <EditableText as="h3" configKey={`about.journey.items[${index}].title`} defaultValue={item.title} className="text-2xl font-bold text-[#0E2A47]" />
                                        <EditableText as="p" configKey={`about.journey.items[${index}].description`} defaultValue={item.description} className="text-gray-500 mt-6 leading-relaxed text-lg" />
                                    </div>
                                </div>
                                
                                {/* Timeline Dot */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white border-[6px] border-[#00B5A5] shadow-[0_0_20px_rgba(0,181,165,0.3)] hidden md:block"></div>
                                </div>

                                {/* Empty Space on Opposed Side */}
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
           </div>
      </section>

      {/* 8. STATE-OF-THE-ART FACILITIES (White Theme) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-20">
                <div className="flex-1 animate-on-scroll fade-in-left text-center md:text-left">
                    <EditableText as="h2" configKey="about.sideBySide.title" defaultValue="Modern Infrastructure" className="text-4xl md:text-5xl font-black text-[#0E2A47] mb-8 leading-tight" />
                    <EditableText as="p" configKey="about.sideBySide.description" defaultValue="" className="text-xl text-gray-600 leading-relaxed mb-12" />
                    <button className="bg-[#00B5A5] hover:bg-[#009489] text-white font-black py-6 px-12 rounded-2xl transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(0,181,165,0.3)] hover:shadow-[0_25px_50px_rgba(0,181,165,0.4)]">
                        Schedule a Tour
                    </button>
                </div>
                <div className="flex-1 w-full animate-on-scroll fade-in-right">
                    <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-[12px] border-gray-50 group">
                        <EditableImage configKey="about.sideBySide.image" alt="Facility" className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-50/30 -skew-x-12 z-0"></div>
      </section>
    </div>
  );
};

export default About;
