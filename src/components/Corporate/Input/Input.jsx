/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/input.tsx */
import './Input.css'

/* ponytail: native <input> + local --corp-* vars replace Tailwind field
   utilities. Ceiling: browser-native textbox semantics, no asChild polymorphic
   rendering, default <input> only.
   Upgrade: add an `as` prop or React 19 ref-forwarding for asChild parity. */

export function Input({ className = '', style, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={`corp-input${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}
