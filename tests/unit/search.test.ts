import { describe, it, expect } from 'vitest';
import { createSearchIndex, searchDestinations } from '../../src/utils/search';
import type { Destination } from '../../src/data/destinations';

const mockDestinations: Destination[] = [
  {
    id: '1',
    slug: 'el-nido',
    title: 'El Nido',
    description: 'Beautiful lagoons and limestone cliffs',
    region: 'Palawan',
    image: '/images/el-nido.jpg',
    imageAlt: 'El Nido',
    images: [],
    tags: ['Beach', 'Island', 'Nature'],
    rating: 4.9,
    featured: true,
    author: {
      name: 'MasuRii',
      url: '/about',
      image: '/images/placeholders/people/people-1.jpg',
    },
    stats: {
      difficulty: 'Moderate',
      budget: '$$ - $$$',
      bestTime: 'Nov - May',
    },
    coordinates: { lat: 11.19, lng: 119.41 },
    content: 'Intro content...',
    highlights: [],
  },
  {
    id: '2',
    slug: 'chocolate-hills',
    title: 'Chocolate Hills',
    description: 'Famous geological formation',
    region: 'Bohol',
    image: '/images/bohol.jpg',
    imageAlt: 'Chocolate Hills',
    images: [],
    tags: ['Nature', 'Hiking'],
    rating: 4.7,
    featured: false,
    author: {
      name: 'MasuRii',
      url: '/about',
      image: '/images/placeholders/people/people-1.jpg',
    },
    stats: {
      difficulty: 'Easy',
      budget: '$',
      bestTime: 'Dec - May',
    },
    coordinates: { lat: 9.83, lng: 124.14 },
    content: 'Intro content...',
    highlights: [],
  },
];

describe('Search Utility', () => {
  it('should find destinations by title', () => {
    const index = createSearchIndex(mockDestinations);
    const results = searchDestinations(index, 'El Nido');
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('El Nido');
  });

  it('should find destinations by region', () => {
    const index = createSearchIndex(mockDestinations);
    const results = searchDestinations(index, 'Bohol');
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Chocolate Hills');
  });

  it('should find destinations by fuzzy match', () => {
    const index = createSearchIndex(mockDestinations);
    const results = searchDestinations(index, 'Choclate'); // Typo
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe('Chocolate Hills');
  });

  it('should return empty array for empty query', () => {
    const index = createSearchIndex(mockDestinations);
    const results = searchDestinations(index, '');
    expect(results).toHaveLength(0);
  });

  it('should return empty array for no matches', () => {
    const index = createSearchIndex(mockDestinations);
    const results = searchDestinations(index, 'XYZ123');
    expect(results).toHaveLength(0);
  });
});
