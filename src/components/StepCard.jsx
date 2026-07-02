import React from 'react';

const StepCard = ({ number, title, description, imageUrl }) => {
  return (
    <div className="step-card">
      <div className="step-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={`Paso ${number}`} className="step-image" />
        ) : (
          <div className="step-image-placeholder">
            <span className="image-icon">📷</span>
            <span className="image-text">Imagen {number}</span>
          </div>
        )}
      </div>
      <div className="step-content">
        <h3 className="step-title">
          {number}. {title} <span className="check-icon">✓</span>
        </h3>
        <p className="step-desc">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
