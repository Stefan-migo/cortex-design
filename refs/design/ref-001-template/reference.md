---
name: "Awwwards Nominee — XYZ Studio"
source: "https://xyz-studio.com"
source_type: url
analyzed_at: 2026-07-20
analyzed_by: reference-analyst

tags:
  - scroll-triggered
  - parallax
  - gradient
  - ogl-webgl
  - react

stack:
  - vite
  - react
  - ogl
  - framer-motion

techniques:
  - scroll-driven opacity gradients
  - perspective parallax layers
  - WebGL mesh transitions
  - intersection-observer reveal

scroll_behavior: sticky + reveal-on-scroll

transitions:
  type: fade-slide
  duration: 800ms
  easing: ease-out-cubic

key_animations:
  - name: hero-entrance
    description: "Mesh morph + text reveal, 1.2s staggered"
    trigger: on-load
  - name: section-divider
    description: "Clip-path reveal on intersection"
    trigger: on-scroll

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
    - section: "footer"
      scroll_range: "80-100%"
      transition_in: "morph bg color + scale"
  interaction_layer:
    - element: "navigation"
      hover: "split-text translateY, 0.8s expo"
      scroll: "bg color changes at section boundaries"
    - element: "project items"
      hover: "thumbnail slide from right, 0.6s expo"
      click: "navigate to project"
  choreography:
    rule: "Every transition is physically motivated by scroll direction (up ≠ down)"
    easing_system: "Single curve throughout — cubic-bezier(0.19, 1, 0.22, 1)"
    timing_philosophy: "Slow deliberate hero → faster content reveals → smooth transitions"
    scroll_direction_matters: true

code_snippets:
  - path: "src/sections/Hero.jsx"
    technique: "scroll-driven opacity via IntersectionObserver"
  - path: "src/animations/meshTransition.js"
    technique: "OGL noise displacement"

qualitative: >
  Feels like liquid paper — scroll drives everything,
  nothing auto-plays. Every section transition is
  physically motivated.

why_special: >
  Every section transition is physically motivated
  (scroll direction matters). Performance is maintained
  despite heavy WebGL — techniques chosen for 60fps
  on mid-range devices.
---

## Analysis Notes

Additional observations, patterns to replicate, or context that doesn't fit
structured fields. This section grows as the reference is revisited.

## Replication Notes

- The scroll-driven opacity requires `IntersectionObserver` with `threshold: [0, 0.25, 0.5, 0.75, 1]`
- The parallax effect uses `transform-style: preserve-3d` on the parent, `translateZ` per layer
- WebGL mesh transitions use OGL's `GPGPU` noise displacement for organic-looking reveals
