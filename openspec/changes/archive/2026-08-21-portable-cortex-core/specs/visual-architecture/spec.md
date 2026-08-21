# Delta for visual-architecture

## MODIFIED Requirements

### Requirement VA-001: Token domains

The system MUST define tokens across exactly 5 domains: palette, typography, rhythm, animation-tone, scroll-narrative. Each token domain SHALL produce at least one but no more than 3 CSS custom properties, with one explicit exception: palette MAY emit exactly 4 CSS custom properties so its full canonical set is preserved while every other emitting domain remains capped at 3. The canonical property namespace SHALL be `--{domain}-{property}` (e.g., `--palette-primary`, `--rhythm-base`); the legacy `--od-{group}-{name}` namespace is hereby frozen as NON-canonical: every legacy `--od-*` token MUST be aliased to its canonical `--{domain}-{property}` equivalent, not hard-deleted. The canonical mapping SHALL be: palette → `--palette-primary|secondary|background|text` (4 properties), typography → `--typography-heading|body|mono` (3), rhythm → `--rhythm-base` (spacing unit) and `--rhythm-radius` (radius value) (2), animation-tone → `--animation-duration` and `--animation-easing` (2), scroll-narrative → reserved slots (no tokens emitted in this slice, DRL narrative concept). This yields 11 canonical properties (4 + 3 + 2 + 2), leaving 1 slot of headroom to the 12-token cap.
(Previously: Stated a uniform "no more than 3 CSS custom properties per domain" cap that contradicted the canonical palette mapping (4 properties); the cap now grants palette an explicit 4-property exemption while all other emitting domains stay capped at 3.)

#### Scenario: Canonical token set emitted

GIVEN an aesthetic brief WHEN the system generates a token set THEN all emitted properties follow `--{domain}-{property}` AND every domain except scroll-narrative contributes at least one property AND palette emits exactly its 4 canonical properties AND every other emitting domain emits no more than 3 properties AND the total is 11.

#### Scenario: Legacy tokens aliased

GIVEN a generated token set in a project previously using `--od-*` WHEN inspecting the CSS THEN each `--od-{group}-{name}` has a canonical `--{domain}-{property}` equivalent AND a legacy alias declaration maps the `--od-*` name to the canonical value AND no legacy token is removed without its canonical replacement AND the 4 canonical palette properties remain present.

### Requirement VA-004: Ponytail token cap

The system MUST NOT generate more than 12 CSS custom properties per project. This cap is enforced at emission time — if the heuristics produce more, the system SHALL drop the lowest-priority tokens until the cap is met. Dropped tokens SHALL be recorded in `preservation-matrix.json` under `dropped` with a reason.
(Previously: Cap enforced at emission only, with no record of what was dropped or any binding to the Preservation Matrix contract.)

#### Scenario: Cap enforcement

GIVEN an aesthetic brief that would produce 15 tokens WHEN the system emits CSS THEN exactly 12 tokens are emitted AND the log records which 3 were dropped with reason AND `preservation-matrix.json` lists the 3 dropped tokens with reasons.

#### Scenario: Scroll domain contributes no tokens under cap pressure

GIVEN the canonical 11-token mapping AND a brief that would add a scroll-narrative token WHEN the system emits CSS THEN the scroll-narrative token is not emitted (reserved slot) AND the total stays at 11 AND the scroll intent is recorded in `redesign-intent.json` `notes`, not as a token.

### Requirement VA-005: Scroll narrative tokens

The scroll-narrative domain SHALL define tokens that control scroll-driven animation behavior: scroll threshold, parallax intensity, and reveal distance. These tokens MUST produce valid CSS for `@keyframes` and scroll-timeline where supported, or gracefully degrade to intersection-observer-driven equivalents. In this portability slice, scroll-narrative SHALL be treated as a reserved domain: its slots are reserved within the 12-token cap but no scroll-narrative token is emitted, since scroll intent is a DRL narrative concept captured in `redesign-intent.json`, not a project token.
(Previously: Scroll-narrative tokens were to be emitted directly; this slice freezes them as reserved to keep the emitted set within the cap and aligned with the portable capsule.)

#### Scenario: Scroll tokens reserved

GIVEN a generated token set WHEN inspecting emitted CSS THEN no `--scroll-*` property is present AND the `redesign-intent.json` `notes` records the scroll intent.

#### Scenario: Reserved slot leaves headroom

GIVEN the canonical 11-token set WHEN totaling emitted properties THEN the count is 11 AND exactly 1 slot remains before the 12-token cap.

## ADDED Requirements

### Requirement VA-006: Palette canonical set preserved

The palette domain SHALL always emit its four canonical properties `--palette-primary`, `--palette-secondary`, `--palette-background`, and `--palette-text`. None of the four palette properties SHALL be dropped by the 12-token cap enforcement; dropped-token selection MUST treat the palette set as mandatory.
(Reason: Human decision VA-001 — the four canonical palette properties are non-negotiable, so cap-driven dropping must never sacrifice a palette property.)

#### Scenario: Palette never dropped under pressure

GIVEN a brief producing 15 tokens including a palette re-ordering heuristic WHEN the cap is enforced THEN all four canonical palette properties are emitted AND any dropped tokens exclude the palette set AND the total is 12.

#### Scenario: All four palette properties valid

GIVEN a generated token set WHEN inspecting `--palette-*` properties THEN exactly the four canonical names exist AND each carries its canonical role (primary, secondary, background, text).
