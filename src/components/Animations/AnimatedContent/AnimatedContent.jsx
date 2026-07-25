import { useRef, useEffect, useState } from 'react'
import './AnimatedContent.css'

/* ponytail: CSS transition-delay stagger instead of separate @keyframes per char.
   Ceiling: all chars animate same duration + easing, just delayed sequentially.
   Upgrade: use animation-delay with individual @keyframes for distinct
   in/out timing (e.g. overshoot on first char, fade on last). */
export function AnimatedContent({
  children,
  splitBy = 'chars',
  staggerMs = 50,
  duration = 1,
  threshold = 0,
  className = '',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const text = String(children)

  const items = splitBy === 'words' ? text.split(' ') : [...text]

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
      className={`animated-content${visible ? ' animated-content--visible' : ''}${className ? ' ' + className : ''}`}
      style={{
        '--stagger-ms': staggerMs,
        '--duration': `${duration}s`,
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="animated-content__item"
          style={{ '--i': i }}
        >
          {item}
          {splitBy === 'words' && i < items.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </div>
  )
}
