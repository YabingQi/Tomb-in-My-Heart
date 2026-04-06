import ParticleField from './ParticleField.jsx'
import styles from './AppShell.module.css'

export default function AppShell({ children }) {
  return (
    <div className={styles.shell}>
      {/* Atmosphere layers */}
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.fog} aria-hidden="true" />
      <div className={`${styles.fog} ${styles.fogB}`} aria-hidden="true" />
      <ParticleField count={35} />

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
