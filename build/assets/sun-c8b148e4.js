import{j as M}from"./app-8df8dfe0.js";import{r as t}from"./vendor-a2d89f66.js";import{M as S,u as v,P as N,a as b,b as q,L as A,c as E}from"./createLucideIcon-718a96de.js";class H extends t.Component{getSnapshotBeforeUpdate(u){const e=this.props.childRef.current;if(e&&u.isPresent&&!this.props.isPresent){const s=e.offsetParent,f=s instanceof HTMLElement&&s.offsetWidth||0,n=this.props.sizeRef.current;n.height=e.offsetHeight||0,n.width=e.offsetWidth||0,n.top=e.offsetTop,n.left=e.offsetLeft,n.right=f-n.width-n.left}return null}componentDidUpdate(){}render(){return this.props.children}}function U({children:c,isPresent:u,anchorX:e}){const s=t.useId(),f=t.useRef(null),n=t.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:p}=t.useContext(S);return t.useInsertionEffect(()=>{const{width:C,height:o,top:m,left:r,right:d}=n.current;if(u||!f.current||!C||!o)return;const l=e==="left"?`left: ${r}`:`right: ${d}`;f.current.dataset.motionPopId=s;const a=document.createElement("style");return p&&(a.nonce=p),document.head.appendChild(a),a.sheet&&a.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${C}px !important;
            height: ${o}px !important;
            ${l}px !important;
            top: ${m}px !important;
          }
        `),()=>{document.head.contains(a)&&document.head.removeChild(a)}},[u]),M.jsx(H,{isPresent:u,childRef:f,sizeRef:n,children:t.cloneElement(c,{ref:f})})}const W=({children:c,initial:u,isPresent:e,onExitComplete:s,custom:f,presenceAffectsLayout:n,mode:p,anchorX:C})=>{const o=v(D),m=t.useId();let r=!0,d=t.useMemo(()=>(r=!1,{id:m,initial:u,isPresent:e,custom:f,onExitComplete:l=>{o.set(l,!0);for(const a of o.values())if(!a)return;s&&s()},register:l=>(o.set(l,!1),()=>o.delete(l))}),[e,o,s]);return n&&r&&(d={...d}),t.useMemo(()=>{o.forEach((l,a)=>o.set(a,!1))},[e]),t.useEffect(()=>{!e&&!o.size&&s&&s()},[e]),p==="popLayout"&&(c=M.jsx(U,{isPresent:e,anchorX:C,children:c})),M.jsx(N.Provider,{value:d,children:c})};function D(){return new Map}const k=c=>c.key||"";function $(c){const u=[];return t.Children.forEach(c,e=>{t.isValidElement(e)&&u.push(e)}),u}const Z=({children:c,custom:u,initial:e=!0,onExitComplete:s,presenceAffectsLayout:f=!0,mode:n="sync",propagate:p=!1,anchorX:C="left"})=>{const[o,m]=b(p),r=t.useMemo(()=>$(c),[c]),d=p&&!o?[]:r.map(k),l=t.useRef(!0),a=t.useRef(r),x=v(()=>new Map),[_,L]=t.useState(r),[y,w]=t.useState(r);q(()=>{l.current=!1,a.current=r;for(let h=0;h<y.length;h++){const i=k(y[h]);d.includes(i)?x.delete(i):x.get(i)!==!0&&x.set(i,!1)}},[y,d.length,d.join("-")]);const P=[];if(r!==_){let h=[...r];for(let i=0;i<y.length;i++){const g=y[i],j=k(g);d.includes(j)||(h.splice(i,0,g),P.push(g))}return n==="wait"&&P.length&&(h=P),w($(h)),L(r),null}const{forceRender:R}=t.useContext(A);return M.jsx(M.Fragment,{children:y.map(h=>{const i=k(h),g=p&&!o?!1:r===y||d.includes(i),j=()=>{if(x.has(i))x.set(i,!0);else return;let z=!0;x.forEach(I=>{I||(z=!1)}),z&&(R==null||R(),w(a.current),p&&(m==null||m()),s&&s())};return M.jsx(W,{isPresent:g,initial:!l.current||e?void 0:!1,custom:u,presenceAffectsLayout:f,mode:n,onExitComplete:g?void 0:j,anchorX:C,children:h},i)})})};/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],J=E("chevron-up",K);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]],O=E("message-square",V);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],Q=E("moon",X);/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Y=E("sun",B);export{Z as A,J as C,Q as M,Y as S,O as a};
