import { useMemo } from 'react'
import TombStone from './TombStone.jsx'
import CandleFlicker from '../ui/CandleFlicker.jsx'
import WalkingFigure from './WalkingFigure.jsx'
import { FLOWERS } from '../../data/flowers.js'
import { WINES } from '../../data/wines.js'
import styles from './TombScene.module.css'

// Show the most recent N offerings visually
const MAX_FLOWERS_SHOWN = 7
const MAX_WINES_SHOWN = 3

export default function TombScene({ tomb }) {
  const recentFlowers = useMemo(() =>
    [...tomb.offerings.flowers].reverse().slice(0, MAX_FLOWERS_SHOWN),
    [tomb.offerings.flowers]
  )

  const recentWines = useMemo(() =>
    [...tomb.offerings.wines].reverse().slice(0, MAX_WINES_SHOWN),
    [tomb.offerings.wines]
  )

  return (
    <div className={styles.scene}>
      {/* Ground */}
      <div className={styles.ground} />

      {/* The visitor — paces back and forth */}
      <WalkingFigure />

      {/* Candles flanking the stone */}
      <div className={`${styles.candle} ${styles.candleLeft}`}>
        <CandleFlicker size="md" />
      </div>
      <div className={`${styles.candle} ${styles.candleRight}`}>
        <CandleFlicker size="md" />
      </div>

      {/* The tombstone */}
      <div className={styles.stoneWrapper}>
        <TombStone tomb={tomb} />
      </div>

      {/* Flower offerings around the base */}
      {recentFlowers.length > 0 && (
        <div className={styles.flowers} aria-label="Flowers left here">
          {recentFlowers.map((f, i) => {
            const flower = FLOWERS.find(fl => fl.id === f.flowerId)
            return (
              <span
                key={f.id}
                className={styles.flower}
                style={{ '--i': i, '--total': recentFlowers.length }}
                title={flower ? `${flower.name} — ${flower.meaning}` : ''}
                aria-label={flower?.name}
              >
                {flower?.emoji ?? '🌸'}
              </span>
            )
          })}
        </div>
      )}

      {/* Wine offerings beside the base */}
      {recentWines.length > 0 && (
        <div className={styles.wines} aria-label="Offerings poured here">
          {recentWines.map((w, i) => {
            const wine = WINES.find(wn => wn.id === w.wineId)
            return (
              <span
                key={w.id}
                className={styles.wineBottle}
                title={wine ? `${wine.name} — ${wine.description}` : ''}
                style={{ '--wi': i }}
                aria-label={wine?.name}
              >
                🍶
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
