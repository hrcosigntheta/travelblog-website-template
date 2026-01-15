/**
 * Common test fixtures and mock data.
 */

export const MOCK_DESTINATIONS = [
  {
    id: '1',
    title: 'El Nido, Palawan',
    slug: 'el-nido-palawan',
    region: 'Palawan',
    category: 'Beaches & Islands',
    description: 'A tropical paradise known for its limestone cliffs and crystal-clear waters.',
    imageUrl: '/images/el-nido.jpg',
    stats: {
      budget: 'Mid-range',
      difficulty: 'Easy',
      bestTime: 'Dry Season (Nov-May)',
    },
    tags: ['Beach', 'Island Hopping', 'Snorkeling'],
  },
  {
    id: '2',
    title: 'Mount Pulag',
    slug: 'mount-pulag',
    region: 'Luzon',
    category: 'Mountains & Hiking',
    description: 'The third highest mountain in the Philippines, famous for its sea of clouds.',
    imageUrl: '/images/mt-pulag.jpg',
    stats: {
      budget: 'Budget',
      difficulty: 'Moderate',
      bestTime: 'Nov-Apr',
    },
    tags: ['Hiking', 'Mountain', 'Camping'],
  },
];

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'Top 10 Things to Do in Cebu',
    slug: 'top-10-things-cebu',
    excerpt: 'Discover the best activities in the Queen City of the South.',
    author: 'MasuRii',
    date: '2026-01-15',
    category: 'Travel Guide',
  },
];
