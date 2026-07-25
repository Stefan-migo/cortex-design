import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import './Carousel.css'

/* ponytail: CSS translateX + React state replace motion/react drag + spring.
   Ceiling: no spring physics for drag-snap, no interpolated rotateY on items,
   no drag gesture (click/drag only advances slides).
   Upgrade: use motion/react for drag/swipe with spring snap and
   3D rotateY per slide. */

const DRAG_THRESHOLD = 50
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_DURATION = 400

function FileTextIcon() {
  return (
    <svg className="carousel__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}
function CircleIcon() {
  return (
    <svg className="carousel__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
function LayersIcon() {
  return (
    <svg className="carousel__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}
function LayoutIcon() {
  return (
    <svg className="carousel__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}
function CodeIcon() {
  return (
    <svg className="carousel__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

const ICONS = [FileTextIcon, CircleIcon, LayersIcon, LayoutIcon, CodeIcon]

const DEFAULT_ITEMS = [
  { title: 'Text Animations', description: 'Cool text animations for your projects.', id: 1 },
  { title: 'Animations', description: 'Smooth animations for your projects.', id: 2 },
  { title: 'Components', description: 'Reusable components for your projects.', id: 3 },
  { title: 'Backgrounds', description: 'Beautiful backgrounds and patterns.', id: 4 },
  { title: 'Common UI', description: 'Common UI components coming soon!', id: 5 },
]

export function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  className = '',
}) {
  const containerPadding = 16
  const itemWidth = baseWidth - containerPadding * 2
  const trackItemOffset = itemWidth + GAP

  const itemsForRender = useMemo(() => {
    if (!loop) return items
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef(null)
  const dragStartRef = useRef(null)
  const dragOffsetRef = useRef(0)
  const trackRef = useRef(null)

  /* Drag handlers */
  const handlePointerDown = useCallback((e) => {
    dragStartRef.current = e.clientX
    dragOffsetRef.current = 0
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (dragStartRef.current === null) return
    dragOffsetRef.current = e.clientX - dragStartRef.current
    if (trackRef.current) {
      const currentX = -position * trackItemOffset + dragOffsetRef.current
      trackRef.current.style.transform = `translateX(${currentX}px)`
    }
  }, [position, trackItemOffset])

  const handlePointerUp = useCallback(() => {
    if (dragStartRef.current === null) return
    const { current: offset } = dragOffsetRef
    dragStartRef.current = null

    if (Math.abs(offset) < DRAG_THRESHOLD) return

    const direction = offset < 0 ? 1 : -1
    setPosition((prev) => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return Math.max(0, Math.min(next, max))
    })
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), SPRING_DURATION)
    dragOffsetRef.current = 0
  }, [itemsForRender.length])

  /* Hover */
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return
    const el = containerRef.current
    const enter = () => setIsHovered(true)
    const leave = () => setIsHovered(false)
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [pauseOnHover])

  /* Autoplay */
  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return
    if (pauseOnHover && isHovered) return

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1))
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length])

  /* Reset position on items change */
  useEffect(() => {
    const startPos = loop ? 1 : 0
    setPosition(startPos)
  }, [items.length, loop])

  /* Loop wrapping */
  useEffect(() => {
    if (!loop || itemsForRender.length <= 1 || isTransitioning) return

    const lastCloneIndex = itemsForRender.length - 1

    if (position === lastCloneIndex) {
      const timer = setTimeout(() => {
        setIsTransitioning(true)
        setPosition(1)
        setTimeout(() => setIsTransitioning(false), 50)
      }, SPRING_DURATION)
      return () => clearTimeout(timer)
    }

    if (position === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(true)
        setPosition(items.length)
        setTimeout(() => setIsTransitioning(false), 50)
      }, SPRING_DURATION)
      return () => clearTimeout(timer)
    }
  }, [position, loop, items.length, itemsForRender.length, isTransitioning])

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1)

  return (
    <div
      ref={containerRef}
      className={`carousel${round ? ' carousel--round' : ''}${className ? ' ' + className : ''}`}
      style={{ width: `${baseWidth}px`, ...(round ? { height: `${baseWidth}px`, borderRadius: '50%' } : {}) }}
    >
      <div
        ref={trackRef}
        className="carousel__track"
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          transform: `translateX(${-position * trackItemOffset}px)`,
          transition: isTransitioning ? 'none' : `transform ${SPRING_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {itemsForRender.map((item, index) => {
          const Icon = ICONS[(item.id - 1) % ICONS.length]
          return (
            <div
              key={`${item?.id ?? index}-${index}`}
              className={`carousel__item${round ? ' carousel__item--round' : ''}`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                ...(round ? { borderRadius: '50%' } : {}),
              }}
            >
              <div className={`carousel__item-header${round ? ' carousel__item-header--round' : ''}`}>
                <span className="carousel__icon-wrap"><Icon /></span>
              </div>
              <div className="carousel__item-content">
                <div className="carousel__item-title">{item.title}</div>
                <p className="carousel__item-desc">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className={`carousel__indicators${round ? ' carousel__indicators--round' : ''}`}>
        {items.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`carousel__dot${activeIndex === index ? ' carousel__dot--active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index}
            onClick={() => setPosition(loop ? index + 1 : index)}
          />
        ))}
      </div>
    </div>
  )
}
