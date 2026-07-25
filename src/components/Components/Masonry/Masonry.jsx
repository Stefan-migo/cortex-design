import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './Masonry.css'

/* ponytail: CSS transitions replace GSAP for position animation.
   Ceiling: no GSAP stagger/ease control for entry animation.
   Upgrade: use motion/react for spring layout transitions. */

function useMedia(queries, values, defaultValue) {
  const get = () => { if (typeof window === 'undefined') return defaultValue; const i = queries.findIndex(q => matchMedia(q).matches); return i >= 0 ? values[i] : defaultValue }
  const [v, setV] = useState(get)
  useEffect(() => { const h = () => setV(get); queries.forEach(q => matchMedia(q).addEventListener('change', h)); return () => queries.forEach(q => matchMedia(q).removeEventListener('change', h)) }, [])
  return v
}

function useMeasure() {
  const ref = useRef(null); const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    if (!ref.current) return; const ro = new ResizeObserver(([e]) => { const { width, height } = e.contentRect; setSize({ width, height }) })
    ro.observe(ref.current); return () => ro.disconnect()
  }, [])
  return [ref, size]
}

export function Masonry({
  items = [],
  duration = 0.6, stagger = 0.05, animateFrom = 'bottom', scaleOnHover = true, hoverScale = 0.95, className = '',
}) {
  const columns = useMedia(['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'], [5, 4, 3, 2], 1)
  const [containerRef, { width }] = useMeasure()

  const grid = useMemo(() => {
    if (!width) return []
    const colHeights = new Array(columns).fill(0); const colWidth = width / columns
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights)); const x = colWidth * col; const h = child.height / 2; const y = colHeights[col]
      colHeights[col] += h; return { ...child, x, y, w: colWidth, h }
    })
  }, [columns, items, width])

  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t) }, [grid])

  return (
    <div ref={containerRef} className="masonry" style={{ position: 'relative', width: '100%', minHeight: '400px' }}>
      {grid.map((item, i) => (
        <div
          key={item.id} data-key={item.id}
          className="masonry__item"
          style={{
            position: 'absolute', top: 0, left: 0, padding: '6px', cursor: 'pointer',
            transform: `translate(${item.x}px, ${item.y}px)`,
            width: item.w, height: item.h,
            opacity: mounted ? 1 : 0,
            transition: `transform ${duration}s ease, opacity ${duration}s ease ${i * stagger}s`,
          }}
          onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
        >
          <div className="masonry__img" style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', borderRadius: '10px', boxShadow: '0px 10px 50px -10px rgba(0,0,0,0.2)' }} />
        </div>
      ))}
    </div>
  )
}
