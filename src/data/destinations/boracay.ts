import type { Destination } from './types';

export const boracay: Destination = {
  id: '4',
  slug: 'boracay-island',
  title: 'Boracay Island',
  description: 'Famous for its White Beach and vibrant nightlife.',
  region: 'Aklan',
  image: 'https://images.unsplash.com/photo-1505881402582-c5bc9105ff75',
  rating: 4.6,
  tags: ['Beach', 'Party', 'Luxury'],
  featured: false,
  images: ['https://images.unsplash.com/photo-1505881402582-c5bc9105ff75'],
  coordinates: {
    lat: 11.9674,
    lng: 121.9248,
  },
  stats: {
    bestTime: 'Nov - Apr',
    budget: '$$ - $$$$',
    difficulty: 'Easy',
  },
  highlights: ['White Beach', 'Puka Shell Beach', 'Helmet Diving'],
  content:
    "Boracay is a small island in the central Philippines. It's known for its resorts and beaches.",
  practicalInfo: {
    gettingThere:
      'Fly to Caticlan Airport (closest) or Kalibo Airport (cheaper but requires bus ride).',
    accommodation: 'Station 1 for luxury, Station 2 for nightlife, Station 3 for budget.',
    tips: 'Book accommodation in advance as entry to the island requires a confirmed booking.',
  },
};
