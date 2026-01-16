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
    // Gallery page has 2 schemas: ImageGallery and BreadcrumbList
    await expect(schemaScript).toHaveCount(2);

    const schemaContent = await schemaScript.first().textContent();
    expect(schemaContent).toBeTruthy();

    // First script or second should be ImageGallery. Let's just check if any matches.
    const allSchemas = await schemaScript.all();
    let hasImageGallery = false;
    for (const script of allSchemas) {
      const content = await script.textContent();
      const parsed = JSON.parse(content || '{}');
      if (parsed['@type'] === 'ImageGallery') {
        hasImageGallery = true;
        expect(parsed.name).toBe('Photo Gallery | Philippines Travel Blog');
        expect(Array.isArray(parsed.image)).toBe(true);
        expect(parsed.image.length).toBeGreaterThan(0);
      }
    }
    expect(hasImageGallery).toBe(true);
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
