import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Modal.module.css'

export default function Modal({ isOpen, onClose, title, children, wide = false }) {
  const ref = useRef(null)
  // Keep a stable ref to onClose so the focus/keyboard effect only
  // re-runs when isOpen changes, not on every render.
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose })

  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement
    ref.current?.focus()
    const handler = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
      prev?.focus()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            ref={ref}
            tabIndex={-1}
            className={`${styles.panel} ${wide ? styles.wide : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <button
                className={styles.close}
                onClick={onClose}
                aria-label="Close"
              >✕</button>
            </div>
            <div className={styles.body}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
