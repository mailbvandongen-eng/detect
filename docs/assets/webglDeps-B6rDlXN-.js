import{o as b}from"./BufferObject-09rDw56i.js";import{m as _,s as g}from"./FramebufferObject-Bop-bUIR.js";import{s as c}from"./ProgramTemplate-BjtwZ5B4.js";import{e as F,a as O}from"./ProgramTemplate-BjtwZ5B4.js";import{dE as P}from"./index-DLChQcXc.js";import{h as A}from"./VertexArrayObject-Ci_GX5mM.js";import"./memoryEstimations-B-UOvRhj.js";import"./VertexAttributeLocations-BfZbt_DV.js";class d{constructor(e){this._rctx=e,this._store=new Map}dispose(){this._store.forEach(e=>e.dispose()),this._store.clear()}acquire(e,r,t,s){const n=e+r+JSON.stringify(Array.from(t.entries())),o=this._store.get(n);if(o!=null)return o.ref(),o;const i=new c(this._rctx,e,r,t,s);return i.ref(),this._store.set(n,i),i}get test(){}}function p(f){const{options:e,value:r}=f;return typeof e[r]=="number"}function x(f){let e="";for(const r in f){const t=f[r];if(typeof t=="boolean")t&&(e+=`#define ${r}
`);else if(typeof t=="number")e+=`#define ${r} ${t.toFixed()}
`;else if(typeof t=="object")if(p(t)){const{value:s,options:n,namespace:o}=t,i=o?`${o}_`:"";for(const a in n)e+=`#define ${i}${a} ${n[a].toFixed()}
`;e+=`#define ${r} ${i}${s}
`}else{const s=t.options;let n=0;for(const o in s)e+=`#define ${s[o]} ${(n++).toFixed()}
`;e+=`#define ${r} ${s[t.value]}
`}}return e}export{b as BufferObject,_ as FramebufferObject,c as Program,d as ProgramCache,g as Renderbuffer,F as ShaderCompiler,P as Texture,A as VertexArrayObject,O as createProgram,x as glslifyDefineMap};
//# sourceMappingURL=webglDeps-B6rDlXN-.js.map
