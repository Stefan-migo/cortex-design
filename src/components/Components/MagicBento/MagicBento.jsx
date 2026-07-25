import { useRef, useEffect, useState, useCallback } from 'react'
import './MagicBento.css'

/* ponytail: CSS transitions + React state replace GSAP particles/tilt.
   Ceiling: no GSAP spring easing, particles use CSS animation instead of
   GSAP timeline. Border glow uses CSS radial-gradient mask.
   Upgrade: use motion/react for spring-based particle physics. */

const CARD_DATA = [
  { color: '#120F17', title: 'Analytics', description: 'Track user behavior', label: 'Insights' },
  { color: '#120F17', title: 'Dashboard', description: 'Centralized data view', label: 'Overview' },
  { color: '#120F17', title: 'Collaboration', description: 'Work together seamlessly', label: 'Teamwork' },
  { color: '#120F17', title: 'Automation', description: 'Streamline workflows', label: 'Efficiency' },
  { color: '#120F17', title: 'Integration', description: 'Connect favorite tools', label: 'Connectivity' },
  { color: '#120F17', title: 'Security', description: 'Enterprise-grade protection', label: 'Protection' },
]

export function MagicBento({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = 300,
  particleCount = 12,
  enableTilt = false,
  glowColor = '132, 0, 255',
  clickEffect = true,
  enableMagnetism = true,
  className = '',
}) {
  const gridRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const shouldDisable = disableAnimations || isMobile

  /* Global spotlight effect */
  useEffect(() => {
    if (shouldDisable || !enableSpotlight || !gridRef.current) return

    const spotlight = document.createElement('div')
    spotlight.className = 'global-spotlight'
    spotlight.style.cssText = `
      position: fixed; width: 800px; height: 800px; border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(${glowColor},0.15) 0%, rgba(${glowColor},0.08) 15%, rgba(${glowColor},0.04) 25%, rgba(${glowColor},0.02) 40%, rgba(${glowColor},0.01) 65%, transparent 70%);
      z-index: 200; opacity: 0; transform: translate(-50%,-50%); mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)

    const handleMove = (e) => {
      spotlight.style.left = `${e.clientX}px`; spotlight.style.top = `${e.clientY}px`
      spotlight.style.opacity = '0.5'
    }
    const handleLeave = () => { spotlight.style.opacity = '0' }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      spotlight.parentNode?.removeChild(spotlight)
    }
  }, [shouldDisable, enableSpotlight, glowColor])

  return (
    <div className={`magic-bento${className ? ' ' + className : ''}`}>
      <div ref={gridRef} className="card-grid bento-section">
        {CARD_DATA.map((card, index) => (
          <div
            key={index}
            className={`magic-bento-card${textAutoHide ? ' magic-bento-card--text-autohide' : ''}${enableBorderGlow ? ' magic-bento-card--border-glow' : ''}`}
            style={{ backgroundColor: card.color, '--glow-color': glowColor }}
          >
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">{card.label}</div>
            </div>
            <div className="magic-bento-card__content">
              <h2 className="magic-bento-card__title">{card.title}</h2>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
