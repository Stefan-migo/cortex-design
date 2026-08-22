# Delta for domain-contracts

## ADDED Requirements

### Requirement DC-006: Catalog has no phantom entries

The catalog SHALL NOT contain entries that correspond to no implemented component. Phantom entries (`layout`, `controls-panel` — whose components are removed with the retired showcase) MUST be dropped from `.storybook/component-catalog.json`.

#### Scenario: Phantoms dropped
- GIVEN the retired showcase removed its `layout` and `controls-panel` components
- WHEN validating the catalog
- THEN no entry with id `layout` or `controls-panel` exists.

### Requirement DC-007: Keepers-only catalog additions

An entry SHALL be added to the catalog only when it is a curated keeper component. The current change SHALL add exactly these keeper entries: `Aurora`, `DotGrid`, `VenetianBlinds`, `FadeContent`, `LightRays`, `Strands`, `Ballpit`, `Prism`. Components not kept in the catalog (family losers) SHALL be archived from the catalog even if their code remains on disk.

#### Scenario: Keepers present
- GIVEN the catalog after the change
- WHEN checking for the eight keeper ids
- THEN all of `aurora`, `dot-grid`, `venetian-blinds`, `fade-content`, `light-rays`, `strands`, `ballpit`, `prism` are present.

#### Scenario: Family losers excluded
- GIVEN a non-keeper component still present on disk
- WHEN inspecting the catalog
- THEN no entry references that non-keeper id.

### Requirement DC-008: Catalog is a curated surface

The catalog SHALL represent the curated, reviewable component surface. Presence of code on disk SHALL NOT imply catalog presence: uncatalogued code MAY remain in the repo without a catalog entry or `storyFile`.

#### Scenario: Uncatalogued code allowed
- GIVEN a component file that exists on disk but is not a keeper
- WHEN validating the catalog against the filesystem
- THEN the absence of a catalog entry for that component is not a validation error.
