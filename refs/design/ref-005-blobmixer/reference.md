---
name: "Blobmixer by 14islands — 3D Blob Creator"
source: "https://blobmixer.14islands.com/"
source_type: url
analyzed_at: 2026-07-21
analyzed_by: reference-analyst
tags:
  - webgl
  - threejs
  - 3d
  - creative-tech
  - interactive
  - loading
  - blob
  - morph
  - vr
  - dark-theme
  - generative
stack:
  - react
  - three-js
  - react-three-fiber
  - webgl
  - create-react-app
techniques:
  - 3D blob mesh morphing with vertex displacement
  - CSS border-radius blob loader animation
  - SVG hover fill transition on VR icon
  - link underline scaleX reveal on hover
  - staggered loading dots animation
  - rotating ring CTA with fade-in entrance
  - overlay fade-in + X close button reveal
  - notification bounce + fade in/out
  - floating animation for UI elements
  - blink animation for export state
  - fade out/in combo for transitions
scroll_behavior: no scroll — single-screen interactive experience
transitions:
  type: css-fade
  duration: 300ms-1s
  easing: ease-out, ease-in-out
key_animations:
  - name: loader-blob-morph
    description: "CSS border-radius + scale morph on a fixed black circle — 2s infinite alternate, creates organic blob feel while WebGL loads"
    trigger: on-load
    pattern_id: NEW — border-radius morph
  - name: remix-cta-rotate
    description: "Full rotation of a circular ring SVG around the CTA button, continuous"
    trigger: on-view
    pattern_id: "1.5 Rotate In (modified: continuous)"
  - name: remix-cta-fade-in
    description: "Fade in the entire CTA section, 1s ease-out, backwards fill"
    trigger: on-view
    pattern_id: "1.1 Fade In"
  - name: loading-dots-stagger
    description: "Three dots with staggered animation timing for loading state"
    trigger: on-load
    pattern_id: "4.2 Stagger Cascade (modified: infinite loop)"
  - name: overlay-fade-in
    description: "UI overlay fades in when triggered"
    trigger: on-action
    pattern_id: "1.1 Fade In"
  - name: notification-bounce
    description: "Notification bounces in to grab attention"
    trigger: on-action
    pattern_id: NEW — bounce entrance
  - name: success-mint-animation
    description: "Success state animation for Web3 minting flow"
    trigger: on-action
    pattern_id: NEW — success state
  - name: floating-3d-element
    description: "UI element floats gently up and down (Web3 view)"
    trigger: on-view
    pattern_id: NEW — floating/levitate
  - name: blink-export
    description: "Export view blinks to indicate recording/exporting state"
    trigger: on-action
    pattern_id: NEW — blink
  - name: hover-underline-reveal
    description: "Link underline scales from 0→1 on hover, 300ms ease-circ-out"
    trigger: hover
    pattern_id: "3.2 Glow / Border Accent (modified: underline variant)"
  - name: hover-svg-fill
    description: "VR headset icon fills with white on hover, 0.3s ease-out"
    trigger: hover
    pattern_id: NEW — SVG hover morph fill
qualitative: "Feels like a living organism — the blob loader morphing before the 3D scene loads sets the expectation that you're about to play with something organic. The dark canvas with sparse white UI overlays gives it a gallery/museum vibe. Every micro-interaction (link underline, VR icon fill, notification bounce) is polished without being showy."
why_special: >
  The magic is in the LOADER. Before any WebGL loads, a CSS blob
  (border-radius morphing + scale pulsing) sits on screen. It's not
  a spinner or a progress bar — it's a TASTE of what's coming. The
  blob shape itself hints at the 3D blob creator waiting behind the
  loader. This is brilliant brand-driven loading: the loading state
  IS the product.

  The rest of the UI is intentionally minimal: the 3D blob IS the
  hero. Controls overlay with clean fade transitions. The Remix CTA
  with its rotating ring is the only decorative element — everything
  else steps back and lets the WebGL speak.

  For replication: the loader-as-taste pattern is huge. Instead of
  a spinner, animate something that previews the experience. Also
  note the simplicity: no scroll, no multi-section, just one canvas
  with floating UI overlays. Sometimes the best animation is knowing
  when NOT to animate.

animation_patterns:
  - pattern_id: "NEW — border-radius morph"
    description: "CSS blob loader where border-radius values cycle through organic shapes. 2s infinite alternate, scale oscillates between 0.9 and 1.0."
    code_snippet: |
      @keyframes blob {
        0%   { transform: scale(0.9); border-radius: 51% 49% 51% 49% / 45% 44% 56% 55%; }
        33%  { transform: scale(1);   border-radius: 54% 46% 54% 46% / 45% 46% 54% 55%; }
        66%  { transform: scale(0.9); border-radius: 48% 52% 48% 52% / 49% 41% 59% 51%; }
        100% { transform: scale(1);   border-radius: 51% 49% 51% 49% / 45% 44% 56% 55%; }
      }
  - pattern_id: "NEW — floating/levitate"
    description: "Element gently floats up and down continuously. Creates a hover-in-place effect."
    code_snippet: |
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-10px); }
      }
  - pattern_id: "NEW — SVG hover morph fill"
    description: "SVG element transitions its fill color on hover, 0.3s ease-out."
    code_snippet: |
      .icon svg { fill: transparent; transition: fill 0.3s ease-out; }
      .icon:hover svg { fill: currentColor; }
  - pattern_id: "NEW — bounce entrance"
    description: "Element bounces in for attention-grabbing notifications."
    code_snippet: |
      @keyframes bounceIn {
        0%   { transform: scale(0); opacity: 0; }
        50%  { transform: scale(1.15); }
        100% { transform: scale(1); opacity: 1; }
      }
  - pattern_id: "NEW — blink"
    description: "Element blinks (opacity toggle) to indicate active/recording state."
    code_snippet: |
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50%      { opacity: 0; }
      }
  - pattern_id: "NEW — fade out/in combo"
    description: "Element fades out, then fades back in. Used for content transitions."
    code_snippet: |
      @keyframes fadeOutIn {
        0%   { opacity: 1; }
        50%  { opacity: 0; }
        100% { opacity: 1; }
      }

narrative:
  interaction_layer:
    - element: "VR button"
      hover: "SVG fill transition (transparent → white), 0.3s"
    - element: "links"
      hover: "underline scaleX(0→1) reveal, 300ms, ease-circ-out"
    - element: "Remix CTA ring"
      state: "continuous rotation, 1s infinite linear"
    - element: "notifications"
      entrance: "bounce + fade in"
  choreography:
    rule: "The 3D scene is the hero — UI fades in and out quietly, never competing with WebGL"
    easing_system: "Circular easing for interactions (ease-circ-out), linear for continuous rotation"
    timing_philosophy: "Fast micro-interactions (300ms), slow reveals for overlays (1s)"
    scroll_direction_matters: false
    sensory: "Dark canvas (#141518) with pure white UI text and sparse accents. The only 'decoration' is the Remix rotating ring and the 3D blobs themselves. High contrast, minimal chrome."
---

## Analysis Notes

### What makes this special

The **loader-as-taste** pattern is pure genius. En lugar de un spinner genérico, el loader es un blob CSS con border-radius morphing que te da una PISTA de lo que viene (blobs 3D). Es sutil pero poderoso — el loading state YA es parte de la experiencia.

### Patterns to add to ref-004

These animations aren't in the library yet — sugiero agregarlos:

| Pattern | Category | Código |
|---------|----------|--------|
| **Border-radius morph** | Loader/Special | CSS @keyframes con border-radius variables |
| **Floating/Levitate** | Hover/State | translateY loop |
| **SVG hover fill** | Hover | fill transition |
| **Bounce entrance** | Entrada | scale(0→1.15→1) |
| **Blink** | State | opacity toggle |
| **Fade out/in combo** | Transición | opacity 1→0→1 |

### Key replication insight

La lección más grande de este sitio no es cómo anima, sino **CUÁNDO** anima. Es un sitio de una sola pantalla, sin scroll, sin secciones. La animación está en:
1. El loader (preview de la experiencia)
2. Micro-interacciones (hover, transiciones de overlay)
3. El 3D mismo

Para nuestro cortex-design, esto refuerza: no todo necesita ser scroll storytelling. A veces la experiencia es "llegar, jugar, irse" — y la animación está en los micro-detalles.

### Tech notes

- React + Three.js (React Three Fiber probablemente)
- Create React App (Webpack bundle)
- CSS Modules (nombres como `RemixCTA_ring__DNx4z`)
- WebXR / VR support
- Custom font: Aften Screen
- Analytics: Google Analytics (G-N7LP24CMNH)
