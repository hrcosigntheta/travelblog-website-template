export const IMAGE_FORMATS = ['avif', 'webp'] as const;

export const IMAGE_QUALITY = {
  avif: 60, // 50-60 as per research
  webp: 80, // 75-80 as per research
  jpeg: 80, // Fallback
};

export const IMAGE_SIZES = {
  sm: 640,
  md: 1024,
  lg: 1280,
  xl: 1920,
};

export const RESPONSIVE_WIDTHS = [IMAGE_SIZES.sm, IMAGE_SIZES.md, IMAGE_SIZES.lg, IMAGE_SIZES.xl];
