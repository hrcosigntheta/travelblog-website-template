import { destinations } from '../src/data/destinations';

const MIN_ALT_LENGTH = 10;
const MAX_ALT_LENGTH = 125;

let errors = 0;

console.log('--- Destination Image Alt Text Validation ---');

destinations.forEach((dest) => {
  // Check hero image alt text
  if (!dest.imageAlt) {
    console.error(`ERROR: [${dest.title}] Missing hero image alt text.`);
    errors++;
  } else if (dest.imageAlt.length < MIN_ALT_LENGTH) {
    console.warn(
      `WARNING: [${dest.title}] Hero image alt text too short (${dest.imageAlt.length} chars).`
    );
  } else if (dest.imageAlt.length > MAX_ALT_LENGTH) {
    console.warn(
      `WARNING: [${dest.title}] Hero image alt text too long (${dest.imageAlt.length} chars).`
    );
  }

  // Check gallery images
  dest.images.forEach((img, index) => {
    if (!img.alt) {
      console.error(`ERROR: [${dest.title}] Missing alt text for gallery image index ${index}.`);
      errors++;
    } else if (img.alt.length < MIN_ALT_LENGTH) {
      console.warn(
        `WARNING: [${dest.title}] Gallery image alt text at index ${index} too short (${img.alt.length} chars).`
      );
    } else if (img.alt.length > MAX_ALT_LENGTH) {
      console.warn(
        `WARNING: [${dest.title}] Gallery image alt text at index ${index} too long (${img.alt.length} chars).`
      );
    }

    if (img.alt === dest.title) {
      console.warn(
        `WARNING: [${dest.title}] Gallery image alt text at index ${index} is just the destination title (not descriptive).`
      );
    }
  });
});

console.log('-------------------------------------------');
if (errors === 0) {
  console.log('SUCCESS: All images have alt text.');
  process.exit(0);
} else {
  console.error(`FAILED: Found ${errors} errors.`);
  process.exit(1);
}
