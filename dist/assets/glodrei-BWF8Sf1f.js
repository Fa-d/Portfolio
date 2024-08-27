import{_ as q}from"./@babel-CF3RwP-h.js";import{r as t}from"./react-BM9L5BSm.js";import{c as be}from"./react-dom-DTilBYEf.js";import{g as V,D as Pe,O as oe,P as se,Q as we}from"./three-D6Fw_2Dt.js";import{u as ie,c as ae}from"./@react-three-DY1ZwaEh.js";import"./@react-spring-BotoEXbK.js";import{T as Ee,p as Se}from"./troika-three-text-sm-F7SuH.js";import{s as We}from"./suspend-react-DF1CRDJi.js";import"./camera-controls-DKxc4fxB.js";const O=new V,G=new V,Re=new V;function je(e,r,n){const o=O.setFromMatrixPosition(e.matrixWorld);o.project(r);const i=n.width/2,c=n.height/2;return[o.x*i+i,-(o.y*c)+c]}function Ce(e,r){const n=O.setFromMatrixPosition(e.matrixWorld),o=G.setFromMatrixPosition(r.matrixWorld),i=n.sub(o),c=r.getWorldDirection(Re);return i.angleTo(c)>Math.PI/2}function Te(e,r,n,o){const i=O.setFromMatrixPosition(e.matrixWorld),c=i.clone();c.project(r),n.setFromCamera(c,r);const u=n.intersectObjects(o,!0);if(u.length){const v=u[0].distance;return i.distanceTo(n.ray.origin)<v}return!0}function $e(e,r){if(r instanceof oe)return r.zoom;if(r instanceof se){const n=O.setFromMatrixPosition(e.matrixWorld),o=G.setFromMatrixPosition(r.matrixWorld),i=r.fov*Math.PI/180,c=n.distanceTo(o);return 1/(2*Math.tan(i/2)*c)}else return 1}function Oe(e,r,n){if(r instanceof se||r instanceof oe){const o=O.setFromMatrixPosition(e.matrixWorld),i=G.setFromMatrixPosition(r.matrixWorld),c=o.distanceTo(i),u=(n[1]-n[0])/(r.far-r.near),v=n[1]-u*r.far;return Math.round(u*c+v)}}const Z=e=>Math.abs(e)<1e-10?0:e;function ce(e,r,n=""){let o="matrix3d(";for(let i=0;i!==16;i++)o+=Z(r[i]*e.elements[i])+(i!==15?",":")");return n+o}const ze=(e=>r=>ce(r,e))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Fe=(e=>(r,n)=>ce(r,e(n),"translate(-50%,-50%)"))(e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1]);function He(e){return e&&typeof e=="object"&&"current"in e}const Ze=t.forwardRef(({children:e,eps:r=.001,style:n,className:o,prepend:i,center:c,fullscreen:u,portal:v,distanceFactor:y,sprite:f=!1,transform:l=!1,occlude:a,onOcclude:b,castShadow:B,receiveShadow:P,material:z,geometry:E,zIndexRange:F=[16777271,0],calculatePosition:U=je,as:le="div",wrapperClass:I,pointerEvents:_="auto",...g},X)=>{const{gl:Y,camera:d,scene:J,size:h,raycaster:ue,events:fe,viewport:de}=ie(),[m]=t.useState(()=>document.createElement(le)),L=t.useRef(),p=t.useRef(null),K=t.useRef(0),H=t.useRef([0,0]),T=t.useRef(null),N=t.useRef(null),j=(v==null?void 0:v.current)||fe.connected||Y.domElement.parentNode,w=t.useRef(null),A=t.useRef(!1),k=t.useMemo(()=>a&&a!=="blending"||Array.isArray(a)&&a.length&&He(a[0]),[a]);t.useLayoutEffect(()=>{const x=Y.domElement;a&&a==="blending"?(x.style.zIndex=`${Math.floor(F[0]/2)}`,x.style.position="absolute",x.style.pointerEvents="none"):(x.style.zIndex=null,x.style.position=null,x.style.pointerEvents=null)},[a]),t.useLayoutEffect(()=>{if(p.current){const x=L.current=be(m);if(J.updateMatrixWorld(),l)m.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const s=U(p.current,d,h);m.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${s[0]}px,${s[1]}px,0);transform-origin:0 0;`}return j&&(i?j.prepend(m):j.appendChild(m)),()=>{j&&j.removeChild(m),x.unmount()}}},[j,l]),t.useLayoutEffect(()=>{I&&(m.className=I)},[I]);const ee=t.useMemo(()=>l?{position:"absolute",top:0,left:0,width:h.width,height:h.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:c?"translate3d(-50%,-50%,0)":"none",...u&&{top:-h.height/2,left:-h.width/2,width:h.width,height:h.height},...n},[n,c,u,h,l]),me=t.useMemo(()=>({position:"absolute",pointerEvents:_}),[_]);t.useLayoutEffect(()=>{if(A.current=!1,l){var x;(x=L.current)==null||x.render(t.createElement("div",{ref:T,style:ee},t.createElement("div",{ref:N,style:me},t.createElement("div",{ref:X,className:o,style:n,children:e}))))}else{var s;(s=L.current)==null||s.render(t.createElement("div",{ref:X,style:ee,className:o,children:e}))}});const C=t.useRef(!0);ae(x=>{if(p.current){d.updateMatrixWorld(),p.current.updateWorldMatrix(!0,!1);const s=l?H.current:U(p.current,d,h);if(l||Math.abs(K.current-d.zoom)>r||Math.abs(H.current[0]-s[0])>r||Math.abs(H.current[1]-s[1])>r){const S=Ce(p.current,d);let M=!1;k&&(Array.isArray(a)?M=a.map(W=>W.current):a!=="blending"&&(M=[J]));const $=C.current;if(M){const W=Te(p.current,d,ue,M);C.current=W&&!S}else C.current=!S;$!==C.current&&(b?b(!C.current):m.style.display=C.current?"block":"none");const D=Math.floor(F[0]/2),he=a?k?[F[0],D]:[D-1,0]:F;if(m.style.zIndex=`${Oe(p.current,d,he)}`,l){const[W,re]=[h.width/2,h.height/2],Q=d.projectionMatrix.elements[5]*re,{isOrthographicCamera:ne,top:xe,left:pe,bottom:ve,right:ye}=d,ge=ze(d.matrixWorldInverse),Me=ne?`scale(${Q})translate(${Z(-(ye+pe)/2)}px,${Z((xe+ve)/2)}px)`:`translateZ(${Q}px)`;let R=p.current.matrixWorld;f&&(R=d.matrixWorldInverse.clone().transpose().copyPosition(R).scale(p.current.scale),R.elements[3]=R.elements[7]=R.elements[11]=0,R.elements[15]=1),m.style.width=h.width+"px",m.style.height=h.height+"px",m.style.perspective=ne?"":`${Q}px`,T.current&&N.current&&(T.current.style.transform=`${Me}${ge}translate(${W}px,${re}px)`,N.current.style.transform=Fe(R,1/((y||10)/400)))}else{const W=y===void 0?1:$e(p.current,d)*y;m.style.transform=`translate3d(${s[0]}px,${s[1]}px,0) scale(${W})`}H.current=s,K.current=d.zoom}}if(!k&&w.current&&!A.current)if(l){if(T.current){const s=T.current.children[0];if(s!=null&&s.clientWidth&&s!=null&&s.clientHeight){const{isOrthographicCamera:S}=d;if(S||E)g.scale&&(Array.isArray(g.scale)?g.scale instanceof V?w.current.scale.copy(g.scale.clone().divideScalar(1)):w.current.scale.set(1/g.scale[0],1/g.scale[1],1/g.scale[2]):w.current.scale.setScalar(1/g.scale));else{const M=(y||10)/400,$=s.clientWidth*M,D=s.clientHeight*M;w.current.scale.set($,D,1)}A.current=!0}}}else{const s=m.children[0];if(s!=null&&s.clientWidth&&s!=null&&s.clientHeight){const S=1/de.factor,M=s.clientWidth*S,$=s.clientHeight*S;w.current.scale.set(M,$,1),A.current=!0}w.current.lookAt(x.camera.position)}});const te=t.useMemo(()=>({vertexShader:l?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom" 
            is false. 
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;
            
            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[l]);return t.createElement("group",q({},g,{ref:p}),a&&!k&&t.createElement("mesh",{castShadow:B,receiveShadow:P,ref:w},E||t.createElement("planeGeometry",null),z||t.createElement("shaderMaterial",{side:Pe,vertexShader:te.vertexShader,fragmentShader:te.fragmentShader})))});function qe(e,r="pointer",n="auto",o=document.body){t.useEffect(()=>{if(e)return o.style.cursor=r,()=>void(o.style.cursor=n)},[e])}const Ge=t.forwardRef(function({children:r,follow:n=!0,lockX:o=!1,lockY:i=!1,lockZ:c=!1,...u},v){const y=t.useRef(null),f=t.useRef(null),l=new we;return ae(({camera:a})=>{if(!n||!f.current)return;const b=f.current.rotation.clone();f.current.updateMatrix(),f.current.updateWorldMatrix(!1,!1),f.current.getWorldQuaternion(l),a.getWorldQuaternion(y.current.quaternion).premultiply(l.invert()),o&&(f.current.rotation.x=b.x),i&&(f.current.rotation.y=b.y),c&&(f.current.rotation.z=b.z)}),t.useImperativeHandle(v,()=>f.current,[]),t.createElement("group",q({ref:f,matrixAutoUpdate:!1,matrixWorldAutoUpdate:!1},u),t.createElement("group",{ref:y},r))}),Ue=t.forwardRef(({sdfGlyphSize:e=64,anchorX:r="center",anchorY:n="middle",font:o,fontSize:i=1,children:c,characters:u,onSync:v,...y},f)=>{const l=ie(({invalidate:P})=>P),[a]=t.useState(()=>new Ee),[b,B]=t.useMemo(()=>{const P=[];let z="";return t.Children.forEach(c,E=>{typeof E=="string"||typeof E=="number"?z+=E:P.push(E)}),[P,z]},[c]);return We(()=>new Promise(P=>Se({font:o,characters:u},P)),["troika-text",o,u]),t.useLayoutEffect(()=>void a.sync(()=>{l(),v&&v(a)})),t.useEffect(()=>()=>a.dispose(),[a]),t.createElement("primitive",q({object:a,ref:f,font:o,text:B,anchorX:r,anchorY:n,fontSize:i,sdfGlyphSize:e},y),b)});export{Ge as B,Ze as H,Ue as T,qe as u};
