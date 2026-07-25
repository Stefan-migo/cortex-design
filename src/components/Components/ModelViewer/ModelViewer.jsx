import { useEffect, useRef, useState } from 'react'

/* ponytail: R3F 3D model viewer — kept because Three.js rendering is the core.
   Ceiling: requires @react-three/fiber, @react-three/drei, three.
   Upgrade: full implementation loads GLB/FBX/OBJ models via R3F loaders. */

export function ModelViewer({
  url,
  width = 400, height = 400,
  defaultZoom = 0.5, autoRotate = false, autoRotateSpeed = 0.35,
  enableManualRotation = true, enableManualZoom = true,
  className = '',
}) {
  const [ready, setReady] = useState(false)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    import('@react-three/fiber').then(() => import('@react-three/drei')).then(() => setReady(true)).catch(() => setMissing(true))
  }, [])

  if (missing) {
    return (
      <div className={className} style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#120F17', color: '#888', borderRadius: '12px' }}>
        <p>ModelViewer requires R3F and 3D model URL</p>
      </div>
    )
  }

  if (!ready) {
    return <div className={className} style={{ width, height, background: '#120F17', borderRadius: '12px' }} />
  }

  return <div className={className} style={{ width, height, borderRadius: '12px', overflow: 'hidden', background: '#120F17', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>3D Model: {url?.split('/').pop()}</div>
}
