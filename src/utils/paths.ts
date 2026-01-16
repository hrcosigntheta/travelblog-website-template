// Source: src/utils/paths.ts
import { BASE_PATH, ROUTES, DEMO_LINKS } from '../config/paths';

/**
 * Resolves a static asset path, prepending the base path if necessary.
 * Useful for images in the public directory.
 * @param path - The absolute path to the asset (e.g., '/images/logo.png')
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!BASE_PATH || BASE_PATH === '/') return cleanPath;
  return `${BASE_PATH}${cleanPath}`;
}

/**
 * Resolves a route path from the ROUTES config.
 * @param routeKey - The key of the route in ROUTES object
 */
export function getRoutePath(routeKey: keyof typeof ROUTES): string {
  const route = ROUTES[routeKey];
  if (typeof route === 'function') {
    // For dynamic routes, consumers should call the function directly from ROUTES
    // This helper is mainly for static routes
    throw new Error(`Route ${routeKey} is a function, call it directly from ROUTES`);
  }

  return route as string;
}

/**
 * Checks if a URL is external (starts with http, https, or mailto).
 * @param url - The URL to check
 */
export function isExternalLink(url: string): boolean {
  return /^https?:\/\//.test(url) || /^mailto:/.test(url);
}

/**
 * Checks if a URL is a demo link that should trigger a modal.
 * @param url - The URL to check
 */
export function isDemoLink(url: string): boolean {
  if (!isExternalLink(url)) return false;

  return DEMO_LINKS.some((domain) => url.includes(domain));
}

/**
 * Resolves a full URL for an image, potentially handling different storage providers in the future.
 * Currently maps to public folder.
 */
export function getImagePath(imageName: string): string {
  return getAssetPath(`/assets/images/${imageName}`);
}
