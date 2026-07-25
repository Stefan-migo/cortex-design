import { useRef, useEffect } from 'react'
import './LaserFlow.css'

/* ponytail: bezier curves with sine-based control point animation — no shader, no WebGL.
   Ceiling: 8 beams max before fill/composite cost drops frames.
   Upgrade: WebGL2 with vertex shader for 100+ flowing paths. */
export function LaserFlow({
  beamCount = 3,
  color = '#ff3366',
  speed = 1,
  width = 3,
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

    /* ponytail: control points use sin() combinations as Perlin-like noise.
       Ceiling: deterministic pseudo-noise, not true Perlin; patterns repeat.
       Upgrade: use simplex noise library for organic non-repeating flow. */
    const draw = () => {
      timeRef.current += 0.008 * speed
      const t = timeRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { width: w, height: h } = canvas

      for (let b = 0; b < beamCount; b++) {
        const phase = (b / beamCount) * Math.PI * 2
        const cx = w / 2
        const cy = h / 2

        const cp1x = cx + Math.sin(t * 0.7 + phase) * w * 0.3
        const cp1y = cy + Math.cos(t * 0.5 + phase) * h * 0.3
        const cp2x = cx + Math.sin(t * 0.9 + phase + 1) * w * 0.3
        const cp2y = cy + Math.cos(t * 0.6 + phase + 1) * h * 0.3
        const ex = cx + Math.sin(t * 0.4 + phase + 2) * w * 0.25
        const ey = cy + Math.cos(t * 0.8 + phase + 2) * h * 0.25

        const grad = ctx.createLinearGradient(cx, cy, ex, ey)
        grad.addColorStop(0, color)
        grad.addColorStop(0.5, color)
        grad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey)
        ctx.strokeStyle = grad
        ctx.lineWidth = width + Math.sin(t + phase) * width * 0.3
        ctx.shadowColor = color
        ctx.shadowBlur = 15
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [beamCount, color, speed, width])

  return <canvas ref={canvasRef} className={`laser-flow${className ? ' ' + className : ''}`} />
}
