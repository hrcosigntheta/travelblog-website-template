import React, { useState } from 'react';
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
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center z-10"
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

      {/* Main Image */}
      <img
        {...props}
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        loading={props.loading || 'lazy'}
      />
    </div>
  );
};
