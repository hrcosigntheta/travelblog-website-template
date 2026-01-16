import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '../../data/destinations';
import { useMemo, useEffect, useState } from 'react';
import { createCustomIcon, getCategoryFromTags } from './MapIcons';
import MarkerPopup from './MarkerPopup';
import MapCluster from './MapCluster';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../store/theme';

export default function FullPageMap() {
  const phCoordinates: [number, number] = [12.8797, 121.774];
  const theme = useStore(themeStore);

  // Track system preference
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  const tileLayerUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

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
        <TileLayer attribution={attribution} url={tileLayerUrl} />
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
