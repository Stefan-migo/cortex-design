import { useMemo } from 'react'
import './CircularText.css'

export function CircularText({
  text = '',
  spinDuration = 20,
  onHover = 'none',
  className = '',
}) {
  const chars = useMemo(() => text.split(''), [text])
  const angleStep = 360 / chars.length
  const radius = Math.max(60, chars.length * 8)

  return (
    <div
      className={`circular-text${onHover !== 'none' ? ` hover-${onHover}` : ''}${className ? ' ' + className : ''}`}
      style={{
        '--speed': `${spinDuration}s`,
        '--radius': `${radius}px`,
        width: `${radius * 2 + 40}px`,
        height: `${radius * 2 + 40}px`,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="circular-letter"
          style={{ '--angle': `${i * angleStep}deg` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}
