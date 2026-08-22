import './Timeline.css';

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div className="timeline__item" key={item.id || index}>
          <div className="timeline__marker">
            <div className="timeline__dot" />
            {index < items.length - 1 && <div className="timeline__line" />}
          </div>
          <div className="timeline__content">
            <div className="timeline__header">
              <h3 className="timeline__role">{item.role || item.title}</h3>
              <span className="timeline__date">
                {item.startDate} — {item.endDate || item.year}
              </span>
            </div>
            {item.organization && (
              <p className="timeline__org">{item.organization}</p>
            )}
            {item.institution && (
              <p className="timeline__org">{item.institution}</p>
            )}
            {item.notes && (
              <p className="timeline__notes">🏆 {item.notes}</p>
            )}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="timeline__bullets">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="timeline__bullet">{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
