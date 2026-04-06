import { useState, useCallback } from 'react'
import { useTombStore } from '../../store/tombStore.js'
import Modal from '../ui/Modal.jsx'
import LetterBurn from './LetterBurn.jsx'
import styles from './LetterArchive.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function LetterArchive({ tombId }) {
  const activeRitual = useTombStore(s => s.activeRitual)
  const closeRitual = useTombStore(s => s.closeRitual)
  const getTomb = useTombStore(s => s.getTomb)
  const burnLetter = useTombStore(s => s.burnLetter)
  const tomb = getTomb(tombId)

  const [reading, setReading] = useState(null) // letter id
  const [burning, setBurning] = useState(null)  // letter id

  const handleBurnStart = (id) => {
    setReading(null)
    setBurning(id)
  }

  const handleBurnComplete = useCallback(() => {
    burnLetter(tombId, burning)
    setBurning(null)
    closeRitual()
  }, [tombId, burning, burnLetter, closeRitual])

  if (!tomb) return null

  const saved = tomb.letters.filter(l => !l.burned)
  const burnedCount = tomb.letters.filter(l => l.burned).length
  const readingLetter = saved.find(l => l.id === reading)

  return (
    <>
      <Modal
        isOpen={activeRitual === 'archive' && !burning}
        onClose={() => { setReading(null); closeRitual() }}
        title="Your Letters"
        wide
      >
        {saved.length === 0 && burnedCount === 0 ? (
          <p className={styles.empty}>No letters yet.</p>
        ) : readingLetter ? (
          <div className={styles.readView}>
            <button className={styles.back} onClick={() => setReading(null)}>
              ← Back
            </button>
            <p className={styles.readDate}>{formatDate(readingLetter.createdAt)}</p>
            <div className={styles.readContent}>
              {readingLetter.content}
            </div>
            <button
              className={styles.burnFromRead}
              onClick={() => handleBurnStart(readingLetter.id)}
            >
              Burn this letter
            </button>
          </div>
        ) : (
          <div className={styles.listView}>
            {saved.map((letter, i) => (
              <button
                key={letter.id}
                className={styles.letterItem}
                onClick={() => setReading(letter.id)}
                aria-label={`Read letter from ${formatDate(letter.createdAt)}`}
              >
                <span className={styles.letterNum}>Letter {i + 1}</span>
                <span className={styles.letterDate}>{formatDate(letter.createdAt)}</span>
                <span className={styles.letterPreview}>
                  {letter.content.slice(0, 60)}{letter.content.length > 60 ? '…' : ''}
                </span>
              </button>
            ))}
            {burnedCount > 0 && (
              <p className={styles.burnedNote}>
                {burnedCount} letter{burnedCount !== 1 ? 's' : ''} released to the flame.
              </p>
            )}
          </div>
        )}
      </Modal>

      {burning && (
        <LetterBurn
          content={tomb.letters.find(l => l.id === burning)?.content ?? ''}
          onComplete={handleBurnComplete}
        />
      )}
    </>
  )
}
