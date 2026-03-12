import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import EditableImage from './MasterSetup/EditableImage';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  
  // Use a state for slides to allow dynamic discovery
  const [slides, setSlides] = useState<any[]>(config.hero?.slides || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Discovery Logic for Home{n}.jpg images
  useEffect(() => {
    const discoverHomeImages = async () => {
      const dynamicSlides = [];
      const MAX_DISCOVERY = 15; // Limit to check up to 15 images
      
      const checkPath = (path: string): Promise<boolean> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = path;
        });
      };

      for (let i = 1; i <= MAX_DISCOVERY; i++) {
        const path = `/Hero/Home${i}.jpg`;
        const exists = await checkPath(path);
        
        if (exists) {
          dynamicSlides.push({
            image: path,
            headline: '',
            paragraph: '',
            ctaText: '',
          });
        } else if (i > 3) { 
          // Stop if i > 3 to minimize failed requests if gaps appear, 
          // but allow checking first few in case of naming inconsistency
          break;
        }
      }

      if (dynamicSlides.length > 0) {
        setSlides(dynamicSlides);
      }
    };

    discoverHomeImages();
  }, []);

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
      return <div className="h-[250px] md:h-[500px] bg-slate-100 flex items-center justify-center">
          <div className="animate-pulse text-[#27afaf] font-black tracking-tighter uppercase text-xs">Loading Visuals...</div>
      </div>;
  }

  return (
    <section 
      id="home" 
      style={{ position: 'relative', overflow: 'hidden' }} 
      className="relative w-full overflow-hidden h-[200px] md:h-[450px]"
      aria-roledescription="carousel"
      aria-label="Hero Carousel"
    >
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide: any, index: number) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {/* Background Image Wrapper */}
            <div className="block absolute inset-0 overflow-hidden bg-white" style={{ width: '100%', height: '100%' }}>
                <EditableImage
                    configKey={`hero.slides[${index}].image`}
                    defaultValue={slide.image}
                    alt="SilverLine Hospital Hero"
                    className="w-full h-full object-fill"
                    priority={index === 0}
                    style={{ 
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
          </div>
        ))}
      </div>
      
      {/* Dot Indicators - Futuristic Style */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
            {slides.map((_: any, slideIndex: number) => (
            <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
                className={`h-1.5 transition-all duration-700 rounded-full ${
                currentIndex === slideIndex ? 'w-10 bg-[#27afaf] shadow-[0_0_15px_rgba(39,175,175,0.5)]' : 'w-4 bg-white/30 hover:bg-white/60'
                }`}
            />
            ))}
        </div>
      )}

      {/* Scroll Down Indicator */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-6 left-6 md:left-10 z-30 flex flex-col items-center text-white/60 hover:text-white transition-all group"
        aria-label="Scroll down"
      >
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1 transition-colors group-hover:border-[#27afaf]/50">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full group-hover:bg-[#27afaf]"
          />
        </div>
      </button>
      
      <div id="island-bar-trigger" className="absolute bottom-0 w-full h-1"></div>
    </section>
  );
};

export default Hero;
