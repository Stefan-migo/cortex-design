import{r,j as w,w as ue}from"./iframe-DlV5p5KN.js";import"./preload-helper-C1FmrZbK.js";const ce=(i,u)=>{const a=u.x-i.x,n=u.y-i.y;return Math.sqrt(a*a+n*n)},y=(i,u,a,n)=>{const h=n-Math.abs(n*i/u);return Math.max(a,h+a)},ie=(i,u)=>{let a;return(...n)=>{clearTimeout(a),a=setTimeout(()=>{i(...n)},u)}};function K({text:i="Compressa",fontFamily:u="Roboto Flex",fontUrl:a="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",width:n=!0,weight:h=!0,italic:V=!0,alpha:b=!1,flex:E=!0,stroke:C=!1,scale:M=!1,textColor:x="#FFFFFF",strokeColor:z="#FF0000",className:Q="",minFontSize:S=24}){const m=r.useRef(null),d=r.useRef(null),A=r.useRef([]),c=r.useRef({x:0,y:0}),f=r.useRef({x:0,y:0}),[U,Z]=r.useState(S),[ee,$]=r.useState(1),[te,j]=r.useState(1),q=i.split("");r.useEffect(()=>{const e=t=>{f.current.x=t.clientX,f.current.y=t.clientY},l=t=>{const s=t.touches[0];f.current.x=s.clientX,f.current.y=s.clientY};if(window.addEventListener("mousemove",e),window.addEventListener("touchmove",l,{passive:!0}),m.current){const{left:t,top:s,width:o,height:p}=m.current.getBoundingClientRect();c.current.x=t+o/2,c.current.y=s+p/2,f.current.x=c.current.x,f.current.y=c.current.y}return()=>{window.removeEventListener("mousemove",e),window.removeEventListener("touchmove",l)}},[]);const L=r.useCallback(()=>{if(!m.current||!d.current)return;const{width:e,height:l}=m.current.getBoundingClientRect();let t=e/(q.length/2);t=Math.max(t,S),Z(t),$(1),j(1),requestAnimationFrame(()=>{if(!d.current)return;const s=d.current.getBoundingClientRect();if(M&&s.height>0){const o=l/s.height;$(o),j(o)}})},[q.length,S,M]);r.useEffect(()=>{const e=ie(L,100);return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[L]),r.useEffect(()=>{let e;const l=()=>{if(c.current.x+=(f.current.x-c.current.x)/15,c.current.y+=(f.current.y-c.current.y)/15,d.current){const s=d.current.getBoundingClientRect().width/2;A.current.forEach(o=>{if(!o)return;const p=o.getBoundingClientRect(),ae={x:p.x+p.width/2,y:p.y+p.height/2},g=ce(c.current,ae),oe=n?Math.floor(y(g,s,5,200)):100,ne=h?Math.floor(y(g,s,100,900)):400,le=V?y(g,s,0,1).toFixed(2):"0",T=b?y(g,s,0,1).toFixed(2):"1",B=`'wght' ${ne}, 'wdth' ${oe}, 'ital' ${le}`;o.style.fontVariationSettings!==B&&(o.style.fontVariationSettings=B),b&&o.style.opacity!==T&&(o.style.opacity=T)})}e=requestAnimationFrame(l)};return l(),()=>cancelAnimationFrame(e)},[n,h,V,b]);const re=r.useMemo(()=>w.jsx("style",{children:`
        @import url('${a}');

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${x};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${z};
        }

        .text-pressure-title {
          color: ${x};
        }
      `}),[u,a,E,C,x,z]),se=[Q,E?"flex":"",C?"stroke":""].filter(Boolean).join(" ");return w.jsxs("div",{ref:m,style:{position:"relative",width:"100%",height:"100%",background:"transparent"},children:[re,w.jsx("h1",{ref:d,className:`text-pressure-title ${se}`,style:{fontFamily:u,textTransform:"uppercase",fontSize:U,lineHeight:te,transform:`scale(1, ${ee})`,transformOrigin:"center top",margin:0,textAlign:"center",userSelect:"none",whiteSpace:"nowrap",fontWeight:100,width:"100%"},children:q.map((e,l)=>w.jsx("span",{ref:t=>{A.current[l]=t},"data-char":e,style:{display:"inline-block",color:C?void 0:x},children:e},l))})]})}K.__docgenInfo={description:"",methods:[],displayName:"TextPressure",props:{text:{defaultValue:{value:"'Compressa'",computed:!1},required:!1},fontFamily:{defaultValue:{value:"'Roboto Flex'",computed:!1},required:!1},fontUrl:{defaultValue:{value:"'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap'",computed:!1},required:!1},width:{defaultValue:{value:"true",computed:!1},required:!1},weight:{defaultValue:{value:"true",computed:!1},required:!1},italic:{defaultValue:{value:"true",computed:!1},required:!1},alpha:{defaultValue:{value:"false",computed:!1},required:!1},flex:{defaultValue:{value:"true",computed:!1},required:!1},stroke:{defaultValue:{value:"false",computed:!1},required:!1},scale:{defaultValue:{value:"false",computed:!1},required:!1},textColor:{defaultValue:{value:"'#FFFFFF'",computed:!1},required:!1},strokeColor:{defaultValue:{value:"'#FF0000'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1},minFontSize:{defaultValue:{value:"24",computed:!1},required:!1}}};const pe={component:K,tags:["autodocs"],decorators:[ue],argTypes:{text:{control:"text"},flex:{control:"boolean"},width:{control:"boolean"},weight:{control:"boolean"},italic:{control:"boolean"},alpha:{control:"boolean"},stroke:{control:"boolean"},textColor:{control:"color"},strokeColor:{control:"color"}}},v={args:{text:"Compressa",flex:!0,width:!0,weight:!0,italic:!0,alpha:!1,stroke:!1}},F={args:{text:"Compressa",flex:!0,width:!0,weight:!0,italic:!0,alpha:!0,stroke:!0}},R={args:{text:"Compressa",flex:!1,width:!0,weight:!0,italic:!0,alpha:!1,stroke:!1}},k={args:{text:"Compressa",flex:!1,width:!1,weight:!0,italic:!1,alpha:!1,stroke:!1}};var N,Y,_;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    text: 'Compressa',
    flex: true,
    width: true,
    weight: true,
    italic: true,
    alpha: false,
    stroke: false
  }
}`,...(_=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};var D,H,I;F.parameters={...F.parameters,docs:{...(D=F.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    text: 'Compressa',
    flex: true,
    width: true,
    weight: true,
    italic: true,
    alpha: true,
    stroke: true
  }
}`,...(I=(H=F.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var O,P,X;R.parameters={...R.parameters,docs:{...(O=R.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    text: 'Compressa',
    flex: false,
    width: true,
    weight: true,
    italic: true,
    alpha: false,
    stroke: false
  }
}`,...(X=(P=R.parameters)==null?void 0:P.docs)==null?void 0:X.source}}};var W,G,J;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    text: 'Compressa',
    flex: false,
    width: false,
    weight: true,
    italic: false,
    alpha: false,
    stroke: false
  }
}`,...(J=(G=k.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};const me=["Default","AllAxes","NoFlex","Minimal"];export{F as AllAxes,v as Default,k as Minimal,R as NoFlex,me as __namedExportsOrder,pe as default};
