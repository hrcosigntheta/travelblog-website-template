import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import L from 'leaflet';
import FullPageMap from '../../src/components/Map/FullPageMap';

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

describe('Map Clustering Integration', () => {
  it('renders FullPageMap with clusters', () => {
    const { container } = render(<FullPageMap />);
    expect(container).toBeTruthy();

    // Check if markers are rendered (or at least the map container)
    // Since we can't easily check for L.MarkerClusterGroup instance in JSDOM output without deeper introspection
    // We mainly verify it doesn't crash and renders the structure
    const mapContainer = container.querySelector('.leaflet-container');
    expect(mapContainer).toBeTruthy();
  });
});
