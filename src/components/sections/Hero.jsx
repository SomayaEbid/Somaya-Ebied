import { useJsonData } from '../../hooks/useJsonData';
import Button from '../ui/Button';
import './Hero.css';

export default function Hero() {
  const { data: profile, loading } = useJsonData('/data/profile.json');

  if (loading || !profile) return null;

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__bg-pattern" />
        <div className="hero__bg-gradient" />
      </div>
      <div className="hero__content container">
        <div className="hero__text">
          <div className="hero__greeting">Welcome, I'm</div>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__title">{profile.title}</p>
          <p className="hero__subtitle">{profile.subtitle}</p>
          <div className="hero__location">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {profile.location}
          </div>
          <div className="hero__cta">
            <Button href="#contact" variant="primary" size="lg">
              Contact Me
            </Button>
            <Button href="#experience" variant="outline" size="lg">
              View Experience
            </Button>
          </div>
        </div>
        <div className="hero__image-wrapper">
          <div className="hero__image-ring" />
          <div className="hero__image-container">
            <img
              src={profile.photo}
              alt={profile.name}
              className="hero__image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div class="hero__image-placeholder">${profile.name.split(' ').map(n => n[0]).join('')}</div>`;
              }}
            />
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <span>Scroll Down</span>
        <div className="hero__scroll-arrow" />
      </div>
    </section>
  );
}
