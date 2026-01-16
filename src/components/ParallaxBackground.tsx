import React, { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  image: string;
  speed?: number; // 0.5 = half scroll speed
  className?: string;
  alt?: string;
  height?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  image,
  speed = 0.5,
  className = '',
  alt = '',
  height = 'h-96',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate if in view
      if (rect.bottom > 0 && rect.top < windowHeight) {
        // Calculate vertical position relative to viewport center
        const centerY = windowHeight / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenterY - centerY;

        // Apply parallax transform
        const translateY = distanceFromCenter * speed;
        imgRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      window.addEventListener('scroll', onScroll);
      handleScroll(); // Initial position
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${height} ${className}`}>
      <img
        ref={imgRef}
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
        loading="lazy"
      />
    </div>
  );
};
