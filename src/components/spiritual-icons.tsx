// Decorative Om symbol component
export function OmSymbol({ className = '', size = 64 }: { className?: string; size?: number }) {
  return (
    <span
      className={`select-none ${className}`}
      style={{
        fontSize: size,
        fontFamily: 'var(--font-serif-display), serif',
        lineHeight: 1,
        background: 'linear-gradient(135deg, var(--saffron), var(--vermilion))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
      }}
      aria-hidden
    >
      ॐ
    </span>
  )
}

// Lotus icon (SVG)
export function LotusIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M32 56c-12 0-22-6-22-12 0 0 8-4 22-4s22 4 22 4c0 6-10 12-22 12z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M32 50c-4-10-2-20 4-28 4 8 6 16 4 28-4 0-4 0-8 0z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M32 50c-2-8-8-14-16-16-2 8 2 16 12 18 2-1 4-1 4-2z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M32 50c2-8 8-14 16-16 2 8-2 16-12 18-2-1-4-1-4-2z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M32 52c-2-6-6-10-12-12-2 6 2 12 8 14 2-1 4-1 4-2z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M32 52c2-6 6-10 12-12 2 6-2 12-8 14-2-1-4-1-4-2z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  )
}

// Mandala-inspired decorative SVG
export function Mandala({ className = '', size = 200 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden
    >
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 20 Q110 50 100 80 Q90 50 100 20Z"
              fill="currentColor"
              opacity="0.18"
            />
          </g>
        )
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <circle cx="100" cy="40" r="3" fill="currentColor" opacity="0.4" />
          </g>
        )
      })}
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
