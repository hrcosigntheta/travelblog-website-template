import { test, expect } from '@playwright/test';

test.describe('Destination Detail Page', () => {
  const destinationSlug = 'el-nido-palawan';
  const destinationUrl = `./destinations/${destinationSlug}/`;

  test.beforeEach(async ({ page }) => {
    await page.goto(destinationUrl);
    // Ensure network is idle to prevent incomplete loading
    await page.waitForLoadState('networkidle');
  });

  test('Renders all major sections', async ({ page }) => {
    // 1. Hero Section
    // Use first() to get the hero h1 and avoid the print header h1
    await expect(page.locator('h1').first()).toHaveText(/El Nido, Palawan/);

    // Stats in Hero (Use .first() to avoid strict mode violation as it appears in sidebar too)
    await expect(page.getByText('Best Time').first()).toBeVisible();
    await expect(page.getByText('Budget').first()).toBeVisible();
    await expect(page.getByText('Difficulty').first()).toBeVisible();

    // 2. Main Content
    await expect(page.getByRole('heading', { name: 'About El Nido, Palawan' })).toBeVisible();
    await expect(page.getByText(/El Nido is known for/)).toBeVisible();

    // Highlights
    await expect(page.getByRole('heading', { name: 'Highlights' })).toBeVisible();
    await expect(page.getByText('Big Lagoon & Small Lagoon kayaking')).toBeVisible();

    // 3. Sidebar (Trip Essentials) - Desktop
    if ((page.viewportSize()?.width || 0) >= 1024) {
      await expect(page.getByRole('heading', { name: 'Trip Essentials' })).toBeVisible();
    }

    // 4. Photo Gallery
    await expect(page.getByRole('heading', { name: 'Photo Gallery' })).toBeVisible();
    // Check for at least one image
    const galleryImage = page.locator('img[alt="El Nido, Palawan photography - Shot 1"]').first();
    await galleryImage.scrollIntoViewIfNeeded();
    // Verify it exists (relaxed visibility check for CI/headless where onLoad might lag)
    await expect(galleryImage).toBeVisible();

    // 5. Itinerary
    await expect(page.getByRole('heading', { name: 'Suggested Itinerary' })).toBeVisible();
    await expect(page.getByText('Arrival & Town Exploration')).toBeVisible();

    // 6. Map
    await expect(page.getByRole('heading', { name: 'Location' })).toBeVisible();
    // The map container should be present (content might be lazy loaded/client-only)
    // Use .first() to avoid strict mode if multiple layers match
    await expect(
      page.locator('.leaflet-container').or(page.locator('div.h-\\[500px\\]')).first()
    ).toBeVisible();

    // 7. Practical Info
    await expect(page.getByRole('heading', { name: 'Practical Information' })).toBeVisible();
    // Use visible=true to find the one currently shown (mobile or desktop)
    await expect(page.locator('text="Getting There" >> visible=true')).toBeVisible();
  });

  test('Social Share buttons trigger Demo Modal', async ({ page }) => {
    // Facebook
    await page.click('button[data-share="facebook"]');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Facebook Share')).toBeVisible();
    await page.click('button[aria-label="Close modal"]'); // or however the close button is defined
    await expect(page.getByRole('dialog')).toBeHidden();

    // Twitter
    await page.click('button[data-share="twitter"]');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Twitter Share')).toBeVisible();
    await page.click('button[aria-label="Close modal"]');
    await expect(page.getByRole('dialog')).toBeHidden();

    // Pinterest
    await page.click('button[data-share="pinterest"]');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Pinterest Share')).toBeVisible();
    await page.click('button[aria-label="Close modal"]');
    await expect(page.getByRole('dialog')).toBeHidden();

    // Copy Link
    await page.click('button[data-share="copy"]');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Copy Link')).toBeVisible();
    await page.click('button[aria-label="Close modal"]');
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('Theme toggle persists on reload', async ({ page }) => {
    // 1. Initial State: Should be light (or system default, assuming light for test consistency if possible, but let's just check the toggle)
    // Check for dark class on html
    const html = page.locator('html');
    const isDarkInitially = await html.getAttribute('class').then((c) => c?.includes('dark'));

    // Handle Mobile: Theme toggle might be in the hamburger menu
    if ((page.viewportSize()?.width || 0) < 768) {
      // Open menu
      await page.click('button[aria-label="Open menu"]');
      // Wait for menu to be visible
      await expect(page.getByRole('dialog')).toBeVisible();
      // Click the toggle inside the mobile menu (dialog)
      await page.locator('div[role="dialog"]').locator('button[title^="Switch to"]').click();
    } else {
      // Desktop: Click the toggle in the nav
      await page.locator('nav').locator('button[title^="Switch to"]').click();
    }

    // 3. Verify Change
    if (isDarkInitially) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // 4. Reload
    await page.reload();

    // 5. Verify Persistence
    if (isDarkInitially) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
  });

  test('Related Destinations are displayed', async ({ page }) => {
    // Check for the section in sidebar or bottom
    // In the code, it's in the sidebar: <RelatedDestinations ... />
    if ((page.viewportSize()?.width || 0) >= 1024) {
      await expect(page.getByRole('heading', { name: 'You Might Also Like' })).toBeVisible();
      // Should have some destination cards (assuming there are related ones)
      // El Nido is region 'Palawan'. destinations.ts has no other Palawan entries?
      // Wait, dests are: El Nido (Palawan), Siargao (Surigao), Bohol, Boracay (Aklan).
      // The logic falls back to "others" if < 3 related.
      // So it should show 3 cards.
      const relatedCards = page.locator('a[href*="/destinations/"]');
      // Ensure at least one related card is visible (waits for hydration/render)
      await expect(relatedCards.first()).toBeVisible();

      // It's specific to the RelatedDestinations component.
      // Let's target the heading and look for cards nearby.
      const relatedSection = page.locator('div').filter({ hasText: 'You Might Also Like' }).first();
      // Just verify visibility for now
      await expect(relatedSection).toBeVisible();
    }
  });
});
