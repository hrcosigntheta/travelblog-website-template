import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { IMAGE_SIZES, IMAGE_QUALITY } from '../src/config/images';

// Configuration
const OUTPUT_DIR = 'public/images/gear';
const TARGET_WIDTH = IMAGE_SIZES.lg; // 800px is enough for gear thumbnails
const TARGET_QUALITY = IMAGE_QUALITY.jpeg;

// Gear Items with Unsplash IDs from prd.json (or best matches)
const GEAR_IMAGES = {
  'camera-sony-a7iv': 'photo-1621330396173-e41b1cafd17f', // Sony camera
  'lens-sony-16-35gm': 'photo-1617005082133-548c4dd27f35', // camera lens
  'drone-dji-mavic3': 'photo-1473968512647-3e447244af8f', // drone in flight
  'action-cam-gopro11': 'photo-1526170375885-4d8ecf77b99f', // action camera
  'bag-wandrd-prvke': 'photo-1553062407-98eeb64c6a62', // camera backpack
  'tripod-peak-design': 'photo-1598618443855-232ee0f819f6', // travel tripod
  'laptop-macbook-pro': 'photo-1517336714731-489689fd1ca8', // MacBook laptop
  'powerbank-anker': 'photo-1609091839311-d5365f9ff1c5', // power bank
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
  console.log('🚀 Starting gear image fetch...');
  console.log(`Target: ${OUTPUT_DIR}`);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const tasks: Promise<void>[] = [];

  for (const [filename, id] of Object.entries(GEAR_IMAGES)) {
    const filepath = join(OUTPUT_DIR, `${filename}.jpg`);
    if (!existsSync(filepath)) {
      tasks.push(downloadImage(id, filepath));
    } else {
      console.log(`⏭️  Skipped (exists): ${filepath}`);
    }
  }

  try {
    await Promise.all(tasks);
    console.log(`✨ Gear images complete. ${tasks.length} new images downloaded.`);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
