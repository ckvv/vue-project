import{d as y,I as g,c as _,J as I,e as C,A as u,H as D,g as v,K as x,o as R}from"./index-9d2900f7.js";const E=y({__name:"CanvasColorPicker",setup(k){const o=g(),i=g(""),s=_(()=>(o==null?void 0:o.value)&&o.value.getContext("2d")),d=()=>{let a,r;return[new Promise((n,t)=>{a=n,r=t}),a,r]},f=a=>{const[r,e,n]=d(),t=new FileReader;return t.addEventListener("loadend",l=>{var c;(c=l.target)!=null&&c.result?e(l.target.result):n(new Error("Read file fail"))}),t.addEventListener("error",l=>{n(l)}),t.readAsDataURL(a),r},m=a=>{const[r,e,n]=d(),t=new Image;return t.src=a,t.onload=()=>{e(t)},t.onerror=l=>{n(l)},r},h=(a,r)=>{const e=new ImageData(a,r),n=e.data.length;for(let t=0;t<n;t+=4){const l=t%(a*4)/(a*4)*255,c=t/(a*4)/r*255;e.data[t+0]=l,e.data[t+1]=c,e.data[t+2]=255-l,e.data[t+3]=255}return o.value&&(o.value.width=a,o.value.height=r),e};I(()=>{s.value&&s.value.putImageData(h(200,200),0,0)});const p=async a=>{var n;const r=a.target.files;if(!(r!=null&&r.length))return;const e=await m(await f(r[0]));o.value&&(o.value.width=e.width,o.value.height=e.height),(n=s.value)==null||n.drawImage(e,0,0,e.width,e.height)},w=a=>{if(s.value&&o.value){const{top:r,left:e}=o.value.getBoundingClientRect(),n=s.value.getImageData(a.x-e,a.y-r,1,1).data;i.value=`rgba(${n[0]} ${n[1]} ${n[2]} /${n[3]})`}};return(a,r)=>(R(),C("div",null,[u("div",{style:x({color:v(i)})}," 选择一张图片获取当前颜色: "+D(v(i)),5),u("input",{id:"file",type:"file",accept:"image/*",onChange:p},null,32),u("canvas",{id:"offscreen",ref_key:"canvasRef",ref:o,onMousemove:w},null,544)]))}});export{E as default};