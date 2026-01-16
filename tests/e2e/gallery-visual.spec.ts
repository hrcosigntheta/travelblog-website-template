import { test, expect } from '@playwright/test';
import { toggleTheme, isDarkMode } from '../utils/playwright';

test.describe('Visual Regression - Gallery', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('Gallery Page - Light Mode', async ({ page }) => {
    await page.goto('./gallery/');

    // Ensure Light Mode
    const isDark = await isDarkMode(page);
    if (isDark) await toggleTheme(page);
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Wait for images
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('gallery-page-light.png', { fullPage: true });
  });

  test('Gallery Page - Dark Mode', async ({ page }) => {
    await page.goto('./gallery/');

    // Ensure Dark Mode
    const isDark = await isDarkMode(page);
    if (!isDark) await toggleTheme(page);
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Wait for images
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('gallery-page-dark.png', { fullPage: true });
  });

  test('Lightbox - Open State', async ({ page }) => {
    await page.goto('./gallery/');

    // Ensure Light Mode for consistency
    const isDark = await isDarkMode(page);
    if (isDark) await toggleTheme(page);

    await page.waitForLoadState('networkidle');

    // Click first image
    const gallery = page.getByTestId('photo-gallery');
    const firstImage = gallery.getByRole('button', { name: /View full size/ }).first();
    await firstImage.click();

    const lightbox = page.getByRole('dialog', { name: /Image lightbox/i });
    await expect(lightbox).toBeVisible();

    // Wait for lightbox image to load
    await page.waitForTimeout(1000);

    await expect(lightbox).toHaveScreenshot('lightbox-open.png');
  });
});
