/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/card.tsx */
import './Card.css'

/* ponytail: React div slots + local --corp-* vars replace Radix Slot and
   Tailwind cva. Ceiling: no asChild polymorphic rendering, fixed slot set
   (header/footer/title/content); default <div> root.
   Upgrade: add an `as` prop for article/section parity. */

export function Card({ className = '', style, ...props }) {
  return (
    <div
      className={`corp-card${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}

export function CardHeader({ className = '', style, ...props }) {
  return (
    <div
      className={`corp-card__header${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}

export function CardFooter({ className = '', style, ...props }) {
  return (
    <div
      className={`corp-card__footer${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}

export function CardTitle({ className = '', style, ...props }) {
  return (
    <h3
      className={`corp-card__title${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}

export function CardContent({ className = '', style, ...props }) {
  return (
    <div
      className={`corp-card__content${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}
