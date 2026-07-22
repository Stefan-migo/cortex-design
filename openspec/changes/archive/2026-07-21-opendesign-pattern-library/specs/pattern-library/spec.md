# Pattern Library — Specification

## Purpose

Curated collection of 22 non-overlapping UI/animation patterns from React Bits + Magic UI, plus 4 custom hooks and an in-app showcase at `#showcase`.

## Requirements

### REQ-CMP-001: Extracted components

The system MUST extract 22 components into `src/patterns/` across 5 categories with zero npm dependencies added.

**Component List (in-registry order)**:

| # | Component | Category | Source |
|---|-----------|----------|--------|
| 1 | SplitText | TextAnimations | react-bits |
| 2 | BlurText | TextAnimations | react-bits |
| 3 | ScrollReveal | TextAnimations | react-bits |
| 4 | DecryptedText | TextAnimations | react-bits |
| 5 | ShinyText | TextAnimations | react-bits |
| 6 | Magnet | HoverEffects | react-bits |
| 7 | TiltCard | HoverEffects | react-bits |
| 8 | StarBorder | HoverEffects | react-bits |
| 9 | ShimmerButton | HoverEffects | magic-ui |
| 10 | GlareHover | HoverEffects | react-bits |
| 11 | StickyScroll | ScrollReveal | react-bits |
| 12 | StaggerReveal | ScrollReveal | react-bits |
| 13 | SmoothReveal | ScrollReveal | react-bits |
| 14 | SpotLight | ScrollReveal | magic-ui |
| 15 | StickyCursor | Layout | react-bits |
| 16 | Counter | Layout | react-bits |
| 17 | AnimatedGridPattern | Layout | magic-ui |
| 18 | DotPattern | Layout | magic-ui |
| 19 | Particles | Backgrounds | magic-ui |
| 20 | GradientOrb | Backgrounds | magic-ui |
| 21 | MeshGradient | Backgrounds | magic-ui |
| 22 | WavyBackground | Backgrounds | magic-ui |

#### Scenario: Component renders in showcase
GIVEN extracted component in `src/patterns/{category}/{name}/` WHEN the showcase mounts it THEN it renders without error AND source code is displayed.

#### Scenario: Zero new dependencies
GIVEN all 22 components extracted WHEN `npm ls` runs THEN no packages beyond current `package.json`.

### REQ-CMP-002: Non-overlap

Components MUST NOT duplicate existing `Cursor.jsx`, `WebGLBackground.jsx`, `Preloader.jsx`. StickyCursor (custom cursor with magnetic followers) and SpotLight (cursor-follow spotlight) are distinct from the existing static Cursor.

### REQ-HOOK-001: useScrub

Accepts `(input?, options?)`. Returns `{ progress, velocity }` where progress is a normalized `0→1` scroll value clamped at [0, 1]. SHALL set `--scrub` CSS custom property on the element. SHALL throttle scroll updates via `requestAnimationFrame`.

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `input` | `Window \| RefObject` | `window` | Scroll container |
| `options.start` | `number` | `0` | Start offset (px) |
| `options.end` | `number` | `innerHeight` | End offset (px) |

#### Scenario: Normal scroll
GIVEN a section with useScrub WHEN user scrolls top to bottom THEN progress moves 0→1 AND `--scrub` custom property tracks the value.

### REQ-HOOK-002: useScrollPin

Accepts `(element: RefObject)`. Returns `{ pinned: boolean }` — `true` when the element top is at or above viewport top and the element is intersecting. Uses IntersectionObserver internally.

#### Scenario: Sticky detection
GIVEN pinned element with useScrollPin WHEN element top reaches viewport top THEN `pinned` becomes `true`.

### REQ-HOOK-003: useSplitText

Accepts `(text: string, options?)`. Returns `{ chars, words, lines }` — each is an array of React `<span>` elements with `data-char`, `data-word`, or `data-line` attributes.

| Param | Type | Default |
|-------|------|---------|
| `options.charClassName` | `string` | `''` |
| `options.wordClassName` | `string` | `''` |
| `options.lineClassName` | `string` | `''` |

#### Scenario: Character split
GIVEN `useSplitText("hello", { charClassName: 'char' })` WHEN rendered THEN each character is a `<span className="char">` with `data-char` attribute.

### REQ-HOOK-004: useSmoothScroll

Creates its own Lenis instance (does NOT wrap existing). Returns `{ scrollTo, progress, isScrolling }`. On Lenis init failure, scrollTo falls back to native `scrollIntoView`.

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `options.duration` | `number` | `1.2` | Lenis duration |
| `options.easing` | `function` | expo-out `(t) => min(1, 1.001 - 2 ** (-10 * t))` | Easing function |
| `options.wheelMultiplier` | `number` | `1` | Wheel speed multiplier |

**Returns**: `{ scrollTo: (target, opts?) => void, progress: number, isScrolling: boolean }`

#### Scenario: Lenis fail
GIVEN Lenis fails to init WHEN `scrollTo` called THEN native `scrollIntoView` is used as fallback.

### REQ-SHOW-001: Showcase route

The system MUST provide `#showcase` hash route within the existing Vite app, rendering `<Showcase />` (lazy-loaded via `React.lazy` + `<Suspense>`) without breaking existing sections. The route SHALL use hash-based routing with no additional dependencies (no React Router).

#### Scenario: Route mounts
GIVEN user navigates to `#showcase` WHEN route renders THEN Showcase mounts via lazy import AND existing sections remain AND a loading fallback is shown during chunk load.

### REQ-SHOW-002: Category sidebar

Sidebar with "All" (showing total count) plus one tab per category: TextAnimations, HoverEffects, ScrollReveal, Layout, Backgrounds. Each tab SHALL show a count badge. Selecting a tab filters the component grid via hash-based routing (`#showcase/{Category}`).

#### Scenario: Sidebar with badges
GIVEN showcase loaded WHEN sidebar renders THEN "All" shows total 22 AND each category tab shows its component count.

### REQ-SHOW-003: Code panel

Clicking a pattern card SHALL open an overlay panel showing the component's full source with CSS-only syntax highlighting. The panel SHALL have a close button.

#### Scenario: Source display
GIVEN user clicks a pattern card WHEN panel opens THEN source code is displayed with highlighted keywords AND a close button is visible.

### REQ-SHOW-004: Filtering

Category tabs MUST filter visible patterns via hash routing. An "All" tab SHALL show all 22. Category-specific hash routes (`#showcase/TextAnimations`, `#showcase/HoverEffects`, etc.) SHALL filter accordingly.

#### Scenario: Filter then reset
GIVEN showcase loaded WHEN user clicks "TextAnimations" THEN only TextAnimations patterns visible. WHEN "All" clicked THEN all 22 reappear.

### REQ-SHOW-005: Reduced motion

WHEN `prefers-reduced-motion: reduce`, all animations MUST be disabled and static content rendered.

#### Scenario: Reduced motion
GIVEN `prefers-reduced-motion: reduce` WHEN showcase mounts THEN no animations run AND all content fully visible.
