export const categories = [
  { id: 'all', name: 'All' },
  { id: 'text-animations', name: 'Text Animations' },
  { id: 'animations', name: 'Animations' },
  { id: 'components', name: 'Components' },
  { id: 'backgrounds', name: 'Backgrounds' },
]

export const registry = [
  {
    id: 'glitch-text',
    name: 'GlitchText',
    category: 'text-animations',
    description: 'CSS-only glitch text effect with pseudo-element clipping and animated shadows.',
    tags: ['css', 'glitch', 'text'],
    source: 'react-bits',
    import: () => import('../components/TextAnimations/GlitchText'),
    controls: [
      { name: 'children', label: 'Text', type: 'text', default: 'Glitch Effect' },
      { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 2, step: 0.1, default: 0.5 },
      { name: 'enableShadows', label: 'Shadows', type: 'toggle', default: true },
      { name: 'enableOnHover', label: 'On Hover Only', type: 'toggle', default: false },
    ],
    prompt: `Create a GlitchText component that renders text with a CRT glitch effect.

Technique: CSS pseudo-elements (::before/::after) with clip-path keyframe animations.
The pseudo-elements duplicate the text via attr(data-text) and offset it with text-shadow (red left, cyan right). A @keyframes animate-glitch rapidly changes clip-path: inset() values to create the glitch slicing effect.

Key implementation details:
- Render a <div> with data-text={children} attribute (required for pseudo-elements)
- Set CSS custom properties via inline style: --after-duration, --before-duration, --after-shadow, --before-shadow
- CSS ::after gets left:10px, red shadow; ::before gets left:-10px, cyan shadow
- Both pseudo-elements use clip-path: inset() with the animate-glitch keyframe
- When enableOnHover=true, add class "enable-on-hover" — glitch only triggers on :hover
- speed prop controls animation duration (speed*3 for after, speed*2 for before)
- enableShadows=false removes the colored offset shadows

Export as named function: GlitchText`,
  },
  {
    id: 'curved-loop',
    name: 'CurvedLoop',
    category: 'text-animations',
    description: 'SVG text marquee along a curved path with drag-to-scroll interaction.',
    tags: ['svg', 'marquee', 'curve'],
    source: 'react-bits',
    import: () => import('../components/TextAnimations/CurvedLoop'),
    controls: [
      { name: 'marqueeText', label: 'Text', type: 'text', default: 'Cortex Design Library' },
      { name: 'speed', label: 'Speed', type: 'range', min: 0.5, max: 5, step: 0.5, default: 2 },
      { name: 'curveAmount', label: 'Curve', type: 'range', min: 50, max: 800, step: 50, default: 400 },
      { name: 'direction', label: 'Direction', type: 'select', options: ['left', 'right'], default: 'left' },
      { name: 'interactive', label: 'Draggable', type: 'toggle', default: true },
    ],
    prompt: `Create a CurvedLoop component that scrolls text along a curved SVG path with drag interaction.

Technique: SVG <textPath> referencing a quadratic bezier <path>. Text repeats to fill ~1800px of path length. Auto-scroll via requestAnimationFrame offsetting startOffset. Drag-to-scroll via pointer events that temporarily override auto-scroll direction.

Key implementation details:
- Generate a unique path ID with useId() for SVG URL references
- Path: "M-100,40 Q500,{40+curveAmount} 1540,40" (quadratic bezier)
- Hidden measurement <text> element to getComputedTextLength() for spacing
- Repeat text to fill ~1800px: Array(Math.ceil(1800 / spacing) + 2).fill(text).join('')
- Auto-scroll rAF loop: increment startOffset by ±speed, wrap at ±spacing
- Drag: onPointerDown/Move/Up — track clientX delta, apply to startOffset, set direction based on velocity
- visibility:hidden until measurement completes (spacing > 0)

Export as named function: CurvedLoop`,
  },
  {
    id: 'text-pressure',
    name: 'TextPressure',
    category: 'text-animations',
    description: 'Variable font text with per-character proximity response to mouse movement.',
    tags: ['font', 'variable', 'mouse'],
    source: 'react-bits',
    import: () => import('../components/TextAnimations/TextPressure'),
    controls: [
      { name: 'text', label: 'Text', type: 'text', default: 'Compressa' },
      { name: 'flex', label: 'Flex Spacing', type: 'toggle', default: true },
      { name: 'width', label: 'Width Axis', type: 'toggle', default: true },
      { name: 'weight', label: 'Weight Axis', type: 'toggle', default: true },
      { name: 'italic', label: 'Italic Axis', type: 'toggle', default: true },
      { name: 'alpha', label: 'Opacity Axis', type: 'toggle', default: false },
      { name: 'stroke', label: 'Stroke Outline', type: 'toggle', default: false },
    ],
    prompt: `Create a TextPressure component that responds to mouse proximity by varying font-weight, width, and italic axes per character.

Technique: Split text into individual <span> elements inside an <h1>. Track mouse position with requestAnimationFrame and lerp smoothing. For each span, calculate distance from mouse to character center and map it to font-variation-settings values (wght: 100-900, wdth: 5-200, ital: 0-1).

Key implementation details:
- Split text into chars array, render each as <span ref={el => spansRef[i]=el}>
- Mouse position: lerp mouseRef toward cursorRef with /15 smoothing in rAF
- dist(a,b) = sqrt((bx-ax)² + (by-ay)²)
- getAttr(distance, maxDist, minVal, maxVal) maps distance → axis value
- Optimize: only update span.style.fontVariationSettings when value changes
- Load variable font via injected <style> with @import url(fontUrl)
- Use Roboto Flex or similar variable font with wght/wdth/ital axes
- Resize handler: compute fontSize from container width / (chars/2), debounced

Export as named function: TextPressure`,
  },
  {
    id: 'fuzzy-text',
    name: 'FuzzyText',
    category: 'text-animations',
    description: 'Canvas-based scanline distortion effect creating a fuzzy/displaced text appearance.',
    tags: ['canvas', 'distortion', 'scanline'],
    source: 'react-bits',
    import: () => import('../components/TextAnimations/FuzzyText'),
    controls: [
      { name: 'children', label: 'Text', type: 'text', default: 'Fuzzy Text' },
      { name: 'baseIntensity', label: 'Base Intensity', type: 'range', min: 0, max: 1, step: 0.05, default: 0.18 },
      { name: 'hoverIntensity', label: 'Hover Intensity', type: 'range', min: 0, max: 1, step: 0.05, default: 0.5 },
      { name: 'fuzzRange', label: 'Fuzz Range (px)', type: 'range', min: 1, max: 100, step: 1, default: 30 },
      { name: 'direction', label: 'Direction', type: 'select', options: ['horizontal', 'vertical', 'both'], default: 'horizontal' },
      { name: 'fontWeight', label: 'Font Weight', type: 'range', min: 100, max: 900, step: 100, default: 900 },
      { name: 'enableHover', label: 'Hover Effect', type: 'toggle', default: true },
      { name: 'glitchMode', label: 'Glitch Bursts', type: 'toggle', default: false },
    ],
    prompt: `Create a FuzzyText component that renders text with a scanline distortion effect on canvas.

Technique: Render text to an offscreen canvas, then draw each scanline (row of pixels) with a random horizontal/vertical offset proportional to current intensity. This creates a "fuzzy" displacement effect.

Key implementation details:
- Two canvases: offscreen (measurement + text render) + onscreen (distorted output)
- On offscreen: measure text width, render with fillText, apply gradient if provided
- On onscreen: for each row j, drawImage(offscreen, 0, j, w, 1, dx, j+dy, w, 1) — random offset per scanline
- Intensity: baseIntensity (0.18) normally, hoverIntensity (0.5) on hover, 1.0 on click/glitch
- Smooth intensity transitions over transitionDuration
- Frame rate cap at fps (60): only render every 1000/fps ms
- Mouse tracking: check if pointer is inside text bounding box
- Glitch mode: periodically spike intensity to 1.0 for glitchDuration ms
- Font loading: await document.fonts.load(fontString) before measuring
- Touch support with preventDefault

Export as named function: FuzzyText`,
  },
]

export function getByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return registry
  return registry.filter((entry) => entry.category === categoryId)
}

export function getById(id) {
  return registry.find((entry) => entry.id === id)
}
