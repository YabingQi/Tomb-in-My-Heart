import styles from './CandleFlicker.module.css'

export default function CandleFlicker({ size = 'md' }) {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`} aria-hidden="true">
      <div className={styles.flame}>
        <div className={styles.flameOuter} />
        <div className={styles.flameMid} />
        <div className={styles.flameCore} />
      </div>
      <div className={styles.body}>
        <div className={styles.wick} />
      </div>
      <div className={styles.glow} />
    </div>
  )
}
