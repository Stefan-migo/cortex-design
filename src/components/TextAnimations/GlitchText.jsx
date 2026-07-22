import './GlitchText.css'

export function GlitchText({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}) {
  return (
    <div
      className={`glitch${enableOnHover ? ' enable-on-hover' : ''}${className ? ' ' + className : ''}`}
      data-text={children}
      style={{
        '--after-duration': `${speed * 3}s`,
        '--before-duration': `${speed * 2}s`,
        '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
        '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
      }}
    >
      {children}
    </div>
  )
}
