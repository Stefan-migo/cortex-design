import { useRef, useEffect } from 'react'
import './Antigravity.css'

/* ponytail: Canvas 2D particle field — no GPU compute, no instancing.
   Ceiling: 150 particles max before frame drops on low-end devices.
   Upgrade: switch to WebGL2 with point sprites for 10k+ particles. */
export function Antigravity({
  particleCount = 50,
  particleSize = 3,
  speed = 0.5,
  mouseInfluence = true,
  color = '#ffffff',
  className = '',
}) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    /* ponytail: spawn particles once at mount — no dynamic add/remove.
       Ceiling: count is fixed; won't respond to prop changes after mount.
       Upgrade: watch particleCount prop in effect deps and re-spawn. */
    const spawn = () => {
      const w = canvas.width
      const h = canvas.height
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * w,
        y: h + Math.random() * 100,
        size: (0.5 + Math.random()) * particleSize,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.2 + Math.random()) * speed,
        wobbleFreq: 0.005 + Math.random() * 0.015,
        wobbleAmp: 10 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { width: w, height: h } = canvas
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particlesRef.current) {
        /* Drift upward with horizontal wobble */
        p.y += p.vy
        p.x += p.vx + Math.sin(p.phase) * p.wobbleAmp * 0.01
        p.phase += p.wobbleFreq

        /* Mouse repulsion */
        if (mouseInfluence) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150
            p.x += (dx / dist) * force * 3
            p.y += (dy / dist) * force * 3
          }
        }

        /* Wrap around top, fade near edges */
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w }

        const fade = Math.min(
          1,
          Math.min(p.y / 100, (h - p.y) / 100) * 2
        )

        ctx.globalAlpha = Math.max(0, fade * 0.6)
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    resize()
    spawn()
    rafId = requestAnimationFrame(draw)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [particleCount, particleSize, speed, mouseInfluence, color])

  return <canvas ref={canvasRef} className={`antigravity${className ? ' ' + className : ''}`} />
}
