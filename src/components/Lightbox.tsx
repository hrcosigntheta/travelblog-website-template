import React, { useEffect, useRef } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { openDemoModal } from '../store/demo-modal';
import type { LightboxProps } from '../types/gallery';

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const currentImage = images[currentIndex];

  // Swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) onNext();
    if (isRightSwipe) onPrev();
  };

  const handleDownload = () => {
    openDemoModal({
      url: currentImage.src,
      label: `Download: ${currentImage.caption || 'Image'}`,
      category: 'download',
    });
  };

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen) return;

    const preloadImage = (index: number) => {
      if (index >= 0 && index < images.length) {
        const img = new Image();
        img.src = images[index].src;
      }
    };

    preloadImage((currentIndex + 1) % images.length);
    preloadImage((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, isOpen, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      ref={overlayRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Download image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Close lightbox"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 hidden md:block"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 hidden md:block"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Main Content */}
      <div className="relative w-full h-full max-w-7xl max-h-screen p-4 flex flex-col items-center justify-center">
        <div
          className="relative w-auto h-auto max-w-full max-h-[85vh] overflow-hidden rounded-lg shadow-2xl"
          // Swipe handlers for mobile could be added here
        >
          <ImageWithFallback
            src={currentImage.src}
            alt={currentImage.alt}
            placeholderSrc={currentImage.placeholderSrc}
            className="w-full h-full object-contain max-h-[85vh]"
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className="absolute bottom-8 left-0 right-0 text-center px-4">
            <p className="text-white text-lg font-medium drop-shadow-md inline-block bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              {currentImage.caption}
            </p>
          </div>
        )}

        {/* Counter */}
        <div className="absolute top-6 left-6 text-white/80 text-sm font-mono bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
