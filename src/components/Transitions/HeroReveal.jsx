import { useState, useEffect, useRef } from 'react'
import './HeroReveal.css'

/*
   HeroReveal — composición atómica secuencial.

     CR(1)  →  FXCR(1)  →  CR(2)  →  FXCR(2)+CR(3)  →  FXSR(1)  →  SR(2)
     fondo     cortinas     vector    shrink + texto    split     imágenes
     crema     cierran      vertical  llega simultáneo  paneles   reveladas
                                     → rota                        se deslizan
*/

export function HeroReveal({
  curtainColor = '#8b0000',
  accentColor = '#d11c1c',
  panelColor = '#f6f5ef',
  leftWord = 'Voyeur',
  rightWord = 'Vérité',
  leftDescription = 'TO EVOKE A SENSE OF CURIOSITY, FASCINATION OR DESIRE TO UNDERSTAND.',
  rightDescription = 'TO PROVIDE AN UNFILTERED AND GENUINE PORTRAYAL OF REALITY.',
  cards = [
    { image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200' },
    { image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200' },
  ],
}) {
  const [phase, setPhase] = useState(0)
  const curtainRef = useRef(null)
  const vectorRef = useRef(null)

  /* 0→1: trigger inicial */
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 100)
    return () => clearTimeout(t)
  }, [])

  /* helper: transitionend → avanza fase */
  const useWait = (ref, current, target, prop = 'transform') => {
    useEffect(() => {
      if (phase !== current) return
      const el = ref.current
      if (!el) return
      const handler = (e) => { if (e.propertyName === prop) setPhase(target) }
      const fallback = setTimeout(() => setPhase(target), 3000)
      el.addEventListener('transitionend', handler)
      return () => { el.removeEventListener('transitionend', handler); clearTimeout(fallback) }
    }, [phase, current, target, prop, ref])
  }

  /* 1→2: cortinas terminan → vector rota */
  useWait(curtainRef, 1, 2)

  /* 2→3: vector termina rotación → shrink + texto SIMULTÁNEO */
  useWait(vectorRef, 2, 3)

  /* 3→4: vector termina shrink → split reveal */
  useWait(vectorRef, 3, 4)

  const cls = ['hr', `hr--p${phase}`].join(' ')

  return (
    <div
      className={cls}
      style={{
        '--cr-curtain': curtainColor,
        '--cr-accent': accentColor,
        '--ssr-panel': panelColor,
      }}
    >
      {/* CR(1): fondo crema */}
      <div className="hr-bg" />

      {/* FXCR(1): cortinas */}
      <div ref={curtainRef} className="hr-curtain hr-curtain--left" />
      <div className="hr-curtain hr-curtain--right" />

      {/* CR(2): vector */}
      <div ref={vectorRef} className="hr-vector" />

      {/* FXCR(2) + CR(3) + FXSR(1): split panels con texto + imágenes */}
      <div className="hr-split">
        {cards.slice(0, 2).map((card, i) => (
          <img
            key={i}
            className="hr-split-img"
            src={card.image}
            alt=""
            loading="lazy"
            data-side={i === 0 ? 'left' : 'right'}
          />
        ))}

        <div className="hr-split-panel hr-split-panel--left">
          <div className="hr-panel-content">
            <h1 className="hr-panel-word">{leftWord}</h1>
            <p className="hr-panel-desc">{leftDescription}</p>
          </div>
        </div>

        <div className="hr-split-panel hr-split-panel--right">
          <div className="hr-panel-content hr-panel-content--right">
            <h1 className="hr-panel-word">{rightWord}</h1>
            <p className="hr-panel-desc">{rightDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
