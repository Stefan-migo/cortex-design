/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/skeleton.tsx */
import './Skeleton.css'

/* ponytail: pure div + CSS pulse animation replaces Tailwind bg utilities.
   Ceiling: single shimmer pulse, no custom animation control.
   Upgrade: add a `variant`/`speed` prop to tune the pulse keyframes. */

export function Skeleton({ className = '', style, ...props }) {
  return (
    <div
      className={`corp-skeleton${className ? ' ' + className : ''}`}
      style={style}
      aria-hidden="true"
      {...props}
    />
  )
}
