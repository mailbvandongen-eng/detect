import{B as M,L as w,W as D,e as h,n as H,u as P,U as o,P as W,A as C,C as G,N as T,g as F,c as p,X as L}from"./index-DzFNrVnv.js";function A(t,e){const a=`
    attribute vec2 ${C.TEXTURE_COORD};
    uniform mat4 ${o.TILE_TRANSFORM};
    uniform float ${o.TEXTURE_PIXEL_WIDTH};
    uniform float ${o.TEXTURE_PIXEL_HEIGHT};
    uniform float ${o.TEXTURE_RESOLUTION};
    uniform float ${o.TEXTURE_ORIGIN_X};
    uniform float ${o.TEXTURE_ORIGIN_Y};
    uniform float ${o.DEPTH};

    varying vec2 v_textureCoord;
    varying vec2 v_mapCoord;

    void main() {
      v_textureCoord = ${C.TEXTURE_COORD};
      v_mapCoord = vec2(
        ${o.TEXTURE_ORIGIN_X} + ${o.TEXTURE_RESOLUTION} * ${o.TEXTURE_PIXEL_WIDTH} * v_textureCoord[0],
        ${o.TEXTURE_ORIGIN_Y} - ${o.TEXTURE_RESOLUTION} * ${o.TEXTURE_PIXEL_HEIGHT} * v_textureCoord[1]
      );
      gl_Position = ${o.TILE_TRANSFORM} * vec4(${C.TEXTURE_COORD}, ${o.DEPTH}, 1.0);
    }
  `,n={...H(),bandCount:e},l=[];if(t.color!==void 0){const r=h(n,t.color,G);l.push(`color = ${r};`)}if(t.contrast!==void 0){const r=h(n,t.contrast,T);l.push(`color.rgb = clamp((${r} + 1.0) * color.rgb - (${r} / 2.0), vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));`)}if(t.exposure!==void 0){const r=h(n,t.exposure,T);l.push(`color.rgb = clamp((${r} + 1.0) * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));`)}if(t.saturation!==void 0){const r=h(n,t.saturation,T);l.push(`
      float saturation = ${r} + 1.0;
      float sr = (1.0 - saturation) * 0.2126;
      float sg = (1.0 - saturation) * 0.7152;
      float sb = (1.0 - saturation) * 0.0722;
      mat3 saturationMatrix = mat3(
        sr + saturation, sr, sr,
        sg, sg + saturation, sg,
        sb, sb, sb + saturation
      );
      color.rgb = clamp(saturationMatrix * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));
    `)}if(t.gamma!==void 0){const r=h(n,t.gamma,T);l.push(`color.rgb = pow(color.rgb, vec3(1.0 / ${r}));`)}if(t.brightness!==void 0){const r=h(n,t.brightness,T);l.push(`color.rgb = clamp(color.rgb + ${r}, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));`)}const s={},c=Object.keys(n.variables).length;if(c>1&&!t.variables)throw new Error(`Missing variables in style (expected ${n.variables})`);for(let r=0;r<c;++r){const E=n.variables[Object.keys(n.variables)[r]];if(!(E.name in t.variables))throw new Error(`Missing '${E.name}' in style variables`);const b=P(E.name);s[b]=function(){let m=t.variables[E.name];return typeof m=="string"&&(m=F(m)),m!==void 0?m:-9999999}}const i=Object.keys(s).map(function(r){return`uniform float ${r};`}),u=Math.ceil(e/4);i.push(`uniform sampler2D ${o.TILE_TEXTURE_ARRAY}[${u}];`),n.paletteTextures&&i.push(`uniform sampler2D ${W}[${n.paletteTextures.length}];`);const d=Object.keys(n.functions).map(function(r){return n.functions[r]}),v=`
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec2 v_textureCoord;
    varying vec2 v_mapCoord;
    uniform vec4 ${o.RENDER_EXTENT};
    uniform float ${o.TRANSITION_ALPHA};
    uniform float ${o.TEXTURE_PIXEL_WIDTH};
    uniform float ${o.TEXTURE_PIXEL_HEIGHT};
    uniform float ${o.RESOLUTION};
    uniform float ${o.ZOOM};

    ${i.join(`
`)}

    ${d.join(`
`)}

    void main() {
      if (
        v_mapCoord[0] < ${o.RENDER_EXTENT}[0] ||
        v_mapCoord[1] < ${o.RENDER_EXTENT}[1] ||
        v_mapCoord[0] > ${o.RENDER_EXTENT}[2] ||
        v_mapCoord[1] > ${o.RENDER_EXTENT}[3]
      ) {
        discard;
      }

      vec4 color = texture2D(${o.TILE_TEXTURE_ARRAY}[0],  v_textureCoord);

      ${l.join(`
`)}

      gl_FragColor = color;
      gl_FragColor.rgb *= gl_FragColor.a;
      gl_FragColor *= ${o.TRANSITION_ALPHA};
    }`;return{vertexShader:a,fragmentShader:v,uniforms:s,paletteTextures:n.paletteTextures}}class x extends M{constructor(e){e=e?Object.assign({},e):{};const a=e.style||{};delete e.style,super(e),this.sources_=e.sources,this.renderedSource_=null,this.renderedResolution_=NaN,this.style_=a,this.styleVariables_=this.style_.variables||{},this.handleSourceUpdate_(),this.addChangeListener(w.SOURCE,this.handleSourceUpdate_)}getSources(e,a){const n=this.getSource();return this.sources_?typeof this.sources_=="function"?this.sources_(e,a):this.sources_:n?[n]:[]}getRenderSource(){return this.renderedSource_||this.getSource()}getSourceState(){const e=this.getRenderSource();return e?e.getState():"undefined"}handleSourceUpdate_(){this.hasRenderer()&&this.getRenderer().clearCache();const e=this.getSource();if(e)if(e.getState()==="loading"){const a=()=>{e.getState()==="ready"&&(e.removeEventListener("change",a),this.setStyle(this.style_))};e.addEventListener("change",a)}else this.setStyle(this.style_)}getSourceBandCount_(){const e=Number.MAX_SAFE_INTEGER,a=this.getSources([-e,-e,e,e],e);return a&&a.length&&"bandCount"in a[0]?a[0].bandCount:4}createRenderer(){const e=A(this.style_,this.getSourceBandCount_());return new D(this,{vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,uniforms:e.uniforms,cacheSize:this.getCacheSize(),paletteTextures:e.paletteTextures})}renderSources(e,a){const n=this.getRenderer();let l;for(let s=0,c=a.length;s<c;++s)this.renderedSource_=a[s],n.prepareFrame(e)&&(l=n.renderFrame(e));return l}render(e,a){this.rendered=!0;const n=e.viewState,l=this.getSources(e.extent,n.resolution);let s=!0;for(let i=0,u=l.length;i<u;++i){const d=l[i],v=d.getState();if(v=="loading"){const r=()=>{d.getState()=="ready"&&(d.removeEventListener("change",r),this.changed())};d.addEventListener("change",r)}s=s&&v=="ready"}const c=this.renderSources(e,l);if(this.getRenderer().renderComplete&&s)return this.renderedResolution_=n.resolution,c;if(this.renderedResolution_>.5*n.resolution){const i=this.getSources(e.extent,this.renderedResolution_).filter(u=>!l.includes(u));if(i.length>0)return this.renderSources(e,i)}return c}setStyle(e){if(this.styleVariables_=e.variables||{},this.style_=e,this.hasRenderer()){const a=A(this.style_,this.getSourceBandCount_());this.getRenderer().reset({vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,uniforms:a.uniforms,paletteTextures:a.paletteTextures}),this.changed()}}updateStyleVariables(e){Object.assign(this.styleVariables_,e),this.changed()}}x.prototype.dispose;const N="https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";function U(){return["-",["+",["*",["band",1],256],["band",2],["/",["band",3],256]],32768]}function X(t,e,a){const s=["clamp",["/",["-",U(),e],["-",a,e]],0,1];switch(t){case"terrain":return["interpolate",["linear"],s,0,[68,1,84,255],.1,[59,82,139,255],.25,[33,145,140,255],.4,[94,201,98,255],.55,[189,223,38,255],.7,[253,231,37,255],.85,[254,173,84,255],1,[189,99,38,255]];case"viridis":return["interpolate",["linear"],s,0,[68,1,84,255],.25,[59,82,139,255],.5,[33,145,140,255],.75,[94,201,98,255],1,[253,231,37,255]];case"magma":return["interpolate",["linear"],s,0,[0,0,4,255],.25,[81,18,124,255],.5,[183,55,121,255],.75,[252,136,97,255],1,[252,253,191,255]];case"spectral":return["interpolate",["linear"],s,0,[94,79,162,255],.2,[50,136,189,255],.4,[102,194,165,255],.5,[254,224,139,255],.6,[253,174,97,255],.8,[244,109,67,255],1,[158,1,66,255]];case"grayscale":default:return["interpolate",["linear"],s,0,[0,0,0,255],1,[255,255,255,255]]}}function k(){const t=p.getState(),e={sunAzimuth:t.sunAzimuth,sunElevation:t.sunElevation,verticalExaggeration:t.verticalExaggeration},a=["-",["+",["*",["band",1,-1,-1],256],["band",2,-1,-1],["/",["band",3,-1,-1],256]],32768],n=["-",["+",["*",["band",1,0,-1],256],["band",2,0,-1],["/",["band",3,0,-1],256]],32768],l=["-",["+",["*",["band",1,1,-1],256],["band",2,1,-1],["/",["band",3,1,-1],256]],32768],s=["-",["+",["*",["band",1,-1,0],256],["band",2,-1,0],["/",["band",3,-1,0],256]],32768],c=["-",["+",["*",["band",1,1,0],256],["band",2,1,0],["/",["band",3,1,0],256]],32768],i=["-",["+",["*",["band",1,-1,1],256],["band",2,-1,1],["/",["band",3,-1,1],256]],32768],u=["-",["+",["*",["band",1,0,1],256],["band",2,0,1],["/",["band",3,0,1],256]],32768],d=["-",["+",["*",["band",1,1,1],256],["band",2,1,1],["/",["band",3,1,1],256]],32768],v=["*",["var","verticalExaggeration"],["/",["-",["+",l,["*",2,c],d],["+",a,["*",2,s],i]],8]],r=["*",["var","verticalExaggeration"],["/",["-",["+",i,["*",2,u],d],["+",a,["*",2,n],l]],8]],E=["atan",["^",["+",["^",v,2],["^",r,2]],.5]],b=["atan",v,r],m=["*",["var","sunAzimuth"],Math.PI/180],y=["*",["var","sunElevation"],Math.PI/180],_=["-",Math.PI/2,y],R=["*",255,["clamp",["+",["*",["cos",_],["cos",E]],["*",["*",["sin",_],["sin",E]],["cos",["-",m,b]]]],0,1]],g=new x({properties:{title:"Hillshade (WebGL)",type:"webgl",isDynamic:!0},visible:!1,opacity:.7,source:new L({url:N,crossOrigin:"anonymous",maxZoom:15,attributions:"© Mapzen, AWS Terrain Tiles"}),style:{variables:e,color:["color",R,R,R,255]}});return p.subscribe(S=>{g.updateStyleVariables({sunAzimuth:S.sunAzimuth,sunElevation:S.sunElevation,verticalExaggeration:S.verticalExaggeration})}),g}function Y(){const t=p.getState(),e={minElevation:t.minElevation,maxElevation:t.maxElevation};let a=X(t.colorRamp,t.minElevation,t.maxElevation);const n=new x({properties:{title:"Hoogtekaart Kleur (WebGL)",type:"webgl",isDynamic:!0},visible:!1,opacity:.8,source:new L({url:N,crossOrigin:"anonymous",maxZoom:15,attributions:"© Mapzen, AWS Terrain Tiles"}),style:{variables:e,color:a}});let l=t.colorRamp,s=t.minElevation,c=t.maxElevation;return p.subscribe(i=>{if(i.colorRamp!==l||i.minElevation!==s||i.maxElevation!==c){l=i.colorRamp,s=i.minElevation,c=i.maxElevation;const u=X(i.colorRamp,i.minElevation,i.maxElevation);n.setStyle({variables:{minElevation:i.minElevation,maxElevation:i.maxElevation},color:u})}}),n}function B(){const t=p.getState(),e={sunAzimuth:t.sunAzimuth,sunElevation:t.sunElevation,verticalExaggeration:t.verticalExaggeration,minElevation:t.minElevation,maxElevation:t.maxElevation},a=U(),n=["-",["+",["*",["band",1,-1,-1],256],["band",2,-1,-1],["/",["band",3,-1,-1],256]],32768],l=["-",["+",["*",["band",1,0,-1],256],["band",2,0,-1],["/",["band",3,0,-1],256]],32768],s=["-",["+",["*",["band",1,1,-1],256],["band",2,1,-1],["/",["band",3,1,-1],256]],32768],c=["-",["+",["*",["band",1,-1,0],256],["band",2,-1,0],["/",["band",3,-1,0],256]],32768],i=["-",["+",["*",["band",1,1,0],256],["band",2,1,0],["/",["band",3,1,0],256]],32768],u=["-",["+",["*",["band",1,-1,1],256],["band",2,-1,1],["/",["band",3,-1,1],256]],32768],d=["-",["+",["*",["band",1,0,1],256],["band",2,0,1],["/",["band",3,0,1],256]],32768],v=["-",["+",["*",["band",1,1,1],256],["band",2,1,1],["/",["band",3,1,1],256]],32768],r=["*",["var","verticalExaggeration"],["/",["-",["+",s,["*",2,i],v],["+",n,["*",2,c],u]],8]],E=["*",["var","verticalExaggeration"],["/",["-",["+",u,["*",2,d],v],["+",n,["*",2,l],s]],8]],b=["atan",["^",["+",["^",r,2],["^",E,2]],.5]],m=["atan",r,E],y=["*",["var","sunAzimuth"],Math.PI/180],_=["*",["var","sunElevation"],Math.PI/180],I=["-",Math.PI/2,_],g=["+",.5,["*",.5,["clamp",["+",["*",["cos",I],["cos",b]],["*",["*",["sin",I],["sin",b]],["cos",["-",y,m]]]],0,1]]],$=["interpolate",["linear"],["clamp",["/",["-",a,["var","minElevation"]],["-",["var","maxElevation"],["var","minElevation"]]],0,1],0,[68,1,84,255],.1,[59,82,139,255],.25,[33,145,140,255],.4,[94,201,98,255],.55,[189,223,38,255],.7,[253,231,37,255],.85,[254,173,84,255],1,[189,99,38,255]],z=["color",["*",["band",1,0,0,$],g],["*",["band",2,0,0,$],g],["*",["band",3,0,0,$],g],255],O=new x({properties:{title:"Reliëfkaart (WebGL)",type:"webgl",isDynamic:!0},visible:!1,opacity:.8,source:new L({url:N,crossOrigin:"anonymous",maxZoom:15,attributions:"© Mapzen, AWS Terrain Tiles"}),style:{variables:e,color:z}});return p.subscribe(f=>{O.updateStyleVariables({sunAzimuth:f.sunAzimuth,sunElevation:f.sunElevation,verticalExaggeration:f.verticalExaggeration,minElevation:f.minElevation,maxElevation:f.maxElevation})}),O}export{Y as createWebGLColorHeightLayerOL,B as createWebGLCombinedHillshadeLayerOL,k as createWebGLHillshadeLayerOL};
//# sourceMappingURL=ahnWebGLHillshade-DEgY1mhn.js.map
