import { useRef, useMemo, useState, useEffect } from 'react'
import './Shuffle.css'

export function Shuffle({
  text = '',
  duration = 0.35,
  staggerMs = 30,
  direction = 'right',
  threshold = 0.1,
  className = '',
}) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [animate, setAnimate] = useState(false)

  const chars = useMemo(() => text.split(''), [text])

  /* ponytail: one-shot observer — disconnect after first trigger.
     Ceiling: no re-trigger on scroll re-entry.
     Upgrade: remove disconnect, use class toggle. */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [threshold])

  /* ponytail: double-RAF ensures browser renders initial random positions
     before adding the transition class.
     Ceiling: one frame delay before animation starts.
     Upgrade: use Animation API for precise control. */
  useEffect(() => {
    if (visible) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
        })
      })
      return () => cancelAnimationFrame(id)
    }
  }, [visible])

  /* ponytail: random positions computed once per visible trigger.
     Ceiling: pseudo-random per session, not seeded.
     Upgrade: accept seed prop for deterministic positions. */
  const initPositions = useMemo(() => {
    if (!visible) return []
    return chars.map(() => {
      switch (direction) {
        case 'left':
          return { x: Math.random() * 200 + 100, y: (Math.random() - 0.5) * 60 }
        case 'up':
          return { x: (Math.random() - 0.5) * 60, y: Math.random() * 200 + 100 }
        case 'down':
          return { x: (Math.random() - 0.5) * 60, y: -(Math.random() * 200 + 100) }
        case 'right':
        default:
          return { x: -(Math.random() * 200 + 100), y: (Math.random() - 0.5) * 60 }
      }
    })
  }, [visible, direction, chars])

  return (
    <span
      ref={containerRef}
      className={`shuffle-text${className ? ' ' + className : ''}`}
      style={{ '--stagger': `${staggerMs}ms`, '--duration': `${duration}s` }}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          className={`shuffle-char${animate ? ' animate' : ''}`}
          style={{
            '--x': `${initPositions[i]?.x ?? 0}px`,
            '--y': `${initPositions[i]?.y ?? 0}px`,
            '--i': i,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}
