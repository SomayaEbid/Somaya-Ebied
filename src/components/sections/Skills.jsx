import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import './Skills.css';

export default function Skills() {
  const { data: skills, loading } = useJsonData('/data/skills.json');
  const ref = useRef(null);

  useEffect(() => {
    if (!skills) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [skills]);

  if (loading || !skills) return null;

  return (
    <section className="section section--dark" id="skills">
      <div className="container">
        <SectionHeading title="Skills" subtitle="Core competencies and areas of expertise" light />
        <div className="skills__grid reveal" ref={ref}>
          {skills.categories.map((category, index) => (
            <div key={index} className="skills__category">
              <h3 className="skills__category-name">{category.name}</h3>
              <div className="skills__tags">
                {category.skills.map((skill, i) => (
                  <Badge key={i}>{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
