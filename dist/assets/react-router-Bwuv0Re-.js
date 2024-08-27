import{r as a}from"./react-BM9L5BSm.js";import{i as v,g as J,r as w,j as U,p as k,m as z,A as j,s as A,a as S}from"./@remix-run-BmBn8aV1.js";/**
 * React Router v6.25.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function y(){return y=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},y.apply(this,arguments)}const L=a.createContext(null),V=a.createContext(null),b=a.createContext(null),P=a.createContext(null),E=a.createContext({outlet:null,matches:[],isDataRoute:!1}),M=a.createContext(null);function B(){return a.useContext(P)!=null}function O(){return B()||v(!1),a.useContext(P).location}function D(t){a.useContext(b).static||a.useLayoutEffect(t)}function le(){let{isDataRoute:t}=a.useContext(E);return t?re():W()}function W(){B()||v(!1);let t=a.useContext(L),{basename:e,future:r,navigator:n}=a.useContext(b),{matches:i}=a.useContext(E),{pathname:u}=O(),l=JSON.stringify(J(i,r.v7_relativeSplatPath)),f=a.useRef(!1);return D(()=>{f.current=!0}),a.useCallback(function(p,s){if(s===void 0&&(s={}),!f.current)return;if(typeof p=="number"){n.go(p);return}let o=w(p,JSON.parse(l),u,s.relative==="path");t==null&&e!=="/"&&(o.pathname=o.pathname==="/"?e:U([e,o.pathname])),(s.replace?n.replace:n.push)(o,s.state,s)},[e,n,l,u,t])}function q(t,e){return G(t,e)}function G(t,e,r,n){B()||v(!1);let{navigator:i}=a.useContext(b),{matches:u}=a.useContext(E),l=u[u.length-1],f=l?l.params:{};l&&l.pathname;let d=l?l.pathnameBase:"/";l&&l.route;let p=O(),s;if(e){var o;let c=typeof e=="string"?k(e):e;d==="/"||(o=c.pathname)!=null&&o.startsWith(d)||v(!1),s=c}else s=p;let h=s.pathname||"/",m=h;if(d!=="/"){let c=d.replace(/^\//,"").split("/");m="/"+h.replace(/^\//,"").split("/").slice(c.length).join("/")}let g=z(t,{pathname:m}),C=Z(g&&g.map(c=>Object.assign({},c,{params:Object.assign({},f,c.params),pathname:U([d,i.encodeLocation?i.encodeLocation(c.pathname).pathname:c.pathname]),pathnameBase:c.pathnameBase==="/"?d:U([d,i.encodeLocation?i.encodeLocation(c.pathnameBase).pathname:c.pathnameBase])})),u,r,n);return e&&C?a.createElement(P.Provider,{value:{location:y({pathname:"/",search:"",hash:"",state:null,key:"default"},s),navigationType:j.Pop}},C):C}function K(){let t=te(),e=S(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),r=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return a.createElement(a.Fragment,null,a.createElement("h2",null,"Unexpected Application Error!"),a.createElement("h3",{style:{fontStyle:"italic"}},e),r?a.createElement("pre",{style:i},r):null,null)}const Q=a.createElement(K,null);class X extends a.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,r){return r.location!==e.location||r.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:r.error,location:r.location,revalidation:e.revalidation||r.revalidation}}componentDidCatch(e,r){console.error("React Router caught the following error during render",e,r)}render(){return this.state.error!==void 0?a.createElement(E.Provider,{value:this.props.routeContext},a.createElement(M.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Y(t){let{routeContext:e,match:r,children:n}=t,i=a.useContext(L);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),a.createElement(E.Provider,{value:e},n)}function Z(t,e,r,n){var i;if(e===void 0&&(e=[]),r===void 0&&(r=null),n===void 0&&(n=null),t==null){var u;if((u=r)!=null&&u.errors)t=r.matches;else return null}let l=t,f=(i=r)==null?void 0:i.errors;if(f!=null){let s=l.findIndex(o=>o.route.id&&(f==null?void 0:f[o.route.id])!==void 0);s>=0||v(!1),l=l.slice(0,Math.min(l.length,s+1))}let d=!1,p=-1;if(r&&n&&n.v7_partialHydration)for(let s=0;s<l.length;s++){let o=l[s];if((o.route.HydrateFallback||o.route.hydrateFallbackElement)&&(p=s),o.route.id){let{loaderData:h,errors:m}=r,g=o.route.loader&&h[o.route.id]===void 0&&(!m||m[o.route.id]===void 0);if(o.route.lazy||g){d=!0,p>=0?l=l.slice(0,p+1):l=[l[0]];break}}}return l.reduceRight((s,o,h)=>{let m,g=!1,C=null,c=null;r&&(m=f&&o.route.id?f[o.route.id]:void 0,C=o.route.errorElement||Q,d&&(p<0&&h===0?(g=!0,c=null):p===h&&(g=!0,c=o.route.hydrateFallbackElement||null)));let N=e.concat(l.slice(0,h+1)),F=()=>{let x;return m?x=C:g?x=c:o.route.Component?x=a.createElement(o.route.Component,null):o.route.element?x=o.route.element:x=s,a.createElement(Y,{match:o,routeContext:{outlet:s,matches:N,isDataRoute:r!=null},children:x})};return r&&(o.route.ErrorBoundary||o.route.errorElement||h===0)?a.createElement(X,{location:r.location,revalidation:r.revalidation,component:C,error:m,children:F(),routeContext:{outlet:null,matches:N,isDataRoute:!0}}):F()},null)}var _=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(_||{}),R=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(R||{});function $(t){let e=a.useContext(L);return e||v(!1),e}function H(t){let e=a.useContext(V);return e||v(!1),e}function ee(t){let e=a.useContext(E);return e||v(!1),e}function T(t){let e=ee(),r=e.matches[e.matches.length-1];return r.route.id||v(!1),r.route.id}function te(){var t;let e=a.useContext(M),r=H(R.UseRouteError),n=T(R.UseRouteError);return e!==void 0?e:(t=r.errors)==null?void 0:t[n]}function re(){let{router:t}=$(_.UseNavigateStable),e=T(R.UseNavigateStable),r=a.useRef(!1);return D(()=>{r.current=!0}),a.useCallback(function(i,u){u===void 0&&(u={}),r.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,y({fromRouteId:e},u)))},[t,e])}function ne(t){v(!1)}function ie(t){let{basename:e="/",children:r=null,location:n,navigationType:i=j.Pop,navigator:u,static:l=!1,future:f}=t;B()&&v(!1);let d=e.replace(/^\/*/,"/"),p=a.useMemo(()=>({basename:d,navigator:u,static:l,future:y({v7_relativeSplatPath:!1},f)}),[d,f,u,l]);typeof n=="string"&&(n=k(n));let{pathname:s="/",search:o="",hash:h="",state:m=null,key:g="default"}=n,C=a.useMemo(()=>{let c=A(s,d);return c==null?null:{location:{pathname:c,search:o,hash:h,state:m,key:g},navigationType:i}},[d,s,o,h,m,g,i]);return C==null?null:a.createElement(b.Provider,{value:p},a.createElement(P.Provider,{children:r,value:C}))}function se(t){let{children:e,location:r}=t;return q(I(e),r)}new Promise(()=>{});function I(t,e){e===void 0&&(e=[]);let r=[];return a.Children.forEach(t,(n,i)=>{if(!a.isValidElement(n))return;let u=[...e,i];if(n.type===a.Fragment){r.push.apply(r,I(n.props.children,u));return}n.type!==ne&&v(!1),!n.props.index||!n.props.children||v(!1);let l={id:n.props.id||u.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(l.children=I(n.props.children,u)),r.push(l)}),r}export{ie as R,se as a,ne as b,le as u};
