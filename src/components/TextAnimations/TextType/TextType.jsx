import { useState, useRef, useEffect } from 'react'
import './TextType.css'

/* ponytail: ~60 lines for a typewriter with delete-and-retry loop.
   Ceiling: single text, no multi-string cycling, no word-by-word cursor,
   no variable speed per char. Cursor is CSS-only via @keyframes.
   Upgrade: accept array of strings for sentence cycling; add word-backspace
   mode for larger chunks; expose deleteSpeed prop. */
export function TextType({
  text = '',
  speed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  loop = true,
  showCursor = true,
  cursorChar = '|',
  className = '',
}) {
  const [displayed, setDisplayed] = useState('')
  const [runKey, setRunKey] = useState(0)
  const speedRef = useRef(speed)
  const pauseRef = useRef(pauseDuration)
  const loopRef = useRef(loop)
  const textRef = useRef(text)

  useEffect(() => { speedRef.current = speed }, [speed])
  useEffect(() => { pauseRef.current = pauseDuration }, [pauseDuration])
  useEffect(() => { loopRef.current = loop }, [loop])
  useEffect(() => { textRef.current = text }, [text])

  /* ponytail: initialDelay kicks off the first cycle.
     Ceiling: delay applies once on mount only, not between loops.
     Upgrade: add initialDelay prop that applies after each full cycle. */
  useEffect(() => {
    const id = setTimeout(() => setRunKey((k) => k + 1), initialDelay)
    return () => clearTimeout(id)
  }, [initialDelay])

  /* ponytail: runKey drives the type→pause→delete→pause cycle.
     Ceiling: no visibilitychange pause, no tab-hidden throttling.
     Upgrade: add document.hidden listener to pause/resume intervals. */
  useEffect(() => {
    if (!textRef.current.length) return
    let cancelled = false
    setDisplayed('')

    function typePhase() {
      if (cancelled) return
      let idx = 0
      const id = setInterval(() => {
        if (cancelled) return
        idx++
        setDisplayed(textRef.current.slice(0, idx))
        if (idx >= textRef.current.length) {
          clearInterval(id)
          setTimeout(deletePhase, pauseRef.current)
        }
      }, speedRef.current)
    }

    function deletePhase() {
      if (cancelled) return
      let delIdx = textRef.current.length
      const id = setInterval(() => {
        if (cancelled) return
        delIdx--
        setDisplayed(textRef.current.slice(0, delIdx))
        if (delIdx <= 0) {
          clearInterval(id)
          if (loopRef.current) {
            /* ponytail: restart via runKey — increments to re-run the effect.
               Ceiling: uses half pauseDuration as delay between cycles.
               Upgrade: separate cyclePause prop for inter-cycle gap. */
            setTimeout(() => setRunKey((k) => k + 1), pauseRef.current / 2)
          }
        }
      }, speedRef.current)
    }

    typePhase()
    return () => { cancelled = true }
  }, [runKey])

  return (
    <span className={`text-type${className ? ' ' + className : ''}`}>
      <span className="tt-text">{displayed}</span>
      {showCursor && (
        <span className="tt-cursor" aria-hidden="true">
          {cursorChar}
        </span>
      )}
    </span>
  )
}
