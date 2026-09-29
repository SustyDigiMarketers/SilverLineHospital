import React, { useEffect, useRef } from 'react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  images?: string[];
  currentIndex?: number;
  onNavigate?: (newIndex: number) => void;
  eventName?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  onClose,
  images = [],
  currentIndex = 0,
  onNavigate,
  eventName
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const hasMultiple = images.length > 1 && onNavigate !== undefined;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!hasMultiple || onNavigate === undefined) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!hasMultiple || onNavigate === undefined) return;
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  };

  useEffect(() => {
    triggerElementRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasMultiple) {
        handlePrev();
      } else if (event.key === 'ArrowRight' && hasMultiple) {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      triggerElementRef.current?.focus();
    };
  }, [onClose, currentIndex, hasMultiple, images.length]);

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image view"
    >
      <div
        className="relative max-w-[92vw] max-h-[90vh] flex flex-col items-center justify-center animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-black/40">
          <img
            src={imageUrl}
            alt={eventName ? `${eventName} photo` : 'Enlarged view'}
            className="block max-w-[90vw] max-h-[82vh] object-contain rounded-xl"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close image viewer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left / Right arrows if multiple images */}
          {hasMultiple && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#00B5A5] text-white p-2.5 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#00B5A5] text-white p-2.5 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Footer info in lightbox */}
        {(eventName || hasMultiple) && (
          <div className="mt-3 flex items-center justify-between w-full max-w-2xl px-2 text-white/90 text-xs md:text-sm font-medium">
            <span className="truncate pr-4">{eventName || 'Hospital Gallery'}</span>
            {hasMultiple && (
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                {currentIndex + 1} / {images.length}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
