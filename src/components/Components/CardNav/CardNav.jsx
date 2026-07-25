import { useLayoutEffect, useRef, useState } from 'react'
import './CardNav.css'

/* ponytail: CSS transitions + React state replace GSAP timeline.
   Ceiling: no spring easing, no stagger entry, height transition uses CSS
   instead of JS-driven tween (can't pause/resume mid-animation).
   Resize recalculates via re-render instead of gsap.set.
   Upgrade: use motion/react for spring-based expand with layout animation. */

function ArrowUpRightIcon() {
  return (
    <svg
      className="card-nav__link-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export function CardNav({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const navRef = useRef(null)
  const contentRef = useRef(null)

  const calculateHeight = () => {
    const contentEl = contentRef.current
    if (!contentEl) return 260
    const topBar = 60
    const padding = 16
    return topBar + contentEl.scrollHeight + padding
  }

  useLayoutEffect(() => {
    if (isExpanded) {
      setContentHeight(calculateHeight())
    } else {
      setContentHeight(60)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, items])

  /* ponytail: Re-measure on resize — no GSAP timeline to reapply.
     Ceiling: recalculates but doesn't interpolate, causing jump if content changed. */
  useLayoutEffect(() => {
    const handleResize = () => {
      if (isExpanded) {
        setContentHeight(calculateHeight())
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const toggleMenu = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMenu()
    }
  }

  return (
    <div className={`card-nav-container${className ? ' ' + className : ''}`}>
      <nav
        ref={navRef}
        className={`card-nav${isExpanded ? ' card-nav--open' : ''}`}
        style={{
          backgroundColor: baseColor,
          height: contentHeight ? `${contentHeight}px` : '60px',
          transition: 'height 0.4s ease',
        }}
      >
        <div className="card-nav__top">
          <div
            className={`card-nav__hamburger${isExpanded ? ' card-nav__hamburger--open' : ''}`}
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div className="card-nav__hamburger-line" />
            <div className="card-nav__hamburger-line" />
          </div>

          <div className="card-nav__logo-container">
            <img src={logo} alt={logoAlt} className="card-nav__logo" />
          </div>

          <button
            type="button"
            className="card-nav__cta"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Get Started
          </button>
        </div>

        <div
          ref={contentRef}
          className="card-nav__content"
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="card-nav__card"
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
                transitionDelay: `${idx * 0.08}s`,
              }}
            >
              <div className="card-nav__card-label">{item.label}</div>
              <div className="card-nav__card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="card-nav__link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <ArrowUpRightIcon />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
