import type { Destination } from './types';

export const lobocRiver: Destination = {
  id: 'loboc-river',
  slug: 'loboc-river-cruise',
  title: 'Loboc River Cruise',
  description:
    'A scenic river cruise through lush jungle landscapes featuring a buffet lunch and cultural music.',
  region: 'Bohol',
  image:
    'https://images.unsplash.com/photo-1621235372481-8051283c7487?q=80&w=2670&auto=format&fit=crop', // Placeholder
  rating: 4.5,
  tags: ['Culture', 'Food', 'Nature', 'Relaxation'],
  featured: false,
  images: [
    'https://images.unsplash.com/photo-1621235372481-8051283c7487?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518081461904-7d819e6d6c2c?q=80&w=2670&auto=format&fit=crop',
  ],
  coordinates: {
    lat: 9.6385,
    lng: 124.0326,
  },
  stats: {
    bestTime: 'Lunch time',
    budget: '$$',
    difficulty: 'Easy',
  },
  highlights: [
    'Floating Restaurant Buffet',
    'Live Cultural Music',
    'Busay Falls View',
    'Scenic Nipa Palms & Jungle',
    'Local Folk Dance Stop',
  ],
  content: `The Loboc River Cruise is one of Bohol's most iconic experiences. Guests board a floating restaurant (a large catamaran-style raft) and drift down the emerald-green Loboc River while enjoying a buffet of Filipino dishes.

  The journey takes you through a serene landscape of nipa palms and lush tropical forest. Along the way, local musicians serenade guests, and the boat makes a stop at a riverside platform where community members perform traditional folk dances and songs.

  The cruise travels up to the small Busay Falls before turning back. It's a relaxing way to soak in the natural beauty of Bohol's interior while experiencing local culture and cuisine.`,
  practicalInfo: {
    gettingThere:
      'Located in Loboc town, about 40 minutes from Tagbilaran City. Accessible by bus, jeepney, or as part of a hired van countryside tour.',
    accommodation:
      'There are small resorts along the Loboc River for those who want to stay overnight, but most visit as a day trip.',
    tips: 'Cruises usually run from 10 AM to 2 PM. Arrive early (around 11 AM) to beat the peak lunch crowd. The food is typically Filipino buffet style.',
  },
  itinerary: [
    {
      title: 'Lunch Cruise Experience',
      activities: [
        {
          time: '11:30',
          title: 'Boarding',
          description: 'Board the floating restaurant',
          iconType: 'food',
        },
        {
          time: '12:00',
          title: 'Cruise & Lunch',
          description: 'Cruise starts with lunch buffet',
          iconType: 'relax',
        },
        {
          time: '12:30',
          title: 'Cultural Show',
          description: 'Cultural show stop',
          iconType: 'activity',
        },
        {
          time: '13:00',
          title: 'Busay Falls',
          description: 'View Busay Falls and return',
          iconType: 'nature',
        },
      ],
    },
  ],
};
