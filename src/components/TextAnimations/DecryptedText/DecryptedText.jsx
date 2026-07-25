import { useState, useRef, useEffect, useCallback } from 'react'
import './DecryptedText.css'

/* ponytail: ~70 lines for a text scramble-decrypt animation.
   Ceiling: no canvas render — uses DOM textContent via React state, fine for
   typical text lengths (<200 chars). No Easing, no per-character speed.
   Upgrade: for very long text, batch reveals using canvas or offscreen render.
   Use rAF with time-based progress for variable-speed reveals. */
export function DecryptedText({
  text = '',
  trigger = 'auto',
  speed = 50,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()',
  sequential = true,
  loop = false,
  className = '',
}) {
  const [revealed, setRevealed] = useState(() => new Array(text.length).fill(false))
  const [restartKey, setRestartKey] = useState(0)
  const containerRef = useRef(null)
  const charsRef = useRef(chars)
  const speedRef = useRef(speed)

  useEffect(() => { charsRef.current = chars }, [chars])
  useEffect(() => { speedRef.current = speed }, [speed])

  const randomChar = useCallback(
    () => chars[Math.floor(Math.random() * chars.length)],
    [chars]
  )

  /* ponytail: interval-based reveal — one rung above brute setState.
     Ceiling: restartKey depends on text.length only; changing text or speed
     mid-animation doesn't restart. That's acceptable — props don't change
     during animation in practice.
     Upgrade: make effect deps exhaustive and cancel/restart on any prop change. */
  useEffect(() => {
    if (!text.length) return
    setRevealed(new Array(text.length).fill(false))
    const len = text.length
    let idx = 0
    let cancelled = false

    if (sequential) {
      const id = setInterval(() => {
        if (cancelled) return
        setRevealed((prev) => {
          const next = [...prev]
          next[idx] = true
          return next
        })
        idx++
        if (idx >= len) {
          clearInterval(id)
          if (loop) {
            setTimeout(() => {
              if (!cancelled) setRestartKey((k) => k + 1)
            }, 2000)
          }
        }
      }, speedRef.current)
      return () => { cancelled = true; clearInterval(id) }
    }

    /* ponytail: non-sequential = brief scramble then all-at-once reveal.
       Ceiling: fixed 500ms scramble, no easing.
       Upgrade: use rAF with configurable scramble duration. */
    const id = setTimeout(() => {
      if (cancelled) return
      setRevealed(new Array(len).fill(true))
      if (loop) {
        setTimeout(() => {
          if (!cancelled) setRestartKey((k) => k + 1)
        }, 2000)
      }
    }, 500)
    return () => { cancelled = true; clearTimeout(id) }
  }, [restartKey]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ponytail: IntersectionObserver for scroll trigger — one-shot.
     Ceiling: no re-trigger on scroll re-entry unless loop is on (restartKey).
     Upgrade: disconnect only when loop=false; for loop, keep observer alive. */
  useEffect(() => {
    if (trigger !== 'scroll' || !containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRestartKey((k) => k + 1) },
      { threshold: 0.3 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [trigger])

  /* ponytail: auto-trigger on mount with no delay.
     Ceiling: immediate start — no configurable delay.
     Upgrade: add autoDelay prop (ms) before first reveal. */
  useEffect(() => {
    if (trigger === 'auto') setRestartKey((k) => k + 1)
  }, [trigger])

  return (
    <span
      ref={containerRef}
      className={`decrypted-text${className ? ' ' + className : ''}`}
      onMouseEnter={trigger === 'hover' ? () => setRestartKey((k) => k + 1) : undefined}
      style={{ cursor: trigger === 'hover' ? 'pointer' : undefined }}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="dt-char">
          {revealed[i] ? char : randomChar()}
        </span>
      ))}
    </span>
  )
}
