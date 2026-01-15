import { test, expect } from '@playwright/test';

test.describe('Destination Sidebar', () => {
  test('should display trip essentials and related destinations', async ({ page }) => {
    // Navigate to a destination page (El Nido)
    await page.goto('/destinations/el-nido-palawan');

    // 1. Check Trip Essentials
    const tripEssentialsHeading = page.getByRole('heading', { name: /Trip Essentials/i });
    await expect(tripEssentialsHeading).toBeVisible();

    // Get the container (parent of the heading)
    // We can scope to the sidebar column to be safe
    const sidebarColumn = page.locator('.lg\\:col-span-1');

    // Within sidebar, find "Best Time".
    // Note: "Best Time" also appears in Hero, so we MUST scope it.
    await expect(sidebarColumn.getByText('Best Time')).toBeVisible();
    await expect(sidebarColumn.getByText('Nov - May')).toBeVisible(); // Specific to El Nido

    // 2. Check Related Destinations
    const relatedHeading = page.getByRole('heading', { name: /You Might Also Like/i });
    await expect(relatedHeading).toBeVisible();

    // Verify related destinations are present
    // Since El Nido has no same-region peers in mock data, it falls back to others.
    // We expect 3 items (since total is 4, minus current = 3).
    // Let's verify "Siargao Island" is present in the list
    const relatedLink = page.getByRole('link', { name: /Siargao Island/i });
    await expect(relatedLink).toBeVisible();

    // 3. Test Navigation
    await relatedLink.click();

    // Verify navigation to the clicked destination
    await expect(page).toHaveURL(/.*\/destinations\/siargao-island/);
  });
});
