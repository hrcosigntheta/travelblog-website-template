import type { Destination } from './types';

export const chocolateHills: Destination = {
  id: 'chocolate-hills-bohol',
  slug: 'chocolate-hills-bohol',
  title: 'Chocolate Hills, Bohol',
  description: 'Unique geological formation of over 1,200 hills.',
  region: 'Bohol',
  image: '/images/destinations/chocolate-hills-bohol-main.jpg',
  imageAlt: 'Hero image of Chocolate Hills, Bohol in Bohol, Philippines',
  rating: 4.7,
  tags: ['Nature', 'Hiking', 'Sightseeing'],
  featured: true,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    {
      src: '/images/destinations/chocolate-hills-bohol-1.jpg',
      alt: 'Chocolate Hills, Bohol photography - Shot 1',
    },
    {
      src: '/images/destinations/chocolate-hills-bohol-2.jpg',
      alt: 'Chocolate Hills, Bohol photography - Shot 2',
    },
    {
      src: '/images/destinations/chocolate-hills-bohol-3.jpg',
      alt: 'Chocolate Hills, Bohol photography - Shot 3',
    },
    {
      src: '/images/destinations/chocolate-hills-bohol-4.jpg',
      alt: 'Chocolate Hills, Bohol photography - Shot 4',
    },
  ],
  coordinates: {
    lat: 9.9171,
    lng: 124.1673,
  },
  stats: {
    bestTime: 'Dec - May',
    budget: '₱₱',
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
