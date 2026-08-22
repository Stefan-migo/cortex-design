/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/checkbox.tsx */
import './Checkbox.css'

/* ponytail: styled div box + role=checkbox replaces Radix Checkbox and
   Tailwind peer utilities. aria-checked mirrors controlled checked; click and
   Space/Enter each toggle via onChange (Enter does not activate native
   checkboxes, so it is handled here to honor shadcn parity).
   Ceiling: single boolean checked state, no indeterminate tri-state, no native
   form value submission.
   Upgrade: switch to a hidden native input for form-value + indeterminate. */

export function Checkbox({ className = '', style, checked, onChange, id, ...props }) {
  const handleKeyDown = (event) => {
    // Enter/Space toggle (native checkboxes ignore Enter, so both are handled
    // here to honor shadcn parity and the CF-005 keyboard contract).
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onChange?.(event)
    }
  }
  return (
    <div
      role="checkbox"
      id={id}
      aria-checked={checked}
      tabIndex={0}
      className={`corp-checkbox${className ? ' ' + className : ''}`}
      style={style}
      onClick={onChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}
