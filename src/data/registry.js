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

  /* ── Animations ── */
  {
    id: 'animated-content',
    name: 'AnimatedContent',
    category: 'animations',
    description: 'Content that animates in on scroll with per-letter or per-word staggered reveal.',
    tags: ['scroll', 'reveal', 'stagger'],
    source: 'react-bits',
    import: () => import('../components/Animations/AnimatedContent/AnimatedContent'),
    controls: [
      { name: 'children', label: 'Text', type: 'text', default: 'Hello World' },
      { name: 'splitBy', label: 'Split By', type: 'select', options: ['chars', 'words'], default: 'chars' },
      { name: 'staggerMs', label: 'Stagger (ms)', type: 'range', min: 10, max: 200, step: 10, default: 50 },
      { name: 'duration', label: 'Duration (s)', type: 'range', min: 0.3, max: 3, step: 0.1, default: 1 },
      { name: 'threshold', label: 'Threshold', type: 'range', min: 0, max: 1, step: 0.05, default: 0 },
    ],
    prompt: `Create an AnimatedContent component that staggers in text characters or words on scroll.

Technique: IntersectionObserver triggers visibility. Each char/word is a <span> with CSS custom property --i for its index. A CSS transition-delay: calc(var(--i) * var(--stagger-ms) * 1ms) creates the stagger. No @keyframes needed.

Key implementation details:
- Split children string by chars or words into span.animated-content__item
- Each span gets style={{ '--i': index }} for stagger delay
- IntersectionObserver disconnects after first trigger (one-shot)
- CSS: .animated-content__item has opacity:0 + translateY(20px) transition
- On visible class: opacity:1 + translateY(0)
- transition-delay controlled by calc(var(--i) * var(--stagger-ms, 50) * 1ms)

Export as named function: AnimatedContent`,
  },
  {
    id: 'crosshair',
    name: 'Crosshair',
    category: 'animations',
    description: 'A dynamic crosshair that follows the cursor with four line segments and a center ring.',
    tags: ['cursor', 'crosshair', 'reticle'],
    source: 'react-bits',
    import: () => import('../components/Animations/Crosshair/Crosshair'),
    controls: [
      { name: 'color', label: 'Color', type: 'color', default: '#5227FF' },
      { name: 'size', label: 'Size (px)', type: 'range', min: 10, max: 80, step: 5, default: 20 },
      { name: 'thickness', label: 'Thickness', type: 'range', min: 1, max: 6, step: 1, default: 2 },
      { name: 'gap', label: 'Gap (px)', type: 'range', min: 0, max: 30, step: 1, default: 5 },
    ],
    prompt: `Create a Crosshair component that follows the cursor with HTML divs.

Technique: Track mouse via mousemove event. Set CSS custom properties --cx/--cy on the container. Absolutely positioned divs for four line segments and a center ring use calc() referencing --cx and --cy. No canvas needed.

Key implementation details:
- Container position:fixed, inset:0, pointer-events:none
- Four div segments positioned via calc(--cx ± offset) and calc(--cy ± offset)
- Center ring div with border-radius:50% and border
- size prop controls total crosshair span, gap controls empty center space

Export as named function: Crosshair`,
  },
  {
    id: 'cubes',
    name: 'Cubes',
    category: 'animations',
    description: 'A field of rotating 3D cubes built with pure CSS transforms that respond to cursor movement.',
    tags: ['3d', 'css', 'grid'],
    source: 'react-bits',
    import: () => import('../components/Animations/Cubes/Cubes'),
    controls: [
      { name: 'rows', label: 'Rows', type: 'range', min: 1, max: 15, step: 1, default: 5 },
      { name: 'cols', label: 'Cols', type: 'range', min: 1, max: 15, step: 1, default: 5 },
      { name: 'size', label: 'Size (px)', type: 'range', min: 20, max: 150, step: 10, default: 60 },
      { name: 'gap', label: 'Gap (px)', type: 'range', min: 0, max: 40, step: 2, default: 10 },
      { name: 'color1', label: 'Color 1', type: 'color', default: '#5227FF' },
      { name: 'color2', label: 'Color 2', type: 'color', default: '#FF6B6B' },
    ],
    prompt: `Create a Cubes component that renders a grid of 3D cubes using pure CSS transforms.

Technique: CSS 3D transforms with perspective. Each cube has 6 child divs (front/back/left/right/top/bottom) positioned with translateZ, rotateY, and rotateX. The parent container uses perspective for depth. Mouse position drives rotateX/rotateY on the container.

Key implementation details:
- CSS grid layout for the cube field
- Each cell uses perspective + transform-style:preserve-3d
- Six faces per cube positioned in 3D space
- color-mix() for face shading (darker sides, lighter top)
- Mouse move maps clientX/clientY to rotation angles
- Subtle floating animation via @keyframes cubes-float
- Hover: scale up individual cube

Export as named function: Cubes`,
  },
  {
    id: 'image-trail',
    name: 'ImageTrail',
    category: 'animations',
    description: 'Images follow the cursor with a trailing effect, fading and shrinking along the trail.',
    tags: ['cursor', 'trail', 'gallery'],
    source: 'react-bits',
    import: () => import('../components/Animations/ImageTrail/ImageTrail'),
    controls: [
      { name: 'trailLength', label: 'Trail Length', type: 'range', min: 2, max: 30, step: 1, default: 8 },
      { name: 'spacing', label: 'Spacing (px)', type: 'range', min: 5, max: 100, step: 5, default: 30 },
      { name: 'size', label: 'Size (px)', type: 'range', min: 30, max: 200, step: 10, default: 100 },
      { name: 'fadeAmount', label: 'Fade', type: 'range', min: 0, max: 1, step: 0.05, default: 0.3 },
    ],
    prompt: `Create an ImageTrail component where images follow the cursor with delayed positions.

Technique: RAF loop tracks cursor position. An array stores the last N positions. Each frame, render images at each stored position with decreasing opacity and scale along the trail. DOM <img> elements are reused — no canvas.

Key implementation details:
- trailRef array stores {x, y, el} per position
- RAF loop: push current position, shift if > trailLength
- Each frame: update each img's left/top/opacity/transform based on index along trail
- First image fully opaque, last most faded
- Scale also decreases along trail direction
- Container pointer-events:none, fixed fullscreen

Export as named function: ImageTrail`,
  },
  {
    id: 'sticker-peel',
    name: 'StickerPeel',
    category: 'animations',
    description: 'A corner that peels back like a sticker on hover, revealing an under-layer.',
    tags: ['peel', 'hover', 'corner'],
    source: 'react-bits',
    import: () => import('../components/Animations/StickerPeel/StickerPeel'),
    controls: [
      { name: 'peelColor', label: 'Peel Color', type: 'color', default: '#f0f0f0' },
      { name: 'peelSize', label: 'Peel Size (%)', type: 'range', min: 10, max: 80, step: 5, default: 30 },
      { name: 'hoverOnly', label: 'Hover Only', type: 'toggle', default: true },
    ],
    prompt: `Create a StickerPeel component with a hover-triggered corner peel effect.

Technique: A corner div uses clip-path: polygon() to create the peel shape. On hover, clip-path transitions to reveal the full corner area. CSS transitions on clip-path and transform create the animation. No GSAP Draggable.

Key implementation details:
- Container position:relative, overflow:hidden
- Corner div top:0 right:0 with clip-path: polygon(100% 0, 0 0, 100% 100%) (hidden)
- On hover: transitions to polygon(100% 0, 0 0, 0 100%, 100% 100%)
- Small rotation and scale on hover for lifted look
- hoverOnly prop: when false, stays peeled by default

Export as named function: StickerPeel`,
  },
  {
    id: 'target-cursor',
    name: 'TargetCursor',
    category: 'animations',
    description: 'A targeting reticle that follows the cursor with concentric rings and a click pulse effect.',
    tags: ['cursor', 'reticle', 'target'],
    source: 'react-bits',
    import: () => import('../components/Animations/TargetCursor/TargetCursor'),
    controls: [
      { name: 'color', label: 'Color', type: 'color', default: '#5227FF' },
      { name: 'ringCount', label: 'Ring Count', type: 'range', min: 1, max: 6, step: 1, default: 3 },
      { name: 'size', label: 'Size (px)', type: 'range', min: 20, max: 120, step: 5, default: 40 },
      { name: 'clickEffect', label: 'Click Effect', type: 'toggle', default: true },
    ],
    prompt: `Create a TargetCursor component that renders a targeting reticle following the cursor.

Technique: mousemove sets CSS custom properties --cx/--cy. Absolutely positioned divs for each ring and the center dot reference these properties. On click, a CSS @keyframes animation scales up and fades out.

Key implementation details:
- Container position:fixed, inset:0, pointer-events:none
- Rings are border-radius:50% divs with progressively larger size and transparency
- Center dot at cursor position
- Click: pulse div triggers @keyframes target-pulse (scale 0.5->2, opacity 0.6->0)
- Force reflow via offsetWidth for re-triggerability

Export as named function: TargetCursor`,
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    category: 'animations',
    description: 'Floating particles that drift upward like antigravity with mouse repulsion.',
    tags: ['canvas', 'particles', 'mouse'],
    source: 'react-bits',
    import: () => import('../components/Animations/Antigravity/Antigravity'),
    controls: [
      { name: 'particleCount', label: 'Particles', type: 'range', min: 10, max: 200, step: 10, default: 50 },
      { name: 'particleSize', label: 'Size', type: 'range', min: 1, max: 10, step: 1, default: 3 },
      { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 0.5 },
      { name: 'mouseInfluence', label: 'Mouse Influence', type: 'toggle', default: true },
      { name: 'color', label: 'Color', type: 'color', default: '#ffffff' },
    ],
    prompt: `Create an Antigravity component with floating particle on Canvas 2D.

Technique: RAF loop on a fullscreen canvas. Spawn ~50 particles with random positions, sizes, and upward velocities. Each frame: move up with slight horizontal sin wobble. Mouse proximity pushes particles away (repulsion force). Particles wrap top-to-bottom and fade near edges.

Export as named function: Antigravity`,
  },
  {
    id: 'magic-rings',
    name: 'MagicRings',
    category: 'animations',
    description: 'Expanding ring waves emanate from cursor position on Canvas 2D.',
    tags: ['canvas', 'rings', 'mouse'],
    source: 'react-bits',
    import: () => import('../components/Animations/MagicRings/MagicRings'),
    controls: [
      { name: 'ringColor', label: 'Color', type: 'color', default: '#5227FF' },
      { name: 'maxRings', label: 'Max Rings', type: 'range', min: 5, max: 80, step: 5, default: 20 },
      { name: 'ringWidth', label: 'Width', type: 'range', min: 1, max: 10, step: 1, default: 2 },
      { name: 'expansionSpeed', label: 'Speed', type: 'range', min: 0.5, max: 8, step: 0.5, default: 2 },
      { name: 'rainbow', label: 'Rainbow', type: 'toggle', default: false },
    ],
    prompt: `Create a MagicRings component with expanding ring waves on Canvas 2D.

Technique: On mousemove, spawn ring objects (cx, cy, radius, maxRadius, opacity). RAF loop expands each ring's radius and fades opacity. Remove rings when opacity hits 0 or radius exceeds maxRradius. Click spawns a burst of 3 rings.

Export as named function: MagicRings`,
  },
  {
    id: 'laser-flow',
    name: 'LaserFlow',
    category: 'animations',
    description: 'Dynamic laser/beam flow effect with animated bezier curves.',
    tags: ['canvas', 'beams', 'flow'],
    source: 'react-bits',
    import: () => import('../components/Animations/LaserFlow/LaserFlow'),
    controls: [
      { name: 'beamCount', label: 'Beams', type: 'range', min: 1, max: 12, step: 1, default: 3 },
      { name: 'color', label: 'Color', type: 'color', default: '#ff3366' },
      { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 },
      { name: 'width', label: 'Width', type: 'range', min: 1, max: 12, step: 1, default: 3 },
    ],
    prompt: `Create a LaserFlow component with flowing bezier curves on Canvas 2D.

Technique: RAF loop draws cubic bezier curves from center to animated control points. Control points use sin() combinations for organic pseudo-noise. Gradient stroke with shadowBlur creates the glow effect. Each beam has a phase offset for variety.

Export as named function: LaserFlow`,
  },
  {
    id: 'shape-blur',
    name: 'ShapeBlur',
    category: 'animations',
    description: 'Animated shapes with canvas filter blur creating a dreamy transition effect.',
    tags: ['canvas', 'blur', 'shapes'],
    source: 'react-bits',
    import: () => import('../components/Animations/ShapeBlur/ShapeBlur'),
    controls: [
      { name: 'shapes', label: 'Shapes', type: 'range', min: 1, max: 10, step: 1, default: 3 },
      { name: 'blurMin', label: 'Min Blur', type: 'range', min: 0, max: 30, step: 1, default: 0 },
      { name: 'blurMax', label: 'Max Blur', type: 'range', min: 1, max: 60, step: 1, default: 20 },
      { name: 'color', label: 'Color', type: 'color', default: '#5227FF' },
      { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 },
    ],
    prompt: `Create a ShapeBlur component with animated blurred shapes on Canvas 2D.

Technique: Use Canvas 2D context.filter = 'blur(Xpx)' to render blurred circles. RAF loop oscillates the blur amount between blurMin and blurMax using sin(). Shapes orbit with phase offsets. Lower globalAlpha adds soft layering.

Export as named function: ShapeBlur`,
  },
  {
    id: 'pixel-trail',
    name: 'PixelTrail',
    category: 'animations',
    description: 'Grid-snapped pixel trail following the cursor with fade effect.',
    tags: ['canvas', 'trail', 'pixels'],
    source: 'react-bits',
    import: () => import('../components/Animations/PixelTrail/PixelTrail'),
    controls: [
      { name: 'trailLength', label: 'Trail Length', type: 'range', min: 5, max: 120, step: 5, default: 30 },
      { name: 'pixelSize', label: 'Pixel Size', type: 'range', min: 2, max: 20, step: 1, default: 8 },
      { name: 'color', label: 'Color', type: 'color', default: '#5227FF' },
      { name: 'fadeSpeed', label: 'Fade Speed', type: 'range', min: 0.005, max: 0.1, step: 0.005, default: 0.03 },
      { name: 'rainbow', label: 'Rainbow', type: 'toggle', default: false },
    ],
    prompt: `Create a PixelTrail component that draws grid-snapped squares following the cursor.

Technique: On mousemove, push {x,y,opacity} to trail array. RAF loop draws fillRect for each trail entry with decreasing opacity. Positions snap to pixelSize grid via Math.floor(x / pixelSize) * pixelSize. Array.push + shift maintains trail length.

Export as named function: PixelTrail`,
  },
  {
    id: 'meta-balls',
    name: 'MetaBalls',
    category: 'animations',
    description: 'Gooey metaball-like blobs with additive blending on Canvas 2D.',
    tags: ['canvas', 'blobs', 'gooey'],
    source: 'react-bits',
    import: () => import('../components/Animations/MetaBalls/MetaBalls'),
    controls: [
      { name: 'ballCount', label: 'Balls', type: 'range', min: 2, max: 25, step: 1, default: 6 },
      { name: 'color', label: 'Color', type: 'color', default: '#5227FF' },
      { name: 'maxRadius', label: 'Max Radius', type: 'range', min: 20, max: 150, step: 10, default: 60 },
      { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 },
    ],
    prompt: `Create a MetaBalls component with gooey additive-blended circles on Canvas 2D.

Technique: Spawn circles with radial gradients. Use globalCompositeOperation 'lighter' for additive blending that creates a soft gooey merge effect. Circles drift randomly and follow the mouse. Radial gradient (center color → transparent edge) softens the overlap.

Export as named function: MetaBalls`,
  },
  {
    id: 'ribbons',
    name: 'Ribbons',
    category: 'animations',
    description: 'Flowing ribbon/tendril curves with gradient strokes and glow.',
    tags: ['canvas', 'ribbons', 'flow'],
    source: 'react-bits',
    import: () => import('../components/Animations/Ribbons/Ribbons'),
    controls: [
      { name: 'ribbonCount', label: 'Ribbons', type: 'range', min: 1, max: 16, step: 1, default: 5 },
      { name: 'color', label: 'Color', type: 'color', default: '#ff3366' },
      { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 },
      { name: 'width', label: 'Width', type: 'range', min: 1, max: 12, step: 1, default: 4 },
    ],
    prompt: `Create a Ribbons component with flowing bezier curves across the screen.

Technique: RAF loop generates control points along the x-axis with sin() combinations for organic wave motion. Draw smoothed curves via quadraticCurveTo. Linear gradient stroke fades edges to transparent. shadowBlur adds glow. Each ribbon has a phase offset.

Export as named function: Ribbons`,
  },
  {
    id: 'strands',
    name: 'Strands',
    category: 'animations',
    description: 'Particle strands with physics simulation and mouse repulsion.',
    tags: ['canvas', 'particles', 'physics', 'mouse'],
    source: 'react-bits',
    import: () => import('../components/Animations/Strands/Strands'),
    controls: [
      { name: 'strandCount', label: 'Strands', type: 'range', min: 5, max: 120, step: 5, default: 30 },
      { name: 'segmentLength', label: 'Segment Length', type: 'range', min: 2, max: 30, step: 2, default: 10 },
      { name: 'color', label: 'Color', type: 'color', default: '#ffffff' },
      { name: 'mouseRadius', label: 'Mouse Radius', type: 'range', min: 30, max: 300, step: 10, default: 100 },
    ],
    prompt: `Create a Strands component with connected particle physics on Canvas 2D.

Technique: Spawn particles with random positions. Each frame: apply gravity (+0.05 vy), damping (*0.98), and mouse repulsion. Particles bounce off canvas edges. Draw lines between all particle pairs within segmentLength*3 distance — opacity proportional to proximity.

Export as named function: Strands`,
  },
  {
    id: 'ghost-cursor',
    name: 'GhostCursor',
    category: 'animations',
    description: 'Ghostly glowing trail that follows the cursor with smooth fade and additive blending on Canvas 2D.',
    tags: ['canvas', 'cursor', 'trail', 'glow'],
    source: 'react-bits',
    import: () => import('../components/Animations/GhostCursor/GhostCursor'),
    controls: [
      { name: 'trailLength', label: 'Trail Length', type: 'range', min: 5, max: 200, step: 5, default: 50 },
      { name: 'color', label: 'Color', type: 'color', default: '#B497CF' },
      { name: 'size', label: 'Size (px)', type: 'range', min: 5, max: 80, step: 2, default: 20 },
      { name: 'glowSize', label: 'Glow Size (px)', type: 'range', min: 5, max: 100, step: 5, default: undefined },
    ],
    prompt: `Create a GhostCursor component that draws a glowing trail behind the cursor on Canvas 2D.

Technique: Track mouse position in a ref. Each frame, push current position to a trail array, shift if over trailLength. Draw filled circles at each trail position with decreasing opacity (head=opaque, tail=faded). Use globalCompositeOperation 'screen' for additive blending. shadowBlur + shadowColor creates the glow effect.

Props: trailLength (50), color ('#B497CF'), size (20), glowSize (derived from size * 1.5), className. Canvas is fixed fullscreen with pointer-events:none.

Export as named function: GhostCursor`,
  },
  {
    id: 'voyeur-verite',
    name: 'VoyeurVerite',
    category: 'components',
    description: 'Editorial landing page with scroll-driven narrative, clip-path mask carousel, and cinematic red-on-cream aesthetic. Features fixed nav, hero, definition columns, project grid, manifesto, pillars, and filmmaker carousel.',
    tags: ['landing', 'showcase', 'editorial', 'cinematic'],
    source: 'react-bits',
    import: () => import('../sections/VoyeurVerite/VoyeurVerite'),
  },

  /* ── Components ── */
  {
    id: 'animated-list',
    name: 'AnimatedList',
    category: 'components',
    description: 'Scroll-triggered list with staggered item reveal, keyboard navigation, and gradient edge overlays.',
    tags: ['list', 'scroll', 'stagger', 'keyboard'],
    source: 'react-bits',
    import: () => import('../components/Components/AnimatedList/AnimatedList'),
    controls: [
      { name: 'items', label: 'Items', type: 'object', default: ['Item 1', 'Item 2', 'Item 3'] },
      { name: 'showGradients', label: 'Show Gradients', type: 'toggle', default: true },
      { name: 'enableArrowNavigation', label: 'Arrow Navigation', type: 'toggle', default: true },
      { name: 'displayScrollbar', label: 'Display Scrollbar', type: 'toggle', default: true },
    ],
  },
  {
    id: 'border-glow',
    name: 'BorderGlow',
    category: 'components',
    description: 'Card with conic-gradient edge glow that follows the cursor. Multi-layer mesh-gradient border with automatic sweep animation option.',
    tags: ['glow', 'card', 'cursor', 'gradient'],
    source: 'react-bits',
    import: () => import('../components/Components/BorderGlow/BorderGlow'),
    controls: [
      { name: 'edgeSensitivity', label: 'Edge Sensitivity', type: 'range', min: 0, max: 100, default: 30 },
      { name: 'glowColor', label: 'Glow Color (HSL)', type: 'text', default: '40 80 80' },
      { name: 'backgroundColor', label: 'Background', type: 'color', default: '#120F17' },
      { name: 'borderRadius', label: 'Border Radius', type: 'range', min: 4, max: 60, default: 28 },
      { name: 'glowRadius', label: 'Glow Radius', type: 'range', min: 10, max: 100, default: 40 },
      { name: 'glowIntensity', label: 'Intensity', type: 'range', min: 0.1, max: 2, step: 0.1, default: 1 },
      { name: 'coneSpread', label: 'Cone Spread', type: 'range', min: 5, max: 50, default: 25 },
      { name: 'animated', label: 'Auto Animated', type: 'toggle', default: false },
    ],
  },
  {
    id: 'bounce-cards',
    name: 'BounceCards',
    category: 'components',
    description: 'Stacked cards that bounce in with staggered entrance animation. Hover pushes siblings aside to focus the hovered card.',
    tags: ['cards', 'stack', 'bounce', 'hover'],
    source: 'react-bits',
    import: () => import('../components/Components/BounceCards/BounceCards'),
    controls: [
      { name: 'containerWidth', label: 'Container Width', type: 'range', min: 200, max: 800, default: 400 },
      { name: 'containerHeight', label: 'Container Height', type: 'range', min: 200, max: 800, default: 400 },
      { name: 'animationDelay', label: 'Delay (s)', type: 'range', min: 0, max: 3, step: 0.1, default: 0.5 },
      { name: 'animationStagger', label: 'Stagger (s)', type: 'range', min: 0.01, max: 0.3, step: 0.01, default: 0.06 },
      { name: 'enableHover', label: 'Hover Effect', type: 'toggle', default: false },
    ],
  },
  {
    id: 'bubble-menu',
    name: 'BubbleMenu',
    category: 'components',
    description: 'Circular menu with expanding pill links. Bubble-style nav toggle renders logo and hamburger, opens fullscreen overlay with rotated pill items.',
    tags: ['menu', 'navigation', 'bubble', 'overlay'],
    source: 'react-bits',
    import: () => import('../components/Components/BubbleMenu/BubbleMenu'),
    controls: [
      { name: 'menuBg', label: 'Menu BG', type: 'color', default: '#ffffff' },
      { name: 'menuContentColor', label: 'Content Color', type: 'color', default: '#111111' },
      { name: 'useFixedPosition', label: 'Fixed Position', type: 'toggle', default: false },
      { name: 'animationDuration', label: 'Duration (s)', type: 'range', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
      { name: 'staggerDelay', label: 'Stagger (s)', type: 'range', min: 0.02, max: 0.3, step: 0.01, default: 0.12 },
    ],
  },
  {
    id: 'card-nav',
    name: 'CardNav',
    category: 'components',
    description: 'Expandable navigation card with hamburger toggle. Expands to reveal up to 3 category cards with link lists. Responsive with mobile layout.',
    tags: ['navigation', 'card', 'expand', 'hamburger'],
    source: 'react-bits',
    import: () => import('../components/Components/CardNav/CardNav'),
    controls: [
      { name: 'baseColor', label: 'Base Color', type: 'color', default: '#ffffff' },
      { name: 'menuColor', label: 'Menu Icon Color', type: 'color', default: '#000000' },
      { name: 'buttonBgColor', label: 'CTA Background', type: 'color', default: '#111111' },
      { name: 'buttonTextColor', label: 'CTA Text', type: 'color', default: '#ffffff' },
    ],
  },
  {
    id: 'card-swap',
    name: 'CardSwap',
    category: 'components',
    description: 'Stacked card deck with automatic cycling animation. Cards stagger in vertical/horizontal offset and cycle the front card to the back on timer.',
    tags: ['cards', 'deck', 'swap', 'cycle'],
    source: 'react-bits',
    import: () => import('../components/Components/CardSwap/CardSwap'),
    controls: [
      { name: 'width', label: 'Width', type: 'range', min: 100, max: 800, default: 300 },
      { name: 'height', label: 'Height', type: 'range', min: 100, max: 800, default: 200 },
      { name: 'cardDistance', label: 'Card Distance', type: 'range', min: 10, max: 200, default: 60 },
      { name: 'verticalDistance', label: 'Vertical Distance', type: 'range', min: 10, max: 200, default: 70 },
      { name: 'delay', label: 'Swap Delay (ms)', type: 'range', min: 1000, max: 15000, step: 500, default: 5000 },
      { name: 'pauseOnHover', label: 'Pause on Hover', type: 'toggle', default: false },
      { name: 'easing', label: 'Easing', type: 'select', options: ['elastic', 'linear'], default: 'elastic' },
    ],
  },
  {
    id: 'carousel',
    name: 'Carousel',
    category: 'components',
    description: 'Draggable carousel with autoplay, loop, and round mode. Each slide has title, description, and icon. Dot indicators for navigation.',
    tags: ['carousel', 'slider', 'drag', 'autoplay'],
    source: 'react-bits',
    import: () => import('../components/Components/Carousel/Carousel'),
    controls: [
      { name: 'baseWidth', label: 'Width', type: 'range', min: 150, max: 600, default: 300 },
      { name: 'autoplay', label: 'Autoplay', type: 'toggle', default: false },
      { name: 'autoplayDelay', label: 'Autoplay Delay (ms)', type: 'range', min: 1000, max: 10000, step: 500, default: 3000 },
      { name: 'pauseOnHover', label: 'Pause on Hover', type: 'toggle', default: false },
      { name: 'loop', label: 'Loop', type: 'toggle', default: false },
      { name: 'round', label: 'Round Mode', type: 'toggle', default: false },
    ],
  },
  {
    id: 'chroma-grid',
    name: 'ChromaGrid',
    category: 'components',
    description: 'Profile card grid with spotlight vignette that follows the cursor. Gradient borders, custom spotlight radius, and per-card hover highlight.',
    tags: ['grid', 'cards', 'spotlight', 'profiles'],
    source: 'react-bits',
    import: () => import('../components/Components/ChromaGrid/ChromaGrid'),
    controls: [
      { name: 'radius', label: 'Spotlight Radius', type: 'range', min: 50, max: 600, default: 300 },
      { name: 'columns', label: 'Columns', type: 'range', min: 1, max: 6, default: 3 },
      { name: 'rows', label: 'Rows', type: 'range', min: 1, max: 4, default: 2 },
      { name: 'damping', label: 'Smoothness', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.45 },
      { name: 'fadeOut', label: 'Fade Out', type: 'range', min: 0.1, max: 3, step: 0.1, default: 0.6 },
    ],
  },
  {
    id: 'circular-gallery',
    name: 'CircularGallery',
    category: 'components',
    description: 'WebGL 3D circular image gallery with scroll/drag navigation. Images bend in a cylindrical arc with vertex shader warp and per-image labels.',
    tags: ['gallery', 'webgl', '3d', 'ogl'],
    source: 'react-bits',
    import: () => import('../components/Components/CircularGallery/CircularGallery'),
    controls: [
      { name: 'bend', label: 'Bend', type: 'range', min: -8, max: 8, step: 0.5, default: 3 },
      { name: 'textColor', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 0.5, step: 0.01, default: 0.05 },
      { name: 'scrollSpeed', label: 'Scroll Speed', type: 'range', min: 0.5, max: 8, step: 0.5, default: 2 },
      { name: 'scrollEase', label: 'Scroll Ease', type: 'range', min: 0.01, max: 0.2, step: 0.01, default: 0.05 },
    ],
  },
  {
    id: 'counter',
    name: 'Counter',
    category: 'components',
    description: 'Animated digit counter with spring-like roll animation. Each digit position scrolls independently. Supports integers and decimals with configurable styling.',
    tags: ['counter', 'numbers', 'animation', 'digits'],
    source: 'react-bits',
    import: () => import('../components/Components/Counter/Counter'),
    controls: [
      { name: 'value', label: 'Value', type: 'number', default: 12345 },
      { name: 'fontSize', label: 'Font Size', type: 'range', min: 20, max: 200, default: 100 },
      { name: 'gap', label: 'Gap', type: 'range', min: 0, max: 40, default: 8 },
      { name: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 20, default: 4 },
      { name: 'textColor', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: 'gradientHeight', label: 'Gradient Height', type: 'range', min: 0, max: 60, default: 16 },
    ],
  },
  {
    id: 'curved-input',
    name: 'CurvedInput',
    category: 'components',
    description: 'SVG-based curved input field with bendable arc geometry. Text follows the curve, includes submit button and optional icon. Supports dark/light themes.',
    tags: ['input', 'form', 'curved', 'svg'],
    source: 'react-bits',
    import: () => import('../components/Components/CurvedInput/CurvedInput'),
    controls: [
      { name: 'theme', label: 'Theme', type: 'select', options: ['dark', 'light'], default: 'dark' },
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Enter your email' },
      { name: 'buttonText', label: 'Button Text', type: 'text', default: 'Get Started' },
      { name: 'bend', label: 'Bend (px)', type: 'range', min: -50, max: 50, default: 28 },
      { name: 'fontSize', label: 'Font Size', type: 'range', min: 12, max: 32, default: 16 },
      { name: 'showButton', label: 'Show Button', type: 'toggle', default: true },
      { name: 'showIcon', label: 'Show Icon', type: 'toggle', default: true },
    ],
  },
  {
    id: 'decay-card',
    name: 'DecayCard',
    category: 'components',
    description: 'Image card with SVG turbulence displacement map creating an analog decay/glitch effect. Cursor-responsive transforms with mouse-follow parallax.',
    tags: ['card', 'glitch', 'svg', 'turbulence', 'image'],
    source: 'react-bits',
    import: () => import('../components/Components/DecayCard/DecayCard'),
    controls: [
      { name: 'width', label: 'Width', type: 'range', min: 150, max: 600, default: 300 },
      { name: 'height', label: 'Height', type: 'range', min: 200, max: 800, default: 400 },
      { name: 'baseFrequency', label: 'Base Frequency', type: 'range', min: 0.001, max: 0.1, step: 0.001, default: 0.015 },
      { name: 'numOctaves', label: 'Octaves', type: 'range', min: 1, max: 10, default: 5 },
      { name: 'maxDisplacement', label: 'Max Displacement', type: 'range', min: 50, max: 800, default: 400 },
      { name: 'movementBound', label: 'Movement Bound', type: 'range', min: 10, max: 200, default: 50 },
    ],
  },
  {
    id: 'dock',
    name: 'Dock',
    category: 'components',
    description: 'macOS-style dock with magnification on hover. Items grow proportionally based on mouse proximity. Tooltip labels appear on hover.',
    tags: ['dock', 'macos', 'navigation', 'magnification'],
    source: 'react-bits',
    import: () => import('../components/Components/Dock/Dock'),
    controls: [
      { name: 'magnification', label: 'Magnification', type: 'range', min: 40, max: 120, default: 70 },
      { name: 'distance', label: 'Distance', type: 'range', min: 50, max: 400, default: 200 },
      { name: 'panelHeight', label: 'Panel Height', type: 'range', min: 40, max: 120, default: 68 },
      { name: 'baseItemSize', label: 'Base Size', type: 'range', min: 30, max: 80, default: 50 },
    ],
  },
  {
    id: 'dome-gallery',
    name: 'DomeGallery',
    category: 'components',
    description: '3D sphere/dome gallery with drag-to-rotate interaction. Images project onto a spherical surface with CSS 3D transforms. Click to enlarge overlay.',
    tags: ['gallery', '3d', 'sphere', 'dome', 'css3d'],
    source: 'react-bits',
    import: () => import('../components/Components/DomeGallery/DomeGallery'),
    controls: [
      { name: 'fit', label: 'Fit', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.5 },
      { name: 'dragSensitivity', label: 'Sensitivity', type: 'range', min: 5, max: 50, default: 20 },
      { name: 'grayscale', label: 'Grayscale', type: 'toggle', default: true },
    ],
  },
  {
    id: 'elastic-slider',
    name: 'ElasticSlider',
    category: 'components',
    description: 'Slider with elastic overflow effect. Dragging beyond bounds stretches the track with a decay function. Optional stepped mode and custom icons.',
    tags: ['slider', 'range', 'elastic', 'input'],
    source: 'react-bits',
    import: () => import('../components/Components/ElasticSlider/ElasticSlider'),
    controls: [
      { name: 'defaultValue', label: 'Default Value', type: 'range', min: 0, max: 100, default: 50 },
      { name: 'startingValue', label: 'Min', type: 'range', min: 0, max: 100, default: 0 },
      { name: 'maxValue', label: 'Max', type: 'range', min: 10, max: 500, default: 100 },
      { name: 'isStepped', label: 'Stepped', type: 'toggle', default: false },
      { name: 'stepSize', label: 'Step Size', type: 'range', min: 1, max: 50, default: 1 },
    ],
  },
  {
    id: 'flowing-menu',
    name: 'FlowingMenu',
    category: 'components',
    description: 'Full-height menu with hover-reveal marquee. Each item shows a scrolling text/image marquee on hover that enters from the closest edge.',
    tags: ['menu', 'navigation', 'marquee', 'hover'],
    source: 'react-bits',
    import: () => import('../components/Components/FlowingMenu/FlowingMenu'),
    controls: [
      { name: 'speed', label: 'Marquee Speed', type: 'range', min: 5, max: 60, default: 15 },
      { name: 'textColor', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: 'bgColor', label: 'Background', type: 'color', default: '#120F17' },
      { name: 'marqueeBgColor', label: 'Marquee BG', type: 'color', default: '#ffffff' },
      { name: 'marqueeTextColor', label: 'Marquee Text', type: 'color', default: '#120F17' },
    ],
  },
  {
    id: 'fluid-glass',
    name: 'FluidGlass',
    category: 'components',
    description: 'Three.js glass/fluid effect with lens, bar, and cube modes. Uses R3F MeshTransmissionMaterial for realistic glass refraction.',
    tags: ['threejs', 'glass', 'fluid', 'r3f', '3d'],
    source: 'react-bits',
    import: () => import('../components/Components/FluidGlass/FluidGlass'),
    controls: [
      { name: 'mode', label: 'Mode', type: 'select', options: ['lens', 'bar', 'cube'], default: 'lens' },
    ],
  },
  {
    id: 'flying-posters',
    name: 'FlyingPosters',
    category: 'components',
    description: 'WebGL flying posters gallery with vertex shader flip distortion. Scroll/drag to navigate through flipping image planes.',
    tags: ['gallery', 'webgl', 'ogl', 'posters', 'scroll'],
    source: 'react-bits',
    import: () => import('../components/Components/FlyingPosters/FlyingPosters'),
    controls: [
      { name: 'planeWidth', label: 'Plane Width', type: 'range', min: 100, max: 600, default: 320 },
      { name: 'planeHeight', label: 'Plane Height', type: 'range', min: 100, max: 600, default: 320 },
      { name: 'distortion', label: 'Distortion', type: 'range', min: 0, max: 10, step: 0.5, default: 3 },
      { name: 'scrollEase', label: 'Scroll Ease', type: 'range', min: 0.001, max: 0.1, step: 0.005, default: 0.01 },
    ],
  },
  {
    id: 'folder',
    name: 'Folder',
    category: 'components',
    description: 'CSS 3D folder icon with open/close animation. Papers fan out on open with per-paper hover magnet effect. Customizable color and size.',
    tags: ['folder', 'icon', '3d', 'css'],
    source: 'react-bits',
    import: () => import('../components/Components/Folder/Folder'),
    controls: [
      { name: 'color', label: 'Color', type: 'color', default: '#5227FF' },
      { name: 'size', label: 'Size', type: 'range', min: 0.5, max: 3, step: 0.1, default: 1 },
    ],
  },
  {
    id: 'glass-icons',
    name: 'GlassIcons',
    category: 'components',
    description: 'Glassmorphism icon buttons with frosted glass front face and colored gradient back face. Hover reveals 3D depth effect.',
    tags: ['icons', 'glass', 'frosted', 'ui'],
    source: 'react-bits',
    import: () => import('../components/Components/GlassIcons/GlassIcons'),
    controls: [],
  },
  {
    id: 'glass-surface',
    name: 'GlassSurface',
    category: 'components',
    description: 'Glassmorphism surface with SVG displacement filter and backdrop blur fallback.',
    tags: ['glass', 'surface', 'backdrop'],
    source: 'react-bits',
    import: () => import('../components/Components/GlassSurface/GlassSurface'),
    controls: [{ name: 'width', label: 'Width', type: 'text', default: '300px' }, { name: 'height', label: 'Height', type: 'text', default: '150px' }, { name: 'borderRadius', label: 'Radius', type: 'range', min: 0, max: 60, default: 20 }],
  },
  {
    id: 'gooey-nav', name: 'GooeyNav', category: 'components', description: 'Navigation with gooey particle effect using CSS filters.', tags: ['nav', 'gooey', 'particles'], source: 'react-bits',
    import: () => import('../components/Components/GooeyNav/GooeyNav'),
    controls: [{ name: 'particleCount', label: 'Particles', type: 'range', min: 5, max: 40, default: 15 }],
  },
  {
    id: 'infinite-menu', name: 'InfiniteMenu', category: 'components', description: '3D WebGL2 icosahedron grid menu with arcball rotation.', tags: ['menu', '3d', 'webgl'], source: 'react-bits',
    import: () => import('../components/Components/InfiniteMenu/InfiniteMenu'),
    controls: [{ name: 'scale', label: 'Scale', type: 'range', min: 0.5, max: 2, step: 0.1, default: 1 }],
  },
  {
    id: 'lanyard', name: 'Lanyard', category: 'components', description: '3D physics-simulated lanyard with ID card using R3F and Rapier.', tags: ['lanyard', '3d', 'physics'], source: 'react-bits',
    import: () => import('../components/Components/Lanyard/Lanyard'),
    controls: [{ name: 'fov', label: 'FOV', type: 'range', min: 10, max: 40, default: 20 }],
  },
  {
    id: 'line-sidebar', name: 'LineSidebar', category: 'components', description: 'Sidebar with proximity-reactive line markers.', tags: ['sidebar', 'nav', 'proximity'], source: 'react-bits',
    import: () => import('../components/Components/LineSidebar/LineSidebar'),
    controls: [{ name: 'accentColor', label: 'Accent', type: 'color', default: '#A855F7' }, { name: 'showIndex', label: 'Show Index', type: 'toggle', default: true }, { name: 'proximityRadius', label: 'Proximity', type: 'range', min: 20, max: 300, default: 100 }],
  },
  {
    id: 'magic-bento', name: 'MagicBento', category: 'components', description: 'Bento grid with spotlight and particle effects.', tags: ['bento', 'grid', 'spotlight'], source: 'react-bits',
    import: () => import('../components/Components/MagicBento/MagicBento'),
    controls: [{ name: 'enableSpotlight', label: 'Spotlight', type: 'toggle', default: true }, { name: 'enableBorderGlow', label: 'Border Glow', type: 'toggle', default: true }],
  },
  {
    id: 'masonry', name: 'Masonry', category: 'components', description: 'Responsive masonry grid with animated layout transitions.', tags: ['masonry', 'grid', 'layout'], source: 'react-bits',
    import: () => import('../components/Components/Masonry/Masonry'),
    controls: [{ name: 'duration', label: 'Duration', type: 'range', min: 0.1, max: 2, step: 0.1, default: 0.6 }, { name: 'stagger', label: 'Stagger', type: 'range', min: 0, max: 0.3, step: 0.01, default: 0.05 }],
  },
  {
    id: 'model-viewer', name: 'ModelViewer', category: 'components', description: '3D model viewer with R3F. Supports GLB/FBX/OBJ formats.', tags: ['3d', 'model', 'viewer', 'r3f'], source: 'react-bits',
    import: () => import('../components/Components/ModelViewer/ModelViewer'),
    controls: [{ name: 'autoRotate', label: 'Auto Rotate', type: 'toggle', default: false }, { name: 'autoRotateSpeed', label: 'Speed', type: 'range', min: 0.1, max: 2, step: 0.05, default: 0.35 }],
  },
  {
    id: 'option-wheel', name: 'OptionWheel', category: 'components', description: 'Curved option picker wheel with scroll/drag interaction.', tags: ['wheel', 'picker', 'scroll'], source: 'react-bits',
    import: () => import('../components/Components/OptionWheel/OptionWheel'),
    controls: [{ name: 'fontSize', label: 'Font Size', type: 'range', min: 1, max: 6, step: 0.5, default: 3 }, { name: 'side', label: 'Side', type: 'select', options: ['left', 'right'], default: 'left' }, { name: 'loop', label: 'Loop', type: 'toggle', default: false }],
  },
  {
    id: 'pill-nav', name: 'PillNav', category: 'components', description: 'Navigation with pill-shaped hover effect and mobile menu.', tags: ['nav', 'pills', 'hover'], source: 'react-bits',
    import: () => import('../components/Components/PillNav/PillNav'),
    controls: [{ name: 'baseColor', label: 'Base', type: 'color', default: '#ffffff' }, { name: 'pillColor', label: 'Pill', type: 'color', default: '#120F17' }],
  },
  {
    id: 'pixel-card', name: 'PixelCard', category: 'components', description: 'Canvas-based pixel particle card with hover animation.', tags: ['card', 'canvas', 'pixels', 'particles'], source: 'react-bits',
    import: () => import('../components/Components/PixelCard/PixelCard'),
    controls: [{ name: 'variant', label: 'Variant', type: 'select', options: ['default', 'blue', 'yellow', 'pink'], default: 'default' }],
  },
  {
    id: 'profile-card', name: 'ProfileCard', category: 'components', description: 'Tilt-responsive profile card with avatar and user info overlay.', tags: ['card', 'profile', 'tilt', 'avatar'], source: 'react-bits',
    import: () => import('../components/Components/ProfileCard/ProfileCard'),
    controls: [{ name: 'enableTilt', label: 'Tilt', type: 'toggle', default: true }, { name: 'showUserInfo', label: 'User Info', type: 'toggle', default: true }],
  },
  {
    id: 'reflective-card', name: 'ReflectiveCard', category: 'components', description: 'Webcam-powered reflective card with metallic SVG filters.', tags: ['card', 'reflective', 'webcam', 'svg-filter'], source: 'react-bits',
    import: () => import('../components/Components/ReflectiveCard/ReflectiveCard'),
    controls: [{ name: 'blurStrength', label: 'Blur', type: 'range', min: 0, max: 30, default: 12 }, { name: 'grayscale', label: 'Grayscale', type: 'range', min: 0, max: 1, step: 0.1, default: 1 }],
  },
  {
    id: 'scroll-stack', name: 'ScrollStack', category: 'components', description: 'Scroll-driven sticky stacking cards effect.', tags: ['scroll', 'stack', 'sticky'], source: 'react-bits',
    import: () => import('../components/Components/ScrollStack/ScrollStack'),
    controls: [],
  },
  {
    id: 'specular-button', name: 'SpecularButton', category: 'components', description: 'OGL WebGL specular highlight button with mouse-follow shine.', tags: ['button', 'webgl', 'specular', 'ogl'], source: 'react-bits',
    import: () => import('../components/Components/SpecularButton/SpecularButton'),
    controls: [{ name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'lg' }, { name: 'intensity', label: 'Intensity', type: 'range', min: 0, max: 3, step: 0.1, default: 1 }, { name: 'autoAnimate', label: 'Auto', type: 'toggle', default: false }],
  },
  {
    id: 'spotlight-card', name: 'SpotlightCard', category: 'components', description: 'Card with CSS radial spotlight that follows the cursor.', tags: ['card', 'spotlight', 'cursor'], source: 'react-bits',
    import: () => import('../components/Components/SpotlightCard/SpotlightCard'),
    controls: [{ name: 'spotlightColor', label: 'Color', type: 'color', default: 'rgba(255,255,255,0.25)' }],
  },
  {
    id: 'stack', name: 'Stack', category: 'components', description: 'Card stack with send-to-back on click/autoplay.', tags: ['cards', 'stack', 'swipe'], source: 'react-bits',
    import: () => import('../components/Components/Stack/Stack'),
    controls: [{ name: 'randomRotation', label: 'Random Rotation', type: 'toggle', default: false }, { name: 'autoplay', label: 'Autoplay', type: 'toggle', default: false }, { name: 'autoplayDelay', label: 'Delay (ms)', type: 'range', min: 1000, max: 10000, default: 3000 }],
  },
  {
    id: 'staggered-menu', name: 'StaggeredMenu', category: 'components', description: 'Fullscreen staggered menu with layer reveal animation.', tags: ['menu', 'staggered', 'fullscreen'], source: 'react-bits',
    import: () => import('../components/Components/StaggeredMenu/StaggeredMenu'),
    controls: [{ name: 'position', label: 'Position', type: 'select', options: ['left', 'right'], default: 'right' }, { name: 'displaySocials', label: 'Socials', type: 'toggle', default: true }],
  },
  {
    id: 'stepper', name: 'Stepper', category: 'components', description: 'Multi-step form stepper with animated transitions.', tags: ['stepper', 'form', 'steps', 'wizard'], source: 'react-bits',
    import: () => import('../components/Components/Stepper/Stepper'),
    controls: [{ name: 'initialStep', label: 'Initial Step', type: 'range', min: 1, max: 5, default: 1 }],
  },
  {
    id: 'tilted-card', name: 'TiltedCard', category: 'components', description: 'Card with 3D tilt on mouse move and tooltip caption.', tags: ['card', 'tilt', '3d', 'hover'], source: 'react-bits',
    import: () => import('../components/Components/TiltedCard/TiltedCard'),
    controls: [{ name: 'scaleOnHover', label: 'Scale', type: 'range', min: 1, max: 1.5, step: 0.05, default: 1.1 }, { name: 'rotateAmplitude', label: 'Rotation', type: 'range', min: 0, max: 30, default: 14 }, { name: 'showTooltip', label: 'Tooltip', type: 'toggle', default: true }],
  },

  /* ── Backgrounds ── */
  { id: 'aurora', name: 'Aurora', category: 'backgrounds', description: 'OGL WebGL aurora borealis effect with animated noise-based light bands.', tags: ['webgl', 'ogl', 'aurora', 'light'], source: 'react-bits', import: () => import('../components/Backgrounds/Aurora/Aurora'), controls: [{ name: 'colorStops', label: 'Colors', type: 'object', default: ['#5227FF', '#7cff67', '#5227FF'] }, { name: 'amplitude', label: 'Amplitude', type: 'range', min: 0, max: 2, step: 0.1, default: 1 }, { name: 'blend', label: 'Blend', type: 'range', min: 0, max: 1, step: 0.1, default: 0.5 }, { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 }] },
  { id: 'balatro', name: 'Balatro', category: 'backgrounds', description: 'OGL WebGL swirling color field with mouse interaction and spin effects.', tags: ['webgl', 'ogl', 'color', 'swirl'], source: 'react-bits', import: () => import('../components/Backgrounds/Balatro/Balatro'), controls: [{ name: 'color1', label: 'Color 1', type: 'color', default: '#DE443B' }, { name: 'color2', label: 'Color 2', type: 'color', default: '#006BB4' }, { name: 'contrast', label: 'Contrast', type: 'range', min: 0.5, max: 8, step: 0.5, default: 3.5 }, { name: 'spinSpeed', label: 'Spin Speed', type: 'range', min: 0.1, max: 15, step: 0.5, default: 7 }] },
  { id: 'ballpit', name: 'Ballpit', category: 'backgrounds', description: 'Three.js physics-simulated ball pit with cursor attraction.', tags: ['threejs', 'physics', 'balls', '3d'], source: 'react-bits', import: () => import('../components/Backgrounds/Ballpit/Ballpit'), controls: [{ name: 'count', label: 'Balls', type: 'range', min: 10, max: 500, step: 10, default: 200 }, { name: 'followCursor', label: 'Follow Cursor', type: 'toggle', default: true }] },
  { id: 'beams', name: 'Beams', category: 'backgrounds', description: 'R3F WebGL volumetric light beams with noise distortion.', tags: ['r3f', 'webgl', 'beams', 'light'], source: 'react-bits', import: () => import('../components/Backgrounds/Beams/Beams'), controls: [{ name: 'beamWidth', label: 'Width', type: 'range', min: 0.5, max: 5, step: 0.5, default: 2 }, { name: 'beamNumber', label: 'Count', type: 'range', min: 2, max: 30, step: 1, default: 12 }, { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 2 }] },
  { id: 'color-bends', name: 'ColorBends', category: 'backgrounds', description: 'Three.js WebGL organic color bending with mouse parallax.', tags: ['threejs', 'webgl', 'color', 'bend'], source: 'react-bits', import: () => import('../components/Backgrounds/ColorBends/ColorBends'), controls: [{ name: 'speed', label: 'Speed', type: 'range', min: 0.05, max: 1, step: 0.05, default: 0.2 }, { name: 'colors', label: 'Colors', type: 'object', default: [] }, { name: 'scale', label: 'Scale', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 }] },
  { id: 'dark-veil', name: 'DarkVeil', category: 'backgrounds', description: 'OGL WebGL dark ambient veil with CPPN-generated organic patterns.', tags: ['webgl', 'ogl', 'dark', 'ambient'], source: 'react-bits', import: () => import('../components/Backgrounds/DarkVeil/DarkVeil'), controls: [{ name: 'hueShift', label: 'Hue Shift', type: 'range', min: 0, max: 360, step: 1, default: 0 }, { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 0.5 }] },
  { id: 'dither', name: 'Dither', category: 'backgrounds', description: 'R3F dithered wave pattern with retro pixel effect.', tags: ['r3f', 'dither', 'waves', 'retro'], source: 'react-bits', import: () => import('../components/Backgrounds/Dither/Dither'), controls: [{ name: 'waveSpeed', label: 'Wave Speed', type: 'range', min: 0.01, max: 0.5, step: 0.01, default: 0.05 }, { name: 'colorNum', label: 'Colors', type: 'range', min: 2, max: 16, step: 1, default: 4 }, { name: 'pixelSize', label: 'Pixel Size', type: 'range', min: 1, max: 10, step: 1, default: 2 }] },
  { id: 'dot-field', name: 'DotField', category: 'backgrounds', description: 'Canvas 2D interactive dot field with cursor bulge and wave effects.', tags: ['canvas', 'dots', 'interactive'], source: 'react-bits', import: () => import('../components/Backgrounds/DotField/DotField'), controls: [{ name: 'dotRadius', label: 'Dot Radius', type: 'range', min: 0.5, max: 10, step: 0.5, default: 1.5 }, { name: 'dotSpacing', label: 'Spacing', type: 'range', min: 5, max: 50, step: 1, default: 14 }, { name: 'bulgeStrength', label: 'Bulge', type: 'range', min: 0, max: 200, step: 5, default: 67 }] },
  { id: 'dot-grid', name: 'DotGrid', category: 'backgrounds', description: 'Canvas 2D interactive dot grid with proximity-reactive colors.', tags: ['canvas', 'grid', 'dots', 'interactive'], source: 'react-bits', import: () => import('../components/Backgrounds/DotGrid/DotGrid'), controls: [{ name: 'dotSize', label: 'Size', type: 'range', min: 4, max: 40, step: 2, default: 16 }, { name: 'gap', label: 'Gap', type: 'range', min: 8, max: 80, step: 4, default: 32 }, { name: 'baseColor', label: 'Base Color', type: 'color', default: '#5227FF' }, { name: 'activeColor', label: 'Active Color', type: 'color', default: '#5227FF' }] },
  { id: 'evil-eye', name: 'EvilEye', category: 'backgrounds', description: 'OGL WebGL eye with pupil tracking, flame iris, and organic noise.', tags: ['webgl', 'ogl', 'eye', 'noise'], source: 'react-bits', import: () => import('../components/Backgrounds/EvilEye/EvilEye'), controls: [{ name: 'eyeColor', label: 'Eye Color', type: 'color', default: '#FF6F37' }, { name: 'pupilSize', label: 'Pupil', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.6 }, { name: 'intensity', label: 'Intensity', type: 'range', min: 0.5, max: 3, step: 0.1, default: 1.5 }] },
  { id: 'faulty-terminal', name: 'FaultyTerminal', category: 'backgrounds', description: 'OGL WebGL retro terminal with scrolling digit matrix and glitch effects.', tags: ['webgl', 'ogl', 'terminal', 'glitch', 'matrix'], source: 'react-bits', import: () => import('../components/Backgrounds/FaultyTerminal/FaultyTerminal'), controls: [{ name: 'scale', label: 'Scale', type: 'range', min: 0.5, max: 3, step: 0.1, default: 1 }, { name: 'scanlineIntensity', label: 'Scanlines', type: 'range', min: 0, max: 1, step: 0.05, default: 0.3 }, { name: 'glitchAmount', label: 'Glitch', type: 'range', min: 0, max: 3, step: 0.1, default: 1 }] },
  { id: 'ferrofluid', name: 'Ferrofluid', category: 'backgrounds', description: 'OGL WebGL ferrofluid-like organic liquid pattern with color bands.', tags: ['webgl', 'ogl', 'liquid', 'organic'], source: 'react-bits', import: () => import('../components/Backgrounds/Ferrofluid/Ferrofluid'), controls: [{ name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 0.5 }, { name: 'colors', label: 'Colors', type: 'object', default: ['#ffffff', '#ffffff', '#ffffff'] }, { name: 'turbulence', label: 'Turbulence', type: 'range', min: 0, max: 3, step: 0.1, default: 1 }] },
  { id: 'floating-lines', name: 'FloatingLines', category: 'backgrounds', description: 'Three.js WebGL sine wave lines with mouse bend and parallax.', tags: ['threejs', 'webgl', 'lines', 'waves'], source: 'react-bits', import: () => import('../components/Backgrounds/FloatingLines/FloatingLines'), controls: [{ name: 'animationSpeed', label: 'Speed', type: 'range', min: 0, max: 5, step: 0.1, default: 1 }, { name: 'interactive', label: 'Interactive', type: 'toggle', default: true }] },
  { id: 'galaxy', name: 'Galaxy', category: 'backgrounds', description: 'OGL WebGL starry galaxy field with mouse repulsion.', tags: ['webgl', 'ogl', 'stars', 'galaxy'], source: 'react-bits', import: () => import('../components/Backgrounds/Galaxy/Galaxy'), controls: [{ name: 'starSpeed', label: 'Star Speed', type: 'range', min: 0, max: 2, step: 0.1, default: 0.5 }, { name: 'density', label: 'Density', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 }, { name: 'hueShift', label: 'Hue', type: 'range', min: 0, max: 360, step: 5, default: 140 }] },
  { id: 'gradient-blinds', name: 'GradientBlinds', category: 'backgrounds', description: 'OGL WebGL gradient blinds with spotlight and mouse interaction.', tags: ['webgl', 'ogl', 'gradient', 'blinds'], source: 'react-bits', import: () => import('../components/Backgrounds/GradientBlinds/GradientBlinds'), controls: [{ name: 'gradientColors', label: 'Colors', type: 'object', default: ['#FF9FFC', '#5227FF'] }, { name: 'blindCount', label: 'Blind Count', type: 'range', min: 2, max: 80, step: 2, default: 16 }, { name: 'noise', label: 'Noise', type: 'range', min: 0, max: 1, step: 0.05, default: 0.3 }] },
  { id: 'grainient', name: 'Grainient', category: 'backgrounds', description: 'OGL WebGL2 gradient with animated grain texture and warp.', tags: ['webgl', 'webgl2', 'grain', 'gradient'], source: 'react-bits', import: () => import('../components/Backgrounds/Grainient/Grainient'), controls: [{ name: 'color1', label: 'Color 1', type: 'color', default: '#FF9FFC' }, { name: 'color2', label: 'Color 2', type: 'color', default: '#5227FF' }, { name: 'grainAmount', label: 'Grain', type: 'range', min: 0, max: 0.5, step: 0.01, default: 0.1 }] },
  { id: 'grid-distortion', name: 'GridDistortion', category: 'backgrounds', description: 'Three.js WebGL image grid distortion with mouse interaction.', tags: ['threejs', 'webgl', 'grid', 'distortion', 'image'], source: 'react-bits', import: () => import('../components/Backgrounds/GridDistortion/GridDistortion'), controls: [{ name: 'grid', label: 'Grid', type: 'range', min: 5, max: 40, step: 1, default: 15 }, { name: 'strength', label: 'Strength', type: 'range', min: 0, max: 1, step: 0.01, default: 0.15 }, { name: 'imageSrc', label: 'Image URL', type: 'text', default: '' }] },
  { id: 'grid-motion', name: 'GridMotion', category: 'backgrounds', description: 'GSAP-powered grid motion with cursor-follow parallax rows.', tags: ['gsap', 'grid', 'motion', 'parallax'], source: 'react-bits', import: () => import('../components/Backgrounds/GridMotion/GridMotion'), controls: [{ name: 'gradientColor', label: 'Gradient', type: 'color', default: '#000000' }] },
  { id: 'grid-scan', name: 'GridScan', category: 'backgrounds', description: 'R3F/Three.js WebGL grid scan with face tracking and postprocessing.', tags: ['r3f', 'webgl', 'grid', 'scan', 'postprocessing'], source: 'react-bits', import: () => import('../components/Backgrounds/GridScan/GridScan'), controls: [{ name: 'lineThickness', label: 'Line Thickness', type: 'range', min: 0.5, max: 5, step: 0.5, default: 1 }, { name: 'scanColor', label: 'Scan Color', type: 'color', default: '#FF9FFC' }, { name: 'scanOpacity', label: 'Opacity', type: 'range', min: 0, max: 1, step: 0.05, default: 0.4 }] },
  { id: 'hyperspeed', name: 'Hyperspeed', category: 'backgrounds', description: 'Three.js/postprocessing hyperspace travel effect with road and car lights.', tags: ['threejs', 'hyperspeed', 'postprocessing'], source: 'react-bits', import: () => import('../components/Backgrounds/Hyperspeed/Hyperspeed'), controls: [] },
  { id: 'iridescence', name: 'Iridescence', category: 'backgrounds', description: 'OGL WebGL iridescent color shifting with organic patterns.', tags: ['webgl', 'ogl', 'iridescent', 'color'], source: 'react-bits', import: () => import('../components/Backgrounds/Iridescence/Iridescence'), controls: [{ name: 'color', label: 'Color', type: 'object', default: [1, 1, 1] }, { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 }, { name: 'amplitude', label: 'Amplitude', type: 'range', min: 0, max: 1, step: 0.05, default: 0.1 }] },
  { id: 'letter-glitch', name: 'LetterGlitch', category: 'backgrounds', description: 'Canvas 2D letter glitch with character swapping and color transitions.', tags: ['canvas', 'glitch', 'letters', 'retro'], source: 'react-bits', import: () => import('../components/Backgrounds/LetterGlitch/LetterGlitch'), controls: [{ name: 'glitchColors', label: 'Colors', type: 'object', default: ['#2b4539', '#61dca3', '#61b3dc'] }, { name: 'glitchSpeed', label: 'Speed (ms)', type: 'range', min: 10, max: 500, step: 10, default: 50 }, { name: 'smooth', label: 'Smooth', type: 'toggle', default: true }] },
  { id: 'light-pillar', name: 'LightPillar', category: 'backgrounds', description: 'Three.js WebGL volumetric light pillar with ray marching.', tags: ['threejs', 'webgl', 'light', 'pillar', 'volumetric'], source: 'react-bits', import: () => import('../components/Backgrounds/LightPillar/LightPillar'), controls: [{ name: 'topColor', label: 'Top Color', type: 'color', default: '#5227FF' }, { name: 'bottomColor', label: 'Bottom Color', type: 'color', default: '#FF9FFC' }, { name: 'intensity', label: 'Intensity', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 }] },
  { id: 'light-rays', name: 'LightRays', category: 'backgrounds', description: 'OGL WebGL volumetric light rays from configurable origin.', tags: ['webgl', 'ogl', 'light', 'rays', 'volumetric'], source: 'react-bits', import: () => import('../components/Backgrounds/LightRays/LightRays'), controls: [{ name: 'raysOrigin', label: 'Origin', type: 'select', options: ['top-center', 'top-left', 'top-right', 'left', 'right', 'bottom-center'], default: 'top-center' }, { name: 'raysColor', label: 'Color', type: 'color', default: '#ffffff' }, { name: 'raysSpeed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 }] },
  { id: 'lightfall', name: 'Lightfall', category: 'backgrounds', description: 'OGL WebGL falling light streaks with organic color palette.', tags: ['webgl', 'ogl', 'light', 'falling', 'streaks'], source: 'react-bits', import: () => import('../components/Backgrounds/Lightfall/Lightfall'), controls: [{ name: 'colors', label: 'Colors', type: 'object', default: ['#A6C8FF', '#5227FF', '#FF9FFC'] }, { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 0.5 }, { name: 'streakCount', label: 'Streaks', type: 'range', min: 1, max: 16, step: 1, default: 2 }] },
  { id: 'lightning', name: 'Lightning', category: 'backgrounds', description: 'Raw WebGL lightning bolt effect with FBM noise.', tags: ['webgl', 'lightning', 'noise'], source: 'react-bits', import: () => import('../components/Backgrounds/Lightning/Lightning'), controls: [{ name: 'hue', label: 'Hue', type: 'range', min: 0, max: 360, step: 1, default: 230 }, { name: 'intensity', label: 'Intensity', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 }, { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 }] },
  { id: 'line-waves', name: 'LineWaves', category: 'backgrounds', description: 'OGL WebGL animated sine wave lines with color cycling.', tags: ['webgl', 'ogl', 'waves', 'lines'], source: 'react-bits', import: () => import('../components/Backgrounds/LineWaves/LineWaves'), controls: [{ name: 'speed', label: 'Speed', type: 'range', min: 0.05, max: 2, step: 0.05, default: 0.3 }, { name: 'brightness', label: 'Brightness', type: 'range', min: 0, max: 1, step: 0.05, default: 0.2 }, { name: 'color1', label: 'Color 1', type: 'color', default: '#ffffff' }] },
  { id: 'liquid-chrome', name: 'LiquidChrome', category: 'backgrounds', description: 'OGL WebGL liquid chrome distortion with mouse ripple.', tags: ['webgl', 'ogl', 'liquid', 'chrome', 'distortion'], source: 'react-bits', import: () => import('../components/Backgrounds/LiquidChrome/LiquidChrome'), controls: [{ name: 'baseColor', label: 'Base Color', type: 'object', default: [0.1, 0.1, 0.1] }, { name: 'amplitude', label: 'Amplitude', type: 'range', min: 0.1, max: 3, step: 0.1, default: 0.5 }, { name: 'speed', label: 'Speed', type: 'range', min: 0.05, max: 1, step: 0.05, default: 0.2 }] },
  { id: 'liquid-ether', name: 'LiquidEther', category: 'backgrounds', description: 'OGL WebGL liquid ether flow with organic color blending.', tags: ['webgl', 'ogl', 'liquid', 'ether', 'organic'], source: 'react-bits', import: () => import('../components/Backgrounds/LiquidEther/LiquidEther'), controls: [] },
  { id: 'orb', name: 'Orb', category: 'backgrounds', description: 'OGL WebGL glowing orb with organic light patterns.', tags: ['webgl', 'ogl', 'orb', 'glow'], source: 'react-bits', import: () => import('../components/Backgrounds/Orb/Orb'), controls: [] },
  { id: 'particles', name: 'Particles', category: 'backgrounds', description: 'OGL WebGL particle field with dynamic movement.', tags: ['webgl', 'ogl', 'particles', 'field'], source: 'react-bits', import: () => import('../components/Backgrounds/Particles/Particles'), controls: [] },
  { id: 'pixel-blast', name: 'PixelBlast', category: 'backgrounds', description: 'OGL WebGL pixel blast effect with particle dispersion.', tags: ['webgl', 'ogl', 'pixels', 'blast'], source: 'react-bits', import: () => import('../components/Backgrounds/PixelBlast/PixelBlast'), controls: [] },
  { id: 'pixel-snow', name: 'PixelSnow', category: 'backgrounds', description: 'OGL WebGL pixel snow/rain effect with falling particles.', tags: ['webgl', 'ogl', 'snow', 'pixels'], source: 'react-bits', import: () => import('../components/Backgrounds/PixelSnow/PixelSnow'), controls: [] },
  { id: 'plasma', name: 'Plasma', category: 'backgrounds', description: 'OGL WebGL plasma effect with flowing color bands.', tags: ['webgl', 'ogl', 'plasma', 'color'], source: 'react-bits', import: () => import('../components/Backgrounds/Plasma/Plasma'), controls: [] },
  { id: 'plasma-wave', name: 'PlasmaWave', category: 'backgrounds', description: 'OGL WebGL animated plasma wave effect.', tags: ['webgl', 'ogl', 'plasma', 'wave'], source: 'react-bits', import: () => import('../components/Backgrounds/PlasmaWave/PlasmaWave'), controls: [] },
  { id: 'prism', name: 'Prism', category: 'backgrounds', description: 'OGL WebGL prismatic light dispersion effect.', tags: ['webgl', 'ogl', 'prism', 'light'], source: 'react-bits', import: () => import('../components/Backgrounds/Prism/Prism'), controls: [] },
  { id: 'prismatic-burst', name: 'PrismaticBurst', category: 'backgrounds', description: 'OGL WebGL prismatic burst with rainbow dispersion.', tags: ['webgl', 'ogl', 'prism', 'burst', 'rainbow'], source: 'react-bits', import: () => import('../components/Backgrounds/PrismaticBurst/PrismaticBurst'), controls: [] },
  { id: 'radar', name: 'Radar', category: 'backgrounds', description: 'OGL WebGL radar sweep effect with rotating scan line.', tags: ['webgl', 'ogl', 'radar', 'scan'], source: 'react-bits', import: () => import('../components/Backgrounds/Radar/Radar'), controls: [] },
  { id: 'ripple-grid', name: 'RippleGrid', category: 'backgrounds', description: 'OGL WebGL ripple grid with wave propagation.', tags: ['webgl', 'ogl', 'ripple', 'grid', 'wave'], source: 'react-bits', import: () => import('../components/Backgrounds/RippleGrid/RippleGrid'), controls: [] },
  { id: 'shape-grid', name: 'ShapeGrid', category: 'backgrounds', description: 'OGL WebGL grid of animated shapes.', tags: ['webgl', 'ogl', 'grid', 'shapes'], source: 'react-bits', import: () => import('../components/Backgrounds/ShapeGrid/ShapeGrid'), controls: [] },
  { id: 'side-rays', name: 'SideRays', category: 'backgrounds', description: 'OGL WebGL side-emitted light rays effect.', tags: ['webgl', 'ogl', 'rays', 'light'], source: 'react-bits', import: () => import('../components/Backgrounds/SideRays/SideRays'), controls: [] },
  { id: 'silk', name: 'Silk', category: 'backgrounds', description: 'OGL WebGL flowing silk-like organic pattern.', tags: ['webgl', 'ogl', 'silk', 'flow'], source: 'react-bits', import: () => import('../components/Backgrounds/Silk/Silk'), controls: [] },
  { id: 'soft-aurora', name: 'SoftAurora', category: 'backgrounds', description: 'OGL WebGL soft aurora with gentle light bands.', tags: ['webgl', 'ogl', 'aurora', 'soft'], source: 'react-bits', import: () => import('../components/Backgrounds/SoftAurora/SoftAurora'), controls: [] },
  { id: 'threads', name: 'Threads', category: 'backgrounds', description: 'OGL WebGL threaded/tendril organic pattern.', tags: ['webgl', 'ogl', 'threads', 'tendrils'], source: 'react-bits', import: () => import('../components/Backgrounds/Threads/Threads'), controls: [] },
  { id: 'waves', name: 'Waves', category: 'backgrounds', description: 'OGL WebGL animated wave field with color cycling.', tags: ['webgl', 'ogl', 'waves', 'field'], source: 'react-bits', import: () => import('../components/Backgrounds/Waves/Waves'), controls: [] },
]

export function getByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return registry
  return registry.filter((entry) => entry.category === categoryId)
}

export function getById(id) {
  return registry.find((entry) => entry.id === id)
}
