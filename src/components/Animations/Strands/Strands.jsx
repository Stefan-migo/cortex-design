import { useRef, useEffect } from 'react'
import './Strands.css'

/* ponytail: nearest-neighbor line connections — no spring constraints, no Verlet.
   Ceiling: O(n²) distance check per frame; 80 particles = 6400 dist² ops, fine.
   Upgrade: spatial hash grid for O(n log n), spring constraints for realistic
   strand physics (tension, bending resistance). */
export function Strands({
  strandCount = 30,
  segmentLength = 10,
  color = '#ffffff',
  mouseRadius = 100,
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
      /* Respawn on resize to fill new dimensions */
      spawn()
    }

    const spawn = () => {
      const { width: w, height: h } = canvas
      particlesRef.current = Array.from({ length: strandCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        opacity: 0.2 + Math.random() * 0.5,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { width: w, height: h } = canvas
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const particles = particlesRef.current

      for (const p of particles) {
        /* Gravity */
        p.vy += 0.05
        /* Damping */
        p.vx *= 0.98
        p.vy *= 0.98
        /* Mouse repulsion */
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius
          p.vx += (dx / dist) * force * 3
          p.vy += (dy / dist) * force * 3
        }
        p.x += p.vx
        p.y += p.vy

        /* Boundary bounce */
        if (p.x < 0 || p.x > w) { p.vx *= -0.5; p.x = Math.max(0, Math.min(w, p.x)) }
        if (p.y < 0 || p.y > h) { p.vy *= -0.5; p.y = Math.max(0, Math.min(h, p.y)) }
      }

      /* Draw connections between nearby particles */
      for (let i = 0; i < strandCount; i++) {
        for (let j = i + 1; j < strandCount; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < segmentLength * 3) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = color
            ctx.globalAlpha = (1 - dist / (segmentLength * 3)) * 0.3
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    resize()
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
  }, [strandCount, segmentLength, color, mouseRadius])

  return <canvas ref={canvasRef} className={`strands${className ? ' ' + className : ''}`} />
}
