# Storybook — Specification

## Purpose

Integrate Storybook 9 with explicit addons (Controls, Docs, a11y) for visual review and accessibility testing of the 4 TextAnimation components. Replaces the hand-rolled showcase incrementally — no component code changes, no old-file deletion in this change.

---

## Storage Key

All story files live at `src/components/TextAnimations/*.stories.jsx` (co-located with components). No existing specs are modified — this change adds 5 new capabilities.

---

## Capability: storybook-setup

### Requirement SB-SETUP-001: Init with Vite + React detection

The system MUST run `npx storybook@latest init` which MUST auto-detect the Vite + React project and scaffold `.storybook/main.js` + `.storybook/preview.js`.

#### Scenario: Init creates config files
GIVEN a Vite 5 + React 19 project WITHOUT Storybook installed WHEN `npx storybook@latest init` runs THEN `.storybook/main.js` and `.storybook/preview.js` exist AND `@storybook/react-vite` is listed as a dependency.

### Requirement SB-SETUP-002: Explicit addons only

The `.storybook/main.js` SHALL list these addons explicitly (NOT `@storybook/essentials`):
- `@storybook/addon-docs` (autodocs, DocsPage)
- `@storybook/addon-controls` (argTypes UI)
- `@storybook/addon-a11y` (accessibility panel)

#### Scenario: Addons registered
GIVEN `.storybook/main.js` WHEN inspected THEN `addons` array contains exactly the 3 named addons and does NOT contain `@storybook/essentials`.

### Requirement SB-SETUP-003: Coexistence with Vite dev server

`npm run dev` (Vite, port 5173) and `npm run storybook` (SB, port 6006) MUST run simultaneously without port conflict or config corruption.

#### Scenario: Both servers start
GIVEN the project directory WHEN `npm run dev` runs on terminal A AND `npm run storybook` runs on terminal B THEN terminal A binds to 5173 AND terminal B binds to 6006 AND both serve without errors.

### Requirement SB-SETUP-004: Build integrity

`npm run build` (Vite production build) MUST succeed after Storybook installation. Storybook packages are devDependencies only — no runtime impact.

#### Scenario: Production build
GIVEN Storybook installed AND configured WHEN `npm run build` executes THEN exit code is 0 AND `dist/` contains the production bundle.

### Requirement SB-SETUP-005: Test integrity

`npm test` (Vitest) MUST continue passing all 42 existing tests. Storybook installation MUST NOT alter `vitest.config.js` or test setup files.

#### Scenario: Tests pass
GIVEN Storybook installed AND configured WHEN `npm test` executes THEN all 42 tests pass AND test output matches pre-installation baseline.

---

## Capability: glitch-text-story

### Requirement SB-GLITCH-001: CSF3 story with Controls

The system SHALL provide a CSF3 story file at `src/components/TextAnimations/GlitchText.stories.jsx` exporting a default story with argTypes mapped from the registry control config.

**Controls (argTypes):**

| Prop | Control Type | Default |
|------|-------------|---------|
| `children` | text | `'Glitch Effect'` |
| `speed` | range [0.1, 2, step 0.1] | `0.5` |
| `enableShadows` | boolean | `true` |
| `enableOnHover` | boolean | `false` |

#### Scenario: Default story renders
GIVEN Storybook is running WHEN navigating to GlitchText story THEN the component renders with text "Glitch Effect" AND the glitch animation is visible.

### Requirement SB-GLITCH-002: Story variants

The file SHALL export 4 named story variants: `Default`, `HoverOnly`, `SlowMotion`, `WithShadows`. Each overrides relevant args to demonstrate a distinct state.

#### Scenario: Variants selectable
GIVEN GlitchText story loaded WHEN selecting "HoverOnly" variant THEN `enableOnHover` is `true` AND glitch does NOT play without hover.

### Requirement SB-GLITCH-003: Autodocs

The default export SHALL set `tags: ['autodocs']` to generate an auto-generated Docs page.

#### Scenario: Docs tab visible
GIVEN GlitchText story loaded WHEN clicking the Docs tab THEN component description, argTypes table, and all 4 variants are displayed.

---

## Capability: curved-loop-story

### Requirement SB-CURVE-001: CSF3 story with Controls

The system SHALL provide `src/components/TextAnimations/CurvedLoop.stories.jsx` with argTypes for all 5 controls.

**Controls (argTypes):**

| Prop | Control Type | Default |
|------|-------------|---------|
| `marqueeText` | text | `'Cortex Design Library'` |
| `speed` | range [0.5, 5, step 0.5] | `2` |
| `curveAmount` | range [50, 800, step 50] | `400` |
| `direction` | select: `left` | `right` |
| `interactive` | boolean | `true` |

### Requirement SB-CURVE-002: Story variants

4 named variants: `Default`, `FastRight`, `ExtremeCurve`, `Stationary`.

#### Scenario: ExtremeCurve variant
GIVEN CurvedLoop story loaded WHEN selecting "ExtremeCurve" variant THEN `curveAmount` is `800` AND text follows a deeply curved SVG path.

### Requirement SB-CURVE-003: Autodocs

SHALL set `tags: ['autodocs']`.

#### Scenario: Autodocs for CurvedLoop
GIVEN CurvedLoop story loaded WHEN viewing Docs tab THEN argTypes table and all 4 variants are rendered.

---

## Capability: text-pressure-story

### Requirement SB-PRESSURE-001: CSF3 story with Controls

The system SHALL provide `src/components/TextAnimations/TextPressure.stories.jsx` with argTypes for all 7 controls.

**Controls (argTypes):**

| Prop | Control Type | Default |
|------|-------------|---------|
| `text` | text | `'Compressa'` |
| `flex` | boolean | `true` |
| `width` | boolean | `true` |
| `weight` | boolean | `true` |
| `italic` | boolean | `true` |
| `alpha` | boolean | `false` |
| `stroke` | boolean | `false` |

### Requirement SB-PRESSURE-002: Font loading via decorator

The system SHALL NOT use `preview-head.html` for font loading. Instead, a decorator in the story file or `.storybook/preview.js` SHALL inject the Roboto Flex variable font (`@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap')`) into the story's iframe.

#### Scenario: Font loaded before render
GIVEN TextPressure story renders WHEN the decorator runs THEN the Roboto Flex font is available AND the component renders with variable font axes active.

### Requirement SB-PRESSURE-003: Autodocs

SHALL set `tags: ['autodocs']`.

---

## Capability: fuzzy-text-story

### Requirement SB-FUZZY-001: CSF3 story with Controls

The system SHALL provide `src/components/TextAnimations/FuzzyText.stories.jsx` with argTypes for all 8 controls.

**Controls (argTypes):**

| Prop | Control Type | Default |
|------|-------------|---------|
| `children` | text | `'Fuzzy Text'` |
| `baseIntensity` | range [0, 1, step 0.05] | `0.18` |
| `hoverIntensity` | range [0, 1, step 0.05] | `0.5` |
| `fuzzRange` | range [1, 100, step 1] | `30` |
| `direction` | select: `horizontal` | `vertical` | `both` |
| `fontWeight` | range [100, 900, step 100] | `900` |
| `enableHover` | boolean | `true` |
| `glitchMode` | boolean | `false` |

### Requirement SB-FUZZY-002: Canvas decorator

Since FuzzyText renders a `<canvas>` element, the story SHALL use a decorator that wraps the component in a container with explicit dimensions (e.g., `min-width: 400px; min-height: 150px; padding: 2rem`) to ensure the canvas has measurable bounds inside the Storybook iframe.

#### Scenario: Canvas renders
GIVEN FuzzyText story renders inside its decorator container WHEN the canvas mounts THEN the canvas has non-zero `width` and `height` AND the fuzzy text is visible.

### Requirement SB-FUZZY-003: Autodocs

SHALL set `tags: ['autodocs']`.

---

## Global Requirements
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

### Requirement SB-GLOBAL-001: A11y testing

Every story MUST be checked by `@storybook/addon-a11y`. The a11y panel SHALL show results per story with no critical violations.

#### Scenario: A11y panel active

GIVEN any story renders WHEN opening the A11y panel THEN violations, passes, and incomplete checks are displayed AND no violations of severity "critical" exist.

### Requirement SB-GLOBAL-002: No component code changes

Component implementation files MUST NOT be modified by either the global or local Storybook. Global Storybook concerns live in `.storybook/` and `*.stories.jsx`; local scaffold concerns live in the target's `.cortex/` and local `.storybook/` only.

#### Scenario: Zero diff on components in both roles

GIVEN global stories and the local scaffold created WHEN `git diff -- <component implementation files>` runs AND the target's local `git diff` runs THEN both diffs are empty.

### Requirement SB-GLOBAL-003: Local scaffold is independent of global

The local Storybook scaffold created by the capsule (`.cortex/`) MUST function with zero knowledge of the global repo. It SHALL reference only files copied into the target and SHALL NOT import or resolve any path that lives in the global repository.

#### Scenario: Local scaffold has no host paths

GIVEN a completed port into an external plain JS project WHEN searching the local `.storybook/` and `.cortex/` and local `package.json` for host-repo paths THEN no host-repo path is found.

#### Scenario: Local Storybook renders local catalog

GIVEN the external project's local Storybook running WHEN opening the local instance THEN it renders stories defined only in the target AND it reads the target's local `.cortex/contracts/` and local `component-catalog.json`.