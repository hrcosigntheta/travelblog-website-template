// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import CategoriesShowcase from '../../../src/components/CategoriesShowcase.astro';

describe('CategoriesShowcase Component', () => {
  it('renders section title', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CategoriesShowcase, {
      props: {
        title: 'Test Categories',
      },
    });

    expect(result).toContain('Test Categories');
  });

  it('renders category cards', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CategoriesShowcase);

    expect(result).toContain('Beaches &amp; Islands');
    expect(result).toContain('Mountains &amp; Hiking');
    expect(result).toContain('href="/destinations?category=beaches"');
  });
});
