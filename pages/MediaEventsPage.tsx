import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { standbyImages, hero } from '../data/images';
import { galleryEvents, pressImages, GalleryEvent } from '../lib/galleryEventsData';
import { generateBreadcrumbSchema, HOSPITAL_NAP } from '../lib/seoConfig';
import { Calendar, MapPin, Image as ImageIcon, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ActiveLightbox {
  eventName: string;
  category?: string;
  images: string[];
  currentIndex: number;
}

const PRESS_SCROLL_STYLE = `
  @keyframes pressContinuousScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .press-scroll-track {
    display: flex;
    width: max-content;
    animation: pressContinuousScroll 60s linear infinite;
    will-change: transform;
  }

  .press-scroll-container:hover .press-scroll-track {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .press-scroll-track {
      animation: none !important;
    }
  }

  /* Thin horizontal scrollbar for event popup thumbnail strip */
  .thin-horizontal-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 181, 165, 0.5) transparent;
    -webkit-overflow-scrolling: touch;
  }

  .thin-horizontal-scrollbar::-webkit-scrollbar {
    height: 4px;
    background: transparent;
  }

  .thin-horizontal-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border: none;
    margin: 0;
  }

  .thin-horizontal-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 181, 165, 0.45);
    border-radius: 9999px;
    border: none;
  }

  .thin-horizontal-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 181, 165, 0.8);
  }
`;

const MediaEventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightbox, setLightbox] = useState<ActiveLightbox | null>(null);

  // Guarantee distinct event folders (one card per event folder)
  const uniqueEvents = useMemo(() => {
    const seenFolders = new Set<string>();
    return galleryEvents.filter(e => {
      const folderKey = (e.folder || e.id || e.name).toLowerCase().trim();
      if (seenFolders.has(folderKey)) return false;
      seenFolders.add(folderKey);
      return e.images && e.images.length > 0;
    });
  }, []);

  // Extract unique categories dynamically from the manifest
  const categories = useMemo(() => {
    const set = new Set<string>();
    uniqueEvents.forEach(e => {
      if (e.category && e.category.trim()) {
        set.add(e.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [uniqueEvents]);

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return uniqueEvents;
    return uniqueEvents.filter(e => e.category === selectedCategory);
  }, [selectedCategory, uniqueEvents]);

  // Duplicated press images for smooth infinite marquee
  const duplicatedPressImages = useMemo(() => {
    if (pressImages.length === 0) return [];
    return [...pressImages, ...pressImages];
  }, []);

  // Open Lightbox for an event or press
  const openLightbox = useCallback((name: string, images: string[], startIndex: number = 0, category?: string) => {
    if (!images || images.length === 0) return;
    setLightbox({
      eventName: name,
      category,
      images,
      currentIndex: Math.max(0, Math.min(startIndex, images.length - 1))
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const nextImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.images.length
      };
    });
  }, [lightbox]);

  const prevImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
      };
    });
  }, [lightbox]);

  // Deep-linking: check URL for ?event=<id> or hash
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get('event');
    const hash = window.location.hash.replace('#', '');

    const targetId = eventParam || hash;
    if (targetId) {
      const found = galleryEvents.find(e => 
        e.id === targetId || 
        e.folder.toLowerCase().includes(targetId.toLowerCase()) ||
        e.name.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(targetId.toLowerCase())
      );

      if (found && found.images && found.images.length > 0) {
        openLightbox(found.title || found.name, found.images, 0, found.category);
      }
    }
  }, [openLightbox]);

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [lightbox, closeLightbox, nextImage, prevImage]);

  // Structured schemas for SEO
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Media & Events', url: '/media-events' }
  ]);

  const eventCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SilverLine Hospital Media & Events",
    "description": "Photographic highlights, press releases, community medical camps, and hospital milestones at SilverLine Hospital Trichy.",
    "url": `${HOSPITAL_NAP.url}/media-events`
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Inject smooth keyframe styles for Press Release carousel */}
      <style>{PRESS_SCROLL_STYLE}</style>

      <SEO 
        title="Media & Events | SilverLine Hospital Trichy"
        description="Explore press releases, community health camps, medical milestones, and staff welfare photo galleries at SilverLine Hospital Trichy."
        keywords="hospital media trichy, hospital events trichy, medical camps trichy, healthcare press release trichy, silverline hospital gallery"
        canonical="/media-events"
        schema={[eventCollectionSchema, breadcrumbs]}
      />

      <PageHero
        title="Media & Events"
        subtitle="Explore our press releases, community outreach camps, clinical milestones, and hospital life in high resolution."
        backgroundImage={hero.mediaEvents}
      />

      <main className="py-12 md:py-20 relative">
        {/* ─── Press Releases Continuous Scrolling Section (Right to Left) ─── */}
        {pressImages.length > 0 && (
          <section className="mb-16 md:mb-24 overflow-hidden" aria-label="Press Releases">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 md:mb-8 text-center">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#00B5A5] border border-teal-100 mb-2.5">
                Media Coverage & Publications
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2A47] tracking-tight">
                Press Releases
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-xl mx-auto">
                News features, medical press announcements, and healthcare editorial coverage from our Press gallery.
              </p>
            </div>

            {/* Scrolling Track Container with gradient edges and hover pause */}
            <div className="relative w-full overflow-hidden press-scroll-container py-2">
              {/* Left & Right subtle edge fade */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-[#f8fafc] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-[#f8fafc] to-transparent" />

              <div className="press-scroll-track gap-4 sm:gap-6 px-4">
                {duplicatedPressImages.map((src, index) => {
                  const originalIndex = index % pressImages.length;
                  return (
                    <div
                      key={`press-${index}`}
                      onClick={() => openLightbox('Press Releases', pressImages, originalIndex, 'Press Coverage')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox('Press Releases', pressImages, originalIndex, 'Press Coverage');
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View press release ${originalIndex + 1} of ${pressImages.length}`}
                      className="group relative flex-shrink-0 w-56 sm:w-72 md:w-80 h-40 sm:h-48 md:h-56 rounded-2xl overflow-hidden bg-slate-200 shadow-md hover:shadow-xl border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:ring-offset-2 select-none transition-all duration-300 hover:scale-[1.02]"
                    >
                      <img
                        src={src}
                        alt={`Press Release ${originalIndex + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/Gallery/DSC_9806.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-xs font-semibold flex items-center gap-1.5 drop-shadow">
                          <ImageIcon className="w-4 h-4 text-teal-300" />
                          View Full Release
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── Event Folder Cards Section ─── */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Introduction & Category Filter */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#00B5A5] border border-teal-100 mb-2.5">
              Event Captures & Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2A47] tracking-tight">
              Hospital Events & Activities
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Select an event below to explore high-resolution photographic albums of our medical camps, awareness walkathons, and clinical inaugurations.
            </p>

            {/* Category Filter Pills */}
            {categories.length > 2 && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6">
                {categories.map(cat => {
                  const isActive = selectedCategory === cat;
                  const count = cat === 'All' 
                    ? uniqueEvents.length 
                    : uniqueEvents.filter(e => e.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00B5A5]/50 ${
                        isActive
                          ? 'bg-[#00B5A5] text-white shadow-md shadow-[#00B5A5]/25 scale-105'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Grid of Event Cards */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#0E2A47]">No events found</h3>
              <p className="text-sm text-slate-500 mt-1">
                No events currently match the selected category.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-4 py-2 bg-[#00B5A5] text-white rounded-xl text-xs font-bold hover:bg-[#009b8d] transition-colors"
              >
                Show All Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredEvents.map((event, idx) => {
                // Rule: Strictly use the FIRST naturally-sorted image as the card thumbnail
                const thumbnailSrc = event.images && event.images.length > 0
                  ? event.images[0]
                  : '/Gallery/Home1.jpg';
                
                const eventTitle = event.title || event.name;
                const photoCount = event.images?.length || 0;

                return (
                  <motion.div
                    key={event.id || event.folder || idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => openLightbox(eventTitle, event.images, 0, event.category)}
                    className="group relative flex flex-col justify-end h-[440px] sm:h-[480px] rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(0,181,165,0.22)] transition-all duration-500 hover:-translate-y-2 select-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo gallery for ${eventTitle}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(eventTitle, event.images, 0, event.category);
                      }
                    }}
                  >
                    {/* Background Event Image (Thumbnail) */}
                    <img
                      src={thumbnailSrc}
                      alt={eventTitle}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/Gallery/Home1.jpg';
                      }}
                    />

                    {/* Top Subtle Vignette */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

                    {/* Deep Cinematic Gradient towards lower section */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47] via-[#0E2A47]/85 to-transparent opacity-95 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Badges: Category & Photo Count */}
                    <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10 pointer-events-none">
                      {event.category && (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0E2A47] bg-white/95 backdrop-blur-md shadow-md">
                          {event.category}
                        </span>
                      )}
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-md ml-auto">
                        <ImageIcon className="w-3.5 h-3.5 text-teal-300" />
                        {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
                      </span>
                    </div>

                    {/* Lower Information Section */}
                    <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end">
                      {/* Date & Location Chips */}
                      {(event.date || event.location) && (
                        <div className="flex flex-wrap items-center gap-3 text-teal-300 text-xs font-medium mb-2.5">
                          {event.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#00B5A5]" />
                              {event.date}
                            </span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1 text-slate-300 truncate max-w-[200px]">
                              <MapPin className="w-3.5 h-3.5 text-[#00B5A5]" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Event Title */}
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-sm group-hover:text-teal-200 transition-colors line-clamp-2">
                        {eventTitle}
                      </h3>

                      {/* Event Short Description */}
                      {event.description && (
                        <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}

                      {/* Bottom CTA Button */}
                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-400">
                          Click to open gallery
                        </span>
                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00B5A5] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#00B5A5]/30 group-hover:bg-[#009b8d] transition-all transform group-hover:translate-x-1">
                          <span>View Event</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0E2A47]/95 backdrop-blur-xl p-3 sm:p-6 select-none overflow-hidden h-full max-h-screen"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${lightbox.eventName}`}
            onClick={closeLightbox}
          >
            {/* Top Bar with Event Title, Category, Counter & Close */}
            <div 
              className="w-full max-w-7xl mx-auto flex items-center justify-between py-1.5 sm:py-2 text-white z-10 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0 pr-4">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white truncate max-w-xs sm:max-w-md md:max-w-xl">
                  {lightbox.eventName}
                </h3>
                <div className="flex items-center gap-2">
                  {lightbox.category && (
                    <span className="text-[11px] font-bold text-white bg-[#00B5A5]/30 border border-[#00B5A5]/50 px-2.5 py-0.5 rounded-full">
                      {lightbox.category}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-teal-300 bg-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {lightbox.currentIndex + 1} / {lightbox.images.length}
                  </span>
                </div>
              </div>

              <button
                onClick={closeLightbox}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B5A5] flex-shrink-0"
                aria-label="Close image viewer (Press Escape)"
                title="Close (Esc)"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Central Main Image Container with Prev/Next Controls */}
            <div 
              className="relative w-full flex-1 min-h-0 flex items-center justify-center mt-1 mb-[2px] sm:my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              {lightbox.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#00B5A5] active:scale-95 shadow-xl"
                  aria-label="Previous image (Left arrow)"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>
              )}

              {/* Active Image */}
              <motion.div
                key={lightbox.currentIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="max-h-[62vh] sm:max-h-[74vh] max-w-[94vw] sm:max-w-[85vw] flex items-center justify-center"
              >
                <img
                  src={lightbox.images[lightbox.currentIndex]}
                  alt={`${lightbox.eventName} photo ${lightbox.currentIndex + 1}`}
                  className="max-h-[62vh] sm:max-h-[74vh] max-w-[94vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              </motion.div>

              {/* Next Button */}
              {lightbox.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#00B5A5] active:scale-95 shadow-xl"
                  aria-label="Next image (Right arrow)"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>
              )}
            </div>

            {/* Bottom Horizontal Thumbnail Strip for Quick Navigation */}
            {lightbox.images.length > 1 && (
              <div 
                className="w-full max-w-4xl mx-auto mt-0 mb-1 sm:my-2 px-2 overflow-x-auto overflow-y-hidden thin-horizontal-scrollbar flex items-center justify-start sm:justify-center gap-2 z-10 flex-shrink-0 border-0 outline-none bg-transparent"
                onClick={(e) => e.stopPropagation()}
              >
                {lightbox.images.map((thumbSrc, thumbIdx) => {
                  const isCurrent = thumbIdx === lightbox.currentIndex;
                  return (
                    <button
                      key={`thumb-${thumbIdx}`}
                      onClick={() => setLightbox(prev => prev ? { ...prev, currentIndex: thumbIdx } : null)}
                      className={`relative flex-shrink-0 w-12 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                        isCurrent 
                          ? 'ring-2 ring-[#00B5A5] scale-105 sm:scale-110 opacity-100' 
                          : 'opacity-50 hover:opacity-80 border border-white/20'
                      }`}
                      aria-label={`Go to photo ${thumbIdx + 1}`}
                    >
                      <img
                        src={thumbSrc}
                        alt={`Thumbnail ${thumbIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Bottom Keyboard Hint */}
            <div 
              className="w-full max-w-7xl mx-auto flex items-center justify-center py-1 text-white/50 text-xs hidden sm:flex gap-6 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Use <strong>←</strong> and <strong>→</strong> keys to navigate</span>
              <span>•</span>
              <span>Press <strong>ESC</strong> to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaEventsPage;
