import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading data...' }) => {
  const sizeMap = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border-lg'
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-5 animate-fade-in">
      <div className={`spinner-border text-primary ${sizeMap[size]}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="mt-3 text-muted small fw-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
