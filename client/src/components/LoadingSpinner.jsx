// src/components/LoadingSpinner.jsx
import React from 'react';

function LoadingSpinner({ size = 'large', message = 'Loading...' }) {
  const sizes = {
    small: { width: '24px', height: '24px' },
    medium: { width: '40px', height: '40px' },
    large: { width: '60px', height: '60px' }
  };

  const spinnerStyle = {
    display: 'inline-block',
    ...sizes[size],
    border: '3px solid #e5e7eb',
    borderRadius: '50%',
    borderTopColor: '#3b82f6',
    animation: 'spin 1s ease-in-out infinite'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '2rem',
    minHeight: size === 'large' ? '200px' : 'auto'
  };

  const messageStyle = {
    color: '#64748b',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        {message && <div style={messageStyle}>{message}</div>}
      </div>
    </>
  );
}

export default LoadingSpinner;
