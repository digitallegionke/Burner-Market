import React, { useState } from 'react';
import Image from 'next/image';
import { Loading } from './Loading';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  quality = 75,
  sizes = '100vw',
  fill = false,
  width,
  height,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle image load error
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Fallback for error state
  if (error) {
    return (
      <div className={`bg-gray-200 ${className}`}>
        <div className="flex h-full items-center justify-center">
          <span className="text-sm text-gray-500">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loading size="small" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        quality={quality}
        priority={priority}
        sizes={sizes}
        fill={fill}
        width={width}
        height={height}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoadingComplete={handleLoad}
        onError={handleError}
      />
    </div>
  );
} 