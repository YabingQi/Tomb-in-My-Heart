import { useMemo } from 'react'
import styles from './ParticleField.module.css'

export default function ParticleField({ count = 40 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${20 + Math.random() * 70}%`,
      size: `${1 + Math.random() * 2}px`,
      drift: `${(Math.random() - 0.5) * 30}px`,
      duration: `${6 + Math.random() * 10}s`,
      delay: `${Math.random() * 8}s`,
    })),
  [count])

  return (
    <div className={styles.field} aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            '--drift': p.drift,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
