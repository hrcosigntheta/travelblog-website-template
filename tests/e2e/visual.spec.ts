import { test, expect } from '@playwright/test';
import { toggleTheme, isDarkMode } from '../utils/playwright';

test.describe('Visual Regression', () => {
  // Use specific viewports for consistent screenshots
  test.use({ viewport: { width: 1280, height: 720 } });

  test('Homepage - Light Mode', async ({ page }) => {
    await page.goto('/');

    // Ensure we are in light mode (default, but good to be explicit/check)
    const isDark = await isDarkMode(page);
    if (isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Wait for fonts or animations
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-light.png');
  });

  test('Homepage - Dark Mode', async ({ page }) => {
    await page.goto('/');

    // Switch to dark mode
    const isDark = await isDarkMode(page);
    if (!isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Wait for transition
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-dark.png');
  });

  test('Components - Header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot('header-component.png');
  });

  test('Components - Footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveScreenshot('footer-component.png');
  });
});
