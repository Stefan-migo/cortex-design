# Delta for pattern-library

## ADDED Requirements

### REQ-FAMILY-002: Function-first corporate family pattern

The system MUST support a second family kind alongside the effect (reactbits) families: a function-first `corporate` family at `src/components/Corporate/`. Both kinds MUST follow the same triad pattern — one `.jsx` + one flat BEM-ish `.css` + one `.stories.jsx` with `tags:['autodocs']` — with unique catalog entries under DC-004.

#### Scenario: Triad parity with reactbits
- GIVEN a Corporate component and an effect family component
- WHEN comparing their file structure
- THEN both expose the same triad shape (`.jsx`, `.css`, `.stories.jsx`) AND the Corporate stories use autodocs tags.

#### Scenario: Provenance separation
- GIVEN a Corporate component
- WHEN inspecting its directory
- THEN it is isolated under `src/components/Corporate/` AND is not interleaved with effect-family folders.

### REQ-FAMILY-003: Family scoping for attribution

Function-first family components MUST carry MIT provenance (per-component `NOTICE` header + family `NOTICE.md`). Effect-family components carry their own source attribution and MUST NOT reuse the corporate NOTICE.

#### Scenario: Attribution not shared
- GIVEN the corporate `NOTICE.md`
- WHEN reading it
- THEN it lists only the 18 corporate components AND no effect-family component.
