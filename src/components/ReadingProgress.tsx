import { useState, useEffect } from 'react';

interface ReadingProgressProps {
  targetSelector?: string;
  className?: string;
}

export const ReadingProgress = ({
  targetSelector = 'main',
  className = '',
}: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const target = document.querySelector(targetSelector) as HTMLElement;
      if (!target) return;

      const windowHeight = window.innerHeight;
      const elementTop = target.offsetTop;
      const elementHeight = target.offsetHeight;
      const scrollTop = window.scrollY;

      // Calculate total scrollable distance within the target
      // We subtract windowHeight because when the bottom of the element
      // hits the bottom of the viewport, we consider it "done" (or when we scroll past it).
      // Standard reading progress:
      // 0% when top of viewport is at top of element (or element is at top of page)
      // 100% when bottom of viewport is at bottom of element

      const totalDistance = elementHeight - windowHeight;
      const currentScroll = scrollTop - elementTop;

      let percentage = 0;
      if (totalDistance > 0) {
        percentage = currentScroll / totalDistance;
      }

      // Clamp between 0 and 1
      percentage = Math.min(Math.max(percentage, 0), 1);

      setProgress(percentage);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [targetSelector]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 pointer-events-none ${className}`}
      aria-hidden="true"
      data-testid="reading-progress-container"
    >
      <div
        className="h-1 bg-[var(--color-primary)] transition-all duration-150 ease-out origin-left"
        style={{ transform: `scaleX(${progress})` }}
        data-testid="reading-progress-bar"
      />
    </div>
  );
};

export default ReadingProgress;
