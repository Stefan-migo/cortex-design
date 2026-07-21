# Tasks: design-agent — Design-Code Synthesis Environment

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~425 (Phase 1: ~295 | Phase 2: ~80 | Phase 3: ~50–135) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Delivery strategy | ask-on-risk |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Landing page removal + DRL structure + reference-analyst | PR 1 | Phase 1; standalone, no dependencies on other phases |
| 2 | Agent core: designer mode + agent config + tests | PR 2 | Depends on Phase 1; PR 2 targets main after PR 1 merges |

## Phase 1: Landing Page Removal + DRL + reference-analyst

- [x] 1.1 Create `refs/design/INDEX.md` skeleton with catalog table + conventions section
- [x] 1.2 Create `refs/design/ref-001-template/reference.md` with full YAML frontmatter schema and example body
- [x] 1.3 Write `.opencode/skills/design-agent/SKILL.md` with reference-analyst mode prompt template, DRL schema, and self-review protocol
- [x] 1.4 Delete `src/components/SoftAurora/` directory (SoftAurora.jsx + SoftAurora.css)
- [x] 1.5 Replace `src/App.jsx` (minimal empty component), `src/App.css` (reset-only), `src/main.jsx` (minimal entry rendering App)
- [x] 1.6 Remove `ogl` from `package.json` dependencies, run `npm install` to update lockfile
- [x] 1.7 Run `npm run build` — verify zero errors

## Phase 2: Agent Core — designer Mode + Config + Verification

- [x] 2.1 Remove ponytail stub comment from `.opencode/skills/design-agent/SKILL.md` — designer mode prompt template and rules were already written, stub comment was the only thing blocking
- [x] 2.2 Add `design-agent` agent entry to `.opencode/opencode.json` with skills + MCP references + webfetch builtin MCP
- [ ] 2.5 Manual test: invoke reference-analyst with a URL → verify DRL entry created in `refs/design/`
- [ ] 2.6 Manual test: invoke designer mode with a task + DRL reference → verify code generated
- [ ] 2.7 Evaluate Open Design MCP: research feasibility, compare output quality with/without, document decision

## Phase 3: Design Init + Video Analysis (conditional)

- [ ] 3.1 Write `scripts/design-init.js` bootstrap script: creates `refs/design/`, installs skill, validates opencode.json, reports status
- [ ] 3.2 Manual test: run bootstrap in a clean scenario → agent available
- [ ] 3.3 Evaluate video analysis pipeline: compare screenshot-only heuristic vs frame-extraction quality; document findings
- [ ] 3.4 If analysis justifies it: implement `scripts/analyze-video.js` with frame extraction + vision LLM analysis

### Ponytail Findings

`Section "Phase 3 — Video Pipeline"` → `yagni:` Tasks 3.3 and 3.4 are speculative. The design itself says "if justified" and "screenshot heuristic covers 80%". Keep as conditional gate — skip 3.4 unless 3.3 proves need. `shrink:` Merge 3.3+3.4 → "Evaluate video pipeline; implement frame extraction only if justified."

`Section "Phase 2 — Open Design MCP"` → `yagni:` Task 2.7 evaluates an optional MCP before the core pipeline is stable. Design decisions explicitly defer this to post-Phase 2. No change — already scoped as research-only.

`Section "Phase 3 — design-init script"` → `yagni:` If the agent is already configured via opencode.json (2.2), what does the bootstrap add? Consider dropping 3.1 if 2.2 already makes the agent discoverable. The design's own open questions confirm this ambiguity — keep as conditional.

`Section "Phase 1 — INDEX.md + template"` → `shrink:` Tasks 1.1 and 1.2 are sequential but keep separate: 1.1 is the container, 1.2 is the content. Each has a distinct deliverable.

### Graphify Cross-Reference

Existing graph (7 nodes, 3 edges, 0 communities) captures current codebase only — no design-agent nodes exist yet. The change will add ~5 new knowledge domains (DRL structure, reference-analyst, designer mode, design-init, Engram patterns) on next graphify run. Removed files (SoftAurora, App.jsx, App.css) will become stale nodes — expected, graph should be rebuilt post-change. No uncovered files: every task maps to specified paths.

net: -1 item cut (3.4 marked conditional); -1 item deferred (3.1 needs re-evaluation after 2.2).

## Manual Test Notes (2.5–2.7)

These tasks are NOT automated. They require user interaction. Documented here so the next developer (or the user) knows what to do.

### 2.5 Manual test: reference-analyst with URL

Prerequisites:
- `design-agent` skill loaded (it's in opencode.json now, so the orchestrator picks it up)
- MCPs: `webfetch` (builtin, now configured) + `graphify` (already present)

Steps:
1. Ask the orchestrator: "Analyze this URL for design patterns: {URL}"
2. The orchestrator delegates to `design-agent` in reference-analyst mode
3. Agent fetches the URL, analyzes it, creates `refs/design/ref-NNN-name/reference.md`
4. Agent updates `refs/design/INDEX.md` with the new entry
5. Verify: new directory + files exist under `refs/design/`

Sample URL to test with: any visually rich site (Awwwards nominee, CodePen, etc.)

### 2.6 Manual test: designer mode with task + DRL

Prerequisites:
- At least one DRL entry exists in `refs/design/` (either from 2.5 or the template from 1.2)

Steps:
1. Ask the orchestrator: "Design the hero section using ref-001 patterns"
2. The orchestrator delegates to `design-agent` in designer mode
3. Agent reads DRL references, generates JSX + CSS files
4. Agent runs ponytail-review on generated code
5. Agent writes files to the project
6. Verify: files created, code compiles (`npm run build`)

### 2.7 Evaluate Open Design MCP

This is a research task, not implementation. Investigate:
1. Does the Open Design MCP exist? (research at time of evaluation)
2. What does it provide that webfetch + DRL doesn't?
3. Test both pipelines with the same reference URL → compare output quality
4. Document decision: integrate (with tradeoffs) or skip as YAGNI

Decision criteria from design.md §9: "If the design-agent already produces good output from DRL + ponytail guardrails, adding Open Design MCP may be YAGNI."
