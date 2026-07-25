# Proposal: design-agent-v2

## Intent

The existing design-agent is a linear pipeline (analyze → generate) that cannot converse about aesthetic direction, has no component vocabulary, and produces code without a project-level design system. This redesign introduces the **Triada Architecture**: a conversational lead agent that orchestrates two sub-agents (visual-architect, component-adapter) to adapt Storybook components to per-project design tokens.

## Scope

### In Scope
- Triada agent architecture: lead (conversational) + component-adapter skills
- Storybook metadata catalog (`component-catalog.json`: visualContext, moodTags, adaptationRules, dependencyProfile)
- Per-project design system generation (CSS custom property tokens)
- Conversational design workflow (block-by-block evaluation with user)
- Selective reactbits component porting (user-curated, not all 140)

### Out of Scope
- Full reactbits clone (>140 components)
- Standalone agent outside OpenCode
- Figma/design-tool integration
- CMS or data layer
- Production deployment

## Capabilities

### New Capabilities
- `visual-architecture`: Defines per-project design tokens and emits CSS custom properties (palette, typography, rhythm, animation tone, scroll narrative)
- `component-adaptation`: Queries Storybook component catalog by context (visualContext, moodTags), maps components to design tokens, applies variants
- `conversational-design`: Multi-turn design evaluation flow with user feedback loops

### Modified Capabilities
- `storybook-setup` (from storybook spec): Add `component-catalog.json` export for agent-consumable metadata

## Approach

Replace the single dual-mode skill with two skills: a lead agent (conversational design with internal visual-architecture mode) and a component-adapter that queries the Storybook component catalog JSON. The lead converses with the user block-by-block, emits a token set, then delegates adaptation. The ponytail ladder applies at every step: native CSS first, JS only when necessary, zero deps by default.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `.opencode/skills/design-agent/SKILL.md` | Removed | Replaced by triada skills |
| `.opencode/skills/design-agent-lead/SKILL.md` | New | Lead agent (conversation + visual-architecture modes) |
| `.opencode/skills/component-adapter/SKILL.md` | New | Storybook catalog query + adaptation |
| `.opencode/opencode.json` | Modified | Replace agent entry with triada agents |
| `.storybook/component-catalog.json` | New | Agent-consumable component metadata |
| `refs/design/` | Extended | Add component adaptation records |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Agent conversation flow too complex for current delegate model | Medium | Keep lead agent synchronous; user interaction via orchestration pauses |
| Design token explosion (too many tokens) | Low | Ponytail rule: max 12 tokens per project, standard naming convention |

## Phasing

| Phase | Deliverables | Depends On |
|-------|-------------|------------|
| **1: Agent Skills** | Lead skill (conversation + visual-architecture modes), component-adapter skill, opencode.json | — |
| **2: Storybook Catalog** | `component-catalog.json` schema + export from Storybook, metadata per existing component | Phase 1 |
| **3: Component Population** | Selective reactbits porting (user-curated), catalog entries for new components | Phase 2 |
| **4: Integration Flow** | End-to-end test: conversation → token set → component selection → adaptation → output | Phase 3 |

## Rollback Plan

```bash
git revert HEAD~N  # revert triada skill files + opencode.json
npm run build      # verify clean state
```

Pre-existing DRL entries in `refs/design/` are preserved.

## Success Criteria

- [ ] Storybook `component-catalog.json` exposes visualContext, moodTags, adaptationRules per component
- [ ] lead agent generates a valid CSS token set from a conversational aesthetic brief
- [ ] component-adapter selects a component by context and adapts it to target tokens
- [ ] Full conversation flow: user describes aesthetic → lead proposes options → component-adapter outputs adapted code
- [ ] `npm run build` passes after adaptation output
