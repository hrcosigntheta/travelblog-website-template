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

    // Wait for filter to apply
    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
    await expect(page.getByTestId('destination-card').first()).toContainText('El Nido');
  });

  test('should filter by checkbox selection (Region)', async ({ page }) => {
    // Open region filter if needed (on mobile)
    const filterToggle = page.locator('button[aria-controls="filter-panel"]');
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    const palawanCheckbox = page.getByLabel('Palawan', { exact: true });
    await palawanCheckbox.check();

    // Close filters on mobile to see results
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    // Verify filter applied
    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
    const text = await page.getByTestId('destination-card').first().textContent();
    expect(text).toContain('Palawan');
  });

  test('should show empty state when no results found', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('NonExistentPlaceXYZ');

    await expect(page.getByTestId('destination-card')).toHaveCount(0);
    await expect(page.getByText('No results found')).toBeVisible();
  });

  test('should clear all filters', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('NonExistentPlaceXYZ');
    await expect(page.getByText('No results found')).toBeVisible();

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
    await expect(filterPanel).toBeHidden();

    // Click toggle button
    const toggleButton = page.locator('button[aria-controls="filter-panel"]');
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

  test('should filter by category', async ({ page }) => {
    // Open filter if needed (mobile)
    const filterToggle = page.locator('button[aria-controls="filter-panel"]');
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    const categoryCheckbox = page.getByLabel('Beach', { exact: true });
    await categoryCheckbox.check();

    // Close filters on mobile
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
    // Use first() on the card locator, then find text within it
    await expect(page.getByTestId('destination-card').first().getByText('Beach')).toBeVisible();
  });

  test('should combine search and filters', async ({ page }) => {
    // 1. Search for a specific term
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('El Nido');

    // 2. Filter by Region (e.g. Palawan)
    const filterToggle = page.locator('button[aria-controls="filter-panel"]');
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    const regionCheckbox = page.getByLabel('Palawan', { exact: true });
    await regionCheckbox.check();

    if (await filterToggle.isVisible()) {
      await filterToggle.click();
    }

    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);
    await expect(page.getByTestId('destination-card').first()).toContainText('El Nido');
  });

  test('should sync state with URL', async ({ page }) => {
    // 1. Apply search
    const searchInput = page.getByPlaceholder('Search destinations...');
    await searchInput.fill('El Nido');

    // Verify URL contains query
    await expect(page).toHaveURL(/q=El(\+|%20)Nido/);

    // 2. Reload page
    await page.reload();

    // Verify search input still has value
    await expect(searchInput).toHaveValue('El Nido');
    await expect(page.getByTestId('destination-card')).not.toHaveCount(0);

    // 3. Navigate back
    await page.goto('/destinations'); // Reset
    await searchInput.fill('Bohol');
    await expect(page).toHaveURL(/q=Bohol/);

    await page.goBack();
    // Should be empty or previous state.
    // Wait, step 3 logic:
    // Start: /destinations
    // Fill 'Bohol' -> /destinations?q=Bohol
    // Go Back -> /destinations (or previous /destinations?q=El Nido if history preserved)
    // The previous state was /destinations?q=El Nido (from step 1, assuming reload kept it)

    // Actually, page.goto('/destinations') pushes a new entry or replaces?
    // Let's test a cleaner flow:
    // 1. goto /destinations
    // 2. Search 'A' -> URL ?q=A
    // 3. Search 'B' -> URL ?q=B
    // 4. Back -> URL ?q=A, Input 'A'

    await page.goto('/destinations');
    await searchInput.fill('Alpha');
    await expect(page).toHaveURL(/q=Alpha/);

    await searchInput.fill('Beta');
    await expect(page).toHaveURL(/q=Beta/);

    await page.goBack();
    await expect(page).toHaveURL(/q=Alpha/);
    await expect(searchInput).toHaveValue('Alpha');
  });
});
