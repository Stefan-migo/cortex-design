/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/progress.tsx */
import './Progress.css'

/* ponytail: a div with role=progressbar replaces Radix Progress and Tailwind
   width utilities; the shown fraction is driven by a --corp-value custom
   property, keeping the width in CSS while exposing aria-valuenow/min/max.
   Ceiling: determinate progress only — no indeterminate spinner animation, no
   buffer/dual-buffer animation, no value delay. Native <progress> is the
   element-level ceiling and is bypassed so the --corp-value theming approach
   matches the family's CSS-first tokens.
   Upgrade: switch to <progress> for automatic indeterminate + native value
   semantics if a determinate-only ceiling becomes a limitation. */

/* Progress: renders role=progressbar with the value range surfaced in ARIA
   and the width fraction in --corp-value. Supports aria-label and
   aria-valuetext passthrough for naming and verbalized states. */
export function Progress({ value = 0, min = 0, max = 100, className = '', style, 'aria-label': ariaLabel, 'aria-valuetext': ariaValuetext, ...props }) {
  const normalized = Math.max(min, Math.min(max, value))
  const percent = ((normalized - min) / (max - min)) * 100
  return (
    <div
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={normalized}
      aria-label={ariaLabel}
      aria-valuetext={ariaValuetext}
      className={`corp-progress${className ? ' ' + className : ''}`}
      style={{ '--corp-value': `${percent}%`, ...style }}
      {...props}
    >
      <div className="corp-progress__indicator" />
    </div>
  )
}
