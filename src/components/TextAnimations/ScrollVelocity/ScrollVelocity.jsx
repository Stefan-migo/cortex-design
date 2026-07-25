import { useRef, useEffect } from 'react'
import './ScrollVelocity.css'

export function ScrollVelocity({
  text = '',
  speed = 1,
  direction = 'left',
  className = '',
}) {
  const containerRef = useRef(null)
  const offsetRef = useRef(0)
  const lastYRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    lastYRef.current = window.scrollY

    /* ponytail: passive scroll + RAF throttle for smooth scroll-driven
       translate. Ceiling: accumulated offset grows unbounded — scrolling
       100kpx produces 100k * speed px translateX with no wrap-around.
       Upgrade: modulo offset to element/client width for infinite loop. */
    const onScroll = () => {
      const delta = window.scrollY - lastYRef.current
      lastYRef.current = window.scrollY
      const dir = direction === 'left' ? -1 : 1
      offsetRef.current += delta * speed * dir

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.transform =
              `translateX(${offsetRef.current}px)`
          }
          rafRef.current = null
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [speed, direction])

  return (
    <div className={`scroll-velocity${className ? ' ' + className : ''}`}>
      <div ref={containerRef} className="sv-content">
        {text}
      </div>
    </div>
  )
}
