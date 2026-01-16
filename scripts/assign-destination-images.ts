import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { destinations } from '../src/data/destinations/index';

const PLACEHOLDERS_DIR = 'public/images/placeholders';
const DESTINATIONS_DIR = 'public/images/destinations';

if (!existsSync(DESTINATIONS_DIR)) {
  mkdirSync(DESTINATIONS_DIR, { recursive: true });
}

// Map destination tags to placeholder categories
function getCategoryForDestination(tags: string[]): string {
  const t = tags.map((s) => s.toLowerCase());
  if (t.includes('beach') || t.includes('island') || t.includes('swimming')) return 'beaches';
  if (t.includes('mountain') || t.includes('hiking') || t.includes('landscapes'))
    return 'mountains';
  if (t.includes('culture') || t.includes('history')) return 'cultural';
  if (t.includes('food') || t.includes('culinary')) return 'food';
  if (t.includes('adventure')) return 'adventure';
  return 'beaches'; // Default
}

function getRandomPlaceholder(category: string): string {
  const dir = join(PLACEHOLDERS_DIR, category);
  if (!existsSync(dir)) return '';
  const files = readdirSync(dir).filter((f) => f.endsWith('.jpg'));
  if (files.length === 0) return '';
  return join(dir, files[Math.floor(Math.random() * files.length)]);
}

console.log('🚀 Assigning placeholder images to destinations...');

destinations.forEach((dest) => {
  const category = getCategoryForDestination(dest.tags);

  // Assign main image
  const mainPlaceholder = getRandomPlaceholder(category);
  if (mainPlaceholder) {
    const target = join(DESTINATIONS_DIR, `${dest.id}-main.jpg`);
    copyFileSync(mainPlaceholder, target);
    console.log(`✅ Assigned main image for ${dest.id}`);
  }

  // Assign gallery images
  for (let i = 1; i <= 4; i++) {
    // Pick random category for diversity in gallery
    const randomCat = ['beaches', 'mountains', 'cultural', 'food', 'adventure', 'people'][
      Math.floor(Math.random() * 6)
    ];
    const galleryPlaceholder = getRandomPlaceholder(randomCat);
    if (galleryPlaceholder) {
      const target = join(DESTINATIONS_DIR, `${dest.id}-${i}.jpg`);
      copyFileSync(galleryPlaceholder, target);
    }
  }
  console.log(`✅ Assigned gallery images for ${dest.id}`);
});

console.log('✨ Image assignment complete!');
