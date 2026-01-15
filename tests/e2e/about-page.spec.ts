import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('renders about page content', async ({ page }) => {
    await page.goto('/about');

    // Check title
    await expect(page).toHaveTitle(/About Us/);

    // Check main heading
    await expect(
      page.getByRole('heading', { name: 'Exploring the Pearl of the Orient' })
    ).toBeVisible();

    // Check bio section
    await expect(page.getByRole('heading', { name: "Hi, I'm the Explorer" })).toBeVisible();

    // Check stats
    await expect(page.getByText('Islands Visited')).toBeVisible();

    // Check philosophy
    await expect(page.getByRole('heading', { name: 'Travel Philosophy' })).toBeVisible();

    // Check gear
    await expect(page.getByRole('heading', { name: 'Essential Gear' })).toBeVisible();
    await expect(page.getByText('Sony A7IV')).toBeVisible();
  });

  test('navigation link to about page works', async ({ page }) => {
    await page.goto('/');

    // Find about link in desktop nav or mobile menu
    // Assuming desktop view for simplicity or responsive handling
    const aboutLink = page.getByRole('link', { name: 'About' }).first();
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    await expect(page).toHaveURL(/.*\/about/);
  });
});
