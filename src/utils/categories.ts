import { CATEGORY_FILTERS } from '../constants/categories';

/**
 * Returns all matching filter category values based on destination tags.
 */
export const getFilterCategoryFromTags = (tags: string[]): string[] => {
  return CATEGORY_FILTERS.filter((filter) => filter.tags.some((tag) => tags.includes(tag))).map(
    (filter) => filter.value
  );
};

/**
 * Normalizes a category string from URL parameters to a valid filter value.
 * Handles pluralization and case sensitivity.
 */
export const normalizeCategory = (category: string): string | undefined => {
  if (!category) return undefined;

  const normalized = category.toLowerCase();

  // Find a match by value, label, or plural version of value
  const found = CATEGORY_FILTERS.find(
    (f) =>
      f.value === normalized ||
      f.label.toLowerCase() === normalized ||
      // Handle plural versions (e.g., 'beaches' -> 'beach')
      (normalized.endsWith('s') && f.value === normalized.slice(0, -1)) ||
      (f.value.endsWith('s') && f.value === normalized + 's')
  );

  return found?.value;
};

/**
 * List of categories for use in filter components.
 */
export const FILTER_CATEGORIES = CATEGORY_FILTERS.map((f) => ({
  value: f.value,
  label: f.label,
}));
