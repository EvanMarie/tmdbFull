import{s as ne,f as E,a as q,g as B,h as L,r as O,c as D,d as h,j as R,i as P,x as C,F as Q,y as z,z as le,o as oe,u as U,l as A,m as G,n as ie,e as W,J as ce}from"../chunks/scheduler.c4785dc3.js";import{S as se,i as ae,b as S,d as w,m as N,g as V,t as g,c as F,a as _,e as I}from"../chunks/index.42f95a44.js";import{R as ue,L as fe,C as pe,M as me,e as X,a as _e,P as $e}from"../chunks/Modal.6c76a5fc.js";import{e as Y,s as de,t as ge,f as Z}from"../chunks/movies.87fb9d4d.js";import{p as x}from"../chunks/prioritizeimages.97612009.js";function ee(o,e,n){const r=o.slice();return r[12]=e[n],r}function he(o){let e,n,r;return{c(){e=E("p"),n=A("No search results to display. Search query: "),r=A(o[1])},l(t){e=B(t,"P",{});var s=L(e);n=G(s,"No search results to display. Search query: "),r=G(s,o[1]),s.forEach(h)},m(t,s){P(t,e,s),C(e,n),C(e,r)},p(t,s){s&2&&ie(r,t[1])},i:U,o:U,d(t){t&&h(e)}}}function be(o){let e,n,r,t;return e=new pe({props:{$$slots:{default:[ve]},$$scope:{ctx:o}}}),r=new me({props:{selectedItem:o[4],close:o[6]}}),{c(){S(e.$$.fragment),n=q(),S(r.$$.fragment)},l(s){w(e.$$.fragment,s),n=D(s),w(r.$$.fragment,s)},m(s,a){N(e,s,a),P(s,n,a),N(r,s,a),t=!0},p(s,a){const c={};a&32769&&(c.$$scope={dirty:a,ctx:s}),e.$set(c);const i={};a&16&&(i.selectedItem=s[4]),r.$set(i)},i(s){t||(_(e.$$.fragment,s),_(r.$$.fragment,s),t=!0)},o(s){g(e.$$.fragment,s),g(r.$$.fragment,s),t=!1},d(s){s&&h(n),I(e,s),I(r,s)}}}function te(o){let e,n;function r(){return o[11](o[12])}return e=new _e({props:{item:o[12]}}),e.$on("itemClick",r),{c(){S(e.$$.fragment)},l(t){w(e.$$.fragment,t)},m(t,s){N(e,t,s),n=!0},p(t,s){o=t;const a={};s&1&&(a.item=o[12]),e.$set(a)},i(t){n||(_(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){I(e,t)}}}function ve(o){let e,n,r=X(o[0].sort(x)),t=[];for(let a=0;a<r.length;a+=1)t[a]=te(ee(o,r,a));const s=a=>g(t[a],1,1,()=>{t[a]=null});return{c(){for(let a=0;a<t.length;a+=1)t[a].c();e=W()},l(a){for(let c=0;c<t.length;c+=1)t[c].l(a);e=W()},m(a,c){for(let i=0;i<t.length;i+=1)t[i]&&t[i].m(a,c);P(a,e,c),n=!0},p(a,c){if(c&33){r=X(a[0].sort(x));let i;for(i=0;i<r.length;i+=1){const M=ee(a,r,i);t[i]?(t[i].p(M,c),_(t[i],1)):(t[i]=te(M),t[i].c(),_(t[i],1),t[i].m(e.parentNode,e))}for(V(),i=r.length;i<t.length;i+=1)s(i);F()}},i(a){if(!n){for(let c=0;c<r.length;c+=1)_(t[c]);n=!0}},o(a){t=t.filter(Boolean);for(let c=0;c<t.length;c+=1)g(t[c]);n=!1},d(a){a&&h(e),ce(t,a)}}}function re(o){let e,n;return e=new fe({props:{onClick:o[8]}}),{c(){S(e.$$.fragment)},l(r){w(e.$$.fragment,r)},m(r,t){N(e,r,t),n=!0},p:U,i(r){n||(_(e.$$.fragment,r),n=!0)},o(r){g(e.$$.fragment,r),n=!1},d(r){I(e,r)}}}function ke(o){let e,n,r="Search Movies",t,s,a,c,i,M="go",T,$,m,b,y,u,d,j,H;const J=[be,he],v=[];function K(l,p){return l[0].length>0?0:1}$=K(o),m=v[$]=J[$](o);let f=o[2]<=o[3]&&re(o);return u=new ue({}),{c(){e=E("div"),n=E("p"),n.textContent=r,t=q(),s=E("div"),a=E("input"),c=q(),i=E("button"),i.textContent=M,T=q(),m.c(),b=q(),f&&f.c(),y=q(),S(u.$$.fragment),this.h()},l(l){e=B(l,"DIV",{class:!0});var p=L(e);n=B(p,"P",{"data-svelte-h":!0}),O(n)!=="svelte-6aj3dt"&&(n.textContent=r),t=D(p),s=B(p,"DIV",{class:!0});var k=L(s);a=B(k,"INPUT",{type:!0,placeholder:!0}),c=D(k),i=B(k,"BUTTON",{class:!0,"data-svelte-h":!0}),O(i)!=="svelte-1mltr76"&&(i.textContent=M),k.forEach(h),p.forEach(h),T=D(l),m.l(l),b=D(l),f&&f.l(l),y=D(l),w(u.$$.fragment,l),this.h()},h(){R(a,"type","text"),R(a,"placeholder","Search for a movie..."),R(i,"class","button-styles"),R(s,"class","input-and-button"),R(e,"class","page-header-container")},m(l,p){P(l,e,p),C(e,n),C(e,t),C(e,s),C(s,a),Q(a,o[1]),C(s,c),C(s,i),P(l,T,p),v[$].m(l,p),P(l,b,p),f&&f.m(l,p),P(l,y,p),N(u,l,p),d=!0,j||(H=[z(a,"input",o[10]),z(a,"keydown",o[7]),z(i,"click",o[9])],j=!0)},p(l,[p]){p&2&&a.value!==l[1]&&Q(a,l[1]);let k=$;$=K(l),$===k?v[$].p(l,p):(V(),g(v[k],1,1,()=>{v[k]=null}),F(),m=v[$],m?m.p(l,p):(m=v[$]=J[$](l),m.c()),_(m,1),m.m(b.parentNode,b)),l[2]<=l[3]?f?(f.p(l,p),p&12&&_(f,1)):(f=re(l),f.c(),_(f,1),f.m(y.parentNode,y)):f&&(V(),g(f,1,1,()=>{f=null}),F())},i(l){d||(_(m),_(f),_(u.$$.fragment,l),d=!0)},o(l){g(m),g(f),g(u.$$.fragment,l),d=!1},d(l){l&&(h(e),h(T),h(b),h(y)),v[$].d(l),f&&f.d(l),I(u,l),j=!1,le(H)}}}function Ce(o,e,n){let r=[],t="unicorn",s=1,a=1,c=null;const i=u=>{n(4,c=u)},M=()=>{n(4,c=null)};Y.subscribe(u=>{n(0,r=u)}),de.subscribe(u=>n(2,s=u)),ge.subscribe(u=>n(3,a=u));const T=u=>{u.key==="Enter"&&m()},$=()=>{Z(t,!0)};oe(()=>{console.log('Performing initial search for "unicorn"'),m()});const m=()=>{console.log("Handling search for:",t),n(0,r=[]),Z(t)};Y.subscribe(u=>{n(0,r=u.map(d=>({id:d.id,datatype:"movie",genre_ids:d.genre_ids,title:d.title,genre_ids:d.genre_ids,rating:d.vote_average,backdrop_path:d.poster_path,overview:d.overview,release_date:d.release_date})))});function b(){t=this.value,n(1,t)}return[r,t,s,a,c,i,M,T,$,m,b,u=>i(u)]}class Me extends se{constructor(e){super(),ae(this,e,Ce,ke,ne,{})}}function ye(o){let e,n;return e=new Me({}),{c(){S(e.$$.fragment)},l(r){w(e.$$.fragment,r)},m(r,t){N(e,r,t),n=!0},i(r){n||(_(e.$$.fragment,r),n=!0)},o(r){g(e.$$.fragment,r),n=!1},d(r){I(e,r)}}}function Pe(o){let e,n;return e=new $e({props:{$$slots:{default:[ye]},$$scope:{ctx:o}}}),{c(){S(e.$$.fragment)},l(r){w(e.$$.fragment,r)},m(r,t){N(e,r,t),n=!0},p(r,[t]){const s={};t&1&&(s.$$scope={dirty:t,ctx:r}),e.$set(s)},i(r){n||(_(e.$$.fragment,r),n=!0)},o(r){g(e.$$.fragment,r),n=!1},d(r){I(e,r)}}}class Ee extends se{constructor(e){super(),ae(this,e,null,Pe,ne,{})}}export{Ee as component};