import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import EditableImage from './MasterSetup/EditableImage';
import EditableText from './MasterSetup/EditableText';

const Hero: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const slides = config.hero?.slides || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const goToNext = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    resetTimeout();
    if (slides.length > 1) {
      timeoutRef.current = window.setTimeout(goToNext, 6000);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, goToNext, resetTimeout, slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('island-bar-trigger') || document.body.children[1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  if (slides.length === 0) {
      return <div className="h-[50vh] md:h-screen bg-gray-200"></div>;
  }

  return (
    <section 
      id="home" 
      style={{ position: 'relative', overflow: 'hidden' }} 
      className="relative w-full overflow-hidden h-[350px] md:h-[500px]"
      aria-roledescription="carousel"
      aria-label="Promotional content"
    >
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide: any, index: number) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: index === currentIndex ? 1 : 0 }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {/* Background Image */}
            <div className="block absolute inset-0 overflow-hidden" style={{ width: '100%', height: '100%' }}>
                <EditableImage
                    configKey={`hero.slides[${index}].image`}
                    alt={slide.headline}
                    className="w-full h-full object-cover"
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill'
                    }}
                />
            </div>
            
             {/* Text Content Removed per Request */}
            <div className="relative h-full container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center z-20 invisible">
              {/* Content hidden but preserved for layout if needed, or fully removed */}
            </div>
          </div>
        ))}
      </div>
      
      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-12 left-8 md:left-1/2 md:-translate-x-1/2 flex space-x-4 z-30">
            {slides.map((_: any, slideIndex: number) => (
            <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
                className={`h-1 transition-all duration-500 rounded-full ${
                currentIndex === slideIndex ? 'w-12 bg-[#00B5A5]' : 'w-8 bg-white/50 hover:bg-white/80'
                }`}
            />
            ))}
        </div>
      )}

      {/* Scroll Down Indicator */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center text-white/80 hover:text-white transition-colors group animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </button>
      
      <div id="island-bar-trigger" className="absolute bottom-0 w-full h-1"></div>
    </section>
  );
};

export default Hero;
