import { useRef, useEffect } from 'react'
import './SplashCursor.css'

/* ponytail: 2D canvas cursor trail with friction — not a GPU fluid sim.
   Ceiling: no pressure solve, no velocity advection (original is 1086 lines of WebGL2).
   Upgrade: WebGL2 + GPU compute for full fluid dynamics if more organic flows are needed. */
export function SplashCursor({
  color = '#ff0000',
  rainbowMode = false,
  splatRadius = 0.2,
  className = '',
}) {
  const canvasRef = useRef(null)
  const trailRef = useRef([])
  const mouseRef = useRef({ x: -100, y: -100, px: -100, py: -100 })
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = (now) => {
      frameRef.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const m = mouseRef.current
      const speed = Math.sqrt((m.x - m.px) ** 2 + (m.y - m.py) ** 2)
      m.px = m.x
      m.py = m.y

      /* Add splash particle on movement */
      if (speed > 2) {
        trailRef.current.push({
          x: m.x + (Math.random() - 0.5) * 10,
          y: m.y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * speed * 0.2,
          vy: (Math.random() - 0.5) * speed * 0.2 - speed * 0.05,
          life: 1,
          hue: (frameRef.current * 2) % 360,
          size: splatRadius * 30 * (0.5 + Math.random()),
        })
      }

      const alive = []
      for (const p of trailRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 /* gravity */
        p.vx *= 0.97
        p.vy *= 0.97
        p.life -= 0.015
        if (p.life <= 0) continue

        ctx.globalAlpha = p.life * 0.5
        ctx.fillStyle = rainbowMode
          ? `hsl(${p.hue}, 100%, 60%)`
          : color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()

        alive.push(p)
      }
      trailRef.current = alive

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
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
  }, [color, rainbowMode, splatRadius])

  return <canvas ref={canvasRef} className={`splash-cursor${className ? ' ' + className : ''}`} />
}
