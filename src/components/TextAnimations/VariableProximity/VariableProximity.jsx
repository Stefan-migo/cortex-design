import { useRef, useEffect, useMemo } from 'react'
import './VariableProximity.css'

/* ponytail: ~50 lines — direct DOM mutation for char letter-spacing via RAF.
   Ceiling: bypasses React reconciliation for letter-spacing updates (fine for
   animation, no children to re-render). No throttling on mouse events — RAF
   only runs when mouse is inside the container. No touch event support.
   Upgrade: add touchmove handler for mobile proximity; add IntersectionObserver
   to pause RAF when off-screen; batch spacing updates with a single style tag. */
export function VariableProximity({
  text = '',
  radius = 150,
  from = -5,
  to = 5,
  className = '',
}) {
  const containerRef = useRef(null)
  const charRefs = useRef([])
  const rafRef = useRef(null)
  const activeRef = useRef(false)

  /* ponytail: simple char split — spaces become non-breaking.
     Ceiling: no word-wrap or multi-line awareness.
     Upgrade: wrap in container with word-break for responsive layouts. */
  const chars = useMemo(
    () => text.split('').map((ch) => (ch === ' ' ? '\u00A0' : ch)),
    [text]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMouseMove = (e) => {
      activeRef.current = true
      const rect = container.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      /* ponytail: RAF loop — one frame per mouse move inside container.
         Ceiling: no dead zone (always updates on every mouse pixel).
         Upgrade: add dead zone threshold to skip frames when mouse barely moves. */
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        if (!activeRef.current) return

        const r = radius
        const range = to - from

        for (let i = 0; i < chars.length; i++) {
          const el = charRefs.current[i]
          if (!el) continue
          const crect = el.getBoundingClientRect()
          const cx = crect.left + crect.width / 2 - rect.left
          const cy = crect.top + crect.height / 2 - rect.top
          const dist = Math.hypot(mx - cx, my - cy)

          /* ponytail: linear interpolation within radius — clamp at edges.
             Ceiling: linear mapping, no easing curve.
             Upgrade: add easing function (power, exponential) for organic feel. */
          let spacing
          if (dist >= r) {
            spacing = to
          } else {
            const t = dist / r // 0..1 from center to edge
            spacing = from + t * range
          }
          el.style.letterSpacing = `${spacing}px`
        }
      })
    }

    const onMouseLeave = () => {
      activeRef.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      /* ponytail: reset all chars to default spacing on mouse leave.
         Ceiling: uses '' to reset (falls back to CSS default).
         Upgrade: store initial spacing values for proper restoration. */
      for (const el of charRefs.current) {
        if (el) el.style.letterSpacing = ''
      }
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)
    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [radius, from, to, chars.length])

  return (
    <span
      ref={containerRef}
      className={`variable-proximity${className ? ' ' + className : ''}`}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          ref={(el) => { charRefs.current[i] = el }}
          className="vp-char"
        >
          {ch}
        </span>
      ))}
    </span>
  )
}
