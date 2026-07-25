import { useRef, useEffect } from 'react'
import './MetaBalls.css'

/* ponytail: additive blending (globalCompositeOperation: 'lighter') with radial
   gradients creates soft gooey overlap — NOT marching-squares metaballs.
   Ceiling: no field solve, no volume preservation; overlap is purely additive.
   Upgrade: render to offscreen canvas, apply feGaussianBlur + feColorMatrix
   via SVG filter for true gooey effect, or implement marching squares. */
export function MetaBalls({
  ballCount = 6,
  color = '#5227FF',
  maxRadius = 60,
  speed = 1,
  className = '',
}) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const ballsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    /* ponytail: spawn balls once at mount — each ball has a random drift direction.
       Ceiling: balls don't split or merge; count is fixed.
       Upgrade: implement splitting on mouse click for interactive metaballs. */
    const spawn = () => {
      const { width: w, height: h } = canvas
      ballsRef.current = Array.from({ length: ballCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: 30 + Math.random() * (maxRadius - 30),
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { width: w, height: h } = canvas
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.globalCompositeOperation = 'lighter'

      for (const b of ballsRef.current) {
        /* Drift */
        b.x += b.vx
        b.y += b.vy

        /* Mouse attraction */
        const dx = mx - b.x
        const dy = my - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 300) {
          b.x += (dx / dist) * 4
          b.y += (dy / dist) * 4
        }

        /* Boundary wrap */
        if (b.x < -b.radius) b.x = w + b.radius
        if (b.x > w + b.radius) b.x = -b.radius
        if (b.y < -b.radius) b.y = h + b.radius
        if (b.y > h + b.radius) b.y = -b.radius

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius)
        grad.addColorStop(0, color)
        grad.addColorStop(0.4, color)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
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
  }, [ballCount, color, maxRadius, speed])

  return <canvas ref={canvasRef} className={`meta-balls${className ? ' ' + className : ''}`} />
}
