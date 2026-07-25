import { useRef, useEffect } from 'react'
import './PixelTrail.css'

/* ponytail: square grid along cursor trail — no 3D projection, no GPU.
   Ceiling: trail is 2D (x,y) grid offset, not 3D voxels.
   Upgrade: WebGL2 with instanced cubes and perspective projection. */
export function PixelTrail({
  trailLength = 30,
  pixelSize = 8,
  color = '#5227FF',
  fadeSpeed = 0.03,
  rainbow = false,
  className = '',
}) {
  const canvasRef = useRef(null)
  const trailRef = useRef([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      frameRef.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* ponytail: Array.push + shift — O(n) shift cost but n ≤ 80.
         Ceiling: shift on every frame; at trailLength=200, cost is measurable.
         Upgrade: ring buffer with cursor index, no element shifting. */
      const alive = []
      for (const p of trailRef.current) {
        p.opacity -= fadeSpeed
        if (p.opacity <= 0) continue
        alive.push(p)

        const hue = rainbow ? (frameRef.current * 2 + p.x * 0.5) % 360 : 0
        ctx.fillStyle = rainbow ? `hsl(${hue}, 100%, 60%)` : color
        ctx.globalAlpha = p.opacity
        ctx.fillRect(p.x, p.y, pixelSize, pixelSize)
      }
      ctx.globalAlpha = 1
      trailRef.current = alive

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      trailRef.current.push({
        x: Math.floor(e.clientX / pixelSize) * pixelSize,
        y: Math.floor(e.clientY / pixelSize) * pixelSize,
        opacity: 1,
      })
      if (trailRef.current.length > trailLength) {
        trailRef.current.shift()
      }
    }

    resize()
    rafId = requestAnimationFrame(draw)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [trailLength, pixelSize, color, fadeSpeed, rainbow])

  return <canvas ref={canvasRef} className={`pixel-trail${className ? ' ' + className : ''}`} />
}
