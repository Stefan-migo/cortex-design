# Corporate Family — Specification

## Purpose

A function-first `corporate` UI family ported from shadcn/ui (MIT), complementing the artistic reactbits families. Covers forms, navigation, and data display via 18 CSS-only components with zero UI dependencies and MIT attribution.

## Requirements

### CF-001: Corporate components in dedicated folder

The system MUST provide 18 components, each a triad under `src/components/Corporate/<Name>/{<Name>.jsx,<Name>.css,<Name>.stories.jsx}`. Tier A (pure visual): Button, Badge, Card, Input, Textarea, Label, NativeSelect, Separator, Skeleton, Table, Breadcrumb, Pagination, Kbd, Avatar. Tier B (bounded interactive): Checkbox, Tooltip, Progress, Tabs.

#### Scenario: All triads present
- GIVEN the Corporate family folder
- WHEN enumerating `src/components/Corporate/*/`
- THEN exactly 18 subfolders exist AND each has a `.jsx`, `.css`, `.stories.jsx` with matching PascalCase names.

#### Scenario: Story discoverable
- GIVEN a Corporate `.stories.jsx` with `tags:['autodocs']`
- WHEN Storybook globs `../src/**/*.stories.jsx`
- THEN the component appears with a Docs page AND the a11y panel reports no critical violations.

### CF-002: MIT NOTICE attribution

Each ported `.jsx` MUST carry a `NOTICE` header naming shadcn/ui MIT, copyright holder, and source path. The family MUST include `src/components/Corporate/NOTICE.md` indexing every component to its shadcn source.

#### Scenario: Header present
- GIVEN any of the 18 `.jsx` files
- WHEN inspecting the first 20 lines
- THEN a comment contains `Ported from shadcn/ui (MIT)` AND copyright `2023 shadcn` AND a source URL.

#### Scenario: Provenance index complete
- GIVEN `src/components/Corporate/NOTICE.md`
- WHEN comparing its index to the 18 component names
- THEN every component is listed AND each maps to a distinct shadcn source path.

### CF-003: CSS-only, zero UI deps

The system MUST add no runtime UI dependencies. Styling MUST be flat CSS; interactive state MUST use React + browser primitives.

#### Scenario: No new deps
- GIVEN the change applied
- WHEN running `npm ls`
- THEN package.json runtime dependencies are unchanged AND no Radix/Tailwind dependency is present.

### CF-004: Local token mapping only

Each `.css` MUST define per-component local `--*` variables defaulting to app palette (`var(--accent)`, `var(--text)`, `var(--border)`, `var(--surface)`). No global `:root` shadcn tokens (`--background`, `--foreground`, `--primary`, `--radius`) SHALL be introduced.

#### Scenario: No global collision
- GIVEN the Corporate component CSS files
- WHEN scanning for `:root` blocks defining shadcn token names
- THEN none are found.

### CF-005: Tier B ARIA and keyboard nav

Checkbox, Tooltip, Progress, and Tabs MUST expose correct ARIA roles and support mouse and keyboard interaction. `ponytail:` comments MUST document any replaced Radix behavior with a ceiling and upgrade path.

#### Scenario: Checkbox toggles
- GIVEN a Checkbox with an accessible name
- WHEN Enter or click
- THEN checked flips AND `aria-checked` updates AND a change event fires.

#### Scenario: Tabs keyboard nav
- GIVEN Tabs with a selected tab
- WHEN Arrow keys pressed
- THEN focus roves AND `aria-selected` updates on the active tab.

#### Scenario: Tooltip focus reveal
- GIVEN a Tooltip trigger
- WHEN it receives focus/Tab
- THEN tooltip shows AND hides on blur/Escape.

#### Scenario: Progress role value
- GIVEN Progress with a value
- WHEN rendered
- THEN `role="progressbar"` AND `aria-valuenow/min/max` are present.

### CF-006: Per-component test surface

Each component MUST have a focused test under `src/__tests__/components/`. Tier A asserts render and key role; Tier B asserts interaction and ARIA.

#### Scenario: Tier A role test
- GIVEN Button, Table, Card
- WHEN their tests run
- THEN each asserts a matching role (`button`, `table`, etc.) AND accessible name where applicable.

#### Scenario: Tier B interaction test
- GIVEN Checkbox, Tabs, Tooltip, Progress tests
- WHEN run under jsdom
- THEN keyboard-nav and ARIA scenarios from CF-005 pass.

### CF-007: v1 boundary

The system MUST NOT add the v2 interactive surfaces (Accordion, Dialog, Sheet, DropdownMenu, Popover, ContextMenu, Menubar, NavMenu, Sidebar, Slider, Toggle group, RadioGroup, Switch, Collapsible) or Tier C dependency-bound components in this change.

#### Scenario: Scope adherence
- GIVEN the Corporate folder
- WHEN enumerating component subfolders
- THEN the set equals CF-001's 18 AND no v2 surface folder exists.
