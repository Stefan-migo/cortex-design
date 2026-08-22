/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/avatar.tsx */
import './Avatar.css'

/* ponytail: native <img role=img> + initials fallback replace Radix Avatar and
   Tailwind ring utilities. No @container-based size auto-scaling; font-size
   scales with a --corp-size unit via em.
   Ceiling: static src-or-initials, no image-fetch error boundary, no
   status/online variants.
   Upgrade: add onError fallback state or a status badge when needed. */

export function Avatar({ src, alt = '', initials, className = '', style, ...props }) {
  if (src) {
    return <img src={src} alt={alt} role="img" className={`corp-avatar${className ? ' ' + className : ''}`} style={style} {...props} />
  }
  return (
    <span role="img" aria-label={alt || initials} className={`corp-avatar corp-avatar--fallback${className ? ' ' + className : ''}`} style={style} {...props}>
      {initials}
    </span>
  )
}
