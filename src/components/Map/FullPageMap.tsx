import { MapContainer, TileLayer, ZoomControl, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '../../data/destinations';
import React, { useMemo, useEffect, useState, Suspense } from 'react';
import { createCustomIcon, getCategoryFromTags } from './MapIcons';
import MapCluster from './MapCluster';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../store/theme';
import { FILTER_CATEGORIES, getFilterCategoryFromTags } from '../../utils/categories';

const MapFilterPanel = React.lazy(() => import('./MapFilterPanel'));
const MarkerPopup = React.lazy(() => import('./MarkerPopup'));

function MapEvents() {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      map.invalidateSize();
      // Small delay to ensure layout is updated
      setTimeout(() => {
        map.setView(center, zoom, { animate: false });
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [map]);

  return null;
}

export default function FullPageMap() {
  const phCoordinates: [number, number] = [12.8797, 121.774];
  const theme = useStore(themeStore);

  // Filter State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  // Extract unique filter options
  const { regions } = useMemo(() => {
    const regs = new Set<string>();

    destinations.forEach((d) => {
      regs.add(d.region);
    });

    return {
      regions: Array.from(regs).sort(),
    };
  }, []);

  // Filter Logic
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const destCategories = getFilterCategoryFromTags(dest.tags);
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => destCategories.includes(cat));

      const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(dest.region);

      return categoryMatch && regionMatch;
    });
  }, [selectedCategories, selectedRegions]);

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
  };

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
      <Suspense fallback={null}>
        <MapFilterPanel
          categories={FILTER_CATEGORIES}
          regions={regions}
          selectedCategories={selectedCategories}
          selectedRegions={selectedRegions}
          onCategoryChange={handleCategoryChange}
          onRegionChange={handleRegionChange}
          onClear={handleClear}
          filteredCount={filteredDestinations.length}
          totalCount={destinations.length}
        />
      </Suspense>

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
        <MapEvents />

        <MapCluster>
          {filteredDestinations.map((destination) => (
            <Marker
              key={destination.id}
              position={[destination.coordinates.lat, destination.coordinates.lng]}
              icon={destinationIcons.get(destination.id)}
            >
              <Popup className="custom-popup-wrapper" minWidth={300} maxWidth={300}>
                <Suspense
                  fallback={<div className="h-40 flex items-center justify-center">Loading...</div>}
                >
                  <MarkerPopup destination={destination} />
                </Suspense>
              </Popup>
            </Marker>
          ))}
        </MapCluster>
      </MapContainer>
    </div>
  );
}
