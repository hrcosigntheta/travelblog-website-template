import type { Destination } from './types';

export const chocolateHills: Destination = {
  id: '3',
  slug: 'chocolate-hills-bohol',
  title: 'Chocolate Hills, Bohol',
  description: 'Unique geological formation of over 1,200 hills.',
  region: 'Bohol',
  image: 'https://images.unsplash.com/photo-1594396006509-3224b6113b1f',
  rating: 4.7,
  tags: ['Nature', 'Hiking', 'Sightseeing'],
  featured: true,
  images: ['https://images.unsplash.com/photo-1594396006509-3224b6113b1f'],
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
