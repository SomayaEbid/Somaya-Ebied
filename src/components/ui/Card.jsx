import { useState } from 'react';
import './Card.css';

export default function Card({ image, title, subtitle, description, children, className = '' }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`card ${className}`}>
      {image && !imgError && (
        <div className="card__image-wrapper">
          <img
            src={image}
            alt={title}
            className="card__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      {image && imgError && (
        <div className="card__image-wrapper card__image-placeholder">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14zM8 15h8v2H8v-2zm0-4h8v2H8v-2zm0-4h8v2H8V7z"/>
          </svg>
          <span>Certificate</span>
        </div>
      )}
      <div className="card__body">
        {title && <h3 className="card__title">{title}</h3>}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        {description && <p className="card__description">{description}</p>}
        {children}
      </div>
    </div>
  );
}
