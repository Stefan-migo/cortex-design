import { useRef, useEffect, useMemo } from 'react'
import './ScrollFloat.css'

export function ScrollFloat({
  children = '',
  splitBy = 'words',
  staggerMs = 30,
  duration = 1,
  ease = 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  threshold = 0.1,
  className = '',
}) {
  const containerRef = useRef(null)

  const items = useMemo(() => {
    if (splitBy === 'chars') {
      return children.split('').map((ch) => (ch === ' ' ? '\u00A0' : ch))
    }
    /* ponytail: split preserving spaces — empty tokens filtered.
       Ceiling: no custom delimiter support.
       Upgrade: accept delimiter regex as prop. */
    return children.split(/(\s+)/).filter(Boolean)
  }, [children, splitBy])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.classList.add('sf-visible')
          /* ponytail: one-shot disconnect — no re-trigger.
             Ceiling: words don't re-animate on scroll re-entry.
             Upgrade: toggle class based on isIntersecting. */
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={containerRef}
      className={`scroll-float split-${splitBy}${className ? ' ' + className : ''}`}
      style={{
        '--stagger': `${staggerMs}ms`,
        '--duration': `${duration}s`,
        '--ease': ease,
      }}
    >
      {items.map((item, i) => (
        <span key={i} className="sf-item" style={{ '--i': i }}>
          {item}
        </span>
      ))}
    </div>
  )
}
