import { useEffect, useRef } from 'react'
import './DecayCard.css'

/* ponytail: RAF loop + direct DOM manipulation replace GSAP set().
   Ceiling: no GSAP easing on transforms (approximated with lerp).
   SVG displacement map kept for the analog glitch aesthetic — the whole
   point of the component.
   Upgrade: use motion/react for spring interpolation on transform values. */

export function DecayCard({
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  children,
  className = '',
}) {
  const cardRef = useRef(null)
  const displacementMapRef = useRef(null)
  const cursor = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })
  const cachedCursor = useRef({ x: cursor.current.x, y: cursor.current.y })
  const winsize = useRef({ width: typeof window !== 'undefined' ? window.innerWidth : 0, height: typeof window !== 'undefined' ? window.innerHeight : 0 })

  useEffect(() => {
    const lerp = (a, b, n) => (1 - n) * a + n * b
    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c
    const distance = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2)

    const handleResize = () => { winsize.current = { width: window.innerWidth, height: window.innerHeight } }
    const handleMouseMove = (ev) => { cursor.current = { x: ev.clientX, y: ev.clientY } }
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const imgValues = { imgTransforms: { x: 0, y: 0, rz: 0 }, displacementScale: 0 }

    const render = () => {
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1)
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1)
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1)

      if (targetX > movementBound) targetX = movementBound + (targetX - movementBound) * 0.2
      if (targetX < -movementBound) targetX = -movementBound + (targetX + movementBound) * 0.2
      if (targetY > movementBound) targetY = movementBound + (targetY - movementBound) * 0.2
      if (targetY < -movementBound) targetY = -movementBound + (targetY + movementBound) * 0.2

      imgValues.imgTransforms.x = targetX; imgValues.imgTransforms.y = targetY; imgValues.imgTransforms.rz = targetRz

      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${targetRz}deg)`
      }

      const cursorTravelledDistance = distance(cachedCursor.current.x, cursor.current.x, cachedCursor.current.y, cursor.current.y)
      imgValues.displacementScale = lerp(imgValues.displacementScale, map(cursorTravelledDistance, 0, 200, 0, maxDisplacement), 0.06)

      if (displacementMapRef.current) {
        displacementMapRef.current.setAttribute('scale', String(imgValues.displacementScale))
      }

      cachedCursor.current = { ...cursor.current }
      rafId = requestAnimationFrame(render)
    }

    let rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [maxDisplacement, movementBound])

  return (
    <div className={`decay-card${className ? ' ' + className : ''}`} style={{ width: `${width}px`, height: `${height}px` }} ref={cardRef}>
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="decay-card__svg">
        <filter id="decayFilter">
          <feTurbulence type="turbulence" baseFrequency={baseFrequency} numOctaves={numOctaves} seed={seed} stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence1" />
          <feDisplacementMap ref={displacementMapRef} in="SourceGraphic" in2="turbulence1" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" result="displacementMap3" />
        </filter>
        <g>
          <image href={image} x="0" y="0" width="600" height="750" filter="url(#decayFilter)" preserveAspectRatio="xMidYMid slice" />
        </g>
      </svg>
      <div className="decay-card__text">{children}</div>
    </div>
  )
}
