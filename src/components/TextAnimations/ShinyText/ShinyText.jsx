import './ShinyText.css'

export function ShinyText({
  text = '',
  speed = 2,
  shineColor = '#ffffff',
  color = '#555555',
  spread = 45,
  direction = 'left',
  className = '',
}) {
  const animDirection =
    direction === 'right' ? 'reverse' : direction === 'yoyo' ? 'alternate' : 'normal'

  return (
    <span
      className={`shiny-text${className ? ' ' + className : ''}`}
      style={{
        '--speed': `${speed}s`,
        '--shine-color': shineColor,
        '--base-color': color,
        '--spread': `${spread}deg`,
        '--anim-direction': animDirection,
      }}
    >
      {text}
    </span>
  )
}
