import { useEffect, useRef } from 'react'
import './PixelCard.css'

/* ponytail: Canvas pixel grid with RAF loop — no external deps.
   Ceiling: pixel size limited by canvas width/height, not GPU.
   Upgrade: WebGL particle system for 10K+ pixels. */

class Pixel {
  constructor(canvas, ctx, x, y, color, speed, delay) {
    this.canvas = canvas; this.ctx = ctx; this.x = x; this.y = y; this.color = color
    this.speed = this.getRandom(0.1, 0.9) * speed; this.size = 0
    this.sizeStep = Math.random() * 0.4; this.minSize = 0.5; this.maxSizeInteger = 2
    this.maxSize = this.getRandom(this.minSize, this.maxSizeInteger)
    this.delay = delay; this.counter = 0
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01
    this.isIdle = false; this.isReverse = false; this.isShimmer = false
  }
  getRandom(min, max) { return Math.random() * (max - min) + min }
  draw() { const off = this.maxSizeInteger * 0.5 - this.size * 0.5; this.ctx.fillStyle = this.color; this.ctx.fillRect(this.x + off, this.y + off, this.size, this.size) }
  appear() {
    this.isIdle = false; if (this.counter <= this.delay) { this.counter += this.counterStep; return }
    if (this.size >= this.maxSize) this.isShimmer = true
    if (this.isShimmer) this.shimmer(); else this.size += this.sizeStep
    this.draw()
  }
  disappear() { this.isShimmer = false; this.counter = 0; if (this.size <= 0) { this.isIdle = true; return } else this.size -= 0.1; this.draw() }
  shimmer() { if (this.size >= this.maxSize) this.isReverse = true; else if (this.size <= this.minSize) this.isReverse = false; this.size += this.isReverse ? -this.speed : this.speed }
}

const VARIANTS = {
  default: { gap: 5, speed: 35, colors: '#f8fafc,#f1f5f9,#cbd5e1' },
  blue: { gap: 10, speed: 25, colors: '#e0f2fe,#7dd3fc,#0ea5e9' },
  yellow: { gap: 3, speed: 20, colors: '#fef08a,#fde047,#eab308' },
  pink: { gap: 6, speed: 80, colors: '#fecdd3,#fda4af,#e11d48' },
}

export function PixelCard({ variant = 'default', gap, speed, colors, className = '', children }) {
  const containerRef = useRef(null); const canvasRef = useRef(null); const pixelsRef = useRef([]); const animRef = useRef(null); const prevRef = useRef(performance.now())
  const cfg = VARIANTS[variant] || VARIANTS.default; const finalGap = gap ?? cfg.gap; const finalSpeed = speed ?? cfg.speed; const finalColors = colors ?? cfg.colors

  const initPixels = () => {
    const el = containerRef.current; const c = canvasRef.current; if (!el || !c) return
    const { width, height } = el.getBoundingClientRect(); const W = Math.floor(width); const H = Math.floor(height)
    c.width = W; c.height = H; c.style.width = W + 'px'; c.style.height = H + 'px'
    const ctx = c.getContext('2d'); const cols = finalColors.split(',')
    const px = []
    for (let x = 0; x < W; x += finalGap) for (let y = 0; y < H; y += finalGap) {
      const color = cols[Math.floor(Math.random() * cols.length)]; const d = Math.hypot(x - W / 2, y - H / 2); const delay = d
      if (ctx) px.push(new Pixel(c, ctx, x, y, color, finalSpeed * 0.001, delay))
    }
    pixelsRef.current = px
  }

  const doAnim = (fn) => {
    animRef.current = requestAnimationFrame(() => doAnim(fn))
    const now = performance.now(); const passed = now - prevRef.current; if (passed < 1000 / 60) return
    prevRef.current = now - (passed % (1000 / 60))
    const ctx = canvasRef.current?.getContext('2d'); if (!ctx || !canvasRef.current) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); let allIdle = true
    for (const p of pixelsRef.current) { p[fn](); if (!p.isIdle) allIdle = false }
    if (allIdle) cancelAnimationFrame(animRef.current)
  }

  const start = (name) => { if (animRef.current) cancelAnimationFrame(animRef.current); prevRef.current = performance.now(); animRef.current = requestAnimationFrame(() => doAnim(name)) }

  useEffect(() => { initPixels(); const ro = new ResizeObserver(() => initPixels()); if (containerRef.current) ro.observe(containerRef.current); return () => { ro.disconnect(); if (animRef.current) cancelAnimationFrame(animRef.current) } }, [finalGap, finalSpeed, finalColors])

  return (
    <div ref={containerRef} className={`pixel-card${className ? ' ' + className : ''}`} onMouseEnter={() => start('appear')} onMouseLeave={() => start('disappear')} tabIndex={0} style={{ position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} className="pixel-canvas" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
      {children}
    </div>
  )
}
