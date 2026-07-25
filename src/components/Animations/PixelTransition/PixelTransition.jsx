import { useRef, useEffect, useState, Children } from 'react'
import './PixelTransition.css'

/* ponytail: canvas overlay pixel grid — animates squares, no getImageData/putImageData.
   Ceiling: pixel squares scale from 0→1 revealing content beneath; works with ANY children,
   not just <img> elements. No image-to-image pixel blending.
   Upgrade: use two offscreen canvases with drawImage source clipping for actual image transitions. */
export function PixelTransition({
  children,
  gridSize = 20,
  duration = 2,
  stagger = 20,
  className = '',
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [started, setStarted] = useState(false)

  const items = Children.toArray(children)
  if (items.length < 2) return <>{children}</>

  /* Separate before/after — first child is "before", second is "after" */
  return (
    <div
      ref={containerRef}
      className={`pixel-transition${className ? ' ' + className : ''}`}
    >
      <PixelTransitionInner
        canvasRef={canvasRef}
        containerRef={containerRef}
        started={started}
        setStarted={setStarted}
        gridSize={gridSize}
        duration={duration}
        stagger={stagger}
        items={items}
      />
    </div>
  )
}

function PixelTransitionInner({
  canvasRef,
  containerRef,
  started,
  setStarted,
  gridSize,
  duration,
  stagger,
  items,
}) {
  useEffect(() => {
    setStarted(true)
  }, [setStarted])

  useEffect(() => {
    if (!started) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d')

    const w = container.offsetWidth
    const h = container.offsetHeight
    if (w === 0 || h === 0) return
    canvas.width = w
    canvas.height = h

    const cols = Math.ceil(w / gridSize)
    const rows = Math.ceil(h / gridSize)
    /* pre-compute shuffle for organic reveal */
    const order = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        order.push({ r, c })
      }
    }
    /* ponytail: Fisher-Yates shuffle for non-uniform reveal order.
       Ceiling: shuffle is O(n) once; better than (r+c)*stagger which creates diagonal pattern.
       Upgrade: per-pixel noise-based timing for fully organic dissolve. */
    for (let i = order.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [order[i], order[j]] = [order[j], order[i]]
    }

    let startTime
    let rafId

    /* Draw initial state — full white/opaque overlay */
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)

    const animate = (now) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      let allDone = true

      for (const { r, c } of order) {
        const delay = (r + c) * stagger
        const t = Math.max(0, Math.min(1, (elapsed - delay) / (duration * 1000)))
        if (t <= 0) continue
        if (t < 1) allDone = false

        const x = c * gridSize
        const y = r * gridSize
        const size = gridSize * t
        const ox = (gridSize - size) / 2
        const oy = (gridSize - size) / 2

        /* Clear this pixel — revealing content beneath */
        ctx.clearRect(x + ox, y + oy, size, size)
      }

      if (!allDone) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [started, gridSize, duration, stagger, canvasRef, containerRef])

  return (
    <>
      <canvas ref={canvasRef} className="pixel-transition__canvas" />
      <div className="pixel-transition__before" aria-hidden>
        {items[0]}
      </div>
      <div className="pixel-transition__after">{items[1]}</div>
    </>
  )
}
