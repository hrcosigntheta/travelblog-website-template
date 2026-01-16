import type { Destination } from './types';

export const malapascua: Destination = {
  id: 'malapascua',
  slug: 'malapascua',
  title: 'Malapascua Island',
  description:
    'A tiny island north of Cebu, world-renowned as the only place to reliably see Thresher Sharks daily at Monad Shoal.',
  region: 'Cebu',
  image: '/images/destinations/malapascua-main.jpg',
  rating: 4.7,
  tags: ['Diving', 'Sharks', 'Island', 'Beach'],
  featured: false,
  images: [
    '/images/destinations/malapascua-1.jpg',
    '/images/destinations/malapascua-2.jpg',
    '/images/destinations/malapascua-3.jpg',
    '/images/destinations/malapascua-4.jpg',
  ],
  coordinates: {
    lat: 11.3323,
    lng: 124.1159,
  },
  stats: {
    bestTime: 'Dec - Apr',
    budget: '$$$',
    difficulty: 'Moderate',
  },
  content: `
    Malapascua is a diver's haven. The main draw is Monad Shoal, an underwater plateau where thresher sharks come to be cleaned by cleaner fish early in the morning.
    
    Even for non-divers, the island offers beautiful white sand beaches like Bounty Beach and Langob Beach. The vibe is laid-back, with no cars on the island, only footpaths and motorcycles.
  `,
  highlights: [
    'Diving with Thresher Sharks at Monad Shoal',
    'Bounty Beach sunset',
    'Langob Beach (North Beach)',
    'Kalanggaman Island day trip',
  ],
  itinerary: [
    {
      title: 'Island Life & Sharks',
      activities: [
        {
          time: '04:30',
          title: 'Morning Dive',
          description: 'Early morning dive to Monad Shoal',
          iconType: 'activity',
        },
        {
          time: '08:00',
          title: 'Breakfast',
          description: 'Breakfast by the beach',
          iconType: 'food',
        },
        {
          time: '10:00',
          title: 'Beach Hopping',
          description: 'Walk or motorcyle ride to Langob Beach',
          iconType: 'nature',
        },
        {
          time: '17:00',
          title: 'Sunset Drinks',
          description: 'Sunset cocktails at Bounty Beach',
          iconType: 'relax',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Bus/Van from Cebu North Bus Terminal to Maya Port (4-5 hours). Then take a public boat (30 mins) to Malapascua.',
    accommodation: 'Ranges from budget hostels to luxury dive resorts along Bounty Beach.',
    tips: 'Bring enough cash; ATMs can be unreliable. Flash photography is strictly prohibited when diving with thresher sharks.',
  },
};
