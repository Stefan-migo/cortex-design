import { useRef, useEffect } from 'react'
import './MagnetLines.css'

export function MagnetLines({
  lines = 50,
  length = 100,
  color = '#ffffff',
  gap = 20,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let mouseX = Infinity
    let mouseY = Infinity
    let rafId

    /* ponytail: compute line positions once at known count.
       Ceiling: doesn't react to container size changes after mount.
       Upgrade: recalculate in resize handler. */
    const cols = Math.ceil(Math.sqrt(lines))
    const rows = Math.ceil(lines / cols)
    const positions = Array.from({ length: lines }, (_, i) => ({
      col: i % cols,
      row: Math.floor(i / cols),
      angle: 0,
    }))

    const resize = () => {
      const w = canvas.parentElement.clientWidth
      const h = canvas.parentElement.clientHeight
      canvas.width = w
      canvas.height = h
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const midX = canvas.width / 2
      const midY = canvas.height / 2
      const totalW = (cols - 1) * gap
      const totalH = (rows - 1) * gap
      const ox = midX - totalW / 2
      const oy = midY - totalH / 2

      for (const p of positions) {
        const lx = ox + p.col * gap
        const ly = oy + p.row * gap

        if (mouseX !== Infinity) {
          const dx = mouseX - lx
          const dy = mouseY - ly
          p.angle += (Math.atan2(dy, dx) - p.angle) * 0.1
        }

        const ex = lx + Math.cos(p.angle) * length
        const ey = ly + Math.sin(p.angle) * length

        ctx.beginPath()
        ctx.moveTo(lx, ly)
        ctx.lineTo(ex, ey)
        ctx.strokeStyle = color
        ctx.stroke()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouseX = Infinity; mouseY = Infinity }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [lines, length, color, gap])

  return (
    <canvas
      ref={canvasRef}
      className={`magnet-lines${className ? ' ' + className : ''}`}
    />
  )
}
