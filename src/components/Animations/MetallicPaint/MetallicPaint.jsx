import './MetallicPaint.css'

/* ponytail: pure CSS gradient animation — no WebGL2 shaders.
   Ceiling: CSS gradients can't do environment-mapped reflections or anisotropic highlights.
   Upgrade: WebGL2 shader for true metallic BRDF when the visual demands it. */
export function MetallicPaint({
  children,
  colors = ['#c0c0c0', '#e8e8e8', '#a0a0a0', '#f0f0f0', '#808080', '#d0d0d0'],
  speed = 4,
  className = '',
}) {
  return (
    <div
      className={`metallic-paint${className ? ' ' + className : ''}`}
      style={{
        '--metallic-colors': colors.join(', '),
        '--metallic-speed': `${speed}s`,
      }}
    >
      <div className="metallic-paint__bg" aria-hidden="true" />
      <div className="metallic-paint__content">{children}</div>
    </div>
  )
}
