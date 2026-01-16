import { test, expect } from '@playwright/test';

test.describe('Theme persistence', () => {
  test('should toggle theme and persist after navigation and reload', async ({ page }) => {
    // 1. Start at homepage
    await page.goto('./');

    // Initial state (assuming light mode default or system)
    const initialTheme = await page.locator('html').getAttribute('data-theme');

    // Find the theme toggle button
    // Wait for the mounted state of ThemeToggle (it starts as a div placeholder)
    const themeToggle = page.getByRole('button', { name: /switch to/i });

    // Check if we are on mobile by looking for the desktop toggle visibility
    const isMobile = await page.evaluate(() => window.innerWidth < 768);

    if (isMobile) {
      const menuButton = page.getByRole('button', { name: /open menu/i });
      await menuButton.click();
      // Wait for the menu to animate in
      await expect(themeToggle).toBeVisible();
    } else {
      await expect(themeToggle).toBeVisible();
    }

    // 2. Toggle the theme
    await themeToggle.click();

    const toggledTheme = await page.locator('html').getAttribute('data-theme');
    expect(toggledTheme).not.toBe(initialTheme);

    // 3. Navigate to a different page (About page)
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);

    // Verify theme persisted after navigation
    const persistedThemeAfterNav = await page.locator('html').getAttribute('data-theme');
    expect(persistedThemeAfterNav).toBe(toggledTheme);

    // 4. Reload the page
    await page.reload();

    // Verify theme persisted after reload
    const persistedThemeAfterReload = await page.locator('html').getAttribute('data-theme');
    expect(persistedThemeAfterReload).toBe(toggledTheme);

    // 5. Check localStorage directly
    const savedTheme = await page.evaluate(() => localStorage.getItem('theme-preference'));
    expect(savedTheme).toBe(toggledTheme);
  });
});
