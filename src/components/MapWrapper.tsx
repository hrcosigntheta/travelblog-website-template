import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useStore } from '@nanostores/react';
import { themeStore } from '../store/theme';
import type { ui } from '../i18n/ui';
import { MapSkeleton, MapError } from './MapUI';

export interface MapWrapperProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  children?: React.ReactNode;
  lang?: keyof typeof ui;
}

class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default function MapWrapper({
  className = 'h-[400px] w-full',
  center = [12.8797, 121.774], // Philippines center
  zoom = 6,
  children,
  lang = 'en',
}: MapWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const theme = useStore(themeStore);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const tileLayerUrl =
    resolvedTheme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  if (!isMounted) {
    return <MapSkeleton className={className} lang={lang} />;
  }

  return (
    <div className={`relative z-0 ${className}`} data-testid="map-wrapper">
      <ErrorBoundary fallback={<MapError className="h-full w-full" lang={lang} />}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className="h-full w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={tileLayerUrl}
          />
          {children}
        </MapContainer>
      </ErrorBoundary>
    </div>
  );
}
