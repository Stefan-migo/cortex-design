# Exploration: shadcn-corporate — Porting a "corporate" UI component family from shadcn/ui

## Change

Add a new `corporate` family of UI components to the CortexDesign Storybook library, porting free (MIT) shadcn/ui components into the project's existing CSS-only pattern (JSX + flat BEM-ish CSS + `ponytail:` ceiling comments + autodocs story), with ZERO UI dependencies (no Radix, no Tailwind, no new npm packages). Counterpart to the existing artistic reactbits family (TextAnimations/Animations/Backgrounds/etc.).

## Current State

- **Stack**: Vite 5 + React 19 (JSX, no TypeScript), Storybook, Vitest 4 + @testing-library/react + jest-dom + jsdom (`globals:true`, `css:true`).
- **Component pattern** (`src/components/Components/Counter/Counter.{jsx,css,stories.jsx}`): single-dir, one `.jsx` + one flat `.css` (BEM-ish, `counter__digit`) + one `.stories.jsx` with `tags:['autodocs']`. `ponytail:` comments at top of the `.jsx` document what was replaced (e.g. framer-motion `useSpring` → CSS transition) and name the ceiling + upgrade path. Props styled via inline style or CSS vars defined per-component.
- **Family folders**: `src/components/{Animations,Backgrounds,Components,Layout,TextAnimations,Transitions}` — reactbits-derived, grouped by animation/effect category.
- **Canonical catalog** (DC-004, `.storybook/component-catalog.json`, version 1.0.0, 51 entries): each entry has `id` (dashed), `storyFile` (relative `../src/...`), `visualContext[]`, `moodTags[]`, `adaptationRules{variants(tokenSlots,defaultProps,defaults)}`. Validated by `.cortex/schema.json` + `.cortex/validate.js` (runs at bootstrap and `.cortex/` capsule). `variants` must be an OBJECT map, not array (DC-004).
- **Story discoverability**: `.storybook/main.js` globs `'../src/**/*.stories.@(js|jsx)'` — recursive, so any new folder under `src/` is picked up automatically.
- **Catalog query** (CA-001, `.cortex/catalog-query.js`): `queryComponents(catalog, {visualContext, moodTags})` — `visualContext` exact-match, `moodTags` OR-within-set. Runs in tests.
- **app surface** (`src/data/catalog.js`): reads the catalog JSON, renders grid via catalog-adapter. `visualContext`/`moodTags` are free strings (schema has no enum). Catalog edits MUST be committed before vitest (SB-GLOBAL-002 asserts zero diff on `src/` + `.storybook/`).
- **Tokens**: No global token system. `App.css` `:root` defines the app aesthetic tokens (`--bg`, `--surface`, `--text`, `--accent`, `--border`, `--green`, `--orange`, `--ease`). Components define their own local `--*` variables (e.g. `--glow-color`, `--card-bg`). shadcn's design tokens (`--background`, `--foreground`, `--primary`, `--radius`) are NOT present and MUST NOT be introduced globally.
- **Existing visualContext vocabulary**: `background badge border brand button callout card container content cursor feedback fullscreen gallery headline hero hover image interaction marquee overlay playground scroll-reveal section showcase stats transition`.
- **Existing moodTags vocabulary**: `chaotic clean colorful dynamic edgy elegant ethereal experimental feedback film functional gradient grunge interactive minimal modern playful precise premium sleek smooth structured tech texture vibrant`.
- **Graphify**: graph exists at `graphify-out/` but is STALE — built at commit `93fcb38`, HEAD is `8f22b3a` (2 commits: phase-8 refactor + archive). Structure for catalog/schema/adapter is still accurate; the graph is missing the newest component files.

## Affected Areas

- `src/components/Corporate/<Name>/{<Name>.jsx,<Name>.css,<Name>.stories.jsx}` — NEW family folder + component triads.
- `.storybook/component-catalog.json` — add corporate entries (DC-004), bump version.
- `.cortex/` capsule validate — already accepts new entries; no change needed (free-string vocab).
- `src/data/catalog.js` + catalog-adapter — auto-reflects catalog additions; verify rendering (grid + detail surface).
- `src/__tests__/components/` — add focused per-component tests (a11y roles, keyboard nav for Tier B).
- `openspec/` — new change folder, delta specs for pattern-library/storybook/catalog domains.
- `graphify-out/` — graph refresh (`graphify . --update`) required after archive per cortex-persona.

## Approaches

### 1. Dedicated family folder `src/components/Corporate/` (RECOMMENDED)

A new top-level `src/components/Corporate/<Name>/` mirroring the reactbits family pattern. Catalog entries point at `../src/components/Corporate/<Name>/<Name>.stories.jsx`.

- Pros: mirrors existing family organization (each reactbits family is a top-level folder); unidirectional import (corporate components have no mutual deps with artistic ones, but could later); obvious home for the shadcn provenance NOTICE; clean scoping for the change.
- Cons: diverges from reactbits' category names (TextAnimations etc.) — but that is precisely the point: a *function* family (forms, nav, tables) distinct from *effect* families. Column vs `Components/` nesting possible but adds noise.
- Effort: Low.

### 2. Per-family placement in existing folders (REJECT)

Spread corporate components across existing `Components/`/`Layout/` folders by nearest category (e.g. Button into `Components/`, Table into `Layout/`).

- Pros: keeps a single namespace.
- Cons: muddles the reactbits (effect) vs shadcn (function) provenance; catalog entries would be scattered; attribution/provenance per-folder is more complex; future corporate-only operations (bulk review, rename) harder.
- Effort: Low but wrong-shaped.

### 3. Registry/index barrel per family (REJECT for v1)

Add an `index.js` barrel exporting the corporate family.

- Pros: typed/central import point in a TypeScript port.
- Cons: YAGNI — no consumer imports the family as a unit today; catalog + stories are the surface. Ponytail: omit.

## Decision Points (grounded)

### Directory placement
Recommend **Approach 1**: `src/components/Corporate/<Name>/`. Matches reactbits family organization (`src/components/{family}/`), keeps provenance clean, zero adapter changes.

### Catalog integration
- Entries follow DC-004 exactly. New vocabulary:
  - `moodTags: ["corporate"]` (+ optionally "clean", "minimal", "structured", "precise" — reuse existing tags, add only "corporate").
  - `visualContext`: reuse existing words where possible (`card`, `button`, `badge`, `container`, `feedback`, `form`?) and add a small set if needed: `navigation`, `table`, `form`, `dialog`, `menu`, `sidebar`, `tooltip`, `pagination`, `breadcrumb`, `tabs`, `switch`, `progress`. Schema is free-string, so additions are valid; document the extended vocabulary in the proposal.
  - `adaptationRules`: `variants` object map (e.g. `Default`, `Destructive`, `Outline`, `Ghost`, `Secondary`, `Link`, `Small`, `Large` for Button), `tokenSlots` = the shadcn tokens the component maps, `defaultProps`/`defaults` as needed. All optional in schema (only `variants` required).
- Version bump 1.0.0 → 1.1.0.
- Catalog edit + new components must be committed before running vitest (SB-GLOBAL-002).

### Component shortlist (Tier A — pure visual, direct port)
Pick these ~18 for the first deliverable, each justified for corporate use:

| Component | shadcn path | Corporate use |
|-----------|-------------|---------------|
| Button | registry/ui/button | primary actions everywhere |
| Badge | registry/ui/badge | status labels, tags |
| Card | registry/ui/card | dashboard panels, KPI cards |
| Input | registry/ui/input | forms |
| Textarea | registry/ui/textarea | forms |
| Label | registry/ui/label | form field labels |
| NativeSelect | registry/ui/select (native variant) | simple selects — NO custom Select (Tier C) |
| Checkbox | registry/ui/checkbox | form toggles (Tier B interactive, small) |
| Separator | registry/ui/separator | visual dividers |
| Skeleton | registry/ui/skeleton | loading states |
| Table | registry/ui/table | data display |
| Breadcrumb | registry/ui/breadcrumb | navigation |
| Pagination | registry/ui/pagination | data display |
| Kbd | registry/ui/kbd | keyboard hints |
| Tooltip | registry/ui/tooltip | hover hints (Tier B interactive) |
| Progress | registry/ui/progress | task progress bars (Tier B simple) |
| Tabs | registry/ui/tabs | content organization (Tier B interactive) |
| Avatar | registry/ui/avatar | user identity in dashboards |

Justification: covers dashboard (Card, Table, Progress, Avatar, Skeleton), forms (Input, Textarea, Label, Checkbox, NativeSelect, Button), navigation (Breadcrumb, Pagination, Tabs, Tooltip), and data display (Badge, Separator, Kbd). All port with zero or minimal plain-React logic.

### Tier B — worth reimplementing in v1
- **Yes**: Checkbox, Tooltip, Progress, Tabs — bounded interactive logic, well-specified ARIA, testable keyboard nav.
- **Defer to v2**: Accordion, Dialog, Sheet, DropdownMenu, Popover, ContextMenu, Menubar, NavMenu, Sidebar, Slider, Toggle group, RadioGroup, Switch, Collapsible — each is a full focus/trap/outside-click management surface; reimplementing them well is a separate, larger change. Keep v1 lean (Ponytail: YAGNI).
- **Exclude (Tier C — heavy external deps)**: Calendar, DatePicker, Carousel, Chart, DataTable, Command, Drawer, Toast, InputOTP, Resizable, custom Select, Combobox — require Radix or deep reimplementation; out of scope.

### Naming / attribution (MIT)
- shadcn/ui is MIT (Copyright 2023 shadcn). Copying is legal; MIT requires preserving the copyright notice on substantial copies.
- Add a `NOTICE` comment block at the top of every ported `.jsx`:
  ```
  /* Ported from shadcn/ui (MIT). Copyright (c) 2023 shadcn.
     Source: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/ui/{name}.tsx */
  ```
  This preserves attribution exactly where the derivative lives.
- Optionally one `src/components/Corporate/NOTICE.md` listing every component → shadcn source path, as a family-level provenance index (low cost, high auditability).
- Artemis component names keep shadcn's PascalCase (`Button`, `Card`, `Table`) with dashed catalog ids (`button`, `card`, `table`).

### Token mapping
- Do NOT introduce shadcn's global tokens (`--background`, `--foreground`, `--primary`, `--radius`) — that would collide with the app's `:root` aesthetic.
- Map shadcn's token references into **local per-component CSS vars** following the existing per-component pattern (e.g. `--corp-primary`, or reuse context-neutral `var(--accent)` from App.css where the app defines it). `tokenSlots` in each catalog entry lists which tokens the component consumes.
- Colors default to the app palette via `var(--accent)`, `var(--text)`, `var(--border)`, `var(--surface)` where semantically appropriate; components stay theme-agnostic by exposing their own local vars with sensible defaults, matching how GlowCard/BorderGlow already do it.
- `--radius`/spacing: use local defaults; a global token migration is a separate change.

### Verification strategy
- **Tier A (structural)**: per component, a focused test asserting render + key role (e.g. `getByRole('button')`, `getByRole('table')`, `getByRole('progressbar')`) and presence of required accessible name (Input → label association, Table → caption/scope).
- **Tier B (interactive)**: add interaction tests — checkbox toggles checked state + emits change; tabs navigate with Arrow keys and update `role="tab"` `aria-selected`; tooltip shows on focus/keyboard and hides on close; progress respects `aria-valuenow`.
- **Stories**: one `Default` + 2–4 variants per component, `tags:['autodocs']` for the Docs page, a11y panel active (`@storybook/addon-a11y`) to catch critical violations.
- **Catalog invariant**: SB-CAT-001 (storyFile resolves) and `.cortex/` validation must pass; commit before vitest.

## Recommendation

Adopt **Approach 1 (dedicated `src/components/Corporate/` folder)**, with a v1 shortlist of ~18 components from Tier A + a small slice of Tier B (Checkbox, Tooltip, Progress, Tabs). Add MIT `NOTICE` headers to each ported `.jsx` and one family-level `NOTICE.md` provenance index. Map shadcn tokens to local per-component CSS vars (no global token collision). Extend the catalog vocabulary with `moodTags:["corporate"]` and the corporate `visualContext` set, bump catalog version, and commit before vitest. Defer the heavy interactive Tier-B surfaces (Dialog, Sheet, DropdownMenu, accordion, etc.) to a v2 change. Refresh graphify after archive.

## Risks

- **Graph staleness (Medium)**: `graphify-out/` built at `93fcb38` (2 commits behind HEAD). Structure for catalog/schema/adapter is accurate, but new files won't appear until `graphify . --update` after archive. Not blocking — noted per policy.
- **Catalog-tag vocabulary drift (Low)**: free-string `visualContext`/`moodTags` means new tags are valid but unmanaged; if the adapter later enum-validates, corporate tags must be whitelisted. Mitigate by documenting the extended vocabulary.
- **a11y regression in Tier B ports (Medium)**: hand-rolled focus/keyboard/ARIA for interactive components can fail addon-a11y "critical". Mitigation: test roles + keyboard nav explicitly; fix before landing.
- **Commit-ordering vs test gate (Low/Expected)**: uncommitted `src/` + `.storybook/` break SB-GLOBAL-002. Expected; resolves once work is committed.
- **Token-name collision (Low)**: introducing shadcn names globally would clash with app `:root`. Avoided by local per-component vars.
- **Scope creep / over-engineering (Medium)**: temptation to port all Tier B+C. Ponytail gate: v1 = Tier A + 4 bounded Tier B interactive; everything else is v2+.

## Graphify nodes/edges consulted

- Nodes: `schema.json`, `catalog` (DC-004), `component`, `adaptationRules`, `visualContext`, `moodTags`, `storyFile`, `id`, `properties`, `required`, `definitions`, `contract` — from `.cortex/schema.json` (catalog shape constraints).
- Nodes: `catalog-query.js`, `queryComponents()` — CA-001 query semantics (visualContext exact + moodTags OR).
- Nodes: `component-catalog.json`, `catalog.js` (app surface), `Dock.stories.jsx`, `App` community — story/catalog integration.
- Communities consulted: `contract` (schema/validate), `catalog-query.test.js` (query + test), the stories communities.
- Note: graph is stale (2 commits behind HEAD).

## Ready for Proposal

Yes — scope is clear, grounded in the existing reactbits pattern and DC-004 catalog. Tell the user: dedicated `Corporate/` folder, ~18-component v1 (Tier A + Checkbox/Tooltip/Progress/Tabs), MIT NOTICE headers + family provenance, local-variable token mapping (no global `:root` collision), catalog vocabulary extension with `moodTags:["corporate"]`, and a v2 boundary for the heavy interactive surfaces.
