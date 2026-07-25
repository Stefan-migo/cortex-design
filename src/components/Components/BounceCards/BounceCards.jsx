import { useRef, useEffect, useState } from 'react'
import './BounceCards.css'

/* ponytail: CSS @keyframes + React state replace GSAP.
   Ceiling: no spring physics (ease-out approximates elastic),
   hover push uses fixed offset instead of GSAP timeline.
   Upgrade: use motion/react for spring-based elastic animations
   and multi-tween sequencing. */

export function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover = false,
}) {
  const containerRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    /* ponytail: timeout-based mount instead of GSAP timeline.
       Ceiling: all cards animate at once after timeout, no staggered
       from-to with elastic easing. */
    const timer = setTimeout(() => setMounted(true), animationDelay * 1000)
    return () => clearTimeout(timer)
  }, [animationDelay])

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
    if (hasRotate) return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
    if (transformStr === 'none') return 'rotate(0deg)'
    return `${transformStr} rotate(0deg)`
  }

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)
    if (match) {
      const currentX = parseFloat(match[1])
      return baseTransform.replace(translateRegex, `translate(${currentX + offsetX}px)`)
    }
    return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`
  }

  const getHoverTransform = (index) => {
    const base = transformStyles[index] || 'none'
    if (hoveredIdx === null || !enableHover) return base

    if (index === hoveredIdx) return getNoRotationTransform(base)

    const offsetX = index < hoveredIdx ? -160 : 160
    return getPushedTransform(base, offsetX)
  }

  return (
    <div
      ref={containerRef}
      className={`bounce-cards${className ? ' ' + className : ''}`}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`bounce-cards__card${mounted ? ' bounce-cards__card--mounted' : ''}`}
          style={{
            transform: getHoverTransform(idx),
            transitionDelay: mounted ? `${idx * animationStagger}s` : '0s',
            transitionDuration: '0.4s',
            /* ponytail: no elastic easings in CSS — using cubic-bezier approximation
               of back.out(1.4) */
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: images.length - idx,
          }}
          onMouseEnter={() => enableHover && setHoveredIdx(idx)}
          onMouseLeave={() => enableHover && setHoveredIdx(null)}
        >
          <img className="bounce-cards__image" src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  )
}
