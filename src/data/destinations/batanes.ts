import type { Destination } from './types';

export const batanes: Destination = {
  id: 'batanes',
  slug: 'batanes',
  title: 'Batanes Islands',
  description:
    'The "Home of the Winds" in the northernmost Philippines. Famous for rolling hills, stone houses, lighthouses, and breathtaking coastal cliffs.',
  region: 'Cagayan Valley',
  image: '/images/destinations/batanes-main.jpg',
  rating: 4.9,
  tags: ['Nature', 'Culture', 'History', 'Landscapes'],
  featured: true,
  images: [
    '/images/destinations/batanes-1.jpg',
    '/images/destinations/batanes-2.jpg',
    '/images/destinations/batanes-3.jpg',
    '/images/destinations/batanes-4.jpg',
  ],
  coordinates: {
    lat: 20.4485,
    lng: 121.9708,
  },
  stats: {
    bestTime: 'Dec - May',
    budget: '$$$',
    difficulty: 'Easy',
  },
  content: `
    Batanes is the northernmost province of the Philippines, offering scenery unlike anywhere else in the country. Often compared to New Zealand or Scotland, it features rolling green hills, dramatic cliffs, and traditional Ivatan stone houses.
    
    The province consists of three inhabited islands: Batan, Sabtang, and Itbayat. Batan offers the main tourist sites including the Basco Lighthouse and Vayang Rolling Hills. Sabtang showcases well-preserved stone houses and white sand beaches. Itbayat is more rugged and adventurous.
    
    The Ivatans are known for their resilience and honesty. The "Honesty Coffee Shop" is a famous testament to the local culture.
  `,
  highlights: [
    'Basco Lighthouse',
    'Vayang Rolling Hills',
    'Valugan Boulder Beach',
    'Traditional Stone Houses in Sabtang',
    'Honesty Coffee Shop',
  ],
  itinerary: [
    {
      title: 'Day 1: North Batan',
      activities: [
        {
          time: '08:00',
          title: 'Arrival',
          description: 'Arrival at Basco Airport and check-in',
          iconType: 'transport',
        },
        {
          time: '14:00',
          title: 'Vayang Rolling Hills',
          description: 'Sunset view of the rolling hills and West Philippine Sea',
          iconType: 'nature',
        },
        {
          time: '16:00',
          title: 'Basco Lighthouse',
          description: 'Visit the iconic lighthouse at Naidi Hills',
          iconType: 'activity',
        },
      ],
    },
    {
      title: 'Day 2: South Batan',
      activities: [
        {
          time: '09:00',
          title: 'Chawa View Deck',
          description: 'Panoramic view of the cliffs and sea',
          iconType: 'nature',
        },
        {
          time: '11:00',
          title: 'Racuh a Payaman',
          description: 'Also known as Marlboro Country, expansive pasturelands',
          iconType: 'nature',
        },
        {
          time: '13:00',
          title: 'Honesty Coffee Shop',
          description: 'Self-service coffee shop showcasing Ivatan honesty',
          iconType: 'food',
        },
      ],
    },
    {
      title: 'Day 3: Sabtang Island',
      activities: [
        {
          time: '06:00',
          title: 'Faluwa Ride',
          description: 'Boat ride to Sabtang Island',
          iconType: 'transport',
        },
        {
          time: '09:00',
          title: 'Chavayan Village',
          description: 'Visit traditional stone houses',
          iconType: 'activity',
        },
        {
          time: '11:00',
          title: 'Morong Beach',
          description: 'Visit the natural stone arch',
          iconType: 'nature',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Flights to Basco (BSO) are available from Manila via Philippine Airlines or Clark via Sunlight Air.',
    accommodation:
      'Homestays and lodges in Basco are the most common. Luxury options include Fundacion Pacita.',
    tips: 'Weather is unpredictable. Bring windbreakers and motion sickness medicine for the faluwa ride.',
  },
};
