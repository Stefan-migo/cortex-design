import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './GridScan.css';

export function GridScan({
  lineThickness = 1,
  linesColor = '#2F293A',
  gridScale = 0.1,
  scanColor = '#FF9FFC',
  scanOpacity = 0.4,
  scanDirection = 'pingpong',
  scanDuration = 2.0,
  scanDelay = 2.0,
  noiseIntensity = 0.01,
  className = '',
  style,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const uniforms = {
      iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, 1) },
      iTime: { value: 0 },
      uLineThickness: { value: lineThickness },
      uLinesColor: { value: new THREE.Color(linesColor) },
      uScanColor: { value: new THREE.Color(scanColor) },
      uGridScale: { value: gridScale },
      uScanOpacity: { value: scanOpacity },
      uNoise: { value: noiseIntensity },
      uScanDirection: { value: scanDirection === 'backward' ? 1 : scanDirection === 'pingpong' ? 2 : 0 },
      uScanDuration: { value: Math.max(0.05, scanDuration) },
      uScanDelay: { value: Math.max(0, scanDelay) },
      uSkew: { value: new THREE.Vector2(0, 0) },
      uTilt: { value: 0 },
      uYaw: { value: 0 },
    };

    const frag = `
precision highp float;
uniform vec3 iResolution; uniform float iTime;
uniform float uLineThickness; uniform vec3 uLinesColor; uniform vec3 uScanColor;
uniform float uGridScale; uniform float uScanOpacity; uniform float uNoise;
uniform float uScanDirection; uniform float uScanDuration; uniform float uScanDelay;
uniform vec2 uSkew; uniform float uTilt; uniform float uYaw;
varying vec2 vUv;

float smoother01(float a, float b, float x) {
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  vec3 rd = normalize(vec3(uv, 2.0));
  vec2 sk = clamp(uSkew, vec2(-0.7), vec2(0.7));
  rd.xy += sk * rd.z;
  
  float t = -0.2 / rd.y;
  vec3 hit = vec3(uv * t / 2.0, t);
  float dist = length(hit);
  
  float gs = max(1e-5, uGridScale);
  vec2 gv = hit.xz / gs;
  float fx = fract(gv.x), fy = fract(gv.y);
  float ax = min(fx, 1.0 - fx), ay = min(fy, 1.0 - fy);
  float wx = fwidth(gv.x), wy = fwidth(gv.y);
  float tx = max(0.0, uLineThickness) * 0.5 * wx;
  float ty = max(0.0, uLineThickness) * 0.5 * wy;
  
  float lineX = 1.0 - smoothstep(tx, tx + wx, ax);
  float lineY = 1.0 - smoothstep(ty, ty + wy, ay);
  float lineMask = max(lineX, lineY);
  
  float fade = exp(-dist * 2.0);
  vec3 gridCol = uLinesColor * lineMask * fade;
  
  // Scan effect
  float dur = max(0.05, uScanDuration);
  float del = max(0.0, uScanDelay);
  float cycle = dur + del;
  float tCycle = mod(iTime, cycle);
  float phase = clamp((tCycle - del) / dur, 0.0, 1.0);
  if (uScanDirection > 0.5 && uScanDirection < 1.5) phase = 1.0 - phase;
  else if (uScanDirection > 1.5) {
    float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
    phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
  }
  
  float scanZ = phase * 2.0;
  float dz = abs(hit.z - scanZ);
  float sigma = 0.18 * 0.5;
  float pulse = exp(-0.5 * dz * dz / (sigma * sigma));
  float headFade = smoother01(0.0, 0.49, phase);
  float tailFade = 1.0 - smoother01(1.0 - 0.49, 1.0, phase);
  float scanLine = pulse * headFade * tailFade * clamp(uScanOpacity, 0.0, 1.0);
  
  vec3 color = gridCol + uScanColor * scanLine;
  float n = fract(sin(dot(gl_FragCoord.xy * 12.9898, vec2(12.9898,78.233))) * 43758.5453);
  color += (n - 0.5) * uNoise;
  
  fragColor = vec4(color, clamp(max(lineMask, scanLine), 0.0, 1.0));
}

void main(){ vec4 c; mainImage(c, gl_FragCoord.xy); gl_FragColor = c; }
`;

    const vert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let animId;
    const clock = new THREE.Clock();
    const loop = () => {
      animId = requestAnimationFrame(loop);
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(loop);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h, 1);
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [lineThickness, linesColor, gridScale, scanColor, scanOpacity, scanDirection, scanDuration, scanDelay, noiseIntensity]);

  return <div ref={containerRef} className={'gridscan-container' + (className ? ' ' + className : '')} style={style} {...props} />;
}
