/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/select.tsx */
import './NativeSelect.css'

/* ponytail: native <select> + local --corp-* vars replace Radix Select and
   Tailwind field utilities. Ceiling: browser-native combobox/listbox
   semantics, no custom options / no searchable multi-select; default <select>
   only.
   Upgrade: add a custom options menu (role=listbox/option) for rich variants. */

export function NativeSelect({ className = '', style, children, ...props }) {
  return (
    <select
      className={`corp-select${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      {children}
    </select>
  )
}
