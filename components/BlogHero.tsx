import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import * as blogService from '../lib/blogService';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

interface BlogHeroProps {
    posts: blogService.Post[];
}

const BlogHero: React.FC<BlogHeroProps> = ({ posts }) => {
    const { config } = useContext(MasterSetupContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const goToNext = useCallback(() => {
        if (posts.length <= 1) return;
        const isLastSlide = currentIndex === posts.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, posts.length]);

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(goToNext, 6000);
        return () => {
            resetTimeout();
        };
    }, [currentIndex, goToNext, resetTimeout, posts.length]);

    const goToPreviousSlide = () => {
        if (posts.length <= 1) return;
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? posts.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    if (posts.length === 0) {
        return <div className="h-96 bg-gray-200 flex items-center justify-center">Loading posts...</div>;
    }
    
    const activePost = posts[currentIndex];

    return (
        <section className="relative h-[50vh] md:h-[500px] min-h-[400px] w-full overflow-hidden" aria-roledescription="carousel">
            {posts.map((post, index) => {
                 // Resolve image: Check if string URL (uploaded) or index (local asset)
                 const imageSrc = typeof post.image === 'string' && (post.image.startsWith('http') || post.image.startsWith('data:'))
                    ? post.image
                    : config.imagePaths?.blog?.[Number(post.image)] || '';

                 return (
                     <div
                        key={post.id}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${imageSrc})` }}
                        role="group"
                        aria-roledescription="slide"
                     />
                 );
            })}
            
            <div className="absolute inset-0 bg-black/40"></div>
           
            <div className="relative h-full flex items-center justify-center p-4 z-10">
                 <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 max-w-lg w-full text-center shadow-2xl rounded-sm">
                    <p className="text-[#00B5A5] text-xs uppercase tracking-widest mb-2 font-bold">
                        {activePost.category} &bull; By {activePost.author}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 line-clamp-2">
                        {activePost.title}
                    </h2>
                    <a 
                        href={`#post/${activePost.id}`}
                        className="inline-block text-sm font-semibold text-[#0E2A47] hover:text-[#00B5A5] transition-colors"
                    >
                        Read Full Article &rarr;
                    </a>
                </div>
            </div>

            {/* Navigation Arrows */}
            {posts.length > 1 && (
              <>
                <button
                  onClick={goToPreviousSlide}
                  aria-label="Previous slide"
                  className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-colors focus:outline-none border border-white/30"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={goToNext}
                  aria-label="Next slide"
                  className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-colors focus:outline-none border border-white/30"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
        </section>
    );
};

export default BlogHero;