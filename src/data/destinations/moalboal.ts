import type { Destination } from './types';

export const moalboal: Destination = {
  id: 'moalboal',
  slug: 'moalboal',
  title: 'Moalboal',
  description:
    'A diver\'s paradise famous for the "Sardine Run" where millions of sardines swim just off the shore of Panagsama Beach.',
  region: 'Cebu',
  image: '/images/destinations/moalboal-main.jpg',
  imageAlt: 'Hero image of Moalboal in Cebu, Philippines',
  rating: 4.8,
  tags: ['Diving', 'Snorkeling', 'Beach', 'Marine Life'],
  featured: true,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    { src: '/images/destinations/moalboal-1.jpg', alt: 'Moalboal photography - Shot 1' },
    { src: '/images/destinations/moalboal-2.jpg', alt: 'Moalboal photography - Shot 2' },
    { src: '/images/destinations/moalboal-3.jpg', alt: 'Moalboal photography - Shot 3' },
    { src: '/images/destinations/moalboal-4.jpg', alt: 'Moalboal photography - Shot 4' },
  ],
  coordinates: {
    lat: 9.9547,
    lng: 123.4005,
  },
  stats: {
    bestTime: 'Nov - May',
    budget: '₱₱',
    difficulty: 'Easy',
  },
  content: `
    Moalboal is a premier diving destination located on the southwest coast of Cebu. Its main attraction is the spectacular Sardine Run, which can be experienced year-round just meters from the shore of Panagsama Beach.
    
    Aside from the sardines, Moalboal is home to rich coral reefs and a high chance of spotting sea turtles (pawikan). White Beach (Basdaku) offers a stretch of fine sand for sunbathing and swimming.
  `,
  highlights: [
    'Sardine Run at Panagsama Beach',
    'Swimming with Sea Turtles',
    'Pescador Island hopping',
    'White Beach (Basdaku)',
  ],
  itinerary: [
    {
      title: 'Underwater Exploration',
      activities: [
        {
          time: '07:00',
          title: 'Island Hopping',
          description: 'Boat ride to Pescador Island for snorkeling',
          iconType: 'activity',
        },
        {
          time: '10:00',
          title: 'Sardine Run',
          description: 'Snorkel with the Sardine Run at Panagsama',
          iconType: 'nature',
        },
        {
          time: '12:00',
          title: 'Lunch',
          description: 'Seaside lunch at a local cafe',
          iconType: 'food',
        },
        {
          time: '15:00',
          title: 'Relaxation',
          description: 'Relax at Basdaku White Beach',
          iconType: 'relax',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Take a Ceres bus from Cebu South Bus Terminal bound for Moalboal (approx. 3 hours). From the town proper, take a tricycle to Panagsama or White Beach.',
    accommodation:
      'Panagsama Beach has numerous dive resorts and hostels. White Beach offers more local style accommodations.',
    tips: "You don't need a boat to see the sardines; just rent snorkeling gear and swim out from Panagsama shore.",
  },
};
