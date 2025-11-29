import React from 'react';

const LoadingSpinner = ({ size = 40, color = '#667eea' }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        border: `${size / 10}px solid rgba(0, 0, 0, 0.1)`,
        borderRadius: '50%',
        borderTopColor: color,
        animation: 'spin 1s ease-in-out infinite'
      }}
    />
  );
};

export default LoadingSpinner;
