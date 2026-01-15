import { test, expect } from '@playwright/test';
import { checkA11y } from '../utils/a11y';

test.describe('Accessibility', () => {
  const pages = [
    { url: '/', name: 'homepage' },
    { url: '/destinations', name: 'destinations-listing' },
    { url: '/destinations/el-nido-palawan', name: 'destination-detail' },
    { url: '/gallery', name: 'gallery' },
    { url: '/about', name: 'about' },
    { url: '/contact', name: 'contact' },
    { url: '/test-components', name: 'component-library' },
  ];

  for (const { url, name } of pages) {
    test(`${name} should not have accessibility violations`, async ({ page }, testInfo) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      const results = await checkA11y(page, testInfo);
      expect(results.violations).toEqual([]);
    });

    test(`${name} (dark mode) should not have accessibility violations`, async ({
      page,
    }, testInfo) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Toggle dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      });

      // Wait for transitions to complete
      await page.waitForTimeout(1000);

      const results = await checkA11y(page, testInfo);
      expect(results.violations).toEqual([]);
    });
  }
});
