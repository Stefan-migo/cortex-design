/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/breadcrumb.tsx */
import './Breadcrumb.css'

/* ponytail: semantic <nav aria-label> + <ol>/<li> list fragments replace the
   shadcn Breadcrumb NavLink primitives and Tailwind flex utilities.
   Ceiling: static hierarchical breadcrumbs only, no auto-truncation, no
   collapse-on-overflow magic like the shadcn BreadcrumbEllipsis without a
   DropdownMenu.
   Upgrade: lift collapse/truncation into the consumer template. */

/* Root: the <nav> landmark exposing navigation hierarchy. */
export function Breadcrumb({ className = '', style, 'aria-label': ariaLabel = 'Breadcrumb', ...props }) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`corp-breadcrumb${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}

export function BreadcrumbList({ className = '', style, ...props }) {
  return <ol className={`corp-breadcrumb__list${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function BreadcrumbItem({ className = '', style, ...props }) {
  return <li className={`corp-breadcrumb__item${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function BreadcrumbLink({ className = '', style, ...props }) {
  return (
    <a className={`corp-breadcrumb__link${className ? ' ' + className : ''}`} style={style} {...props} />
  )
}

export function BreadcrumbPage({ className = '', style, ...props }) {
  return (
    <span
      aria-current="page"
      tabIndex={-1}
      className={`corp-breadcrumb__page${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    />
  )
}

export function BreadcrumbSeparator({ className = '', style, ...props }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={`corp-breadcrumb__separator${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      {props.children ?? '/'}
    </li>
  )
}

/* Static ellipsis — collapses the middle of a long trail without a menu.
   Reduced to a plain aria-hidden surrogate (no interactive popover). */
export function BreadcrumbEllipsis({ className = '', style, ...props }) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={`corp-breadcrumb__ellipsis${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      …
    </span>
  )
}
