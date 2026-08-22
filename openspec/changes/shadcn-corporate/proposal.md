# Proposal: shadcn-corporate — Corporate UI family (MIT port)

## Intent

CortexDesign's component library is artistic-focused (reactbits effects: animations, backgrounds, text). It lacks a structured, function-first family for corporate jobs — forms, dashboards, navigation, data display. Adding a `corporate` family ports free (MIT) shadcn/ui components using the existing CSS-only pattern (JSX + flat CSS + autodocs story), **zero UI dependencies** (no Radix, no Tailwind, no new npm packages). Legal: shadcn/ui is MIT; every port carries attribution.

## Scope

### In Scope (v1 = 18 components)
- `src/components/Corporate/<Name>/{<Name>.jsx,<Name>.css,<Name>.stories.jsx}` — new family, mirroring reactbits triad pattern.
- Tier A (pure visual): Button, Badge, Card, Input, Textarea, Label, NativeSelect, Separator, Skeleton, Table, Breadcrumb, Pagination, Kbd, Avatar.
- Tier B (bounded interactive): Checkbox, Tooltip, Progress, Tabs — well-specified ARIA, testable keyboard nav.
- MIT `NOTICE` header in each `.jsx` + family-level `Corporate/NOTICE.md` provenance index.
- Local per-component CSS vars only (no global `:root` token collision with app aesthetic).
- Catalog: +18 entries (DC-004), `moodTags:["corporate"]` + extended `visualContext` vocabulary, version 1.0.0 → 1.1.0.
- Per-component tests (roles + keyboard nav for Tier B).

### Out of Scope (v2+)
- Heavy interactive surfaces: Accordion, Dialog, Sheet, DropdownMenu, Popover, ContextMenu, Menubar, NavMenu, Sidebar, Slider, Toggle group, RadioGroup, Switch, Collapsible.
- Tier C (external deps): Calendar, DatePicker, Carousel, Chart, DataTable, Command, Drawer, Toast, InputOTP, Resizable, custom Select, Combobox.
- Registry/index barrel per family (no unit consumer today).
- Global token system migration.

## Capabilities

### New Capabilities
- `corporate-family`: the `src/components/Corporate/` component set — props, structure, CSS-only styling, local token mapping, and per-component story/test surface for the 18 v1 components.

### Modified Capabilities
- `pattern-library`: family pattern gains a function-first (corporate) counterpart to the effect (reactbits) families; both follow the same triad + autodocs pattern.
- `component-adaptation`: catalog entries add 18 corporate components with `moodTags`/`visualContext` vocabulary extensions and local-variable token mapping.
- `catalog-adapter`: version 1.0.0 → 1.1.0; render grid/detail confirms new corporate entries.

## Approach

- New top-level `src/components/Corporate/<Name>/` folder per family (mirrors reactbits).
- Flat CSS with per-component local vars; colors default to app palette (`var(--accent)`, `var(--text)`, `var(--border)`, `var(--surface)`) — no global token introduction.
- `ponytail:` comments document Radix/JS replaced (e.g. checkbox ARIA) with ceiling + upgrade path.
- Ported components keep PascalCase names; catalog ids are dashed.
- Catalog committed before vitest (SB-GLOBAL-002).
- Graphify refresh (`graphify . --update`) after archive.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/Corporate/` | New | 18 component triads + `NOTICE.md` |
| `.storybook/component-catalog.json` | Modified | +18 entries, vocab extension, 1.1.0 |
| `src/data/catalog.js` | Modified | auto-reflects new entries (verify render) |
| `src/__tests__/components/` | New | per-component + Tier B interaction tests |
| `openspec/specs/{pattern-library,component-adaptation,catalog-adapter}` | Modified | delta specs |
| `graphify-out/` | Modified | refresh after archive |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| a11y regression in Tier B ports (focus/ARIA) | Med | Explicit role + keyboard-nav tests; addon-a11y gate |
| Scope creep toward Tier B/C surfaces | Med | v1 hard boundary = 18 components; rest is v2 |
| Catalog-vocabulary drift (free-string tags) | Low | Document extended vocabulary; whitelist on any future enum |
| Token-name collision with app `:root` | Low | Local per-component vars only |
| Graph staleness (2 commits behind) | Low | Refresh after archive |

## Rollback Plan

- Revert commit(s) adding the change: `git revert` of the change commit restores the 1.0.0 catalog and removes `src/components/Corporate/`. Story glob is recursive and additive — removal is clean, no adapter changes to undo.

## Dependencies

- shadcn/ui ported component sources (MIT, attribution via NOTICE). No runtime dependencies added.

## Success Criteria

- [ ] 18 Corporate component triads live in Storybook with autodocs + a11y panel clean of critical violations.
- [ ] Catalog 1.1.0 validates (`src/` + `.storybook/` zero diff at bootstrap); 18 entries resolve.
- [ ] All tests pass incl. Tier B keyboard-nav interactions.
- [ ] Zero UI dependencies added (`package.json` unchanged for runtime deps).
