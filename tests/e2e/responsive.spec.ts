import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('Navigation adapts to viewport', async ({ page, viewport }) => {
    // Check navigation state based on viewport width
    const width = viewport?.width || 0;

    // Breakpoint is 768px (md)
    if (width < 768) {
      // Mobile (below md)
      console.log(`Testing Mobile Viewport: ${width}px`);

      // Expect mobile menu button to be visible
      await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();

      // Expect desktop nav container to be hidden
      // Note: Playwright checks computed visibility, so 'display: none' via 'hidden' class should satisfy this
      await expect(page.locator('nav').first()).toBeHidden();

      // Test opening the mobile menu
      await page.click('button[aria-label="Open menu"]');
      await expect(page.locator('div[role="dialog"]')).toBeVisible(); // Assuming MobileMenu uses dialog role or similar structure

      // Close it
      await page.click('button[aria-label="Close menu"]');
      await expect(page.locator('div[role="dialog"]')).toBeHidden();
    } else {
      // Desktop (md and up)
      console.log(`Testing Desktop Viewport: ${width}px`);

      // Expect mobile menu button to be hidden
      await expect(page.locator('button[aria-label="Open menu"]')).toBeHidden();

      // Expect desktop nav to be visible and have links
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();

      // Check for specific links
      await expect(nav.getByText('Destinations')).toBeVisible();
      await expect(nav.getByText('About')).toBeVisible();
    }
  });

  test('Footer adapts to viewport', async ({ page }) => {
    // Ensure footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer content visibility
    // We can't easily check CSS grid columns via expect(), but we can check if content is visible
    await expect(footer.getByRole('heading', { name: 'TravelBlog' })).toBeVisible(); // Brand

    await expect(footer.getByRole('heading', { name: 'Explore' })).toBeVisible(); // Section title
    await expect(footer.getByRole('heading', { name: 'Company' })).toBeVisible(); // Section title
    await expect(footer.getByRole('heading', { name: 'Newsletter' })).toBeVisible(); // Section title
  });

  test('Layout stability (Basic)', async ({ page }) => {
    // Ensure key elements are stable and present
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Take a screenshot for debugging/verification
    // We name it with the viewport width to distinguish
    const width = page.viewportSize()?.width || 0;
    await page.screenshot({ path: `tests/e2e/screenshots/layout-${width}.png`, fullPage: true });
  });
});
