import { useState } from 'react';
import type { ItineraryDayProps } from '../types/itinerary';
import ItineraryActivity from './ItineraryActivity';

/**
 * A collapsible section representing a single day in an itinerary.
 * Contains a list of activities.
 *
 * @example
 * <ItineraryDay
 *   dayNumber={1}
 *   title="Arrival"
 *   activities={[...]}
 *   defaultOpen={true}
 * />
 */
export default function ItineraryDay({
  dayNumber,
  title,
  activities,
  defaultOpen = false,
}: ItineraryDayProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="relative pl-8 sm:pl-10 py-2 print:break-inside-avoid">
      {/* Day Marker (Big Dot) */}
      <div className="absolute left-0 top-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] text-[var(--text-inverse)] flex items-center justify-center font-bold z-10 shadow-md print:shadow-none print:border print:border-[var(--color-primary)]">
        {dayNumber}
      </div>

      {/* Vertical Line Background (Spans full height of this day block) */}
      <div className="absolute left-4 sm:left-5 top-12 bottom-0 w-0.5 bg-[var(--border-default)] -translate-x-1/2 z-0 print:border-l print:border-[var(--border-default)]"></div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden mb-6 print:shadow-none print:border-none print:bg-transparent print:mb-4 print:overflow-visible">
        {/* Header (Clickable to toggle) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset print:p-0 print:mb-4 print:cursor-default"
          aria-expanded={isOpen}
        >
          <div>
            <span className="text-[length:var(--text-sm)] font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
              Day {dayNumber}
            </span>
            <h3 className="text-[length:var(--text-xl)] font-bold text-[var(--text-primary)]">
              {title}
            </h3>
          </div>
          <span
            className={`text-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} print:hidden`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>

        {/* Content (Activities) */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden print:max-h-none print:opacity-100 print:overflow-visible ${
            isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 sm:p-6 pt-0 border-t border-[var(--border-subtle)] print:border-none print:p-0 print:pt-2">
            <div className="pt-6 pl-2 border-l-2 border-dashed border-[var(--border-subtle)] ml-1 space-y-8">
              {activities.map((activity, index) => (
                <ItineraryActivity key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
