import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import MapCluster from '../../../src/components/MapCluster';
import { MapContainer } from 'react-leaflet';

// Mock Leaflet
vi.mock('leaflet', async () => {
  const actual = await vi.importActual('leaflet');
  const MarkerClusterGroup = vi.fn().mockImplementation(() => ({
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    addTo: vi.fn(),
    remove: vi.fn(),
    getChildCount: vi.fn(() => 5),
    options: {},
  }));

  return {
    ...actual,
    MarkerClusterGroup,
    divIcon: vi.fn(() => ({})),
    point: vi.fn(() => ({})),
  };
});

describe('MapCluster', () => {
  it('renders without crashing', () => {
    // We need to render inside MapContainer for context
    const { container } = render(
      <MapContainer center={[0, 0]} zoom={10} maxZoom={18}>
        <MapCluster />
      </MapContainer>
    );
    expect(container).toBeTruthy();
  });
});
