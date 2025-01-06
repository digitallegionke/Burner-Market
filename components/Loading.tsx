import React from 'react';

interface LoadingProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Loading({ fullScreen = false, size = 'medium' }: LoadingProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const containerClasses = fullScreen
    ? 'flex min-h-screen items-center justify-center'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-blue-500 border-t-transparent`}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
} 