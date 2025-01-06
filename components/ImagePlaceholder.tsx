import React from 'react';

interface ImagePlaceholderProps {
  text?: string;
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
      <div className="text-gray-400 text-center p-4">
        {text || 'Image placeholder'}
      </div>
    </div>
  );
};

export default ImagePlaceholder;
