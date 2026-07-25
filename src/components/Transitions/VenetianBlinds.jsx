import { useState, useCallback } from 'react'
import './VenetianBlinds.css'

/**
 * Venetian Blinds transition with N horizontal strips.
 * Phase 1: strips grow from top (scaleY 0→1) with stagger, covering the screen.
 * Phase 2: content switches, then strips shrink from bottom (scaleY 1→0).
 */
export function VenetianBlinds({
  pages = [],
  duration = 650,
  easing = 'cubic-bezier(0.32,0.72,0,1)',
  strips = 12,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('idle') // idle | covering | revealing

  const currentPage = pages[index]
  const nextPage = pages[(index + 1) % pages.length]

  const halfDuration = duration / 2
  const staggerMs = halfDuration / (strips * 2)     // ms between each strip
  const staggerS = staggerMs / 1000                   // seconds for CSS

  const trigger = useCallback(() => {
    if (phase !== 'idle') return

    setPhase('covering')

    // After all strips cover, switch content
    const coverTime = halfDuration + (strips - 1) * staggerMs
    setTimeout(() => {
      setIndex((i) => (i + 1) % pages.length)
      setPhase('revealing')
    }, coverTime)

    // After reveal phase completes
    const totalTime = coverTime + halfDuration + (strips - 1) * staggerMs
    setTimeout(() => {
      setPhase('idle')
    }, totalTime)
  }, [phase, halfDuration, staggerMs, strips, pages.length])

  const isAnimating = phase !== 'idle'

  return (
    <div className={`vblinds ${className}`}>
      {/* Current page — dimmed during covering, fully visible during revealing */}
      <div className={`vblinds__page ${phase === 'covering' ? 'vblinds__page--dim' : ''}`}>
        {currentPage}
      </div>

      {/* Next page — appearing underneath */}
      {isAnimating && (
        <div className="vblinds__page vblinds__page--next">
          {nextPage}
        </div>
      )}

      {/* Strip overlay */}
      {isAnimating && (
        <div className="vblinds__overlay">
          {Array.from({ length: strips }).map((_, i) => (
            <div
              key={i}
              className={`vblinds__strip ${isAnimating ? `vblinds__strip--${phase}` : ''}`}
              style={{
                '--i': i,
                '--total': strips,
                '--dur-half': `${halfDuration}ms`,
                '--delay': `${staggerS}s`,
                '--ease': easing,
                height: `${100 / strips}%`,
              }}
            />
          ))}
        </div>
      )}

      <button className="ptrans__trigger" onClick={trigger}>
        Trigger
      </button>
    </div>
  )
}
