import { useState, useEffect } from 'react'
import './Stack.css'

export function Stack({ randomRotation = false, sensitivity = 200, cards = [], sendToBackOnClick = false, autoplay = false, autoplayDelay = 3000, className = '' }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i))
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (autoplay && cards.length > 1 && !isPaused) {
      const interval = setInterval(() => setOrder(prev => { const n = [...prev]; const c = n.pop(); if (c !== undefined) n.unshift(c); return n }), autoplayDelay)
      return () => clearInterval(interval)
    }
  }, [autoplay, autoplayDelay, cards.length, isPaused])

  const sendToBack = (id) => setOrder(prev => { const n = [...prev]; const idx = n.indexOf(id); if (idx > -1) { const [c] = n.splice(idx, 1); n.unshift(c) }; return n })

  return (
    <div className={`stack${className ? ' ' + className : ''}`} style={{ position: 'relative', width: '300px', height: '350px', margin: '0 auto' }}
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {[...order].reverse().map((cardIdx, i) => (
        <div key={cardIdx} onClick={() => sendToBack(cardIdx)} style={{
          position: 'absolute', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
          transform: `rotate(${(order.length - 1 - i) * 4 + (randomRotation ? Math.random() * 10 - 5 : 0)}deg) scale(${1 + i * 0.06 - order.length * 0.06})`,
          transformOrigin: '90% 90%', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          zIndex: order.length - i, boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          {cards[cardIdx]}
        </div>
      ))}
    </div>
  )
}
