function g(n,i){return n==null||i==null?NaN:n<i?-1:n>i?1:n>=i?0:NaN}function w(n,i){return n==null||i==null?NaN:i<n?-1:i>n?1:i>=n?0:NaN}function m(n){let i,f,t;n.length!==2?(i=g,f=(c,r)=>g(n(c),r),t=(c,r)=>n(c)-r):(i=n===g||n===w?n:k,f=n,t=n);function u(c,r,e=0,l=c.length){if(e<l){if(i(r,r)!==0)return l;do{const h=e+l>>>1;f(c[h],r)<0?e=h+1:l=h}while(e<l)}return e}function M(c,r,e=0,l=c.length){if(e<l){if(i(r,r)!==0)return l;do{const h=e+l>>>1;f(c[h],r)<=0?e=h+1:l=h}while(e<l)}return e}function d(c,r,e=0,l=c.length){const h=u(c,r,e,l-1);return h>e&&t(c[h-1],r)>-t(c[h],r)?h-1:h}return{left:u,center:d,right:M}}function k(){return 0}function a(n){return n===null?NaN:+n}const q=m(g),y=q.right;m(a).center;const s=Math.sqrt(50),v=Math.sqrt(10),S=Math.sqrt(2);function N(n,i,f){const t=(i-n)/Math.max(0,f),u=Math.floor(Math.log10(t)),M=t/Math.pow(10,u),d=M>=s?10:M>=v?5:M>=S?2:1;let c,r,e;return u<0?(e=Math.pow(10,-u)/d,c=Math.round(n*e),r=Math.round(i*e),c/e<n&&++c,r/e>i&&--r,e=-e):(e=Math.pow(10,u)*d,c=Math.round(n/e),r=Math.round(i/e),c*e<n&&++c,r*e>i&&--r),r<c&&.5<=f&&f<2?N(n,i,f*2):[c,r,e]}function z(n,i,f){if(i=+i,n=+n,f=+f,!(f>0))return[];if(n===i)return[n];const t=i<n,[u,M,d]=t?N(i,n,f):N(n,i,f);if(!(M>=u))return[];const c=M-u+1,r=new Array(c);if(t)if(d<0)for(let e=0;e<c;++e)r[e]=(M-e)/-d;else for(let e=0;e<c;++e)r[e]=(M-e)*d;else if(d<0)for(let e=0;e<c;++e)r[e]=(u+e)/-d;else for(let e=0;e<c;++e)r[e]=(u+e)*d;return r}function o(n,i,f){return i=+i,n=+n,f=+f,N(n,i,f)[2]}function A(n,i,f){i=+i,n=+n,f=+f;const t=i<n,u=t?o(i,n,f):o(n,i,f);return(t?-1:1)*(u<0?1/-u:u)}export{z as a,y as b,o as c,A as t};
