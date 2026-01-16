import { test, expect } from '@playwright/test';

test.describe('Map Page Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/map');
    await expect(page.locator('.leaflet-container')).toBeVisible();

    // Close filter panel if it's open and covering content (mobile)
    // The close button is aria-label="Close filters"
    const closeFilters = page.getByLabel('Close filters');
    if (await closeFilters.isVisible()) {
      const viewportSize = page.viewportSize();
      if (viewportSize && viewportSize.width < 768) {
        await closeFilters.click();
        await expect(closeFilters).not.toBeVisible();
      }
    }

    // Wait for markers to load (expect at least one marker or cluster)
    await expect(page.locator('.leaflet-marker-icon').first()).toBeVisible();
  });

  test('should load map and display markers/clusters', async ({ page }) => {
    const markers = page.locator('.leaflet-marker-icon');

    // Check count > 0
    const markerCount = await markers.count();
    expect(markerCount).toBeGreaterThan(0);
  });

  test('should open popup on marker click', async ({ page }) => {
    // Zoom in via controls to avoid clicking clusters/map directly if unstable
    const zoomIn = page.locator('.leaflet-control-zoom-in');
    if (await zoomIn.isVisible()) {
      await zoomIn.click();
      await page.waitForTimeout(500);
      await zoomIn.click();
      await page.waitForTimeout(500);
    }

    // Attempt to find a marker that is not a cluster
    // Clusters have class 'marker-cluster'
    let targetMarker = page.locator('.leaflet-marker-icon:not(.marker-cluster)').first();

    // If no individual markers are visible (all clustered), click a cluster
    if ((await targetMarker.count()) === 0) {
      const cluster = page.locator('.marker-cluster').first();
      if (await cluster.isVisible()) {
        await cluster.click();
        await page.waitForTimeout(1000);
      }
      // Re-locate
      targetMarker = page.locator('.leaflet-marker-icon:not(.marker-cluster)').first();
    }

    await expect(targetMarker).toBeVisible();
    await targetMarker.click();

    // Check popup
    const popup = page.locator('.leaflet-popup-content');
    await expect(popup).toBeVisible();
    await expect(popup.getByText('View Details')).toBeVisible();
  });

  test('should filter markers via panel', async ({ page }) => {
    // Robustly ensure panel is open
    const panelHeading = page.getByRole('heading', { name: /Filters/i });
    const openBtn = page.getByRole('button', { name: 'Filters' }); // Exact match for button text "Filters"

    if (!(await panelHeading.isVisible())) {
      if (await openBtn.isVisible()) {
        await openBtn.click();
      }
    }

    // Wait for panel to be visible
    await expect(panelHeading).toBeVisible();
    await expect(page.getByText(/Categories/i)).toBeVisible();

    const showingText = page.getByText(/Showing/i);
    await expect(showingText).toBeVisible();
    const initialText = await showingText.innerText();

    // Toggle the first category checkbox
    // Use .first() on the checkbox input or label
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(firstCheckbox).toBeVisible();
    await firstCheckbox.click();

    await page.waitForTimeout(500);
    const newText = await showingText.innerText();

    // Expect change in count
    expect(initialText).not.toBe(newText);

    // Clean up: Close panel if on mobile
    const closeFilters = page.getByLabel('Close filters');
    if ((await closeFilters.isVisible()) && (page.viewportSize()?.width || 1000) < 768) {
      await closeFilters.click();
    }
  });

  test('should switch map tiles on theme change', async ({ page }) => {
    // Find theme toggle by role/name pattern
    const themeToggle = page.getByRole('button', { name: /Switch to (light|dark) mode/i });

    if ((await themeToggle.count()) === 0) {
      test.skip(true, 'Theme toggle not found');
      return;
    }

    const tileLayer = page.locator('.leaflet-tile-pane img').first();
    await expect(tileLayer).toBeVisible();
    const initialSrc = await tileLayer.getAttribute('src');

    await themeToggle.click();
    await page.waitForTimeout(1000); // fade animation

    const newSrc = await tileLayer.getAttribute('src');
    expect(newSrc).not.toBe(initialSrc);

    // Toggle back
    await themeToggle.click();
  });
});
