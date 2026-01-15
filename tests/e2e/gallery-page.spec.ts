import { test, expect } from '@playwright/test';

test.describe('Gallery Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gallery');
  });

  test('should render gallery page title and images', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Travel Gallery');

    // Check for images
    const gallery = page.getByTestId('photo-gallery');
    await expect(gallery).toBeVisible();

    // Should have images from all destinations
    // El Nido (5) + Siargao (2) + Bohol (1) + Boracay (1) = 9 images
    await expect(gallery.getByRole('button')).toHaveCount(9);
  });

  test('should open lightbox on image click', async ({ page }) => {
    const gallery = page.getByTestId('photo-gallery');
    const firstImage = gallery.getByRole('button').first();

    await firstImage.click();

    const lightbox = page.getByRole('dialog', { name: /Image lightbox/i });
    await expect(lightbox).toBeVisible();

    // Check close
    const closeButton = lightbox.getByLabel('Close lightbox');
    await closeButton.click();
    await expect(lightbox).not.toBeVisible();
  });
});
