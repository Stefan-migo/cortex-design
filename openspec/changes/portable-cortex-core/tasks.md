# Tasks: Portable Cortex Core

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 900–1300 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1→5 (phases) |
| Delivery strategy | auto-chain |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

auto-chain: orchestrator slices on High; 5 phases are slice boundaries.

### Suggested Work Units

| # | Goal | PR | Focused test | Runtime harness | Rollback |
|---|------|----|--------------|-----------------|----------|
| 1 | De-suffix identity | PR1 | `rg "OpenDesign"`→0 | `npm run build` | revert cmts |
| 2 | Schema+contracts | PR2 | array-variants rejected | invalid-write: no file | rm schema+contracts |
| 3 | Bootstrap+adapter | PR3 | temp target exit 0/1 | plain JS: 4 ctcts+SB | rm `.cortex/` |
| 4 | Catalog DC-004 | PR4 | build validates DC-004 | `git diff src/` empty | revert catalog+SKILL.md |
| 5 | E2E proof+rollback | PR5 | 3-assertion acceptance | revert+rm `.cortex` | slice reverts |

## Phase 1: De-suffix Identity (blocking)

- [x] 1.1 Replace `OpenDesign`/`opendesign-landing` in `package.json`, `.opencode/opencode.json`, `openspec/config.yaml`, `.atl/skill-registry.md`; drop stale graphify path.
- [x] 1.2 `rg "OpenDesign|opendesign-landing"` (excl. archives/graphify-out) = 0; `npm run build` clean.

## Phase 2: Schema + Contracts (DC-004, DC-001..003)

- [x] 2.1 RED: validator tests — array-`variants` rejected (DC-004/DC-005); DC-001 no-file+named field; DC-002 greenfield note; DC-003 empty `derivedTokens`.
- [x] 2.2 Create `.cortex/schema.json` (DC-004: `{version, components[]}`, object `variants`, `tokenSlots`/`defaultProps`/`defaults`).
- [x] 2.3 Create `.cortex/contracts/{existing-design-profile,redesign-intent,preservation-matrix,visual-contract-v1}.json` (DC-002 full/greenfield; CP-005 preserved/dropped).
- [x] 2.4 Write-time validator: invalid not written (DC-001); scroll intent → notes (VA-005).

## Phase 3: Bootstrap + Adapter (CP-001..003, ITG-001..002)

- [x] 3.1 RED: bootstrap tests — missing/malformed package.json exit≠0+named error (CP-001); DC-005 drift non-zero; SB dual ports (SB-GLOBAL-000); empty SOURCES diff (CP-002).
- [x] 3.2 Create `.cortex/bootstrap.js` (node stdlib, zero deps) — detect→resolve→emit, exit 1+named error, plain-js fallback+report (CP-001, ITG-001).
- [x] 3.3 Create `.cortex/adapters/plain-js.js` — `{detect,resolve,emit}` only (ITG-001); false-detect stub warns, never blocks (ITG-002).
- [x] 3.4 Scaffold local SB: `.storybook/{main.js,preview.js}` (HTML builder) + `component-catalog.json` (CP-002); one canonical source (CP-003); alias `--od-*`, never delete (CP-005, VA-001).
- [x] 3.5 Emitter: 11 canonical tokens (palette 4 VA-006, others ≤3, scroll reserved VA-005); 12-cap drops lowest+reason (VA-004).

## Phase 4: Global Catalog + Skills (SB-GLOBAL-*, CA-001)

- [ ] 4.1 Regenerate `.storybook/component-catalog.json` to DC-004 object-form; validate (SB-GLOBAL-000).
- [ ] 4.2 Bake DC-004 + canonical namespace into `.opencode/skills/{design-agent-lead,component-adapter}/SKILL.md`; live emitter (AD-5).
- [ ] 4.3 Wire CA-001 query (visualContext + OR moodTags → empty, no throw).
- [ ] 4.4 E2E: local scaffold zero host paths, renders only target catalog (SB-GLOBAL-003/002).

## Phase 5: E2E Port Proof + Rollback (CP-004)

- [ ] 5.1 Create `tests/fixtures/plain-js-port/` (plain JS package.json) — 4 contracts + local `.storybook/` + DC-004 catalog (CP-004).
- [ ] 5.2 Port acceptance: 3 evidences hold; malformed preservation-matrix → failed, contract named (CP-004).
- [ ] 5.3 Rollback: `git revert` + `rm -rf .cortex` → `npm run build` clean.
