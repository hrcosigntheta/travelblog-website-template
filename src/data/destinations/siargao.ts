import type { Destination } from './types';

export const siargao: Destination = {
  id: 'siargao-island',
  slug: 'siargao-island',
  title: 'Siargao Island',
  description:
    'The surfing capital of the Philippines. A tear-drop shaped island with world-class waves, sugared white beaches, and enchanting lagoons.',
  region: 'Surigao del Norte',
  image: '/images/destinations/siargao-island-main.jpg',
  imageAlt: 'Hero image of Siargao Island in Surigao del Norte, Philippines',
  rating: 4.8,
  tags: ['Surfing', 'Beach', 'Nightlife', 'Nature'],
  featured: true,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    {
      src: '/images/destinations/siargao-island-1.jpg',
      alt: 'Siargao Island photography - Shot 1',
    },
    {
      src: '/images/destinations/siargao-island-2.jpg',
      alt: 'Siargao Island photography - Shot 2',
    },
    {
      src: '/images/destinations/siargao-island-3.jpg',
      alt: 'Siargao Island photography - Shot 3',
    },
    {
      src: '/images/destinations/siargao-island-4.jpg',
      alt: 'Siargao Island photography - Shot 4',
    },
  ],
  coordinates: {
    lat: 9.78,
    lng: 126.15,
  },
  stats: {
    bestTime: 'Aug - Nov (Surfing)',
    budget: '₱₱',
    difficulty: 'Easy',
  },
  content: `
    Siargao has transformed from a sleepy fishing village into one of Asia's most sought-after destinations. While famous for Cloud 9's thick, hollow tubes that attract surfers worldwide, the island offers much more than waves.
    
    The island vibe is laid-back and rustic. Palm trees line the roads, and the nightlife in General Luna is vibrant but unpretentious. Beyond surfing, you can explore the magrooves of Del Carmen, the rock pools of Magpupungko, or the stunning islands of Guyam, Daku, and Naked Island.
    
    Sugba Lagoon is another highlight, offering emerald waters surrounded by limestone formations, perfect for paddleboarding and diving.
  `,
  highlights: [
    'Cloud 9 Boardwalk',
    'Magpupungko Rock Pools',
    'Sugba Lagoon',
    'Maasin River (Bent Palm Tree)',
    'Naked, Daku, and Guyam Island Hopping',
  ],
  itinerary: [
    {
      title: 'Day 1: Arrival & Cloud 9',
      activities: [
        {
          time: '14:00',
          title: 'Check-in',
          description: 'Check in at General Luna accommodation',
          iconType: 'relax',
        },
        {
          time: '16:00',
          title: 'Cloud 9',
          description: 'Watch the surfers and sunset at the boardwalk',
          iconType: 'nature',
        },
        {
          time: '19:00',
          title: 'Dinner',
          description: 'Enjoy fresh seafood or pizza at local spots',
          iconType: 'food',
        },
      ],
    },
    {
      title: 'Day 2: Island Hopping',
      activities: [
        {
          time: '09:00',
          title: 'Tri-Island Tour',
          description: 'Boat tour to Naked, Daku, and Guyam Islands',
          iconType: 'activity',
        },
        {
          time: '12:00',
          title: 'Lunch',
          description: 'Boodle fight lunch on Daku Island',
          iconType: 'food',
        },
        {
          time: '16:00',
          title: 'Return',
          description: 'Back to General Luna',
          iconType: 'transport',
        },
      ],
    },
    {
      title: 'Day 3: Land Tour',
      activities: [
        {
          time: '08:00',
          title: 'Magpupungko',
          description: 'Swim in the tidal rock pools (check tide schedule!)',
          iconType: 'nature',
        },
        {
          time: '11:00',
          title: 'Maasin River',
          description: 'Photo op at the bent palm tree and rope swing',
          iconType: 'activity',
        },
        {
          time: '14:00',
          title: 'Sugba Lagoon',
          description: 'Paddleboarding in the lagoon',
          iconType: 'nature',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere: 'Direct flights to Sayak Airport (IAO) from Manila, Cebu, or Clark.',
    accommodation:
      'General Luna has the most options. Malinao is quieter and more upscale. Pacifico is for those escaping the crowds.',
    tips: 'Rent a motorbike to get around (approx. 350-500 PHP/day). Bring reef-safe sunscreen. Cash is king in many smaller spots.',
  },
};
