import { useRef, useEffect } from 'react'
import './BlobCursor.css'

const COUNT = 8

/* ponytail: multi-circle lerp with radial gradient — no SVG filter, no feColorMatrix.
   Ceiling: 8 circles, no metaball field solve; radial gradient overlap creates soft gooey look.
   Upgrade: use <filter> with feGaussianBlur + feColorMatrix for true gooey effect,
   or implement marching-squares metaballs for organic volume. */
export function BlobCursor({
  color = '#5227FF',
  blendMode = 'gooey',
  radius = 30,
  className = '',
}) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  /* ponytail: circle offsets form a fixed ring — creates cohesive blob.
     Ceiling: uniform spread looks circular; won't form irregular blobs.
     Upgrade: randomize offsets and lerp between target shapes. */
  const circlesRef = useRef(
    Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 2
      return {
        x: -100, y: -100,
        tx: -100, ty: -100,
        ox: Math.cos(angle) * radius * 0.35,
        oy: Math.sin(angle) * radius * 0.35,
      }
    })
  )

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
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const circles = circlesRef.current

      if (blendMode === 'gooey') {
        for (const c of circles) {
          c.tx = mx + c.ox
          c.ty = my + c.oy
          c.x += (c.tx - c.x) * 0.12
          c.y += (c.ty - c.y) * 0.12

          const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, radius)
          grad.addColorStop(0, color)
          grad.addColorStop(0.5, color)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(c.x, c.y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        /* Fade mode — single trailing dot */
        const c = circles[0]
        c.x += (mx - c.x) * 0.08
        c.y += (my - c.y) * 0.08

        ctx.globalAlpha = 0.3
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(c.x, c.y, radius * 0.6, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

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
  }, [color, blendMode, radius])

  return <canvas ref={canvasRef} className={`blob-cursor${className ? ' ' + className : ''}`} />
}
