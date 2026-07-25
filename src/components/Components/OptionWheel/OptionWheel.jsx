import { useRef, useState, useCallback, useEffect } from 'react'
import './OptionWheel.css'

/* ponytail: RAF-driven wheel with exponential smoothing. Pure React, no GSAP.
   Ceiling: no spring physics, no inertia scrolling.
   Upgrade: use motion/react for spring-based momentum scrolling. */

const DEFAULT_ITEMS = ['Ambient', 'House', 'Techno', 'Jazz', 'Lo-Fi', 'Synthwave', 'Trance', 'Funk', 'Disco', 'Hip-Hop', 'Chillwave', 'Drum & Bass']

export function OptionWheel({
  items = DEFAULT_ITEMS, defaultSelected = 3, onChange, textColor = '#a6a6a6', activeColor = '#ffffff',
  side = 'left', fontSize = 3, spacing = 1.4, curve = 1, tilt = 6, blurAmt = 2, fade = 0.25, minOpacity = 0.05,
  smoothing = 200, inset = 80, loop = false, draggable = true, className = '',
}) {
  const rootRef = useRef(null); const itemRefs = useRef([])
  const posRef = useRef(defaultSelected); const targetRef = useRef(defaultSelected)
  const rafRef = useRef(null); const lastRef = useRef(0)
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef(null); const dragMovedRef = useRef(false)
  const remPx = typeof window !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 : 16

  const runFrame = useCallback((now) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05); lastRef.current = now
    const k = 1 - Math.exp(-dt / (Math.max(smoothing, 1) / 1000))
    const target = targetRef.current; const cur = posRef.current; let next = cur + (target - cur) * k
    if (Math.abs(target - next) < 0.001) next = target
    posRef.current = next
    const tiltRad = (tilt * Math.PI) / 180; const R = tiltRad > 0.0005 ? (fontSize * spacing * remPx) / tiltRad : 0
    const mirror = side === 'right' ? -1 : 1
    for (let i = 0; i < items.length; i++) {
      const el = itemRefs.current[i]; if (!el) continue
      let d = i - next
      if (loop && items.length > 1) { d = ((d % items.length) + items.length) % items.length; if (d > items.length / 2) d -= items.length }
      const dist = Math.abs(d)
      let x = 0; let y = d * fontSize * spacing * remPx; let rot = 0
      if (R > 0) { const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad)); y = R * Math.sin(ang); x = -mirror * R * (1 - Math.cos(ang)) * curve; rot = (mirror * ang * 180) / Math.PI }
      el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`
      el.style.opacity = String(Math.max(minOpacity, 1 - dist * fade))
      el.style.filter = blurAmt > 0 ? `blur(${(dist * blurAmt).toFixed(2)}px)` : 'none'
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4))
    }
    rafRef.current = Math.abs(target - next) > 0.001 ? requestAnimationFrame(runFrame) : null
  }, [items, fontSize, spacing, smoothing, tilt, side, curve, fade, minOpacity, blurAmt, loop, remPx])

  const startLoop = useCallback(() => { if (rafRef.current == null) { lastRef.current = performance.now(); rafRef.current = requestAnimationFrame(runFrame) } }, [runFrame])

  const applyTarget = useCallback((value, snap) => {
    let v = value; if (!loop) v = Math.min(Math.max(v, 0), Math.max(items.length - 1, 0))
    if (snap) v = Math.round(v); targetRef.current = v
    const idx = ((Math.round(v) % items.length) + items.length) % items.length
    if (idx !== selectedIndex) { setSelectedIndex(idx); onChange?.(idx, items[idx]) }
    startLoop()
  }, [items, loop, selectedIndex, onChange, startLoop])

  useEffect(() => {
    const el = rootRef.current; if (!el) return
    const onWheel = (e) => { e.preventDefault(); const step = Math.max(-1, Math.min(1, e.deltaY / (fontSize * spacing * remPx))); applyTarget(targetRef.current + step, false) }
    el.addEventListener('wheel', onWheel, { passive: false }); return () => el.removeEventListener('wheel', onWheel)
  }, [applyTarget, fontSize, spacing, remPx])

  const handlePointerDown = useCallback((e) => { if (!draggable) return; dragRef.current = { y: e.clientY, start: targetRef.current }; dragMovedRef.current = false; setIsDragging(true) }, [draggable])
  const handlePointerMove = useCallback((e) => {
    const drag = dragRef.current; if (!drag) return; const dy = e.clientY - drag.y
    if (!dragMovedRef.current && Math.abs(dy) > 4) { dragMovedRef.current = true; rootRef.current?.setPointerCapture(drag.id) }
    if (dragMovedRef.current) applyTarget(drag.start - dy / (fontSize * spacing * remPx), false)
  }, [applyTarget, fontSize, spacing, remPx])
  const handlePointerEnd = useCallback(() => { if (!dragRef.current) return; dragRef.current = null; setIsDragging(false); if (dragMovedRef.current) applyTarget(targetRef.current, true) }, [applyTarget])

  useEffect(() => { applyTarget(targetRef.current, false) }, [items, fontSize, spacing, curve, tilt, blurAmt, fade, minOpacity, side, loop, smoothing])
  useEffect(() => () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current) }, [])

  return (
    <div ref={rootRef} role="listbox" tabIndex={0} aria-label="Option wheel" className={`option-wheel${side === 'right' ? ' option-wheel--right' : ''}${isDragging ? ' option-wheel--dragging' : ''}${className ? ' ' + className : ''}`} style={{ '--ow-text-color': textColor, '--ow-active-color': activeColor, '--ow-font-size': `${fontSize}rem`, '--ow-inset': `${inset}px` }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
      {items.map((label, index) => (
        <div key={`${label}-${index}`} ref={el => { itemRefs.current[index] = el }} role="option" aria-selected={selectedIndex === index} className={`option-wheel__item${selectedIndex === index ? ' option-wheel__item--selected' : ''}`} onClick={() => { if (!dragMovedRef.current) { let d = index - (((targetRef.current % items.length) + items.length) % items.length); if (loop && items.length > 1) { if (d > items.length / 2) d -= items.length; else if (d < -items.length / 2) d += items.length } applyTarget(targetRef.current + d, true) } }}>
          {label}
        </div>
      ))}
    </div>
  )
}
