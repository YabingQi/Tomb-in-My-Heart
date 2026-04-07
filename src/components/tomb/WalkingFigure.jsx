import { useRef, useEffect } from 'react'
import styles from './WalkingFigure.module.css'

const BOUNDS = 110
const SPEED  = 3

export default function WalkingFigure() {
  const wrapperRef = useRef(null)
  const stateRef   = useRef({ x: 0, dir: 1 })

  useEffect(() => {
    const keys = new Set()
    let raf

    const onKeyDown = e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        keys.add(e.key)
      }
    }
    const onKeyUp = e => keys.delete(e.key)

    const tick = () => {
      const el = wrapperRef.current
      if (el) {
        const goLeft  = keys.has('ArrowLeft')
        const goRight = keys.has('ArrowRight')

        if (goLeft || goRight) {
          const dir = goRight ? 1 : -1
          stateRef.current.x = Math.max(-BOUNDS, Math.min(BOUNDS, stateRef.current.x + dir * SPEED))
          stateRef.current.dir = dir
          el.style.transform = `translateX(${stateRef.current.x}px) scaleX(${dir})`
          if (!el.classList.contains(styles.walking)) {
            el.classList.add(styles.walking)
          }
        } else if (el.classList.contains(styles.walking)) {
          el.classList.remove(styles.walking)
        }
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup',   onKeyUp)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup',   onKeyUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrapperRef} className={styles.wrapper} aria-hidden="true">
      <svg
        className={styles.svg}
        width="28"
        height="50"
        viewBox="0 0 28 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="14" cy="8" r="5.5" />
        <line x1="14" y1="13.5" x2="14" y2="31" />
        <line x1="14" y1="19" x2="5"  y2="26" className={styles.armL} />
        <line x1="14" y1="19" x2="23" y2="26" className={styles.armR} />
        <line x1="14" y1="31" x2="5"  y2="46" className={styles.legL} />
        <line x1="14" y1="31" x2="23" y2="46" className={styles.legR} />
      </svg>
      <p className={styles.hint}>{'← →'}</p>
    </div>
  )
}
