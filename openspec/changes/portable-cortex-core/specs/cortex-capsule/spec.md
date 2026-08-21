# Delta for cortex-capsule

## ADDED Requirements

### Requirement CP-001: `.cortex/` capsule bootstrap

The system MUST provide a bootstrap that installs the capsule into a target JS project. It SHALL create a `.cortex/` dir, copy the four domain contracts (from `domain-contracts`), copy the configured adapter (from `integrations`), and run schema validation (DC-005). It MUST be stack-agnostic (no framework/bundler assumption) and SHALL exit non-zero on any step failure.

#### Scenario: Bootstrap installs in a plain JS project

GIVEN a plain JS target with `package.json` and NO framework WHEN the bootstrap runs THEN `.cortex/` exists AND the four contracts are present AND the adapter is present AND validation passes AND exit is 0.

#### Scenario: Bootstrap fails on missing target

GIVEN a target without `package.json` WHEN the bootstrap runs THEN it exits non-zero AND reports the target is not a JS project.

### Requirement CP-002: Per-project local Storybook scaffold

The bootstrap SHALL scaffold a minimal local Storybook: a `.storybook/main.js`, `.storybook/preview.js`, and one canonical `component-catalog.json` consumed by local stories. It MUST NOT modify existing target source, and MUST NOT assume React — for plain-JS targets it SHALL use the Storybook HTML builder.

#### Scenario: Plain JS gets HTML Storybook

GIVEN a plain JS target WHEN the scaffold runs THEN `.storybook/main.js` references the HTML builder AND `.storybook/preview.js` exists AND `component-catalog.json` is present.

#### Scenario: Existing sources untouched

GIVEN a target with existing sources WHEN the scaffold runs THEN `git diff -- <existing sources>` is empty AND only `.cortex/` and `.storybook/` were added.

### Requirement CP-003: Portable catalog derivation

The capsule's catalog SHALL derive from ONE canonical source declared at port time (per DC-004). Other catalog-holding files (`src/data/registry.js`, `src/cortex/catalog.js`) SHALL NOT be authorities — they are derivation inputs at port time only.

#### Scenario: Catalog present after port

GIVEN a completed port into plain JS WHEN inspecting the target THEN `.storybook/component-catalog.json` conforms to DC-004 AND validates.

### Requirement CP-004: End-to-end external test project proof

The system MUST prove porting end-to-end via an external test project: a minimal plain JS project (no framework dependency). Acceptance evidence SHALL be all three: (1) the four contracts land under `.cortex/contracts/` and validate; (2) a local Storybook scaffold exists under `.storybook/`; (3) the catalog validates against DC-004. The port is NOT successful unless all three hold.

#### Scenario: Port succeeds with all evidence

GIVEN an external plain JS test project WHEN bootstrap + install + scaffold complete THEN the target has four valid contracts AND a local `.storybook/` AND a DC-004-valid catalog AND the port is reported successful.

#### Scenario: Port fails on a missing contract

GIVEN an external plain JS project WHEN bootstrap runs AND `preservation-matrix.json` is malformed THEN the port is reported failed AND the failing contract is named AND no success evidence is emitted.

### Requirement CP-005: Alias rather than hard-swap

The bootstrap SHALL alias legacy `--od-*` tokens to the canonical `--{domain}-{property}` namespace instead of deleting them. It SHALL emit both the canonical property and a legacy alias declaration pointing to it, so existing `--od-*` consumers keep working. Aliased tokens SHALL appear in `preservation-matrix.json` `preservedTokens`.

#### Scenario: Legacy token aliased

GIVEN a target referencing `--od-color-primary` WHEN the bootstrap emits the token set THEN canonical `--palette-primary` is defined AND `--od-color-primary` is aliased to the canonical value.

#### Scenario: Dropped legacy token not aliased

GIVEN a legacy token the canon drops WHEN the bootstrap emits the token set THEN that `--od-*` is NOT emitted AND the drop is recorded with a reason in `preservation-matrix.json` `dropped`.
