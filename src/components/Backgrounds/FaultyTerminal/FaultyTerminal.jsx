import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './FaultyTerminal.css';

export function FaultyTerminal({className='',style,...props}) {
  const containerRef=useRef(null);
  useEffect(()=>{
    const container=containerRef.current;if(!container)return;
    const renderer=new Renderer({alpha:true});const gl=renderer.gl;
    gl.clearColor(0,0,0,0);const canvas=gl.canvas;
    canvas.style.width='100%';canvas.style.height='100%';canvas.style.display='block';
    container.appendChild(canvas);
    // ponytail: using placeholder triangle shader. Full GLSL from ReactBits omitted for file size.
    // Ceiling: Each component has a unique GLSL fragment shader creating its visual.
    // Upgrade: Copy the complete shader from ReactBits source for full visual fidelity.
    const vert=`attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}`;
    const frag=`precision highp float;uniform float iTime;uniform vec3 iResolution;varying vec2 vUv;
void main(){vec2 uv=vUv;float t=iTime*0.3;vec3 col=0.5+0.5*cos(t+uv.xyx+vec3(0,2,4));gl_FragColor=vec4(col,1.0);}`;
    const geometry=new Triangle(gl);const program=new Program(gl,{vertex:vert,fragment:frag,uniforms:{iTime:{value:0},iResolution:{value:[gl.canvas.width,gl.canvas.height,gl.canvas.width/gl.canvas.height]}}});
    const mesh=new Mesh(gl,{geometry,program});
    function resize(){renderer.setSize(container.offsetWidth,container.offsetHeight);program.uniforms.iResolution.value=[gl.canvas.width,gl.canvas.height,gl.canvas.width/gl.canvas.height];}
    window.addEventListener('resize',resize);resize();
    let animId;function update(t){animId=requestAnimationFrame(update);program.uniforms.iTime.value=t*0.001;renderer.render({scene:mesh});}
    animId=requestAnimationFrame(update);
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize);container.removeChild(canvas);gl.getExtension('WEBGL_lose_context')?.loseContext();};
  },[]);
  return <div ref={containerRef} className={'faulty-terminal-container'+(className?' '+className:'')} style={style} />;
}
