import type { ReactNode } from 'react';

/**
 * Props for the ItineraryActivity component
 */
export interface ItineraryActivityProps {
  /** Time of the activity (e.g., "10:00 AM") */
  time?: string;
  /** Title of the activity */
  title: string;
  /** Detailed description of the activity */
  description?: string;
  /** Duration of the activity (e.g., "2 hours") */
  duration?: string;
  /** Optional icon element */
  icon?: ReactNode;
  /** URL of an optional image */
  image?: string;
  /** Insider tips or notes */
  tips?: string;
}

/**
 * Props for the ItineraryDay component
 */
export interface ItineraryDayProps {
  /** The day number (1, 2, 3...) */
  dayNumber: number;
  /** Title/Theme of the day */
  title: string;
  /** List of activities for this day */
  activities: ItineraryActivityProps[];
  /** Whether the day details are expanded by default */
  defaultOpen?: boolean;
}

/**
 * Props for the ItineraryTimeline component
 */
export interface ItineraryTimelineProps {
  /** List of days to display (dayNumber is auto-assigned based on index) */
  days: Omit<ItineraryDayProps, 'dayNumber'>[];
  /** Additional CSS classes */
  className?: string;
}
