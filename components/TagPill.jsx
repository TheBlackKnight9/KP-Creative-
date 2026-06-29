export default function TagPill({ children, className = "" }) {
  return (
    <span className={`tag-pill-wrap ${className}`}>
      <span className="tag-pill">{children}</span>
    </span>
  );
}
