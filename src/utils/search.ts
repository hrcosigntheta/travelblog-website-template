import Fuse from 'fuse.js';
import type { Destination } from '../data/destinations';

export interface SearchOptions {
  keys?: string[];
  threshold?: number;
}

export const createSearchIndex = (data: Destination[], options: SearchOptions = {}) => {
  const defaultOptions = {
    keys: ['title', 'description', 'region', 'tags'],
    threshold: 0.3, // 0.0 is perfect match, 1.0 is match anything
    includeScore: true,
    ignoreLocation: true, // Search anywhere in the string
    ...options,
  };

  return new Fuse(data, defaultOptions);
};

export const searchDestinations = (index: Fuse<Destination>, query: string): Destination[] => {
  if (!query) return [];

  const results = index.search(query);
  return results.map((result) => result.item);
};
