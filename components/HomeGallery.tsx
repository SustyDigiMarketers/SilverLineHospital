import React, { useMemo } from 'react';
import { galleryEvents, GalleryEvent } from '../lib/galleryEventsData';
import EditableText from './MasterSetup/EditableText';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { standbyImages } from '../data/images';

interface GalleryDisplayItem {
  src: string;
  alt: string;
  eventId: string;
  eventTitle: string;
  category?: string;
}

const FALLBACK_ITEMS: GalleryDisplayItem[] = [
  { src: standbyImages.mediaEvents, alt: 'SilverLine Hospital Events', eventId: 'event-1', eventTitle: 'Hospital Events' },
  { src: standbyImages.mediaEvents, alt: 'Advanced Clinical Infrastructure', eventId: 'event-2', eventTitle: 'Clinical Excellence' },
  { src: standbyImages.mediaEvents, alt: 'SilverLine Hospital Care', eventId: 'event-3', eventTitle: 'Patient Care' },
  { src: standbyImages.mediaEvents, alt: 'State-of-the-art Medical Tech', eventId: 'event-4', eventTitle: 'Medical Infrastructure' },
  { src: standbyImages.mediaEvents, alt: 'Our Commitment to Care', eventId: 'event-5', eventTitle: 'Community Health' },
  { src: standbyImages.mediaEvents, alt: 'Comprehensive Healthcare', eventId: 'event-1', eventTitle: 'Specialized Care' }
];

// Pure function to distribute event photos across Column A (Left) and Column B (Right)
function getEventColumns(events: GalleryEvent[]): { colA: GalleryDisplayItem[]; colB: GalleryDisplayItem[] } {
  const colA: GalleryDisplayItem[] = [];
  const colB: GalleryDisplayItem[] = [];

  if (!events || events.length === 0) {
    return {
      colA: FALLBACK_ITEMS.filter((_, i) => i % 2 === 0),
      colB: FALLBACK_ITEMS.filter((_, i) => i % 2 !== 0)
    };
  }

  // Find the maximum number of images in any single event
  const maxPhotos = Math.max(...events.map(e => (e.images && e.images.length) || 0), 0);

  let toggle = 0;
  // Distribute photos round-by-round so every event is evenly represented in both columns
  for (let round = 0; round < maxPhotos; round++) {
    for (const event of events) {
      if (event.images && event.images[round]) {
        const item: GalleryDisplayItem = {
          src: event.images[round],
          alt: `${event.title || event.name} photo ${round + 1}`,
          eventId: event.id,
          eventTitle: event.title || event.name,
          category: event.category
        };

        if (toggle % 2 === 0) {
          colA.push(item);
        } else {
          colB.push(item);
        }
        toggle++;
      }
    }
  }

  // Fallback if not enough images
  if (colA.length < 3) {
    colA.push(...FALLBACK_ITEMS.slice(0, 3));
  }
  if (colB.length < 3) {
    colB.push(...FALLBACK_ITEMS.slice(3, 6));
  }

  return { colA, colB };
}

// Centralized speed configuration for gallery auto-scroll
// Set to 1x normal speed for a calm, premium, continuous, and easy-to-follow flow
const GALLERY_SCROLL_SPEED = 1;
const VERTICAL_SCROLL_SECONDS = Math.round(75 / GALLERY_SCROLL_SPEED); // 75s per vertical cycle
const HORIZONTAL_SCROLL_SECONDS = Math.round(65 / GALLERY_SCROLL_SPEED); // 65s per horizontal mobile cycle

const GALLERY_SCROLL_STYLES = `
  /* Desktop & Tablet: Vertical scroll animations */
  @keyframes galleryScrollUp {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, -50%, 0);
    }
  }

  @keyframes galleryScrollDown {
    0% {
      transform: translate3d(0, -50%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  .gallery-scroll-up {
    animation: galleryScrollUp ${VERTICAL_SCROLL_SECONDS}s linear infinite;
    will-change: transform;
  }

  .gallery-scroll-down {
    animation: galleryScrollDown ${VERTICAL_SCROLL_SECONDS}s linear infinite;
    will-change: transform;
  }

  .gallery-columns-container:hover .gallery-scroll-up,
  .gallery-columns-container:hover .gallery-scroll-down {
    animation-play-state: paused;
  }

  /* Mobile: Continuous horizontal auto-scroll animation */
  @keyframes galleryScrollHorizontal {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .gallery-scroll-horizontal {
    display: flex;
    width: max-content;
    animation: galleryScrollHorizontal ${HORIZONTAL_SCROLL_SECONDS}s linear infinite;
    will-change: transform;
  }

  .gallery-horizontal-container:hover .gallery-scroll-horizontal,
  .gallery-horizontal-container:active .gallery-scroll-horizontal {
    animation-play-state: paused;
  }

  /* Scoped layout rules guaranteeing 100% vertical layout on mobile and split layout on desktop */
  @media (max-width: 767px) {
    .home-gallery-mobile-wrapper {
      display: flex !important;
      flex-direction: column !important;
      width: 100% !important;
    }
    .home-gallery-desktop-wrapper {
      display: none !important;
    }
  }

  @media (min-width: 768px) {
    .home-gallery-mobile-wrapper {
      display: none !important;
    }
    .home-gallery-desktop-wrapper {
      display: block !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .gallery-scroll-up,
    .gallery-scroll-down,
    .gallery-scroll-horizontal {
      animation: none !important;
      transform: none !important;
    }
    .gallery-horizontal-container {
      overflow-x: auto !important;
    }
  }
`;

interface GalleryCardProps {
  item: GalleryDisplayItem;
  onClick: (eventId: string) => void;
  className?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick, className = '' }) => {
  return (
    <div
      onClick={() => onClick(item.eventId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item.eventId);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View photo from ${item.eventTitle} in Media & Events`}
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer select-none flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#00B5A5] ${className}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        onError={(e) => {
          (e.target as HTMLImageElement).src = standbyImages.mediaEvents;
        }}
      />

      {/* Cinematic overlay on hover/active */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/90 via-[#0E2A47]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
        {item.category && (
          <span className="text-[10px] sm:text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
            {item.category}
          </span>
        )}
        <h4 className="text-white text-xs sm:text-sm md:text-base font-bold line-clamp-1 drop-shadow-sm">
          {item.eventTitle}
        </h4>
        <span className="text-white/80 text-[11px] sm:text-xs font-medium flex items-center gap-1 mt-1">
          <ImageIcon className="w-3.5 h-3.5 text-[#00B5A5]" />
          <span>View in Media & Events</span>
        </span>
      </div>
    </div>
  );
};

const HomeGallery: React.FC = () => {
  // Distribute event photos from the generated manifest into two balanced columns
  const { colA, colB } = useMemo(() => getEventColumns(galleryEvents), []);

  // Seamless duplication for infinite loop without jumps or gaps (used on desktop/tablet)
  const duplicatedColA = useMemo(() => [...colA, ...colA], [colA]);
  const duplicatedColB = useMemo(() => [...colB, ...colB], [colB]);

  // Combined list of event photos for mobile horizontal continuous auto-scroll
  const mobileItems = useMemo(() => {
    const list: GalleryDisplayItem[] = [];
    const maxLen = Math.max(colA.length, colB.length);
    for (let i = 0; i < maxLen; i++) {
      if (colA[i]) list.push(colA[i]);
      if (colB[i]) list.push(colB[i]);
    }
    return list;
  }, [colA, colB]);

  // Duplicated list for seamless horizontal loop on mobile
  const duplicatedMobileItems = useMemo(() => [...mobileItems, ...mobileItems], [mobileItems]);

  // Handle clicking an image to deep-link to the event on /media-events
  const handleImageClick = (eventId: string) => {
    const url = `/media-events?event=${encodeURIComponent(eventId)}`;
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/media-events');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section
      id="home-gallery"
      className="py-16 md:py-24 bg-white overflow-hidden border-b border-slate-100"
      aria-labelledby="home-gallery-heading"
    >
      {/* Inject performant CSS keyframe animations */}
      <style>{GALLERY_SCROLL_STYLES}</style>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ════════════════════════════════════════════════════════════════════════
            MOBILE PRESENTATION (< md / < 768px):
            Strict Vertical Hierarchy:
            1. Centered Header & Words (Top)
            2. Single Horizontal Auto-Scrolling Image Row (Middle)
            3. Centered CTA Button (Bottom)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="home-gallery-mobile-wrapper flex flex-col w-full md:hidden">
          
          {/* Centered Mobile Header */}
          <div className="w-full text-center max-w-xl mx-auto mb-6 sm:mb-8 px-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#00B5A5] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00B5A5]">
                Media & Events
              </span>
            </div>

            <EditableText
              as="h2"
              configKey="gallery.title"
              defaultValue="Care Beyond Hospitals"
              id="home-gallery-heading-mobile"
              className="text-2xl sm:text-3xl font-extrabold text-[#0E2A47] tracking-tight leading-tight"
            />

            <EditableText
              as="p"
              configKey="gallery.subtitle"
              defaultValue="Extending care into communities through health camps, awareness programs, and preventive initiatives."
              className="text-slate-500 text-xs sm:text-sm mt-2.5 max-w-md mx-auto leading-relaxed"
            />
          </div>

          {/* Mobile Three Feature Items */}
          <div className="w-full max-w-md mx-auto mb-6 px-2 space-y-2">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/90 border border-slate-100 text-left">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-extrabold flex items-center justify-center">
                01
              </span>
              <EditableText
                as="span"
                configKey="gallery.feature1"
                defaultValue="Advanced Robotic Surgery"
                className="text-xs sm:text-sm font-bold text-[#0E2A47]"
              />
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/90 border border-slate-100 text-left">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-extrabold flex items-center justify-center">
                02
              </span>
              <EditableText
                as="span"
                configKey="gallery.feature2"
                defaultValue="Varian Halcion Radiotherapy"
                className="text-xs sm:text-sm font-bold text-[#0E2A47]"
              />
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/90 border border-slate-100 text-left">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-extrabold flex items-center justify-center">
                03
              </span>
              <EditableText
                as="span"
                configKey="gallery.feature3"
                defaultValue="Futurestic Dialysis Unit"
                className="text-xs sm:text-sm font-bold text-[#0E2A47]"
              />
            </div>
          </div>

          {/* Automatic Continuous Horizontal Scroll Track - Single Row */}
          <div className="gallery-horizontal-container relative w-full overflow-hidden py-1 my-1">
            {/* Subtle side vignettes */}
            <div className="pointer-events-none absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="gallery-scroll-horizontal flex gap-4">
              {duplicatedMobileItems.map((item, idx) => (
                <div
                  key={`mobile-gallery-${item.eventId}-${idx}`}
                  onClick={() => handleImageClick(item.eventId)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleImageClick(item.eventId);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo from ${item.eventTitle} in Media & Events`}
                  className="group relative flex-shrink-0 w-[270px] sm:w-[310px] h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-md active:scale-[0.98] transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B5A5]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = standbyImages.mediaEvents;
                    }}
                  />

                  {/* Gradient banner with title and event link */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/90 via-[#0E2A47]/30 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                    {item.category && (
                      <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider mb-0.5">
                        {item.category}
                      </span>
                    )}
                    <h4 className="text-white text-xs sm:text-sm font-bold line-clamp-1 drop-shadow-sm">
                      {item.eventTitle}
                    </h4>
                    <span className="text-white/80 text-[11px] font-medium flex items-center gap-1 mt-1">
                      <ImageIcon className="w-3.5 h-3.5 text-[#00B5A5]" />
                      <span>View in Media & Events</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Mobile CTA Button - Placed firmly below the entire image gallery */}
          <div className="w-full mt-7 sm:mt-8 text-center flex justify-center">
            <a
              href="/media-events"
              onClick={handleViewAllClick}
              className="inline-flex items-center justify-center gap-2 bg-[#0E2A47] hover:bg-[#00B5A5] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#00B5A5]/25 focus:outline-none focus:ring-2 focus:ring-[#00B5A5]"
            >
              <span>Explore All Media & Events</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            TABLET / DESKTOP PRESENTATION (≥ md / ≥ 768px):
            Content on LEFT (35-40%) + Two-Column Inverse Vertical Gallery on RIGHT (60-65%)
           ════════════════════════════════════════════════════════════════════════ */}
        <div className="home-gallery-desktop-wrapper hidden md:block">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ─── LEFT COLUMN: Words / Content / Heading / CTA (≈ 40%) ─── */}
            <div className="col-span-5 flex flex-col justify-center pr-2 lg:pr-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-4 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#00B5A5] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#00B5A5]">
                  Media & Events
                </span>
              </div>

              <EditableText
                as="h2"
                configKey="gallery.title"
                defaultValue="Care Beyond Hospitals"
                id="home-gallery-heading"
                className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#0E2A47] tracking-tight leading-[1.15]"
              />

              <EditableText
                as="p"
                configKey="gallery.subtitle"
                defaultValue="Extending care into communities through health camps, awareness programs, and preventive initiatives."
                className="text-slate-500 text-sm lg:text-base mt-4 leading-relaxed"
              />

              {/* Three Key Technology / Feature Items */}
              <div className="mt-6 lg:mt-8 space-y-3">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/90 border border-slate-100/90 hover:border-teal-200/80 hover:bg-white transition-all duration-300 shadow-sm">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-extrabold flex items-center justify-center">
                    01
                  </span>
                  <EditableText
                    as="span"
                    configKey="gallery.feature1"
                    defaultValue="Advanced Robotic Surgery"
                    className="text-sm lg:text-base font-bold text-[#0E2A47]"
                  />
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/90 border border-slate-100/90 hover:border-teal-200/80 hover:bg-white transition-all duration-300 shadow-sm">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-extrabold flex items-center justify-center">
                    02
                  </span>
                  <EditableText
                    as="span"
                    configKey="gallery.feature2"
                    defaultValue="Varian Halcion Radiotherapy"
                    className="text-sm lg:text-base font-bold text-[#0E2A47]"
                  />
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/90 border border-slate-100/90 hover:border-teal-200/80 hover:bg-white transition-all duration-300 shadow-sm">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-extrabold flex items-center justify-center">
                    03
                  </span>
                  <EditableText
                    as="span"
                    configKey="gallery.feature3"
                    defaultValue="Futurestic Dialysis Unit"
                    className="text-sm lg:text-base font-bold text-[#0E2A47]"
                  />
                </div>
              </div>

              {/* Desktop CTA Button */}
              <div className="mt-7 sm:mt-8">
                <a
                  href="/media-events"
                  onClick={handleViewAllClick}
                  className="inline-flex items-center gap-2.5 bg-[#0E2A47] hover:bg-[#00B5A5] text-white font-bold text-xs sm:text-sm py-3.5 px-7 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#00B5A5]/25 focus:outline-none focus:ring-2 focus:ring-[#00B5A5]"
                >
                  <span>Explore All Media & Events</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* ─── RIGHT COLUMN: Two-Column Vertical Scrolling Gallery (≈ 60%) ─── */}
            <div className="col-span-7">
              <div className="gallery-columns-container relative w-full h-[540px] lg:h-[620px] xl:h-[660px] overflow-hidden rounded-3xl">
                
                {/* Top & Bottom Vignette / Fade Gradients for Seamless Depth */}
                <div className="pointer-events-none absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                <div className="pointer-events-none absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

                {/* Side-by-side Dual Column Grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full">
                  
                  {/* Left Column: Continuous Smooth Scroll UPWARDS */}
                  <div className="overflow-hidden">
                    <div className="gallery-scroll-up flex flex-col gap-4 sm:gap-6">
                      {duplicatedColA.map((item, idx) => (
                        <GalleryCard
                          key={`col-up-${item.eventId}-${idx}`}
                          item={item}
                          onClick={handleImageClick}
                          className="w-full h-44 sm:h-52 lg:h-60"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Continuous Smooth Scroll DOWNWARDS */}
                  <div className="overflow-hidden">
                    <div className="gallery-scroll-down flex flex-col gap-4 sm:gap-6">
                      {duplicatedColB.map((item, idx) => (
                        <GalleryCard
                          key={`col-down-${item.eventId}-${idx}`}
                          item={item}
                          onClick={handleImageClick}
                          className="w-full h-44 sm:h-52 lg:h-60"
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeGallery;
