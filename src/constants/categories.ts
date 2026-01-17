export interface CategoryFilter {
  id: string;
  label: string;
  value: string; // for URL compatibility (lowercase)
  tags: string[]; // for matching against destination tags (case-sensitive as per data)
}

export const CATEGORY_FILTERS: CategoryFilter[] = [
  {
    id: 'beach',
    label: 'Beach',
    value: 'beach',
    tags: ['Beach', 'Island', 'Coastal', 'Surfing', 'Diving'],
  },
  {
    id: 'mountains',
    label: 'Mountains',
    value: 'mountains',
    tags: ['Mountains', 'Mountain', 'Volcano', 'Hiking'],
  },
  {
    id: 'nature',
    label: 'Nature',
    value: 'nature',
    tags: ['Nature', 'Waterfalls', 'River', 'Forest', 'Wildlife'],
  },
  {
    id: 'hiking',
    label: 'Hiking',
    value: 'hiking',
    tags: ['Hiking', 'Trekking', 'Trails'],
  },
  {
    id: 'surfing',
    label: 'Surfing',
    value: 'surfing',
    tags: ['Surfing', 'Waves'],
  },
  {
    id: 'diving',
    label: 'Diving',
    value: 'diving',
    tags: ['Diving', 'Snorkeling', 'Marine Life'],
  },
  {
    id: 'city',
    label: 'City',
    value: 'city',
    tags: ['City', 'Urban', 'Town'],
  },
  {
    id: 'culture',
    label: 'Culture',
    value: 'culture',
    tags: ['Culture', 'History', 'Heritage', 'Temple', 'Museum', 'Cultural'],
  },
  {
    id: 'food',
    label: 'Food',
    value: 'food',
    tags: ['Food', 'Culinary', 'Dining', 'Local Cuisine'],
  },
];
