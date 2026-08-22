import { useEffect, useRef } from 'react';
import './SectionHeading.css';

export default function SectionHeading({ title, subtitle, light = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`section-heading reveal ${light ? 'section-heading--light' : ''}`} ref={ref}>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      <div className="section-heading__accent" />
    </div>
  );
}
