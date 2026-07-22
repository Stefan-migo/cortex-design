---
name: "Animation Patterns Library — Reference"
source: "aggregated from Animate.css v4.1.1, Animista.net, GSAP SplitText, Motion.dev, and DRL site references"
source_type: aggregated
analyzed_at: 2026-07-21
analyzed_by: reference-analyst
tags:
  - animation
  - reference
  - patterns
  - entrance
  - exit
  - hover
  - scroll
  - text
  - transition
  - motion
stack:
  - css
  - gsap
  - motion-dev
  - vanilla-js
  - intersection-observer
---

# Animation Patterns Library

> Vocabulario compartido de animaciones para el agente de diseño.
> Cada patrón tiene: categoría, código listo, fuente real, complejidad y cuándo usarlo.
>
> **Licencias:** Animate.css (Hippocratic), Animista (FreeBSD), GSAP (tiene licencia comercial para ciertos usos — preferir variantes CSS cuando sea posible), Motion.dev (MIT).

---

## Legend

| Símbolo | Significado |
|---------|-------------|
| 🟢 Básico | CSS puro, sin dependencias |
| 🟡 Intermedio | CSS + un poco de JS (IntersectionObserver) |
| 🔴 Avanzado | Requiere librería externa o lógica JS compleja |

---

## 1. ENTRANCE — Cómo los elementos aparecen

### 1.1 Fade In
**Fuente:** Animate.css `fadeIn`
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Ideal para cualquier elemento que deba aparecer suavemente. Úsalo cuando no necesitás dirección ni impacto.

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.pattern-fade-in {
  animation: fadeIn 0.8s var(--ease-expo) forwards;
}
```

**Variantes (Animate.css):** `fadeInDown`, `fadeInUp`, `fadeInLeft`, `fadeInRight` — agregan translate en la dirección correspondiente.

### 1.2 Slide In
**Fuente:** Animate.css `slideInUp` / Animista `slide-in`
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Cuando el elemento viene desde afuera del viewport. Ideal para elementos que "entran en escena".

```css
@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.pattern-slide-up {
  animation: slideInUp 0.8s var(--ease-expo) forwards;
}
```

**Variantes:** `slideInDown`, `slideInLeft`, `slideInRight`.

### 1.3 Scale In
**Fuente:** Animate.css `zoomIn` / Animista `scale-in`
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para elementos que querés que "crezcan" desde un punto. Bueno para cards, modales, imágenes.

```css
@keyframes zoomIn {
  from {
    transform: scale3d(0.3, 0.3, 0.3);
    opacity: 0;
  }
  50% { opacity: 1; }
}

.pattern-scale-in {
  animation: zoomIn 0.8s var(--ease-expo) forwards;
}
```

**Variante sutil:** `scale(0.92 → 1)` para cards que revelan su contenido.

### 1.4 Clip-Path Reveal (Cortina)
**Fuente:** DRL ref-003 Voyeur Vérité / ref-002 Glenn Catteeuw
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para entradas dramáticas con personalidad — la cortina que se abre, el lente que se destapa.

```css
@keyframes curtainReveal {
  0%   { clip-path: inset(0 50% 0 50%); }
  100% { clip-path: inset(0 0 0 0); }
}

.pattern-curtain {
  animation: curtainReveal 1.6s cubic-bezier(0.19, 1, 0.22, 1) 0.3s forwards;
  will-change: clip-path;
}
```

**Variantes:**
- `inset(0 0 100% 0)` → reveal desde abajo
- `inset(100% 0 0 0)` → reveal desde arriba
- `inset(0 0 0 100%)` → reveal desde derecha
- `circle(0% at 50% 50%) → circle(100% at 50% 50%)` → circle reveal
- `polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%) → polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` → slit vertical

### 1.5 Rotate In
**Fuente:** Animate.css `rotateIn`
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Elementos decorativos, íconos, o cuando querés dar una sensación de "giro" dramático.

```css
@keyframes rotateIn {
  from {
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
```

### 1.6 Blur In
**Fuente:** Animista `blur-in`
**Tipo:** 🟡 Intermedio (CSS)
**Cuándo:** Para textos o imágenes que querés que aparezcan "enfocándose" — muy cinematográfico.

```css
@keyframes blurIn {
  from {
    filter: blur(12px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: 1;
  }
}

.pattern-blur-in {
  animation: blurIn 1.2s var(--ease-expo) forwards;
}
```

### 1.7 Bounce In
**Fuente:** DRL ref-005 Blobmixer (notification entrance)
**Tipo:** 🟡 Intermedio (CSS)
**Cuándo:** Para elementos que necesitan atención inmediata — notificaciones, alerts, badges.

```css
@keyframes bounceIn {
  0%   { transform: scale(0); opacity: 0; }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

.pattern-bounce-in {
  animation: bounceIn 0.6s var(--ease-expo) forwards;
}
```

---

## 2. EXIT — Cómo los elementos desaparecen

### 2.1 Fade Out
**Fuente:** Animate.css `fadeOut`
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** La salida default. Simple, limpia, no conflictiva.

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
```

### 2.2 Slide Out
**Fuente:** Animate.css `slideOutDown`
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Cuando un elemento "sale de escena" en una dirección. Ideal para transiciones de bloque.

### 2.3 Scale Out
**Fuente:** Animista `scale-out`
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** El inverso del scale-in. Bueno para descartar elementos.

```css
@keyframes scaleOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}
```

### 2.4 Clip-Path Close
**Fuente:** DRL ref-003 Voyeur Vérité (inverso del curtain reveal)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Cuando un bloque "se cierra" como una cortina o lente. Ideal para transiciones de sección.

```css
@keyframes clipPathClose {
  0%   { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(0 50% 0 50%); }
}
```

### 2.5 Blur Out
**Fuente:** DRL ref-002 Glenn Catteeuw (efecto de lente)
**Tipo:** 🟡 Intermedio (CSS)
**Cuándo:** Cuando un elemento "pierde foco" visualmente. Muy cinematográfico para transiciones.

```css
@keyframes blurOut {
  from {
    filter: blur(0);
    opacity: 1;
  }
  to {
    filter: blur(12px);
    opacity: 0;
  }
}
```

### 2.6 Fade Out/In Combo
**Fuente:** DRL ref-005 Blobmixer (content transitions)
**Tipo:** 🟡 Intermedio (CSS)
**Cuándo:** Para reemplazar contenido — fade out un elemento y fade in el nuevo en el mismo espacio.

```css
@keyframes fadeOutIn {
  0%   { opacity: 1; }
  50%  { opacity: 0; }
  100% { opacity: 1; }
}
```

---

## 3. HOVER — Interacción del usuario

### 3.1 Scale Up
**Fuente:** Motion.dev `whileHover={{ scale: 1.1 }}` / CSS estándar
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** El hover más universal. Botones, cards, links.

```css
.pattern-hover-scale {
  transition: transform 0.4s var(--ease-expo);
  will-change: transform;
}
.pattern-hover-scale:hover {
  transform: scale(1.05);
}
```

### 3.2 Glow / Border Accent
**Fuente:** Voyeur Vérité (pillar cards border on hover)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Cuando querés un feedback sutil sin mover el elemento.

```css
.pattern-hover-glow {
  transition: border-color 0.6s var(--ease-expo), box-shadow 0.6s var(--ease-expo);
}
.pattern-hover-glow:hover {
  border-color: var(--vl-accent, #ee3335);
  box-shadow: 0 0 24px rgba(238, 51, 53, 0.08);
}
```

### 3.3 Sibling Dim
**Fuente:** DRL ref-003 Voyeur Vérité (pillars section)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Cuando tenés múltiples elementos y querés que el hover destaque uno sobre los demás.

```css
.parent:hover .child:not(:hover) {
  opacity: 0.5;
}
.child {
  transition: opacity 0.6s var(--ease-expo);
}
```

### 3.4 Text Gradient Shift
**Fuente:** Glenn Catteeuw + diseño editorial moderno
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para headings y títulos con personalidad.

```css
.pattern-hover-gradient {
  background: linear-gradient(135deg, var(--vl-text), var(--vl-text));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.6s var(--ease-expo);
  background-size: 200% 200%;
  background-position: 0% 50%;
}
.pattern-hover-gradient:hover {
  background-position: 100% 50%;
}
```

### 3.5 Text Stroke Reveal
**Fuente:** DRL ref-002 Glenn Catteeuw (split-text hover)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para títulos con efecto de "llenado" al hover. Elegante.

```css
.pattern-hover-stroke {
  color: transparent;
  -webkit-text-stroke: 1px currentColor;
  transition: -webkit-text-stroke-color 0.4s, color 0.4s;
}
.pattern-hover-stroke:hover {
  color: currentColor;
  -webkit-text-stroke-color: transparent;
}
```

### 3.6 Background Shift
**Fuente:** Motion.dev `whileHover` / CSS transitions
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para botones con personalidad.

```css
.pattern-hover-bg {
  background: linear-gradient(135deg, transparent 50%, var(--vl-accent) 50%);
  background-size: 250% 100%;
  background-position: 100% 0;
  transition: background-position 0.6s var(--ease-expo);
}
.pattern-hover-bg:hover {
  background-position: 0 0;
}
```

### 3.7 SVG Hover Fill
**Fuente:** DRL ref-005 Blobmixer (VR button icon)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para íconos SVG en botones o links — elegancia pura y micro-interacción de alto impacto.

```css
.icon svg {
  fill: transparent;
  transition: fill 0.3s ease-out;
}
.icon:hover svg {
  fill: currentColor;
}
```

### 3.8 Underline Reveal
**Fuente:** DRL ref-005 Blobmixer (link hover)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para links con underline animado — clásico pero efectivo.

```css
a::after {
  content: '';
  width: 100%;
  height: 1px;
  display: block;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 300ms var(--ease-expo);
}
a:hover::after {
  transform: scaleX(1);
}
```

---

## 4. SCROLL-DRIVEN — Animaciones vinculadas al scroll

### 4.1 Reveal on Intersection
**Fuente:** Motion.dev `whileInView` / IntersectionObserver API
**Tipo:** 🟡 Intermedio (JS + CSS)
**Cuándo:** Cuando un elemento debe animarse al entrar al viewport. El patrón más común.

```jsx
// JS (React)
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 }
  );
  observer.observe(elementRef.current);
  return () => observer.disconnect();
}, []);
```

```css
/* CSS */
.pattern-reveal {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 1.2s var(--ease-expo), transform 1.2s var(--ease-expo);
}
.pattern-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

**Variante clip-path:**
```css
.pattern-reveal-clip {
  clip-path: inset(0 50% 0 50%);
  transition: clip-path 1.2s var(--ease-expo);
}
.pattern-reveal-clip.revealed {
  clip-path: inset(0 0 0 0);
}
```

### 4.2 Stagger (Cascada)
**Fuente:** Motion.dev `stagger` / Animate.css delay utilities
**Tipo:** 🟡 Intermedio (CSS + JS)
**Cuándo:** Múltiples elementos que entran en secuencia. Cards, listas, grids.

```css
.pattern-stagger-item {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 1.2s var(--ease-expo), transform 1.2s var(--ease-expo);
  transition-delay: calc(var(--item-index) * 120ms);
}
.pattern-stagger-item.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

### 4.3 Parallax (Scroll-linked)
**Fuente:** Motion.dev `useScroll` / GSAP ScrollTrigger / Voyeur Vérité ghost text
**Tipo:** 🔴 Avanzado (JS + CSS)
**Cuándo:** Cuando un elemento se mueve a velocidad diferente que el scroll. Para profundidad y dramatismo.

```jsx
// JS: Ghost text parallax (Voyeur pattern)
useEffect(() => {
  function onScroll() {
    const rect = elementRef.current.getBoundingClientRect();
    const viewH = window.innerHeight;
    const progress = Math.max(0, Math.min(1,
      (viewH - rect.top) / (viewH + rect.height)
    ));
    ghostRef.current.style.transform = `translateY(${(progress - 0.5) * 80}px)`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

```css
.pattern-parallax-ghost {
  will-change: transform;
  /* El ghost está detrás del texto principal, se mueve más lento/opuesto */
}
```

### 4.4 Progress-Driven (Scroll Timeline)
**Fuente:** CSS Scroll-Driven Animations spec (navegadores modernos)
**Tipo:** 🟡 Intermedio (CSS puro)
**Cuándo:** Cuando querés que una animación progrese con el scroll sin JS. Para navegadores Chromium.

```css
/* Experimental — Chromium 115+ */
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.pattern-scroll-progress {
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}
```

---

## 5. TEXT — Animaciones específicas para texto

### 5.1 Split Characters (Letra por letra)
**Fuente:** GSAP SplitText / Motion.dev
**Tipo:** 🔴 Avanzado (requiere librería)
**Cuándo:** Para títulos hero donde cada letra entra con personalidad.

```javascript
// GSAP SplitText approach (code reference)
// gsap.registerPlugin(SplitText);
// const split = SplitText.create(".heading", { type: "chars" });
// gsap.from(split.chars, { y: 40, opacity: 0, stagger: 0.02, duration: 0.5 });
```

### 5.2 Split Words (Palabra por palabra)
**Fuente:** GSAP SplitText (words) / Motion.dev
**Tipo:** 🔴 Avanzado (requiere librería o JS manual)
**Cuándo:** Para frases donde cada palabra se revela secuencialmente.

```javascript
// GSAP SplitText approach
// SplitText.create(".heading", { type: "words" });
// gsap.from(split.words, { y: 20, opacity: 0, stagger: 0.04 });
```

### 5.3 Split Lines (Línea por línea)
**Fuente:** GSAP SplitText (lines) / Motion.dev `splitLines`
**Tipo:** 🔴 Avanzado
**Cuándo:** Para párrafos donde cada línea se revela como un "verso".

```javascript
// GSAP SplitText — lines with mask approach
// SplitText.create(".text", { type: "lines", mask: "lines" });
// gsap.from(split.lines, { y: "110%", autoAlpha: 0, stagger: 0.07 });
```

### 5.4 Typewriter
**Fuente:** Animista / CSS clásico / JS vanilla
**Tipo:** 🟡 Intermedio (CSS + JS mínimo)
**Cuándo:** Para efectos de "máquina de escribir" en textos cortos.

```css
@keyframes typing {
  from { width: 0; }
  to   { width: 100%; }
}
@keyframes blink {
  50% { border-color: transparent; }
}
.pattern-typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  animation: typing 3s steps(40) forwards, blink 0.75s step-end infinite;
}
```

### 5.5 Gradient Text
**Fuente:** Voyeur Vérité hero / Glenn Catteeuw
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para headings con gradiente de color que no necesitan animación per se, sino presencia visual.

```css
.pattern-text-gradient {
  background: linear-gradient(180deg, var(--vl-text) 40%, var(--vl-accent) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 5.6 Text Mask Reveal
**Fuente:** GSAP SplitText mask / Voyeur Vérité typography patterns
**Tipo:** 🟡 Intermedio (CSS clip-path)
**Cuándo:** Para revelar texto como si se "destapara" desde un costado.

```css
.pattern-text-mask {
  overflow: hidden;
}
.pattern-text-mask span {
  display: block;
  animation: textReveal 1.2s var(--ease-expo) forwards;
  transform-origin: left;
}

@keyframes textReveal {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

### 5.7 Letter Stagger (CSS-only con datos)
**Fuente:** CSS avanzado + `--char-index`
**Tipo:** 🟡 Intermedio (CSS con style de JS mínimo)
**Cuándo:** Split de letras sin librería. Ideal cuando no querés depender de GSAP.

```jsx
// JSX: wrap each char in a span with --char-index
{"HELLO".split("").map((char, i) => (
  <span key={i} className="pattern-letter" style={{ '--char-index': i }}>
    {char === " " ? "\u00A0" : char}
  </span>
))}
```

```css
.pattern-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(1rem);
  animation: letterIn 0.6s var(--ease-expo) forwards;
  animation-delay: calc(var(--char-index) * 40ms);
}
@keyframes letterIn {
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 6. BLOCK TRANSITIONS — Cómo las secciones transicionan entre sí

### 6.1 Clip-Path Morph (Sección entrante)
**Fuente:** DRL ref-003 Voyeur Vérité (history SVG morph)
**Tipo:** 🔴 Avanzado (SVG clip-path + JS scroll)
**Cuándo:** Cuando UNA sección se transforma en la siguiente mediante morphing del clip-path. Dramático.

```css
/* La sección entrante empieza recortada y se revela */
.pattern-block-morph-enter {
  clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  transition: clip-path 1.4s var(--ease-expo);
}
.pattern-block-morph-enter.active {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

**Variantes SVG morph:** 14 pasos predefinidos para morphing entre imágenes (Voyeur Vérité history section).

### 6.2 Slide Cover (Nueva sección cubre a la anterior)
**Fuente:** Patrón de scroll storytelling estándar
**Tipo:** 🟡 Intermedio (CSS + JS scroll)
**Cuándo:** La nueva sección "cubre" a la anterior desde una dirección.

```css
.pattern-block-cover {
  position: relative;
  z-index: 1;
  transform: translateY(100vh); /* Empieza fuera de pantalla */
  transition: transform 1.4s var(--ease-expo);
}
.pattern-block-cover.active {
  transform: translateY(0);
}
```

### 6.3 Gradient Wipe
**Fuente:** Animista / WebGL mask patterns
**Tipo:** 🟡 Intermedio (CSS mask-image)
**Cuándo:** Una sección se desvanece en la siguiente mediante un gradiente que se desplaza.

```css
.pattern-block-wipe {
  mask-image: linear-gradient(to bottom, transparent 0%, black 50%, black 100%);
  mask-size: 100% 300%;
  mask-position: 0 0;
  transition: mask-position 1.4s var(--ease-expo);
}
.pattern-block-wipe.active {
  mask-position: 0 -100%;
}
```

### 6.4 Video / Image Crossfade
**Fuente:** DRL ref-003 Voyeur Vérité (pillars video backgrounds)
**Tipo:** 🟡 Intermedio (CSS opacity transition)
**Cuándo:** Cuando dos videos/imágenes se superponen y crossfadean.

```css
.pattern-crossfade {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s var(--ease-expo);
}
.pattern-crossfade.active {
  opacity: 1;
}
```

---

## 7. SPECIAL — Efectos especiales

### 7.1 SVG Path Morph
**Fuente:** DRL ref-003 Voyeur Vérité (history SVG clip-path morph)
**Tipo:** 🔴 Avanzado (SVG + JS)
**Cuándo:** Para transiciones entre formas complejas. Ideal para logotipos, máscaras, backgrounds.

```javascript
// Concepto: cambiar el atributo 'd' de un path SVG con transición
// Requiere que todos los paths tengan el MISMO número de puntos
// Voyeur Vérité usa 14 paths pre-definidos y cambia entre ellos con scroll
```

### 7.2 Blend-Mode Layers
**Fuente:** DRL ref-003 Voyeur Vérité (contact form backgrounds)
**Tipo:** 🟡 Intermedio (CSS mix-blend-mode)
**Cuándo:** Para fondos atmosféricos con textura.

```css
.pattern-blend-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pattern-blend-layer--color-burn {
  background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(238,51,53,0.06) 2px, rgba(238,51,53,0.06) 4px);
  mix-blend-mode: color-burn;
}
.pattern-blend-layer--difference {
  background: radial-gradient(ellipse at 50% 45%, rgba(238,51,53,0.18) 0%, transparent 60%);
  mix-blend-mode: difference;
}
```

### 7.3 Border-Radius Morph (Blob Loader)
**Fuente:** DRL ref-005 Blobmixer (loading blob)
**Tipo:** 🟡 Intermedio (CSS)
**Cuándo:** Para loaders con personalidad — en lugar de un spinner, una forma orgánica que respira. También usable como fondo decorativo animado.

```css
@keyframes blobMorph {
  0%   { transform: scale(0.9);  border-radius: 51% 49% 51% 49% / 45% 44% 56% 55%; }
  33%  { transform: scale(1);    border-radius: 54% 46% 54% 46% / 45% 46% 54% 55%; }
  66%  { transform: scale(0.9);  border-radius: 48% 52% 48% 52% / 49% 41% 59% 51%; }
  100% { transform: scale(1);    border-radius: 51% 49% 51% 49% / 45% 44% 56% 55%; }
}

.pattern-blob-loader {
  width: 14vw;
  height: 14vw;
  min-width: 100px;
  min-height: 100px;
  background: var(--vl-accent, #000);
  animation: blobMorph 2s ease-in-out infinite alternate;
}
```

### 7.4 Floating / Levitate
**Fuente:** DRL ref-005 Blobmixer (Web3 view floating element)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para elementos decorativos que querés que tengan vida propia — flotan suavemente.

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

.pattern-float {
  animation: float 3s ease-in-out infinite;
}
```

### 7.5 Blink
**Fuente:** DRL ref-005 Blobmixer (export recording indicator)
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para indicar estado activo — grabando, cargando, esperando.

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

.pattern-blink {
  animation: blink 1s step-end infinite;
}
```

### 7.6 Continuous Rotate
**Fuente:** DRL ref-005 Blobmixer (Remix CTA ring) + Animista
**Tipo:** 🟢 Básico (CSS)
**Cuándo:** Para loaders, spinners o elementos decorativos que giran sin parar.

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.pattern-spin {
  animation: spin 4s linear infinite;
}
```

---

## Quick Reference Card

| # | Patrón | Tipo | Complejidad | Fuente |
|---|--------|------|-------------|--------|
| 1.1 | Fade In | Entrada | 🟢 | Animate.css |
| 1.2 | Slide In | Entrada | 🟢 | Animate.css |
| 1.3 | Scale In | Entrada | 🟢 | Animate.css |
| 1.4 | Clip-Path Reveal | Entrada | 🟢 | Voyeur Vérité |
| 1.5 | Rotate In | Entrada | 🟢 | Animate.css |
| 1.6 | Blur In | Entrada | 🟡 | Animista |
| 1.7 | Bounce In | Entrada | 🟡 | Blobmixer |
| 2.1–2.5 | Fade/Slide/Scale/Clip/Blur Out | Salida | 🟢 | Varias |
| 2.6 | Fade Out/In Combo | Salida | 🟡 | Blobmixer |
| 3.1 | Scale Up | Hover | 🟢 | Motion.dev |
| 3.2 | Glow / Border | Hover | 🟢 | Voyeur Vérité |
| 3.3 | Sibling Dim | Hover | 🟢 | Voyeur Vérité |
| 3.4 | Text Gradient Shift | Hover | 🟢 | Glenn Catteeuw |
| 3.5 | Text Stroke Reveal | Hover | 🟢 | Glenn Catteeuw |
| 3.6 | Background Shift | Hover | 🟢 | Motion.dev |
| 3.7 | SVG Hover Fill | Hover | 🟢 | Blobmixer |
| 3.8 | Underline Reveal | Hover | 🟢 | Blobmixer |
| 4.1 | Intersection Reveal | Scroll | 🟡 | Motion.dev |
| 4.2 | Stagger Cascade | Scroll | 🟡 | Motion.dev |
| 4.3 | Parallax | Scroll | 🔴 | Voyeur / GSAP |
| 4.4 | Scroll Progress | Scroll | 🟡 | CSS Spec |
| 5.1 | Split Characters | Texto | 🔴 | GSAP SplitText |
| 5.2 | Split Words | Texto | 🔴 | GSAP SplitText |
| 5.3 | Split Lines | Texto | 🔴 | GSAP SplitText |
| 5.4 | Typewriter | Texto | 🟡 | Animista |
| 5.5 | Gradient Text | Texto | 🟢 | Voyeur / Glenn |
| 5.6 | Text Mask Reveal | Texto | 🟡 | GSAP mask |
| 5.7 | Letter Stagger | Texto | 🟡 | CSS custom props |
| 6.1 | Clip-Path Morph | Transición | 🔴 | Voyeur Vérité |
| 6.2 | Slide Cover | Transición | 🟡 | Scroll storytell |
| 6.3 | Gradient Wipe | Transición | 🟡 | Animista |
| 6.4 | Video Crossfade | Transición | 🟡 | Voyeur Vérité |
| 7.1 | SVG Path Morph | Special | 🔴 | Voyeur Vérité |
| 7.2 | Blend-Mode Layers | Special | 🟡 | Voyeur Vérité |
| 7.3 | Border-Radius Morph (Blob) | Special | 🟡 | Blobmixer |
| 7.4 | Floating / Levitate | Special | 🟢 | Blobmixer |
| 7.5 | Blink | Special | 🟢 | Blobmixer |
| 7.6 | Continuous Rotate | Special | 🟢 | Blobmixer |
