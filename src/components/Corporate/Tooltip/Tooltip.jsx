/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/tooltip.tsx */
import { Children, cloneElement, useId, useState } from 'react'
import './Tooltip.css'

/* ponytail: focus/pointerentry shows and blur/Escape hides, replacing Radix
   Tooltip and its Tailwind arrow primitives. The trigger describes itself via
   aria-describedby pointed at the tooltip node.
   Ceiling: no outside-click dismissal (pointerenter can cross into the tip
   while pointerdown elsewhere is a consumer concern), no delay/duration
   knobs, no arrow, single manual open-close pair per trigger.
   Upgrade: hoist delay/dismiss-while-open into a shared tooltip hook if a
   second surface needs them. */

/* Root: owns open state and a stable id shared by trigger + content. The
   trigger and content arrive as siblings in `children` (shadcn shape). */
export function Tooltip({ open, defaultOpen = false, onOpenChange, className = '', style, children, ...props }) {
  const [internal, setInternal] = useState(defaultOpen)
  const isOpen = open !== undefined ? open : internal
  const setOpen = (next) => {
    if (open !== undefined) onOpenChange?.(next)
    else setInternal(next)
  }
  const tooltipId = `corp-tooltip-${useId().replace(/:/g, '')}`

  const enhanced = Children.map(children, (child) => {
    if (!child) return child
    if (child.type === TooltipTrigger) {
      return cloneElement(child, {
        tooltipId,
        isOpen,
        setOpen,
        className:
          `corp-tooltip__trigger${child.props.className ? ' ' + child.props.className : ''}`,
      })
    }
    if (child.type === TooltipContent) {
      return cloneElement(child, { tooltipId, isOpen })
    }
    return child
  })

  return (
    <div className={`corp-tooltip${className ? ' ' + className : ''}`} style={style} {...props}>
      {enhanced}
    </div>
  )
}

export function TooltipTrigger({
  tooltipId,
  isOpen,
  setOpen,
  className = '',
  style,
  children,
  ...props
}) {
  const triggerProps = {
    'aria-describedby': isOpen ? tooltipId : undefined,
    onFocus: (event) => {
      props.onFocus?.(event)
      setOpen(true)
    },
    onBlur: (event) => {
      props.onBlur?.(event)
      setOpen(false)
    },
    onPointerEnter: (event) => {
      props.onPointerEnter?.(event)
      setOpen(true)
    },
    onPointerLeave: (event) => {
      props.onPointerLeave?.(event)
      setOpen(false)
    },
    onKeyDown: (event) => {
      props.onKeyDown?.(event)
      if (event.key === 'Escape') setOpen(false)
    },
  }
  return (
    <button
      type="button"
      {...props}
      {...triggerProps}
      className={`corp-tooltip__trigger${className ? ' ' + className : ''}`}
      style={style}
    >
      {children}
    </button>
  )
}

export function TooltipContent({ tooltipId, isOpen, className = '', style, children, ...props }) {
  if (!isOpen) return null
  return (
    <div
      role="tooltip"
      id={tooltipId}
      className={`corp-tooltip__content${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}
