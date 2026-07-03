import { useMemo } from 'react'

// pure-CSS drifting embers; count kept low, GPU-composited transforms only
export default function Embers({ count = 18, className = '' }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 53) % 100}%`,
        size: 3 + ((i * 7) % 5),
        duration: 4 + ((i * 13) % 7),
        delay: -((i * 17) % 11),
      })),
    [count]
  )
  return (
    <div className={`embers ${className}`} aria-hidden='true'>
      {embers.map((e, i) => (
        <span
          key={i}
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
