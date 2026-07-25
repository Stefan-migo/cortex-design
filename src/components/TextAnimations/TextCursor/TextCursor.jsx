import { useState, useRef, useCallback } from 'react'
import './TextCursor.css'

let nextId = 0

export function TextCursor({
  text = '⚛️',
  spacing = 50,
  maxPoints = 8,
  exitDuration = 0.5,
  randomFloat = true,
  className = '',
}) {
  const [points, setPoints] = useState([])
  const lastPos = useRef({ x: 0, y: 0 })

  /* ponytail: no setInterval cleanup — maxPoints caps the array,
     CSS animation handles fade-out. Stale points cycle out naturally
     when new points arrive. If mouse stops, last N points sit
     invisibly in the DOM, harmlessly.
     Ceiling: no cleanup if mouse never moves again.
     Upgrade: add idle timer to clear points after inactivity. */
  const handleMouseMove = useCallback(
    (e) => {
      const { clientX: x, clientY: y } = e
      const dx = x - lastPos.current.x
      const dy = y - lastPos.current.y
      if (Math.sqrt(dx * dx + dy * dy) < spacing) return

      lastPos.current = { x, y }
      const id = nextId++

      setPoints((prev) => {
        const next = [...prev, { id, x, y }]
        return next.length > maxPoints ? next.slice(-maxPoints) : next
      })
    },
    [spacing, maxPoints]
  )

  return (
    <div
      className={`text-cursor${className ? ' ' + className : ''}`}
      onMouseMove={handleMouseMove}
    >
      {points.map((p) => (
        <span
          key={p.id}
          className="tc-point"
          style={{
            left: p.x,
            top: p.y,
            '--exit-duration': `${exitDuration}s`,
            /* ponytail: random x offset via CSS custom property — one-liner.
               Ceiling: uniform distribution, no weighted randomization.
               Upgrade: accept randomizer function prop. */
            '--float-x': randomFloat ? `${(Math.random() - 0.5) * 40}px` : '0px',
          }}
        >
          {text}
        </span>
      ))}
    </div>
  )
}
