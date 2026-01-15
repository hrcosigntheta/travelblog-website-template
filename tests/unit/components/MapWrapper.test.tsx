import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MapWrapper from '../../../src/components/MapWrapper';

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="map-container" className={className}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

// Mock nanostores
vi.mock('@nanostores/react', () => ({
  useStore: () => 'light',
}));

describe('MapWrapper', () => {
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

  it('renders tile layer', async () => {
    render(<MapWrapper />);
    const layer = await screen.findByTestId('tile-layer');
    expect(layer).toBeTruthy();
  });
});
