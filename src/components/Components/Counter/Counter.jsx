import { useRef, useEffect, useState, useMemo } from 'react'
import './Counter.css'

/* ponytail: CSS transition + React state replace framer-motion useSpring.
   Ceiling: no spring physics (CSS ease approximates), no per-digit spring
   tension/friction control.
   Upgrade: use motion/react for custom spring tension per digit position. */

function Digit({ place, value, height, digitStyle }) {
  if (place === '.') {
    return (
      <span className="counter__digit" style={{ height, width: 'fit-content', ...digitStyle }}>
        .
      </span>
    )
  }

  const valueRoundedToPlace = (() => {
    const scaled = value / place
    return Math.floor(scaled)
  })()

  const [displayValue, setDisplayValue] = useState(valueRoundedToPlace)
  const prevRef = useRef(valueRoundedToPlace)

  useEffect(() => {
    const prev = prevRef.current
    if (prev !== valueRoundedToPlace) {
      /* Allow transition to settle before updating */
      setDisplayValue(valueRoundedToPlace)
      prevRef.current = valueRoundedToPlace
    }
  }, [valueRoundedToPlace])

  const offset = (10 + displayValue % 10 - 0) % 10
  const translateY = offset * height

  return (
    <span className="counter__digit" style={{ height, ...digitStyle }}>
      <span
        className="counter__digit-inner"
        style={{
          transform: `translateY(-${translateY}px)`,
          transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="counter__number" style={{ height }}>
            {i}
          </span>
        ))}
      </span>
    </span>
  )
}

function detectPlaces(value) {
  const str = String(value)
  return [...str].map((ch, i, a) => {
    if (ch === '.') return '.'
    const dotIndex = a.indexOf('.')
    const isInteger = dotIndex === -1
    const exponent = isInteger
      ? a.length - i - 1
      : i < dotIndex
        ? dotIndex - i - 1
        : -(i - dotIndex)
    return 10 ** exponent
  })
}

export function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places,
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'inherit',
  fontWeight = 'inherit',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle,
  className = '',
}) {
  const resolvedPlaces = useMemo(() => places || detectPlaces(value), [places, value])
  const height = fontSize + padding

  return (
    <span className={`counter${className ? ' ' + className : ''}`} style={containerStyle}>
      <span
        className="counter__inner"
        style={{
          fontSize,
          gap,
          borderRadius,
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
          color: textColor,
          fontWeight,
          direction: 'ltr',
          ...counterStyle,
        }}
      >
        {resolvedPlaces.map((place) => (
          <Digit key={String(place)} place={place} value={value} height={height} digitStyle={digitStyle} />
        ))}
      </span>
      <span className="counter__gradients">
        <span className="counter__gradient-top" style={topGradientStyle ?? { height: gradientHeight, background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})` }} />
        <span className="counter__gradient-bottom" style={bottomGradientStyle ?? { height: gradientHeight, background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})` }} />
      </span>
    </span>
  )
}
