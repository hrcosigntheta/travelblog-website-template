import type { Destination } from './types';

export const tarsierSanctuary: Destination = {
  id: 'tarsier-sanctuary',
  slug: 'tarsier-sanctuary',
  title: 'Philippine Tarsier Sanctuary',
  description: "Meet the world's smallest primates in their natural protected habitat in Corella.",
  region: 'Bohol',
  image:
    'https://images.unsplash.com/photo-1598457008779-7a356df157e1?q=80&w=2662&auto=format&fit=crop', // Placeholder
  rating: 4.6,
  tags: ['Nature', 'Wildlife', 'Conservation'],
  featured: false,
  images: [
    'https://images.unsplash.com/photo-1598457008779-7a356df157e1?q=80&w=2662&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1627889332219-48286992d997?q=80&w=2670&auto=format&fit=crop',
  ],
  coordinates: {
    lat: 9.6934,
    lng: 124.0118,
  },
  stats: {
    bestTime: 'Morning',
    budget: '$',
    difficulty: 'Easy',
  },
  highlights: [
    'See Philippine Tarsiers up close',
    'Guided forest walk',
    'Conservation education',
    'Lush forest environment',
  ],
  content: `The Philippine Tarsier Sanctuary in Corella is a dedicated conservation area for one of the world's smallest and most endangered primates. Unlike other viewing areas, the Corella sanctuary allows tarsiers to live in a semi-wild environment, free to move within the protected forest.

  Visitors are guided by staff on a short forest trail to spot these tiny, nocturnal creatures clinging to branches. Tarsiers are known for their enormous eyes, which are fixed in their sockets, and their ability to rotate their heads 180 degrees.

  Visiting this sanctuary supports the conservation efforts to protect the species and their habitat. It offers a quiet, respectful way to observe wildlife without disturbing them.`,
  practicalInfo: {
    gettingThere:
      'Located in Corella, about 20-30 minutes from Tagbilaran City. You can take a jeepney from the Dao Terminal in Tagbilaran or hire a tricycle/van as part of a countryside tour.',
    accommodation: 'Most visitors stay in Tagbilaran or Panglao and visit as a day trip.',
    tips: 'Tarsiers are nocturnal and sleep during the day. Keep noise to a minimum, do not use flash photography, and never attempt to touch them as they are very easily stressed.',
  },
  itinerary: [
    {
      title: 'Countryside Tour Stop',
      activities: [
        {
          time: '09:00',
          title: 'Arrival',
          description: 'Arrive at the Sanctuary',
          iconType: 'transport',
        },
        {
          time: '09:15',
          title: 'Briefing',
          description: 'Briefing at the reception area',
          iconType: 'activity',
        },
        {
          time: '09:30',
          title: 'Tarsier Viewing',
          description: 'Guided walk to spot Tarsiers',
          iconType: 'nature',
        },
        {
          time: '10:15',
          title: 'Departure',
          description: 'Visit souvenir shop and exit',
          iconType: 'relax',
        },
      ],
    },
  ],
};
