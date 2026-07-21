# Proposal: design-agent

## Intent

Transform OpenDesign from a landing-page project into a **design-code synthesis environment**: a sub-agent (inside gentle-ai/OpenCode) that receives visual references, analyzes them into structured design guidelines, and implements frontend code directly in the host project.

Why a sub-agent rather than standalone? Because design lives inside code — the orchestrator delegates design tasks, the agent generates code, and the result stays in the same project, same session. No context switch, no copy-paste.

Why a Design Reference Library? Because an LLM without reference context produces generic output. The DRL gives the agent a **structured memory of what "good design" means** for this specific project: animation patterns, layout systems, scroll behaviors, transitions. The agent builds it as it receives references.

Why bootstrapable (`design-init`)? Because Cortex proved the pattern works — `cortex-init` makes the persona available in any project instantly. Design should work the same way: one command, instant design capabilities.

## Scope

### In Scope

| # | Deliverable | Description |
|---|-------------|-------------|
| 1 | **DRL schema & INDEX.md** | Design Reference Library: structured reference files + catalog |
| 2 | **Design agent skill** | Single skill with dual modes: `reference-analyst` (analyze/DRL) + `designer` (code gen) |
| 3 | **opencode.json agent config** | `design-agent` entry in opencode.json agents |
| 4 | **Reference analysis** | Agent capability: receive URL/image/video → analyze → save to DRL |
| 5 | **design-init script** | Bootstrap script that installs agent + skills into any project |
| 6 | **Landing page removal** | Delete test landing page (SoftAurora, hero, App.jsx, App.css, main.jsx) |

### Out of Scope

- Standalone agent outside OpenCode
- Model fine-tuning
- CMS integration
- Graphic asset generation (images, SVGs) — code only
- Production deployment infra

## Architecture & Flow

```
User/Orchestrator           Design Agent              Host Project
     │                          │                         │
     ├─ "Design section X" ─────┤                         │
     │                          ├─ Read DRL references    │
     │                          ├─ Read project context   │
     │                          ├─ Load design skill      │
     │                          ├─ Generate code ─────────┤── Write files
     │                          ├─ Save to Engram ───────┤
     │                          └─ Return summary ──────┤
     │                          │                         │
     ├─ "Analyze this URL" ────┤                         │
     │                          ├─ Fetch URL (web MCP)   │
     │                          ├─ Analyze design patterns│
     │                          ├─ Save to DRL ──────────┤── INDEX.md
     │                          └─ Confirm ─────────────┤
```

### Communication

- **Orchestrator → Agent**: delegate via `delegate()` with a structured task prompt containing project context, references, and section to design
- **Agent → Host project**: writes files directly (no separate output channel)
- **Agent → Engram**: saves design decisions per Cortex knowledge capture discipline

### Agent Workflow (per design task)

1. Receive task + project context + references
2. Query DRL for relevant references (by tag/stack/technique)
3. Load design-agent skill (design rules + ponytail-* as guardrails)
4. Generate frontend code for the requested section
5. Run ponytail-review on generated code (self-check)
6. Write files to host project
7. Save design decisions + patterns discovered to Engram

## Design Reference Library Schema

```
openspec/changes/design-agent/design-references/
├── INDEX.md                           ← Catalog with annotations
├── ref-001-awwwards-nominee/          ← Generated per reference
│   └── reference.md                   ← Structured analysis
└── ref-002-codepen-motion/            ← Auto-generated
    └── reference.md
```

### reference.md Format

```yaml
name: "Awwwards Nominee — XYZ Studio"
source: url | image | video
analyzed_at: 2026-07-20
tags: [scroll-triggered, parallax, gradient, ogl-webgl, react]
stack: [vite, react, ogl, framer-motion]
techniques:
  - scroll-driven opacity gradients
  - perspective parallax layers
  - WebGL mesh transitions
scroll_behavior: sticky + reveal-on-scroll
transitions: fade-slide (800ms, ease-out-cubic)
key_animations:
  - hero entrance: mesh morph + text reveal (1.2s staggered)
  - section divider: clip-path reveal
code_snippets:
  - "src/sections/Hero.jsx" — scroll-driven opacity via IntersectionObserver
  - "src/animations/meshTransition.js" — OGL noise displacement
qualitative: "Feels like liquid paper — scroll drives everything, nothing auto-plays"
why_special: "Every section transition is physically motivated (scroll direction matters). Why each technique was chosen — performance, accessibility, feel"
```

## Tool Surface

| Tool | Purpose | Required? |
|------|---------|-----------|
| Graphify MCP | Project structure context, validate design against existing code | Yes |
| Web fetch | Analyze URL references for DRL + fetch framework docs | Yes |
| Open Design MCP | Design generation assistance | **Optional** (evaluate after Phase 2) |
| Engram | Save/query design decisions across sessions | Yes |
| Ponytail-* skills | Over-engineering guardrails on generated code | Yes |

The agent loads: `design-agent`, `ponytail-plan`, `ponytail-review` as skills. `design-agent` has two internal modes: `reference-analyst` (analyze/save references) and `designer` (generate code).

## Integration with gentle-ai

```jsonc
// opencode.json agents (to be created)
{
  "agents": {
    "design-agent": {
      "type": "local",
      "skills": ["design-agent", "ponytail-plan", "ponytail-review"],
      "mcp": ["graphify", "web-fetch"]
    }
  }
}
```

**Orchestration**: The orchestrator delegates via `delegate(agent: "design-agent", prompt: { task, context, references })`. The agent runs the full design workflow and returns a summary. No polling — the agent is synchronous within OpenCode's session.

**SDD Pipeline**: design-agent participates in sdd-apply as a specialized executor. When a task requires design work, sdd-apply delegates to design-agent instead of generating code directly.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| **No testing** — generated code may break | High | Build step in verify phase (`npm run build`); add lint post-generation |
| **Generic output** — design lacks character | Medium | DRL + qualitative descriptions force non-generic output; agent must cite references |
| **Video analysis** — motion extraction from video | Medium | Phase 1: manual descriptions. Phase 2: frame extraction + vision LLM |
| **Quality evaluation** — subjective | Medium | DRL as baseline; compare generated output against reference patterns |
| **Context window** — large DRL exceeds context | Low | DRL INDEX.md as summary; agent reads full references on demand |

## Phasing Plan

| Phase | Deliverables | Depends On |
|-------|-------------|------------|
| **1: DRL + Skills** | DRL schema, INDEX.md format, `design-agent` skill (reference-analyst mode), landing page removal | — |
| **2: Agent Core** | `design-agent` skill (designer mode), opencode.json agent config, reference analysis. Evaluate Open Design MCP as final task | Phase 1 |
| **3: Design Init** | `design-init` script, bootstrap workflow, project detection. Video analysis pipeline if justified | Phase 2 |

## Next Recommended

1. **sdd-design**: Write the Technical Design — detail the DRL schema, agent skill structure, orchestration protocol, and landing page removal plan.
2. **sdd-tasks**: Break into implementation tasks per phase above.

---

*Proposal created for change `design-agent`. Mode: hybrid (openspec + engram).*
