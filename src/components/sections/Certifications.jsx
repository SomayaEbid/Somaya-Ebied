import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import './Certifications.css';

export default function Certifications() {
  const { data: certifications, loading } = useJsonData('/data/certifications.json');
  const ref = useRef(null);

  useEffect(() => {
    if (!certifications) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [certifications]);

  if (loading || !certifications) return null;

  return (
    <section className="section" id="certifications">
      <div className="container">
        <SectionHeading title="Certifications" subtitle="Professional credentials and accredited training programs" />
        <div className="certifications__grid reveal" ref={ref}>
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              title={cert.title}
              subtitle={cert.issuer}
              className="card--no-image"
            >
              <div className="cert-meta">
                <span className="cert-meta__date">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                  </svg>
                  {cert.date}
                </span>
                {cert.location && (
                  <span className="cert-meta__location">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {cert.location}
                  </span>
                )}
                {cert.code && (
                  <span className="cert-meta__code">Code: {cert.code}</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
