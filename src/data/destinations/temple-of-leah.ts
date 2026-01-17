import type { Destination } from './types';

export const templeOfLeah: Destination = {
  id: 'temple-of-leah',
  slug: 'temple-of-leah',
  title: 'Temple of Leah',
  description:
    'Dubbed as the "Taj Mahal of Cebu", this grand Roman-style temple was built as a symbol of undying love.',
  region: 'Cebu City',
  image: '/images/destinations/temple-of-leah-main.jpg',
  imageAlt: 'Hero image of Temple of Leah in Cebu City, Philippines',
  rating: 4.2,
  tags: ['Culture', 'Architecture', 'Viewpoint', 'History'],
  featured: false,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    {
      src: '/images/destinations/temple-of-leah-1.jpg',
      alt: 'Temple of Leah photography - Shot 1',
    },
    {
      src: '/images/destinations/temple-of-leah-2.jpg',
      alt: 'Temple of Leah photography - Shot 2',
    },
    {
      src: '/images/destinations/temple-of-leah-3.jpg',
      alt: 'Temple of Leah photography - Shot 3',
    },
    {
      src: '/images/destinations/temple-of-leah-4.jpg',
      alt: 'Temple of Leah photography - Shot 4',
    },
  ],
  coordinates: {
    lat: 10.3664,
    lng: 123.8795,
  },
  stats: {
    bestTime: 'All Year',
    budget: '₱',
    difficulty: 'Easy',
  },
  content: `
    Located in the highlands of Busay, the Temple of Leah is a massive structure inspired by Roman architecture. It was built by Teodorico Adarna as a tribute to his late wife, Leah Villa Albino-Adarna.
    
    The temple features a museum, an art gallery, and a library containing the personal belongings of Leah. The forecourt offers a panoramic view of Cebu City.
  `,
  highlights: [
    'Roman-inspired architecture',
    'Golden statue of Leah',
    'Panoramic city view',
    'Grand staircase and columns',
  ],
  itinerary: [
    {
      title: 'City Highland Tour',
      activities: [
        {
          time: '14:00',
          title: 'Temple Visit',
          description: 'Explore the temple grounds and museum',
          iconType: 'activity',
        },
        {
          time: '15:30',
          title: 'Photo Op',
          description: 'Take photos with the city view',
          iconType: 'nature',
        },
        {
          time: '16:30',
          title: 'Next Stop',
          description: 'Proceed to nearby Sirao Flower Garden or Tops Lookout',
          iconType: 'transport',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Take a habal-habal (motorcycle taxi) from JY Square Mall in Lahug. It takes about 20-30 minutes uphill.',
    accommodation: 'Best to stay in Cebu City hotels as this is just a day trip destination.',
    tips: 'Visit on weekdays to avoid crowds. The road is steep, so ensure your vehicle is capable.',
  },
};
