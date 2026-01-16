import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { IMAGE_SIZES, IMAGE_QUALITY } from '../src/config/images';

// Configuration
const OUTPUT_DIR = 'public/images/placeholders';
const TARGET_WIDTH = IMAGE_SIZES.xl;
const TARGET_QUALITY = IMAGE_QUALITY.jpeg;

// Categories based on PRD and Research
// These are curated Unsplash IDs that match the "Travel Blog" aesthetic
// 40/60 split of Scenery vs Human elements as per strategy
const CATEGORIES = {
  beaches: [
    'photo-1507525428034-b723cf961d3e', // Beach scenery
    'photo-1510414842594-a61c69b5ae57', // Palm trees
    'photo-1506953823976-52e1fdc0149a', // Coastline
    'photo-1540206351-d6465b3ac5c1', // Ocean water
    'photo-1519046904884-53103b34b206', // Sunset beach
    'photo-1505118380757-91f5f45d8de4', // Tropical island
  ],
  mountains: [
    'photo-1464822759023-fed622ff2c3b', // Mountain range
    'photo-1454496522488-7a8e488e8606', // Hiker on mountain (Human)
    'photo-1486870591958-9b9d0d1dda99', // Mountain lake
    'photo-1465919292275-c60ad29da0a2', // Foggy mountains
    'photo-1491555103944-7c647fd857e6', // Mountain peaks
  ],
  cultural: [
    'photo-1542931287-023b922fa89b', // Asian temple
    'photo-1524492412937-b28074a5d7da', // Street market
    'photo-1504198266287-1659872e6590', // Lanterns
    'photo-1528164344705-4754268799ce', // Traditional architecture
    'photo-1533050487297-09b450131914', // Cultural festival
  ],
  food: [
    'photo-1504674900247-0877df9cc836', // Plated food
    'photo-1555939594-58d7cb561ad1', // BBQ/Grill
    'photo-1512621776951-a57141f2eefd', // Healthy bowl
    'photo-1565299624946-b28f40a0ae38', // Pizza/Global
    'photo-1476224203421-9ac3993c47a1', // Seafood
  ],
  adventure: [
    'photo-1533692328991-08159ff19fca', // Surfing (Human)
    'photo-1504851149312-7a075b496cc7', // Camping
    'photo-1521336575822-6da63fb45455', // Hiking trail
    'photo-1440115711426-977a94741a67', // Rock climbing (Human)
    'photo-1513415536754-1821b27d9b24', // Scuba diving (Human)
  ],
  people: [
    'photo-1488426862026-3ee34a7d66df', // Local portrait (Human)
    'photo-1511632765486-a01980e01a18', // Group of friends (Human)
    'photo-1469334031218-e382a71b716b', // Girl traveling (Human)
    'photo-1534528741775-53994a69daeb', // Portrait 2 (Human)
    'photo-1529626455594-4ff565f082e1', // Portrait 3 (Human)
  ],
};

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
  console.log('🚀 Starting placeholder image fetch...');
  console.log(`Target: ${OUTPUT_DIR}`);
  console.log(`Quality: ${TARGET_QUALITY}, Width: ${TARGET_WIDTH}`);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const tasks: Promise<void>[] = [];

  for (const [category, ids] of Object.entries(CATEGORIES)) {
    const categoryDir = join(OUTPUT_DIR, category);
    if (!existsSync(categoryDir)) {
      mkdirSync(categoryDir, { recursive: true });
    }

    ids.forEach((id, index) => {
      const filename = `${category}-${index + 1}.jpg`;
      const filepath = join(categoryDir, filename);
      if (!existsSync(filepath)) {
        tasks.push(downloadImage(id, filepath));
      } else {
        console.log(`⏭️  Skipped (exists): ${filepath}`);
      }
    });
  }

  try {
    await Promise.all(tasks);
    console.log(`✨ Process complete. ${tasks.length} new images downloaded.`);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
