import { useRef, useEffect } from 'react'
import './ElectricBorder.css'

/* ponytail: sin-based noise is cheap but periodic.
   Ceiling: deterministic pattern, repeats every ~2π in t space.
   Upgrade: replace with a seeded PRNG for non-repeating organic noise. */
function noise(x, y, t) {
  return Math.sin(x * 12.9898 + y * 78.233 + t * 45.164) * 0.5 + 0.5
}

/* ponytail: canvas bezier paths with noise displacement per frame.
   Ceiling: 60-point perimeter walk — fine for most sizes, visible jaggies beyond 1200px.
   Upgrade: dynamic segments = max(60, (w+h)/10) for larger containers. */
export function ElectricBorder({
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className = '',
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const baseRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d')
    let rafId
    let start = performance.now()

    const draw = (now) => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w === 0 || h === 0) { rafId = requestAnimationFrame(draw); return }

      if (
        !baseRef.current ||
        baseRef.current.w !== w ||
        baseRef.current.h !== h
      ) {
        const seg = 60
        const pts = []
        for (let i = 0; i <= seg; i++) {
          const p = i / seg
          let bx, by
          if (p < 0.25) { const t2 = p / 0.25; bx = t2 * w; by = 0 }
          else if (p < 0.5) { const t2 = (p - 0.25) / 0.25; bx = w; by = t2 * h }
          else if (p < 0.75) { const t2 = (p - 0.5) / 0.25; bx = w - t2 * w; by = h }
          else { const t2 = (p - 0.75) / 0.25; bx = 0; by = h - t2 * h }
          pts.push({ x: bx, y: by })
        }
        pts.w = w; pts.h = h
        baseRef.current = pts
      }

      const t = (now - start) * 0.001 * speed
      const pts = baseRef.current
      const dim = Math.max(w, h)

      canvas.width = w
      canvas.height = h
      ctx.clearRect(0, 0, w, h)
      ctx.beginPath()
      /* ponytail: lineTo with noise displacement — no bezier recompute per frame.
         Ceiling: 60 straight segments look sufficiently electric at 1x-2x scale.
         Upgrade: quadraticCurveTo with stored control points for smoother curves. */
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const dx = (noise(p.x * 0.02, p.y * 0.02, t) - 0.5) * chaos * dim
        const dy = (noise(p.x * 0.02 + 100, p.y * 0.02 + 100, t + 50) - 0.5) * chaos * dim
        const cx = p.x + dx
        const cy = p.y + dy
        i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy)
      }
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.stroke()

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [color, speed, chaos, borderRadius])

  return (
    <div
      ref={containerRef}
      className={`electric-border${className ? ' ' + className : ''}`}
      style={{ borderRadius }}
    >
      <canvas ref={canvasRef} className="electric-border__canvas" />
      <div className="electric-border__content">{children}</div>
    </div>
  )
}
