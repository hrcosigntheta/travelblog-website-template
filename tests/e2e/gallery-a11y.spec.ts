import { test, expect } from '@playwright/test';
import { checkA11y } from '../utils/a11y';

test.describe('Gallery Page Accessibility', () => {
  test('should pass accessibility checks', async ({ page }, testInfo) => {
    await page.goto('./gallery/');
    await checkA11y(page, testInfo);
  });

  test('should pass accessibility checks with lightbox open', async ({ page }, testInfo) => {
    await page.goto('./gallery/');

    const gallery = page.getByTestId('photo-gallery');
    const firstImage = gallery.getByRole('button', { name: /View full size/ }).first();
    await firstImage.click();

    await expect(page.getByRole('dialog', { name: /Image lightbox/i })).toBeVisible();

    await checkA11y(page, testInfo);
  });
});
