// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import DestinationHero from '../../../src/components/DestinationHero.astro';
import type { Destination } from '../../../src/data/destinations';

const mockDestination: Destination = {
  id: '1',
  slug: 'test-destination',
  title: 'Test Destination',
  description: 'A test description',
  region: 'Test Region',
  image: 'https://example.com/image.jpg',
  imageAlt: 'Test Alt',
  rating: 5,
  tags: ['Tag1'],
  featured: false,
  images: [],
  coordinates: { lat: 0, lng: 0 },
  stats: {
    bestTime: 'Jan-Dec',
    budget: '$$',
    difficulty: 'Easy',
  },
  content: '',
  highlights: [],
  itinerary: [],
  practicalInfo: {
    gettingThere: '',
    accommodation: '',
    tips: '',
  },
};

test('DestinationHero renders with correct data', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(DestinationHero, {
    props: {
      destination: mockDestination,
    },
  });

  expect(result).toContain('Test Destination');
  expect(result).toContain('Test Region');
  expect(result).toContain('Jan-Dec');
  expect(result).toContain('$$');
  expect(result).toContain('Easy');
  expect(result).toContain('https://example.com/image.jpg');
});

test('DestinationHero renders social buttons', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(DestinationHero, {
    props: {
      destination: mockDestination,
    },
  });

  expect(result).toContain('data-share="facebook"');
  expect(result).toContain('data-share="twitter"');
  expect(result).toContain('data-share="pinterest"');
  expect(result).toContain('data-share="copy"');
});
