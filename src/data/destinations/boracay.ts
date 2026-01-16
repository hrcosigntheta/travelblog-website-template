import type { Destination } from './types';

export const boracay: Destination = {
  id: 'boracay-island',
  slug: 'boracay-island',
  title: 'Boracay Island',
  description:
    'The crown jewel of Philippine tourism. Famous for its powdery White Beach, vibrant nightlife, and stunning sunsets. A perfect blend of relaxation and party.',
  region: 'Aklan',
  image: '/images/destinations/boracay-main.jpg',
  imageAlt: 'Hero image of Boracay Island in Aklan, Philippines',
  rating: 4.7,
  tags: ['Beach', 'Party', 'Luxury', 'Relaxation'],
  featured: false,
  images: [
    { src: '/images/destinations/boracay-1.jpg', alt: 'Boracay Island photography - Shot 1' },
    { src: '/images/destinations/boracay-2.jpg', alt: 'Boracay Island photography - Shot 2' },
    { src: '/images/destinations/boracay-3.jpg', alt: 'Boracay Island photography - Shot 3' },
    { src: '/images/destinations/boracay-4.jpg', alt: 'Boracay Island photography - Shot 4' },
  ],
  coordinates: {
    lat: 11.9674,
    lng: 121.9248,
  },
  stats: {
    bestTime: 'Nov - Apr (Dry Season)',
    budget: '$$ - $$$$',
    difficulty: 'Easy',
  },
  content: `
    Boracay is world-renowned for its 4-kilometer White Beach, often voted as one of the best beaches in the world. After its rehabilitation in 2018, the island is cleaner and more regulated, preserving its natural beauty.
    
    The island is divided into three stations: Station 1 known for luxury resorts and the widest beachfront; Station 2 as the commercial center with D'Mall, restaurants, and bars; and Station 3, which is quieter and hosts budget accommodations.
    
    Beyond the main beach, Puka Shell Beach offers a more rugged charm, while Bulabog Beach is famous for kitesurfing and windsurfing.
  `,
  highlights: [
    'White Beach (Station 1, 2, 3)',
    'Puka Shell Beach',
    'Bulabog Beach (Kitesurfing)',
    'Paraw Sailing at Sunset',
    'Island Hopping / Helmet Diving',
  ],
  itinerary: [
    {
      title: 'Day 1: White Beach & Sunset',
      activities: [
        {
          time: '14:00',
          title: 'Beach Bumming',
          description: 'Relax and swim at White Beach',
          iconType: 'relax',
        },
        {
          time: '17:00',
          title: 'Paraw Sailing',
          description: 'Sunset cruise on a traditional sailboat',
          iconType: 'nature',
        },
        {
          time: '19:00',
          title: 'Fire Dancers',
          description: 'Watch fire dancing shows during dinner',
          iconType: 'activity',
        },
      ],
    },
    {
      title: 'Day 2: Water Activities',
      activities: [
        {
          time: '09:00',
          title: 'Island Hopping',
          description: 'Visit Crystal Cove, Magic Island, and Puka Beach',
          iconType: 'activity',
        },
        {
          time: '14:00',
          title: 'Water Sports',
          description: 'Parasailing, helmet diving, or paddleboarding',
          iconType: 'activity',
        },
      ],
    },
    {
      title: 'Day 3: Alternative Beaches',
      activities: [
        {
          time: '10:00',
          title: 'Puka Beach',
          description: 'Visit the northern tip for a quieter vibe',
          iconType: 'nature',
        },
        {
          time: '15:00',
          title: 'Ilig-Iligan Beach',
          description: 'Explore hidden coves and caves',
          iconType: 'nature',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Fly to Caticlan (MPH) for a 15-minute boat ride, or Kalibo (KLO) for a cheaper flight but 2-hour bus ride.',
    accommodation:
      'Station 1: Luxury. Station 2: Mid-range & Party. Station 3: Budget & Quiet. Bulabog: Water sports.',
    tips: 'Hotel booking confirmation is REQUIRED for port entry. No drinking or smoking on the white beach proper.',
  },
};
