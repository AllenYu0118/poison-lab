import{_ as s}from"./index.405f9ff0.js";import{l as c,r as a,o as i,j as l,m,n as p}from"./vendor.de6324bc.js";const _=()=>{const o={like:"vuejs"};return new Proxy(o,{get(n,e){if(e in n)return console.log("propKey: ",e),n[e];throw new ReferenceError(`Prop name ${String(e)} does not exist.`)}})},u=c({name:"demo",setup(){const o=_();return console.log("person: ",o.like),{}}}),d=p("h2",null,"Demo",-1);function f(o,r,n,e,x,v){const t=a("router-view");return i(),l("div",null,[d,m(t)])}var h=s(u,[["render",f]]);export{h as default};