import { useRef, useEffect } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

/* ponytail: OGL WebGL specular button — kept because the GLSL shader
   specular highlight is the core feature.
   Ceiling: requires WebGL, OGL dependency. */

const VERT = `#version 300 es\nin vec2 position;\nvoid main() { gl_Position = vec4(position, 0.0, 1.0); }\n`

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uCenter; uniform vec2 uHalfSize; uniform float uRadius; uniform float uAngle;
uniform float uPx; uniform vec3 uLineColor; uniform vec3 uBaseColor;
uniform float uIntensity; uniform float uShineSize; uniform float uShineFade; uniform float uThickness;
out vec4 fragColor;
float sdRoundedRect(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r; }
void main() {
  vec2 p = gl_FragCoord.xy - uCenter; float d = sdRoundedRect(p, uHalfSize, uRadius);
  float base = (1.0 - smoothstep(0.0, uPx, abs(d))) * 0.45;
  float hi = 0.0;
  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}`

export function SpecularButton({ children = 'Get Started', size = 'lg', radius = 18, className = '', disabled = false, onClick, type = 'button' }) {
  const btnRef = useRef(null); const fxRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current; const fx = fxRef.current; if (!btn || !fx) return
    const dpr = window.devicePixelRatio || 1
    let renderer, gl, program, mesh, ro, raf

    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr })
      gl = renderer.gl; gl.clearColor(0, 0, 0, 0); gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      const geometry = new Triangle(gl)
      program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms: { uCenter: { value: [0, 0] }, uHalfSize: { value: [1, 1] }, uRadius: { value: 0 }, uAngle: { value: 2.4 }, uPx: { value: dpr }, uLineColor: { value: [1, 1, 1] }, uBaseColor: { value: [0.32, 0.32, 0.32] }, uIntensity: { value: 1 }, uShineSize: { value: 0.17 }, uShineFade: { value: 0.7 }, uThickness: { value: 1 } } })
      mesh = new Mesh(gl, { geometry, program })
      fx.appendChild(gl.canvas)
      const resize = () => { const r = btn.getBoundingClientRect(); renderer.setSize(r.width + 40, r.height + 40); program.uniforms.uCenter.value = [(20 + r.width / 2) * dpr, (20 + r.height / 2) * dpr]; program.uniforms.uHalfSize.value = [(r.width / 2) * dpr, (r.height / 2) * dpr] }
      ro = new ResizeObserver(resize); ro.observe(btn); resize()
      const update = () => { raf = requestAnimationFrame(update); renderer.render({ scene: mesh }) }; raf = requestAnimationFrame(update)
    } catch (e) { console.warn('SpecularButton init error:', e) }

    return () => { if (raf) cancelAnimationFrame(raf); if (ro) ro.disconnect(); if (gl?.canvas?.parentNode === fx) fx.removeChild(gl.canvas); if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext() }
  }, [])

  const sizeMap = { sm: '48px', md: '56px', lg: '64px' }
  return (
    <button ref={btnRef} type={type} disabled={disabled} onClick={onClick} className={`specular-button specular-button--${size}${className ? ' ' + className : ''}`} style={{ position: 'relative', height: sizeMap[size] || '64px', padding: '0 32px', borderRadius: `${radius}px`, border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '16px', fontWeight: 600, overflow: 'hidden' }}>
      <span ref={fxRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  )
}
