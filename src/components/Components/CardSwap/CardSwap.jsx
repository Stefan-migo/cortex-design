import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import './CardSwap.css'

/* ponytail: CSS transitions + React state replace GSAP timeline.
   Ceiling: no elastic easing (CSS can't match gsap elastic.out),
   no stagger promote from GSAP's positional tweening.
   Card positions use absolute pixel values set via state + inline styles
   instead of GSAP set/fromTo.
   Upgrade: use motion/react for elastic spring swap and layout animation. */

function makeSlot(i, distX, distY, total) {
  return {
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i,
  }
}

export function Card({ customClass, style, className = '', ...rest }) {
  return (
    <div
      {...rest}
      className={`card-swap__card ${customClass ?? ''} ${className}`.trim()}
    />
  )
}

export function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) {
  const childArr = useMemo(() => Children.toArray(children), [children])
  const containerRef = useRef(null)

  const [order, setOrder] = useState(() =>
    Array.from({ length: childArr.length }, (_, i) => i)
  )
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)
  const orderRef = useRef(order)

  /* Easing config is kept for reference but CSS transition-timing-function
     approximates it. */
  const transitionDuration = easing === 'elastic' ? '0.6s' : '0.4s'
  const transitionTiming = easing === 'elastic'
    ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    : 'ease-in-out'

  useEffect(() => {
    orderRef.current = order
  }, [order])

  useEffect(() => {
    if (childArr.length < 2) return

    const swap = () => {
      if (orderRef.current.length < 2) return
      setAnimating(true)

      /* Move the front card to the back by cycling order */
      setOrder((prev) => {
        const [front, ...rest] = prev
        return [...rest, front]
      })

      setTimeout(() => setAnimating(false), 700)
    }

    /* Initial delay then start interval */
    const initialTimer = setTimeout(() => {
      swap()
      intervalRef.current = setInterval(swap, delay)
    }, delay)

    if (pauseOnHover) {
      const node = containerRef.current
      const pause = () => {
        clearInterval(intervalRef.current)
      }
      const resume = () => {
        intervalRef.current = setInterval(swap, delay)
      }
      node?.addEventListener('mouseenter', pause)
      node?.addEventListener('mouseleave', resume)
      return () => {
        clearTimeout(initialTimer)
        clearInterval(intervalRef.current)
        node?.removeEventListener('mouseenter', pause)
        node?.removeEventListener('mouseleave', resume)
      }
    }

    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalRef.current)
    }
  }, [childArr.length, delay, pauseOnHover])

  const total = childArr.length

  const rendered = childArr.map((child, i) => {
    const posIndex = order.indexOf(i)
    const slot = makeSlot(posIndex, cardDistance, verticalDistance, total)

    if (isValidElement(child)) {
      return cloneElement(child, {
        key: i,
        style: {
          width,
          height,
          transform: `translate(${slot.x}px, ${slot.y}px) translate(-50%, -50%) skewY(${(total - 1 - posIndex) * skewAmount}deg)`,
          zIndex: slot.zIndex,
          transitionDuration,
          transitionTimingFunction: transitionTiming,
          transitionProperty: 'transform',
          ...(child.props.style || {}),
        },
        onClick: (e) => {
          child.props.onClick?.(e)
          onCardClick?.(i)
        },
      })
    }
    return child
  })

  return (
    <div
      ref={containerRef}
      className="card-swap-container"
      style={{ width, height, perspective: '900px' }}
    >
      {rendered}
    </div>
  )
}
