import { useEffect, useRef, useCallback, useState } from 'react'

export function ScrollStack({ children, className = '' }) {
  const scrollerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current; if (!el) return
    const handler = () => setScrollY(el.scrollTop)
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  const cards = Array.isArray(children) ? children : [children]

  return (
    <div ref={scrollerRef} className={`scroll-stack${className ? ' ' + className : ''}`} style={{ height: '500px', overflowY: 'auto', position: 'relative' }}>
      {cards.map((card, i) => (
        <div key={i} style={{ position: 'sticky', top: `${i * 20}px`, padding: '20px', margin: '0 0 20px 0', background: '#1a1a2e', borderRadius: '12px', border: '1px solid #333', transition: 'transform 0.3s ease, opacity 0.3s ease', transform: `scale(${1 - i * 0.03})`, opacity: Math.max(0.3, 1 - i * 0.1) }}>
          {card}
        </div>
      ))}
    </div>
  )
}
