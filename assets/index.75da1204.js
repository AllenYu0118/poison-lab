import{t as $,f as w,g as H,h as C,i as V,o as s,j as a,k as r,w as E,l as W,r as v,m as h,n as l,F as d,p as k,q as A,v as B,s as p,u as D,x as g,c as M}from"./vendor.c0915212.js";import"./ffmpeg.min.82a0fcc9.js";import{_ as x,r as T}from"./index.865ec351.js";const L=()=>{const e=w({x:0,y:0}),o=t=>{e.x=t.pageX,e.y=t.pageY};return H(()=>{window.addEventListener("mousemove",o)}),C(()=>{window.removeEventListener("mouseover",o)}),$(e)};function N(e,o=2e3){let t;return V((u,i)=>({get(){return u(),e},set(c){clearTimeout(t),t=setTimeout(()=>{e=c,i()},o)}}))}const P={name:"HelloWorld",props:{msg:String}};function R(e,o,t,u,i,c){return s(),a("h1",null,r(t.msg),1)}var S=x(P,[["render",R]]);function U(e){E(()=>{console.log(e.value)})}var b="/poison-lab/assets/logo.03d6d6da.png";const j=W({name:"App",components:{HelloWorld:S},setup(e,o){const t=D(0),u=()=>{t.value++},{x:i,y:c}=L();U(t);const m=N("hello");return{x:i,y:c,counter:t,counterClickHandle:u,routes:T,text:m}}}),q=l("img",{alt:"Vue logo",src:b},null,-1),X=l("h3",null,"\u8DEF\u7531\uFF1A",-1),Y=p("customRef\uFF1A");function z(e,o,t,u,i,c){const m=v("HelloWorld"),f=v("router-link");return s(),a(d,null,[q,h(m,{msg:"Hello Vue 3.0 + Vite"}),l("h3",null,"useMousePosition\uFF1A"+r(e.x)+":"+r(e.y),1),X,(s(!0),a(d,null,k(e.routes,(n,y)=>(s(),a("span",{key:y,style:{"margin-right":"20px"}},[n.children?(s(),a(d,{key:0},[l("p",null,[h(f,{to:n.path},{default:g(()=>[p(r(n.path),1)]),_:2},1032,["to"])]),(s(!0),a(d,null,k(n.children,(_,F)=>(s(),a("span",{key:F,style:{"margin-right":"20px"}},[h(f,{to:n.path+_.path},{default:g(()=>[p(r(_.path),1)]),_:2},1032,["to"])]))),128))],64)):(s(),M(f,{key:1,to:n.path},{default:g(()=>[p(r(n.path),1)]),_:2},1032,["to"]))]))),128)),l("p",null,[Y,A(l("input",{"onUpdate:modelValue":o[0]||(o[0]=n=>e.text=n)},null,512),[[B,e.text]]),p(" "+r(e.text),1)]),l("div",{onClick:o[1]||(o[1]=(...n)=>e.counterClickHandle&&e.counterClickHandle(...n))},"ref: "+r(e.counter),1)],64)}var K=x(j,[["render",z]]);export{K as default};
