# Proposal: Curtains Transitions

## Intent

Implement 7 scroll-driven page transitions from existing `openspec/specs/curtains-transitions/spec.md` as reusable React components with colocated Storybook stories. Zero animation libraries — all CSS `clip-path`/`mask-image`, GPU-composited, with Firefox fallback and `prefers-reduced-motion: reduce` support.

## Scope

### In Scope

- **7 effect components**: `TransitionWipe`, `TransitionIris`, `TransitionBlinds`, `TransitionDoors`, `TransitionShutter`, `TransitionFade`, `TransitionPixels`
- **`<Curtains>` wrapper**: accepts `config` prop (`{ type, direction?, duration?, easing? }`), wraps two children (exiting/entering sections)
- **Colocated stories**: one `.stories.jsx` per effect with controls for direction, duration, easing
- **Registry**: category `"transitions"` in `src/data/registry.js`, 7 entries with `import()` lazy loading
- **Firefox fallback**: `mask-image` effects degrade to opacity transition
- **Reduced motion**: `prefers-reduced-motion: reduce` snaps to end state immediately
- **`useScrub` hook**: internal hook providing normalized 0→1 scroll progress

### Out of Scope

- npm package publishing
- TypeScript
- Full test suite (build verification + visual review sufficient)
- Animation library dependencies (Framer Motion, GSAP, etc.)

## Capabilities

### New Capabilities
None — spec already exists at `openspec/specs/curtains-transitions/spec.md`.

### Modified Capabilities
None — pure implementation of existing spec.

## Approach

Each effect is a standalone component with its own CSS animation logic. `<Curtains>` is the orchestrator: it reads `config`, instantiates the correct effect component, and drives it via a `progress` value (0→1) from an internal `useScrub` hook. Effects apply `will-change: clip-path` (or `will-change: opacity` for Fade) for GPU compositing. Firefox detection gates `mask-image`-based effects (Blinds, Pixels) with opacity fallback. Reduced motion is handled via `matchMedia('prefers-reduced-motion: reduce')`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/Transitions/` | New | 7 effect components + Curtains wrapper + 7 stories + CSS |
| `src/components/Transitions/useScrub.js` | New | Scroll progress hook |
| `src/data/registry.js` | Modified | Add `"transitions"` category + 7 registry entries |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Firefox `mask-image` clip rendering | Medium | Opacity fallback for Blinds/Pixels |
| `useScrub` doesn't exist yet | Low | Build as internal hook; straightforward IntersectionObserver + scroll listener |
| Visual quality across 7 effects | Low | Build check gate; manual visual review per effect |

## Rollback Plan

Git revert of the change's commits. No schema, data, or config changes beyond `registry.js`.

## Dependencies

- `useScrub` hook (implemented inline — no external dep)
- React 19 (project already uses it)

## Success Criteria

- [ ] `npm run build` passes
- [ ] `npm run storybook` renders all 7 stories with interactive controls
- [ ] Each effect animates closed→open on scroll in story's canvas
- [ ] `prefers-reduced-motion: reduce` snaps to fully open (no animation)
- [ ] Firefox renders Blinds/Pixels with opacity fallback (no broken clip masks)
