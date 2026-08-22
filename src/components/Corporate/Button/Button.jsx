/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/button.tsx */
import './Button.css'

/* ponytail: React string-variant prop + local --corp-* vars replace Radix Slot
   and Tailwind cva. Ceiling: no asChild polymorphic rendering, default <button>
   only; variant modifiers fixed to shadcn's set.
   Upgrade: add an `as` prop or React 19 ref-forwarding for asChild parity. */

export function Button({
  variant = 'default',
  size = 'default',
  className = '',
  style,
  type = 'button',
  ...props
}) {
  const mods =
    variant === 'default' ? '' : ` corp-button--${variant}`
  const sizeMod = size === 'default' ? '' : ` corp-button--${size}`
  return (
    <button
      type={type}
      className={`corp-button${mods}${sizeMod}${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}
