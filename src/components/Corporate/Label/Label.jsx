/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/label.tsx */
import './Label.css'

/* ponytail: native <label> + local --corp-* vars replace Radix Label and
   Tailwind peer utilities. Ceiling: no peer-state styling / no asChild
   polymorphic rendering, default <label> only; clicking focuses the
   associated control via native htmlFor.
   Upgrade: add `peer`-style variant props or React 19 ref-forwarding. */

export function Label({ className = '', style, htmlFor, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`corp-label${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}
