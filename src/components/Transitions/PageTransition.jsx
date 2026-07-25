import { useState, useCallback } from 'react'
import './transitions.css'

/**
 * Generic page transition shell.
 * Pass `exitClass`, `enterClass`, `duration` (ms), `easing`, and optional CSS vars.
 * Call `trigger()` to toggle between pages.
 */
export function PageTransition({
  pages = [],
  exitClass,
  enterClass,
  duration = 400,
  easing = 'cubic-bezier(0.25,1,0.5,1)',
  className = '',
  vars = {},
}) {
  const [index, setIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const current = pages[index]
  const next = pages[(index + 1) % pages.length]

  const trigger = useCallback(() => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setIndex((i) => (i + 1) % pages.length)
      setTransitioning(false)
    }, duration)
  }, [transitioning, duration, pages.length])

  const cssVars = {
    '--dur': `${duration}ms`,
    '--ease': easing,
    ...vars,
  }

  return (
    <div className={`ptrans ${className}`}>
      <div className="ptrans__stage">
        {/* Current page — exiting */}
        <div
          className={`ptrans__page ${transitioning ? exitClass : ''}`}
          style={cssVars}
        >
          {current}
        </div>

        {/* Entering page — on top */}
        {transitioning && (
          <div
            className={`ptrans__page ptrans__page--next ${enterClass}`}
            style={cssVars}
          >
            {next}
          </div>
        )}
      </div>

      <button className="ptrans__trigger" onClick={trigger}>
        Trigger
      </button>
    </div>
  )
}

