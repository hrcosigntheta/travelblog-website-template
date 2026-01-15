export interface Destination {
  id: string;
  slug: string;
  title: string;
  description: string;
  region: string;
  image: string;
  rating: number;
  tags: string[];
  featured: boolean;
}

export const destinations: Destination[] = [
  {
    id: '1',
    slug: 'el-nido-palawan',
    title: 'El Nido, Palawan',
    description: 'Stunning limestone cliffs and crystal clear waters.',
    region: 'Palawan',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
    rating: 4.9,
    tags: ['Beach', 'Island Hopping', 'Nature'],
    featured: true,
  },
  {
    id: '2',
    slug: 'siargao-island',
    title: 'Siargao Island',
    description: 'The surfing capital of the Philippines.',
    region: 'Surigao del Norte',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86', // Placeholder
    rating: 4.8,
    tags: ['Surfing', 'Beach', 'Nightlife'],
    featured: true,
  },
  {
    id: '3',
    slug: 'chocolate-hills-bohol',
    title: 'Chocolate Hills, Bohol',
    description: 'Unique geological formation of over 1,200 hills.',
    region: 'Bohol',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86', // Placeholder
    rating: 4.7,
    tags: ['Nature', 'Hiking', 'Sightseeing'],
    featured: true,
  },
  {
    id: '4',
    slug: 'boracay-island',
    title: 'Boracay Island',
    description: 'Famous for its White Beach and vibrant nightlife.',
    region: 'Aklan',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86', // Placeholder
    rating: 4.6,
    tags: ['Beach', 'Party', 'Luxury'],
    featured: false,
  },
];
