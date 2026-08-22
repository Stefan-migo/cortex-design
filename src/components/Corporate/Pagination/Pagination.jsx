/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/pagination.tsx */
import './Pagination.css'

/* ponytail: native <nav aria-label> + <ul> list replace Tailwind pager
   utilities. Ceiling: static list markup, no auto page-window math, no active
   state wiring; consumers render items.
   Upgrade: return page numbers + build the window in a small helper when a
   consumer needs app-generated paging. */

export function Pagination({ className = '', style, ...props }) {
  return (
    <nav aria-label="pagination" className={`corp-pagination${className ? ' ' + className : ''}`} style={style} {...props} />
  )
}

export function PaginationContent({ className = '', style, ...props }) {
  return <ul className={`corp-pagination__content${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function PaginationItem({ className = '', style, ...props }) {
  return <li className={`corp-pagination__item${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function PaginationLink({ className = '', style, ...props }) {
  return <a className={`corp-pagination__link${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function PaginationPrevious({ className = '', style, ...props }) {
  return (
    <a
      aria-label="Go to previous page"
      className={`corp-pagination__link corp-pagination__link--nav${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      ← Previous
    </a>
  )
}

export function PaginationNext({ className = '', style, ...props }) {
  return (
    <a
      aria-label="Go to next page"
      className={`corp-pagination__link corp-pagination__link--nav${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      Next →
    </a>
  )
}

export function PaginationEllipsis({ className = '', style, ...props }) {
  return (
    <span aria-hidden="true" className={`corp-pagination__ellipsis${className ? ' ' + className : ''}`} style={style} {...props}>
      ⋯
    </span>
  )
}
