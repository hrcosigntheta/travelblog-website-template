import type { ReactNode } from 'react';

export type TagBadgeVariant = 'default' | 'category' | 'activity' | 'difficulty' | 'budget';

export interface TagBadgeProps {
  label: string;
  variant?: TagBadgeVariant;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface DestinationCardProps {
  id: string;
  slug: string;
  title: string;
  location: string;
  image: string;
  category: string;
  description: string;
  priceLevel: 'budget' | 'mid-range' | 'luxury'; // Maps to $, $$, $$$
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestSeason?: string;
  rating?: number;
  className?: string;
}
