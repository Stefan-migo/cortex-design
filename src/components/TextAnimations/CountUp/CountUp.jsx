import { useState, useEffect, useRef, useCallback } from 'react'
import './CountUp.css'

export function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  separator = '',
  startWhen = true,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(from)
  const [started, setStarted] = useState(!startWhen)
  const rafRef = useRef(null)
  const containerRef = useRef(null)

  /* ponytail: easeOutCubic — one-liner, no easing library.
     Ceiling: only cubic easing, no bezier or spring curves.
     Upgrade: accept easing function as prop. */
  const easeOutCubic = useCallback((t) => 1 - Math.pow(1 - t, 3), [])

  /* ponytail: IntersectionObserver for scroll-triggered start.
     Ceiling: single threshold 0.3, no rootMargin config.
     Upgrade: expose observer options as props. */
  useEffect(() => {
    if (!startWhen) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [startWhen])

  useEffect(() => {
    if (!started) return

    const delayMs = delay * 1000
    const durationMs = duration * 1000
    const range = to - from
    let startTime

    /* ponytail: requestAnimationFrame loop — native, no dependencies.
       Ceiling: no pause/resume on tab visibility change.
       Upgrade: add visibilitychange handler to pause RAF. */
    const timeout = setTimeout(() => {
      startTime = performance.now()

      const animate = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        setDisplayValue(from + range * easeOutCubic(progress))

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }, delayMs)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started, from, to, duration, delay, easeOutCubic])

  /* ponytail: regex replace for custom separator — zero deps, works for any char.
     Ceiling: always groups of 3 digits from right, no locale-aware grouping.
     Upgrade: accept locale prop + use Intl.NumberFormat with custom separator. */
  const formatted = Math.round(displayValue).toString()
  const display = separator
    ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : formatted

  return (
    <span
      ref={containerRef}
      className={`count-up${className ? ' ' + className : ''}`}
    >
      {display}
    </span>
  )
}
