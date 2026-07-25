import { useRef, useEffect } from 'react'
import './Noise.css'

/* ponytail: canvas is the right tool here — SVG noise patterns are static
   and CSS gradient noise looks terrible at any usable size.
   Ceiling: per-frame full buffer fill; large screens may jank on low-end GPU.
   Upgrade: limit canvas resolution to 50% via devicePixelRatio clamp. */
export function Noise({
  patternSize = 250,
  patternAlpha = 15,
  patternRefreshInterval = 2,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let frame = 0
    let rafId

    const draw = () => {
      frame++
      if (patternRefreshInterval > 0 && frame % patternRefreshInterval !== 0) {
        rafId = requestAnimationFrame(draw)
        return
      }

      const w = canvas.width
      const h = canvas.height

      /* ponytail: offscreen canvas for block noise — avoids nested pixel loops.
         Ceiling: creates one extra canvas per frame.
         Upgrade: pre-allocate offscreen canvas once, reuse. */
      const offscreen = document.createElement('canvas')
      const bw = Math.ceil(w / patternSize)
      const bh = Math.ceil(h / patternSize)
      offscreen.width = bw
      offscreen.height = bh
      const octx = offscreen.getContext('2d')
      const imgData = octx.createImageData(bw, bh)

      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = (Math.random() * 256) | 0
        imgData.data[i] = v
        imgData.data[i + 1] = v
        imgData.data[i + 2] = v
        imgData.data[i + 3] = patternAlpha
      }
      octx.putImageData(imgData, 0, 0)

      ctx.imageSmoothingEnabled = false
      ctx.drawImage(offscreen, 0, 0, w, h)

      if (patternRefreshInterval > 0) {
        rafId = requestAnimationFrame(draw)
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    if (patternRefreshInterval > 0) {
      rafId = requestAnimationFrame(draw)
    } else {
      draw() /* single frame for static mode */
    }

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [patternSize, patternAlpha, patternRefreshInterval])

  return (
    <div className={`noise${className ? ' ' + className : ''}`}>
      <canvas ref={canvasRef} className="noise__canvas" />
    </div>
  )
}
