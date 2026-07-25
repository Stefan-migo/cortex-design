import { useState, useRef, useEffect } from 'react'
import './BubbleMenu.css'

/* ponytail: CSS transitions + React state replace GSAP timeline.
   Ceiling: no spring easing on bubble scale-in (replaced by CSS ease-back),
   no random stagger variance, no gsap.utils.random for phase offsets.
   Resize restores rotation via re-render instead of gsap.set.
   Upgrade: use motion/react for spring entrance with per-item random delays. */

const DEFAULT_ITEMS = [
  { label: 'home', href: '#', ariaLabel: 'Home', rotation: -8, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
  { label: 'about', href: '#', ariaLabel: 'About', rotation: 8, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
  { label: 'projects', href: '#', ariaLabel: 'Projects', rotation: 8, hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
  { label: 'blog', href: '#', ariaLabel: 'Blog', rotation: 8, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
  { label: 'contact', href: '#', ariaLabel: 'Contact', rotation: -8, hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } },
]

export function BubbleMenu({
  logo,
  onMenuClick,
  className = '',
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  items,
  animationDuration = 0.5,
  staggerDelay = 0.12,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const overlayRef = useRef(null)

  const menuItems = items?.length ? items : DEFAULT_ITEMS

  const containerClass = [
    'bubble-menu',
    useFixedPosition ? 'bubble-menu--fixed' : 'bubble-menu--absolute',
    className,
  ].filter(Boolean).join(' ')

  const handleToggle = () => {
    const nextState = !isMenuOpen
    if (nextState) setShowOverlay(true)
    setIsMenuOpen(nextState)
    onMenuClick?.(nextState)
  }

  const handleTransitionEnd = () => {
    if (!isMenuOpen && showOverlay) {
      setShowOverlay(false)
    }
  }

  /* ponytail: Re-render on resize to reapply rotations — no gsap.set.
     Ceiling: causes re-render on every resize event.
     Upgrade: apply rotations via CSS custom property + media query. */
  const [, forceRender] = useState(0)
  useEffect(() => {
    const handleResize = () => forceRender((n) => n + 1)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <nav className={containerClass} style={style} aria-label="Main navigation">
        <div className="bubble-menu__bubble bubble-menu__bubble--logo" aria-label="Logo" style={{ background: menuBg }}>
          <span className="bubble-menu__logo-content">
            {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-menu__logo-img" /> : logo}
          </span>
        </div>

        <button
          type="button"
          className={`bubble-menu__bubble bubble-menu__bubble--toggle${isMenuOpen ? ' bubble-menu__bubble--open' : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span className="bubble-menu__line" style={{ background: menuContentColor }} />
          <span className="bubble-menu__line bubble-menu__line--short" style={{ background: menuContentColor }} />
        </button>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu__overlay${useFixedPosition ? ' bubble-menu__overlay--fixed' : ' bubble-menu__overlay--absolute'}${isMenuOpen ? ' bubble-menu__overlay--visible' : ''}`}
          aria-hidden={!isMenuOpen}
          onTransitionEnd={handleTransitionEnd}
        >
          <ul className="bubble-menu__pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="bubble-menu__pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className={`bubble-menu__pill-link${isMenuOpen ? ' bubble-menu__pill-link--visible' : ''}`}
                  style={{
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--pill-bg': menuBg,
                    '--pill-color': menuContentColor,
                    '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                    '--hover-color': item.hoverStyles?.textColor || menuContentColor,
                    '--stagger-i': idx,
                    transitionDelay: isMenuOpen ? `${idx * staggerDelay}s` : '0s',
                  }}
                >
                  <span className="bubble-menu__pill-label">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
