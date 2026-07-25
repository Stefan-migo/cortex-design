import { useEffect, useMemo, useRef, useCallback } from 'react'
import './DomeGallery.css'

/* ponytail: Native pointer events replace @use-gesture/react.
   Ceiling: no gesture recognition for multi-touch, inertia uses
   simple friction instead of physics spring.
   Upgrade: use @use-gesture/react for proper velocity tracking
   and spring-based inertia. */

const DEFAULTS = { maxVerticalRotationDeg: 5, dragSensitivity: 20, enlargeTransitionMs: 300, segments: 35 }

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const normalizeAngle = (d) => ((d % 360) + 360) % 360
const wrapAngleSigned = (deg) => { const a = (((deg + 180) % 360) + 360) % 360; return a - 180 }

const DEFAULT_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop', alt: 'Abstract art' },
  { src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop', alt: 'Modern sculpture' },
  { src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop', alt: 'Digital artwork' },
  { src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop', alt: 'Contemporary art' },
  { src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop', alt: 'Geometric pattern' },
  { src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop', alt: 'Textured surface' },
  { src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large', alt: 'Social media image' },
]

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2)
  const evenYs = [-4, -2, 0, 2, 4]; const oddYs = [-3, -1, 1, 3, 5]
  const coords = xCols.flatMap((x, c) => { const ys = c % 2 === 0 ? evenYs : oddYs; return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 })) })
  const totalSlots = coords.length
  if (pool.length === 0) return coords.map(c => ({ ...c, src: '', alt: '' }))
  if (pool.length > totalSlots) console.warn(`[DomeGallery] Provided image count (${pool.length}) exceeds tiles (${totalSlots}).`)
  const normalizedImages = pool.map(image => typeof image === 'string' ? { src: image, alt: '' } : { src: image.src || '', alt: image.alt || '' })
  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length])
  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) { const tmp = usedImages[i]; usedImages[i] = usedImages[j]; usedImages[j] = tmp; break }
      }
    }
  }
  return coords.map((c, i) => ({ ...c, src: usedImages[i].src, alt: usedImages[i].alt }))
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2
  return { rotateX: unit * (offsetX + (sizeX - 1) / 2), rotateY: unit * (offsetY - (sizeY - 1) / 2) }
}

export function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#120F17',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '400px',
  openedImageHeight = '400px',
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = true,
  className = '',
}) {
  const rootRef = useRef(null); const mainRef = useRef(null); const sphereRef = useRef(null)
  const frameRef = useRef(null); const viewerRef = useRef(null); const scrimRef = useRef(null)
  const focusedElRef = useRef(null); const originalTilePositionRef = useRef(null)
  const rotationRef = useRef({ x: 0, y: 0 }); const startRotRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef(null); const draggingRef = useRef(false); const movedRef = useRef(false)
  const inertiaRAF = useRef(null); const openingRef = useRef(false); const openStartedAtRef = useRef(0)
  const lastDragEndAt = useRef(0); const scrollLockedRef = useRef(false)
  const lockedRadiusRef = useRef(null)

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return; scrollLockedRef.current = true; document.body.classList.add('dg-scroll-lock')
  }, [])
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return; if (rootRef.current?.getAttribute('data-enlarging') === 'true') return
    scrollLockedRef.current = false; document.body.classList.remove('dg-scroll-lock')
  }, [])

  const items = useMemo(() => buildItems(images, segments), [images, segments])

  const applyTransform = (xDeg, yDeg) => {
    const el = sphereRef.current
    if (el) el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
  }

  useEffect(() => {
    const root = rootRef.current; if (!root) return
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect; const w = Math.max(1, cr.width), h = Math.max(1, cr.height)
      const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h
      let basis
      switch (fitBasis) {
        case 'min': basis = minDim; break; case 'max': basis = maxDim; break
        case 'width': basis = w; break; case 'height': basis = h; break
        default: basis = aspect >= 1.3 ? w : minDim
      }
      let radius = basis * fit; const heightGuard = h * 1.35
      radius = Math.min(radius, heightGuard); radius = clamp(radius, minRadius, maxRadius)
      lockedRadiusRef.current = Math.round(radius)
      const viewerPad = Math.max(8, Math.round(minDim * padFactor))
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`)
      root.style.setProperty('--viewer-pad', `${viewerPad}px`)
      root.style.setProperty('--overlay-blur-color', overlayBlurColor)
      root.style.setProperty('--tile-radius', imageBorderRadius)
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius)
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none')
      applyTransform(rotationRef.current.x, rotationRef.current.y)
    })
    ro.observe(root); return () => ro.disconnect()
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius])

  useEffect(() => { applyTransform(rotationRef.current.x, rotationRef.current.y) }, [])

  const stopInertia = useCallback(() => { if (inertiaRAF.current) { cancelAnimationFrame(inertiaRAF.current); inertiaRAF.current = null } }, [])

  const startInertia = useCallback((vx, vy) => {
    const MAX_V = 1.4; let vX = clamp(vx, -MAX_V, MAX_V) * 80; let vY = clamp(vy, -MAX_V, MAX_V) * 80
    let frames = 0; const d = clamp(dragDampening ?? 0.6, 0, 1)
    const frictionMul = 0.94 + 0.055 * d; const stopThreshold = 0.015 - 0.01 * d; const maxFrames = Math.round(90 + 270 * d)
    const step = () => {
      vX *= frictionMul; vY *= frictionMul
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) { inertiaRAF.current = null; return }
      if (++frames > maxFrames) { inertiaRAF.current = null; return }
      const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg)
      const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200)
      rotationRef.current = { x: nextX, y: nextY }; applyTransform(nextX, nextY)
      inertiaRAF.current = requestAnimationFrame(step)
    }
    stopInertia(); inertiaRAF.current = requestAnimationFrame(step)
  }, [dragDampening, maxVerticalRotationDeg, stopInertia])

  /* ponytail: Native pointer events replace @use-gesture/react useGesture.
     Ceiling: no multi-touch, no gesture recognition (drag only). */
  const handlePointerDown = useCallback((e) => {
    if (focusedElRef.current) return; stopInertia()
    draggingRef.current = true; movedRef.current = false
    startRotRef.current = { ...rotationRef.current }
    startPosRef.current = { x: e.clientX, y: e.clientY }
    if (mainRef.current) mainRef.current.setPointerCapture(e.pointerId)
  }, [stopInertia])

  const handlePointerMove = useCallback((e) => {
    if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return
    const dxTotal = e.clientX - startPosRef.current.x; const dyTotal = e.clientY - startPosRef.current.y
    if (!movedRef.current) { if (dxTotal * dxTotal + dyTotal * dyTotal > 16) movedRef.current = true }
    const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg)
    const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity)
    if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
      rotationRef.current = { x: nextX, y: nextY }; applyTransform(nextX, nextY)
    }
  }, [dragSensitivity, maxVerticalRotationDeg])

  const handlePointerUp = useCallback((e) => {
    if (!draggingRef.current) return; draggingRef.current = false
    if (mainRef.current) mainRef.current.releasePointerCapture(e.pointerId)
    if (movedRef.current) lastDragEndAt.current = performance.now()
    movedRef.current = false
  }, [])

  const openItemFromElement = useCallback((el) => {
    if (openingRef.current) return; openingRef.current = true; openStartedAtRef.current = performance.now(); lockScroll()
    const parent = el.parentElement; focusedElRef.current = el; el.setAttribute('data-focused', 'true')
    // Simplified open — creates overlay with the image
    const overlay = document.createElement('div'); overlay.className = 'enlarge'
    overlay.style.cssText = `position:absolute;inset:0;z-index:30;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);border-radius:${openedImageBorderRadius};`
    const img = document.createElement('img'); img.src = parent.dataset.src || ''
    img.style.cssText = `max-width:${openedImageWidth};max-height:${openedImageHeight};border-radius:${openedImageBorderRadius};object-fit:cover;${grayscale ? 'filter:grayscale(1);' : ''}`
    overlay.appendChild(img); viewerRef.current?.appendChild(overlay)
    rootRef.current?.setAttribute('data-enlarging', 'true')
  }, [lockScroll, openedImageWidth, openedImageHeight, openedImageBorderRadius, grayscale])

  const onTileClick = useCallback((e) => {
    if (draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return
    openItemFromElement(e.currentTarget)
  }, [openItemFromElement])

  useEffect(() => {
    const scrim = scrimRef.current; if (!scrim) return
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return
      const overlay = viewerRef.current?.querySelector('.enlarge'); if (!overlay) return
      overlay.remove(); focusedElRef.current = null; rootRef.current?.removeAttribute('data-enlarging')
      openingRef.current = false; unlockScroll()
    }
    scrim.addEventListener('click', close); const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => { scrim.removeEventListener('click', close); window.removeEventListener('keydown', onKey) }
  }, [unlockScroll])

  useEffect(() => { return () => { document.body.classList.remove('dg-scroll-lock') } }, [])

  return (
    <div ref={rootRef} className={`dome-gallery${className ? ' ' + className : ''}`} style={{ '--overlay-blur-color': overlayBlurColor, '--tile-radius': imageBorderRadius, '--enlarge-radius': openedImageBorderRadius, '--image-filter': grayscale ? 'grayscale(1)' : 'none' }}>
      <main ref={mainRef} className="dome-gallery__main" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
        <div className="dome-gallery__stage">
          <div ref={sphereRef} className="dome-gallery__sphere">
            {items.map((it, i) => (
              <div key={`${it.x},${it.y},${i}`} className="dome-gallery__item" data-src={it.src} data-offset-x={it.x} data-offset-y={it.y} data-size-x={it.sizeX} data-size-y={it.sizeY} style={{ '--offset-x': it.x, '--offset-y': it.y, '--item-size-x': it.sizeX, '--item-size-y': it.sizeY }}>
                <div className="dome-gallery__item-image" role="button" tabIndex={0} aria-label={it.alt || 'Open image'} onClick={onTileClick}>
                  <img src={it.src} draggable={false} alt={it.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dome-gallery__overlay" />
        <div className="dome-gallery__overlay-blur" />
        <div className="dome-gallery__edge-fade dome-gallery__edge-fade--top" />
        <div className="dome-gallery__edge-fade dome-gallery__edge-fade--bottom" />
        <div className="dome-gallery__viewer" ref={viewerRef}><div ref={scrimRef} className="dome-gallery__scrim" /><div ref={frameRef} className="dome-gallery__frame" /></div>
      </main>
    </div>
  )
}
