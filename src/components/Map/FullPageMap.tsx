import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '../../data/destinations';
import L from 'leaflet';
import { useEffect } from 'react';

export default function FullPageMap() {
  const phCoordinates: [number, number] = [12.8797, 121.774];

  useEffect(() => {
    // Fix for default marker icon in React Leaflet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
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

        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={[destination.coordinates.lat, destination.coordinates.lng]}
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
