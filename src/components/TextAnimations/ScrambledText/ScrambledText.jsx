import { useRef, useCallback, useEffect, useMemo } from 'react'
import './ScrambledText.css'

export function ScrambledText({
  text = '',
  radius = 120,
  duration = 1.2,
  chars = '⁐.·',
  className = '',
}) {
  const containerRef = useRef(null)
  const charRef = useRef([])
  const timers = useRef({})
  const durationRef = useRef(duration)
  const charsRef = useRef(chars)

  useEffect(() => { durationRef.current = duration }, [duration])
  useEffect(() => { charsRef.current = chars }, [chars])

  const origChars = useMemo(() => text.split(''), [text])

  useEffect(() => {
    charRef.current = charRef.current.slice(0, origChars.length)
    Object.values(timers.current).forEach(clearInterval)
    timers.current = {}
  }, [origChars.length])

  /* ponytail: direct DOM mutation for scramble animation — avoids re-render
     storm on every mouse move. Ceiling: breaks React's virtual DOM for
     affected text nodes. Upgrade: use state batching or canvas render. */
  const startScramble = useCallback((idx) => {
    const el = charRef.current[idx]
    if (!el || timers.current[idx]) return
    const dur = durationRef.current * 1000
    const endTime = Date.now() + dur

    timers.current[idx] = setInterval(() => {
      const chs = charsRef.current
      el.textContent = chs[Math.floor(Math.random() * chs.length)]
      if (Date.now() >= endTime) {
        clearInterval(timers.current[idx])
        delete timers.current[idx]
        el.textContent = origChars[idx]
      }
    }, 50)
  }, [origChars])

  const stopScramble = useCallback((idx) => {
    if (timers.current[idx]) {
      clearInterval(timers.current[idx])
      delete timers.current[idx]
    }
    const el = charRef.current[idx]
    if (el) el.textContent = origChars[idx]
  }, [origChars])

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current
    if (!container) return
    const r = radius

    for (let i = 0; i < origChars.length; i++) {
      const el = charRef.current[i]
      if (!el) continue

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)

      if (dist < r) startScramble(i)
      else stopScramble(i)
    }
  }, [radius, origChars.length, startScramble, stopScramble])

  const handleMouseLeave = useCallback(() => {
    for (let i = 0; i < origChars.length; i++) {
      stopScramble(i)
    }
  }, [origChars.length, stopScramble])

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearInterval)
      timers.current = {}
    }
  }, [])

  return (
    <span
      ref={containerRef}
      className={`scrambled-text${className ? ' ' + className : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {origChars.map((ch, i) => (
        <span
          key={i}
          ref={el => { charRef.current[i] = el }}
          className="scrambled-char"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}
