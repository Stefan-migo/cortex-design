import { useRef, useEffect } from 'react'
import './ShapeBlur.css'

/* ponytail: Canvas 2D context.filter instead of CSS backdrop-filter + stacked divs.
   Keeps code consistent with other 7 components (all canvas-based).
   Ceiling: Canvas filter is a composite operation, not per-element; all shapes
   share the same blur radius per frame.
   Upgrade: Stack multiple canvas layers or use CSS backdrop-filter per div. */
export function ShapeBlur({
  shapes = 3,
  blurMin = 0,
  blurMax = 20,
  color = '#5227FF',
  speed = 1,
  className = '',
}) {
  const canvasRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    /* ponytail: blur oscillates with sin() — no mouse tracking needed.
       Ceiling: time-based only; doesn't respond to cursor proximity.
       Upgrade: map mouse distance-to-center to blur value for interactive blur. */
    const draw = () => {
      timeRef.current += 0.01 * speed
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { width: w, height: h } = canvas
      const midX = w / 2
      const midY = h / 2
      const blur = blurMin + (blurMax - blurMin) * (0.5 + 0.5 * Math.sin(timeRef.current))

      ctx.filter = `blur(${blur}px)`

      for (let i = 0; i < shapes; i++) {
        const phase = (i / shapes) * Math.PI * 2
        const sx = midX + Math.cos(timeRef.current * 0.3 + phase) * w * 0.25
        const sy = midY + Math.sin(timeRef.current * 0.4 + phase) * h * 0.2
        const radius = 60 + Math.sin(timeRef.current * 0.2 + phase) * 30

        ctx.fillStyle = color
        ctx.globalAlpha = 0.3 + 0.2 * Math.sin(timeRef.current * 0.5 + phase)
        ctx.beginPath()
        ctx.arc(sx, sy, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.filter = 'none'
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [shapes, blurMin, blurMax, color, speed])

  return <canvas ref={canvasRef} className={`shape-blur${className ? ' ' + className : ''}`} />
}
