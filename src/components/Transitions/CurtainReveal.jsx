import { useState, useEffect, useCallback } from 'react'
import './CurtainReveal.css'

/* ponytail: phase-driven state machine with setTimeout cascade.

   Timeline (ms):
      200 → curtains start closing (1.2s → done at 1400)
      200 → vector opacity 0→1 begins (delay 0.8s → visible at 1000,
             fully opaque at 1400, just when curtains finish)
     1600 → AFTER curtains done, vector rotates vertical→horizontal
             (0.9s → done at 2500)
     2700 → AFTER rotation done, vector shrinks + texts converge
             (0.9s → done at 3600)
     3700 → descriptions fade in

   Ceiling: hardcoded timing — no speed prop or scrub control.
   Upgrade: derive timing from a single duration prop. */
export function CurtainReveal({
  curtainColor = '#8b0000',
  accentColor = '#d11c1c',
  autoPlay = true,
  leftWord = 'Voyeur',
  rightWord = 'Vérité',
  leftDescription = 'TO EVOKE A SENSE OF CURIOSITY, FASCINATION OR DESIRE TO UNDERSTAND.',
  rightDescription = 'TO PROVIDE AN UNFILTERED AND GENUINE PORTRAYAL OF REALITY.',
}) {
  const [phase, setPhase] = useState(0)

  const start = useCallback(() => {
    setPhase(0)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase(1)
      })
    })
  }, [])

  useEffect(() => {
    if (!autoPlay) return

    const timers = [
      setTimeout(() => setPhase(1), 200),    /* cortinas cierran + vector empieza a aparecer */
      setTimeout(() => setPhase(2), 1600),   /* cortinas terminaron → vector rota */
      setTimeout(() => setPhase(3), 2700),   /* rotación terminó → vector se encoge + textos convergen */
      setTimeout(() => setPhase(4), 3700),   /* descripciones */
    ]

    return () => timers.forEach(clearTimeout)
  }, [autoPlay])

  const cls = [
    'cr',
    phase >= 1 && 'cr--curtains-closed',
    phase >= 2 && 'cr--rotating',
    phase >= 3 && 'cr--shrinking',
    phase >= 4 && 'cr--complete',
  ].filter(Boolean).join(' ')

  return (
    <div className={cls} style={{ '--cr-curtain': curtainColor, '--cr-accent': accentColor }}>

      {/* ═══ CORTINA IZQUIERDA (viene desde el borde izquierdo) ═══ */}
      <div className="cr-curtain cr-curtain--left" />

      {/* ═══ CORTINA DERECHA (viene desde el borde derecho) ═══ */}
      <div className="cr-curtain cr-curtain--right" />

      {/* ═══ VECTOR CENTRAL (empieza oculto, aparece vertical cuando cortinas se cierran) ═══ */}
      <div className="cr-vector" />

      {/* ═══ TEXTOS ═══ */}
      <div className="cr-content">
        <div className="cr-block cr-block--left">
          <h1 className="cr-word cr-word--left">{leftWord}</h1>
          <p className="cr-desc cr-desc--left">{leftDescription}</p>
        </div>

        <div className="cr-block cr-block--right">
          <h1 className="cr-word cr-word--right">{rightWord}</h1>
          <p className="cr-desc cr-desc--right">{rightDescription}</p>
        </div>
      </div>

      {!autoPlay && (
        <button className="cr-replay" onClick={start}>▶ Replay</button>
      )}
    </div>
  )
}
