# Conversational Design — Specification

## Purpose

Multi-turn design evaluation flow where the lead agent converses with the user block-by-block: collect aesthetic direction, propose visual options, gather feedback, refine, and produce a final design system. The conversation is synchronous — each turn blocks until the user responds.

## Requirements

### Requirement CD-001: Design conversation lifecycle

The system MUST implement a 4-phase conversation lifecycle: **Brief** (collect aesthetic input), **Propose** (present visual options with generated tokens), **Refine** (iterate based on user feedback), **Finalize** (output the agreed design system). Each phase SHALL advance only when the user explicitly signals completion.

#### Scenario: Full conversation flow

GIVEN a new design conversation WHEN the user completes the Brief phase THEN the system enters Propose phase AND presents 2-3 visual options with contrasting token sets. WHEN the user chooses an option and requests a refinement THEN the system enters Refine phase AND applies the feedback. WHEN the user accepts THEN the system enters Finalize AND outputs the complete token set and CSS.

#### Scenario: Early exit

GIVEN a conversation in Brief or Propose phase WHEN the user sends "cancel" or "exit" THEN the system terminates the conversation AND returns no output AND any partial state is discarded.

### Requirement CD-002: Feedback granularity

The system MUST accept feedback at two levels of granularity: **global** (applies to the entire token set, e.g., "too dark overall") and **per-token** (targets a specific domain, e.g., "make the typography scale wider"). Per-token feedback SHALL override global feedback for the specific domain.

#### Scenario: Global feedback applied

GIVEN a Propose phase with a warm palette WHEN the user provides global feedback "too warm, make it neutral" THEN the system adjusts all applicable token domains toward neutral AND re-presents the updated token set.

#### Scenario: Per-token overrides global

GIVEN a Propose phase with a compact typography scale AND global feedback "make it more spacious" AND per-token feedback "keep typography compact" WHEN the system applies feedback THEN typography tokens remain compact AND other domains become more spacious.

### Requirement CD-003: Option diversity

In the Propose phase, the system MUST present 2-3 distinct visual options. Each option SHALL use a different palette seed (different hue family) and SHALL produce a complete token set for all 5 domains.

#### Scenario: Options are distinct

GIVEN a Brief with "modern corporate" WHEN the system proposes options THEN option A uses a blue palette AND option B uses a slate/gray palette AND each option includes all 5 token domains with coherent values.

### Requirement CD-004: Session isolation

Each conversation SHALL be isolated — concurrent conversations for different projects MUST NOT share state. The system MAY support exactly one active conversation per project at a time.

#### Scenario: Concurrent projects

GIVEN active conversations for project alpha AND project beta WHEN the user switches to project alpha's conversation THEN the system returns the correct state AND no cross-project state leakage occurs.

#### Scenario: Single conversation per project

GIVEN an active conversation for project X WHEN the user starts a new conversation for project X WITHOUT terminating the first THEN the system rejects the duplicate AND prompts the user to cancel the existing one first.

### Requirement CD-005: Final design output

At Finalize phase completion, the system MUST return: (1) the resolved CSS custom property set, (2) the selected component adaptation list, (3) a human-readable design rationale (2-4 sentences). All three SHALL be embedded in the agent's final response.

#### Scenario: Final output assembled

GIVEN a completed Finalize phase WHEN inspecting the output THEN the response includes CSS tokens AND adapted component IDs with props AND a rationale summary AND all three sections are present in a single response.
