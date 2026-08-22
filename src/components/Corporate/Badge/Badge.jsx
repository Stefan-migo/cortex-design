/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/badge.tsx */
import './Badge.css'

/* ponytail: React string-variant prop + local --corp-* vars replace Radix Slot
   and Tailwind cva. Ceiling: no asChild polymorphic rendering, default <span>
   only; variant modifiers fixed to shadcn's set.
   Upgrade: add an `as` prop or React 19 ref-forwarding for asChild parity. */

export function Badge({ variant = 'default', className = '', style, ...props }) {
  const mod = variant === 'default' ? '' : ` corp-badge--${variant}`
  return (
    <span
      className={`corp-badge${mod}${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}
