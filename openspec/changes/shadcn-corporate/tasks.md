# Tasks: shadcn-corporate — Corporate UI family (18 MIT ports)

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~5050 total (5 slices: P1 ~1000, P2 ~1300, P3 ~1300, P4 ~1200, P5 ~250) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | P1 → P2 → P3 → P4 → P5 (stacked to main) |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

> Strategy note: preflight caches `stacked-to-main`; chained-pr gate (each slice lands independently on main) confirms it. Design's "Feature Branch Chain" phrasing is stale — no tracker PR needed; every triad imports directly (not via catalog) so each slice's vitest passes solo. SB-GLOBAL-002 zero-diff is enforced at P5 when catalog JSON lands against the full merged main.

### Suggested Work Units (5 stacked PRs → main)

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | `Corporate/` scaffold + 4 triads (Button, Badge, Card, Skeleton) + tests | PR 1 | `npx vitest run src/__tests__/components/Corporate.Button.test.jsx` | Storybook `npm run storybook` — a11y panel zero critical on the 4 stories | `git revert` PR1; drops scaffold + 4 triads, rest untouched |
| 2 | 5 form triads (Input, Textarea, Label, NativeSelect, Checkbox-B) + tests | PR 2 | `npx vitest run src/__tests__/components/Corporate.Checkbox.test.jsx` | Storybook — checkbox click + Enter/Space toggle, a11y clean | `git revert` PR2; only form triads removed |
| 3 | 5 data triads (Table, Pagination, Kbd, Separator, Avatar) + tests | PR 3 | `npx vitest run src/__tests__/components/Corporate.Table.test.jsx` | Storybook — table roles/caption/scope, a11y clean | `git revert` PR3; only data triads removed |
| 4 | 4 triads (Breadcrumb, Tabs-B, Tooltip-B, Progress-B) + tests | PR 4 | `npx vitest run src/__tests__/components/Corporate.Tabs.test.jsx` | Storybook — roving tabindex nav, tooltip focus/blur, progress aria | `git revert` PR4; only nav/interactive triads |
| 5 | Catalog JSON (+18, 1.1.0, moodTags/visualContext) + query test + detail checks | PR 5 | `npx vitest run src/__tests__/…/catalog-query.test.js` + `.cortex` validate | `npm run storybook` grid/detail render 18 corporate cards | `git revert` PR5; restores 1.0.0 catalog, components stay |

Threat matrix: N/A (design: CSS-only components + JSON entries, no routing/shell/VCS-automation/process boundary; commit-ordering is workflow, not code). No RED-test tasks derived.

## Phase 1 — Foundation (PR 1, ~1000 lines)

- [x] 1.1 Create `src/components/Corporate/NOTICE.md` — 18-row provenance table (CF-002, REQ-FAMILY-003); full source paths.
- [x] 1.2 Create Button triad `src/components/Corporate/Button/`: `.jsx` (NOTICE header, `variant` string prop → `corp-button--{m}`, CN merge, props spread) + `.css` (local `--corp-*` vars → app palette) + `.stories.jsx` (`tags:['autodocs']`, Default/Destructive/Outline/Ghost/Link/Secondary/Size variants) (CF-001/CF-002/CF-004).
- [x] 1.3 Create Badge triad (same NOTICE/local-var/stories template) (CF-001/002/004).
- [x] 1.4 Create Card triad (root `card`/article, header/footer slots) (CF-001/002/004).
- [x] 1.5 Create Skeleton triad (BEM block, no logic) (CF-001/002/004).
- [x] 1.6 Create 4 tests `src/__tests__/components/Corporate.{Button,Badge,Card,Skeleton}.test.jsx` — assert role + accessible name (CF-006 Tier A).
- [x] 1.7 Commit scaffold + 4 triads + 4 tests together; run PR1 focused test + `npm run build` (SB-GLOBAL-002 order for later slices).

## Phase 2 — Forms (PR 2, ~1300 lines)

- [ ] 2.1 Create Input triad (`textbox` role, local vars) (CF-001/004).
- [ ] 2.2 Create Textarea triad (`textbox`) (CF-001/004).
- [ ] 2.3 Create Label triad (`for`/htmlFor association) (CF-001/004).
- [ ] 2.4 Create NativeSelect triad (`combobox`, native `<select>`) (CF-001/004).
- [ ] 2.5 Create Checkbox triad — Tier B: hidden native input or role attr, `aria-checked`, Enter/Space + click toggle → `onChange`; `ponytail:` native-input ceiling comment (CF-005).
- [ ] 2.6 Create 5 tests `Corporate.{Input,Textarea,Label,NativeSelect,Checkbox}.test.jsx` — Tier A roles; Checkbox asserts aria-checked + key/click toggle (CF-005/006).
- [ ] 2.7 Commit 5 triads + tests; run PR2 focused test (Checkbox) + build.

## Phase 3 — Data Display (PR 3, ~1300 lines)

- [ ] 3.1 Create Table triad (`table`, caption/scope headers) (CF-001/004).
- [ ] 3.2 Create Pagination triad (`navigation` + list semantics) (CF-001/004).
- [ ] 3.3 Create Kbd triad (BEM block) (CF-001/004).
- [ ] 3.4 Create Separator triad (role/visual divider) (CF-001/004).
- [ ] 3.5 Create Avatar triad (`img` role w/ accessible name) (CF-001/004).
- [ ] 3.6 Create 5 tests `Corporate.{Table,Pagination,Kbd,Separator,Avatar}.test.jsx` — key roles + accessible names (CF-006).
- [ ] 3.7 Commit 5 triads + tests; run PR3 focused test (Table) + build.

## Phase 4 — Navigation / Interactive (PR 4, ~1200 lines)

- [x] 4.1 Create Breadcrumb triad (`navigation`/nav wrapper) (CF-001/004).
- [x] 4.2 Create Tabs triad — Tier B: `role=tablist/tab/tabpanel`, roving tabindex, Arrow/Home/End + `aria-selected`; `ponytail:` roving-tab-manager ceiling (CF-005).
- [x] 4.3 Create Tooltip triad — Tier B: show on focus/pointerenter, hide blur/Escape, `role=tooltip`+`aria-describedby`; `ponytail:` no-outside-click ceiling (CF-005).
- [x] 4.4 Create Progress triad — Tier B: `role=progressbar`, `aria-valuenow/min/max` via `--corp-value`; `ponytail:` no-indeterminate ceiling (CF-005).
- [x] 4.5 Create 4 tests `Corporate.{Breadcrumb,Tabs,Tooltip,Progress}.test.jsx` — Tier B ARIA + keyboard scenarios from CF-005; Breadcrumb Tier A nav role.
- [x] 4.6 Commit 4 triads + tests; run PR4 focused test (Tabs) + build.

## Phase 5 — Catalog Bump (PR 5, ~250 lines) — stacks AFTER P2–P4 merges

- [ ] 5.1 Wait until P1–P4 merged on main (all 18 triads committed) so storyFiles resolve (SB-GLOBAL-002).
- [ ] 5.2 Extend `.storybook/component-catalog.json`: version→1.1.0, add 18 corporate entries (DC-004 object-form: `storyFile`, `moodTags:["corporate"]`, extended `visualContext`, `adaptationRules.variants` map, `tokenSlots` `--corp-*`) (CA-005, CAT-001/005).
- [ ] 5.3 Update `src/__tests__/…/catalog-query.test.js` — assert 69 entries, version 1.1.0, `queryComponents("table",["corporate","clean"])` match, no phantom ids (CA-005, DC-007).
- [ ] 5.4 Verify no-legacy-imports (registry.js/sources.js gone) + corporate detail surface resolves (CAT-001).
- [ ] 5.5 Commit catalog + test together; run PR5 focused test + `.cortex` validate + `npm run build`; confirm `src/`+`.storybook/` zero-diff (SB-GLOBAL-002).

## Phase 6 — Global Verification (no PR; pre-merge gates)

- [ ] 6.1 Run full `npx vitest run` — all per-component + catalog tests green on final main.

## Out of Scope (explicit, CF-007)

- [ ] None. v2 surfaces (Accordion, Dialog, Sheet, DropdownMenu, Popover, Sidebar, Slider, Toggle, RadioGroup, Switch, Collapsible…) and Tier C (Calendar, Chart, DatePicker, DataTable…) are deferred to separate changes — NOT built here.
