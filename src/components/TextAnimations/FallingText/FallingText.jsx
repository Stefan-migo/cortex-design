import { useRef, useEffect, useMemo, useCallback, useState } from 'react'
import './FallingText.css'

/* ponytail: ~55 lines for a physics simulation — deliberately minimal.
   Ceiling: no Matter.js, no collision detection, no floor stacking. Words
   stop at a fixed Y threshold (500px) with no accumulation physics (no
   word-on-word piling). No drag, no air resistance.
   Upgrade: add elastic collision with floor bounds for natural stacking,
   or swap in Matter.js with trigger: 'click'. */
export function FallingText({
  text = '',
  trigger = 'click',
  gravity = 0.5,
  className = '',
}) {
  const containerRef = useRef(null)
  const [fallen, setFallen] = useState(false)
  const rafRef = useRef(null)

  const words = useMemo(() => {
    if (typeof text !== 'string') return []
    /* ponytail: split preserving spaces — empty tokens filtered.
       Ceiling: no custom delimiter support.
       Upgrade: accept delimiter regex as prop. */
    return text.split(/(\s+)/).filter(Boolean)
  }, [text])

  const triggerFall = useCallback(() => {
    if (fallen) return
    setFallen(true)

    const container = containerRef.current
    if (!container) return

    /* ponytail: one-shot particle init — positions captured at trigger time.
       Ceiling: no dynamic spawning, no word fragmentation into chars.
       Upgrade: per-character particles for a more granular scatter. */
    const spans = container.querySelectorAll('.ft-word')
    const particles = Array.from(spans).map((span) => ({
      el: span,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 6,
      vy: -(Math.random() * 4 + 2),
      rotation: 0,
      rotV: (Math.random() - 0.5) * 8,
      stopped: false,
    }))

    const loop = () => {
      let moving = false
      for (const p of particles) {
        if (p.stopped) continue
        p.vy += gravity
        p.y += p.vy
        p.x += p.vx
        p.rotation += p.rotV

        /* ponytail: flat Y ceiling at 500px — no floor collision, no bounce.
           Ceiling: words stack at the same Y, overlapping.
           Upgrade: track floor per word, apply elastic collision. */
        if (p.y > 500) {
          p.stopped = true
          p.y = 500
          continue
        }

        p.el.style.transform =
          `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`
        moving = true
      }

      if (moving) {
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    requestAnimationFrame(loop)
  }, [fallen, gravity])

  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(triggerFall, 500)
      return () => clearTimeout(timer)
    }
  }, [trigger, triggerFall])

  useEffect(() => {
    if (trigger !== 'scroll') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerFall()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    const el = containerRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [trigger, triggerFall])

  /* ponytail: cleanup RAF on unmount — no leaks.
     Ceiling: no pause/resume for visibility changes.
     Upgrade: add visibilitychange handler to pause RAF when tab hidden. */
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`falling-text${className ? ' ' + className : ''}`}
      onClick={trigger === 'click' ? triggerFall : undefined}
      style={{ cursor: trigger === 'click' ? 'pointer' : undefined }}
    >
      {words.map((word, i) => (
        <span key={i} className="ft-word">
          {word}
        </span>
      ))}
    </div>
  )
}
