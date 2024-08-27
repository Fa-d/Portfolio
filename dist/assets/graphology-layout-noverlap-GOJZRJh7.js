import{g as sr}from"./@react-three-DY1ZwaEh.js";import{i as yr}from"./graphology-utils-BVTRd0vf.js";var E=0,L=1,C=2,S=3;function hr(e,a){return e+"§"+a}function vr(){return .01*(.5-Math.random())}var cr=function(a,r){var o=a.margin,i=a.ratio,u=a.expansion,t=a.gridSize,b=a.speed,n,y,p,m,k,f,W=!0,A=r.length,X=A/S|0,F=new Float32Array(X),_=new Float32Array(X),l=1/0,s=1/0,c=-1/0,g=-1/0;for(n=0;n<A;n+=S)p=r[n+E],m=r[n+L],f=r[n+C]*i+o,l=Math.min(l,p-f),c=Math.max(c,p+f),s=Math.min(s,m-f),g=Math.max(g,m+f);var P=c-l,$=g-s,Y=(l+c)/2,q=(s+g)/2;l=Y-u*P/2,c=Y+u*P/2,s=q-u*$/2,g=q+u*$/2;var I=new Array(t*t),j=I.length,h;for(h=0;h<j;h++)I[h]=[];var Z,H,J,K,Q,V,N,rr,z,R;for(n=0;n<A;n+=S)for(p=r[n+E],m=r[n+L],f=r[n+C]*i+o,Z=p-f,H=p+f,J=m-f,K=m+f,Q=Math.floor(t*(Z-l)/(c-l)),V=Math.floor(t*(H-l)/(c-l)),N=Math.floor(t*(J-s)/(g-s)),rr=Math.floor(t*(K-s)/(g-s)),z=Q;z<=V;z++)for(R=N;R<=rr;R++)I[z*t+R].push(n);var D,er=new Set,x,v,nr,ar,or,ir,T,tr,G,U,B,w,ur;for(h=0;h<j;h++)for(D=I[h],n=0,k=D.length;n<k;n++)for(x=D[n],nr=r[x+E],or=r[x+L],T=r[x+C],y=n+1;y<k;y++)v=D[y],G=hr(x,v),!(j>1&&er.has(G))&&(j>1&&er.add(G),ar=r[v+E],ir=r[v+L],tr=r[v+C],U=ar-nr,B=ir-or,w=Math.sqrt(U*U+B*B),ur=w<T*i+o+(tr*i+o),ur&&(W=!1,v=v/S|0,w>0?(F[v]+=U/w*(1+T),_[v]+=B/w*(1+T)):(F[v]+=P*vr(),_[v]+=$*vr())));for(n=0,y=0;n<A;n+=S,y++)r[n+E]+=F[y]*.1*b,r[n+L]+=_[y]*.1*b;return{converged:W}},d={},O=3;d.validateSettings=function(e){return"gridSize"in e&&typeof e.gridSize!="number"||e.gridSize<=0?{message:"the `gridSize` setting should be a positive number."}:"margin"in e&&typeof e.margin!="number"||e.margin<0?{message:"the `margin` setting should be 0 or a positive number."}:"expansion"in e&&typeof e.expansion!="number"||e.expansion<=0?{message:"the `expansion` setting should be a positive number."}:"ratio"in e&&typeof e.ratio!="number"||e.ratio<=0?{message:"the `ratio` setting should be a positive number."}:"speed"in e&&typeof e.speed!="number"||e.speed<=0?{message:"the `speed` setting should be a positive number."}:null};d.graphToByteArray=function(e,a){var r=e.order,o=new Float32Array(r*O),i=0;return e.forEachNode(function(u,t){typeof a=="function"&&(t=a(u,t)),o[i]=t.x,o[i+1]=t.y,o[i+2]=t.size||1,i+=O}),o};d.assignLayoutChanges=function(e,a,r){var o=0;e.forEachNode(function(i){var u={x:a[o],y:a[o+1]};typeof r=="function"&&(u=r(i,u)),e.mergeNodeAttributes(i,u),o+=O})};d.collectLayoutChanges=function(e,a,r){var o={},i=0;return e.forEachNode(function(u){var t={x:a[i],y:a[i+1]};typeof r=="function"&&(t=r(u,t)),o[u]=t,i+=O}),o};d.createWorker=function(a){var r=window.URL||window.webkitURL,o=a.toString(),i=r.createObjectURL(new Blob(["("+o+").call(this);"],{type:"text/javascript"})),u=new Worker(i);return r.revokeObjectURL(i),u};var gr={gridSize:20,margin:5,expansion:1.1,ratio:1,speed:3},pr=yr,mr=cr,M=d,dr=gr,br=500;function fr(e,a,r){if(!pr(a))throw new Error("graphology-layout-noverlap: the given graph is not a valid graphology instance.");typeof r=="number"?r={maxIterations:r}:r=r||{};var o=r.maxIterations||br;if(typeof o!="number"||o<=0)throw new Error("graphology-layout-force: you should provide a positive number of maximum iterations.");var i=Object.assign({},dr,r.settings),u=M.validateSettings(i);if(u)throw new Error("graphology-layout-noverlap: "+u.message);var t=M.graphToByteArray(a,r.inputReducer),b=!1,n;for(n=0;n<o&&!b;n++)b=mr(i,t).converged;if(e){M.assignLayoutChanges(a,t,r.outputReducer);return}return M.collectLayoutChanges(a,t,r.outputReducer)}var lr=fr.bind(null,!1);lr.assign=fr.bind(null,!0);var xr=lr;const Lr=sr(xr);export{Lr as n};
