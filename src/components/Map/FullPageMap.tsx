import { MapContainer, TileLayer, ZoomControl, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations, type Destination } from '../../data/destinations';
import L from 'leaflet';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { createCustomIcon, getCategoryFromTags } from './MapIcons';

// Helper component to handle map events and track viewport
function MapController({ onBoundsChange }: { onBoundsChange: (bounds: L.LatLngBounds) => void }) {
  const map = useMapEvents({
    moveend: () => {
      onBoundsChange(map.getBounds());
    },
  });

  // Trigger initial bounds check when map is ready
  useEffect(() => {
    if (map) {
      onBoundsChange(map.getBounds());
    }
  }, [map, onBoundsChange]);

  return null;
}

export default function FullPageMap() {
  const phCoordinates: [number, number] = [12.8797, 121.774];
  const [visibleDestinations, setVisibleDestinations] = useState<Destination[]>(destinations);

  const handleBoundsChange = useCallback((bounds: L.LatLngBounds) => {
    // Filter destinations to only show those within current map bounds
    const filtered = destinations.filter((dest) =>
      bounds.contains([dest.coordinates.lat, dest.coordinates.lng])
    );
    setVisibleDestinations(filtered);
  }, []);

  // Pre-calculate icons for performance
  const destinationIcons = useMemo(() => {
    const icons = new Map();
    destinations.forEach((dest) => {
      const category = getCategoryFromTags(dest.tags);
      icons.set(dest.id, createCustomIcon(category));
    });
    return icons;
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={phCoordinates}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
        minZoom={5}
        maxZoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController onBoundsChange={handleBoundsChange} />
        <ZoomControl position="bottomright" />

        {visibleDestinations.map((destination) => (
          <Marker
            key={destination.id}
            position={[destination.coordinates.lat, destination.coordinates.lng]}
            icon={destinationIcons.get(destination.id)}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-1">{destination.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{destination.region}</p>
                <a
                  href={`/destinations/${destination.slug}`}
                  className="inline-block px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90 transition-colors"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
