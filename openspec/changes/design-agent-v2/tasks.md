# Tasks: design-agent-v2 — Triada Architecture

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~520 (PR 1: ~395, PR 2: ~85, PR 3: ~40) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Delivery strategy | force-chained |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Agent skills: delete old + create lead + update opencode.json | PR 1 | Targets main; ~395 lines |
| 2 | Adapter skill: create component-adapter + add to opencode.json | PR 2 | Targets main; ~85 lines, depends on PR 1 |
| 3 | Catalog: component-catalog.json generation + seed entries | PR 3 | Targets main; ~40 lines, depends on PR 2 |

## Phase 1: Agent Skills

- [x] 1.1 Delete `.opencode/skills/design-agent/SKILL.md` (replaced by triada)
- [x] 1.2 Create `.opencode/skills/design-agent-lead/SKILL.md` with conversational design + visual-architecture modes + `needsInput` sync protocol
- [x] 1.3 Create `.opencode/skills/component-adapter/SKILL.md` with catalog query (visualContext/moodTags), token mapping (fallback to defaults), variant application
- [x] 1.4 Modify `.opencode/opencode.json`: remove `design-agent` agent entry, add `design-agent-lead` + `component-adapter` agent entries (mode: subagent)

## Phase 2: Storybook Catalog

- [x] 2.1 Try `npx storybook extract --output .storybook/component-catalog.json` — failed (invalid command in SB 10.x CLI). Proceeded to 2.2.
- [x] 2.2 Create `.storybook/component-catalog.json` with initial entries for existing components (GlitchText, TextPressure, FuzzyText, CurvedLoop, Curtains, Layout, ControlsPanel) with `visualContext`, `moodTags`, `adaptationRules.variants`

> **ponytail:** yagni — wrote JSON directly instead of a Node script parsing CSF3. 7 known components, ~50 lines, zero deps. If the catalog exceeds 20 components, extract a script then (and port `parameters.catalog` from CSF3 exports — the stories already define the variants).

## Phase 3: Component Population (conditional)

- [ ] 3.1 Port user-curated reactbits components + add `.stories.jsx` with `parameters.catalog` metadata
- [ ] 3.2 Rebuild: `npm run storybook build` → verify catalog entries in `.storybook/component-catalog.json`

## Phase 4: Integration

- [ ] 4.1 Manual E2E: full flow — aesthetic brief → lead conversation (3 turns) → token set → component selection → adapted output
- [ ] 4.2 Verify `npm run build` passes; validate `component-catalog.json` with `jq .`

## Ponytail Plan Review

`Section "Phase 3 — Component Population"` → `yagni:` User-curated porting is conditional by design. Keep 3.1-3.2 as a single optional block — if user has no components to port, delete both tasks.

`Section "Phase 2 — Catalog Generation"` → `shrink:` 2.1 and 2.2 are already conditional (try npx first, script fallback). Correct pattern. No change needed.

`Section "Phase 1 — 1.2 + 1.3"` → `stdlib:` The lead skill's `needsInput` protocol is a structured JSON return format (`{ needsInput: true, state, prompt }`). This matches the orchestrator's existing delegate cycle — no custom streaming or websocket needed. Keep as specified, already standard.

## Graphify Cross-Reference

Current graph (7 nodes, 3 edges, 0 communities) captures only the existing codebase — no design-agent-v2 nodes exist yet since none of the affected files exist. Affected areas:
- `.opencode/skills/` — covered by 1.1, 1.2, 1.3 ✓
- `.opencode/opencode.json` — covered by 1.4 ✓
- `.storybook/` — covered by Phase 2 ✓

No uncovered modules. Graph should be rebuilt (`graphify . --update`) post-archive.

net: -2 items (3.1-3.2 marked conditional — delete if no components to port).
