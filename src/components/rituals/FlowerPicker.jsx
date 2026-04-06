import { useState } from 'react'
import { useTombStore } from '../../store/tombStore.js'
import { FLOWERS } from '../../data/flowers.js'
import Modal from '../ui/Modal.jsx'
import styles from './FlowerPicker.module.css'

export default function FlowerPicker({ tombId }) {
  const activeRitual = useTombStore(s => s.activeRitual)
  const closeRitual = useTombStore(s => s.closeRitual)
  const placeFlower = useTombStore(s => s.placeFlower)
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const [placed, setPlaced] = useState(false)

  const handlePlace = () => {
    if (!selected) return
    placeFlower(tombId, selected, note.trim() || null)
    setPlaced(true)
    setTimeout(() => {
      setPlaced(false)
      setSelected(null)
      setNote('')
      closeRitual()
    }, 1600)
  }

  const flower = FLOWERS.find(f => f.id === selected)

  return (
    <Modal
      isOpen={activeRitual === 'flowers'}
      onClose={closeRitual}
      title="Leave Flowers"
    >
      {placed ? (
        <div className={styles.placed}>
          <span className={styles.placedEmoji}>{flower?.emoji}</span>
          <p>You left {flower?.name}.</p>
          <p className={styles.meaning}>{flower?.meaning}.</p>
        </div>
      ) : (
        <div className={styles.content}>
          <p className={styles.prompt}>Choose what you wish to leave.</p>

          <div className={styles.grid}>
            {FLOWERS.map(f => (
              <button
                key={f.id}
                className={`${styles.flowerBtn} ${selected === f.id ? styles.selected : ''}`}
                onClick={() => setSelected(f.id)}
                aria-pressed={selected === f.id}
                aria-label={`${f.name}: ${f.meaning}`}
              >
                <span className={styles.flowerEmoji}>{f.emoji}</span>
                <span className={styles.flowerName}>{f.name}</span>
                <span className={styles.flowerMeaning}>{f.meaning}</span>
              </button>
            ))}
          </div>

          {selected && (
            <label className={styles.noteLabel}>
              <span>A whispered word <span className={styles.opt}>(optional)</span></span>
              <input
                className={styles.noteInput}
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Something you want to say while leaving these..."
                maxLength={200}
              />
            </label>
          )}

          <button
            className={styles.placeBtn}
            onClick={handlePlace}
            disabled={!selected}
          >
            Place the {flower?.name ?? 'Flowers'}
          </button>
        </div>
      )}
    </Modal>
  )
}
