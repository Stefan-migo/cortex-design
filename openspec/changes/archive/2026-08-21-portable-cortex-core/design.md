# Design: Portable Cortex Core

## Technical Approach

Schema-backed `.cortex/` capsule: four contracts validated by one canonical schema (DC-004) at write and bootstrap (DC-001/DC-005). Stack-agnostic Node CLI bootstrap (CP-001) copies contracts + adapter into any JS target, scaffolds a local Storybook (CP-002/CP-003), emits canonical tokens with legacy aliases (VA-001/CP-005). De-suffix stale `OpenDesign` identity first (blocking). Adapter is exactly `{detect, resolve, emit}` (ITG-001); only plain-js concrete (ITG-002).

## Architecture Decisions

| # | Decision | Choice / rationale |
|---|----------|--------------------|
| 1 | Canonical catalog | Global regenerated to DC-004; on-disk (48) `variants` array, `registry.js` (60) + `cortex/catalog.js` a third shape. |
| 2 | Bootstrap runtime | Node stdlib (`fs`,`path`), zero deps (CP-001). |
| 3 | SB deps | Declare only, never run (human): `@storybook/html-vite` in target `devDependencies`; install caller-owned. |
| 4 | Local builder | HTML builder (CP-002); global SB is react-vite. |
| 5 | Token namespace | Alias `--od-*`, never delete (VA-001/CP-005). Canonical 11 (palette 4, typography 3, rhythm 2, animation-tone 2, scroll-reserved). `design-agent-lead/SKILL.md` live emitter. |
| 6 | Adapter shape | Interface-only `{detect, resolve, emit}` (ITG-001). |
| 7 | Validation timing | Write + bootstrap, one validator (DC-001/DC-005). |
| 8 | Token cap | Canonical 11, cap 12; over-cap drops lowest-priority w/ reason (VA-004); palette 4 never dropped (VA-006); scroll intent in notes (VA-005). |

## Data Flow

```
 .cortex/contracts/* + schema.json + adapter -> target/.cortex/
 target: bootstrap -> detect, resolve, emit, scaffold, validate, declare, derive, exit
```

Any fail -> exit 1 + named error (CP-001). No `detect` match -> plain-js fallback + report adapters considered (ITG-001); false-detect stub logs warning (ITG-002). Global/local bind separate ports (SB-GLOBAL-000); local references only copied files (SB-GLOBAL-003).

## Threat Matrix

`bootstrap.js` is a Node subprocess reading `package.json`, writing into the target.

| Boundary | Applicability | Safe | Failure | RED tests |
|---|---|---|---|---|
| Documentation-like paths | **Applicable** — classifies via `package.json`, executes no `.md`/`.sh` | Reads metadata only, ignores `README.sh`, `.md`, `requirements.txt`, `CMakeLists.txt`, executable MDX | Executing any target file violates boundary | Same fixtures -> bootstrap succeeds, nothing executed |
| Git repo selection | N/A — no VCS writes; authority in harness only | harness `git diff` empty (CP-002) |
| Commit state | N/A — no index/worktree interaction |
| Push state | N/A — no ref/remote resolution |
| PR commands | N/A — no PR automation |

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `.cortex/schema.json` + `.cortex/contracts/{existing-design-profile,redesign-intent,preservation-matrix,visual-contract-v1}.json` | Create | Canonical schema (DC-004) + four contracts (DC-001..003). |
| `.cortex/bootstrap.js`, `.cortex/adapters/plain-js.js` | Create | Installer + fallback adapter (CP-001, ITG-002). |
| `package.json`, `openspec/config.yaml`, `.opencode/opencode.json` | Modify | De-suffix `OpenDesign`/`opendesign-landing`, stale graphify path. |
| `.atl/skill-registry.md`, `graphify-out/` | Modify | De-suffix stale `OpenDesign` paths. |
| `.storybook/component-catalog.json` | Regenerate | 48 -> DC-004 object-form. |
| `.opencode/skills/{design-agent-lead,component-adapter}/SKILL.md` | Modify | Canonical namespace + DC-004 ref. |
| `src/data/registry.js`, `src/cortex/catalog.js` | Modify | Derivation-only at port (CP-003). |
| `tests/fixtures/plain-js-port/` | Create | CP-004 proof: plain-JS project (own `package.json`, no framework); contracts + local SB + DC-004 catalog. |

## Interfaces / Contracts

```js
// .cortex/adapters/{name}.js — ONLY public shape (ITG-001)
export default {
  detect:  (project) => boolean,   // true -> applies
  resolve: (contracts) => assets,  // {tokens, storybook, catalog}
  emit:    (target) => void,       // writes; throws on failure
};
// No extra emit params. detect caches verdict, resolve caches assets,
// emit reads cache; lifecycle detect -> resolve -> emit.
// DC-004 catalog { version: string, components: array }; component:
{ id, storyFile|null, visualContext:[], moodTags:[], adaptationRules:{
    tokenSlots:[], defaultProps:{}, variants:{Variant:{prop:val}}, defaults:{tok:val} } }
// DC-002: id, stack, presentColors, presentTypography, existingTokens, notes.
// DC-003 redesign-intent: id, brief, derivedTokens(empty), constraints, notes
//   (scroll intent, VA-004/VA-005); preservation-matrix:
//   preservedTokens/Colors/Behaviors; dropped[{reason}] (dropped unaliased, CP-005).
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | DC-004 array `variants` rejected; DC-001 invalid write -> no file + error names field; DC-002 fields/greenfield; CP-005 dropped unaliased w/ reason; VA-004 15-12 drops + palette kept (VA-006); CA-001 OR-moodTag + empty | vitest, JSON fixtures |
| Integration | `bootstrap.js` temp targets: missing/malformed `package.json` -> exit != 0 + named error (CP-001); DC-005 drift; SB-GLOBAL-000 dual ports | vitest spawn, temp dirs |
| E2E | `tests/fixtures/plain-js-port` (CP-004); SB-GLOBAL-003 local-only render (reads only target `.cortex/contracts/` + local catalog, zero host paths); SB-GLOBAL-002 zero diff; ITG-001 report; ITG-002 warning | scripted scratch dir |

## Migration / Rollout

Phased: (1) de-suffix identity (blocking); (2) schema + contracts; (3) bootstrap + adapter; (4) global catalog -> DC-004 + skills; (5) external port proof. SB install = caller-owned follow-up. Rollback: `git revert`, `rm -rf .cortex`. Review budget **Medium** (5 slices <400 lines).

## Open Questions

None.
