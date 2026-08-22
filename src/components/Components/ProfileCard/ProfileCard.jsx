import { useEffect, useRef, useCallback, useMemo } from 'react'
import './ProfileCard.css'

/* ponytail: RAF tilt engine with exponential smoothing — no GSAP.
   Ceiling: tilt uses JS RAF loop instead of GPU transfer.
   Upgrade: use motion/react for spring-based tilt interpolation. */

/* ponytail (HLP-002): kept local — this clamp relies on default bounds 0/100 for
   bare calls (`clamp(x)`), which the DomeGallery variant does NOT share. A shared
   clamp with either default set would change one consumer. */
const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max)
const round = (v, p = 3) => parseFloat(v.toFixed(p))
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin))

export function ProfileCard({
  avatarUrl, iconUrl, grainUrl, innerGradient, behindGlowEnabled = true, behindGlowColor, behindGlowSize,
  className = '', enableTilt = true, name = 'Javi A. Torres', title = 'Software Engineer', handle = 'javicodes',
  status = 'Online', contactText = 'Contact', showUserInfo = true, onContactClick,
}) {
  const wrapRef = useRef(null); const shellRef = useRef(null)
  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null
    let rafId = null; let running = false; let lastTs = 0; let cx = 0; let cy = 0; let tx = 0; let ty = 0
    const setVars = (x, y) => {
      const shell = shellRef.current; const wrap = wrapRef.current; if (!shell || !wrap) return
      const w = shell.clientWidth || 1; const h = shell.clientHeight || 1
      const px = clamp((100 / w) * x); const py = clamp((100 / h) * y)
      wrap.style.setProperty('--pointer-x', `${px}%`); wrap.style.setProperty('--pointer-y', `${py}%`)
      wrap.style.setProperty('--background-x', `${adjust(px, 0, 100, 35, 65)}%`); wrap.style.setProperty('--background-y', `${adjust(py, 0, 100, 35, 65)}%`)
      wrap.style.setProperty('--rotate-x', `${round(-(px - 50) / 5)}deg`); wrap.style.setProperty('--rotate-y', `${round((py - 50) / 4)}deg`)
    }
    const step = (ts) => {
      if (!running) return; if (lastTs === 0) lastTs = ts; const dt = (ts - lastTs) / 1000; lastTs = ts
      const k = 1 - Math.exp(-dt / 0.14); cx += (tx - cx) * k; cy += (ty - cy) * k; setVars(cx, cy)
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) rafId = requestAnimationFrame(step)
      else { running = false; lastTs = 0; if (rafId) { cancelAnimationFrame(rafId); rafId = null } }
    }
    return {
      setImmediate(x, y) { cx = x; cy = y; setVars(cx, cy) },
      setTarget(x, y) { tx = x; ty = y; if (!running) { running = true; lastTs = 0; rafId = requestAnimationFrame(step) } },
      toCenter() { const s = shellRef.current; if (s) this.setTarget(s.clientWidth / 2, s.clientHeight / 2) },
      cancel() { if (rafId) cancelAnimationFrame(rafId); rafId = null; running = false; lastTs = 0 },
    }
  }, [enableTilt])

  const handleMove = useCallback((e) => { const s = shellRef.current; if (!s || !tiltEngine) return; const r = s.getBoundingClientRect(); tiltEngine.setTarget(e.clientX - r.left, e.clientY - r.top) }, [tiltEngine])
  const handleLeave = useCallback(() => { tiltEngine?.toCenter() }, [tiltEngine])

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return; const s = shellRef.current; if (!s) return
    s.addEventListener('pointerenter', handleMove); s.addEventListener('pointermove', handleMove); s.addEventListener('pointerleave', handleLeave)
    const ix = (s.clientWidth || 0) - 70; const iy = 60; tiltEngine.setImmediate(ix, iy)
    setTimeout(() => tiltEngine.toCenter(), 100)
    return () => { s.removeEventListener('pointerenter', handleMove); s.removeEventListener('pointermove', handleMove); s.removeEventListener('pointerleave', handleLeave); tiltEngine.cancel() }
  }, [enableTilt, tiltEngine, handleMove, handleLeave])

  return (
    <div ref={wrapRef} className={`profile-card${className ? ' ' + className : ''}`} style={{ '--icon': iconUrl ? `url(${iconUrl})` : 'none', '--grain': grainUrl ? `url(${grainUrl})` : 'none', '--inner-gradient': innerGradient || 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)', '--behind-glow-color': behindGlowColor || 'rgba(125,190,255,0.67)', '--behind-glow-size': behindGlowSize || '50%' }}>
      {behindGlowEnabled && <div className="profile-card__glow" />}
      <div ref={shellRef} className="profile-card__shell">
        <section className="profile-card__inner">
          <div className="profile-card__shine" />
          <div className="profile-card__content">
            <img className="profile-card__avatar" src={avatarUrl} alt={`${name} avatar`} loading="lazy" onError={e => { e.target.style.display = 'none' }} />
            {showUserInfo && (
              <div className="profile-card__info">
                <div className="profile-card__meta">
                  <div className="profile-card__mini-avatar"><img src={avatarUrl} alt="" loading="lazy" /></div>
                  <div><div className="profile-card__handle">@{handle}</div><div className="profile-card__status">{status}</div></div>
                </div>
                <button className="profile-card__contact" onClick={onContactClick} type="button">{contactText}</button>
              </div>
            )}
          </div>
          <div className="profile-card__details"><h3>{name}</h3><p>{title}</p></div>
        </section>
      </div>
    </div>
  )
}
