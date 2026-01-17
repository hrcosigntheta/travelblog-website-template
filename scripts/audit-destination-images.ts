import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const DESTINATIONS_DIR = 'public/images/destinations';

function getFileHash(filepath: string): string {
  const content = readFileSync(filepath);
  return createHash('md5').update(content).digest('hex');
}

async function main() {
  console.log('🔍 Starting Destination Image Duplication Audit...');

  const files = readdirSync(DESTINATIONS_DIR).filter((f) =>
    f.match(/\.(jpg|jpeg|png|webp|avif)$/i)
  );
  const hashes: Record<string, string[]> = {};

  for (const file of files) {
    const filepath = join(DESTINATIONS_DIR, file);
    const hash = getFileHash(filepath);
    if (!hashes[hash]) {
      hashes[hash] = [];
    }
    hashes[hash].push(file);
  }

  const totalFiles = files.length;
  const uniqueHashes = Object.keys(hashes).length;
  const duplicatedCount = totalFiles - uniqueHashes;

  console.log(`\n📊 Audit Report (${totalFiles} images processed)`);
  console.log('----------------------------------------');
  console.log(`Total images      : ${totalFiles}`);
  console.log(`Unique images     : ${uniqueHashes}`);
  console.log(`Duplicated images : ${duplicatedCount}`);
  console.log(`Uniqueness ratio  : ${((uniqueHashes / totalFiles) * 100).toFixed(1)}%`);

  if (duplicatedCount > 0) {
    console.log('\n🚩 Duplication Clusters (samples):');
    Object.entries(hashes)
      .filter(([, files]) => files.length > 1)
      .slice(0, 5)
      .forEach(([hash, files]) => {
        console.log(`  - ${hash.substring(0, 8)}: ${files.join(', ')}`);
      });
  }

  if (uniqueHashes >= totalFiles * 0.8) {
    console.log('\n✨ Destination image diversity is good!');
  } else {
    console.warn('\n⚠️ High duplication detected. Consider sourcing more unique images.');
  }
}

main();
