import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTombStore } from '../store/tombStore.js'
import TombScene from '../components/tomb/TombScene.jsx'
import RitualMenu from '../components/rituals/RitualMenu.jsx'
import FlowerPicker from '../components/rituals/FlowerPicker.jsx'
import WinePicker from '../components/rituals/WinePicker.jsx'
import LetterEditor from '../components/rituals/LetterEditor.jsx'
import LetterArchive from '../components/rituals/LetterArchive.jsx'
import SitWithThem from '../components/rituals/SitWithThem.jsx'
import styles from './TombPage.module.css'

export default function TombPage() {
  const { tombId } = useParams()
  const getTomb = useTombStore(s => s.getTomb)
  const markVisited = useTombStore(s => s.markVisited)
  const deleteTomb = useTombStore(s => s.deleteTomb)
  const navigate = useNavigate()
  const tomb = getTomb(tombId)

  useEffect(() => {
    if (tombId && tomb) {
      markVisited(tombId)
    }
  }, [tombId]) // only on mount

  if (!tomb) {
    return (
      <div className={styles.notFound}>
        <p>This tomb does not exist.</p>
        <Link to="/" className={styles.back}>Return</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Remove the tomb of ${tomb.character.name}? This cannot be undone.`)) {
      deleteTomb(tombId)
      navigate('/')
    }
  }

  return (
    <div className={styles.page}>
      {/* Top navigation */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>← All Tombs</Link>
        <button className={styles.deleteBtn} onClick={handleDelete} aria-label="Remove this tomb">
          Remove tomb
        </button>
      </nav>

      {/* The scene — takes up most of the screen */}
      <main className={styles.main}>
        <TombScene tomb={tomb} />

        {tomb.character.deathNote && (
          <p className={styles.deathNote}>{tomb.character.deathNote}</p>
        )}
      </main>

      {/* Ritual action bar at the bottom */}
      <RitualMenu />

      {/* All ritual modals — only one can be open at a time */}
      <FlowerPicker tombId={tombId} />
      <WinePicker tombId={tombId} />
      <LetterEditor tombId={tombId} />
      <LetterArchive tombId={tombId} />

      {/* Sit with them — full screen overlay */}
      <AnimatePresence>
        <SitWithThem characterName={tomb.character.name} />
      </AnimatePresence>
    </div>
  )
}
