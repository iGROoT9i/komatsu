import React, { useState } from 'react';

const StepCard = ({ number, title, description, imageUrl }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="step-card">
        <div 
          className="step-image-container" 
          onClick={() => imageUrl && setIsZoomed(true)}
          style={{ cursor: imageUrl ? 'zoom-in' : 'default' }}
        >
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

      {isZoomed && imageUrl && (
        <div className="image-zoom-overlay" onClick={() => setIsZoomed(false)}>
          <div className="image-zoom-content">
            <button className="image-zoom-close" onClick={() => setIsZoomed(false)}>&times;</button>
            <img src={imageUrl} alt={`Paso ${number} Ampliado`} className="image-zoomed" />
          </div>
        </div>
      )}
    </>
  );
};

export default StepCard;
