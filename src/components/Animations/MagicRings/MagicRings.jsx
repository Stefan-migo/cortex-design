import { useRef, useEffect } from 'react'
import './MagicRings.css'

/* ponytail: rainbow mode cycles hue via frame counter — no color array, no per-ring state.
   Ceiling: all rings share the same hue at any moment; no individual ring rainbows.
   Upgrade: store hue per ring at spawn for gradient effect. */
export function MagicRings({
  ringColor = '#5227FF',
  maxRings = 20,
  ringWidth = 2,
  expansionSpeed = 2,
  rainbow = false,
  className = '',
}) {
  const canvasRef = useRef(null)
  const ringsRef = useRef([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    /* ponytail: ring array with O(1) removal via index splice — fine for ≤ 50 rings.
       Ceiling: splice shifts elements; for 200+ rings use a ring buffer.
       Upgrade: typed ring buffer with write cursor. */
    const draw = () => {
      frameRef.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const rings = ringsRef.current

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i]
        r.radius += expansionSpeed
        r.opacity -= 0.008 * expansionSpeed

        if (r.opacity <= 0 || r.radius > r.maxRadius) {
          rings.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = r.color
        ctx.lineWidth = ringWidth
        ctx.globalAlpha = Math.max(0, r.opacity)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(draw)
    }

    const hue = rainbow ? (frameRef.current * 2) % 360 : 0
    const spawn = (x, y) => {
      if (ringsRef.current.length >= maxRings) ringsRef.current.shift()
      ringsRef.current.push({
        x, y,
        radius: 0,
        maxRadius: 80 + Math.random() * 120,
        opacity: 1,
        color: rainbow ? `hsl(${hue}, 100%, 50%)` : ringColor,
      })
    }

    const onMove = (e) => spawn(e.clientX, e.clientY)
    const onClick = (e) => {
      /* ponytail: click spawns a burst of 3 rings at once for emphasis.
         Ceiling: burst is hardcoded to 3; not configurable.
         Upgrade: add burstCount prop. */
      for (let i = 0; i < 3; i++) {
        setTimeout(() => spawn(e.clientX, e.clientY), i * 50)
      }
    }

    resize()
    rafId = requestAnimationFrame(draw)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('click', onClick)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [ringColor, maxRings, ringWidth, expansionSpeed, rainbow])

  return <canvas ref={canvasRef} className={`magic-rings${className ? ' ' + className : ''}`} />
}
