import { useRef } from 'react'
import './SpotlightCard.css'

export function SpotlightCard({ children, className = '', spotlightColor = 'rgba(255,255,255,0.25)' }) {
  const ref = useRef(null)
  const handleMove = (e) => {
    if (!ref.current) return; const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mouse-x', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--mouse-y', `${e.clientY - r.top}px`)
    ref.current.style.setProperty('--spotlight-color', spotlightColor)
  }
  return <div ref={ref} onMouseMove={handleMove} className={`card-spotlight${className ? ' ' + className : ''}`}>{children}</div>
}
