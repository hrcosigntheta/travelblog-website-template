import { test, expect } from '@playwright/test';

test.describe('Mobile Map Experience', () => {
  // Use a mobile viewport for all tests in this describe block
  test.use({ viewport: { width: 375, height: 667 }, hasTouch: true });

  test.beforeEach(async ({ page }) => {
    await page.goto('./map/');
    // Wait for map to load
    await expect(page.locator('.leaflet-container')).toBeVisible();
  });

  test('should display mobile controls', async ({ page }) => {
    // Check for either the open panel (close button) or the toggle button
    const closeBtn = page.getByLabel('Close filters');
    const filterBtn = page.getByRole('button', { name: /Filters/i });

    // One of them should be visible eventually
    await expect(closeBtn.or(filterBtn)).toBeVisible();

    // Zoom controls should be visible
    await expect(page.locator('.leaflet-control-zoom')).toBeVisible();
  });

  test('should interact with filter panel on mobile', async ({ page }) => {
    const closeBtn = page.getByLabel('Close filters');
    const filterBtn = page.getByRole('button', { name: /Filters/i });

    // Ensure we start in a known state (closed)
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await expect(closeBtn).not.toBeVisible();
    }

    // Now open it
    await expect(filterBtn).toBeVisible();
    await filterBtn.click();

    // Check contents
    await expect(page.getByText('Categories')).toBeVisible();

    // Close again
    await closeBtn.click();
    await expect(filterBtn).toBeVisible();
  });

  test('should handle orientation change', async ({ page }) => {
    // Simulate rotation to landscape
    await page.setViewportSize({ width: 667, height: 375 });

    // Wait a bit for debounce/resize handler
    await page.waitForTimeout(500);

    // Map should still be visible and fill the viewport
    const mapContainer = page.locator('.leaflet-container');
    const box = await mapContainer.boundingBox();

    expect(box?.width).toBe(667);
    expect(box?.height).toBe(375);

    // Simulate rotation back to portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    const box2 = await mapContainer.boundingBox();
    expect(box2?.width).toBe(375);
    expect(box2?.height).toBe(667);
  });
});
