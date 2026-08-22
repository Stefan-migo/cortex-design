# Corporate Family — Provenance NOTICE

This family (`src/components/Corporate/`) is a MIT-licensed port of components
from [shadcn/ui](https://ui.shadcn.com/). Each component triad carries a per-file
NOTICE header naming the shadcn source path. This index maps every family
component to its distinct shadcn source.

- **Original work**: Copyright (c) 2023 shadcn.
- **Port**: CSS-only, zero UI dependencies (React + browser primitives replace
  Radix). Styling uses local `.corp-*` BEM classes with per-component `--corp-*`
  tokens defaulting to the app palette.

| Component | shadcn source path |
|-----------|--------------------|
| Button | `apps/www/registry/ui/button.tsx` |
| Badge | `apps/www/registry/ui/badge.tsx` |
| Card | `apps/www/registry/ui/card.tsx` |
| Input | `apps/www/registry/ui/input.tsx` |
| Textarea | `apps/www/registry/ui/textarea.tsx` |
| Label | `apps/www/registry/ui/label.tsx` |
| NativeSelect | `apps/www/registry/ui/select.tsx` |
| Separator | `apps/www/registry/ui/separator.tsx` |
| Skeleton | `apps/www/registry/ui/skeleton.tsx` |
| Table | `apps/www/registry/ui/table.tsx` |
| Breadcrumb | `apps/www/registry/ui/breadcrumb.tsx` |
| Pagination | `apps/www/registry/ui/pagination.tsx` |
| Kbd | `apps/www/registry/ui/kbd.tsx` |
| Avatar | `apps/www/registry/ui/avatar.tsx` |
| Checkbox | `apps/www/registry/ui/checkbox.tsx` |
| Tooltip | `apps/www/registry/ui/tooltip.tsx` |
| Progress | `apps/www/registry/ui/progress.tsx` |
| Tabs | `apps/www/registry/ui/tabs.tsx` |

Source base: `https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/`

NOTE: only the Button, Badge, Card, and Skeleton triads ship in this slice (PR 1).
The remaining 14 rows document the family contract and are filled by later slices
(P2–P4). The full 18-row index is complete per CF-002 / REQ-FAMILY-003.
