import { useState, useEffect, useRef, useCallback } from 'react'
import './RotatingText.css'

export function RotatingText({
  texts = [],
  interval = 2000,
  staggerMs = 30,
  splitBy = 'chars',
  className = '',
}) {
  const indexRef = useRef(0)
  const [state, setState] = useState({
    current: texts[0] || '',
    exiting: null,
  })

  /* ponytail: setInterval with ref avoids stale closure on interval.
     Ceiling: no pause-on-hover or tab-visibility handling.
     Upgrade: add visibilitychange + pause/resume. */
  useEffect(() => {
    if (texts.length < 2) return
    const id = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % texts.length
      setState(prev => ({
        current: texts[indexRef.current],
        exiting: prev.current,
      }))
    }, interval)
    return () => clearInterval(id)
  }, [texts, interval])

  const split = useCallback((str) => {
    if (splitBy === 'words') {
      return str.split(/(\s+)/).filter(Boolean)
    }
    return str.split('')
  }, [splitBy])

  const onEnterEnd = () => {
    setState(prev => ({ ...prev, exiting: null }))
  }

  if (texts.length === 0) return null

  return (
    <div
      className={`rotating-text${className ? ' ' + className : ''}`}
      style={{ '--stagger': `${staggerMs}ms` }}
    >
      {state.exiting && (
        <span className="rotating-layer rotating-exit" aria-hidden="true">
          {split(state.exiting).map((ch, i) => (
            <span key={i} className="rotating-unit" style={{ '--i': i }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </span>
      )}
      <span className="rotating-layer rotating-enter" onAnimationEnd={onEnterEnd}>
        {split(state.current).map((ch, i) => (
          <span key={i} className="rotating-unit" style={{ '--i': i }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
    </div>
  )
}
