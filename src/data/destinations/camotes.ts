import type { Destination } from './types';

export const camotes: Destination = {
  id: 'camotes',
  slug: 'camotes',
  title: 'Camotes Islands',
  description:
    'Known as the "Lost Horizon of the South", Camotes offers a rustic island charm with caves, lakes, and pristine beaches.',
  region: 'Cebu',
  image: '/images/destinations/camotes-main.jpg',
  imageAlt: 'Hero image of Camotes Islands in Cebu, Philippines',
  rating: 4.5,
  tags: ['Island', 'Caves', 'Lake', 'Nature'],
  featured: false,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    { src: '/images/destinations/camotes-1.jpg', alt: 'Camotes Islands photography - Shot 1' },
    { src: '/images/destinations/camotes-2.jpg', alt: 'Camotes Islands photography - Shot 2' },
    { src: '/images/destinations/camotes-3.jpg', alt: 'Camotes Islands photography - Shot 3' },
    { src: '/images/destinations/camotes-4.jpg', alt: 'Camotes Islands photography - Shot 4' },
  ],
  coordinates: {
    lat: 10.6558,
    lng: 124.3414,
  },
  stats: {
    bestTime: 'Feb - May',
    budget: '$$',
    difficulty: 'Easy',
  },
  content: `
    The Camotes group of islands offers a diverse range of natural attractions. From the vast white sands of Santiago Bay to the mystical waters of Lake Danao and the underground pools of Timubo Cave.
    
    It's less commercialized than other destinations, making it perfect for travelers who want to escape the crowds and enjoy nature in its raw beauty.
  `,
  highlights: ['Santiago Bay Beach', 'Lake Danao Park', 'Timubo Cave', 'Buho Rock Resort'],
  itinerary: [
    {
      title: 'Nature & Adventure',
      activities: [
        {
          time: '09:00',
          title: 'Cave Exploration',
          description: 'Swim inside Timubo Cave',
          iconType: 'nature',
        },
        {
          time: '11:00',
          title: 'Lake Activities',
          description: 'Kayaking at Lake Danao',
          iconType: 'activity',
        },
        {
          time: '13:00',
          title: 'Beach Lunch',
          description: 'Lunch at Santiago Bay',
          iconType: 'food',
        },
        {
          time: '15:00',
          title: 'Cliff Jumping',
          description: 'Cliff diving at Buho Rock',
          iconType: 'activity',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Ferry from Danao City Port to Consuelo Port (Camotes) takes about 2 hours. Alternatively, OceanJet has trips from Pier 1 Cebu City.',
    accommodation: 'Santiago Bay has several resorts. Mangodlong area also has mid-range options.',
    tips: 'The islands are quite big, so renting a multi-cab or motorcycle is necessary to get around.',
  },
};
