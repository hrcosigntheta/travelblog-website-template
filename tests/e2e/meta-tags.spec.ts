import { test, expect } from '@playwright/test';

test.describe('Meta Tags', () => {
  test('homepage has required meta tags', async ({ page }) => {
    await page.goto('./');

    // Title
    await expect(page).toHaveTitle(/TravelBlog - Explore the Philippines/);

    // Description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /destinations.*Philippines/i);

    // Canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.*/);

    // OG
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    // Default image check - might depend on build URL structure but should end with image name
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
    expect(ogImage).toContain('og-default.jpg');

    // Twitter
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
  });

  test('destination page has article meta tags', async ({ page }) => {
    // Navigate to a destination page (we know El Nido exists from data)
    await page.goto('./destinations/el-nido-palawan/');

    // Title
    await expect(page).toHaveTitle(/El Nido/);

    // OG Type should be article
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');

    // OG Image should be specific to destination
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
    expect(ogImage).not.toContain('og-default.jpg');
    // It should be the destination image
    expect(ogImage).toContain('el-nido-palawan');
  });
});
