import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '../../data/destinations';
import { useMemo } from 'react';
import { createCustomIcon, getCategoryFromTags } from './MapIcons';
import MarkerPopup from './MarkerPopup';
import MapCluster from './MapCluster';

export default function FullPageMap() {
  const phCoordinates: [number, number] = [12.8797, 121.774];

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
        <ZoomControl position="bottomright" />

        <MapCluster>
          {destinations.map((destination) => (
            <Marker
              key={destination.id}
              position={[destination.coordinates.lat, destination.coordinates.lng]}
              icon={destinationIcons.get(destination.id)}
            >
              <Popup className="custom-popup-wrapper" minWidth={300} maxWidth={300}>
                <MarkerPopup destination={destination} />
              </Popup>
            </Marker>
          ))}
        </MapCluster>
      </MapContainer>
    </div>
  );
}
