# Delta for domain-contracts

## ADDED Requirements

### Requirement DC-001: Four schema-backed domain contracts

The system MUST define four domain contracts as schema-backed JSON under `.cortex/contracts/`: `existing-design-profile.json`, `redesign-intent.json`, `preservation-matrix.json`, and `visual-contract-v1.json`. Each contract SHALL validate against the canonical schema (DC-004) at write time — an invalid artifact MUST NOT be written.

#### Scenario: All four contracts valid

GIVEN a `.cortex/` bootstrap WHEN inspecting `.cortex/contracts/` THEN exactly four contract files exist AND each validates AND each is valid JSON.

#### Scenario: Invalid contract rejected

GIVEN a write of a contract missing a required field WHEN validation runs THEN the write fails AND no file is created AND the error names the missing field.

### Requirement DC-002: Existing Design Profile contract

`existing-design-profile.json` SHALL capture the target's current state. It MUST include: `id` (unique string), `stack` (string, e.g. "plain-js"), `presentColors` (object), `presentTypography` (array), `existingTokens` (object of pre-existing CSS custom properties), `notes` (array).

#### Scenario: Full existing state recorded

GIVEN a target with an existing palette, fonts, and tokens WHEN the profile is written THEN all required fields are present AND `existingTokens` lists every pre-existing custom property.

#### Scenario: Greenfield state

GIVEN a project with no existing tokens WHEN the profile is written THEN `presentColors` and `existingTokens` are empty AND `notes` includes a "greenfield" marker.

### Requirement DC-003: Redesign Intent & Preservation Matrix contracts

`redesign-intent.json` SHALL capture the brief and constraints, with `id`, `brief`, `derivedTokens` (empty until Visual Contract v1 generates), and `constraints` (array). `preservation-matrix.json` SHALL record preserved behavior with `preservedTokens` (array), `preservedColors` (array), `preservedBehaviors` (array), and `dropped` (array of items each with one reason string).

#### Scenario: Intent frozen before generation

GIVEN an aesthetic brief and constraint "dark-only" WHEN `redesign-intent.json` is written THEN `brief` holds the text AND `constraints` includes "dark-only" AND `derivedTokens` is empty.

#### Scenario: Preserved aliased tokens

GIVEN a token set being migrated under the alias policy WHEN `preservation-matrix.json` is written THEN each migrated legacy token appears in `preservedTokens` AND `dropped` is empty for that migration.

### Requirement DC-004: Canonical catalog schema

The system MUST define ONE canonical catalog schema. Shape SHALL be: top-level `{ version: string, components: array }`; each component SHALL have `id`, `storyFile` (nullable), `visualContext` (array), `moodTags` (array), and `adaptationRules`. `adaptationRules` SHALL have `tokenSlots` (array of token names), `defaultProps` (object), `variants` (OBJECT map of variant name to prop-override — NOT an array), and `defaults` (object map of token to fallback value). This resolves the three-way drift between the `component-adapter` skill, the `design-agent-v2` design (which used a `variants` array), and prior catalog exports.

#### Scenario: Objec-form entry validates

GIVEN an entry with object-form `variants` and `tokenSlots`/`defaultProps`/`defaults` WHEN validated THEN it passes.

#### Scenario: Variant array form rejected

GIVEN an entry where `adaptationRules.variants` is an array of strings WHEN validated THEN it fails AND the error names `variants` as needing object form.

### Requirement DC-005: Contracts validated against canonical schema (no drift)

All four contracts AND the canonical catalog SHALL validate against the schema. Validation SHALL run in the bootstrap AND SHALL fail it with non-zero exit on any drift.

#### Scenario: Bootstrap rejects drifted catalog

GIVEN a catalog whose `variants` reverted to array form WHEN bootstrap validation runs THEN it exits non-zero AND names the offending path.

## MODIFIED Requirements

### Requirement CA-001: Catalog query by context

The system MUST accept a query with `visualContext` (string) and `moodTags` (set, OR semantics) and SHALL return all canonical-catalog components matching both.
(Previously: Query source catalog had no guaranteed schema; this binds the query to canonical DC-004.)

#### Scenario: Query returns matching components

GIVEN a canonical catalog and `visualContext: "hero" AND moodTags: ["dramatic","bold"]` WHEN querying THEN every matching component is returned.

#### Scenario: No match returns empty

GIVEN a `visualContext` no component declares WHEN querying THEN an empty array is returned AND no error is thrown.
