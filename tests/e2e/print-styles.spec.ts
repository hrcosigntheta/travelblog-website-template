import { test, expect } from '@playwright/test';

test.describe('Print Styles', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a destination page which has the itinerary and print button
    await page.goto('./destinations/kawasan-falls/');
    await page.waitForLoadState('networkidle');
  });

  test('should hide non-printable elements in print mode', async ({ page }) => {
    // Emulate print media
    await page.emulateMedia({ media: 'print' });

    // 1. Navigation should be hidden
    const navs = page.locator('nav');
    const navCount = await navs.count();
    for (let i = 0; i < navCount; i++) {
      await expect(navs.nth(i)).toBeHidden();
    }

    // 2. Footer should be hidden
    const footer = page.locator('footer');
    await expect(footer).toBeHidden();

    // 3. Print button itself should be hidden
    const printBtn = page.locator('#print-itinerary-btn');
    await expect(printBtn).toBeHidden();

    // 4. Back to top button should be hidden
    const backToTop = page.locator('#back-to-top');
    await expect(backToTop).toBeHidden();

    // 5. Newsletter section should be hidden
    const newsletter = page.locator('section:has-text("Join the Adventure")');
    if ((await newsletter.count()) > 0) {
      await expect(newsletter).toBeHidden();
    }
  });

  test('should show print header in print mode', async ({ page }) => {
    // Before emulation, it should be hidden
    const printHeader = page.locator('.print\\:block').filter({ hasText: 'Kawasan Falls' });
    await expect(printHeader).not.toBeVisible();

    // Emulate print media
    await page.emulateMedia({ media: 'print' });

    // Now it should be visible
    await expect(printHeader).toBeVisible();
  });

  test('should expand all itinerary days in print mode', async ({ page }) => {
    // Emulate print media
    await page.emulateMedia({ media: 'print' });

    // All itinerary content divs should be visible regardless of their open/closed state in screen mode
    const itineraryContent = page.locator('.print\\:max-h-none').first();
    await expect(itineraryContent).toBeVisible();

    // Check computed style to ensure it's actually visible
    const visibility = await itineraryContent.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.opacity !== '0' && style.visibility !== 'hidden';
    });
    expect(visibility).toBe(true);
  });

  test('should show URLs for external links in print mode', async ({ page, browserName }) => {
    // Skip pseudo-element check in Firefox due to emulation limitations
    if (browserName === 'firefox') {
      test.skip();
    }

    await page.emulateMedia({ media: 'print' });

    // Find an external link
    const externalLink = page.locator('a[href^="http"]').first();
    if ((await externalLink.count()) > 0) {
      const hasAfterContent = await externalLink.evaluate((el) => {
        const afterStyle = window.getComputedStyle(el, '::after');
        return afterStyle.content && afterStyle.content !== 'none';
      });
      expect(hasAfterContent).toBe(true);
    }
  });

  test('should apply print-friendly colors', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });

    // Use a small delay to allow styles to settle
    await page.waitForTimeout(500);

    const bodyColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).color;
    });

    // In global.css we have color: black !important;
    // Note: color: black is rgb(0, 0, 0)
    expect(bodyColor).toBe('rgb(0, 0, 0)');
  });
});
