import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`${sizes[size]} border-4 border-gray-300 border-t-space-accent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingIndicator;