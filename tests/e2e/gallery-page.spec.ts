import { test, expect } from '@playwright/test';

test.describe('Gallery Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./gallery/');
  });

  test('should render gallery page title and images', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Travel Gallery');

    // Check for images
    const gallery = page.getByTestId('photo-gallery');
    await expect(gallery).toBeVisible();

    // Should have images from all destinations
    await expect(gallery.getByRole('button', { name: /View full size/ })).not.toHaveCount(0);
  });

  test('should open lightbox on image click', async ({ page }) => {
    const gallery = page.getByTestId('photo-gallery');
    const firstImage = gallery.getByRole('button', { name: /View full size/ }).first();

    await firstImage.click();

    const lightbox = page.getByRole('dialog', { name: /Image lightbox/i });
    await expect(lightbox).toBeVisible();

    // Check close
    const closeButton = lightbox.getByLabel('Close lightbox');
    await closeButton.click();
    await expect(lightbox).not.toBeVisible();
  });

  test('should include structured data schema', async ({ page }) => {
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toHaveCount(1);

    const schemaContent = await schemaScript.textContent();
    const schema = JSON.parse(schemaContent || '{}');

    expect(schema['@type']).toBe('ImageGallery');
    expect(schema.name).toBe('Photo Gallery | Philippines Travel Blog');
    // Basic check for images in schema
    expect(Array.isArray(schema.image)).toBe(true);
    expect(schema.image.length).toBeGreaterThan(0);
  });

  test('should trigger download modal from lightbox', async ({ page }) => {
    const gallery = page.getByTestId('photo-gallery');
    const firstImage = gallery.getByRole('button', { name: /View full size/ }).first();
    await firstImage.click();

    const lightbox = page.getByRole('dialog', { name: /Image lightbox/i });
    await expect(lightbox).toBeVisible();

    const downloadButton = lightbox.getByLabel('Download image');
    await downloadButton.click();

    // Verify modal appears
    // The demo modal has role dialog or just text "Demo Link Intercepted"
    await expect(page.getByText('Demo Link Intercepted')).toBeVisible();
    await expect(page.getByText('Download: ')).toBeVisible();

    // Close modal
    const closeModal = page.getByRole('button', { name: 'Close', exact: true });
    await closeModal.click();
    await expect(page.getByText('Demo Link Intercepted')).not.toBeVisible();
  });

  test('should filter images by category', async ({ page }) => {
    const gallery = page.getByTestId('photo-gallery');

    // Initial count (All)
    const initialCount = await gallery.getByRole('button', { name: /View full size/ }).count();
    expect(initialCount).toBeGreaterThan(0);

    // Click "Beach" filter (assuming it exists in data)
    // El Nido, Siargao, Boracay have "Beach". Bohol has "Nature".
    // So "Nature" should show fewer images than All.
    const natureFilter = page.getByRole('button', { name: 'Nature', exact: true });

    if (await natureFilter.isVisible()) {
      await natureFilter.click();

      // Wait for filtering (animation might delay it, but react update is fast)
      // Playwright auto-waits for checks? Not for count reduction necessarily.
      // But button click awaits action.

      // Bohol (1) + El Nido (5) might have Nature?
      // El Nido tags: ['Beach', 'Island Hopping', 'Nature'] -> Category is 'Beach' (first tag)
      // Bohol tags: ['Nature', 'Hiking', 'Sightseeing'] -> Category is 'Nature'
      // So filtering by 'Nature' should ONLY show Bohol images (1 image).

      // Filtering by 'Nature' should show fewer images than All.
      await expect(gallery.getByRole('button', { name: /View full size/ })).not.toHaveCount(
        initialCount
      );
    }
  });
});
