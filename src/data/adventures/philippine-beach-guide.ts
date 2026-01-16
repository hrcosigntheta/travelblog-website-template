import type { Adventure } from './types';

export const philippineBeachGuide: Adventure = {
  id: 'beach-guide-1',
  slug: 'ultimate-philippine-beach-guide',
  title: 'The Ultimate Philippine Beach Guide: Where to Find the Whitest Sand',
  excerpt:
    'From Boracay to Siargao, we rank the best beaches in the Philippines based on sand quality, water clarity, and overall vibe.',
  content: `
    The Philippines is an archipelago of over 7,000 islands, which means it has some of the best beaches in the world. But with so many options, where should you go?
    
    Boracay's White Beach is the gold standard. Its powdery white sand is so fine that it never gets hot, even in the midday sun. It's the perfect place for those who want a mix of natural beauty and vibrant nightlife.
    
    If you're looking for something more rugged and raw, Siargao is the place. While famous for its surf breaks like Cloud 9, it also has stunning beaches like Alegria and the nearby Guyam Island.
    
    Bantayan Island in Cebu is another favorite of mine. It has a very laid-back vibe and the sand is just as white as Boracay's but without the crowds.
    
    Finally, don't overlook the beaches of Batanes. They might not have the tropical palm trees you'd expect, but the boulder beaches and dramatic cliffs are breathtakingly beautiful in a different way.
    
    No matter which beach you choose, you're sure to find a piece of paradise in the Philippines.
  `,
  date: 'January 25, 2026',
  readTime: '8 min read',
  categories: ['Beaches', 'Guide', 'Philippines'],
  image: '/images/destinations/boracay-island-main.jpg',
  imageAlt:
    'Pristine white sand beach in the Philippines with leaning palm trees and crystal clear water',
  author: {
    name: 'MasuRii',
    url: '/about',
    image: '/images/placeholders/people/people-1.jpg',
  },
  relatedDestinations: ['boracay-island', 'siargao-island', 'bantayan', 'batanes'],
};
