import { useRef, useEffect, useMemo } from 'react'
import './ScrollReveal.css'

/* ponytail: 11-threshold IntersectionObserver gives ~11 discrete updates per
   scroll-through. Ceiling: not 60fps smooth on rapid scroll across elements.
   Upgrade: replace thresholds with scroll listener + getBoundingClientRect for
   continuous progress interpolation. */
const THRESHOLDS = Array.from({ length: 11 }, (_, i) => i / 10)

export function ScrollReveal({
  children = '',
  splitBy = 'words',
  blur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  staggerRatio = 0.15,
  className = '',
}) {
  const containerRef = useRef(null)

  /* ponytail: split-by-whitespace preserves spacing tokens. Ceiling: no custom
     delimiter support. Upgrade: accept delimiter regex as prop. */
  const items = useMemo(() => {
    if (typeof children !== 'string') return []
    if (splitBy === 'chars') {
      return children.split('').map((ch, i) => ({
        content: ch === ' ' ? '\u00A0' : ch,
        index: i,
      }))
    }
    return children.split(/(\s+)/).filter(Boolean).map((part, i) => ({
      content: part,
      index: i,
    }))
  }, [children, splitBy])

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof children !== 'string') return

    const spans = container.querySelectorAll('.sr-item')
    if (!spans.length) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        const count = spans.length
        const maxStagger = (count - 1) * staggerRatio
        const divisor = Math.max(1 - maxStagger, 0.01)

        /* ponytail: direct DOM mutation avoids React re-render per scroll.
           Ceiling: O(n) style set per threshold crossing for n items.
           Upgrade: batch via CSS custom property on parent, derive per-item
           progress in CSS calc() to avoid JS iteration. */
        for (let i = 0; i < count; i++) {
          const raw = (ratio - i * staggerRatio) / divisor
          const progress = raw < 0 ? 0 : raw > 1 ? 1 : raw

          const span = spans[i]
          const opacity = baseOpacity + (1 - baseOpacity) * progress
          const rotation = baseRotation * (1 - progress)

          span.style.opacity = String(opacity)
          span.style.transform = `rotate(${rotation}deg)`
          if (blur) {
            span.style.filter = `blur(${10 * (1 - progress)}px)`
          }
        }
      },
      { threshold: THRESHOLDS }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [children, splitBy, blur, baseOpacity, baseRotation, staggerRatio])

  /* ponytail: passthrough for ReactNode children skips animation entirely.
     Ceiling: no scroll-reveal on non-string children.
     Upgrade: wrap children in animated spans when ReactNode. */
  if (typeof children !== 'string') {
    return (
      <div
        ref={containerRef}
        className={`sr-container${className ? ' ' + className : ''}`}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`sr-container${className ? ' ' + className : ''}`}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="sr-item"
          style={{
            opacity: baseOpacity,
            transform: `rotate(${baseRotation}deg)`,
            filter: blur ? 'blur(10px)' : 'none',
          }}
        >
          {item.content}
        </span>
      ))}
    </div>
  )
}
