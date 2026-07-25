import { useEffect, useRef, useState } from 'react'
import './ReflectiveCard.css'

/* ponytail: Webcam + SVG filter reflective card — kept because webcam and SVG
   filters are the core. Replaces lucide-react with inline SVGs.
   Ceiling: requires webcam permission.
   Upgrade: WebGL reflection for higher quality. */

const LockIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const ActivityIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
const FingerprintIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 0-10 10v0a10 10 0 0 0 10 10"/><path d="M12 6a6 6 0 0 0-6 6v0a6 6 0 0 0 6 6"/><path d="M12 10a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2"/></svg>

export function ReflectiveCard({
  blurStrength = 12, color = 'white', overlayColor = 'rgba(255,255,255,0.1)', noiseScale = 1,
  displacementStrength = 20, specularConstant = 1.2, grayscale = 1, className = '', style = {},
}) {
  const videoRef = useRef(null); const [streamActive, setStreamActive] = useState(false)
  useEffect(() => {
    let stream = null; let mounted = true
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } })
      .then(s => { if (!mounted) { s.getTracks().forEach(t => t.stop()); return }; stream = s; if (videoRef.current) { videoRef.current.srcObject = s; setStreamActive(true) } })
      .catch(() => {})
    return () => { mounted = false; if (stream) stream.getTracks().forEach(t => t.stop()) }
  }, [])

  const bf = 0.03 / Math.max(0.1, noiseScale); const sat = 1 - Math.max(0, Math.min(1, grayscale))

  return (
    <div className={`reflective-card${className ? ' ' + className : ''}`} style={{ ...style, '--blur': `${blurStrength}px`, '--overlay': overlayColor, '--text-color': color, '--saturation': sat }}>
      <video ref={videoRef} autoPlay playsInline muted className="reflective-card__video" />
      <div className="reflective-card__noise" />
      <div className="reflective-card__sheen" />
      <div className="reflective-card__content">
        <div className="reflective-card__header"><div className="reflective-card__badge"><LockIcon /><span>SECURE ACCESS</span></div><ActivityIcon /></div>
        <div className="reflective-card__body"><h2>ALEXANDER DOE</h2><p>SENIOR DEVELOPER</p></div>
        <div className="reflective-card__footer"><div><span className="reflective-card__label">ID NUMBER</span><span className="reflective-card__value">8901-2345-6789</span></div><FingerprintIcon /></div>
      </div>
    </div>
  )
}
