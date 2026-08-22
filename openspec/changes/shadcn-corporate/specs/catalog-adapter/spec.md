# Delta for catalog-adapter

## ADDED Requirements

### Requirement CAT-005: Catalog version bump to 1.1.0

The system MUST expose the catalog at version `1.1.0` (from `1.0.0`) and MUST render the 18 corporate entries in the grid and detail surfaces alongside the existing entries.

#### Scenario: New version rendered
- GIVEN the catalog at version `1.1.0`
- WHEN the Library surface loads
- THEN the grid renders one card per entry INCLUDING the 18 corporate entries AND each corporate card links to its `storyFile`.

#### Scenario: Detail for corporate id
- GIVEN a route `/components/{corporate-id}`
- WHEN the detail surface renders
- THEN it resolves the corporate entry by `id` AND shows its `visualContext`, `moodTags` (including `corporate`), and `storyFile` link.

## MODIFIED Requirements

### Requirement CAT-001: Catalog is single source of truth

The app MUST read the component library exclusively from `.storybook/component-catalog.json`. The system SHALL NOT read the legacy registry (`registry.js`, `sources.js`) or render the retired pages. The catalog SHALL be versioned `1.1.0` and SHALL contain 69 entries (51 existing + 18 corporate).
(Previously: catalog version 1.0.0; rendered only the pre-corporate entry set.)

#### Scenario: Grid renders from catalog
- GIVEN a DC-004-valid catalog with 69 entries at version 1.1.0
- WHEN the Library surface loads
- THEN the grid renders one card per catalog entry AND each card shows the entry `id` AND links to its `storyFile` when present.

#### Scenario: No legacy imports
- GIVEN the adapter code
- WHEN searching the adapter module graph for `registry.js`, `sources.js`, `pages/Library`, `pages/ComponentDetail`, `components/ControlsPanel`, `components/Layout`
- THEN no such import path is found.

#### Scenario: Bootstrap validation passes
- GIVEN the catalog and new Corporate components committed
- WHEN `.cortex` capsule validation and bootstrap run
- THEN version is 1.1.0 AND `src/` + `.storybook/` produce zero diff (satisfying SB-GLOBAL-002).
