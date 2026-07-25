import { useRef, useState, useEffect } from 'react'

/**
 * Returns scroll progress (0→1) and velocity (progress/sec) for a target.
 *
 * @param {Window | React.RefObject} [input] - Scroll target (defaults to Window)
 * @param {{ start?: number, end?: number }} [options] - Pixel offsets to trim the scroll range
 * @returns {{ progress: number, velocity: number }}
 */
export function useScrub(input, options = {}) {
  const { start = 0, end = 0 } = options
  const [state, setState] = useState({ progress: 0, velocity: 0 })
  const rafId = useRef(null)
  const ref = useRef({ prevProgress: 0, prevTime: 0 })

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setState({ progress: 1, velocity: 0 })
      return
    }

    const isWindow = input == null || input === window
    const element = isWindow ? null : input?.current ?? null

    const handleScroll = () => {
      if (rafId.current != null) return

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null

        let p = 0
        const viewH = window.innerHeight

        if (isWindow) {
          const scrollY = window.scrollY
          const docH = document.documentElement.scrollHeight
          const maxScroll = Math.max(docH - viewH, 0)
          p = maxScroll > 0
            ? Math.min(1, Math.max(0, (scrollY - start) / (maxScroll - start - end)))
            : 0
        } else if (element) {
          const rect = element.getBoundingClientRect()
          const total = rect.height + viewH
          p = total > 0
            ? Math.min(1, Math.max(0, (viewH - rect.top) / total))
            : 0
          element.style.setProperty('--scrub', String(p))
        }

        const now = performance.now()
        const dt = (now - ref.current.prevTime) / 1000
        let v = 0
        if (dt > 0) {
          v = (p - ref.current.prevProgress) / dt
        }
        ref.current = { prevProgress: p, prevTime: now }

        setState({ progress: p, velocity: v })
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, start, end])

  return state
}
