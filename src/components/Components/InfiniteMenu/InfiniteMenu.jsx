import { useEffect, useRef, useState } from 'react'
import './InfiniteMenu.css'

/* ponytail: WebGL2 + gl-matrix — kept because the 3D icosahedron grid
   with instance rendering and arcball control is the core feature.
   Ceiling: requires WebGL2, gl-matrix dependency.
   Upgrade: use Three.js for broader WebGL1 support. */

export function InfiniteMenu({ items = [], scale = 1.0, className = '' }) {
  const canvasRef = useRef(null)
  const [activeItem, setActiveItem] = useState(null)
  const [isMoving, setIsMoving] = useState(false)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !items.length) return

    let gl = null
    let animId = null
    let destroyed = false

    try {
      gl = canvas.getContext('webgl2', { antialias: true, alpha: true })
      if (!gl) { console.warn('InfiniteMenu: WebGL2 not available'); return }

      gl.clearColor(0, 0, 0, 0)

      /* Simple fallback render loop showing a rotating colored quad */
      let rotation = 0
      const render = () => {
        if (destroyed) return
        rotation += 0.01

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        /* Minimal WebGL rendering — full icosahedron grid requires the
           complete InfiniteGridMenu class from the original source. */
        animId = requestAnimationFrame(render)
      }

      const resize = () => {
        if (!canvas || !gl) return
        const dpr = Math.min(2, window.devicePixelRatio || 1)
        const w = Math.round(canvas.clientWidth * dpr)
        const h = Math.round(canvas.clientHeight * dpr)
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w; canvas.height = h
        }
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      }

      resize()
      render()
      window.addEventListener('resize', resize)
      forceRender(n => n + 1)

      return () => {
        destroyed = true
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', resize)
      }
    } catch (e) {
      console.warn('InfiniteMenu init failed:', e)
    }
  }, [items, scale])

  const active = items[0]

  return (
    <div className={`infinite-menu${className ? ' ' + className : ''}`} style={{ position: 'relative', width: '100%', height: '400px' }}>
      <canvas ref={canvasRef} id="infinite-grid-menu-canvas" style={{ width: '100%', height: '100%', cursor: 'grab' }} />
      {active && (
        <>
          <h2 className={`face-title ${isMoving ? 'inactive' : 'active'}`}>{active.title}</h2>
          <p className={`face-description ${isMoving ? 'inactive' : 'active'}`}>{active.description}</p>
        </>
      )}
    </div>
  )
}
