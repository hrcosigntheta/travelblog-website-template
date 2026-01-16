import { describe, it, expect } from 'vitest';
import { generateDestinationSchema, generateCollectionPageSchema } from '../../src/utils/schema';
import type { Destination } from '../../src/data/destinations';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('generateCollectionPageSchema', () => {
  const title = 'Test Collection';
  const description = 'Test Description';
  const url = 'https://mysite.com/collection';

  it('generates valid CollectionPage schema', () => {
    const schema = generateCollectionPageSchema(title, description, url);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('CollectionPage');
    expect(schema.name).toBe(title);
    expect(schema.description).toBe(description);
    expect(schema.url).toBe(url);
  });

  it('includes isPartOf WebSite', () => {
    const schema = generateCollectionPageSchema(title, description, url);
    expect(schema.isPartOf).toBeDefined();
    expect(schema.isPartOf['@type']).toBe('WebSite');
    expect(schema.isPartOf.name).toBe('Philippines Travel Blog');
  });
});

describe('generateDestinationSchema', () => {
  const mockDestination: Destination = {
    id: '1',
    slug: 'test-dest',
    title: 'Test Destination',
    description: 'A test description',
    region: 'Test Region',
    image: 'https://example.com/image.jpg',
    rating: 5,
    tags: ['Test'],
    featured: false,
    imageAlt: 'Test Image Alt',
    images: [
      { src: 'https://example.com/image1.jpg', alt: 'Alt 1' },
      { src: '/image2.jpg', alt: 'Alt 2' },
    ],
    coordinates: { lat: 10, lng: 120 },
    stats: { bestTime: 'Now', budget: '$', difficulty: 'Easy' },
    content: '<p>Content</p>',
    highlights: ['Highlight 1'],
  };

  const siteUrl = 'https://mysite.com/destinations/test-dest';

  it('generates valid schema structure', () => {
    const schema = generateDestinationSchema(mockDestination, siteUrl);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph']).toBeDefined();
    expect(schema['@graph']).toHaveLength(2);
  });

  it('includes TouristDestination schema with correct data', () => {
    const schema = generateDestinationSchema(mockDestination, siteUrl);
    const destSchema = schema['@graph'].find(
      (item) => item['@type'] === 'TouristDestination'
    ) as any;

    expect(destSchema).toBeDefined();
    expect(destSchema.name).toBe(mockDestination.title);
    expect(destSchema.description).toBe(mockDestination.description);
    expect(destSchema.url).toBe(siteUrl);
    expect(destSchema.geo.latitude).toBe(mockDestination.coordinates.lat);
    expect(destSchema.address.addressLocality).toBe(mockDestination.region);
    expect(destSchema['@id']).toBe(`${siteUrl}#destination`);
  });

  it('includes ImageGallery schema', () => {
    const schema = generateDestinationSchema(mockDestination, siteUrl);
    const gallerySchema = schema['@graph'].find((item) => item['@type'] === 'ImageGallery') as any;

    expect(gallerySchema).toBeDefined();
    expect(gallerySchema.name).toBe(`Photos of ${mockDestination.title}`);
    expect(gallerySchema.url).toBe(`${siteUrl}#gallery`);
    expect(gallerySchema.about['@id']).toBe(`${siteUrl}#destination`);
  });

  it('resolves image URLs correctly', () => {
    const schema = generateDestinationSchema(mockDestination, siteUrl);
    const destSchema = schema['@graph'].find(
      (item) => item['@type'] === 'TouristDestination'
    ) as any;

    expect(destSchema.image).toContain('https://example.com/image1.jpg');
    // Absolute URL resolution check
    // new URL('/image2.jpg', 'https://mysite.com/destinations/test-dest') results in 'https://mysite.com/image2.jpg'
    expect(destSchema.image).toContain('https://mysite.com/image2.jpg');
  });
});
