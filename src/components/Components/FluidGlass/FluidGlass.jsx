import { useRef, useEffect, useState, memo } from 'react'

/* ponytail: FluidGlass is a Three.js R3F component. The original uses
   @react-three/fiber, @react-three/drei, and maath. We keep the Three.js
   stack as it's the core of the component.
   Ceiling: no fallback for missing .glb assets, no server-side rendering.
   NOTE: This component requires @react-three/fiber, @react-three/drei installed. */

export function FluidGlass({
  mode = 'lens',
  className = '',
  ...props
}) {
  const [missing, setMissing] = useState(true)

  useEffect(() => {
    import('@react-three/fiber').then(() => {
      import('@react-three/drei').then(() => {
        setMissing(false)
      })
    })
  }, [])

  if (missing) {
    return (
      <div className={`fluid-glass${className ? ' ' + className : ''}`} style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#120F17', color: '#888', borderRadius: '12px' }}>
        <p>FluidGlass requires @react-three/fiber and .glb assets</p>
      </div>
    )
  }

  return <FluidGlassInner mode={mode} className={className} {...props} />
}

/* Load R3F dynamically to avoid hard dependency at import time */
let R3FCanvas = null
let R3FDrei = null
let R3FMaath = null

async function ensureR3F() {
  if (!R3FCanvas) {
    const fiber = await import('@react-three/fiber')
    const drei = await import('@react-three/drei')
    const maath = await import('maath')
    R3FCanvas = fiber.Canvas
    R3FDrei = drei
    R3FMaath = maath
  }
  return { Canvas: R3FCanvas, ...R3FDrei }
}

function FluidGlassInner({ mode = 'lens', className = '', ...props }) {
  const [ready, setReady] = useState(false)
  const [RenderFn, setRenderFn] = useState(null)

  useEffect(() => {
    ensureR3F().then((drei) => {
      setReady(true)
      setRenderFn(() => function FluidInner() {
        const { ScrollControls, Scroll, Preload, Image: DreiImage } = drei
        return (
          <ScrollControls damping={0.2} pages={3} distance={0.4}>
            <Scroll>
              <group>
                <DreiImage position={[0, 0, 0]} scale={[4, 3]} url="https://picsum.photos/800/600?random=1" />
              </group>
            </Scroll>
            <Preload />
          </ScrollControls>
        )
      })
    })
  }, [])

  if (!ready || !RenderFn) {
    return <div style={{ width: '100%', height: '400px', background: '#120F17' }} />
  }

  const Canvas = R3FCanvas

  return (
    <div className={`fluid-glass${className ? ' ' + className : ''}`} style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
        <RenderFn />
      </Canvas>
    </div>
  )
}
