# Design: Library Curation

## Technical Approach

Retire the 110-entry `registry.js` showcase for a thin catalog-driven adapter. `.storybook/component-catalog.json` (DC-004, object-form `{version, components}`) becomes the app's sole runtime source (CAT-001, SB-GLOBAL-000). Cut the dead curtains system, SB7 boilerplate, and 4 unused deps; inline `withFont`; add 7 missing keeper entries; consolidate color helpers. The app keeps its existing hash-routing shell but draws data from the catalog, not `registry.js`. Cuts land phase-by-phase so `npm run build` never breaks (CAT-004, DEP-002).

Graph nodes consulted: `App.jsx`, `registry.js`, `sources.js`, `Library.jsx`, `ComponentDetail.jsx`, `Layout.jsx`, `ControlsPanel.jsx`, `useHashRoute.js`, `main.jsx`, communities `registry.js` / `ComponentDetail.jsx`.

## Architecture Decisions

| Decision | Options | Tradeoff | Chosen |
|---|---|---|---|
| **App surface** | (a) Keep `useHashRoute` + catalog-backed data module; (b) Single-page grid + detail, no routing | (a) Preserves `/components/{id}` deep links (CAT-002 scenario requires the route); reuses existing 22-line tested hook. (b) Loses deep links, reworks App for zero benefit. | **(a)** Keep routing; swap data source |
| **Adapter shape** | (a) New `src/data/catalog.js` reading catalog JSON via native Vite `import`; (b) wrapper around registry | (a) Native JSON import, pure selector functions, no transformers. (b) Contradicts CAT-001. | **(a)** `src/data/catalog.js` |
| **Live controls** | (a) Drop interactive `ControlsPanel`/live import preview; (b) Map `adaptationRules.defaultProps/variants` into a controls UI | (a) Kills `ControlsPanel.jsx` + `sources.js`; detail shows metadata + storyFile link (satisfies CAT-002 minimum). (b) Rebuilds a control-panel engine against a different schema — large surface, YAGNI (no spec requires interactivity). | **(a)** Static detail surface |
| **curtains entry** | (a) DROP; (b) repoint | CurtainsNew is self-contained (no importers outside its 5 stories); catalog entry points at `DoorsOverlay.stories.jsx` which dies. Repoint is impossible — nothing valid remains. | **(a)** DROP, same unit as the cut (SB-CAT-001) |
| **Normalization** | (a) Tiny selector layer (`selectCatalog`→`{id,storyFile,visualContext,moodTags,adaptationRules}`); (b) consume raw `components` array | (a) Shields callers from object-form, centralizes null-storyFile defaulting once. (b) Couples pages to `{version,components}` envelope. | **(a)** One `src/data/catalog.js` exporting `getAll()` / `getById(id)` |
| **Null storyFile** | (a) Adapter tolerates `null` (CAT-003); (b) pre-fill placeholder card | (a)-(b) both satisfy CAT-003. The two current `null` entries are phantoms (`layout`,`controls-panel`) that get dropped by DC-006, so placeholder cards are moot; adapter just skips the story link. | **(a)** Graceful skip |
| **Keepers metadata** | (a) Minimal valid entries (id, existing `storyFile`, terse context/moods); (b) full enrichment | 7 keepers have story files on disk; `fade-content` already cataloged. (b) is separate scope. DC-007 only requires presence + valid schema. | **(a)** Minimal valid entries now |
| **Layout component** | (a) Replace sidebar with catalog-free static nav; (b) keep Layout reading `categories` from registry | Layout's sidebar imports `categories` from the retired `registry.js`. Sidebar categories are showcase-only; nav is the requirement. | **(a)** Slim Layout: header nav only, no registry-backed sidebar |

## Data Flow

    .storybook/component-catalog.json  (DC-004 object-form)
                  │  Vite native JSON import
                  ▼
        src/data/catalog.js   getAll() / getById(id)   [pure]
                  │
        ┌─────────┴──────────────┐
        ▼                        ▼
   App.jsx (useHashRoute)   route parse: /components/{id} → getById
        │                        │
        ▼                        ▼
   Library (grid, cards from getAll)      ComponentDetail (metadata + storyFile link)

- Cards render from `getAll()`; card shows `id` + `storyFile` link when non-null (CAT-001).
- Detail resolves via `getById`; unknown id → not-found state, no crash (CAT-002).
- `storyFile === null` → no link, no resolution attempt (CAT-003).
- `${id}` route → `/components/{id}` via existing `useHashRoute`. App.jsx:
  ```js
  const parts = route.split('/').filter(Boolean)
  const isDetail = parts[0] === 'components' && parts.length >= 2
  const entry = isDetail ? getById(parts[1]) : null
  ```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/data/catalog.js` | Create | Adapter: native JSON import of catalog, exports `getAll()` / `getById(id)` |
| `src/App.jsx` | Modify | Drop `registry`/`Layout`/old pages imports; route to new Library/Detail via `getById` |
| `src/pages/Library.jsx` + `.css` | Rewrite | Static grid from catalog; drop live `CardPreview` import; show id + story link |
| `src/pages/ComponentDetail.jsx` + `.css` | Rewrite | Static metadata surface; drop `sources.js`/`ControlsPanel`/LivePreview |
| `src/App.css` | Modify | Keep tokens; prune showcase-only layout styles |
| `src/data/registry.js`, `src/data/sources.js` | Delete | Retired (CAT-001 no legacy reads) |
| `src/components/Layout/Layout.jsx` + `.css` | Rewrite | Slim header nav; no registry-backed sidebar |
| `src/components/ControlsPanel.jsx` + `.css`, `src/hooks/useHashRoute.js` | Delete ControlsPanel; keep useHashRoute | ControlsPanel dead with live controls; hook reused |
| `src/components/Transitions/{CurtainsNew,curtains.css}` | Delete | Dead curtains system |
| `src/components/Transitions/{ClipEllipseWipe,DoorsOverlay,PixelGridOverlay,ShutterSlats,StaggerColumns}.stories.jsx` | Delete | The 5 curtain stories importing CurtainsNew |
| `.storybook/component-catalog.json` | Modify | DROP `curtains`,`layout`,`controls-panel`; ADD 7 keepers (DC-006/DC-007) |
| `src/stories/` (incl. `Configure.mdx`, `assets/`, button/header/page.css) | Delete | SB7 boilerplate (SB-CAT-002) |
| `package.json` + lockfile | Modify | Drop `gl-matrix`,`maath`,`meshline`,`@react-three/rapier` (DEP-001) |
| `.storybook/preview.jsx`, `src/components/TextAnimations/TextPressure.stories.jsx` | Modify | Inline `withFont` into story; remove from preview (SB-CAT-003) |
| `src/lib/color-utils.js` | Create | Consolidated hex→rgb/lerp/clamp (HLP-001) |
| `src/components/Animations/{BlobCursor,GhostCursor,Noise}` + `Backgrounds/{Aurora,Ballpit,DotGrid,...}` | Modify | Import from `src/lib/color-utils.js` where safe; keep local copy otherwise (HLP-002) |

## Interfaces / Contracts

```js
// src/data/catalog.js
import catalog from '../../.storybook/component-catalog.json'

const entries = catalog.components // [{id, storyFile, visualContext, moodTags, adaptationRules}]
export const getAll = () => entries
export const getById = (id) => entries.find((e) => e.id === id) ?? null
```

New ComponentDetail props: `{ entry, onBack }` where `entry` is the DC-004 object (`null` → not-found).

## Testing Strategy

| Layer | What | Approach |
|---|---|---|
| Unit | `catalog.js` | `getAll()` returns 56 entries; `getById('aurora')` resolves; `getById('missing')` → null; null `storyFile` tolerated |
| Integration | App routing | `/` → Library grid; `/components/{id}` → Detail; unknown id → not-found; grid matches catalog one-to-one (SB-CAT-001) |
| Integration | Build integrity | `npm run build` exit 0 after adapter swaps and after registry retirement (CAT-004) |
| Unit | Empty/null story | Card with `storyFile: null` renders without link, no throw (CAT-003) |

Rewrite `src/__tests__/App.test.jsx`, `Library.test.jsx`, `ComponentDetail.test.jsx`, `Layout.test.jsx`, `hooks/useHashRoute.test.js` against the adapted surface (vitest). Component tests (`FuzzyText`, `GlitchText`, `TextPressure`, `CurvedLoop`) unchanged unless color-consolidation touches them.

## Threat Matrix

N/A — no routing shell/spawn, no subprocess, no VCS/PR automation, no executable-file classification, no process-integration boundary in this change. App routing is pure client-side hash navigation handled by an existing tested hook; no new privileged operations.

## Migration / Rollout

Phase order (each commit leaves `npm run build` green):

1. **Catalog adapter + app surface**: create `catalog.js`, rewrite App/Library/ComponentDetail/Layout to read catalog. Old `registry.js`/pages/Layout/ControlsPanel still on disk but unreferenced → build still green.
2. **Retire showcase**: delete `registry.js`, `sources.js`, old Library/ComponentDetail pages, `ControlsPanel`, registry-backed Layout; rewrite 5 UI tests. Build green proves no dangling imports (CAT-004).
3. **Curtains cut + catalog `curtains` drop** (SAME unit, SB-CAT-001): delete CurtainsNew/curtains.css + 5 stories; drop catalog entry.
4. **SB7 boilerplate** (SB-CAT-002): delete `src/stories/`.
5. **Deps** (DEP-001/002): drop 4 packages; build + tests green.
6. **withFont inline** (SB-CAT-003).
7. **Catalog keepers** (DC-007): add 7 entries with existing storyFiles.
8. **Helpers** (HLP-001/002): `src/lib/color-utils.js` + per-component import swaps (optional; HLP-002 allows local copies).

**Rollback**: per-phase `git revert`; catalog.json restored by reverting its hygiene commit; deps reinstated via `npm i`. Target ≤ 5 files/commit (cortex 5-step gate).

**Build-never-breaks invariant**: phase 1 and 2 are distinct commits precisely so the adapter can land against a still-valid registry, then the registry dies with zero re-imports.

## Review Workload Forecast

Deletion-heavy change:
- Showcase (~2192 ln incl. 978-line registry.js) deleted in phases 1–2; rewrite adds ~250 new lines (catalog.js ~15, App ~30, Library ~50, Detail ~90, Layout ~30).
- Curtains −381, SB boilerplate −3458, tests rewritten ~196 lines.
- New `color-utils.js` ~30, component import swaps ~+40.
- Net ≥ −2300 lines (success criterion), additions ≈ +500.

Estimated authored diff ~ **2,100 additions + deletions** across all phases.

`Decision needed before apply: Yes`
`Chained PRs recommended: Yes`
`400-line budget risk: High`

Each phase is a clean reviewable slice (start/finish/verify/rollback per Section E guard); recommend a chained-PR stack where each of the 8 phases is one slice under the 400-line budget. The showcase retirement (phase 2) alone exceeds budget → must be its own chained slice, not merged with phase 1.

## Open Questions

- [ ] Does the copy/source-tab behavior in ComponentDetail need to survive, or is the static metadata surface sufficient? (Spec CAT-002 requires only metadata + story link; default: drop source tabs.)
