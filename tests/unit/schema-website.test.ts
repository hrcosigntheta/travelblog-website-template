import { describe, it, expect } from 'vitest';
import { generateWebSiteSchema } from '../../src/utils/schema';

describe('generateWebSiteSchema', () => {
  const siteUrl = 'https://mysite.com';

  it('generates valid WebSite schema', () => {
    const schema = generateWebSiteSchema(siteUrl);
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('Philippines Travel Blog');
    expect(schema.url).toBe(siteUrl);
  });

  it('includes SearchAction', () => {
    const schema = generateWebSiteSchema(siteUrl);
    expect(schema.potentialAction).toBeDefined();
    expect(schema.potentialAction['@type']).toBe('SearchAction');
    expect(schema.potentialAction.target.urlTemplate).toContain('q={search_term_string}');
  });
});
