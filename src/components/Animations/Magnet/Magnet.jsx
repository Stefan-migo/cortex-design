import { useRef, useCallback } from 'react'
import './Magnet.css'

/* ponytail: `padding` means activation radius from element center.
   The name is misleading but matches the spec.
   Ceiling: no per-axis activation (always radial).
   Upgrade: accept activationRadius alias + deprecate padding. */
export function Magnet({
  children,
  padding = 100,
  magnetStrength = 2,
  disabled = false,
  className = '',
}) {
  const ref = useRef(null)

  const handlePointerMove = useCallback((e) => {
    if (disabled) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > padding) {
      el.style.transform = ''
      return
    }

    el.style.transform = `translate(${dx * magnetStrength * 0.05}px, ${dy * magnetStrength * 0.05}px)`
  }, [padding, magnetStrength, disabled])

  const handlePointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = ''
  }, [])

  return (
    <div
      ref={ref}
      className={`magnet${className ? ' ' + className : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  )
}
