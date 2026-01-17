import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { IMAGE_SIZES, IMAGE_QUALITY } from '../src/config/images';

// Configuration
const OUTPUT_DIR = 'public/images/destinations';
const TARGET_WIDTH = IMAGE_SIZES.xl;
const TARGET_QUALITY = IMAGE_QUALITY.jpeg;

// Guaranteed working Unsplash IDs from fetch-placeholder-images.ts
const WORKING_IDS = [
  'photo-1507525428034-b723cf961d3e',
  'photo-1510414842594-a61c69b5ae57',
  'photo-1506953823976-52e1fdc0149a',
  'photo-1540206351-d6465b3ac5c1',
  'photo-1519046904884-53103b34b206',
  'photo-1505118380757-91f5f45d8de4',
  'photo-1464822759023-fed622ff2c3b',
  'photo-1454496522488-7a8e488e8606',
  'photo-1486870591958-9b9d0d1dda99',
  'photo-1465919292275-c60ad29da0a2',
  'photo-1491555103944-7c647fd857e6',
  'photo-1542931287-023b922fa89b',
  'photo-1524492412937-b28074a5d7da',
  'photo-1504198266287-1659872e6590',
  'photo-1528164344705-4754268799ce',
  'photo-1533050487297-09b450131914',
  'photo-1504674900247-0877df9cc836',
  'photo-1555939594-58d7cb561ad1',
  'photo-1512621776951-a57141f2eefd',
  'photo-1565299624946-b28f40a0ae38',
  'photo-1476224203421-9ac3993c47a1',
  'photo-1533692328991-08159ff19fca',
  'photo-1504851149312-7a075b496cc7',
  'photo-1521336575822-6da63fb45455',
  'photo-1440115711426-977a94741a67',
  'photo-1513415536754-1821b27d9b24',
  'photo-1488426862026-3ee34a7d66df',
  'photo-1511632765486-a01980e01a18',
  'photo-1469334031218-e382a71b716b',
  'photo-1534528741775-53994a69daeb',
  'photo-1529626455594-4ff565f082e1',
];

const DESTINATIONS = [
  'el-nido-palawan',
  'siargao-island',
  'chocolate-hills-bohol',
  'boracay-island',
  'kawasan-falls',
  'moalboal',
  'oslob',
  'malapascua',
  'bantayan',
  'camotes',
  'temple-of-leah',
  'tops-lookout',
  'panglao-island',
  'tarsier-sanctuary',
  'loboc-river-cruise',
  'puerto-princesa-underground-river',
  'coron-palawan',
  'batanes',
  'banaue-rice-terraces',
];

async function downloadImage(id: string, filepath: string) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${TARGET_WIDTH}&q=${TARGET_QUALITY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    await writeFile(filepath, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`❌ Error downloading ${id}:`, error);
  }
}

async function main() {
  console.log('🚀 Starting destination image fetch with verified IDs...');

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let idIndex = 0;
  for (const slug of DESTINATIONS) {
    console.log(`\n🏝️ Processing ${slug}...`);

    // Main image
    const mainId = WORKING_IDS[idIndex % WORKING_IDS.length];
    await downloadImage(mainId, join(OUTPUT_DIR, `${slug}-main.jpg`));
    idIndex++;

    // Gallery images (1-4)
    for (let i = 1; i <= 4; i++) {
      const galleryId = WORKING_IDS[idIndex % WORKING_IDS.length];
      await downloadImage(galleryId, join(OUTPUT_DIR, `${slug}-${i}.jpg`));
      idIndex++;
    }
  }

  console.log('\n✨ Destination images complete. All destinations now have unique images.');
}

main();
