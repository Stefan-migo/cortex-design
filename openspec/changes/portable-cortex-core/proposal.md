# Proposal: portable-cortex-core

## Intent

Cortex is locked to this repo (stale `OpenDesign` paths, single global Storybook, LLM-driven generation). Make it a **portable, deterministic, Storybook-first design system** that installs into arbitrary JS projects. First slice ships the four domain contracts plus a minimal `.cortex/` bootstrap, proving porting end-to-end in a test project.

## Scope

### In Scope
- **4 domain contracts (primary deliverable):** `Existing Design Profile`, `Redesign Intent`, `Preservation Matrix`, `Visual Contract v1`
- **Minimal `.cortex/` bootstrap/install** exercising porting end-to-end in a test project
- **One canonical catalog schema** (resolve 3 conflicting authorities)
- **Portability de-suffixing:** strip stale `OpenDesign` identity/paths
- Deterministic **process + tokens** (reproducible stages/gates, human taste gates — NOT byte-identical code)

### Out of Scope
- Cortex Library reusable component library
- Full integration adapters for all frameworks (only the abstraction)
- Living global component library; taste/visual-thesis pipeline
- Token→code deterministic compiler

## Capabilities

### New Capabilities
- `domain-contracts`: Canonical schema + artifacts for Existing Design Profile, Redesign Intent, Preservation Matrix, Visual Contract v1
- `cortex-capsule`: `.cortex/` bootstrap/install and per-project local Storybook scaffold; portable catalogs
- `integrations`: Per-framework adapter abstraction (stack-agnostic porting in/out of scope slices)

### Modified Capabilities
- `visual-architecture`: Resolve spec-vs-implementation token naming and 11 vs 12-token cap; freeze in Visual Contract
- `storybook`: Global (agent resource/communication surface) vs local (per-project source of truth) role

## Approach

Ship the four contracts as schema-backed JSON under `.cortex/`, validated by one canonical schema. Bootstrap copies capsule + adapter into the target and scaffolds a local Storybook. De-suffix stale identity first. Determinism = fixed stages + gates + human taste gate; code stays within frozen Visual Contract, not byte-identical.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/registry.js`, `src/cortex/catalog.js`, `.storybook/component-catalog.json` | Modified | Single canonical catalog source |
| `.opencode/opencode.json`, `openspec/config.yaml`, `package.json`, `.atl/skill-registry.md`, `graphify-out/` | Modified | De-suffix `OpenDesign` identity |
| `.cortex/` | New | Capsule: 4 contracts + bootstrap + local SB scaffold |
| `.opencode/skills/design-agent-lead/SKILL.md` | Modified | Token namespace + contract references |
| `refs/design/` | Unchanged | DRL captured qualitatively; not machine-checkable (deferred) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Catalog schema drift recurs | High | One canonical schema + validation in bootstrap |
| Portability unsound until de-suffixing merged | High | De-suffix is a blocking prerequisite step |
| Scope creep on adapters/library | Medium | Explicit slice boundaries; library/adapters deferred |
| Token normalization breaks existing tokens | Medium | Freeze Visual Contract; alias rather than hard-swap |

## Rollback Plan

```bash
git revert HEAD~N            # revert contracts + bootstrap + de-suffix commits
rm -rf .cortex               # remove capsule from target project
npm run build                # verify clean state
```

Existing `.storybook/` and `src/` untouched during first slice beyond catalog/schema refactor (aliasing, not deletion).

## Dependencies

- De-suffixing of `OpenDesign` identity must precede `.cortex/` porting in a test project.
- External test project (any stack) to prove end-to-end bootstrap.

## Success Criteria

- [ ] 4 domain contracts exist under `.cortex/`, validated by one canonical schema (no drift)
- [ ] `.cortex/` bootstrap installs capsule into an external test project and porting completes end-to-end
- [ ] No stale `OpenDesign` path/name anywhere; single canonical catalog source
- [ ] Visual Contract v1 freezes tokens and gates; code within contract, not byte-identical
- [ ] Global vs local Storybook roles documented and scaffold supported
- [ ] Changes fit in a reviewable slice under the 400-line budget

## Open Questions

- Token namespace final naming (`--od-*` vs `--palette-*`/`--typography-*`) — resolve during Visual Contract v1 freezing.
