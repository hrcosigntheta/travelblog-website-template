import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const PLACEHOLDERS_DIR = 'public/images/placeholders';
const REQUIRED_CATEGORIES = ['beaches', 'mountains', 'cultural', 'food', 'adventure', 'people'];

interface ImageStats {
  path: string;
  width: number;
  height: number;
  format: string;
  isHuman: boolean;
  dominantColor?: { r: number; g: number; b: number };
}

async function analyzeImage(filepath: string, category: string): Promise<ImageStats> {
  const metadata = await sharp(filepath).metadata();
  const { dominant } = await sharp(filepath).stats();

  return {
    path: filepath,
    width: metadata.width || 0,
    height: metadata.height || 0,
    format: metadata.format || 'unknown',
    isHuman: category === 'people' || category === 'adventure', // Simplified heuristic based on category
    dominantColor: dominant,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

async function main() {
  console.log('🔍 Starting Image Diversity Validation...');

  if (!existsSync(PLACEHOLDERS_DIR)) {
    console.error(`❌ Placeholders directory not found: ${PLACEHOLDERS_DIR}`);
    process.exit(1);
  }

  const stats: ImageStats[] = [];
  const categoryCounts: Record<string, number> = {};

  // Scan directories
  for (const category of REQUIRED_CATEGORIES) {
    const categoryDir = join(PLACEHOLDERS_DIR, category);
    categoryCounts[category] = 0;

    if (!existsSync(categoryDir)) {
      console.warn(`⚠️  Missing category directory: ${category}`);
      continue;
    }

    const files = readdirSync(categoryDir).filter((f) => f.match(/\.(jpg|jpeg|png|webp|avif)$/i));

    for (const file of files) {
      const filepath = join(categoryDir, file);
      try {
        const imageStat = await analyzeImage(filepath, category);
        stats.push(imageStat);
        categoryCounts[category]++;
      } catch (err) {
        console.error(`❌ Error analyzing ${file}:`, err);
      }
    }
  }

  // Generate Report
  const totalImages = stats.length;
  console.log(`\n📊 Analysis Report (${totalImages} images processed)`);
  console.log('----------------------------------------');

  // 1. Category Distribution
  console.log('\n📁 Category Distribution:');
  let missingCategories = false;
  for (const [category, count] of Object.entries(categoryCounts)) {
    const bar = '█'.repeat(count);
    console.log(`  ${category.padEnd(12)}: ${count} ${bar}`);
    if (count === 0) missingCategories = true;
  }

  // 2. Human vs Scenery Ratio
  const humanCount = stats.filter((s) => s.isHuman).length;
  const humanRatio = (humanCount / totalImages) * 100;
  console.log('\n👥 Subject Diversity (Human vs Scenery):');
  console.log(`  Human/Interaction: ${humanCount} (${humanRatio.toFixed(1)}%)`);
  console.log(
    `  Scenery/Object:    ${totalImages - humanCount} (${(100 - humanRatio).toFixed(1)}%)`
  );
  console.log('  Target: ~40% Human elements');

  // 3. Color Variety (Sample of dominant colors)
  console.log('\n🎨 Color Palette Sample:');
  stats.slice(0, 5).forEach((s) => {
    if (s.dominantColor) {
      const hex = rgbToHex(s.dominantColor.r, s.dominantColor.g, s.dominantColor.b);
      console.log(
        `  ${s.path.split(/[\\/]/).pop()}: ${hex} (R:${s.dominantColor.r} G:${s.dominantColor.g} B:${s.dominantColor.b})`
      );
    }
  });

  // Validation Logic
  let failed = false;

  if (totalImages === 0) {
    console.error('\n❌ FAIL: No images found.');
    failed = true;
  }

  if (missingCategories) {
    console.error('\n❌ FAIL: Missing images in one or more required categories.');
    failed = true;
  }

  // Soft check for diversity (warn only)
  if (humanRatio < 20) {
    console.warn(
      '\n⚠️  WARNING: Low representation of human elements (below 20%). Consider adding more people/adventure photos.'
    );
  }

  if (failed) {
    process.exit(1);
  } else {
    console.log('\n✨ Diversity check passed!');
  }
}

main();
