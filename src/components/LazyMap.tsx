import React, { Suspense } from 'react';
import { MapSkeleton } from './MapUI';
import type { Destination } from '../data/destinations';

const MapWithMarkers = React.lazy(() => import('./MapWithMarkers'));

interface LazyMapProps {
  destinations: Destination[];
  className?: string;
  center?: [number, number];
  zoom?: number;
}

export default function LazyMap(props: LazyMapProps) {
  return (
    <Suspense fallback={<MapSkeleton className={props.className} />}>
      <MapWithMarkers {...props} />
    </Suspense>
  );
}
