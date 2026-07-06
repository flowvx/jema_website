export default function Logo({ size = 32, withWordmark = true }) {
  return (
    <span className="inline-flex items-center gap-2 select-none">
       <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z"  stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17"            stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12"            stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      {withWordmark && (
        <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Jema
        </span>
      )}
    </span>
  )
}
