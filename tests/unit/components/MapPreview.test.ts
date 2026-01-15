// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect, vi } from 'vitest';
import MapPreview from '../../../src/components/MapPreview.astro';

// Mock Leaflet and React Leaflet
vi.mock('leaflet', () => ({
  default: {
    divIcon: vi.fn(),
    marker: vi.fn(),
    map: vi.fn(),
    Icon: { Default: { mergeOptions: vi.fn() } },
  },
}));

vi.mock('react-leaflet', () => ({
  MapContainer: () => 'MapContainer',
  TileLayer: () => 'TileLayer',
  Marker: () => 'Marker',
  Popup: () => 'Popup',
}));

vi.mock('leaflet.markercluster', () => ({}));

describe('MapPreview Component', () => {
  it('renders section title and subtitle', async () => {
    const container = await AstroContainer.create({
      renderers: [
        {
          name: '@astrojs/react',
          serverEntrypoint: '@astrojs/react/server.js',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
    });
    const result = await container.renderToString(MapPreview, {
      props: {
        title: 'Custom Map Title',
        subtitle: 'Custom subtitle text',
      },
    });

    expect(result).toContain('Custom Map Title');
    expect(result).toContain('Custom subtitle text');
  });

  it('renders CTA link', async () => {
    const container = await AstroContainer.create({
      renderers: [
        {
          name: '@astrojs/react',
          serverEntrypoint: '@astrojs/react/server.js',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
    });
    const result = await container.renderToString(MapPreview, {
      props: {
        ctaText: 'Go to Map',
        ctaLink: '/custom-map',
      },
    });

    expect(result).toContain('Go to Map');
    expect(result).toContain('href="/custom-map"');
  });

  it('renders MapWithMarkers placeholder', async () => {
    const container = await AstroContainer.create({
      renderers: [
        {
          name: '@astrojs/react',
          serverEntrypoint: '@astrojs/react/server.js',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
    });
    const result = await container.renderToString(MapPreview);

    expect(result).toContain('h-[500px]');
    expect(result).toContain('rounded-[var(--radius-lg)]');
  });
});
