import React, { useState, useMemo } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Lightbox } from './Lightbox';
import type { PhotoGalleryProps } from '../types/gallery';

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, className = '' }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(images.map((img) => img.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className={`w-full ${className}`} data-testid="photo-gallery">
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {categories.map((cat) => (
            <button
              key={cat as string}
              onClick={() => {
                setSelectedCategory(cat as string);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-[var(--color-btn-primary-text)] shadow-md transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-text-primary'
              }`}
            >
              {cat as string}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Layout using CSS Columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="break-inside-avoid mb-4 group cursor-zoom-in relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 min-h-[150px] animate-in fade-in zoom-in-95 duration-500 fill-mode-backwards"
            style={{ animationDelay: `${index * 50}ms` }}
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
        images={filteredImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};
