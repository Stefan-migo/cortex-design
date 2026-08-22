# Delta for catalog-adapter

## ADDED Requirements

### Requirement CAT-001: Catalog is single source of truth

The app MUST read the component library exclusively from `.storybook/component-catalog.json`. The system SHALL NOT read the legacy registry (`registry.js`, `sources.js`) or render the retired pages.

#### Scenario: Grid renders from catalog
- GIVEN a DC-004-valid catalog with 48 entries
- WHEN the Library surface loads
- THEN the grid renders one card per catalog entry AND each card shows the entry `id` AND links to its `storyFile` when present.

#### Scenario: No legacy imports
- GIVEN the adapter code
- WHEN searching the adapter module graph for `registry.js`, `sources.js`, `pages/Library`, `pages/ComponentDetail`, `components/ControlsPanel`, `components/Layout`
- THEN no such import path is found.

### Requirement CAT-002: Component detail surface

The system SHALL render a detail/preview surface for a selected entry, derived from the same catalog data.

#### Scenario: Detail from catalog
- GIVEN a selected component route (`/components/{id}`)
- WHEN rendering the detail surface
- THEN it resolves the entry by `id` in the catalog AND shows its `visualContext`, `moodTags`, and `storyFile` link.

#### Scenario: Unknown id
- GIVEN a route for an id absent from the catalog
- WHEN the detail surface renders
- THEN it shows an empty/not-found state AND does not crash.

### Requirement CAT-003: Null storyFile handled safely

The system MUST render entries with `storyFile: null` without crashing. Such entries render with no story link and no preview attempt.

#### Scenario: Null storyFile entry
- GIVEN a catalog entry whose `storyFile` is `null`
- WHEN the grid renders that entry
- THEN the card shows without a story link AND no story-resolution error is thrown.

### Requirement CAT-004: App surface stays buildable

`npm run build` and `npm run dev` MUST remain functional after the showcase is retired and the adapter becomes the surface.

#### Scenario: Vite dev serves
- GIVEN the adapter in place
- WHEN `npm run dev` starts
- THEN the SPA loads on 5173 AND the Library renders from catalog.

#### Scenario: Vite build passes
- GIVEN the adapter in place AND `registry.js`/`sources.js`/retired pages removed
- WHEN `npm run build` executes
- THEN exit code is 0 AND `dist/` contains a bundle that renders the catalog grid.
