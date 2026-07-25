import { useRef, useEffect } from 'react'
import './Cubes.css'

/* ponytail: CSS 3D transforms with perspective — no Three.js.
   Ceiling: flat-shaded faces, no lighting, no shadows.
   Upgrade: Three.js with MeshPhongMaterial for depth, shadows, and reflections. */
export function Cubes({
  rows = 5,
  cols = 5,
  size = 60,
  gap = 10,
  color1 = '#5227FF',
  color2 = '#FF6B6B',
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      container.style.setProperty('--rx', `${(y - 0.5) * 40}deg`)
      container.style.setProperty('--ry', `${(x - 0.5) * -40}deg`)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const half = size / 2

  return (
    <div
      ref={containerRef}
      className={`cubes${className ? ' ' + className : ''}`}
      style={{
        '--cols': cols,
        '--gap': `${gap}px`,
        '--size': `${size}px`,
        '--half': `${half}px`,
        '--c1': color1,
        '--c2': color2,
      }}
    >
      {Array.from({ length: rows * cols }, (_, i) => (
        <div key={i} className="cubes__cell">
          <div className="cubes__cube">
            <div className="cubes__face cubes__face--front" />
            <div className="cubes__face cubes__face--back" />
            <div className="cubes__face cubes__face--left" />
            <div className="cubes__face cubes__face--right" />
            <div className="cubes__face cubes__face--top" />
            <div className="cubes__face cubes__face--bottom" />
          </div>
        </div>
      ))}
    </div>
  )
}
