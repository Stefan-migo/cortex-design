import { useEffect, useRef, useState } from 'react'
import './Lanyard.css'

/* ponytail: Lanyard requires @react-three/fiber, @react-three/drei,
   @react-three/rapier, and meshline. GLB assets (card.glb, lanyard.png)
   must be available at the paths the component expects.
   Ceiling: no SSR, requires WebGL via R3F, physics via Rapier.
   Upgrade: full implementation needs card.glb and lanyard.png assets. */

export function Lanyard({
  position = [0, 0, 30],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  lanyardWidth = 1,
  className = '',
}) {
  const [ready, setReady] = useState(false)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
      import('@react-three/rapier'),
    ])
    .then(() => setReady(true))
    .catch(() => setMissing(true))
  }, [])

  if (missing) {
    return (
      <div className={`lanyard-wrapper${className ? ' ' + className : ''}`} style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#120F17', color: '#888', borderRadius: '12px' }}>
        <p>Lanyard requires R3F, Rapier, and 3D assets</p>
      </div>
    )
  }

  if (!ready) {
    return <div className={`lanyard-wrapper${className ? ' ' + className : ''}`} style={{ height: '300px', background: '#120F17' }} />
  }

  return <LanyardInner position={position} fov={fov} transparent={transparent} frontImage={frontImage} backImage={backImage} lanyardWidth={lanyardWidth} className={className} />
}

function LanyardInner({ position, fov, transparent, frontImage, backImage, lanyardWidth, className }) {
  const { Canvas } = window.__R3F || {}

  return (
    <div className={`lanyard-wrapper${className ? ' ' + className : ''}`}>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
        <p>Lanyard — requires 3D assets (card.glb, lanyard.png)</p>
      </div>
    </div>
  )
}
