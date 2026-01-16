import type { Destination } from './types';

export const oslob: Destination = {
  id: 'oslob',
  slug: 'oslob',
  title: 'Oslob',
  description:
    'Home to the famous whale shark watching interaction. A controversial yet popular destination that guarantees sightings of these gentle giants.',
  region: 'Cebu',
  image: '/images/destinations/oslob-main.jpg',
  rating: 4.5,
  tags: ['Whale Sharks', 'Wildlife', 'History', 'Waterfall'],
  featured: false,
  images: [
    '/images/destinations/oslob-1.jpg',
    '/images/destinations/oslob-2.jpg',
    '/images/destinations/oslob-3.jpg',
    '/images/destinations/oslob-4.jpg',
  ],
  coordinates: {
    lat: 9.4607,
    lng: 123.3807,
  },
  stats: {
    bestTime: 'Dec - May',
    budget: '$$$',
    difficulty: 'Easy',
  },
  content: `
    Oslob gained international fame for its whale shark (butanding) tourism. Every morning, fishermen feed the sharks, allowing tourists to swim and snorkel with them.
    
    Beyond the sharks, Oslob has a rich heritage with its Spanish-era Cuartel and Baluarte. Nearby Sumilon Island offers a pristine sandbar, and Tumalog Falls provides a surreal nature escape.
  `,
  highlights: [
    'Whale Shark Watching',
    'Sumilon Island Sandbar',
    'Tumalog Falls',
    'Cuartel and Baluarte ruins',
  ],
  itinerary: [
    {
      title: 'Southern Cebu Heritage & Nature',
      activities: [
        {
          time: '06:00',
          title: 'Registration',
          description: 'Whale Shark watching registration and briefing',
          iconType: 'activity',
        },
        {
          time: '09:00',
          title: 'Sumilon Island',
          description: 'Boat trip to Sumilon Island sandbar',
          iconType: 'nature',
        },
        {
          time: '12:00',
          title: 'Lunch',
          description: 'Lunch at the mainland',
          iconType: 'food',
        },
        {
          time: '13:30',
          title: 'Tumalog Falls',
          description: 'Visit Tumalog Falls',
          iconType: 'nature',
        },
        {
          time: '15:30',
          title: 'Heritage Walk',
          description: 'Explore the Heritage Park (Cuartel)',
          iconType: 'activity',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Bus from Cebu South Bus Terminal to Oslob (approx. 3-4 hours). Alight at Brgy. Tan-awan for the whale sharks.',
    accommodation: 'Numerous resorts and homestays line the coast of Tan-awan.',
    tips: 'Be a responsible tourist: Do not touch the whale sharks and avoid wearing sunscreen to protect the marine ecosystem.',
  },
};
