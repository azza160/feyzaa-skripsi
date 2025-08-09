import{j as k}from"./app-064981ae.js";import{r as t}from"./vendor-a2d89f66.js";import{M as S,u as v,P as b,a as N,b as q,L as A,c as M}from"./createLucideIcon-fbf5b906.js";class D extends t.Component{getSnapshotBeforeUpdate(h){const e=this.props.childRef.current;if(e&&h.isPresent&&!this.props.isPresent){const s=e.offsetParent,u=s instanceof HTMLElement&&s.offsetWidth||0,n=this.props.sizeRef.current;n.height=e.offsetHeight||0,n.width=e.offsetWidth||0,n.top=e.offsetTop,n.left=e.offsetLeft,n.right=u-n.width-n.left}return null}componentDidUpdate(){}render(){return this.props.children}}function H({children:c,isPresent:h,anchorX:e}){const s=t.useId(),u=t.useRef(null),n=t.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:p}=t.useContext(S);return t.useInsertionEffect(()=>{const{width:x,height:o,top:m,left:r,right:d}=n.current;if(h||!u.current||!x||!o)return;const l=e==="left"?`left: ${r}`:`right: ${d}`;u.current.dataset.motionPopId=s;const a=document.createElement("style");return p&&(a.nonce=p),document.head.appendChild(a),a.sheet&&a.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${x}px !important;
            height: ${o}px !important;
            ${l}px !important;
            top: ${m}px !important;
          }
        `),()=>{document.head.contains(a)&&document.head.removeChild(a)}},[h]),k.jsx(D,{isPresent:h,childRef:u,sizeRef:n,children:t.cloneElement(c,{ref:u})})}const U=({children:c,initial:h,isPresent:e,onExitComplete:s,custom:u,presenceAffectsLayout:n,mode:p,anchorX:x})=>{const o=v(W),m=t.useId();let r=!0,d=t.useMemo(()=>(r=!1,{id:m,initial:h,isPresent:e,custom:u,onExitComplete:l=>{o.set(l,!0);for(const a of o.values())if(!a)return;s&&s()},register:l=>(o.set(l,!1),()=>o.delete(l))}),[e,o,s]);return n&&r&&(d={...d}),t.useMemo(()=>{o.forEach((l,a)=>o.set(a,!1))},[e]),t.useEffect(()=>{!e&&!o.size&&s&&s()},[e]),p==="popLayout"&&(c=k.jsx(H,{isPresent:e,anchorX:x,children:c})),k.jsx(b.Provider,{value:d,children:c})};function W(){return new Map}const w=c=>c.key||"";function j(c){const h=[];return t.Children.forEach(c,e=>{t.isValidElement(e)&&h.push(e)}),h}const J=({children:c,custom:h,initial:e=!0,onExitComplete:s,presenceAffectsLayout:u=!0,mode:n="sync",propagate:p=!1,anchorX:x="left"})=>{const[o,m]=N(p),r=t.useMemo(()=>j(c),[c]),d=p&&!o?[]:r.map(w),l=t.useRef(!0),a=t.useRef(r),C=v(()=>new Map),[z,L]=t.useState(r),[y,_]=t.useState(r);q(()=>{l.current=!1,a.current=r;for(let f=0;f<y.length;f++){const i=w(y[f]);d.includes(i)?C.delete(i):C.get(i)!==!0&&C.set(i,!1)}},[y,d.length,d.join("-")]);const E=[];if(r!==z){let f=[...r];for(let i=0;i<y.length;i++){const g=y[i],R=w(g);d.includes(R)||(f.splice(i,0,g),E.push(g))}return n==="wait"&&E.length&&(f=E),_(j(f)),L(r),null}const{forceRender:P}=t.useContext(A);return k.jsx(k.Fragment,{children:y.map(f=>{const i=w(f),g=p&&!o?!1:r===y||d.includes(i),R=()=>{if(C.has(i))C.set(i,!0);else return;let $=!0;C.forEach(I=>{I||($=!1)}),$&&(P==null||P(),_(a.current),p&&(m==null||m()),s&&s())};return k.jsx(U,{isPresent:g,initial:!l.current||e?void 0:!1,custom:h,presenceAffectsLayout:u,mode:n,onExitComplete:g?void 0:R,anchorX:x,children:f},i)})})};/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],O=M("chevron-up",K);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Q=M("layout-dashboard",V);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]],Y=M("message-square",X);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],ee=M("moon",B);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],te=M("sun",F);export{J as A,O as C,Q as L,ee as M,te as S,Y as a};
