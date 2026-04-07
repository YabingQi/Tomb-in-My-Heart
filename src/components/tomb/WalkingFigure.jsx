import styles from './WalkingFigure.module.css'

export default function WalkingFigure() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.bob}>
        <svg
          className={styles.svg}
          width="18"
          height="32"
          viewBox="0 0 18 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {/* Head */}
          <circle cx="9" cy="5" r="3.5" />
          {/* Body */}
          <line x1="9" y1="8.5" x2="9" y2="20" />
          {/* Left arm */}
          <line x1="9" y1="12" x2="3" y2="17" className={styles.armL} />
          {/* Right arm */}
          <line x1="9" y1="12" x2="15" y2="17" className={styles.armR} />
          {/* Left leg */}
          <line x1="9" y1="20" x2="3" y2="30" className={styles.legL} />
          {/* Right leg */}
          <line x1="9" y1="20" x2="15" y2="30" className={styles.legR} />
        </svg>
      </div>
    </div>
  )
}
