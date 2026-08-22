import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import './Projects.css';

export default function Projects() {
  const { data: projects, loading } = useJsonData('/data/projects.json');
  const ref = useRef(null);

  useEffect(() => {
    if (!projects) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [projects]);

  if (loading || !projects) return null;

  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <SectionHeading title="Projects" subtitle="Consultancy frameworks and flagship initiatives" />
        <div className="projects__grid reveal" ref={ref}>
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card__header">
                <div className="project-card__icon">💡</div>
                <h3 className="project-card__title">{project.title}</h3>
              </div>
              <p className="project-card__description">{project.description}</p>
              <div className="project-card__tags">
                {project.tags.map((tag, i) => (
                  <Badge key={i} variant="outline">{tag}</Badge>
                ))}
              </div>
              {project.link && (
                <a href={project.link} className="project-card__link" target="_blank" rel="noopener noreferrer">
                  Learn More →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
