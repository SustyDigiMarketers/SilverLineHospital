import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { useCountUp } from '../hooks/useCountUp';
import IslandBar from './IslandBar';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import StatsBar from './StatsBar';
import FacilitiesHighlights from './FacilitiesHighlights';
import SEO from './SEO';
import { generateBreadcrumbSchema, HOSPITAL_NAP } from '../lib/seoConfig';
import { standbyImages, hero, mediaAssets } from '../data/images';

const About: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const journey = config.about?.journey?.items || [];
  const valuesData = config.about?.values || [];
  const heroContent = config.about?.heroCarouselSlides?.[0] || {};
  const teamMembers = config.about?.team?.members && config.about.team.members.length > 0
    ? config.about.team.members.filter((m: any) => m.name !== 'Dr. Sivapragash' && !m.name.includes('Sivapragash'))
    : [
        { name: 'Dr. Senthil Kumar', role: 'Managing Director', image: '/Doctor/Dr.G.Senthilkumar.jpg' },
        { name: 'Dr. Hemalatha', role: 'Executive Director', image: '/Doctor/Dr.G.Hemalatha.jpg' }
      ];

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/aboutus' }
  ]);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About SilverLine Hospital Trichy",
    "description": "SilverLine Hospital is a leading multispeciality healthcare destination in Tiruchirappalli, Tamil Nadu, providing compassionate, advanced medical care.",
    "url": `${HOSPITAL_NAP.url}/aboutus`,
    "mainEntity": {
      "@type": "Hospital",
      "name": HOSPITAL_NAP.name,
      "address": HOSPITAL_NAP.address,
      "telephone": HOSPITAL_NAP.telephone
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe fallback if browser requires user interaction for autoplay
      });
    }
  }, []);

  return (
    <div id="aboutus" className="relative">
      <SEO
        title="About SilverLine Hospital | Leading Healthcare in Trichy"
        description="Learn about SilverLine Hospital's mission, advanced medical infrastructure, leadership message from MD Dr. Senthil Kumar, and compassionate patient care values in Trichy."
        keywords="about silverline hospital, hospital in trichy, healthcare in tiruchirappalli, medical leadership trichy, hospital infrastructure tamil nadu"
        canonical="/aboutus"
        schema={[aboutSchema, breadcrumbs]}
      />
      {/* 1. HERO VIDEO SECTION */}
      <section 
        className="relative w-full h-[200px] sm:h-[320px] md:h-[500px] xl:h-[550px] flex items-center justify-center text-white overflow-hidden bg-[#0E2A47]"
      >
        <div className="w-full max-w-[480px] sm:max-w-none mx-auto h-full relative">
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0E2A47]">
            <video
              ref={videoRef}
              src={mediaAssets.aboutHeroVideo}
              poster={hero.about}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
              aria-label="SilverLine Hospital About Video"
            />
          </div>
        </div>
      </section>

      {/* Hero Overlap Element (for Island Bar) */}
      <div className="relative z-30">
        <IslandBar />
      </div>

      {/* 2. MANAGING DIRECTOR'S MESSAGE */}
      <section id="md-message" className="py-20 bg-gradient-to-br from-[#0E2A47] to-[#163860] relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00B5A5]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#00B5A5]/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          {/* Section label */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#00B5A5]/40 bg-[#00B5A5]/10">
              <span className="w-2 h-2 rounded-full bg-[#00B5A5] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#00B5A5]">
                Managing Director's Message
              </span>
            </div>
          </div>

          {/* Desktop: image left + message right | Mobile: stacked */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 animate-on-scroll fade-in-up">

            {/* Director Photo */}
            <div className="flex-shrink-0 w-64 md:w-72">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#00B5A5]/30 to-transparent blur-md" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 aspect-[3/4]">
                  <EditableImage
                    configKey="about.managingDirector.image"
                    src={standbyImages.managingDirectorMessage}
                    defaultValue={standbyImages.managingDirectorMessage}
                    alt="Managing Director"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 text-white">
              {/* Large quote mark */}
              <div className="text-[#00B5A5]/30 text-[120px] leading-none font-serif select-none -mb-8">&ldquo;</div>

              <EditableText
                as="p"
                configKey="about.managingDirector.message"
                defaultValue="At SilverLine Hospital, our commitment to excellence goes far beyond the boundaries of a clinical setting. From the very first day, our vision has been to build an institution where every patient is treated with dignity, compassion, and the highest standard of medical care. We believe that healing is not merely a medical process — it is a deeply human experience. Our dedicated team of specialists, nurses, and support staff work tirelessly to ensure that each person who walks through our doors leaves healthier, stronger, and reassured. We remain committed to continuous growth, investment in technology, and most importantly — in our people. Thank you for trusting SilverLine as your healthcare partner."
                className="text-white/90 text-lg leading-relaxed italic mb-8"
              />

              {/* Name & designation */}
              <div className="border-l-4 border-[#00B5A5] pl-6">
                <EditableText
                  as="h3"
                  configKey="about.managingDirector.name"
                  defaultValue="Dr. Senthil Kumar"
                  className="text-2xl font-extrabold text-white mb-1"
                />
                <EditableText
                  as="p"
                  configKey="about.managingDirector.designation"
                  defaultValue="Managing Director"
                  className="text-[#00B5A5] font-semibold text-sm tracking-wide"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION, VISION & CORE VALUES SECTION (Asymmetrical Layout with Refined Spacing) */}
      <section id="mission-vision-values" className="py-14 md:py-20 bg-white relative">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-6 md:gap-8 items-stretch">
            
            {/* Vision Card: Mobile = 1st (order-1), Desktop = Left Column, Row 1 */}
            <div className="order-1 md:order-none md:col-start-1 md:row-start-1 bg-gradient-to-br from-blue-50/70 to-sky-50/40 p-6 sm:p-8 md:p-10 rounded-3xl border border-blue-100/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between motion-reduce:transform-none">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <EditableText
                  as="h2"
                  configKey="about.vision.title"
                  defaultValue="Our Vision"
                  className="text-2xl md:text-3xl font-extrabold text-[#0E2A47] mb-3"
                />
                <EditableText
                  as="p"
                  configKey="about.vision.description"
                  defaultValue="To redefine the future of healthcare by integrating cutting-edge technology, research and compassionate care."
                  className="text-gray-600 text-base md:text-lg leading-relaxed"
                />
              </div>
            </div>

            {/* Mission Card: Mobile = 2nd (order-2), Desktop = Left Column, Row 2 */}
            <div className="order-2 md:order-none md:col-start-1 md:row-start-2 bg-gradient-to-br from-teal-50/70 to-emerald-50/40 p-6 sm:p-8 md:p-10 rounded-3xl border border-teal-100/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between motion-reduce:transform-none">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#00B5A5]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <circle cx="12" cy="12" r="5" strokeWidth="2" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <EditableText
                  as="h2"
                  configKey="about.mission.title"
                  defaultValue="Our Mission"
                  className="text-2xl md:text-3xl font-extrabold text-[#0E2A47] mb-3"
                />
                <EditableText
                  as="p"
                  configKey="about.mission.description"
                  defaultValue="To deliver affordable, world-class, evidence-based healthcare with empathy, dignity and patient wellbeing."
                  className="text-gray-600 text-base md:text-lg leading-relaxed"
                />
              </div>
            </div>

            {/* Core Values Card: Mobile = 3rd (order-3), Desktop = Right Column (Spans Rows 1 & 2) */}
            <div className="order-3 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 bg-gradient-to-br from-[#FFF8F5] via-[#FAF5F2] to-[#F2F8F8] p-5 sm:p-7 md:p-8 lg:p-10 pb-6 sm:pb-8 md:pb-10 rounded-3xl border border-rose-100/80 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between motion-reduce:transform-none min-h-0 sm:min-h-[460px] md:min-h-full">
              
              {/* Decorative background shape */}
              <div className="absolute -top-6 -right-6 w-44 h-44 md:w-56 md:h-56 text-rose-500/10 pointer-events-none select-none z-0">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 200 200">
                  <path d="M100 0 C120 70 130 80 200 100 C130 120 120 130 100 200 C80 130 70 120 0 100 C70 80 80 70 100 0 Z" />
                  <circle cx="100" cy="100" r="32" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <EditableText
                    as="h2"
                    configKey="about.values.title"
                    defaultValue="Core Values"
                    className="text-2xl sm:text-3xl font-extrabold text-[#0E2A47] tracking-tight"
                  />
                </div>

                <div className="space-y-3.5 sm:space-y-4">
                  {valuesData.map((value: any, index: number) => (
                    <div key={index} className={index > 0 ? "pt-3.5 sm:pt-4 border-t border-rose-100/70" : ""}>
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                          <EditableText
                            as="h3"
                            configKey={`about.values[${index}].title`}
                            defaultValue={value.title}
                            className="text-base sm:text-lg font-bold text-[#0E2A47] leading-snug"
                          />
                          {value.description && (
                            <EditableText
                              as="p"
                              configKey={`about.values[${index}].description`}
                              defaultValue={value.description}
                              className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. WORD WITH CAROUSEL IMAGE SECTION (Auto Scroll Enabled) */}
      <section className="py-14 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 animate-on-scroll fade-in-left">
                    <EditableText as="h2" configKey="about.wordWithCarousel.title" defaultValue="Our Commitment" className="text-4xl font-bold text-[#0E2A47] mb-6" />
                    <EditableText as="p" configKey="about.wordWithCarousel.message" defaultValue="" className="text-xl text-gray-600 leading-relaxed italic" />
                </div>
                <div className="flex-1 relative w-full h-[300px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl animate-on-scroll fade-in-right">
                    <EditableImage 
                        src={standbyImages.commitmentToCare}
                        defaultValue={standbyImages.commitmentToCare} 
                        alt="Our Commitment to Care" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>
        </div>
      </section>

      {/* 5. STATS BAR WITH BG IMAGE */}
      <StatsBar />

      {/* 6. OUR TEAM SECTION */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <EditableText as="h2" configKey="about.team.title" defaultValue="Our Core Team" className="text-3xl md:text-4xl font-bold text-[#0E2A47] mb-3 animate-on-scroll fade-in-up" />
            <EditableText as="p" configKey="about.team.subtitle" defaultValue="" className="text-gray-600 mb-12 animate-on-scroll fade-in-up" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
                {teamMembers.map((member: any, idx: number) => (
                    <div key={idx} className="group animate-on-scroll fade-in-up" style={{ transitionDelay: `${idx * 150}ms` }}>
                        <div className="relative mb-5 rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                            <EditableImage configKey={`about.team.members[${idx}].image`} defaultValue={member.image} alt={member.name} className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-700" />
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
      <section id="journey" className="py-14 md:py-20 bg-white overflow-hidden">
           <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                <div className="text-center mb-16 md:mb-20 animate-on-scroll fade-in-up">
                    <EditableText as="h2" configKey="about.journey.title" defaultValue="The Hospital Journey" className="text-3xl md:text-4xl font-black text-[#0E2A47]" />
                    <div className="w-20 h-1 bg-[#00B5A5] mx-auto mt-3 rounded-full"></div>
                </div>

                <div className="relative">
                    {/* Central Vertical Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-100 -translate-x-1/2 hidden md:block"></div>
                    
                    <div className="space-y-8 md:space-y-0 relative">
                        {journey.map((item: any, index: number) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                {/* Left/Right Side Card */}
                                <div className="flex-1 w-full md:px-12 animate-on-scroll" style={{ animationName: index % 2 === 0 ? 'fade-in-left' : 'fade-in-right' }}>
                                    <div className={`p-6 sm:p-8 md:p-10 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 hover:border-[#00B5A5]/30 hover:shadow-[0_30px_70px_rgba(0,181,165,0.1)] transition-all duration-500 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <span className="text-4xl md:text-5xl font-black text-[#00B5A5]/15 mb-3 block">{item.year}</span>
                                        <EditableText as="h3" configKey={`about.journey.items[${index}].title`} defaultValue={item.title} className="text-xl md:text-2xl font-bold text-[#0E2A47]" />
                                        <EditableText as="p" configKey={`about.journey.items[${index}].description`} defaultValue={item.description} className="text-gray-500 mt-4 leading-relaxed text-base md:text-lg" />
                                    </div>
                                </div>
                                
                                {/* Timeline Dot */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-white border-[5px] border-[#00B5A5] shadow-[0_0_15px_rgba(0,181,165,0.3)] hidden md:block"></div>
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
      <section className="py-14 md:py-20 bg-white relative overflow-hidden">
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
                        <EditableImage 
                            configKey="about.sideBySide.image" 
                            src={standbyImages.stateOfTheArtFacilities}
                            defaultValue={standbyImages.stateOfTheArtFacilities} 
                            alt="Facility" 
                            className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-1000" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-50/30 -skew-x-12 z-0"></div>
      </section>

      {/* Facilities Highlights section to show all new facility words */}
      <FacilitiesHighlights />
    </div>
  );
};

export default About;
