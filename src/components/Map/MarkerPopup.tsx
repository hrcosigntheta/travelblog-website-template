import type { Destination } from '../../data/destinations';
import { getCategoryFromTags, type MarkerCategory } from './MapIcons';
import { ROUTES } from '../../config/paths';
import { getAssetPath } from '../../utils/paths';
import './MarkerPopup.css';

interface MarkerPopupProps {
  destination: Destination;
}

export default function MarkerPopup({ destination }: MarkerPopupProps) {
  const category = getCategoryFromTags(destination.tags);

  const getCategoryColor = (cat: MarkerCategory) => {
    switch (cat) {
      case 'beach':
        return 'bg-teal-100 text-teal-800';
      case 'mountain':
        return 'bg-emerald-100 text-emerald-800';
      case 'cultural':
        return 'bg-orange-100 text-orange-800';
      case 'food':
        return 'bg-rose-100 text-rose-800';
      case 'adventure':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const destinationDetailUrl = ROUTES.DESTINATION_DETAIL(destination.slug);

  return (
    <div className="flex flex-col">
      {/* Thumbnail Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={getAssetPath(destination.image)}
          alt={destination.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${getCategoryColor(
              category
            )}`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
          <a href={destinationDetailUrl} className="hover:text-primary transition-colors">
            {destination.title}
          </a>
        </h3>

        <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {destination.region}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {destination.tags.length > 3 && (
            <span className="text-xs text-gray-400 px-1.5 py-0.5">
              +{destination.tags.length - 3}
            </span>
          )}
        </div>

        {/* Button */}
        <a
          href={destinationDetailUrl}
          className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-lg transition-colors duration-200"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
