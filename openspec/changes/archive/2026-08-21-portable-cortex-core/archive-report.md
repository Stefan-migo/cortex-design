# SDD Archive Report — portable-cortex-core

**Status**: ARCHIVED
**Archived at**: 2026-08-21
**Archived to**: `openspec/changes/archive/2026-08-21-portable-cortex-core/`
**Artifact store mode**: hybrid (openspec + engram)
**Author**: sdd-archive sub-agent

## Change State at Close (Final-State Authority)

This report describes the state of the change AT CLOSE, not at earlier points in the cycle. Facts are ranked by the Final-State Authority hierarchy; the orchestrator's launch prompt (most recent account) and the persisted tasks artifact outrank the intermediate `apply-progress`/`verify-report` snapshots.

### Final-state facts (from orchestrator launch prompt — highest account)
- **All 5 chained PRs MERGED to main**: PR1 `22bd175` (de-suffix identity) → PR2 `24852bc` (schema+contracts) → PR3 `e48291e` (bootstrap+adapter) → PR4 `ca42855` (catalog+skills) → PR5 `299b8ec` (E2E port proof). `origin/main` = `299b8ec`.
- **Base reconciliation**: 12 previously-unpushed local commits (reactbits components/backgrounds, curtain transitions, triada design-agent skills, SB10 migration) rebased onto `origin/main` and pushed as `99032c6`. Main fully reconciled.
- **18/18 tasks complete**; terminal verification: `npx vitest run` → 70/70 pass; `npm run build` → clean; CP-004 port-proof 3 evidences hold; 0 CRITICAL; verdict **PASS WITH WARNINGS**.

### Persisted tasks artifact (completion visibility)
- `18/18` implementation tasks marked `[x]`, `0` unchecked in the archived `tasks.md`. Task Completion Gate: PASSED. No stale-checkbox reconciliation was required.

### Native Review Receipt Gate
- `reviewGate` structurally absent — receipt-driven development does not exist for this candidate and zero review code ran. Archive proceeded under ordinary repository policy. No review artifacts to read or block on.

## Engram Observation IDs Read (traceability)

Per Section B/C (`sdd-phase-common.md`), the following Engram observations were retrieved and consulted:
- `#1871` — `sdd/portable-cortex-core/apply-progress` (ALL 5 slices complete — final; topic upserted across 5 revisions)
- `#1887` — `sdd/portable-cortex-core/verify-report` (envelope `sha256:87b3bd1d...`, verdict pass, 20/20 requirements, 37/37 scenarios, 0 critical, 0 blockers)

The `apply-progress` (#1871) and `verify-report` (#1887) are intermediate snapshots. Where they were written earlier than the orchestrator's final-state account (e.g., PR5 marked "OPEN" in #1871, but PR5 merged `299b8ec` per the launch prompt), this report reflects the terminal merged state.

Sources consulted on disk: proposal.md, design.md, tasks.md, verify-report.md, and all 5 delta specs under `openspec/changes/portable-cortex-core/specs/`.

## Delta Spec Sync (Step 2)

The 5 delta specs were promoted into the project spec baseline (`openspec/specs/{domain}/spec.md`).

| Domain | Action | Details |
|--------|--------|---------|
| `domain-contracts` | **Created** (no prior main spec) | Mechanical copy — full spec: DC-001..DC-005 requirements, 11 scenarios |
| `cortex-capsule` | **Created** (no prior main spec) | Mechanical copy — CP-001..CP-005 requirements, 10 scenarios |
| `integrations` | **Created** (no prior main spec) | Mechanical copy — ITG-001..ITG-002 requirements, 4 scenarios |
| `storybook` | **Merged** (main spec existed) | ADDED SB-GLOBAL-000 (dual role) + SB-GLOBAL-003 (local independence); MODIFIED SB-GLOBAL-002 (extended to dual roles); preserved SB-SETUP-*, SB-GLITCH-*, SB-CURVE-*, SB-PRESSURE-*, SB-FUZZY-*, SB-GLOBAL-001 |
| `visual-architecture` | **Merged** (main spec existed) | MODIFIED VA-001 (11 canonical + legacy alias), VA-004 (dropped-tokens bound to preservation-matrix), VA-005 (scroll reserved); ADDED VA-006 (palette canonical set); preserved VA-002, VA-003 |

### Destructive-delta check (config `archive` rule)
- **No `REMOVED Requirements` sections** exist in any of the 5 deltas. The MODIFIED blocks replace named requirements with full updated content and ADDED blocks append; no large sections are deleted. Therefore **no destructive merge warning is warranted**.

### Mechanical Copy Contract evidence (Step 2)
The three spec creations (domain-contracts, cortex-capsule, integrations) were copied with `cp` into a temp file and moved into place after a verification `diff -r`; all three `diff -r` readbacks were **empty** (byte-identical). The two merges (storybook, visual-architecture) were applied as requirement-level edits with all non-delta requirements preserved verbatim.

```
== diff -r domain-contracts (empty = pass) ==
== diff -r cortex-capsule (empty = pass) ==
== diff -r integrations (empty = pass) ==
```

## Archive Move (Step 3) — Mechanical Copy Contract evidence

The entire change folder was snapshot (`cp -R` to a temp dir), moved (git-mv/mv to `openspec/changes/archive/2026-08-21-portable-cortex-core/`), source-gone verified, and compared against the pre-move recursive snapshot:

```
===== diff -r readback (empty = PASS) =====
===== END diff -r (empty output = byte-identical PASS) =====
```

**Empty `diff -r` = byte-identical archive. PASS.** The archive-report file is additive-only and excluded from the comparison.

## Archive Verification (Step 4)

- ✅ 3 spec baselines created; 2 spec baselines merged (all 5 domains now in `openspec/specs/`)
- ✅ Change folder moved to `openspec/changes/archive/2026-08-21-portable-cortex-core/`
- ✅ Archive contains all artifacts: proposal.md, design.md, 5 delta specs under `specs/`, tasks.md (18/18 `[x]`, 0 unchecked), verify-report.md
- ✅ Active `openspec/changes/` no longer lists this change
- ✅ Verbatim `diff -r` readback empty (byte-identical) — included above

## Mandatory Deferred Maintenance

### Graphify incremental refresh (`graphify . --update`)
Running at archive close (per cortex-persona sdd-archive integration and SUGGESTION-4 from verify):
```
graph.json: 2250 nodes, 2663 edges, 244 communities
411 files cached/unchanged, 46 re-extracted, 6 deleted
exit 0
```
Follow-up `graphify cluster-only .` regenerated GRAPH_REPORT.md / graph.html / graph.json with the same 2250-node/2663-edge/244-community structure. Note: labels were reused (241 saved labels, 244 communities — 3 new unnamed); a future `graphify label` run would name the 3 new communities. Node/edge numbers are recorded above as the refresh outcome for the archive report.

### Skill-registry refresh (`gentle-ai skill-registry refresh --force`)
Regenerated `.atl/skill-registry.md` — **23 skills indexed**, verified **clean of `OpenDesign`** (`grep -i opendesign` → 0 matches). Index reflects the post-de-suffix identity (cortex-persona, component-adapter, design-agent-lead, ponytail-*). `.atl/` is gitignored; the file is not committed.

## Known Warnings (recorded, not fixed — per orchestration scope)

These are accepted known-state items; none block archive (0 CRITICAL):
1. **Stale testing-capabilities memory (#1041)** claims Strict TDD; current `openspec/config.yaml` sets `apply.tdd:false`. All 5 slices ran Standard mode. Does not affect correctness; flagged for future cache refresh.
2. **Untracked `src/cortex/` WIP + `git stash@{0}`** are pre-existing user work, out of scope; left untouched (per constraints; archive does not move them).
3. **Standalone-ESM SUGGESTION**: a copied bootstrap needs Node ≥20.19 or target `"type":"module"`. Empirically verified to run on modern Node (auto ESM reparse, only a perf warning). Not blocking — CP-004 proof completes.

## Commit / Work Unit

The archive delta-spec sync + archive move + archive-report are committed as a conventional-commit work unit:
- Commit message: `docs(sdd): archive portable-cortex-core`
- Scoped to `openspec/` (specs baseline + archived change folder + archive-report).
- The graphify refresh wrote to gitignored `graphify-out/` (not committed); `.atl/` is gitignored (not committed).

## Sign-off

The SDD cycle for `portable-cortex-core` is COMPLETE: planned, implemented across 5 merged chained PRs, verified (PASS WITH WARNINGS, 0 CRITICAL, 70/70 tests, clean build, CP-004 port proof), and archived with byte-identical artifact preservation and main-spec baseline updated.

**Archived with warnings — intentional-with-warnings archive** (3 accepted known warnings above).
