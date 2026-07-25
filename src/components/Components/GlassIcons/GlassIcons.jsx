import './GlassIcons.css'

/* ponytail: Pure CSS glassmorphism icons — no external deps.
   Ceiling: limited to predefined gradient color names, no custom gradients.
   Upgrade: add gradient picker or custom CSS gradient input. */

const gradientMapping = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
}

export function GlassIcons({ items = [], className = '' }) {
  const getBackgroundStyle = (color) => {
    if (gradientMapping[color]) return { background: gradientMapping[color] }
    return { background: color }
  }

  return (
    <div className={`glass-icons${className ? ' ' + className : ''}`}>
      {items.map((item, index) => (
        <button key={index} type="button" className={`glass-icons__btn${item.customClass ? ' ' + item.customClass : ''}`} aria-label={item.label}>
          <span className="glass-icons__back" style={getBackgroundStyle(item.color)}></span>
          <span className="glass-icons__front">
            <span className="glass-icons__icon" aria-hidden="true">{item.icon}</span>
          </span>
          <span className="glass-icons__label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
