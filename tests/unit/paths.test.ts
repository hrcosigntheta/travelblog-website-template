import { describe, it, expect } from 'vitest';
import {
  getAssetPath,
  getRoutePath,
  isExternalLink,
  isDemoLink,
  getImagePath,
} from '../../src/utils/paths';

describe('Path Utilities', () => {
  describe('getAssetPath', () => {
    it('should return path as is when BASE_PATH is empty (default in tests)', () => {
      expect(getAssetPath('/images/logo.png')).toBe('/images/logo.png');
    });

    it('should handle paths without leading slash', () => {
      expect(getAssetPath('images/logo.png')).toBe('/images/logo.png');
    });
  });

  describe('getRoutePath', () => {
    it('should resolve static routes', () => {
      expect(getRoutePath('HOME')).toBe('/');
      expect(getRoutePath('ABOUT')).toBe('/about/');
    });

    it('should throw error for dynamic routes if called incorrectly', () => {
      expect(() => getRoutePath('DESTINATION_DETAIL')).toThrow();
    });
  });

  describe('isExternalLink', () => {
    it('should identify http links', () => {
      expect(isExternalLink('http://example.com')).toBe(true);
    });

    it('should identify https links', () => {
      expect(isExternalLink('https://example.com')).toBe(true);
    });

    it('should identify mailto links', () => {
      expect(isExternalLink('mailto:test@example.com')).toBe(true);
    });

    it('should reject internal links', () => {
      expect(isExternalLink('/about')).toBe(false);
      expect(isExternalLink('about')).toBe(false);
    });
  });

  describe('isDemoLink', () => {
    it('should identify known demo domains', () => {
      expect(isDemoLink('https://instagram.com/travel')).toBe(true);
      expect(isDemoLink('https://www.booking.com/hotel')).toBe(true);
    });

    it('should reject unknown external links', () => {
      expect(isDemoLink('https://google.com')).toBe(false);
    });

    it('should reject internal links', () => {
      expect(isDemoLink('/about')).toBe(false);
    });
  });

  describe('getImagePath', () => {
    it('should resolve image path correctly', () => {
      expect(getImagePath('hero.jpg')).toBe('/assets/images/hero.jpg');
    });
  });
});
