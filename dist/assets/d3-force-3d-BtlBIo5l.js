import{b as K}from"./d3-binarytree-e94m1gdS.js";import{q as Q}from"./d3-quadtree-CSANTnla.js";import{o as U}from"./d3-octree-CZ7m1I_d.js";import{t as nn}from"./d3-timer-N3g7Zl0V.js";import{d as tn}from"./d3-dispatch-kxCwF96_.js";function xn(n,a,i){var h,y=1;n==null&&(n=0),a==null&&(a=0),i==null&&(i=0);function v(){var l,r=h.length,e,x=0,f=0,o=0;for(l=0;l<r;++l)e=h[l],x+=e.x||0,f+=e.y||0,o+=e.z||0;for(x=(x/r-n)*y,f=(f/r-a)*y,o=(o/r-i)*y,l=0;l<r;++l)e=h[l],x&&(e.x-=x),f&&(e.y-=f),o&&(e.z-=o)}return v.initialize=function(l){h=l},v.x=function(l){return arguments.length?(n=+l,v):n},v.y=function(l){return arguments.length?(a=+l,v):a},v.z=function(l){return arguments.length?(i=+l,v):i},v.strength=function(l){return arguments.length?(y=+l,v):y},v}function D(n){return function(){return n}}function C(n){return(n()-.5)*1e-6}function F(n){return n.x+n.vx}function O(n){return n.y+n.vy}function rn(n){return n.z+n.vz}function pn(n){var a,i,h,y,v=1,l=1;typeof n!="function"&&(n=D(n==null?1:+n));function r(){for(var f,o=a.length,A,M,u,w,m,t,z,s=0;s<l;++s)for(A=(i===1?K(a,F):i===2?Q(a,F,O):i===3?U(a,F,O,rn):null).visitAfter(e),f=0;f<o;++f)M=a[f],t=h[M.index],z=t*t,u=M.x+M.vx,i>1&&(w=M.y+M.vy),i>2&&(m=M.z+M.vz),A.visit(c);function c(g,p,d,q,j,$,S){var E=[p,d,q,j,$,S],X=E[0],V=E[1],W=E[2],N=E[i],k=E[i+1],_=E[i+2],R=g.data,Y=g.r,I=t+Y;if(R){if(R.index>M.index){var B=u-R.x-R.vx,P=i>1?w-R.y-R.vy:0,T=i>2?m-R.z-R.vz:0,b=B*B+P*P+T*T;b<I*I&&(B===0&&(B=C(y),b+=B*B),i>1&&P===0&&(P=C(y),b+=P*P),i>2&&T===0&&(T=C(y),b+=T*T),b=(I-(b=Math.sqrt(b)))/b*v,M.vx+=(B*=b)*(I=(Y*=Y)/(z+Y)),i>1&&(M.vy+=(P*=b)*I),i>2&&(M.vz+=(T*=b)*I),R.vx-=B*(I=1-I),i>1&&(R.vy-=P*I),i>2&&(R.vz-=T*I))}return}return X>u+I||N<u-I||i>1&&(V>w+I||k<w-I)||i>2&&(W>m+I||_<m-I)}}function e(f){if(f.data)return f.r=h[f.data.index];for(var o=f.r=0;o<Math.pow(2,i);++o)f[o]&&f[o].r>f.r&&(f.r=f[o].r)}function x(){if(a){var f,o=a.length,A;for(h=new Array(o),f=0;f<o;++f)A=a[f],h[A.index]=+n(A,f,a)}}return r.initialize=function(f,...o){a=f,y=o.find(A=>typeof A=="function")||Math.random,i=o.find(A=>[1,2,3].includes(A))||2,x()},r.iterations=function(f){return arguments.length?(l=+f,r):l},r.strength=function(f){return arguments.length?(v=+f,r):v},r.radius=function(f){return arguments.length?(n=typeof f=="function"?f:D(+f),x(),r):n},r}function fn(n){return n.index}function Z(n,a){var i=n.get(a);if(!i)throw new Error("node not found: "+a);return i}function zn(n){var a=fn,i=A,h,y=D(30),v,l,r,e,x,f,o=1;n==null&&(n=[]);function A(t){return 1/Math.min(e[t.source.index],e[t.target.index])}function M(t){for(var z=0,s=n.length;z<o;++z)for(var c=0,g,p,d,q=0,j=0,$=0,S,E;c<s;++c)g=n[c],p=g.source,d=g.target,q=d.x+d.vx-p.x-p.vx||C(f),r>1&&(j=d.y+d.vy-p.y-p.vy||C(f)),r>2&&($=d.z+d.vz-p.z-p.vz||C(f)),S=Math.sqrt(q*q+j*j+$*$),S=(S-v[c])/S*t*h[c],q*=S,j*=S,$*=S,d.vx-=q*(E=x[c]),r>1&&(d.vy-=j*E),r>2&&(d.vz-=$*E),p.vx+=q*(E=1-E),r>1&&(p.vy+=j*E),r>2&&(p.vz+=$*E)}function u(){if(l){var t,z=l.length,s=n.length,c=new Map(l.map((p,d)=>[a(p,d,l),p])),g;for(t=0,e=new Array(z);t<s;++t)g=n[t],g.index=t,typeof g.source!="object"&&(g.source=Z(c,g.source)),typeof g.target!="object"&&(g.target=Z(c,g.target)),e[g.source.index]=(e[g.source.index]||0)+1,e[g.target.index]=(e[g.target.index]||0)+1;for(t=0,x=new Array(s);t<s;++t)g=n[t],x[t]=e[g.source.index]/(e[g.source.index]+e[g.target.index]);h=new Array(s),w(),v=new Array(s),m()}}function w(){if(l)for(var t=0,z=n.length;t<z;++t)h[t]=+i(n[t],t,n)}function m(){if(l)for(var t=0,z=n.length;t<z;++t)v[t]=+y(n[t],t,n)}return M.initialize=function(t,...z){l=t,f=z.find(s=>typeof s=="function")||Math.random,r=z.find(s=>[1,2,3].includes(s))||2,u()},M.links=function(t){return arguments.length?(n=t,u(),M):n},M.id=function(t){return arguments.length?(a=t,M):a},M.iterations=function(t){return arguments.length?(o=+t,M):o},M.strength=function(t){return arguments.length?(i=typeof t=="function"?t:D(+t),w(),M):i},M.distance=function(t){return arguments.length?(y=typeof t=="function"?t:D(+t),m(),M):y},M}const en=1664525,an=1013904223,G=4294967296;function un(){let n=1;return()=>(n=(en*n+an)%G)/G}var H=3;function L(n){return n.x}function J(n){return n.y}function on(n){return n.z}var cn=10,hn=Math.PI*(3-Math.sqrt(5)),ln=Math.PI*20/(9+Math.sqrt(221));function Mn(n,a){a=a||2;var i=Math.min(H,Math.max(1,Math.round(a))),h,y=1,v=.001,l=1-Math.pow(v,1/300),r=0,e=.6,x=new Map,f=nn(M),o=tn("tick","end"),A=un();n==null&&(n=[]);function M(){u(),o.call("tick",h),y<v&&(f.stop(),o.call("end",h))}function u(t){var z,s=n.length,c;t===void 0&&(t=1);for(var g=0;g<t;++g)for(y+=(r-y)*l,x.forEach(function(p){p(y)}),z=0;z<s;++z)c=n[z],c.fx==null?c.x+=c.vx*=e:(c.x=c.fx,c.vx=0),i>1&&(c.fy==null?c.y+=c.vy*=e:(c.y=c.fy,c.vy=0)),i>2&&(c.fz==null?c.z+=c.vz*=e:(c.z=c.fz,c.vz=0));return h}function w(){for(var t=0,z=n.length,s;t<z;++t){if(s=n[t],s.index=t,s.fx!=null&&(s.x=s.fx),s.fy!=null&&(s.y=s.fy),s.fz!=null&&(s.z=s.fz),isNaN(s.x)||i>1&&isNaN(s.y)||i>2&&isNaN(s.z)){var c=cn*(i>2?Math.cbrt(.5+t):i>1?Math.sqrt(.5+t):t),g=t*hn,p=t*ln;i===1?s.x=c:i===2?(s.x=c*Math.cos(g),s.y=c*Math.sin(g)):(s.x=c*Math.sin(g)*Math.cos(p),s.y=c*Math.cos(g),s.z=c*Math.sin(g)*Math.sin(p))}(isNaN(s.vx)||i>1&&isNaN(s.vy)||i>2&&isNaN(s.vz))&&(s.vx=0,i>1&&(s.vy=0),i>2&&(s.vz=0))}}function m(t){return t.initialize&&t.initialize(n,A,i),t}return w(),h={tick:u,restart:function(){return f.restart(M),h},stop:function(){return f.stop(),h},numDimensions:function(t){return arguments.length?(i=Math.min(H,Math.max(1,Math.round(t))),x.forEach(m),h):i},nodes:function(t){return arguments.length?(n=t,w(),x.forEach(m),h):n},alpha:function(t){return arguments.length?(y=+t,h):y},alphaMin:function(t){return arguments.length?(v=+t,h):v},alphaDecay:function(t){return arguments.length?(l=+t,h):+l},alphaTarget:function(t){return arguments.length?(r=+t,h):r},velocityDecay:function(t){return arguments.length?(e=1-t,h):1-e},randomSource:function(t){return arguments.length?(A=t,x.forEach(m),h):A},force:function(t,z){return arguments.length>1?(z==null?x.delete(t):x.set(t,m(z)),h):x.get(t)},find:function(){var t=Array.prototype.slice.call(arguments),z=t.shift()||0,s=(i>1?t.shift():null)||0,c=(i>2?t.shift():null)||0,g=t.shift()||1/0,p=0,d=n.length,q,j,$,S,E,X;for(g*=g,p=0;p<d;++p)E=n[p],q=z-E.x,j=s-(E.y||0),$=c-(E.z||0),S=q*q+j*j+$*$,S<g&&(X=E,g=S);return X},on:function(t,z){return arguments.length>1?(o.on(t,z),h):o.on(t)}}}function wn(){var n,a,i,h,y,v=D(-30),l,r=1,e=1/0,x=.81;function f(u){var w,m=n.length,t=(a===1?K(n,L):a===2?Q(n,L,J):a===3?U(n,L,J,on):null).visitAfter(A);for(y=u,w=0;w<m;++w)i=n[w],t.visit(M)}function o(){if(n){var u,w=n.length,m;for(l=new Array(w),u=0;u<w;++u)m=n[u],l[m.index]=+v(m,u,n)}}function A(u){var w=0,m,t,z=0,s,c,g,p,d=u.length;if(d){for(s=c=g=p=0;p<d;++p)(m=u[p])&&(t=Math.abs(m.value))&&(w+=m.value,z+=t,s+=t*(m.x||0),c+=t*(m.y||0),g+=t*(m.z||0));w*=Math.sqrt(4/d),u.x=s/z,a>1&&(u.y=c/z),a>2&&(u.z=g/z)}else{m=u,m.x=m.data.x,a>1&&(m.y=m.data.y),a>2&&(m.z=m.data.z);do w+=l[m.data.index];while(m=m.next)}u.value=w}function M(u,w,m,t,z){if(!u.value)return!0;var s=[m,t,z][a-1],c=u.x-i.x,g=a>1?u.y-i.y:0,p=a>2?u.z-i.z:0,d=s-w,q=c*c+g*g+p*p;if(d*d/x<q)return q<e&&(c===0&&(c=C(h),q+=c*c),a>1&&g===0&&(g=C(h),q+=g*g),a>2&&p===0&&(p=C(h),q+=p*p),q<r&&(q=Math.sqrt(r*q)),i.vx+=c*u.value*y/q,a>1&&(i.vy+=g*u.value*y/q),a>2&&(i.vz+=p*u.value*y/q)),!0;if(u.length||q>=e)return;(u.data!==i||u.next)&&(c===0&&(c=C(h),q+=c*c),a>1&&g===0&&(g=C(h),q+=g*g),a>2&&p===0&&(p=C(h),q+=p*p),q<r&&(q=Math.sqrt(r*q)));do u.data!==i&&(d=l[u.data.index]*y/q,i.vx+=c*d,a>1&&(i.vy+=g*d),a>2&&(i.vz+=p*d));while(u=u.next)}return f.initialize=function(u,...w){n=u,h=w.find(m=>typeof m=="function")||Math.random,a=w.find(m=>[1,2,3].includes(m))||2,o()},f.strength=function(u){return arguments.length?(v=typeof u=="function"?u:D(+u),o(),f):v},f.distanceMin=function(u){return arguments.length?(r=u*u,f):Math.sqrt(r)},f.distanceMax=function(u){return arguments.length?(e=u*u,f):Math.sqrt(e)},f.theta=function(u){return arguments.length?(x=u*u,f):Math.sqrt(x)},f}function qn(n,a,i,h){var y,v,l=D(.1),r,e;typeof n!="function"&&(n=D(+n)),a==null&&(a=0),i==null&&(i=0),h==null&&(h=0);function x(o){for(var A=0,M=y.length;A<M;++A){var u=y[A],w=u.x-a||1e-6,m=(u.y||0)-i||1e-6,t=(u.z||0)-h||1e-6,z=Math.sqrt(w*w+m*m+t*t),s=(e[A]-z)*r[A]*o/z;u.vx+=w*s,v>1&&(u.vy+=m*s),v>2&&(u.vz+=t*s)}}function f(){if(y){var o,A=y.length;for(r=new Array(A),e=new Array(A),o=0;o<A;++o)e[o]=+n(y[o],o,y),r[o]=isNaN(e[o])?0:+l(y[o],o,y)}}return x.initialize=function(o,...A){y=o,v=A.find(M=>[1,2,3].includes(M))||2,f()},x.strength=function(o){return arguments.length?(l=typeof o=="function"?o:D(+o),f(),x):l},x.radius=function(o){return arguments.length?(n=typeof o=="function"?o:D(+o),f(),x):n},x.x=function(o){return arguments.length?(a=+o,x):a},x.y=function(o){return arguments.length?(i=+o,x):i},x.z=function(o){return arguments.length?(h=+o,x):h},x}function An(n){var a=D(.1),i,h,y;typeof n!="function"&&(n=D(n==null?0:+n));function v(r){for(var e=0,x=i.length,f;e<x;++e)f=i[e],f.vx+=(y[e]-f.x)*h[e]*r}function l(){if(i){var r,e=i.length;for(h=new Array(e),y=new Array(e),r=0;r<e;++r)h[r]=isNaN(y[r]=+n(i[r],r,i))?0:+a(i[r],r,i)}}return v.initialize=function(r){i=r,l()},v.strength=function(r){return arguments.length?(a=typeof r=="function"?r:D(+r),l(),v):a},v.x=function(r){return arguments.length?(n=typeof r=="function"?r:D(+r),l(),v):n},v}function dn(n){var a=D(.1),i,h,y;typeof n!="function"&&(n=D(n==null?0:+n));function v(r){for(var e=0,x=i.length,f;e<x;++e)f=i[e],f.vy+=(y[e]-f.y)*h[e]*r}function l(){if(i){var r,e=i.length;for(h=new Array(e),y=new Array(e),r=0;r<e;++r)h[r]=isNaN(y[r]=+n(i[r],r,i))?0:+a(i[r],r,i)}}return v.initialize=function(r){i=r,l()},v.strength=function(r){return arguments.length?(a=typeof r=="function"?r:D(+r),l(),v):a},v.y=function(r){return arguments.length?(n=typeof r=="function"?r:D(+r),l(),v):n},v}function Dn(n){var a=D(.1),i,h,y;typeof n!="function"&&(n=D(n==null?0:+n));function v(r){for(var e=0,x=i.length,f;e<x;++e)f=i[e],f.vz+=(y[e]-f.z)*h[e]*r}function l(){if(i){var r,e=i.length;for(h=new Array(e),y=new Array(e),r=0;r<e;++r)h[r]=isNaN(y[r]=+n(i[r],r,i))?0:+a(i[r],r,i)}}return v.initialize=function(r){i=r,l()},v.strength=function(r){return arguments.length?(a=typeof r=="function"?r:D(+r),l(),v):a},v.z=function(r){return arguments.length?(n=typeof r=="function"?r:D(+r),l(),v):n},v}export{dn as a,Mn as b,xn as c,zn as d,wn as e,An as f,Dn as g,pn as h,qn as i};
