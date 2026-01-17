import { test, expect } from '@playwright/test';

test.describe('Map Page Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to map page
    await page.goto('./map/');
    // Wait for Leaflet container to be initialized and visible
    await page.waitForSelector('.leaflet-container', { state: 'visible', timeout: 15000 });

    // On mobile, close the filter panel if it's open to avoid interception
    const closeFilters = page.getByLabel('Close filters');
    if ((await closeFilters.isVisible()) && (page.viewportSize()?.width || 1000) < 768) {
      await closeFilters.click();
      await expect(closeFilters).not.toBeVisible();
    }

    // Wait for at least one tile to load to ensure map is rendering
    await page.waitForSelector('.leaflet-tile-loaded', { timeout: 10000 }).catch(() => {
      console.log('Timeout waiting for leaflet-tile-loaded, continuing anyway');
    });

    // Give Leaflet some time to settle
    await page.waitForTimeout(1000);
  });

  test('should load map tiles and display destination markers', async ({ page }) => {
    // 1. Verify map container is visible
    await expect(page.locator('.leaflet-container')).toBeVisible();

    // 2. Verify markers or clusters are present
    const markers = page.locator('.leaflet-marker-icon');
    await markers.first().waitFor({ state: 'visible', timeout: 10000 });

    const count = await markers.count();
    console.log(`Found ${count} markers/clusters on map`);
    expect(count).toBeGreaterThan(0);
  });

  test('should open popup with correct content when clicking a marker', async ({ page }) => {
    // 1. Find an individual marker
    const marker = page.locator('.leaflet-marker-icon').first();
    await marker.waitFor({ state: 'visible', timeout: 15000 });
    await marker.click({ force: true });

    const popup = page.locator('.leaflet-popup-content');
    if (!(await popup.isVisible())) {
      // It was likely a cluster, click again or find another
      await page.waitForTimeout(1000);
      const individualMarker = page.locator('.leaflet-marker-icon:not(.marker-cluster)').first();
      await individualMarker.waitFor({ state: 'visible' });
      await individualMarker.click({ force: true });
    }

    await expect(popup).toBeVisible({ timeout: 10000 });

    // 2. Verify popup content structure
    await expect(popup.locator('h3')).toBeVisible();
    await expect(popup.locator('a', { hasText: 'View Details' })).toBeVisible();

    const destinationTitle = await popup.locator('h3').textContent();
    console.log(`Clicked marker for: ${destinationTitle}`);
    expect(destinationTitle?.length).toBeGreaterThan(0);
  });

  test('should navigate to destination detail page from popup', async ({ page }) => {
    // 1. Open a popup
    const marker = page.locator('.leaflet-marker-icon').first();
    await marker.waitFor();
    await marker.click({ force: true });

    const popup = page.locator('.leaflet-popup-content');
    if (!(await popup.isVisible())) {
      // It was likely a cluster, click again or find another
      await page.waitForTimeout(1000);
      const individualMarker = page.locator('.leaflet-marker-icon:not(.marker-cluster)').first();
      await individualMarker.waitFor();
      await individualMarker.click({ force: true });
    }

    await expect(popup).toBeVisible();

    // 2. Click View Details
    const viewDetailsLink = popup.locator('a', { hasText: 'View Details' });
    await viewDetailsLink.click();

    // 3. Verify navigation
    await expect(page).toHaveURL(/.*\/destinations\/[a-z0-9-]+\//);
    // Use first() to avoid strict mode violation
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should filter markers when category is selected', async ({ page }) => {
    // 1. Ensure filter panel is open
    const filterHeading = page.locator('h2', { hasText: 'Filters' });
    const openBtn = page.getByLabel('Open filters');

    if (!(await filterHeading.isVisible()) && (await openBtn.isVisible())) {
      await openBtn.click();
    }

    await filterHeading.waitFor({ state: 'visible', timeout: 10000 });

    await expect(filterHeading).toBeVisible();

    // 2. Get initial count from status text
    const statusText = await page.locator('span', { hasText: /Showing \d+ of \d+/ }).textContent();
    const totalCountMatch = statusText?.match(/of (\d+)/);
    const totalCount = totalCountMatch ? parseInt(totalCountMatch[1]) : 0;

    // 3. Select a category (e.g., Beach)
    const categoryLabel = page.locator('label').filter({ hasText: 'Beach' }).first();
    await categoryLabel.click();

    // 4. Verify filtered count updates
    await expect(page.locator('span', { hasText: /Showing \d+ of \d+/ })).not.toHaveText(
      `Showing ${totalCount} of ${totalCount}`,
      { timeout: 10000 }
    );

    const updatedStatusText = await page
      .locator('span', { hasText: /Showing \d+ of \d+/ })
      .textContent();
    const filteredCountMatch = updatedStatusText?.match(/Showing (\d+)/);
    const filteredCount = filteredCountMatch ? parseInt(filteredCountMatch[1]) : 0;

    console.log(`Filtered: ${filteredCount} of ${totalCount}`);
    expect(filteredCount).toBeLessThan(totalCount);
    expect(filteredCount).toBeGreaterThan(0);

    // 5. Clear filters
    await page.getByRole('button', { name: 'Clear all' }).click();
    await expect(page.locator('span', { hasText: /Showing \d+ of \d+/ })).toContainText(
      `Showing ${totalCount} of ${totalCount}`
    );
  });

  test('should switch map tiles on theme toggle', async ({ page }) => {
    const isMobile = (page.viewportSize()?.width || 1000) < 768;

    // 1. Detect current theme
    const isInitiallyDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );

    // 2. Get initial tile src
    const initialTileUrl = await page
      .locator('.leaflet-tile-container img')
      .first()
      .getAttribute('src');

    // 3. Toggle theme
    if (isMobile) {
      // Open mobile menu first
      await page.getByLabel('Open menu').click();
      await expect(page.getByRole('dialog')).toBeVisible();
    }

    const toggleLabel = isInitiallyDark ? 'Switch to light mode' : 'Switch to dark mode';
    await page.getByRole('button', { name: toggleLabel }).click();

    if (isMobile) {
      // Close mobile menu
      await page.getByLabel('Close menu').click();
    }

    // 4. Wait for tile transition
    await page.waitForTimeout(1000);

    const updatedTileUrl = await page
      .locator('.leaflet-tile-container img')
      .first()
      .getAttribute('src');

    expect(updatedTileUrl).not.toBe(initialTileUrl);

    if (isInitiallyDark) {
      expect(updatedTileUrl).toContain('light_all');
    } else {
      expect(updatedTileUrl).toContain('dark_all');
    }
  });
});
