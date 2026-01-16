import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = 'src/data/destinations';

const files = readdirSync(DATA_DIR).filter(
  (f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts'
);

files.forEach((file) => {
  const filePath = join(DATA_DIR, file);
  let content = readFileSync(filePath, 'utf8');

  // Extract variable name to use as base for ID if ID is numeric
  const varMatch = content.match(/export const (\w+): Destination/);
  if (!varMatch) return;
  const varName = varMatch[1];
  const suggestedId = varName.replace(/([A-Z])/g, '-$1').toLowerCase(); // camelCase to kebab-case

  // Fix ID if it's numeric or '1'/'3'
  content = content.replace(/id: ['"](\d+)['"]/, `id: '${suggestedId}'`);

  // Replace external Unsplash URLs with local paths
  // Find the 'id' value in the updated content
  const idMatch = content.match(/id: ['"]([^'"]+)['"]/);
  if (!idMatch) return;
  const id = idMatch[1];

  // Fix main image
  content = content.replace(
    /image: 'https:\/\/images\.unsplash\.com\/[^']+'/,
    `image: '/images/destinations/${id}-main.jpg'`
  );

  // Fix images array
  content = content.replace(
    /images: \[\s*['"]https:\/\/images\.unsplash\.com\/[^\]]+\s*\]/g,
    () => {
      return `images: [
    '/images/destinations/${id}-1.jpg',
    '/images/destinations/${id}-2.jpg',
    '/images/destinations/${id}-3.jpg',
    '/images/destinations/${id}-4.jpg',
  ]`;
    }
  );

  writeFileSync(filePath, content);
  console.log(`✅ Normalized ${file}`);
});
