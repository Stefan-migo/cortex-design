---
name: "Glenn Catteeuw — Portfolio"
source: "https://glenncatteeuw.com/"
source_type: url
analyzed_at: 2026-07-20
analyzed_by: reference-analyst

tags:
  - scroll-driven
  - infinite-scroll
  - webgl-background
  - split-text
  - preloader-as-intro
  - sound-design
  - smooth-scroll
  - custom-utility-css
  - aggressive-uppercase
  - text-shuffle
  - three-js-multi-scene
  - doom-scroll-easter-egg
  - gsap-choreography

stack:
  - astro-v2
  - vite
  - three-js
  - gsap
  - lenis
  - alpine-js
  - howler
  - custom-scroll-wrapper
  - custom-CSS-utility-framework

techniques:
  - duplicate-list infinite scroll illusion
  - CSS custom property section theming
  - split-text hover swap (translateY 800ms expo-out)
  - background-clip text fill gradient via custom property
  - Three.js multi-scene compositing (8+ render targets)
  - preloader progress as brand reveal
  - sound effects on interaction via Howler
  - fluid typography via vw clamp
  - text character shuffle on enter (Vt class)
  - scroll-velocity-sensitive UI overlay
  - IntersectionObserver + GSAP stagger project media reveal
  - 3D character model rotating with scroll velocity
  - DOOM SCROLL easter egg at 15,000 scroll distance
  - section-scoped CSS variable theming for nav/glow/bg

scroll_behavior: >
  Smooth scroll via Lenis library with a custom wrapper (zp class)
  that tracks velocity, direction, and supports infinite mode. On the
  home page, scroll is infinite (scrollSettings.infinite = true) with
  the project list duplicated (two full lists + one clone inside
  .ui-home-content--clone) creating a seamless infinite scroll illusion.
  When scroll velocity exceeds 15px, a semi-transparent overlay
  appears over the project list to reduce visual noise during fast
  scrolling. Headers are fixed while content scrolls underneath.
  On the About page, scroll accumulates total distance — hitting
  15,000 triggers the DOOM SCROLL easter egg.

transitions:
  type: gsap-driven (expo.out, power3.out) + CSS split-text swap
  duration:
    button-hover: 800ms
    project-media-reveal: 1600ms (power3.out)
    landing-CTA-glow-scale: 1200ms
    text-shuffle-fade: 500ms
    preloader-letter: 65ms per letter
    title-3D-rotateY: 1000ms (expo.out)
    stagger-increment: 20ms per item (project list), 200ms per item (media)
  easing: expo-out cubic-bezier(0.19, 1, 0.22, 1) (primary), power3.out (media reveals)

key_animations:
  - name: preloader-entrance
    description: >
      Loading screen shows "Glenn Catteeuw" split into letter parts,
      revealed in sequence as the progress bar fills from 0 to 100.
      The name IS the preloader — brand identity loads before the page.
    trigger: on-load
  - name: landing-fill
    description: >
      Title and subtitle use background-clip: text with a
      linear-gradient that expands via --text-fill-percent custom
      property. Text appears to "fill in" from bottom-left.
      Title positioned at translate(12.1875rem, -6.1875rem) scale(1.5),
      creating a dramatic overshoot before settling.
    trigger: on-enter-click
  - name: button-hover-split
    description: >
      c-button-text-static translates up -102%, c-button-text-hover
      translates from 102% to 0. Both with 800ms expo-out via CSS.
      Replicated for c-link components with an additional arrow icon
      that animates in from top-right.
    trigger: on-hover
  - name: project-list-reveal
    description: >
      Project links (.gl-text) fade in via GSAP with staggered timing
      (.02 increment per item). The animation order is reverse for the
      first 4 items (indices n-1, n-2, n-3, n-4 first), then the rest
      in order. Each text item also has a custom ScrollTrigger-like
      update that syncs with Lenis scroll position.
      Thumbnails (gl-thumb) slide from right on hover.
    trigger: on-scroll + on-hover
  - name: text-character-shuffle
    description: >
      Vt (ViewText) class shuffles characters on enter: each character
      cycles through random letters before landing on the correct one.
      Configurable shuffle duration (default 500ms), fade duration,
      and can animate opacity per-character or as a block. Used on
      about page description, awards, services, and footer.
    trigger: on-section-enter
  - name: about-3d-character
    description: >
      A 3D character model rendered in an offscreen scene
      (R.aboutScene) then texture-mapped onto a plane
      (R.aboutPlaneScene) that composites into R.mainScene.
      The character rotates on Y axis in response to scroll velocity
      (rotation.y += scroll.velocity * 0.001), creating a live
      scroll-reactive 3D presence.
    trigger: scroll-velocity-driven
  - name: doom-scroll-easter-egg
    description: >
      After accumulating 15,000 units of scroll distance on the
      About page, the title switches to "DOOMSCROLL ACTIVATED",
      a Doom-style 3D character model replaces the normal one,
      fire particles animate in, and the scene becomes demonic.
      Toggle interval for copyright text starts (5s cycle between
      "© Glenn Catteeuw" and "Dev by Rogier de Boevé").
    trigger: 15,000 total scroll distance on About page
  - name: project-media-reveal
    description: >
      Each project-media-item uses IntersectionObserver (threshold
      0.05) with GSAP stagger. The container scales from 0.8 to 1
      with opacity 0→1 over 1600ms (power3.out), while the inner
      [data-media] element scales from 1.3 to 1 over the same
      duration and easing. Videos autoplay on intersection, pause
      on leave.
    trigger: intersection-observer

code_snippets:
  - path: "N/A (external reference)"
    technique: "Split-text hover swap using translateY"
    snippet: |
      .c-button-text-hover {
        position: absolute; top: 0; left: 0;
        transform: translateY(102%); opacity: 0;
      }
      .c-button:hover .c-button-text-static {
        transform: translateY(-102%); opacity: 0;
      }
      .c-button:hover .c-button-text-hover {
        transform: translateY(0); opacity: 1;
      }
      /* Both: transition: transform 0.8s var(--expo-out), opacity 0.8s var(--expo-out) */
  - path: "N/A (external reference)"
    technique: "Clipped text fill via background-clip"
    snippet: |
      .landing-title-part-inner {
        background-image: linear-gradient(
          98deg,
          var(--off-black) var(--text-fill-percent),
          var(--light-gray) var(--text-fill-percent)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
  - path: "N/A (external reference)"
    technique: "WebGL fixed canvas (#gl) behind all UI with multi-scene compositing"
    snippet: |
      // Multiple Three.js scenes rendered to targets and composited:
      // R.skyScene, R.godRaysScene, R.landscapeTextureScene,
      // R.landscapeDisplacementScene, R.thumbScene, R.textScene,
      // R.landscapeScene, R.mainScene, R.noiseScene, R.aboutScene,
      // R.aboutPlaneScene, R.doomAboutScene, R.mediaScene
      // Main composite shader combines tScene, tText, tThumb, tNoise,
      // tGodRays, tMedia via custom uniforms
      #gl { position: fixed; top: 0; left: 0; height: 100vh; width: 100%; opacity: 0; }
  - path: "N/A (external reference)"
    technique: "Section-scoped CSS custom property theming"
    snippet: |
      .ui-home   { --nav-bg: var(--off-white); --main-color: var(--off-white); --glow: rgba(242,242,242,.75); }
      .ui-about  { --main-bg: var(--off-white); --main-color: var(--off-black); --nav-bg: var(--off-black); }
      .ui-project { --glow: rgba(242,242,242,.75); --main-text: var(--off-white); --nav-bg: var(--off-white); }
  - path: "N/A (external reference)"
    technique: "GSAP stagger reveal with IntersectionObserver for project media"
    snippet: |
      // Each item: container scales 0.8→1, inner scales 1.3→1
      // Duration: 1.6s power3.out, stagger: 0.2s per item
      animateItemsWithStagger(items) {
        items.forEach((t, i) => {
          const s = t.querySelector(".ui-project-media-item-container");
          const r = t.querySelector("[data-media]");
          if (!s || !r) return;
          this.animatedItems.add(t);
          const a = i * 0.2;
          gsap.timeline({ delay: a })
            .to(s, { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" })
            .to(r, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
        });
      }

qualitative: >
  The site is a masterclass in making loading feel intentional rather than
  an obstacle. The preloader IS the brand: it reveals "Glenn Catteeuw"
  letter by letter as assets load. The landing screen is purely typographic
  with a text-fill animation, no imagery — letting the type system carry
  the weight of a "brutally uppercase" identity built on Druk and Replica
  Mono. Once inside, the project list scrolls infinitely via a duplicated-list
  technique while an 8+ scene Three.js compositing pipeline runs a
  continuous generative 3D landscape with god rays, displacement maps,
  and a bloom pass — all reacting to scroll velocity.

  The typographic brutality is intentional and functional: every UI label is
  Replica Mono uppercase at small sizes (0.75rem), every project title is
  Druk Bold at 6rem (96px) with 0.8 line-height, creating maximal
  contrast between information and expression. The single easing curve
  (cubic-bezier(0.19, 1, 0.22, 1)) unifies every animation — buttons,
  text reveals, transitions — creating a kinetic language that feels
  physically motivated rather than mechanically triggered.

  The scroll-velocity-sensitive overlay (opacity triggered at > 15px/s)
  is a subtle but brilliant UX touch: during fast scrolling, a semi-transparent
  overlay dampens the visual noise of the project list, letting the user focus
  on the Three.js background. When scrolling slows, the overlay disappears
  and projects become interactive again. This is scroll as a volume knob,
  not a binary switch.

  The sound layer (Howler.js) adds physical texture: hover sounds on nav
  items, ambient drones that shift frequency between sections, and a
  dramatic audio cue for the DOOM SCROLL easter egg. The sound toggle
  in the corner is always accessible and respects user preference.

  The DOOM SCROLL easter egg on the about page is the kind of
  personality-driven detail that transforms a portfolio from impressive
  to memorable. Accumulate 15,000 scroll units and the page literally
  turns into Doom — character model swaps to a Doomguy, fire particles
  erupt, the title reads "DOOMSCROLL ACTIVATED." The copyright text
  starts toggling every 5 seconds between "© Glenn Catteeuw" and
  "Dev by Rogier de Boevé." It's absurd, executed beautifully, and
  perfectly aligned with the brand tone ("i like creating cool sh*t").

why_special: >
  Five things set this apart from other award-winning portfolios:

  1. The preloader-as-identity: instead of a spinner or progress bar,
     the loading screen IS the hero — "Glenn Catteeuw" appears letter
     by letter as the progress counter climbs from 0/100 to 100/100.
     Turning wait time into brand imprinting is a UX insight most
     portfolios miss entirely.

  2. The duplicate-list infinite scroll: the project carousel never
     ends because the list is cloned. Combined with Lenis smooth scroll
     and scroll-velocity damping, it creates a hypnotic browsing rhythm
     that keeps you scrolling. The 0.02s stagger per project item
     (with reversed priority for the first 4 visible) ensures the
     viewport always has something animating.

  3. The multi-scene Three.js compositing: rather than a single WebGL
     scene, Glenn's site renders 8+ scenes (sky, god rays, landscape
     texture, landscape displacement, thumbnails, text, main composite,
     noise, media) into a pipeline. Each scene writes to a render
     target that feeds into the next via custom uniforms in a
     composite shader. This architectural choice allows modular
     effects (god rays over landscape, bloom over composite, noise
     overlay) without a monolithic shader.

  4. The DOOM SCROLL easter egg: this is the kind of absurd,
     personality-driven detail that makes a site memorable. It's not
     just a gimmick — it signals that the creator has a sense of humor
     and cares about delight. The execution is technically impressive
     (model swap, particle fire, audio cues) and perfectly on-brand
     for an Interactive Art Director who lists "Game Design" as a
     service and has a playable Snake-like game on the site.

  5. The sound layer as texture, not gimmick: hover sounds via Howler
     have distinct cases (ambient drones vs. click feedback). The
     sound toggle persists state and the "Enter without sound" option
     on the landing page shows accessibility awareness. The sound
     frequency adjusts per section (ambient frequency 1 on home,
     0.35-0.65 on about/project), creating a subtle audio narrative
     that matches the visual narrative.

  Performance-wise, running a multi-scene Three.js compositing pipeline
  behind scroll-driven DOM reveals at 60fps is a serious technical
  achievement. The fluid type scale (4.10256vw clamped to 16px mobile,
  1.11111vw to 22px desktop) ensures readability without breakpoint-
  specific sizes. The 24-column grid system with 16px gaps provides
  consistent rhythm across all three layouts (home, about, project).

narrative:
  scroll_journey:
    - section: "preloader"
      scroll_range: "0-10% (time-based, not scroll-based)"
      trigger: on-load (automatic, 0 user control)
      elements: [preloader-letters, progress-counter, status-text]
      stagger: "65ms per character in 'Glenn' and 'Catteeuw'"
      section_transition: "Preloader fades out (opacity 0, 800ms), landing fades in"
      notes: "Not scroll-driven. The entire preloader is a forced wait state transformed into brand reveal. Progress counter climbs 0/100 → 100/100 as assets load. Two CTAs appear: 'Enter' (with sound, has 3D WebGL hoverable container) and 'Enter without sound' (text only)."

    - section: "landing"
      scroll_range: "10-25% (time-based pause, user clicks Enter)"
      behavior: fixed fullscreen
      trigger: after-preloader-dismissed + user-click
      elements: [title-fill, subtitle-fill, cta-button, cta-no-sound]
      stagger: "Title→subtitle→CTA sequence, each 200ms offset. Title parts (Glenn / Catteeuw) have staggered 3D rotateY entrance, subtitle parts (Interactive / Art Director) rotate from opposite origin."
      section_transition: "On Enter click: landing dissolves, home page slides/fades in. Title/subtitle have 3D perspective transform (perspective: 1000px, transform-style: preserve-3d). Title positioned at translate(12.1875rem, -6.1875rem) scale(1.5), subtitle at translate(-16.25rem, 4.1875rem) scale(1.5) — extreme offset that resolves during animation."
      notes: "The landing is not scrollable — it's a click-through gateway. The 'Enter' CTA has a Three.js scene inside its container (landing-cta-gl-container) that's a separate WebGL context. Hovering the CTA scales the container to 1.225x over 1200ms expo-out. The text indicators (two ▸-like dots) translate left/right on hover."

    - section: "home-header"
      scroll_range: "25-30%"
      behavior: fixed, opacity 0→1 on enter
      trigger: page-transition-complete (GSAP animation)
      elements: [home-nav, header-title "Portfolio of Glenn Catteeuw", header-subtitle "Interactive Art Director", header-availability]
      stagger: "Nav buttons first (50ms between each), then header parts (opacity, 500ms), then text shuffles for title parts and subtitle parts"
      section_transition: "Header stays fixed on screen. Project list scrolls underneath it. The header has indicator dots (▸) that animate as decoration."
      notes: "The header subtitle has a padding-bottom of 20vh, pushing it toward the bottom of the viewport. The entire header occupies full viewport height as a fixed overlay while projects scroll beneath."

    - section: "projects"
      scroll_range: "30-90%"
      behavior: smooth-scroll + infinite-loop (duplicated list)
      trigger: scroll (Lenis-driven)
      elements:
        - "project-links (16 items, each with .gl-text class)"
        - "project-thumbnails (gl-thumb, hidden off-screen right)"
        - "Three.js landscape scene (continuous, scroll-reactive)"
      stagger: "0.02s per item, but first 4 items animate in REVERSE order (indices n-1, n-2, n-3, n-4 first). This ensures the viewport fills from bottom-up — items closest to the top of viewport appear last."
      section_transition: "Each project fades in with text instance scroll sync. Thumbnail appears from right edge (translateX 100%) on hover at 600ms expo. Non-hovered text items dim to 0.65 opacity. Italic toggle on hover for text."
      notes: >
        This is the core of the experience. The project list is duplicated
        three times: two in .ui-home-content + one clone in
        .ui-home-content--clone. Lenis scrolls the whole document, and
        the clone creates the illusion of endless content. On resize,
        scroll resets to the clone position.

        The Scroll-sensitive overlay (ui-home-overlay) appears when
        scroll velocity > 15px/s and disappears when velocity drops.
        This is a volume-knob approach to UI — fast scrolling means
        the user is browsing, not reading, so project details are
        hidden.

        The Three.js background has multiple layers:
        - sky scene (sky gradient + sun)
        - god rays scene (volumetric light rays)
        - landscape scene (3D terrain with displacement map)
        - landscape texture scene (texture for the landscape)
        - noise scene (grain overlay)
        These are piped into a main composite scene via custom shader
        uniforms. Bloom is applied at 0.5 strength, adjustable per
        section.

    - section: "project-detail (victorinox example)"
      scroll_range: "N/A (separate page, not on home)"
      behavior: normal scroll (not infinite)
      trigger: page-transition
      elements:
        - "fixed info panel (title, description, details)"
        - "media items with lazy loading + video"
        - "footer with 'next project' navigation"
      stagger: "Title rotateY (1s expo.out, stagger 0.075), media items opacity 0→1 (2s expo.out, stagger 0.1, delay 0.15), detail text shuffle (500ms)"
      section_transition: "Page transition via GSAP. Media items revealed via IntersectionObserver with scale (0.8→1 container, 1.3→1 inner) over 1.6s power3.out, stagger 0.2s per item."
      notes: "Project page has its own Three.js layout: landscape scene with project-specific settings (spotLightIntensity 0.25, mapAlpha 0.1, godRays 0). The landscape scrolls with page progress (0-30 units mapped to scroll progress 0-100%)."

    - section: "about"
      scroll_range: "N/A (separate page)"
      behavior: normal scroll, infinite on desktop, non-infinite on mobile
      trigger: page-transition
      elements:
        - "header (title + description + 3D character visual)"
        - "content sections (awards, services, clients, agencies)"
        - "footer (links + copyright)"
      stagger: "Title parts rotateY (1s expo.out, stagger 0.075), description paragraphs shuffle (500ms), section titles shuffle, list items shuffle"
      section_transition: "Page transition. 3D character rotates with scroll velocity. Content sections shuffle-enter on appear."
      notes: >
        The About page has a DOOM SCROLL easter egg: accumulate
        15,000 total scroll distance and the page transforms.
        Character model swaps to Doomguy, fire particles erupt,
        title reads "DOOMSCROLL ACTIVATED," and copyright text
        starts toggling every 5 seconds. The scroll distance
        is accumulated by tracking total absolute velocity
        (Math.abs(scroll.lastVelocity) summed) and resetting
        on direction change. This is a one-time trigger per session.

        The 3D character on About is rendered to an offscreen
        Three.js scene (R.aboutScene) which is then texture-mapped
        onto a plane (R.aboutPlaneScene) to avoid z-fighting
        with the main WebGL pipeline. The character has separate
        rotatable parts (rotatableMesh) for head/body rotation.

    - section: "game"
      scroll_range: "N/A (separate page, no scroll)"
      behavior: fixed full-screen canvas
      trigger: page-transition
      elements:
        - "countdown (3-2-1 start)"
        - "tutorial overlay (arrow keys navigation)"
        - "score display (fixed top-left)"
        - "level display (fixed top-center)"
        - "lives display (fixed bottom-center)"
        - "game log (fixed bottom-left)"
        - "end screen (congrats with confetti or game over with fire/skulls)"
      notes: "A playable Snake-like game. This is the 'Interactive' in 'Interactive Art Director' — it's not just decoration, it's a functional game that doubles as a hiring pitch ('You scored X points! But this wasn't just a game. It was a test. You passed. Now Hire me.'). The end screen has confetti canvas + dancing character on win, fire + skull canvases on lose."

  interaction_layer:
    - element: "project-list-items"
      hover: >
        Text instance opacity: hovered item → 1.0, all others → 0.65 (500ms linear).
        Italic toggle: hovered item italicizes (gsap animateItalic 1),
        others return to normal (animateItalic 0 with power1.out, 500ms).
        Thumbnail slides in from right (translateX 100%→0, 600ms expo).
      scroll: "Fade in with text-scroll sync. Hovered state resets 100ms after mouseleave."
      click: "Transitions to project page via custom router (data-transition='to-project'). Overlay blocks clicks during fast scroll."

    - element: "navigation-buttons"
      hover: "Split-text translateY swap (800ms expo-out). Background pill has scaleX/scaleY animation via GSAP (0→1, 800ms expo.out)."
      scroll: "Fixed position, bg color changes per page section via CSS custom properties. .ui-nav--dark variant for about/project pages."
      click: "Alpine.js router navigation. Sound effect plays. Page transition animation."

    - element: "landing-cta"
      hover: "Container scales to 1.225x (1200ms expo-out). Text indicators translate left/right. WebGL scene inside container is interactive."
      click: "Transitions to home page. Sound plays. GSAP timeline: landing dissolves, home animates in."

    - element: "sound-toggle"
      hover: "No special effect."
      click: "Toggles sound on/off. Circle elements around icon animate outward. State persists via Alpine.js store ($store.global). Changes color per section."

    - element: "about-character-visual"
      hover: "Clickable area scales in/out. On click: button moves to visual position, description fades, 3D character click-to-expand interaction."
      scroll: "Character rotates on Y axis proportionally to scroll velocity (rotation.y += velocity * 0.001). Visual overlay reveals on scroll."
      click: "Expands the character visual area. GSAP timeline moves the email button into the visual area, fades description, toggles active state."

    - element: "email-hover-copy"
      hover: "No special effect."
      click: "Copies email to clipboard. Shows playful notifier with escalating messages ('email copied!' → 'still the same email...' → ... → 'Leave me alone!'). Messages cycle through 12 variants. Counter resets after 3s of inactivity."

    - element: "project-footer-title"
      hover: "Title translates right 0.25rem and skews -0.15rad (transition: transform 1.25s var(--expo-out)). Non-hovered footer part dims to 0.5 opacity."
      click: "Navigates to next project or mailto."

  choreography:
    rule: "Scroll velocity drives intensity. Fast scrolling = abstract background + dimmed UI. Slow scrolling = full clarity + micro-interactions. The overlay is a volume knob, not a binary toggle."
    easing_system: >
      Two primary easing curves:
      1. --expo-out: cubic-bezier(0.19, 1, 0.22, 1) — used for ALL button hover,
      text split, title rotateY, and general UI animations. This is the brand curve.
      2. power3.out / power3.inOut — used for heavy reveals: media items (1.6s),
      page transitions (1.8s), character visual click (0.8s power3.inOut).
      3. linear / none — used for opacity fades of groups (0.3-0.5s).
      4. power1.out — used for subtle transitions (italic toggle on text items).
    timing_philosophy: >
      Three distinct tempos:
      - SLOW (2.5s+): Preloader letter reveal, landing text fill, page transitions.
        These are moments of anticipation and arrival.
      - MEDIUM (0.8-1.6s): Button split, project media reveal, title rotateY.
        These are interaction feedback and content reveals.
      - FAST (0.02-0.5s): Text shuffles, stagger increments, opacity dimming.
        These are secondary details that shouldn't block the user.
      The pacing arc goes: slow (preloader) → dramatic (landing reveal) →
      hypnotic (infinite project scroll) → deliberate (project pages).
    scroll_direction_matters: true
    notes: >
      Scroll direction determines overlay behavior (velocity-based, not
      direction-based on home), but direction IS tracked for the DOOM
      SCROLL easter egg. On the about page, the scroll distance accumulator
      resets when direction changes (e !== this.lastScrollDirection →
      scrollDistance = 0). This means the DOOM SCROLL trigger requires
      15,000 units of sustained scrolling in ONE direction — you have to
      seriously commit to doomscrolling.

      The Three.js landscape reacts to both scroll position and velocity:
      - Normal scroll: landscape moves with scroll progress (0-30 units
        mapped to 0-100% page scroll)
      - Fast scroll: landscape displacement updates faster due to velocity
        amplification

      Sound ambient frequency also responds to section transitions:
      - Home: ambient frequency 1.0
      - About/Project: ambient frequency drops to 0.35-0.65
      This creates a subtle audio ducking effect during content reading.
---
