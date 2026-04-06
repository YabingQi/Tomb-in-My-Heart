import { useState } from 'react'
import { useTombStore } from '../store/tombStore.js'
import TombCard from '../components/create/TombCard.jsx'
import CreateTombModal from '../components/create/CreateTombModal.jsx'
import styles from './LandingPage.module.css'

const TAGLINES = [
  'In memory of those who live only in story.',
  'Some doors, once closed, cannot be opened again.',
  'They existed. They mattered. They are not forgotten.',
]

export default function LandingPage() {
  const tombs = useTombStore(s => s.tombs)
  const [showCreate, setShowCreate] = useState(false)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tomb in My Heart</h1>
        <p className={styles.tagline}>{TAGLINES[0]}</p>
      </header>

      {tombs.length === 0 ? (
        <section className={styles.empty}>
          <p className={styles.emptyText}>
            There is no one here yet.
          </p>
          <p className={styles.emptySubtext}>
            Build a tomb for someone you carry with you.
          </p>
          <button
            className={styles.createBtn}
            onClick={() => setShowCreate(true)}
          >
            Build a Tomb
          </button>
        </section>
      ) : (
        <section className={styles.tombs}>
          <div className={styles.tombList}>
            {tombs.map(tomb => (
              <TombCard key={tomb.id} tomb={tomb} />
            ))}
          </div>
          <button
            className={styles.addMore}
            onClick={() => setShowCreate(true)}
          >
            + Build another tomb
          </button>
        </section>
      )}

      <footer className={styles.footer}>
        <p>Your data stays on your device. Nothing is sent anywhere.</p>
        <a
          href="https://github.com/yabingqi/tomb-in-my-heart"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Open source on GitHub
        </a>
      </footer>

      <CreateTombModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </main>
  )
}
