import React from 'react';
import type { Destination } from '../data/destinations';
import { ImageWithFallback } from './ImageWithFallback';
import { ROUTES } from '../config/paths';

interface RelatedDestinationsProps {
  destinations: Destination[];
}

export const RelatedDestinations: React.FC<RelatedDestinationsProps> = ({ destinations }) => {
  if (!destinations || destinations.length === 0) return null;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-6">You Might Also Like</h3>
      <div className="space-y-6">
        {destinations.map((dest) => (
          <a
            key={dest.id}
            href={ROUTES.DESTINATION_DETAIL(dest.slug)}
            className="group flex gap-4 items-start"
          >
            <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
              <ImageWithFallback
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-tight mb-1">
                {dest.title}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mb-1">{dest.region}</p>
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <span>{dest.rating} ★</span>
                <span>•</span>
                <span>{dest.stats.difficulty}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
