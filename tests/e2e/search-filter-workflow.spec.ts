import { test, expect } from '@playwright/test';

test.describe('Search and Filter Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to destinations listing page with retries for stability
    for (let i = 0; i < 3; i++) {
      try {
        await page.goto('./destinations/', { waitUntil: 'networkidle' });
        break;
      } catch (e) {
        if (i === 2) throw e;
        await page.waitForTimeout(1000);
      }
    }
    // Wait for components to hydrate
    await expect(page.getByText(/Showing \d+ destinations/)).toBeVisible();
  });

  test('should complete the full search and filter workflow', async ({ page }) => {
    // 1. Enter search term
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('Cebu');

    // Wait for debounce and filtering (Fuse.js)
    await expect(page.getByText(/Showing \d+ destinations/)).toContainText('8'); // We know there are 8 Cebu items from progress.txt
    await expect(page.getByTestId('destination-card')).toHaveCount(8);

    // 2. Apply filters (Category: Diving)
    const isMobile = await page.evaluate(() => window.innerWidth < 1024);
    if (isMobile) {
      await page.locator('button[aria-controls="filter-panel"]').click();
      // Wait for animation to settle
      await page.waitForTimeout(500);
    } else {
      // On desktop, ensure the category group is expanded
      const categorySummary = page.locator('summary', { hasText: 'Category' });
      const isExpanded = await categorySummary.evaluate(
        (el) => (el.parentElement as HTMLDetailsElement).open
      );
      if (!isExpanded) {
        await categorySummary.click();
      }
    }

    const divingOption = page.locator('label').filter({ hasText: /^Diving$/ });
    await divingOption.scrollIntoViewIfNeeded();
    // Click the label/text instead of input directly to be more robust
    // Use force: true to bypass potential pointer interception issues
    await divingOption.click({ force: true });

    if (isMobile) {
      // Use the mobile-specific close button or backdrop
      const backdrop = page.getByTestId('mobile-backdrop');
      if (await backdrop.isVisible()) {
        await backdrop.click({ position: { x: 10, y: 10 }, force: true });
      } else {
        const closeButton = page.getByLabel('Close filters');
        await closeButton.click({ force: true });
      }
      await page.waitForTimeout(500);
    }

    // 3. View filtered results
    // Cebu + Diving should be Moalboal and Malapascua (2 destinations)
    await expect(page.getByText(/Showing \d+ destinations/)).toContainText('2');
    await expect(page.getByTestId('destination-card')).toHaveCount(2);
    // Check that at least one of them is Moalboal (order might vary)
    await expect(
      page.getByTestId('destination-card').filter({ hasText: 'Moalboal' })
    ).toBeVisible();
    await expect(
      page.getByTestId('destination-card').filter({ hasText: 'Malapascua' })
    ).toBeVisible();

    // 4. Share filtered URL
    // Check if share buttons are visible
    await expect(page.getByText(/Share results/i)).toBeVisible();

    // Test Copy Link
    const copyButton = page.getByRole('button', { name: /Copy Link/i });
    await copyButton.click();
    await expect(page.getByRole('alert')).toContainText(/Copied/i);

    // Verify URL reflects state
    const currentUrl = page.url();
    expect(currentUrl).toContain('q=Cebu');
    expect(currentUrl).toContain('category=Diving');

    // 5. Clear filters
    const clearButton = page.getByRole('button', { name: /Clear all/i }).first();
    await clearButton.click({ force: true });

    // Verify reset to all (19 destinations)
    await expect(page.getByText(/Showing \d+ destinations/)).toContainText('19');
    await expect(searchInput).toBeEmpty();
    await expect(page).not.toHaveURL(/q=/);

    // 6. Load shared URL
    await page.goto(currentUrl, { waitUntil: 'load' });
    // Wait for text to appear and be correct
    await expect(page.getByText(/Showing \d+ destinations/)).toContainText('2', { timeout: 10000 });
    await expect(page.getByPlaceholder('Search destinations...')).toHaveValue('Cebu');
    await expect(page.locator('input[value="Diving"]')).toBeChecked();
  });

  test('should show empty state and clear it', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('InvalidSearchQueryXYZ');

    // Wait for results to update to 0
    await expect(page.getByTestId('destination-card')).toHaveCount(0);

    // Empty state should be visible
    await expect(page.getByText('No results found')).toBeVisible();

    // Click clear button in empty state
    await page.getByRole('button', { name: 'Clear all filters' }).click();

    // Should show results again
    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
  });
});
