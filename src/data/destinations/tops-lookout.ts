import type { Destination } from './types';

export const topsLookout: Destination = {
  id: 'tops-lookout',
  slug: 'tops-lookout',
  title: 'Tops Lookout',
  description:
    'A popular observation deck offering breathtaking panoramic views of Cebu City, Mactan Island, and Bohol.',
  region: 'Cebu City',
  image: '/images/destinations/tops-lookout-main.jpg',
  rating: 4.4,
  tags: ['Viewpoint', 'City', 'Nightlife', 'Relaxation'],
  featured: false,
  images: [
    '/images/destinations/tops-lookout-1.jpg',
    '/images/destinations/tops-lookout-2.jpg',
    '/images/destinations/tops-lookout-3.jpg',
    '/images/destinations/tops-lookout-4.jpg',
  ],
  coordinates: {
    lat: 10.3703,
    lng: 123.8708,
  },
  stats: {
    bestTime: 'All Year',
    budget: '$',
    difficulty: 'Easy',
  },
  content: `
    Tops Lookout is situated 600 meters above sea level in the cool hills of Busay. It is famous for its fortress-like stone architecture and its commanding view of the metropolitan Cebu.
    
    It is a favorite spot for both locals and tourists to watch the sunset and see the city lights come alive at night. There are several cafes and restaurants within the complex.
  `,
  highlights: [
    'Panoramic city and ocean views',
    'Sunset watching',
    'Night city lights',
    'Unique circular stone architecture',
  ],
  itinerary: [
    {
      title: 'Sunset & City Lights',
      activities: [
        {
          time: '16:30',
          title: 'Arrival',
          description: 'Arrive at Tops Lookout',
          iconType: 'transport',
        },
        {
          time: '17:30',
          title: 'Sunset',
          description: 'Watch the sunset over the city',
          iconType: 'nature',
        },
        {
          time: '18:30',
          title: 'Dinner',
          description: 'Dinner with a view at the onsite restaurants',
          iconType: 'food',
        },
      ],
    },
  ],
  practicalInfo: {
    gettingThere:
      'Access via habal-habal or taxi from JY Square Mall. Many tourists combine this with Temple of Leah.',
    accommodation: 'Stay in Cebu City.',
    tips: 'It can get chilly at night, so bring a light jacket. Entrance fee applies.',
  },
};
