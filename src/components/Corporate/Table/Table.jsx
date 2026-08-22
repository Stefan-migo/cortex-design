/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/table.tsx */
import './Table.css'

/* ponytail: semantic <table>/<caption>/<th scope> fragments replace Tailwind
   data-display utilities. Ceiling: plain HTML table semantics only, no
   virtualized rows, no sortable-column directive.
   Upgrade: lift sorting/accessibility helpers into the consumer. */

export function Table({ className = '', style, ...props }) {
  return (
    <div className={`corp-table__wrapper${className ? ' ' + className : ''}`} style={style}>
      <table className="corp-table" {...props} />
    </div>
  )
}

export function TableHeader({ className = '', style, ...props }) {
  return <thead className={`corp-table__header${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function TableBody({ className = '', style, ...props }) {
  return <tbody className={`corp-table__body${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function TableFooter({ className = '', style, ...props }) {
  return <tfoot className={`corp-table__footer${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function TableRow({ className = '', style, ...props }) {
  return <tr className={`corp-table__row${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function TableHead({ className = '', style, ...props }) {
  return <th className={`corp-table__head${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function TableCell({ className = '', style, ...props }) {
  return <td className={`corp-table__cell${className ? ' ' + className : ''}`} style={style} {...props} />
}

export function TableCaption({ className = '', style, ...props }) {
  return <caption className={`corp-table__caption${className ? ' ' + className : ''}`} style={style} {...props} />
}
