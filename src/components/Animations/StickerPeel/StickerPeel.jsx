import './StickerPeel.css'

/* ponytail: CSS clip-path hover peel — no GSAP Draggable, no spring physics.
   Ceiling: hover-only reveal, no drag-to-peel interaction.
   Upgrade: pointer events + RAF for actual drag peel with elastic spring release. */
export function StickerPeel({
  children,
  peelColor = '#f0f0f0',
  peelSize = 30,
  hoverOnly = true,
  className = '',
}) {
  return (
    <div
      className={`sticker-peel${hoverOnly ? ' sticker-peel--hover' : ' sticker-peel--always'}${className ? ' ' + className : ''}`}
      style={{
        '--peel-color': peelColor,
        '--peel-size': `${peelSize}%`,
      }}
    >
      <div className="sticker-peel__content">
        {children}
      </div>
      <div className="sticker-peel__corner" aria-hidden />
    </div>
  )
}
