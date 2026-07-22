# Design: Storybook Migration

## Technical Approach

Incremental 4-phase integration of Storybook 9 alongside the existing Vite 5 app. `.storybook/main.js` + `preview.js` configure the SB dev server (port 6006) with explicit addons. Co-located CSF `.stories.jsx` files mirror each component. No component code changes — Storybook is display-layer only.

**Phases map**: Setup (config + deps) → GlitchText story → Remaining 3 stories (single commit) → Cleanup (future change). Old showcase preserved until Phase 4.

---

## Architecture Decisions

### Decision: Dev server coexistence

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Vite plugin for Storybook | Single port, but couples SB to app config | **Rejected** — separate processes prevent port/config interference |
| Standalone Storybook (port 6006) | Two servers, but zero config conflict | **Selected** — `vite.config.js` untouched, SB uses its own rollup config |

`storybook dev -p 6006` runs independently of `vite dev --port 5173`. Build separation: `vite build` → `dist/`, `storybook build` → `storybook-static/` (docs-only use).

### Decision: Explicit addons vs essentials

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `@storybook/essentials` | Single dep, but pulls Viewport/Toolbars/Measure/Outline we don't need | **Rejected** — YAGNI violation |
| 3 explicit addons | More deps lines in package.json, but minimal install | **Selected** — addon-docs, addon-controls, addon-a11y only |

MCP addon (`@storybook/experimental-addon-mcp`) is **excluded per spec** — Graphify covers agent knowledge. Integration point: would register in `main.js` addons array at `'@storybook/experimental-addon-mcp'` if added later.

### Decision: Font loading strategy (TextPressure)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `preview-head.html` | Global injection, but all stories inherit the load | **Rejected** — unnecessary network overhead for non-font stories |
| Decorator in preview.js | Injects `@import` only for TextPressure stories | **Selected** — scoped per component via story-level decorator |

### Decision: Canvas sizing (FuzzyText)

FuzzyText renders to `<canvas>` which needs explicit dimensions inside the Storybook iframe. A story-level decorator wraps it with `min-width: 400px; min-height: 150px; padding: 2rem` to guarantee measurable bounds.

---

## Data Flow

```
Before: registry.js ──→ Library.jsx ──→ ComponentDetail.jsx (controls)
After:  .storybook/config ──→ SB sidebar + Docs page + Controls panel
        registry.js (unchanged, for old app until Phase 4 cleanup)
```

Controls data migrates from `registry.js` controls arrays to **argTypes** inside each `.stories.jsx` — same prop metadata, different location. No duplication: `registry.js` still powers the old app, stories are the new path.

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `.storybook/main.js` | Create | SB9 config: framework `@storybook/react-vite`, stories glob `../src/**/*.stories.@(js|jsx)`, addons `[docs, controls, a11y]` |
| `.storybook/preview.js` | Create | Global decorators (font loader, canvas wrapper), backgrounds param, controls expanded sort |
| `src/components/TextAnimations/GlitchText.stories.jsx` | Create | 4 variants (Default, HoverOnly, SlowMotion, WithShadows) + argTypes for 4 props |
| `src/components/TextAnimations/CurvedLoop.stories.jsx` | Create | 4 variants (Default, FastRight, ExtremeCurve, Stationary) + argTypes for 5 props |
| `src/components/TextAnimations/TextPressure.stories.jsx` | Create | 4 variants (Default, AllAxes, Minimal, StrokeMode) + argTypes for 7 props + font decorator |
| `src/components/TextAnimations/FuzzyText.stories.jsx` | Create | 4 variants (Default, BothDirections, GlitchBursts, HeavyFuzz) + argTypes for 8 props + canvas decorator |
| `package.json` | Modify | Storybook scripts added by `npx storybook init` |
| Component `.jsx` files | None | Zero modifications |

---

## CSF Architecture per Component

### GlitchText
- **Props mapped**: `children` (text), `speed` (range 0.1–2), `enableShadows` (boolean), `enableOnHover` (boolean)
- **Variants**: Default, HoverOnly (`enableOnHover: true`), SlowMotion (`speed: 0.1`), WithShadows (explicit defaults)
- **Decorators**: None needed
- **a11y**: Check color contrast on glitch pseudo-elements

### CurvedLoop
- **Props mapped**: `marqueeText` (text), `speed` (range 0.5–5), `curveAmount` (range 50–800), `direction` (select), `interactive` (boolean)
- **Variants**: Default, FastRight (`speed: 5, direction: right`), ExtremeCurve (`curveAmount: 800`), Stationary (`speed: 0.5, interactive: false`)
- **Decorators**: None needed
- **a11y**: Reduced motion — animation uses `requestAnimationFrame`, respect `prefers-reduced-motion`

### TextPressure
- **Props mapped**: `text` (text), `flex`/`width`/`weight`/`italic`/`alpha`/`stroke` (all boolean)
- **Variants**: Default, AllAxes (all true), Minimal (all false except weight), StrokeMode (`stroke: true, alpha: false`)
- **Decorators**: Inject `@import url(...)` for Roboto Flex variable font before story render
- **a11y**: No interactive elements (mouse-tracking distortion is decorative)

### FuzzyText
- **Props mapped**: `children` (text), `baseIntensity` (range 0–1), `hoverIntensity` (range 0–1), `fuzzRange` (range 1–100), `direction` (select), `fontWeight` (range 100–900), `enableHover` (boolean), `glitchMode` (boolean)
- **Variants**: Default, BothDirections (`direction: both`), GlitchBursts (`glitchMode: true`), HeavyFuzz (`baseIntensity: 0.5`)
- **Decorators**: Canvas container wrapper (`min-width: 400px; min-height: 150px; padding: 2rem`)
- **a11y**: Canvas is non-text content — provide aria-label on wrapper

---

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Vitest (unchanged) | All 42 existing tests | Import components directly, no Storybook dependency |
| a11y | Every story | `@storybook/addon-a11y` panel — manual check per story, no critical violations |
| Manual | Controls + rendering | Open each story, tweak controls, verify re-render, check console for errors |

**Vitest is completely unaffected**: test files import components directly. Storybook packages are devDependencies with zero runtime impact.

---

## Risk Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| FuzzyText canvas zero-size in iframe | Low | Decorator enforces `min-width: 400px; min-height: 150px` |
| TextPressure font not loaded before render | Low | Decorator awaits `@import` via injected `<style>` before story mounts |
| CSS conflicts in SB iframe | Low | Component CSS uses class names (BEM-like `glitch`, `curved-loop-*`), natural iframe isolation |
| Vite config conflict with SB rollup | Low | SB uses its own internal vite config — `viteFinal` in `main.js` only if customization needed |
| 80+MB dependency cost | Medium | Dev-only, no runtime impact, clean separation from test/build pipelines |
