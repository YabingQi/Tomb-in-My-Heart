import { useState } from 'react'
import { useTombStore } from '../../store/tombStore.js'
import { WINES } from '../../data/wines.js'
import Modal from '../ui/Modal.jsx'
import styles from './WinePicker.module.css'

export default function WinePicker({ tombId }) {
  const activeRitual = useTombStore(s => s.activeRitual)
  const closeRitual = useTombStore(s => s.closeRitual)
  const pourWine = useTombStore(s => s.pourWine)
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')
  const [poured, setPoured] = useState(false)

  const wine = WINES.find(w => w.id === selected)

  const handlePour = () => {
    if (!selected) return
    pourWine(tombId, selected, toast.trim() || null)
    setPoured(true)
    setTimeout(() => {
      setPoured(false)
      setSelected(null)
      setToast('')
      closeRitual()
    }, 1800)
  }

  return (
    <Modal
      isOpen={activeRitual === 'wine'}
      onClose={closeRitual}
      title="Pour a Drink"
    >
      {poured ? (
        <div className={styles.poured}>
          <p className={styles.pouredText}>
            You poured {wine?.name}.
          </p>
          <p className={styles.pouredSub}>{wine?.description}.</p>
          {toast && <p className={styles.toastText}>"{toast}"</p>}
        </div>
      ) : (
        <div className={styles.content}>
          <p className={styles.prompt}>Share a drink with them.</p>

          <div className={styles.list}>
            {WINES.map(w => (
              <button
                key={w.id}
                className={`${styles.wineBtn} ${selected === w.id ? styles.selected : ''}`}
                onClick={() => setSelected(w.id)}
                aria-pressed={selected === w.id}
              >
                <span
                  className={styles.dot}
                  style={{ background: w.color }}
                  aria-hidden="true"
                />
                <div className={styles.wineInfo}>
                  <span className={styles.wineName}>{w.name}</span>
                  <span className={styles.wineDesc}>{w.description}</span>
                </div>
              </button>
            ))}
          </div>

          {selected && (
            <label className={styles.toastLabel}>
              <span>A toast <span className={styles.opt}>(optional)</span></span>
              <input
                className={styles.toastInput}
                type="text"
                value={toast}
                onChange={e => setToast(e.target.value)}
                placeholder="Something to say as you pour..."
                maxLength={200}
              />
            </label>
          )}

          <button
            className={styles.pourBtn}
            onClick={handlePour}
            disabled={!selected}
          >
            Pour the {wine?.name ?? 'Drink'}
          </button>
        </div>
      )}
    </Modal>
  )
}
