import{d as _,r as c,c as a,u as o,o as p,a as d,b as s,F as g,e as x,f as y,n as w,w as b,v as z,g as B,h as $,t as v}from"./index-9d7b1b1f.js";const R=_({__name:"RecycleScroller",props:{items:{},itemSize:{},buffer:{}},setup(m){const e=m,l=c(),t=c(0),r=a(()=>e.items.slice(o(t),o(t)+e.buffer));function i(f){const u=l.value;u&&(t.value=u.scrollTop/e.itemSize)}const n=a(()=>o(t)*e.itemSize),h=a(()=>(e.items.length-o(e.buffer)-o(t))*e.itemSize);return(f,u)=>(p(),d("div",{ref_key:"wrapRef",ref:l,onScroll:i},[s("div",{style:w({paddingTop:`${n.value}px`,paddingBottom:`${h.value}px`})},[(p(!0),d(g,null,x(r.value,S=>y(f.$slots,"default",{item:S})),256))],4)],544))}}),T={style:{color:"red","line-height":"24px"}},k=_({__name:"VirtualScroller",setup(m){const e=c(1e3),l=a(()=>[...new Array(Number(e.value))].map((t,r)=>({id:r,msg:`${Math.random()}`})));return(t,r)=>{const i=R;return p(),d(g,null,[b(s("input",{"onUpdate:modelValue":r[0]||(r[0]=n=>e.value=n)},null,512),[[z,e.value]]),B(i,{style:{height:"240px",overflow:"scroll"},buffer:10,items:l.value,"item-size":24},{default:$(({item:n})=>[s("div",null,[s("span",T,v(n.id)+": ",1),s("span",null,v(n.msg),1)])]),_:1},8,["items"])],64)}}});export{k as default};
