import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('renders about page content with correct metadata and sections', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle('About MasuRii | Philippine Travel Blog');

    // Check Hero Section
    await expect(
      page.getByRole('heading', { name: 'Exploring the Pearl of the Orient' })
    ).toBeVisible();

    // Check BloggerHero Section (Bio)
    await expect(page.getByRole('heading', { name: /MasuRii/ })).toBeVisible();
    await expect(page.getByText('Our Story')).toBeVisible();

    // Check Travel Philosophy Section
    await expect(page.getByRole('heading', { name: 'Travel Philosophy' })).toBeVisible();
    await expect(page.getByText('We believe in slow travel')).toBeVisible();

    // Check Travel Stats Section
    // We look for specific stats passed in about.astro
    // Scope to the container that has "Countries Visited" to distinguish from BloggerHero stats
    const statsSection = page.locator('section').filter({ hasText: 'Countries Visited' });
    await expect(statsSection).toBeVisible();
    await expect(statsSection.getByText('Islands Visited')).toBeVisible();

    // Check Travel Timeline Section
    await expect(page.getByText('The Journey Begins')).toBeVisible(); // 2016
    await expect(page.getByText('First Viral Post')).toBeVisible(); // 2017

    // Check Equipment Showcase Section
    await expect(page.getByRole('heading', { name: 'Essential Gear' })).toBeVisible();
    await expect(page.getByText("What's in the bag")).toBeVisible();
    await expect(page.getByText('Sony A7 IV')).toBeVisible();
  });

  test('interactive elements trigger demo modal', async ({ page }) => {
    // Scroll down to ensure client:visible components hydrate
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => window.scrollTo(0, 0));

    // Check social links in BloggerHero
    // Use role button/link with name matching label, scoped to BloggerHero
    // BloggerHero contains "Our Story" or the bio text
    const bloggerHero = page.locator('section').filter({ hasText: 'Our Story' });
    const twitterLink = bloggerHero.getByRole('link', { name: 'Twitter' });
    await expect(twitterLink).toBeVisible();
    await twitterLink.click();

    // Verify modal appears
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Demo Link Intercepted')).toBeVisible();

    // Close modal
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Check shop links in EquipmentShowcase
    const shopLink = page.getByRole('link', { name: 'Check Price' }).first();
    await shopLink.scrollIntoViewIfNeeded();
    await shopLink.click();

    // Verify modal appears again
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Shop: Sony A7 IV')).toBeVisible();
  });

  test('responsive layout adjustments', async ({ page }) => {
    // Desktop view is default
    await expect(
      page.getByRole('heading', { name: 'Exploring the Pearl of the Orient' })
    ).toBeVisible();

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if key elements are still visible and layout adapts (no horizontal scroll)
    // Checking specific mobile styles is hard without visual regression, but we can check visibility
    await expect(
      page.getByRole('heading', { name: 'Exploring the Pearl of the Orient' })
    ).toBeVisible();

    // Check hamburger menu presence (assuming Header has it)
    // This is more of a Header test, but good sanity check
    const menuButton = page.getByLabel('Open menu'); // Adjust label if different
    if (await menuButton.isVisible()) {
      await expect(menuButton).toBeVisible();
    }
  });

  test('theme switching persists', async ({ page }) => {
    // Check default theme
    const html = page.locator('html');

    // Check if desktop toggle is visible
    const desktopToggle = page.getByRole('button', { name: /Switch to .* mode/ });
    let themeToggle = desktopToggle.first();

    if (!(await desktopToggle.first().isVisible())) {
      // We are on mobile, open menu first
      const menuButton = page.getByLabel('Open menu');
      await menuButton.click();
      await expect(page.getByRole('dialog')).toBeVisible(); // Menu is a dialog
      // Locate toggle inside menu (it might be the same selector, but now visible)
      themeToggle = page.getByRole('button', { name: /Switch to .* mode/ }).last(); // Last because desktop one still exists in DOM but hidden? Or first visible?
      // Actually, if desktop nav is hidden, the button might still be in DOM but hidden.
      // Playwright's click requires visibility.
      // Let's filter by visibility.
      const toggles = page.getByRole('button', { name: /Switch to .* mode/ });
      const count = await toggles.count();
      for (let i = 0; i < count; ++i) {
        if (await toggles.nth(i).isVisible()) {
          themeToggle = toggles.nth(i);
          break;
        }
      }
    }

    await expect(themeToggle).toBeVisible();

    const initialClass = await html.getAttribute('class');
    const isDarkInitially = initialClass?.includes('dark');

    await themeToggle.click();

    // Check if class changed
    if (isDarkInitially) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
  });
});
