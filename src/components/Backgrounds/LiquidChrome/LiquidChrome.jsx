import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './LiquidChrome.css';

const vert = `attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}`;
const frag = `precision highp float;uniform float uTime;uniform vec3 uResolution;uniform vec3 uBaseColor;uniform float uAmplitude;uniform float uFrequencyX;uniform float uFrequencyY;uniform vec2 uMouse;varying vec2 vUv;
vec4 renderImage(vec2 uvC){vec2 fc=uvC*uResolution.xy;vec2 uv=(2.0*fc-uResolution.xy)/min(uResolution.x,uResolution.y);
for(float i=1.0;i<10.0;i++){uv.x+=uAmplitude/i*cos(i*uFrequencyX*uv.y+uTime+uMouse.x*3.14159);uv.y+=uAmplitude/i*cos(i*uFrequencyY*uv.x+uTime+uMouse.y*3.14159);}
vec2 diff=(uvC-uMouse);float dist=length(diff);float falloff=exp(-dist*20.0);float ripple=sin(10.0*dist-uTime*2.0)*0.03;uv+=(diff/(dist+0.0001))*ripple*falloff;
vec3 color=uBaseColor/abs(sin(uTime-uv.y-uv.x));return vec4(color,1.0);}
void main(){vec4 col=vec4(0.0);int sp=0;for(int i=-1;i<=1;i++){for(int j=-1;j<=1;j++){vec2 off=vec2(float(i),float(j))*(1.0/min(uResolution.x,uResolution.y));col+=renderImage(vUv+off);sp++;}}gl_FragColor=col/float(sp);}`;

export function LiquidChrome({baseColor=[0.1,0.1,0.1],speed=0.2,amplitude=0.5,frequencyX=3,frequencyY=2,interactive=true,className='',...props}){
  const containerRef=useRef(null);
  useEffect(()=>{
    if(!containerRef.current)return;const container=containerRef.current;const renderer=new Renderer({antialias:true});const gl=renderer.gl;gl.clearColor(1,1,1,1);
    const geometry=new Triangle(gl);
    const program=new Program(gl,{vertex:vert,fragment:frag,uniforms:{uTime:{value:0},uResolution:{value:new Float32Array([gl.canvas.width,gl.canvas.height,gl.canvas.width/gl.canvas.height])},uBaseColor:{value:new Float32Array(baseColor)},uAmplitude:{value:amplitude},uFrequencyX:{value:frequencyX},uFrequencyY:{value:frequencyY},uMouse:{value:new Float32Array([0,0])}}});
    const mesh=new Mesh(gl,{geometry,program});
    function resize(){renderer.setSize(container.offsetWidth,container.offsetHeight);const r=program.uniforms.uResolution.value;r[0]=gl.canvas.width;r[1]=gl.canvas.height;r[2]=gl.canvas.width/gl.canvas.height;}
    window.addEventListener('resize',resize);resize();
    function onMove(e){const rect=container.getBoundingClientRect();const m=program.uniforms.uMouse.value;m[0]=(e.clientX-rect.left)/rect.width;m[1]=1-(e.clientY-rect.top)/rect.height;}
    if(interactive){container.addEventListener('mousemove',onMove);}
    let animId;function update(t){animId=requestAnimationFrame(update);program.uniforms.uTime.value=t*0.001*speed;renderer.render({scene:mesh});}
    animId=requestAnimationFrame(update);container.appendChild(gl.canvas);
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize);if(interactive)container.removeEventListener('mousemove',onMove);if(gl.canvas.parentElement)gl.canvas.parentElement.removeChild(gl.canvas);gl.getExtension('WEBGL_lose_context')?.loseContext();};
  },[baseColor,speed,amplitude,frequencyX,frequencyY,interactive]);
  return <div ref={containerRef} className={'liquid-chrome-container'+(className?' '+className:'')} {...props} />;
}
