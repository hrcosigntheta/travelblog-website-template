import fs from 'fs';
import path from 'path';
import { destinations } from '../src/data/destinations/index';
import { adventures } from '../src/data/adventures/index';
import type { Destination } from '../src/data/destinations/types';
import type { Adventure } from '../src/data/adventures/types';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

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

function checkInternalLink(slug: string, validSlugs: Set<string>, context: string) {
  if (!validSlugs.has(slug)) {
    logError(`Invalid related destination slug: "${slug}" (referenced in ${context})`);
  }
}

function scanForHardcodedPaths(content: string, context: string) {
  if (!content) return;
  // Regex to find things like /destinations/something or /about
  const routeRegex = /href="(\/(destinations|about|contact|gallery|map)[^"]*)"/g;
  let match;
  while ((match = routeRegex.exec(content)) !== null) {
    logWarning(
      `Hardcoded path found in HTML content: "${match[1]}" (in ${context}). Consider using path helpers if this is rendered via a component that supports them.`
    );
  }
}

async function validate() {
  console.log('Starting internal link and data validation...');

  const destinationSlugs = new Set<string>(destinations.map((d: Destination) => d.slug));

  // 1. Validate Destinations
  destinations.forEach((dest: Destination) => {
    const context = `Destination: ${dest.slug}`;

    // Check main image
    checkFileExists(dest.image, context);

    // Check gallery images
    if (dest.images) {
      dest.images.forEach((img: { src: string; alt: string } | string, index: number) => {
        // Handle both old string format and new object format if transition is in progress
        const src = typeof img === 'string' ? img : img.src;
        checkFileExists(src, `${context} (gallery index ${index})`);
      });
    }

    // Scan content for hardcoded links
    scanForHardcodedPaths(dest.content, context);
  });

  // 2. Validate Adventures
  adventures.forEach((adv: Adventure) => {
    const context = `Adventure: ${adv.slug}`;

    // Check main image
    checkFileExists(adv.image, context);

    // Check related destinations
    if (adv.relatedDestinations) {
      adv.relatedDestinations.forEach((slug: string) => {
        checkInternalLink(slug, destinationSlugs, context);
      });
    }

    // Scan content for hardcoded links
    scanForHardcodedPaths(adv.content, context);
  });

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
