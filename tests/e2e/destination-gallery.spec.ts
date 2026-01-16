import { test, expect } from '@playwright/test';

test.describe('Destination Gallery', () => {
  test('should display the gallery and lightbox correctly', async ({ page }) => {
    // Navigate to a destination page that has multiple images (El Nido)
    await page.goto('./destinations/el-nido-palawan/');

    // Check for the Gallery Heading
    const galleryHeading = page.getByRole('heading', { name: /Photo Gallery/i });
    await expect(galleryHeading).toBeVisible();

    // Check for the photo count text
    // Only visible on desktop/tablet due to responsive styles
    const photoCount = page.getByText('4 Photos');
    if (page.viewportSize()?.width && page.viewportSize()!.width >= 768) {
      await expect(photoCount).toBeVisible();
    }

    // Verify images are present
    const gallery = page.getByTestId('photo-gallery');
    await gallery.scrollIntoViewIfNeeded();
    await expect(gallery).toBeVisible();

    // There should be 4 images in the gallery
    // Note: Masonry layout might affect DOM order, but count should be correct
    const imageCards = gallery.getByRole('button');
    await expect(imageCards).toHaveCount(4);

    // Wait for the first card to be stable and visible
    const firstCard = imageCards.first();
    await expect(firstCard).toBeVisible();

    // Slight delay to ensure hydration handles the click event
    // (client:visible might need a tick after scrolling into view)
    await page.waitForTimeout(500);

    // Click the first image card to open lightbox
    // Using the card (button) ensures we click the interactive element
    await firstCard.click();

    // Verify lightbox opens
    const lightbox = page.getByRole('dialog', { name: /Image lightbox/i });
    await expect(lightbox).toBeVisible();

    // Verify lightbox count "1 / 4"
    await expect(lightbox.getByText('1 / 4')).toBeVisible();

    // Test navigation in lightbox (only on desktop/tablet where buttons are visible)
    // Mobile uses swipe which is harder to test, or buttons are hidden
    if (page.viewportSize()?.width && page.viewportSize()!.width >= 768) {
      const nextButton = lightbox.getByLabel('Next image');
      await nextButton.click();
      await expect(lightbox.getByText('2 / 4')).toBeVisible();
    }

    // Close lightbox
    const closeButton = lightbox.getByLabel('Close lightbox');
    await closeButton.click();
    await expect(lightbox).not.toBeVisible();
  });
});
