import { useRef, useEffect } from 'react'
import styles from './WalkingFigure.module.css'

const BOUNDS = 110   // px from center, each direction
const SPEED  = 3     // px per frame (~180px/s at 60fps)

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
        const left  = keys.has('ArrowLeft')
        const right = keys.has('ArrowRight')

        if (left || right) {
          const dir = right ? 1 : -1
          stateRef.current.x   = Math.max(-BOUNDS, Math.min(BOUNDS, stateRef.current.x + dir * SPEED))
          stateRef.current.dir = dir
          el.style.transform = `translateX(${stateRef.current.x}px) scaleX(${dir})`
          el.dataset.walking = 'true'
        } else {
          el.dataset.walking = 'false'
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
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-walking="false"
      aria-hidden="true"
    >
      <div className={styles.body}>
        <svg
          className={styles.svg}
          width="18"
          height="32"
          viewBox="0 0 18 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {/* Head */}
          <circle cx="9" cy="5" r="3.5" />
          {/* Body */}
          <line x1="9" y1="8.5" x2="9" y2="20" />
          {/* Arms */}
          <line x1="9" y1="12" x2="3" y2="17" className={styles.armL} />
          <line x1="9" y1="12" x2="15" y2="17" className={styles.armR} />
          {/* Legs */}
          <line x1="9" y1="20" x2="3"  y2="30" className={styles.legL} />
          <line x1="9" y1="20" x2="15" y2="30" className={styles.legR} />
        </svg>
      </div>
      <p className={styles.hint}>← →</p>
    </div>
  )
}
