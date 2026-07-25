# Design: Curtains Transitions

## Technical Approach

7 scroll-driven CSS clip-path/mask transitions as composable React components. A `<Curtains>` wrapper drives progress via `useScrub` (element-in-viewport 0→1) and applies clip-path from `presets.js`. Each effect also exports standalone by wrapping Curtains with a preset. Zero animation libraries, GPU-composited via `will-change`.

## Architecture Decisions

### 1. Element-in-viewport scroll (not page-wide)
`useScrub` uses IntersectionObserver + passive scroll rAF. Returns `{ progress: number, isInView: bool }` — 0 when element bottom enters viewport, 1 when top exits. Reusable across pages vs page-scroll%. Observer detects entry boundaries, scroll rAF interpolates within the window.

### 2. Pixels uses SVG `<mask>`, not CSS clip-path polygon
A single polygon can't represent disconnected pixel cells. **Choice**: inline `<svg><mask>` with N×M `<rect>` grid. Each rect opacity toggles by distance-from-center vs progress. Firefox: `mask: url(#id)` is unreliable — fallback to opacity via feature-detect `CSS.supports('mask', 'url(#x)')`.

### 3. 7 thin wrappers + presets.js
Each wrapper <15 lines, all clip-path values in `presets.js`. Tree-shakes independently. Ponytail considered: merging into one `<Transition>` with type prop saves files but breaks named imports per spec.

### 4. Blinds uses `mask-image: repeating-linear-gradient`
Gradient stop positions driven by progress. Simpler than polygon math for slats. Firefox fallback = opacity.

### 5. Reduced-motion: mount-time snapshot
`useScrub` checks `matchMedia('prefers-reduced-motion: reduce')` once. If true, returns `progress=1` — no listener, no animation work.

## Data Flow

```
Scroll/IO → useScrub(ref) → { progress, isInView }
                │
          <Curtains config={{ type, direction }}>
                │
          PRESETS[type][direction] → { start, end }
                │
          interpolate(start → end, at=progress)
                │
          <div.layer-top style={{ clipPath }}>
          {children[0]} clipped away (z:1)
          <div.layer-bottom>
          {children[1]} revealed (z:0)
```

### Sequence

```
Mount → detect Firefox + reduced-motion → initial state
  │
  ├─ IO fires → el in view? → start rAF
  │                ↓
  │     getBoundingClientRect()
  │     progress = map(elTop, viewportBottom→viewportTop, 0→1)
  │                ↓
  │     setState → render → interpolate clip-path
  │
  └─ Unmount → disconnect IO + cancel rAF
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Transitions/Curtains.jsx` | Create | Wrapper: progress, presets, two-layer layout |
| `src/components/Transitions/Curtains.css` | Create | Overlap layout, will-change, reduced-motion |
| `src/components/Transitions/presets.js` | Create | PRESETS: type→direction→{cssProperty,start,end} |
| `src/components/Transitions/useScrub.js` | Create | Element-in-viewport scroll progress hook |
| `src/components/Transitions/Transition*.jsx` (7) | Create | Each wraps Curtains with a preset |
| `src/components/Transitions/Transition*.stories.jsx` (7) | Create | 1-3 stories per effect |
| `src/data/registry.js` | Modify | Add `transitions` category + 7 lazy entries |

## Interfaces

```jsx
// useScrub(ref) → { progress: 0..1, isInView: bool }
// <Curtains config={{ type, direction?, duration?, easing? }}>
//   {children[0]=exiting, children[1]=revelado}
// </Curtains>
// PRESETS[type][direction] = { cssProperty, start, end }
```

### Per-effect preset example
| Effect | Property | Start | End |
|--------|----------|-------|-----|
| Wipe left | clipPath | `inset(0 100% 0 0)` | `inset(0 0 0 0)` |
| Iris | clipPath | `circle(0% at 50% 50%)` | `circle(100% at 50% 50%)` |
| Doors | clipPath | `inset(0 50% 0 50%)` | `inset(0 0 0 0)` |
| Shutter up | clipPath | `inset(50% 0 0 0)` | `inset(0 0 0 0)` |
| Blinds horiz | mask | repeating-gradient at 0% | repeating-gradient at 100% |
| Fade | opacity | `0` | `1` |
| Pixels | mask | SVG grid hidden | SVG grid full |

## Testing

No test runner. Verification: `npm run build` (imports), Storybook (visual per effect), Chrome DevTools reduced-motion toggle, Firefox DevTools computed styles for mask fallback.

## Migration

No migration. New components only. Single PR.

## Open Questions

- [ ] Pixels grid density: 8×8 default OK? Configurable `grid` prop is YAGNI for v1 unless spec requires.
- [ ] `duration` prop maps to scroll fraction. If unused by spec, remove — it's speculative flexibility.

## ponytail:check

- `duration`/`easing` props: YAGNI risk — spec defines defaults but no consuming code overrides them yet. Accept for spec compliance, revisit if unused after integration.
- Pixels grid config: YAGNI. Hardcode 8×8, add config when someone asks.
- 7 separate wrappers: borderline. But spec requires named imports per effect, and 15 lines each costs nothing.
