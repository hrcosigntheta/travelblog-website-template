import type { Destination } from './types';

export const chocolateHills: Destination = {
  id: 'chocolate-hills-bohol',
  slug: 'chocolate-hills-bohol',
  title: 'Chocolate Hills, Bohol',
  description: 'Unique geological formation of over 1,200 hills.',
  region: 'Bohol',
  image: '/images/destinations/chocolate-hills-bohol-main.jpg',
  rating: 4.7,
  tags: ['Nature', 'Hiking', 'Sightseeing'],
  featured: true,
  images: [
    '/images/destinations/chocolate-hills-bohol-1.jpg',
    '/images/destinations/chocolate-hills-bohol-2.jpg',
    '/images/destinations/chocolate-hills-bohol-3.jpg',
    '/images/destinations/chocolate-hills-bohol-4.jpg',
  ],
  coordinates: {
    lat: 9.9171,
    lng: 124.1673,
  },
  stats: {
    bestTime: 'Dec - May',
    budget: '$$',
    difficulty: 'Easy',
  },
  highlights: ['Chocolate Hills Complex', 'Tarsier Sanctuary', 'Loboc River Cruise'],
  content:
    'The Chocolate Hills are a geological formation in the Bohol province of the Philippines.',
  practicalInfo: {
    gettingThere: 'Fly to Bohol-Panglao International Airport. Take a bus or van to Carmen.',
    accommodation: 'Stay in Panglao for beaches or near Carmen for the hills.',
    tips: 'Visit early morning for the best light.',
  },
};
