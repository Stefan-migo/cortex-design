import { useRef, useEffect, useMemo, useState } from 'react'
import './SplitText.css'

export function SplitText({
  text = '',
  splitBy = 'chars',
  staggerMs = 50,
  duration = 1.25,
  threshold = 0.1,
  className = '',
  tag = 'p',
}) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  /* ponytail: split by whitespace preserves spacing.
     Ceiling: no custom delimiter support.
     Upgrade: accept delimiter regex as prop. */
  const items = useMemo(() => {
    if (splitBy === 'words') {
      return text.split(/(\s+)/).filter(Boolean)
    }
    return text.split('').map(ch => (ch === ' ' ? '\u00A0' : ch))
  }, [text, splitBy])

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

  const Tag = tag

  return (
    <Tag
      ref={containerRef}
      className={`split-text split-${splitBy}${className ? ' ' + className : ''}${visible ? ' split-visible' : ''}`}
      style={{ '--stagger': `${staggerMs}ms`, '--duration': `${duration}s` }}
    >
      {items.map((item, i) => (
        <span key={i} className="split-unit" style={{ '--i': i }}>
          {item}
        </span>
      ))}
    </Tag>
  )
}
