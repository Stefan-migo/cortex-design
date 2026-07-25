import { useRef, useEffect } from 'react'
import './GhostCursor.css'

/* ponytail: trail-only ghost — no cursor-position lerp (inertia cut).
   trailLength alone controls smoothness.
   Ceiling: Array.shift() per frame is O(n). Long trails + fast frames may jank.
   Upgrade: ring buffer with write cursor for O(1) push/drop. */
export function GhostCursor({
  trailLength = 50,
  color = '#B497CF',
  size = 20,
  glowSize,
  className = '',
}) {
  const canvasRef = useRef(null)
  const trailRef = useRef([])
  const mouseRef = useRef({ x: -100, y: -100 })
  /* ponytail: glowSize defaults to size * 1.5. Kept as explicit prop for
     the StrongGlow story; reduces prop surface for most usage. */
  const blurSize = glowSize ?? Math.round(size * 1.5)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const trail = trailRef.current
      trail.push({ x: mouseRef.current.x, y: mouseRef.current.y })
      if (trail.length > trailLength) trail.shift()

      ctx.globalCompositeOperation = 'screen'

      for (let i = 0; i < trail.length; i++) {
        const t = trail[i]
        const progress = i / Math.max(trail.length - 1, 1)
        ctx.globalAlpha = 1 - progress
        ctx.shadowBlur = blurSize
        ctx.shadowColor = color
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(t.x, t.y, size * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      ctx.globalCompositeOperation = 'source-over'
      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [trailLength, color, size, blurSize])

  return (
    <canvas
      ref={canvasRef}
      className={`ghost-cursor${className ? ' ' + className : ''}`}
    />
  )
}
