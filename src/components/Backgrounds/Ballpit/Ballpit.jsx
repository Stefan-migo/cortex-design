import { useEffect, useRef } from 'react';
import {
  ACESFilmicToneMapping, AmbientLight, Color, InstancedMesh, MathUtils,
  MeshPhysicalMaterial, Object3D, PerspectiveCamera, Plane, PMREMGenerator,
  PointLight, Raycaster, Scene, ShaderChunk, SphereGeometry, SRGBColorSpace,
  Timer, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import './Ballpit.css';

/* ponytail: This is a simplified Three.js ballpit. The full ReactBits version uses GSAP + Observer classes.
   Ceiling: Missing: GSAP-based scroll/pause controls, memory-efficient disposal with WeakMap pattern.
   Upgrade: If perf issues arise, switch to InstancedMesh with custom physics solver. */

const TMP_OBJECT = new Object3D();

class SimConfig {
  constructor(opts = {}) {
    this.count = opts.count ?? 200;
    this.minSize = opts.minSize ?? 0.5;
    this.maxSize = opts.maxSize ?? 1;
    this.size0 = opts.size0 ?? 1;
    this.gravity = opts.gravity ?? 0.5;
    this.friction = opts.friction ?? 0.9975;
    this.wallBounce = opts.wallBounce ?? 0.95;
    this.maxVelocity = opts.maxVelocity ?? 0.15;
    this.maxX = opts.maxX ?? 5;
    this.maxY = opts.maxY ?? 5;
    this.maxZ = opts.maxZ ?? 2;
    this.controlSphere0 = opts.controlSphere0 ?? false;
    this.followCursor = opts.followCursor ?? true;
  }
}

class PhysicsSim {
  constructor(config) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.center = new Vector3();
    this.initPositions();
    this.setSizes();
  }

  initPositions() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const idx = 3 * i;
      positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX);
      positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY);
      positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
    }
  }

  update(deltaInfo) {
    const { config, center, positionData, sizeData, velocityData } = this;
    let startIdx = 0;
    if (config.controlSphere0) {
      startIdx = 1;
      new Vector3().fromArray(positionData, 0).lerp(center, 0.1).toArray(positionData, 0);
      new Vector3(0, 0, 0).toArray(velocityData, 0);
    }
    for (let idx = startIdx; idx < config.count; idx++) {
      const base = 3 * idx;
      const pos = new Vector3().fromArray(positionData, base);
      const vel = new Vector3().fromArray(velocityData, base);
      vel.y -= deltaInfo.delta * config.gravity * sizeData[idx];
      vel.multiplyScalar(config.friction);
      vel.clampLength(0, config.maxVelocity);
      pos.add(vel);
      pos.toArray(positionData, base);
      vel.toArray(velocityData, base);
    }
    for (let idx = startIdx; idx < config.count; idx++) {
      const base = 3 * idx;
      const pos = new Vector3().fromArray(positionData, base);
      const vel = new Vector3().fromArray(velocityData, base);
      const radius = sizeData[idx];
      for (let jdx = idx + 1; jdx < config.count; jdx++) {
        const otherBase = 3 * jdx;
        const otherPos = new Vector3().fromArray(positionData, otherBase);
        const otherVel = new Vector3().fromArray(velocityData, otherBase);
        const diff = new Vector3().copy(otherPos).sub(pos);
        const dist = diff.length();
        const sumRadius = radius + sizeData[jdx];
        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          const correction = diff.normalize().multiplyScalar(0.5 * overlap);
          pos.sub(correction);
          vel.sub(correction.clone().multiplyScalar(Math.max(vel.length(), 1)));
          pos.toArray(positionData, base);
          vel.toArray(velocityData, base);
          otherPos.add(correction);
          otherVel.add(correction.clone().multiplyScalar(Math.max(otherVel.length(), 1)));
          otherPos.toArray(positionData, otherBase);
          otherVel.toArray(velocityData, otherBase);
        }
      }
      if (config.controlSphere0) {
        const diff = new Vector3().copy(new Vector3().fromArray(positionData, 0)).sub(pos);
        const d = diff.length();
        const sumRadius0 = radius + sizeData[0];
        if (d < sumRadius0) {
          const correction = diff.normalize().multiplyScalar(sumRadius0 - d);
          pos.sub(correction);
          vel.sub(correction.clone().multiplyScalar(Math.max(vel.length(), 2)));
        }
      }
      if (Math.abs(pos.x) + radius > config.maxX) {
        pos.x = Math.sign(pos.x) * (config.maxX - radius);
        vel.x = -vel.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(pos.y) + radius > config.maxY) {
          pos.y = Math.sign(pos.y) * (config.maxY - radius);
          vel.y = -vel.y * config.wallBounce;
        }
      } else if (pos.y - radius < -config.maxY) {
        pos.y = -config.maxY + radius;
        vel.y = -vel.y * config.wallBounce;
      }
      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(pos.z) + radius > maxBoundary) {
        pos.z = Math.sign(pos.z) * (config.maxZ - radius);
        vel.z = -vel.z * config.wallBounce;
      }
      pos.toArray(positionData, base);
      vel.toArray(velocityData, base);
    }
  }
}

class SphereMaterial extends MeshPhysicalMaterial {
  constructor(params) {
    super(params);
    this.defines = { USE_UV: '' };
    this.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.fragmentShader =
        `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
        ` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
        `
      );
      const lightsChunk = ShaderChunk.lights_fragment_begin.replaceAll(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        `
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', lightsChunk);
    };
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 },
    };
  }
}

class SphereField extends InstancedMesh {
  constructor(renderer, params = {}) {
    const config = new SimConfig(params);
    const roomEnv = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(roomEnv).texture;
    const geometry = new SphereGeometry();
    const material = new SphereMaterial({
      envMap: envTexture,
      metalness: 0.5,
      roughness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      ...params.materialParams,
    });
    material.envMapRotation.x = -Math.PI / 2;
    super(geometry, material, config.count);
    this.config = config;
    this.physics = new PhysicsSim(config);
    this.ambientLight = new AmbientLight(0xffffff, 1);
    this.add(this.ambientLight);
    this.light = new PointLight(0xffffff, 200);
    this.add(this.light);
    this.setColors([0, 0, 0]);
    pmrem.dispose();
    roomEnv.dispose();
  }

  setColors(colors) {
    if (!Array.isArray(colors) || colors.length < 1) return;
    const colorObjs = colors.map((c) => new Color(c));
    for (let idx = 0; idx < this.count; idx++) {
      const ratio = idx / this.count;
      const ci = Math.min(Math.floor(ratio * (colorObjs.length - 1)), colorObjs.length - 2);
      const t = ratio * (colorObjs.length - 1) - ci;
      const col = new Color().copy(colorObjs[ci]).lerp(colorObjs[ci + 1] || colorObjs[ci], t);
      this.setColorAt(idx, col);
    }
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  update(deltaInfo) {
    this.physics.update(deltaInfo);
    for (let idx = 0; idx < this.count; idx++) {
      TMP_OBJECT.position.fromArray(this.physics.positionData, 3 * idx);
      if (idx === 0 && !this.config.followCursor) {
        TMP_OBJECT.scale.setScalar(0);
      } else {
        TMP_OBJECT.scale.setScalar(this.physics.sizeData[idx]);
      }
      TMP_OBJECT.updateMatrix();
      this.setMatrixAt(idx, TMP_OBJECT.matrix);
      if (idx === 0) this.light.position.copy(TMP_OBJECT.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

export function Ballpit({
  count = 200,
  followCursor = true,
  className = '',
  ...props
}) {
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = ACESFilmicToneMapping;

    const scene = new Scene();
    const camera = new PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 6, 16);
    camera.lookAt(0, 0, 0);

    const cfg = new SimConfig({ followCursor, ...props });
    const spheres = new SphereField(renderer, {
      count,
      followCursor,
      ...props,
    });
    cfg.maxX = 6;
    cfg.maxY = 4;
    scene.add(spheres);

    const clock = new Timer();
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const intersectPoint = new Vector3();
    let isPaused = false;
    let animId;

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(new Vector2(x, y), camera);
      camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, intersectPoint);
      spheres.physics.center.copy(intersectPoint);
      spheres.config.controlSphere0 = true;
    }

    function onPointerLeave() {
      spheres.config.controlSphere0 = false;
    }

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      cfg.maxX = (w / h) * 4;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    function loop() {
      clock.update();
      const delta = clock.getDelta();
      if (!isPaused) spheres.update({ delta });
      renderer.render(scene, camera);
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    cleanupRef.current = () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      renderer.dispose();
      renderer.forceContextLoss();
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`ballpit-canvas${className ? ' ' + className : ''}`}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
