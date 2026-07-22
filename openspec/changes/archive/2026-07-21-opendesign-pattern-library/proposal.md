# Proposal: OpenDesign Pattern Library

## Intent

Build a curated UI/animation pattern library within OpenDesign, extracting top 20 non-overlapping components from React Bits + Magic UI, enhanced with scroll-driven block transitions (Curtains) — our greenfield opportunity. Ship with a React Bits-style showcase UI.

## Scope

### In Scope
- Extract 20 best non-overlapping components from React Bits + Magic UI
- Create 7 Curtain effects (wipe, iris, blinds, doors, shutter, fade, pixels)
- Extract 4 custom hooks (useScrub, useScrollPin, useSplitText, useSmoothScroll)
- Build showcase UI with categories, live preview, code display
- Showcase as route within existing Vite app

### Out of Scope
- Full 140+ component parity (select top 20)
- npm package publishing
- TypeScript migration
- Test suite (strict_tdd: false in config)

## Capabilities

### New Capabilities
- `pattern-library`: in-app showcase of interactive UI/animation patterns with live preview and code display
- `curtains-transitions`: scroll-driven block transitions via CSS `clip-path` / `mask-image`

### Modified Capabilities
None

## Approach

- Clone repos temporarily to extract components — NOT keep full repos as dependencies
- CSS-first Curtains (`clip-path`, `mask-image`) — zero animation library dependency
- One component per file, copy-paste friendly
- Curtains as a config object `{ type, direction, duration, easing }`
- All effects GPU-composited in Chromium/Safari

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/patterns/` | New | Pattern library components (20 files) |
| `src/hooks/` | New | Extracted custom hooks (4 files) |
| `src/sections/Showcase/` | New | Showcase UI with preview + code (3-5 files) |
| `src/App.jsx` | Modified | Add showcase route |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No test suite (strict_tdd: false) | High | Visual review per pattern |
| Curtains require specific stacking context per section pair | Med | Document requirements per effect in a README |
| Firefox `mask-image` support behind flag | Med | Graceful CSS fallback per section |
| No TypeScript — all JSX | Low | Accept for v1; revisit for v2 |

## Rollback Plan

Remove the `src/patterns/`, `src/hooks/`, and `src/sections/Showcase/` directories. Revert `src/App.jsx` to current state. No npm dependencies added, so no rollback beyond file deletion.

## Dependencies

None. Uses existing Vite 5 + React 19. No new animation library or runtime dependency.

## Success Criteria

- [ ] 20 extracted components render correctly in the showcase
- [ ] 7 Curtain effects fire on scroll with GPU-smooth 60fps
- [ ] 4 hooks work as standalone utilities
- [ ] Showcase navigable by category with live preview + code display

## Ponytail Check

- **YAGNI**: Scope is minimal — 20 of 140+ possible components. Curtains are the unique value prop and zero-library. OK.
- **stdlib**: `clip-path` and `mask-image` are native CSS. Lenis is already installed for smooth scroll. No new dependencies. ✓
- **Shrink potential**: Could ship with 5-10 components and 3 Curtain effects. Defer scope decision to user (see Product Questions below).

## Proposal Questions (waiting on user)

1. **Naming convention**: "OpenDesign Patterns" or something else?
2. **Showcase location**: Route within the existing Vite app, or separate subdomain?
3. **Priority**: Complete all 20 components first, or ship a working showcase with 5-10 first?
