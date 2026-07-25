# Tasks: Curtains Transitions

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 450–600 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation + 7 effects + stories + registry | Single PR | All additive, no migrations, effects share 80% logic via presets.js + Curtains.jsx |

## Phase 1: Foundation (4 files)

- [x] 1.1 Create `src/components/Transitions/` directory
- [x] 1.2 Create `src/components/Transitions/useScrub.js` — element-in-viewport scroll hook, passive scroll listener + rAF throttling, returns `{ progress, velocity }`, sets `--scrub` custom property, accepts `(input?, options?)` (Window or RefObject), respects reduced motion
- [x] 1.3 Create `src/components/Transitions/presets.js` — PRESETS map keyed `type → direction → { cssProperty, start, end[, compute] }` for all 7 effects. Blinds uses `repeating-linear-gradient` via `compute`, Pixels uses `clip-path: polygon` via `compute`, Fade uses `opacity`, rest use `clip-path`
- [x] 1.4 Create `src/components/Transitions/Curtains.css` — `.curtains` container, `.curtains__overlay` (z-index: 1), `.curtains__content` (z-index: 0), `will-change`, reduced-motion media query

## Phase 2: Core Wrapper

- [x] 2.1 Create `src/components/Transitions/Curtains.jsx` — wrapper accepting `type`, `children`, `direction?`, `duration?`, `className?`. Maps via presets.js, drives CSS property via `useScrub` progress, renders two absolutely-positioned layers with overlay layout. Firefox mask-image detection gates Blinds/Pixels to opacity fallback.

## Phase 3: Effect Components (7 thin wrappers, ~10–15 lines each)

- [ ] 3.1 Create `src/components/Transitions/TransitionWipe.jsx` — wraps Curtains with `{ type: 'wipe', direction, duration, easing }`
- [ ] 3.2 Create `src/components/Transitions/TransitionIris.jsx` — wraps Curtains with `{ type: 'iris', direction: 'center', duration, easing }`
- [ ] 3.3 Create `src/components/Transitions/TransitionBlinds.jsx` — wraps Curtains with `{ type: 'blinds', direction, duration, easing }`
- [ ] 3.4 Create `src/components/Transitions/TransitionDoors.jsx` — wraps Curtains with `{ type: 'doors', direction: 'center', duration, easing }`
- [ ] 3.5 Create `src/components/Transitions/TransitionShutter.jsx` — wraps Curtains with `{ type: 'shutter', direction, duration, easing }`
- [ ] 3.6 Create `src/components/Transitions/TransitionFade.jsx` — wraps Curtains with `{ type: 'fade', direction: 'center', duration, easing }`
- [ ] 3.7 Create `src/components/Transitions/TransitionPixels.jsx` — wraps Curtains with `{ type: 'pixels', direction: 'center', duration, easing }`

## Phase 4: Stories (7 CSF3 stories, ~35–45 lines each)

- [ ] 4.1 Create `src/components/Transitions/TransitionWipe.stories.jsx` — meta with argTypes for `direction` (select: left/right/up/down). Demo rendering two colored sections (e.g., teal → coral) with the transition between them. Export `Default` variant.
- [ ] 4.2 Create `src/components/Transitions/TransitionIris.stories.jsx` — directionless, same demo pattern
- [ ] 4.3 Create `src/components/Transitions/TransitionBlinds.stories.jsx` — direction select: horizontal/vertical
- [ ] 4.4 Create `src/components/Transitions/TransitionDoors.stories.jsx` — directionless
- [ ] 4.5 Create `src/components/Transitions/TransitionShutter.stories.jsx` — direction select: up/down
- [ ] 4.6 Create `src/components/Transitions/TransitionFade.stories.jsx` — directionless
- [ ] 4.7 Create `src/components/Transitions/TransitionPixels.stories.jsx` — directionless

## Phase 5: Registry

- [ ] 5.1 Add `{ id: 'transitions', name: 'Transitions' }` to `categories[]` in `src/data/registry.js` (after `backgrounds`)
- [ ] 5.2 Add 7 registry entries to `registry[]` in `src/data/registry.js`, category `transitions`, with `import()` lazy loading and controls matching each effect's config props (type fixed, direction select/disabled, no control for `children` since it wraps content)
- [ ] 5.3 Run `npm run build` and confirm no import or syntax errors

## Verification

- [ ] 6.1 Run `npm run storybook` and visually confirm all 7 stories render with interactive controls
- [ ] 6.2 Toggle `prefers-reduced-motion: reduce` in DevTools — verify all effects snap to fully open
- [ ] 6.3 Test Blinds/Pixels in Firefox — verify opacity fallback renders clean transition
