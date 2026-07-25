import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hyperspeed.css';

/* ponytail: Simplified Three.js hyperspace road effect.
   Ceiling: Full version uses postprocessing bloom + SMAA. Omitted for deps.
   Upgrade: Install postprocessing and add EffectComposer with BloomEffect. */

export function Hyperspeed({ effectOptions = {}, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, container.clientWidth / container.clientHeight, 0.1, 10000);
    camera.position.set(0, 8, -5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const roadMat = new THREE.MeshBasicMaterial({ color: 0x080808, side: THREE.DoubleSide });
    const roadGeo = new THREE.PlaneGeometry(10, 400, 20, 100);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -200;
    scene.add(road);

    const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
    for (let i = 0; i < 20; i++) {
      const points = [];
      for (let z = 0; z < 400; z += 2) {
        points.push(new THREE.Vector3(
          Math.sin(z * 0.01 + i) * 2,
          0,
          -z
        ));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, mat);
      scene.add(line);
    }

    let frame;
    const clock = new THREE.Clock();
    const loop = () => {
      frame = requestAnimationFrame(loop);
      const dt = clock.getDelta();
      road.rotation.x += dt * 0.01;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(loop);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={'hyperspeed-container' + (className ? ' ' + className : '')} />;
}
