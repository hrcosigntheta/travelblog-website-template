import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should render contact page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact Us/);
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Send us a Message' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
  });

  test('should allow filling out the contact form', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="subject"]', 'general');
    await page.fill('textarea[name="message"]', 'Hello, I love your blog!');

    // Check values
    await expect(page.locator('input[name="name"]')).toHaveValue('John Doe');
  });

  test('should trigger demo modal on form submission', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="subject"]', 'general');
    await page.fill('textarea[name="message"]', 'Test message');

    await page.click('button[type="submit"]');

    // Modal should appear
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Demo Link Intercepted')).toBeVisible();
    await expect(page.getByText('/api/contact-submit')).toBeVisible();
  });

  test('should handle FAQ accordion interactions', async ({ page }) => {
    const firstQuestion = page.getByText('Can I use your photos for my blog?');
    const firstAnswer = page.getByText('All photos on this website are copyrighted');

    await expect(firstQuestion).toBeVisible();
    // Answer might be hidden or technically visible with 0 height depending on implementation
    // But text should be in DOM.

    // Click to expand
    await firstQuestion.click();
    await expect(firstAnswer).toBeVisible();

    // Click to collapse
    await firstQuestion.click();
    // Wait for animation or check accessibility state
    await expect(page.locator('button[aria-expanded="false"]').first()).toBeVisible();
  });

  test('should trigger demo modal on social links', async ({ page }) => {
    // Find the first social link with class demo-link
    const instagramLink = page.locator('a.demo-link').filter({ hasText: 'Instagram' });
    await instagramLink.click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('https://instagram.com')).toBeVisible();
  });
});
