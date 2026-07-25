import { useRef, useEffect, useMemo } from 'react'
import './BlurText.css'

export function BlurText({
  text = '',
  delay = 50,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  className = '',
}) {
  const containerRef = useRef(null)

  /* ponytail: split by whitespace preserves spacing. Ceiling: no custom
     delimiter support. Upgrade: accept delimiter regex as prop. */
  const items = useMemo(() => {
    if (animateBy === 'chars') {
      return text.split('').map((char, i) => ({
        content: char === ' ' ? '\u00A0' : char,
        index: i,
      }))
    }
    return text.split(/(\s+)/).filter(Boolean).map((part, i) => ({
      content: part,
      index: i,
    }))
  }, [text, animateBy])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.classList.add('blur-visible')
          /* ponytail: one-shot observer — disconnect after first trigger.
             Ceiling: no re-trigger on scroll re-entry. Upgrade: remove
             disconnect, use class toggle with threshold based on direction. */
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
      className={`blur-text${className ? ' ' + className : ''}`}
      style={{
        '--stagger': `${delay}ms`,
        /* direction 'top' = translateY from negative (above), 'bottom' = from positive (below) */
        '--dir-factor': direction === 'bottom' ? '1' : '-1',
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className={`blur-item blur-${animateBy === 'chars' ? 'char' : 'word'}`}
          style={{ '--i': i }}
        >
          {item.content}
        </span>
      ))}
    </div>
  )
}
