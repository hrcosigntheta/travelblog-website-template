import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import L from 'leaflet';

// Mock Leaflet MarkerCluster plugin side-effects
vi.mock('leaflet.markercluster', () => ({}));

// Setup L.MarkerClusterGroup on the real L object
// @ts-expect-error - extending Leaflet global type
L.MarkerClusterGroup = class extends L.FeatureGroup {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(options?: any) {
    super();
    this.options = options || {};
  }
  getChildCount() {
    return 5;
  }
};

// Import component after mocks
import MapCluster from '../../../../src/components/Map/MapCluster';
import { MapContainer } from 'react-leaflet';

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
