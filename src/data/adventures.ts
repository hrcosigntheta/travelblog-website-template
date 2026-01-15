export interface Adventure {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const adventures: Adventure[] = [
  {
    id: '1',
    slug: 'island-hopping-coron',
    title: 'Island Hopping in Coron: A Visual Guide',
    excerpt:
      'Discover the emerald lagoons and limestone cliffs of Coron, Palawan. From Kayangan Lake to Twin Lagoon.',
    date: 'March 15, 2026',
    readTime: '5 min read',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
  },
  {
    id: '2',
    slug: 'cebu-lechon-hunt',
    title: 'The Hunt for the Best Lechon in Cebu',
    excerpt:
      'We tasted our way through Cebu City to find the crispiest skin and most flavorful meat. Here are our top picks.',
    date: 'February 28, 2026',
    readTime: '8 min read',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  },
  {
    id: '3',
    slug: 'hiking-mt-pulag',
    title: 'Chasing the Sea of Clouds in Mt. Pulag',
    excerpt:
      'A beginner’s guide to hiking Luzon’s highest peak. Preparation, gear, and what to expect on the trail.',
    date: 'January 10, 2026',
    readTime: '6 min read',
    category: 'Hiking',
    image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1',
  },
  {
    id: '4',
    slug: 'intramuros-walking-tour',
    title: 'Walking Through History in Intramuros',
    excerpt:
      'Exploring the walled city of Manila. Fort Santiago, San Agustin Church, and hidden courtyards.',
    date: 'December 05, 2025',
    readTime: '4 min read',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1583095117942-8c9a3a9d9c9a',
  },
];
