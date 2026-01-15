/**
 * Represents a single image in the gallery.
 */
export interface GalleryImage {
  /** Source URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional width of the image */
  width?: number;
  /** Optional height of the image */
  height?: number;
  /** Optional caption to display */
  caption?: string;
  /** Category for filtering */
  category?: string;
  /** Low-quality placeholder source for blur-up effect */
  placeholderSrc?: string;
}

/**
 * Props for the Lightbox component.
 */
export interface LightboxProps {
  /** Array of images to display in the lightbox */
  images: GalleryImage[];
  /** Index of the currently displayed image */
  currentIndex: number;
  /** Whether the lightbox is open */
  isOpen: boolean;
  /** Callback to close the lightbox */
  onClose: () => void;
  /** Callback to show the next image */
  onNext: () => void;
  /** Callback to show the previous image */
  onPrev: () => void;
}

/**
 * Props for the PhotoGallery component.
 */
export interface PhotoGalleryProps {
  /** Array of images to display in the grid */
  images: GalleryImage[];
  /** Additional CSS classes */
  className?: string;
}
