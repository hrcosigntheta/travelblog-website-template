// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { getCategoryFromTags, createCustomIcon } from '@components/Map/MapIcons';

describe('MapIcons', () => {
  describe('getCategoryFromTags', () => {
    it('should return beach for beach-related tags', () => {
      expect(getCategoryFromTags(['Beach'])).toBe('beach');
      expect(getCategoryFromTags(['Island'])).toBe('beach');
      expect(getCategoryFromTags(['Surfing'])).toBe('beach');
    });

    it('should return mountain for hiking/nature tags', () => {
      expect(getCategoryFromTags(['Hiking'])).toBe('mountain');
      expect(getCategoryFromTags(['Nature'])).toBe('mountain');
    });

    it('should return cultural for culture/history tags', () => {
      expect(getCategoryFromTags(['History'])).toBe('cultural');
      expect(getCategoryFromTags(['Landmark'])).toBe('cultural');
    });

    it('should return food for culinary tags', () => {
      expect(getCategoryFromTags(['Food'])).toBe('food');
    });

    it('should return adventure for adventure tags', () => {
      expect(getCategoryFromTags(['Adventure'])).toBe('adventure');
    });

    it('should return default for unknown tags', () => {
      expect(getCategoryFromTags(['Shopping'])).toBe('default');
      expect(getCategoryFromTags([])).toBe('default');
    });

    it('should prioritize tags in order', () => {
      // Beach is checked before Mountain
      expect(getCategoryFromTags(['Beach', 'Hiking'])).toBe('beach');
    });
  });

  describe('createCustomIcon', () => {
    it('should return a Leaflet DivIcon', () => {
      const icon = createCustomIcon('beach');
      expect(icon).toHaveProperty('options');
      expect(icon.options).toHaveProperty('html');
      expect(icon.options).toHaveProperty('className', 'custom-marker-icon');
    });

    it('should include correct color for beach', () => {
      const icon = createCustomIcon('beach');
      // Ocean Blue: #006d77
      expect(icon.options.html).toContain('border-color:#006d77');
    });

    it('should include correct color for mountain', () => {
      const icon = createCustomIcon('mountain');
      // Jungle Green: #005a63 (icon color) / #83c5be (bg color)
      expect(icon.options.html).toContain('background-color:#83c5be');
    });

    it('should include hover classes', () => {
      const icon = createCustomIcon('beach');
      expect(icon.options.html).toContain('hover:scale-110');
    });
  });
});
