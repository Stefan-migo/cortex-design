import { useRef, useState } from 'react'
import './TiltedCard.css'

export function TiltedCard({
  imageSrc, altText = 'Tilted card', captionText = '',
  containerHeight = '300px', containerWidth = '100%',
  imageHeight = '300px', imageWidth = '300px',
  scaleOnHover = 1.1, rotateAmplitude = 14,
  showTooltip = true, overlayContent = null, displayOverlayContent = false,
  className = '',
}) {
  const ref = useRef(null); const [style, setStyle] = useState({}); const [isHovered, setIsHovered] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const lastY = useRef(0)

  const handleMove = (e) => {
    if (!ref.current) return; const rect = ref.current.getBoundingClientRect()
    const ox = e.clientX - rect.left - rect.width / 2; const oy = e.clientY - rect.top - rect.height / 2
    const rx = (oy / (rect.height / 2)) * -rotateAmplitude; const ry = (ox / (rect.width / 2)) * rotateAmplitude
    setStyle({ transform: `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scaleOnHover},${scaleOnHover},${scaleOnHover})`, transition: 'transform 0.1s ease' })
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    lastY.current = oy
  }

  return (
    <figure ref={ref} className={`tilted-card${className ? ' ' + className : ''}`} style={{ height: containerHeight, width: containerWidth, perspective: '600px' }}
      onMouseMove={handleMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setStyle({ transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)', transition: 'transform 0.5s ease' }) }}>
      <div className="tilted-card__inner" style={{ width: imageWidth, height: imageHeight, borderRadius: '12px', overflow: 'hidden', ...style }}>
        <img src={imageSrc} alt={altText} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {displayOverlayContent && overlayContent && <div className="tilted-card__overlay" style={{ position: 'absolute', inset: 0 }}>{overlayContent}</div>}
      </div>
      {showTooltip && isHovered && (
        <figcaption className="tilted-card__caption" style={{ position: 'absolute', left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px`, transform: 'translate(-50%, -120%)', padding: '4px 12px', background: '#120F17', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '14px', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          {captionText}
        </figcaption>
      )}
    </figure>
  )
}
