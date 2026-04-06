import { useTombStore } from '../../store/tombStore.js'
import styles from './RitualMenu.module.css'

const RITUALS = [
  { id: 'flowers', label: 'Leave Flowers',    icon: '🌸' },
  { id: 'wine',    label: 'Pour a Drink',     icon: '🍶' },
  { id: 'letter',  label: 'Write a Letter',   icon: '✉' },
  { id: 'archive', label: 'Read Letters',     icon: '📜' },
  { id: 'sit',     label: 'Sit a While',      icon: '🕯' },
]

export default function RitualMenu() {
  const setActiveRitual = useTombStore(s => s.setActiveRitual)

  return (
    <nav className={styles.menu} aria-label="Rituals">
      {RITUALS.map(r => (
        <button
          key={r.id}
          className={styles.ritual}
          onClick={() => setActiveRitual(r.id)}
          aria-label={r.label}
        >
          <span className={styles.icon} aria-hidden="true">{r.icon}</span>
          <span className={styles.label}>{r.label}</span>
        </button>
      ))}
    </nav>
  )
}
