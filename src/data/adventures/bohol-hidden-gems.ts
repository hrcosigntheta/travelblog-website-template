import type { Adventure } from './types';

export const boholHiddenGems: Adventure = {
  id: 'bohol-adventure-1',
  slug: 'hidden-gems-of-bohol',
  title: 'Hidden Gems of Bohol: Beyond the Chocolate Hills',
  excerpt:
    'While the Chocolate Hills are a must-see, Bohol has so much more to offer. From secret waterfalls to enchanting river cruises.',
  content: `
    Bohol is an island province that surprised me with its diversity. Of course, I visited the iconic Chocolate Hills, and seeing those symmetrical mounds turn brown in the summer was a sight to behold.
    
    But I also discovered some hidden gems. The Tarsier Sanctuary in Corella allowed me to see the world's smallest primates in their natural habitat (from a respectful distance, of course).
    
    One of my favorite experiences was the Loboc River cruise. Having lunch on a floating restaurant while being serenaded by local musicians as we cruised through the lush jungle was incredibly relaxing.
    
    I also spent some time on Panglao Island, which has some of the best beaches in the country. Alona Beach is famous, but I found some smaller, quieter beaches that were perfect for sunset watching.
    
    Bohol is a perfect mix of adventure, culture, and relaxation.
  `,
  date: 'January 20, 2026',
  readTime: '5 min read',
  categories: ['Adventure', 'Culture', 'Bohol'],
  image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf',
  imageAlt: 'The famous Chocolate Hills of Bohol under a clear blue sky',
  relatedDestinations: ['chocolate-hills-bohol', 'panglao-island', 'loboc-river-cruise'],
};
