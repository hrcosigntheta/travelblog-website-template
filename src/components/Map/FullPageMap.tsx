import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function FullPageMap() {
  const phCoordinates: [number, number] = [12.8797, 121.774];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={phCoordinates}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}
