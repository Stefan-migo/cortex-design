# Delta for storybook

## MODIFIED Requirements

### Requirement SB-GLOBAL-000: Dual global vs local Storybook role

Storybook SHALL serve two distinct roles. The GLOBAL Storybook (this repo's `.storybook/`) is the agent resource and communication surface: it documents the full component library and is the canonical source for the catalog consumed by agents. The LOCAL Storybook is the per-project source of truth scaffolded by the `.cortex/` capsule into each target: it holds that project's own stories, tokens, and catalog and MUST be independent of the global instance — changes in one SHALL NOT affect the other. The global catalog (`.storybook/component-catalog.json`) SHALL conform to the canonical `domain-contracts` DC-004 schema.
(Previously: The Storybook spec described a single global instance with no role split and no canonical catalog contract.)

#### Scenario: Global and local instances coexist

GIVEN a target project where the capsule scaffolded a local Storybook WHEN both the global and the local Storybook run THEN each binds to its own port AND each serves its own `.storybook/` configuration AND neither reads the other's config.

#### Scenario: Global catalog is canonical

GIVEN the global Storybook builds successfully WHEN inspecting `.storybook/component-catalog.json` THEN every entry validates against DC-004 (object-form `variants`, present `tokenSlots`/`defaultProps`/`defaults`).

### Requirement SB-GLOBAL-002: No component code changes

Component implementation files MUST NOT be modified by either the global or local Storybook. Global Storybook concerns live in `.storybook/` and `*.stories.jsx`; local scaffold concerns live in the target's `.cortex/` and local `.storybook/` only.
(Previously: Applied to the single global Storybook; now extended to cover both roles and the local scaffold.)

#### Scenario: Zero diff on components in both roles

GIVEN global stories and the local scaffold created WHEN `git diff -- <component implementation files>` runs AND the target's local `git diff` runs THEN both diffs are empty.

## ADDED Requirements

### Requirement SB-GLOBAL-003: Local scaffold is independent of global

The local Storybook scaffold created by the capsule (`.cortex/`) MUST function with zero knowledge of the global repo. It SHALL reference only files copied into the target and SHALL NOT import or resolve any path that lives in the global repository.
(Reason: The dual-role split requires local Storybook to be a self-contained source of truth so porting to an external project does not leak host-repo dependencies.)

#### Scenario: Local scaffold has no host paths

GIVEN a completed port into an external plain JS project WHEN searching the local `.storybook/` and `.cortex/` and local `package.json` for host-repo paths THEN no host-repo path is found.

#### Scenario: Local Storybook renders local catalog

GIVEN the external project's local Storybook running WHEN opening the local instance THEN it renders stories defined only in the target AND it reads the target's local `.cortex/contracts/` and local `component-catalog.json`.
