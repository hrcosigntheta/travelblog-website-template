import { describe, test, expect } from 'vitest';
import { destinations } from '../../../src/data/destinations';

describe('Destination Data Validation', () => {
  test('all destinations have required fields', () => {
    destinations.forEach((destination) => {
      expect(destination.id).toBeDefined();
      expect(typeof destination.id).toBe('string');
      expect(destination.id.length).toBeGreaterThan(0);

      expect(destination.slug).toBeDefined();
      expect(typeof destination.slug).toBe('string');
      expect(destination.slug.length).toBeGreaterThan(0);

      expect(destination.title).toBeDefined();
      expect(typeof destination.title).toBe('string');
      expect(destination.title.length).toBeGreaterThan(0);

      expect(destination.description).toBeDefined();
      expect(typeof destination.description).toBe('string');
      expect(destination.description.length).toBeGreaterThan(0);

      expect(destination.region).toBeDefined();
      expect(typeof destination.region).toBe('string');
      expect(destination.region.length).toBeGreaterThan(0);

      expect(destination.image).toBeDefined();
      expect(typeof destination.image).toBe('string');
      expect(destination.image.length).toBeGreaterThan(0);

      expect(destination.rating).toBeDefined();
      expect(typeof destination.rating).toBe('number');
      expect(destination.rating).toBeGreaterThanOrEqual(0);
      expect(destination.rating).toBeLessThanOrEqual(5);

      expect(destination.tags).toBeDefined();
      expect(Array.isArray(destination.tags)).toBe(true);
      expect(destination.tags.length).toBeGreaterThan(0);

      expect(destination.featured).toBeDefined();
      expect(typeof destination.featured).toBe('boolean');

      expect(destination.images).toBeDefined();
      expect(Array.isArray(destination.images)).toBe(true);
      expect(destination.images.length).toBeGreaterThan(0);

      expect(destination.coordinates).toBeDefined();
      expect(typeof destination.coordinates.lat).toBe('number');
      expect(typeof destination.coordinates.lng).toBe('number');

      expect(destination.stats).toBeDefined();
      expect(typeof destination.stats.bestTime).toBe('string');
      expect(typeof destination.stats.budget).toBe('string');
      expect(typeof destination.stats.difficulty).toBe('string');

      expect(destination.content).toBeDefined();
      expect(typeof destination.content).toBe('string');
      expect(destination.content.length).toBeGreaterThan(0);

      expect(destination.highlights).toBeDefined();
      expect(Array.isArray(destination.highlights)).toBe(true);
      expect(destination.highlights.length).toBeGreaterThan(0);
    });
  });

  test('coordinates are valid', () => {
    destinations.forEach((destination) => {
      const { lat, lng } = destination.coordinates;
      expect(lat).toBeGreaterThanOrEqual(-90);
      expect(lat).toBeLessThanOrEqual(90);
      expect(lng).toBeGreaterThanOrEqual(-180);
      expect(lng).toBeLessThanOrEqual(180);
    });
  });

  test('images have valid URLs', () => {
    destinations.forEach((destination) => {
      expect(destination.image.startsWith('http') || destination.image.startsWith('/')).toBe(true);

      destination.images.forEach((img) => {
        expect(img.startsWith('http') || img.startsWith('/')).toBe(true);
      });
    });
  });
});
