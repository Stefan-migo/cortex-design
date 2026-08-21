# Delta for integrations

## ADDED Requirements

### Requirement ITG-001: Adapter abstraction interface

The system MUST define a per-framework adapter abstraction that future concrete adapters implement. The abstraction SHALL define: `detect(project)` — returns true if the adapter applies to the target; `resolve(contracts)` — maps the four domain contracts to framework-native assets (e.g., token files, theme objects, Storybook config); and `emit(target)` — writes resolved assets into the target. Each adapter SHALL be a single module exposing exactly those three functions.

#### Scenario: Adapter contract promotes portability

GIVEN a future framework adapter implementing `detect`, `resolve`, `emit` WHEN the bootstrap invokes it THEN the adapter's `detect` is called first AND if it returns true the adapter's `resolve` then `emit` are called AND all contract data flows through them.

#### Scenario: No adapter matches

GIVEN a target project where no installed adapter's `detect` returns true WHEN the bootstrap runs THEN the bootstrap falls back to a stack-agnostic "plain-js" behavior (HTML Storybook, raw CSS tokens) AND reports which adapters were considered.

### Requirement ITG-002: No concrete framework implementations in this slice

This change SHALL NOT require any concrete per-framework adapter beyond the abstraction. The plain-js/HTML fallback path is the ONLY required concrete behavior in this slice. Concrete React, Vue, Svelte, or others are explicitly deferred and SHALL NOT block the end-to-end port proof.

#### Scenario: Plain-js path completes without framework adapter

GIVEN the external test project is plain JS WHEN the bootstrap runs THEN porting completes using only the stack-agnostic fallback AND no framework-specific adapter is required.

#### Scenario: Unimplemented adapters are non-blocking

GIVEN a future adapter stub whose `detect` always returns false WHEN the bootstrap runs THEN the absence of a working adapter does not fail the port AND a warning lists the stub as not applicable.
