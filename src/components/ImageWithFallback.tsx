import React, { useState, useCallback } from 'react';
import { getAssetPath } from '../utils/paths';
import type { ImageWithFallbackProps } from '../types/common';

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = getAssetPath('/images/placeholders/default-fallback.jpg'), // Default fallback
  placeholderSrc,
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState<string>(getAssetPath(src));
  const [lastSrc, setLastSrc] = useState<string>(src);

  if (src !== lastSrc) {
    setLastSrc(src);
    setCurrentSrc(getAssetPath(src));
    setError(false);
    setLoading(true);
  }

  // Callback ref to handle the case where the image is already loaded (cached or fast network)
  // The onLoad event won't fire if the image was already complete before React attached the handler
  const imgCallbackRef = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth > 0) {
      setLoading(false);
    }
  }, []);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false);
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false); // Stop loading if error occurs
    if (!error) {
      setError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (props.onError) {
      props.onError(e);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`} data-testid="image-container">
      {/* Placeholder / Loading State */}
      {loading && (
        <div
          className="absolute inset-0 bg-[var(--bg-surface-raised)] animate-pulse flex items-center justify-center z-10"
          aria-hidden="true"
          data-testid="loading-placeholder"
        >
          {placeholderSrc && (
            <img
              src={getAssetPath(placeholderSrc)}
              alt=""
              className="w-full h-full object-cover blur-sm transition-opacity duration-300"
            />
          )}
        </div>
      )}

      {/* Main Image - key ensures remount when src changes to handle cached images */}
      <img
        {...props}
        key={currentSrc}
        ref={imgCallbackRef}
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        loading={props.loading || 'lazy'}
        decoding="async"
      />
    </div>
  );
};
