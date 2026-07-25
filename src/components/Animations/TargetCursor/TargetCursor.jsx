import { useRef, useEffect } from 'react'
import './TargetCursor.css'

/* ponytail: RAF + CSS transitions — no GSAP spring physics.
   Ceiling: linear easing on ring expansion, no elastic bounce.
   Upgrade: GSAP for elastic/bounce easing on click effect. */
export function TargetCursor({
  color = '#5227FF',
  ringCount = 3,
  size = 40,
  clickEffect = true,
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

    const onClick = () => {
      if (!clickEffect) return
      const pulse = el.querySelector('.target-cursor__pulse')
      if (!pulse) return
      pulse.classList.remove('target-cursor__pulse--active')
      /* force reflow */
      void pulse.offsetWidth
      pulse.classList.add('target-cursor__pulse--active')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [clickEffect])

  const rings = Array.from({ length: ringCount }, (_, i) => {
    const ringSize = size + i * (size * 0.3)
    return { i, ringSize }
  })

  return (
    <div
      ref={elRef}
      className={`target-cursor${className ? ' ' + className : ''}`}
      style={{
        '--color': color,
        '--size': `${size}px`,
      }}
      aria-hidden
    >
      {/* Rings */}
      {rings.map(({ i, ringSize }) => (
        <div
          key={i}
          className="target-cursor__ring"
          style={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            left: `calc(var(--cx) - ${ringSize / 2}px)`,
            top: `calc(var(--cy) - ${ringSize / 2}px)`,
            borderColor: `color-mix(in srgb, var(--color) ${100 - i * 20}%, transparent)`,
            opacity: 1 - i * 0.15,
          }}
        />
      ))}
      {/* Center dot */}
      <div
        className="target-cursor__dot"
        style={{
          left: `calc(var(--cx) - 3px)`,
          top: `calc(var(--cy) - 3px)`,
          width: '6px',
          height: '6px',
          background: color,
        }}
      />
      {/* Click pulse */}
      <div
        className="target-cursor__pulse"
        style={{
          left: `calc(var(--cx) - ${size / 2}px)`,
          top: `calc(var(--cy) - ${size / 2}px)`,
          width: `${size}px`,
          height: `${size}px`,
          borderColor: color,
        }}
      />
    </div>
  )
}
