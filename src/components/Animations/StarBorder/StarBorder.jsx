import './StarBorder.css'

/* ponytail: ::before pseudo-element instead of wrapper div.
   Ceiling: one gradient track, no multi-color stop customization.
   Upgrade: accept gradient stops as prop. */
export function StarBorder({
  children,
  as: Component = 'button',
  color = '#6366f1',
  speed = 6,
  thickness = 2,
  className = '',
}) {
  return (
    <Component
      className={`star-border${className ? ' ' + className : ''}`}
      style={{
        '--star-color': color,
        '--star-speed': `${speed}s`,
        '--star-thickness': `${thickness}px`,
        '--star-inner': `${thickness + 1}px`,
      }}
    >
      <span className="star-border__body">{children}</span>
    </Component>
  )
}
