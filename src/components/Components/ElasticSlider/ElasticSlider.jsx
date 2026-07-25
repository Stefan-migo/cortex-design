import { useEffect, useRef, useState, useCallback } from 'react'
import './ElasticSlider.css'

/* ponytail: CSS transitions + React state replace motion/react spring.
   Ceiling: no spring overflow animation (replaced by CSS transition),
   no scale/opacity on hover (simplified), icon components replaced
   with inline SVG. Icon overflow bounce uses decay function but without
   motion spring — just CSS ease.
   Upgrade: use motion/react for spring-based overflow bounceback. */

const MAX_OVERFLOW = 50

function decay(value, max) {
  if (max === 0) return 0
  const entry = value / max; const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5)
  return sigmoid * max
}

function VolumeDownIcon() {
  return (
    <svg className="elastic-slider__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function VolumeUpIcon() {
  return (
    <svg className="elastic-slider__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

export function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <VolumeDownIcon />,
  rightIcon = <VolumeUpIcon />,
}) {
  const [value, setValue] = useState(defaultValue)
  const sliderRef = useRef(null)
  const [region, setRegion] = useState('middle')
  const [overflow, setOverflow] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => { setValue(defaultValue) }, [defaultValue])

  const handlePointerMove = useCallback((e) => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect()
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue)
      if (isStepped) newValue = Math.round(newValue / stepSize) * stepSize
      newValue = Math.min(Math.max(newValue, startingValue), maxValue)
      setValue(newValue)

      if (e.clientX < left) { setRegion('left'); setOverflow(decay(left - e.clientX, MAX_OVERFLOW)) }
      else if (e.clientX > left + width) { setRegion('right'); setOverflow(decay(e.clientX - (left + width), MAX_OVERFLOW)) }
      else { setRegion('middle'); setOverflow(0) }
    }
  }, [startingValue, maxValue, isStepped, stepSize])

  const handlePointerDown = useCallback((e) => {
    handlePointerMove(e)
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [handlePointerMove])

  const handlePointerUp = useCallback(() => {
    setOverflow(0); setScale(1)
  }, [])

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue
    if (totalRange === 0) return 0
    return ((value - startingValue) / totalRange) * 100
  }

  const leftTranslate = region === 'left' ? -overflow : 0
  const rightTranslate = region === 'right' ? overflow : 0

  return (
    <div className={`elastic-slider${className ? ' ' + className : ''}`}>
      <div
        className="elastic-slider__wrapper"
        onMouseEnter={() => setScale(1.05)}
        onMouseLeave={() => { setScale(1); setOverflow(0) }}
        onTouchStart={() => setScale(1.05)}
        onTouchEnd={() => { setScale(1); setOverflow(0) }}
        style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease' }}
      >
        <div className="elastic-slider__icon-wrap" style={{ transform: `translateX(${leftTranslate}px)`, transition: 'transform 0.2s ease' }}>
          {leftIcon}
        </div>

        <div ref={sliderRef} className="elastic-slider__root" onPointerMove={handlePointerMove} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onLostPointerCapture={handlePointerUp}>
          <div className="elastic-slider__track-wrap" style={{ transform: `scaleX(${1 + overflow / 200})`, transformOrigin: region === 'left' ? 'right' : 'left', transition: 'transform 0.2s ease' }}>
            <div className="elastic-slider__track">
              <div className="elastic-slider__range" style={{ width: `${getRangePercentage()}%` }} />
            </div>
          </div>
        </div>

        <div className="elastic-slider__icon-wrap" style={{ transform: `translateX(${rightTranslate}px)`, transition: 'transform 0.2s ease' }}>
          {rightIcon}
        </div>
      </div>
      <p className="elastic-slider__value">{Math.round(value)}</p>
    </div>
  )
}
