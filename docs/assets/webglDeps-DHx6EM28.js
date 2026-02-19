import{o as b}from"./BufferObject-DVXavtQu.js";import{m as _,s as g}from"./FramebufferObject-D7Z7MIud.js";import{s as c}from"./ProgramTemplate-SH4l9I8q.js";import{e as F,a as O}from"./ProgramTemplate-SH4l9I8q.js";import{dE as P}from"./index-DTPXw7Ph.js";import{h as A}from"./VertexArrayObject-fJTXja2T.js";import"./memoryEstimations-z45zeuGR.js";import"./VertexAttributeLocations-BfZbt_DV.js";class d{constructor(e){this._rctx=e,this._store=new Map}dispose(){this._store.forEach(e=>e.dispose()),this._store.clear()}acquire(e,r,t,s){const n=e+r+JSON.stringify(Array.from(t.entries())),o=this._store.get(n);if(o!=null)return o.ref(),o;const i=new c(this._rctx,e,r,t,s);return i.ref(),this._store.set(n,i),i}get test(){}}function p(f){const{options:e,value:r}=f;return typeof e[r]=="number"}function x(f){let e="";for(const r in f){const t=f[r];if(typeof t=="boolean")t&&(e+=`#define ${r}
`);else if(typeof t=="number")e+=`#define ${r} ${t.toFixed()}
`;else if(typeof t=="object")if(p(t)){const{value:s,options:n,namespace:o}=t,i=o?`${o}_`:"";for(const a in n)e+=`#define ${i}${a} ${n[a].toFixed()}
`;e+=`#define ${r} ${i}${s}
`}else{const s=t.options;let n=0;for(const o in s)e+=`#define ${s[o]} ${(n++).toFixed()}
`;e+=`#define ${r} ${s[t.value]}
`}}return e}export{b as BufferObject,_ as FramebufferObject,c as Program,d as ProgramCache,g as Renderbuffer,F as ShaderCompiler,P as Texture,A as VertexArrayObject,O as createProgram,x as glslifyDefineMap};
//# sourceMappingURL=webglDeps-DHx6EM28.js.map
