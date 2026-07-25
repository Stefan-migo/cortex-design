import { useState, useRef, useCallback, useEffect } from 'react'
import './Dock.css'

/* ponytail: CSS transitions + React state replace motion/react spring.
   Ceiling: magnification uses onMouseMove distance calculation instead of
   MotionValue transforms, no spring interpolation on size changes,
   tooltip uses CSS visibility instead of AnimatePresence.
   Upgrade: use motion/react for spring-based magnification and layout animations. */

function DockItem({ icon, label, onClick, mouseX, distance, magnification, baseItemSize, index }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [itemWidth, setItemWidth] = useState(baseItemSize)

  const handleMouseMove = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const itemCenter = rect.x + rect.width / 2
    const dist = Math.abs(mouseX - itemCenter)
    if (dist < distance) {
      const t = 1 - dist / distance
      const size = baseItemSize + (magnification - baseItemSize) * t
      setItemWidth(size)
    } else {
      setItemWidth(baseItemSize)
    }
  }, [mouseX, distance, magnification, baseItemSize])

  useEffect(() => {
    handleMouseMove()
  }, [handleMouseMove])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() }
  }

  return (
    <div
      ref={ref}
      className="dock__item"
      style={{
        width: itemWidth,
        height: itemWidth,
        transition: 'width 0.15s ease, height 0.15s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setItemWidth(baseItemSize) }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-label={typeof label === 'string' ? label : undefined}
    >
      <div className="dock__icon">{icon}</div>
      {isHovered && label && (
        <div className="dock__label" role="tooltip">{label}</div>
      )}
    </div>
  )
}

export function Dock({
  items = [],
  className = '',
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  baseItemSize = 50,
}) {
  const [mouseX, setMouseX] = useState(Infinity)
  const [isHovered, setIsHovered] = useState(false)
  const panelRef = useRef(null)

  const maxHeight = Math.max(panelHeight, magnification + magnification / 2 + 4)

  return (
    <div className="dock__outer" style={{ height: isHovered ? maxHeight : panelHeight, transition: 'height 0.2s ease' }}>
      <div
        ref={panelRef}
        className={`dock__panel${className ? ' ' + className : ''}`}
        style={{ height: panelHeight }}
        onMouseMove={(e) => { setIsHovered(true); setMouseX(e.pageX) }}
        onMouseLeave={() => { setIsHovered(false); setMouseX(Infinity) }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
