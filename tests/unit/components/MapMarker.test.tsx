import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MapMarker } from '../../../src/components/MapMarker';

// Mock Leaflet
vi.mock('leaflet', () => ({
  default: {
    divIcon: vi.fn(() => 'mock-icon'),
  },
}));

// Mock React-Leaflet
vi.mock('react-leaflet', () => ({
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
  MapContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('MapMarker Component', () => {
  const defaultProps = {
    position: [12.8797, 121.774] as [number, number],
    title: 'Test Destination',
    category: 'beaches' as const,
    slug: 'test-destination',
    image: 'test.jpg',
    location: 'Cebu, Philippines',
  };

  it('renders without crashing', () => {
    render(<MapMarker {...defaultProps} />);
  });
});
