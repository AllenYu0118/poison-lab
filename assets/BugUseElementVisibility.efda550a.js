import{I as h,g as b,J as E,K as B,L as k,u as c,A as V,H as w,l as x,o as C,j as I,n as u,k as S}from"./vendor.de6324bc.js";import{_ as L}from"./index.405f9ff0.js";function T(t){return B()?(k(t),!0):!1}const a=typeof window!="undefined",W=t=>typeof t=="string",d=()=>{};function _(t,e=!0){h()?b(t):e?t():E(t)}const y=a?window:void 0;a&&window.document;a&&window.navigator;a&&window.location;function D(...t){let e,n,o,i;if(W(t[0])?([n,o,i]=t,e=y):[e,n,o,i]=t,!e)return d;let s=d;const l=V(()=>w(e),r=>{s(),r&&(r.addEventListener(n,o,i),s=()=>{r.removeEventListener(n,o,i),s=d})},{immediate:!0,flush:"post"}),v=()=>{l(),s()};return T(v),v}const f=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},p="__vueuse_ssr_handlers__";f[p]=f[p]||{};f[p];function H(t,{window:e=y,scrollTarget:n}={}){const o=c(!1),i=()=>{if(!e)return;const s=e.document;if(!t.value)o.value=!1;else{const l=t.value.getBoundingClientRect();o.value=l.top<=(e.innerHeight||s.documentElement.clientHeight)&&l.left<=(e.innerWidth||s.documentElement.clientWidth)&&l.bottom>=0&&l.right>=0}};return _(i),e&&_(()=>D((n==null?void 0:n.value)||e,"scroll",i,{capture:!1,passive:!0})),o}var g,m;a&&(window==null?void 0:window.navigator)&&((g=window==null?void 0:window.navigator)==null?void 0:g.platform)&&/iP(ad|hone|od)/.test((m=window==null?void 0:window.navigator)==null?void 0:m.platform);const K={class:"wrap"},M={class:"watch"},O=x({setup(t){const e=c(null),n=c(null),o=H(n,{scrollTarget:e});return(i,s)=>(C(),I("div",{class:"parent",ref_key:"parent",ref:e},[u("div",K,[u("div",{class:"target",ref_key:"target",ref:n},"Target Element (scroll down)",512),u("div",M,S(w(o)?"inside":"outside"),1)])],512))}});var A=L(O,[["__scopeId","data-v-5b0848ae"]]);export{A as default};
