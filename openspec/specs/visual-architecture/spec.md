# Visual Architecture — Specification

## Purpose

Per-project design system that defines visual tokens (palette, typography, rhythm, animation tone, scroll narrative) and emits them as CSS custom properties. The system MUST produce a coherent token set from an aesthetic brief, capped at 12 tokens per project to prevent explosion.

## Requirements

### Requirement VA-001: Token domains

The system MUST define tokens across exactly 5 domains: palette, typography, rhythm, animation-tone, scroll-narrative. Each token domain SHALL produce at least one but no more than 3 CSS custom properties, with one explicit exception: palette MAY emit exactly 4 CSS custom properties so its full canonical set is preserved while every other emitting domain remains capped at 3. The canonical property namespace SHALL be `--{domain}-{property}` (e.g., `--palette-primary`, `--rhythm-base`); the legacy `--od-{group}-{name}` namespace is hereby frozen as NON-canonical: every legacy `--od-*` token MUST be aliased to its canonical `--{domain}-{property}` equivalent, not hard-deleted. The canonical mapping SHALL be: palette → `--palette-primary|secondary|background|text` (4 properties), typography → `--typography-heading|body|mono` (3), rhythm → `--rhythm-base` (spacing unit) and `--rhythm-radius` (radius value) (2), animation-tone → `--animation-duration` and `--animation-easing` (2), scroll-narrative → reserved slots (no tokens emitted in this slice, DRL narrative concept). This yields 11 canonical properties (4 + 3 + 2 + 2), leaving 1 slot of headroom to the 12-token cap.

#### Scenario: Complete token set

GIVEN a project with no design tokens WHEN the system generates a token set THEN the output contains CSS custom properties for all 5 domains AND the total number of properties does not exceed 12.

#### Scenario: Token domain naming

GIVEN a generated token set WHEN inspecting property names THEN each name follows `--{domain}-{property}` (e.g., `--palette-primary`, `--rhythm-base`) AND no token falls outside the 5 domains.

#### Scenario: Canonical token set emitted

GIVEN an aesthetic brief WHEN the system generates a token set THEN all emitted properties follow `--{domain}-{property}` AND every domain except scroll-narrative contributes at least one property AND palette emits exactly its 4 canonical properties AND every other emitting domain emits no more than 3 properties AND the total is 11.

#### Scenario: Legacy tokens aliased

GIVEN a generated token set in a project previously using `--od-*` WHEN inspecting the CSS THEN each `--od-{group}-{name}` has a canonical `--{domain}-{property}` equivalent AND a legacy alias declaration maps the `--od-*` name to the canonical value AND no legacy token is removed without its canonical replacement AND the 4 canonical palette properties remain present.

### Requirement VA-002: Aesthetic brief parsing

The lead agent MUST accept a free-text aesthetic brief (e.g., "warm, editorial feel with generous whitespace") and map it to concrete CSS values. The mapping SHALL use named heuristics — no ML models, no external APIs.

#### Scenario: Brief to tokens

GIVEN an aesthetic brief "cold, technical, dense" WHEN the system generates tokens THEN `--palette-primary` is a blue/cool hue AND `--typography-scale` is compact (below 1.25 ratio) AND `--rhythm-base` is below 16px.

#### Scenario: Minimal brief

GIVEN an aesthetic brief "dark mode" WHEN the system generates tokens THEN `--palette-background` is a dark value (luminance below 0.3) AND `--palette-text` is a light value (luminance above 0.7) AND all 5 domains are populated with sensible defaults.

### Requirement VA-003: CSS custom property output

The system MUST emit valid CSS custom properties on `:root` as a CSS string. The output SHALL be self-contained (no external dependencies, no `@import`).

#### Scenario: Valid CSS output

GIVEN a generated token set from requirement VA-001 WHEN the system emits CSS THEN the output is valid CSS containing `:root { ... }` AND every property is a valid CSS custom property AND the output parses without errors in a standards-compliant browser.

#### Scenario: Override stability

GIVEN the same aesthetic brief twice WHEN generating tokens both times THEN the output is identical (deterministic mapping).

### Requirement VA-004: Ponytail token cap

The system MUST NOT generate more than 12 CSS custom properties per project. This cap is enforced at emission time — if the heuristics produce more, the system SHALL drop the lowest-priority tokens until the cap is met. Dropped tokens SHALL be recorded in `preservation-matrix.json` under `dropped` with a reason.

#### Scenario: Cap enforcement

GIVEN an aesthetic brief that would produce 15 tokens WHEN the system emits CSS THEN exactly 12 tokens are emitted AND the log records which 3 were dropped with reason AND `preservation-matrix.json` lists the 3 dropped tokens with reasons.

#### Scenario: Scroll domain contributes no tokens under cap pressure

GIVEN the canonical 11-token mapping AND a brief that would add a scroll-narrative token WHEN the system emits CSS THEN the scroll-narrative token is not emitted (reserved slot) AND the total stays at 11 AND the scroll intent is recorded in `redesign-intent.json` `notes`, not as a token.

### Requirement VA-005: Scroll narrative tokens

The scroll-narrative domain SHALL define tokens that control scroll-driven animation behavior: scroll threshold, parallax intensity, and reveal distance. These tokens MUST produce valid CSS for `@keyframes` and scroll-timeline where supported, or gracefully degrade to intersection-observer-driven equivalents. In this portability slice, scroll-narrative SHALL be treated as a reserved domain: its slots are reserved within the 12-token cap but no scroll-narrative token is emitted, since scroll intent is a DRL narrative concept captured in `redesign-intent.json`, not a project token.

#### Scenario: Scroll tokens reserved

GIVEN a generated token set WHEN inspecting emitted CSS THEN no `--scroll-*` property is present AND the `redesign-intent.json` `notes` records the scroll intent.

#### Scenario: Reserved slot leaves headroom

GIVEN the canonical 11-token set WHEN totaling emitted properties THEN the count is 11 AND exactly 1 slot remains before the 12-token cap.

### Requirement VA-006: Palette canonical set preserved

The palette domain SHALL always emit its four canonical properties `--palette-primary`, `--palette-secondary`, `--palette-background`, and `--palette-text`. None of the four palette properties SHALL be dropped by the 12-token cap enforcement; dropped-token selection MUST treat the palette set as mandatory.

#### Scenario: Palette never dropped under pressure

GIVEN a brief producing 15 tokens including a palette re-ordering heuristic WHEN the cap is enforced THEN all four canonical palette properties are emitted AND any dropped tokens exclude the palette set AND the total is 12.

#### Scenario: All four palette properties valid

GIVEN a generated token set WHEN inspecting `--palette-*` properties THEN exactly the four canonical names exist AND each carries its canonical role (primary, secondary, background, text).
