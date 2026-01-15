/**
 * Utilities for handling image URLs and optimizations.
 */

/**
 * Generates an optimized Unsplash URL with specific parameters.
 * @param url - The original Unsplash URL
 * @param options - Options for width, quality, format, blur
 */
export function getUnsplashUrl(
  url: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'avif' | 'webp' | 'jpg';
    blur?: number;
  } = {}
): string {
  if (!url.includes('images.unsplash.com')) return url;

  try {
    const newUrl = new URL(url);
    if (options.width) newUrl.searchParams.set('w', options.width.toString());
    if (options.quality) newUrl.searchParams.set('q', options.quality.toString());
    if (options.format) newUrl.searchParams.set('fm', options.format);
    if (options.blur) newUrl.searchParams.set('blur', options.blur.toString());

    return newUrl.toString();
  } catch (e) {
    console.warn('Invalid URL provided to getUnsplashUrl:', url, e);
    return url;
  }
}

/**
 * Generates a low-quality blur-up placeholder URL for Unsplash images.
 * @param url - The original Unsplash URL
 */
export function getUnsplashPlaceholder(url: string): string {
  return getUnsplashUrl(url, { width: 20, blur: 50, quality: 50 });
}
