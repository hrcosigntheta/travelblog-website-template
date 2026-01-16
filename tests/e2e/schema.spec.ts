import { test, expect } from '@playwright/test';

test.describe('Schema.org Validation', () => {
  const pages = [
    './',
    './about',
    './contact',
    './destinations',
    './destinations/el-nido-palawan/', // Example destination
    './gallery',
  ];

  for (const path of pages) {
    test(`validates JSON-LD on ${path}`, async ({ page }) => {
      await page.goto(path);

      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();

      // Some pages might have multiple JSON-LD scripts (e.g. Breadcrumb + Page Schema)
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const text = await jsonLdScripts.nth(i).textContent();
        expect(text).toBeTruthy();

        try {
          const json = JSON.parse(text!);
          expect(json['@context']).toBe('https://schema.org');
          expect(json['@type'] || json['@graph']).toBeDefined();
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          throw new Error(`Invalid JSON-LD on ${path}: ${message}`);
        }
      }
    });
  }
});
