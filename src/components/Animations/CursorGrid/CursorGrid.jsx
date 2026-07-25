import { useRef, useEffect } from 'react'
import './CursorGrid.css'

/* ponytail: flat Float32Array grid — single allocation, no Map/Set per cell.
   Ceiling: 40×60 = 2400 cells with per-frame O(n) alpha decay + distance check.
   Upgrade: spatial hash or Web Worker for larger grids (200+ × 200+). */
export function CursorGrid({
  rows = 40,
  cols = 60,
  cellSize = 16,
  color = '#5227FF',
  className = '',
}) {
  const canvasRef = useRef(null)
  const gridRef = useRef(null)
  const mouseRef = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = cols * cellSize
    canvas.height = rows * cellSize

    if (!gridRef.current || gridRef.current.length !== rows * cols) {
      gridRef.current = new Float32Array(rows * cols)
    }
    const grid = gridRef.current
    let rafId

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mc = Math.floor(mx / cellSize)
      const mr = Math.floor(my / cellSize)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          grid[i] *= 0.96
          if (grid[i] < 0.005) { grid[i] = 0; continue }

          const d = Math.sqrt((r - mr) ** 2 + (c - mc) ** 2)
          if (d <= 3) {
            grid[i] = Math.min(1, grid[i] + 0.4 * (1 - d / 3))
          }

          ctx.fillStyle = color
          ctx.globalAlpha = Math.min(grid[i], 1)
          ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2)
        }
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [rows, cols, cellSize, color])

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-grid${className ? ' ' + className : ''}`}
    />
  )
}
