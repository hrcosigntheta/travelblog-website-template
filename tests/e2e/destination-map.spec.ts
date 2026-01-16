import { test, expect } from '@playwright/test';

test.describe('Destination Map', () => {
  test('should display the map and markers correctly', async ({ page }) => {
    // Navigate to a destination page (El Nido)
    await page.goto('./destinations/el-nido-palawan/');

    // Check for the Map Section Heading
    const mapHeading = page.getByRole('heading', { name: /Location/i });
    await expect(mapHeading).toBeVisible();

    // Verify map container is present
    // MapWrapper usually creates a div with leaflet classes
    // We can also target the container by the class passed in MapWithMarkers
    // but relying on leaflet internals confirms the map actually initialized
    const mapContainer = page.locator('.leaflet-container');
    await mapContainer.scrollIntoViewIfNeeded();
    await expect(mapContainer).toBeVisible();

    // Wait for map to initialize and tiles/markers to load
    // Leaflet markers usually have the class 'leaflet-marker-icon'
    // MapWithMarkers uses custom markers with class 'custom-map-marker' inside the divIcon
    // But Leaflet still wraps it in leaflet-marker-icon
    const marker = page.locator('.leaflet-marker-icon');

    // Wait for at least one marker
    await expect(marker.first()).toBeVisible({ timeout: 10000 });

    // Click the marker to open popup
    // If clustering is enabled and we are zoomed out, we might click a cluster
    // But for a single destination page, we usually just show one marker or the destination marker is prominent
    // The MapWithMarkers component for detail page sets destinations=[destination] so only 1 marker expected
    // unless clustering is active even for 1 marker (usually not if maxClusterRadius is set right or if zoom is high enough)
    // The component sets zoom=12 which is reasonably high.

    await marker.first().click();

    // Verify popup opens
    const popup = page.locator('.leaflet-popup');
    await expect(popup).toBeVisible();

    // Verify popup content
    // It should contain the destination title "El Nido, Palawan"
    await expect(popup).toContainText('El Nido, Palawan');

    // Verify "View" link in popup
    const viewLink = popup.getByRole('link', { name: /View/i });
    await expect(viewLink).toBeVisible();
  });
});
