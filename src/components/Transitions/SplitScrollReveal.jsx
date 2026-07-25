import { useState, useEffect } from 'react'
import './SplitScrollReveal.css'

/* ponytail: phase-driven auto-play animation.
   Two panels slide apart (left ↓, right ↑) revealing images behind.
   No scroll dependency — works standalone. */
export function SplitScrollReveal({
  cards = [
    {
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200',
      title: 'The Symphony of Dance',
    },
    {
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200',
      title: 'Stand Up',
    },
  ],
  panelColor = '#f6f5ef',
  accentColor = '#C8102E',
  autoPlay = true,
  delay = 300,
  /* panelLeft / panelRight: contenido personalizado para cada panel.
     Si se omite, usa cards[0/1].title como texto simple. */
  panelLeft,
  panelRight,
}) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!autoPlay) return
    const t = setTimeout(() => setPhase(1), delay)
    return () => clearTimeout(t)
  }, [autoPlay, delay])

  const cls = [
    'ssr',
    phase >= 1 && 'ssr--revealed',
  ].filter(Boolean).join(' ')

  return (
    <div className={cls} style={{ '--ssr-panel': panelColor, '--ssr-accent': accentColor }}>
      {/* Imágenes de fondo */}
      {cards.slice(0, 2).map((card, i) => (
        <img
          key={i}
          className="ssr-image"
          src={card.image}
          alt={card.title}
          loading="lazy"
          data-side={i === 0 ? 'left' : 'right'}
        />
      ))}

      {/* Paneles overlay */}
      <div className="ssr-panel ssr-panel--left">
        {panelLeft || <span className="ssr-panel__title">{cards[0]?.title}</span>}
      </div>

      <div className="ssr-panel ssr-panel--right">
        {panelRight || <span className="ssr-panel__title">{cards[1]?.title}</span>}
      </div>
    </div>
  )
}
