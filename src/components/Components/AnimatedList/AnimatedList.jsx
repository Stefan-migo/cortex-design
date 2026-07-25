import { useRef, useState, useEffect, useCallback } from 'react'
import './AnimatedList.css'

/* ponytail: IntersectionObserver + CSS transitions replace framer-motion AnimatePresence.
   Ceiling: no reuse of AnimatedItem as standalone, no drag reorder, no layout animations.
   Upgrade: use motion/react for layout animations and AnimatePresence exit animations. */
function AnimatedItem({ children, delay = 0, index, onMouseEnter, onClick, visible }) {
  return (
    <div
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`animated-list-item${visible ? ' animated-list-item--visible' : ''}`}
      style={{
        transitionDelay: `${delay}s`,
        '--index': index,
      }}
    >
      {children}
    </div>
  )
}

export function AnimatedList({
  items = [
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
    'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
    'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15',
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
}) {
  const listRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const [visibleItems, setVisibleItems] = useState(new Set())
  const observerRef = useRef(null)

  const handleItemMouseEnter = useCallback((index) => {
    setSelectedIndex(index)
  }, [])

  const handleItemClick = useCallback((item, index) => {
    setSelectedIndex(index)
    if (onItemSelect) onItemSelect(item, index)
  }, [onItemSelect])

  const handleScroll = useCallback((e) => {
    const target = e.target
    const { scrollTop, scrollHeight, clientHeight } = target
    const topGrad = target.parentElement.querySelector('.animated-list__top-gradient')
    const bottomGrad = target.parentElement.querySelector('.animated-list__bottom-gradient')
    if (topGrad) topGrad.style.opacity = Math.min(scrollTop / 50, 1)
    if (bottomGrad) {
      const bottomDistance = scrollHeight - (scrollTop + clientHeight)
      bottomGrad.style.opacity = scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    }
  }, [])

  /* ponytail: IntersectionObserver per item — fine for ~50 items. Above that, switch to
     a single IO with threshold arrays or use scroll event + bounding rect caching. */
  useEffect(() => {
    const listEl = listRef.current
    if (!listEl) return

    const obs = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const next = new Set(prev)
          for (const entry of entries) {
            const idx = Number(entry.target.dataset.index)
            if (entry.isIntersecting) next.add(idx)
          }
          return next
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' },
    )

    const items = listEl.querySelectorAll('.animated-list-item')
    items.forEach((el) => obs.observe(el))
    observerRef.current = obs

    return () => obs.disconnect()
  }, [items])

  useEffect(() => {
    if (!enableArrowNavigation) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault()
        if (onItemSelect) onItemSelect(items[selectedIndex], selectedIndex)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation])

  /* ponytail: keyboard scroll-into-view with manual scrollTo — no smooth scrolling library.
     Ceiling: doesn't compose with virtual scrolling. */
  useEffect(() => {
    if (selectedIndex < 0 || !listRef.current) return
    const container = listRef.current
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`)
    if (!selectedItem) return
    const extraMargin = 50
    const containerScrollTop = container.scrollTop
    const containerHeight = container.clientHeight
    const itemTop = selectedItem.offsetTop
    const itemBottom = itemTop + selectedItem.offsetHeight
    if (itemTop < containerScrollTop + extraMargin) {
      container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' })
    } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
      container.scrollTo({ top: itemBottom - containerHeight + extraMargin, behavior: 'smooth' })
    }
  }, [selectedIndex])

  return (
    <div className={`animated-list${className ? ' ' + className : ''}`}>
      <div
        ref={listRef}
        className={`animated-list__scroll${!displayScrollbar ? ' animated-list__scroll--no-bar' : ''}`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1 + index * 0.03}
            index={index}
            visible={visibleItems.has(index)}
            onMouseEnter={() => handleItemMouseEnter(index)}
            onClick={() => handleItemClick(item, index)}
          >
            <div className={`animated-list__item${selectedIndex === index ? ' animated-list__item--selected' : ''}${itemClassName ? ' ' + itemClassName : ''}`}>
              <p className="animated-list__text">{item}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div className="animated-list__top-gradient" />
          <div className="animated-list__bottom-gradient" />
        </>
      )}
    </div>
  )
}
