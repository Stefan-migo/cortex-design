# Delta for storybook-setup

## ADDED Requirements

### Requirement SB-SETUP-006: Component catalog export

The system MUST export a `component-catalog.json` file from the Storybook build pipeline. This file SHALL contain agent-consumable metadata for every documented component, including `visualContext`, `moodTags`, `adaptationRules`, and `dependencyProfile`. The file MUST be emitted at `.storybook/component-catalog.json` after a successful `npm run storybook` build.

#### Scenario: Catalog generated on build

GIVEN Storybook is configured with stories AND `npm run storybook build` succeeds WHEN inspecting `.storybook/component-catalog.json` THEN the file exists AND is valid JSON AND contains an entry for each component that has a story file.

#### Scenario: Catalog entry shape

GIVEN a catalog entry for any component WHEN inspecting its required fields THEN `id` is a unique string AND `visualContext` is a string (the component's role, e.g., "hero", "decorative", "navigation") AND `moodTags` is an array of strings AND `adaptationRules` is an object with `tokenSlots`, `defaults`, and optionally `variants` AND `dependencyProfile` is an object with `importPath` and `peerDependencies`.

### Requirement SB-SETUP-007: Metadata source

The catalog metadata SHALL be sourced from story-level parameters in the CSF3 story files. Each story's default export MAY declare `parameters.catalog` with the metadata structure. If a story does not declare `parameters.catalog`, the system SHALL generate a minimal entry with auto-detected `id` and empty `moodTags`/`adaptationRules`.

#### Scenario: Story declares catalog metadata

GIVEN a story file with `export default { parameters: { catalog: { visualContext: "hero", moodTags: ["dramatic"], adaptationRules: { tokenSlots: ["--palette-primary"] } } } }` WHEN the catalog is generated THEN the entry for that component includes the declared metadata.

#### Scenario: Story without catalog metadata

GIVEN a story file without `parameters.catalog` WHEN the catalog is generated THEN the entry has `visualContext: "unknown"` AND `moodTags: []` AND `adaptationRules: { tokenSlots: [], defaults: {} }` AND a warning is written to stderr.

### Requirement SB-SETUP-008: Build integrity with catalog

The catalog generation MUST be a build-time step integrated into the Storybook pre-build. It MUST NOT modify component source files or story files. `npm run storybook build` SHALL exit with code 0 even if some stories lack catalog metadata (warnings, not errors).

#### Scenario: Build succeeds with partial metadata

GIVEN a Storybook where half the stories declare `parameters.catalog` and half do not WHEN `npm run storybook build` executes THEN exit code is 0 AND `.storybook/component-catalog.json` contains entries for every component AND entries without metadata use the fallback shape from SB-SETUP-007.

## MODIFIED Requirements

### Requirement SB-SETUP-004: Build integrity

`npm run build` (Vite production build) MUST succeed after Storybook installation. Storybook packages are devDependencies only — no runtime impact. The catalog generation SHALL NOT affect `npm run build` since it lives entirely inside the Storybook pipeline.
(Previously: No catalog mention — build integrity covered only Storybook installation's effect on Vite build.)

#### Scenario: Production build unaffected

GIVEN Storybook installed AND configured with catalog generation WHEN `npm run build` executes THEN exit code is 0 AND `dist/` contains the production bundle AND no catalog artifacts appear in `dist/`.

#### Scenario: Catalog only in Storybook output

GIVEN a complete build of both Storybook and Vite WHEN inspecting `.storybook/` THEN `component-catalog.json` exists inside `.storybook/` WHEN inspecting `dist/` THEN no `component-catalog.json` is present.
