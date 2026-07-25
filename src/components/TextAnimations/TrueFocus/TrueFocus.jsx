import { useState, useRef, useEffect, useMemo } from 'react'
import './TrueFocus.css'

/* ponytail: ~60 lines for a word-tracking focus highlight.
   Ceiling: uses getBoundingClientRect on word spans — no ResizeObserver for
   container size changes. CSS transition for highlight movement is hardcoded
   (no JS animation controls). No word wrapping detection (assumes single line).
   Upgrade: add ResizeObserver to reposition highlight on layout shift;
   wrap each word in an inner span for multi-line support. */
export function TrueFocus({
  sentence = '',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'rgba(255, 255, 255, 0.4)',
  glowColor = 'rgba(255, 255, 255, 0.6)',
  animationDuration = 0.5,
  pauseDuration = 1,
  className = '',
}) {
  const words = useMemo(
    () => sentence.split(separator).filter(Boolean),
    [sentence, separator]
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [highlightStyle, setHighlightStyle] = useState({})
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const intervalRef = useRef(null)

  /* ponytail: auto-cycle timer — interval advances active index.
     Ceiling: no easing, no direction reversal (ping-pong). Wraps around.
     Upgrade: add pingPong prop for bidirectional cycling. */
  useEffect(() => {
    if (manualMode || !words.length) return
    const total = animationDuration + pauseDuration
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length)
    }, total * 1000)
    return () => clearInterval(intervalRef.current)
  }, [words.length, manualMode, animationDuration, pauseDuration])

  /* ponytail: positioning highlight via bounding rects — no layout observer.
     Ceiling: if container or word reflows due to font loading, highlight will
     be misaligned until next animation tick.
     Upgrade: use ResizeObserver + MutationObserver for reactive repositioning. */
  useEffect(() => {
    const wordEl = wordRefs.current[activeIndex]
    const container = containerRef.current
    if (!wordEl || !container) return

    const wordRect = wordEl.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    setHighlightStyle({
      left: wordRect.left - containerRect.left,
      top: wordRect.top - containerRect.top,
      width: wordRect.width,
      height: wordRect.height,
    })
  }, [activeIndex])

  const handleWordClick = (index) => {
    if (!manualMode) return
    setActiveIndex(index)
  }

  if (!words.length) return null

  return (
    <div
      ref={containerRef}
      className={`true-focus${className ? ' ' + className : ''}`}
      style={{
        '--blur': `${blurAmount}px`,
        '--border-color': borderColor,
        '--glow-color': glowColor,
        '--anim-duration': `${animationDuration}s`,
      }}
    >
      {/* ponytail: highlight div absolutely positioned — CSS transition handles smoothing.
          Ceiling: no spring physics, just CSS ease transition.
          Upgrade: use Framer Motion layoutId for FLIP-animated position. */}
      <div
        className="tf-highlight"
        style={{
          transform: `translate(${highlightStyle.left || 0}px, ${highlightStyle.top || 0}px)`,
          width: highlightStyle.width || 0,
          height: highlightStyle.height || 0,
          transition: `transform ${animationDuration}s ease, width ${animationDuration}s ease, height ${animationDuration}s ease`,
        }}
        aria-hidden="true"
      />
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => { wordRefs.current[i] = el }}
          className={`tf-word${i === activeIndex ? ' tf-active' : ''}`}
          onClick={() => handleWordClick(i)}
          style={{
            cursor: manualMode ? 'pointer' : undefined,
            filter: i === activeIndex ? 'blur(0)' : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}
          {i < words.length - 1 && separator}
        </span>
      ))}
    </div>
  )
}
