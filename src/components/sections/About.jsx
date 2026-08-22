import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import SectionHeading from '../ui/SectionHeading';
import './About.css';

export default function About() {
  const { data: profile, loading } = useJsonData('/data/profile.json');
  const ref = useRef(null);

  useEffect(() => {
    if (!profile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [profile]);

  if (loading || !profile) return null;

  return (
    <section className="section section--alt" id="about">
      <div className="container">
        <SectionHeading title="About Me" subtitle="A brief introduction to who I am and what I do" />
        <div className="about__content reveal" ref={ref}>
          <div className="about__text">
            <p className="about__summary">{profile.summary}</p>
          </div>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-number">7+</span>
              <span className="about__stat-label">Years Experience</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">4+</span>
              <span className="about__stat-label">Organizations</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">6+</span>
              <span className="about__stat-label">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
