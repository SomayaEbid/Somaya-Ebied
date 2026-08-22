import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import SectionHeading from '../ui/SectionHeading';
import Timeline from '../ui/Timeline';
import './Experience.css';

export default function Experience() {
  const { data: experience, loading } = useJsonData('/data/experience.json');
  const ref = useRef(null);

  useEffect(() => {
    if (!experience) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [experience]);

  if (loading || !experience) return null;

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading title="Experience" subtitle="My professional journey across education, training, and hospitality" />
        <div className="reveal" ref={ref}>
          <Timeline items={experience} />
        </div>
      </div>
    </section>
  );
}
