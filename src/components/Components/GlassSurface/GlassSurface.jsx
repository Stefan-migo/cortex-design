import { useEffect, useRef, useState, useId } from 'react'
import './GlassSurface.css'

/* ponytail: SVG displacement filter for glass surface. SVG filter + backdrop-filter.
   Ceiling: SVG filter not supported in all browsers (fallback to CSS backdrop-filter).
   Upgrade: WebGL-based refraction for true physical glass. */

export function GlassSurface({
  children,
  width = 200, height = 80, borderRadius = 20, borderWidth = 0.07,
  brightness = 50, opacity = 0.93, blur = 11, displace = 0,
  backgroundOpacity = 0, saturation = 1, distortionScale = -180,
  redOffset = 0, greenOffset = 10, blueOffset = 20,
  xChannel = 'R', yChannel = 'G', mixBlendMode = 'difference',
  className = '', style = {},
}) {
  const id = useId(); const filterId = `gs-filter-${id}`
  const redGradId = `rg-${id}`; const blueGradId = `bg-${id}`
  const [svgSupported, setSvgSupported] = useState(false)
  const containerRef = useRef(null); const feImageRef = useRef(null)
  const redChannelRef = useRef(null); const greenChannelRef = useRef(null)
  const blueChannelRef = useRef(null); const gaussianBlurRef = useRef(null)

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect()
    const aw = rect?.width || 400; const ah = rect?.height || 200
    const edge = Math.min(aw, ah) * (borderWidth * 0.5)
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg viewBox="0 0 ${aw} ${ah}" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/>
        </linearGradient><linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/>
        </linearGradient></defs>
        <rect x="0" y="0" width="${aw}" height="${ah}" fill="black"/>
        <rect x="0" y="0" width="${aw}" height="${ah}" rx="${borderRadius}" fill="url(#${redGradId})"/>
        <rect x="0" y="0" width="${aw}" height="${ah}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/>
        <rect x="${edge}" y="${edge}" width="${aw - edge * 2}" height="${ah - edge * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/>
      </svg>`
    )}`
  }

  const updateMap = () => { feImageRef.current?.setAttribute('href', generateDisplacementMap()) }

  useEffect(() => { updateMap(); [redChannelRef, greenChannelRef, blueChannelRef].forEach((ref, i) => {
    const offset = [redOffset, greenOffset, blueOffset][i]
    if (ref.current) { ref.current.setAttribute('scale', (distortionScale + offset).toString()); ref.current.setAttribute('xChannelSelector', xChannel); ref.current.setAttribute('yChannelSelector', yChannel) }
  }); gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString()) }, [width, height, borderRadius, borderWidth, brightness, opacity, blur, displace, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(() => setTimeout(updateMap, 0))
    ro.observe(containerRef.current); return () => ro.disconnect()
  }, [])

  useEffect(() => { setTimeout(updateMap, 0) }, [width, height])

  useEffect(() => {
    const supported = typeof document !== 'undefined' && (() => {
      const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
      const isFirefox = /Firefox/.test(navigator.userAgent)
      return !isWebkit && !isFirefox
    })()
    setSvgSupported(supported)
  }, [])

  return (
    <div ref={containerRef} className={`glass-surface${svgSupported ? ' glass-surface--svg' : ' glass-surface--fallback'}${className ? ' ' + className : ''}`} style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height, borderRadius: `${borderRadius}px`, '--glass-frost': backgroundOpacity, '--glass-saturation': saturation, '--filter-id': `url(#${filterId})`, ...style }}>
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs><filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
          <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
          <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
          <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
          <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
          <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
          <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="out" />
          <feGaussianBlur ref={gaussianBlurRef} in="out" stdDeviation="0.7" />
        </filter></defs>
      </svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  )
}
