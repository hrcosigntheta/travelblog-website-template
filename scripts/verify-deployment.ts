import fs from 'fs';
import path from 'path';
import { Glob } from 'bun';
import { JSDOM } from 'jsdom';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const BASE_PATH = '/travelblog-website-template'; // No trailing slash to match src/config/paths.ts

const errors: string[] = [];
const verifiedAssets = new Set<string>();

function logError(message: string) {
  errors.push(message);
  console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
}

function verifyAsset(assetPath: string, sourceFile: string) {
  // Remove hash and query params
  const cleanPath = assetPath.split('#')[0].split('?')[0];
  if (!cleanPath || cleanPath === BASE_PATH || cleanPath === `${BASE_PATH}/`) return;

  const key = `${sourceFile}:${cleanPath}`;
  if (verifiedAssets.has(key)) return;
  verifiedAssets.add(key);

  let targetPath = '';

  if (cleanPath.startsWith(BASE_PATH)) {
    // Root-relative with base path
    // We handle both /base-path/something and /base-path (which might be an error or root)
    const relativePart = cleanPath.substring(BASE_PATH.length);
    targetPath = path.join(DIST_DIR, relativePart);
  } else if (cleanPath.startsWith('/')) {
    // Root-relative without base path (likely an error)
    logError(`Absolute path without base path: "${assetPath}" in ${sourceFile}`);
    return;
  } else {
    // Relative path
    targetPath = path.resolve(DIST_DIR, path.dirname(sourceFile), cleanPath);
  }

  // Normalize path
  targetPath = path.normalize(targetPath);

  // Check existence
  let exists = fs.existsSync(targetPath);

  // Handle directory links (e.g. /about/ -> /about/index.html)
  if (exists && fs.statSync(targetPath).isDirectory()) {
    const indexPath = path.join(targetPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      targetPath = indexPath;
    } else {
      exists = false;
    }
  } else if (!exists && !path.extname(targetPath)) {
    // If it doesn't exist and has no extension, maybe it's a directory without trailing slash
    const dirWithIndex = path.join(targetPath, 'index.html');
    if (fs.existsSync(dirWithIndex)) {
      exists = true;
      targetPath = dirWithIndex;
    }
  }

  if (!exists) {
    logError(
      `Missing asset: "${assetPath}" (referenced in ${sourceFile}) -> Expected at: ${targetPath}`
    );
  }
}

async function verify() {
  console.log('🚀 Starting deployment verification...');

  if (!fs.existsSync(DIST_DIR)) {
    logError(`Dist directory not found: ${DIST_DIR}. Run 'bun run build' first.`);
    process.exit(1);
  }

  const glob = new Glob('**/*.html');
  const files = [...glob.scanSync({ cwd: DIST_DIR })];

  console.log(`Checking ${files.length} HTML files in ${DIST_DIR}...\n`);

  for (const file of files) {
    const filePath = path.join(DIST_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(content);
    const document = dom.window.document;

    // 1. Check Links
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:'))
        return;
      verifyAsset(href, file);
    });

    // 2. Check Images
    const images = document.querySelectorAll('img, source');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        verifyAsset(src, file);
      }

      const srcset = img.getAttribute('srcset');
      if (srcset) {
        srcset.split(',').forEach((part: string) => {
          const url = part.trim().split(/\s+/)[0];
          if (url && !url.startsWith('http') && !url.startsWith('data:')) {
            verifyAsset(url, file);
          }
        });
      }
    });

    // 3. Check Scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach((script) => {
      const src = script.getAttribute('src');
      if (!src || src.startsWith('http')) return;
      verifyAsset(src, file);
    });

    // 4. Check Stylesheets and Preloads
    const headLinks = document.querySelectorAll('link');
    headLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const rel = link.getAttribute('rel');
      if (!href || href.startsWith('http')) return;

      // We check stylesheets and preloaded assets
      if (
        rel === 'stylesheet' ||
        rel === 'preload' ||
        rel === 'modulepreload' ||
        rel === 'icon' ||
        rel === 'manifest'
      ) {
        verifyAsset(href, file);
      }
    });
  }

  console.log('\nVerification Summary:');
  console.log(`- HTML files checked: ${files.length}`);
  console.log(`- Unique references verified: ${verifiedAssets.size}`);
  console.log(`- Errors found: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n\x1b[31mVerification FAILED.\x1b[0m');
    process.exit(1);
  } else {
    console.log('\n\x1b[32mVerification PASSED. All links and assets are valid!\x1b[0m');
  }
}

verify().catch((err) => {
  console.error('Verification script failed unexpectedly:', err);
  process.exit(1);
});
