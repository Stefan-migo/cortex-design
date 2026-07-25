import { useRef, useEffect, useState } from 'react'
import './GooeyNav.css'

/* ponytail: Pure CSS gooey filter nav — no external deps, just CSS animation particles.
   Ceiling: SVG gooey filter uses CSS blur+contrast hack (not true metaball).
   Upgrade: use SVG feGaussianBlur + feColorMatrix for proper gooey effect. */

export function GooeyNav({
  items = [],
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  className = '',
}) {
  const containerRef = useRef(null); const navRef = useRef(null); const filterRef = useRef(null); const textRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)

  const noise = (n = 1) => n / 2 - Math.random() * n
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
    return [distance * Math.cos(angle), distance * Math.sin(angle)]
  }

  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10)
    return { start: getXY(d[0], particleCount - i, particleCount), end: getXY(d[1] + noise(7), particleCount - i, particleCount), time: t, scale: 1 + noise(0.2), color: colors[Math.floor(Math.random() * colors.length)], rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10 }
  }

  const makeParticles = (element) => {
    const d = particleDistances; const r = particleR; const bubbleTime = 600 * 2 + timeVariance
    element.style.setProperty('--time', `${bubbleTime}ms`)
    for (let i = 0; i < particleCount; i++) {
      const t = 600 * 2 + noise(timeVariance * 2); const p = createParticle(i, t, d, r)
      setTimeout(() => {
        const particle = document.createElement('span'); const point = document.createElement('span')
        particle.classList.add('particle'); particle.style.setProperty('--start-x', `${p.start[0]}px`); particle.style.setProperty('--start-y', `${p.start[1]}px`)
        particle.style.setProperty('--end-x', `${p.end[0]}px`); particle.style.setProperty('--end-y', `${p.end[1]}px`)
        particle.style.setProperty('--time', `${p.time}ms`); particle.style.setProperty('--scale', `${p.scale}`)
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`); particle.style.setProperty('--rotate', `${p.rotate}deg`)
        point.classList.add('point'); particle.appendChild(point); element.appendChild(particle)
        requestAnimationFrame(() => element.classList.add('active'))
        setTimeout(() => { try { element.removeChild(particle) } catch {} }, t)
      }, 30)
    }
  }

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return
    const cr = containerRef.current.getBoundingClientRect(); const pos = element.getBoundingClientRect()
    filterRef.current.style.left = `${pos.x - cr.x}px`; filterRef.current.style.top = `${pos.y - cr.y}px`
    filterRef.current.style.width = `${pos.width}px`; filterRef.current.style.height = `${pos.height}px`
    textRef.current.style.left = `${pos.x - cr.x}px`; textRef.current.style.top = `${pos.y - cr.y}px`
    textRef.current.style.width = `${pos.width}px`; textRef.current.style.height = `${pos.height}px`
    textRef.current.innerText = element.innerText
  }

  const handleClick = (e, index) => {
    if (activeIndex === index) return; const liEl = e.currentTarget
    setActiveIndex(index); updateEffectPosition(liEl)
    if (filterRef.current) { filterRef.current.querySelectorAll('.particle').forEach(p => filterRef.current.removeChild(p)) }
    if (textRef.current) { textRef.current.classList.remove('active'); void textRef.current.offsetWidth; textRef.current.classList.add('active') }
    if (filterRef.current) makeParticles(filterRef.current)
  }

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return
    const li = navRef.current.querySelectorAll('li')[activeIndex]
    if (li) { updateEffectPosition(li); textRef.current?.classList.add('active') }
    const ro = new ResizeObserver(() => { const l = navRef.current?.querySelectorAll('li')[activeIndex]; if (l) updateEffectPosition(l) })
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [activeIndex])

  return (
    <div className={`gooey-nav${className ? ' ' + className : ''}`} ref={containerRef}>
      <nav><ul ref={navRef}>
        {items.map((item, idx) => (
          <li key={idx} className={activeIndex === idx ? 'active' : ''}>
            <a href={item.href} onClick={e => handleClick(e, idx)}>{item.label}</a>
          </li>
        ))}
      </ul></nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  )
}
