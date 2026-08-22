/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/tabs.tsx */
import { Children, cloneElement, useRef, useState } from 'react'
import './Tabs.css'

/* ponytail: stateful roving-tabindex manager replaces Radix Tabs and its
   Tailwind slot priming. Only the active tab sits in the tab order; Arrow
   keys rove focus between triggers, Home/End jump to the ends, and Enter /
   Space activate the focused tab so neither focus nor activation gets stuck
   mid-list.
   Ceiling: single-select tabs only — no vertical keyboard orientation in the
   spec, no drag-reorder, no overflow scroll nav. Browsers ship no native tab
   role manager (and <dialog> is unrelated), so a small custom roving manager
   is the native ceiling.
   Upgrade: hoist roving into a shared useRovingIndex hook if a second
   interactive family needs the same pattern. */

/* Root: owns the active value (controlled via value/onValueChange or
   uncontrolled via defaultValue) and threads it to the list + panels. */
export function Tabs({ value, defaultValue, onValueChange, className = '', style, children, ...props }) {
  const [internal, setInternal] = useState(defaultValue ?? null)
  const active = value !== undefined ? value : internal
  const setActive = (next) => {
    if (next !== active) {
      if (value !== undefined) onValueChange?.(next)
      else setInternal(next)
    }
  }

  const enhanced = Children.map(children, (child) => {
    if (!child) return child
    if (child.type === TabsList) return cloneElement(child, { active, setActive })
    if (child.type === TabsContent) return cloneElement(child, { active })
    return child
  })

  return (
    <div className={`corp-tabs${className ? ' ' + className : ''}`} style={style} {...props}>
      {enhanced}
    </div>
  )
}

export function TabsList({ active, setActive, className = '', style, children, ...props }) {
  const listRef = useRef(null)

  const triggerValue = (el) => el?.dataset.value

  const focusTrigger = (el) => el?.focus()

  const setFocusByOffset = (currentEl, offset) => {
    const triggers = Array.from(listRef.current?.querySelectorAll('[role="tab"]') ?? [])
    const index = triggers.indexOf(currentEl)
    const next = triggers[(index + offset + triggers.length) % triggers.length]
    focusTrigger(next)
  }

  const onKeyDown = (event) => {
    const triggers = Array.from(listRef.current?.querySelectorAll('[role="tab"]') ?? [])
    const current = document.activeElement
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        setFocusByOffset(current, 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        setFocusByOffset(current, -1)
        break
      case 'Home':
        event.preventDefault()
        focusTrigger(triggers[0])
        break
      case 'End':
        event.preventDefault()
        focusTrigger(triggers[triggers.length - 1])
        break
      case 'Enter':
      case ' ':
        if (current?.dataset.value !== undefined) {
          event.preventDefault()
          setActive(current.dataset.value)
        }
        break
      default:
        break
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      className={`corp-tabs__list${className ? ' ' + className : ''}`}
      style={style}
      onKeyDown={onKeyDown}
      {...props}
    >
      {Children.map(children, (child) => {
        if (!child || child.type !== TabsTrigger) return child
        const value = child.props.value
        const selected = value === active
        return cloneElement(child, {
          id: `corp-tabs-trigger-${value}`,
          role: 'tab',
          'aria-selected': selected,
          'aria-controls': `corp-tabs-panel-${value}`,
          tabIndex: selected ? 0 : -1,
          onClick: () => setActive(value),
          className:
            `corp-tabs__trigger${selected ? ' corp-tabs__trigger--active' : ''}` +
            (child.props.className ? ' ' + child.props.className : ''),
        })
      })}
    </div>
  )
}

export function TabsTrigger({ value, className = '', style, children, ...props }) {
  return (
    <button type="button" data-value={value} className={`corp-tabs__trigger${className ? ' ' + className : ''}`} style={style} {...props}>
      {children}
    </button>
  )
}

export function TabsContent({ value, active, className = '', style, children, ...props }) {
  if (active !== value) return null
  return (
    <div
      role="tabpanel"
      id={`corp-tabs-panel-${value}`}
      aria-labelledby={`corp-tabs-trigger-${value}`}
      className={`corp-tabs__panel${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}
