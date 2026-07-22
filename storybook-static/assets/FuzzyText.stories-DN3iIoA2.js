import{r as he,j as Ae}from"./iframe-5JxC3ol0.js";import"./preload-helper-C1FmrZbK.js";function Ve({children:Y,fontSize:c="clamp(2rem, 8vw, 8rem)",fontWeight:b=900,fontFamily:H="inherit",color:P="#fff",enableHover:h=!0,baseIntensity:w=.18,hoverIntensity:J=.5,fuzzRange:o=30,fps:K=60,direction:u="horizontal",transitionDuration:R=0,clickEffect:I=!1,glitchMode:W=!1,glitchInterval:Q=2e3,glitchDuration:U=200,gradient:d=null,letterSpacing:i=0,className:qe=""}){const Z=he.useRef(null);return he.useEffect(()=>{let v,p=!1,A,$,M;const n=Z.current;return n?((async()=>{const F=n.getContext("2d");if(!F)return;const G=H==="inherit"?window.getComputedStyle(n).fontFamily||"sans-serif":H,D=typeof c=="number"?`${c}px`:c,Ee=`${b} ${D} ${G}`;try{await document.fonts.load(Ee)}catch{await document.fonts.ready}if(p)return;let V;if(typeof c=="number")V=c;else{const e=document.createElement("span");e.style.fontSize=c,document.body.appendChild(e);const t=window.getComputedStyle(e).fontSize;V=parseFloat(t),document.body.removeChild(e)}const g=Y||"",q=document.createElement("canvas"),a=q.getContext("2d");if(!a)return;a.font=`${b} ${D} ${G}`,a.textBaseline="alphabetic";let y=0;if(i!==0){for(const e of g)y+=a.measureText(e).width+i;y-=i}else y=a.measureText(g).width;const x=a.measureText(g),ee=x.actualBoundingBoxLeft??0,Le=i!==0?y:x.actualBoundingBoxRight??x.width,S=x.actualBoundingBoxAscent??V,Be=x.actualBoundingBoxDescent??V*.2,te=Math.ceil(i!==0?y:ee+Le),z=Math.ceil(S+Be),ne=10,f=te+ne;q.width=f,q.height=z;const j=ne/2;if(a.font=`${b} ${D} ${G}`,a.textBaseline="alphabetic",d&&Array.isArray(d)&&d.length>=2){const e=a.createLinearGradient(0,0,f,0);d.forEach((t,s)=>e.addColorStop(s/(d.length-1),t)),a.fillStyle=e}else a.fillStyle=P;if(i!==0){let e=j;for(const t of g)a.fillText(t,e,S),e+=a.measureText(t).width+i}else a.fillText(g,j-ee,S);const _=o+20,k=u==="vertical"||u==="both"?o+10:0;n.width=f+_*2,n.height=z+k*2,F.translate(_,k);const ae=_+j,oe=k,Ce=ae+te,He=oe+z;let T=!1,N=!1,O=!1,r=w,l=w,re=0;const le=1e3/K,se=()=>{!W||p||(A=setTimeout(()=>{p||(O=!0,$=setTimeout(()=>{O=!1,se()},U))},Q))};W&&se();const X=e=>{if(!p){if(e-re<le){v=window.requestAnimationFrame(X);return}if(re=e,F.clearRect(-o-20,-o-10,f+2*(o+20),z+2*(o+10)),N||O?l=1:T?l=J:l=w,R>0){const t=1/(R/le);r<l?r=Math.min(r+t,l):r>l&&(r=Math.max(r-t,l))}else r=l;for(let t=0;t<z;t++){let s=0,m=0;(u==="horizontal"||u==="both")&&(s=Math.floor(r*(Math.random()-.5)*o)),(u==="vertical"||u==="both")&&(m=Math.floor(r*(Math.random()-.5)*o*.5)),F.drawImage(q,0,t,f,1,s,t+m,f,1)}v=window.requestAnimationFrame(X)}};v=window.requestAnimationFrame(X);const ie=(e,t)=>e>=ae&&e<=Ce&&t>=oe&&t<=He,ce=e=>{if(!h)return;const t=n.getBoundingClientRect(),s=e.clientX-t.left,m=e.clientY-t.top;T=ie(s,m)},ue=()=>{T=!1},de=()=>{I&&(N=!0,clearTimeout(M),M=setTimeout(()=>{N=!1},150))},fe=e=>{if(!h)return;e.preventDefault();const t=n.getBoundingClientRect(),s=e.touches[0],m=s.clientX-t.left,We=s.clientY-t.top;T=ie(m,We)},me=()=>{T=!1};h&&(n.addEventListener("mousemove",ce),n.addEventListener("mouseleave",ue),n.addEventListener("touchmove",fe,{passive:!1}),n.addEventListener("touchend",me)),I&&n.addEventListener("click",de);const Re=()=>{window.cancelAnimationFrame(v),clearTimeout(A),clearTimeout($),clearTimeout(M),h&&(n.removeEventListener("mousemove",ce),n.removeEventListener("mouseleave",ue),n.removeEventListener("touchmove",fe),n.removeEventListener("touchend",me)),I&&n.removeEventListener("click",de)};n.cleanupFuzzyText=Re})(),()=>{p=!0,window.cancelAnimationFrame(v),clearTimeout(A),clearTimeout($),clearTimeout(M),n&&n.cleanupFuzzyText&&n.cleanupFuzzyText()}):void 0},[Y,c,b,H,P,h,w,J,o,K,u,R,I,W,Q,U,d,i]),Ae.jsx("canvas",{ref:Z,className:qe})}Ve.__docgenInfo={description:"",methods:[],displayName:"FuzzyText",props:{fontSize:{defaultValue:{value:"'clamp(2rem, 8vw, 8rem)'",computed:!1},required:!1},fontWeight:{defaultValue:{value:"900",computed:!1},required:!1},fontFamily:{defaultValue:{value:"'inherit'",computed:!1},required:!1},color:{defaultValue:{value:"'#fff'",computed:!1},required:!1},enableHover:{defaultValue:{value:"true",computed:!1},required:!1},baseIntensity:{defaultValue:{value:"0.18",computed:!1},required:!1},hoverIntensity:{defaultValue:{value:"0.5",computed:!1},required:!1},fuzzRange:{defaultValue:{value:"30",computed:!1},required:!1},fps:{defaultValue:{value:"60",computed:!1},required:!1},direction:{defaultValue:{value:"'horizontal'",computed:!1},required:!1},transitionDuration:{defaultValue:{value:"0",computed:!1},required:!1},clickEffect:{defaultValue:{value:"false",computed:!1},required:!1},glitchMode:{defaultValue:{value:"false",computed:!1},required:!1},glitchInterval:{defaultValue:{value:"2000",computed:!1},required:!1},glitchDuration:{defaultValue:{value:"200",computed:!1},required:!1},gradient:{defaultValue:{value:"null",computed:!1},required:!1},letterSpacing:{defaultValue:{value:"0",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const Se={component:Ve,tags:["autodocs"],argTypes:{children:{control:"text"},baseIntensity:{control:{type:"range",min:0,max:1,step:.05}},hoverIntensity:{control:{type:"range",min:0,max:1,step:.05}},fuzzRange:{control:{type:"range",min:1,max:100}},direction:{control:"select",options:["horizontal","vertical","both"]},fontWeight:{control:{type:"range",min:100,max:900,step:100}},enableHover:{control:"boolean"},glitchMode:{control:"boolean"}}},E={args:{children:"Fuzzy Text",baseIntensity:.18,hoverIntensity:.5,fuzzRange:30,direction:"horizontal",fontWeight:900,enableHover:!0,glitchMode:!1}},L={args:{children:"Vertical",baseIntensity:.18,hoverIntensity:.5,fuzzRange:30,direction:"vertical",fontWeight:900,enableHover:!0,glitchMode:!1}},B={args:{children:"High Fuzz",baseIntensity:.3,hoverIntensity:.5,fuzzRange:80,direction:"horizontal",fontWeight:900,enableHover:!0,glitchMode:!1}},C={args:{children:"Glitch",baseIntensity:.18,hoverIntensity:.5,fuzzRange:30,direction:"horizontal",fontWeight:900,enableHover:!1,glitchMode:!0}};var ve,pe,ge;E.parameters={...E.parameters,docs:{...(ve=E.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    children: 'Fuzzy Text',
    baseIntensity: 0.18,
    hoverIntensity: 0.5,
    fuzzRange: 30,
    direction: 'horizontal',
    fontWeight: 900,
    enableHover: true,
    glitchMode: false
  }
}`,...(ge=(pe=E.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var ye,xe,ze;L.parameters={...L.parameters,docs:{...(ye=L.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    children: 'Vertical',
    baseIntensity: 0.18,
    hoverIntensity: 0.5,
    fuzzRange: 30,
    direction: 'vertical',
    fontWeight: 900,
    enableHover: true,
    glitchMode: false
  }
}`,...(ze=(xe=L.parameters)==null?void 0:xe.docs)==null?void 0:ze.source}}};var Te,be,we;B.parameters={...B.parameters,docs:{...(Te=B.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    children: 'High Fuzz',
    baseIntensity: 0.3,
    hoverIntensity: 0.5,
    fuzzRange: 80,
    direction: 'horizontal',
    fontWeight: 900,
    enableHover: true,
    glitchMode: false
  }
}`,...(we=(be=B.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var Ie,Me,Fe;C.parameters={...C.parameters,docs:{...(Ie=C.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    children: 'Glitch',
    baseIntensity: 0.18,
    hoverIntensity: 0.5,
    fuzzRange: 30,
    direction: 'horizontal',
    fontWeight: 900,
    enableHover: false,
    glitchMode: true
  }
}`,...(Fe=(Me=C.parameters)==null?void 0:Me.docs)==null?void 0:Fe.source}}};const je=["Default","Vertical","HighFuzz","GlitchMode"];export{E as Default,C as GlitchMode,B as HighFuzz,L as Vertical,je as __namedExportsOrder,Se as default};
