# Delta for storybook

## MODIFIED Requirements

### Requirement SB-GLOBAL-000: Dual global vs local Storybook role

Storybook SHALL serve two distinct roles. The GLOBAL Storybook (this repo's `.storybook/`) is the agent resource and communication surface AND the app's runtime source: it documents the full component library and provides the canonical catalog that drives both the Library/ComponentDetail adapter and the stories consumed by agents. The LOCAL Storybook is the per-project source of truth scaffolded by the `.cortex/` capsule into each target: it holds that project's own stories, tokens, and catalog and MUST be independent of the global instance — changes in one SHALL NOT affect the other. The global catalog (`.storybook/component-catalog.json`) SHALL conform to the canonical `domain-contracts` DC-004 schema.
(Previously: The global role covered only the agent catalog; it now also serves as the app's runtime Library source via the catalog-adapter.)

#### Scenario: Global and local instances coexist
- GIVEN a target project where the capsule scaffolded a local Storybook
- WHEN both the global and the local Storybook run
- THEN each binds to its own port AND each serves its own `.storybook/` configuration AND neither reads the other's config.

#### Scenario: Global catalog is canonical
- GIVEN the global Storybook builds successfully
- WHEN inspecting `.storybook/component-catalog.json`
- THEN every entry validates against DC-004 (object-form `variants`, present `tokenSlots`/`defaultProps`/`defaults`).

#### Scenario: Catalog drives the app surface
- GIVEN the catalog-adapter reads `.storybook/component-catalog.json`
- WHEN the Library surface renders
- THEN the rendered grid matches the catalog entries one-to-one.

## ADDED Requirements

### Requirement SB-CAT-001: Cataloged story coverage invariant

Every catalog entry with a non-null `storyFile` MUST resolve to an existing story target. An entry whose story is deleted MUST NOT remain dangling in the catalog: it SHALL either resolve to a valid story or be dropped.

#### Scenario: Non-dangling stories
- GIVEN a set of catalog entries with non-null `storyFile`
- WHEN resolving each `storyFile` path against the filesystem
- THEN every path points to an existing story file.

#### Scenario: curtained entry repointed or dropped
- GIVEN the curtains system is removed
- WHEN validating the `curtains` catalog entry
- THEN its `storyFile` resolves to an existing story OR the entry is dropped from the catalog.

### Requirement SB-CAT-002: Standard SB7 boilerplate removed

The system SHALL remove the scaffolded Storybook boilerplate: `src/stories/` (includes `Configure.mdx` and `assets/`). Component stories SHALL live co-located at `src/components/**/*.stories.jsx`.

#### Scenario: Boilerplate absent
- GIVEN the change applied
- WHEN checking `src/stories/`
- THEN the directory does not exist AND `Configure.mdx` and its `assets/` are gone.

### Requirement SB-CAT-003: Font decorator inlined

The `withFont` decorator SHALL be inlined into `TextPressure.stories.jsx` and removed from `.storybook/preview.jsx`, preserving the Roboto Flex font injection behavior.

#### Scenario: Decorator relocated
- GIVEN the change applied
- WHEN inspecting `TextPressure.stories.jsx` AND `.storybook/preview.jsx`
- THEN the font-injecting decorator lives only in the story file AND `preview.jsx` no longer exports `withFont`.
