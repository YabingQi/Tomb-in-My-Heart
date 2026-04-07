import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTombStore } from '../../store/tombStore.js'
import Modal from '../ui/Modal.jsx'
import styles from './CreateTombModal.module.css'

const UNIVERSES = [
  { value: 'video-game',     label: 'Video Game' },
  { value: 'visual-novel',   label: 'Visual Novel' },
  { value: 'anime',          label: 'Anime' },
  { value: 'manga',          label: 'Manga' },
  { value: 'manhua-webtoon', label: 'Manhua / Webtoon' },
  { value: 'novel',          label: 'Novel' },
  { value: 'film-series',    label: 'Film / Series' },
  { value: 'vtuber',         label: 'VTuber / Virtual Artist' },
  { value: 'other',          label: 'Other' },
]

export default function CreateTombModal({ isOpen, onClose }) {
  const createTomb = useTombStore(s => s.createTomb)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', fandom: '', universe: 'other', epitaph: '', deathNote: '',
  })
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('A name is required.'); return }
    if (!form.fandom.trim()) { setError('Please enter the work they come from.'); return }
    setError('')
    const id = createTomb(form)
    onClose()
    setForm({ name: '', fandom: '', universe: 'other', epitaph: '', deathNote: '' })
    navigate(`/tomb/${id}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Build a New Tomb">
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.intro}>
          Who do you wish to remember?
        </p>

        <label className={styles.label}>
          <span>Their name</span>
          <input
            className={styles.input}
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="e.g. Zack Fair"
            maxLength={80}
            autoFocus
          />
        </label>

        <label className={styles.label}>
          <span>From the world of</span>
          <input
            className={styles.input}
            type="text"
            value={form.fandom}
            onChange={set('fandom')}
            placeholder="e.g. Final Fantasy VII"
            maxLength={80}
          />
        </label>

        <label className={styles.label}>
          <span>Universe</span>
          <select
            className={styles.input}
            value={form.universe}
            onChange={set('universe')}
          >
            {UNIVERSES.map(u => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          <span>Epitaph <span className={styles.optional}>(optional)</span></span>
          <input
            className={styles.input}
            type="text"
            value={form.epitaph}
            onChange={set('epitaph')}
            placeholder="A line to be carved in stone"
            maxLength={120}
          />
        </label>

        <label className={styles.label}>
          <span>In their memory <span className={styles.optional}>(optional)</span></span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={form.deathNote}
            onChange={set('deathNote')}
            placeholder="Write something about them — who they were, how they left, what they meant to you..."
            rows={3}
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submit}>
          Build the Tomb
        </button>
      </form>
    </Modal>
  )
}
