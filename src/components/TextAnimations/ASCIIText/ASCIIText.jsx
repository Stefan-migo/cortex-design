import { useEffect, useRef } from 'react'
import './ASCIIText.css'

/* ponytail: Three.js is a genuine dependency here — WebGL vertex shaders
   cannot be polyfilled with CSS or Canvas 2D. Lazy import keeps it out of
   the main bundle when this component isn't used.
   Ceiling: no react-three-fiber wrapper, no OrbitControls, no post-processing.
   Upgrade: add OrbitControls for interactive 3D exploration. */
export function ASCIIText({
  text = 'ASCII',
  enableWaves = true,
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    let rafId
    let renderer
    let cleanup

    const init = async () => {
      const THREE = await import('three')

      const container = containerRef.current
      if (!container) return

      const width = container.clientWidth || 600
      const height = container.clientHeight || 200
      const aspect = width / height

      /* ponytail: orthographic camera — simplest 3D setup, no perspective.
         Ceiling: no depth-of-field, no parallax.
         Upgrade: switch to PerspectiveCamera for natural 3D look. */
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 1

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      /* ponytail: fixed-size canvas for text — no dynamic font sizing.
         Ceiling: text may clip if too long; no responsiveness.
         Upgrade: measure text width, adjust font size to fit. */
      const canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 100px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true

      /* ponytail: 64×64 segments — enough for smooth wave displacement.
         Ceiling: 4096 vertices, fine for desktop, heavy for mobile.
         Upgrade: reduce segments on low-end devices via devicePixelRatio check. */
      const geometry = new THREE.PlaneGeometry(2, 2 / aspect, 64, 64)

      const uniforms = {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uWaves: { value: enableWaves ? 1.0 : 0.0 },
      }

      /* ponytail: single sin wave per axis — no FBM, no noise texture.
         Ceiling: one frequency per axis, predictable wave pattern.
         Upgrade: multi-octave FBM for organic, turbulent waves. */
      const vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uWaves;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float wave = sin(pos.x * 4.0 + uTime * 1.5) * 0.04
                     + sin(pos.y * 3.0 - uTime) * 0.03;

          /* ponytail: mouse bulge via gaussian falloff — one exp(), no loops.
             Ceiling: single point of influence, no multi-touch.
             Upgrade: multiple cursors or raymarched cursor interaction. */
          float dx = pos.x - uMouse.x;
          float dy = pos.y - uMouse.y;
          float bulge = exp(-(dx*dx + dy*dy) * 4.0) * 0.08;

          pos.z += (wave + bulge) * uWaves;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `

      /* ponytail: ASCII grid via brightness-sampled pixelation + cell borders.
         No per-character glyph rendering — the grid + grayscale creates the
         ASCII aesthetic without a character atlas.
         Ceiling: 80-column fixed grid, no variable-width characters.
         Upgrade: use character glyph texture lookup for true ASCII art. */
      const fragmentShader = `
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          float cols = 80.0;
          float rows = cols / 4.0;
          vec2 grid = vec2(cols, rows);
          vec2 cellIdx = floor(vUv * grid);
          vec2 cellUv = fract(vUv * grid);

          /* Sample texture at cell center for brightness */
          vec2 sampleUv = (cellIdx + 0.5) / grid;
          vec4 texel = texture2D(uTexture, sampleUv);
          float brightness = dot(texel.rgb, vec3(0.299, 0.587, 0.114));

          /* Cell grid lines */
          float gridLine = 1.0 - step(0.88, max(cellUv.x, cellUv.y)) * 0.15;

          gl_FragColor = vec4(
            vec3(mix(0.05, 0.95, brightness)) * gridLine,
            smoothstep(0.02, 0.15, brightness)
          );
        }
      `

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const handleMouse = (e) => {
        const rect = container.getBoundingClientRect()
        const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const my = (1 - (e.clientY - rect.top) / rect.height) * (2 / aspect) - (1 / aspect)
        uniforms.uMouse.value.set(mx, my)
      }
      container.addEventListener('mousemove', handleMouse)

      const animate = () => {
        uniforms.uTime.value += 0.02
        renderer.render(scene, camera)
        rafId = requestAnimationFrame(animate)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(rafId)
        container.removeEventListener('mousemove', handleMouse)
        renderer.dispose()
        geometry.dispose()
        material.dispose()
        texture.dispose()
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }

    init()

    return () => {
      if (cleanup) cleanup()
    }
  }, [text, enableWaves])

  return (
    <div
      ref={containerRef}
      className={`ascii-text${className ? ' ' + className : ''}`}
      style={{ width: '100%', height: 200, cursor: enableWaves ? 'crosshair' : undefined }}
    />
  )
}
