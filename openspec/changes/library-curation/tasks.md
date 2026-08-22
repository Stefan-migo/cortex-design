# Tasks: Library Curation

## Review Workload Forecast

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

Estimated changed lines: ~2100 authored add+del (deletion-heavy). Suggested split: PR1→PR8. Delivery: auto-chain.

| Unit | Goal | PR | Focused test | Harness | Rollback |
|------|------|----|--------------|---------|----------|
| 1 | Catalog adapter + app surface | PR1 | `npx vitest run src/__tests__/App.test.jsx` | dev loads 5173 grid | Revert PR1 |
| 2 | Retire showcase | PR2 | `npm test && npm run build` | dev; `/components/{id}` | Revert PR2 |
| 3 | Curtains cut + catalog drop | PR3 | `npm run build` | dev grid drops card | Revert PR3 |
| 4 | SB7 boilerplate | PR4 | `npm run build` | no `stories/` dir | Revert PR4 |
| 5 | Deps removal (4) | PR5 | `npm run build && npm test` | `npm ci` then dev | Revert PR5; `npm i` |
| 6 | withFont inline | PR6 | `npm run build` | Storybook TextPressure | Revert PR6 |
| 7 | Catalog keepers + phantoms | PR7 | `npm run build` | 7 added, phantoms gone | Revert catalog commit |
| 8 | Helpers consolidation | PR8 | `npm test` | output byte-identical | Revert PR8; locals kept |

## Phase 1: Catalog Adapter + App Surface (PR1)

- [x] 1.1 Create `src/data/catalog.js`: native JSON import of `.storybook/component-catalog.json`; export `getAll()`/`getById(id)`→null (CAT-001/003).
- [x] 1.2 Rewrite `src/App.jsx` routes: `/`→Library, `/components/{id}`→Detail via `getById`, unknown→not-found (CAT-002).
- [x] 1.3 Rewrite `src/pages/Library.jsx`+`.css`: grid from `getAll()`, card `id`+`storyFile` link when non-null (CAT-001).
- [x] 1.4 Rewrite `src/pages/ComponentDetail.jsx`+`.css`: metadata surface `{entry,onBack}`, drop sources/ControlsPanel/LivePreview; null storyFile skips link (CAT-002/003).
- [x] 1.5 Rewrite `src/components/Layout/Layout.jsx`+`.css`: slim header nav; no registry sidebar.
- [x] 1.6 Prune showcase-only styles in `src/App.css` (keep tokens) — none showcase-only present; App.css already tokens + base reset only.
- [x] 1.7 `npm run build` exit 0; `npm run dev` serves catalog grid (CAT-004).
- [x] 1.8 Rollback: `git revert` PR1. — rollback path documented; PR1 rolled back via `git revert` after merge.

## Phase 2: Retire Showcase (PR2)

- [x] 2.1 Delete `src/data/registry.js`, `src/data/sources.js` (CAT-001).
- [x] 2.2 Delete `src/components/ControlsPanel.{jsx,css}`; keep `useHashRoute.js`. (Design resolved: `pages/{Library,ComponentDetail}.{jsx,css}` were REWRITTEN in PR1 and remain catalog-backed — they are the live surface, not deleted.)
- [x] 2.3 Tests rewritten to catalog surface in PR1 (`App`,`Library`,`ComponentDetail`,`Layout`.test.jsx + `hooks/useHashRoute.test.js`); no registry-asserting tests to drop (CAT-001/002/003).
- [x] 2.4 Build + tests green, no dangling imports (CAT-004, DEP-002).
- [x] 2.5 Rollback: `git revert` PR2.

## Phase 3: Curtains Cut (PR3)

- [x] 3.1 Delete `Transitions/CurtainsNew.jsx`+`curtains.css` + 5 stories (`ClipEllipseWipe`,`DoorsOverlay`,`PixelGridOverlay`,`ShutterSlats`,`StaggerColumns`).
- [x] 3.2 Drop `curtains` entry from catalog (SB-CAT-001).
- [x] 3.3 Build green; no curtains card (CAT-004).
- [x] 3.4 Rollback: `git revert` PR3.

## Phase 4: SB7 Boilerplate (PR4)

- [x] 4.1 Delete `src/stories/` (Configure.mdx, assets/, button/header/page.css) (SB-CAT-002).
- [x] 4.2 Build green; `src/stories/` absent (SB-CAT-002).
- [x] 4.3 Rollback: `git revert` PR4.

## Phase 5: Deps Removal (PR5)

- [x] 5.1 Drop `gl-matrix`,`maath`,`meshline`,`@react-three/rapier` from package.json+lockfile (DEP-001).
- [x] 5.2 Grep `src/` for the 4 names; remove residual imports (DEP-001).
- [x] 5.3 Build + tests green; `npm ci` then dev loads (DEP-002).
- [x] 5.4 Rollback: `git revert`; `npm i` reinstates.

## Phase 6: withFont Inline (PR6)

- [x] 6.1 Move `withFont` into `TextPressure.stories.jsx`; drop from `.storybook/preview.jsx` (SB-CAT-003).
- [x] 6.2 Build green; story injects Roboto Flex (SB-CAT-003).
- [x] 6.3 Rollback: `git revert` PR6.

## Phase 7: Catalog Keepers + Phantoms (PR7)

- [x] 7.1 Drop `layout`,`controls-panel` from catalog (DC-006). — `9514c54`.
- [x] 7.2 Add 7 keepers with storyFiles: `aurora`,`dot-grid`,`venetian-blinds`,`light-rays`,`strands`,`ballpit`,`prism` (fade-content already present) (DC-007). — `5481f20`.
- [x] 7.3 Validate DC-004 schema (`variants`,`tokenSlots`/`defaultProps`/`defaults`); **52 entries** (plan noted 51; actual is 52: 47 − 2 phantoms + 7 keepers); every non-null storyFile resolves (SB-GLOBAL-000, SB-CAT-001).
- [x] 7.4 Uncatalogued non-keeper code on disk allowed, no validation error (DC-008). — `cursor-grid`, `SoftAurora`, `Orb`, `Plasma` etc remain on disk; catalog unchanged for non-keepers; validator green.
- [x] 7.5 Rollback: `git revert` catalog hygiene commit (`9514c54..5481f20`).

## Phase 8: Helpers Consolidation (PR8)

- [ ] 8.1 Create `src/lib/color-utils.js` (hex→rgb/lerp/clamp) (HLP-001).
- [ ] 8.2 Swap imports in `BlobCursor`,`GhostCursor`,`Noise`,`Aurora`,`Ballpit`,`DotGrid`,`LightRays`; keep local copy + `ponytail:` comment where unsafe (HLP-001, HLP-002).
- [ ] 8.3 `npm test`; visual byte-identical (HLP-001).
- [ ] 8.4 Rollback: `git revert` PR8; local copies retained (HLP-002).
