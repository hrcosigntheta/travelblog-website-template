import fs from 'fs';
import path from 'path';
import { destinations } from '../src/data/destinations/index';
import { adventures } from '../src/data/adventures/index';
import { bloggerProfile } from '../src/data/blogger';
import type { Destination } from '../src/data/destinations/types';
import type { Adventure } from '../src/data/adventures/types';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const MIN_ALT_LENGTH = 10;
const MAX_ALT_LENGTH = 125;

const errors: string[] = [];
const warnings: string[] = [];

function logError(message: string) {
  errors.push(message);
  console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
}

function logWarning(message: string) {
  warnings.push(message);
  console.warn(`\x1b[33m[WARNING]\x1b[0m ${message}`);
}

function checkFileExists(filePath: string, context: string) {
  if (!filePath) {
    logError(`Empty file path in ${context}`);
    return;
  }
  if (filePath.startsWith('http')) return; // Skip external links

  const absolutePath = path.join(PUBLIC_DIR, filePath);
  if (!fs.existsSync(absolutePath)) {
    logError(`File not found: ${filePath} (referenced in ${context})`);
  }
}

function checkAltText(alt: string, context: string, title?: string) {
  if (!alt) {
    logError(`Missing alt text in ${context}`);
  } else if (alt.length < MIN_ALT_LENGTH) {
    logWarning(`Alt text too short (${alt.length} chars) in ${context}`);
  } else if (alt.length > MAX_ALT_LENGTH) {
    logWarning(`Alt text too long (${alt.length} chars) in ${context}`);
  }

  if (title && alt === title) {
    logWarning(`Alt text is identical to title in ${context} (not descriptive)`);
  }
}

function checkInternalLink(slug: string, validSlugs: Set<string>, context: string) {
  if (!validSlugs.has(slug)) {
    logError(`Invalid related destination slug: "${slug}" (referenced in ${context})`);
  }
}

function scanForHardcodedPaths(content: string, context: string) {
  if (!content) return;
  const routeRegex = /href="(\/(destinations|about|contact|gallery|map)[^"]*)"/g;
  let match;
  while ((match = routeRegex.exec(content)) !== null) {
    logWarning(`Hardcoded path found in HTML content: "${match[1]}" (in ${context}).`);
  }
}

async function validate() {
  console.log('--- Starting Comprehensive Data Validation ---');

  const destinationSlugs = new Set<string>(destinations.map((d: Destination) => d.slug));

  // 1. Validate Destinations
  destinations.forEach((dest: Destination) => {
    const context = `Destination: ${dest.slug}`;

    // Required fields
    if (!dest.id) logError(`Missing id in ${context}`);
    if (!dest.title) logError(`Missing title in ${context}`);
    if (!dest.description) logError(`Missing description in ${context}`);
    if (!dest.region) logError(`Missing region in ${context}`);
    if (!dest.stats) logError(`Missing stats in ${context}`);
    if (dest.stats) {
      if (!dest.stats.bestTime) logError(`Missing stats.bestTime in ${context}`);
      if (!dest.stats.budget) logError(`Missing stats.budget in ${context}`);
      if (!dest.stats.difficulty) logError(`Missing stats.difficulty in ${context}`);
    }

    // Coordinates
    if (dest.coordinates) {
      const { lat, lng } = dest.coordinates;
      if (lat < -90 || lat > 90) logError(`Invalid latitude ${lat} in ${context}`);
      if (lng < -180 || lng > 180) logError(`Invalid longitude ${lng} in ${context}`);
    } else {
      logError(`Missing coordinates in ${context}`);
    }

    // Images
    checkFileExists(dest.image, `${context} (hero)`);
    checkAltText(dest.imageAlt, `${context} (hero)`, dest.title);

    if (dest.images) {
      dest.images.forEach((img, index) => {
        checkFileExists(img.src, `${context} (gallery index ${index})`);
        checkAltText(img.alt, `${context} (gallery index ${index})`, dest.title);
      });
    } else {
      logError(`Missing images array in ${context}`);
    }

    // Itinerary
    if (dest.itinerary) {
      dest.itinerary.forEach((day, dayIndex) => {
        if (!day.title) logError(`Missing title in ${context} (day ${dayIndex})`);
        day.activities.forEach((activity, actIndex) => {
          if (!activity.title)
            logError(`Missing activity title in ${context} (day ${dayIndex}, act ${actIndex})`);
        });
      });
    }

    // Content
    scanForHardcodedPaths(dest.content, context);
  });

  // 2. Validate Adventures
  adventures.forEach((adv: Adventure) => {
    const context = `Adventure: ${adv.slug}`;

    if (!adv.title) logError(`Missing title in ${context}`);
    if (!adv.excerpt) logError(`Missing excerpt in ${context}`);
    if (!adv.content) logError(`Missing content in ${context}`);

    checkFileExists(adv.image, context);
    checkAltText(adv.imageAlt, context, adv.title);

    if (adv.relatedDestinations) {
      adv.relatedDestinations.forEach((slug: string) => {
        checkInternalLink(slug, destinationSlugs, context);
      });
    }

    scanForHardcodedPaths(adv.content, context);
  });

  // 3. Validate Blogger Profile
  if (bloggerProfile) {
    const context = 'Blogger Profile';
    if (!bloggerProfile.name) logError(`Missing name in ${context}`);
    checkFileExists(bloggerProfile.portraitSrc, context);
    checkFileExists(bloggerProfile.heroSrc, context);
  } else {
    logError('Blogger profile data missing');
  }

  console.log('\nValidation Summary:');
  console.log(`- Destinations checked: ${destinations.length}`);
  console.log(`- Adventures checked: ${adventures.length}`);
  console.log(`- Errors: ${errors.length}`);
  console.log(`- Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\n\x1b[31mValidation FAILED.\x1b[0m');
    process.exit(1);
  } else {
    console.log('\n\x1b[32mValidation PASSED.\x1b[0m');
    if (warnings.length > 0) {
      console.log('Please review the warnings above.');
    }
  }
}

validate().catch((err) => {
  console.error('Validation script failed unexpectedly:', err);
  process.exit(1);
});
