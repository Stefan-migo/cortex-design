import { useRef, useEffect, useState, useCallback } from 'react'
import './FlowingMenu.css'

/* ponytail: CSS transitions + React state replace GSAP timeline.
   Ceiling: marquee auto-scroll uses CSS animation instead of GSAP infinite,
   enter/leave uses CSS transform transitions instead of GSAP timeline.
   Upgrade: use GSAP for seamless timeline sequencing and elastic easing. */

function distMetric(x, y, x2, y2) { const dx = x - x2; const dy = y - y2; return dx * dx + dy * dy }

function findClosestEdge(mouseX, mouseY, width, height) {
  return distMetric(mouseX, mouseY, width / 2, 0) < distMetric(mouseX, mouseY, width / 2, height) ? 'top' : 'bottom'
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst }) {
  const itemRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeInnerRef = useRef(null)
  const [repetitions, setRepetitions] = useState(4)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const calculate = () => {
      if (!marqueeInnerRef.current) return
      const content = marqueeInnerRef.current.querySelector('.flowing-menu__marquee-part')
      if (!content) return
      const cw = content.offsetWidth; const vw = window.innerWidth
      setRepetitions(Math.max(4, Math.ceil(vw / cw) + 2))
    }
    calculate(); window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [text, image])

  const handleEnter = useCallback((ev) => {
    if (!itemRef.current || !marqueeRef.current) return
    setHovered(true)
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)
    marqueeRef.current.style.setProperty('--flowing-menu-enter', edge === 'top' ? 'from-top' : 'from-bottom')
  }, [])

  const handleLeave = useCallback((ev) => {
    if (!itemRef.current || !marqueeRef.current) return
    setHovered(false)
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)
    marqueeRef.current.style.setProperty('--flowing-menu-enter', edge === 'top' ? 'from-bottom' : 'from-top')
  }, [])

  return (
    <div ref={itemRef} className="flowing-menu__item" style={{ borderColor, borderTop: isFirst ? 'none' : undefined }}>
      <a className="flowing-menu__link" href={link} onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{ color: textColor }}>
        {text}
      </a>
      <div
        ref={marqueeRef}
        className={`flowing-menu__marquee${hovered ? ' flowing-menu__marquee--visible' : ''}`}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="flowing-menu__marquee-inner-wrap">
          <div className="flowing-menu__marquee-inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="flowing-menu__marquee-part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="flowing-menu__marquee-img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff',
  className = '',
}) {
  return (
    <div className={`flowing-menu${className ? ' ' + className : ''}`} style={{ backgroundColor: bgColor }}>
      <nav className="flowing-menu__nav">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} speed={speed} textColor={textColor} marqueeBgColor={marqueeBgColor} marqueeTextColor={marqueeTextColor} borderColor={borderColor} isFirst={idx === 0} />
        ))}
      </nav>
    </div>
  )
}
