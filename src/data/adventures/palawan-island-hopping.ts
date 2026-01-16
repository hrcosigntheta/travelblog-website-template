import type { Adventure } from './types';

export const palawanIslandHopping: Adventure = {
  id: 'palawan-adventure-1',
  slug: 'island-hopping-in-palawan',
  title: 'Island Hopping in Palawan: Paradise Found',
  excerpt:
    'Crystal clear lagoons, hidden beaches, and majestic limestone cliffs. Exploring El Nido and Coron was like stepping into a dream.',
  content: `
    Palawan has been consistently voted as one of the most beautiful islands in the world, and it's easy to see why. My island hopping adventure began in El Nido, where I explored the Big Lagoon and Small Lagoon. Gliding through the calm, turquoise waters on a kayak was a serene experience.
    
    The limestone formations are truly majestic, rising sharply from the ocean and creating a dramatic backdrop. I also visited Secret Beach, which requires swimming through a small hole in a rock wall—a true "Indiana Jones" moment!
    
    After El Nido, I headed to Coron. The highlights there were Kayangan Lake, often called the cleanest lake in Asia, and Twin Lagoon. Snorkeling over the Japanese shipwrecks from WWII was both eerie and fascinating.
    
    Palawan is a place where nature's beauty is on full display, and it's a must-visit for any traveler to the Philippines.
  `,
  date: 'January 15, 2026',
  readTime: '7 min read',
  categories: ['Island Hopping', 'Nature', 'Palawan'],
  image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62',
  imageAlt: 'Beautiful Big Lagoon in El Nido, Palawan with clear blue water and limestone cliffs',
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  relatedDestinations: ['el-nido-palawan', 'coron-palawan'],
};
