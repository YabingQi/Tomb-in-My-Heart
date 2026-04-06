import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LetterBurn.module.css'

export default function LetterBurn({ content, onComplete }) {
  const [phase, setPhase] = useState('igniting') // igniting → burning → ash → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('burning'),  600)
    const t2 = setTimeout(() => setPhase('ash'),     2400)
    const t3 = setTimeout(() => { setPhase('done'); onComplete() }, 3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  const lines = content.split('\n').filter(Boolean)

  return (
    <div className={styles.overlay} aria-live="polite" aria-label="Letter burning">
      {/* The letter text burning away */}
      <div className={`${styles.letterText} ${phase !== 'igniting' ? styles.burning : ''}`}>
        {lines.map((line, i) => (
          <p
            key={i}
            className={styles.line}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Fire layers */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className={styles.fireContainer}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.fireOuter} />
            <div className={styles.fireMid} />
            <div className={styles.fireCore} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ash state */}
      {phase === 'ash' && (
        <motion.div
          className={styles.ashText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p>Released.</p>
          <p className={styles.ashSub}>The words have gone somewhere words go.</p>
        </motion.div>
      )}
    </div>
  )
}
