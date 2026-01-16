import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./contact/');
  });

  test('should render contact page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Send us a Message' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
  });

  test('should allow filling out the contact form', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="subject"]', 'General Inquiry');
    await page.fill('textarea[name="message"]', 'Hello, I love your blog!');

    // Check values
    await expect(page.locator('input[name="name"]')).toHaveValue('John Doe');
  });

  test('should trigger demo modal on form submission', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="subject"]', 'General Inquiry');
    await page.fill(
      'textarea[name="message"]',
      'This is a test message that is definitely longer than twenty characters.'
    );

    await page.click('button[type="submit"]');

    // Modal should appear
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Demo Link Intercepted')).toBeVisible();
    await expect(page.getByText('Contact Form')).toBeVisible();
  });

  test('should handle FAQ accordion interactions', async ({ page }) => {
    const firstQuestion = page.getByText('How do I plan a trip to the Philippines?');
    const firstAnswer = page.getByText('Start by deciding your main interests: beaches');

    await expect(firstQuestion).toBeVisible();

    // Check initial state (collapsed)
    const button = page.getByRole('button', { name: 'How do I plan a trip to the Philippines?' });
    await expect(button).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(firstAnswer).toBeVisible();

    // Click to collapse
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should trigger demo modal on social links', async ({ page, isMobile }) => {
    // Find the first social link with class demo-link or just by name
    const instagramLink = page.getByRole('link', { name: 'Visit my Instagram' });

    // On mobile, sometimes hover effects or touch interactions can be tricky with Playwright
    // We scroll into view first
    await instagramLink.scrollIntoViewIfNeeded();

    if (isMobile) {
      // On mobile, tap is more appropriate, or force click
      await instagramLink.tap();
    } else {
      await instagramLink.click();
    }

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('https://instagram.com')).toBeVisible();
  });
});
