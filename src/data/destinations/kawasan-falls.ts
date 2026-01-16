import type { Destination } from './types';

export const kawasanFalls: Destination = {
  id: 'kawasan-falls',
  slug: 'kawasan-falls',
  title: 'Kawasan Falls',
  description:
    'Experience the magical turquoise waters of Kawasan Falls, a three-stage cascade nestled in the jungle of Badian, Cebu. Famous for canyoneering adventures.',
  region: 'Cebu',
  image: '/images/destinations/kawasan-falls-main.jpg',
  rating: 4.9,
  tags: ['Waterfall', 'Adventure', 'Nature', 'Swimming'],
  featured: true,
  images: [
    '/images/destinations/kawasan-falls-1.jpg',
    '/images/destinations/kawasan-falls-2.jpg',
    '/images/destinations/kawasan-falls-3.jpg',
    '/images/destinations/kawasan-falls-4.jpg',
  ],
  coordinates: {
    lat: 9.8035,
    lng: 123.3745,
  },
  stats: {
    bestTime: 'Nov - May',
    budget: '$$',
    difficulty: 'Moderate',
  },
  content: `
    Kawasan Falls is arguably the most famous waterfall in the Philippines, renowned for its distinct turquoise water. Located in Badian, south of Cebu City, it is a multi-layered waterfall system.
    
    The most popular way to experience Kawasan is through a canyoneering adventure starting from Alegria and ending at the main falls in Badian. This thrilling activity involves cliff jumping, sliding, and swimming through the river canyons.
    
    For those preferring a more relaxed visit, a short 15-minute walk from the main road takes you directly to the first and largest level of the falls.
  `,
  highlights: [
    'Turquoise blue waters',
    'Canyoneering adventure from Alegria',
    'Bamboo raft rides (if available)',
    'Jungle trekking',
  ],
  itinerary: [
    {
      title: 'Canyoneering Adventure',
      activities: [
        {
          time: '08:00',
          title: 'Assembly',
          description: 'Meet up at Badian or Alegria jump-off point',
          iconType: 'transport',
        },
        {
          time: '09:00',
          title: 'Start Adventure',
          description: 'Start of Canyoneering: cliff jumps and slides',
          iconType: 'activity',
        },
        {
          time: '12:00',
          title: 'Arrival',
          description: 'Arrival at the main Kawasan Falls level',
          iconType: 'nature',
        },
        {
          time: '13:00',
          title: 'Lunch',
          description: 'Lunch by the waterfalls',
          iconType: 'food',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'From Cebu South Bus Terminal, take a bus bound for Bato via Barili (approx. 3-4 hours). Alight at the Kawasan Falls church/entrance in Badian.',
    accommodation:
      'Accommodations are available in Moalboal (30 mins away) or near the falls entrance in Badian.',
    tips: 'Start early (around 7 AM) to avoid crowds. If canyoneering, always book with accredited guides.',
  },
};
