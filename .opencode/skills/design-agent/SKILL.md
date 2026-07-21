# Skill: design-agent

Design-code synthesis agent with two internal modes:
1. **reference-analyst** — analyze visual references into structured DRL entries
2. **designer** — use DRL + project context to generate frontend code

## Principles

- **CONCRETE OVER ABSTRACT**: every design decision must cite a DRL reference or a project-specific constraint. No generic "best practices."
- **CODE OVER MOCKUP**: the output is working code, not Figma exports or image assets.
- **PONYTAIL GUARDRAILS**: every generated component goes through ponytail-review before being written. Over-engineered CSS? Delete. Unused animation variants? Cut.
- **DRL-FIRST**: read relevant DRL entries before generating anything. The DRL is the project's taste; the agent executes within it.

## DRL Schema

### Directory Structure

```
refs/design/
├── INDEX.md                           ← Catalog: one line per reference
├── ref-001-template/
│   └── reference.md                   ← Required: the analysis
└── ref-002-xxxx/
    └── reference.md
```

### INDEX.md Format

```markdown
| # | Name | Tags | Stack | Analyzed |
|---|------|------|-------|----------|
| 001 | Awwwards Nominee — XYZ Studio | scroll-triggered, parallax | vite, react, ogl | 2026-07-20 |
```

Conventions:
- Reference names are kebab-case, auto-generated from the source title
- Each reference has exactly one `reference.md`
- INDEX.md is regenerated after every add/remove
- Tags are lowercase, free-form
- `qualitative` and `why_special` are required fields

### reference.md Schema (YAML frontmatter)

```yaml
---
name: "Awwwards Nominee — XYZ Studio"
source: "https://xyz-studio.com"
source_type: url                              # url | image | video | local
analyzed_at: 2026-07-20
analyzed_by: reference-analyst                # tool that created it
tags: [scroll-triggered, parallax]            # free-form, lowercase
stack: [vite, react, ogl]                     # technology stack observed
techniques: ["scroll-driven opacity"]         # specific techniques used
scroll_behavior: sticky + reveal-on-scroll    # smooth | sticky | snap | parallax | none
transitions: { type: fade-slide, duration: 800ms, easing: ease-out-cubic }
key_animations:
  - name: hero-entrance
    description: "Mesh morph + text reveal, 1.2s staggered"
    trigger: on-load
code_snippets:
  - path: "src/sections/Hero.jsx"
    technique: "scroll-driven opacity via IntersectionObserver"
qualitative: "Feels like liquid paper — scroll drives everything"
why_special: "Every section transition is physically motivated"

# ── Narrative structure (scroll storytelling) ──
narrative:
  scroll_journey:
    - section: "hero"
      scroll_range: "0-20%"
      trigger: on-load
      elements: [preloader, title, subtitle, cta]
      stagger: "200ms per element"
      section_transition: "fade-slide-up (800ms, expo-out)"
    - section: "content"
      scroll_range: "20-80%"
      behavior: sticky-header
      reveal: intersection-observer cascade
      transition_in: "clip-path reveal"
      transition_out: "opacity fade 1.2s"
  interaction_layer:
    - element: "navigation"
      hover: "split-text translateY, 0.8s expo"
      scroll: "bg color changes at section boundaries"
  choreography:
    rule: "Every transition is physically motivated by scroll direction"
    easing_system: "Single curve — cubic-bezier(0.19, 1, 0.22, 1)"
    timing_philosophy: "Slow hero → faster content → smooth transitions"
    scroll_direction_matters: true
---

## Analysis Notes

## Replication Notes
```

### How References Are Generated

1. User provides a URL, image, or video reference
2. Agent fetches URL (web MCP) or processes uploaded image/video
3. Agent analyzes using its reference-analyst prompt template
4. Agent extracts: tags, stack, techniques, scroll behavior, transitions, animations
5. Agent writes qualitative + why_special fields (the key to non-generic output)
6. Agent saves to `refs/design/ref-NNN-name/` and updates INDEX.md

Naming convention: sequential ID from `ref-001-` onward, sourced from `INDEX.md`'s last entry.

### How References Are Queried

- By tag: grep INDEX.md or read INDEX.md section headers
- By stack: filter by stack matching
- By technique: free-text search in `techniques` list or qualitative body

The agent receives the full INDEX.md as context and reads full `reference.md` files for matching entries.

## Mode: reference-analyst

Trigger: User provides URL, image, or video for design analysis.

Prompt template:
```
You are a design reference analyst. Given the following reference, produce a
structured analysis.

REFERENCE: {url or description}

Analyze:
1. What design system patterns do you observe? (palette, type scale, spacing grid)
2. How does scroll work? (behavior, speed, direction influence)
3. What transitions and animations are used? (type, duration, easing, triggers)
4. What technical stack does this imply? (React? Canvas? WebGL? GSAP?)
5. What makes this feel special? (qualitative — be specific, don't say "smooth")
6. What techniques could we replicate? (be concrete: CSS, JS API, library)

### Narrative Analysis (CRITICAL for scroll storytelling)
7. Map the scroll journey: section by section, what scroll range does each span?
8. What triggers each section transition? (intersection, scroll percentage, sticky)
9. How does the interaction change per section? (hover effects, cursor, nav bg)
10. Does scroll direction (up vs down) matter? Are animations different?
11. What is the pacing philosophy? When is it slow vs fast?
12. How are stagers used between elements? (timing, order, cascade)

Output as YAML frontmatter matching the DRL reference.md schema.
Include:
- `narrative.scroll_journey[]` — ordered sections with scroll_range, trigger, elements, stagger, section_transition
- `narrative.interaction_layer[]` — element behaviors per section
- `narrative.choreography` — global rules (easing, timing philosophy, direction matters)
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

### STEP 1: Plan the scroll journey (write this down BEFORE coding)
- Divide the task into sections (min 2, max 5)
- For each section: what scroll range, what trigger, what elements, what stagger
- How does each section TRANSITION to the next? (clip-path, fade, morph, slide)
- Does scroll direction (up vs down) change the animation?
- What is the pacing? Which sections are slow/deliberate vs fast?
- Write this as a comment block at the top of your first file

### STEP 2: Design the interaction layer
- What happens on hover for each interactive element?
- What changes between sections? (nav bg, cursor, sound)
- What micro-interactions exist? (button ripple, card lift, text reveal)

### STEP 3: Implement
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
6. Write files to {project_path}. Do NOT create placeholder files.
7. Save what you learned to Engram: design decisions, patterns discovered, references used.
```

## Skills loaded by this agent

- `ponytail-plan`: review task before coding
- `ponytail-review`: review generated code for over-engineering
- `design-agent`: self (this skill)

## Self-review protocol

After every code generation pass:

1. Read the generated files
2. Run ponytail-review on the diff
3. If ponytail flags something, fix it before writing
4. Only write to disk after clean review or acknowledged deviation
