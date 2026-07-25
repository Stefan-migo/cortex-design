import { useRef, useState, useCallback, useEffect } from 'react'
import './PillNav.css'

/* ponytail: CSS transitions + React state replace GSAP timeline.
   Ceiling: hover circle uses CSS transform with transition instead of
   GSAP tweenTo/tweenFromTo. No initial load animation support.
   Upgrade: use motion/react for spring-based pill hover animation. */

export function PillNav({
  logo, logoAlt = 'Logo', items = [], activeHref, className = '',
  baseColor = '#fff', pillColor = '#120F17', hoveredPillTextColor = '#120F17', pillTextColor,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const resolvedPillTextColor = pillTextColor ?? baseColor

  const toggleMobile = useCallback(() => { setIsMobileMenuOpen(prev => !prev) }, [])

  return (
    <div className="pill-nav-container" style={{ zIndex: 99, position: 'relative' }}>
      <nav className={`pill-nav${className ? ' ' + className : ''}`} aria-label="Primary" style={{ '--base': baseColor, '--pill-bg': pillColor, '--hover-text': hoveredPillTextColor, '--pill-text': resolvedPillTextColor }}>
        <a className="pill-logo" href="#" aria-label="Home" style={{ background: baseColor }}>
          <img src={logo} alt={logoAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </a>
        <div className="pill-nav-items desktop-only">
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href} role="none">
                <a
                  href={item.href} role="menuitem"
                  className={`pill${activeHref === item.href ? ' is-active' : ''}${hoveredIdx === i ? ' pill--hovered' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ background: hoveredIdx === i ? baseColor : pillColor, color: hoveredIdx === i ? hoveredPillTextColor : resolvedPillTextColor, transition: 'background 0.3s ease, color 0.3s ease' }}
                >
                  <span className="label-stack"><span className="pill-label">{item.label}</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button className="mobile-menu-button mobile-only" onClick={toggleMobile} aria-label="Toggle menu" style={{ background: baseColor }}>
          <span className="hamburger-line" style={{ background: pillColor }} />
          <span className="hamburger-line" style={{ background: pillColor }} />
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="mobile-menu-popover mobile-only" style={{ visibility: 'visible', opacity: 1, background: baseColor }}>
          <ul className="mobile-menu-list">
            {items.map(item => (
              <li key={item.href}>
                <a href={item.href} className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`} style={{ background: pillColor, color: resolvedPillTextColor }} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
