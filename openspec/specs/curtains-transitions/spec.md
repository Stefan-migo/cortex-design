# Curtains Transitions — Specification

## Purpose

Scroll-driven block transitions using CSS `clip-path` / `mask-image` with zero animation library dependency. 7 effects, config-driven, composable via a `<Curtains>` wrapper.

## Requirements

### REQ-CURTAIN-001: Seven effects

The system MUST implement exactly 7 curtain effects, each expressed as a CSS `clip-path` or `mask-image` animation driven by scroll progress (0→1 via useScrub).

| # | Effect | CSS Mechanism | Direction Support |
|---|--------|---------------|-------------------|
| 1 | Wipe | `clip-path: inset(0 side 0 side)` | left, right, up, down |
| 2 | Iris | `clip-path: circle(radius at center)` | center (directionless) |
| 3 | Blinds | `clip-path: polygon(...)` horizontal slats | horizontal, vertical |
| 4 | Doors | `clip-path: inset(0 side 0 side)` dual panel | center (opens from center) |
| 5 | Shutter | `clip-path: inset(top 0 bottom 0)` | up, down |
| 6 | Fade | `opacity` + optional `mask-image` | center (directionless) |
| 7 | Pixels | `clip-path: polygon(...)` grid dissolve | center (radial) |

#### Scenario: Wipe transition

GIVEN a Curtains with `{ type: 'wipe', direction: 'left' }` WHEN scroll progress moves from 0 to 1 THEN the clip-path animates from `inset(0 100% 0 0)` to `inset(0 0 0 0)`.

#### Scenario: Iris transition

GIVEN a Curtains with `{ type: 'iris' }` WHEN scroll progress moves from 0 to 1 THEN the clip-path animates from `circle(0% at 50% 50%)` to `circle(100% at 50% 50%)`.

#### Scenario: Pixels grid dissolve

GIVEN a Curtains with `{ type: 'pixels' }` WHEN scroll progress moves from 0 to 1 THEN a grid of small rectangles dissolves from center outward via `clip-path: polygon(...)` animation.

### REQ-CURTAIN-002: Config object pattern

Every curtain effect SHALL accept a config object `{ type, direction?, duration?, easing? }`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | `string` | — (required) | Effect name: wipe, iris, blinds, doors, shutter, fade, pixels |
| `direction` | `string` | `'left'` | Animation direction (effect-dependent) |
| `duration` | `number` | `1` | Normalized 0-1, maps to scroll range fraction |
| `easing` | `string` | `'ease-out-expo'` | CSS easing function name |

#### Scenario: Custom config

GIVEN `<Curtains config={{ type: 'blinds', direction: 'horizontal', duration: 0.6, easing: 'cubic-bezier(0.19, 1, 0.22, 1)' }}>` WHEN the component renders THEN the transition uses the specified duration and easing for the blinds effect.

### REQ-CURTAIN-003: Reusable `<Curtains>` wrapper

The system SHALL provide a `<Curtains config={...}>` wrapper component that:
- Accepts `config`, `children` (two sections: entering + exiting), and optional `className`
- Drives transition progress via `useScrub`
- Applies the correct CSS `clip-path` / `mask-image` based on `config.type`

#### Scenario: Basic usage

GIVEN `<Curtains config={{ type: 'wipe', direction: 'left' }}><SectionA /><SectionB /></Curtains>` WHEN the user scrolls THEN SectionA reveals SectionB via wipe clip-path driven by scroll progress.

### REQ-CURTAIN-004: Scroll-driven via useScrub

All curtain effects MUST respond to a normalized `0→1` progress value from `useScrub()`. The progress directly maps to the animation keyframe (no timeline trigger, pure interpolation).

#### Scenario: Progress mapping

GIVEN scroll progress is 0.5 WHEN the wipe effect renders THEN `clip-path: inset(0 50% 0 0)` (half-way open).

### REQ-CURTAIN-005: GPU compositing

All effects MUST use `will-change: clip-path` (or `will-change: opacity` for Fade) to enable GPU compositing in Chromium/Safari.

### REQ-CURTAIN-006: Firefox mask-image fallback

WHEN the browser is Firefox AND the effect uses `mask-image` (Blinds, Pixels), the system SHALL fall back to a `opacity`-based transition.

#### Scenario: Firefox fallback

GIVEN the browser is Firefox WHEN a Blinds effect is triggered THEN the component uses opacity transition instead of mask-image AND the visual result remains acceptable (blocks fade uniformly).

### REQ-CURTAIN-007: Reduced motion

WHEN `prefers-reduced-motion: reduce` is active, curtain effects MUST snap to their end state immediately (no animation). The content section SHALL be fully revealed.

#### Scenario: Reduced motion snap

GIVEN the user has `prefers-reduced-motion: reduce` WHEN the Curtains mounts THEN `clip-path: inset(0 0 0 0)` (fully open) immediately AND no transition runs.
