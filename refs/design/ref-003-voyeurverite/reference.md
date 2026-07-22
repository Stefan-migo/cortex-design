---
name: "Voyeur Vérité — Creative Studio"
source: "https://www.voyeurverite.com/"
source_type: url
analyzed_at: 2026-07-21
analyzed_by: reference-analyst
tags:
  - documentary
  - editorial
  - dark-theme
  - clip-path
  - scroll-driven
  - video-background
  - preloader
  - typography-led
  - svg-morph
  - observational
stack:
  - webflow
  - gsap
  - lenis
  - vanilla-js
techniques:
  - preloader as brand statement (clip-path slit reveal)
  - hero image with overlay + split-title layout
  - clip-path transitions between sections
  - SVG clip-path morphing for image transitions (history section)
  - scroll-driven video background per pillar section
  - fluid typography via complex clamp/calc viewport scaling
  - hidden scrollbar with custom scroll experience
  - pillar hover crossfade (sibling opacity dim)
  - film cards with clip-path reveal on scroll
  - decorative split-text with hidden duplicates for parallax depth
  - contact form with layered blend-mode backgrounds (color-burn, difference, blur)
scroll_behavior: smooth scroll with Lenis, none natively
transitions:
  type: clip-path
  duration: 1200ms
  easing: cubic-bezier(0.19, 1, 0.22, 1)
key_animations:
  - name: preloader-reveal
    description: "Clip-path slit opens from center with horizontal line, loader fill + counter, reveals hero beneath"
    trigger: on-load
  - name: hero-entrance
    description: "Split-title heading with decorative duplicates creating parallax depth on scroll"
    trigger: on-load
  - name: film-card-reveal
    description: "Film cards enter via clip-path expansion on scroll with scale transform"
    trigger: scroll-intersection
    stagger: 120ms
  - name: pillar-scroll
    description: "Each pillar has a dedicated video background that plays per section; hover dims sibling pillars"
    trigger: scroll-pin
  - name: history-svg-morph
    description: "14-step SVG clip-path morph between filmmaker portraits, driven by scroll progress through the section"
    trigger: scroll
  - name: form-layered-bg
    description: "Contact form background uses three stacked layers: color-burn image, difference pattern, blur gradient"
    trigger: on-view
qualitative: "Feels like walking through a gallery where every section has its own atmosphere — dark, cinematic, intentionally slow. The site doesn't just tell you they make documentaries, it makes YOU feel like a subject being observed. The preloader isn't a loading bar, it's a curtain opening."
why_special: >
  Every design decision serves the brand narrative: observation. The preloader
  is a curtain slit opening (clip-path). The hero heading has ghost duplicates
  that create parallax depth as you scroll — you're literally seeing the same
  text from different angles, like observing a subject. The pillars section
  doesn't use icons or illustrations; each value (Truth, Grit, Humility,
  Evolve) gets its own video texture. The history section uses SVG clip-path
  morphing between filmmaker portraits — the mask itself is the transition,
  reinforcing "seeing through different lenses." The contact form has
  blend-mode backgrounds that make you feel like you're being watched.

  The site is Webflow, not React, but the patterns are transportable:
  clip-path as a narrative device, typography as atmosphere, scroll as
  choreography rather than utility, video as texture rather than content.

narrative:
  scroll_journey:
    - section: preloader
      scroll_range: "0%"
      trigger: on-load
      elements: [loader-fill, counter, brand-line]
      stagger: 600ms
      section_transition: "clip-path slit reveal (horizontal center to edges)"
    - section: hero
      scroll_range: "0-15%"
      trigger: after-preloader
      elements: [heading-main, heading-decor-duplicates, hero-image, overlay]
      interaction: "Ghost text duplicates create parallax offset on scroll"
      section_transition: "hero stack collapses upward, films section pushes in from below"
    - section: vv-meaning
      scroll_range: "15-25%"
      trigger: scroll
      elements: [voyeur-definition, vérité-definition]
      section_transition: "fade-up staggered"
    - section: films
      scroll_range: "25-40%"
      trigger: scroll-intersection
      elements: [film-card-1, film-card-2]
      stagger: 120ms
      transition_in: "clip-path horizontal reveal + scale(1.05→1)"
    - section: about
      scroll_range: "40-50%"
      trigger: scroll
      elements: [heading-decorated, body-text, background-image]
      section_transition: "overlay fade + image scale"
    - section: pillars
      scroll_range: "50-70%"
      trigger: scroll-pin
      elements: [truth-video, humility-video, grit-video, evolve-video, text-content]
      behavior: "Each pillar pins and plays its own video BG; hover dims siblings"
      section_transition: "video crossfade between pillars"
    - section: history
      scroll_range: "70-90%"
      trigger: scroll
      elements: [svg-mask, filmmaker-cards, step-nav]
      transition_in: "SVG clip-path morph between portraits driven by scroll progress"
      section_transition: "14-step morph sequence, each step reveals a different filmmaker"
    - section: footer
      scroll_range: "90-100%"
      trigger: scroll
      elements: [socials, shop, nav, contact-form]
      section_transition: "form with layered blend-mode backgrounds"
  interaction_layer:
    - element: "navbar"
      hover: "text opacity shift"
      scroll: "section-aware (links scroll to sections)"
    - element: "film cards"
      hover: "clip-path expand + overlay fade + award badge slides up"
    - element: "pillars"
      hover: "non-hovered pillars dim to 0.5 opacity; hovered pillar content full opacity"
    - element: "history step nav"
      scroll: "progress bar fills as user scrolls through each filmmaker entry"
  choreography:
    rule: "Scroll is the only input — no autoplay, no timed animations beyond the preloader"
    easing_system: "Single curve — cubic-bezier(0.19, 1, 0.22, 1) throughout"
    timing_philosophy: "Slow, deliberate pace. Preloader sets the rhythm. Each section breathes before transitioning."
    scroll_direction_matters: false
    sensory: "Dark theme with red accent (#ee3335). Typography is the primary visual element, images support rather than dominate. Video is texture, not content — muted, looped, atmospheric."
---

## Analysis Notes

This is a masterclass in **brand-driven design**. Every single visual choice maps back to the core idea: "The Art of Observation." The site doesn't just present content — it creates the experience of being observed, of watching, of seeing things from multiple angles.

### Key patterns to replicate

1. **Preloader as narrative device** — not a loading bar but a theatrical curtain opening. The clip-path slit reveal is simple CSS/SVG but sets the emotional tone immediately.

2. **Typography as atmosphere** — the hero heading has visual duplicates (`.hero_heading.u-h1-review.decor`) positioned behind the real text, creating parallax depth on scroll. This is pure CSS, zero JS.

3. **Scroll-driven SVG clip-path morphing** — the history section uses 14 pre-defined SVG path steps and transitions between them on scroll. Each path corresponds to a different filmmaker portrait. The clip-path itself is the narrative device: "seeing through different lenses."

4. **Video as texture** — the pillars section uses video backgrounds not as content but as atmosphere. Each pillar gets its own video texture. On hover, non-hovered pillars dim. Simple, effective, no autoplay.

5. **Blend-mode form backgrounds** — three stacked layers (color-burn, difference, blur) create a surveillance-camera aesthetic for the contact form. Reinforces "being observed."

### Tech notes

- Built on **Webflow** (no React, no framework)
- **Lenis** for smooth scroll
- **GSAP** likely for scroll-driven animations (clip-path morphing, pinning)
- Custom `--vh` CSS variable for mobile viewport
- Fluid typography with 5 breakpoint-specific `font-size: calc()` formulas
- Hidden native scrollbar, custom thin scrollbar on textarea only

### Replication priority for cortex-design

| Pattern | Difficulty | Impact | Priority |
|---------|------------|--------|----------|
| Preloader clip-path reveal | Medium | High | ⭐⭐⭐ |
| SVG clip-path scroll morph | High | High | ⭐⭐⭐ |
| Video as atmospheric texture | Medium | High | ⭐⭐⭐ |
| Decorative text parallax duplicates | Low | Medium | ⭐⭐ |
| Pillar hover crossfade | Low | Medium | ⭐⭐ |
| Blend-mode form backgrounds | Low | Low | ⭐ |

## Replication Notes

- The clip-path animations require `will-change: clip-path` and GPU compositing
- SVG clip-path morphing needs pre-defined path coordinates with matching number of points
- Video as texture needs muted, looped, `playsinline` attributes
- Lenis smooth scroll should be our default for scroll-driven narrative sites
- Typography as primary element means we need strong type scale (this site uses `u-h1-review`, `u-h2-feature`, `u-h3-review`, `u-h4-review`, `u-p1`, `u-p2`)
