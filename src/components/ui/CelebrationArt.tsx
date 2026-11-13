export function Sunburst({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    {Array.from({ length: 16 }, (_, i) => <path key={i} d="M50 7V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 22.5} 50 50)`} />)}
    <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2" />
  </svg>;
}
