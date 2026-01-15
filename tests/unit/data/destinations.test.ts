import { describe, it, expect } from 'vitest';
import { destinations } from '../../../src/data/destinations';

describe('Destinations Data', () => {
  it('should have valid destination entries', () => {
    expect(destinations.length).toBeGreaterThan(0);
  });

  it('should have required fields for detail page', () => {
    destinations.forEach((dest) => {
      expect(dest.id).toBeDefined();
      expect(dest.slug).toBeDefined();
      expect(dest.title).toBeDefined();
      expect(dest.description).toBeDefined();
      expect(dest.image).toBeDefined();

      // Expanded fields check
      if (dest.id === '1') {
        // Only checking the full one for now
        expect(dest.images).toBeDefined();
        expect(dest.images.length).toBeGreaterThan(0);
        expect(dest.coordinates).toBeDefined();
        expect(dest.stats).toBeDefined();
        expect(dest.content).toBeDefined();
        expect(dest.highlights).toBeDefined();
        expect(dest.itinerary).toBeDefined();
        expect(dest.practicalInfo).toBeDefined();
      }
    });
  });

  it('should have unique slugs', () => {
    const slugs = destinations.map((d) => d.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
