# Design: design-agent-v2 — Triada Architecture

## Technical Approach

Replace the single dual-mode `design-agent` skill with two independent skills implementing the **Triada Architecture**: a conversational lead agent (`design-agent-lead`) that emits per-project design tokens, and a component adapter (`component-adapter`) that queries a static Storybook-derived catalog to map components to those tokens.

The existing DRL at `refs/design/` is preserved and consumed by the lead agent. The `component-catalog.json` replaces Storybook MCP for component discovery — static file, zero runtime deps, regenerated when Storybook stories change.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Skill split | One skill with modes vs two skills | One skill = less config but couples conversation with catalog query; two skills = more files but independent loading and reuse | **Two skills**: lead (conversational) + adapter (catalog). The adapter has zero conversation context — orthogonal concerns. |
| Catalog transport | Static JSON file vs MCP endpoint | MCP adds a running server dependency, auth, and failure surface; static JSON is git-tracked, diffable, loadable by any agent | **Static `component-catalog.json`** in `.storybook/`. Regenerated via `npx storybook extract` or a build script. |
| Token surface | Per-component vs flattened project-wide | Per-component tokens grow unbounded; a flat 12-token project set forces discipline | **12 max CSS custom properties** per project, `--od-*` namespace. |
| Lead synchronicity | Async delegate loop vs synchronous orchestration | Async allows parallel work but complicates turn-taking; sync is simpler for block-by-block conversation | **Synchronous**: each conversation turn is one orchestration cycle. The lead blocks, pauses output, waits for user input, then continues. |
| Catalog source | Manual annotations vs auto-extraction from Storybook | Manual = always accurate but drifts; auto = always current but needs tooling | **Auto-extraction**: the catalog is built from existing CSF3 stories + decorators. A Node script parses `.stories.jsx` exports and merges with a manual metadata overlay. First check if `npx storybook extract` works — zero code if it does. |
| Lead turn-taking | Async delegate loop vs synchronous `needsInput` signal | Async complicates conversation flow; sync is simpler but requires orchestrator changes | **Synchronous `needsInput`**: lead returns `{ needsInput: true, state: "...", prompt: "..." }`. Orchestrator pauses the delegate cycle, presents the prompt, and re-invokes with the user's response. No streaming needed — each turn is a discrete invocation. |

## Data Flow

```
User ──aesthetic brief──→ design-agent-lead
                            │
                            ├── reads DRL (refs/design/) for reference
                            ├── converses block-by-block (sync turns)
                            │
                            ├── emits token set (12 CSS vars)
                            │
                            └── delegates per-component adaptation ──→ component-adapter
                                                                        │
                                                                        ├── reads component-catalog.json
                                                                        ├── filters by visualContext + moodTags
                                                                        ├── maps adaptationRules → tokens
                                                                        └── returns adapted component code
```

## Token Schema

11 CSS custom properties, `--od-*` namespace, emitted per project (`--od-scroll-behavior` is a DRL narrative concept, not a component token):

| Group | Tokens | Purpose |
|-------|--------|---------|
| Palette | `--od-color-primary`, `--od-color-secondary`, `--od-color-bg`, `--od-color-text` | Brand colors |
| Typography | `--od-font-heading`, `--od-font-body`, `--od-font-mono` | Type scale |
| Rhythm | `--od-spacing-unit` | 4-8px base unit |
| Shape | `--od-radius-md` | Corner rounding |
| Motion | `--od-animation-duration`, `--od-animation-easing` | Timing defaults |
| Narrative | _see project config_ | Scroll behavior is a DRL narrative setting, not a token |

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `.opencode/skills/design-agent/SKILL.md` | Delete | Replaced by triada skills |
| `.opencode/skills/design-agent-lead/SKILL.md` | Create | Lead agent: conversational design + visual-architecture modes |
| `.opencode/skills/component-adapter/SKILL.md` | Create | Catalog query + token adaptation engine |
| `.opencode/opencode.json` | Modify | Replace `design-agent` with `design-agent-lead` + `component-adapter` entries |
| `.storybook/component-catalog.json` | Create | Agent-consumable component metadata (static JSON) |
| `refs/design/` | Keep | DRL preserved — unchanged |

## Interfaces

### component-catalog.json Schema

```json
{
  "version": "1",
  "components": [
    {
      "id": "glitch-text",
      "storyFile": "TextAnimations/GlitchText.stories.jsx",
      "visualContext": ["hero", "callout", "feedback"],
      "moodTags": ["edgy", "tech", "playful"],
      "adaptationRules": {
        "variants": ["Default", "HoverOnly", "SlowMotion", "WithShadows"]
      }
    }
  ]
}
```

### Token Emission Format

The lead agent outputs a CSS string (max 11 tokens per project — `--od-scroll-behavior` is omitted; scroll narrative is a DRL concept, not a token):

```css
:root {
  --od-color-primary: #6366f1;
  --od-color-secondary: #a855f7;
  --od-color-bg: #0a0a0f;
  --od-color-text: #f8fafc;
  --od-font-heading: 'Inter', sans-serif;
  --od-font-body: 'Inter', sans-serif;
  --od-font-mono: 'JetBrains Mono', monospace;
  --od-spacing-unit: 8px;
  --od-radius-md: 8px;
  --od-animation-duration: 300ms;
  --od-animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | component-catalog.json validity | Manual: `jq . .storybook/component-catalog.json` in CI |
| Integration | Catalog query → component selection | Manual: invoke component-adapter, verify output matches adaptationRules |
| E2E | Full conversation → tokens → adaptation | Manual: simulate 3-turn conversation, verify token set + adapted code |
| Build | `npm run build` after adaptation | CI gate — generated code must not break the build |

## Migration / Rollout

No migration required. The old `design-agent` skill is deleted; the new skills coexist with the existing DRL. Rollback:

```bash
git revert HEAD~N  # revert skill files + opencode.json
```

## Open Questions

- [ ] Should the `component-catalog.json` be generated by a dedicated build script or integrated into Storybook's postinstall hook? Proposal favors a script — confirm. Before writing a script, try `npx storybook extract --output .storybook/component-catalog.json` — Storybook may already export this.
