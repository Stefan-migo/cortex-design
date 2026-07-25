import { useRef, useEffect } from 'react'
import './ImageTrail.css'

/* ponytail: RAF + DOM nodes — no GSAP, no canvas, no interpolation.
   Ceiling: N image limit, fixed size per image, no velocity-based spacing.
   Upgrade: canvas with offscreen rendering for smooth interpolation
   and unlimited trail length. */
export function ImageTrail({
  images = [],
  trailLength = 8,
  spacing = 30,
  size = 100,
  fadeAmount = 0.3,
  className = '',
}) {
  const posRef = useRef({ x: -200, y: -200 })
  const trailRef = useRef([])
  const rafRef = useRef()

  useEffect(() => {
    const frame = () => {
      const { x, y } = posRef.current
      const trail = trailRef.current

      trail.push({ x, y })
      if (trail.length > trailLength) trail.shift()

      trail.forEach((p, i) => {
        const el = trail[i]?.el
        if (!el) return
        const t = trail.length > 1 ? i / (trail.length - 1) : 0
        el.style.left = `${p.x - size / 2}px`
        el.style.top = `${p.y - size / 2}px`
        el.style.opacity = 1 - t * fadeAmount
        el.style.transform = `translateZ(0) scale(${1 - t * 0.4})`
        el.style.setProperty('--img-index', String(i % images.length))
      })

      rafRef.current = requestAnimationFrame(frame)
    }

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    rafRef.current = requestAnimationFrame(frame)
    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
    }
  }, [trailLength, size, fadeAmount, images.length])

  return (
    <div className={`image-trail${className ? ' ' + className : ''}`} aria-hidden>
      {Array.from({ length: trailLength }, (_, i) => {
        const img = images[i % images.length] || {}
        return (
          <img
            key={i}
            ref={(el) => {
              if (el) trailRef.current[i] = { ...(trailRef.current[i] || {}), el }
            }}
            className="image-trail__img"
            src={img.src}
            alt={img.alt || ''}
            draggable={false}
            style={{
              '--size': `${size}px`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        )
      })}
    </div>
  )
}
