# Design: shadcn-corporate — Corporate UI family (MIT port)

## Technical Approach

Add `src/components/Corporate/` as a second family kind (function-first) mirroring the reactbits triad: `<Name>.jsx` + flat BEM-ish `<Name>.css` + `<Name>.stories.jsx` with `tags:['autodocs']`. Port 18 shadcn/ui components CSS-only with **zero UI deps** (React + browser primitives replace Radix). Map shadcn tokens to **local per-component `--corp-*` vars** defaulting to the app palette (`var(--accent)`, `var(--text)`, `var(--border)`, `var(--surface)`) — never global `:root`. Extend the catalog (DC-004) with 18 entries (`moodTags:["corporate"]`, extended `visualContext`), bump 1.0.0→1.1.0. Add MIT `NOTICE` header per `.jsx` + family `NOTICE.md`. Satisfies specs CF-001..CF-007, CA-005, CAT-001/005, REQ-FAMILY-002/003.

## Architecture Decisions

| Decision | Options | Choice / Rationale |
|---|---|---|
| Family layout | dedicated `Corporate/` folder vs spread in existing dirs | **Dedicated `Corporate/`** (CF-001/REQ-FAMILY-002). Matches reactbits family pattern; clean provenance; zero adapter change; story glob is recursive. Spreading muddles effect-vs-function provenance and attribution. |
| Token system | global shadcn `:root` vs local `--corp-*` | **Local only** (CF-004/CA-002 scenario "Corporate local default"). App `:root` owns `--accent/--text/--border/--surface`; each `.css` defines `--corp-*` vars defaulting to those. No `--background/--foreground/--primary/--radius` (they'd collide with app aesthetic). |
| Radix replacement | inline JS per component vs shared hooks | **Inline per-component React + browser primitives** (CF-003/CF-005). Only 4 Tier B surfaces need logic; a shared hooks module is YAGNI (one consumer each). `ponytail:` comment documents what Radix did + ceiling + upgrade path, per existing pattern (Counter/BorderGlow). |
| Class convention | BEM (`corp-button__icon`) | **BEM block `corp-{component}` + `__element`**, scoped under `.corp-*` to bind local vars and avoid collision. Catalogue ids stay dashed (`button`, `card`). |
| Variant prop model | string union vs booleans | **String `variant` prop** with shadcn's names (`default/outline/ghost/secondary/destructive/link` for Button), mapped to `corp-button--{variant}` modifier classes. Matches DC-004 adaptationRules.variants object map. |

### Tier B interaction contracts (CF-005, pinned)

- **Checkbox** (`corp-checkbox`): role `checkbox`, `aria-checked` mirrors controlled `checked`; toggles on click **and Enter/Space**; fires `onChange`. Radix replaced by native `<input type="checkbox">` hidden + styled box, or role attr if pure div. `ponytail:` notes native-input upgrade path.
- **Tabs** (`corp-tabs`): `role="tablist"` wrapping buttons with `role="tab"`, `aria-selected` on active; **roving tabindex** — active tab `tabIndex=0`, others `-1`; ArrowLeft/Right rotate focus + selection, Home/End jump; panels `role="tabpanel"` with `aria-labelledby`.
- **Tooltip** (`corp-tooltip`): trigger button/span; shows on **focus** and pointerenter, hides on **blur/Escape** (`aria-expanded` or `role="tooltip"` + `aria-describedby`); no outside-click manager (YAGNI for hover hint).
- **Progress** (`corp-progress`): `role="progressbar"` + `aria-valuenow/min/max`; width driven by `--corp-value`.

### Shared prop conventions

Every component: `className` merge (append to `corp-{block}`), remaining props (incl. event handlers) spread to the root element, `style` passthrough. Colors/radii come from local `--corp-*` vars settable at the component root, defaulting to app palette.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/components/Corporate/NOTICE.md` | Create | Family provenance index: 18 components → shadcn source paths |
| `src/components/Corporate/{Name}/{Name}.jsx` ×18 | Create | Ported component (NOTICE header + `ponytail:` comment) |
| `src/components/Corporate/{Name}/{Name}.css` ×18 | Create | Flat CSS, local `--corp-*` vars |
| `src/components/Corporate/{Name}/{Name}.stories.jsx` ×18 | Create | `tags:['autodocs']`, Default + 2–4 variants |
| `.storybook/component-catalog.json` | Modify | +18 entries, vocab extension, version→1.1.0 |
| `src/__tests__/components/Corporate.{Name}.test.jsx` ×18 | Create | Focused tests (structural Tier A, interaction Tier B) |
| `src/data/catalog.js` | Verify-only | `getAll/getById` auto-reads new entries; no change required |

## Interfaces / Contracts

**NOTICE header** (top of every `.jsx`, CF-002):
```jsx
/* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
   Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/{name}.tsx */
```

**NOTICE.md shape**: table `Component | shadcn source path` — all 18 rows (REQ-FAMILY-003 "not shared", CF-002 "complete").

**Catalog entry** (DC-004 object-form variants):
```json
{ "id": "button", "storyFile": "../src/components/Corporate/Button/Button.stories.jsx",
  "visualContext": ["button","form"], "moodTags": ["corporate"],
  "adaptationRules": { "variants": { "Default": {}, "Destructive": {}, "Outline": {}, "Ghost": {}, "Link": {}, "Secondary": {}, "Small": {}, "Large": {} },
    "tokenSlots": ["--corp-primary","--corp-fg","--corp-radius"], "defaultProps": {}, "defaults": {} } }
```

## Testing Strategy

| Layer | What | How |
|---|---|---|
| Tier A structural | Button→`button`, Badge, Card→`card`/article, Input→`textbox`, Textarea→`textbox`, Label(for), NativeSelect→`combobox`, Separator, Skeleton, Table→`table` (+caption/scope), Breadcrumb→`navigation`(nav), Pagination→`navigation`+list, Kbd, Avatar→`img` | `@testing-library` `getByRole` + accessible-name, mirrors `FuzzyText.test.jsx` |
| Tier B interaction | Checkbox aria-checked+change; Tabs roving tabindex+Arrow/Home/End+aria-selected; Tooltip focus/blur/Escape show-hide; Progress aria-valuenow/min/max | jsdom, `fireEvent`/`userEvent`, asserts CF-005 scenarios |
| Catalog/global | 69 entries, version 1.1.0, `queryComponents("table",["corporate","clean"])` matches CA-005; no phantom ids (DC-007) | `.cortex` validate + `catalog-query.test.js` |

**Commit ordering (SB-GLOBAL-002):** catalog JSON + all component/story files committed in the same logical unit **before** running vitest — `getAll()/getById()` and `.cortex` bootstrap read committed files; uncommitted `src/` + `.storybook/` break zero-diff. Verify step enforces. **a11y gate:** addon-a11y (SB-GLOBAL-001) must show zero critical per story; run in Storybook before merge, fix critical in the apply slice.

## Threat Matrix

N/A — this change adds CSS-only UI components and JSON catalog entries. No routing, shell/subprocess invocation, VCS/PR automation, executable-file classification, or process-integration boundary is introduced or modified. (Commit-ordering discipline for SB-GLOBAL-002 is a workflow rule, not a code automation boundary.)

## Migration / Rollout

No data migration, flags, or phased rollout — additive new folder + catalog bump. Rollback: `git revert` of the change commit(s) removes `Corporate/` and restores catalog 1.0.0; story glob is recursive/additive so removal is clean.

## Slice Plan (chained PRs, stacked-to-main, budget 400 lines)

A triad is ~150–250 lines (jsx ~60–120, css ~40–80, stories ~50–90) + ~60-line test ≈ **~210–310 lines/triad**. 18 triads can't land in one clean review → stack slices by family role:

| Slice | Scope | Est. lines | Rationale |
|---|---|---|---|
| P1 (foundation) | `Corporate/` scaffold: `NOTICE.md`, 4 baseline triads (Button, Badge, Card, Skeleton) + their tests | ~900–1000 | Establishes pattern, token/variant conventions, NOTICE contract; sets template for all later slices |
| P2 (forms) | Input, Textarea, Label, NativeSelect, Checkbox(B) + tests | ~1300 | Form cluster; Checkbox brings first Tier B interaction |
| P3 (data) | Table, Pagination, Kbd, Separator, Avatar + tests | ~1300 | Data-display cluster |
| P4 (nav/interactive) | Breadcrumb, Tabs(B), Tooltip(B), Progress(B) + tests | ~1200 | Remaining Tier B (roving tabindex, tooltip, progress) |
| P5 (catalog) | `.storybook/component-catalog.json` (+18, 1.1.0) + `queryComponents` test update + detail surface checks | ~250 | Introduces vocabulary, version bump; commit this together with P2–P4 merges so SB-GLOBAL-002 zero-diff holds |

Chain: P1 → P2 → P3 → P4 → P5, each targeting the previous PR branch (Feature Branch Chain). **Each slice > budget guard; chained PRs are required, not optional** — reviewer sees ~1000–1300 lines max at any point, all autonomous (own start/finish, own tests green). P5 must stack after P2–P4 since catalog entries reference storyFiles that only exist once components land.

## Non-Goals & Ceilings (ponytail)

- **No v2 surfaces** (CF-007): Accordion, Dialog, Sheet, DropdownMenu, Popover, Menu*, Sidebar, Slider, Toggle, RadioGroup, Switch, Collapsible — deferred. Each needs a focus-trap/outside-click manager = separate change.
- **No Tier C deps** (Calendar, DatePicker, Chart, DataTable, Command, Toast, custom Select…) — require Radix or deep reimplementation; excluded.
- **No family index barrel** — no unit consumer; catalog + stories are the surface (YAGNI, exploration rejected approach 3).
- **No global token system** — local `--corp-*` only; a global migration is a separate change.
- `ponytail:` ceiling comments: checkbox → native input upgrade; tabs → full roving-tab manager; tooltip → no outside-click dismiss; progress → no indeterminate/animation. Each names upgrade path.

## Open Questions

- none — blocked on nothing; ready for sdd-tasks.

## Graphify nodes/edges consulted

- Nodes: `component`, `adaptationRules`, `variants`, `schema.json` (object-form), `visualContext`, `moodTags`, `storyFile`, `properties`, `required`, `definitions` — catalog shape (DC-004), from `.cortex/schema.json`.
- Nodes: `catalog-query.js`/`queryComponents`, `catalog-query.test.js` — CA-001/CA-005 query semantics (visualContext exact, moodTags OR).
- Nodes: `component-catalog.json`, `data/catalog.js` (`getAll`/`getById`), `entry` (ComponentDetail.test.jsx), `App` community — app surface integration (reads committed catalog; drives commit-before-vitest).
- Communities: `contract`, `schema.json`, `properties` (catalog), `catalog-query.test.js`, `App.jsx`.
- Graph is stale (built at `93fcb38`, HEAD 2 commits ahead) — structure for catalog/schema accurate; note per policy; refresh after archive.
