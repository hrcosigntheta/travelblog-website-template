import type { ItineraryDayProps } from './ItineraryDay';
import ItineraryDay from './ItineraryDay';

export interface ItineraryTimelineProps {
  days: Omit<ItineraryDayProps, 'dayNumber'>[]; // dayNumber is auto-assigned
  className?: string;
}

export default function ItineraryTimeline({ days, className = '' }: ItineraryTimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main Vertical Line (Background for the whole timeline) - slightly complex to align with days, 
          so we let days handle their own segments or use a global line. 
          The 'ItineraryDay' component handles its own vertical line segment. */}

      <div className="space-y-0">
        {days.map((day, index) => (
          <ItineraryDay
            key={index}
            dayNumber={index + 1}
            title={day.title}
            activities={day.activities}
            defaultOpen={index === 0} // Open first day by default
          />
        ))}
      </div>

      {/* End marker */}
      <div className="relative pl-8 sm:pl-10 pt-2">
        <div className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-10">
          <div className="w-3 h-3 bg-[var(--border-default)] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
