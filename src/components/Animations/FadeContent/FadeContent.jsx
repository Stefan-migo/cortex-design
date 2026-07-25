import { useRef, useEffect, useState } from 'react'
import './FadeContent.css'

/* ponytail: IntersectionObserver is cross-browser correct.
   CSS `animation-timeline: view()` is native but Chrome-only as of 2026.
   Ceiling: one-shot — disconnect after first intersection.
   Upgrade: add `repeat` prop that toggles observer.disconnect(). */
export function FadeContent({
  children,
  duration = 0.5,
  delay = 0,
  threshold = 0,
  translateY = 20,
  className = '',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`fade-content${visible ? ' fade-content--visible' : ''}${className ? ' ' + className : ''}`}
      style={{
        transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
        transitionDelay: `${delay}ms`,
        '--fade-y': `${translateY}px`,
      }}
    >
      {children}
    </div>
  )
}
