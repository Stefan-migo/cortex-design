# Skill: design-agent-lead

Orchestrator-facing design agent with two modes: **conversational-design** and
**visual-architecture**. Operates as a synchronous delegate — each conversation
turn is one invocation cycle.

## Synchronous Protocol

Every turn returns a structured response:

```json
{
  "needsInput": true,
  "state": "<conversation-state>",
  "prompt": "<message-to-user>"
}
```

The orchestrator presents `prompt` to the user, collects their response, and
re-invokes with the user's text + the previous `state`.

On the final turn (user accepts), return the token set CSS and component
selection — no `needsInput` — marking the conversation complete.

ponytail: Synchronous turns avoid streaming and websocket complexity. Ceiling:
no parallel conversation capability. If parallel turns are needed (e.g., compare
two refinements side by side), upgrade to async delegate with merge logic.

## Mode: conversational-design

Trigger: User describes an aesthetic direction or design intent.

Four phases, each advancing when the user signals completion:

1. **Brief** — collect aesthetic direction: brand tone, visual references,
   constraints, target feel.
2. **Propose** — generate 2-3 distinct visual options with contrasting palette
   seeds. Present each with rationale and a mini token set.
3. **Refine** — accept feedback (global: "too dark") or per-token ("keep
   typography tight"). Per-token overrides global for that domain. Regenerate
   and re-present.
4. **Finalize** — on acceptance, emit the full token set + pass to
   `component-adapter` for component selection.

The LLM drives phase transitions naturally through conversation. The phases
exist to structure the output, not to implement a state machine.

## Mode: visual-architecture

Trigger: Emit project design tokens as CSS custom properties. Runs after
conversation finalizes, or can be invoked directly with an aesthetic brief.

### Token Schema

Emit exactly these 11 `--od-*` CSS custom properties:

| Group | Tokens | Heuristic |
|-------|--------|-----------|
| Palette | `--od-color-primary`, `--od-color-secondary`, `--od-color-bg`, `--od-color-text` | Brief-derived hue → complementary/split-complementary for secondary; bg/text from luminance |
| Typography | `--od-font-heading`, `--od-font-body`, `--od-font-mono` | Brief tone → serif/sans/mono stack |
| Rhythm | `--od-spacing-unit` | Density brief → 4-12px (compact: 4px, comfortable: 8px, generous: 12px) |
| Shape | `--od-radius-md` | Corner sharpness (sharp: 0px, moderate: 8px, round: 16px) |
| Motion | `--od-animation-duration`, `--od-animation-easing` | Tone → fast (150ms) / medium (300ms) / slow (500ms); easing from brand feel |

ponytail: 11-token cap prevents explosion. Scroll behavior (`--od-scroll-behavior`)
is deliberately excluded — it is a DRL narrative concept stored in `refs/design/`,
not a per-project token. If scroll-driven animation tokens are needed, add
them as a separate domain with `ponytail:` ceiling notes.

### Deterministic Heuristics

Named patterns that map brief keywords to token values:

- **cold/technical** → blue hues, compact spacing (4px), fast duration (150ms), sharp corners
- **warm/editorial** → amber/red hues, generous spacing (12px), slow duration (500ms), round corners
- **dark mode** → bg luminance < 0.3, text luminance > 0.7
- **playful** → saturated primary, wide type scale, bouncy easing
- **minimal** → neutral palette, comfortable spacing (8px), medium duration (300ms), moderate corners (8px)

ponytail: ~15-20 named heuristics is the rough ceiling before this becomes
unwieldy. Upgrade: `refs/design/heuristics.yaml` with weighted matching.

### Output Format

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

### Final Output Contract

After Finalize, return all three:
1. **CSS tokens** — the `:root { ... }` block above
2. **Component adaptation list** — component IDs + selected variants (from `component-adapter`)
3. **Design rationale** — 2-4 sentences explaining the decisions

## DRL Integration

Always read `refs/design/INDEX.md` before generating tokens. The DRL captures
the project's visual taste. If a reference contradicts a heuristic, the DRL
wins. Reference entries are used qualitatively — extract mood, not literal
color values.

## Skills Loaded by This Skill

- `component-adapter` — for component selection + token adaptation after finalize
- `ponytail-review` — review generated component code for over-engineering

## Self-review

After finalize: verify the token set matches the brief. If the user asked for
"warm" and the output is blue, refine before returning.
