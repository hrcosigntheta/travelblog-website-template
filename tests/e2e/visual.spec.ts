import { test, expect } from '@playwright/test';
import { toggleTheme, isDarkMode } from '../utils/playwright';

test.describe('Visual Regression', () => {
  // Use specific viewports for consistent screenshots
  test.use({ viewport: { width: 1280, height: 720 } });

  test('Homepage - Light Mode', async ({ page }) => {
    await page.goto('./');

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
    await page.goto('./');

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
    await page.goto('./');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot('header-component.png');
  });

  test('Components - Footer', async ({ page }) => {
    await page.goto('./');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveScreenshot('footer-component.png');
  });

  test('Destination Page - Light Mode', async ({ page }) => {
    await page.goto('./destinations/el-nido-palawan/');

    // Ensure we are in light mode
    const isDark = await isDarkMode(page);
    if (isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Wait for map and images to stabilize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra buffer for animations

    await expect(page).toHaveScreenshot('destination-page-light.png', { fullPage: true });
  });

  test('Destination Page - Dark Mode', async ({ page }) => {
    await page.goto('./destinations/el-nido-palawan/');

    // Switch to dark mode
    const isDark = await isDarkMode(page);
    if (!isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Wait for transition and map
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('destination-page-dark.png', { fullPage: true });
  });

  test('About Page - Light Mode', async ({ page }) => {
    await page.goto('./about/');

    // Ensure we are in light mode
    const isDark = await isDarkMode(page);
    if (isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Wait for animations and content
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('about-page-light.png', { fullPage: true });
  });

  test('About Page - Dark Mode', async ({ page }) => {
    await page.goto('./about/');

    // Switch to dark mode
    const isDark = await isDarkMode(page);
    if (!isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Wait for transition and content
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('about-page-dark.png', { fullPage: true });
  });

  test('Contact Page - Light Mode', async ({ page }) => {
    await page.goto('./contact/');

    // Ensure we are in light mode
    const isDark = await isDarkMode(page);
    if (isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Wait for animations and content
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('contact-page-light.png', { fullPage: true });
  });

  test('Contact Page - Dark Mode', async ({ page }) => {
    await page.goto('./contact/');

    // Switch to dark mode
    const isDark = await isDarkMode(page);
    if (!isDark) {
      await toggleTheme(page);
    }
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Wait for transition and content
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('contact-page-dark.png', { fullPage: true });
  });
});
