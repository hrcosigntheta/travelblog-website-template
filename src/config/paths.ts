// Source: src/config/paths.ts

// Base path handling for GitHub Pages or custom domains
// In Astro, import.meta.env.BASE_URL handles the configured 'base' option
export const BASE_PATH = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;

export const ROUTES = {
  HOME: '/',
  DESTINATIONS: '/destinations',
  DESTINATION_DETAIL: (slug: string) => `/destinations/${slug}`,
  GALLERY: '/gallery',
  ITINERARIES: '/itineraries',
  MAP: '/map',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

export const DEMO_LINKS = [
  'instagram.com',
  'twitter.com',
  'facebook.com',
  'pinterest.com',
  'booking.com',
  'airbnb.com',
  'skyscanner.com',
  'newsletter-signup',
] as const;
