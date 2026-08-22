/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/textarea.tsx */
import './Textarea.css'

/* ponytail: native <textarea> + local --corp-* vars replace Tailwind field
   utilities. Ceiling: browser-native textbox semantics, no auto-resize / no
   asChild polymorphic rendering, default <textarea> only.
   Upgrade: add an `autoResize` prop or `as` prop for parity with advanced
   textarea wrappers. */

export function Textarea({ className = '', style, ...props }) {
  return (
    <textarea
      className={`corp-textarea${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}
