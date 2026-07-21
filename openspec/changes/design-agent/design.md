# Design: design-agent — Design-Code Synthesis Environment

## Technical Approach

Transform OpenDesign from a static React landing page into an agent-native design-code synthesis environment. A single `design-agent` sub-agent inside gentle-ai/OpenCode receives visual references, analyzes them into structured Design Reference Library (DRL) entries, and generates frontend code directly in the host project. The agent operates as a skill with two internal modes — `reference-analyst` and `designer` — loaded by the orchestrator on demand.

The DRL lives in the project's filesystem (`refs/design/`) so it's version-controllable, shareable, and survives agent context resets. Engram stores design decisions and patterns discovered per session, cross-referenced by topic keys.

Landing page removal is the cleanup prerequisite: delete the SoftAurora test page, App.jsx, App.css, main.jsx, and the ogl dependency so the project becomes a blank canvas for the design agent.

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        gentle-ai / OpenCode                         │
│                                                                     │
│  ┌──────────────┐     delegate()     ┌──────────────────────────┐   │
│  │ Orchestrator  │ ──────────────────▶  design-agent (skill)     │   │
│  │ (gentle-ai)   │                    │                          │   │
│  │               │                    │  ┌───────────────────┐   │   │
│  │ delegates to  │                    │  │ reference-analyst │   │   │
│  │ design-agent  │                    │  │  (mode 1)         │   │   │
│  │ when task     │                    │  └────────┬──────────┘   │   │
│  │ has design    │                    │           │               │   │
│  │ work          │                    │  ┌────────▼──────────┐   │   │
│  │               │                    │  │ designer          │   │   │
│  │ Returns       │ ◀──────────────────│  │  (mode 2)         │   │   │
│  │ summary       │                    │  └───────────────────┘   │   │
│  └──────────────┘                    └──────────┬───────────────┘   │
│                                                  │                   │
└──────────────────────────────────────────────────┼───────────────────┘
                                                   │
                         ┌─────────────────────────┼─────────────────────────┐
                         │                         │                         │
                         ▼                         ▼                         ▼
              ┌──────────────────┐   ┌────────────────────┐   ┌────────────────────┐
              │  DRL (filesystem) │   │  Engram (KB)       │   │  Host Project      │
              │  refs/design/     │   │  design decisions, │   │  (filesystem)      │
              │  INDEX.md         │   │  patterns, history │   │  writes .jsx/.css   │
              │  ref-*/ref.md     │   │                    │   │                    │
              └──────────────────┘   └────────────────────┘   └────────────────────┘

MCPs consumed:
  graphify MCP  ── project context, validate design against existing code
  webfetch      ── URL references → analyze → DRL entry (platform built-in)
  Engram MCP    ── save/query design decisions

Skills loaded by design-agent:
  design-agent      ── self (the dual-mode skill)
  ponytail-plan     ── pre-generation over-engineering check
  ponytail-review   ── post-generation guardrails
```

### Flow: Design Task

1. User asks orchestrator: "Design section X with Y references"
2. Orchestrator calls `delegate(agent: "design-agent", prompt: { task, context, references })`
3. `design-agent` loads its skill file (reference-analyst or designer mode depending on task)
4. Agent reads DRL entries matching tags/stack/technique from the task
5. Agent generates frontend code using design rules from skill + DRL context
6. Agent runs `ponytail-review` on generated code (self-check guardrail)
7. Agent writes files to host project
8. Agent saves design decisions + patterns to Engram
9. Agent returns summary to orchestrator

### Flow: Reference Analysis

1. User asks orchestrator: "Analyze this URL for design patterns"
2. Orchestrator delegates to `design-agent` in reference-analyst mode
3. Agent fetches URL via web fetch MCP
4. Agent analyzes: color palette, typography, scroll behavior, transitions, animations, layout grid
5. Agent generates reference.md with structured YAML frontmatter + qualitative assessment
6. Agent saves to `refs/design/ref-NNN-name/` and updates INDEX.md
7. Agent confirms to orchestrator

---

## 2. DRL Detailed Schema

### Directory Structure

```
refs/design/
├── INDEX.md                           ← Catalog: one line per reference
├── ref-001-awwwards-nominee/          ← kebab-case, lowercased
│   └── reference.md                   ← Required: the analysis
└── ref-002-codepen-motion/
    └── reference.md
```

### INDEX.md Format

```markdown
# Design Reference Library

> Structured memory of what "good design" means for this project.
> Each entry is an analyzed visual reference.

## Index

| # | Name | Tags | Stack | Analyzed |
|---|------|------|-------|----------|
| 001 | Awwwards Nominee — XYZ Studio | scroll-triggered, parallax | vite, react, ogl | 2026-07-20 |
| 002 | CodePen — Liquid Motion | canvas, cursor-follow | vanilla js | 2026-07-21 |

## Conventions

- Reference names are kebab-case, auto-generated from the source title
- Each reference has exactly one `reference.md`
- INDEX.md is regenerated after every add/remove
```

### reference.md Schema (YAML frontmatter + Markdown body)

```yaml
---
name: "Awwwards Nominee — XYZ Studio"
source: "https://xyz-studio.com"            # URL | image | video
source_type: url                              # url | image | video | local
analyzed_at: 2026-07-20                       # ISO date
analyzed_by: reference-analyst                # tool that created it

# Discovery tags — free-form, lowercase
tags:
  - scroll-triggered
  - parallax
  - gradient
  - ogl-webgl
  - react

# Technology stack observed
stack:
  - vite
  - react
  - ogl
  - framer-motion

# Specific techniques used
techniques:
  - scroll-driven opacity gradients
  - perspective parallax layers
  - WebGL mesh transitions
  - intersection-observer reveal

# Scroll behavior classification
scroll_behavior: "sticky + reveal-on-scroll"  # smooth | sticky | snap | parallax | none

# Transition patterns
transitions:
  type: fade-slide                            # fade | slide | clip-path | morph | custom
  duration: 800ms
  easing: ease-out-cubic

# Key named animations
key_animations:
  - name: hero-entrance
    description: "Mesh morph + text reveal, 1.2s staggered"
    trigger: on-load
  - name: section-divider
    description: "Clip-path reveal on intersection"
    trigger: on-scroll

# Relevant code snippets (relative paths or inline)
code_snippets:
  - path: "src/sections/Hero.jsx"
    technique: "scroll-driven opacity via IntersectionObserver"
  - path: "src/animations/meshTransition.js"
    technique: "OGL noise displacement"

# Qualitative assessment
qualitative: >
  Feels like liquid paper — scroll drives everything,
  nothing auto-plays. Every section transition is
  physically motivated.

# Why this reference is noteworthy
why_special: >
  Every section transition is physically motivated
  (scroll direction matters). Performance is maintained
  despite heavy WebGL — techniques chosen for 60fps
  on mid-range devices.
---
```

Body section (free-form Markdown after `---`):

```markdown
## Analysis Notes

Additional observations, patterns to replicate, or
context that doesn't fit structured fields.

## Replication Notes

- The scroll-driven opacity requires `IntersectionObserver`
  with `threshold: [0, 0.25, 0.5, 0.75, 1]`
- The parallax effect uses `transform-style: preserve-3d`
  on the parent, `translateZ` per layer
```

### How References Are Generated (reference-analyst mode)

1. User provides a URL, image, or video reference
2. Agent fetches URL (web MCP) or processes uploaded image/video
3. Agent analyzes using its reference-analyst prompt template
4. Agent extracts: tags, stack, techniques, scroll behavior, transitions, animations
5. Agent writes qualitative + why_special fields (the key to non-generic output)
6. Agent saves to `refs/design/ref-NNN-name/` and updates INDEX.md

Naming convention: sequential ID from `ref-001-` onward, sourced from `INDEX.md`'s last entry.

### How References Are Queried

By tag: `tags: [scroll-triggered, parallax]` → grep INDEX.md or agent reads INDEX.md section headers
By stack: `stack: [react, framer-motion]` → filter by stack matching
By technique: free-text search in `techniques` list or qualitative body

The agent receives the full INDEX.md as context and reads full `reference.md` files for matching entries.

---

## 3. Design Agent Skill Structure

### File

```
.opencode/skills/design-agent/SKILL.md
```

### Structure

```markdown
# Skill: design-agent

Design-code synthesis agent. Two modes:
1. reference-analyst — analyze visual references → DRL entries
2. designer — use DRL + project context → frontend code

## Principles

- CONCRETE OVER ABSTRACT: every design decision must cite a DRL reference
or a project-specific constraint. No generic "best practices."
- CODE OVER MOCKUP: the output is working code, not Figma exports or image assets.
- PONYTAIL GUARDRAILS: every generated component goes through ponytail-review
before being written. Over-engineered CSS? Delete. Unused animation variants? Cut.
- DRL-FIRST: read relevant DRL entries before generating anything. The DRL is
the project's taste; the agent executes within it.

## Mode: reference-analyst

Trigger: User provides URL, image, or video for design analysis.

Prompt template:
```
You are a design reference analyst. Given the following reference, produce a structured analysis.

REFERENCE: {url or description}

Analyze:
1. What design system patterns do you observe? (palette, type scale, spacing grid)
2. How does scroll work? (behavior, speed, direction influence)
3. What transitions and animations are used? (type, duration, easing, triggers)
4. What technical stack does this imply? (React? Canvas? WebGL? GSAP?)
5. What makes this feel special? (qualitative — be specific, don't say "smooth")
6. What techniques could we replicate? (be concrete: CSS, JS API, library)

Output as YAML frontmatter matching the DRL reference.md schema.
Include a qualitative assessment that a designer would recognize as authentic.
```

## Mode: designer

Trigger: User asks to design/implement a section or component.

Prompt template:
```
You are a frontend designer who writes code. Given the project context and DRL references:

PROJECT CONTEXT: {stack, existing files, constraints}
DRL REFERENCES: {matching reference summaries}
TASK: {what to design}

Rules:
1. Read the DRL references first. Your design MUST reference at least one pattern from DRL.
2. Output working JSX + CSS code. No pseudo-code, no "implement this later."
3. Use CSS first, JS animation only when CSS cannot achieve the effect.
4. Every animation/transition must have a rationale — why this timing, why this easing.
5. After generating, run ponytail-review on your own output:
   - Can any CSS be replaced with standard properties?
   - Are there unused animation variants?
   - Is any JS animation achievable with CSS transitions?
   - Would a simpler approach look 80% as good?
6. Write files to {project_path}. Do NOT create placeholder files — every file must be production-ready.
7. Save what you learned to Engram: design decisions, patterns discovered, references used.
```

## Skills loaded by this agent
- ponytail-plan: review task before coding
- ponytail-review: review generated code for over-engineering
- design-agent: self (the above)

## Self-review protocol

After every code generation pass:

1. Read the generated files
2. Run ponytail-review on the diff
3. If ponytail flags something, fix it before writing
4. Only write to disk after clean review or acknowledged deviation
```

---

## 4. opencode.json Agent Configuration

The `design-agent` entry in `.opencode/opencode.json`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "graphify": {
      "type": "local",
      "enabled": true,
      "command": [
        "graphify",
        "mcp",
        "--project-dir",
        "/run/media/stefan/Nuevo vol/Proyectos/OpenDesign"
      ],
      "_description": "Graphify — knowledge graph queries via MCP"
    },
    "webfetch": {
      "type": "builtin",
      "enabled": true,
      "_description": "Platform built-in web fetch for URL reference analysis"
    }
  },
  "agents": {
    "design-agent": {
      "type": "local",
      "skills": [
        "design-agent",
        "ponytail-plan",
        "ponytail-review"
      ],
      "mcp": [
        "graphify",
        "webfetch"
      ]
    }
  },
  // existing plugin entry preserved
  "plugin": [
    "/home/stefan/Cortex/.opencode/plugins/graphify.js"
  ]
}
```

### Registration for gentle-orchestrator

The orchestrator discovers `design-agent` from the `agents` section in `opencode.json`. On receiving a task tagged `design` or containing "design" in the task prompt, the orchestrator delegates via:

```
delegate(agent: "design-agent", prompt: {
  mode: "reference-analyst" | "designer",
  task: "string description of what to do",
  context: "project path, stack, existing files",
  references: ["ref-001", "ref-002"],  // DRL entry names or URLs
  delivery: "write-files" | "return-only"
})
```

No additional registration step is needed — the orchestrator reads `opencode.json` agents at session start.

---

## 5. Orchestration Protocol

### Task Format (orchestrator → design-agent)

```
delegate(
  agent: "design-agent",
  prompt: {
    mode: "designer",
    task: "Implement the hero section with scroll-driven opacity and parallax layers",
    context: {
      project_path: "/run/media/stefan/Nuevo vol/Proyectos/OpenDesign",
      stack: "vite + react, no type system, JSX + CSS",
      constraints: "No new npm dependencies. CSS first. Max 2 JS animation libraries."
    },
    references: ["ref-001"],
    delivery: "write-files"
  }
)
```

### Return Format (design-agent → orchestrator)

```markdown
## Design Complete

**Task**: Implement hero section

### Files Created/Modified
- src/sections/Hero.jsx — scroll-driven opacity hero
- src/animations/parallax.css — perspective parallax layers

### DRL References Used
- ref-001 — Awwwards Nominee (parallax technique)
- ref-003 — Apple product page (scroll opacity)

### Design Decisions
- IntersectionObserver over scroll events for performance
- CSS `clip-path` for section transitions instead of WebGL (YAGNI: single use)

### Patterns Saved to Engram
- `design-agent/pattern/intersection-observer-reveal`
- `design-agent/decision/scroll-vs-intersection-observer`

### Ponytail Review Results
- Clean: all generated code passed ponytail-review
```

### Integration with SDD Pipeline

`design-agent` participates in `sdd-apply` as a specialized executor. When a task in `tasks.md` is flagged with `agent: design-agent`, the apply phase:

1. Reads the task description and references
2. Calls `delegate(agent: "design-agent", ...)` with the task prompt
3. Receives the completion summary
4. Marks the task as `[x]` in tasks.md
5. Proceeds to verification

The orchestration layer is minimal — `sdd-apply` doesn't need special handling for design-agent beyond the `delegate()` call and result collection.

---

## 6. Engram Memory Schema

### After Each Design Task

```yaml
title: "design-agent/pattern/intersection-observer-reveal"
type: pattern
topic_key: "design-agent/learnings"
content: |
  **What**: Scroll-driven reveal using IntersectionObserver
  **Why**: Better performance than scroll events; native browser API, no library
  **Where**: src/sections/Hero.jsx
  **DRL**: ref-001 (technique reference)
  **Pattern**: observer with threshold array, toggle class on intersection
```

```yaml
title: "design-agent/decision/scroll-vs-intersection-observer"
type: decision
topic_key: "design-agent/decisions"
content: |
  **What**: Chose IntersectionObserver over scroll event listener
  **Why**: Scroll events fire at 60fps even when not needed; IO is composited-thread
  **Where**: src/sections/Hero.jsx
  **DRL**: ref-001 (original used scroll events, but IO is cleaner)
  **Tradeoff**: IO has less timing precision (scroll-linked animations need extra work)
```

### After Each Reference Analysis

```yaml
title: "design-agent/reference/ref-001-awwwards-nominee"
type: discovery
topic_key: "design-agent/references"
content: |
  **What**: Analyzed XYZ Studio reference
  **Source**: https://xyz-studio.com
  **Tags**: scroll-triggered, parallax, ogl-webgl
  **Key pattern**: scroll-driven opacity with perspective parallax layers
  **Why special**: every transition is physically motivated by scroll direction
```

### Query Format

To recall past designs:
```
mem_search(query: "design-agent/pattern/*", project: "OpenDesign")
mem_search(query: "design-agent/decision/*", project: "OpenDesign")
mem_search(query: "design-agent/reference/*", project: "OpenDesign")
```

---

## 7. Landing Page Removal Plan

### Files to Delete

| File | Reason |
|------|--------|
| `src/App.jsx` | Imports SoftAurora; entire landing page content |
| `src/App.css` | All styles for the landing page components |
| `src/main.jsx` | Entry point that renders App |
| `src/components/SoftAurora/SoftAurora.jsx` | OGL WebGL component (sole user of ogl dep) |
| `src/components/SoftAurora/SoftAurora.css` | SoftAurora styles |
| `src/components/SoftAurora/` | Empty directory after removal |
| `index.html` | Replace with minimal stub (keep `<div id="root">`) |
| `public/` | Remove if empty or SoftAurora-related assets exist |

### Dependencies to Clean

| Dependency | Action | Reason |
|------------|--------|--------|
| `ogl` (npm) | Remove from `package.json` | Sole used by deleted SoftAurora |
| `@vitejs/plugin-react` (dev) | Keep | Vite React plugin — needed if future React work |
| `vite` (dev) | Keep | Build tool — project will still serve content |

### Replacement Files

| File | Content |
|------|---------|
| `src/main.jsx` | Minimal Vite + React entry point rendering a placeholder |
| `src/App.jsx` | Minimal empty App component |
| `src/App.css` | Minimal reset-only CSS |
| `index.html` | Keep current (it's generic — just title "OpenDesign") |

### Verification

```bash
npm run build    # MUST succeed (no broken imports)
npm run dev      # MUST start without errors
```

### Rollback Plan

```bash
git checkout HEAD -- src/App.jsx src/App.css src/main.jsx src/components/SoftAurora/ index.html package.json
npm install
```

If the project is not in git at the time of removal (no git repo detected from env check), use a pre-removal backup:
- Copy `src/`, `index.html`, `package.json` to `/tmp/opendesign-backup/` before deletion
- Rollback: copy files back

---

## 8. Phasing Detail

### Phase 1: DRL Schema + reference-analyst Mode + Landing Page Removal

**Goal**: Create the DRL structure, implement reference-analyst mode, clean the slate.

| # | Task | Files | Depends On |
|---|------|-------|------------|
| 1.1 | Create `refs/design/` directory + INDEX.md skeleton | `refs/design/INDEX.md` | — |
| 1.2 | Create `refs/design/ref-001-template/` with example reference.md | `refs/design/ref-001-template/reference.md` | 1.1 |
| 1.3 | Write `design-agent` skill SKILL.md with reference-analyst mode | `.opencode/skills/design-agent/SKILL.md` | — |
| 1.4 | Delete SoftAurora component + directory | `src/components/SoftAurora/` | — |
| 1.5 | Replace `src/App.jsx`, `src/App.css`, `src/main.jsx` with minimal versions | `src/App.jsx`, `src/App.css`, `src/main.jsx` | 1.4 |
| 1.6 | Remove `ogl` from `package.json`, run `npm install` | `package.json` | 1.5 |
| 1.7 | Verify `npm run build` succeeds | — | 1.6 |

### Phase 2: Agent Core — designer Mode + opencode.json + Reference Analysis

**Goal**: Implement the designer mode, configure the agent, and wire reference analysis.

| # | Task | Files | Depends On |
|---|------|-------|------------|
| 2.1 | Add `designer` mode to `design-agent` SKILL.md (prompt template + rules) | `.opencode/skills/design-agent/SKILL.md` | 1.3 |
| 2.2 | Configure `design-agent` in `.opencode/opencode.json` (agent entry + webfetch MCP, which is platform built-in) | `.opencode/opencode.json` | — |
| 2.3 | *(removed — webfetch is platform built-in, no custom MCP needed)* | — | — |
| 2.5 | Test reference analysis: fetch a URL → generate DRL entry | manual test | 2.3 |
| 2.6 | Test designer mode: generate code from DRL references | manual test | 2.1 |
| 2.7 | Evaluate Open Design MCP — if useful, integrate as optional | research | 2.6 |

### Phase 3: Design Init — Bootstrap + Video Analysis (if justified)

**Goal**: Create `design-init` script and evaluate video analysis.

| # | Task | Files | Depends On |
|---|------|-------|------------|
| 3.1 | Write `design-init.js` bootstrap script | `scripts/design-init.js` | 2.2 |
| 3.2 | Test bootstrap: run script in empty project → agent available | manual test | 3.1 |
| 3.3 | Evaluate video analysis pipeline (need vs complexity) | research | 2.6 |
| 3.4 | If justified: implement frame extraction + vision LLM analysis | `scripts/analyze-video.js` | 3.3 |

---

## 9. Design Decisions

### Decision: Single Skill with Two Modes vs Separate Skills

**Choice**: Single `design-agent` skill with internal `reference-analyst` and `designer` modes.
**Alternatives**: Two separate skills (`design-agent-analyst`, `design-agent-designer`).
**Rationale**: The two modes share 80% of context (DRL schema, ponytail guardrails, design principles). Splitting them would duplicate the shared rules and require loading both skills for a task that often needs both (analyze → design). A single file with mode-specific sections is simpler to maintain and load.

### Decision: DRL in Host Project Filesystem vs Central Repo

**Choice**: `refs/design/` in the host project.
**Alternatives**: A central `opendesign-references` repo, or Engram-only storage.
**Rationale**: References must be version-controllable with the code they inspired. A central repo adds cross-project coupling and requires a sync step. Filesystem is the simplest shareable medium — `INDEX.md` is human-readable without tooling. Engram alone would lose reference data on compaction.

### Decision: YAML Frontmatter for reference.md

**Choice**: YAML frontmatter (`---` delimited) + free-form Markdown body.
**Alternatives**: Pure JSON (machine-friendly but hard to diff/edit), pure Markdown (no structured query).
**Rationale**: YAML frontmatter is the standard for Markdown files with metadata (Jekyll, Hugo, Obsidian). It's grep-able, diff-friendly in git, and the body can contain long-form analysis. The agent can parse it with standard YAML libraries. No custom schema needed.

### Decision: Open Design MCP — Evaluate After Phase 2

**Choice**: Defer integration until Phase 2 final task.
**Rationale**: The proposal correctly flags this as optional. We cannot evaluate its value-add until the basic pipeline works. If the design-agent already produces good output from DRL + ponytail guardrails, adding Open Design MCP may be YAGNI. Evaluate empirically: compare output quality with vs without before committing.

### Decision: No Separate Test Infrastructure

**Choice**: No dedicated test suite for design-agent.
**Rationale**: The agent's output is code in the host project, which gets verified by `sdd-verify`'s `npm run build`. The agent's own behavior (is the prompt template correct? does it write files?) is exercised during Phases 2 and 3 manual tests. Automated testing of prompt-based code generation is low-value at this stage — the verifier is the build step.

### Decision: Landing Page Removal in Phase 1 (Not Prerequisite)

**Choice**: Landing page removal is part of Phase 1, not a prerequisite phase.
**Rationale**: The removal cleans the slate. Without it, the design agent would generate code that coexists with the old landing page, creating confusion. Doing it in Phase 1 means all subsequent phases work on a clean codebase. Risk is low (simple file deletions with rollback plan) and the benefit is high.

---

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| **DRL grows stale** — references not updated | Medium | Agent updates DRL during reference analysis; no manual maintenance needed |
| **Agent generates broken code** — `npm run build` fails | High | Self-review via ponytail-review; build verification in sdd-verify; rollback always available |
| **Context window overflow** — large DRL + long conversations | Low | Agent reads only matching references from INDEX.md; full reference.md loaded on demand |
| **Video analysis complexity** — not worth the effort | Medium | Deferred to Phase 3; if the heuristic "fetch URL → screenshots" covers 80% of use cases, skip video entirely |

---

## Open Questions

- [ ] Should the DRL INDEX.md be auto-generated (script) or manually maintained by the agent? Proposal implies agent-managed, but need to confirm.
- [ ] For `design-init`, should it install into any project's `.opencode/` or create a standalone `opendesign/` directory?
- [ ] Video analysis: is frame extraction + vision LLM analysis worth the complexity, or is the heuristic approach (analyze screenshots) sufficient for 95% of cases?
