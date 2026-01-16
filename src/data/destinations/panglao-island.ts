import type { Destination } from './types';

export const panglaoIsland: Destination = {
  id: 'panglao-island',
  slug: 'panglao-island',
  title: 'Panglao Island',
  description:
    'World-class diving, white sand beaches, and vibrant island nightlife connected to Bohol.',
  region: 'Bohol',
  image:
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2574&auto=format&fit=crop',
  imageAlt: 'Hero image of Panglao Island in Bohol, Philippines', // Placeholder
  rating: 4.8,
  tags: ['Beach', 'Diving', 'Nightlife', 'Island'],
  featured: false,
  images: [
    {
      src: '/images/destinations/panglao-island-1.jpg',
      alt: 'Panglao Island photography - Shot 1',
    },
    {
      src: '/images/destinations/panglao-island-2.jpg',
      alt: 'Panglao Island photography - Shot 2',
    },
    {
      src: '/images/destinations/panglao-island-3.jpg',
      alt: 'Panglao Island photography - Shot 3',
    },
    {
      src: '/images/destinations/panglao-island-4.jpg',
      alt: 'Panglao Island photography - Shot 4',
    },
  ],
  coordinates: {
    lat: 9.576,
    lng: 123.7744,
  },
  stats: {
    bestTime: 'Nov - May',
    budget: '$$ - $$$',
    difficulty: 'Easy',
  },
  highlights: [
    'Alona Beach white sands',
    'Balicasag Island Marine Sanctuary',
    'Virgin Island Sandbar',
    'Hinagdanan Cave',
    'Dolphin Watching',
  ],
  content: `Panglao Island is Bohol's premier beach destination, connected to the main island by two bridges. It serves as the main tourist hub, offering a perfect mix of relaxation, adventure, and entertainment.

  Famous for Alona Beach, a stretch of white sand lined with resorts, restaurants, and dive shops, Panglao is the jumping-off point for some of the Philippines' best diving spots. Just off the coast lies Balicasag Island, a marine sanctuary teeming with sea turtles and colorful coral reefs.

  Beyond the beaches, visitors can explore Hinagdanan Cave with its underground lake or take a boat trip to the stunning Virgin Island sandbar. As the sun sets, Alona Beach comes alive with acoustic music, fire dancing, and beachfront dining.`,
  practicalInfo: {
    gettingThere:
      'Fly directly to Bohol-Panglao International Airport (TAG). Tricycles, vans, and taxis are available at the airport to take you to your resort.',
    accommodation:
      'Ranges from budget hostels and guesthouses to luxury 5-star resorts like Henann Resort and Amorita Resort.',
    tips: 'Wake up early (around 5:30 AM) for a dolphin watching tour. Book Balicasag diving or snorkeling in advance as visitor numbers are regulated.',
  },
  itinerary: [
    {
      title: 'Day 1: Arrival & Alona Beach',
      activities: [
        {
          time: '14:00',
          title: 'Resort Check-in',
          description: 'Check into your resort',
          iconType: 'relax',
        },
        {
          time: '16:00',
          title: 'Beach Time',
          description: 'Relax and swim at Alona Beach',
          iconType: 'nature',
        },
        {
          time: '19:00',
          title: 'Beachfront Dinner',
          description: 'Seafood dinner by the beach',
          iconType: 'food',
        },
      ],
    },
    {
      title: 'Day 2: Island Hopping',
      activities: [
        {
          time: '06:00',
          title: 'Dolphin Watching',
          description: 'Dolphin watching tour',
          iconType: 'nature',
        },
        {
          time: '08:00',
          title: 'Balicasag Snorkeling',
          description: 'Snorkeling at Balicasag Island Marine Sanctuary',
          iconType: 'activity',
        },
        {
          time: '11:00',
          title: 'Virgin Island',
          description: 'Visit Virgin Island Sandbar',
          iconType: 'nature',
        },
      ],
    },
  ],
};
