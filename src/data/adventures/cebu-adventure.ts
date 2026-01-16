import type { Adventure } from './types';

export const cebuAdventure: Adventure = {
  id: 'cebu-adventure-1',
  slug: 'my-first-cebu-adventure',
  title: 'My First Cebu Adventure: Beyond the City Lights',
  excerpt:
    'From the historic streets of Cebu City to the breathtaking heights of Osmeña Peak, my first trip to the Queen City of the South was unforgettable.',
  content: `
    Cebu has always been on my bucket list. Known as the "Queen City of the South," it offers a perfect blend of urban development and natural beauty. My journey started in the heart of the city, exploring historic landmarks like Magellan's Cross and Fort San Pedro.
    
    But the real adventure began when I headed south. The rolling hills of Dalaguete led me to Osmeña Peak, the highest point in Cebu. The view from the top was unlike anything I'd ever seen—jagged rock formations stretching as far as the eye can see, with the ocean shimmering in the distance.
    
    I also visited the famous Kawasan Falls in Badian. The turquoise waters were so inviting that I couldn't resist jumping in. Canyoneering through the canyons was an adrenaline rush that I'll never forget.
    
    Cebu is more than just a destination; it's an experience that stays with you long after you've left.
  `,
  date: 'January 10, 2026',
  readTime: '6 min read',
  categories: ['Adventure', 'Nature', 'Cebu'],
  image: '/images/destinations/tops-lookout-main.jpg',
  imageAlt:
    'Scenic view of Osmeña Peak in Cebu with jagged green hills and ocean in the background',
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  relatedDestinations: ['kawasan-falls', 'tops-lookout', 'temple-of-leah'],
};
