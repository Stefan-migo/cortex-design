import { useRef, useEffect, useState } from 'react'
import './GradualBlur.css'

/* ponytail: IntersectionObserver + CSS filter blur — minimal, no scroll library.
   Ceiling: 11 discrete thresholds; blur updates every ~100ms, not per-pixel smooth.
   Upgrade: use ScrollTimeline or requestAnimationFrame + getBoundingClientRect for sub-frame accuracy. */
export function GradualBlur({
  children,
  blurAmount = 8,
  threshold = 0.2,
  className = '',
}) {
  const ref = useRef(null)
  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setRatio(e.intersectionRatio),
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const visible = Math.max(0, (ratio - threshold) / (1 - threshold))
  const blur = blurAmount * (1 - visible)

  return (
    <div
      ref={ref}
      className={`gradual-blur${className ? ' ' + className : ''}`}
      style={{ filter: `blur(${blur}px)`, transition: 'filter 0.1s ease-out' }}
    >
      {children}
    </div>
  )
}
