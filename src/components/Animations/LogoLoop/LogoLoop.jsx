import './LogoLoop.css'

/* ponytail: pure CSS @keyframes marquee — no JS animation, no intersection observer.
   Ceiling: continuous animation, no pause-on-hover; uses duplicate markup for seamless loop.
   Upgrade: add pause-on-hover via animation-play-state, or IntersectionObserver for visibility. */
export function LogoLoop({
  items = [],
  speed = 20,
  direction = 'left',
  className = '',
}) {
  if (items.length === 0) return null

  return (
    <div className={`logo-loop${className ? ' ' + className : ''}`}>
      <div
        className="logo-loop__track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="logo-loop__item">
            {typeof item === 'string' ? (
              <span className="logo-loop__text">{item}</span>
            ) : (
              <img src={item.src} alt={item.alt || ''} className="logo-loop__img" />
            )}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="logo-loop__item" aria-hidden="true">
            {typeof item === 'string' ? (
              <span className="logo-loop__text">{item}</span>
            ) : (
              <img src={item.src} alt="" className="logo-loop__img" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
