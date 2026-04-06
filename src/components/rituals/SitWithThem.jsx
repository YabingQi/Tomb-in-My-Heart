import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTombStore } from '../../store/tombStore.js'
import CandleFlicker from '../ui/CandleFlicker.jsx'
import styles from './SitWithThem.module.css'

const MEDITATIONS = [
  'You are remembered.',
  'Time moves, but not here.',
  'The story is over. You remain.',
  'I still think about you.',
  'It is enough to be here.',
  'Some things do not need to end to matter.',
  'You were real to me.',
]

export default function SitWithThem({ characterName }) {
  const activeRitual = useTombStore(s => s.activeRitual)
  const closeRitual = useTombStore(s => s.closeRitual)
  const isOpen = activeRitual === 'sit'

  const [lineIndex, setLineIndex] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!isOpen) return
    setLineIndex(0)
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        setLineIndex(i => (i + 1) % MEDITATIONS.length)
        setShow(true)
      }, 800)
    }, 5000)
    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onClick={closeRitual}
      role="dialog"
      aria-label="Sit with them"
      aria-modal="true"
    >
      <div className={styles.candle}>
        <CandleFlicker size="lg" />
      </div>

      <AnimatePresence mode="wait">
        {show && (
          <motion.p
            key={lineIndex}
            className={styles.line}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.8 }}
          >
            {MEDITATIONS[lineIndex]}
          </motion.p>
        )}
      </AnimatePresence>

      {characterName && (
        <p className={styles.name}>{characterName}</p>
      )}

      <p className={styles.hint}>Click anywhere to leave</p>
    </motion.div>
  )
}
