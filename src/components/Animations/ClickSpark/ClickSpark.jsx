import { useRef, useEffect, useCallback } from 'react'
import './ClickSpark.css'

/* ponytail: spark particles are line segments radiating from click point.
   Ceiling: no gravity, no rotation, no color per particle.
   Upgrade: add particle config object as prop for per-particle overrides. */
export function ClickSpark({
  sparkColor = '#ffffff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  children,
  className = '',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const alive = []
      for (const p of particlesRef.current) {
        const age = now - p.born
        if (age >= duration) continue
        const t = age / duration
        const decay = 1 - t

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96

        ctx.globalAlpha = decay
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = sparkSize * decay
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x - p.vx, p.y - p.vy)
        ctx.stroke()

        alive.push(p)
      }
      particlesRef.current = alive
      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const speed = sparkRadius / (duration / 16)
      const now = performance.now()

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 / sparkCount) * i + (Math.random() - 0.5) * 0.5
        particlesRef.current.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          born: now,
        })
      }
    }

    container.addEventListener('click', handleClick)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      container.removeEventListener('click', handleClick)
      window.removeEventListener('resize', resize)
    }
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration])

  return (
    <div ref={containerRef} className={`click-spark${className ? ' ' + className : ''}`}>
      <canvas ref={canvasRef} className="click-spark__canvas" />
      <div className="click-spark__content">{children}</div>
    </div>
  )
}
