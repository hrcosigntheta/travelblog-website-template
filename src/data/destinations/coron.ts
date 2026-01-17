import type { Destination } from './types';

export const coron: Destination = {
  id: 'coron-palawan',
  slug: 'coron-palawan',
  title: 'Coron, Palawan',
  description:
    'Famous for its World War II wrecks, crystal-clear freshwater lakes, and stunning limestone formations.',
  region: 'Palawan',
  image: '/images/destinations/coron-palawan-main.jpg',
  imageAlt: 'Hero image of Coron, Palawan in Palawan, Philippines', // Placeholder
  rating: 4.9,
  tags: ['Diving', 'Lakes', 'Nature', 'Shipwrecks'],
  featured: true,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    { src: '/images/destinations/coron-palawan-1.jpg', alt: 'Coron, Palawan photography - Shot 1' },
    { src: '/images/destinations/coron-palawan-2.jpg', alt: 'Coron, Palawan photography - Shot 2' },
    { src: '/images/destinations/coron-palawan-3.jpg', alt: 'Coron, Palawan photography - Shot 3' },
    { src: '/images/destinations/coron-palawan-4.jpg', alt: 'Coron, Palawan photography - Shot 4' },
  ],
  coordinates: {
    lat: 11.9986,
    lng: 120.2043,
  },
  stats: {
    bestTime: 'Nov - May',
    budget: '₱₱ - ₱₱₱',
    difficulty: 'Moderate',
  },
  highlights: [
    'Kayangan Lake',
    'Twin Lagoon',
    'Barracuda Lake',
    'WWII Shipwreck Diving',
    'Mt. Tapyas Viewpoint',
    'Maquinit Hot Springs',
  ],
  content: `
    <p>Coron is a separate group of islands from the main Palawan island. It is best known for world-class wreck diving, as several Japanese supply ships were sunk here during World War II.</p>
    <p>Above water, Coron is just as spectacular with towering limestone cliffs guarding freshwater lakes. Kayangan Lake, often cited as the cleanest lake in Asia, offers a stunning mix of fresh and saltwater with incredible visibility.</p>
    <p>Twin Lagoon is another must-visit, where warm and cold waters meet, separated by a limestone wall that you can swim under or climb over depending on the tide.</p>
  `,
  itinerary: [
    {
      title: 'The Ultimate Island Hopping',
      activities: [
        {
          title: 'Kayangan Lake',
          time: '08:30 AM',
          description: 'Hike up for the iconic view then swim in the crystal clear lake.',
          iconType: 'nature',
          duration: '1.5 hours',
        },
        {
          title: 'Twin Lagoon',
          time: '10:30 AM',
          description: 'Swim through the small opening to access the hidden inner lagoon.',
          iconType: 'nature',
          duration: '1 hour',
        },
        {
          title: 'Lunch at Beach 91',
          time: '12:00 PM',
          description: 'Seafood lunch buffet on a white sand beach.',
          iconType: 'food',
          duration: '1 hour',
        },
        {
          title: 'Skeleton Wreck',
          time: '01:30 PM',
          description: 'Snorkel above a shallow shipwreck teeming with fish.',
          iconType: 'activity',
          duration: '45 mins',
        },
      ],
    },
    {
      title: 'Land Tour & Relaxation',
      activities: [
        {
          title: 'Mt. Tapyas Trek',
          time: '04:30 PM',
          description: 'Climb 700+ steps to catch the sunset over Coron town and islands.',
          iconType: 'activity',
          duration: '1.5 hours',
        },
        {
          title: 'Maquinit Hot Springs',
          time: '06:30 PM',
          description: 'Soak in the natural saltwater hot springs to relax your muscles.',
          iconType: 'relax',
          duration: '1.5 hours',
        },
        {
          title: 'Dinner in Town',
          time: '08:30 PM',
          description: 'Enjoy local cuisine at one of the popular restaurants in Coron town.',
          iconType: 'food',
          duration: '1.5 hours',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Fly into Francisco B. Reyes Airport (USU) in Busuanga. From there, it is a 30-45 minute van ride to Coron Town.',
    accommodation:
      'Coron Town Proper has many budget inns and mid-range hotels. For luxury, look for private island resorts nearby.',
    tips: 'Rent snorkeling gear in town before your boat tour as it is cheaper and better quality than on the boat.',
  },
  travelTips: [
    {
      id: 'coron-1',
      category: 'safety',
      title: 'Jellyfish Season',
      content:
        'Be aware of jellyfish depending on the season. Wearing a rash guard or seeking local advice is recommended.',
    },
    {
      id: 'coron-2',
      category: 'safety',
      title: 'Diving Certifications',
      content:
        'If you plan to penetrate the shipwrecks, ensure you have the appropriate wreck diving certification and experience.',
    },
  ],
};
