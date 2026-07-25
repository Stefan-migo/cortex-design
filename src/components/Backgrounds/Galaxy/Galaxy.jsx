import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './Galaxy.css';

const vert=`attribute vec2 uv;attribute vec2 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0,1);}`;
const frag=`precision highp float;uniform float uTime;uniform vec3 uResolution;uniform vec2 uFocal;uniform vec2 uRotation;uniform float uStarSpeed;uniform float uDensity;uniform float uHueShift;uniform float uSpeed;uniform vec2 uMouse;uniform float uGlowIntensity;uniform float uSaturation;uniform bool uMouseRepulsion;uniform float uTwinkleIntensity;uniform float uRotationSpeed;uniform float uRepulsionStrength;uniform float uMouseActiveFactor;uniform float uAutoCenterRepulsion;uniform bool uTransparent;varying vec2 vUv;
float H21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float tri(float x){return abs(fract(x)*2.0-1.0);}
float tris(float x){float t=fract(x);return 1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0));}
float trisn(float x){float t=fract(x);return 2.0*(1.0-smoothstep(0.0,1.0,abs(2.0*t-1.0)))-1.0;}
vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}
float Star(vec2 uv,float flare){float d=length(uv);float m=(0.05*uGlowIntensity)/d;float rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));m+=rays*flare*uGlowIntensity;uv*=mat2(0.7071,-0.7071,0.7071,0.7071);rays=smoothstep(0.0,1.0,1.0-abs(uv.x*uv.y*1000.0));m+=rays*0.3*flare*uGlowIntensity;m*=smoothstep(1.0,0.2,d);return m;}
vec3 StarLayer(vec2 uv){vec3 col=vec3(0.0);vec2 gv=fract(uv)-0.5;vec2 id=floor(uv);
for(int y=-1;y<=1;y++){for(int x=-1;x<=1;x++){vec2 off=vec2(float(x),float(y));vec2 si=id+off;float seed=H21(si);float size=fract(seed*345.32);float gloss=tri(uStarSpeed/(3.0*seed+1.0));float flare=smoothstep(0.9,1.0,size)*gloss;
float red=smoothstep(0.2,1.0,H21(si+1.0))+0.2;float blu=smoothstep(0.2,1.0,H21(si+3.0))+0.2;float grn=min(red,blu)*seed;vec3 base=vec3(red,grn,blu);
float hue=atan(base.g-base.r,base.b-base.r)/6.2832+0.5;hue=fract(hue+uHueShift/360.0);float sat=length(base-vec3(dot(base,vec3(0.299,0.587,0.114))))*uSaturation;float val=max(max(base.r,base.g),base.b);base=hsv2rgb(vec3(hue,sat,val));
vec2 pad=vec2(tris(seed*34.0+uTime*uSpeed/10.0),tris(seed*38.0+uTime*uSpeed/30.0))-0.5;
float star=Star(gv-off-pad,flare);vec3 color=base;float twinkle=trisn(uTime*uSpeed+seed*6.2831)*0.5+1.0;twinkle=mix(1.0,twinkle,uTwinkleIntensity);star*=twinkle;col+=star*size*color;}}return col;}
void main(){vec2 fp=uFocal*uResolution.xy;vec2 uv=(vUv*uResolution.xy-fp)/uResolution.y;vec2 mn=uMouse-vec2(0.5);
if(uAutoCenterRepulsion>0.0){vec2 cuv=vec2(0.0);float cd=length(uv-cuv);vec2 rep=normalize(uv-cuv)*(uAutoCenterRepulsion/(cd+0.1));uv+=rep*0.05;}
else if(uMouseRepulsion){vec2 mp=(uMouse*uResolution.xy-fp)/uResolution.y;float md=length(uv-mp);vec2 rep=normalize(uv-mp)*(uRepulsionStrength/(md+0.1));uv+=rep*0.05*uMouseActiveFactor;}
else{vec2 mo=mn*0.1*uMouseActiveFactor;uv+=mo;}
float rotA=uTime*uRotationSpeed;mat2 rotM=mat2(cos(rotA),-sin(rotA),sin(rotA),cos(rotA));uv=rotM*uv;uv=mat2(uRotation.x,-uRotation.y,uRotation.y,uRotation.x)*uv;vec3 col=vec3(0.0);
for(float i=0.0;i<1.0;i+=1.0/4.0){float depth=fract(i+uStarSpeed*uSpeed);float scale=mix(20.0*uDensity,0.5*uDensity,depth);float fade=depth*smoothstep(1.0,0.9,depth);col+=StarLayer(uv*scale+i*453.32)*fade;}
if(uTransparent){float al=length(col);al=smoothstep(0.0,0.3,al);al=min(al,1.0);gl_FragColor=vec4(col,al);}else{gl_FragColor=vec4(col,1.0);}}`;

export function Galaxy({focal=[0.5,0.5],rotation=[1,0],starSpeed=0.5,density=1,hueShift=140,disableAnimation=false,speed=1,mouseInteraction=true,glowIntensity=0.3,saturation=0,mouseRepulsion=true,repulsionStrength=2,twinkleIntensity=0.3,rotationSpeed=0.1,autoCenterRepulsion=0,transparent=true,className='',...rest}){
  const ctnDom=useRef(null),tgtM=useRef({x:0.5,y:0.5}),smM=useRef({x:0.5,y:0.5}),tgtA=useRef(0),smA=useRef(0);
  useEffect(()=>{
    if(!ctnDom.current)return;const ctn=ctnDom.current;const renderer=new Renderer({alpha:transparent});const gl=renderer.gl;
    if(transparent){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);}else gl.clearColor(0,0,0,1);
    let program;function resize(){renderer.setSize(ctn.offsetWidth,ctn.offsetHeight);if(program)program.uniforms.uResolution.value=new Color(gl.canvas.width,gl.canvas.height,gl.canvas.width/gl.canvas.height);}
    window.addEventListener('resize',resize,false);resize();const geometry=new Triangle(gl);
    program=new Program(gl,{vertex:vert,fragment:frag,uniforms:{uTime:{value:0},uResolution:{value:new Color(gl.canvas.width,gl.canvas.height,gl.canvas.width/gl.canvas.height)},uFocal:{value:new Float32Array(focal)},uRotation:{value:new Float32Array(rotation)},uStarSpeed:{value:starSpeed},uDensity:{value:density},uHueShift:{value:hueShift},uSpeed:{value:speed},uMouse:{value:new Float32Array([smM.current.x,smM.current.y])},uGlowIntensity:{value:glowIntensity},uSaturation:{value:saturation},uMouseRepulsion:{value:mouseRepulsion},uTwinkleIntensity:{value:twinkleIntensity},uRotationSpeed:{value:rotationSpeed},uRepulsionStrength:{value:repulsionStrength},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:autoCenterRepulsion},uTransparent:{value:transparent}}});
    const mesh=new Mesh(gl,{geometry,program});let animId;
    function update(t){animId=requestAnimationFrame(update);if(!disableAnimation){program.uniforms.uTime.value=t*0.001;program.uniforms.uStarSpeed.value=t*0.001*starSpeed/10;}
    smM.current.x+=(tgtM.current.x-smM.current.x)*0.05;smM.current.y+=(tgtM.current.y-smM.current.y)*0.05;smA.current+=(tgtA.current-smA.current)*0.05;
    program.uniforms.uMouse.value[0]=smM.current.x;program.uniforms.uMouse.value[1]=smM.current.y;program.uniforms.uMouseActiveFactor.value=smA.current;renderer.render({scene:mesh});}
    animId=requestAnimationFrame(update);ctn.appendChild(gl.canvas);
    function onMove(e){const rect=ctn.getBoundingClientRect();tgtM.current={x:(e.clientX-rect.left)/rect.width,y:1-(e.clientY-rect.top)/rect.height};tgtA.current=1;}
    function onLeave(){tgtA.current=0;}if(mouseInteraction){ctn.addEventListener('mousemove',onMove);ctn.addEventListener('mouseleave',onLeave);}
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize);if(mouseInteraction){ctn.removeEventListener('mousemove',onMove);ctn.removeEventListener('mouseleave',onLeave);}ctn.removeChild(gl.canvas);gl.getExtension('WEBGL_lose_context')?.loseContext();};
  },[focal,rotation,starSpeed,density,hueShift,disableAnimation,speed,mouseInteraction,glowIntensity,saturation,mouseRepulsion,twinkleIntensity,rotationSpeed,repulsionStrength,autoCenterRepulsion,transparent]);
  return <div ref={ctnDom} className={'galaxy-container'+(className?' '+className:'')} {...rest} />;
}
