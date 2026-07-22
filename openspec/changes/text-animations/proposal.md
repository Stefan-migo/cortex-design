# TextAnimations — React Bits Clone

## Intent
Clone 4 pure React/CSS TextAnimation components from React Bits into our Cortex Design Library, using strict TDD (tests first).

## Components

| Component | Source | Approach | Priority |
|-----------|--------|----------|----------|
| GlitchText | React Bits | CSS pseudo-elements, pure declarative | 1 |
| CurvedLoop | React Bits | SVG textPath + rAF | 2 |
| TextPressure | React Bits | DOM + font-variation + mouse tracking | 3 |
| FuzzyText | React Bits | Canvas 2D scanline distortion | 4 |

## Scope
- IN: 4 components adapted to JSX + CSS, zero external deps, strict TDD
- OUT: Other 19 TextAnimations (use motion/gsap/three), npm package, TypeScript

## Tests per component
- Render without crashing
- Accept text/children prop
- Render correct HTML structure
- Apply className prop
- Cleanup on unmount (event listeners, rAF, canvas)
