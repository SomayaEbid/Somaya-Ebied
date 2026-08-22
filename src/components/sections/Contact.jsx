import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import './Contact.css';

export default function Contact() {
  const { data: profile, loading } = useJsonData('/data/profile.json');
  const ref = useRef(null);

  useEffect(() => {
    if (!profile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [profile]);

  if (loading || !profile) return null;

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading title="Get in Touch" subtitle="Let's connect and discuss how I can contribute to your organization" />
        <div className="contact__content reveal" ref={ref}>
          <div className="contact__info">
            <div className="contact__item">
              <div className="contact__item-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <h4 className="contact__item-label">Email</h4>
                <a href={`mailto:${profile.email}`} className="contact__item-value">{profile.email}</a>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__item-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <h4 className="contact__item-label">Phone</h4>
                <a href={`tel:${profile.phone}`} className="contact__item-value">{profile.phone}</a>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__item-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div>
                <h4 className="contact__item-label">LinkedIn</h4>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact__item-value">
                  View Profile →
                </a>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__item-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h4 className="contact__item-label">Location</h4>
                <p className="contact__item-value contact__item-value--text">{profile.location}</p>
              </div>
            </div>
          </div>

          <div className="contact__cta">
            <Button href={`mailto:${profile.email}`} variant="primary" size="lg">
              Send an Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
