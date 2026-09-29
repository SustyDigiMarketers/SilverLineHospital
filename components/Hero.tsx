import React, { useState, useEffect, useRef, useCallback } from 'react';
import EditableImage from './MasterSetup/EditableImage';
import { motion } from 'framer-motion';
import { hero } from '../data/images';

const homeHeroImages = [
  hero.home1,
  hero.home2,
  hero.home3,
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const transitionEndRef = useRef<number | null>(null);

  // 1. Preload and decode ALL home hero images immediately on mount
  useEffect(() => {
    homeHeroImages.forEach((src) => {
      if (typeof window !== 'undefined' && src) {
        const img = new Image();
        img.src = src;
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      }
    });
  }, []);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const goToSlide = useCallback((targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    setPreviousIndex(currentIndex);
    setIsTransitioning(true);
    setCurrentIndex(targetIndex);

    // Preload next upcoming image in advance
    const nextUpcoming = (targetIndex + 1) % homeHeroImages.length;
    const img = new Image();
    img.src = homeHeroImages[nextUpcoming];
    if ('decode' in img) {
      img.decode().catch(() => {});
    }

    if (transitionEndRef.current) {
      clearTimeout(transitionEndRef.current);
    }
    // Match crossfade transition duration (800ms)
    transitionEndRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      setPreviousIndex(targetIndex);
    }, 850);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (homeHeroImages.length <= 1) return;
    const nextIndex = (currentIndex + 1) % homeHeroImages.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    resetTimeout();
    if (homeHeroImages.length > 1) {
      timeoutRef.current = window.setTimeout(goToNext, 6000);
    }
    return () => {
      resetTimeout();
      if (transitionEndRef.current) {
        clearTimeout(transitionEndRef.current);
      }
    };
  }, [currentIndex, goToNext, resetTimeout]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('island-bar-trigger') || document.body.children[1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      style={{ position: 'relative', overflow: 'hidden' }} 
      className="relative w-full overflow-hidden h-[200px] sm:h-[320px] md:h-[500px] xl:h-[550px] bg-[#0E2A47]"
      aria-roledescription="carousel"
      aria-label="Hero Carousel"
    >
      <div className="w-full max-w-[480px] sm:max-w-none mx-auto h-full relative">
        <div className="absolute inset-0 w-full h-full">
          {homeHeroImages.map((imgSrc: string, index: number) => {
            const isActive = index === currentIndex;
            const isPrevious = index === previousIndex && isTransitioning;

            // Active image crossfades in at z-20.
            // Previous image stays fully opaque underneath at z-10 until new image is in place.
            // Inactive images stay at z-0 opacity-0.
            let layerClass = 'opacity-0 z-0 pointer-events-none';
            if (isActive) {
              layerClass = 'opacity-100 z-20';
            } else if (isPrevious) {
              layerClass = 'opacity-100 z-10 pointer-events-none';
            }

            return (
              <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 md:duration-1000 ease-in-out ${layerClass}`}
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${homeHeroImages.length}`}
              >
                {/* Background Image Wrapper - Seamless dark background, zero white flash */}
                <div className="block absolute inset-0 overflow-hidden bg-[#0E2A47]" style={{ width: '100%', height: '100%' }}>
                  <EditableImage
                    src={imgSrc}
                    defaultValue={imgSrc}
                    alt="SilverLine Hospital Hero"
                    className="w-full h-full object-cover object-center"
                    priority={true}
                    loading="eager"
                    style={{ 
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Dot Indicators */}
      {homeHeroImages.length > 1 && (
        <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {homeHeroImages.map((_: any, slideIndex: number) => (
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
        className="absolute bottom-4 left-4 md:bottom-6 md:left-10 z-30 flex flex-col items-center text-white/60 hover:text-white transition-all group"
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
