import React from 'react';

interface TravelPhilosophyProps {
  heading?: string;
  quote: string;
  content: string;
  missionStatement: string;
}

export const TravelPhilosophy: React.FC<TravelPhilosophyProps> = ({
  heading = 'Travel Philosophy',
  quote,
  content,
  missionStatement,
}) => {
  return (
    <section className="py-20 bg-[var(--bg-surface-raised)] border-y border-[var(--border-default)]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-6 text-[var(--color-primary)]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>

        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8">
          {heading}
        </h2>

        <div className="space-y-8">
          <blockquote className="text-xl md:text-2xl text-[var(--text-primary)] font-serif italic leading-relaxed relative px-8">
            <span className="absolute top-0 left-0 text-4xl text-[var(--color-secondary)] opacity-30">
              &ldquo;
            </span>
            {quote}
            <span className="absolute bottom-0 right-0 text-4xl text-[var(--color-secondary)] opacity-30">
              &rdquo;
            </span>
          </blockquote>

          <div className="w-24 h-1 bg-[var(--color-secondary)] mx-auto rounded-full opacity-50" />

          <div className="text-lg text-[var(--text-secondary)] leading-relaxed space-y-6">
            <p>{content}</p>
            <p className="font-medium text-[var(--text-primary)]">{missionStatement}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
