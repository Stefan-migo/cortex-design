import { useState, useCallback } from 'react'
import './curtains.css'

/**
 * Generic curtain overlay shell.
 * Add 'active' class to cover, remove to reveal.
 * Calls onSwitch at midpoint when fully covered.
 */
function useCurtain(coverDuration = 600) {
  const [active, setActive] = useState(false)

  const trigger = useCallback((onSwitch) => {
    if (active) return
    setActive(true)
    setTimeout(() => {
      onSwitch?.()
      setTimeout(() => setActive(false), 100)
    }, coverDuration)
  }, [active, coverDuration])

  return { active, trigger }
}

/* ═══════════════════════════════════════
   1. Doors — dual panels closing from edges
   ═══════════════════════════════════════ */
export function DoorsOverlay({ pages = [], duration = 500, className = '' }) {
  const [index, setIndex] = useState(0)
  const { active, trigger } = useCurtain(duration)

  const run = useCallback(() => {
    trigger(() => setIndex((i) => (i + 1) % pages.length))
  }, [trigger, pages.length])

  return (
    <div className={`ctrans ${className}`}>
      <div className="ctrans__page">{pages[index]}</div>
      <div className={`ctrans-doors ${active ? 'active' : ''}`}>
        <div className="ctrans-doors__panel ctrans-doors__left" />
        <div className="ctrans-doors__panel ctrans-doors__right" />
      </div>
      <button className="ctrans__btn" onClick={run}>Trigger</button>
    </div>
  )
}

/* ═══════════════════════════════════════
   2. Stagger Wipe — columns falling with stagger
   ═══════════════════════════════════════ */
export function StaggerColumns({ pages = [], duration = 500, columns = 5, className = '' }) {
  const [index, setIndex] = useState(0)
  const { active, trigger } = useCurtain(duration)

  const run = useCallback(() => {
    trigger(() => setIndex((i) => (i + 1) % pages.length))
  }, [trigger, pages.length])

  return (
    <div className={`ctrans ${className}`}>
      <div className="ctrans__page">{pages[index]}</div>
      <div className={`ctrans-stagger ${active ? 'active' : ''}`}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="ctrans-stagger__col" style={{ '--i': i }} />
        ))}
      </div>
      <button className="ctrans__btn" onClick={run}>Trigger</button>
    </div>
  )
}

/* ═══════════════════════════════════════
   3. Clip Ellipse Wipe — curved arc reveal
   ═══════════════════════════════════════ */
export function ClipEllipseWipe({ pages = [], duration = 600, className = '' }) {
  const [index, setIndex] = useState(0)
  const { active, trigger } = useCurtain(duration)

  const run = useCallback(() => {
    trigger(() => setIndex((i) => (i + 1) % pages.length))
  }, [trigger, pages.length])

  return (
    <div className={`ctrans ${className}`}>
      <div className="ctrans__page">{pages[index]}</div>
      <div className={`ctrans-clip ${active ? 'active' : ''}`}
        style={{ '--dur': `${duration}ms` }} />
      <button className="ctrans__btn" onClick={run}>Trigger</button>
    </div>
  )
}

/* ═══════════════════════════════════════
   4. Pixel Grid — 10×10 grid scale reveal
   ═══════════════════════════════════════ */
export function PixelGridOverlay({ pages = [], duration = 600, size = 10, className = '' }) {
  const [index, setIndex] = useState(0)
  const { active, trigger } = useCurtain(duration)

  const run = useCallback(() => {
    trigger(() => setIndex((i) => (i + 1) % pages.length))
  }, [trigger, pages.length])

  const total = size * size

  return (
    <div className={`ctrans ${className}`}>
      <div className="ctrans__page">{pages[index]}</div>
      <div className={`ctrans-pixels ${active ? 'active' : ''}`}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="ctrans-pixels__cell" style={{ '--i': i }} />
        ))}
      </div>
      <button className="ctrans__btn" onClick={run}>Trigger</button>
    </div>
  )
}

/* ═══════════════════════════════════════
   5. Shutter Slats — horizontal slats growing from top
   ═══════════════════════════════════════ */
export function ShutterSlats({ pages = [], duration = 500, slats = 5, className = '' }) {
  const [index, setIndex] = useState(0)
  const { active, trigger } = useCurtain(duration)

  const run = useCallback(() => {
    trigger(() => setIndex((i) => (i + 1) % pages.length))
  }, [trigger, pages.length])

  return (
    <div className={`ctrans ${className}`}>
      <div className="ctrans__page">{pages[index]}</div>
      <div className={`ctrans-shutter ${active ? 'active' : ''}`}>
        {Array.from({ length: slats }).map((_, i) => (
          <div key={i} className="ctrans-shutter__slat" style={{ '--i': i }} />
        ))}
      </div>
      <button className="ctrans__btn" onClick={run}>Trigger</button>
    </div>
  )
}
