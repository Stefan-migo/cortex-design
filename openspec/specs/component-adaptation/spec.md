# Component Adaptation — Specification

## Purpose

Query the Storybook `component-catalog.json` by visual context and mood tags, map selected components to the project's design tokens, and apply variant overrides. The adapter is a deterministic skill — no generative AI, no LLM calls.

## Requirements

### Requirement CA-001: Catalog query by context

The system MUST accept a query with two filters: `visualContext` (string matching against component metadata) and `moodTags` (set of strings, OR semantics within the set). It SHALL return all components in the catalog whose metadata matches BOTH filters.

#### Scenario: Query returns matching components

GIVEN a catalog containing components with metadata and a query `visualContext: "hero" AND moodTags: ["dramatic", "bold"]` WHEN the system queries the catalog THEN the result includes every component whose `visualContext` matches `hero` and whose `moodTags` set intersects `["dramatic", "bold"]`.

#### Scenario: No match returns empty

GIVEN any catalog WHEN querying with a `visualContext` that no component declares THEN the result is an empty array AND no error is thrown.

### Requirement CA-002: Token mapping

The system SHALL map each selected component's declared token slots (e.g., `--accent-color`, `--font-heading`) to the project's design token set from visual-architecture. If the project token set lacks a required slot, the system SHALL use a hardcoded fallback from the component's `adaptationRules.defaults`.

#### Scenario: Full token mapping

GIVEN a component with `adaptationRules.tokenSlots: ["--palette-primary", "--typography-heading"]` AND a project token set that defines both WHEN mapping tokens THEN the component's slot values equal the project token values AND the output includes a CSS variable map.

#### Scenario: Missing token fallback

GIVEN a component with `adaptationRules.tokenSlots: ["--palette-primary", "--palette-unknown"]` AND a project token set that only defines `--palette-primary` WHEN mapping tokens THEN `--palette-unknown` uses the value from `adaptationRules.defaults["--palette-unknown"]` AND a warning is emitted.

### Requirement CA-003: Variant application

Each component in the catalog MAY declare `adaptationRules.variants` (a map of variant names to prop overrides). The system MUST accept a `variantName` parameter and apply the corresponding overrides to the component's props.

#### Scenario: Variant applied

GIVEN a component with `variants: { emphasis: { scale: 1.2, weight: 700 } }` WHEN requesting variant `emphasis` THEN the output props include `scale: 1.2` AND `weight: 700`.

#### Scenario: Unknown variant fallback

GIVEN a component with a defined variant map WHEN requesting a variant name not in the map THEN the system returns the default props unchanged AND logs the unknown variant as a warning.

### Requirement CA-004: Output contract

The adaptation output MUST be a structured object with three keys: `componentId` (string), `adaptedProps` (object), `tokenMap` (CSS variable object). The output SHALL be serializable to JSON.

#### Scenario: Output shape

GIVEN any successful adaptation WHEN inspecting the output THEN `componentId` is a non-empty string AND `adaptedProps` is a flat object AND `tokenMap` has CSS variable keys with valid CSS values.
