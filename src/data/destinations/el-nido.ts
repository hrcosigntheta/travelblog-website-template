import type { Destination } from './types';

export const elNido: Destination = {
  id: 'el-nido-palawan',
  slug: 'el-nido-palawan',
  title: 'El Nido, Palawan',
  description: 'Stunning limestone cliffs and crystal clear waters.',
  region: 'Palawan',
  image: '/images/destinations/el-nido-palawan-main.jpg',
  imageAlt: 'Hero image of El Nido, Palawan in Palawan, Philippines',
  rating: 4.9,
  tags: ['Beach', 'Island Hopping', 'Nature'],
  featured: true,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    {
      src: '/images/destinations/el-nido-palawan-1.jpg',
      alt: 'El Nido, Palawan photography - Shot 1',
    },
    {
      src: '/images/destinations/el-nido-palawan-2.jpg',
      alt: 'El Nido, Palawan photography - Shot 2',
    },
    {
      src: '/images/destinations/el-nido-palawan-3.jpg',
      alt: 'El Nido, Palawan photography - Shot 3',
    },
    {
      src: '/images/destinations/el-nido-palawan-4.jpg',
      alt: 'El Nido, Palawan photography - Shot 4',
    },
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
          description: 'Check into your accommodation and enjoy fresh seafood lunch by the beach.',
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
};
