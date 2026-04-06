import styles from './TombStone.module.css'

function formatYear(iso) {
  return new Date(iso).getFullYear()
}

export default function TombStone({ tomb }) {
  const { character, createdAt } = tomb

  return (
    <div className={styles.wrapper} aria-label={`Tombstone for ${character.name}`}>
      <div className={styles.stone}>
        <div className={styles.arch} />
        <div className={styles.face}>
          {/* Cross or decorative symbol */}
          <div className={styles.symbol} aria-hidden="true">✦</div>

          <h1 className={styles.name}>{character.name}</h1>
          <p className={styles.fandom}>{character.fandom}</p>

          <div className={styles.divider} aria-hidden="true" />

          {character.epitaph ? (
            <p className={styles.epitaph}>"{character.epitaph}"</p>
          ) : (
            <p className={styles.epitaph + ' ' + styles.placeholder}>
              <em>Remembered here</em>
            </p>
          )}

          <p className={styles.date}>
            Remembered since {formatYear(createdAt)}
          </p>
        </div>
      </div>

      {/* Base/plinth */}
      <div className={styles.base} />
      <div className={styles.plinth} />
    </div>
  )
}
