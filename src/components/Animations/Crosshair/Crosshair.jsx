import { useRef, useEffect } from 'react'
import './Crosshair.css'

/* ponytail: div-based crosshair with CSS transitions instead of canvas.
   Ceiling: single crosshair, no gradient trails or glow.
   Upgrade: switch to canvas for multi-trace, afterimage, or glow effects. */
export function Crosshair({
  color = '#5227FF',
  size = 20,
  thickness = 2,
  gap = 5,
  className = '',
}) {
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const onMove = (e) => {
      el.style.setProperty('--cx', `${e.clientX}px`)
      el.style.setProperty('--cy', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const half = size / 2

  return (
    <div
      ref={elRef}
      className={`crosshair${className ? ' ' + className : ''}`}
      style={{
        '--color': color,
        '--size': `${size}px`,
        '--thickness': `${thickness}px`,
        '--gap': `${gap}px`,
        '--half': `${half}px`,
      }}
      aria-hidden
    >
      {/* Horizontal line — left segment */}
      <div
        className="crosshair__line crosshair__line--h-l"
        style={{
          left: `calc(var(--cx) - var(--half) - var(--gap))`,
          top: `calc(var(--cy) - 0.5px)`,
          width: `calc(var(--half) - var(--gap))`,
          height: `var(--thickness)`,
        }}
      />
      {/* Horizontal line — right segment */}
      <div
        className="crosshair__line crosshair__line--h-r"
        style={{
          left: `calc(var(--cx) + var(--gap))`,
          top: `calc(var(--cy) - 0.5px)`,
          width: `calc(var(--half) - var(--gap))`,
          height: `var(--thickness)`,
        }}
      />
      {/* Vertical line — top segment */}
      <div
        className="crosshair__line crosshair__line--v-t"
        style={{
          left: `calc(var(--cx) - 0.5px)`,
          top: `calc(var(--cy) - var(--half) - var(--gap))`,
          width: `var(--thickness)`,
          height: `calc(var(--half) - var(--gap))`,
        }}
      />
      {/* Vertical line — bottom segment */}
      <div
        className="crosshair__line crosshair__line--v-b"
        style={{
          left: `calc(var(--cx) - 0.5px)`,
          top: `calc(var(--cy) + var(--gap))`,
          width: `var(--thickness)`,
          height: `calc(var(--half) - var(--gap))`,
        }}
      />
      {/* Center ring */}
      <div
        className="crosshair__ring"
        style={{
          left: `calc(var(--cx) - var(--size) * 0.15)`,
          top: `calc(var(--cy) - var(--size) * 0.15)`,
          width: `calc(var(--size) * 0.3)`,
          height: `calc(var(--size) * 0.3)`,
          border: `${thickness}px solid var(--color)`,
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
