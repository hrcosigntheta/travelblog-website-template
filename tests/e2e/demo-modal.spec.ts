import { test, expect } from '@playwright/test';

test.describe('Demo Link Modal', () => {
  test.beforeEach(async ({ page }) => {
    // Go to about page as it has many demo links
    // Use networkidle to ensure hydration completes
    await page.goto('./about/', { waitUntil: 'networkidle' });
  });

  test('should open when clicking a social media link in BloggerHero', async ({ page }) => {
    // The label in BloggerHero is just "Instagram"
    const instagramLink = page
      .locator('section')
      .filter({ hasText: "Hi, I'm MasuRii" })
      .locator('a[aria-label="Instagram"]');

    await instagramLink.scrollIntoViewIfNeeded();
    await instagramLink.click({ force: true });

    // Verify modal is visible
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Demo Link Intercepted');
    await expect(modal).toContainText('Instagram Profile');

    // Close modal
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await expect(modal).not.toBeVisible();
  });

  test('should open when clicking a social media link in Footer', async ({ page }) => {
    // Click Instagram link in footer
    const footerInstagram = page
      .locator('footer')
      .getByRole('link', { name: 'Instagram', exact: true });

    await footerInstagram.scrollIntoViewIfNeeded();
    await footerInstagram.click({ force: true });

    // Verify modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Instagram Profile');

    // Close with close button (X)
    await page.getByLabel('Close modal').click();
    await expect(modal).not.toBeVisible();
  });

  test('should open when submitting the newsletter form', async ({ page }) => {
    const footer = page.locator('footer');
    const emailInput = footer.locator('input[type="email"]');
    const subscribeButton = footer.locator('button[type="submit"]');

    await emailInput.scrollIntoViewIfNeeded();
    await emailInput.fill('test@example.com');
    await subscribeButton.click({ force: true });

    // Verify modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Newsletter Subscription: test@example.com');

    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await expect(modal).not.toBeVisible();
  });

  test('should open from SocialLinksSection on contact page', async ({ page }) => {
    await page.goto('./contact/', { waitUntil: 'networkidle' });

    // Click Visit my Instagram link in section
    const socialLink = page.getByLabel('Visit my Instagram');

    await socialLink.scrollIntoViewIfNeeded();
    await socialLink.click({ force: true });

    // Verify modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Instagram Profile');

    // Close by clicking backdrop
    // backdrop is the outer div with role="dialog"
    await modal.click({ position: { x: 5, y: 5 }, force: true });
    await expect(modal).not.toBeVisible();
  });

  test('should open when submitting contact form', async ({ page }) => {
    await page.goto('./contact/', { waitUntil: 'networkidle' });

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="subject"]', 'Travel Consultation');
    await page.fill(
      'textarea[name="message"]',
      'This is a test message that is long enough to pass validation.'
    );

    await page.click('button[type="submit"]', { force: true });

    // Verify modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Send Message: Travel Consultation');

    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await expect(modal).not.toBeVisible();

    // Verify success message on page after modal close
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expect(page.locator('[role="alert"]')).toContainText('Message sent successfully!');
  });
});
