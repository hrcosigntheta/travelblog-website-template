import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MapWrapper from '../../../src/components/MapWrapper';
import * as nanostoresReact from '@nanostores/react';

// Mock leaflet to prevent window definition issues
vi.mock('leaflet', () => ({}));

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="map-container" className={className}>
      {children}
    </div>
  ),
  TileLayer: ({ url }: { url: string }) => <div data-testid="tile-layer" data-url={url} />,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

// Partially mock nanostores/react to spy on useStore
vi.mock('@nanostores/react', async () => {
  const actual = await vi.importActual('@nanostores/react');
  return {
    ...actual,
    useStore: vi.fn(),
  };
});

describe('MapWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    vi.mocked(nanostoresReact.useStore).mockReturnValue('light');

    // Mock window.matchMedia
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

  it('renders map container', async () => {
    render(<MapWrapper />);
    const container = await screen.findByTestId('map-container');
    expect(container).toBeTruthy();
  });

  it('applies custom className', async () => {
    render(<MapWrapper className="h-[500px] w-full" />);
    const wrapper = await screen.findByTestId('map-wrapper');
    expect(wrapper.className).toContain('h-[500px]');
    expect(wrapper.className).toContain('w-full');
  });

  it('renders light mode tile layer when theme is light', async () => {
    vi.mocked(nanostoresReact.useStore).mockReturnValue('light');
    render(<MapWrapper />);
    const layer = await screen.findByTestId('tile-layer');
    expect(layer.getAttribute('data-url')).toContain('light_all');
  });

  it('renders dark mode tile layer when theme is dark', async () => {
    vi.mocked(nanostoresReact.useStore).mockReturnValue('dark');
    render(<MapWrapper />);
    const layer = await screen.findByTestId('tile-layer');
    expect(layer.getAttribute('data-url')).toContain('dark_all');
  });

  it('renders dark mode tile layer when theme is system and prefers-color-scheme is dark', async () => {
    vi.mocked(nanostoresReact.useStore).mockReturnValue('system');
    // Mock matchMedia to return true for dark mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<MapWrapper />);
    const layer = await screen.findByTestId('tile-layer');
    expect(layer.getAttribute('data-url')).toContain('dark_all');
  });

  it('renders light mode tile layer when theme is system and prefers-color-scheme is light', async () => {
    vi.mocked(nanostoresReact.useStore).mockReturnValue('system');
    // Mock matchMedia to return false for dark mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<MapWrapper />);
    const layer = await screen.findByTestId('tile-layer');
    expect(layer.getAttribute('data-url')).toContain('light_all');
  });
});
