import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import SectionHeading from '../ui/SectionHeading';
import './Qualifications.css';

export default function Qualifications() {
  const { data: qualifications, loading } = useJsonData('/data/qualifications.json');
  const ref = useRef(null);

  useEffect(() => {
    if (!qualifications) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [qualifications]);

  if (loading || !qualifications) return null;

  return (
    <section className="section section--alt" id="qualifications">
      <div className="container">
        <SectionHeading title="Qualifications" subtitle="Academic background and educational achievements" />
        <div className="qualifications__grid reveal" ref={ref}>
          {qualifications.map((qual) => (
            <div key={qual.id} className="qual-card">
              <div className="qual-card__icon">
                {qual.year === 'Ongoing' ? '🎓' : qual.notes ? '🏆' : '📜'}
              </div>
              <div className="qual-card__content">
                <h3 className="qual-card__title">{qual.title}</h3>
                {qual.institution && (
                  <p className="qual-card__institution">{qual.institution}</p>
                )}
                <span className="qual-card__year">{qual.year}</span>
                {qual.notes && (
                  <p className="qual-card__notes">{qual.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
