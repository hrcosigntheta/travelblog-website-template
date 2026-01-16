import { describe, test, expect } from 'vitest';
import { adventures } from '../../../src/data/adventures';

describe('Adventure Data Validation', () => {
  test('all adventures have required fields', () => {
    adventures.forEach((adventure) => {
      expect(adventure.id).toBeDefined();
      expect(typeof adventure.id).toBe('string');
      expect(adventure.id.length).toBeGreaterThan(0);

      expect(adventure.slug).toBeDefined();
      expect(typeof adventure.slug).toBe('string');
      expect(adventure.slug.length).toBeGreaterThan(0);

      expect(adventure.title).toBeDefined();
      expect(typeof adventure.title).toBe('string');
      expect(adventure.title.length).toBeGreaterThan(0);

      expect(adventure.excerpt).toBeDefined();
      expect(typeof adventure.excerpt).toBe('string');
      expect(adventure.excerpt.length).toBeGreaterThan(0);

      expect(adventure.content).toBeDefined();
      expect(typeof adventure.content).toBe('string');
      expect(adventure.content.length).toBeGreaterThan(0);

      expect(adventure.date).toBeDefined();
      expect(typeof adventure.date).toBe('string');

      expect(adventure.readTime).toBeDefined();
      expect(typeof adventure.readTime).toBe('string');

      expect(adventure.categories).toBeDefined();
      expect(Array.isArray(adventure.categories)).toBe(true);
      expect(adventure.categories.length).toBeGreaterThan(0);

      expect(adventure.image).toBeDefined();
      expect(typeof adventure.image).toBe('string');
      expect(adventure.image.startsWith('http') || adventure.image.startsWith('/')).toBe(true);

      expect(adventure.imageAlt).toBeDefined();
      expect(typeof adventure.imageAlt).toBe('string');
      expect(adventure.imageAlt.length).toBeGreaterThan(10);

      expect(adventure.relatedDestinations).toBeDefined();
      expect(Array.isArray(adventure.relatedDestinations)).toBe(true);
    });
  });

  test('slugs are unique', () => {
    const slugs = adventures.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
