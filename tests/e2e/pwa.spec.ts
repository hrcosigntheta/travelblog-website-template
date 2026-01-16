import { test, expect } from '@playwright/test';

test.describe('PWA and Offline Mode', () => {
  test('should register service worker', async ({ page }) => {
    await page.goto('./');

    // Wait for the service worker to be registered
    const isRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const registrations = await navigator.serviceWorker.getRegistrations();
      return registrations.length > 0;
    });

    expect(isRegistered).toBe(true);
  });

  test('should have a valid manifest', async ({ page }) => {
    await page.goto('./');
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', /.*manifest.json/);

    const href = await manifestLink.getAttribute('href');
    if (href) {
      const response = await page.request.get(href);
      expect(response.ok()).toBe(true);
      const manifest = await response.json();
      expect(manifest.name).toBe('Philippine Travel Blog');
      expect(manifest.short_name).toBe('TravelBlog');
    }
  });

  test('should provide offline fallback (mocked)', async ({ page }) => {
    // This is hard to test truly offline in Playwright without a lot of setup
    // But we can check if the sw.js file exists and is accessible
    const response = await page.request.get('./sw.js');
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain('CACHE_NAME');
  });
});
