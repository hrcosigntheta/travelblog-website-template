import sharp from 'sharp';
import * as ThumbHash from 'thumbhash';
import { readFile, unlink } from 'node:fs/promises';
import { IMAGE_QUALITY } from '../src/config/images';

const TEST_IMAGE_PATH = 'public/images/placeholders/beaches/beaches-1.jpg';
const OUTPUT_AVIF = 'public/test-output.avif';
const OUTPUT_WEBP = 'public/test-output.webp';

async function verifyPipeline() {
  console.log('🧪 Starting Image Pipeline Verification...');

  try {
    // 1. Verify Source Exists
    console.log(`\n1. Reading source image: ${TEST_IMAGE_PATH}`);
    const inputBuffer = await readFile(TEST_IMAGE_PATH);
    console.log('✅ Source image read successfully');

    // 2. Verify AVIF Conversion
    console.log(`\n2. Testing AVIF conversion (Quality: ${IMAGE_QUALITY.avif})`);
    await sharp(inputBuffer).avif({ quality: IMAGE_QUALITY.avif }).toFile(OUTPUT_AVIF);
    console.log('✅ AVIF conversion successful');

    // 3. Verify WebP Conversion
    console.log(`\n3. Testing WebP conversion (Quality: ${IMAGE_QUALITY.webp})`);
    await sharp(inputBuffer).webp({ quality: IMAGE_QUALITY.webp }).toFile(OUTPUT_WEBP);
    console.log('✅ WebP conversion successful');

    // 4. Verify ThumbHash Generation
    console.log('\n4. Testing ThumbHash generation');
    const image = sharp(inputBuffer).resize(100, 100, { fit: 'inside' });
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    const binaryThumbHash = ThumbHash.rgbaToThumbHash(info.width, info.height, data);
    const thumbHashToBase64 = Buffer.from(binaryThumbHash).toString('base64');

    console.log(`✅ ThumbHash generated: ${thumbHashToBase64.substring(0, 20)}...`);

    // 5. Cleanup
    console.log('\n5. Cleaning up test artifacts');
    await unlink(OUTPUT_AVIF);
    await unlink(OUTPUT_WEBP);
    console.log('✅ Cleanup successful');

    console.log('\n✨ Image Pipeline Verification Passed!');
  } catch (error) {
    console.error('\n❌ Verification Failed:', error);
    process.exit(1);
  }
}

verifyPipeline();
