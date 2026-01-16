import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Favicon assets', () => {
  const publicDir = path.join(process.cwd(), 'public');

  test('favicon.svg exists', () => {
    expect(fs.existsSync(path.join(publicDir, 'favicon.svg'))).toBe(true);
  });

  test('manifest.json exists', () => {
    expect(fs.existsSync(path.join(publicDir, 'manifest.json'))).toBe(true);
  });

  test('generated PNGs exist', () => {
    expect(fs.existsSync(path.join(publicDir, 'pwa-192x192.png'))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, 'pwa-512x512.png'))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, 'apple-touch-icon.png'))).toBe(true);
  });
});
