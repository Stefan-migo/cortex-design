/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/separator.tsx */
import './Separator.css'

/* ponytail: native <hr> + local --corp-* vars replace Radix Separator and
   Tailwind border utilities. aria-orientation mirrors the orientation prop;
   jsdom renders <hr> with an implicit separator role (native standard).
   Ceiling: visual rule only, no nested/vertical layout management.
   Upgrade: use a div + role for non-standard vertical alignment when a layout
   needs it. */

export function Separator({ orientation = 'horizontal', className = '', style, ...props }) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={`corp-separator corp-separator--${orientation}${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}
