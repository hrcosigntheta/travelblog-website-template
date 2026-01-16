import { describe, it, expect } from 'vitest';
import { generateBreadcrumbSchema } from '../../src/utils/schema';

describe('generateBreadcrumbSchema', () => {
  const siteUrl = 'https://mysite.com';
  const items = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'El Nido', href: '/destinations/el-nido' },
  ];

  it('generates valid BreadcrumbList schema', () => {
    const schema = generateBreadcrumbSchema(items, siteUrl);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
  });

  it('generates correct list items', () => {
    const schema = generateBreadcrumbSchema(items, siteUrl);
    const item1 = schema.itemListElement[0];
    const item2 = schema.itemListElement[1];

    expect(item1.position).toBe(1);
    expect(item1.name).toBe('Destinations');
    expect(item1.item).toBe('https://mysite.com/destinations');

    expect(item2.position).toBe(2);
    expect(item2.name).toBe('El Nido');
    expect(item2.item).toBe('https://mysite.com/destinations/el-nido');
  });
});
