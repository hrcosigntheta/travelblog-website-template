import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { destinations } from '../../../src/data/destinations/index';
import { adventures } from '../../../src/data/adventures/index';
import { bloggerProfile } from '../../../src/data/blogger';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const MIN_ALT_LENGTH = 10;

describe('Comprehensive Data Validation', () => {
  const destinationSlugs = new Set(destinations.map((d) => d.slug));

  describe('Destinations', () => {
    destinations.forEach((dest) => {
      it(`validates destination: ${dest.slug}`, () => {
        expect(dest.id).toBeDefined();
        expect(dest.title).toBeDefined();
        expect(dest.description).toBeDefined();
        expect(dest.region).toBeDefined();

        // Stats
        expect(dest.stats).toBeDefined();
        expect(dest.stats.bestTime).toBeDefined();
        expect(dest.stats.budget).toBeDefined();
        expect(dest.stats.difficulty).toBeDefined();

        // Coordinates
        expect(dest.coordinates).toBeDefined();
        expect(dest.coordinates.lat).toBeGreaterThanOrEqual(-90);
        expect(dest.coordinates.lat).toBeLessThanOrEqual(90);
        expect(dest.coordinates.lng).toBeGreaterThanOrEqual(-180);
        expect(dest.coordinates.lng).toBeLessThanOrEqual(180);

        // Images
        if (!dest.image.startsWith('http')) {
          expect(fs.existsSync(path.join(PUBLIC_DIR, dest.image))).toBe(true);
        }
        expect(dest.imageAlt.length).toBeGreaterThanOrEqual(MIN_ALT_LENGTH);

        dest.images.forEach((img) => {
          if (!img.src.startsWith('http')) {
            expect(fs.existsSync(path.join(PUBLIC_DIR, img.src))).toBe(true);
          }
          expect(img.alt.length).toBeGreaterThanOrEqual(MIN_ALT_LENGTH);
        });

        // Content
        expect(dest.content).toBeDefined();
        expect(dest.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Adventures', () => {
    adventures.forEach((adv) => {
      it(`validates adventure: ${adv.slug}`, () => {
        expect(adv.title).toBeDefined();
        expect(adv.excerpt).toBeDefined();
        expect(adv.content).toBeDefined();

        if (!adv.image.startsWith('http')) {
          expect(fs.existsSync(path.join(PUBLIC_DIR, adv.image))).toBe(true);
        }
        expect(adv.imageAlt.length).toBeGreaterThanOrEqual(MIN_ALT_LENGTH);

        if (adv.relatedDestinations) {
          adv.relatedDestinations.forEach((slug) => {
            expect(destinationSlugs.has(slug)).toBe(true);
          });
        }
      });
    });
  });

  describe('Blogger Profile', () => {
    it('validates blogger profile', () => {
      expect(bloggerProfile.name).toBeDefined();
      if (!bloggerProfile.portraitSrc.startsWith('http')) {
        expect(fs.existsSync(path.join(PUBLIC_DIR, bloggerProfile.portraitSrc))).toBe(true);
      }
      if (!bloggerProfile.heroSrc.startsWith('http')) {
        expect(fs.existsSync(path.join(PUBLIC_DIR, bloggerProfile.heroSrc))).toBe(true);
      }
    });
  });
});
