import React, { useState, useContext } from 'react';
import EditableText from './MasterSetup/EditableText';
import EditableImage from './MasterSetup/EditableImage';
import { useCountUp } from '../hooks/useCountUp';
import IslandBar from './IslandBar';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import Testimonials from './Testimonials';

const StatCounter: React.FC<{ configKey: string; endValue: number }> = ({ configKey, endValue }) => {
    const { count, ref } = useCountUp(endValue, 2000);
    return (
        <div className="flex flex-col items-center text-center md:flex-row md:text-left">
            <span ref={ref} className="text-4xl font-bold text-[#00B5A5] md:text-5xl">
                {count}
            </span>
            <EditableText 
                as="span" 
                configKey={`${configKey}.label`}
                defaultValue={configKey.split('.').pop() || ''}
                className="mt-1 text-base text-gray-700 md:mt-0 md:ml-4 md:text-lg" 
            />
        </div>
    );
};


const About: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(1);
  const journey = config.about?.journey?.items || [];
  const valuesData = config.about?.values || [];

  const toggleValue = (index: number) => {
    setActiveValueIndex(prevIndex => (prevIndex === index ? null : index));
  };
  
  const heroContent = config.about?.heroCarouselSlides?.[0] || {
      title: 'About SilverLine Hospital',
      subtitle: 'Our commitment to excellence, compassion, and innovation in healthcare.',
      image: 'imagePaths.about.hero1'
  };

  return (
    <div id="aboutus">
       {/* Fixed Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
      >
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <EditableImage
            configKey="about.heroCarouselSlides[0].image"
            alt={heroContent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative text-center animate-on-scroll fade-in-up p-4">
          <EditableText
            as="h1"
            configKey="about.heroCarouselSlides[0].title"
            defaultValue={heroContent.title}
            className="text-5xl md:text-6xl font-bold"
          />
          <EditableText
            as="p"
            configKey="about.heroCarouselSlides[0].subtitle"
            defaultValue={heroContent.subtitle}
            className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto"
          />
        </div>
      </section>
      
      <IslandBar />

      <section id="mission-vision" className="py-24 bg-white z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-center">
          {/* Left part: Tagline */}
          <div className="animate-on-scroll fade-in-left p-4 sm:p-6 lg:p-12">
            <div className="max-w-md ml-auto mr-auto md:mr-0">
              <EditableText 
                as="h2" 
                configKey="about.aboutContent.tagline" 
                defaultValue="Caring for Your Smile,<br /> Enhancing life"
                className="text-5xl lg:text-6xl font-thin text-[#0E2A47] !leading-snug"
              />
            </div>
          </div>

          {/* Middle part: Image */}
          <div className="animate-on-scroll zoom-in">
            <EditableImage 
              configKey="about.aboutContent.image"
              alt="Dentist providing care at SilverLine Hospital in Trichy" 
              className="w-full h-96 md:h-full object-cover" 
            />
          </div>

          {/* Right part: Stats */}
          <div className="animate-on-scroll fade-in-right p-4 sm:p-6 lg:p-12">
            <div className="max-w-md ml-auto mr-auto md:ml-0">
              <div className="flex flex-row items-start justify-around md:flex-col md:items-start md:space-y-6">
                <StatCounter configKey="about.aboutContent.stats.experience" endValue={20} />
                <StatCounter configKey="about.aboutContent.stats.award" endValue={162} />
                <StatCounter configKey="about.aboutContent.stats.doctor" endValue={458} />
              </div>
              <EditableText 
                  as="p"
                  configKey="about.aboutContent.statsDescription"
                  defaultValue="We take meticulous care of your dental needs to ensure a healthy, lasting smile."
                  className="mt-8 text-gray-600 leading-relaxed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Main Content Wrapper --- */}
      <div className="relative bg-white z-10">
        
        {/* --- Our Values Section --- */}
        <section id="our-values" className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <EditableText
              as="h2"
              configKey="about.values.title"
              defaultValue="Our Values"
              className="text-4xl font-bold text-[#0E2A47] mb-16 animate-on-scroll fade-in-up"
            />
            {/* Mobile Accordion View */}
            <div className="md:hidden animate-on-scroll fade-in-up">
              <div className="space-y-3">
                {valuesData.map((value: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleValue(index)}
                      className="w-full flex justify-between items-center text-left font-semibold py-4 px-5 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00B5A5]"
                      aria-expanded={activeValueIndex === index}
                      aria-controls={`value-content-${index}`}
                    >
                      <EditableText as="span" configKey={`about.values[${index}].title`} defaultValue={value.title} className={activeValueIndex === index ? 'text-[#00B5A5]' : 'text-gray-800'} />
                      <svg className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${activeValueIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div
                      id={`value-content-${index}`}
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: activeValueIndex === index ? '500px' : '0px' }}
                    >
                      <div className="p-5 border-t border-gray-200">
                        <ul className="space-y-4">
                          {value.points.map((point: string, pointIndex: number) => (
                            <li key={pointIndex} className="flex items-start text-gray-700 leading-relaxed">
                              <span className="flex-shrink-0 w-2 h-2 bg-[#00B5A5] rounded-full mt-2.5 mr-4"></span>
                              <EditableText as="span" configKey={`about.values[${index}].points[${pointIndex}]`} defaultValue={point} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Tab View */}
            <div className="hidden md:grid md:grid-cols-3 gap-12 animate-on-scroll fade-in-up">
              {/* Left Menu */}
              <div className="md:col-span-1">
                <ul className="space-y-1">
                  {valuesData.map((value: any, index: number) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveValueIndex(index)}
                        className={`w-full text-left font-semibold py-3 px-5 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00B5A5] ${
                          activeValueIndex === index
                            ? 'bg-[#00B5A5] text-white shadow-lg transform translate-x-2'
                            : 'text-gray-700 hover:bg-gray-100 hover:translate-x-1'
                        }`}
                      >
                         <EditableText as="span" configKey={`about.values[${index}].title`} defaultValue={value.title} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right Content */}
              <div className="md:col-span-2">
                {activeValueIndex !== null && valuesData[activeValueIndex] && (
                  <ul className="space-y-5" key={activeValueIndex}>
                    {valuesData[activeValueIndex].points.map((point: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700 leading-relaxed animate-fade-in" style={{ animationDelay: `${index * 100}ms`}}>
                        <span className="flex-shrink-0 w-2 h-2 bg-[#00B5A5] rounded-full mt-2.5 mr-4"></span>
                        <EditableText as="span" configKey={`about.values[${activeValueIndex}].points[${index}]`} defaultValue={point} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* --- Hospital Journey Section --- */}
        <section id="journey" className="py-24 bg-gray-50">
           <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="text-center mb-16 animate-on-scroll fade-in-up">
                    <EditableText as="h2" configKey="about.journey.title" defaultValue="Our Journey to Excellence" className="text-4xl font-bold text-[#0E2A47]" />
                    <EditableText as="p" configKey="about.journey.subtitle" defaultValue="A timeline of our dedication to healthcare and our community." className="mt-4 text-lg text-gray-600" />
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* The vertical line */}
                    <div className="absolute top-0 h-full w-0.5 bg-gray-200 left-4 md:left-1/2 md:-translate-x-1/2"></div>
                    
                    <div className="space-y-12">
                        {journey.map((item, index) => (
                            <div key={index} className="relative flex items-start animate-on-scroll fade-in-up" style={{ transitionDelay: `${index * 150}ms` }}>
                                {/* Dot on the timeline */}
                                <div className="absolute top-3 left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 bg-[#00B5A5] rounded-full border-4 border-white z-10 shadow-sm"></div>
                                
                                {/* Content card */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'} pl-12 md:pl-0`}>
                                     <div 
                                        tabIndex={0}
                                        className={`p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${index % 2 === 0 ? 'md:text-right' : 'text-left'} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-50 focus-visible:ring-[#00B5A5]`}>
                                        <p className="font-bold text-2xl text-[#0E2A47]">{item.year}</p>
                                        <EditableText as="h3" configKey={`about.journey.items[${index}].title`} defaultValue={item.title} className="text-xl font-bold text-[#00B5A5] mt-1" />
                                        <EditableText as="p" configKey={`about.journey.items[${index}].description`} defaultValue={item.description} className="text-gray-600 mt-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
           </div>
        </section>

        <Testimonials />

      </div>
    </div>
  );
};

export default About;