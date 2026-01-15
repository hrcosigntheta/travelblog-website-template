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
  icon?: React.ReactNode;
  /** URL of an optional image */
  image?: string;
  /** Insider tips or notes */
  tips?: string;
}

/**
 * Displays a single activity within an itinerary day.
 * Supports optional time, duration, image, and tips.
 */
export default function ItineraryActivity({
  time,
  title,
  description,
  duration,
  icon,
  image,
  tips,
}: ItineraryActivityProps) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0 group print:break-inside-avoid print:pb-4">
      {/* Connector Line (Activity level) - Optional, mainly handled by Day/Timeline */}

      {/* Activity Icon/Dot */}
      <div className="absolute left-0 top-0 mt-1 w-4 h-4 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--color-primary)] flex items-center justify-center z-10 overflow-hidden print:bg-white">
        {/* We could put an icon inside, or just use it as a dot */}
        {icon && (
          <span className="text-[10px] flex items-center justify-center w-full h-full">{icon}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-baseline gap-2">
            {time && (
              <span className="text-[length:var(--text-sm)] font-bold text-[var(--color-primary)]">
                {time}
              </span>
            )}
            <h4 className="text-[length:var(--text-lg)] font-bold text-[var(--text-primary)]">
              {title}
            </h4>
          </div>

          {duration && (
            <div className="flex items-center gap-1 text-[length:var(--text-xs)] text-[var(--text-secondary)] uppercase tracking-wide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {duration}
            </div>
          )}

          {description && (
            <p className="text-[var(--text-secondary)] text-[length:var(--text-base)] leading-relaxed">
              {description}
            </p>
          )}

          {tips && (
            <div className="mt-3 bg-[var(--bg-surface-raised)] p-3 rounded-[var(--radius-sm)] border-l-4 border-[var(--color-accent)] text-[length:var(--text-sm)] text-[var(--text-secondary)] print:bg-transparent print:border-2 print:border-[var(--color-accent)]">
              <span className="font-bold text-[var(--text-primary)] block mb-1">
                💡 Insider Tip:
              </span>
              {tips}
            </div>
          )}
        </div>

        {/* Optional Image */}
        {image && (
          <div className="sm:w-1/3 shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-32 sm:h-full object-cover rounded-[var(--radius-md)] shadow-sm"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
