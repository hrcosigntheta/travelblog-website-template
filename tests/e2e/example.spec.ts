import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('./');

  // Expect a title "to contain" a substring.
  // Note: We might need to adjust this once actual content is there.
  // For now, checking for "Astro" or the project name is a safe bet if default Astro template,
  // but let's check what the current index page likely has.
  // Actually, checking the page title is safer.
  await expect(page).toHaveTitle(/Astro|Travel/);
});
