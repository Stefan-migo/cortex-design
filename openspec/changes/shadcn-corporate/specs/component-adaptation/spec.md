# Delta for component-adaptation

## ADDED Requirements

### CA-005: Corporate vocabulary support

The system MUST accept the corporate vocabulary in catalog queries: `moodTags` value `corporate` and the corporate `visualContext` set (`navigation`, `table`, `form`, `dialog`, `menu`, `sidebar`, `tooltip`, `pagination`, `breadcrumb`, `tabs`, `switch`, `progress`). Matching SHALL follow CA-001 semantics: `visualContext` exact-match, `moodTags` OR-within-set. The extended vocabulary SHALL be documented so a future enum whitelist can validate it.

#### Scenario: Corporate query
- GIVEN a catalog with corporate entries tagged `moodTags:["corporate"]`
- WHEN querying `visualContext:"table"` AND `moodTags:["corporate","clean"]`
- THEN corporate table components match via the OR tag AND exact visualContext.

#### Scenario: Vocabulary documented
- GIVEN the corporate vocabulary extension
- WHEN reviewing the change specs
- THEN the added `visualContext` words and `corporate` moodTag are listed for future whitelist.

## MODIFIED Requirements

### Requirement CA-002: Token mapping

The system SHALL map each selected component's declared token slots (e.g., `--accent-color`, `--font-heading`) to the project's design token set from visual-architecture. For corporate-family components, token slots SHALL map to local per-component CSS variables that default to the app palette (`var(--accent)`, `var(--text)`, `var(--border)`, `var(--surface)`); the system must NOT introduce shadcn global tokens (`--background`, `--foreground`, `--primary`, `--radius`) into `:root`. If the project token set (or local variable) lacks a required slot, the system SHALL use a hardcoded fallback from the component's `adaptationRules.defaults`.
(Previously: component token slots mapped only against the project-wide visual-architecture token set, with no corporate family or local-variable defaulting.)

#### Scenario: Full token mapping
- GIVEN a component with `adaptationRules.tokenSlots: ["--palette-primary", "--typography-heading"]` AND a project token set that defines both WHEN mapping tokens THEN the component's slot values equal the project token values AND the output includes a CSS variable map.

#### Scenario: Missing token fallback
- GIVEN a component with `adaptationRules.tokenSlots: ["--palette-primary", "--palette-unknown"]` AND a project token set that only defines `--palette-primary` WHEN mapping tokens THEN `--palette-unknown` uses the value from `adaptationRules.defaults["--palette-unknown"]` AND a warning is emitted.

#### Scenario: Corporate local default
- GIVEN a corporate component whose slot resolves to `var(--accent)` via its local variable WHEN mapping tokens THEN the output references the app palette variable AND no shadcn `:root` token is emitted.
