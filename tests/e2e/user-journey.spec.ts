import { test, expect } from '@playwright/test';

test.describe('Main User Journey', () => {
  test('should navigate from homepage to destination and view gallery', async ({ page }) => {
    // 1. Land on homepage
    await page.goto('./');
    await expect(page).toHaveTitle(/TravelBlog/);

    // 2. Click on a featured destination card
    const card = page
      .locator('section')
      .filter({ hasText: 'Featured Destinations' })
      .locator('a.group')
      .first();
    const title = (await card.locator('h3').textContent())?.trim();

    console.log(`Navigating to: ${title}`);
    await card.click();

    // 3. Verify destination page
    await expect(page).toHaveURL(/.*\/destinations\/[a-z0-9-]+\//);
    await expect(page.locator('h1').first()).toContainText(title!, { ignoreCase: true });

    // 4. Scroll to gallery and click an image
    const gallery = page.getByTestId('photo-gallery');
    await gallery.scrollIntoViewIfNeeded();
    await gallery.locator('div[role="button"]').first().click();

    // 5. Lightbox should be open
    const lightbox = page.locator('div[role="dialog"]');
    await expect(lightbox).toBeVisible();

    // 6. Close lightbox
    await lightbox.locator('button[aria-label*="Close"]').click();
    await expect(lightbox).not.toBeVisible();

    // 7. Go back home
    await page.locator('header').getByRole('link', { name: 'TravelBlog' }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
