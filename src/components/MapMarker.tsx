import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ImageWithFallback } from './ImageWithFallback';
import { getRoutePath } from '../utils/paths';

export type MarkerCategory =
  | 'beaches'
  | 'mountains'
  | 'cultural'
  | 'adventure'
  | 'food'
  | 'gems'
  | 'default';

export interface MapMarkerProps {
  position: [number, number];
  title: string;
  category: MarkerCategory;
  image?: string;
  slug: string;
  location?: string;
}

const CATEGORY_COLORS: Record<MarkerCategory, string> = {
  beaches: '#006d77', // Ocean
  mountains: '#83c5be', // Jungle
  cultural: '#e29578', // Coral
  adventure: '#d07d5d', // Terra cotta
  food: '#f6ad55', // Orange
  gems: '#8b5cf6', // Purple
  default: '#6c757d', // Gray
};

const createMarkerIcon = (category: MarkerCategory) => {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12zm0 16.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="${color}" stroke="white" stroke-width="1.5" />
    </svg>
  `;

  return L.divIcon({
    className: 'custom-map-marker',
    html: svg,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
};

export const MapMarker: React.FC<MapMarkerProps> = ({
  position,
  title,
  category,
  image,
  slug,
  location,
}) => {
  const icon = useMemo(() => createMarkerIcon(category), [category]);
  const detailPath = `${getRoutePath('DESTINATIONS')}/${slug}`;

  return (
    <Marker position={position} icon={icon} title={title} alt={title}>
      <Popup className="destination-popup">
        <div className="w-[200px] overflow-hidden rounded-lg shadow-sm bg-white dark:bg-neutral-800">
          {image && (
            <div className="aspect-video w-full overflow-hidden">
              <ImageWithFallback
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
                width={200}
                height={112} // 16:9 approx
              />
            </div>
          )}
          <div className="p-3">
            <h3 className="font-display font-bold text-sm text-neutral-900 dark:text-white mb-1">
              <a href={detailPath} className="hover:text-primary transition-colors">
                {title}
              </a>
            </h3>
            {location && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {location}
              </p>
            )}
            <div className="mt-2 text-right">
              <a
                href={detailPath}
                className="text-xs font-medium text-primary hover:text-primary-hover inline-flex items-center gap-0.5"
              >
                View
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
