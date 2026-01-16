import type { ItineraryActivityProps } from '../../types/itinerary';
import type { TravelTip } from '../../components/TravelTips';

export interface ItineraryActivityData extends Omit<ItineraryActivityProps, 'icon'> {
  iconType?: 'transport' | 'food' | 'activity' | 'nature' | 'relax';
}

export interface ItineraryDayData {
  title: string;
  activities: ItineraryActivityData[];
}

export interface Destination {
  id: string;
  slug: string;
  title: string;
  description: string;
  region: string;
  image: string;
  imageAlt: string;
  rating: number;
  tags: string[];
  featured: boolean;
  author: {
    name: string;
    url: string;
    image: string;
  };

  // Expanded fields
  images: { src: string; alt: string }[];
  coordinates: {
    lat: number;
    lng: number;
  };
  stats: {
    bestTime: string;
    budget: string;
    difficulty: string;
  };
  content: string;
  highlights: string[];
  itinerary?: ItineraryDayData[];
  practicalInfo?: {
    gettingThere: string;
    accommodation: string;
    tips: string;
  };
  travelTips?: TravelTip[];
}
