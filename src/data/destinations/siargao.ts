import type { Destination } from './types';

export const siargao: Destination = {
  id: '2',
  slug: 'siargao-island',
  title: 'Siargao Island',
  description: 'The surfing capital of the Philippines.',
  region: 'Surigao del Norte',
  image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9',
  rating: 4.8,
  tags: ['Surfing', 'Beach', 'Nightlife'],
  featured: true,
  images: [
    'https://images.unsplash.com/photo-1531761535209-180857e963b9',
    'https://images.unsplash.com/photo-1588669528657-36653198084d',
  ],
  coordinates: {
    lat: 9.78,
    lng: 126.15,
  },
  stats: {
    bestTime: 'Aug - Nov (Surfing)',
    budget: '$$',
    difficulty: 'Easy',
  },
  highlights: ['Cloud 9 Boardwalk', 'Magpupungko Rock Pools', 'Sugba Lagoon'],
  content:
    'Siargao is a tear-drop shaped island in the Philippine Sea known as the "Surfing Capital of the Philippines".',
  practicalInfo: {
    gettingThere: 'Direct flights to Sayak Airport (IAO) from Manila or Cebu.',
    accommodation: 'General Luna is the main tourist area with many resorts and hostels.',
    tips: 'Rent a motorbike to explore the island at your own pace.',
  },
};
