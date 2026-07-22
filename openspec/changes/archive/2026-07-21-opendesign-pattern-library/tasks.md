# Tasks: OpenDesign Pattern Library

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1,345 |
| 400-line budget risk | High (archive-time note: resolved via chained PRs) |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: Hooks → PR 2a: Text+Hover components → PR 2b: Scroll+Layout+BG components → PR 3: Curtains → PR 4: Showcase |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main (per slice apply) |

Decision needed before apply: Yes (chained PRs approved)
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Work Units (applied via chained PRs — stacked to main)

| Unit | Goal | Lines | Status |
|------|------|-------|--------|
| 1 | 4 hooks + component registry | ~200 | ✅ Done |
| 2a | 5 TextAnimations + 5 HoverEffects | ~330 | ✅ Done |
| 2b | 4 ScrollReveal + 4 Layout + 4 Backgrounds | ~330 | ✅ Done |
| 3 | 7 Curtain transitions (consolidated CSS) | ~205 | ✅ Done |
| 4 | Showcase + App.jsx routing | ~360 | ✅ Done |

## Phase 1: Custom Hooks (Foundation)

- [x] 1.1 Create `src/hooks/useScrub.js` — scroll progress 0→1 clamped, rAF + passive listener, velocity
- [x] 1.2 Create `src/hooks/useScrollPin.js` — sticky detection, IntersectionObserver, `{ pinned: boolean }`
- [x] 1.3 Create `src/hooks/useSplitText.js` — chars/words/lines → `<span>` with `--stagger` inline delay
- [x] 1.4 Create `src/hooks/useSmoothScroll.js` — Lenis wrapper, no-op fallback on init failure

## Phase 2: Component Extraction (Priority #1)

- [x] 2.1 Create `src/patterns/index.js` — registry (20 entries) + categories (5), lazy `() => import()`
- [x] 2.2 Extract 5 TextAnimation components into `src/patterns/TextAnimations/`
- [x] 2.3 Extract 5 HoverEffect components into `src/patterns/HoverEffects/`
- [x] 2.4 Extract 4 ScrollReveal components into `src/patterns/ScrollReveal/`
- [x] 2.5 Extract 4 Layout components into `src/patterns/Layout/`
- [x] 2.6 Extract 4 Background components into `src/patterns/Backgrounds/`

## Phase 3: Curtain Transitions (Priority #2)

- [x] 3.1 Create `src/curtains/curtainConfig.js` — CURTAIN_EFFECTS map with type/directions/css template
- [x] 3.2 Create `src/curtains/Curtains.jsx` — wrapper accepting config+children, useScrub, `--curtain-progress`
- [x] 3.3 Create 7 effect CSS files in `src/curtains/effects/` — wipe, iris, blinds, doors, shutter, fade, pixels (consolidated into `src/curtains/curtains.css` per design simplification)

## Phase 4: Showcase UI (Priority #3)

- [x] 4.1 Create `src/sections/Showcase/Showcase.jsx` + `Showcase.css` — main layout, hash-based routing, category+component state, reduced motion
- [x] 4.2 Create `src/sections/Showcase/CategorySidebar.jsx` — sidebar with "All" + 5 category tabs, count badges, hash-driven selection
- [x] 4.3 Create `src/sections/Showcase/ComponentGrid.jsx` — pattern cards with live miniature preview, category filtering
- [x] 4.4 Create `src/sections/Showcase/CodeDisplay.jsx` — overlay panel with source code display and close button
- [x] 4.5 Modify `src/App.jsx` — add hash router state, `React.lazy` + `<Suspense>` for Showcase, `#showcase` route determination
