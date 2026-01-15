import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useStore } from '@nanostores/react';
import { useTranslations } from '../i18n/utils';
import { themeStore } from '../store/theme';
import type { ui } from '../i18n/ui';

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

export function MapSkeleton({
  className = 'h-[400px] w-full',
  lang = 'en',
}: {
  className?: string;
  lang?: keyof typeof ui;
}) {
  const t = useTranslations(lang);
  return (
    <div
      className={`bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg flex items-center justify-center ${className}`}
    >
      <span className="text-neutral-500 font-medium">{t('map.loading')}</span>
    </div>
  );
}

export function MapError({
  className = 'h-[400px] w-full',
  lang = 'en',
}: {
  className?: string;
  lang?: keyof typeof ui;
}) {
  const t = useTranslations(lang);
  return (
    <div
      className={`bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center justify-center ${className}`}
    >
      <div className="text-center p-4">
        <span className="block text-red-500 font-medium mb-1">{t('map.error')}</span>
        <span className="text-sm text-neutral-500">{t('common.error')}</span>
      </div>
    </div>
  );
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
