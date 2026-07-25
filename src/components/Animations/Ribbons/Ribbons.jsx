import { useRef, useEffect } from 'react'
import './Ribbons.css'

/* ponytail: bezier curves with sin() pseudo-noise — no OGL, no GPU compute.
   Ceiling: sin combinations produce predictable patterns; 12+ ribbons may drop frames.
   Upgrade: simplex noise for organic curves, WebGL2 for 50+ ribbons. */
export function Ribbons({
  ribbonCount = 5,
  color = '#ff3366',
  speed = 1,
  width = 4,
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

    const draw = () => {
      timeRef.current += 0.006 * speed
      const t = timeRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { width: w, height: h } = canvas

      for (let r = 0; r < ribbonCount; r++) {
        const phase = (r / ribbonCount) * Math.PI * 2
        const steps = 30
        const points = []

        for (let i = 0; i <= steps; i++) {
          const p = i / steps
          const px = p * w
          const py = h / 2
            + Math.sin(p * 4 + t * 0.8 + phase) * h * 0.2
            + Math.sin(p * 7 + t * 1.2 + phase * 0.5) * h * 0.1
          points.push({ x: px, y: py })
        }

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2
          const yc = (points[i].y + points[i + 1].y) / 2
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)

        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.2, color)
        grad.addColorStop(0.8, color)
        grad.addColorStop(1, 'transparent')

        ctx.strokeStyle = grad
        ctx.lineWidth = width
        ctx.shadowColor = color
        ctx.shadowBlur = 12
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
  }, [ribbonCount, color, speed, width])

  return <canvas ref={canvasRef} className={`ribbons${className ? ' ' + className : ''}`} />
}
