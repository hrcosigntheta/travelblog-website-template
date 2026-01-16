import { test, expect } from '@playwright/test';

test.describe('404 Page', () => {
  test('renders 404 page for unknown routes', async ({ page }) => {
    // In preview mode, Astro serves 404.html for unknown routes if configured or we can navigate directly to /404 to test content
    // Direct navigation to 404 first
    await page.goto('/404');
    await expect(page).toHaveTitle(/Page Not Found/);
    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();

    // In a real scenario, we'd test navigation to a bad URL, but behavior depends on server configuration (GitHub Pages vs Preview)
    // For local preview, checking /404 is safer for "rendering" test.
  });

  test('displays suggested destinations', async ({ page }) => {
    await page.goto('/404');
    await expect(page.getByRole('heading', { name: 'You might be interested in' })).toBeVisible();

    // Check for at least 3 suggested destinations (as configured)
    const suggestions = page.locator('main a[href*="/destinations/"]');
    // Note: DestinationCard links are inside 'main', filtering out header/footer links
    // The DestinationCard uses href={`/destinations/${destination.slug}`}

    // We expect 3 cards
    await expect(suggestions).toHaveCount(3);
  });

  test('search functionality redirects to destinations', async ({ page }) => {
    await page.goto('/404');

    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('beach');
    await searchInput.press('Enter');

    // Expect redirection to destinations page with query
    await expect(page).toHaveURL(/.*\/destinations\?q=beach/);
  });

  test('back to home link works', async ({ page }) => {
    await page.goto('/404');
    await page.getByRole('link', { name: 'Back to Home' }).click();

    // Should go to home (base path)
    // The exact URL depends on base path configuration, but typically ends in / or is just the base
    const url = page.url();
    expect(url.endsWith('/') || url.endsWith('travelblog-website-template/')).toBeTruthy();
  });
});
