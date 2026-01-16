import React, { useEffect, useRef, useState } from 'react';

export interface Milestone {
  date: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
}

interface TravelTimelineProps {
  milestones: Milestone[];
}

export const TravelTimeline: React.FC<TravelTimelineProps> = ({ milestones }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize with correct value to avoid effect sync update
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[var(--bg-surface)] overflow-hidden"
      aria-label="Travel Journey Timeline"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[var(--text-primary)] font-display">
          My Travel Journey
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[var(--border-default)] md:-ml-0.5"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center md:justify-between ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{
                  opacity: isVisible || prefersReducedMotion ? 1 : 0,
                  transform:
                    isVisible || prefersReducedMotion ? 'translateY(0)' : 'translateY(20px)',
                  transition: prefersReducedMotion
                    ? 'none'
                    : `opacity 0.6s ease-out ${index * 0.2}s, transform 0.6s ease-out ${index * 0.2}s`,
                }}
              >
                {/* Spacer for desktop alignment */}
                <div className="hidden md:block w-5/12" />

                {/* Timeline Marker (Dot) */}
                <div
                  className="absolute left-4 md:left-1/2 w-4 h-4 bg-[var(--color-primary)] rounded-full border-4 border-[var(--bg-surface)] shadow-sm md:-ml-2 z-10 transform -translate-x-1.5 md:translate-x-0 mt-1.5 md:mt-0"
                  aria-hidden="true"
                />

                {/* Content Card */}
                <div className="ml-12 md:ml-0 w-full md:w-5/12 pl-4 md:pl-0">
                  <div className="bg-[var(--bg-surface-raised)] p-6 rounded-xl border border-[var(--border-default)] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full mb-3">
                      {milestone.date}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-display">
                      {milestone.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {milestone.description}
                    </p>
                    {milestone.image && (
                      <div className="rounded-lg overflow-hidden mt-4 aspect-video bg-[var(--bg-surface)]">
                        <img
                          src={milestone.image.src}
                          alt={milestone.image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
