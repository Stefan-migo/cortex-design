# Design: OpenDesign Pattern Library — Cortex Design Library

## Technical Approach

Extract top 20 non-overlapping components from React Bits + Magic UI into `src/patterns/`, implement 7 scroll-driven Curtain transitions via CSS `clip-path`/`mask-image`, extract 4 hooks into `src/hooks/`, and build a React Bits-style showcase at `/showcase`. Zero new dependencies — Lenis already installed for smooth scroll. CSS-first, GPU-composited, JSX-only (no TS).

---

## 1. Architecture Overview

```
src/
├── App.jsx               ← Modified: add /showcase route
├── hooks/                ← New: 4 extracted hooks
│   ├── useScrub.js
│   ├── useScrollPin.js
│   ├── useSplitText.js
│   └── useSmoothScroll.js
├── patterns/             ← New: 20 extracted components
│   ├── index.js          ← Registry: category metadata + lazy refs
│   ├── TextAnimations/   ← 5 components
│   ├── HoverEffects/     ← 5 components
│   ├── ScrollReveal/     ← 4 components
│   ├── Layout/           ← 3 components
│   └── Backgrounds/      ← 3 components
├── curtains/             ← New: Curtain system
│   ├── Curtains.jsx      ← <Curtains> wrapper component
│   ├── effects/          ← 7 effect CSS files
│   └── curtainConfig.js  ← config object
└── sections/
    └── Showcase/         ← New: showcase UI (3–5 files)
        ├── Showcase.jsx
        ├── CategorySidebar.jsx
        ├── ComponentGrid.jsx
        ├── CodeDisplay.jsx
        └── Showcase.css
```

### Component Tree

```
App
├── Hero (unchanged)
├── Projects (unchanged)
└── Showcase  ← new route
    ├── CategorySidebar
    ├── ComponentGrid
    │   └── PatternCard (20×)
    │       └── LivePreview
    └── CodeDisplay
```

### Data Flow: Scroll → Curtains

```
Lenis scroll event
    → useScrub(window) { progress: 0→1, velocity }
        → CSS custom property --scrub-progress on :root
            → Curtains read --scrub-progress via style.getPropertyValue
                → clip-path / mask-image animate on compositor thread
```

---

## 2. Hooks Design

### `useScrub(input, options?)`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `input` | `Window \| RefObject` | `window` | Scroll container |
| `options.start` | `number` | `0` | Start offset (px) |
| `options.end` | `number` | `innerHeight` | End offset (px) |

**Returns**: `{ progress: number (0–1, clamped), velocity: number }`

**Edge cases**: input unmounts → cleanup listener; window resize → recalc end; velocity sign → scroll direction detection.

### `useScrollPin(element)`

| Param | Type | Description |
|-------|------|-------------|
| `element` | `RefObject` | Element to observe |

**Returns**: `{ pinned: boolean }` — `true` when sticky positioning is active (element top <= 0).

### `useSplitText(text, options?)`

| Param | Type | Default |
|-------|------|---------|
| `text` | `string` | — |
| `options.delimiter` | `'chars' \| 'words' \| 'lines'` | `'chars'` |

**Returns**: `{ chars: string[], words: string[], lines: string[], elements: SpanElement[] }`

**Edge cases**: empty string → empty arrays; single char → single-element arrays; whitespace-only → filtered out.

### `useSmoothScroll(options?)`

| Param | Type | Default |
|-------|------|---------|
| `options.duration` | `number` | `1.2` |
| `options.easing` | `function` | expo-out |
| `options.wheelMultiplier` | `number` | `1` |

**Returns**: `{ scrollTo: (target, opts?) => void, progress: number, lenis: Lenis }`

Wraps existing Lenis instance — does NOT create a second one. Reads the lenisRef created in App.jsx.

---

## 3. Curtains System Design

```
<Curtains effect="wipe" direction="up" duration={0.5} easing="ease-in-out">
  <YourSection />
</Curtains>
```

### Config Object

```js
// src/curtains/curtainConfig.js
export const CURTAIN_EFFECTS = {
  wipe:    { directions: ['up','down','left','right'], css: 'clip-path: inset(…)' },
  iris:    { directions: ['center'],                   css: 'clip-path: circle(…)' },
  blinds:  { directions: ['up','down','left','right'], css: 'clip-path: polygon(…)' },
  doors:   { directions: ['center'],                   css: 'clip-path: polygon(…)' },
  shutter: { directions: ['left','right'],             css: 'clip-path: inset(…)' },
  fade:    { directions: ['up','down'],                css: 'opacity + translate' },
  pixels:  { directions: ['center'],                   css: 'mask-image: repeating-conic-gradient' },
}
```

### Stacking Context Strategy

```
<section style="position: sticky; top: 0; height: 100vh; z-index: 1;">
  <div class="curtain-overlay" style="position: absolute; inset: 0; z-index: 2;" />
  <div class="curtain-content" style="position: relative; z-index: 3;" />
</section>
```

Each section pair (exit + enter) gets its own z-index layer. Sticky wrapper keeps the curtain in viewport during the scroll range.

### CSS Custom Properties

```css
:root {
  --curtain-progress: 0;
  --curtain-duration: 0.5;
  --curtain-easing: cubic-bezier(0.19, 1, 0.22, 1);
}

/* Wipe up example */
.curtain-wipe-up {
  clip-path: inset(0 0 calc(100% * var(--curtain-progress)) 0);
  transition: clip-path calc(var(--curtain-duration) * 1s) var(--curtain-easing);
}
```

All properties GPU-composited in Chromium/Safari (`clip-path`, `mask-image`, `opacity`, `transform`). No `width/height/top/left` animations.

### Fallback: Firefox & Reduced Motion

```css
/* Firefox: mask-image behind layout.css.webkit-mask-image.enabled */
@supports not (clip-path: inset(0)) {
  .curtain-wipe-up { clip-path: none; opacity: calc(1 - var(--curtain-progress)); }
}

/* Reduced motion: instant reveal */
@media (prefers-reduced-motion: reduce) {
  .curtains-wrapper { clip-path: none !important; opacity: 1 !important; }
}
```

---

## 4. Component Registry

### Registry Structure (`src/patterns/index.js`)

```js
export const registry = [
  {
    id: 'split-text',
    name: 'Split Text',
    category: 'text-animations',
    description: 'Staggered character reveal on hover/scroll',
    source: () => import('./TextAnimations/SplitText'),
    tags: ['text', 'stagger', 'hover'],
  },
  // …19 more entries
];

export const categories = [
  { id: 'text-animations', name: 'Text Animations', icon: 'Aa' },
  { id: 'hover-effects',   name: 'Hover Effects',   icon: '↗' },
  { id: 'scroll-reveal',   name: 'Scroll Reveal',   icon: '↓' },
  { id: 'layout',          name: 'Layout',           icon: '⊞' },
  { id: 'backgrounds',     name: 'Backgrounds',      icon: '◐' },
];
```

### Import Pattern: Lazy

Each `source` is a dynamic `() => import(...)` — loaded on demand when the user clicks a category or a pattern card. No eager loading at app boot. This keeps the main app bundle lean.

---

## 5. Showcase UI Architecture

### Route Setup (Hash-based — no React Router dep)

```jsx
// App.jsx
const [route, setRoute] = useState('home');
const hash = window.location.hash.replace('#', '') || 'home';
// Simple hash change listener → setRoute(hash)
```

Why hash instead of React Router: zero dependency, works with static Vite build, good enough for a single additional route.

### State Management

```jsx
const [activeCategory, setActiveCategory] = useState(null); // null = all
const [selectedComponent, setSelectedComponent] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
```

No global state library — local `useState` + prop drilling in the showcase tree. Only 3 levels deep.

### UI Layout

```
┌─────────────┬──────────────────────────────────────┐
│ Category     │ Component Grid                       │
│ Sidebar      │ ┌──────┐ ┌──────┐ ┌──────┐          │
│              │ │ Card  │ │ Card  │ │ Card  │          │
│ • All        │ │       │ │       │ │       │          │
│ • Text Anim  │ │preview│ │preview│ │preview│          │
│ • Hover      │ └──────┘ └──────┘ └──────┘          │
│ • Scroll Rev │                                         │
│ • Layout     │  (or CodePreview when selected)         │
│ • Background │                                         │
└─────────────┴──────────────────────────────────────┘
```

When a component is selected: the grid switches to a single-column layout with live preview on top, code display below. Highlight.js or Prism for syntax highlighting (bundled, no extra npm dep — use a CDN-light inline solution).

---

## 6. Data Structures

```js
// Curtain config
{
  type: 'wipe' | 'iris' | 'blinds' | 'doors' | 'shutter' | 'fade' | 'pixels',
  direction: 'up' | 'down' | 'left' | 'right' | 'center',
  duration: 0.3,     // seconds, clamped 0.3–1.0
  easing: 'ease-in-out' | 'cubic-bezier(0.19, 1, 0.22, 1)',  // CSS easing
}

// Component registry entry
{
  id: 'split-text',             // kebab-case, unique
  name: 'Split Text',           // display name
  category: 'text-animations',  // matches categories[].id
  description: 'Staggered character reveal…',
  source: () => import('./…'),  // lazy import function
  preview: 'gif' | 'live' | 'none',  // preview type
  tags: ['text', 'stagger'],    // search/filter
}

// Category metadata
{
  id: 'text-animations',
  name: 'Text Animations',
  icon: 'Aa',                   // emoji or SVG icon name
  order: 1,                     // display order
}
```

---

## 7. Performance Considerations

| Concern | Strategy |
|---------|----------|
| GPU compositing | Animate only `clip-path`, `mask-image`, `opacity`, `transform` — all GPU-composited in Chromium/Safari |
| Layout thrashing | Read styles in `useScrub` rAF, write to CSS custom property — no forced reflow |
| Scroll handler | `useScrub` uses `requestAnimationFrame` + passive scroll (no `preventDefault`) |
| Lazy loading | All pattern components loaded via dynamic `import()` — never at boot |
| Curtains reuse | Single `<Curtains>` per section pair, not per element — one scroll listener per curtain |
| Lenis already throttled | Lenis fires at rAF rate, not raw scroll — useScrub reads from Lenis event, not `wheel` |
| Firefox mask | Falls back to opacity animation (no mask-image perf issues) |

---

## Architecture Decisions

### Decision: Hash-based routing vs React Router

**Choice**: Hash-based with `useState` + `hashchange` listener.  
**Alternatives**: `react-router-dom` (npm dep).  
**Rationale**: Single additional route. Adding react-router for one route is YAGNI. Hash routing works with Vite's static build without configuration.

### Decision: Dynamic import per component vs single bundle

**Choice**: Dynamic `() => import(...)` per component in registry.  
**Alternatives**: Single large bundle; CSS-only code-split at build.  
**Rationale**: 20 components × avg 2KB = 40KB total — not huge, but lazy loading means the main app is unaffected. Showcase visitors only download what they browse.

### Decision: CSS custom properties for curtain progress vs JS-driven style

**Choice**: `--curtain-progress` CSS custom property set once per frame via JS, CSS transitions/animations on the GPU thread.  
**Alternatives**: JS-updated inline styles every frame; Web Animations API.  
**Rationale**: Custom properties decouple scroll tracking from rendering — `useScrub` writes one property, all curtains read it independently. GPU thread handles the animation without JS intervention per frame.

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useScrub.js` | Create | Scroll progress hook |
| `src/hooks/useScrollPin.js` | Create | Sticky position detection |
| `src/hooks/useSplitText.js` | Create | Text → char/word/line splitting |
| `src/hooks/useSmoothScroll.js` | Create | Lenis wrapper hook |
| `src/patterns/index.js` | Create | Component registry + categories |
| `src/patterns/TextAnimations/` | Create | 5 text animation components |
| `src/patterns/HoverEffects/` | Create | 5 hover effect components |
| `src/patterns/ScrollReveal/` | Create | 4 scroll reveal components |
| `src/patterns/Layout/` | Create | 3 layout components |
| `src/patterns/Backgrounds/` | Create | 3 background components |
| `src/curtains/Curtains.jsx` | Create | Curtain wrapper component |
| `src/curtains/curtainConfig.js` | Create | Config object for 7 effects |
| `src/curtains/effects/` | Create | 7 CSS files, one per effect |
| `src/sections/Showcase/Showcase.jsx` | Create | Main showcase page |
| `src/sections/Showcase/CategorySidebar.jsx` | Create | Category filter sidebar |
| `src/sections/Showcase/ComponentGrid.jsx` | Create | Component grid with cards |
| `src/sections/Showcase/CodeDisplay.jsx` | Create | Syntax-highlighted code panel |
| `src/sections/Showcase/Showcase.css` | Create | Showcase styles |
| `src/App.jsx` | Modify | Add hash router + showcase route |

Files to create: ~30. Files to modify: 1. Files to delete: 0.

---

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Visual | 7 Curtain effects, 20 components | Manual review in browser |
| Build | No broken imports | `npm run build` |
| Scroll | useScrub returns 0→1 as user scrolls | Manual (log progress) |
| Reduced motion | Curtains instantly reveal | DevTools → prefers-reduced-motion: reduce |

No unit tests per `strict_tdd: false`.

---

## Migration / Rollout

No migration required. New directories only. The existing landing page (Hero, Projects, experiments) remains untouched. The `/showcase` route loads alongside existing content.

---

## Open Questions

- [ ] Curtains: should effects be configurable per direction pair, or one global config per `<Curtains>` wrapper?
- [ ] Firefox `mask-image` support: test before implementing pixels effect — may need to exclude it on FF.
- [ ] Component extraction order: which 5 components from each category? Need to review React Bits + Magic UI repos to select non-overlapping top 20.
