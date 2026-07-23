import{r as t,j as o}from"./iframe-DlV5p5KN.js";import"./preload-helper-C1FmrZbK.js";function k({marqueeText:c="",speed:g=2,className:v,curveAmount:B=400,direction:N="left",interactive:h=!0}){const u=t.useMemo(()=>(/\s|\u00A0$/.test(c)?c.replace(/\s+$/,""):c)+" ",[c]),y=t.useRef(null),n=t.useRef(null),[s,Q]=t.useState(0),[U,A]=t.useState(0),C=`curve-path-${t.useId()}`,W=`M-100,40 Q500,${40+B} 1540,40`,f=t.useRef(!1),b=t.useRef(0),O=t.useRef(N),R=t.useRef(0),D=s,z=D?Array(Math.ceil(1800/D)+2).fill(u).join(""):u,l=s>0;t.useEffect(()=>{y.current&&Q(y.current.getComputedTextLength())},[u]),t.useEffect(()=>{if(s&&n.current){const e=-s;n.current.setAttribute("startOffset",e+"px"),A(e)}},[s]),t.useEffect(()=>{if(!s||!l)return;let e=0;const i=()=>{if(!f.current&&n.current){const S=O.current==="right"?g:-g;let r=parseFloat(n.current.getAttribute("startOffset")||"0")+S;const q=s;r<=-q&&(r+=q),r>0&&(r-=q),n.current.setAttribute("startOffset",r+"px"),A(r)}e=requestAnimationFrame(i)};return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)},[s,g,l]);const G=e=>{h&&(f.current=!0,b.current=e.clientX,R.current=0,e.target.setPointerCapture(e.pointerId))},H=e=>{if(!h||!f.current||!n.current)return;const i=e.clientX-b.current;b.current=e.clientX,R.current=i;let a=parseFloat(n.current.getAttribute("startOffset")||"0")+i;const r=s;a<=-r&&(a+=r),a>0&&(a-=r),n.current.setAttribute("startOffset",a+"px"),A(a)},L=()=>{h&&(f.current=!1,O.current=R.current>0?"right":"left")};return o.jsx("div",{className:`curved-loop-jacket${v?" "+v:""}`,style:{visibility:l?"visible":"hidden"},onPointerDown:G,onPointerMove:H,onPointerUp:L,onPointerLeave:L,children:o.jsxs("svg",{className:"curved-loop-svg",viewBox:"0 0 1440 120",children:[o.jsx("text",{ref:y,xmlSpace:"preserve",style:{visibility:"hidden",opacity:0,pointerEvents:"none"},children:u}),o.jsx("defs",{children:o.jsx("path",{id:C,d:W,fill:"none",stroke:"transparent"})}),l&&o.jsx("text",{fontWeight:"bold",xmlSpace:"preserve",className:v,children:o.jsx("textPath",{ref:n,href:`#${C}`,startOffset:U+"px",xmlSpace:"preserve",children:z})})]})})}k.__docgenInfo={description:"",methods:[],displayName:"CurvedLoop",props:{marqueeText:{defaultValue:{value:"''",computed:!1},required:!1},speed:{defaultValue:{value:"2",computed:!1},required:!1},curveAmount:{defaultValue:{value:"400",computed:!1},required:!1},direction:{defaultValue:{value:"'left'",computed:!1},required:!1},interactive:{defaultValue:{value:"true",computed:!1},required:!1}}};const Z={component:k,tags:["autodocs"],argTypes:{marqueeText:{control:"text"},speed:{control:{type:"range",min:.5,max:5,step:.5}},curveAmount:{control:{type:"range",min:50,max:800,step:50}},direction:{control:"select",options:["left","right"]},interactive:{control:"boolean"}}},d={args:{marqueeText:"Cortex Design Library",speed:2,curveAmount:400,direction:"left",interactive:!0}},p={args:{marqueeText:"Cortex Design Library",speed:4,curveAmount:400,direction:"right",interactive:!0}},m={args:{marqueeText:"Cortex Design Library",speed:2,curveAmount:800,direction:"left",interactive:!0}},x={args:{marqueeText:"Cortex Design Library",speed:.5,curveAmount:400,direction:"left",interactive:!1}};var T,j,E;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    marqueeText: 'Cortex Design Library',
    speed: 2,
    curveAmount: 400,
    direction: 'left',
    interactive: true
  }
}`,...(E=(j=d.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var P,F,w;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    marqueeText: 'Cortex Design Library',
    speed: 4,
    curveAmount: 400,
    direction: 'right',
    interactive: true
  }
}`,...(w=(F=p.parameters)==null?void 0:F.docs)==null?void 0:w.source}}};var $,V,I;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    marqueeText: 'Cortex Design Library',
    speed: 2,
    curveAmount: 800,
    direction: 'left',
    interactive: true
  }
}`,...(I=(V=m.parameters)==null?void 0:V.docs)==null?void 0:I.source}}};var M,X,_;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    marqueeText: 'Cortex Design Library',
    speed: 0.5,
    curveAmount: 400,
    direction: 'left',
    interactive: false
  }
}`,...(_=(X=x.parameters)==null?void 0:X.docs)==null?void 0:_.source}}};const ee=["Default","FastRight","ExtremeCurve","Stationary"];export{d as Default,m as ExtremeCurve,p as FastRight,x as Stationary,ee as __namedExportsOrder,Z as default};
