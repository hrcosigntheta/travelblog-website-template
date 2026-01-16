// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import FeaturedDestinations from '../../../src/components/FeaturedDestinations.astro';

describe('FeaturedDestinations Component', () => {
  it('renders section title', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(FeaturedDestinations);

    expect(result).toContain('Featured Destinations');
  });

  it('renders featured cards', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(FeaturedDestinations);

    // It should render 3 cards (based on mock data)
    // We check for titles
    expect(result).toContain('El Nido, Palawan');
    expect(result).toContain('Siargao Island');
    expect(result).toContain('Chocolate Hills, Bohol');

    // Boracay is NOT featured in mock data
    expect(result).not.toContain('Boracay Island');
  });

  it('renders "View all" link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(FeaturedDestinations);

    expect(result).toContain('href="/destinations/"');
    expect(result).toContain('View all destinations');
  });
});
