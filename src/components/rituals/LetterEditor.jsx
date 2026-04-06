import { useState, useCallback } from 'react'
import { useTombStore } from '../../store/tombStore.js'
import Modal from '../ui/Modal.jsx'
import LetterBurn from './LetterBurn.jsx'
import styles from './LetterEditor.module.css'

export default function LetterEditor({ tombId }) {
  const activeRitual = useTombStore(s => s.activeRitual)
  const closeRitual = useTombStore(s => s.closeRitual)
  const saveLetter = useTombStore(s => s.saveLetter)
  const burnLetter = useTombStore(s => s.burnLetter)

  const [content, setContent] = useState('')
  const [mode, setMode] = useState('write') // 'write' | 'confirm-burn' | 'burning'
  const [pendingBurnId, setPendingBurnId] = useState(null)

  const handleSave = () => {
    if (!content.trim()) return
    saveLetter(tombId, content)
    setContent('')
    closeRitual()
  }

  const handleBurnInit = () => {
    if (!content.trim()) return
    // Save first, then burn
    const id = saveLetter(tombId, content)
    setPendingBurnId(id)
    setMode('confirm-burn')
  }

  const handleConfirmBurn = () => {
    setMode('burning')
  }

  const handleBurnComplete = useCallback(() => {
    burnLetter(tombId, pendingBurnId)
    setContent('')
    setPendingBurnId(null)
    setMode('write')
    closeRitual()
  }, [tombId, pendingBurnId, burnLetter, closeRitual])

  const handleClose = () => {
    if (mode === 'burning') return // can't close during burn
    setContent('')
    setMode('write')
    setPendingBurnId(null)
    closeRitual()
  }

  return (
    <>
      <Modal
        isOpen={activeRitual === 'letter' && mode !== 'burning'}
        onClose={handleClose}
        title="Write a Letter"
        wide
      >
        {mode === 'write' && (
          <div className={styles.content}>
            <p className={styles.prompt}>
              Say what you never got to say.
            </p>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Dear..."
              rows={10}
              aria-label="Letter content"
            />
            <div className={styles.actions}>
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={!content.trim()}
              >
                Keep this letter
              </button>
              <button
                className={styles.burnBtn}
                onClick={handleBurnInit}
                disabled={!content.trim()}
              >
                Burn it
              </button>
            </div>
          </div>
        )}

        {mode === 'confirm-burn' && (
          <div className={styles.confirmBurn}>
            <p>Once burned, the words are gone.</p>
            <p className={styles.confirmSub}>Are you ready to let them go?</p>
            <div className={styles.confirmActions}>
              <button className={styles.burnConfirm} onClick={handleConfirmBurn}>
                Yes. Burn it.
              </button>
              <button className={styles.cancelBurn} onClick={() => setMode('write')}>
                Not yet
              </button>
            </div>
          </div>
        )}
      </Modal>

      {mode === 'burning' && (
        <LetterBurn content={content} onComplete={handleBurnComplete} />
      )}
    </>
  )
}
