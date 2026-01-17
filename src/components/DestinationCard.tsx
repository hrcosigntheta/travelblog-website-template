import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { TagBadge } from './TagBadge';
import { ROUTES } from '../config/paths';
import type { DestinationCardProps } from '../types/destination';

export const DestinationCard: React.FC<DestinationCardProps> = ({
  slug,
  title,
  location,
  image,
  category,
  description,
  priceLevel,
  difficulty,
  bestSeason,
  className = '',
}) => {
  const destinationPath = ROUTES.DESTINATION_DETAIL(slug);

  const getPriceLabel = (level: string) => {
    switch (level) {
      case 'budget':
        return '₱';
      case 'mid-range':
        return '₱₱';
      case 'luxury':
        return '₱₱₱';
      default:
        return '₱₱';
    }
  };

  return (
    <article
      className={`group flex flex-col h-full overflow-hidden rounded-lg bg-background-surface border border-border-subtle dark:bg-background-surface dark:border-border-subtle hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out ${className}`}
      data-testid="destination-card"
    >
      {/* Image Container - Aspect Ratio 4:3 */}
      <a href={destinationPath} className="relative block w-full aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={`Travel to ${title} in ${location}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <TagBadge label={category} variant="category" />
          {bestSeason && (
            <TagBadge
              label={bestSeason}
              variant="default"
              className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-800 dark:text-white"
            />
          )}
        </div>
      </a>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="mb-2">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {location}
          </span>
        </div>

        <a href={destinationPath} className="block mb-2 group-hover:text-primary transition-colors">
          <h3 className="text-xl font-bold text-text-primary line-clamp-2">{title}</h3>
        </a>

        <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow">{description}</p>

        {/* Stats Footer */}
        <div className="pt-4 mt-auto border-t border-border-subtle flex items-center gap-3">
          <TagBadge label={getPriceLabel(priceLevel)} variant="budget" className="font-mono" />
          <TagBadge label={difficulty} variant="difficulty" className="capitalize" />
        </div>
      </div>
    </article>
  );
};
