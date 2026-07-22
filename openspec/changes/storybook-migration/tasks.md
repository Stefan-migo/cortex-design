# Tasks: Storybook Migration

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~235 (7 new files, 1 modified) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Phases 1–3: full SB integration | PR 1 | Single PR, ~235 lines, under budget |

## Phase 1: Storybook Setup (1 commit)

- [x] **1.1 Run `npx storybook@latest init`** — auto-detect Vite + React 19. Scaffolds `.storybook/` and adds `@storybook/react-vite` + `@storybook/react` + `@storybook/test` to `package.json`.
  - *Verification:* `.storybook/main.js` + `preview.jsx` exist, `npm run storybook` starts on 6006 ✅
- [x] **1.2 Configure `.storybook/main.js`** — set framework `@storybook/react-vite`, stories glob `../src/**/*.stories.@(js|jsx)`, addons: `@storybook/addon-docs`, `@storybook/addon-controls`, `@storybook/addon-a11y` (NOT `@storybook/essentials`). Install the 3 addon packages.
  - *Verification:* `npm run storybook` starts with addons loaded in sidebar ✅
- [x] **1.3 Configure `.storybook/preview.jsx`** — add global parameters (controls sort, expanded), font loader decorator (exported, per-story use), canvas decorator (global). SB loads without errors ✅
- [x] **1.4 Verify setup integrity** — `npm run dev` (5173), `npm run storybook` (6006) coexist; `npm test` passes all 42; `npm run build` succeeds ✅
  - *Verification:* 3 terminals, no port conflict, zero test/build failures

## Phase 2: GlitchText Story (1 commit)

- [ ] **2.1 Create `src/components/TextAnimations/GlitchText.stories.jsx`** — CSF3 default export with `tags: ['autodocs']`, argTypes for `children` (text), `speed` (range 0.1–2), `enableShadows` (boolean), `enableOnHover` (boolean). 4 named variants: `Default`, `HoverOnly`, `SlowMotion`, `WithShadows`.
  - *Verification:* Story renders, controls modify props, Docs tab shows argTypes table and all variants, a11y panel loads with no critical violations

## Phase 3: Remaining 3 Stories (1 commit, batched per design)

- [ ] **3.1 Create `src/components/TextAnimations/CurvedLoop.stories.jsx`** — CSF3 with autodocs, argTypes for 5 props (marqueeText, speed, curveAmount, direction, interactive). 4 variants: `Default`, `FastRight`, `ExtremeCurve`, `Stationary`.
  - *Verification:* Renders, controls interactive, a11y OK
- [ ] **3.2 Create `src/components/TextAnimations/TextPressure.stories.jsx`** — CSF3 with autodocs, argTypes for 7 booleans. Font decorator injects Roboto Flex `@import` via `<style>` before render. 4 variants: `Default`, `AllAxes`, `Minimal`, `StrokeMode`.
  - *Verification:* Font loads, variable axes active, no flash of unstyled text
- [ ] **3.3 Create `src/components/TextAnimations/FuzzyText.stories.jsx`** — CSF3 with autodocs, argTypes for 8 props. Canvas decorator wraps in container with `min-width: 400px; min-height: 150px; padding: 2rem`. 4 variants: `Default`, `BothDirections`, `GlitchBursts`, `HeavyFuzz`.
  - *Verification:* Canvas has non-zero dimensions, fuzzy text visible, aria-label on wrapper
- [ ] **3.4 Verify all 3 stories** — navigate each story, tweak controls, check a11y panel, confirm Docs tab. `npm test` stays 42/42, `npm run build` succeeds.

## Future (separate change)

- Phase 4 — delete old showcase files (Library.jsx, ComponentDetail.jsx, ControlsPanel.jsx, registry.js, sources.js, useHashRoute.js, App.jsx, App.css, pages/, components/Layout/) after verifying Storybook fully replaces old UI.

## Graphify Cross-Reference

No `graphify-out/GRAPH_REPORT.md` exists for this project. Affected modules (`.storybook/`, `src/components/TextAnimations/`) are structurally simple — no hidden dependencies to cross-reference.

## Commit Plan (3 total)

| # | Message | Files |
|---|---------|-------|
| 1 | `feat(storybook): initialize Storybook 9 with explicit addons` | `.storybook/main.js`, `.storybook/preview.js`, `package.json` |
| 2 | `feat(storybook): add GlitchText story with 4 variants` | `GlitchText.stories.jsx` |
| 3 | `feat(storybook): add CurvedLoop, TextPressure, FuzzyText stories` | `CurvedLoop.stories.jsx`, `TextPressure.stories.jsx`, `FuzzyText.stories.jsx` |
