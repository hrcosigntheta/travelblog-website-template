// Source: src/config/paths.ts

// Base path handling for GitHub Pages or custom domains
// In Astro, import.meta.env.BASE_URL handles the configured 'base' option
// We remove the trailing slash for consistent concatenation with paths starting with /
export const BASE_PATH =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export const ROUTES = {
  HOME: `${BASE_PATH}/`,
  DESTINATIONS: `${BASE_PATH}/destinations/`,
  DESTINATION_DETAIL: (slug: string) => `${BASE_PATH}/destinations/${slug}/`,
  GALLERY: `${BASE_PATH}/gallery/`,
  ITINERARIES: `${BASE_PATH}/itineraries/`,
  MAP: `${BASE_PATH}/map/`,
  ABOUT: `${BASE_PATH}/about/`,
  CONTACT: `${BASE_PATH}/contact/`,
  BLOG: `${BASE_PATH}/blog/`,
  BLOG_DETAIL: (slug: string) => `${BASE_PATH}/blog/${slug}/`,
  PRIVACY: `${BASE_PATH}/privacy/`,
  TERMS: `${BASE_PATH}/terms/`,
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
