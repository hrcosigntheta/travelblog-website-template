import type { ImgHTMLAttributes } from 'react';

export interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string; // Enforce required alt text
  fallbackSrc?: string;
  placeholderSrc?: string; // Optional low-quality placeholder
  className?: string;
}
