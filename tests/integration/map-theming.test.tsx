// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import FullPageMap from '../../src/components/Map/FullPageMap';
import { themeStore } from '../../src/store/theme';
import L from 'leaflet';

// Mock Leaflet MarkerCluster plugin side-effects
vi.mock('leaflet.markercluster', () => ({}));

// Need to mock L.MarkerClusterGroup to avoid errors during imports
// @ts-expect-error - extending Leaflet global type
L.MarkerClusterGroup = class extends L.FeatureGroup {
  constructor() {
    super();
  }
};

// Mock react-leaflet components
vi.mock('react-leaflet', async () => {
  const actual = await vi.importActual('react-leaflet');
  return {
    ...actual,
    // Render TileLayer as a dummy div with data attributes for assertions
    TileLayer: ({ url }: { url: string }) => <div data-testid="tile-layer" data-url={url} />,
    // Mock MapContainer to avoid Leaflet context issues and just render children
    MapContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    ZoomControl: () => null,
    Marker: () => null,
    Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useMap: () => ({
      getCenter: () => ({ lat: 0, lng: 0 }),
      getZoom: () => 0,
      invalidateSize: vi.fn(),
      setView: vi.fn(),
    }),
  };
});

// Mock MapCluster to simply render children
vi.mock('../../src/components/Map/MapCluster', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock MarkerPopup
vi.mock('../../src/components/Map/MarkerPopup', () => ({
  default: () => <div>Popup Content</div>,
}));

describe('Map Theming Integration', () => {
  beforeEach(() => {
    themeStore.set('system');

    // Reset matchMedia mock for each test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('uses light tiles when theme is explicitly light', () => {
    themeStore.set('light');
    render(<FullPageMap />);
    const tileLayer = screen.getByTestId('tile-layer');
    expect(tileLayer.getAttribute('data-url')).toContain('light_all');
  });

  it('uses dark tiles when theme is explicitly dark', () => {
    themeStore.set('dark');
    render(<FullPageMap />);
    const tileLayer = screen.getByTestId('tile-layer');
    expect(tileLayer.getAttribute('data-url')).toContain('dark_all');
  });

  it('uses dark tiles when theme is system and system preference is dark', () => {
    themeStore.set('system');

    // Mock system dark mode preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: true, // System is dark
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<FullPageMap />);
    const tileLayer = screen.getByTestId('tile-layer');
    expect(tileLayer.getAttribute('data-url')).toContain('dark_all');
  });

  it('uses light tiles when theme is system and system preference is light', () => {
    themeStore.set('system');

    // Mock system light mode preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // System is light
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<FullPageMap />);
    const tileLayer = screen.getByTestId('tile-layer');
    expect(tileLayer.getAttribute('data-url')).toContain('light_all');
  });
});
