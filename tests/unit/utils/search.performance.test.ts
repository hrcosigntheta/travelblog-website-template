import { describe, it, expect } from 'vitest';
import { createSearchIndex, searchDestinations } from '../../../src/utils/search';
import type { Destination } from '../../../src/data/destinations';

const generateDestinations = (count: number): Destination[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `dest-${i}`,
    slug: `dest-${i}`,
    title: `Destination ${i} in Philippines`,
    description: `Description for destination ${i}. It has some unique keywords like ${i % 2 === 0 ? 'Beach' : 'Mountain'} and lots of text to index.`,
    region: i % 3 === 0 ? 'Palawan' : i % 3 === 1 ? 'Cebu' : 'Bohol',
    image: 'https://example.com/image.jpg',
    imageAlt: 'Test Alt',
    rating: 4.5,
    tags: [i % 2 === 0 ? 'Beach' : 'Hiking', 'Nature', 'Adventure'],
    featured: false,
    author: {
      name: 'MasuRii',
      url: '/about',
      image: '/images/placeholders/people/people-1.jpg',
    },
    images: [],
    coordinates: { lat: 0, lng: 0 },
    stats: {
      bestTime: 'Anytime',
      budget: i % 2 === 0 ? '$' : '$$',
      difficulty: 'Easy',
    },
    highlights: ['Highlight 1', 'Highlight 2'],
    content: 'Some long content here...',
  }));
};

describe('Search Performance', () => {
  it('indexes 1000 items efficiently', () => {
    const data = generateDestinations(1000);

    const start = performance.now();
    const index = createSearchIndex(data);
    const end = performance.now();

    const duration = end - start;
    console.log(`Indexing 1000 items took ${duration.toFixed(2)}ms`);

    // Should be reasonably fast (e.g. < 50ms)
    expect(duration).toBeLessThan(100);
    expect(index).toBeDefined();
  });

  it('searches 1000 items efficiently', () => {
    const data = generateDestinations(1000);
    const index = createSearchIndex(data);

    const start = performance.now();
    const results = searchDestinations(index, 'Beach');
    const end = performance.now();

    const duration = end - start;
    console.log(`Searching "Beach" in 1000 items took ${duration.toFixed(2)}ms`);

    // Should be fast (e.g. < 100ms)
    expect(duration).toBeLessThan(100);
    // Approximately half should match "Beach" (based on tags/description)
    expect(results.length).toBeGreaterThan(400);
  });

  it('finds specific item efficiently', () => {
    const data = generateDestinations(1000);
    const index = createSearchIndex(data);

    const start = performance.now();
    // Search for a specific title at the end of the list
    const results = searchDestinations(index, 'Destination 999');
    const end = performance.now();

    const duration = end - start;
    console.log(`Specific search in 1000 items took ${duration.toFixed(2)}ms`);

    expect(duration).toBeLessThan(100);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('Destination 999');
  });
});
