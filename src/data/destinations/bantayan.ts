import type { Destination } from './types';

export const bantayan: Destination = {
  id: 'bantayan',
  slug: 'bantayan',
  title: 'Bantayan Island',
  description:
    'A quiet island paradise known for its powdery white sands, crystal clear waters, and fresh seafood. The perfect place to unwind and do nothing.',
  region: 'Cebu',
  image: '/images/destinations/bantayan-main.jpg',
  imageAlt: 'Hero image of Bantayan Island in Cebu, Philippines',
  rating: 4.6,
  tags: ['Beach', 'Island', 'Relaxation', 'Food'],
  featured: false,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    { src: '/images/destinations/bantayan-1.jpg', alt: 'Bantayan Island photography - Shot 1' },
    { src: '/images/destinations/bantayan-2.jpg', alt: 'Bantayan Island photography - Shot 2' },
    { src: '/images/destinations/bantayan-3.jpg', alt: 'Bantayan Island photography - Shot 3' },
    { src: '/images/destinations/bantayan-4.jpg', alt: 'Bantayan Island photography - Shot 4' },
  ],
  coordinates: {
    lat: 11.1687,
    lng: 123.7292,
  },
  stats: {
    bestTime: 'Nov - May',
    budget: '₱₱',
    difficulty: 'Easy',
  },
  content: `
    Bantayan Island is the go-to destination for those seeking a laid-back island vibe. Located off the northern coast of Cebu, it boasts wide stretches of white sand beaches like Kota Beach and Paradise Beach.
    
    The island is also famous for its dried fish (danggit) and fresh seafood, which you can buy at the public market and have cooked at local eateries (sutukil). Renting a bicycle or motorcycle is the best way to explore the island's flat terrain.
  `,
  highlights: [
    'Kota Beach and Sandbar',
    'Paradise Beach (Sandira Beach)',
    'Ogtong Cave Resort',
    'Kota Park (Madridejos)',
  ],
  itinerary: [
    {
      title: 'Beach Bumming & Island Exploring',
      activities: [
        {
          time: '08:00',
          title: 'Morning Swim',
          description: 'Morning swim at Kota Beach',
          iconType: 'nature',
        },
        {
          time: '10:00',
          title: 'Island Tour',
          description: 'Visit Ogtong Cave and Paradise Beach',
          iconType: 'activity',
        },
        {
          time: '12:00',
          title: 'Seafood Feast',
          description: 'Seafood lunch at the public market (Sutukil)',
          iconType: 'food',
        },
        {
          time: '16:00',
          title: 'Sunset',
          description: 'Wait for the sunset at Kota Park or Kota Beach',
          iconType: 'relax',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Bus/Van from Cebu North Bus Terminal to Hagnaya Port (3-4 hours). Then take a ferry to Santa Fe Port (1 hour).',
    accommodation: 'Most resorts are located in Santa Fe, ranging from budget to mid-range.',
    tips: 'Bring cash. Rent a motorbike/scooter for cheap and easy transportation around the island.',
  },
};
