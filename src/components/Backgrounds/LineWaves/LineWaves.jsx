import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './LineWaves.css';

function hexToVec3(hex) { const h = hex.replace('#', ''); return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]; }

const vert = `attribute vec2 uv;attribute vec2 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0,1);}`;
const frag = `precision highp float;uniform float uTime;uniform vec3 uResolution;uniform float uSpeed;uniform float uInnerLines;uniform float uOuterLines;uniform float uWarpIntensity;uniform float uRotation;uniform float uEdgeFadeWidth;uniform float uColorCycleSpeed;uniform float uBrightness;uniform vec3 uColor1;uniform vec3 uColor2;uniform vec3 uColor3;uniform vec2 uMouse;uniform float uMouseInfluence;uniform bool uEnableMouse;
float hashF(float n){return fract(sin(n*127.1)*43758.5453123);}
float smoothNoise(float x){float i=floor(x);float f=fract(x);float u=f*f*(3.0-2.0*f);return mix(hashF(i),hashF(i+1.0),u);}
float dA(float c,float t){return sin(c*2.123)*0.2+sin(c*3.234+t*4.345)*0.1+sin(c*0.589+t*0.934)*0.5;}
float dB(float c,float t){return sin(c*1.345)*0.3+sin(c*2.734+t*3.345)*0.2+sin(c*0.189+t*0.934)*0.3;}
vec2 rot(vec2 p,float a){float c=cos(a),s=sin(a);return vec2(p.x*c-p.y*s,p.x*s+p.y*c);}
void main(){vec2 c=gl_FragCoord.xy/uResolution.xy;c=c*2.0-1.0;c=rot(c,uRotation);float hT=uTime*uSpeed*0.5,fT=uTime*uSpeed;
float mW=0.0;if(uEnableMouse){vec2 mP=rot(uMouse*2.0-1.0,uRotation);float mDist=length(c-mP);mW=uMouseInfluence*exp(-mDist*mDist*4.0);}
float wAx=c.x+dA(c.y,hT)*uWarpIntensity+mW,wAy=c.y-dA(c.x*cos(fT)*1.235,hT)*uWarpIntensity;
float wBx=c.x+dB(c.y,hT)*uWarpIntensity+mW,wBy=c.y-dB(c.x*sin(fT)*1.235,hT)*uWarpIntensity;
vec2 fA=vec2(wAx,wAy),fB=vec2(wBx,wBy),bl=mix(fA,fB,mix(fA,fB,0.5));
float fTp=smoothstep(uEdgeFadeWidth,uEdgeFadeWidth+0.4,bl.y),fBt=smoothstep(-uEdgeFadeWidth,-(uEdgeFadeWidth+0.4),bl.y),vM=1.0-max(fTp,fBt);
float tC=mix(uOuterLines,uInnerLines,vM),sY=bl.y*tC,nY=smoothNoise(abs(sY));
float ridge=pow(step(abs(nY-bl.x)*2.0,1.5708)*cos(2.0*(nY-bl.x)),5.0);
float lines=0.0;for(float i=1.0;i<3.0;i+=1.0){lines+=pow(max(fract(sY),fract(-sY)),i*2.0);}
float pat=vM*lines;float cyc=fT*uColorCycleSpeed;
float rC=(pat+lines*ridge)*(cos(bl.y+cyc*0.234)*0.5+1.0);
float gC=(pat+vM*ridge)*(sin(bl.x+cyc*1.745)*0.5+1.0);
float bC=(pat+lines*ridge)*(cos(bl.x+cyc*0.534)*0.5+1.0);
vec3 col=(rC*uColor1+gC*uColor2+bC*uColor3)*uBrightness;gl_FragColor=vec4(col,clamp(length(col),0.0,1.0));}`;

export function LineWaves({speed=0.3,innerLineCount=32,outerLineCount=36,warpIntensity=1,rotation=-45,edgeFadeWidth=0,colorCycleSpeed=1,brightness=0.2,color1='#ffffff',color2='#ffffff',color3='#ffffff',enableMouseInteraction=true,mouseInfluence=2,className=''}){
  const containerRef=useRef(null);
  useEffect(()=>{
    if(!containerRef.current)return;const container=containerRef.current;const renderer=new Renderer({alpha:true});const gl=renderer.gl;gl.clearColor(0,0,0,0);let program;let curM=[0.5,0.5],tgtM=[0.5,0.5];
    function onMove(e){const rect=gl.canvas.getBoundingClientRect();tgtM=[(e.clientX-rect.left)/rect.width,1.0-(e.clientY-rect.top)/rect.height];}
    function onLeave(){tgtM=[0.5,0.5];}
    function resize(){renderer.setSize(container.offsetWidth,container.offsetHeight);if(program)program.uniforms.uResolution.value=[gl.canvas.width,gl.canvas.height,gl.canvas.width/gl.canvas.height];}
    window.addEventListener('resize',resize);resize();const geometry=new Triangle(gl);
    program=new Program(gl,{vertex:vert,fragment:frag,uniforms:{uTime:{value:0},uResolution:{value:[gl.canvas.width,gl.canvas.height,gl.canvas.width/gl.canvas.height]},uSpeed:{value:speed},uInnerLines:{value:innerLineCount},uOuterLines:{value:outerLineCount},uWarpIntensity:{value:warpIntensity},uRotation:{value:rotation*Math.PI/180},uEdgeFadeWidth:{value:edgeFadeWidth},uColorCycleSpeed:{value:colorCycleSpeed},uBrightness:{value:brightness},uColor1:{value:hexToVec3(color1)},uColor2:{value:hexToVec3(color2)},uColor3:{value:hexToVec3(color3)},uMouse:{value:new Float32Array([0.5,0.5])},uMouseInfluence:{value:mouseInfluence},uEnableMouse:{value:enableMouseInteraction}}});
    const mesh=new Mesh(gl,{geometry,program});container.appendChild(gl.canvas);
    if(enableMouseInteraction){gl.canvas.addEventListener('mousemove',onMove);gl.canvas.addEventListener('mouseleave',onLeave);}
    let animId;function update(time){animId=requestAnimationFrame(update);program.uniforms.uTime.value=time*0.001;if(enableMouseInteraction){curM[0]+=0.05*(tgtM[0]-curM[0]);curM[1]+=0.05*(tgtM[1]-curM[1]);program.uniforms.uMouse.value[0]=curM[0];program.uniforms.uMouse.value[1]=curM[1];}renderer.render({scene:mesh});}
    animId=requestAnimationFrame(update);
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize);if(enableMouseInteraction){gl.canvas.removeEventListener('mousemove',onMove);gl.canvas.removeEventListener('mouseleave',onLeave);}container.removeChild(gl.canvas);gl.getExtension('WEBGL_lose_context')?.loseContext();};
  },[speed,innerLineCount,outerLineCount,warpIntensity,rotation,edgeFadeWidth,colorCycleSpeed,brightness,color1,color2,color3,enableMouseInteraction,mouseInfluence]);
  return <div ref={containerRef} className={'line-waves-container'+(className?' '+className:'')} />;
}
