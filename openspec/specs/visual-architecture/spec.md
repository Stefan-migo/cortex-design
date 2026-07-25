# Visual Architecture — Specification

## Purpose

Per-project design system that defines visual tokens (palette, typography, rhythm, animation tone, scroll narrative) and emits them as CSS custom properties. The system MUST produce a coherent token set from an aesthetic brief, capped at 12 tokens per project to prevent explosion.

## Requirements

### Requirement VA-001: Token domains

The system MUST define tokens across exactly 5 domains: palette, typography, rhythm, animation-tone, scroll-narrative. Each token domain SHALL produce at least one but no more than 3 CSS custom properties.

#### Scenario: Complete token set

GIVEN a project with no design tokens WHEN the system generates a token set THEN the output contains CSS custom properties for all 5 domains AND the total number of properties does not exceed 12.

#### Scenario: Token domain naming

GIVEN a generated token set WHEN inspecting property names THEN each name follows `--{domain}-{property}` (e.g., `--palette-primary`, `--rhythm-base`) AND no token falls outside the 5 domains.

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

The system MUST NOT generate more than 12 CSS custom properties per project. This cap is enforced at emission time — if the heuristics produce more, the system SHALL drop the lowest-priority tokens until the cap is met.

#### Scenario: Cap enforcement

GIVEN an aesthetic brief that would produce 15 tokens WHEN the system emits CSS THEN exactly 12 tokens are emitted AND the log records which 3 were dropped with reason.

### Requirement VA-005: Scroll narrative tokens

The scroll-narrative domain SHALL define tokens that control scroll-driven animation behavior: scroll threshold, parallax intensity, and reveal distance. These tokens MUST produce valid CSS for `@keyframes` and scroll-timeline where supported, or gracefully degrade to intersection-observer-driven equivalents.

#### Scenario: Scroll tokens generated

GIVEN a generated token set WHEN inspecting scroll-narrative tokens THEN `--scroll-reveal-threshold` is a percentage string (e.g., `0.2`) AND `--scroll-parallax-intensity` is a CSS length WITH a `ponytail:` comment noting the degradation path for browsers without scroll-timeline support.
