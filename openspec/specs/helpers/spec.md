# Delta for helpers

## ADDED Requirements

### Requirement HLP-001: Color math helper consolidation

The system SHOULD consolidate the duplicated hex→rgb, lerp, and clamp helper implementations (~120 lines) into a single shared util. The consolidation SHALL NOT change component behavior.

#### Scenario: Consolidated util
- GIVEN the change applied (if consolidated)
- WHEN searching component code for hex→rgb, lerp, or clamp definitions
- THEN each such helper lives in the shared util AND components import from it.

#### Scenario: Behavior preserved
- GIVEN a component that previously defined its own color math
- WHEN the component renders after consolidation
- THEN its visual output is byte-identical to the pre-consolidation output.

### Requirement HLP-002: Per-component duplicates may remain

If consolidation risks breaking a component, that component MAY keep its local copy. Duplication is acceptable where consolidation is unsafe; the shared util is the default, not a hard constraint.

#### Scenario: Local copy retained safely
- GIVEN a component whose behavior would change under consolidation
- WHEN keeping its local helper
- THEN the component continues to render correctly AND the decision is recorded as an intentional deviation (e.g. a `ponytail:` comment).
