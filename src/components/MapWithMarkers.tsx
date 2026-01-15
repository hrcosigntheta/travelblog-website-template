import React from 'react';
import MapWrapper from './MapWrapper';
import MapCluster from './MapCluster';
import { MapMarker, type MarkerCategory } from './MapMarker';
import type { Destination } from '../data/destinations';

interface MapWithMarkersProps {
  destinations: Destination[];
  className?: string;
  center?: [number, number];
  zoom?: number;
}

export default function MapWithMarkers({
  destinations,
  className = 'h-[500px] w-full',
  center = [12.8797, 121.774],
  zoom = 6,
}: MapWithMarkersProps) {
  // Helper to map destination tags to marker categories
  const getCategory = (tags: string[]): MarkerCategory => {
    if (!tags || tags.length === 0) return 'default';
    const tag = tags[0].toLowerCase();
    if (tag.includes('beach') || tag.includes('island')) return 'beaches';
    if (tag.includes('mountain') || tag.includes('hiking')) return 'mountains';
    if (tag.includes('culture') || tag.includes('history')) return 'cultural';
    if (tag.includes('food')) return 'food';
    if (tag.includes('adventure')) return 'adventure';
    return 'default';
  };

  // Use destination coordinates if available, otherwise fall back to mock map
  const getCoordinates = (dest: Destination): [number, number] => {
    if (dest.coordinates) {
      return [dest.coordinates.lat, dest.coordinates.lng];
    }
    const coords: Record<string, [number, number]> = {
      '1': [11.1667, 119.3833], // El Nido
      '2': [9.9167, 126.05], // Siargao
      '3': [9.8167, 124.0667], // Bohol
      '4': [11.9674, 121.9248], // Boracay
    };
    return coords[dest.id] || [12.8797, 121.774];
  };

  return (
    <MapWrapper className={className} center={center} zoom={zoom}>
      <MapCluster>
        {destinations.map((dest) => (
          <MapMarker
            key={dest.id}
            position={getCoordinates(dest)}
            title={dest.title}
            category={getCategory(dest.tags)}
            image={dest.image}
            slug={dest.slug}
            location={dest.region}
          />
        ))}
      </MapCluster>
    </MapWrapper>
  );
}
