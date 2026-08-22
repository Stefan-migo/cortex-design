# Proposal: Library Curation

## Intent

The reactbits bulk dump added ~118 uncatalogued components while the legacy registry showcase (`index.html` → `registry.js`, 110 entries) is redundant bloat: the DC-004 catalog (`.storybook/component-catalog.json`, 48 entries) is canonical. This change retires the showcase for a thin catalog-driven adapter, cuts the dead curtains system and unused deps, cleans catalog hygiene, and consolidates duplicated color helpers.

## Scope

### In Scope

1. **Delete curtains**: `src/components/Transitions/CurtainsNew.jsx`, `curtains.css`, 5 stories (`ClipEllipseWipe`, `DoorsOverlay`, `PixelGridOverlay`, `ShutterSlats`, `StaggerColumns`). Fix the DC-004 `curtains` entry in the SAME change.
2. **Replace showcase with DC-004 adapter**: read catalog; render Library grid + ComponentDetail preview. Retires `registry.js`, `sources.js`, `pages/{Library,ComponentDetail}.*`, `components/{ControlsPanel,Layout}/*`. Rewrite registry-UI tests (`App.test.jsx`, `__tests__/{pages,components/Layout,hooks}/*`). **Mandatory** — blank drop = empty vite build.
3. **Delete 4 unused deps**: `gl-matrix`, `maath`, `meshline`, `@react-three/rapier`.
4. **Delete SB7 boilerplate**: `src/stories/` (button/header/page.css, Configure.mdx + assets/).
5. **Inline `withFont`** from `.storybook/preview.jsx` into `TextPressure.stories.jsx`.
6. **Catalog hygiene**: drop `layout`, `controls-panel`; fix `curtains`; add `Aurora`, `DotGrid`, `VenetianBlinds`, `FadeContent`, `LightRays`, `Strands`, `Ballpit`, `Prism`.
7. **Consolidate helpers** (~120ln hex→rgb/lerp/clamp) into one util — if scope allows.

### Out of Scope

- **Token retrofit** (153 raw-hex → `--palette-*`): separate future change.
- **shadcn corporate family**: separate future change.
- **Re-writing/re-theming components**.

## Capabilities

> Contract for sdd-spec.

### New

- `catalog-adapter`: DC-004-driven Library grid + ComponentDetail preview.

### Modified

- `storybook` (SB-GLOBAL-000): catalog becomes the app's runtime source.
- `domain-contracts` (DC-004): `curtains` fixed, `layout`/`controls-panel` dropped, keepers added.

## Approach

Phased, cuts-first: **(1)** deps + boilerplate + curtains → **(2)** showcase→adapter (RISK: app surface + tests change together) → **(3)** catalog hygiene → **(4)** helpers → **(5)** tests. Phases keep commits reviewable under the 400-line budget.

## Affected Areas

| Area | Impact |
|------|--------|
| `src/data/{registry,sources}.js` | Removed |
| `src/pages/*`, `components/{ControlsPanel,Layout}/*` | Removed |
| `src/components/Transitions/*` | Removed |
| `src/stories/` | Removed |
| `package.json` | Drop 4 deps |
| `.storybook/preview.jsx`, `TextPressure.stories.jsx` | Inline decorator |
| `.storybook/component-catalog.json` | Hygiene |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Blank-drop breaks vite build | Med | Adapter first, retire registry after |
| Large deletion diff | High | Phase cuts + budget |
| Catalog `curtains` dangles | Low | Same phase as cut |

## Rollback Plan

Git revert per phase; restore catalog.json with hygiene revert. Deps removal safe; reinstate via `npm i`.

## Dependencies

- DC-004 catalog stays valid; `npm run build` passes after phase 2.

## Success Criteria

- [ ] App builds, renders Library + ComponentDetail from catalog.
- [ ] `registry.js` + curtains + 4 deps gone.
- [ ] Catalog DC-004-valid: keepers in, phantoms gone.
- [ ] Net deletions ≥ -2300 lines.
