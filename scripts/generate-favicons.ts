import sharp from 'sharp';
import path from 'path';

const input = path.join(process.cwd(), 'public', 'favicon.svg');
const publicDir = path.join(process.cwd(), 'public');

async function generate() {
  console.log('Generating favicons...');

  // PWA 192x192
  await sharp(input).resize(192, 192).toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // PWA 512x512
  await sharp(input).resize(512, 512).toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // Apple Touch Icon 180x180
  await sharp(input).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Favicon 32x32
  await sharp(input).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  // Favicon 16x16
  await sharp(input).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Generated favicon-16x16.png');

  // ICO (multi-size if possible, but sharp might not output .ico directly easily without plugin, so we skip .ico or just use pngs)
  // Browsers support png favicons.
}

generate().catch(console.error);
