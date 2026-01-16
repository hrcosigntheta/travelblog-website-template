import type { ItineraryActivityProps } from '../types/itinerary';
import type { TravelTip } from '../components/TravelTips';

export interface ItineraryActivityData extends Omit<ItineraryActivityProps, 'icon'> {
  iconType?: 'transport' | 'food' | 'activity' | 'nature' | 'relax';
}

export interface ItineraryDayData {
  title: string;
  activities: ItineraryActivityData[];
}

export interface Destination {
  id: string;
  slug: string;
  title: string;
  description: string;
  region: string;
  image: string;
  rating: number;
  tags: string[];
  featured: boolean;

  // Expanded fields
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  stats: {
    bestTime: string;
    budget: string;
    difficulty: string;
  };
  content: string;
  highlights: string[];
  itinerary?: ItineraryDayData[];
  practicalInfo?: {
    gettingThere: string;
    accommodation: string;
    tips: string;
  };
  travelTips?: TravelTip[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    slug: 'el-nido-palawan',
    title: 'El Nido, Palawan',
    description: 'Stunning limestone cliffs and crystal clear waters.',
    region: 'Palawan',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
    rating: 4.9,
    tags: ['Beach', 'Island Hopping', 'Nature'],
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9',
      'https://images.unsplash.com/photo-1544413660-2991628527dd',
      'https://images.unsplash.com/photo-1534008897965-38d2793108c4',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99',
    ],
    coordinates: {
      lat: 11.1956,
      lng: 119.418,
    },
    stats: {
      bestTime: 'Nov - May',
      budget: '$$ - $$$',
      difficulty: 'Moderate',
    },
    highlights: [
      'Big Lagoon & Small Lagoon kayaking',
      'Nacpan Beach sunset',
      'Secret Lagoon exploration',
      'Seven Commandos Beach',
    ],
    content: `
      <p>El Nido is known for its white-sand beaches, coral reefs, and as the gateway to the Bacuit archipelago, a group of islands with steep karst cliffs.</p>
      <p>Miniloc Island is famed for the clear waters of its Small and Big lagoons. Nearby Shimizu Island has fish-filled waters. The area has many dive sites, including Dilumacad Island's long tunnel leading to an underwater cavern.</p>
    `,
    itinerary: [
      {
        title: 'Arrival & Town Exploration',
        activities: [
          {
            title: 'Arrival at Lio Airport',
            time: '10:00 AM',
            description: 'Land at Lio Airport and take a tricycle to El Nido Town.',
            iconType: 'transport',
            duration: '30 mins',
          },
          {
            title: 'Check-in and Lunch',
            time: '12:00 PM',
            description:
              'Check into your accommodation and enjoy fresh seafood lunch by the beach.',
            iconType: 'food',
            duration: '1.5 hours',
          },
          {
            title: 'Sunset at Las Cabanas',
            time: '5:00 PM',
            description:
              'Take a tricycle to Las Cabanas Beach for one of the best sunsets in Palawan.',
            iconType: 'relax',
            duration: '2 hours',
            tips: 'Arrive early to get a good seat at one of the beach bars.',
          },
        ],
      },
      {
        title: 'Tour A: Lagoons & Beaches',
        activities: [
          {
            title: 'Big Lagoon',
            time: '09:00 AM',
            description: 'Kayak through the emerald waters of the Big Lagoon.',
            iconType: 'nature',
            duration: '1.5 hours',
          },
          {
            title: 'Secret Lagoon',
            time: '11:00 AM',
            description:
              'Crawl through a small hole to enter a hidden lagoon enclosed by limestone cliffs.',
            iconType: 'nature',
            duration: '1 hour',
          },
          {
            title: 'Shimizu Island Lunch',
            time: '12:30 PM',
            description: 'Enjoy a grilled seafood buffet lunch on the beach.',
            iconType: 'food',
            duration: '1 hour',
          },
        ],
      },
    ],
    practicalInfo: {
      gettingThere:
        'Fly directly to El Nido (Lio Airport) via AirSWIFT from Manila or Cebu. Alternatively, fly to Puerto Princesa and take a 5-6 hour van ride.',
      accommodation:
        'El Nido offers a range of options from budget hostels in town to luxury island resorts.',
      tips: 'Bring cash as ATMs can be unreliable. Book tours in advance during peak season.',
    },
    travelTips: [
      {
        id: 'elnido-1',
        category: 'nature',
        title: 'Protect the Corals',
        content:
          'When island hopping, be careful not to step on corals. Use reef-safe sunscreen to protect the marine ecosystem.',
      },
      {
        id: 'elnido-2',
        category: 'safety',
        title: 'Water Safety',
        content:
          'Life jackets are mandatory on boat tours. Always wear them when the boat is moving.',
      },
      {
        id: 'elnido-3',
        category: 'packing',
        title: 'Dry Bag is Essential',
        content:
          'Bring a dry bag to protect your electronics and valuables during boat tours and kayaking.',
      },
    ],
  },
  {
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
  },
  {
    id: '3',
    slug: 'chocolate-hills-bohol',
    title: 'Chocolate Hills, Bohol',
    description: 'Unique geological formation of over 1,200 hills.',
    region: 'Bohol',
    image: 'https://images.unsplash.com/photo-1594396006509-3224b6113b1f',
    rating: 4.7,
    tags: ['Nature', 'Hiking', 'Sightseeing'],
    featured: true,
    images: ['https://images.unsplash.com/photo-1594396006509-3224b6113b1f'],
    coordinates: {
      lat: 9.9171,
      lng: 124.1673,
    },
    stats: {
      bestTime: 'Dec - May',
      budget: '$$',
      difficulty: 'Easy',
    },
    highlights: ['Chocolate Hills Complex', 'Tarsier Sanctuary', 'Loboc River Cruise'],
    content:
      'The Chocolate Hills are a geological formation in the Bohol province of the Philippines.',
    practicalInfo: {
      gettingThere: 'Fly to Bohol-Panglao International Airport. Take a bus or van to Carmen.',
      accommodation: 'Stay in Panglao for beaches or near Carmen for the hills.',
      tips: 'Visit early morning for the best light.',
    },
  },
  {
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
  },
];
