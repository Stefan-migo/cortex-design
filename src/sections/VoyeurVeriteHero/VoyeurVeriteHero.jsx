import { useRef, useState, useEffect } from 'react'
import './VoyeurVeriteHero.css'

function ease(t) { return t * t * (3 - 2 * t) }

export function VoyeurVeriteHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    const handler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking = false
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const vh = typeof window !== 'undefined' ? window.innerHeight : 900
  const p = Math.min(1, scrollY / (vh * 2))

  const s1 = 1 - ease(Math.min(1, p * 3))
  const s2in = ease(Math.max(0, Math.min(1, (p - 0.2) * 5)))
  const s2out = 1 - ease(Math.max(0, Math.min(1, (p - 0.45) * 5)))
  const s2 = Math.min(s2in, s2out)
  const s3 = ease(Math.max(0, Math.min(1, (p - 0.6) * 4)))
  const d = ease(Math.max(0, Math.min(1, (p - 0.2) * 3.5)))

  return (
    <div className="vvh-root">
      {/* Debug */}
      <div className="vvh-debug">Hero ✓ scrollY: {scrollY} p: {p.toFixed(2)}</div>

      {/* ═══ STAGE 1 — Hero ═══ */}
      <section className="vvh-hero" style={{ opacity: s1 }}>
        <nav className="vvh-nav">
          <span>About</span>
          <span>Pillars</span>
          <span className="vvh-nav__sep">|</span>
          <span className="vvh-nav__logo">Voyeur Vérité</span>
          <span className="vvh-nav__sep">|</span>
          <span>Lineage</span>
          <span>Shots</span>
        </nav>
        <div className="vvh-hero-inner">
          <h1 className="vvh-title">THE ART OF OBSERVATION</h1>
        </div>
      </section>

      {/* ═══ STAGE 2 — Definition ═══ */}
      <section className="vvh-def-section" style={{ opacity: s2 }}>
        <div className="vvh-def-wrap">
          <div className="vvh-def-col">
            <h2 className="vvh-def-label">Voyeur</h2>
            <p className="vvh-def-text">One who observes. To witness without interference. To see what others overlook. The discipline of looking — truly looking — at the world as it is.</p>
          </div>
          <div className="vvh-def-line" style={{
            transform: `rotate(${d * 90}deg) scaleY(${1 - d * 0.76}) scaleX(${1 - d * 0.8})`,
            background: d > 0.5 ? '#C8102E' : '#111'
          }} />
          <div className="vvh-def-col">
            <h2 className="vvh-def-label">Vérité</h2>
            <p className="vvh-def-text">Truth. Not capital-T Truth, but the small truths that accumulate into understanding. The honest frame. The unvarnished moment.</p>
          </div>
        </div>
      </section>

      {/* ═══ STAGE 3 — Split Cards ═══ */}
      <section className="vvh-split-section" style={{ opacity: s3, pointerEvents: s3 > 0.5 ? 'auto' : 'none' }}>
        <div className="vvh-split">
          <div className="vvh-card" style={{ background: 'linear-gradient(160deg, #1a0000, #4a001e)' }}>
            <div className="vvh-card-content">
              <span className="vvh-card-tag">Documentary</span>
              <h3>The Symphony of Dance</h3>
              <button>Explore</button>
            </div>
          </div>
          <div className="vvh-card" style={{ background: 'linear-gradient(160deg, #0d001a, #2d003d)' }}>
            <div className="vvh-card-content">
              <span className="vvh-card-tag">Portrait</span>
              <h3>Stand Up</h3>
              <button>Explore</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
