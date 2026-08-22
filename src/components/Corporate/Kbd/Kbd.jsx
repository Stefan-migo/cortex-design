/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/kbd.tsx */
import './Kbd.css'

/* ponytail: native <kbd> + local --corp-* vars replace Tailwind kbd utilities.
   Ceiling: static keyboard display, no custom key-width mapping. */

export function Kbd({ className = '', style, ...props }) {
  return <kbd className={`corp-kbd${className ? ' ' + className : ''}`} style={style} {...props} />
}
