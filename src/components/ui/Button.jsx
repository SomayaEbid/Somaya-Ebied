import './Button.css';

export default function Button({ children, href, onClick, variant = 'primary', size = 'md', icon, ...props }) {
  const className = `btn btn--${variant} btn--${size}`;

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {icon && <span className="btn__icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className} {...props}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}
