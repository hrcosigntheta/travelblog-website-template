import type { Destination } from './types';

export const puertoPrincesa: Destination = {
  id: 'pp-underground-river',
  slug: 'puerto-princesa-underground-river',
  title: 'Puerto Princesa Underground River',
  description:
    'A UNESCO World Heritage site featuring a spectacular limestone karst landscape with an underground river.',
  region: 'Palawan',
  image: '/images/destinations/pp-underground-river-main.jpg',
  imageAlt: 'Hero image of Puerto Princesa Underground River in Palawan, Philippines', // Placeholder, reusing El Nido or similar until fetch script runs
  rating: 4.8,
  tags: ['Nature', 'Cave', 'UNESCO', 'Adventure'],
  featured: false,
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  images: [
    {
      src: '/images/destinations/pp-underground-river-1.jpg',
      alt: 'Puerto Princesa Underground River photography - Shot 1',
    },
    {
      src: '/images/destinations/pp-underground-river-2.jpg',
      alt: 'Puerto Princesa Underground River photography - Shot 2',
    },
    {
      src: '/images/destinations/pp-underground-river-3.jpg',
      alt: 'Puerto Princesa Underground River photography - Shot 3',
    },
    {
      src: '/images/destinations/pp-underground-river-4.jpg',
      alt: 'Puerto Princesa Underground River photography - Shot 4',
    },
  ],
  coordinates: {
    lat: 10.1926,
    lng: 118.9266,
  },
  stats: {
    bestTime: 'Jan - May',
    budget: '₱ - ₱₱',
    difficulty: 'Easy',
  },
  highlights: [
    'Underground River Tour',
    'Sabang Beach',
    'Ugong Rock Adventures',
    'Honda Bay Island Hopping',
  ],
  content: `
    <p>The Puerto Princesa Subterranean River National Park is a UNESCO World Heritage Site and one of the New 7 Wonders of Nature. It features a spectacular limestone karst landscape with an underground river.</p>
    <p>The river emerges directly into the sea, and its lower portion is subject to tidal influences. The area also represents a significant habitat for biodiversity conservation. The site contains a full mountain-to-sea ecosystem and has some of the most important forests in Asia.</p>
    <p>Visitors take a paddle boat deep into the cave system to marvel at massive stalactites, stalagmites, and vast chambers.</p>
  `,
  itinerary: [
    {
      title: 'Underground River Adventure',
      activities: [
        {
          title: 'Van Transfer to Sabang',
          time: '07:00 AM',
          description: 'Early morning pick-up for the 1.5-2 hour drive to Sabang Wharf.',
          iconType: 'transport',
          duration: '2 hours',
        },
        {
          title: 'Boat to Cave Entrance',
          time: '09:30 AM',
          description: 'Take a motorized banca to the park entrance/beach.',
          iconType: 'transport',
          duration: '20 mins',
        },
        {
          title: 'Cave Tour',
          time: '10:00 AM',
          description: 'Paddle boat tour inside the underground river with audio guide.',
          iconType: 'nature',
          duration: '45 mins',
        },
        {
          title: 'Lunch Buffet',
          time: '12:00 PM',
          description: 'Enjoy a buffet lunch at Sabang Beach.',
          iconType: 'food',
          duration: '1 hour',
        },
      ],
    },
    {
      title: 'Honda Bay Island Hopping',
      activities: [
        {
          title: 'Starfish Island',
          time: '09:00 AM',
          description: 'Snorkel and see abundant starfish in clear shallow waters.',
          iconType: 'nature',
          duration: '1.5 hours',
        },
        {
          title: 'Luli Island',
          time: '11:00 AM',
          description: 'Visit the sinking island that appears and disappears with the tide.',
          iconType: 'relax',
          duration: '1.5 hours',
        },
        {
          title: 'Cowrie Island',
          time: '01:00 PM',
          description: 'Relax, swim, and enjoy water sports activities.',
          iconType: 'activity',
          duration: '2 hours',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Fly to Puerto Princesa International Airport (PPS) from Manila, Cebu, or Clark. The Underground River is accessible via van or bus from the city proper.',
    accommodation:
      'Most visitors stay in Puerto Princesa City which has hotels for all budgets. Sabang also offers beachfront resorts for those wanting to stay near the park.',
    tips: 'Permits are required for the Underground River and are usually included in tour packages. Book in advance.',
  },
  travelTips: [
    {
      id: 'pp-1',
      category: 'nature',
      title: 'Monkeys and Monitor Lizards',
      content:
        'You will likely see monkeys and large monitor lizards near the park entrance. Do not feed them and keep a safe distance.',
    },
    {
      id: 'pp-2',
      category: 'packing',
      title: 'Audio Guides',
      content:
        'The tour includes an audio guide device. Make sure to listen carefully as boatmen minimize talking to preserve the cave ecosystem.',
    },
  ],
};
