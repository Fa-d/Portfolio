import{g as y}from"./@react-three-DY1ZwaEh.js";function f(r){if(typeof r!="function")throw new Error("obliterator/iterator: expecting a function!");this.next=r}typeof Symbol<"u"&&(f.prototype[Symbol.iterator]=function(){return this});f.of=function(){var r=arguments,n=r.length,t=0;return new f(function(){return t>=n?{done:!0}:{done:!1,value:r[t++]}})};f.empty=function(){var r=new f(function(){return{done:!0}});return r};f.fromSequence=function(r){var n=0,t=r.length;return new f(function(){return n>=t?{done:!0}:{done:!1,value:r[n++]}})};f.is=function(r){return r instanceof f?!0:typeof r=="object"&&r!==null&&typeof r.next=="function"};var s=f;const B=y(s);var c={};c.ARRAY_BUFFER_SUPPORT=typeof ArrayBuffer<"u";c.SYMBOL_SUPPORT=typeof Symbol<"u";var p=c,h=p.ARRAY_BUFFER_SUPPORT,R=p.SYMBOL_SUPPORT,x=function(n,t){var e,i,o,u,a;if(!n)throw new Error("obliterator/forEach: invalid iterable.");if(typeof t!="function")throw new Error("obliterator/forEach: expecting a callback.");if(Array.isArray(n)||h&&ArrayBuffer.isView(n)||typeof n=="string"||n.toString()==="[object Arguments]"){for(o=0,u=n.length;o<u;o++)t(n[o],o);return}if(typeof n.forEach=="function"){n.forEach(t);return}if(R&&Symbol.iterator in n&&typeof n.next!="function"&&(n=n[Symbol.iterator]()),typeof n.next=="function"){for(e=n,o=0;a=e.next(),a.done!==!0;)t(a.value,o),o++;return}for(i in n)n.hasOwnProperty(i)&&t(n[i],i)},S=s,v=c,P=v.ARRAY_BUFFER_SUPPORT,w=v.SYMBOL_SUPPORT;function A(r){return typeof r=="string"||Array.isArray(r)||P&&ArrayBuffer.isView(r)?S.fromSequence(r):typeof r!="object"||r===null?null:w&&typeof r[Symbol.iterator]=="function"?r[Symbol.iterator]():typeof r.next=="function"?r:null}var l=function(n){var t=A(n);if(!t)throw new Error("obliterator: target is not iterable nor a valid iterator.");return t},d=l,m=function(n,t){for(var e=arguments.length>1?t:1/0,i=e!==1/0?new Array(e):[],o,u=0,a=d(n);;){if(u===e)return i;if(o=a.next(),o.done)return u!==t&&(i.length=u),i;i[u++]=o.value}};const F=y(m);var O=s,E=l,U=function(){var n=arguments,t=null,e=-1;return new O(function(){var o=null;do{if(t===null){if(e++,e>=n.length)return{done:!0};t=E(n[e])}if(o=t.next(),o.done===!0){t=null;continue}break}while(!0);return o})};const $=y(U);export{B as I,$ as c,x as f,s as i,F as t};
