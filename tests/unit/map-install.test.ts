// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

describe('Map Library Installation', () => {
  it('should have leaflet installed', () => {
    expect(L).toBeDefined();
    expect(L.version).toBeDefined();
  });

  it('should have react-leaflet exports available', () => {
    expect(MapContainer).toBeDefined();
    expect(TileLayer).toBeDefined();
    expect(Marker).toBeDefined();
    expect(Popup).toBeDefined();
  });
});
