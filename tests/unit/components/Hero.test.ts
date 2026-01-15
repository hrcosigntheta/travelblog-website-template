// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Hero from '../../../src/components/Hero.astro';

describe('Hero Component', () => {
  it('renders title and tagline', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero, {
      props: {
        title: 'Welcome to Paradise',
        tagline: 'Discover the best beaches',
        image: '/hero.jpg',
      },
    });

    expect(result).toContain('Welcome to Paradise');
    expect(result).toContain('Discover the best beaches');
    expect(result).toContain('src="/hero.jpg"');
  });

  it('renders CTA button when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero, {
      props: {
        title: 'Test',
        image: '/img.jpg',
        primaryAction: { label: 'Explore Now', href: '/explore' },
      },
    });

    expect(result).toContain('Explore Now');
    expect(result).toContain('href="/explore"');
  });

  it('renders scroll indicator', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Hero, {
      props: {
        title: 'Test',
        image: '/img.jpg',
      },
    });

    expect(result).toContain('aria-label="Scroll down"');
  });
});
