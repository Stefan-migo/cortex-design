import { useRef, useEffect, useState, useCallback } from 'react'
import './ChromaGrid.css'

/* ponytail: CSS mask radial-gradient + React state replace GSAP quickSetter.
   Ceiling: no lerp interpolation on spotlight position (CSS transitions
   approximate but cannot match GSAP's custom ease).
   Card mouse spotlight uses inline style updates instead of gsap.to.
   Upgrade: use motion/react for smooth gesture-driven spotlight. */

const DEMO_ITEMS = [
  { image: 'https://i.pravatar.cc/300?img=8', title: 'Alex Rivera', subtitle: 'Full Stack Developer', handle: '@alexrivera', borderColor: '#4F46E5', gradient: 'linear-gradient(145deg, #4F46E5, #000)', url: 'https://github.com/' },
  { image: 'https://i.pravatar.cc/300?img=11', title: 'Jordan Chen', subtitle: 'DevOps Engineer', handle: '@jordanchen', borderColor: '#10B981', gradient: 'linear-gradient(210deg, #10B981, #000)', url: 'https://linkedin.com/in/' },
  { image: 'https://i.pravatar.cc/300?img=3', title: 'Morgan Blake', subtitle: 'UI/UX Designer', handle: '@morganblake', borderColor: '#F59E0B', gradient: 'linear-gradient(165deg, #F59E0B, #000)', url: 'https://dribbble.com/' },
  { image: 'https://i.pravatar.cc/300?img=16', title: 'Casey Park', subtitle: 'Data Scientist', handle: '@caseypark', borderColor: '#EF4444', gradient: 'linear-gradient(195deg, #EF4444, #000)', url: 'https://kaggle.com/' },
  { image: 'https://i.pravatar.cc/300?img=25', title: 'Sam Kim', subtitle: 'Mobile Developer', handle: '@thesamkim', borderColor: '#8B5CF6', gradient: 'linear-gradient(225deg, #8B5CF6, #000)', url: 'https://github.com/' },
  { image: 'https://i.pravatar.cc/300?img=60', title: 'Tyler Rodriguez', subtitle: 'Cloud Architect', handle: '@tylerrod', borderColor: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4, #000)', url: 'https://aws.amazon.com/' },
]

export function ChromaGrid({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
}) {
  const rootRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [fadeOpacity, setFadeOpacity] = useState(1)
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  const data = items?.length ? items : DEMO_ITEMS

  /* Set initial center position */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const cx = width / 2
    const cy = height / 2
    currentRef.current = { x: cx, y: cy }
    targetRef.current = { x: cx, y: cy }
    setPos({ x: cx, y: cy })
  }, [])

  /* RAF loop for lerping spotlight position — replaces GSAP quickSetter */
  useEffect(() => {
    const frame = () => {
      const cur = currentRef.current
      const tgt = targetRef.current
      const dx = tgt.x - cur.x
      const dy = tgt.y - cur.y
      const ease = Math.min(1, damping * 0.1)

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        currentRef.current = {
          x: cur.x + dx * ease,
          y: cur.y + dy * ease,
        }
        setPos({ x: currentRef.current.x, y: currentRef.current.y })
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [damping])

  const handleMove = useCallback((e) => {
    const r = rootRef.current
    if (!r) return
    const rect = r.getBoundingClientRect()
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setFadeOpacity(0)
  }, [])

  const handleLeave = useCallback(() => {
    setFadeOpacity(1)
  }, [fadeOut])

  const handleCardClick = useCallback((url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const handleCardMove = useCallback((e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  return (
    <div
      ref={rootRef}
      className={`chroma-grid${className ? ' ' + className : ''}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows,
        '--x': `${pos.x}px`,
        '--y': `${pos.y}px`,
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-grid__card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: c.url ? 'pointer' : 'default',
          }}
        >
          <div className="chroma-grid__img-wrap">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-grid__info">
            <h3 className="chroma-grid__name">{c.title}</h3>
            {c.handle && <span className="chroma-grid__handle">{c.handle}</span>}
            <p className="chroma-grid__role">{c.subtitle}</p>
            {c.location && <span className="chroma-grid__location">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className="chroma-grid__overlay" />
      <div className="chroma-grid__fade" style={{ opacity: fadeOpacity, transition: `opacity ${fadeOut}s ease` }} />
    </div>
  )
}
