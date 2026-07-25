import { useState, useCallback, useRef, useEffect } from 'react'
import './StaggeredMenu.css'

export function StaggeredMenu({
  position = 'right', colors = ['#B497CF', '#5227FF'], items = [], socialItems = [],
  displaySocials = true, displayItemNumbering = true, className = '', logoUrl = '',
  menuButtonColor = '#fff', accentColor = '#5227FF', isFixed = false, onMenuOpen, onMenuClose,
}) {
  const [open, setOpen] = useState(false); const panelRef = useRef(null); const btnRef = useRef(null)

  const toggle = useCallback(() => {
    setOpen(prev => { const next = !prev; if (next) onMenuOpen?.(); else onMenuClose?.(); return next })
  }, [onMenuOpen, onMenuClose])

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (panelRef.current && !panelRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className={`staggered-menu${className ? ' ' + className : ''}${isFixed ? ' staggered-menu--fixed' : ''}`} data-position={position} style={{ '--sm-accent': accentColor }}>
      <div className="staggered-menu__layers" aria-hidden="true">
        {colors.slice(0, 3).map((c, i) => <div key={i} className="staggered-menu__layer" style={{ background: c }} />)}
      </div>
      <header className="staggered-menu__header">
        {logoUrl && <div className="staggered-menu__logo"><img src={logoUrl} alt="Logo" width={110} height={24} /></div>}
        <button ref={btnRef} className={`staggered-menu__toggle${open ? ' staggered-menu__toggle--open' : ''}`} aria-label={open ? 'Close' : 'Menu'} onClick={toggle} style={{ color: menuButtonColor }}>
          <span className="staggered-menu__icon"><span /><span /></span>
        </button>
      </header>
      <aside ref={panelRef} className={`staggered-menu__panel${open ? ' staggered-menu__panel--open' : ''}`} aria-hidden={!open}>
        <div className="staggered-menu__inner">
          <ul className="staggered-menu__list" data-numbering={displayItemNumbering || undefined}>
            {items.map((it, idx) => (
              <li key={it.label + idx} className="staggered-menu__item" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <a href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}><span>{it.label}</span></a>
              </li>
            ))}
          </ul>
          {displaySocials && socialItems.length > 0 && (
            <div className="staggered-menu__socials"><h3>Socials</h3>
              <ul>{socialItems.map((s, i) => <li key={s.label + i}><a href={s.link} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
