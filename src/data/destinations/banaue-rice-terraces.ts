import type { Destination } from './types';

export const banaueRiceTerraces: Destination = {
  id: 'banaue-rice-terraces',
  slug: 'banaue-rice-terraces',
  title: 'Banaue Rice Terraces',
  description:
    'A UNESCO World Heritage site often called the "Eighth Wonder of the World". Ancient rice terraces carved into the mountains of Ifugao over 2,000 years ago.',
  region: 'Cordillera Administrative Region',
  image: '/images/destinations/banaue-main.jpg',
  rating: 4.8,
  tags: ['Culture', 'History', 'Hiking', 'Nature'],
  featured: false,
  images: [
    '/images/destinations/banaue-1.jpg',
    '/images/destinations/banaue-2.jpg',
    '/images/destinations/banaue-3.jpg',
    '/images/destinations/banaue-4.jpg',
  ],
  coordinates: {
    lat: 16.918,
    lng: 121.056,
  },
  stats: {
    bestTime: 'Apr - May, Oct - Nov',
    budget: '$$',
    difficulty: 'Moderate',
  },
  content: `
    The Banaue Rice Terraces are ancient sprawling man-made structures from 2,000 to 6,000 years old. They are carved into the mountains of Ifugao in the Philippines by ancestors of the indigenous people.
    
    These terraces were built largely by hand and fed by an ancient irrigation system from the rainforests above the terraces. If the steps were put end to end, it would encircle half the globe.
    
    Nearby are the Batad Rice Terraces, which are often considered even more spectacular due to their amphitheater-like formation.
  `,
  highlights: [
    'Banaue Viewpoint',
    'Batad Rice Terraces',
    'Tappiya Falls',
    'Tam-an Village',
    'Bangaan Rice Terraces',
  ],
  itinerary: [
    {
      title: 'Day 1: Arrival & Viewpoints',
      activities: [
        {
          time: '07:00',
          title: 'Arrival',
          description: 'Arrival in Banaue via overnight bus',
          iconType: 'transport',
        },
        {
          time: '09:00',
          title: 'Main Viewpoint',
          description: 'Visit the main Banaue Viewpoint for iconic photos',
          iconType: 'nature',
        },
        {
          time: '14:00',
          title: 'Museum',
          description: 'Visit the Banaue Museum to learn about Ifugao culture',
          iconType: 'activity',
        },
      ],
    },
    {
      title: 'Day 2: Batad Adventure',
      activities: [
        {
          time: '08:00',
          title: 'Jeepney Ride',
          description: 'Ride to Batad Saddle',
          iconType: 'transport',
        },
        {
          time: '10:00',
          title: 'Trek to Batad',
          description: 'Hike down to Batad village and terraces',
          iconType: 'activity',
        },
        {
          time: '13:00',
          title: 'Tappiya Falls',
          description: 'Trek to the majestic Tappiya Falls',
          iconType: 'nature',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Overnight Ohayami or Coda Lines bus from Manila (Sampaloc/Cubao) takes about 9-10 hours.',
    accommodation: 'Guesthouses and homestays are plentiful in Banaue town and Batad village.',
    tips: 'Bring cash as ATMs are scarce. Pack warm clothes as it gets cold at night. Good hiking shoes are essential.',
  },
};
