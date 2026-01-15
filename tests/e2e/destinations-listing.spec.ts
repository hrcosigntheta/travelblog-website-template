import { test, expect } from '@playwright/test';

test.describe('Destinations Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/destinations');
  });

  test('should render page title and destinations grid', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Explore Destinations');
    // Expect at least one destination card
    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
  });

  test('should filter by search query', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('El Nido');

    // Wait for debounce if any (default is usually instant in React state unless debounced explicitly)
    // In our implementation, we just use onChange -> setVal -> useMemo, so it's instant.
    await expect(page.getByTestId('destination-card')).toHaveCount(1);
    await expect(page.getByTestId('destination-card').first()).toContainText('El Nido');
  });

  test('should filter by checkbox selection (Region)', async ({ page }) => {
    // Open region filter if needed (on mobile)
    const filterToggle = page.getByRole('button', { name: /Filters/i });
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    const palawanCheckbox = page.getByLabel('Palawan', { exact: true });
    await palawanCheckbox.check();

    // Close filters on mobile to see results (optional, but good for visibility)
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    // Verify filter applied
    // Assuming mock data has Palawan destination
    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
    const text = await page.getByTestId('destination-card').first().textContent();
    expect(text).toContain('Palawan');
  });

  test('should show empty state when no results found', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('NonExistentPlaceXYZ');

    await expect(page.getByTestId('destination-card')).toHaveCount(0);
    await expect(page.getByText('No destinations found')).toBeVisible();
  });

  test('should clear all filters', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('NonExistentPlaceXYZ');
    await expect(page.getByText('No destinations found')).toBeVisible();

    const clearButton = page.getByRole('button', { name: 'Clear all filters' });
    await clearButton.click();

    // Should show results again
    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
    await expect(searchInput).toBeEmpty();
  });

  test('should toggle mobile filters drawer', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if filter panel is hidden initially on mobile
    const filterPanel = page.locator('#filter-panel');
    // Note: The implementation uses 'hidden lg:block', so on mobile it is hidden unless toggled
    await expect(filterPanel).toBeHidden();

    // Click toggle button
    const toggleButton = page.getByRole('button', { name: /Filters/i });
    await toggleButton.click();

    await expect(filterPanel).toBeVisible();
  });

  test('should include structured data schema', async ({ page }) => {
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toHaveCount(1);

    const schemaContent = await schemaScript.textContent();
    const schema = JSON.parse(schemaContent || '{}');

    expect(schema['@type']).toBe('CollectionPage');
    expect(schema.name).toBe('Explore Destinations | Philippines Travel Blog');
  });
});
