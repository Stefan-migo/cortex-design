import { useRef, useCallback } from 'react'
import './GlareHover.css'

export function GlareHover({
  children,
  width = '100%',
  height = '100%',
  background = '#1a1a2e',
  borderRadius = '12px',
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareSize = 300,
  playOnce = false,
  className = '',
}) {
  const ref = useRef(null)
  /* ponytail: no WeakRef or ResizeObserver tracking.
     Ceiling: if element moves (layout shift), the glare position may drift.
     Upgrade: recalculate rect on every frame via rAF. */
  const played = useRef(false)

  const handlePointerMove = useCallback((e) => {
    if (playOnce && played.current) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--glare-x', `${x}%`)
    el.style.setProperty('--glare-y', `${y}%`)
    if (playOnce) played.current = true
  }, [playOnce])

  return (
    <div
      ref={ref}
      className={`glare-hover${className ? ' ' + className : ''}`}
      onPointerMove={handlePointerMove}
      style={{
        width,
        height,
        background,
        borderRadius,
        '--glare-color': glareColor,
        '--glare-opacity': glareOpacity,
        '--glare-size': `${glareSize}px`,
      }}
    >
      {children}
    </div>
  )
}
