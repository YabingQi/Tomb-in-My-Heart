import { Link } from 'react-router-dom'
import CandleFlicker from '../ui/CandleFlicker.jsx'
import styles from './TombCard.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function TombCard({ tomb }) {
  const { character, offerings, letters, lastVisitedAt } = tomb
  const burnedCount = letters.filter(l => l.burned).length
  const savedCount = letters.filter(l => !l.burned).length

  return (
    <Link to={`/tomb/${tomb.id}`} className={styles.card} aria-label={`Visit ${character.name}'s tomb`}>
      <div className={styles.candle}>
        <CandleFlicker size="sm" />
      </div>
      <div className={styles.body}>
        <p className={styles.name}>{character.name}</p>
        <p className={styles.fandom}>{character.fandom}</p>
        {character.epitaph && (
          <p className={styles.epitaph}>"{character.epitaph}"</p>
        )}
        <div className={styles.meta}>
          <span>{offerings.flowers.length} flower{offerings.flowers.length !== 1 ? 's' : ''}</span>
          <span>·</span>
          <span>{savedCount} letter{savedCount !== 1 ? 's' : ''}</span>
          {burnedCount > 0 && <><span>·</span><span>{burnedCount} released to flame</span></>}
        </div>
        <p className={styles.visited}>Last visited {formatDate(lastVisitedAt)}</p>
      </div>
    </Link>
  )
}
