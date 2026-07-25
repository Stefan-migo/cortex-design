import { useRef, useEffect } from 'react';
import './Lightning.css';

export function Lightning({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1, className = '' }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vertSrc = 'attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0.0,1.0);}';
    const fragSrc = 'precision mediump float;uniform vec2 iResolution;uniform float iTime;uniform float uHue;uniform float uXOffset;uniform float uSpeed;uniform float uIntensity;uniform float uSize;vec3 hsv2rgb(vec3 c){vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);return c.z*mix(vec3(1.0),rgb,c.y);}float hash12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}float noise(vec2 p){vec2 ip=floor(p);vec2 fp=fract(p);float a=hash12(ip);float b=hash12(ip+vec2(1.0,0.0));float c=hash12(ip+vec2(0.0,1.0));float d=hash12(ip+vec2(1.0,1.0));vec2 t=fp*fp*(3.0-2.0*fp);return mix(mix(a,b,t.x),mix(c,d,t.x),t.y);}float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<6;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}void main(){vec2 uv=gl_FragCoord.xy/iResolution.xy;uv=2.0*uv-1.0;uv.x*=iResolution.x/iResolution.y;uv.x+=uXOffset;uv+=2.0*fbm(uv*uSize+0.8*iTime*uSpeed)-1.0;float dist=abs(uv.x);vec3 base=hsv2rgb(vec3(uHue/360.0,0.7,0.8));vec3 col=base*pow(0.07/dist,1.0)*uIntensity;col=pow(col,vec3(1.0));float a=clamp(max(col.r,max(col.g,col.b)),0.0,1.0);gl_FragColor=vec4(col,a);}';

    const vs = gl.createShader(gl.VERTEX_SHADER); gl.shaderSource(vs, vertSrc); gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER); gl.shaderSource(fs, fragSrc); gl.compileShader(fs);
    const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    const vertices = new Float32Array([-1,-1,1,-1,-1,1,1,1]);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPosition'); gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const locs = { res: gl.getUniformLocation(prog, 'iResolution'), time: gl.getUniformLocation(prog, 'iTime'), hue: gl.getUniformLocation(prog, 'uHue'), xo: gl.getUniformLocation(prog, 'uXOffset'), spd: gl.getUniformLocation(prog, 'uSpeed'), int: gl.getUniformLocation(prog, 'uIntensity'), sz: gl.getUniformLocation(prog, 'uSize') };
    const start = performance.now();
    const render = () => {
      resizeCanvas(); gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(locs.res, canvas.width, canvas.height);
      gl.uniform1f(locs.time, (performance.now() - start) / 1000); gl.uniform1f(locs.hue, hue); gl.uniform1f(locs.xo, xOffset); gl.uniform1f(locs.spd, speed); gl.uniform1f(locs.int, intensity); gl.uniform1f(locs.sz, size);
      gl.drawArrays(gl.TRIANGLES, 0, 4); requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', resizeCanvas); };
  }, [hue, xOffset, speed, intensity, size]);
  return <canvas ref={canvasRef} className={'lightning-container' + (className ? ' ' + className : '')} />;
}
