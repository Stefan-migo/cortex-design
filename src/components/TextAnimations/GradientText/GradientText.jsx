import './GradientText.css'

export function GradientText({
  children = '',
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  animationSpeed = 3,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = false,
  showBorder = false,
  className = '',
}) {
  const gradientDir = direction === 'vertical' ? 'to bottom' : 'to right'
  const gradient = `linear-gradient(${gradientDir}, ${colors.join(', ')})`
  const animDir = yoyo ? 'alternate' : 'normal'
  const size = direction === 'vertical' ? '100% 300%' : '300% 100%'

  return (
    <span
      className={`gradient-text${pauseOnHover ? ' pause-on-hover' : ''}${showBorder ? ' with-border' : ''}${className ? ' ' + className : ''}`}
      style={{
        '--gradient': gradient,
        '--speed': `${animationSpeed}s`,
        '--size': size,
        '--anim-dir': animDir,
      }}
    >
      {children}
    </span>
  )
}
