import './OrbitImages.css'

/* ponytail: pure CSS orbit via rotate+translateX.
   No JS, no RAF, 0 cost when idle.
   Ceiling: circular orbit only (single radius).
   Upgrade: add rx/ry for elliptical orbits. */
export function OrbitImages({
  images = [],
  orbitRadius = 150,
  speed = 4,
  className = '',
}) {
  const count = images.length

  return (
    <div
      className={`orbit-images${className ? ' ' + className : ''}`}
      style={{ '--orbit-radius': `${orbitRadius}px` }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className="orbit-image"
          style={{
            animationDuration: `${speed}s`,
            animationDelay: `${-(speed / count) * i}s`,
          }}
        >
          <img src={img.src} alt={img.alt} />
        </div>
      ))}
    </div>
  )
}
