import{j as O}from"./iframe-5JxC3ol0.js";import"./preload-helper-C1FmrZbK.js";function g({children:s,speed:n=.5,enableShadows:l=!0,enableOnHover:H=!1,className:t=""}){return O.jsx("div",{className:`glitch${H?" enable-on-hover":""}${t?" "+t:""}`,"data-text":s,style:{"--after-duration":`${n*3}s`,"--before-duration":`${n*2}s`,"--after-shadow":l?"-5px 0 red":"none","--before-shadow":l?"5px 0 cyan":"none"},children:s})}g.__docgenInfo={description:"",methods:[],displayName:"GlitchText",props:{speed:{defaultValue:{value:"0.5",computed:!1},required:!1},enableShadows:{defaultValue:{value:"true",computed:!1},required:!1},enableOnHover:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const N={component:g,tags:["autodocs"],argTypes:{children:{control:"text"},speed:{control:{type:"range",min:.1,max:2,step:.1}},enableShadows:{control:"boolean"},enableOnHover:{control:"boolean"}}},e={args:{children:"Glitch Effect",speed:.5,enableShadows:!0,enableOnHover:!1}},a={args:{children:"Hover me",speed:1,enableShadows:!0,enableOnHover:!0}},r={args:{children:"Slow...",speed:.1,enableShadows:!0,enableOnHover:!1}},o={args:{children:"No shadows",speed:.5,enableShadows:!1,enableOnHover:!1}};var d,c,u;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: 'Glitch Effect',
    speed: 0.5,
    enableShadows: true,
    enableOnHover: false
  }
}`,...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var p,i,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Hover me',
    speed: 1,
    enableShadows: true,
    enableOnHover: true
  }
}`,...(f=(i=a.parameters)==null?void 0:i.docs)==null?void 0:f.source}}};var m,h,b;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'Slow...',
    speed: 0.1,
    enableShadows: true,
    enableOnHover: false
  }
}`,...(b=(h=r.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var v,w,S;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'No shadows',
    speed: 0.5,
    enableShadows: false,
    enableOnHover: false
  }
}`,...(S=(w=o.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};const q=["Default","HoverOnly","SlowMotion","NoShadows"];export{e as Default,a as HoverOnly,o as NoShadows,r as SlowMotion,q as __namedExportsOrder,N as default};
