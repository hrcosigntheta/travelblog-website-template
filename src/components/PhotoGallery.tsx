import React, { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Lightbox, type GalleryImage } from './Lightbox';

export interface PhotoGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, className = '' }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % images.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
  };

  return (
    <div className={`w-full ${className}`} data-testid="photo-gallery">
      {/* Masonry Layout using CSS Columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="break-inside-avoid mb-4 group cursor-zoom-in relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(index)}
            tabIndex={0}
            role="button"
            aria-label={`View full size: ${image.caption || image.alt}`}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              placeholderSrc={image.placeholderSrc}
              className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover Overlay with Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              {image.caption && (
                <p className="text-white text-sm font-medium drop-shadow-md line-clamp-2">
                  {image.caption}
                </p>
              )}
            </div>

            {/* Hover Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};
