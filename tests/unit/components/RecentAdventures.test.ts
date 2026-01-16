// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import RecentAdventures from '../../../src/components/RecentAdventures.astro';

describe('RecentAdventures Component', () => {
  it('renders section title', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(RecentAdventures, {
      props: {
        title: 'Latest Stories',
      },
    });

    expect(result).toContain('Latest Stories');
  });

  it('renders adventure cards', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(RecentAdventures);

    expect(result).toContain('My First Cebu Adventure');
    expect(result).toContain('Island Hopping in Palawan');
    expect(result).toContain('href="/blog/my-first-cebu-adventure"');
  });

  it('renders "View all" link', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(RecentAdventures);

    expect(result).toContain('href="/blog"');
    expect(result).toContain('View all adventures');
  });
});
