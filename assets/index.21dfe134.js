import{u as f}from"./useMousePosition.490f1a01.js";import"./ffmpeg.min.82a0fcc9.js";import{_ as m}from"./index.8e1f3620.js";import{h as _,s as p,A as c,o as i,g as l,j as s,t,F as d,k as v,B as h}from"./vendor.4e7decc7.js";const R=_({setup(){let e=p([]);const a=n=>e.push(n);c(e,()=>{console.log("itemRefs: ",e,h(e))});const{x:o,y:r}=f();return{setItemRef:a,itemRefs:e,x:o,y:r}}}),g=["data-time"];function y(e,a,o,r,n,F){return i(),l(d,null,[s("h2",null,t(e.x)+":"+t(e.y),1),(i(),l(d,null,v(5,u=>s("div",{class:"item",ref_for:!0,ref:e.setItemRef,"data-time":new Date,key:u},t(u),9,g)),64)),s("div",null,"\u5F53\u524D itemRefs \u5185\u6709\u5143\u7D20\uFF1A"+t(e.itemRefs.length)+" \u4E2A",1)],64)}var $=m(R,[["render",y],["__scopeId","data-v-9f8eabd4"]]);export{$ as default};
