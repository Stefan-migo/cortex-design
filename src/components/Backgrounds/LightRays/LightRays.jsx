import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './LightRays.css';

/* ponytail: kept LOCAL copy instead of src/lib/color-utils.js (HLP-002) because this
   hexToRgb falls back to [1,1,1] on bad input — the shared helper has no fallback. */
function hexToRgb(hex){const m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return m?[parseInt(m[1],16)/255,parseInt(m[2],16)/255,parseInt(m[3],16)/255]:[1,1,1];}

const getAnchorAndDir=(origin,w,h)=>{const outside=0.2;switch(origin){case'top-left':return{anchor:[0,-outside*h],dir:[0,1]};case'top-right':return{anchor:[w,-outside*h],dir:[0,1]};case'left':return{anchor:[-outside*w,0.5*h],dir:[1,0]};case'right':return{anchor:[(1+outside)*w,0.5*h],dir:[-1,0]};case'bottom-left':return{anchor:[0,(1+outside)*h],dir:[0,-1]};case'bottom-center':return{anchor:[0.5*w,(1+outside)*h],dir:[0,-1]};case'bottom-right':return{anchor:[w,(1+outside)*h],dir:[0,-1]};default:return{anchor:[0.5*w,-outside*h],dir:[0,1]};}};

const vert=`attribute vec2 position;varying vec2 vUv;void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;
const frag=`precision highp float;uniform float iTime;uniform vec2 iResolution;uniform vec2 rayPos;uniform vec2 rayDir;uniform vec3 raysColor;uniform float raysSpeed;uniform float lightSpread;uniform float rayLength;uniform float pulsating;uniform float fadeDistance;uniform float saturation;uniform vec2 mousePos;uniform float mouseInfluence;uniform float noiseAmount;uniform float distortion;varying vec2 vUv;
float nse(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}
float rayStrength(vec2 src,vec2 dir,vec2 c,float sA,float sB,float spd){vec2 stc=c-src;vec2 dn=normalize(stc);float cA=dot(dn,dir);float dA=cA+distortion*sin(iTime*2.0+length(stc)*0.01)*0.2;float sf=pow(max(dA,0.0),1.0/max(lightSpread,0.001));float dist=length(stc);float maxD=iResolution.x*rayLength;float lf=clamp((maxD-dist)/maxD,0.0,1.0);float ff=clamp((iResolution.x*fadeDistance-dist)/(iResolution.x*fadeDistance),0.5,1.0);float p=pulsating>0.5?(0.8+0.2*sin(iTime*spd*3.0)):1.0;float bs=clamp((0.45+0.15*sin(dA*sA+iTime*spd))+(0.3+0.2*cos(-dA*sB+iTime*spd)),0.0,1.0);return bs*lf*ff*sf*p;}
void mainImage(out vec4 fc,in vec2 fcrd){vec2 coord=vec2(fcrd.x,iResolution.y-fcrd.y);vec2 fDir=rayDir;if(mouseInfluence>0.0){vec2 msp=mousePos*iResolution.xy;vec2 md=normalize(msp-rayPos);fDir=normalize(mix(rayDir,md,mouseInfluence));}
vec4 r1=vec4(1.0)*rayStrength(rayPos,fDir,coord,36.2214,21.11349,1.5*raysSpeed);vec4 r2=vec4(1.0)*rayStrength(rayPos,fDir,coord,22.3991,18.0234,1.1*raysSpeed);fc=r1*0.5+r2*0.4;
if(noiseAmount>0.0){float n=nse(coord*0.01+iTime*0.1);fc.rgb*=(1.0-noiseAmount+noiseAmount*n);}
float br=1.0-(coord.y/iResolution.y);fc.x*=0.1+br*0.8;fc.y*=0.3+br*0.6;fc.z*=0.5+br*0.5;
if(saturation!=1.0){float gy=dot(fc.rgb,vec3(0.299,0.587,0.114));fc.rgb=mix(vec3(gy),fc.rgb,saturation);}fc.rgb*=raysColor;}
void main(){vec4 c;mainImage(c,gl_FragCoord.xy);gl_FragColor=c;}`;

export function LightRays({raysOrigin='top-center',raysColor='#ffffff',raysSpeed=1,lightSpread=1,rayLength=2,pulsating=false,fadeDistance=1,saturation=1,followMouse=true,mouseInfluence=0.1,noiseAmount=0,distortion=0,className=''}){
  const containerRef=useRef(null),uniformsRef=useRef(null),rendererRef=useRef(null),mouseRef=useRef({x:0.5,y:0.5}),smoothMouseRef=useRef({x:0.5,y:0.5}),animIdRef=useRef(null),meshRef=useRef(null);
  useEffect(()=>{
    const container=containerRef.current;if(!container)return;
    const renderer=new Renderer({dpr:Math.min(window.devicePixelRatio,2),alpha:true});rendererRef.current=renderer;const gl=renderer.gl;gl.canvas.style.width='100%';gl.canvas.style.height='100%';container.appendChild(gl.canvas);
    const uniforms={iTime:{value:0},iResolution:{value:[1,1]},rayPos:{value:[0,0]},rayDir:{value:[0,1]},raysColor:{value:hexToRgb(raysColor)},raysSpeed:{value:raysSpeed},lightSpread:{value:lightSpread},rayLength:{value:rayLength},pulsating:{value:pulsating?1:0},fadeDistance:{value:fadeDistance},saturation:{value:saturation},mousePos:{value:[0.5,0.5]},mouseInfluence:{value:mouseInfluence},noiseAmount:{value:noiseAmount},distortion:{value:distortion}};uniformsRef.current=uniforms;
    const geometry=new Triangle(gl);const program=new Program(gl,{vertex:vert,fragment:frag,uniforms});const mesh=new Mesh(gl,{geometry,program});meshRef.current=mesh;
    const updatePlacement=()=>{if(!containerRef.current)return;const{clientWidth:w,clientHeight:h}=containerRef.current;renderer.setSize(w,h);uniforms.iResolution.value=[w*renderer.dpr,h*renderer.dpr];const{anchor,dir}=getAnchorAndDir(raysOrigin,w*renderer.dpr,h*renderer.dpr);uniforms.rayPos.value=anchor;uniforms.rayDir.value=dir;};
    window.addEventListener('resize',updatePlacement);updatePlacement();
    const loop=(t)=>{animIdRef.current=requestAnimationFrame(loop);uniforms.iTime.value=t*0.001;if(followMouse&&mouseInfluence>0.0){const sm=0.92;smoothMouseRef.current.x=smoothMouseRef.current.x*sm+mouseRef.current.x*(1-sm);smoothMouseRef.current.y=smoothMouseRef.current.y*sm+mouseRef.current.y*(1-sm);uniforms.mousePos.value=[smoothMouseRef.current.x,smoothMouseRef.current.y];}renderer.render({scene:mesh});};
    animIdRef.current=requestAnimationFrame(loop);
    return()=>{if(animIdRef.current)cancelAnimationFrame(animIdRef.current);window.removeEventListener('resize',updatePlacement);if(renderer){const canvas=renderer.gl.canvas;const ext=renderer.gl.getExtension('WEBGL_lose_context');if(ext)ext.loseContext();if(canvas&&canvas.parentNode)canvas.parentNode.removeChild(canvas);}};
  },[]); // renders once, props updated via useEffect below
  
  // update uniforms on prop changes
  useEffect(()=>{const u=uniformsRef.current;if(!u)return;u.raysColor.value=hexToRgb(raysColor);u.raysSpeed.value=raysSpeed;u.lightSpread.value=lightSpread;u.rayLength.value=rayLength;u.pulsating.value=pulsating?1:0;u.fadeDistance.value=fadeDistance;u.saturation.value=saturation;u.mouseInfluence.value=mouseInfluence;u.noiseAmount.value=noiseAmount;u.distortion.value=distortion;},[raysColor,raysSpeed,lightSpread,rayLength,pulsating,fadeDistance,saturation,mouseInfluence,noiseAmount,distortion,raysOrigin]);
  
  useEffect(()=>{const u=uniformsRef.current;const r=rendererRef.current;if(!u||!r||!containerRef.current)return;const{clientWidth:w,clientHeight:h}=containerRef.current;const{anchor,dir}=getAnchorAndDir(raysOrigin,w*r.dpr,h*r.dpr);u.rayPos.value=anchor;u.rayDir.value=dir;},[raysOrigin]);
  
  useEffect(()=>{const onMove=(e)=>{if(!containerRef.current)return;const rect=containerRef.current.getBoundingClientRect();mouseRef.current={x:(e.clientX-rect.left)/rect.width,y:(e.clientY-rect.top)/rect.height};};if(followMouse){window.addEventListener('mousemove',onMove);return()=>window.removeEventListener('mousemove',onMove);}},[followMouse]);
  
  return <div ref={containerRef} className={'light-rays-container'+(className?' '+className:'')} />;
}
