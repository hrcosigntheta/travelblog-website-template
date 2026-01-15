import { test, expect } from '@playwright/test';

test.describe('Itineraries Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/itineraries');
  });

  test('should render page title and description', async ({ page }) => {
    await expect(page).toHaveTitle(/Travel Itineraries/);
    await expect(page.getByRole('heading', { name: 'Travel Itineraries', level: 1 })).toBeVisible();
    await expect(
      page.getByText('Plan your perfect trip with our detailed day-by-day guides.')
    ).toBeVisible();
  });

  test('should display itinerary cards', async ({ page }) => {
    // Check if at least one card is displayed (assuming data exists)
    const cards = page.locator('a[href*="#itinerary"]');
    await expect(cards.first()).toBeVisible();

    // Check for duration badge
    await expect(page.getByText(/\d+ Days/)).toBeVisible();

    // Check for activities count
    await expect(page.getByText(/\d+ Activities/)).toBeVisible();
  });

  test('should navigate to destination itinerary', async ({ page }) => {
    const firstCard = page.locator('a[href*="#itinerary"]').first();
    const href = await firstCard.getAttribute('href');

    await firstCard.click();
    await expect(page).toHaveURL(new RegExp(href!));
  });

  test('should pass accessibility check', async ({ page }) => {
    const accessibilityScanResults = await new (await import('@axe-core/playwright')).AxeBuilder({
      page,
    }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
