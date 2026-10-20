const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./romeinseFortenOL-D3jXHh4E.js","./iconStyles-ByDaZCV1.js","./kastelenOL-DPN6Yf7v.js","./ruinesOL-CZhIO-y4.js","./hunebeddenOL-Dlfiokvr.js","./uikavArcheoPuntenOL-ewQL_xxp.js","./speeltuinenOL-CNOnaKkE.js","./fossielenOL-B46WuvCH.js","./fossielUtils-CxduSvha.js","./fossielenBelgieOL-D4I_WuYm.js","./fossielenDuitslandOL-C12e8f0p.js","./fossielenFrankrijkOL-BJAdogC5.js","./bunkersOL-DKbqkVTf.js","./grafheuvelsOL-BfoCTcmq.js","./slagveldenOL-vPmmTXho.js","./frankrijkMonumentenOL-Cs1-Hbru.js","./inrapSitesFROL-sy4-zUhY.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function hN(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var sA={exports:{}},Zy={},aA={exports:{}},ur={};var rD;function Ete(){if(rD)return ur;rD=1;var n=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),a=Symbol.for("react.context"),o=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),c=Symbol.for("react.memo"),u=Symbol.for("react.lazy"),f=Symbol.iterator;function p(Q){return Q===null||typeof Q!="object"?null:(Q=f&&Q[f]||Q["@@iterator"],typeof Q=="function"?Q:null)}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y=Object.assign,x={};function _(Q,O,ee){this.props=Q,this.context=O,this.refs=x,this.updater=ee||m}_.prototype.isReactComponent={},_.prototype.setState=function(Q,O){if(typeof Q!="object"&&typeof Q!="function"&&Q!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,Q,O,"setState")},_.prototype.forceUpdate=function(Q){this.updater.enqueueForceUpdate(this,Q,"forceUpdate")};function E(){}E.prototype=_.prototype;function S(Q,O,ee){this.props=Q,this.context=O,this.refs=x,this.updater=ee||m}var k=S.prototype=new E;k.constructor=S,y(k,_.prototype),k.isPureReactComponent=!0;var A=Array.isArray,P=Object.prototype.hasOwnProperty,z={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function T(Q,O,ee){var H,J={},ae=null,je=null;if(O!=null)for(H in O.ref!==void 0&&(je=O.ref),O.key!==void 0&&(ae=""+O.key),O)P.call(O,H)&&!I.hasOwnProperty(H)&&(J[H]=O[H]);var De=arguments.length-2;if(De===1)J.children=ee;else if(1<De){for(var xe=Array(De),ce=0;ce<De;ce++)xe[ce]=arguments[ce+2];J.children=xe}if(Q&&Q.defaultProps)for(H in De=Q.defaultProps,De)J[H]===void 0&&(J[H]=De[H]);return{$$typeof:n,type:Q,key:ae,ref:je,props:J,_owner:z.current}}function R(Q,O){return{$$typeof:n,type:Q.type,key:O,ref:Q.ref,props:Q.props,_owner:Q._owner}}function L(Q){return typeof Q=="object"&&Q!==null&&Q.$$typeof===n}function D(Q){var O={"=":"=0",":":"=2"};return"$"+Q.replace(/[=:]/g,function(ee){return O[ee]})}var V=/\/+/g;function j(Q,O){return typeof Q=="object"&&Q!==null&&Q.key!=null?D(""+Q.key):O.toString(36)}function oe(Q,O,ee,H,J){var ae=typeof Q;(ae==="undefined"||ae==="boolean")&&(Q=null);var je=!1;if(Q===null)je=!0;else switch(ae){case"string":case"number":je=!0;break;case"object":switch(Q.$$typeof){case n:case e:je=!0}}if(je)return je=Q,J=J(je),Q=H===""?"."+j(je,0):H,A(J)?(ee="",Q!=null&&(ee=Q.replace(V,"$&/")+"/"),oe(J,O,ee,"",function(ce){return ce})):J!=null&&(L(J)&&(J=R(J,ee+(!J.key||je&&je.key===J.key?"":(""+J.key).replace(V,"$&/")+"/")+Q)),O.push(J)),1;if(je=0,H=H===""?".":H+":",A(Q))for(var De=0;De<Q.length;De++){ae=Q[De];var xe=H+j(ae,De);je+=oe(ae,O,ee,xe,J)}else if(xe=p(Q),typeof xe=="function")for(Q=xe.call(Q),De=0;!(ae=Q.next()).done;)ae=ae.value,xe=H+j(ae,De++),je+=oe(ae,O,ee,xe,J);else if(ae==="object")throw O=String(Q),Error("Objects are not valid as a React child (found: "+(O==="[object Object]"?"object with keys {"+Object.keys(Q).join(", ")+"}":O)+"). If you meant to render a collection of children, use an array instead.");return je}function ye(Q,O,ee){if(Q==null)return Q;var H=[],J=0;return oe(Q,H,"","",function(ae){return O.call(ee,ae,J++)}),H}function ge(Q){if(Q._status===-1){var O=Q._result;O=O(),O.then(function(ee){(Q._status===0||Q._status===-1)&&(Q._status=1,Q._result=ee)},function(ee){(Q._status===0||Q._status===-1)&&(Q._status=2,Q._result=ee)}),Q._status===-1&&(Q._status=0,Q._result=O)}if(Q._status===1)return Q._result.default;throw Q._result}var de={current:null},he={transition:null},ie={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:he,ReactCurrentOwner:z};function ue(){throw Error("act(...) is not supported in production builds of React.")}return ur.Children={map:ye,forEach:function(Q,O,ee){ye(Q,function(){O.apply(this,arguments)},ee)},count:function(Q){var O=0;return ye(Q,function(){O++}),O},toArray:function(Q){return ye(Q,function(O){return O})||[]},only:function(Q){if(!L(Q))throw Error("React.Children.only expected to receive a single React element child.");return Q}},ur.Component=_,ur.Fragment=t,ur.Profiler=i,ur.PureComponent=S,ur.StrictMode=r,ur.Suspense=l,ur.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ie,ur.act=ue,ur.cloneElement=function(Q,O,ee){if(Q==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+Q+".");var H=y({},Q.props),J=Q.key,ae=Q.ref,je=Q._owner;if(O!=null){if(O.ref!==void 0&&(ae=O.ref,je=z.current),O.key!==void 0&&(J=""+O.key),Q.type&&Q.type.defaultProps)var De=Q.type.defaultProps;for(xe in O)P.call(O,xe)&&!I.hasOwnProperty(xe)&&(H[xe]=O[xe]===void 0&&De!==void 0?De[xe]:O[xe])}var xe=arguments.length-2;if(xe===1)H.children=ee;else if(1<xe){De=Array(xe);for(var ce=0;ce<xe;ce++)De[ce]=arguments[ce+2];H.children=De}return{$$typeof:n,type:Q.type,key:J,ref:ae,props:H,_owner:je}},ur.createContext=function(Q){return Q={$$typeof:a,_currentValue:Q,_currentValue2:Q,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},Q.Provider={$$typeof:s,_context:Q},Q.Consumer=Q},ur.createElement=T,ur.createFactory=function(Q){var O=T.bind(null,Q);return O.type=Q,O},ur.createRef=function(){return{current:null}},ur.forwardRef=function(Q){return{$$typeof:o,render:Q}},ur.isValidElement=L,ur.lazy=function(Q){return{$$typeof:u,_payload:{_status:-1,_result:Q},_init:ge}},ur.memo=function(Q,O){return{$$typeof:c,type:Q,compare:O===void 0?null:O}},ur.startTransition=function(Q){var O=he.transition;he.transition={};try{Q()}finally{he.transition=O}},ur.unstable_act=ue,ur.useCallback=function(Q,O){return de.current.useCallback(Q,O)},ur.useContext=function(Q){return de.current.useContext(Q)},ur.useDebugValue=function(){},ur.useDeferredValue=function(Q){return de.current.useDeferredValue(Q)},ur.useEffect=function(Q,O){return de.current.useEffect(Q,O)},ur.useId=function(){return de.current.useId()},ur.useImperativeHandle=function(Q,O,ee){return de.current.useImperativeHandle(Q,O,ee)},ur.useInsertionEffect=function(Q,O){return de.current.useInsertionEffect(Q,O)},ur.useLayoutEffect=function(Q,O){return de.current.useLayoutEffect(Q,O)},ur.useMemo=function(Q,O){return de.current.useMemo(Q,O)},ur.useReducer=function(Q,O,ee){return de.current.useReducer(Q,O,ee)},ur.useRef=function(Q){return de.current.useRef(Q)},ur.useState=function(Q){return de.current.useState(Q)},ur.useSyncExternalStore=function(Q,O,ee){return de.current.useSyncExternalStore(Q,O,ee)},ur.useTransition=function(){return de.current.useTransition()},ur.version="18.3.1",ur}var iD;function Gx(){return iD||(iD=1,aA.exports=Ete()),aA.exports}var sD;function Ste(){if(sD)return Zy;sD=1;var n=Gx(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function a(o,l,c){var u,f={},p=null,m=null;c!==void 0&&(p=""+c),l.key!==void 0&&(p=""+l.key),l.ref!==void 0&&(m=l.ref);for(u in l)r.call(l,u)&&!s.hasOwnProperty(u)&&(f[u]=l[u]);if(o&&o.defaultProps)for(u in l=o.defaultProps,l)f[u]===void 0&&(f[u]=l[u]);return{$$typeof:e,type:o,key:p,ref:m,props:f,_owner:i.current}}return Zy.Fragment=t,Zy.jsx=a,Zy.jsxs=a,Zy}var aD;function kte(){return aD||(aD=1,sA.exports=Ste()),sA.exports}var h=kte(),eb={},oA={exports:{}},eo={},lA={exports:{}},cA={};var oD;function Tte(){return oD||(oD=1,(function(n){function e(he,ie){var ue=he.length;he.push(ie);e:for(;0<ue;){var Q=ue-1>>>1,O=he[Q];if(0<i(O,ie))he[Q]=ie,he[ue]=O,ue=Q;else break e}}function t(he){return he.length===0?null:he[0]}function r(he){if(he.length===0)return null;var ie=he[0],ue=he.pop();if(ue!==ie){he[0]=ue;e:for(var Q=0,O=he.length,ee=O>>>1;Q<ee;){var H=2*(Q+1)-1,J=he[H],ae=H+1,je=he[ae];if(0>i(J,ue))ae<O&&0>i(je,J)?(he[Q]=je,he[ae]=ue,Q=ae):(he[Q]=J,he[H]=ue,Q=H);else if(ae<O&&0>i(je,ue))he[Q]=je,he[ae]=ue,Q=ae;else break e}}return ie}function i(he,ie){var ue=he.sortIndex-ie.sortIndex;return ue!==0?ue:he.id-ie.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();n.unstable_now=function(){return a.now()-o}}var l=[],c=[],u=1,f=null,p=3,m=!1,y=!1,x=!1,_=typeof setTimeout=="function"?setTimeout:null,E=typeof clearTimeout=="function"?clearTimeout:null,S=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k(he){for(var ie=t(c);ie!==null;){if(ie.callback===null)r(c);else if(ie.startTime<=he)r(c),ie.sortIndex=ie.expirationTime,e(l,ie);else break;ie=t(c)}}function A(he){if(x=!1,k(he),!y)if(t(l)!==null)y=!0,ge(P);else{var ie=t(c);ie!==null&&de(A,ie.startTime-he)}}function P(he,ie){y=!1,x&&(x=!1,E(T),T=-1),m=!0;var ue=p;try{for(k(ie),f=t(l);f!==null&&(!(f.expirationTime>ie)||he&&!D());){var Q=f.callback;if(typeof Q=="function"){f.callback=null,p=f.priorityLevel;var O=Q(f.expirationTime<=ie);ie=n.unstable_now(),typeof O=="function"?f.callback=O:f===t(l)&&r(l),k(ie)}else r(l);f=t(l)}if(f!==null)var ee=!0;else{var H=t(c);H!==null&&de(A,H.startTime-ie),ee=!1}return ee}finally{f=null,p=ue,m=!1}}var z=!1,I=null,T=-1,R=5,L=-1;function D(){return!(n.unstable_now()-L<R)}function V(){if(I!==null){var he=n.unstable_now();L=he;var ie=!0;try{ie=I(!0,he)}finally{ie?j():(z=!1,I=null)}}else z=!1}var j;if(typeof S=="function")j=function(){S(V)};else if(typeof MessageChannel<"u"){var oe=new MessageChannel,ye=oe.port2;oe.port1.onmessage=V,j=function(){ye.postMessage(null)}}else j=function(){_(V,0)};function ge(he){I=he,z||(z=!0,j())}function de(he,ie){T=_(function(){he(n.unstable_now())},ie)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(he){he.callback=null},n.unstable_continueExecution=function(){y||m||(y=!0,ge(P))},n.unstable_forceFrameRate=function(he){0>he||125<he?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<he?Math.floor(1e3/he):5},n.unstable_getCurrentPriorityLevel=function(){return p},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(he){switch(p){case 1:case 2:case 3:var ie=3;break;default:ie=p}var ue=p;p=ie;try{return he()}finally{p=ue}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(he,ie){switch(he){case 1:case 2:case 3:case 4:case 5:break;default:he=3}var ue=p;p=he;try{return ie()}finally{p=ue}},n.unstable_scheduleCallback=function(he,ie,ue){var Q=n.unstable_now();switch(typeof ue=="object"&&ue!==null?(ue=ue.delay,ue=typeof ue=="number"&&0<ue?Q+ue:Q):ue=Q,he){case 1:var O=-1;break;case 2:O=250;break;case 5:O=1073741823;break;case 4:O=1e4;break;default:O=5e3}return O=ue+O,he={id:u++,callback:ie,priorityLevel:he,startTime:ue,expirationTime:O,sortIndex:-1},ue>Q?(he.sortIndex=ue,e(c,he),t(l)===null&&he===t(c)&&(x?(E(T),T=-1):x=!0,de(A,ue-Q))):(he.sortIndex=O,e(l,he),y||m||(y=!0,ge(P))),he},n.unstable_shouldYield=D,n.unstable_wrapCallback=function(he){var ie=p;return function(){var ue=p;p=ie;try{return he.apply(this,arguments)}finally{p=ue}}}})(cA)),cA}var lD;function Cte(){return lD||(lD=1,lA.exports=Tte()),lA.exports}var cD;function Ate(){if(cD)return eo;cD=1;var n=Gx(),e=Cte();function t(d){for(var g="https://reactjs.org/docs/error-decoder.html?invariant="+d,v=1;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v]);return"Minified React error #"+d+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,i={};function s(d,g){a(d,g),a(d+"Capture",g)}function a(d,g){for(i[d]=g,d=0;d<g.length;d++)r.add(g[d])}var o=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),l=Object.prototype.hasOwnProperty,c=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,u={},f={};function p(d){return l.call(f,d)?!0:l.call(u,d)?!1:c.test(d)?f[d]=!0:(u[d]=!0,!1)}function m(d,g,v,b){if(v!==null&&v.type===0)return!1;switch(typeof g){case"function":case"symbol":return!0;case"boolean":return b?!1:v!==null?!v.acceptsBooleans:(d=d.toLowerCase().slice(0,5),d!=="data-"&&d!=="aria-");default:return!1}}function y(d,g,v,b){if(g===null||typeof g>"u"||m(d,g,v,b))return!0;if(b)return!1;if(v!==null)switch(v.type){case 3:return!g;case 4:return g===!1;case 5:return isNaN(g);case 6:return isNaN(g)||1>g}return!1}function x(d,g,v,b,C,N,W){this.acceptsBooleans=g===2||g===3||g===4,this.attributeName=b,this.attributeNamespace=C,this.mustUseProperty=v,this.propertyName=d,this.type=g,this.sanitizeURL=N,this.removeEmptyString=W}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(d){_[d]=new x(d,0,!1,d,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(d){var g=d[0];_[g]=new x(g,1,!1,d[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(d){_[d]=new x(d,2,!1,d.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(d){_[d]=new x(d,2,!1,d,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(d){_[d]=new x(d,3,!1,d.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(d){_[d]=new x(d,3,!0,d,null,!1,!1)}),["capture","download"].forEach(function(d){_[d]=new x(d,4,!1,d,null,!1,!1)}),["cols","rows","size","span"].forEach(function(d){_[d]=new x(d,6,!1,d,null,!1,!1)}),["rowSpan","start"].forEach(function(d){_[d]=new x(d,5,!1,d.toLowerCase(),null,!1,!1)});var E=/[\-:]([a-z])/g;function S(d){return d[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(d){var g=d.replace(E,S);_[g]=new x(g,1,!1,d,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(d){var g=d.replace(E,S);_[g]=new x(g,1,!1,d,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(d){var g=d.replace(E,S);_[g]=new x(g,1,!1,d,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(d){_[d]=new x(d,1,!1,d.toLowerCase(),null,!1,!1)}),_.xlinkHref=new x("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(d){_[d]=new x(d,1,!1,d.toLowerCase(),null,!0,!0)});function k(d,g,v,b){var C=_.hasOwnProperty(g)?_[g]:null;(C!==null?C.type!==0:b||!(2<g.length)||g[0]!=="o"&&g[0]!=="O"||g[1]!=="n"&&g[1]!=="N")&&(y(g,v,C,b)&&(v=null),b||C===null?p(g)&&(v===null?d.removeAttribute(g):d.setAttribute(g,""+v)):C.mustUseProperty?d[C.propertyName]=v===null?C.type===3?!1:"":v:(g=C.attributeName,b=C.attributeNamespace,v===null?d.removeAttribute(g):(C=C.type,v=C===3||C===4&&v===!0?"":""+v,b?d.setAttributeNS(b,g,v):d.setAttribute(g,v))))}var A=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,P=Symbol.for("react.element"),z=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),L=Symbol.for("react.provider"),D=Symbol.for("react.context"),V=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),oe=Symbol.for("react.suspense_list"),ye=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),de=Symbol.for("react.offscreen"),he=Symbol.iterator;function ie(d){return d===null||typeof d!="object"?null:(d=he&&d[he]||d["@@iterator"],typeof d=="function"?d:null)}var ue=Object.assign,Q;function O(d){if(Q===void 0)try{throw Error()}catch(v){var g=v.stack.trim().match(/\n( *(at )?)/);Q=g&&g[1]||""}return`
`+Q+d}var ee=!1;function H(d,g){if(!d||ee)return"";ee=!0;var v=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(g)if(g=function(){throw Error()},Object.defineProperty(g.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(g,[])}catch(Oe){var b=Oe}Reflect.construct(d,[],g)}else{try{g.call()}catch(Oe){b=Oe}d.call(g.prototype)}else{try{throw Error()}catch(Oe){b=Oe}d()}}catch(Oe){if(Oe&&b&&typeof Oe.stack=="string"){for(var C=Oe.stack.split(`
`),N=b.stack.split(`
`),W=C.length-1,le=N.length-1;1<=W&&0<=le&&C[W]!==N[le];)le--;for(;1<=W&&0<=le;W--,le--)if(C[W]!==N[le]){if(W!==1||le!==1)do if(W--,le--,0>le||C[W]!==N[le]){var pe=`
`+C[W].replace(" at new "," at ");return d.displayName&&pe.includes("<anonymous>")&&(pe=pe.replace("<anonymous>",d.displayName)),pe}while(1<=W&&0<=le);break}}}finally{ee=!1,Error.prepareStackTrace=v}return(d=d?d.displayName||d.name:"")?O(d):""}function J(d){switch(d.tag){case 5:return O(d.type);case 16:return O("Lazy");case 13:return O("Suspense");case 19:return O("SuspenseList");case 0:case 2:case 15:return d=H(d.type,!1),d;case 11:return d=H(d.type.render,!1),d;case 1:return d=H(d.type,!0),d;default:return""}}function ae(d){if(d==null)return null;if(typeof d=="function")return d.displayName||d.name||null;if(typeof d=="string")return d;switch(d){case I:return"Fragment";case z:return"Portal";case R:return"Profiler";case T:return"StrictMode";case j:return"Suspense";case oe:return"SuspenseList"}if(typeof d=="object")switch(d.$$typeof){case D:return(d.displayName||"Context")+".Consumer";case L:return(d._context.displayName||"Context")+".Provider";case V:var g=d.render;return d=d.displayName,d||(d=g.displayName||g.name||"",d=d!==""?"ForwardRef("+d+")":"ForwardRef"),d;case ye:return g=d.displayName||null,g!==null?g:ae(d.type)||"Memo";case ge:g=d._payload,d=d._init;try{return ae(d(g))}catch{}}return null}function je(d){var g=d.type;switch(d.tag){case 24:return"Cache";case 9:return(g.displayName||"Context")+".Consumer";case 10:return(g._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return d=g.render,d=d.displayName||d.name||"",g.displayName||(d!==""?"ForwardRef("+d+")":"ForwardRef");case 7:return"Fragment";case 5:return g;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ae(g);case 8:return g===T?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof g=="function")return g.displayName||g.name||null;if(typeof g=="string")return g}return null}function De(d){switch(typeof d){case"boolean":case"number":case"string":case"undefined":return d;case"object":return d;default:return""}}function xe(d){var g=d.type;return(d=d.nodeName)&&d.toLowerCase()==="input"&&(g==="checkbox"||g==="radio")}function ce(d){var g=xe(d)?"checked":"value",v=Object.getOwnPropertyDescriptor(d.constructor.prototype,g),b=""+d[g];if(!d.hasOwnProperty(g)&&typeof v<"u"&&typeof v.get=="function"&&typeof v.set=="function"){var C=v.get,N=v.set;return Object.defineProperty(d,g,{configurable:!0,get:function(){return C.call(this)},set:function(W){b=""+W,N.call(this,W)}}),Object.defineProperty(d,g,{enumerable:v.enumerable}),{getValue:function(){return b},setValue:function(W){b=""+W},stopTracking:function(){d._valueTracker=null,delete d[g]}}}}function _t(d){d._valueTracker||(d._valueTracker=ce(d))}function Rt(d){if(!d)return!1;var g=d._valueTracker;if(!g)return!0;var v=g.getValue(),b="";return d&&(b=xe(d)?d.checked?"true":"false":d.value),d=b,d!==v?(g.setValue(d),!0):!1}function xt(d){if(d=d||(typeof document<"u"?document:void 0),typeof d>"u")return null;try{return d.activeElement||d.body}catch{return d.body}}function wt(d,g){var v=g.checked;return ue({},g,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:v??d._wrapperState.initialChecked})}function _n(d,g){var v=g.defaultValue==null?"":g.defaultValue,b=g.checked!=null?g.checked:g.defaultChecked;v=De(g.value!=null?g.value:v),d._wrapperState={initialChecked:b,initialValue:v,controlled:g.type==="checkbox"||g.type==="radio"?g.checked!=null:g.value!=null}}function Xe(d,g){g=g.checked,g!=null&&k(d,"checked",g,!1)}function Ze(d,g){Xe(d,g);var v=De(g.value),b=g.type;if(v!=null)b==="number"?(v===0&&d.value===""||d.value!=v)&&(d.value=""+v):d.value!==""+v&&(d.value=""+v);else if(b==="submit"||b==="reset"){d.removeAttribute("value");return}g.hasOwnProperty("value")?un(d,g.type,v):g.hasOwnProperty("defaultValue")&&un(d,g.type,De(g.defaultValue)),g.checked==null&&g.defaultChecked!=null&&(d.defaultChecked=!!g.defaultChecked)}function Qt(d,g,v){if(g.hasOwnProperty("value")||g.hasOwnProperty("defaultValue")){var b=g.type;if(!(b!=="submit"&&b!=="reset"||g.value!==void 0&&g.value!==null))return;g=""+d._wrapperState.initialValue,v||g===d.value||(d.value=g),d.defaultValue=g}v=d.name,v!==""&&(d.name=""),d.defaultChecked=!!d._wrapperState.initialChecked,v!==""&&(d.name=v)}function un(d,g,v){(g!=="number"||xt(d.ownerDocument)!==d)&&(v==null?d.defaultValue=""+d._wrapperState.initialValue:d.defaultValue!==""+v&&(d.defaultValue=""+v))}var pn=Array.isArray;function Pn(d,g,v,b){if(d=d.options,g){g={};for(var C=0;C<v.length;C++)g["$"+v[C]]=!0;for(v=0;v<d.length;v++)C=g.hasOwnProperty("$"+d[v].value),d[v].selected!==C&&(d[v].selected=C),C&&b&&(d[v].defaultSelected=!0)}else{for(v=""+De(v),g=null,C=0;C<d.length;C++){if(d[C].value===v){d[C].selected=!0,b&&(d[C].defaultSelected=!0);return}g!==null||d[C].disabled||(g=d[C])}g!==null&&(g.selected=!0)}}function Pr(d,g){if(g.dangerouslySetInnerHTML!=null)throw Error(t(91));return ue({},g,{value:void 0,defaultValue:void 0,children:""+d._wrapperState.initialValue})}function tt(d,g){var v=g.value;if(v==null){if(v=g.children,g=g.defaultValue,v!=null){if(g!=null)throw Error(t(92));if(pn(v)){if(1<v.length)throw Error(t(93));v=v[0]}g=v}g==null&&(g=""),v=g}d._wrapperState={initialValue:De(v)}}function fn(d,g){var v=De(g.value),b=De(g.defaultValue);v!=null&&(v=""+v,v!==d.value&&(d.value=v),g.defaultValue==null&&d.defaultValue!==v&&(d.defaultValue=v)),b!=null&&(d.defaultValue=""+b)}function rn(d){var g=d.textContent;g===d._wrapperState.initialValue&&g!==""&&g!==null&&(d.value=g)}function en(d){switch(d){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function dn(d,g){return d==null||d==="http://www.w3.org/1999/xhtml"?en(g):d==="http://www.w3.org/2000/svg"&&g==="foreignObject"?"http://www.w3.org/1999/xhtml":d}var vn,gn=(function(d){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(g,v,b,C){MSApp.execUnsafeLocalFunction(function(){return d(g,v,b,C)})}:d})(function(d,g){if(d.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in d)d.innerHTML=g;else{for(vn=vn||document.createElement("div"),vn.innerHTML="<svg>"+g.valueOf().toString()+"</svg>",g=vn.firstChild;d.firstChild;)d.removeChild(d.firstChild);for(;g.firstChild;)d.appendChild(g.firstChild)}});function $n(d,g){if(g){var v=d.firstChild;if(v&&v===d.lastChild&&v.nodeType===3){v.nodeValue=g;return}}d.textContent=g}var $t={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Wn=["Webkit","ms","Moz","O"];Object.keys($t).forEach(function(d){Wn.forEach(function(g){g=g+d.charAt(0).toUpperCase()+d.substring(1),$t[g]=$t[d]})});function nr(d,g,v){return g==null||typeof g=="boolean"||g===""?"":v||typeof g!="number"||g===0||$t.hasOwnProperty(d)&&$t[d]?(""+g).trim():g+"px"}function rr(d,g){d=d.style;for(var v in g)if(g.hasOwnProperty(v)){var b=v.indexOf("--")===0,C=nr(v,g[v],b);v==="float"&&(v="cssFloat"),b?d.setProperty(v,C):d[v]=C}}var xr=ue({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ar(d,g){if(g){if(xr[d]&&(g.children!=null||g.dangerouslySetInnerHTML!=null))throw Error(t(137,d));if(g.dangerouslySetInnerHTML!=null){if(g.children!=null)throw Error(t(60));if(typeof g.dangerouslySetInnerHTML!="object"||!("__html"in g.dangerouslySetInnerHTML))throw Error(t(61))}if(g.style!=null&&typeof g.style!="object")throw Error(t(62))}}function gr(d,g){if(d.indexOf("-")===-1)return typeof g.is=="string";switch(d){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nr=null;function kn(d){return d=d.target||d.srcElement||window,d.correspondingUseElement&&(d=d.correspondingUseElement),d.nodeType===3?d.parentNode:d}var Qn=null,wn=null,xn=null;function hi(d){if(d=Fy(d)){if(typeof Qn!="function")throw Error(t(280));var g=d.stateNode;g&&(g=pw(g),Qn(d.stateNode,d.type,g))}}function Bi(d){wn?xn?xn.push(d):xn=[d]:wn=d}function me(){if(wn){var d=wn,g=xn;if(xn=wn=null,hi(d),g)for(d=0;d<g.length;d++)hi(g[d])}}function Tn(d,g){return d(g)}function cr(){}var pr=!1;function ni(d,g,v){if(pr)return d(g,v);pr=!0;try{return Tn(d,g,v)}finally{pr=!1,(wn!==null||xn!==null)&&(cr(),me())}}function Mr(d,g){var v=d.stateNode;if(v===null)return null;var b=pw(v);if(b===null)return null;v=b[g];e:switch(g){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(b=!b.disabled)||(d=d.type,b=!(d==="button"||d==="input"||d==="select"||d==="textarea")),d=!b;break e;default:d=!1}if(d)return null;if(v&&typeof v!="function")throw Error(t(231,g,typeof v));return v}var Kr=!1;if(o)try{var Vn={};Object.defineProperty(Vn,"passive",{get:function(){Kr=!0}}),window.addEventListener("test",Vn,Vn),window.removeEventListener("test",Vn,Vn)}catch{Kr=!1}function $r(d,g,v,b,C,N,W,le,pe){var Oe=Array.prototype.slice.call(arguments,3);try{g.apply(v,Oe)}catch(ut){this.onError(ut)}}var fi=!1,Ne=null,U=!1,Z=null,K={onError:function(d){fi=!0,Ne=d}};function Y(d,g,v,b,C,N,W,le,pe){fi=!1,Ne=null,$r.apply(K,arguments)}function te(d,g,v,b,C,N,W,le,pe){if(Y.apply(this,arguments),fi){if(fi){var Oe=Ne;fi=!1,Ne=null}else throw Error(t(198));U||(U=!0,Z=Oe)}}function re(d){var g=d,v=d;if(d.alternate)for(;g.return;)g=g.return;else{d=g;do g=d,(g.flags&4098)!==0&&(v=g.return),d=g.return;while(d)}return g.tag===3?v:null}function Ee(d){if(d.tag===13){var g=d.memoizedState;if(g===null&&(d=d.alternate,d!==null&&(g=d.memoizedState)),g!==null)return g.dehydrated}return null}function Pe(d){if(re(d)!==d)throw Error(t(188))}function Se(d){var g=d.alternate;if(!g){if(g=re(d),g===null)throw Error(t(188));return g!==d?null:d}for(var v=d,b=g;;){var C=v.return;if(C===null)break;var N=C.alternate;if(N===null){if(b=C.return,b!==null){v=b;continue}break}if(C.child===N.child){for(N=C.child;N;){if(N===v)return Pe(C),d;if(N===b)return Pe(C),g;N=N.sibling}throw Error(t(188))}if(v.return!==b.return)v=C,b=N;else{for(var W=!1,le=C.child;le;){if(le===v){W=!0,v=C,b=N;break}if(le===b){W=!0,b=C,v=N;break}le=le.sibling}if(!W){for(le=N.child;le;){if(le===v){W=!0,v=N,b=C;break}if(le===b){W=!0,b=N,v=C;break}le=le.sibling}if(!W)throw Error(t(189))}}if(v.alternate!==b)throw Error(t(190))}if(v.tag!==3)throw Error(t(188));return v.stateNode.current===v?d:g}function ke(d){return d=Se(d),d!==null?fe(d):null}function fe(d){if(d.tag===5||d.tag===6)return d;for(d=d.child;d!==null;){var g=fe(d);if(g!==null)return g;d=d.sibling}return null}var $e=e.unstable_scheduleCallback,et=e.unstable_cancelCallback,gt=e.unstable_shouldYield,Je=e.unstable_requestPaint,Be=e.unstable_now,Nt=e.unstable_getCurrentPriorityLevel,Xn=e.unstable_ImmediatePriority,Mt=e.unstable_UserBlockingPriority,_r=e.unstable_NormalPriority,We=e.unstable_LowPriority,Me=e.unstable_IdlePriority,we=null,Ot=null;function Ct(d){if(Ot&&typeof Ot.onCommitFiberRoot=="function")try{Ot.onCommitFiberRoot(we,d,void 0,(d.current.flags&128)===128)}catch{}}var Ut=Math.clz32?Math.clz32:Ve,Fe=Math.log,se=Math.LN2;function Ve(d){return d>>>=0,d===0?32:31-(Fe(d)/se|0)|0}var be=64,nt=4194304;function qe(d){switch(d&-d){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return d&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return d&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return d}}function Ht(d,g){var v=d.pendingLanes;if(v===0)return 0;var b=0,C=d.suspendedLanes,N=d.pingedLanes,W=v&268435455;if(W!==0){var le=W&~C;le!==0?b=qe(le):(N&=W,N!==0&&(b=qe(N)))}else W=v&~C,W!==0?b=qe(W):N!==0&&(b=qe(N));if(b===0)return 0;if(g!==0&&g!==b&&(g&C)===0&&(C=b&-b,N=g&-g,C>=N||C===16&&(N&4194240)!==0))return g;if((b&4)!==0&&(b|=v&16),g=d.entangledLanes,g!==0)for(d=d.entanglements,g&=b;0<g;)v=31-Ut(g),C=1<<v,b|=d[v],g&=~C;return b}function Bt(d,g){switch(d){case 1:case 2:case 4:return g+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return g+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function F(d,g){for(var v=d.suspendedLanes,b=d.pingedLanes,C=d.expirationTimes,N=d.pendingLanes;0<N;){var W=31-Ut(N),le=1<<W,pe=C[W];pe===-1?((le&v)===0||(le&b)!==0)&&(C[W]=Bt(le,g)):pe<=g&&(d.expiredLanes|=le),N&=~le}}function zt(d){return d=d.pendingLanes&-1073741825,d!==0?d:d&1073741824?1073741824:0}function ne(){var d=be;return be<<=1,(be&4194240)===0&&(be=64),d}function Nn(d){for(var g=[],v=0;31>v;v++)g.push(d);return g}function or(d,g,v){d.pendingLanes|=g,g!==536870912&&(d.suspendedLanes=0,d.pingedLanes=0),d=d.eventTimes,g=31-Ut(g),d[g]=v}function gi(d,g){var v=d.pendingLanes&~g;d.pendingLanes=g,d.suspendedLanes=0,d.pingedLanes=0,d.expiredLanes&=g,d.mutableReadLanes&=g,d.entangledLanes&=g,g=d.entanglements;var b=d.eventTimes;for(d=d.expirationTimes;0<v;){var C=31-Ut(v),N=1<<C;g[C]=0,b[C]=-1,d[C]=-1,v&=~N}}function ze(d,g){var v=d.entangledLanes|=g;for(d=d.entanglements;v;){var b=31-Ut(v),C=1<<b;C&g|d[b]&g&&(d[b]|=g),v&=~C}}var He=0;function Pt(d){return d&=-d,1<d?4<d?(d&268435455)!==0?16:536870912:4:1}var tn,Ft,Mn,mr,Ri,Ye=!1,q=[],_e=null,Qe=null,st=null,qt=new Map,Ln=new Map,Cn=[],ii="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Yi(d,g){switch(d){case"focusin":case"focusout":_e=null;break;case"dragenter":case"dragleave":Qe=null;break;case"mouseover":case"mouseout":st=null;break;case"pointerover":case"pointerout":qt.delete(g.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ln.delete(g.pointerId)}}function pi(d,g,v,b,C,N){return d===null||d.nativeEvent!==N?(d={blockedOn:g,domEventName:v,eventSystemFlags:b,nativeEvent:N,targetContainers:[C]},g!==null&&(g=Fy(g),g!==null&&Ft(g)),d):(d.eventSystemFlags|=b,g=d.targetContainers,C!==null&&g.indexOf(C)===-1&&g.push(C),d)}function Al(d,g,v,b,C){switch(g){case"focusin":return _e=pi(_e,d,g,v,b,C),!0;case"dragenter":return Qe=pi(Qe,d,g,v,b,C),!0;case"mouseover":return st=pi(st,d,g,v,b,C),!0;case"pointerover":var N=C.pointerId;return qt.set(N,pi(qt.get(N)||null,d,g,v,b,C)),!0;case"gotpointercapture":return N=C.pointerId,Ln.set(N,pi(Ln.get(N)||null,d,g,v,b,C)),!0}return!1}function oc(d){var g=sf(d.target);if(g!==null){var v=re(g);if(v!==null){if(g=v.tag,g===13){if(g=Ee(v),g!==null){d.blockedOn=g,Ri(d.priority,function(){Mn(v)});return}}else if(g===3&&v.stateNode.current.memoizedState.isDehydrated){d.blockedOn=v.tag===3?v.stateNode.containerInfo:null;return}}}d.blockedOn=null}function qn(d){if(d.blockedOn!==null)return!1;for(var g=d.targetContainers;0<g.length;){var v=rp(d.domEventName,d.eventSystemFlags,g[0],d.nativeEvent);if(v===null){v=d.nativeEvent;var b=new v.constructor(v.type,v);Nr=b,v.target.dispatchEvent(b),Nr=null}else return g=Fy(v),g!==null&&Ft(g),d.blockedOn=v,!1;g.shift()}return!0}function ef(d,g,v){qn(d)&&v.delete(g)}function OT(){Ye=!1,_e!==null&&qn(_e)&&(_e=null),Qe!==null&&qn(Qe)&&(Qe=null),st!==null&&qn(st)&&(st=null),qt.forEach(ef),Ln.forEach(ef)}function sd(d,g){d.blockedOn===g&&(d.blockedOn=null,Ye||(Ye=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,OT)))}function ad(d){function g(C){return sd(C,d)}if(0<q.length){sd(q[0],d);for(var v=1;v<q.length;v++){var b=q[v];b.blockedOn===d&&(b.blockedOn=null)}}for(_e!==null&&sd(_e,d),Qe!==null&&sd(Qe,d),st!==null&&sd(st,d),qt.forEach(g),Ln.forEach(g),v=0;v<Cn.length;v++)b=Cn[v],b.blockedOn===d&&(b.blockedOn=null);for(;0<Cn.length&&(v=Cn[0],v.blockedOn===null);)oc(v),v.blockedOn===null&&Cn.shift()}var su=A.ReactCurrentBatchConfig,au=!0;function lc(d,g,v,b){var C=He,N=su.transition;su.transition=null;try{He=1,Ey(d,g,v,b)}finally{He=C,su.transition=N}}function nw(d,g,v,b){var C=He,N=su.transition;su.transition=null;try{He=4,Ey(d,g,v,b)}finally{He=C,su.transition=N}}function Ey(d,g,v,b){if(au){var C=rp(d,g,v,b);if(C===null)XT(d,g,b,cc,v),Yi(d,b);else if(Al(C,d,g,v,b))b.stopPropagation();else if(Yi(d,b),g&4&&-1<ii.indexOf(d)){for(;C!==null;){var N=Fy(C);if(N!==null&&tn(N),N=rp(d,g,v,b),N===null&&XT(d,g,b,cc,v),N===C)break;C=N}C!==null&&b.stopPropagation()}else XT(d,g,b,null,v)}}var cc=null;function rp(d,g,v,b){if(cc=null,d=kn(b),d=sf(d),d!==null)if(g=re(d),g===null)d=null;else if(v=g.tag,v===13){if(d=Ee(g),d!==null)return d;d=null}else if(v===3){if(g.stateNode.current.memoizedState.isDehydrated)return g.tag===3?g.stateNode.containerInfo:null;d=null}else g!==d&&(d=null);return cc=d,null}function ip(d){switch(d){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Nt()){case Xn:return 1;case Mt:return 4;case _r:case We:return 16;case Me:return 536870912;default:return 16}default:return 16}}var Eo=null,sp=null,ou=null;function rw(){if(ou)return ou;var d,g=sp,v=g.length,b,C="value"in Eo?Eo.value:Eo.textContent,N=C.length;for(d=0;d<v&&g[d]===C[d];d++);var W=v-d;for(b=1;b<=W&&g[v-b]===C[N-b];b++);return ou=C.slice(d,1<b?1-b:void 0)}function tf(d){var g=d.keyCode;return"charCode"in d?(d=d.charCode,d===0&&g===13&&(d=13)):d=g,d===10&&(d=13),32<=d||d===13?d:0}function uc(){return!0}function Sy(){return!1}function pa(d){function g(v,b,C,N,W){this._reactName=v,this._targetInst=C,this.type=b,this.nativeEvent=N,this.target=W,this.currentTarget=null;for(var le in d)d.hasOwnProperty(le)&&(v=d[le],this[le]=v?v(N):N[le]);return this.isDefaultPrevented=(N.defaultPrevented!=null?N.defaultPrevented:N.returnValue===!1)?uc:Sy,this.isPropagationStopped=Sy,this}return ue(g.prototype,{preventDefault:function(){this.defaultPrevented=!0;var v=this.nativeEvent;v&&(v.preventDefault?v.preventDefault():typeof v.returnValue!="unknown"&&(v.returnValue=!1),this.isDefaultPrevented=uc)},stopPropagation:function(){var v=this.nativeEvent;v&&(v.stopPropagation?v.stopPropagation():typeof v.cancelBubble!="unknown"&&(v.cancelBubble=!0),this.isPropagationStopped=uc)},persist:function(){},isPersistent:uc}),g}var dc={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(d){return d.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},nf=pa(dc),od=ue({},dc,{view:0,detail:0}),ap=pa(od),op,lp,So,rf=ue({},od,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kn,button:0,buttons:0,relatedTarget:function(d){return d.relatedTarget===void 0?d.fromElement===d.srcElement?d.toElement:d.fromElement:d.relatedTarget},movementX:function(d){return"movementX"in d?d.movementX:(d!==So&&(So&&d.type==="mousemove"?(op=d.screenX-So.screenX,lp=d.screenY-So.screenY):lp=op=0,So=d),op)},movementY:function(d){return"movementY"in d?d.movementY:lp}}),ky=pa(rf),iw=ue({},rf,{dataTransfer:0}),sw=pa(iw),cp=ue({},od,{relatedTarget:0}),Zs=pa(cp),aw=ue({},dc,{animationName:0,elapsedTime:0,pseudoElement:0}),ow=pa(aw),ld=ue({},dc,{clipboardData:function(d){return"clipboardData"in d?d.clipboardData:window.clipboardData}}),w=pa(ld),M=ue({},dc,{data:0}),G=pa(M),X={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ie={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ge={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kt(d){var g=this.nativeEvent;return g.getModifierState?g.getModifierState(d):(d=Ge[d])?!!g[d]:!1}function Kn(){return kt}var Zi=ue({},od,{key:function(d){if(d.key){var g=X[d.key]||d.key;if(g!=="Unidentified")return g}return d.type==="keypress"?(d=tf(d),d===13?"Enter":String.fromCharCode(d)):d.type==="keydown"||d.type==="keyup"?Ie[d.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kn,charCode:function(d){return d.type==="keypress"?tf(d):0},keyCode:function(d){return d.type==="keydown"||d.type==="keyup"?d.keyCode:0},which:function(d){return d.type==="keypress"?tf(d):d.type==="keydown"||d.type==="keyup"?d.keyCode:0}}),qr=pa(Zi),ls=ue({},rf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ko=pa(ls),lu=ue({},od,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kn}),hc=pa(lu),fc=ue({},dc,{propertyName:0,elapsedTime:0,pseudoElement:0}),up=pa(fc),Ty=ue({},rf,{deltaX:function(d){return"deltaX"in d?d.deltaX:"wheelDeltaX"in d?-d.wheelDeltaX:0},deltaY:function(d){return"deltaY"in d?d.deltaY:"wheelDeltaY"in d?-d.wheelDeltaY:"wheelDelta"in d?-d.wheelDelta:0},deltaZ:0,deltaMode:0}),yee=pa(Ty),vee=[9,13,27,32],zT=o&&"CompositionEvent"in window,Cy=null;o&&"documentMode"in document&&(Cy=document.documentMode);var xee=o&&"TextEvent"in window&&!Cy,X3=o&&(!zT||Cy&&8<Cy&&11>=Cy),Y3=" ",Z3=!1;function J3(d,g){switch(d){case"keyup":return vee.indexOf(g.keyCode)!==-1;case"keydown":return g.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Q3(d){return d=d.detail,typeof d=="object"&&"data"in d?d.data:null}var dp=!1;function _ee(d,g){switch(d){case"compositionend":return Q3(g);case"keypress":return g.which!==32?null:(Z3=!0,Y3);case"textInput":return d=g.data,d===Y3&&Z3?null:d;default:return null}}function wee(d,g){if(dp)return d==="compositionend"||!zT&&J3(d,g)?(d=rw(),ou=sp=Eo=null,dp=!1,d):null;switch(d){case"paste":return null;case"keypress":if(!(g.ctrlKey||g.altKey||g.metaKey)||g.ctrlKey&&g.altKey){if(g.char&&1<g.char.length)return g.char;if(g.which)return String.fromCharCode(g.which)}return null;case"compositionend":return X3&&g.locale!=="ko"?null:g.data;default:return null}}var bee={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function e5(d){var g=d&&d.nodeName&&d.nodeName.toLowerCase();return g==="input"?!!bee[d.type]:g==="textarea"}function t5(d,g,v,b){Bi(b),g=hw(g,"onChange"),0<g.length&&(v=new nf("onChange","change",null,v,b),d.push({event:v,listeners:g}))}var Ay=null,Iy=null;function Eee(d){x5(d,0)}function lw(d){var g=mp(d);if(Rt(g))return d}function See(d,g){if(d==="change")return g}var n5=!1;if(o){var GT;if(o){var VT="oninput"in document;if(!VT){var r5=document.createElement("div");r5.setAttribute("oninput","return;"),VT=typeof r5.oninput=="function"}GT=VT}else GT=!1;n5=GT&&(!document.documentMode||9<document.documentMode)}function i5(){Ay&&(Ay.detachEvent("onpropertychange",s5),Iy=Ay=null)}function s5(d){if(d.propertyName==="value"&&lw(Iy)){var g=[];t5(g,Iy,d,kn(d)),ni(Eee,g)}}function kee(d,g,v){d==="focusin"?(i5(),Ay=g,Iy=v,Ay.attachEvent("onpropertychange",s5)):d==="focusout"&&i5()}function Tee(d){if(d==="selectionchange"||d==="keyup"||d==="keydown")return lw(Iy)}function Cee(d,g){if(d==="click")return lw(g)}function Aee(d,g){if(d==="input"||d==="change")return lw(g)}function Iee(d,g){return d===g&&(d!==0||1/d===1/g)||d!==d&&g!==g}var Il=typeof Object.is=="function"?Object.is:Iee;function Ry(d,g){if(Il(d,g))return!0;if(typeof d!="object"||d===null||typeof g!="object"||g===null)return!1;var v=Object.keys(d),b=Object.keys(g);if(v.length!==b.length)return!1;for(b=0;b<v.length;b++){var C=v[b];if(!l.call(g,C)||!Il(d[C],g[C]))return!1}return!0}function a5(d){for(;d&&d.firstChild;)d=d.firstChild;return d}function o5(d,g){var v=a5(d);d=0;for(var b;v;){if(v.nodeType===3){if(b=d+v.textContent.length,d<=g&&b>=g)return{node:v,offset:g-d};d=b}e:{for(;v;){if(v.nextSibling){v=v.nextSibling;break e}v=v.parentNode}v=void 0}v=a5(v)}}function l5(d,g){return d&&g?d===g?!0:d&&d.nodeType===3?!1:g&&g.nodeType===3?l5(d,g.parentNode):"contains"in d?d.contains(g):d.compareDocumentPosition?!!(d.compareDocumentPosition(g)&16):!1:!1}function c5(){for(var d=window,g=xt();g instanceof d.HTMLIFrameElement;){try{var v=typeof g.contentWindow.location.href=="string"}catch{v=!1}if(v)d=g.contentWindow;else break;g=xt(d.document)}return g}function BT(d){var g=d&&d.nodeName&&d.nodeName.toLowerCase();return g&&(g==="input"&&(d.type==="text"||d.type==="search"||d.type==="tel"||d.type==="url"||d.type==="password")||g==="textarea"||d.contentEditable==="true")}function Ree(d){var g=c5(),v=d.focusedElem,b=d.selectionRange;if(g!==v&&v&&v.ownerDocument&&l5(v.ownerDocument.documentElement,v)){if(b!==null&&BT(v)){if(g=b.start,d=b.end,d===void 0&&(d=g),"selectionStart"in v)v.selectionStart=g,v.selectionEnd=Math.min(d,v.value.length);else if(d=(g=v.ownerDocument||document)&&g.defaultView||window,d.getSelection){d=d.getSelection();var C=v.textContent.length,N=Math.min(b.start,C);b=b.end===void 0?N:Math.min(b.end,C),!d.extend&&N>b&&(C=b,b=N,N=C),C=o5(v,N);var W=o5(v,b);C&&W&&(d.rangeCount!==1||d.anchorNode!==C.node||d.anchorOffset!==C.offset||d.focusNode!==W.node||d.focusOffset!==W.offset)&&(g=g.createRange(),g.setStart(C.node,C.offset),d.removeAllRanges(),N>b?(d.addRange(g),d.extend(W.node,W.offset)):(g.setEnd(W.node,W.offset),d.addRange(g)))}}for(g=[],d=v;d=d.parentNode;)d.nodeType===1&&g.push({element:d,left:d.scrollLeft,top:d.scrollTop});for(typeof v.focus=="function"&&v.focus(),v=0;v<g.length;v++)d=g[v],d.element.scrollLeft=d.left,d.element.scrollTop=d.top}}var Pee=o&&"documentMode"in document&&11>=document.documentMode,hp=null,UT=null,Py=null,$T=!1;function u5(d,g,v){var b=v.window===v?v.document:v.nodeType===9?v:v.ownerDocument;$T||hp==null||hp!==xt(b)||(b=hp,"selectionStart"in b&&BT(b)?b={start:b.selectionStart,end:b.selectionEnd}:(b=(b.ownerDocument&&b.ownerDocument.defaultView||window).getSelection(),b={anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,focusNode:b.focusNode,focusOffset:b.focusOffset}),Py&&Ry(Py,b)||(Py=b,b=hw(UT,"onSelect"),0<b.length&&(g=new nf("onSelect","select",null,g,v),d.push({event:g,listeners:b}),g.target=hp)))}function cw(d,g){var v={};return v[d.toLowerCase()]=g.toLowerCase(),v["Webkit"+d]="webkit"+g,v["Moz"+d]="moz"+g,v}var fp={animationend:cw("Animation","AnimationEnd"),animationiteration:cw("Animation","AnimationIteration"),animationstart:cw("Animation","AnimationStart"),transitionend:cw("Transition","TransitionEnd")},WT={},d5={};o&&(d5=document.createElement("div").style,"AnimationEvent"in window||(delete fp.animationend.animation,delete fp.animationiteration.animation,delete fp.animationstart.animation),"TransitionEvent"in window||delete fp.transitionend.transition);function uw(d){if(WT[d])return WT[d];if(!fp[d])return d;var g=fp[d],v;for(v in g)if(g.hasOwnProperty(v)&&v in d5)return WT[d]=g[v];return d}var h5=uw("animationend"),f5=uw("animationiteration"),g5=uw("animationstart"),p5=uw("transitionend"),m5=new Map,y5="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function cd(d,g){m5.set(d,g),s(g,[d])}for(var HT=0;HT<y5.length;HT++){var KT=y5[HT],Nee=KT.toLowerCase(),Mee=KT[0].toUpperCase()+KT.slice(1);cd(Nee,"on"+Mee)}cd(h5,"onAnimationEnd"),cd(f5,"onAnimationIteration"),cd(g5,"onAnimationStart"),cd("dblclick","onDoubleClick"),cd("focusin","onFocus"),cd("focusout","onBlur"),cd(p5,"onTransitionEnd"),a("onMouseEnter",["mouseout","mouseover"]),a("onMouseLeave",["mouseout","mouseover"]),a("onPointerEnter",["pointerout","pointerover"]),a("onPointerLeave",["pointerout","pointerover"]),s("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),s("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),s("onBeforeInput",["compositionend","keypress","textInput","paste"]),s("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),s("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),s("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ny="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lee=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ny));function v5(d,g,v){var b=d.type||"unknown-event";d.currentTarget=v,te(b,g,void 0,d),d.currentTarget=null}function x5(d,g){g=(g&4)!==0;for(var v=0;v<d.length;v++){var b=d[v],C=b.event;b=b.listeners;e:{var N=void 0;if(g)for(var W=b.length-1;0<=W;W--){var le=b[W],pe=le.instance,Oe=le.currentTarget;if(le=le.listener,pe!==N&&C.isPropagationStopped())break e;v5(C,le,Oe),N=pe}else for(W=0;W<b.length;W++){if(le=b[W],pe=le.instance,Oe=le.currentTarget,le=le.listener,pe!==N&&C.isPropagationStopped())break e;v5(C,le,Oe),N=pe}}}if(U)throw d=Z,U=!1,Z=null,d}function mi(d,g){var v=g[tC];v===void 0&&(v=g[tC]=new Set);var b=d+"__bubble";v.has(b)||(_5(g,d,2,!1),v.add(b))}function qT(d,g,v){var b=0;g&&(b|=4),_5(v,d,b,g)}var dw="_reactListening"+Math.random().toString(36).slice(2);function My(d){if(!d[dw]){d[dw]=!0,r.forEach(function(v){v!=="selectionchange"&&(Lee.has(v)||qT(v,!1,d),qT(v,!0,d))});var g=d.nodeType===9?d:d.ownerDocument;g===null||g[dw]||(g[dw]=!0,qT("selectionchange",!1,g))}}function _5(d,g,v,b){switch(ip(g)){case 1:var C=lc;break;case 4:C=nw;break;default:C=Ey}v=C.bind(null,g,v,d),C=void 0,!Kr||g!=="touchstart"&&g!=="touchmove"&&g!=="wheel"||(C=!0),b?C!==void 0?d.addEventListener(g,v,{capture:!0,passive:C}):d.addEventListener(g,v,!0):C!==void 0?d.addEventListener(g,v,{passive:C}):d.addEventListener(g,v,!1)}function XT(d,g,v,b,C){var N=b;if((g&1)===0&&(g&2)===0&&b!==null)e:for(;;){if(b===null)return;var W=b.tag;if(W===3||W===4){var le=b.stateNode.containerInfo;if(le===C||le.nodeType===8&&le.parentNode===C)break;if(W===4)for(W=b.return;W!==null;){var pe=W.tag;if((pe===3||pe===4)&&(pe=W.stateNode.containerInfo,pe===C||pe.nodeType===8&&pe.parentNode===C))return;W=W.return}for(;le!==null;){if(W=sf(le),W===null)return;if(pe=W.tag,pe===5||pe===6){b=N=W;continue e}le=le.parentNode}}b=b.return}ni(function(){var Oe=N,ut=kn(v),ft=[];e:{var ot=m5.get(d);if(ot!==void 0){var Gt=nf,Xt=d;switch(d){case"keypress":if(tf(v)===0)break e;case"keydown":case"keyup":Gt=qr;break;case"focusin":Xt="focus",Gt=Zs;break;case"focusout":Xt="blur",Gt=Zs;break;case"beforeblur":case"afterblur":Gt=Zs;break;case"click":if(v.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Gt=ky;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Gt=sw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Gt=hc;break;case h5:case f5:case g5:Gt=ow;break;case p5:Gt=up;break;case"scroll":Gt=ap;break;case"wheel":Gt=yee;break;case"copy":case"cut":case"paste":Gt=w;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Gt=ko}var sn=(g&4)!==0,Ji=!sn&&d==="scroll",Ce=sn?ot!==null?ot+"Capture":null:ot;sn=[];for(var ve=Oe,Le;ve!==null;){Le=ve;var vt=Le.stateNode;if(Le.tag===5&&vt!==null&&(Le=vt,Ce!==null&&(vt=Mr(ve,Ce),vt!=null&&sn.push(Ly(ve,vt,Le)))),Ji)break;ve=ve.return}0<sn.length&&(ot=new Gt(ot,Xt,null,v,ut),ft.push({event:ot,listeners:sn}))}}if((g&7)===0){e:{if(ot=d==="mouseover"||d==="pointerover",Gt=d==="mouseout"||d==="pointerout",ot&&v!==Nr&&(Xt=v.relatedTarget||v.fromElement)&&(sf(Xt)||Xt[cu]))break e;if((Gt||ot)&&(ot=ut.window===ut?ut:(ot=ut.ownerDocument)?ot.defaultView||ot.parentWindow:window,Gt?(Xt=v.relatedTarget||v.toElement,Gt=Oe,Xt=Xt?sf(Xt):null,Xt!==null&&(Ji=re(Xt),Xt!==Ji||Xt.tag!==5&&Xt.tag!==6)&&(Xt=null)):(Gt=null,Xt=Oe),Gt!==Xt)){if(sn=ky,vt="onMouseLeave",Ce="onMouseEnter",ve="mouse",(d==="pointerout"||d==="pointerover")&&(sn=ko,vt="onPointerLeave",Ce="onPointerEnter",ve="pointer"),Ji=Gt==null?ot:mp(Gt),Le=Xt==null?ot:mp(Xt),ot=new sn(vt,ve+"leave",Gt,v,ut),ot.target=Ji,ot.relatedTarget=Le,vt=null,sf(ut)===Oe&&(sn=new sn(Ce,ve+"enter",Xt,v,ut),sn.target=Le,sn.relatedTarget=Ji,vt=sn),Ji=vt,Gt&&Xt)t:{for(sn=Gt,Ce=Xt,ve=0,Le=sn;Le;Le=gp(Le))ve++;for(Le=0,vt=Ce;vt;vt=gp(vt))Le++;for(;0<ve-Le;)sn=gp(sn),ve--;for(;0<Le-ve;)Ce=gp(Ce),Le--;for(;ve--;){if(sn===Ce||Ce!==null&&sn===Ce.alternate)break t;sn=gp(sn),Ce=gp(Ce)}sn=null}else sn=null;Gt!==null&&w5(ft,ot,Gt,sn,!1),Xt!==null&&Ji!==null&&w5(ft,Ji,Xt,sn,!0)}}e:{if(ot=Oe?mp(Oe):window,Gt=ot.nodeName&&ot.nodeName.toLowerCase(),Gt==="select"||Gt==="input"&&ot.type==="file")var ln=See;else if(e5(ot))if(n5)ln=Aee;else{ln=Tee;var En=kee}else(Gt=ot.nodeName)&&Gt.toLowerCase()==="input"&&(ot.type==="checkbox"||ot.type==="radio")&&(ln=Cee);if(ln&&(ln=ln(d,Oe))){t5(ft,ln,v,ut);break e}En&&En(d,ot,Oe),d==="focusout"&&(En=ot._wrapperState)&&En.controlled&&ot.type==="number"&&un(ot,"number",ot.value)}switch(En=Oe?mp(Oe):window,d){case"focusin":(e5(En)||En.contentEditable==="true")&&(hp=En,UT=Oe,Py=null);break;case"focusout":Py=UT=hp=null;break;case"mousedown":$T=!0;break;case"contextmenu":case"mouseup":case"dragend":$T=!1,u5(ft,v,ut);break;case"selectionchange":if(Pee)break;case"keydown":case"keyup":u5(ft,v,ut)}var Sn;if(zT)e:{switch(d){case"compositionstart":var Fn="onCompositionStart";break e;case"compositionend":Fn="onCompositionEnd";break e;case"compositionupdate":Fn="onCompositionUpdate";break e}Fn=void 0}else dp?J3(d,v)&&(Fn="onCompositionEnd"):d==="keydown"&&v.keyCode===229&&(Fn="onCompositionStart");Fn&&(X3&&v.locale!=="ko"&&(dp||Fn!=="onCompositionStart"?Fn==="onCompositionEnd"&&dp&&(Sn=rw()):(Eo=ut,sp="value"in Eo?Eo.value:Eo.textContent,dp=!0)),En=hw(Oe,Fn),0<En.length&&(Fn=new G(Fn,d,null,v,ut),ft.push({event:Fn,listeners:En}),Sn?Fn.data=Sn:(Sn=Q3(v),Sn!==null&&(Fn.data=Sn)))),(Sn=xee?_ee(d,v):wee(d,v))&&(Oe=hw(Oe,"onBeforeInput"),0<Oe.length&&(ut=new G("onBeforeInput","beforeinput",null,v,ut),ft.push({event:ut,listeners:Oe}),ut.data=Sn))}x5(ft,g)})}function Ly(d,g,v){return{instance:d,listener:g,currentTarget:v}}function hw(d,g){for(var v=g+"Capture",b=[];d!==null;){var C=d,N=C.stateNode;C.tag===5&&N!==null&&(C=N,N=Mr(d,v),N!=null&&b.unshift(Ly(d,N,C)),N=Mr(d,g),N!=null&&b.push(Ly(d,N,C))),d=d.return}return b}function gp(d){if(d===null)return null;do d=d.return;while(d&&d.tag!==5);return d||null}function w5(d,g,v,b,C){for(var N=g._reactName,W=[];v!==null&&v!==b;){var le=v,pe=le.alternate,Oe=le.stateNode;if(pe!==null&&pe===b)break;le.tag===5&&Oe!==null&&(le=Oe,C?(pe=Mr(v,N),pe!=null&&W.unshift(Ly(v,pe,le))):C||(pe=Mr(v,N),pe!=null&&W.push(Ly(v,pe,le)))),v=v.return}W.length!==0&&d.push({event:g,listeners:W})}var jee=/\r\n?/g,Fee=/\u0000|\uFFFD/g;function b5(d){return(typeof d=="string"?d:""+d).replace(jee,`
`).replace(Fee,"")}function fw(d,g,v){if(g=b5(g),b5(d)!==g&&v)throw Error(t(425))}function gw(){}var YT=null,ZT=null;function JT(d,g){return d==="textarea"||d==="noscript"||typeof g.children=="string"||typeof g.children=="number"||typeof g.dangerouslySetInnerHTML=="object"&&g.dangerouslySetInnerHTML!==null&&g.dangerouslySetInnerHTML.__html!=null}var QT=typeof setTimeout=="function"?setTimeout:void 0,Dee=typeof clearTimeout=="function"?clearTimeout:void 0,E5=typeof Promise=="function"?Promise:void 0,Oee=typeof queueMicrotask=="function"?queueMicrotask:typeof E5<"u"?function(d){return E5.resolve(null).then(d).catch(zee)}:QT;function zee(d){setTimeout(function(){throw d})}function eC(d,g){var v=g,b=0;do{var C=v.nextSibling;if(d.removeChild(v),C&&C.nodeType===8)if(v=C.data,v==="/$"){if(b===0){d.removeChild(C),ad(g);return}b--}else v!=="$"&&v!=="$?"&&v!=="$!"||b++;v=C}while(v);ad(g)}function ud(d){for(;d!=null;d=d.nextSibling){var g=d.nodeType;if(g===1||g===3)break;if(g===8){if(g=d.data,g==="$"||g==="$!"||g==="$?")break;if(g==="/$")return null}}return d}function S5(d){d=d.previousSibling;for(var g=0;d;){if(d.nodeType===8){var v=d.data;if(v==="$"||v==="$!"||v==="$?"){if(g===0)return d;g--}else v==="/$"&&g++}d=d.previousSibling}return null}var pp=Math.random().toString(36).slice(2),gc="__reactFiber$"+pp,jy="__reactProps$"+pp,cu="__reactContainer$"+pp,tC="__reactEvents$"+pp,Gee="__reactListeners$"+pp,Vee="__reactHandles$"+pp;function sf(d){var g=d[gc];if(g)return g;for(var v=d.parentNode;v;){if(g=v[cu]||v[gc]){if(v=g.alternate,g.child!==null||v!==null&&v.child!==null)for(d=S5(d);d!==null;){if(v=d[gc])return v;d=S5(d)}return g}d=v,v=d.parentNode}return null}function Fy(d){return d=d[gc]||d[cu],!d||d.tag!==5&&d.tag!==6&&d.tag!==13&&d.tag!==3?null:d}function mp(d){if(d.tag===5||d.tag===6)return d.stateNode;throw Error(t(33))}function pw(d){return d[jy]||null}var nC=[],yp=-1;function dd(d){return{current:d}}function yi(d){0>yp||(d.current=nC[yp],nC[yp]=null,yp--)}function ci(d,g){yp++,nC[yp]=d.current,d.current=g}var hd={},ma=dd(hd),Xa=dd(!1),af=hd;function vp(d,g){var v=d.type.contextTypes;if(!v)return hd;var b=d.stateNode;if(b&&b.__reactInternalMemoizedUnmaskedChildContext===g)return b.__reactInternalMemoizedMaskedChildContext;var C={},N;for(N in v)C[N]=g[N];return b&&(d=d.stateNode,d.__reactInternalMemoizedUnmaskedChildContext=g,d.__reactInternalMemoizedMaskedChildContext=C),C}function Ya(d){return d=d.childContextTypes,d!=null}function mw(){yi(Xa),yi(ma)}function k5(d,g,v){if(ma.current!==hd)throw Error(t(168));ci(ma,g),ci(Xa,v)}function T5(d,g,v){var b=d.stateNode;if(g=g.childContextTypes,typeof b.getChildContext!="function")return v;b=b.getChildContext();for(var C in b)if(!(C in g))throw Error(t(108,je(d)||"Unknown",C));return ue({},v,b)}function yw(d){return d=(d=d.stateNode)&&d.__reactInternalMemoizedMergedChildContext||hd,af=ma.current,ci(ma,d),ci(Xa,Xa.current),!0}function C5(d,g,v){var b=d.stateNode;if(!b)throw Error(t(169));v?(d=T5(d,g,af),b.__reactInternalMemoizedMergedChildContext=d,yi(Xa),yi(ma),ci(ma,d)):yi(Xa),ci(Xa,v)}var uu=null,vw=!1,rC=!1;function A5(d){uu===null?uu=[d]:uu.push(d)}function Bee(d){vw=!0,A5(d)}function fd(){if(!rC&&uu!==null){rC=!0;var d=0,g=He;try{var v=uu;for(He=1;d<v.length;d++){var b=v[d];do b=b(!0);while(b!==null)}uu=null,vw=!1}catch(C){throw uu!==null&&(uu=uu.slice(d+1)),$e(Xn,fd),C}finally{He=g,rC=!1}}return null}var xp=[],_p=0,xw=null,_w=0,Jo=[],Qo=0,of=null,du=1,hu="";function lf(d,g){xp[_p++]=_w,xp[_p++]=xw,xw=d,_w=g}function I5(d,g,v){Jo[Qo++]=du,Jo[Qo++]=hu,Jo[Qo++]=of,of=d;var b=du;d=hu;var C=32-Ut(b)-1;b&=~(1<<C),v+=1;var N=32-Ut(g)+C;if(30<N){var W=C-C%5;N=(b&(1<<W)-1).toString(32),b>>=W,C-=W,du=1<<32-Ut(g)+C|v<<C|b,hu=N+d}else du=1<<N|v<<C|b,hu=d}function iC(d){d.return!==null&&(lf(d,1),I5(d,1,0))}function sC(d){for(;d===xw;)xw=xp[--_p],xp[_p]=null,_w=xp[--_p],xp[_p]=null;for(;d===of;)of=Jo[--Qo],Jo[Qo]=null,hu=Jo[--Qo],Jo[Qo]=null,du=Jo[--Qo],Jo[Qo]=null}var To=null,Co=null,Si=!1,Rl=null;function R5(d,g){var v=rl(5,null,null,0);v.elementType="DELETED",v.stateNode=g,v.return=d,g=d.deletions,g===null?(d.deletions=[v],d.flags|=16):g.push(v)}function P5(d,g){switch(d.tag){case 5:var v=d.type;return g=g.nodeType!==1||v.toLowerCase()!==g.nodeName.toLowerCase()?null:g,g!==null?(d.stateNode=g,To=d,Co=ud(g.firstChild),!0):!1;case 6:return g=d.pendingProps===""||g.nodeType!==3?null:g,g!==null?(d.stateNode=g,To=d,Co=null,!0):!1;case 13:return g=g.nodeType!==8?null:g,g!==null?(v=of!==null?{id:du,overflow:hu}:null,d.memoizedState={dehydrated:g,treeContext:v,retryLane:1073741824},v=rl(18,null,null,0),v.stateNode=g,v.return=d,d.child=v,To=d,Co=null,!0):!1;default:return!1}}function aC(d){return(d.mode&1)!==0&&(d.flags&128)===0}function oC(d){if(Si){var g=Co;if(g){var v=g;if(!P5(d,g)){if(aC(d))throw Error(t(418));g=ud(v.nextSibling);var b=To;g&&P5(d,g)?R5(b,v):(d.flags=d.flags&-4097|2,Si=!1,To=d)}}else{if(aC(d))throw Error(t(418));d.flags=d.flags&-4097|2,Si=!1,To=d}}}function N5(d){for(d=d.return;d!==null&&d.tag!==5&&d.tag!==3&&d.tag!==13;)d=d.return;To=d}function ww(d){if(d!==To)return!1;if(!Si)return N5(d),Si=!0,!1;var g;if((g=d.tag!==3)&&!(g=d.tag!==5)&&(g=d.type,g=g!=="head"&&g!=="body"&&!JT(d.type,d.memoizedProps)),g&&(g=Co)){if(aC(d))throw M5(),Error(t(418));for(;g;)R5(d,g),g=ud(g.nextSibling)}if(N5(d),d.tag===13){if(d=d.memoizedState,d=d!==null?d.dehydrated:null,!d)throw Error(t(317));e:{for(d=d.nextSibling,g=0;d;){if(d.nodeType===8){var v=d.data;if(v==="/$"){if(g===0){Co=ud(d.nextSibling);break e}g--}else v!=="$"&&v!=="$!"&&v!=="$?"||g++}d=d.nextSibling}Co=null}}else Co=To?ud(d.stateNode.nextSibling):null;return!0}function M5(){for(var d=Co;d;)d=ud(d.nextSibling)}function wp(){Co=To=null,Si=!1}function lC(d){Rl===null?Rl=[d]:Rl.push(d)}var Uee=A.ReactCurrentBatchConfig;function Dy(d,g,v){if(d=v.ref,d!==null&&typeof d!="function"&&typeof d!="object"){if(v._owner){if(v=v._owner,v){if(v.tag!==1)throw Error(t(309));var b=v.stateNode}if(!b)throw Error(t(147,d));var C=b,N=""+d;return g!==null&&g.ref!==null&&typeof g.ref=="function"&&g.ref._stringRef===N?g.ref:(g=function(W){var le=C.refs;W===null?delete le[N]:le[N]=W},g._stringRef=N,g)}if(typeof d!="string")throw Error(t(284));if(!v._owner)throw Error(t(290,d))}return d}function bw(d,g){throw d=Object.prototype.toString.call(g),Error(t(31,d==="[object Object]"?"object with keys {"+Object.keys(g).join(", ")+"}":d))}function L5(d){var g=d._init;return g(d._payload)}function j5(d){function g(Ce,ve){if(d){var Le=Ce.deletions;Le===null?(Ce.deletions=[ve],Ce.flags|=16):Le.push(ve)}}function v(Ce,ve){if(!d)return null;for(;ve!==null;)g(Ce,ve),ve=ve.sibling;return null}function b(Ce,ve){for(Ce=new Map;ve!==null;)ve.key!==null?Ce.set(ve.key,ve):Ce.set(ve.index,ve),ve=ve.sibling;return Ce}function C(Ce,ve){return Ce=wd(Ce,ve),Ce.index=0,Ce.sibling=null,Ce}function N(Ce,ve,Le){return Ce.index=Le,d?(Le=Ce.alternate,Le!==null?(Le=Le.index,Le<ve?(Ce.flags|=2,ve):Le):(Ce.flags|=2,ve)):(Ce.flags|=1048576,ve)}function W(Ce){return d&&Ce.alternate===null&&(Ce.flags|=2),Ce}function le(Ce,ve,Le,vt){return ve===null||ve.tag!==6?(ve=QC(Le,Ce.mode,vt),ve.return=Ce,ve):(ve=C(ve,Le),ve.return=Ce,ve)}function pe(Ce,ve,Le,vt){var ln=Le.type;return ln===I?ut(Ce,ve,Le.props.children,vt,Le.key):ve!==null&&(ve.elementType===ln||typeof ln=="object"&&ln!==null&&ln.$$typeof===ge&&L5(ln)===ve.type)?(vt=C(ve,Le.props),vt.ref=Dy(Ce,ve,Le),vt.return=Ce,vt):(vt=Hw(Le.type,Le.key,Le.props,null,Ce.mode,vt),vt.ref=Dy(Ce,ve,Le),vt.return=Ce,vt)}function Oe(Ce,ve,Le,vt){return ve===null||ve.tag!==4||ve.stateNode.containerInfo!==Le.containerInfo||ve.stateNode.implementation!==Le.implementation?(ve=eA(Le,Ce.mode,vt),ve.return=Ce,ve):(ve=C(ve,Le.children||[]),ve.return=Ce,ve)}function ut(Ce,ve,Le,vt,ln){return ve===null||ve.tag!==7?(ve=mf(Le,Ce.mode,vt,ln),ve.return=Ce,ve):(ve=C(ve,Le),ve.return=Ce,ve)}function ft(Ce,ve,Le){if(typeof ve=="string"&&ve!==""||typeof ve=="number")return ve=QC(""+ve,Ce.mode,Le),ve.return=Ce,ve;if(typeof ve=="object"&&ve!==null){switch(ve.$$typeof){case P:return Le=Hw(ve.type,ve.key,ve.props,null,Ce.mode,Le),Le.ref=Dy(Ce,null,ve),Le.return=Ce,Le;case z:return ve=eA(ve,Ce.mode,Le),ve.return=Ce,ve;case ge:var vt=ve._init;return ft(Ce,vt(ve._payload),Le)}if(pn(ve)||ie(ve))return ve=mf(ve,Ce.mode,Le,null),ve.return=Ce,ve;bw(Ce,ve)}return null}function ot(Ce,ve,Le,vt){var ln=ve!==null?ve.key:null;if(typeof Le=="string"&&Le!==""||typeof Le=="number")return ln!==null?null:le(Ce,ve,""+Le,vt);if(typeof Le=="object"&&Le!==null){switch(Le.$$typeof){case P:return Le.key===ln?pe(Ce,ve,Le,vt):null;case z:return Le.key===ln?Oe(Ce,ve,Le,vt):null;case ge:return ln=Le._init,ot(Ce,ve,ln(Le._payload),vt)}if(pn(Le)||ie(Le))return ln!==null?null:ut(Ce,ve,Le,vt,null);bw(Ce,Le)}return null}function Gt(Ce,ve,Le,vt,ln){if(typeof vt=="string"&&vt!==""||typeof vt=="number")return Ce=Ce.get(Le)||null,le(ve,Ce,""+vt,ln);if(typeof vt=="object"&&vt!==null){switch(vt.$$typeof){case P:return Ce=Ce.get(vt.key===null?Le:vt.key)||null,pe(ve,Ce,vt,ln);case z:return Ce=Ce.get(vt.key===null?Le:vt.key)||null,Oe(ve,Ce,vt,ln);case ge:var En=vt._init;return Gt(Ce,ve,Le,En(vt._payload),ln)}if(pn(vt)||ie(vt))return Ce=Ce.get(Le)||null,ut(ve,Ce,vt,ln,null);bw(ve,vt)}return null}function Xt(Ce,ve,Le,vt){for(var ln=null,En=null,Sn=ve,Fn=ve=0,Ds=null;Sn!==null&&Fn<Le.length;Fn++){Sn.index>Fn?(Ds=Sn,Sn=null):Ds=Sn.sibling;var Lr=ot(Ce,Sn,Le[Fn],vt);if(Lr===null){Sn===null&&(Sn=Ds);break}d&&Sn&&Lr.alternate===null&&g(Ce,Sn),ve=N(Lr,ve,Fn),En===null?ln=Lr:En.sibling=Lr,En=Lr,Sn=Ds}if(Fn===Le.length)return v(Ce,Sn),Si&&lf(Ce,Fn),ln;if(Sn===null){for(;Fn<Le.length;Fn++)Sn=ft(Ce,Le[Fn],vt),Sn!==null&&(ve=N(Sn,ve,Fn),En===null?ln=Sn:En.sibling=Sn,En=Sn);return Si&&lf(Ce,Fn),ln}for(Sn=b(Ce,Sn);Fn<Le.length;Fn++)Ds=Gt(Sn,Ce,Fn,Le[Fn],vt),Ds!==null&&(d&&Ds.alternate!==null&&Sn.delete(Ds.key===null?Fn:Ds.key),ve=N(Ds,ve,Fn),En===null?ln=Ds:En.sibling=Ds,En=Ds);return d&&Sn.forEach(function(bd){return g(Ce,bd)}),Si&&lf(Ce,Fn),ln}function sn(Ce,ve,Le,vt){var ln=ie(Le);if(typeof ln!="function")throw Error(t(150));if(Le=ln.call(Le),Le==null)throw Error(t(151));for(var En=ln=null,Sn=ve,Fn=ve=0,Ds=null,Lr=Le.next();Sn!==null&&!Lr.done;Fn++,Lr=Le.next()){Sn.index>Fn?(Ds=Sn,Sn=null):Ds=Sn.sibling;var bd=ot(Ce,Sn,Lr.value,vt);if(bd===null){Sn===null&&(Sn=Ds);break}d&&Sn&&bd.alternate===null&&g(Ce,Sn),ve=N(bd,ve,Fn),En===null?ln=bd:En.sibling=bd,En=bd,Sn=Ds}if(Lr.done)return v(Ce,Sn),Si&&lf(Ce,Fn),ln;if(Sn===null){for(;!Lr.done;Fn++,Lr=Le.next())Lr=ft(Ce,Lr.value,vt),Lr!==null&&(ve=N(Lr,ve,Fn),En===null?ln=Lr:En.sibling=Lr,En=Lr);return Si&&lf(Ce,Fn),ln}for(Sn=b(Ce,Sn);!Lr.done;Fn++,Lr=Le.next())Lr=Gt(Sn,Ce,Fn,Lr.value,vt),Lr!==null&&(d&&Lr.alternate!==null&&Sn.delete(Lr.key===null?Fn:Lr.key),ve=N(Lr,ve,Fn),En===null?ln=Lr:En.sibling=Lr,En=Lr);return d&&Sn.forEach(function(bte){return g(Ce,bte)}),Si&&lf(Ce,Fn),ln}function Ji(Ce,ve,Le,vt){if(typeof Le=="object"&&Le!==null&&Le.type===I&&Le.key===null&&(Le=Le.props.children),typeof Le=="object"&&Le!==null){switch(Le.$$typeof){case P:e:{for(var ln=Le.key,En=ve;En!==null;){if(En.key===ln){if(ln=Le.type,ln===I){if(En.tag===7){v(Ce,En.sibling),ve=C(En,Le.props.children),ve.return=Ce,Ce=ve;break e}}else if(En.elementType===ln||typeof ln=="object"&&ln!==null&&ln.$$typeof===ge&&L5(ln)===En.type){v(Ce,En.sibling),ve=C(En,Le.props),ve.ref=Dy(Ce,En,Le),ve.return=Ce,Ce=ve;break e}v(Ce,En);break}else g(Ce,En);En=En.sibling}Le.type===I?(ve=mf(Le.props.children,Ce.mode,vt,Le.key),ve.return=Ce,Ce=ve):(vt=Hw(Le.type,Le.key,Le.props,null,Ce.mode,vt),vt.ref=Dy(Ce,ve,Le),vt.return=Ce,Ce=vt)}return W(Ce);case z:e:{for(En=Le.key;ve!==null;){if(ve.key===En)if(ve.tag===4&&ve.stateNode.containerInfo===Le.containerInfo&&ve.stateNode.implementation===Le.implementation){v(Ce,ve.sibling),ve=C(ve,Le.children||[]),ve.return=Ce,Ce=ve;break e}else{v(Ce,ve);break}else g(Ce,ve);ve=ve.sibling}ve=eA(Le,Ce.mode,vt),ve.return=Ce,Ce=ve}return W(Ce);case ge:return En=Le._init,Ji(Ce,ve,En(Le._payload),vt)}if(pn(Le))return Xt(Ce,ve,Le,vt);if(ie(Le))return sn(Ce,ve,Le,vt);bw(Ce,Le)}return typeof Le=="string"&&Le!==""||typeof Le=="number"?(Le=""+Le,ve!==null&&ve.tag===6?(v(Ce,ve.sibling),ve=C(ve,Le),ve.return=Ce,Ce=ve):(v(Ce,ve),ve=QC(Le,Ce.mode,vt),ve.return=Ce,Ce=ve),W(Ce)):v(Ce,ve)}return Ji}var bp=j5(!0),F5=j5(!1),Ew=dd(null),Sw=null,Ep=null,cC=null;function uC(){cC=Ep=Sw=null}function dC(d){var g=Ew.current;yi(Ew),d._currentValue=g}function hC(d,g,v){for(;d!==null;){var b=d.alternate;if((d.childLanes&g)!==g?(d.childLanes|=g,b!==null&&(b.childLanes|=g)):b!==null&&(b.childLanes&g)!==g&&(b.childLanes|=g),d===v)break;d=d.return}}function Sp(d,g){Sw=d,cC=Ep=null,d=d.dependencies,d!==null&&d.firstContext!==null&&((d.lanes&g)!==0&&(Za=!0),d.firstContext=null)}function el(d){var g=d._currentValue;if(cC!==d)if(d={context:d,memoizedValue:g,next:null},Ep===null){if(Sw===null)throw Error(t(308));Ep=d,Sw.dependencies={lanes:0,firstContext:d}}else Ep=Ep.next=d;return g}var cf=null;function fC(d){cf===null?cf=[d]:cf.push(d)}function D5(d,g,v,b){var C=g.interleaved;return C===null?(v.next=v,fC(g)):(v.next=C.next,C.next=v),g.interleaved=v,fu(d,b)}function fu(d,g){d.lanes|=g;var v=d.alternate;for(v!==null&&(v.lanes|=g),v=d,d=d.return;d!==null;)d.childLanes|=g,v=d.alternate,v!==null&&(v.childLanes|=g),v=d,d=d.return;return v.tag===3?v.stateNode:null}var gd=!1;function gC(d){d.updateQueue={baseState:d.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function O5(d,g){d=d.updateQueue,g.updateQueue===d&&(g.updateQueue={baseState:d.baseState,firstBaseUpdate:d.firstBaseUpdate,lastBaseUpdate:d.lastBaseUpdate,shared:d.shared,effects:d.effects})}function gu(d,g){return{eventTime:d,lane:g,tag:0,payload:null,callback:null,next:null}}function pd(d,g,v){var b=d.updateQueue;if(b===null)return null;if(b=b.shared,(Tr&2)!==0){var C=b.pending;return C===null?g.next=g:(g.next=C.next,C.next=g),b.pending=g,fu(d,v)}return C=b.interleaved,C===null?(g.next=g,fC(b)):(g.next=C.next,C.next=g),b.interleaved=g,fu(d,v)}function kw(d,g,v){if(g=g.updateQueue,g!==null&&(g=g.shared,(v&4194240)!==0)){var b=g.lanes;b&=d.pendingLanes,v|=b,g.lanes=v,ze(d,v)}}function z5(d,g){var v=d.updateQueue,b=d.alternate;if(b!==null&&(b=b.updateQueue,v===b)){var C=null,N=null;if(v=v.firstBaseUpdate,v!==null){do{var W={eventTime:v.eventTime,lane:v.lane,tag:v.tag,payload:v.payload,callback:v.callback,next:null};N===null?C=N=W:N=N.next=W,v=v.next}while(v!==null);N===null?C=N=g:N=N.next=g}else C=N=g;v={baseState:b.baseState,firstBaseUpdate:C,lastBaseUpdate:N,shared:b.shared,effects:b.effects},d.updateQueue=v;return}d=v.lastBaseUpdate,d===null?v.firstBaseUpdate=g:d.next=g,v.lastBaseUpdate=g}function Tw(d,g,v,b){var C=d.updateQueue;gd=!1;var N=C.firstBaseUpdate,W=C.lastBaseUpdate,le=C.shared.pending;if(le!==null){C.shared.pending=null;var pe=le,Oe=pe.next;pe.next=null,W===null?N=Oe:W.next=Oe,W=pe;var ut=d.alternate;ut!==null&&(ut=ut.updateQueue,le=ut.lastBaseUpdate,le!==W&&(le===null?ut.firstBaseUpdate=Oe:le.next=Oe,ut.lastBaseUpdate=pe))}if(N!==null){var ft=C.baseState;W=0,ut=Oe=pe=null,le=N;do{var ot=le.lane,Gt=le.eventTime;if((b&ot)===ot){ut!==null&&(ut=ut.next={eventTime:Gt,lane:0,tag:le.tag,payload:le.payload,callback:le.callback,next:null});e:{var Xt=d,sn=le;switch(ot=g,Gt=v,sn.tag){case 1:if(Xt=sn.payload,typeof Xt=="function"){ft=Xt.call(Gt,ft,ot);break e}ft=Xt;break e;case 3:Xt.flags=Xt.flags&-65537|128;case 0:if(Xt=sn.payload,ot=typeof Xt=="function"?Xt.call(Gt,ft,ot):Xt,ot==null)break e;ft=ue({},ft,ot);break e;case 2:gd=!0}}le.callback!==null&&le.lane!==0&&(d.flags|=64,ot=C.effects,ot===null?C.effects=[le]:ot.push(le))}else Gt={eventTime:Gt,lane:ot,tag:le.tag,payload:le.payload,callback:le.callback,next:null},ut===null?(Oe=ut=Gt,pe=ft):ut=ut.next=Gt,W|=ot;if(le=le.next,le===null){if(le=C.shared.pending,le===null)break;ot=le,le=ot.next,ot.next=null,C.lastBaseUpdate=ot,C.shared.pending=null}}while(!0);if(ut===null&&(pe=ft),C.baseState=pe,C.firstBaseUpdate=Oe,C.lastBaseUpdate=ut,g=C.shared.interleaved,g!==null){C=g;do W|=C.lane,C=C.next;while(C!==g)}else N===null&&(C.shared.lanes=0);hf|=W,d.lanes=W,d.memoizedState=ft}}function G5(d,g,v){if(d=g.effects,g.effects=null,d!==null)for(g=0;g<d.length;g++){var b=d[g],C=b.callback;if(C!==null){if(b.callback=null,b=v,typeof C!="function")throw Error(t(191,C));C.call(b)}}}var Oy={},pc=dd(Oy),zy=dd(Oy),Gy=dd(Oy);function uf(d){if(d===Oy)throw Error(t(174));return d}function pC(d,g){switch(ci(Gy,g),ci(zy,d),ci(pc,Oy),d=g.nodeType,d){case 9:case 11:g=(g=g.documentElement)?g.namespaceURI:dn(null,"");break;default:d=d===8?g.parentNode:g,g=d.namespaceURI||null,d=d.tagName,g=dn(g,d)}yi(pc),ci(pc,g)}function kp(){yi(pc),yi(zy),yi(Gy)}function V5(d){uf(Gy.current);var g=uf(pc.current),v=dn(g,d.type);g!==v&&(ci(zy,d),ci(pc,v))}function mC(d){zy.current===d&&(yi(pc),yi(zy))}var Pi=dd(0);function Cw(d){for(var g=d;g!==null;){if(g.tag===13){var v=g.memoizedState;if(v!==null&&(v=v.dehydrated,v===null||v.data==="$?"||v.data==="$!"))return g}else if(g.tag===19&&g.memoizedProps.revealOrder!==void 0){if((g.flags&128)!==0)return g}else if(g.child!==null){g.child.return=g,g=g.child;continue}if(g===d)break;for(;g.sibling===null;){if(g.return===null||g.return===d)return null;g=g.return}g.sibling.return=g.return,g=g.sibling}return null}var yC=[];function vC(){for(var d=0;d<yC.length;d++)yC[d]._workInProgressVersionPrimary=null;yC.length=0}var Aw=A.ReactCurrentDispatcher,xC=A.ReactCurrentBatchConfig,df=0,Ni=null,Ss=null,js=null,Iw=!1,Vy=!1,By=0,$ee=0;function ya(){throw Error(t(321))}function _C(d,g){if(g===null)return!1;for(var v=0;v<g.length&&v<d.length;v++)if(!Il(d[v],g[v]))return!1;return!0}function wC(d,g,v,b,C,N){if(df=N,Ni=g,g.memoizedState=null,g.updateQueue=null,g.lanes=0,Aw.current=d===null||d.memoizedState===null?qee:Xee,d=v(b,C),Vy){N=0;do{if(Vy=!1,By=0,25<=N)throw Error(t(301));N+=1,js=Ss=null,g.updateQueue=null,Aw.current=Yee,d=v(b,C)}while(Vy)}if(Aw.current=Nw,g=Ss!==null&&Ss.next!==null,df=0,js=Ss=Ni=null,Iw=!1,g)throw Error(t(300));return d}function bC(){var d=By!==0;return By=0,d}function mc(){var d={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return js===null?Ni.memoizedState=js=d:js=js.next=d,js}function tl(){if(Ss===null){var d=Ni.alternate;d=d!==null?d.memoizedState:null}else d=Ss.next;var g=js===null?Ni.memoizedState:js.next;if(g!==null)js=g,Ss=d;else{if(d===null)throw Error(t(310));Ss=d,d={memoizedState:Ss.memoizedState,baseState:Ss.baseState,baseQueue:Ss.baseQueue,queue:Ss.queue,next:null},js===null?Ni.memoizedState=js=d:js=js.next=d}return js}function Uy(d,g){return typeof g=="function"?g(d):g}function EC(d){var g=tl(),v=g.queue;if(v===null)throw Error(t(311));v.lastRenderedReducer=d;var b=Ss,C=b.baseQueue,N=v.pending;if(N!==null){if(C!==null){var W=C.next;C.next=N.next,N.next=W}b.baseQueue=C=N,v.pending=null}if(C!==null){N=C.next,b=b.baseState;var le=W=null,pe=null,Oe=N;do{var ut=Oe.lane;if((df&ut)===ut)pe!==null&&(pe=pe.next={lane:0,action:Oe.action,hasEagerState:Oe.hasEagerState,eagerState:Oe.eagerState,next:null}),b=Oe.hasEagerState?Oe.eagerState:d(b,Oe.action);else{var ft={lane:ut,action:Oe.action,hasEagerState:Oe.hasEagerState,eagerState:Oe.eagerState,next:null};pe===null?(le=pe=ft,W=b):pe=pe.next=ft,Ni.lanes|=ut,hf|=ut}Oe=Oe.next}while(Oe!==null&&Oe!==N);pe===null?W=b:pe.next=le,Il(b,g.memoizedState)||(Za=!0),g.memoizedState=b,g.baseState=W,g.baseQueue=pe,v.lastRenderedState=b}if(d=v.interleaved,d!==null){C=d;do N=C.lane,Ni.lanes|=N,hf|=N,C=C.next;while(C!==d)}else C===null&&(v.lanes=0);return[g.memoizedState,v.dispatch]}function SC(d){var g=tl(),v=g.queue;if(v===null)throw Error(t(311));v.lastRenderedReducer=d;var b=v.dispatch,C=v.pending,N=g.memoizedState;if(C!==null){v.pending=null;var W=C=C.next;do N=d(N,W.action),W=W.next;while(W!==C);Il(N,g.memoizedState)||(Za=!0),g.memoizedState=N,g.baseQueue===null&&(g.baseState=N),v.lastRenderedState=N}return[N,b]}function B5(){}function U5(d,g){var v=Ni,b=tl(),C=g(),N=!Il(b.memoizedState,C);if(N&&(b.memoizedState=C,Za=!0),b=b.queue,kC(H5.bind(null,v,b,d),[d]),b.getSnapshot!==g||N||js!==null&&js.memoizedState.tag&1){if(v.flags|=2048,$y(9,W5.bind(null,v,b,C,g),void 0,null),Fs===null)throw Error(t(349));(df&30)!==0||$5(v,g,C)}return C}function $5(d,g,v){d.flags|=16384,d={getSnapshot:g,value:v},g=Ni.updateQueue,g===null?(g={lastEffect:null,stores:null},Ni.updateQueue=g,g.stores=[d]):(v=g.stores,v===null?g.stores=[d]:v.push(d))}function W5(d,g,v,b){g.value=v,g.getSnapshot=b,K5(g)&&q5(d)}function H5(d,g,v){return v(function(){K5(g)&&q5(d)})}function K5(d){var g=d.getSnapshot;d=d.value;try{var v=g();return!Il(d,v)}catch{return!0}}function q5(d){var g=fu(d,1);g!==null&&Ll(g,d,1,-1)}function X5(d){var g=mc();return typeof d=="function"&&(d=d()),g.memoizedState=g.baseState=d,d={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Uy,lastRenderedState:d},g.queue=d,d=d.dispatch=Kee.bind(null,Ni,d),[g.memoizedState,d]}function $y(d,g,v,b){return d={tag:d,create:g,destroy:v,deps:b,next:null},g=Ni.updateQueue,g===null?(g={lastEffect:null,stores:null},Ni.updateQueue=g,g.lastEffect=d.next=d):(v=g.lastEffect,v===null?g.lastEffect=d.next=d:(b=v.next,v.next=d,d.next=b,g.lastEffect=d)),d}function Y5(){return tl().memoizedState}function Rw(d,g,v,b){var C=mc();Ni.flags|=d,C.memoizedState=$y(1|g,v,void 0,b===void 0?null:b)}function Pw(d,g,v,b){var C=tl();b=b===void 0?null:b;var N=void 0;if(Ss!==null){var W=Ss.memoizedState;if(N=W.destroy,b!==null&&_C(b,W.deps)){C.memoizedState=$y(g,v,N,b);return}}Ni.flags|=d,C.memoizedState=$y(1|g,v,N,b)}function Z5(d,g){return Rw(8390656,8,d,g)}function kC(d,g){return Pw(2048,8,d,g)}function J5(d,g){return Pw(4,2,d,g)}function Q5(d,g){return Pw(4,4,d,g)}function eF(d,g){if(typeof g=="function")return d=d(),g(d),function(){g(null)};if(g!=null)return d=d(),g.current=d,function(){g.current=null}}function tF(d,g,v){return v=v!=null?v.concat([d]):null,Pw(4,4,eF.bind(null,g,d),v)}function TC(){}function nF(d,g){var v=tl();g=g===void 0?null:g;var b=v.memoizedState;return b!==null&&g!==null&&_C(g,b[1])?b[0]:(v.memoizedState=[d,g],d)}function rF(d,g){var v=tl();g=g===void 0?null:g;var b=v.memoizedState;return b!==null&&g!==null&&_C(g,b[1])?b[0]:(d=d(),v.memoizedState=[d,g],d)}function iF(d,g,v){return(df&21)===0?(d.baseState&&(d.baseState=!1,Za=!0),d.memoizedState=v):(Il(v,g)||(v=ne(),Ni.lanes|=v,hf|=v,d.baseState=!0),g)}function Wee(d,g){var v=He;He=v!==0&&4>v?v:4,d(!0);var b=xC.transition;xC.transition={};try{d(!1),g()}finally{He=v,xC.transition=b}}function sF(){return tl().memoizedState}function Hee(d,g,v){var b=xd(d);if(v={lane:b,action:v,hasEagerState:!1,eagerState:null,next:null},aF(d))oF(g,v);else if(v=D5(d,g,v,b),v!==null){var C=za();Ll(v,d,b,C),lF(v,g,b)}}function Kee(d,g,v){var b=xd(d),C={lane:b,action:v,hasEagerState:!1,eagerState:null,next:null};if(aF(d))oF(g,C);else{var N=d.alternate;if(d.lanes===0&&(N===null||N.lanes===0)&&(N=g.lastRenderedReducer,N!==null))try{var W=g.lastRenderedState,le=N(W,v);if(C.hasEagerState=!0,C.eagerState=le,Il(le,W)){var pe=g.interleaved;pe===null?(C.next=C,fC(g)):(C.next=pe.next,pe.next=C),g.interleaved=C;return}}catch{}v=D5(d,g,C,b),v!==null&&(C=za(),Ll(v,d,b,C),lF(v,g,b))}}function aF(d){var g=d.alternate;return d===Ni||g!==null&&g===Ni}function oF(d,g){Vy=Iw=!0;var v=d.pending;v===null?g.next=g:(g.next=v.next,v.next=g),d.pending=g}function lF(d,g,v){if((v&4194240)!==0){var b=g.lanes;b&=d.pendingLanes,v|=b,g.lanes=v,ze(d,v)}}var Nw={readContext:el,useCallback:ya,useContext:ya,useEffect:ya,useImperativeHandle:ya,useInsertionEffect:ya,useLayoutEffect:ya,useMemo:ya,useReducer:ya,useRef:ya,useState:ya,useDebugValue:ya,useDeferredValue:ya,useTransition:ya,useMutableSource:ya,useSyncExternalStore:ya,useId:ya,unstable_isNewReconciler:!1},qee={readContext:el,useCallback:function(d,g){return mc().memoizedState=[d,g===void 0?null:g],d},useContext:el,useEffect:Z5,useImperativeHandle:function(d,g,v){return v=v!=null?v.concat([d]):null,Rw(4194308,4,eF.bind(null,g,d),v)},useLayoutEffect:function(d,g){return Rw(4194308,4,d,g)},useInsertionEffect:function(d,g){return Rw(4,2,d,g)},useMemo:function(d,g){var v=mc();return g=g===void 0?null:g,d=d(),v.memoizedState=[d,g],d},useReducer:function(d,g,v){var b=mc();return g=v!==void 0?v(g):g,b.memoizedState=b.baseState=g,d={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:d,lastRenderedState:g},b.queue=d,d=d.dispatch=Hee.bind(null,Ni,d),[b.memoizedState,d]},useRef:function(d){var g=mc();return d={current:d},g.memoizedState=d},useState:X5,useDebugValue:TC,useDeferredValue:function(d){return mc().memoizedState=d},useTransition:function(){var d=X5(!1),g=d[0];return d=Wee.bind(null,d[1]),mc().memoizedState=d,[g,d]},useMutableSource:function(){},useSyncExternalStore:function(d,g,v){var b=Ni,C=mc();if(Si){if(v===void 0)throw Error(t(407));v=v()}else{if(v=g(),Fs===null)throw Error(t(349));(df&30)!==0||$5(b,g,v)}C.memoizedState=v;var N={value:v,getSnapshot:g};return C.queue=N,Z5(H5.bind(null,b,N,d),[d]),b.flags|=2048,$y(9,W5.bind(null,b,N,v,g),void 0,null),v},useId:function(){var d=mc(),g=Fs.identifierPrefix;if(Si){var v=hu,b=du;v=(b&~(1<<32-Ut(b)-1)).toString(32)+v,g=":"+g+"R"+v,v=By++,0<v&&(g+="H"+v.toString(32)),g+=":"}else v=$ee++,g=":"+g+"r"+v.toString(32)+":";return d.memoizedState=g},unstable_isNewReconciler:!1},Xee={readContext:el,useCallback:nF,useContext:el,useEffect:kC,useImperativeHandle:tF,useInsertionEffect:J5,useLayoutEffect:Q5,useMemo:rF,useReducer:EC,useRef:Y5,useState:function(){return EC(Uy)},useDebugValue:TC,useDeferredValue:function(d){var g=tl();return iF(g,Ss.memoizedState,d)},useTransition:function(){var d=EC(Uy)[0],g=tl().memoizedState;return[d,g]},useMutableSource:B5,useSyncExternalStore:U5,useId:sF,unstable_isNewReconciler:!1},Yee={readContext:el,useCallback:nF,useContext:el,useEffect:kC,useImperativeHandle:tF,useInsertionEffect:J5,useLayoutEffect:Q5,useMemo:rF,useReducer:SC,useRef:Y5,useState:function(){return SC(Uy)},useDebugValue:TC,useDeferredValue:function(d){var g=tl();return Ss===null?g.memoizedState=d:iF(g,Ss.memoizedState,d)},useTransition:function(){var d=SC(Uy)[0],g=tl().memoizedState;return[d,g]},useMutableSource:B5,useSyncExternalStore:U5,useId:sF,unstable_isNewReconciler:!1};function Pl(d,g){if(d&&d.defaultProps){g=ue({},g),d=d.defaultProps;for(var v in d)g[v]===void 0&&(g[v]=d[v]);return g}return g}function CC(d,g,v,b){g=d.memoizedState,v=v(b,g),v=v==null?g:ue({},g,v),d.memoizedState=v,d.lanes===0&&(d.updateQueue.baseState=v)}var Mw={isMounted:function(d){return(d=d._reactInternals)?re(d)===d:!1},enqueueSetState:function(d,g,v){d=d._reactInternals;var b=za(),C=xd(d),N=gu(b,C);N.payload=g,v!=null&&(N.callback=v),g=pd(d,N,C),g!==null&&(Ll(g,d,C,b),kw(g,d,C))},enqueueReplaceState:function(d,g,v){d=d._reactInternals;var b=za(),C=xd(d),N=gu(b,C);N.tag=1,N.payload=g,v!=null&&(N.callback=v),g=pd(d,N,C),g!==null&&(Ll(g,d,C,b),kw(g,d,C))},enqueueForceUpdate:function(d,g){d=d._reactInternals;var v=za(),b=xd(d),C=gu(v,b);C.tag=2,g!=null&&(C.callback=g),g=pd(d,C,b),g!==null&&(Ll(g,d,b,v),kw(g,d,b))}};function cF(d,g,v,b,C,N,W){return d=d.stateNode,typeof d.shouldComponentUpdate=="function"?d.shouldComponentUpdate(b,N,W):g.prototype&&g.prototype.isPureReactComponent?!Ry(v,b)||!Ry(C,N):!0}function uF(d,g,v){var b=!1,C=hd,N=g.contextType;return typeof N=="object"&&N!==null?N=el(N):(C=Ya(g)?af:ma.current,b=g.contextTypes,N=(b=b!=null)?vp(d,C):hd),g=new g(v,N),d.memoizedState=g.state!==null&&g.state!==void 0?g.state:null,g.updater=Mw,d.stateNode=g,g._reactInternals=d,b&&(d=d.stateNode,d.__reactInternalMemoizedUnmaskedChildContext=C,d.__reactInternalMemoizedMaskedChildContext=N),g}function dF(d,g,v,b){d=g.state,typeof g.componentWillReceiveProps=="function"&&g.componentWillReceiveProps(v,b),typeof g.UNSAFE_componentWillReceiveProps=="function"&&g.UNSAFE_componentWillReceiveProps(v,b),g.state!==d&&Mw.enqueueReplaceState(g,g.state,null)}function AC(d,g,v,b){var C=d.stateNode;C.props=v,C.state=d.memoizedState,C.refs={},gC(d);var N=g.contextType;typeof N=="object"&&N!==null?C.context=el(N):(N=Ya(g)?af:ma.current,C.context=vp(d,N)),C.state=d.memoizedState,N=g.getDerivedStateFromProps,typeof N=="function"&&(CC(d,g,N,v),C.state=d.memoizedState),typeof g.getDerivedStateFromProps=="function"||typeof C.getSnapshotBeforeUpdate=="function"||typeof C.UNSAFE_componentWillMount!="function"&&typeof C.componentWillMount!="function"||(g=C.state,typeof C.componentWillMount=="function"&&C.componentWillMount(),typeof C.UNSAFE_componentWillMount=="function"&&C.UNSAFE_componentWillMount(),g!==C.state&&Mw.enqueueReplaceState(C,C.state,null),Tw(d,v,C,b),C.state=d.memoizedState),typeof C.componentDidMount=="function"&&(d.flags|=4194308)}function Tp(d,g){try{var v="",b=g;do v+=J(b),b=b.return;while(b);var C=v}catch(N){C=`
Error generating stack: `+N.message+`
`+N.stack}return{value:d,source:g,stack:C,digest:null}}function IC(d,g,v){return{value:d,source:null,stack:v??null,digest:g??null}}function RC(d,g){try{console.error(g.value)}catch(v){setTimeout(function(){throw v})}}var Zee=typeof WeakMap=="function"?WeakMap:Map;function hF(d,g,v){v=gu(-1,v),v.tag=3,v.payload={element:null};var b=g.value;return v.callback=function(){Gw||(Gw=!0,WC=b),RC(d,g)},v}function fF(d,g,v){v=gu(-1,v),v.tag=3;var b=d.type.getDerivedStateFromError;if(typeof b=="function"){var C=g.value;v.payload=function(){return b(C)},v.callback=function(){RC(d,g)}}var N=d.stateNode;return N!==null&&typeof N.componentDidCatch=="function"&&(v.callback=function(){RC(d,g),typeof b!="function"&&(yd===null?yd=new Set([this]):yd.add(this));var W=g.stack;this.componentDidCatch(g.value,{componentStack:W!==null?W:""})}),v}function gF(d,g,v){var b=d.pingCache;if(b===null){b=d.pingCache=new Zee;var C=new Set;b.set(g,C)}else C=b.get(g),C===void 0&&(C=new Set,b.set(g,C));C.has(v)||(C.add(v),d=dte.bind(null,d,g,v),g.then(d,d))}function pF(d){do{var g;if((g=d.tag===13)&&(g=d.memoizedState,g=g!==null?g.dehydrated!==null:!0),g)return d;d=d.return}while(d!==null);return null}function mF(d,g,v,b,C){return(d.mode&1)===0?(d===g?d.flags|=65536:(d.flags|=128,v.flags|=131072,v.flags&=-52805,v.tag===1&&(v.alternate===null?v.tag=17:(g=gu(-1,1),g.tag=2,pd(v,g,1))),v.lanes|=1),d):(d.flags|=65536,d.lanes=C,d)}var Jee=A.ReactCurrentOwner,Za=!1;function Oa(d,g,v,b){g.child=d===null?F5(g,null,v,b):bp(g,d.child,v,b)}function yF(d,g,v,b,C){v=v.render;var N=g.ref;return Sp(g,C),b=wC(d,g,v,b,N,C),v=bC(),d!==null&&!Za?(g.updateQueue=d.updateQueue,g.flags&=-2053,d.lanes&=~C,pu(d,g,C)):(Si&&v&&iC(g),g.flags|=1,Oa(d,g,b,C),g.child)}function vF(d,g,v,b,C){if(d===null){var N=v.type;return typeof N=="function"&&!JC(N)&&N.defaultProps===void 0&&v.compare===null&&v.defaultProps===void 0?(g.tag=15,g.type=N,xF(d,g,N,b,C)):(d=Hw(v.type,null,b,g,g.mode,C),d.ref=g.ref,d.return=g,g.child=d)}if(N=d.child,(d.lanes&C)===0){var W=N.memoizedProps;if(v=v.compare,v=v!==null?v:Ry,v(W,b)&&d.ref===g.ref)return pu(d,g,C)}return g.flags|=1,d=wd(N,b),d.ref=g.ref,d.return=g,g.child=d}function xF(d,g,v,b,C){if(d!==null){var N=d.memoizedProps;if(Ry(N,b)&&d.ref===g.ref)if(Za=!1,g.pendingProps=b=N,(d.lanes&C)!==0)(d.flags&131072)!==0&&(Za=!0);else return g.lanes=d.lanes,pu(d,g,C)}return PC(d,g,v,b,C)}function _F(d,g,v){var b=g.pendingProps,C=b.children,N=d!==null?d.memoizedState:null;if(b.mode==="hidden")if((g.mode&1)===0)g.memoizedState={baseLanes:0,cachePool:null,transitions:null},ci(Ap,Ao),Ao|=v;else{if((v&1073741824)===0)return d=N!==null?N.baseLanes|v:v,g.lanes=g.childLanes=1073741824,g.memoizedState={baseLanes:d,cachePool:null,transitions:null},g.updateQueue=null,ci(Ap,Ao),Ao|=d,null;g.memoizedState={baseLanes:0,cachePool:null,transitions:null},b=N!==null?N.baseLanes:v,ci(Ap,Ao),Ao|=b}else N!==null?(b=N.baseLanes|v,g.memoizedState=null):b=v,ci(Ap,Ao),Ao|=b;return Oa(d,g,C,v),g.child}function wF(d,g){var v=g.ref;(d===null&&v!==null||d!==null&&d.ref!==v)&&(g.flags|=512,g.flags|=2097152)}function PC(d,g,v,b,C){var N=Ya(v)?af:ma.current;return N=vp(g,N),Sp(g,C),v=wC(d,g,v,b,N,C),b=bC(),d!==null&&!Za?(g.updateQueue=d.updateQueue,g.flags&=-2053,d.lanes&=~C,pu(d,g,C)):(Si&&b&&iC(g),g.flags|=1,Oa(d,g,v,C),g.child)}function bF(d,g,v,b,C){if(Ya(v)){var N=!0;yw(g)}else N=!1;if(Sp(g,C),g.stateNode===null)jw(d,g),uF(g,v,b),AC(g,v,b,C),b=!0;else if(d===null){var W=g.stateNode,le=g.memoizedProps;W.props=le;var pe=W.context,Oe=v.contextType;typeof Oe=="object"&&Oe!==null?Oe=el(Oe):(Oe=Ya(v)?af:ma.current,Oe=vp(g,Oe));var ut=v.getDerivedStateFromProps,ft=typeof ut=="function"||typeof W.getSnapshotBeforeUpdate=="function";ft||typeof W.UNSAFE_componentWillReceiveProps!="function"&&typeof W.componentWillReceiveProps!="function"||(le!==b||pe!==Oe)&&dF(g,W,b,Oe),gd=!1;var ot=g.memoizedState;W.state=ot,Tw(g,b,W,C),pe=g.memoizedState,le!==b||ot!==pe||Xa.current||gd?(typeof ut=="function"&&(CC(g,v,ut,b),pe=g.memoizedState),(le=gd||cF(g,v,le,b,ot,pe,Oe))?(ft||typeof W.UNSAFE_componentWillMount!="function"&&typeof W.componentWillMount!="function"||(typeof W.componentWillMount=="function"&&W.componentWillMount(),typeof W.UNSAFE_componentWillMount=="function"&&W.UNSAFE_componentWillMount()),typeof W.componentDidMount=="function"&&(g.flags|=4194308)):(typeof W.componentDidMount=="function"&&(g.flags|=4194308),g.memoizedProps=b,g.memoizedState=pe),W.props=b,W.state=pe,W.context=Oe,b=le):(typeof W.componentDidMount=="function"&&(g.flags|=4194308),b=!1)}else{W=g.stateNode,O5(d,g),le=g.memoizedProps,Oe=g.type===g.elementType?le:Pl(g.type,le),W.props=Oe,ft=g.pendingProps,ot=W.context,pe=v.contextType,typeof pe=="object"&&pe!==null?pe=el(pe):(pe=Ya(v)?af:ma.current,pe=vp(g,pe));var Gt=v.getDerivedStateFromProps;(ut=typeof Gt=="function"||typeof W.getSnapshotBeforeUpdate=="function")||typeof W.UNSAFE_componentWillReceiveProps!="function"&&typeof W.componentWillReceiveProps!="function"||(le!==ft||ot!==pe)&&dF(g,W,b,pe),gd=!1,ot=g.memoizedState,W.state=ot,Tw(g,b,W,C);var Xt=g.memoizedState;le!==ft||ot!==Xt||Xa.current||gd?(typeof Gt=="function"&&(CC(g,v,Gt,b),Xt=g.memoizedState),(Oe=gd||cF(g,v,Oe,b,ot,Xt,pe)||!1)?(ut||typeof W.UNSAFE_componentWillUpdate!="function"&&typeof W.componentWillUpdate!="function"||(typeof W.componentWillUpdate=="function"&&W.componentWillUpdate(b,Xt,pe),typeof W.UNSAFE_componentWillUpdate=="function"&&W.UNSAFE_componentWillUpdate(b,Xt,pe)),typeof W.componentDidUpdate=="function"&&(g.flags|=4),typeof W.getSnapshotBeforeUpdate=="function"&&(g.flags|=1024)):(typeof W.componentDidUpdate!="function"||le===d.memoizedProps&&ot===d.memoizedState||(g.flags|=4),typeof W.getSnapshotBeforeUpdate!="function"||le===d.memoizedProps&&ot===d.memoizedState||(g.flags|=1024),g.memoizedProps=b,g.memoizedState=Xt),W.props=b,W.state=Xt,W.context=pe,b=Oe):(typeof W.componentDidUpdate!="function"||le===d.memoizedProps&&ot===d.memoizedState||(g.flags|=4),typeof W.getSnapshotBeforeUpdate!="function"||le===d.memoizedProps&&ot===d.memoizedState||(g.flags|=1024),b=!1)}return NC(d,g,v,b,N,C)}function NC(d,g,v,b,C,N){wF(d,g);var W=(g.flags&128)!==0;if(!b&&!W)return C&&C5(g,v,!1),pu(d,g,N);b=g.stateNode,Jee.current=g;var le=W&&typeof v.getDerivedStateFromError!="function"?null:b.render();return g.flags|=1,d!==null&&W?(g.child=bp(g,d.child,null,N),g.child=bp(g,null,le,N)):Oa(d,g,le,N),g.memoizedState=b.state,C&&C5(g,v,!0),g.child}function EF(d){var g=d.stateNode;g.pendingContext?k5(d,g.pendingContext,g.pendingContext!==g.context):g.context&&k5(d,g.context,!1),pC(d,g.containerInfo)}function SF(d,g,v,b,C){return wp(),lC(C),g.flags|=256,Oa(d,g,v,b),g.child}var MC={dehydrated:null,treeContext:null,retryLane:0};function LC(d){return{baseLanes:d,cachePool:null,transitions:null}}function kF(d,g,v){var b=g.pendingProps,C=Pi.current,N=!1,W=(g.flags&128)!==0,le;if((le=W)||(le=d!==null&&d.memoizedState===null?!1:(C&2)!==0),le?(N=!0,g.flags&=-129):(d===null||d.memoizedState!==null)&&(C|=1),ci(Pi,C&1),d===null)return oC(g),d=g.memoizedState,d!==null&&(d=d.dehydrated,d!==null)?((g.mode&1)===0?g.lanes=1:d.data==="$!"?g.lanes=8:g.lanes=1073741824,null):(W=b.children,d=b.fallback,N?(b=g.mode,N=g.child,W={mode:"hidden",children:W},(b&1)===0&&N!==null?(N.childLanes=0,N.pendingProps=W):N=Kw(W,b,0,null),d=mf(d,b,v,null),N.return=g,d.return=g,N.sibling=d,g.child=N,g.child.memoizedState=LC(v),g.memoizedState=MC,d):jC(g,W));if(C=d.memoizedState,C!==null&&(le=C.dehydrated,le!==null))return Qee(d,g,W,b,le,C,v);if(N){N=b.fallback,W=g.mode,C=d.child,le=C.sibling;var pe={mode:"hidden",children:b.children};return(W&1)===0&&g.child!==C?(b=g.child,b.childLanes=0,b.pendingProps=pe,g.deletions=null):(b=wd(C,pe),b.subtreeFlags=C.subtreeFlags&14680064),le!==null?N=wd(le,N):(N=mf(N,W,v,null),N.flags|=2),N.return=g,b.return=g,b.sibling=N,g.child=b,b=N,N=g.child,W=d.child.memoizedState,W=W===null?LC(v):{baseLanes:W.baseLanes|v,cachePool:null,transitions:W.transitions},N.memoizedState=W,N.childLanes=d.childLanes&~v,g.memoizedState=MC,b}return N=d.child,d=N.sibling,b=wd(N,{mode:"visible",children:b.children}),(g.mode&1)===0&&(b.lanes=v),b.return=g,b.sibling=null,d!==null&&(v=g.deletions,v===null?(g.deletions=[d],g.flags|=16):v.push(d)),g.child=b,g.memoizedState=null,b}function jC(d,g){return g=Kw({mode:"visible",children:g},d.mode,0,null),g.return=d,d.child=g}function Lw(d,g,v,b){return b!==null&&lC(b),bp(g,d.child,null,v),d=jC(g,g.pendingProps.children),d.flags|=2,g.memoizedState=null,d}function Qee(d,g,v,b,C,N,W){if(v)return g.flags&256?(g.flags&=-257,b=IC(Error(t(422))),Lw(d,g,W,b)):g.memoizedState!==null?(g.child=d.child,g.flags|=128,null):(N=b.fallback,C=g.mode,b=Kw({mode:"visible",children:b.children},C,0,null),N=mf(N,C,W,null),N.flags|=2,b.return=g,N.return=g,b.sibling=N,g.child=b,(g.mode&1)!==0&&bp(g,d.child,null,W),g.child.memoizedState=LC(W),g.memoizedState=MC,N);if((g.mode&1)===0)return Lw(d,g,W,null);if(C.data==="$!"){if(b=C.nextSibling&&C.nextSibling.dataset,b)var le=b.dgst;return b=le,N=Error(t(419)),b=IC(N,b,void 0),Lw(d,g,W,b)}if(le=(W&d.childLanes)!==0,Za||le){if(b=Fs,b!==null){switch(W&-W){case 4:C=2;break;case 16:C=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:C=32;break;case 536870912:C=268435456;break;default:C=0}C=(C&(b.suspendedLanes|W))!==0?0:C,C!==0&&C!==N.retryLane&&(N.retryLane=C,fu(d,C),Ll(b,d,C,-1))}return ZC(),b=IC(Error(t(421))),Lw(d,g,W,b)}return C.data==="$?"?(g.flags|=128,g.child=d.child,g=hte.bind(null,d),C._reactRetry=g,null):(d=N.treeContext,Co=ud(C.nextSibling),To=g,Si=!0,Rl=null,d!==null&&(Jo[Qo++]=du,Jo[Qo++]=hu,Jo[Qo++]=of,du=d.id,hu=d.overflow,of=g),g=jC(g,b.children),g.flags|=4096,g)}function TF(d,g,v){d.lanes|=g;var b=d.alternate;b!==null&&(b.lanes|=g),hC(d.return,g,v)}function FC(d,g,v,b,C){var N=d.memoizedState;N===null?d.memoizedState={isBackwards:g,rendering:null,renderingStartTime:0,last:b,tail:v,tailMode:C}:(N.isBackwards=g,N.rendering=null,N.renderingStartTime=0,N.last=b,N.tail=v,N.tailMode=C)}function CF(d,g,v){var b=g.pendingProps,C=b.revealOrder,N=b.tail;if(Oa(d,g,b.children,v),b=Pi.current,(b&2)!==0)b=b&1|2,g.flags|=128;else{if(d!==null&&(d.flags&128)!==0)e:for(d=g.child;d!==null;){if(d.tag===13)d.memoizedState!==null&&TF(d,v,g);else if(d.tag===19)TF(d,v,g);else if(d.child!==null){d.child.return=d,d=d.child;continue}if(d===g)break e;for(;d.sibling===null;){if(d.return===null||d.return===g)break e;d=d.return}d.sibling.return=d.return,d=d.sibling}b&=1}if(ci(Pi,b),(g.mode&1)===0)g.memoizedState=null;else switch(C){case"forwards":for(v=g.child,C=null;v!==null;)d=v.alternate,d!==null&&Cw(d)===null&&(C=v),v=v.sibling;v=C,v===null?(C=g.child,g.child=null):(C=v.sibling,v.sibling=null),FC(g,!1,C,v,N);break;case"backwards":for(v=null,C=g.child,g.child=null;C!==null;){if(d=C.alternate,d!==null&&Cw(d)===null){g.child=C;break}d=C.sibling,C.sibling=v,v=C,C=d}FC(g,!0,v,null,N);break;case"together":FC(g,!1,null,null,void 0);break;default:g.memoizedState=null}return g.child}function jw(d,g){(g.mode&1)===0&&d!==null&&(d.alternate=null,g.alternate=null,g.flags|=2)}function pu(d,g,v){if(d!==null&&(g.dependencies=d.dependencies),hf|=g.lanes,(v&g.childLanes)===0)return null;if(d!==null&&g.child!==d.child)throw Error(t(153));if(g.child!==null){for(d=g.child,v=wd(d,d.pendingProps),g.child=v,v.return=g;d.sibling!==null;)d=d.sibling,v=v.sibling=wd(d,d.pendingProps),v.return=g;v.sibling=null}return g.child}function ete(d,g,v){switch(g.tag){case 3:EF(g),wp();break;case 5:V5(g);break;case 1:Ya(g.type)&&yw(g);break;case 4:pC(g,g.stateNode.containerInfo);break;case 10:var b=g.type._context,C=g.memoizedProps.value;ci(Ew,b._currentValue),b._currentValue=C;break;case 13:if(b=g.memoizedState,b!==null)return b.dehydrated!==null?(ci(Pi,Pi.current&1),g.flags|=128,null):(v&g.child.childLanes)!==0?kF(d,g,v):(ci(Pi,Pi.current&1),d=pu(d,g,v),d!==null?d.sibling:null);ci(Pi,Pi.current&1);break;case 19:if(b=(v&g.childLanes)!==0,(d.flags&128)!==0){if(b)return CF(d,g,v);g.flags|=128}if(C=g.memoizedState,C!==null&&(C.rendering=null,C.tail=null,C.lastEffect=null),ci(Pi,Pi.current),b)break;return null;case 22:case 23:return g.lanes=0,_F(d,g,v)}return pu(d,g,v)}var AF,DC,IF,RF;AF=function(d,g){for(var v=g.child;v!==null;){if(v.tag===5||v.tag===6)d.appendChild(v.stateNode);else if(v.tag!==4&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===g)break;for(;v.sibling===null;){if(v.return===null||v.return===g)return;v=v.return}v.sibling.return=v.return,v=v.sibling}},DC=function(){},IF=function(d,g,v,b){var C=d.memoizedProps;if(C!==b){d=g.stateNode,uf(pc.current);var N=null;switch(v){case"input":C=wt(d,C),b=wt(d,b),N=[];break;case"select":C=ue({},C,{value:void 0}),b=ue({},b,{value:void 0}),N=[];break;case"textarea":C=Pr(d,C),b=Pr(d,b),N=[];break;default:typeof C.onClick!="function"&&typeof b.onClick=="function"&&(d.onclick=gw)}ar(v,b);var W;v=null;for(Oe in C)if(!b.hasOwnProperty(Oe)&&C.hasOwnProperty(Oe)&&C[Oe]!=null)if(Oe==="style"){var le=C[Oe];for(W in le)le.hasOwnProperty(W)&&(v||(v={}),v[W]="")}else Oe!=="dangerouslySetInnerHTML"&&Oe!=="children"&&Oe!=="suppressContentEditableWarning"&&Oe!=="suppressHydrationWarning"&&Oe!=="autoFocus"&&(i.hasOwnProperty(Oe)?N||(N=[]):(N=N||[]).push(Oe,null));for(Oe in b){var pe=b[Oe];if(le=C?.[Oe],b.hasOwnProperty(Oe)&&pe!==le&&(pe!=null||le!=null))if(Oe==="style")if(le){for(W in le)!le.hasOwnProperty(W)||pe&&pe.hasOwnProperty(W)||(v||(v={}),v[W]="");for(W in pe)pe.hasOwnProperty(W)&&le[W]!==pe[W]&&(v||(v={}),v[W]=pe[W])}else v||(N||(N=[]),N.push(Oe,v)),v=pe;else Oe==="dangerouslySetInnerHTML"?(pe=pe?pe.__html:void 0,le=le?le.__html:void 0,pe!=null&&le!==pe&&(N=N||[]).push(Oe,pe)):Oe==="children"?typeof pe!="string"&&typeof pe!="number"||(N=N||[]).push(Oe,""+pe):Oe!=="suppressContentEditableWarning"&&Oe!=="suppressHydrationWarning"&&(i.hasOwnProperty(Oe)?(pe!=null&&Oe==="onScroll"&&mi("scroll",d),N||le===pe||(N=[])):(N=N||[]).push(Oe,pe))}v&&(N=N||[]).push("style",v);var Oe=N;(g.updateQueue=Oe)&&(g.flags|=4)}},RF=function(d,g,v,b){v!==b&&(g.flags|=4)};function Wy(d,g){if(!Si)switch(d.tailMode){case"hidden":g=d.tail;for(var v=null;g!==null;)g.alternate!==null&&(v=g),g=g.sibling;v===null?d.tail=null:v.sibling=null;break;case"collapsed":v=d.tail;for(var b=null;v!==null;)v.alternate!==null&&(b=v),v=v.sibling;b===null?g||d.tail===null?d.tail=null:d.tail.sibling=null:b.sibling=null}}function va(d){var g=d.alternate!==null&&d.alternate.child===d.child,v=0,b=0;if(g)for(var C=d.child;C!==null;)v|=C.lanes|C.childLanes,b|=C.subtreeFlags&14680064,b|=C.flags&14680064,C.return=d,C=C.sibling;else for(C=d.child;C!==null;)v|=C.lanes|C.childLanes,b|=C.subtreeFlags,b|=C.flags,C.return=d,C=C.sibling;return d.subtreeFlags|=b,d.childLanes=v,g}function tte(d,g,v){var b=g.pendingProps;switch(sC(g),g.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return va(g),null;case 1:return Ya(g.type)&&mw(),va(g),null;case 3:return b=g.stateNode,kp(),yi(Xa),yi(ma),vC(),b.pendingContext&&(b.context=b.pendingContext,b.pendingContext=null),(d===null||d.child===null)&&(ww(g)?g.flags|=4:d===null||d.memoizedState.isDehydrated&&(g.flags&256)===0||(g.flags|=1024,Rl!==null&&(qC(Rl),Rl=null))),DC(d,g),va(g),null;case 5:mC(g);var C=uf(Gy.current);if(v=g.type,d!==null&&g.stateNode!=null)IF(d,g,v,b,C),d.ref!==g.ref&&(g.flags|=512,g.flags|=2097152);else{if(!b){if(g.stateNode===null)throw Error(t(166));return va(g),null}if(d=uf(pc.current),ww(g)){b=g.stateNode,v=g.type;var N=g.memoizedProps;switch(b[gc]=g,b[jy]=N,d=(g.mode&1)!==0,v){case"dialog":mi("cancel",b),mi("close",b);break;case"iframe":case"object":case"embed":mi("load",b);break;case"video":case"audio":for(C=0;C<Ny.length;C++)mi(Ny[C],b);break;case"source":mi("error",b);break;case"img":case"image":case"link":mi("error",b),mi("load",b);break;case"details":mi("toggle",b);break;case"input":_n(b,N),mi("invalid",b);break;case"select":b._wrapperState={wasMultiple:!!N.multiple},mi("invalid",b);break;case"textarea":tt(b,N),mi("invalid",b)}ar(v,N),C=null;for(var W in N)if(N.hasOwnProperty(W)){var le=N[W];W==="children"?typeof le=="string"?b.textContent!==le&&(N.suppressHydrationWarning!==!0&&fw(b.textContent,le,d),C=["children",le]):typeof le=="number"&&b.textContent!==""+le&&(N.suppressHydrationWarning!==!0&&fw(b.textContent,le,d),C=["children",""+le]):i.hasOwnProperty(W)&&le!=null&&W==="onScroll"&&mi("scroll",b)}switch(v){case"input":_t(b),Qt(b,N,!0);break;case"textarea":_t(b),rn(b);break;case"select":case"option":break;default:typeof N.onClick=="function"&&(b.onclick=gw)}b=C,g.updateQueue=b,b!==null&&(g.flags|=4)}else{W=C.nodeType===9?C:C.ownerDocument,d==="http://www.w3.org/1999/xhtml"&&(d=en(v)),d==="http://www.w3.org/1999/xhtml"?v==="script"?(d=W.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild)):typeof b.is=="string"?d=W.createElement(v,{is:b.is}):(d=W.createElement(v),v==="select"&&(W=d,b.multiple?W.multiple=!0:b.size&&(W.size=b.size))):d=W.createElementNS(d,v),d[gc]=g,d[jy]=b,AF(d,g,!1,!1),g.stateNode=d;e:{switch(W=gr(v,b),v){case"dialog":mi("cancel",d),mi("close",d),C=b;break;case"iframe":case"object":case"embed":mi("load",d),C=b;break;case"video":case"audio":for(C=0;C<Ny.length;C++)mi(Ny[C],d);C=b;break;case"source":mi("error",d),C=b;break;case"img":case"image":case"link":mi("error",d),mi("load",d),C=b;break;case"details":mi("toggle",d),C=b;break;case"input":_n(d,b),C=wt(d,b),mi("invalid",d);break;case"option":C=b;break;case"select":d._wrapperState={wasMultiple:!!b.multiple},C=ue({},b,{value:void 0}),mi("invalid",d);break;case"textarea":tt(d,b),C=Pr(d,b),mi("invalid",d);break;default:C=b}ar(v,C),le=C;for(N in le)if(le.hasOwnProperty(N)){var pe=le[N];N==="style"?rr(d,pe):N==="dangerouslySetInnerHTML"?(pe=pe?pe.__html:void 0,pe!=null&&gn(d,pe)):N==="children"?typeof pe=="string"?(v!=="textarea"||pe!=="")&&$n(d,pe):typeof pe=="number"&&$n(d,""+pe):N!=="suppressContentEditableWarning"&&N!=="suppressHydrationWarning"&&N!=="autoFocus"&&(i.hasOwnProperty(N)?pe!=null&&N==="onScroll"&&mi("scroll",d):pe!=null&&k(d,N,pe,W))}switch(v){case"input":_t(d),Qt(d,b,!1);break;case"textarea":_t(d),rn(d);break;case"option":b.value!=null&&d.setAttribute("value",""+De(b.value));break;case"select":d.multiple=!!b.multiple,N=b.value,N!=null?Pn(d,!!b.multiple,N,!1):b.defaultValue!=null&&Pn(d,!!b.multiple,b.defaultValue,!0);break;default:typeof C.onClick=="function"&&(d.onclick=gw)}switch(v){case"button":case"input":case"select":case"textarea":b=!!b.autoFocus;break e;case"img":b=!0;break e;default:b=!1}}b&&(g.flags|=4)}g.ref!==null&&(g.flags|=512,g.flags|=2097152)}return va(g),null;case 6:if(d&&g.stateNode!=null)RF(d,g,d.memoizedProps,b);else{if(typeof b!="string"&&g.stateNode===null)throw Error(t(166));if(v=uf(Gy.current),uf(pc.current),ww(g)){if(b=g.stateNode,v=g.memoizedProps,b[gc]=g,(N=b.nodeValue!==v)&&(d=To,d!==null))switch(d.tag){case 3:fw(b.nodeValue,v,(d.mode&1)!==0);break;case 5:d.memoizedProps.suppressHydrationWarning!==!0&&fw(b.nodeValue,v,(d.mode&1)!==0)}N&&(g.flags|=4)}else b=(v.nodeType===9?v:v.ownerDocument).createTextNode(b),b[gc]=g,g.stateNode=b}return va(g),null;case 13:if(yi(Pi),b=g.memoizedState,d===null||d.memoizedState!==null&&d.memoizedState.dehydrated!==null){if(Si&&Co!==null&&(g.mode&1)!==0&&(g.flags&128)===0)M5(),wp(),g.flags|=98560,N=!1;else if(N=ww(g),b!==null&&b.dehydrated!==null){if(d===null){if(!N)throw Error(t(318));if(N=g.memoizedState,N=N!==null?N.dehydrated:null,!N)throw Error(t(317));N[gc]=g}else wp(),(g.flags&128)===0&&(g.memoizedState=null),g.flags|=4;va(g),N=!1}else Rl!==null&&(qC(Rl),Rl=null),N=!0;if(!N)return g.flags&65536?g:null}return(g.flags&128)!==0?(g.lanes=v,g):(b=b!==null,b!==(d!==null&&d.memoizedState!==null)&&b&&(g.child.flags|=8192,(g.mode&1)!==0&&(d===null||(Pi.current&1)!==0?ks===0&&(ks=3):ZC())),g.updateQueue!==null&&(g.flags|=4),va(g),null);case 4:return kp(),DC(d,g),d===null&&My(g.stateNode.containerInfo),va(g),null;case 10:return dC(g.type._context),va(g),null;case 17:return Ya(g.type)&&mw(),va(g),null;case 19:if(yi(Pi),N=g.memoizedState,N===null)return va(g),null;if(b=(g.flags&128)!==0,W=N.rendering,W===null)if(b)Wy(N,!1);else{if(ks!==0||d!==null&&(d.flags&128)!==0)for(d=g.child;d!==null;){if(W=Cw(d),W!==null){for(g.flags|=128,Wy(N,!1),b=W.updateQueue,b!==null&&(g.updateQueue=b,g.flags|=4),g.subtreeFlags=0,b=v,v=g.child;v!==null;)N=v,d=b,N.flags&=14680066,W=N.alternate,W===null?(N.childLanes=0,N.lanes=d,N.child=null,N.subtreeFlags=0,N.memoizedProps=null,N.memoizedState=null,N.updateQueue=null,N.dependencies=null,N.stateNode=null):(N.childLanes=W.childLanes,N.lanes=W.lanes,N.child=W.child,N.subtreeFlags=0,N.deletions=null,N.memoizedProps=W.memoizedProps,N.memoizedState=W.memoizedState,N.updateQueue=W.updateQueue,N.type=W.type,d=W.dependencies,N.dependencies=d===null?null:{lanes:d.lanes,firstContext:d.firstContext}),v=v.sibling;return ci(Pi,Pi.current&1|2),g.child}d=d.sibling}N.tail!==null&&Be()>Ip&&(g.flags|=128,b=!0,Wy(N,!1),g.lanes=4194304)}else{if(!b)if(d=Cw(W),d!==null){if(g.flags|=128,b=!0,v=d.updateQueue,v!==null&&(g.updateQueue=v,g.flags|=4),Wy(N,!0),N.tail===null&&N.tailMode==="hidden"&&!W.alternate&&!Si)return va(g),null}else 2*Be()-N.renderingStartTime>Ip&&v!==1073741824&&(g.flags|=128,b=!0,Wy(N,!1),g.lanes=4194304);N.isBackwards?(W.sibling=g.child,g.child=W):(v=N.last,v!==null?v.sibling=W:g.child=W,N.last=W)}return N.tail!==null?(g=N.tail,N.rendering=g,N.tail=g.sibling,N.renderingStartTime=Be(),g.sibling=null,v=Pi.current,ci(Pi,b?v&1|2:v&1),g):(va(g),null);case 22:case 23:return YC(),b=g.memoizedState!==null,d!==null&&d.memoizedState!==null!==b&&(g.flags|=8192),b&&(g.mode&1)!==0?(Ao&1073741824)!==0&&(va(g),g.subtreeFlags&6&&(g.flags|=8192)):va(g),null;case 24:return null;case 25:return null}throw Error(t(156,g.tag))}function nte(d,g){switch(sC(g),g.tag){case 1:return Ya(g.type)&&mw(),d=g.flags,d&65536?(g.flags=d&-65537|128,g):null;case 3:return kp(),yi(Xa),yi(ma),vC(),d=g.flags,(d&65536)!==0&&(d&128)===0?(g.flags=d&-65537|128,g):null;case 5:return mC(g),null;case 13:if(yi(Pi),d=g.memoizedState,d!==null&&d.dehydrated!==null){if(g.alternate===null)throw Error(t(340));wp()}return d=g.flags,d&65536?(g.flags=d&-65537|128,g):null;case 19:return yi(Pi),null;case 4:return kp(),null;case 10:return dC(g.type._context),null;case 22:case 23:return YC(),null;case 24:return null;default:return null}}var Fw=!1,xa=!1,rte=typeof WeakSet=="function"?WeakSet:Set,Wt=null;function Cp(d,g){var v=d.ref;if(v!==null)if(typeof v=="function")try{v(null)}catch(b){Ui(d,g,b)}else v.current=null}function OC(d,g,v){try{v()}catch(b){Ui(d,g,b)}}var PF=!1;function ite(d,g){if(YT=au,d=c5(),BT(d)){if("selectionStart"in d)var v={start:d.selectionStart,end:d.selectionEnd};else e:{v=(v=d.ownerDocument)&&v.defaultView||window;var b=v.getSelection&&v.getSelection();if(b&&b.rangeCount!==0){v=b.anchorNode;var C=b.anchorOffset,N=b.focusNode;b=b.focusOffset;try{v.nodeType,N.nodeType}catch{v=null;break e}var W=0,le=-1,pe=-1,Oe=0,ut=0,ft=d,ot=null;t:for(;;){for(var Gt;ft!==v||C!==0&&ft.nodeType!==3||(le=W+C),ft!==N||b!==0&&ft.nodeType!==3||(pe=W+b),ft.nodeType===3&&(W+=ft.nodeValue.length),(Gt=ft.firstChild)!==null;)ot=ft,ft=Gt;for(;;){if(ft===d)break t;if(ot===v&&++Oe===C&&(le=W),ot===N&&++ut===b&&(pe=W),(Gt=ft.nextSibling)!==null)break;ft=ot,ot=ft.parentNode}ft=Gt}v=le===-1||pe===-1?null:{start:le,end:pe}}else v=null}v=v||{start:0,end:0}}else v=null;for(ZT={focusedElem:d,selectionRange:v},au=!1,Wt=g;Wt!==null;)if(g=Wt,d=g.child,(g.subtreeFlags&1028)!==0&&d!==null)d.return=g,Wt=d;else for(;Wt!==null;){g=Wt;try{var Xt=g.alternate;if((g.flags&1024)!==0)switch(g.tag){case 0:case 11:case 15:break;case 1:if(Xt!==null){var sn=Xt.memoizedProps,Ji=Xt.memoizedState,Ce=g.stateNode,ve=Ce.getSnapshotBeforeUpdate(g.elementType===g.type?sn:Pl(g.type,sn),Ji);Ce.__reactInternalSnapshotBeforeUpdate=ve}break;case 3:var Le=g.stateNode.containerInfo;Le.nodeType===1?Le.textContent="":Le.nodeType===9&&Le.documentElement&&Le.removeChild(Le.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(vt){Ui(g,g.return,vt)}if(d=g.sibling,d!==null){d.return=g.return,Wt=d;break}Wt=g.return}return Xt=PF,PF=!1,Xt}function Hy(d,g,v){var b=g.updateQueue;if(b=b!==null?b.lastEffect:null,b!==null){var C=b=b.next;do{if((C.tag&d)===d){var N=C.destroy;C.destroy=void 0,N!==void 0&&OC(g,v,N)}C=C.next}while(C!==b)}}function Dw(d,g){if(g=g.updateQueue,g=g!==null?g.lastEffect:null,g!==null){var v=g=g.next;do{if((v.tag&d)===d){var b=v.create;v.destroy=b()}v=v.next}while(v!==g)}}function zC(d){var g=d.ref;if(g!==null){var v=d.stateNode;switch(d.tag){case 5:d=v;break;default:d=v}typeof g=="function"?g(d):g.current=d}}function NF(d){var g=d.alternate;g!==null&&(d.alternate=null,NF(g)),d.child=null,d.deletions=null,d.sibling=null,d.tag===5&&(g=d.stateNode,g!==null&&(delete g[gc],delete g[jy],delete g[tC],delete g[Gee],delete g[Vee])),d.stateNode=null,d.return=null,d.dependencies=null,d.memoizedProps=null,d.memoizedState=null,d.pendingProps=null,d.stateNode=null,d.updateQueue=null}function MF(d){return d.tag===5||d.tag===3||d.tag===4}function LF(d){e:for(;;){for(;d.sibling===null;){if(d.return===null||MF(d.return))return null;d=d.return}for(d.sibling.return=d.return,d=d.sibling;d.tag!==5&&d.tag!==6&&d.tag!==18;){if(d.flags&2||d.child===null||d.tag===4)continue e;d.child.return=d,d=d.child}if(!(d.flags&2))return d.stateNode}}function GC(d,g,v){var b=d.tag;if(b===5||b===6)d=d.stateNode,g?v.nodeType===8?v.parentNode.insertBefore(d,g):v.insertBefore(d,g):(v.nodeType===8?(g=v.parentNode,g.insertBefore(d,v)):(g=v,g.appendChild(d)),v=v._reactRootContainer,v!=null||g.onclick!==null||(g.onclick=gw));else if(b!==4&&(d=d.child,d!==null))for(GC(d,g,v),d=d.sibling;d!==null;)GC(d,g,v),d=d.sibling}function VC(d,g,v){var b=d.tag;if(b===5||b===6)d=d.stateNode,g?v.insertBefore(d,g):v.appendChild(d);else if(b!==4&&(d=d.child,d!==null))for(VC(d,g,v),d=d.sibling;d!==null;)VC(d,g,v),d=d.sibling}var Js=null,Nl=!1;function md(d,g,v){for(v=v.child;v!==null;)jF(d,g,v),v=v.sibling}function jF(d,g,v){if(Ot&&typeof Ot.onCommitFiberUnmount=="function")try{Ot.onCommitFiberUnmount(we,v)}catch{}switch(v.tag){case 5:xa||Cp(v,g);case 6:var b=Js,C=Nl;Js=null,md(d,g,v),Js=b,Nl=C,Js!==null&&(Nl?(d=Js,v=v.stateNode,d.nodeType===8?d.parentNode.removeChild(v):d.removeChild(v)):Js.removeChild(v.stateNode));break;case 18:Js!==null&&(Nl?(d=Js,v=v.stateNode,d.nodeType===8?eC(d.parentNode,v):d.nodeType===1&&eC(d,v),ad(d)):eC(Js,v.stateNode));break;case 4:b=Js,C=Nl,Js=v.stateNode.containerInfo,Nl=!0,md(d,g,v),Js=b,Nl=C;break;case 0:case 11:case 14:case 15:if(!xa&&(b=v.updateQueue,b!==null&&(b=b.lastEffect,b!==null))){C=b=b.next;do{var N=C,W=N.destroy;N=N.tag,W!==void 0&&((N&2)!==0||(N&4)!==0)&&OC(v,g,W),C=C.next}while(C!==b)}md(d,g,v);break;case 1:if(!xa&&(Cp(v,g),b=v.stateNode,typeof b.componentWillUnmount=="function"))try{b.props=v.memoizedProps,b.state=v.memoizedState,b.componentWillUnmount()}catch(le){Ui(v,g,le)}md(d,g,v);break;case 21:md(d,g,v);break;case 22:v.mode&1?(xa=(b=xa)||v.memoizedState!==null,md(d,g,v),xa=b):md(d,g,v);break;default:md(d,g,v)}}function FF(d){var g=d.updateQueue;if(g!==null){d.updateQueue=null;var v=d.stateNode;v===null&&(v=d.stateNode=new rte),g.forEach(function(b){var C=fte.bind(null,d,b);v.has(b)||(v.add(b),b.then(C,C))})}}function Ml(d,g){var v=g.deletions;if(v!==null)for(var b=0;b<v.length;b++){var C=v[b];try{var N=d,W=g,le=W;e:for(;le!==null;){switch(le.tag){case 5:Js=le.stateNode,Nl=!1;break e;case 3:Js=le.stateNode.containerInfo,Nl=!0;break e;case 4:Js=le.stateNode.containerInfo,Nl=!0;break e}le=le.return}if(Js===null)throw Error(t(160));jF(N,W,C),Js=null,Nl=!1;var pe=C.alternate;pe!==null&&(pe.return=null),C.return=null}catch(Oe){Ui(C,g,Oe)}}if(g.subtreeFlags&12854)for(g=g.child;g!==null;)DF(g,d),g=g.sibling}function DF(d,g){var v=d.alternate,b=d.flags;switch(d.tag){case 0:case 11:case 14:case 15:if(Ml(g,d),yc(d),b&4){try{Hy(3,d,d.return),Dw(3,d)}catch(sn){Ui(d,d.return,sn)}try{Hy(5,d,d.return)}catch(sn){Ui(d,d.return,sn)}}break;case 1:Ml(g,d),yc(d),b&512&&v!==null&&Cp(v,v.return);break;case 5:if(Ml(g,d),yc(d),b&512&&v!==null&&Cp(v,v.return),d.flags&32){var C=d.stateNode;try{$n(C,"")}catch(sn){Ui(d,d.return,sn)}}if(b&4&&(C=d.stateNode,C!=null)){var N=d.memoizedProps,W=v!==null?v.memoizedProps:N,le=d.type,pe=d.updateQueue;if(d.updateQueue=null,pe!==null)try{le==="input"&&N.type==="radio"&&N.name!=null&&Xe(C,N),gr(le,W);var Oe=gr(le,N);for(W=0;W<pe.length;W+=2){var ut=pe[W],ft=pe[W+1];ut==="style"?rr(C,ft):ut==="dangerouslySetInnerHTML"?gn(C,ft):ut==="children"?$n(C,ft):k(C,ut,ft,Oe)}switch(le){case"input":Ze(C,N);break;case"textarea":fn(C,N);break;case"select":var ot=C._wrapperState.wasMultiple;C._wrapperState.wasMultiple=!!N.multiple;var Gt=N.value;Gt!=null?Pn(C,!!N.multiple,Gt,!1):ot!==!!N.multiple&&(N.defaultValue!=null?Pn(C,!!N.multiple,N.defaultValue,!0):Pn(C,!!N.multiple,N.multiple?[]:"",!1))}C[jy]=N}catch(sn){Ui(d,d.return,sn)}}break;case 6:if(Ml(g,d),yc(d),b&4){if(d.stateNode===null)throw Error(t(162));C=d.stateNode,N=d.memoizedProps;try{C.nodeValue=N}catch(sn){Ui(d,d.return,sn)}}break;case 3:if(Ml(g,d),yc(d),b&4&&v!==null&&v.memoizedState.isDehydrated)try{ad(g.containerInfo)}catch(sn){Ui(d,d.return,sn)}break;case 4:Ml(g,d),yc(d);break;case 13:Ml(g,d),yc(d),C=d.child,C.flags&8192&&(N=C.memoizedState!==null,C.stateNode.isHidden=N,!N||C.alternate!==null&&C.alternate.memoizedState!==null||($C=Be())),b&4&&FF(d);break;case 22:if(ut=v!==null&&v.memoizedState!==null,d.mode&1?(xa=(Oe=xa)||ut,Ml(g,d),xa=Oe):Ml(g,d),yc(d),b&8192){if(Oe=d.memoizedState!==null,(d.stateNode.isHidden=Oe)&&!ut&&(d.mode&1)!==0)for(Wt=d,ut=d.child;ut!==null;){for(ft=Wt=ut;Wt!==null;){switch(ot=Wt,Gt=ot.child,ot.tag){case 0:case 11:case 14:case 15:Hy(4,ot,ot.return);break;case 1:Cp(ot,ot.return);var Xt=ot.stateNode;if(typeof Xt.componentWillUnmount=="function"){b=ot,v=ot.return;try{g=b,Xt.props=g.memoizedProps,Xt.state=g.memoizedState,Xt.componentWillUnmount()}catch(sn){Ui(b,v,sn)}}break;case 5:Cp(ot,ot.return);break;case 22:if(ot.memoizedState!==null){GF(ft);continue}}Gt!==null?(Gt.return=ot,Wt=Gt):GF(ft)}ut=ut.sibling}e:for(ut=null,ft=d;;){if(ft.tag===5){if(ut===null){ut=ft;try{C=ft.stateNode,Oe?(N=C.style,typeof N.setProperty=="function"?N.setProperty("display","none","important"):N.display="none"):(le=ft.stateNode,pe=ft.memoizedProps.style,W=pe!=null&&pe.hasOwnProperty("display")?pe.display:null,le.style.display=nr("display",W))}catch(sn){Ui(d,d.return,sn)}}}else if(ft.tag===6){if(ut===null)try{ft.stateNode.nodeValue=Oe?"":ft.memoizedProps}catch(sn){Ui(d,d.return,sn)}}else if((ft.tag!==22&&ft.tag!==23||ft.memoizedState===null||ft===d)&&ft.child!==null){ft.child.return=ft,ft=ft.child;continue}if(ft===d)break e;for(;ft.sibling===null;){if(ft.return===null||ft.return===d)break e;ut===ft&&(ut=null),ft=ft.return}ut===ft&&(ut=null),ft.sibling.return=ft.return,ft=ft.sibling}}break;case 19:Ml(g,d),yc(d),b&4&&FF(d);break;case 21:break;default:Ml(g,d),yc(d)}}function yc(d){var g=d.flags;if(g&2){try{e:{for(var v=d.return;v!==null;){if(MF(v)){var b=v;break e}v=v.return}throw Error(t(160))}switch(b.tag){case 5:var C=b.stateNode;b.flags&32&&($n(C,""),b.flags&=-33);var N=LF(d);VC(d,N,C);break;case 3:case 4:var W=b.stateNode.containerInfo,le=LF(d);GC(d,le,W);break;default:throw Error(t(161))}}catch(pe){Ui(d,d.return,pe)}d.flags&=-3}g&4096&&(d.flags&=-4097)}function ste(d,g,v){Wt=d,OF(d)}function OF(d,g,v){for(var b=(d.mode&1)!==0;Wt!==null;){var C=Wt,N=C.child;if(C.tag===22&&b){var W=C.memoizedState!==null||Fw;if(!W){var le=C.alternate,pe=le!==null&&le.memoizedState!==null||xa;le=Fw;var Oe=xa;if(Fw=W,(xa=pe)&&!Oe)for(Wt=C;Wt!==null;)W=Wt,pe=W.child,W.tag===22&&W.memoizedState!==null?VF(C):pe!==null?(pe.return=W,Wt=pe):VF(C);for(;N!==null;)Wt=N,OF(N),N=N.sibling;Wt=C,Fw=le,xa=Oe}zF(d)}else(C.subtreeFlags&8772)!==0&&N!==null?(N.return=C,Wt=N):zF(d)}}function zF(d){for(;Wt!==null;){var g=Wt;if((g.flags&8772)!==0){var v=g.alternate;try{if((g.flags&8772)!==0)switch(g.tag){case 0:case 11:case 15:xa||Dw(5,g);break;case 1:var b=g.stateNode;if(g.flags&4&&!xa)if(v===null)b.componentDidMount();else{var C=g.elementType===g.type?v.memoizedProps:Pl(g.type,v.memoizedProps);b.componentDidUpdate(C,v.memoizedState,b.__reactInternalSnapshotBeforeUpdate)}var N=g.updateQueue;N!==null&&G5(g,N,b);break;case 3:var W=g.updateQueue;if(W!==null){if(v=null,g.child!==null)switch(g.child.tag){case 5:v=g.child.stateNode;break;case 1:v=g.child.stateNode}G5(g,W,v)}break;case 5:var le=g.stateNode;if(v===null&&g.flags&4){v=le;var pe=g.memoizedProps;switch(g.type){case"button":case"input":case"select":case"textarea":pe.autoFocus&&v.focus();break;case"img":pe.src&&(v.src=pe.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(g.memoizedState===null){var Oe=g.alternate;if(Oe!==null){var ut=Oe.memoizedState;if(ut!==null){var ft=ut.dehydrated;ft!==null&&ad(ft)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}xa||g.flags&512&&zC(g)}catch(ot){Ui(g,g.return,ot)}}if(g===d){Wt=null;break}if(v=g.sibling,v!==null){v.return=g.return,Wt=v;break}Wt=g.return}}function GF(d){for(;Wt!==null;){var g=Wt;if(g===d){Wt=null;break}var v=g.sibling;if(v!==null){v.return=g.return,Wt=v;break}Wt=g.return}}function VF(d){for(;Wt!==null;){var g=Wt;try{switch(g.tag){case 0:case 11:case 15:var v=g.return;try{Dw(4,g)}catch(pe){Ui(g,v,pe)}break;case 1:var b=g.stateNode;if(typeof b.componentDidMount=="function"){var C=g.return;try{b.componentDidMount()}catch(pe){Ui(g,C,pe)}}var N=g.return;try{zC(g)}catch(pe){Ui(g,N,pe)}break;case 5:var W=g.return;try{zC(g)}catch(pe){Ui(g,W,pe)}}}catch(pe){Ui(g,g.return,pe)}if(g===d){Wt=null;break}var le=g.sibling;if(le!==null){le.return=g.return,Wt=le;break}Wt=g.return}}var ate=Math.ceil,Ow=A.ReactCurrentDispatcher,BC=A.ReactCurrentOwner,nl=A.ReactCurrentBatchConfig,Tr=0,Fs=null,cs=null,Qs=0,Ao=0,Ap=dd(0),ks=0,Ky=null,hf=0,zw=0,UC=0,qy=null,Ja=null,$C=0,Ip=1/0,mu=null,Gw=!1,WC=null,yd=null,Vw=!1,vd=null,Bw=0,Xy=0,HC=null,Uw=-1,$w=0;function za(){return(Tr&6)!==0?Be():Uw!==-1?Uw:Uw=Be()}function xd(d){return(d.mode&1)===0?1:(Tr&2)!==0&&Qs!==0?Qs&-Qs:Uee.transition!==null?($w===0&&($w=ne()),$w):(d=He,d!==0||(d=window.event,d=d===void 0?16:ip(d.type)),d)}function Ll(d,g,v,b){if(50<Xy)throw Xy=0,HC=null,Error(t(185));or(d,v,b),((Tr&2)===0||d!==Fs)&&(d===Fs&&((Tr&2)===0&&(zw|=v),ks===4&&_d(d,Qs)),Qa(d,b),v===1&&Tr===0&&(g.mode&1)===0&&(Ip=Be()+500,vw&&fd()))}function Qa(d,g){var v=d.callbackNode;F(d,g);var b=Ht(d,d===Fs?Qs:0);if(b===0)v!==null&&et(v),d.callbackNode=null,d.callbackPriority=0;else if(g=b&-b,d.callbackPriority!==g){if(v!=null&&et(v),g===1)d.tag===0?Bee(UF.bind(null,d)):A5(UF.bind(null,d)),Oee(function(){(Tr&6)===0&&fd()}),v=null;else{switch(Pt(b)){case 1:v=Xn;break;case 4:v=Mt;break;case 16:v=_r;break;case 536870912:v=Me;break;default:v=_r}v=ZF(v,BF.bind(null,d))}d.callbackPriority=g,d.callbackNode=v}}function BF(d,g){if(Uw=-1,$w=0,(Tr&6)!==0)throw Error(t(327));var v=d.callbackNode;if(Rp()&&d.callbackNode!==v)return null;var b=Ht(d,d===Fs?Qs:0);if(b===0)return null;if((b&30)!==0||(b&d.expiredLanes)!==0||g)g=Ww(d,b);else{g=b;var C=Tr;Tr|=2;var N=WF();(Fs!==d||Qs!==g)&&(mu=null,Ip=Be()+500,gf(d,g));do try{cte();break}catch(le){$F(d,le)}while(!0);uC(),Ow.current=N,Tr=C,cs!==null?g=0:(Fs=null,Qs=0,g=ks)}if(g!==0){if(g===2&&(C=zt(d),C!==0&&(b=C,g=KC(d,C))),g===1)throw v=Ky,gf(d,0),_d(d,b),Qa(d,Be()),v;if(g===6)_d(d,b);else{if(C=d.current.alternate,(b&30)===0&&!ote(C)&&(g=Ww(d,b),g===2&&(N=zt(d),N!==0&&(b=N,g=KC(d,N))),g===1))throw v=Ky,gf(d,0),_d(d,b),Qa(d,Be()),v;switch(d.finishedWork=C,d.finishedLanes=b,g){case 0:case 1:throw Error(t(345));case 2:pf(d,Ja,mu);break;case 3:if(_d(d,b),(b&130023424)===b&&(g=$C+500-Be(),10<g)){if(Ht(d,0)!==0)break;if(C=d.suspendedLanes,(C&b)!==b){za(),d.pingedLanes|=d.suspendedLanes&C;break}d.timeoutHandle=QT(pf.bind(null,d,Ja,mu),g);break}pf(d,Ja,mu);break;case 4:if(_d(d,b),(b&4194240)===b)break;for(g=d.eventTimes,C=-1;0<b;){var W=31-Ut(b);N=1<<W,W=g[W],W>C&&(C=W),b&=~N}if(b=C,b=Be()-b,b=(120>b?120:480>b?480:1080>b?1080:1920>b?1920:3e3>b?3e3:4320>b?4320:1960*ate(b/1960))-b,10<b){d.timeoutHandle=QT(pf.bind(null,d,Ja,mu),b);break}pf(d,Ja,mu);break;case 5:pf(d,Ja,mu);break;default:throw Error(t(329))}}}return Qa(d,Be()),d.callbackNode===v?BF.bind(null,d):null}function KC(d,g){var v=qy;return d.current.memoizedState.isDehydrated&&(gf(d,g).flags|=256),d=Ww(d,g),d!==2&&(g=Ja,Ja=v,g!==null&&qC(g)),d}function qC(d){Ja===null?Ja=d:Ja.push.apply(Ja,d)}function ote(d){for(var g=d;;){if(g.flags&16384){var v=g.updateQueue;if(v!==null&&(v=v.stores,v!==null))for(var b=0;b<v.length;b++){var C=v[b],N=C.getSnapshot;C=C.value;try{if(!Il(N(),C))return!1}catch{return!1}}}if(v=g.child,g.subtreeFlags&16384&&v!==null)v.return=g,g=v;else{if(g===d)break;for(;g.sibling===null;){if(g.return===null||g.return===d)return!0;g=g.return}g.sibling.return=g.return,g=g.sibling}}return!0}function _d(d,g){for(g&=~UC,g&=~zw,d.suspendedLanes|=g,d.pingedLanes&=~g,d=d.expirationTimes;0<g;){var v=31-Ut(g),b=1<<v;d[v]=-1,g&=~b}}function UF(d){if((Tr&6)!==0)throw Error(t(327));Rp();var g=Ht(d,0);if((g&1)===0)return Qa(d,Be()),null;var v=Ww(d,g);if(d.tag!==0&&v===2){var b=zt(d);b!==0&&(g=b,v=KC(d,b))}if(v===1)throw v=Ky,gf(d,0),_d(d,g),Qa(d,Be()),v;if(v===6)throw Error(t(345));return d.finishedWork=d.current.alternate,d.finishedLanes=g,pf(d,Ja,mu),Qa(d,Be()),null}function XC(d,g){var v=Tr;Tr|=1;try{return d(g)}finally{Tr=v,Tr===0&&(Ip=Be()+500,vw&&fd())}}function ff(d){vd!==null&&vd.tag===0&&(Tr&6)===0&&Rp();var g=Tr;Tr|=1;var v=nl.transition,b=He;try{if(nl.transition=null,He=1,d)return d()}finally{He=b,nl.transition=v,Tr=g,(Tr&6)===0&&fd()}}function YC(){Ao=Ap.current,yi(Ap)}function gf(d,g){d.finishedWork=null,d.finishedLanes=0;var v=d.timeoutHandle;if(v!==-1&&(d.timeoutHandle=-1,Dee(v)),cs!==null)for(v=cs.return;v!==null;){var b=v;switch(sC(b),b.tag){case 1:b=b.type.childContextTypes,b!=null&&mw();break;case 3:kp(),yi(Xa),yi(ma),vC();break;case 5:mC(b);break;case 4:kp();break;case 13:yi(Pi);break;case 19:yi(Pi);break;case 10:dC(b.type._context);break;case 22:case 23:YC()}v=v.return}if(Fs=d,cs=d=wd(d.current,null),Qs=Ao=g,ks=0,Ky=null,UC=zw=hf=0,Ja=qy=null,cf!==null){for(g=0;g<cf.length;g++)if(v=cf[g],b=v.interleaved,b!==null){v.interleaved=null;var C=b.next,N=v.pending;if(N!==null){var W=N.next;N.next=C,b.next=W}v.pending=b}cf=null}return d}function $F(d,g){do{var v=cs;try{if(uC(),Aw.current=Nw,Iw){for(var b=Ni.memoizedState;b!==null;){var C=b.queue;C!==null&&(C.pending=null),b=b.next}Iw=!1}if(df=0,js=Ss=Ni=null,Vy=!1,By=0,BC.current=null,v===null||v.return===null){ks=1,Ky=g,cs=null;break}e:{var N=d,W=v.return,le=v,pe=g;if(g=Qs,le.flags|=32768,pe!==null&&typeof pe=="object"&&typeof pe.then=="function"){var Oe=pe,ut=le,ft=ut.tag;if((ut.mode&1)===0&&(ft===0||ft===11||ft===15)){var ot=ut.alternate;ot?(ut.updateQueue=ot.updateQueue,ut.memoizedState=ot.memoizedState,ut.lanes=ot.lanes):(ut.updateQueue=null,ut.memoizedState=null)}var Gt=pF(W);if(Gt!==null){Gt.flags&=-257,mF(Gt,W,le,N,g),Gt.mode&1&&gF(N,Oe,g),g=Gt,pe=Oe;var Xt=g.updateQueue;if(Xt===null){var sn=new Set;sn.add(pe),g.updateQueue=sn}else Xt.add(pe);break e}else{if((g&1)===0){gF(N,Oe,g),ZC();break e}pe=Error(t(426))}}else if(Si&&le.mode&1){var Ji=pF(W);if(Ji!==null){(Ji.flags&65536)===0&&(Ji.flags|=256),mF(Ji,W,le,N,g),lC(Tp(pe,le));break e}}N=pe=Tp(pe,le),ks!==4&&(ks=2),qy===null?qy=[N]:qy.push(N),N=W;do{switch(N.tag){case 3:N.flags|=65536,g&=-g,N.lanes|=g;var Ce=hF(N,pe,g);z5(N,Ce);break e;case 1:le=pe;var ve=N.type,Le=N.stateNode;if((N.flags&128)===0&&(typeof ve.getDerivedStateFromError=="function"||Le!==null&&typeof Le.componentDidCatch=="function"&&(yd===null||!yd.has(Le)))){N.flags|=65536,g&=-g,N.lanes|=g;var vt=fF(N,le,g);z5(N,vt);break e}}N=N.return}while(N!==null)}KF(v)}catch(ln){g=ln,cs===v&&v!==null&&(cs=v=v.return);continue}break}while(!0)}function WF(){var d=Ow.current;return Ow.current=Nw,d===null?Nw:d}function ZC(){(ks===0||ks===3||ks===2)&&(ks=4),Fs===null||(hf&268435455)===0&&(zw&268435455)===0||_d(Fs,Qs)}function Ww(d,g){var v=Tr;Tr|=2;var b=WF();(Fs!==d||Qs!==g)&&(mu=null,gf(d,g));do try{lte();break}catch(C){$F(d,C)}while(!0);if(uC(),Tr=v,Ow.current=b,cs!==null)throw Error(t(261));return Fs=null,Qs=0,ks}function lte(){for(;cs!==null;)HF(cs)}function cte(){for(;cs!==null&&!gt();)HF(cs)}function HF(d){var g=YF(d.alternate,d,Ao);d.memoizedProps=d.pendingProps,g===null?KF(d):cs=g,BC.current=null}function KF(d){var g=d;do{var v=g.alternate;if(d=g.return,(g.flags&32768)===0){if(v=tte(v,g,Ao),v!==null){cs=v;return}}else{if(v=nte(v,g),v!==null){v.flags&=32767,cs=v;return}if(d!==null)d.flags|=32768,d.subtreeFlags=0,d.deletions=null;else{ks=6,cs=null;return}}if(g=g.sibling,g!==null){cs=g;return}cs=g=d}while(g!==null);ks===0&&(ks=5)}function pf(d,g,v){var b=He,C=nl.transition;try{nl.transition=null,He=1,ute(d,g,v,b)}finally{nl.transition=C,He=b}return null}function ute(d,g,v,b){do Rp();while(vd!==null);if((Tr&6)!==0)throw Error(t(327));v=d.finishedWork;var C=d.finishedLanes;if(v===null)return null;if(d.finishedWork=null,d.finishedLanes=0,v===d.current)throw Error(t(177));d.callbackNode=null,d.callbackPriority=0;var N=v.lanes|v.childLanes;if(gi(d,N),d===Fs&&(cs=Fs=null,Qs=0),(v.subtreeFlags&2064)===0&&(v.flags&2064)===0||Vw||(Vw=!0,ZF(_r,function(){return Rp(),null})),N=(v.flags&15990)!==0,(v.subtreeFlags&15990)!==0||N){N=nl.transition,nl.transition=null;var W=He;He=1;var le=Tr;Tr|=4,BC.current=null,ite(d,v),DF(v,d),Ree(ZT),au=!!YT,ZT=YT=null,d.current=v,ste(v),Je(),Tr=le,He=W,nl.transition=N}else d.current=v;if(Vw&&(Vw=!1,vd=d,Bw=C),N=d.pendingLanes,N===0&&(yd=null),Ct(v.stateNode),Qa(d,Be()),g!==null)for(b=d.onRecoverableError,v=0;v<g.length;v++)C=g[v],b(C.value,{componentStack:C.stack,digest:C.digest});if(Gw)throw Gw=!1,d=WC,WC=null,d;return(Bw&1)!==0&&d.tag!==0&&Rp(),N=d.pendingLanes,(N&1)!==0?d===HC?Xy++:(Xy=0,HC=d):Xy=0,fd(),null}function Rp(){if(vd!==null){var d=Pt(Bw),g=nl.transition,v=He;try{if(nl.transition=null,He=16>d?16:d,vd===null)var b=!1;else{if(d=vd,vd=null,Bw=0,(Tr&6)!==0)throw Error(t(331));var C=Tr;for(Tr|=4,Wt=d.current;Wt!==null;){var N=Wt,W=N.child;if((Wt.flags&16)!==0){var le=N.deletions;if(le!==null){for(var pe=0;pe<le.length;pe++){var Oe=le[pe];for(Wt=Oe;Wt!==null;){var ut=Wt;switch(ut.tag){case 0:case 11:case 15:Hy(8,ut,N)}var ft=ut.child;if(ft!==null)ft.return=ut,Wt=ft;else for(;Wt!==null;){ut=Wt;var ot=ut.sibling,Gt=ut.return;if(NF(ut),ut===Oe){Wt=null;break}if(ot!==null){ot.return=Gt,Wt=ot;break}Wt=Gt}}}var Xt=N.alternate;if(Xt!==null){var sn=Xt.child;if(sn!==null){Xt.child=null;do{var Ji=sn.sibling;sn.sibling=null,sn=Ji}while(sn!==null)}}Wt=N}}if((N.subtreeFlags&2064)!==0&&W!==null)W.return=N,Wt=W;else e:for(;Wt!==null;){if(N=Wt,(N.flags&2048)!==0)switch(N.tag){case 0:case 11:case 15:Hy(9,N,N.return)}var Ce=N.sibling;if(Ce!==null){Ce.return=N.return,Wt=Ce;break e}Wt=N.return}}var ve=d.current;for(Wt=ve;Wt!==null;){W=Wt;var Le=W.child;if((W.subtreeFlags&2064)!==0&&Le!==null)Le.return=W,Wt=Le;else e:for(W=ve;Wt!==null;){if(le=Wt,(le.flags&2048)!==0)try{switch(le.tag){case 0:case 11:case 15:Dw(9,le)}}catch(ln){Ui(le,le.return,ln)}if(le===W){Wt=null;break e}var vt=le.sibling;if(vt!==null){vt.return=le.return,Wt=vt;break e}Wt=le.return}}if(Tr=C,fd(),Ot&&typeof Ot.onPostCommitFiberRoot=="function")try{Ot.onPostCommitFiberRoot(we,d)}catch{}b=!0}return b}finally{He=v,nl.transition=g}}return!1}function qF(d,g,v){g=Tp(v,g),g=hF(d,g,1),d=pd(d,g,1),g=za(),d!==null&&(or(d,1,g),Qa(d,g))}function Ui(d,g,v){if(d.tag===3)qF(d,d,v);else for(;g!==null;){if(g.tag===3){qF(g,d,v);break}else if(g.tag===1){var b=g.stateNode;if(typeof g.type.getDerivedStateFromError=="function"||typeof b.componentDidCatch=="function"&&(yd===null||!yd.has(b))){d=Tp(v,d),d=fF(g,d,1),g=pd(g,d,1),d=za(),g!==null&&(or(g,1,d),Qa(g,d));break}}g=g.return}}function dte(d,g,v){var b=d.pingCache;b!==null&&b.delete(g),g=za(),d.pingedLanes|=d.suspendedLanes&v,Fs===d&&(Qs&v)===v&&(ks===4||ks===3&&(Qs&130023424)===Qs&&500>Be()-$C?gf(d,0):UC|=v),Qa(d,g)}function XF(d,g){g===0&&((d.mode&1)===0?g=1:(g=nt,nt<<=1,(nt&130023424)===0&&(nt=4194304)));var v=za();d=fu(d,g),d!==null&&(or(d,g,v),Qa(d,v))}function hte(d){var g=d.memoizedState,v=0;g!==null&&(v=g.retryLane),XF(d,v)}function fte(d,g){var v=0;switch(d.tag){case 13:var b=d.stateNode,C=d.memoizedState;C!==null&&(v=C.retryLane);break;case 19:b=d.stateNode;break;default:throw Error(t(314))}b!==null&&b.delete(g),XF(d,v)}var YF;YF=function(d,g,v){if(d!==null)if(d.memoizedProps!==g.pendingProps||Xa.current)Za=!0;else{if((d.lanes&v)===0&&(g.flags&128)===0)return Za=!1,ete(d,g,v);Za=(d.flags&131072)!==0}else Za=!1,Si&&(g.flags&1048576)!==0&&I5(g,_w,g.index);switch(g.lanes=0,g.tag){case 2:var b=g.type;jw(d,g),d=g.pendingProps;var C=vp(g,ma.current);Sp(g,v),C=wC(null,g,b,d,C,v);var N=bC();return g.flags|=1,typeof C=="object"&&C!==null&&typeof C.render=="function"&&C.$$typeof===void 0?(g.tag=1,g.memoizedState=null,g.updateQueue=null,Ya(b)?(N=!0,yw(g)):N=!1,g.memoizedState=C.state!==null&&C.state!==void 0?C.state:null,gC(g),C.updater=Mw,g.stateNode=C,C._reactInternals=g,AC(g,b,d,v),g=NC(null,g,b,!0,N,v)):(g.tag=0,Si&&N&&iC(g),Oa(null,g,C,v),g=g.child),g;case 16:b=g.elementType;e:{switch(jw(d,g),d=g.pendingProps,C=b._init,b=C(b._payload),g.type=b,C=g.tag=pte(b),d=Pl(b,d),C){case 0:g=PC(null,g,b,d,v);break e;case 1:g=bF(null,g,b,d,v);break e;case 11:g=yF(null,g,b,d,v);break e;case 14:g=vF(null,g,b,Pl(b.type,d),v);break e}throw Error(t(306,b,""))}return g;case 0:return b=g.type,C=g.pendingProps,C=g.elementType===b?C:Pl(b,C),PC(d,g,b,C,v);case 1:return b=g.type,C=g.pendingProps,C=g.elementType===b?C:Pl(b,C),bF(d,g,b,C,v);case 3:e:{if(EF(g),d===null)throw Error(t(387));b=g.pendingProps,N=g.memoizedState,C=N.element,O5(d,g),Tw(g,b,null,v);var W=g.memoizedState;if(b=W.element,N.isDehydrated)if(N={element:b,isDehydrated:!1,cache:W.cache,pendingSuspenseBoundaries:W.pendingSuspenseBoundaries,transitions:W.transitions},g.updateQueue.baseState=N,g.memoizedState=N,g.flags&256){C=Tp(Error(t(423)),g),g=SF(d,g,b,v,C);break e}else if(b!==C){C=Tp(Error(t(424)),g),g=SF(d,g,b,v,C);break e}else for(Co=ud(g.stateNode.containerInfo.firstChild),To=g,Si=!0,Rl=null,v=F5(g,null,b,v),g.child=v;v;)v.flags=v.flags&-3|4096,v=v.sibling;else{if(wp(),b===C){g=pu(d,g,v);break e}Oa(d,g,b,v)}g=g.child}return g;case 5:return V5(g),d===null&&oC(g),b=g.type,C=g.pendingProps,N=d!==null?d.memoizedProps:null,W=C.children,JT(b,C)?W=null:N!==null&&JT(b,N)&&(g.flags|=32),wF(d,g),Oa(d,g,W,v),g.child;case 6:return d===null&&oC(g),null;case 13:return kF(d,g,v);case 4:return pC(g,g.stateNode.containerInfo),b=g.pendingProps,d===null?g.child=bp(g,null,b,v):Oa(d,g,b,v),g.child;case 11:return b=g.type,C=g.pendingProps,C=g.elementType===b?C:Pl(b,C),yF(d,g,b,C,v);case 7:return Oa(d,g,g.pendingProps,v),g.child;case 8:return Oa(d,g,g.pendingProps.children,v),g.child;case 12:return Oa(d,g,g.pendingProps.children,v),g.child;case 10:e:{if(b=g.type._context,C=g.pendingProps,N=g.memoizedProps,W=C.value,ci(Ew,b._currentValue),b._currentValue=W,N!==null)if(Il(N.value,W)){if(N.children===C.children&&!Xa.current){g=pu(d,g,v);break e}}else for(N=g.child,N!==null&&(N.return=g);N!==null;){var le=N.dependencies;if(le!==null){W=N.child;for(var pe=le.firstContext;pe!==null;){if(pe.context===b){if(N.tag===1){pe=gu(-1,v&-v),pe.tag=2;var Oe=N.updateQueue;if(Oe!==null){Oe=Oe.shared;var ut=Oe.pending;ut===null?pe.next=pe:(pe.next=ut.next,ut.next=pe),Oe.pending=pe}}N.lanes|=v,pe=N.alternate,pe!==null&&(pe.lanes|=v),hC(N.return,v,g),le.lanes|=v;break}pe=pe.next}}else if(N.tag===10)W=N.type===g.type?null:N.child;else if(N.tag===18){if(W=N.return,W===null)throw Error(t(341));W.lanes|=v,le=W.alternate,le!==null&&(le.lanes|=v),hC(W,v,g),W=N.sibling}else W=N.child;if(W!==null)W.return=N;else for(W=N;W!==null;){if(W===g){W=null;break}if(N=W.sibling,N!==null){N.return=W.return,W=N;break}W=W.return}N=W}Oa(d,g,C.children,v),g=g.child}return g;case 9:return C=g.type,b=g.pendingProps.children,Sp(g,v),C=el(C),b=b(C),g.flags|=1,Oa(d,g,b,v),g.child;case 14:return b=g.type,C=Pl(b,g.pendingProps),C=Pl(b.type,C),vF(d,g,b,C,v);case 15:return xF(d,g,g.type,g.pendingProps,v);case 17:return b=g.type,C=g.pendingProps,C=g.elementType===b?C:Pl(b,C),jw(d,g),g.tag=1,Ya(b)?(d=!0,yw(g)):d=!1,Sp(g,v),uF(g,b,C),AC(g,b,C,v),NC(null,g,b,!0,d,v);case 19:return CF(d,g,v);case 22:return _F(d,g,v)}throw Error(t(156,g.tag))};function ZF(d,g){return $e(d,g)}function gte(d,g,v,b){this.tag=d,this.key=v,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=g,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=b,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rl(d,g,v,b){return new gte(d,g,v,b)}function JC(d){return d=d.prototype,!(!d||!d.isReactComponent)}function pte(d){if(typeof d=="function")return JC(d)?1:0;if(d!=null){if(d=d.$$typeof,d===V)return 11;if(d===ye)return 14}return 2}function wd(d,g){var v=d.alternate;return v===null?(v=rl(d.tag,g,d.key,d.mode),v.elementType=d.elementType,v.type=d.type,v.stateNode=d.stateNode,v.alternate=d,d.alternate=v):(v.pendingProps=g,v.type=d.type,v.flags=0,v.subtreeFlags=0,v.deletions=null),v.flags=d.flags&14680064,v.childLanes=d.childLanes,v.lanes=d.lanes,v.child=d.child,v.memoizedProps=d.memoizedProps,v.memoizedState=d.memoizedState,v.updateQueue=d.updateQueue,g=d.dependencies,v.dependencies=g===null?null:{lanes:g.lanes,firstContext:g.firstContext},v.sibling=d.sibling,v.index=d.index,v.ref=d.ref,v}function Hw(d,g,v,b,C,N){var W=2;if(b=d,typeof d=="function")JC(d)&&(W=1);else if(typeof d=="string")W=5;else e:switch(d){case I:return mf(v.children,C,N,g);case T:W=8,C|=8;break;case R:return d=rl(12,v,g,C|2),d.elementType=R,d.lanes=N,d;case j:return d=rl(13,v,g,C),d.elementType=j,d.lanes=N,d;case oe:return d=rl(19,v,g,C),d.elementType=oe,d.lanes=N,d;case de:return Kw(v,C,N,g);default:if(typeof d=="object"&&d!==null)switch(d.$$typeof){case L:W=10;break e;case D:W=9;break e;case V:W=11;break e;case ye:W=14;break e;case ge:W=16,b=null;break e}throw Error(t(130,d==null?d:typeof d,""))}return g=rl(W,v,g,C),g.elementType=d,g.type=b,g.lanes=N,g}function mf(d,g,v,b){return d=rl(7,d,b,g),d.lanes=v,d}function Kw(d,g,v,b){return d=rl(22,d,b,g),d.elementType=de,d.lanes=v,d.stateNode={isHidden:!1},d}function QC(d,g,v){return d=rl(6,d,null,g),d.lanes=v,d}function eA(d,g,v){return g=rl(4,d.children!==null?d.children:[],d.key,g),g.lanes=v,g.stateNode={containerInfo:d.containerInfo,pendingChildren:null,implementation:d.implementation},g}function mte(d,g,v,b,C){this.tag=g,this.containerInfo=d,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Nn(0),this.expirationTimes=Nn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nn(0),this.identifierPrefix=b,this.onRecoverableError=C,this.mutableSourceEagerHydrationData=null}function tA(d,g,v,b,C,N,W,le,pe){return d=new mte(d,g,v,le,pe),g===1?(g=1,N===!0&&(g|=8)):g=0,N=rl(3,null,null,g),d.current=N,N.stateNode=d,N.memoizedState={element:b,isDehydrated:v,cache:null,transitions:null,pendingSuspenseBoundaries:null},gC(N),d}function yte(d,g,v){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:z,key:b==null?null:""+b,children:d,containerInfo:g,implementation:v}}function JF(d){if(!d)return hd;d=d._reactInternals;e:{if(re(d)!==d||d.tag!==1)throw Error(t(170));var g=d;do{switch(g.tag){case 3:g=g.stateNode.context;break e;case 1:if(Ya(g.type)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break e}}g=g.return}while(g!==null);throw Error(t(171))}if(d.tag===1){var v=d.type;if(Ya(v))return T5(d,v,g)}return g}function QF(d,g,v,b,C,N,W,le,pe){return d=tA(v,b,!0,d,C,N,W,le,pe),d.context=JF(null),v=d.current,b=za(),C=xd(v),N=gu(b,C),N.callback=g??null,pd(v,N,C),d.current.lanes=C,or(d,C,b),Qa(d,b),d}function qw(d,g,v,b){var C=g.current,N=za(),W=xd(C);return v=JF(v),g.context===null?g.context=v:g.pendingContext=v,g=gu(N,W),g.payload={element:d},b=b===void 0?null:b,b!==null&&(g.callback=b),d=pd(C,g,W),d!==null&&(Ll(d,C,W,N),kw(d,C,W)),W}function Xw(d){if(d=d.current,!d.child)return null;switch(d.child.tag){case 5:return d.child.stateNode;default:return d.child.stateNode}}function eD(d,g){if(d=d.memoizedState,d!==null&&d.dehydrated!==null){var v=d.retryLane;d.retryLane=v!==0&&v<g?v:g}}function nA(d,g){eD(d,g),(d=d.alternate)&&eD(d,g)}function vte(){return null}var tD=typeof reportError=="function"?reportError:function(d){console.error(d)};function rA(d){this._internalRoot=d}Yw.prototype.render=rA.prototype.render=function(d){var g=this._internalRoot;if(g===null)throw Error(t(409));qw(d,g,null,null)},Yw.prototype.unmount=rA.prototype.unmount=function(){var d=this._internalRoot;if(d!==null){this._internalRoot=null;var g=d.containerInfo;ff(function(){qw(null,d,null,null)}),g[cu]=null}};function Yw(d){this._internalRoot=d}Yw.prototype.unstable_scheduleHydration=function(d){if(d){var g=mr();d={blockedOn:null,target:d,priority:g};for(var v=0;v<Cn.length&&g!==0&&g<Cn[v].priority;v++);Cn.splice(v,0,d),v===0&&oc(d)}};function iA(d){return!(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)}function Zw(d){return!(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11&&(d.nodeType!==8||d.nodeValue!==" react-mount-point-unstable "))}function nD(){}function xte(d,g,v,b,C){if(C){if(typeof b=="function"){var N=b;b=function(){var Oe=Xw(W);N.call(Oe)}}var W=QF(g,b,d,0,null,!1,!1,"",nD);return d._reactRootContainer=W,d[cu]=W.current,My(d.nodeType===8?d.parentNode:d),ff(),W}for(;C=d.lastChild;)d.removeChild(C);if(typeof b=="function"){var le=b;b=function(){var Oe=Xw(pe);le.call(Oe)}}var pe=tA(d,0,!1,null,null,!1,!1,"",nD);return d._reactRootContainer=pe,d[cu]=pe.current,My(d.nodeType===8?d.parentNode:d),ff(function(){qw(g,pe,v,b)}),pe}function Jw(d,g,v,b,C){var N=v._reactRootContainer;if(N){var W=N;if(typeof C=="function"){var le=C;C=function(){var pe=Xw(W);le.call(pe)}}qw(g,W,d,C)}else W=xte(v,g,d,C,b);return Xw(W)}tn=function(d){switch(d.tag){case 3:var g=d.stateNode;if(g.current.memoizedState.isDehydrated){var v=qe(g.pendingLanes);v!==0&&(ze(g,v|1),Qa(g,Be()),(Tr&6)===0&&(Ip=Be()+500,fd()))}break;case 13:ff(function(){var b=fu(d,1);if(b!==null){var C=za();Ll(b,d,1,C)}}),nA(d,1)}},Ft=function(d){if(d.tag===13){var g=fu(d,134217728);if(g!==null){var v=za();Ll(g,d,134217728,v)}nA(d,134217728)}},Mn=function(d){if(d.tag===13){var g=xd(d),v=fu(d,g);if(v!==null){var b=za();Ll(v,d,g,b)}nA(d,g)}},mr=function(){return He},Ri=function(d,g){var v=He;try{return He=d,g()}finally{He=v}},Qn=function(d,g,v){switch(g){case"input":if(Ze(d,v),g=v.name,v.type==="radio"&&g!=null){for(v=d;v.parentNode;)v=v.parentNode;for(v=v.querySelectorAll("input[name="+JSON.stringify(""+g)+'][type="radio"]'),g=0;g<v.length;g++){var b=v[g];if(b!==d&&b.form===d.form){var C=pw(b);if(!C)throw Error(t(90));Rt(b),Ze(b,C)}}}break;case"textarea":fn(d,v);break;case"select":g=v.value,g!=null&&Pn(d,!!v.multiple,g,!1)}},Tn=XC,cr=ff;var _te={usingClientEntryPoint:!1,Events:[Fy,mp,pw,Bi,me,XC]},Yy={findFiberByHostInstance:sf,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},wte={bundleType:Yy.bundleType,version:Yy.version,rendererPackageName:Yy.rendererPackageName,rendererConfig:Yy.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:A.ReactCurrentDispatcher,findHostInstanceByFiber:function(d){return d=ke(d),d===null?null:d.stateNode},findFiberByHostInstance:Yy.findFiberByHostInstance||vte,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Qw=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qw.isDisabled&&Qw.supportsFiber)try{we=Qw.inject(wte),Ot=Qw}catch{}}return eo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_te,eo.createPortal=function(d,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!iA(g))throw Error(t(200));return yte(d,g,null,v)},eo.createRoot=function(d,g){if(!iA(d))throw Error(t(299));var v=!1,b="",C=tD;return g!=null&&(g.unstable_strictMode===!0&&(v=!0),g.identifierPrefix!==void 0&&(b=g.identifierPrefix),g.onRecoverableError!==void 0&&(C=g.onRecoverableError)),g=tA(d,1,!1,null,null,v,!1,b,C),d[cu]=g.current,My(d.nodeType===8?d.parentNode:d),new rA(g)},eo.findDOMNode=function(d){if(d==null)return null;if(d.nodeType===1)return d;var g=d._reactInternals;if(g===void 0)throw typeof d.render=="function"?Error(t(188)):(d=Object.keys(d).join(","),Error(t(268,d)));return d=ke(g),d=d===null?null:d.stateNode,d},eo.flushSync=function(d){return ff(d)},eo.hydrate=function(d,g,v){if(!Zw(g))throw Error(t(200));return Jw(null,d,g,!0,v)},eo.hydrateRoot=function(d,g,v){if(!iA(d))throw Error(t(405));var b=v!=null&&v.hydratedSources||null,C=!1,N="",W=tD;if(v!=null&&(v.unstable_strictMode===!0&&(C=!0),v.identifierPrefix!==void 0&&(N=v.identifierPrefix),v.onRecoverableError!==void 0&&(W=v.onRecoverableError)),g=QF(g,null,d,1,v??null,C,!1,N,W),d[cu]=g.current,My(d),b)for(d=0;d<b.length;d++)v=b[d],C=v._getVersion,C=C(v._source),g.mutableSourceEagerHydrationData==null?g.mutableSourceEagerHydrationData=[v,C]:g.mutableSourceEagerHydrationData.push(v,C);return new Yw(g)},eo.render=function(d,g,v){if(!Zw(g))throw Error(t(200));return Jw(null,d,g,!1,v)},eo.unmountComponentAtNode=function(d){if(!Zw(d))throw Error(t(40));return d._reactRootContainer?(ff(function(){Jw(null,null,d,!1,function(){d._reactRootContainer=null,d[cu]=null})}),!0):!1},eo.unstable_batchedUpdates=XC,eo.unstable_renderSubtreeIntoContainer=function(d,g,v,b){if(!Zw(v))throw Error(t(200));if(d==null||d._reactInternals===void 0)throw Error(t(38));return Jw(d,g,v,!1,b)},eo.version="18.3.1-next-f1338f8080-20240426",eo}var uD;function Ite(){if(uD)return oA.exports;uD=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}return n(),oA.exports=Ate(),oA.exports}var dD;function Rte(){if(dD)return eb;dD=1;var n=Ite();return eb.createRoot=n.createRoot,eb.hydrateRoot=n.hydrateRoot,eb}var Pte=Rte();const Nte=hN(Pte);var B=Gx();const Mte=hN(B);const Lte=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),jte=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase()),hD=n=>{const e=jte(n);return e.charAt(0).toUpperCase()+e.slice(1)},DV=(...n)=>n.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim(),Fte=n=>{for(const e in n)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var Dte={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Ote=B.forwardRef(({color:n="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:a,...o},l)=>B.createElement("svg",{ref:l,...Dte,width:e,height:e,stroke:n,strokeWidth:r?Number(t)*24/Number(e):t,className:DV("lucide",i),...!s&&!Fte(o)&&{"aria-hidden":"true"},...o},[...a.map(([c,u])=>B.createElement(c,u)),...Array.isArray(s)?s:[s]]));const ht=(n,e)=>{const t=B.forwardRef(({className:r,...i},s)=>B.createElement(Ote,{ref:s,iconNode:e,className:DV(`lucide-${Lte(hD(n))}`,`lucide-${n}`,r),...i}));return t.displayName=hD(n),t};const zte=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],OV=ht("arrow-left",zte);const Gte=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],eE=ht("book-open",Gte);const Vte=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]],fD=ht("bookmark",Vte);const Bte=[["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z",key:"uouzyp"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M21 21a4 4 0 0 0-3.81-4",key:"1b0z45"}],["path",{d:"M21 5a4 4 0 0 1-3.55 3.97",key:"5cxbf6"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M3 21a4 4 0 0 1 3.81-4",key:"1fjd4g"}],["path",{d:"M3 5a4 4 0 0 0 3.55 3.97",key:"1d7oge"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M9 7.13V6a3 3 0 1 1 6 0v1.13",key:"1vgav8"}]],zV=ht("bug",Bte);const Ute=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],fN=ht("calendar",Ute);const $te=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],GV=ht("chart-column",$te);const Wte=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Gu=ht("check",Wte);const Hte=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Vx=ht("chevron-down",Hte);const Kte=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],VV=ht("chevron-left",Kte);const qte=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Oo=ht("chevron-right",qte);const Xte=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],gN=ht("chevron-up",Xte);const Yte=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],pN=ht("circle-alert",Yte);const Zte=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Jte=ht("circle-check-big",Zte);const Qte=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],ene=ht("circle",Qte);const tne=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],tE=ht("clock",tne);const nne=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 17H7",key:"pygtm1"}],["path",{d:"M17 21H9",key:"1u2q02"}]],rne=ht("cloud-fog",nne);const ine=[["path",{d:"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973",key:"1cez44"}],["path",{d:"m13 12-3 5h4l-3 5",key:"1t22er"}]],sne=ht("cloud-lightning",ine);const ane=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v6",key:"1j4efv"}],["path",{d:"M8 14v6",key:"17c4r9"}],["path",{d:"M12 16v6",key:"c8a4gj"}]],nE=ht("cloud-rain",ane);const one=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M8 19h.01",key:"puxtts"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M12 21h.01",key:"h35vbk"}],["path",{d:"M16 15h.01",key:"rnfrdf"}],["path",{d:"M16 19h.01",key:"1vcnzz"}]],lne=ht("cloud-snow",one);const cne=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],Qf=ht("cloud",cne);const une=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],mN=ht("compass",une);const dne=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]],P1=ht("crosshair",dne);const hne=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],BV=ht("download",hne);const fne=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],ah=ht("external-link",fne);const gne=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],gD=ht("eye-off",gne);const pne=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],MI=ht("eye",pne);const mne=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["circle",{cx:"10",cy:"12",r:"2",key:"737tya"}],["path",{d:"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",key:"wt3hpn"}]],pD=ht("file-image",mne);const yne=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],yN=ht("file-text",yne);const vne=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],xne=ht("flame",vne);const _ne=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],UV=ht("folder-open",_ne);const wne=[["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"M9 13h6",key:"1uhe8q"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],bne=ht("folder-plus",wne);const Ene=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],$V=ht("folder",Ene);const Sne=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],N1=ht("funnel",Sne);const kne=[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]],Tne=ht("gauge",kne);const Cne=[["path",{d:"M10.5 3 8 9l4 13 4-13-2.5-6",key:"b3dvk1"}],["path",{d:"M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",key:"7w4byz"}],["path",{d:"M2 9h20",key:"16fsjt"}]],Ane=ht("gem",Cne);const Ine=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Rne=ht("globe",Ine);const Pne=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],WV=ht("grid-3x3",Pne);const Nne=[["circle",{cx:"12",cy:"9",r:"1",key:"124mty"}],["circle",{cx:"19",cy:"9",r:"1",key:"1ruzo2"}],["circle",{cx:"5",cy:"9",r:"1",key:"1a8b28"}],["circle",{cx:"12",cy:"15",r:"1",key:"1e56xg"}],["circle",{cx:"19",cy:"15",r:"1",key:"1a92ep"}],["circle",{cx:"5",cy:"15",r:"1",key:"5r1jwy"}]],Mne=ht("grip-horizontal",Nne);const Lne=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],vN=ht("history",Lne);const jne=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],rE=ht("info",jne);const Fne=[["path",{d:"M10 18v-7",key:"wt116b"}],["path",{d:"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",key:"1m329m"}],["path",{d:"M14 18v-7",key:"vav6t3"}],["path",{d:"M18 18v-7",key:"aexdmj"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M6 18v-7",key:"1ivflk"}]],HV=ht("landmark",Fne);const Dne=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],rc=ht("layers",Dne);const One=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],fg=ht("list",One);const zne=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],U0=ht("loader-circle",zne);const Gne=[["line",{x1:"2",x2:"5",y1:"12",y2:"12",key:"bvdh0s"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12",key:"1tbv5k"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5",key:"11lu5j"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}],["circle",{cx:"12",cy:"12",r:"7",key:"fim9np"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Vne=ht("locate-fixed",Gne);const Bne=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Une=ht("log-out",Bne);const $ne=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Ai=ht("map-pin",$ne);const Wne=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]],eg=ht("map",Wne);const Hne=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],LI=ht("menu",Hne);const Kne=[["path",{d:"M5 12h14",key:"1ays0h"}]],KV=ht("minus",Kne);const qne=[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z",key:"otkl63"}]],n0=ht("mountain",qne);const Xne=[["path",{d:"M12.586 12.586 19 19",key:"ea5xo7"}],["path",{d:"M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",key:"277e5u"}]],Yne=ht("mouse-pointer",Xne);const Zne=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m19 9 3 3-3 3",key:"1mg7y2"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]],Jne=ht("move",Zne);const Qne=[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]],kc=ht("navigation",Qne);const ere=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],tre=ht("palette",ere);const nre=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],qV=ht("pause",nre);const rre=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],mD=ht("pen-line",rre);const ire=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],Hc=ht("pencil",ire);const sre=[["path",{d:"M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",key:"2hea0t"}]],are=ht("pentagon",sre);const ore=[["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["path",{d:"m9 20 3-6 3 6",key:"se2kox"}],["path",{d:"m6 8 6 2 6-2",key:"4o3us4"}],["path",{d:"M12 10v4",key:"1kjpxc"}]],XV=ht("person-standing",ore);const lre=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],cre=ht("phone",lre);const ure=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],YV=ht("play",ure);const dre=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],r0=ht("plus",dre);const hre=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],Pm=ht("printer",hre);const fre=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],jI=ht("refresh-cw",fre);const gre=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],xN=ht("rotate-ccw",gre);const pre=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]],mre=ht("rotate-cw",pre);const yre=[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]],i0=ht("route",yre);const vre=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",key:"icamh8"}],["path",{d:"m14.5 12.5 2-2",key:"inckbg"}],["path",{d:"m11.5 9.5 2-2",key:"fmmyf7"}],["path",{d:"m8.5 6.5 2-2",key:"vc6u1g"}],["path",{d:"m17.5 15.5 2-2",key:"wo5hmg"}]],Xl=ht("ruler",vre);const xre=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],_N=ht("save",xre);const _re=[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"m19 8 3 8a5 5 0 0 1-6 0zV7",key:"zcdpyk"}],["path",{d:"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",key:"1yorad"}],["path",{d:"m5 8 3 8a5 5 0 0 1-6 0zV7",key:"eua70x"}],["path",{d:"M7 21h10",key:"1b0cd5"}]],wre=ht("scale",_re);const bre=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],wh=ht("search",bre);const Ere=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],M1=ht("settings",Ere);const Sre=[["path",{d:"M14 17H5",key:"gfn3mx"}],["path",{d:"M19 7h-9",key:"6i9tg"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]],ZV=ht("settings-2",Sre);const kre=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],JV=ht("share-2",kre);const Tre=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Cre=ht("shield",Tre);const Are=[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]],tk=ht("sliders-horizontal",Are);const Ire=[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],Rre=ht("sliders-vertical",Ire);const Pre=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],yD=ht("smartphone",Pre);const Nre=[["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M5 17A12 12 0 0 1 17 5",key:"1okkup"}]],Mre=ht("spline",Nre);const Lre=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],jre=ht("square",Lre);const Fre=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],uA=ht("star",Fre);const Dre=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Ore=ht("sun",Dre);const zre=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Gre=ht("tag",zre);const Vre=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Bre=ht("target",Vre);const Ure=[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]],$re=ht("timer",Ure);const Wre=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],bh=ht("trash-2",Wre);const Hre=[["path",{d:"M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4",key:"foxbe7"}],["path",{d:"M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3",key:"18arnh"}],["path",{d:"M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35",key:"ywahnh"}],["path",{d:"M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14",key:"ft0feo"}]],Kre=ht("tree-palm",Hre);const qre=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],Xre=ht("trending-down",qre);const Yre=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],Zre=ht("trending-up",Yre);const Jre=[["path",{d:"M12 4v16",key:"1654pz"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",key:"e0r10z"}],["path",{d:"M9 20h6",key:"s66wpe"}]],wN=ht("type",Jre);const Qre=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],Bx=ht("upload",Qre);const eie=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],tie=ht("user",eie);const nie=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]],rie=ht("waves",nie);const iie=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],sie=ht("wifi-off",iie);const aie=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]],oie=ht("wind",aie);const lie=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],mo=ht("x",lie);const cie=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],uie=ht("zoom-in",cie),s0={PROPERTYCHANGE:"propertychange"},In={CHANGE:"change",ERROR:"error",CONTEXTMENU:"contextmenu",CLICK:"click",DBLCLICK:"dblclick",KEYDOWN:"keydown",KEYPRESS:"keypress",LOAD:"load",TOUCHMOVE:"touchmove",WHEEL:"wheel"};class Ux{constructor(){this.disposed=!1}dispose(){this.disposed||(this.disposed=!0,this.disposeInternal())}disposeInternal(){}}function die(n,e,t){let r,i;t=t||Fc;let s=0,a=n.length,o=!1;for(;s<a;)r=s+(a-s>>1),i=+t(n[r],e),i<0?s=r+1:(a=r,o=!i);return o?s:~s}function Fc(n,e){return n>e?1:n<e?-1:0}function hie(n,e){return n<e?1:n>e?-1:0}function nk(n,e,t){if(n[0]<=e)return 0;const r=n.length;if(e<=n[r-1])return r-1;if(typeof t=="function"){for(let i=1;i<r;++i){const s=n[i];if(s===e)return i;if(s<e)return t(e,n[i-1],s)>0?i-1:i}return r-1}if(t>0){for(let i=1;i<r;++i)if(n[i]<e)return i-1;return r-1}if(t<0){for(let i=1;i<r;++i)if(n[i]<=e)return i;return r-1}for(let i=1;i<r;++i){if(n[i]==e)return i;if(n[i]<e)return n[i-1]-e<e-n[i]?i-1:i}return r-1}function fie(n,e,t){for(;e<t;){const r=n[e];n[e]=n[t],n[t]=r,++e,--t}}function Fr(n,e){const t=Array.isArray(e)?e:[e],r=t.length;for(let i=0;i<r;i++)n[n.length]=t[i]}function tu(n,e){const t=n.length;if(t!==e.length)return!1;for(let r=0;r<t;r++)if(n[r]!==e[r])return!1;return!0}function gie(n,e,t){const r=e||Fc;return n.every(function(i,s){if(s===0)return!0;const a=r(n[s-1],i);return!(a>0||a===0)})}function Eh(){return!0}function $0(){return!1}function L1(){}function QV(n){let e,t,r;return function(){const i=Array.prototype.slice.call(arguments);return(!t||this!==r||!tu(i,t))&&(r=this,t=i,e=n.apply(this,arguments)),e}}function a0(n){function e(){let t;try{t=n()}catch(r){return Promise.reject(r)}return t instanceof Promise?t:Promise.resolve(t)}return e()}function zg(n){for(const e in n)delete n[e]}function Sh(n){let e;for(e in n)return!1;return!e}class Zo{constructor(e){this.propagationStopped,this.defaultPrevented,this.type=e,this.target=null}preventDefault(){this.defaultPrevented=!0}stopPropagation(){this.propagationStopped=!0}}class $x extends Ux{constructor(e){super(),this.eventTarget_=e,this.pendingRemovals_=null,this.dispatching_=null,this.listeners_=null}addEventListener(e,t){if(!e||!t)return;const r=this.listeners_||(this.listeners_={}),i=r[e]||(r[e]=[]);i.includes(t)||i.push(t)}dispatchEvent(e){const t=typeof e=="string",r=t?e:e.type,i=this.listeners_&&this.listeners_[r];if(!i)return;const s=t?new Zo(e):e;s.target||(s.target=this.eventTarget_||this);const a=this.dispatching_||(this.dispatching_={}),o=this.pendingRemovals_||(this.pendingRemovals_={});r in a||(a[r]=0,o[r]=0),++a[r];let l;for(let c=0,u=i.length;c<u;++c)if("handleEvent"in i[c]?l=i[c].handleEvent(s):l=i[c].call(this,s),l===!1||s.propagationStopped){l=!1;break}if(--a[r]===0){let c=o[r];for(delete o[r];c--;)this.removeEventListener(r,L1);delete a[r]}return l}disposeInternal(){this.listeners_&&zg(this.listeners_)}getListeners(e){return this.listeners_&&this.listeners_[e]||void 0}hasListener(e){return this.listeners_?e?e in this.listeners_:Object.keys(this.listeners_).length>0:!1}removeEventListener(e,t){if(!this.listeners_)return;const r=this.listeners_[e];if(!r)return;const i=r.indexOf(t);i!==-1&&(this.pendingRemovals_&&e in this.pendingRemovals_?(r[i]=L1,++this.pendingRemovals_[e]):(r.splice(i,1),r.length===0&&delete this.listeners_[e]))}}function hr(n,e,t,r,i){if(i){const a=t;t=function(o){return n.removeEventListener(e,t),a.call(r??this,o)}}else r&&r!==n&&(t=t.bind(r));const s={target:n,type:e,listener:t};return n.addEventListener(e,t),s}function iE(n,e,t,r){return hr(n,e,t,r,!0)}function si(n){n&&n.target&&(n.target.removeEventListener(n.type,n.listener),zg(n))}class Wx extends $x{constructor(){super(),this.on=this.onInternal,this.once=this.onceInternal,this.un=this.unInternal,this.revision_=0}changed(){++this.revision_,this.dispatchEvent(In.CHANGE)}getRevision(){return this.revision_}onInternal(e,t){if(Array.isArray(e)){const r=e.length,i=new Array(r);for(let s=0;s<r;++s)i[s]=hr(this,e[s],t);return i}return hr(this,e,t)}onceInternal(e,t){let r;if(Array.isArray(e)){const i=e.length;r=new Array(i);for(let s=0;s<i;++s)r[s]=iE(this,e[s],t)}else r=iE(this,e,t);return t.ol_key=r,r}unInternal(e,t){const r=t.ol_key;if(r)FI(r);else if(Array.isArray(e))for(let i=0,s=e.length;i<s;++i)this.removeEventListener(e[i],t);else this.removeEventListener(e,t)}}Wx.prototype.on;Wx.prototype.once;Wx.prototype.un;function FI(n){if(Array.isArray(n))for(let e=0,t=n.length;e<t;++e)si(n[e]);else si(n)}function jn(){throw new Error("Unimplemented abstract method.")}let pie=0;function Dt(n){return n.ol_uid||(n.ol_uid=String(++pie))}class vD extends Zo{constructor(e,t,r){super(e),this.key=t,this.oldValue=r}}class nu extends Wx{constructor(e){super(),this.on,this.once,this.un,Dt(this),this.values_=null,e!==void 0&&this.setProperties(e)}get(e){let t;return this.values_&&this.values_.hasOwnProperty(e)&&(t=this.values_[e]),t}getKeys(){return this.values_&&Object.keys(this.values_)||[]}getProperties(){return this.values_&&Object.assign({},this.values_)||{}}getPropertiesInternal(){return this.values_}hasProperties(){return!!this.values_}notify(e,t){let r;r=`change:${e}`,this.hasListener(r)&&this.dispatchEvent(new vD(r,e,t)),r=s0.PROPERTYCHANGE,this.hasListener(r)&&this.dispatchEvent(new vD(r,e,t))}addChangeListener(e,t){this.addEventListener(`change:${e}`,t)}removeChangeListener(e,t){this.removeEventListener(`change:${e}`,t)}set(e,t,r){const i=this.values_||(this.values_={});if(r)i[e]=t;else{const s=i[e];i[e]=t,s!==t&&this.notify(e,s)}}setProperties(e,t){for(const r in e)this.set(r,e[r],t)}applyProperties(e){e.values_&&Object.assign(this.values_||(this.values_={}),e.values_)}unset(e,t){if(this.values_&&e in this.values_){const r=this.values_[e];delete this.values_[e],Sh(this.values_)&&(this.values_=null),t||this.notify(e,r)}}}function Er(n,e){if(!n)throw new Error(e)}let sr=class eB extends nu{constructor(e){if(super(),this.on,this.once,this.un,this.id_=void 0,this.geometryName_="geometry",this.style_=null,this.styleFunction_=void 0,this.geometryChangeKey_=null,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),e)if(typeof e.getSimplifiedGeometry=="function"){const t=e;this.setGeometry(t)}else{const t=e;this.setProperties(t)}}clone(){const e=new eB(this.hasProperties()?this.getProperties():null);e.setGeometryName(this.getGeometryName());const t=this.getGeometry();t&&e.setGeometry(t.clone());const r=this.getStyle();return r&&e.setStyle(r),e}getGeometry(){return this.get(this.geometryName_)}getId(){return this.id_}getGeometryName(){return this.geometryName_}getStyle(){return this.style_}getStyleFunction(){return this.styleFunction_}handleGeometryChange_(){this.changed()}handleGeometryChanged_(){this.geometryChangeKey_&&(si(this.geometryChangeKey_),this.geometryChangeKey_=null);const e=this.getGeometry();e&&(this.geometryChangeKey_=hr(e,In.CHANGE,this.handleGeometryChange_,this)),this.changed()}setGeometry(e){this.set(this.geometryName_,e)}setStyle(e){this.style_=e,this.styleFunction_=e?mie(e):void 0,this.changed()}setId(e){this.id_=e,this.changed()}setGeometryName(e){this.removeChangeListener(this.geometryName_,this.handleGeometryChanged_),this.geometryName_=e,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),this.handleGeometryChanged_()}};function mie(n){if(typeof n=="function")return n;let e;return Array.isArray(n)?e=n:(Er(typeof n.getZIndex=="function","Expected an `ol/style/Style` or an array of `ol/style/Style.js`"),e=[n]),function(){return e}}const Vs={UNKNOWN:0,INTERSECTING:1,ABOVE:2,RIGHT:4,BELOW:8,LEFT:16};function zs(n){const e=Ka();for(let t=0,r=n.length;t<r;++t)Hv(e,n[t]);return e}function yie(n,e,t){const r=Math.min.apply(null,n),i=Math.min.apply(null,e),s=Math.max.apply(null,n),a=Math.max.apply(null,e);return Kc(r,i,s,a,t)}function Ra(n,e,t){return t?(t[0]=n[0]-e,t[1]=n[1]-e,t[2]=n[2]+e,t[3]=n[3]+e,t):[n[0]-e,n[1]-e,n[2]+e,n[3]+e]}function tB(n,e){return e?(e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e):n.slice()}function Gg(n,e,t){let r,i;return e<n[0]?r=n[0]-e:n[2]<e?r=e-n[2]:r=0,t<n[1]?i=n[1]-t:n[3]<t?i=t-n[3]:i=0,r*r+i*i}function gg(n,e){return bN(n,e[0],e[1])}function Ic(n,e){return n[0]<=e[0]&&e[2]<=n[2]&&n[1]<=e[1]&&e[3]<=n[3]}function bN(n,e,t){return n[0]<=e&&e<=n[2]&&n[1]<=t&&t<=n[3]}function DI(n,e){const t=n[0],r=n[1],i=n[2],s=n[3],a=e[0],o=e[1];let l=Vs.UNKNOWN;return a<t?l=l|Vs.LEFT:a>i&&(l=l|Vs.RIGHT),o<r?l=l|Vs.BELOW:o>s&&(l=l|Vs.ABOVE),l===Vs.UNKNOWN&&(l=Vs.INTERSECTING),l}function Ka(){return[1/0,1/0,-1/0,-1/0]}function Kc(n,e,t,r,i){return i?(i[0]=n,i[1]=e,i[2]=t,i[3]=r,i):[n,e,t,r]}function W0(n){return Kc(1/0,1/0,-1/0,-1/0,n)}function Wv(n,e){const t=n[0],r=n[1];return Kc(t,r,t,r,e)}function EN(n,e,t,r,i){const s=W0(i);return nB(s,n,e,t,r)}function kh(n,e){return n[0]==e[0]&&n[2]==e[2]&&n[1]==e[1]&&n[3]==e[3]}function SN(n,e){return e[0]<n[0]&&(n[0]=e[0]),e[2]>n[2]&&(n[2]=e[2]),e[1]<n[1]&&(n[1]=e[1]),e[3]>n[3]&&(n[3]=e[3]),n}function Hv(n,e){e[0]<n[0]&&(n[0]=e[0]),e[0]>n[2]&&(n[2]=e[0]),e[1]<n[1]&&(n[1]=e[1]),e[1]>n[3]&&(n[3]=e[1])}function nB(n,e,t,r,i){for(;t<r;t+=i)vie(n,e[t],e[t+1]);return n}function vie(n,e,t){n[0]=Math.min(n[0],e),n[1]=Math.min(n[1],t),n[2]=Math.max(n[2],e),n[3]=Math.max(n[3],t)}function kN(n,e){let t;return t=e(rk(n)),t||(t=e(ik(n)),t)||(t=e(sk(n)),t)||(t=e(Zu(n)),t)?t:!1}function OI(n){let e=0;return Vg(n)||(e=fr(n)*ps(n)),e}function rk(n){return[n[0],n[1]]}function ik(n){return[n[2],n[1]]}function wl(n){return[(n[0]+n[2])/2,(n[1]+n[3])/2]}function xie(n,e){let t;if(e==="bottom-left")t=rk(n);else if(e==="bottom-right")t=ik(n);else if(e==="top-left")t=Zu(n);else if(e==="top-right")t=sk(n);else throw new Error("Invalid corner");return t}function sE(n,e,t,r,i){const[s,a,o,l,c,u,f,p]=rB(n,e,t,r);return Kc(Math.min(s,o,c,f),Math.min(a,l,u,p),Math.max(s,o,c,f),Math.max(a,l,u,p),i)}function rB(n,e,t,r){const i=e*r[0]/2,s=e*r[1]/2,a=Math.cos(t),o=Math.sin(t),l=i*a,c=i*o,u=s*a,f=s*o,p=n[0],m=n[1];return[p-l+f,m-c-u,p-l-f,m-c+u,p+l-f,m+c+u,p+l+f,m+c-u,p-l+f,m-c-u]}function ps(n){return n[3]-n[1]}function Yl(n,e,t){const r=t||Ka();return Fi(n,e)?(n[0]>e[0]?r[0]=n[0]:r[0]=e[0],n[1]>e[1]?r[1]=n[1]:r[1]=e[1],n[2]<e[2]?r[2]=n[2]:r[2]=e[2],n[3]<e[3]?r[3]=n[3]:r[3]=e[3]):W0(r),r}function Zu(n){return[n[0],n[3]]}function sk(n){return[n[2],n[3]]}function fr(n){return n[2]-n[0]}function Fi(n,e){return n[0]<=e[2]&&n[2]>=e[0]&&n[1]<=e[3]&&n[3]>=e[1]}function Vg(n){return n[2]<n[0]||n[3]<n[1]}function _ie(n,e){return e?(e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e):n}function wie(n,e,t){let r=!1;const i=DI(n,e),s=DI(n,t);if(i===Vs.INTERSECTING||s===Vs.INTERSECTING)r=!0;else{const a=n[0],o=n[1],l=n[2],c=n[3],u=e[0],f=e[1],p=t[0],m=t[1],y=(m-f)/(p-u);let x,_;s&Vs.ABOVE&&!(i&Vs.ABOVE)&&(x=p-(m-c)/y,r=x>=a&&x<=l),!r&&s&Vs.RIGHT&&!(i&Vs.RIGHT)&&(_=m-(p-l)*y,r=_>=o&&_<=c),!r&&s&Vs.BELOW&&!(i&Vs.BELOW)&&(x=p-(m-o)/y,r=x>=a&&x<=l),!r&&s&Vs.LEFT&&!(i&Vs.LEFT)&&(_=m-(p-a)*y,r=_>=o&&_<=c)}return r}function iB(n,e,t,r){if(Vg(n))return W0(t);let i=[];if(r>1){const o=n[2]-n[0],l=n[3]-n[1];for(let c=0;c<r;++c)i.push(n[0]+o*c/r,n[1],n[2],n[1]+l*c/r,n[2]-o*c/r,n[3],n[0],n[3]-l*c/r)}else i=[n[0],n[1],n[2],n[1],n[2],n[3],n[0],n[3]];e(i,i,2);const s=[],a=[];for(let o=0,l=i.length;o<l;o+=2)s.push(i[o]),a.push(i[o+1]);return yie(s,a,t)}function sB(n,e){const t=e.getExtent(),r=wl(n);if(e.canWrapX()&&(r[0]<t[0]||r[0]>=t[2])){const i=fr(t),a=Math.floor((r[0]-t[0])/i)*i;n[0]-=a,n[2]-=a}return n}function aB(n,e,t){if(e.canWrapX()){const r=e.getExtent();if(!isFinite(n[0])||!isFinite(n[2]))return[[r[0],n[1],r[2],n[3]]];sB(n,e);const i=fr(r);if(fr(n)>i&&!t)return[[r[0],n[1],r[2],n[3]]];if(n[0]<r[0])return[[n[0]+i,n[1],r[2],n[3]],[r[0],n[1],n[2],n[3]]];if(n[2]>r[2])return[[n[0],n[1],r[2],n[3]],[r[0],n[1],n[2]-i,n[3]]]}return[n]}function ai(n,e,t){return Math.min(Math.max(n,e),t)}function bie(n,e,t,r,i,s){const a=i-t,o=s-r;if(a!==0||o!==0){const l=((n-t)*a+(e-r)*o)/(a*a+o*o);l>1?(t=i,r=s):l>0&&(t+=a*l,r+=o*l)}return Ru(n,e,t,r)}function Ru(n,e,t,r){const i=t-n,s=r-e;return i*i+s*s}function Eie(n){const e=n.length;for(let r=0;r<e;r++){let i=r,s=Math.abs(n[r][r]);for(let o=r+1;o<e;o++){const l=Math.abs(n[o][r]);l>s&&(s=l,i=o)}if(s===0)return null;const a=n[i];n[i]=n[r],n[r]=a;for(let o=r+1;o<e;o++){const l=-n[o][r]/n[r][r];for(let c=r;c<e+1;c++)r==c?n[o][c]=0:n[o][c]+=l*n[r][c]}}const t=new Array(e);for(let r=e-1;r>=0;r--){t[r]=n[r][e]/n[r][r];for(let i=r-1;i>=0;i--)n[i][e]-=n[i][r]*t[r]}return t}function xD(n){return n*180/Math.PI}function yl(n){return n*Math.PI/180}function oh(n,e){const t=n%e;return t*e<0?t+e:t}function jo(n,e,t){return n+t*(e-n)}function H0(n,e){const t=Math.pow(10,e);return Math.round(n*t)/t}function aE(n,e){return Math.round(H0(n,e))}function tb(n,e){return Math.floor(H0(n,e))}function qd(n,e){return Math.ceil(H0(n,e))}function zI(n,e,t){if(n>=e&&n<t)return n;const r=t-e;return((n-e)%r+r)%r+e}function oB(...n){console.warn(...n)}function Jy(n,e,t){const r=""+n;let i=r.indexOf(".");return i=i===-1?r.length:i,i>e?r:new Array(1+e-i).join("0")+r}function lB(n,e){const t=(""+n).split("."),r=(""+e).split(".");for(let i=0;i<Math.max(t.length,r.length);i++){const s=parseInt(t[i]||"0",10),a=parseInt(r[i]||"0",10);if(s>a)return 1;if(a>s)return-1}return 0}function Sie(n,e){return n[0]+=+e[0],n[1]+=+e[1],n}function TN(n,e){const t=n[0],r=n[1],i=e[0],s=e[1],a=i[0],o=i[1],l=s[0],c=s[1],u=l-a,f=c-o,p=u===0&&f===0?0:(u*(t-a)+f*(r-o))/(u*u+f*f||0);let m,y;return p<=0?(m=a,y=o):p>=1?(m=l,y=c):(m=a+p*u,y=o+p*f),[m,y]}function Ga(n,e){let t=!0;for(let r=n.length-1;r>=0;--r)if(n[r]!=e[r]){t=!1;break}return t}function CN(n,e){const t=Math.cos(e),r=Math.sin(e),i=n[0]*t-n[1]*r,s=n[1]*t+n[0]*r;return n[0]=i,n[1]=s,n}function kie(n,e){return n[0]*=e,n[1]*=e,n}function o0(n,e){const t=n[0]-e[0],r=n[1]-e[1];return t*t+r*r}function Vf(n,e){return Math.sqrt(o0(n,e))}function Tie(n,e){return o0(n,TN(n,e))}function AN(n,e){if(e.canWrapX()){const t=fr(e.getExtent()),r=cB(n,e,t);r&&(n[0]-=r*t)}return n}function cB(n,e,t){const r=e.getExtent();let i=0;return e.canWrapX()&&(n[0]<r[0]||n[0]>r[2])&&(t=t||fr(r),i=Math.floor((n[0]-r[0])/t)),i}const pg={radians:6370997/(2*Math.PI),degrees:2*Math.PI*6370997/360,ft:.3048,m:1,"us-ft":1200/3937};let Hx=class{constructor(e){this.code_=e.code,this.units_=e.units,this.extent_=e.extent!==void 0?e.extent:null,this.worldExtent_=e.worldExtent!==void 0?e.worldExtent:null,this.axisOrientation_=e.axisOrientation!==void 0?e.axisOrientation:"enu",this.global_=e.global!==void 0?e.global:!1,this.canWrapX_=!!(this.global_&&this.extent_),this.getPointResolutionFunc_=e.getPointResolution,this.defaultTileGrid_=null,this.metersPerUnit_=e.metersPerUnit}canWrapX(){return this.canWrapX_}getCode(){return this.code_}getExtent(){return this.extent_}getUnits(){return this.units_}getMetersPerUnit(){return this.metersPerUnit_||pg[this.units_]}getWorldExtent(){return this.worldExtent_}getAxisOrientation(){return this.axisOrientation_}isGlobal(){return this.global_}setGlobal(e){this.global_=e,this.canWrapX_=!!(e&&this.extent_)}getDefaultTileGrid(){return this.defaultTileGrid_}setDefaultTileGrid(e){this.defaultTileGrid_=e}setExtent(e){this.extent_=e,this.canWrapX_=!!(this.global_&&e)}setWorldExtent(e){this.worldExtent_=e}setGetPointResolution(e){this.getPointResolutionFunc_=e}getPointResolutionFunc(){return this.getPointResolutionFunc_}};const Kx=6378137,gm=Math.PI*Kx,Cie=[-gm,-gm,gm,gm],Aie=[-180,-85,180,85],nb=Kx*Math.log(Math.tan(Math.PI/2));class Pp extends Hx{constructor(e){super({code:e,units:"m",extent:Cie,global:!0,worldExtent:Aie,getPointResolution:function(t,r){return t/Math.cosh(r[1]/Kx)}})}}const _D=[new Pp("EPSG:3857"),new Pp("EPSG:102100"),new Pp("EPSG:102113"),new Pp("EPSG:900913"),new Pp("http://www.opengis.net/def/crs/EPSG/0/3857"),new Pp("http://www.opengis.net/gml/srs/epsg.xml#3857")];function Iie(n,e,t,r){const i=n.length;t=t>1?t:2,r=r??t,e===void 0&&(t>2?e=n.slice():e=new Array(i));for(let s=0;s<i;s+=r){e[s]=gm*n[s]/180;let a=Kx*Math.log(Math.tan(Math.PI*(+n[s+1]+90)/360));a>nb?a=nb:a<-nb&&(a=-nb),e[s+1]=a}return e}function Rie(n,e,t,r){const i=n.length;t=t>1?t:2,r=r??t,e===void 0&&(t>2?e=n.slice():e=new Array(i));for(let s=0;s<i;s+=r)e[s]=180*n[s]/gm,e[s+1]=360*Math.atan(Math.exp(n[s+1]/Kx))/Math.PI-90;return e}const Pie=6378137,wD=[-180,-90,180,90],Nie=Math.PI*Pie/180;class yf extends Hx{constructor(e,t){super({code:e,units:"degrees",extent:wD,axisOrientation:t,global:!0,metersPerUnit:Nie,worldExtent:wD})}}const bD=[new yf("CRS:84"),new yf("EPSG:4326","neu"),new yf("urn:ogc:def:crs:OGC:1.3:CRS84"),new yf("urn:ogc:def:crs:OGC:2:84"),new yf("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),new yf("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new yf("http://www.opengis.net/def/crs/EPSG/0/4326","neu")];let GI={};function f2(n){return GI[n]||GI[n.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/,"EPSG:$3")]||null}function Mie(n,e){GI[n]=e}let Nm={};function mg(n,e,t){const r=n.getCode(),i=e.getCode();r in Nm||(Nm[r]={}),Nm[r][i]=t}function g2(n,e){return n in Nm&&e in Nm[n]?Nm[n][e]:null}const oE=.9996,vl=.00669438,ak=vl*vl,ok=ak*vl,Bf=vl/(1-vl),ED=Math.sqrt(1-vl),l0=(1-ED)/(1+ED),uB=l0*l0,IN=uB*l0,RN=IN*l0,dB=RN*l0,hB=1-vl/4-3*ak/64-5*ok/256,Lie=3*vl/8+3*ak/32+45*ok/1024,jie=15*ak/256+45*ok/1024,Fie=35*ok/3072,Die=3/2*l0-27/32*IN+269/512*dB,Oie=21/16*uB-55/32*RN,zie=151/96*IN-417/128*dB,Gie=1097/512*RN,lE=6378137;function Vie(n,e,t){const r=n-5e5,a=(t.north?e:e-1e7)/oE/(lE*hB),o=a+Die*Math.sin(2*a)+Oie*Math.sin(4*a)+zie*Math.sin(6*a)+Gie*Math.sin(8*a),l=Math.sin(o),c=l*l,u=Math.cos(o),f=l/u,p=f*f,m=p*p,y=1-vl*c,x=Math.sqrt(1-vl*c),_=lE/x,E=(1-vl)/y,S=Bf*u**2,k=S*S,A=r/(_*oE),P=A*A,z=P*A,I=z*A,T=I*A,R=T*A,L=o-f/E*(P/2-I/24*(5+3*p+10*S-4*k-9*Bf))+R/720*(61+90*p+298*S+45*m-252*Bf-3*k);let D=(A-z/6*(1+2*p+S)+T/120*(5-2*S+28*p-3*k+8*Bf+24*m))/u;return D=zI(D+yl(fB(t.number)),-Math.PI,Math.PI),[xD(D),xD(L)]}const SD=-80,kD=84,Bie=-180,Uie=180;function $ie(n,e,t){n=zI(n,Bie,Uie),e<SD?e=SD:e>kD&&(e=kD);const r=yl(e),i=Math.sin(r),s=Math.cos(r),a=i/s,o=a*a,l=o*o,c=yl(n),u=fB(t.number),f=yl(u),p=lE/Math.sqrt(1-vl*i**2),m=Bf*s**2,y=s*zI(c-f,-Math.PI,Math.PI),x=y*y,_=x*y,E=_*y,S=E*y,k=S*y,A=lE*(hB*r-Lie*Math.sin(2*r)+jie*Math.sin(4*r)-Fie*Math.sin(6*r)),P=oE*p*(y+_/6*(1-o+m)+S/120*(5-18*o+l+72*m-58*Bf))+5e5;let z=oE*(A+p*a*(x/2+E/24*(5-o+9*m+4*m**2)+k/720*(61-58*o+l+600*m-330*Bf)));return t.north||(z+=1e7),[P,z]}function fB(n){return(n-1)*6-180+3}const Wie=[/^EPSG:(\d+)$/,/^urn:ogc:def:crs:EPSG::(\d+)$/,/^http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/(\d+)$/];function gB(n){let e=0;for(const i of Wie){const s=n.match(i);if(s){e=parseInt(s[1]);break}}if(!e)return null;let t=0,r=!1;return e>32700&&e<32761?t=e-32700:e>32600&&e<32661&&(r=!0,t=e-32600),t?{number:t,north:r}:null}function TD(n,e){return function(t,r,i,s){const a=t.length;i=i>1?i:2,s=s??i,r||(i>2?r=t.slice():r=new Array(a));for(let o=0;o<a;o+=s){const l=t[o],c=t[o+1],u=n(l,c,e);r[o]=u[0],r[o+1]=u[1]}return r}}function Hie(n){return gB(n)?new Hx({code:n,units:"m"}):null}function Kie(n){const e=gB(n.getCode());return e?{forward:TD($ie,e),inverse:TD(Vie,e)}:null}const PN=63710088e-1;function VI(n,e,t){t=t||PN;const r=yl(n[1]),i=yl(e[1]),s=(i-r)/2,a=yl(e[0]-n[0])/2,o=Math.sin(s)*Math.sin(s)+Math.sin(a)*Math.sin(a)*Math.cos(r)*Math.cos(i);return 2*t*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}function dA(n,e){let t=0;for(let r=0,i=n.length;r<i-1;++r)t+=VI(n[r],n[r+1],e);return t}function j1(n,e){e=e||{};const t=e.radius||PN,r=e.projection||"EPSG:3857",i=n.getType();i!=="GeometryCollection"&&(n=n.clone().transform(r,"EPSG:4326"));let s=0,a,o,l,c,u,f;switch(i){case"Point":case"MultiPoint":break;case"LineString":case"LinearRing":{a=n.getCoordinates(),s=dA(a,t);break}case"MultiLineString":case"Polygon":{for(a=n.getCoordinates(),l=0,c=a.length;l<c;++l)s+=dA(a[l],t);break}case"MultiPolygon":{for(a=n.getCoordinates(),l=0,c=a.length;l<c;++l)for(o=a[l],u=0,f=o.length;u<f;++u)s+=dA(o[u],t);break}case"GeometryCollection":{const p=n.getGeometries();for(l=0,c=p.length;l<c;++l)s+=j1(p[l],e);break}default:throw new Error("Unsupported geometry type: "+i)}return s}function rb(n,e){let t=0;const r=n.length;let i=n[r-1][0],s=n[r-1][1];for(let a=0;a<r;a++){const o=n[a][0],l=n[a][1];t+=yl(o-i)*(2+Math.sin(yl(s))+Math.sin(yl(l))),i=o,s=l}return t*e*e/2}function BI(n,e){e=e||{};const t=e.radius||PN,r=e.projection||"EPSG:3857",i=n.getType();i!=="GeometryCollection"&&(n=n.clone().transform(r,"EPSG:4326"));let s=0,a,o,l,c,u,f;switch(i){case"Point":case"MultiPoint":case"LineString":case"MultiLineString":case"LinearRing":break;case"Polygon":{for(a=n.getCoordinates(),s=Math.abs(rb(a[0],t)),l=1,c=a.length;l<c;++l)s-=Math.abs(rb(a[l],t));break}case"MultiPolygon":{for(a=n.getCoordinates(),l=0,c=a.length;l<c;++l)for(o=a[l],s+=Math.abs(rb(o[0],t)),u=1,f=o.length;u<f;++u)s-=Math.abs(rb(o[u],t));break}case"GeometryCollection":{const p=n.getGeometries();for(l=0,c=p.length;l<c;++l)s+=BI(p[l],e);break}default:throw new Error("Unsupported geometry type: "+i)}return s}const qie=[Kie],Xie=[Hie];let UI=!0;function pB(n){UI=!1}function NN(n,e){if(e!==void 0){for(let t=0,r=n.length;t<r;++t)e[t]=n[t];e=e}else e=n.slice();return e}function cE(n){Mie(n.getCode(),n),mg(n,n,NN)}function Yie(n){n.forEach(cE)}function Zn(n){if(typeof n!="string")return n;const e=f2(n);if(e)return e;for(const t of Xie){const r=t(n);if(r)return r}return null}function uE(n,e,t,r){n=Zn(n);let i;const s=n.getPointResolutionFunc();if(s){if(i=s(e,t),r&&r!==n.getUnits()){const a=n.getMetersPerUnit();a&&(i=i*a/pg[r])}}else{const a=n.getUnits();if(a=="degrees"&&!r||r=="degrees")i=e;else{const o=qx(n,Zn("EPSG:4326"));if(!o&&a!=="degrees")i=e*n.getMetersPerUnit();else{let c=[t[0]-e/2,t[1],t[0]+e/2,t[1],t[0],t[1]-e/2,t[0],t[1]+e/2];c=o(c,c,2);const u=VI(c.slice(0,2),c.slice(2,4)),f=VI(c.slice(4,6),c.slice(6,8));i=(u+f)/2}const l=r?pg[r]:n.getMetersPerUnit();l!==void 0&&(i/=l)}}return i}function $I(n){Yie(n),n.forEach(function(e){n.forEach(function(t){e!==t&&mg(e,t,NN)})})}function Zie(n,e,t,r){n.forEach(function(i){e.forEach(function(s){mg(i,s,t),mg(s,i,r)})})}function MN(n,e){return n?typeof n=="string"?Zn(n):n:Zn(e)}function WI(n){return(function(e,t,r,i){const s=e.length;r=r!==void 0?r:2,i=i??r,t=t!==void 0?t:new Array(s);for(let a=0;a<s;a+=i){const o=n(e.slice(a,a+r)),l=o.length;for(let c=0,u=i;c<u;++c)t[a+c]=c>=l?e[a+c]:o[c]}return t})}function Jie(n,e,t,r){const i=Zn(n),s=Zn(e);mg(i,s,WI(t)),mg(s,i,WI(r))}function Ar(n,e){return pB(),K0(n,"EPSG:4326",e!==void 0?e:"EPSG:3857")}function Hn(n,e){const t=K0(n,"EPSG:3857","EPSG:4326"),r=t[0];return(r<-180||r>180)&&(t[0]=oh(r+180,360)-180),t}function As(n,e){if(n===e)return!0;const t=n.getUnits()===e.getUnits();return(n.getCode()===e.getCode()||qx(n,e)===NN)&&t}function qx(n,e){const t=n.getCode(),r=e.getCode();let i=g2(t,r);if(i)return i;let s=null,a=null;for(const l of qie)s||(s=l(n)),a||(a=l(e));if(!s&&!a)return null;const o="EPSG:4326";if(a)if(s)i=hA(s.inverse,a.forward);else{const l=g2(t,o);l&&(i=hA(l,a.forward))}else{const l=g2(o,r);l&&(i=hA(s.inverse,l))}return i&&(cE(n),cE(e),mg(n,e,i)),i}function hA(n,e){return function(t,r,i,s){return r=n(t,r,i,s),e(r,r,i,s)}}function yg(n,e){const t=Zn(n),r=Zn(e);return qx(t,r)}function K0(n,e,t){const r=yg(e,t);if(!r){const i=Zn(e).getCode(),s=Zn(t).getCode();throw new Error(`No transform available between ${i} and ${s}`)}return r(n,void 0,n.length)}function Mm(n,e,t,r){const i=yg(e,t);return iB(n,i,void 0,r)}let Qie=null;function ese(){return Qie}function vg(n,e){return n}function Li(n,e){return UI&&!Ga(n,[0,0])&&n[0]>=-180&&n[0]<=180&&n[1]>=-90&&n[1]<=90&&(UI=!1,oB("Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.")),n}function lk(n,e){return n}function Hl(n,e){return n}function CD(n,e,t){return function(r){let i,s;if(n.canWrapX()){const a=n.getExtent(),o=fr(a);r=r.slice(0),s=cB(r,n,o),s&&(r[0]=r[0]-s*o),r[0]=ai(r[0],a[0],a[2]),r[1]=ai(r[1],a[1],a[3]),i=t(r)}else i=t(r);return s&&e.canWrapX()&&(i[0]+=s*fr(e.getExtent())),i}}function tse(){$I(_D),$I(bD),Zie(bD,_D,Iie,Rie)}tse();const mB=new Array(6);function ms(){return[1,0,0,1,0,0]}function AD(n){return LN(n,1,0,0,1,0,0)}function ck(n,e){const t=n[0],r=n[1],i=n[2],s=n[3],a=n[4],o=n[5],l=e[0],c=e[1],u=e[2],f=e[3],p=e[4],m=e[5];return n[0]=t*l+i*c,n[1]=r*l+s*c,n[2]=t*u+i*f,n[3]=r*u+s*f,n[4]=t*p+i*m+a,n[5]=r*p+s*m+o,n}function LN(n,e,t,r,i,s,a){return n[0]=e,n[1]=t,n[2]=r,n[3]=i,n[4]=s,n[5]=a,n}function yB(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],n[4]=e[4],n[5]=e[5],n}function ji(n,e){const t=e[0],r=e[1];return e[0]=n[0]*t+n[2]*r+n[4],e[1]=n[1]*t+n[3]*r+n[5],e}function fA(n,e,t){return ck(n,LN(mB,e,0,0,t,0,0))}function vB(n,e,t){return ck(n,LN(mB,1,0,0,1,e,t))}function bl(n,e,t,r,i,s,a,o){const l=Math.sin(s),c=Math.cos(s);return n[0]=r*c,n[1]=i*l,n[2]=-r*l,n[3]=i*c,n[4]=a*r*c-o*r*l+e,n[5]=a*i*l+o*i*c+t,n}function F1(n,e){const t=nse(e);Er(t!==0,"Transformation matrix cannot be inverted");const r=e[0],i=e[1],s=e[2],a=e[3],o=e[4],l=e[5];return n[0]=a/t,n[1]=-i/t,n[2]=-s/t,n[3]=r/t,n[4]=(s*l-a*o)/t,n[5]=-(r*l-i*o)/t,n}function nse(n){return n[0]*n[3]-n[1]*n[2]}const rse=[1e5,1e5,1e5,1e5,2,2];function ise(n){return"matrix("+n.join(", ")+")"}function HI(n){return n.substring(7,n.length-1).split(",").map(parseFloat)}function sse(n,e){const t=HI(n),r=HI(e);for(let i=0;i<6;++i)if(Math.round((t[i]-r[i])*rse[i])!==0)return!1;return!0}function Dc(n,e,t,r,i,s,a){s=s||[],a=a||2;let o=0;for(let l=e;l<t;l+=r){const c=n[l],u=n[l+1];s[o++]=i[0]*c+i[2]*u+i[4],s[o++]=i[1]*c+i[3]*u+i[5];for(let f=2;f<a;f++)s[o++]=n[l+f]}return s&&s.length!=o&&(s.length=o),s}function jN(n,e,t,r,i,s,a){a=a||[];const o=Math.cos(i),l=Math.sin(i),c=s[0],u=s[1];let f=0;for(let p=e;p<t;p+=r){const m=n[p]-c,y=n[p+1]-u;a[f++]=c+m*o-y*l,a[f++]=u+m*l+y*o;for(let x=p+2;x<p+r;++x)a[f++]=n[x]}return a&&a.length!=f&&(a.length=f),a}function ase(n,e,t,r,i,s,a,o){o=o||[];const l=a[0],c=a[1];let u=0;for(let f=e;f<t;f+=r){const p=n[f]-l,m=n[f+1]-c;o[u++]=l+i*p,o[u++]=c+s*m;for(let y=f+2;y<f+r;++y)o[u++]=n[y]}return o&&o.length!=u&&(o.length=u),o}function ose(n,e,t,r,i,s,a){a=a||[];let o=0;for(let l=e;l<t;l+=r){a[o++]=n[l]+i,a[o++]=n[l+1]+s;for(let c=l+2;c<l+r;++c)a[o++]=n[c]}return a&&a.length!=o&&(a.length=o),a}const ID=ms(),lse=[NaN,NaN];class xB extends nu{constructor(){super(),this.extent_=Ka(),this.extentRevision_=-1,this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=0,this.simplifyTransformedInternal=QV((e,t,r)=>{if(!r)return this.getSimplifiedGeometry(t);const i=this.clone();return i.applyTransform(r),i.getSimplifiedGeometry(t)})}simplifyTransformed(e,t){return this.simplifyTransformedInternal(this.getRevision(),e,t)}clone(){return jn()}closestPointXY(e,t,r,i){return jn()}containsXY(e,t){return this.closestPointXY(e,t,lse,Number.MIN_VALUE)===0}getClosestPoint(e,t){return t=t||[NaN,NaN],this.closestPointXY(e[0],e[1],t,1/0),t}intersectsCoordinate(e){return this.containsXY(e[0],e[1])}computeExtent(e){return jn()}getExtent(e){if(this.extentRevision_!=this.getRevision()){const t=this.computeExtent(this.extent_);(isNaN(t[0])||isNaN(t[1]))&&W0(t),this.extentRevision_=this.getRevision()}return _ie(this.extent_,e)}rotate(e,t){jn()}scale(e,t,r){jn()}simplify(e){return this.getSimplifiedGeometry(e*e)}getSimplifiedGeometry(e){return jn()}getType(){return jn()}applyTransform(e){jn()}intersectsExtent(e){return jn()}translate(e,t){jn()}transform(e,t){const r=Zn(e),i=r.getUnits()=="tile-pixels"?function(s,a,o){const l=r.getExtent(),c=r.getWorldExtent(),u=ps(c)/ps(l);bl(ID,c[0],c[3],u,-u,0,0,0);const f=Dc(s,0,s.length,o,ID,a),p=yg(r,t);return p?p(f,f,o):f}:yg(r,t);return this.applyTransform(i),this}}class $h extends xB{constructor(){super(),this.layout="XY",this.stride=2,this.flatCoordinates}computeExtent(e){return EN(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,e)}getCoordinates(){return jn()}getFirstCoordinate(){return this.flatCoordinates.slice(0,this.stride)}getFlatCoordinates(){return this.flatCoordinates}getLastCoordinate(){return this.flatCoordinates.slice(this.flatCoordinates.length-this.stride)}getLayout(){return this.layout}getSimplifiedGeometry(e){if(this.simplifiedGeometryRevision!==this.getRevision()&&(this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=this.getRevision()),e<0||this.simplifiedGeometryMaxMinSquaredTolerance!==0&&e<=this.simplifiedGeometryMaxMinSquaredTolerance)return this;const t=this.getSimplifiedGeometryInternal(e);return t.getFlatCoordinates().length<this.flatCoordinates.length?t:(this.simplifiedGeometryMaxMinSquaredTolerance=e,this)}getSimplifiedGeometryInternal(e){return this}getStride(){return this.stride}setFlatCoordinates(e,t){this.stride=dE(e),this.layout=e,this.flatCoordinates=t}setCoordinates(e,t){jn()}setLayout(e,t,r){let i;if(e)i=dE(e);else{for(let s=0;s<r;++s){if(t.length===0){this.layout="XY",this.stride=2;return}t=t[0]}i=t.length,e=Bg(i)}this.layout=e,this.stride=i}applyTransform(e){this.flatCoordinates&&(e(this.flatCoordinates,this.flatCoordinates,this.layout.startsWith("XYZ")?3:2,this.stride),this.changed())}rotate(e,t){const r=this.getFlatCoordinates();if(r){const i=this.getStride();jN(r,0,r.length,i,e,t,r),this.changed()}}scale(e,t,r){t===void 0&&(t=e),r||(r=wl(this.getExtent()));const i=this.getFlatCoordinates();if(i){const s=this.getStride();ase(i,0,i.length,s,e,t,r,i),this.changed()}}translate(e,t){const r=this.getFlatCoordinates();if(r){const i=this.getStride();ose(r,0,r.length,i,e,t,r),this.changed()}}}function Bg(n){let e;return n==2?e="XY":n==3?e="XYZ":n==4&&(e="XYZM"),e}function dE(n){let e;return n=="XY"?e=2:n=="XYZ"||n=="XYM"?e=3:n=="XYZM"&&(e=4),e}function cse(n,e,t){const r=n.getFlatCoordinates();if(!r)return null;const i=n.getStride();return Dc(r,0,r.length,i,e,t)}function _B(n,e,t,r){for(let i=0,s=t.length;i<s;++i)n[e++]=t[i];return e}function uk(n,e,t,r){for(let i=0,s=t.length;i<s;++i){const a=t[i];for(let o=0;o<r;++o)n[e++]=a[o]}return e}function Xx(n,e,t,r,i){i=i||[];let s=0;for(let a=0,o=t.length;a<o;++a){const l=uk(n,e,t[a],r);i[s++]=l,e=l}return i.length=s,i}function wB(n,e,t,r,i){i=i||[];let s=0;for(let a=0,o=t.length;a<o;++a){const l=Xx(n,e,t[a],r,i[s]);l.length===0&&(l[0]=e),i[s++]=l,e=l[l.length-1]}return i.length=s,i}let Br=class bB extends $h{constructor(e,t){super(),this.setCoordinates(e,t)}clone(){const e=new bB(this.flatCoordinates.slice(),this.layout);return e.applyProperties(this),e}closestPointXY(e,t,r,i){const s=this.flatCoordinates,a=Ru(e,t,s[0],s[1]);if(a<i){const o=this.stride;for(let l=0;l<o;++l)r[l]=s[l];return r.length=o,a}return i}getCoordinates(){return this.flatCoordinates.slice()}computeExtent(e){return Wv(this.flatCoordinates,e)}getType(){return"Point"}intersectsExtent(e){return bN(e,this.flatCoordinates[0],this.flatCoordinates[1])}setCoordinates(e,t){this.setLayout(t,e,0),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=_B(this.flatCoordinates,0,e,this.stride),this.changed()}};const ui={ANIMATING:0,INTERACTING:1},xg=typeof navigator<"u"&&typeof navigator.userAgent<"u"?navigator.userAgent.toLowerCase():"",use=xg.includes("safari")&&!xg.includes("chrom"),dse=use&&(xg.includes("version/15.4")||/cpu (os|iphone os) 15_4 like mac os x/.test(xg)),hse=xg.includes("webkit")&&!xg.includes("edge"),EB=xg.includes("macintosh"),fse=typeof devicePixelRatio<"u"?devicePixelRatio:1,Ua=typeof WorkerGlobalScope<"u"&&typeof OffscreenCanvas<"u"&&self instanceof WorkerGlobalScope,FN=typeof Image<"u"&&Image.prototype.decode,SB=typeof createImageBitmap=="function",kB=(function(){let n=!1;try{const e=Object.defineProperty({},"passive",{get:function(){n=!0}});window.addEventListener("_",null,e),window.removeEventListener("_",null,e)}catch{}return n})();function ss(n,e,t,r){let i;return t&&t.length?i=t.shift():Ua?i=new class extends OffscreenCanvas{style={}}(n??300,e??150):i=document.createElement("canvas"),n&&(i.width=n),e&&(i.height=e),i.getContext("2d",r)}let gA;function hE(){return gA||(gA=ss(1,1)),gA}function Yx(n){const e=n.canvas;e.width=1,e.height=1,n.clearRect(0,0,1,1)}function RD(n,e){const t=e.parentNode;t&&t.replaceChild(n,e)}function gse(n){for(;n.lastChild;)n.lastChild.remove()}function pse(n,e){const t=n.childNodes;for(let r=0;;++r){const i=t[r],s=e[r];if(!i&&!s)break;if(i!==s){if(!i){n.appendChild(s);continue}if(!s){n.removeChild(i),--r;continue}n.insertBefore(s,i)}}}function TB(){return new Proxy({childNodes:[],appendChild:function(e){return this.childNodes.push(e),e},remove:function(){},removeChild:function(e){const t=this.childNodes.indexOf(e);if(t===-1)throw new Error("Node to remove was not found");return this.childNodes.splice(t,1),e},insertBefore:function(e,t){const r=this.childNodes.indexOf(t);if(r===-1)throw new Error("Reference node not found");return this.childNodes.splice(r,0,e),e},style:{}},{get(e,t,r){return t==="firstElementChild"?e.childNodes.length>0?e.childNodes[0]:null:Reflect.get(e,t,r)}})}function Xd(n){return typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas}const Us={PRERENDER:"prerender",POSTRENDER:"postrender",PRECOMPOSE:"precompose",POSTCOMPOSE:"postcompose",RENDERCOMPLETE:"rendercomplete"},Kt={IDLE:0,LOADING:1,LOADED:2,ERROR:3,EMPTY:4},DN=[NaN,NaN,NaN,0];let pA;function mse(){return pA||(pA=ss(1,1,void 0,{willReadFrequently:!0,desynchronized:!0})),pA}const yse=/^rgba?\(\s*(\d+%?)\s+(\d+%?)\s+(\d+%?)(?:\s*\/\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i,vse=/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i,xse=/^rgba?\(\s*(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i,_se=/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;function ib(n,e){return n.endsWith("%")?Number(n.substring(0,n.length-1))/e:Number(n)}function Kv(n){throw new Error('failed to parse "'+n+'" as color')}function CB(n){if(n.toLowerCase().startsWith("rgb")){const s=n.match(vse)||n.match(yse)||n.match(xse);if(s){const a=s[4],o=100/255;return[ai(ib(s[1],o)+.5|0,0,255),ai(ib(s[2],o)+.5|0,0,255),ai(ib(s[3],o)+.5|0,0,255),a!==void 0?ai(ib(a,100),0,1):1]}Kv(n)}if(n.startsWith("#")){if(_se.test(n)){const s=n.substring(1),a=s.length<=4?1:2,o=[0,0,0,255];for(let l=0,c=s.length;l<c;l+=a){let u=parseInt(s.substring(l,l+a),16);a===1&&(u+=u<<4),o[l/a]=u}return o[3]=o[3]/255,o}Kv(n)}const e=mse();e.fillStyle="#abcdef";let t=e.fillStyle;e.fillStyle=n,e.fillStyle===t&&(e.fillStyle="#fedcba",t=e.fillStyle,e.fillStyle=n,e.fillStyle===t&&Kv(n));const r=e.fillStyle;if(r.startsWith("#")||r.startsWith("rgba"))return CB(r);e.clearRect(0,0,1,1),e.fillRect(0,0,1,1);const i=Array.from(e.getImageData(0,0,1,1).data);return i[3]=H0(i[3]/255,3),i}function wse(n){return typeof n=="string"?n:ON(n)}const bse=1024,Qy={};let mA=0;function Ese(n){if(n.length===4)return n;const e=n.slice();return e[3]=1,e}function yA(n){return n>.0031308?Math.pow(n,1/2.4)*269.025-14.025:n*3294.6}function vA(n){return n>.2068965?Math.pow(n,3):(n-4/29)*(108/841)}function xA(n){return n>10.314724?Math.pow((n+14.025)/269.025,2.4):n/3294.6}function _A(n){return n>.0088564?Math.pow(n,1/3):n/(108/841)+4/29}function PD(n){const e=xA(n[0]),t=xA(n[1]),r=xA(n[2]),i=_A(e*.222488403+t*.716873169+r*.06060791),s=500*(_A(e*.452247074+t*.399439023+r*.148375274)-i),a=200*(i-_A(e*.016863605+t*.117638439+r*.865350722)),o=Math.atan2(a,s)*(180/Math.PI);return[116*i-16,Math.sqrt(s*s+a*a),o<0?o+360:o,n[3]]}function Sse(n){const e=(n[0]+16)/116,t=n[1],r=n[2]*Math.PI/180,i=vA(e),s=vA(e+t/500*Math.cos(r)),a=vA(e-t/200*Math.sin(r)),o=yA(s*3.021973625-i*1.617392459-a*.404875592),l=yA(s*-.943766287+i*1.916279586+a*.027607165),c=yA(s*.069407491-i*.22898585+a*1.159737864);return[ai(o+.5|0,0,255),ai(l+.5|0,0,255),ai(c+.5|0,0,255),n[3]]}function dk(n){if(n==="none")return DN;if(Qy.hasOwnProperty(n))return Qy[n];if(mA>=bse){let t=0;for(const r in Qy)(t++&3)===0&&(delete Qy[r],--mA)}const e=CB(n);e.length!==4&&Kv(n);for(const t of e)isNaN(t)&&Kv(n);return Qy[n]=e,++mA,e}function El(n){return Array.isArray(n)?n:dk(n)}function ON(n){let e=n[0];e!=(e|0)&&(e=e+.5|0);let t=n[1];t!=(t|0)&&(t=t+.5|0);let r=n[2];r!=(r|0)&&(r=r+.5|0);const i=n[3]===void 0?1:Math.round(n[3]*1e3)/1e3;return"rgba("+e+","+t+","+r+","+i+")"}class AB extends $x{constructor(e,t,r,i){super(),this.extent=e,this.pixelRatio_=r,this.resolution=t,this.state=typeof i=="function"?Kt.IDLE:i,this.image_=null,this.loader=typeof i=="function"?i:null}changed(){this.dispatchEvent(In.CHANGE)}getExtent(){return this.extent}getImage(){return this.image_}getPixelRatio(){return this.pixelRatio_}getResolution(){return this.resolution}getState(){return this.state}load(){if(this.state==Kt.IDLE&&this.loader){this.state=Kt.LOADING,this.changed();const e=this.getResolution(),t=Array.isArray(e)?e[0]:e;a0(()=>this.loader(this.getExtent(),t,this.getPixelRatio())).then(r=>{"image"in r&&(this.image_=r.image),"extent"in r&&(this.extent=r.extent),"resolution"in r&&(this.resolution=r.resolution),"pixelRatio"in r&&(this.pixelRatio_=r.pixelRatio),(r instanceof HTMLImageElement||SB&&r instanceof ImageBitmap||r instanceof HTMLCanvasElement||r instanceof HTMLVideoElement)&&(this.image_=r),this.state=Kt.LOADED}).catch(r=>{this.state=Kt.ERROR,console.error(r)}).finally(()=>this.changed())}}setImage(e){this.image_=e}setResolution(e){this.resolution=e}}function kse(n,e,t){const r=n;let i=!0,s=!1,a=!1;const o=[iE(r,In.LOAD,function(){a=!0,s||e()})];return r.src&&FN?(s=!0,r.decode().then(function(){i&&e()}).catch(function(l){i&&(a?e():t())})):o.push(iE(r,In.ERROR,t)),function(){i=!1,o.forEach(si)}}function Tse(n,e){return new Promise((t,r)=>{function i(){a(),t(n)}function s(){a(),r(new Error("Image load error"))}function a(){n.removeEventListener("load",i),n.removeEventListener("error",s)}n.addEventListener("load",i),n.addEventListener("error",s)})}function IB(n,e){return e&&(n.src=e),n.src&&FN?new Promise((t,r)=>n.decode().then(()=>t(n)).catch(i=>n.complete&&n.width?t(n):r(i))):Tse(n)}function RB(n,e){return e&&(n.src=e),n.src&&FN&&SB?n.decode().then(()=>createImageBitmap(n)).catch(t=>{if(n.complete&&n.width)return n;throw t}):IB(n)}class Cse{constructor(){this.cache_={},this.patternCache_={},this.cacheSize_=0,this.maxCacheSize_=1024}clear(){this.cache_={},this.patternCache_={},this.cacheSize_=0}canExpireCache(){return this.cacheSize_>this.maxCacheSize_}expire(){if(this.canExpireCache()){let e=0;for(const t in this.cache_){const r=this.cache_[t];(e++&3)===0&&!r.hasListener()&&(delete this.cache_[t],delete this.patternCache_[t],--this.cacheSize_)}}}get(e,t,r){const i=wA(e,t,r);return i in this.cache_?this.cache_[i]:null}getPattern(e,t,r){const i=wA(e,t,r);return i in this.patternCache_?this.patternCache_[i]:null}set(e,t,r,i,s){const a=wA(e,t,r),o=a in this.cache_;this.cache_[a]=i,s&&(i.getImageState()===Kt.IDLE&&i.load(),i.getImageState()===Kt.LOADING?i.ready().then(()=>{this.patternCache_[a]=hE().createPattern(i.getImage(1),"repeat")}):this.patternCache_[a]=hE().createPattern(i.getImage(1),"repeat")),o||++this.cacheSize_}setSize(e){this.maxCacheSize_=e,this.expire()}}function wA(n,e,t){const r=t?El(t):"null";return e+":"+n+":"+r}const pl=new Cse;let ev=null;class PB extends $x{constructor(e,t,r,i,s){super(),this.hitDetectionImage_=null,this.image_=e,this.crossOrigin_=r,this.canvas_={},this.color_=s,this.imageState_=i===void 0?Kt.IDLE:i,this.size_=e&&e.width&&e.height?[e.width,e.height]:null,this.src_=t,this.tainted_,this.ready_=null}initializeImage_(){this.image_=new Image,this.crossOrigin_!==null&&(this.image_.crossOrigin=this.crossOrigin_)}isTainted_(){if(this.tainted_===void 0&&this.imageState_===Kt.LOADED){ev||(ev=ss(1,1,void 0,{willReadFrequently:!0})),ev.drawImage(this.image_,0,0);try{ev.getImageData(0,0,1,1),this.tainted_=!1}catch{ev=null,this.tainted_=!0}}return this.tainted_===!0}dispatchChangeEvent_(){this.dispatchEvent(In.CHANGE)}handleImageError_(){this.imageState_=Kt.ERROR,this.dispatchChangeEvent_()}handleImageLoad_(){this.imageState_=Kt.LOADED,this.size_=[this.image_.width,this.image_.height],this.dispatchChangeEvent_()}getImage(e){return this.image_||this.initializeImage_(),this.replaceColor_(e),this.canvas_[e]?this.canvas_[e]:this.image_}getPixelRatio(e){return this.replaceColor_(e),this.canvas_[e]?e:1}getImageState(){return this.imageState_}getHitDetectionImage(){if(this.image_||this.initializeImage_(),!this.hitDetectionImage_)if(this.isTainted_()){const e=this.size_[0],t=this.size_[1],r=ss(e,t);r.fillRect(0,0,e,t),this.hitDetectionImage_=r.canvas}else this.hitDetectionImage_=this.image_;return this.hitDetectionImage_}getSize(){return this.size_}getSrc(){return this.src_}load(){if(this.imageState_===Kt.IDLE){this.image_||this.initializeImage_(),this.imageState_=Kt.LOADING;try{this.src_!==void 0&&(this.image_.src=this.src_)}catch{this.handleImageError_()}this.image_ instanceof HTMLImageElement&&IB(this.image_,this.src_).then(e=>{this.image_=e,this.handleImageLoad_()}).catch(this.handleImageError_.bind(this))}}replaceColor_(e){if(!this.color_||this.canvas_[e]||this.imageState_!==Kt.LOADED)return;const t=this.image_,r=ss(Math.ceil(t.width*e),Math.ceil(t.height*e)),i=r.canvas;r.scale(e,e),r.drawImage(t,0,0),r.globalCompositeOperation="multiply",r.fillStyle=wse(this.color_),r.fillRect(0,0,i.width/e,i.height/e),r.globalCompositeOperation="destination-in",r.drawImage(t,0,0),this.canvas_[e]=i}ready(){return this.ready_||(this.ready_=new Promise(e=>{if(this.imageState_===Kt.LOADED||this.imageState_===Kt.ERROR)e();else{const t=()=>{(this.imageState_===Kt.LOADED||this.imageState_===Kt.ERROR)&&(this.removeEventListener(In.CHANGE,t),e())};this.addEventListener(In.CHANGE,t)}})),this.ready_}}function fE(n,e,t,r,i,s){let a=e===void 0?void 0:pl.get(e,t,i);return a||(a=new PB(n,n&&"src"in n?n.src||void 0:e,t,r,i),pl.set(e,t,i,a,s)),s&&a&&!pl.getPattern(e,t,i)&&pl.set(e,t,i,a,s),a}function Rc(n){return n?Array.isArray(n)?ON(n):typeof n=="object"&&"src"in n?Ase(n):n:null}function Ase(n){if(!n.offset||!n.size)return pl.getPattern(n.src,"anonymous",n.color);const e=n.src+":"+n.offset,t=pl.getPattern(e,void 0,n.color);if(t)return t;const r=pl.get(n.src,"anonymous",null);if(r.getImageState()!==Kt.LOADED)return null;const i=ss(n.size[0],n.size[1]);return i.drawImage(r.getImage(1),n.offset[0],n.offset[1],n.size[0],n.size[1],0,0,n.size[0],n.size[1]),fE(i.canvas,e,void 0,Kt.LOADED,n.color,!0),pl.getPattern(e,void 0,n.color)}function Yd(n,e,t,r,i){i=i!==void 0?i:[];let s=0;for(let a=e;a<t;a+=r)i[s++]=n.slice(a,a+r);return i.length=s,i}function D1(n,e,t,r,i){i=i!==void 0?i:[];let s=0;for(let a=0,o=t.length;a<o;++a){const l=t[a];i[s++]=Yd(n,e,l,r,i[s]),e=l}return i.length=s,i}function KI(n,e,t,r,i){i=i!==void 0?i:[];let s=0;for(let a=0,o=t.length;a<o;++a){const l=t[a];i[s++]=l.length===1&&l[0]===e?[]:D1(n,e,l,r,i[s]),e=l[l.length-1]}return i.length=s,i}class NB{drawCustom(e,t,r,i,s){}drawGeometry(e){}setStyle(e){}drawCircle(e,t,r){}drawFeature(e,t,r){}drawGeometryCollection(e,t,r){}drawLineString(e,t,r){}drawMultiLineString(e,t,r){}drawMultiPoint(e,t,r){}drawMultiPolygon(e,t,r){}drawPoint(e,t,r){}drawPolygon(e,t,r){}drawText(e,t,r){}setFillStrokeStyle(e,t){}setImageStyle(e,t){}setTextStyle(e,t){}}const sb="ol-hidden",Zx="ol-unselectable",zN="ol-control",ND="ol-collapsed",Ise=new RegExp(["^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)","(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)","(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)","(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?","(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))","(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",`?\\s*([-,\\"\\'\\sa-z0-9]+?)\\s*$`].join(""),"i"),MD=["style","variant","weight","size","lineHeight","family"],qI={normal:400,bold:700},XI=function(n){const e=n.match(Ise);if(!e)return null;const t={lineHeight:"normal",size:"1.2em",style:"normal",weight:"400",variant:"normal"};for(let r=0,i=MD.length;r<i;++r){const s=e[r+1];s!==void 0&&(t[MD[r]]=typeof s=="string"?s.trim():s)}return isNaN(Number(t.weight))&&t.weight in qI&&(t.weight=qI[t.weight]),t.families=t.family.split(/,\s?/).map(r=>r.trim().replace(/^['"]|['"]$/g,"")),t},MB="10px sans-serif",so="#000",c0="round",Pu=[],Nu=0,u0="round",O1=10,z1="#000",G1="center",gE="middle",Uf=[0,0,0,0],V1=1,Lf=new nu;let tv=null,LD;const YI={},Rse=new Set(["serif","sans-serif","monospace","cursive","fantasy","system-ui","ui-serif","ui-sans-serif","ui-monospace","ui-rounded","emoji","math","fangsong"]);function Pse(n,e,t){return`${n} ${e} 16px "${t}"`}const Nse=(function(){let e,t;async function r(s){await t.ready;const a=await t.load(s);if(a.length===0)return!1;const o=XI(s),l=o.families[0].toLowerCase(),c=o.weight;return a.some(u=>{const f=u.family.replace(/^['"]|['"]$/g,"").toLowerCase(),p=qI[u.weight]||u.weight;return f===l&&u.style===o.style&&p==c})}async function i(){await t.ready;let s=!0;const a=Lf.getProperties(),o=Object.keys(a).filter(l=>a[l]<100);for(let l=o.length-1;l>=0;--l){const c=o[l];let u=a[c];u<100&&(await r(c)?(zg(YI),Lf.set(c,100)):(u+=10,Lf.set(c,u,!0),u<100&&(s=!1)))}e=void 0,s||(e=setTimeout(i,100))}return async function(s){t||(t=Ua?self.fonts:document.fonts);const a=XI(s);if(!a)return;const o=a.families;let l=!1;for(const c of o){if(Rse.has(c))continue;const u=Pse(a.style,a.weight,c);Lf.get(u)===void 0&&(Lf.set(u,0,!0),l=!0)}l&&(clearTimeout(e),e=setTimeout(i,100))}})(),Mse=(function(){let n;return function(e){let t=YI[e];if(t==null){if(Ua){const r=XI(e),i=LB(e,"Å½g");t=(isNaN(Number(r.lineHeight))?1.2:Number(r.lineHeight))*(i.actualBoundingBoxAscent+i.actualBoundingBoxDescent)}else n||(n=document.createElement("div"),n.innerHTML="M",n.style.minHeight="0",n.style.maxHeight="none",n.style.height="auto",n.style.padding="0",n.style.border="none",n.style.position="absolute",n.style.display="block",n.style.left="-99999px"),n.style.font=e,document.body.appendChild(n),t=n.offsetHeight,document.body.removeChild(n);YI[e]=t}return t}})();function LB(n,e){return tv||(tv=ss(1,1)),n!=LD&&(tv.font=n,LD=tv.font),tv.measureText(e)}function jB(n,e){return LB(n,e).width}function jD(n,e,t){if(e in t)return t[e];const r=e.split(`
`).reduce((i,s)=>Math.max(i,jB(n,s)),0);return t[e]=r,r}function Lse(n,e){const t=[],r=[],i=[];let s=0,a=0,o=0,l=0;for(let c=0,u=e.length;c<=u;c+=2){const f=e[c];if(f===`
`||c===u){s=Math.max(s,a),i.push(a),a=0,o+=l,l=0;continue}const p=e[c+1]||n.font,m=jB(p,f);t.push(m),a+=m;const y=Mse(p);r.push(y),l=Math.max(l,y)}return{width:s,height:o,widths:t,heights:r,lineWidths:i}}function jse(n,e,t,r,i,s,a,o,l,c,u){n.save(),t!==1&&(n.globalAlpha===void 0?n.globalAlpha=f=>f.globalAlpha*=t:n.globalAlpha*=t),e&&n.transform.apply(n,e),r.contextInstructions?(n.translate(l,c),n.scale(u[0],u[1]),Fse(r,n)):u[0]<0||u[1]<0?(n.translate(l,c),n.scale(u[0],u[1]),n.drawImage(r,i,s,a,o,0,0,a,o)):n.drawImage(r,i,s,a,o,l,c,a*u[0],o*u[1]),n.restore()}function Fse(n,e){const t=n.contextInstructions;for(let r=0,i=t.length;r<i;r+=2)Array.isArray(t[r+1])?e[t[r]].apply(e,t[r+1]):e[t[r]]=t[r+1]}const bn={BEGIN_GEOMETRY:0,BEGIN_PATH:1,CIRCLE:2,CLOSE_PATH:3,CUSTOM:4,DRAW_CHARS:5,DRAW_IMAGE:6,END_GEOMETRY:7,FILL:8,MOVE_TO_LINE_TO:9,SET_FILL_STYLE:10,SET_STROKE_STYLE:11,STROKE:12},ab=[bn.FILL],Zd=[bn.STROKE],$f=[bn.BEGIN_PATH],FD=[bn.CLOSE_PATH];class Jx extends NB{constructor(e,t,r,i){super(),this.tolerance=e,this.maxExtent=t,this.pixelRatio=i,this.maxLineWidth=0,this.resolution=r,this.beginGeometryInstruction1_=null,this.beginGeometryInstruction2_=null,this.bufferedMaxExtent_=null,this.instructions=[],this.coordinates=[],this.tmpCoordinate_=[],this.hitDetectionInstructions=[],this.state={}}applyPixelRatio(e){const t=this.pixelRatio;return t==1?e:e.map(function(r){return r*t})}appendFlatPointCoordinates(e,t){const r=this.getBufferedMaxExtent(),i=this.tmpCoordinate_,s=this.coordinates;let a=s.length;for(let o=0,l=e.length;o<l;o+=t)i[0]=e[o],i[1]=e[o+1],gg(r,i)&&(s[a++]=i[0],s[a++]=i[1]);return a}appendFlatLineCoordinates(e,t,r,i,s,a){const o=this.coordinates;let l=o.length;const c=this.getBufferedMaxExtent();a&&(t+=i);let u=e[t],f=e[t+1];const p=this.tmpCoordinate_;let m=!0,y,x,_;for(y=t+i;y<r;y+=i)p[0]=e[y],p[1]=e[y+1],_=DI(c,p),_!==x?(m&&(o[l++]=u,o[l++]=f,m=!1),o[l++]=p[0],o[l++]=p[1]):_===Vs.INTERSECTING?(o[l++]=p[0],o[l++]=p[1],m=!1):m=!0,u=p[0],f=p[1],x=_;return(s&&m||y===t+i)&&(o[l++]=u,o[l++]=f),l}drawCustomCoordinates_(e,t,r,i,s){for(let a=0,o=r.length;a<o;++a){const l=r[a],c=this.appendFlatLineCoordinates(e,t,l,i,!1,!1);s.push(c),t=l}return t}drawCustom(e,t,r,i,s){this.beginGeometry(e,t,s);const a=e.getType(),o=e.getStride(),l=this.coordinates.length;let c,u,f,p,m;switch(a){case"MultiPolygon":c=e.getOrientedFlatCoordinates(),p=[];const y=e.getEndss();m=0;for(let x=0,_=y.length;x<_;++x){const E=[];m=this.drawCustomCoordinates_(c,m,y[x],o,E),p.push(E)}this.instructions.push([bn.CUSTOM,l,p,e,r,KI,s]),this.hitDetectionInstructions.push([bn.CUSTOM,l,p,e,i||r,KI,s]);break;case"Polygon":case"MultiLineString":f=[],c=a=="Polygon"?e.getOrientedFlatCoordinates():e.getFlatCoordinates(),m=this.drawCustomCoordinates_(c,0,e.getEnds(),o,f),this.instructions.push([bn.CUSTOM,l,f,e,r,D1,s]),this.hitDetectionInstructions.push([bn.CUSTOM,l,f,e,i||r,D1,s]);break;case"LineString":case"Circle":c=e.getFlatCoordinates(),u=this.appendFlatLineCoordinates(c,0,c.length,o,!1,!1),this.instructions.push([bn.CUSTOM,l,u,e,r,Yd,s]),this.hitDetectionInstructions.push([bn.CUSTOM,l,u,e,i||r,Yd,s]);break;case"MultiPoint":c=e.getFlatCoordinates(),u=this.appendFlatPointCoordinates(c,o),u>l&&(this.instructions.push([bn.CUSTOM,l,u,e,r,Yd,s]),this.hitDetectionInstructions.push([bn.CUSTOM,l,u,e,i||r,Yd,s]));break;case"Point":c=e.getFlatCoordinates(),this.coordinates.push(c[0],c[1]),u=this.coordinates.length,this.instructions.push([bn.CUSTOM,l,u,e,r,void 0,s]),this.hitDetectionInstructions.push([bn.CUSTOM,l,u,e,i||r,void 0,s]);break}this.endGeometry(t)}beginGeometry(e,t,r){this.beginGeometryInstruction1_=[bn.BEGIN_GEOMETRY,t,0,e,r],this.instructions.push(this.beginGeometryInstruction1_),this.beginGeometryInstruction2_=[bn.BEGIN_GEOMETRY,t,0,e,r],this.hitDetectionInstructions.push(this.beginGeometryInstruction2_)}finish(){return{instructions:this.instructions,hitDetectionInstructions:this.hitDetectionInstructions,coordinates:this.coordinates}}reverseHitDetectionInstructions(){const e=this.hitDetectionInstructions;e.reverse();let t;const r=e.length;let i,s,a=-1;for(t=0;t<r;++t)i=e[t],s=i[0],s==bn.END_GEOMETRY?a=t:s==bn.BEGIN_GEOMETRY&&(i[2]=t,fie(this.hitDetectionInstructions,a,t),a=-1)}fillStyleToState(e,t={}){if(e){const r=e.getColor();t.fillPatternScale=r&&typeof r=="object"&&"src"in r?this.pixelRatio:1,t.fillStyle=Rc(r||so)}else t.fillStyle=void 0;return t}strokeStyleToState(e,t={}){if(e){const r=e.getColor();t.strokeStyle=Rc(r||z1);const i=e.getLineCap();t.lineCap=i!==void 0?i:c0;const s=e.getLineDash();t.lineDash=s?s.slice():Pu;const a=e.getLineDashOffset();t.lineDashOffset=a||Nu;const o=e.getLineJoin();t.lineJoin=o!==void 0?o:u0;const l=e.getWidth();t.lineWidth=l!==void 0?l:V1;const c=e.getMiterLimit();t.miterLimit=c!==void 0?c:O1,t.lineWidth>this.maxLineWidth&&(this.maxLineWidth=t.lineWidth,this.bufferedMaxExtent_=null)}else t.strokeStyle=void 0,t.lineCap=void 0,t.lineDash=null,t.lineDashOffset=void 0,t.lineJoin=void 0,t.lineWidth=void 0,t.miterLimit=void 0;return t}setFillStrokeStyle(e,t){const r=this.state;this.fillStyleToState(e,r),this.strokeStyleToState(t,r)}createFill(e){const t=e.fillStyle,r=[bn.SET_FILL_STYLE,t];return typeof t!="string"&&r.push(e.fillPatternScale),r}applyStroke(e){this.instructions.push(this.createStroke(e))}createStroke(e){return[bn.SET_STROKE_STYLE,e.strokeStyle,e.lineWidth*this.pixelRatio,e.lineCap,e.lineJoin,e.miterLimit,e.lineDash?this.applyPixelRatio(e.lineDash):null,e.lineDashOffset*this.pixelRatio]}updateFillStyle(e,t){const r=e.fillStyle;(typeof r!="string"||e.currentFillStyle!=r)&&(this.instructions.push(t.call(this,e)),e.currentFillStyle=r)}updateStrokeStyle(e,t){const r=e.strokeStyle,i=e.lineCap,s=e.lineDash,a=e.lineDashOffset,o=e.lineJoin,l=e.lineWidth,c=e.miterLimit;(e.currentStrokeStyle!=r||e.currentLineCap!=i||s!=e.currentLineDash&&!tu(e.currentLineDash,s)||e.currentLineDashOffset!=a||e.currentLineJoin!=o||e.currentLineWidth!=l||e.currentMiterLimit!=c)&&(t.call(this,e),e.currentStrokeStyle=r,e.currentLineCap=i,e.currentLineDash=s,e.currentLineDashOffset=a,e.currentLineJoin=o,e.currentLineWidth=l,e.currentMiterLimit=c)}endGeometry(e){this.beginGeometryInstruction1_[2]=this.instructions.length,this.beginGeometryInstruction1_=null,this.beginGeometryInstruction2_[2]=this.hitDetectionInstructions.length,this.beginGeometryInstruction2_=null;const t=[bn.END_GEOMETRY,e];this.instructions.push(t),this.hitDetectionInstructions.push(t)}getBufferedMaxExtent(){if(!this.bufferedMaxExtent_&&(this.bufferedMaxExtent_=tB(this.maxExtent),this.maxLineWidth>0)){const e=this.resolution*(this.maxLineWidth+1)/2;Ra(this.bufferedMaxExtent_,e,this.bufferedMaxExtent_)}return this.bufferedMaxExtent_}}class Dse extends Jx{constructor(e,t,r,i){super(e,t,r,i),this.hitDetectionImage_=null,this.image_=null,this.imagePixelRatio_=void 0,this.anchorX_=void 0,this.anchorY_=void 0,this.height_=void 0,this.opacity_=void 0,this.originX_=void 0,this.originY_=void 0,this.rotateWithView_=void 0,this.rotation_=void 0,this.scale_=void 0,this.width_=void 0,this.declutterMode_=void 0,this.declutterImageWithText_=void 0}drawPoint(e,t,r){if(!this.image_||this.maxExtent&&!gg(this.maxExtent,e.getFlatCoordinates()))return;this.beginGeometry(e,t,r);const i=e.getFlatCoordinates(),s=e.getStride(),a=this.coordinates.length,o=this.appendFlatPointCoordinates(i,s);this.instructions.push([bn.DRAW_IMAGE,a,o,this.image_,this.anchorX_*this.imagePixelRatio_,this.anchorY_*this.imagePixelRatio_,Math.ceil(this.height_*this.imagePixelRatio_),this.opacity_,this.originX_*this.imagePixelRatio_,this.originY_*this.imagePixelRatio_,this.rotateWithView_,this.rotation_,[this.scale_[0]*this.pixelRatio/this.imagePixelRatio_,this.scale_[1]*this.pixelRatio/this.imagePixelRatio_],Math.ceil(this.width_*this.imagePixelRatio_),this.declutterMode_,this.declutterImageWithText_]),this.hitDetectionInstructions.push([bn.DRAW_IMAGE,a,o,this.hitDetectionImage_,this.anchorX_,this.anchorY_,this.height_,1,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_,this.width_,this.declutterMode_,this.declutterImageWithText_]),this.endGeometry(t)}drawMultiPoint(e,t,r){if(!this.image_)return;this.beginGeometry(e,t,r);const i=e.getFlatCoordinates(),s=[];for(let l=0,c=i.length;l<c;l+=e.getStride())(!this.maxExtent||gg(this.maxExtent,i.slice(l,l+2)))&&s.push(i[l],i[l+1]);const a=this.coordinates.length,o=this.appendFlatPointCoordinates(s,2);this.instructions.push([bn.DRAW_IMAGE,a,o,this.image_,this.anchorX_*this.imagePixelRatio_,this.anchorY_*this.imagePixelRatio_,Math.ceil(this.height_*this.imagePixelRatio_),this.opacity_,this.originX_*this.imagePixelRatio_,this.originY_*this.imagePixelRatio_,this.rotateWithView_,this.rotation_,[this.scale_[0]*this.pixelRatio/this.imagePixelRatio_,this.scale_[1]*this.pixelRatio/this.imagePixelRatio_],Math.ceil(this.width_*this.imagePixelRatio_),this.declutterMode_,this.declutterImageWithText_]),this.hitDetectionInstructions.push([bn.DRAW_IMAGE,a,o,this.hitDetectionImage_,this.anchorX_,this.anchorY_,this.height_,1,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_,this.width_,this.declutterMode_,this.declutterImageWithText_]),this.endGeometry(t)}finish(){return this.reverseHitDetectionInstructions(),this.anchorX_=void 0,this.anchorY_=void 0,this.hitDetectionImage_=null,this.image_=null,this.imagePixelRatio_=void 0,this.height_=void 0,this.scale_=void 0,this.opacity_=void 0,this.originX_=void 0,this.originY_=void 0,this.rotateWithView_=void 0,this.rotation_=void 0,this.width_=void 0,super.finish()}setImageStyle(e,t){const r=e.getAnchor(),i=e.getSize(),s=e.getOrigin();this.imagePixelRatio_=e.getPixelRatio(this.pixelRatio),this.anchorX_=r[0],this.anchorY_=r[1],this.hitDetectionImage_=e.getHitDetectionImage(),this.image_=e.getImage(this.pixelRatio),this.height_=i[1],this.opacity_=e.getOpacity(),this.originX_=s[0],this.originY_=s[1],this.rotateWithView_=e.getRotateWithView(),this.rotation_=e.getRotation(),this.scale_=e.getScaleArray(),this.width_=i[0],this.declutterMode_=e.getDeclutterMode(),this.declutterImageWithText_=t}}class Ose extends Jx{constructor(e,t,r,i){super(e,t,r,i)}drawFlatCoordinates_(e,t,r,i){const s=this.coordinates.length,a=this.appendFlatLineCoordinates(e,t,r,i,!1,!1),o=[bn.MOVE_TO_LINE_TO,s,a];return this.instructions.push(o),this.hitDetectionInstructions.push(o),r}drawLineString(e,t,r){const i=this.state,s=i.strokeStyle,a=i.lineWidth;if(s===void 0||a===void 0)return;this.updateStrokeStyle(i,this.applyStroke),this.beginGeometry(e,t,r),this.hitDetectionInstructions.push([bn.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,Pu,Nu],$f);const o=e.getFlatCoordinates(),l=e.getStride();this.drawFlatCoordinates_(o,0,o.length,l),this.hitDetectionInstructions.push(Zd),this.endGeometry(t)}drawMultiLineString(e,t,r){const i=this.state,s=i.strokeStyle,a=i.lineWidth;if(s===void 0||a===void 0)return;this.updateStrokeStyle(i,this.applyStroke),this.beginGeometry(e,t,r),this.hitDetectionInstructions.push([bn.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,Pu,Nu],$f);const o=e.getEnds(),l=e.getFlatCoordinates(),c=e.getStride();let u=0;for(let f=0,p=o.length;f<p;++f)u=this.drawFlatCoordinates_(l,u,o[f],c);this.hitDetectionInstructions.push(Zd),this.endGeometry(t)}finish(){const e=this.state;return e.lastStroke!=null&&e.lastStroke!=this.coordinates.length&&this.instructions.push(Zd),this.reverseHitDetectionInstructions(),this.state=null,super.finish()}applyStroke(e){e.lastStroke!=null&&e.lastStroke!=this.coordinates.length&&(this.instructions.push(Zd),e.lastStroke=this.coordinates.length),e.lastStroke=0,super.applyStroke(e),this.instructions.push($f)}}function hk(n,e,t,r,i,s,a){const o=(t-e)/r;if(o<3){for(;e<t;e+=r)s[a++]=n[e],s[a++]=n[e+1];return a}const l=new Array(o);l[0]=1,l[o-1]=1;const c=[e,t-r];let u=0;for(;c.length>0;){const f=c.pop(),p=c.pop();let m=0;const y=n[p],x=n[p+1],_=n[f],E=n[f+1];for(let S=p+r;S<f;S+=r){const k=n[S],A=n[S+1],P=bie(k,A,y,x,_,E);P>m&&(u=S,m=P)}m>i&&(l[(u-e)/r]=1,p+r<u&&c.push(p,u),u+r<f&&c.push(u,f))}for(let f=0;f<o;++f)l[f]&&(s[a++]=n[e+f*r],s[a++]=n[e+f*r+1]);return a}function FB(n,e,t,r,i,s,a,o){for(let l=0,c=t.length;l<c;++l){const u=t[l];a=hk(n,e,u,r,i,s,a),o.push(a),e=u}return a}function kf(n,e){return e*Math.round(n/e)}function zse(n,e,t,r,i,s,a){if(e==t)return a;let o=kf(n[e],i),l=kf(n[e+1],i);e+=r,s[a++]=o,s[a++]=l;let c,u;do if(c=kf(n[e],i),u=kf(n[e+1],i),e+=r,e==t)return s[a++]=c,s[a++]=u,a;while(c==o&&u==l);for(;e<t;){const f=kf(n[e],i),p=kf(n[e+1],i);if(e+=r,f==c&&p==u)continue;const m=c-o,y=u-l,x=f-o,_=p-l;if(m*_==y*x&&(m<0&&x<m||m==x||m>0&&x>m)&&(y<0&&_<y||y==_||y>0&&_>y)){c=f,u=p;continue}s[a++]=c,s[a++]=u,o=c,l=u,c=f,u=p}return s[a++]=c,s[a++]=u,a}function GN(n,e,t,r,i,s,a,o){for(let l=0,c=t.length;l<c;++l){const u=t[l];a=zse(n,e,u,r,i,s,a),o.push(a),e=u}return a}function Gse(n,e,t,r,i,s,a,o){for(let l=0,c=t.length;l<c;++l){const u=t[l],f=[];a=GN(n,e,u,r,i,s,a,f),o.push(f),e=u[u.length-1]}return a}class DD extends Jx{constructor(e,t,r,i){super(e,t,r,i)}drawFlatCoordinatess_(e,t,r,i){const s=this.state,a=s.fillStyle!==void 0,o=s.strokeStyle!==void 0,l=r.length;this.instructions.push($f),this.hitDetectionInstructions.push($f);for(let c=0;c<l;++c){const u=r[c],f=this.coordinates.length,p=this.appendFlatLineCoordinates(e,t,u,i,!0,!o),m=[bn.MOVE_TO_LINE_TO,f,p];this.instructions.push(m),this.hitDetectionInstructions.push(m),o&&(this.instructions.push(FD),this.hitDetectionInstructions.push(FD)),t=u}return a&&(this.instructions.push(ab),this.hitDetectionInstructions.push(ab)),o&&(this.instructions.push(Zd),this.hitDetectionInstructions.push(Zd)),t}drawCircle(e,t,r){const i=this.state,s=i.fillStyle,a=i.strokeStyle;if(s===void 0&&a===void 0)return;this.setFillStrokeStyles_(),this.beginGeometry(e,t,r),i.fillStyle!==void 0&&this.hitDetectionInstructions.push([bn.SET_FILL_STYLE,so]),i.strokeStyle!==void 0&&this.hitDetectionInstructions.push([bn.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,Pu,Nu]);const o=e.getFlatCoordinates(),l=e.getStride(),c=this.coordinates.length;this.appendFlatLineCoordinates(o,0,o.length,l,!1,!1);const u=[bn.CIRCLE,c];this.instructions.push($f,u),this.hitDetectionInstructions.push($f,u),i.fillStyle!==void 0&&(this.instructions.push(ab),this.hitDetectionInstructions.push(ab)),i.strokeStyle!==void 0&&(this.instructions.push(Zd),this.hitDetectionInstructions.push(Zd)),this.endGeometry(t)}drawPolygon(e,t,r){const i=this.state,s=i.fillStyle,a=i.strokeStyle;if(s===void 0&&a===void 0)return;this.setFillStrokeStyles_(),this.beginGeometry(e,t,r),i.fillStyle!==void 0&&this.hitDetectionInstructions.push([bn.SET_FILL_STYLE,so]),i.strokeStyle!==void 0&&this.hitDetectionInstructions.push([bn.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,Pu,Nu]);const o=e.getEnds(),l=e.getOrientedFlatCoordinates(),c=e.getStride();this.drawFlatCoordinatess_(l,0,o,c),this.endGeometry(t)}drawMultiPolygon(e,t,r){const i=this.state,s=i.fillStyle,a=i.strokeStyle;if(s===void 0&&a===void 0)return;this.setFillStrokeStyles_(),this.beginGeometry(e,t,r),i.fillStyle!==void 0&&this.hitDetectionInstructions.push([bn.SET_FILL_STYLE,so]),i.strokeStyle!==void 0&&this.hitDetectionInstructions.push([bn.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,Pu,Nu]);const o=e.getEndss(),l=e.getOrientedFlatCoordinates(),c=e.getStride();let u=0;for(let f=0,p=o.length;f<p;++f)u=this.drawFlatCoordinatess_(l,u,o[f],c);this.endGeometry(t)}finish(){this.reverseHitDetectionInstructions(),this.state=null;const e=this.tolerance;if(e!==0){const t=this.coordinates;for(let r=0,i=t.length;r<i;++r)t[r]=kf(t[r],e)}return super.finish()}setFillStrokeStyles_(){const e=this.state;this.updateFillStyle(e,this.createFill),this.updateStrokeStyle(e,this.applyStroke)}}function Vse(n,e,t,r,i){const s=[];let a=t,o=0,l=e.slice(t,2);for(;o<n&&a+i<r;){const[c,u]=l.slice(-2),f=e[a+i],p=e[a+i+1],m=Math.sqrt((f-c)*(f-c)+(p-u)*(p-u));if(o+=m,o>=n){const y=(n-o+m)/m,x=jo(c,f,y),_=jo(u,p,y);l.push(x,_),s.push(l),l=[x,_],o==n&&(a+=i),o=0}else if(o<n)l.push(e[a+i],e[a+i+1]),a+=i;else{const y=m-o,x=jo(c,f,y/m),_=jo(u,p,y/m);l.push(x,_),s.push(l),l=[x,_],o=0,a+=i}}return o>0&&s.push(l),s}function Bse(n,e,t,r,i){let s=t,a=t,o=0,l=0,c=t,u,f,p,m,y,x,_,E,S,k;for(f=t;f<r;f+=i){const A=e[f],P=e[f+1];y!==void 0&&(S=A-y,k=P-x,m=Math.sqrt(S*S+k*k),_!==void 0&&(l+=p,u=Math.acos((_*S+E*k)/(p*m)),u>n&&(l>o&&(o=l,s=c,a=f),l=0,c=f-i)),p=m,_=S,E=k),y=A,x=P}return l+=m,l>o?[c,f]:[s,a]}const pE={left:0,center:.5,right:1,top:0,middle:.5,hanging:.2,alphabetic:.8,ideographic:.8,bottom:1};class Use extends Jx{constructor(e,t,r,i){super(e,t,r,i),this.labels_=null,this.text_="",this.textOffsetX_=0,this.textOffsetY_=0,this.textRotateWithView_=void 0,this.textKeepUpright_=void 0,this.textRotation_=0,this.textFillState_=null,this.fillStates={},this.fillStates[so]={fillStyle:so},this.textStrokeState_=null,this.strokeStates={},this.textState_={},this.textStates={},this.textKey_="",this.fillKey_="",this.strokeKey_="",this.declutterMode_=void 0,this.declutterImageWithText_=void 0}finish(){const e=super.finish();return e.textStates=this.textStates,e.fillStates=this.fillStates,e.strokeStates=this.strokeStates,e}drawText(e,t,r){const i=this.textFillState_,s=this.textStrokeState_,a=this.textState_;if(this.text_===""||!a||!i&&!s)return;const o=this.coordinates;let l=o.length;const c=e.getType();let u=null,f=e.getStride();if(a.placement==="line"&&(c=="LineString"||c=="MultiLineString"||c=="Polygon"||c=="MultiPolygon")){if(!Fi(this.maxExtent,e.getExtent()))return;let p;if(u=e.getFlatCoordinates(),c=="LineString")p=[u.length];else if(c=="MultiLineString")p=e.getEnds();else if(c=="Polygon")p=e.getEnds().slice(0,1);else if(c=="MultiPolygon"){const _=e.getEndss();p=[];for(let E=0,S=_.length;E<S;++E)p.push(_[E][0])}this.beginGeometry(e,t,r);const m=a.repeat,y=m?void 0:a.textAlign;let x=0;for(let _=0,E=p.length;_<E;++_){let S;m?S=Vse(m*this.resolution,u,x,p[_],f):S=[u.slice(x,p[_])];for(let k=0,A=S.length;k<A;++k){const P=S[k];let z=0,I=P.length;if(y==null){const R=Bse(a.maxAngle,P,0,P.length,2);z=R[0],I=R[1]}for(let R=z;R<I;R+=f)o.push(P[R],P[R+1]);const T=o.length;x=p[_],this.drawChars_(l,T),l=T}}this.endGeometry(t)}else{let p=a.overflow?null:[];switch(c){case"Point":case"MultiPoint":u=e.getFlatCoordinates();break;case"LineString":u=e.getFlatMidpoint();break;case"Circle":u=e.getCenter();break;case"MultiLineString":u=e.getFlatMidpoints(),f=2;break;case"Polygon":u=e.getFlatInteriorPoint(),a.overflow||p.push(u[2]/this.resolution),f=3;break;case"MultiPolygon":const A=e.getFlatInteriorPoints();u=[];for(let P=0,z=A.length;P<z;P+=3)a.overflow||p.push(A[P+2]/this.resolution),u.push(A[P],A[P+1]);if(u.length===0)return;f=2;break}const m=this.appendFlatPointCoordinates(u,f);if(m===l)return;if(p&&(m-l)/2!==u.length/f){let A=l/2;p=p.filter((P,z)=>{const I=o[(A+z)*2]===u[z*f]&&o[(A+z)*2+1]===u[z*f+1];return I||--A,I})}this.saveTextStates_();const y=a.backgroundFill?this.createFill(this.fillStyleToState(a.backgroundFill)):null,x=a.backgroundStroke?this.createStroke(this.strokeStyleToState(a.backgroundStroke)):null;this.beginGeometry(e,t,r);let _=a.padding;if(_!=Uf&&(a.scale[0]<0||a.scale[1]<0)){let A=a.padding[0],P=a.padding[1],z=a.padding[2],I=a.padding[3];a.scale[0]<0&&(P=-P,I=-I),a.scale[1]<0&&(A=-A,z=-z),_=[A,P,z,I]}const E=this.pixelRatio;this.instructions.push([bn.DRAW_IMAGE,l,m,null,NaN,NaN,NaN,1,0,0,this.textRotateWithView_,this.textRotation_,[1,1],NaN,this.declutterMode_,this.declutterImageWithText_,_==Uf?Uf:_.map(function(A){return A*E}),y,x,this.text_,this.textKey_,this.strokeKey_,this.fillKey_,this.textOffsetX_,this.textOffsetY_,p]);const S=1/E,k=y?y.slice(0):null;k&&(k[1]=so),this.hitDetectionInstructions.push([bn.DRAW_IMAGE,l,m,null,NaN,NaN,NaN,1,0,0,this.textRotateWithView_,this.textRotation_,[S,S],NaN,this.declutterMode_,this.declutterImageWithText_,_,k,x,this.text_,this.textKey_,this.strokeKey_,this.fillKey_?so:this.fillKey_,this.textOffsetX_,this.textOffsetY_,p]),this.endGeometry(t)}}saveTextStates_(){const e=this.textStrokeState_,t=this.textState_,r=this.textFillState_,i=this.strokeKey_;e&&(i in this.strokeStates||(this.strokeStates[i]={strokeStyle:e.strokeStyle,lineCap:e.lineCap,lineDashOffset:e.lineDashOffset,lineWidth:e.lineWidth,lineJoin:e.lineJoin,miterLimit:e.miterLimit,lineDash:e.lineDash}));const s=this.textKey_;s in this.textStates||(this.textStates[s]={font:t.font,textAlign:t.textAlign||G1,justify:t.justify,textBaseline:t.textBaseline||gE,scale:t.scale});const a=this.fillKey_;r&&(a in this.fillStates||(this.fillStates[a]={fillStyle:r.fillStyle}))}drawChars_(e,t){const r=this.textStrokeState_,i=this.textState_,s=this.strokeKey_,a=this.textKey_,o=this.fillKey_;this.saveTextStates_();const l=this.pixelRatio,c=pE[i.textBaseline],u=this.textOffsetY_*l,f=this.text_,p=r?r.lineWidth*Math.abs(i.scale[0])/2:0;this.instructions.push([bn.DRAW_CHARS,e,t,c,i.overflow,o,i.maxAngle,l,u,s,p*l,f,a,1,this.declutterMode_,this.textKeepUpright_]),this.hitDetectionInstructions.push([bn.DRAW_CHARS,e,t,c,i.overflow,o&&so,i.maxAngle,l,u,s,p*l,f,a,1/l,this.declutterMode_,this.textKeepUpright_])}setTextStyle(e,t){let r,i,s;if(!e)this.text_="";else{const a=e.getFill();a?(i=this.textFillState_,i||(i={},this.textFillState_=i),i.fillStyle=Rc(a.getColor()||so)):(i=null,this.textFillState_=i);const o=e.getStroke();if(!o)s=null,this.textStrokeState_=s;else{s=this.textStrokeState_,s||(s={},this.textStrokeState_=s);const x=o.getLineDash(),_=o.getLineDashOffset(),E=o.getWidth(),S=o.getMiterLimit();s.lineCap=o.getLineCap()||c0,s.lineDash=x?x.slice():Pu,s.lineDashOffset=_===void 0?Nu:_,s.lineJoin=o.getLineJoin()||u0,s.lineWidth=E===void 0?V1:E,s.miterLimit=S===void 0?O1:S,s.strokeStyle=Rc(o.getColor()||z1)}r=this.textState_;const l=e.getFont()||MB;Nse(l);const c=e.getScaleArray();r.overflow=e.getOverflow(),r.font=l,r.maxAngle=e.getMaxAngle(),r.placement=e.getPlacement(),r.textAlign=e.getTextAlign(),r.repeat=e.getRepeat(),r.justify=e.getJustify(),r.textBaseline=e.getTextBaseline()||gE,r.backgroundFill=e.getBackgroundFill(),r.backgroundStroke=e.getBackgroundStroke(),r.padding=e.getPadding()||Uf,r.scale=c===void 0?[1,1]:c;const u=e.getOffsetX(),f=e.getOffsetY(),p=e.getRotateWithView(),m=e.getKeepUpright(),y=e.getRotation();this.text_=e.getText()||"",this.textOffsetX_=u===void 0?0:u,this.textOffsetY_=f===void 0?0:f,this.textRotateWithView_=p===void 0?!1:p,this.textKeepUpright_=m===void 0?!0:m,this.textRotation_=y===void 0?0:y,this.strokeKey_=s?(typeof s.strokeStyle=="string"?s.strokeStyle:Dt(s.strokeStyle))+s.lineCap+s.lineDashOffset+"|"+s.lineWidth+s.lineJoin+s.miterLimit+"["+s.lineDash.join()+"]":"",this.textKey_=r.font+r.scale+(r.textAlign||"?")+(r.repeat||"?")+(r.justify||"?")+(r.textBaseline||"?"),this.fillKey_=i&&i.fillStyle?typeof i.fillStyle=="string"?i.fillStyle:"|"+Dt(i.fillStyle):""}this.declutterMode_=e.getDeclutterMode(),this.declutterImageWithText_=t}}const $se={Circle:DD,Default:Jx,Image:Dse,LineString:Ose,Polygon:DD,Text:Use};class DB{constructor(e,t,r,i){this.tolerance_=e,this.maxExtent_=t,this.pixelRatio_=i,this.resolution_=r,this.buildersByZIndex_={}}finish(){const e={};for(const t in this.buildersByZIndex_){e[t]=e[t]||{};const r=this.buildersByZIndex_[t];for(const i in r){const s=r[i].finish();e[t][i]=s}}return e}getBuilder(e,t){const r=e!==void 0?e.toString():"0";let i=this.buildersByZIndex_[r];i===void 0&&(i={},this.buildersByZIndex_[r]=i);let s=i[t];if(s===void 0){const a=$se[t];s=new a(this.tolerance_,this.maxExtent_,this.resolution_,this.pixelRatio_),i[t]=s}return s}}function VN(n,e,t,r){let i=n[e],s=n[e+1],a=0;for(let o=e+r;o<t;o+=r){const l=n[o],c=n[o+1];a+=Math.sqrt((l-i)*(l-i)+(c-s)*(c-s)),i=l,s=c}return a}function Wse(n,e,t,r,i,s,a,o,l,c,u,f,p=!0){let m=n[e],y=n[e+1],x=0,_=0,E=0,S=0;function k(){x=m,_=y,e+=r,m=n[e],y=n[e+1],S+=E,E=Math.sqrt((m-x)*(m-x)+(y-_)*(y-_))}do k();while(e<t-r&&S+E<s);let A=E===0?0:(s-S)/E;const P=jo(x,m,A),z=jo(_,y,A),I=e-r,T=S,R=s+o*l(c,i,u);for(;e<t-r&&S+E<R;)k();A=E===0?0:(R-S)/E;const L=jo(x,m,A),D=jo(_,y,A);let V=!1;if(p)if(f){const de=[P,z,L,D];jN(de,0,4,2,f,de,de),V=de[0]>de[2]}else V=P>L;const j=Math.PI,oe=[],ye=I+r===e;e=I,E=0,S=T,m=n[e],y=n[e+1];let ge;if(ye){k(),ge=Math.atan2(y-_,m-x),V&&(ge+=ge>0?-j:j);const de=(L+P)/2,he=(D+z)/2;return oe[0]=[de,he,(R-s)/2,ge,i],oe}i=i.replace(/\n/g," ");for(let de=0,he=i.length;de<he;){k();let ie=Math.atan2(y-_,m-x);if(V&&(ie+=ie>0?-j:j),ge!==void 0){let J=ie-ge;if(J+=J>j?-2*j:J<-j?2*j:0,Math.abs(J)>a)return null}ge=ie;const ue=de;let Q=0;for(;de<he;++de){const J=V?he-de-1:de,ae=o*l(c,i[J],u);if(e+r<t&&S+E<s+Q+ae/2)break;Q+=ae}if(de===ue)continue;const O=V?i.substring(he-ue,he-de):i.substring(ue,de);A=E===0?0:(s+Q/2-S)/E;const ee=jo(x,m,A),H=jo(_,y,A);oe.push([ee,H,Q/2,ie,O]),s+=Q}return oe}class BN{constructor(){this.instructions_=[],this.zIndex=0,this.offset_=0,this.context_=new Proxy(hE(),{get:(e,t)=>{if(typeof hE()[t]=="function")return this.push_(t),this.pushMethodArgs_},set:(e,t,r)=>(this.push_(t,r),!0)})}push_(...e){const t=this.instructions_,r=this.zIndex+this.offset_;t[r]||(t[r]=[]),t[r].push(...e)}pushMethodArgs_=(...e)=>(this.push_(e),this);pushFunction(e){this.push_(e)}getContext(){return this.context_}draw(e){this.instructions_.forEach(t=>{for(let r=0,i=t.length;r<i;++r){const s=t[r];if(typeof s=="function"){s(e);continue}const a=t[++r];if(typeof e[s]=="function")e[s](...a);else{if(typeof a=="function"){e[s]=a(e);continue}e[s]=a}}})}clear(){this.instructions_.length=0,this.zIndex=0,this.offset_=0}offset(){this.offset_=this.instructions_.length,this.zIndex=0}}const Np=Ka(),Ed=[],yu=[],vu=[],Sd=[];function OD(n){return n[3].declutterBox}const zD=new RegExp("[Ö‘-à£¿ï¬-ï·¿ï¹°-ï»¼à €-à¿¿î €-î¿¿]");function bA(n,e){return e==="start"?e=zD.test(n)?"right":"left":e==="end"&&(e=zD.test(n)?"left":"right"),pE[e]}function Hse(n,e,t){return t>0&&n.push(`
`,""),n.push(e,""),n}function Kse(n,e,t){return t%2===0&&(n+=e),n}class qse{constructor(e,t,r,i,s){this.overlaps=r,this.pixelRatio=t,this.resolution=e,this.alignAndScaleFill_,this.instructions=i.instructions,this.coordinates=i.coordinates,this.coordinateCache_={},this.renderedTransform_=ms(),this.hitDetectionInstructions=i.hitDetectionInstructions,this.pixelCoordinates_=null,this.viewRotation_=0,this.fillStates=i.fillStates||{},this.strokeStates=i.strokeStates||{},this.textStates=i.textStates||{},this.widths_={},this.labels_={},this.zIndexContext_=s?new BN:null}getZIndexContext(){return this.zIndexContext_}createLabel(e,t,r,i){const s=e+t+r+i;if(this.labels_[s])return this.labels_[s];const a=i?this.strokeStates[i]:null,o=r?this.fillStates[r]:null,l=this.textStates[t],c=this.pixelRatio,u=[l.scale[0]*c,l.scale[1]*c],f=l.justify?pE[l.justify]:bA(Array.isArray(e)?e[0]:e,l.textAlign||G1),p=i&&a.lineWidth?a.lineWidth:0,m=Array.isArray(e)?e:String(e).split(`
`).reduce(Hse,[]),{width:y,height:x,widths:_,heights:E,lineWidths:S}=Lse(l,m),k=y+p,A=[],P=(k+2)*u[0],z=(x+p)*u[1],I={width:P<0?Math.floor(P):Math.ceil(P),height:z<0?Math.floor(z):Math.ceil(z),contextInstructions:A};(u[0]!=1||u[1]!=1)&&A.push("scale",u),i&&(A.push("strokeStyle",a.strokeStyle),A.push("lineWidth",p),A.push("lineCap",a.lineCap),A.push("lineJoin",a.lineJoin),A.push("miterLimit",a.miterLimit),A.push("setLineDash",[a.lineDash]),A.push("lineDashOffset",a.lineDashOffset)),r&&A.push("fillStyle",o.fillStyle),A.push("textBaseline","middle"),A.push("textAlign","center");const T=.5-f;let R=f*k+T*p;const L=[],D=[];let V=0,j=0,oe=0,ye=0,ge;for(let de=0,he=m.length;de<he;de+=2){const ie=m[de];if(ie===`
`){j+=V,V=0,R=f*k+T*p,++ye;continue}const ue=m[de+1]||l.font;ue!==ge&&(i&&L.push("font",ue),r&&D.push("font",ue),ge=ue),V=Math.max(V,E[oe]);const Q=[ie,R+T*_[oe]+f*(_[oe]-S[ye]),.5*(p+V)+j];R+=_[oe],i&&L.push("strokeText",Q),r&&D.push("fillText",Q),++oe}return Array.prototype.push.apply(A,L),Array.prototype.push.apply(A,D),this.labels_[s]=I,I}replayTextBackground_(e,t,r,i,s,a,o){e.beginPath(),e.moveTo.apply(e,t),e.lineTo.apply(e,r),e.lineTo.apply(e,i),e.lineTo.apply(e,s),e.lineTo.apply(e,t),a&&(this.alignAndScaleFill_=a[2],e.fillStyle=a[1],this.fill_(e)),o&&(this.setStrokeStyle_(e,o),e.stroke())}calculateImageOrLabelDimensions_(e,t,r,i,s,a,o,l,c,u,f,p,m,y,x,_){o*=p[0],l*=p[1];let E=r-o,S=i-l;const k=s+c>e?e-c:s,A=a+u>t?t-u:a,P=y[3]+k*p[0]+y[1],z=y[0]+A*p[1]+y[2],I=E-y[3],T=S-y[0];(x||f!==0)&&(Ed[0]=I,Sd[0]=I,Ed[1]=T,yu[1]=T,yu[0]=I+P,vu[0]=yu[0],vu[1]=T+z,Sd[1]=vu[1]);let R;return f!==0?(R=bl(ms(),r,i,1,1,f,-r,-i),ji(R,Ed),ji(R,yu),ji(R,vu),ji(R,Sd),Kc(Math.min(Ed[0],yu[0],vu[0],Sd[0]),Math.min(Ed[1],yu[1],vu[1],Sd[1]),Math.max(Ed[0],yu[0],vu[0],Sd[0]),Math.max(Ed[1],yu[1],vu[1],Sd[1]),Np)):Kc(Math.min(I,I+P),Math.min(T,T+z),Math.max(I,I+P),Math.max(T,T+z),Np),m&&(E=Math.round(E),S=Math.round(S)),{drawImageX:E,drawImageY:S,drawImageW:k,drawImageH:A,originX:c,originY:u,declutterBox:{minX:Np[0],minY:Np[1],maxX:Np[2],maxY:Np[3],value:_},canvasTransform:R,scale:p}}replayImageOrLabel_(e,t,r,i,s,a,o){const l=!!(a||o),c=i.declutterBox,u=o?o[2]*i.scale[0]/2:0;return c.minX-u<=t[0]&&c.maxX+u>=0&&c.minY-u<=t[1]&&c.maxY+u>=0&&(l&&this.replayTextBackground_(e,Ed,yu,vu,Sd,a,o),jse(e,i.canvasTransform,s,r,i.originX,i.originY,i.drawImageW,i.drawImageH,i.drawImageX,i.drawImageY,i.scale)),!0}fill_(e){const t=this.alignAndScaleFill_;if(t){const r=ji(this.renderedTransform_,[0,0]),i=512*this.pixelRatio;e.save(),e.translate(r[0]%i,r[1]%i),t!==1&&e.scale(t,t),e.rotate(this.viewRotation_)}e.fill(),t&&e.restore()}setStrokeStyle_(e,t){e.strokeStyle=t[1],t[1]&&(e.lineWidth=t[2],e.lineCap=t[3],e.lineJoin=t[4],e.miterLimit=t[5],e.lineDashOffset=t[7],e.setLineDash(t[6]))}drawLabelWithPointPlacement_(e,t,r,i){const s=this.textStates[t],a=this.createLabel(e,t,i,r),o=this.strokeStates[r],l=this.pixelRatio,c=bA(Array.isArray(e)?e[0]:e,s.textAlign||G1),u=pE[s.textBaseline||gE],f=o&&o.lineWidth?o.lineWidth:0,p=a.width/l-2*s.scale[0],m=c*p+2*(.5-c)*f,y=u*a.height/l+2*(.5-u)*f;return{label:a,anchorX:m,anchorY:y}}execute_(e,t,r,i,s,a,o,l){const c=this.zIndexContext_;let u;this.pixelCoordinates_&&tu(r,this.renderedTransform_)?u=this.pixelCoordinates_:(this.pixelCoordinates_||(this.pixelCoordinates_=[]),u=Dc(this.coordinates,0,this.coordinates.length,2,r,this.pixelCoordinates_),yB(this.renderedTransform_,r));let f=0;const p=i.length;let m=0,y,x,_,E,S,k,A,P,z,I,T,R,L,D=0,V=0;const j=this.coordinateCache_,oe=this.viewRotation_,ye=Math.round(Math.atan2(-r[1],r[0])*1e12)/1e12,ge={context:e,pixelRatio:this.pixelRatio,resolution:this.resolution,rotation:oe},de=this.instructions!=i||this.overlaps?0:200;let he,ie,ue,Q;for(;f<p;){const O=i[f];switch(O[0]){case bn.BEGIN_GEOMETRY:he=O[1],Q=O[3],he.getGeometry()?o!==void 0&&!Fi(o,Q.getExtent())?f=O[2]+1:++f:f=O[2],c&&(c.zIndex=O[4]);break;case bn.BEGIN_PATH:D>de&&(this.fill_(e),D=0),V>de&&(e.stroke(),V=0),!D&&!V&&(e.beginPath(),S=NaN,k=NaN),++f;break;case bn.CIRCLE:m=O[1];const H=u[m],J=u[m+1],ae=u[m+2],je=u[m+3],De=ae-H,xe=je-J,ce=Math.sqrt(De*De+xe*xe);e.moveTo(H+ce,J),e.arc(H,J,ce,0,2*Math.PI,!0),++f;break;case bn.CLOSE_PATH:e.closePath(),++f;break;case bn.CUSTOM:m=O[1],y=O[2];const _t=O[3],Rt=O[4],xt=O[5];ge.geometry=_t,ge.feature=he,f in j||(j[f]=[]);const wt=j[f];xt?xt(u,m,y,2,wt):(wt[0]=u[m],wt[1]=u[m+1],wt.length=2),c&&(c.zIndex=O[6]),Rt(wt,ge),++f;break;case bn.DRAW_IMAGE:m=O[1],y=O[2],z=O[3],x=O[4],_=O[5];let _n=O[6];const Xe=O[7],Ze=O[8],Qt=O[9],un=O[10];let pn=O[11];const Pn=O[12];let Pr=O[13];E=O[14]||"declutter";const tt=O[15];if(!z&&O.length>=20){I=O[19],T=O[20],R=O[21],L=O[22];const me=this.drawLabelWithPointPlacement_(I,T,R,L);z=me.label,O[3]=z;const Tn=O[23];x=(me.anchorX-Tn)*this.pixelRatio,O[4]=x;const cr=O[24];_=(me.anchorY-cr)*this.pixelRatio,O[5]=_,_n=z.height,O[6]=_n,Pr=z.width,O[13]=Pr}let fn;O.length>25&&(fn=O[25]);let rn,en,dn;O.length>17?(rn=O[16],en=O[17],dn=O[18]):(rn=Uf,en=null,dn=null),un&&ye?pn+=oe:!un&&!ye&&(pn-=oe);let vn=0;for(;m<y;m+=2){if(fn&&fn[vn++]<Pr/this.pixelRatio)continue;const me=this.calculateImageOrLabelDimensions_(z.width,z.height,u[m],u[m+1],Pr,_n,x,_,Ze,Qt,pn,Pn,s,rn,!!en||!!dn,he),Tn=[e,t,z,me,Xe,en,dn];if(l){let cr,pr,ni;if(tt){const Vn=y-m;if(!tt[Vn]){tt[Vn]={args:Tn,declutterMode:E};continue}const $r=tt[Vn];cr=$r.args,pr=$r.declutterMode,delete tt[Vn],ni=OD(cr)}let Mr,Kr;if(cr&&(pr!=="declutter"||!l.collides(ni))&&(Mr=!0),(E!=="declutter"||!l.collides(me.declutterBox))&&(Kr=!0),pr==="declutter"&&E==="declutter"){const Vn=Mr&&Kr;Mr=Vn,Kr=Vn}Mr&&(pr!=="none"&&l.insert(ni),this.replayImageOrLabel_.apply(this,cr)),Kr&&(E!=="none"&&l.insert(me.declutterBox),this.replayImageOrLabel_.apply(this,Tn))}else this.replayImageOrLabel_.apply(this,Tn)}++f;break;case bn.DRAW_CHARS:const gn=O[1],$n=O[2],$t=O[3],Wn=O[4];L=O[5];const nr=O[6],rr=O[7],xr=O[8];R=O[9];const ar=O[10];I=O[11],Array.isArray(I)&&(I=I.reduce(Kse,"")),T=O[12];const gr=[O[13],O[13]];E=O[14]||"declutter";const Nr=O[15],kn=this.textStates[T],Qn=kn.font,wn=[kn.scale[0]*rr,kn.scale[1]*rr];let xn;Qn in this.widths_?xn=this.widths_[Qn]:(xn={},this.widths_[Qn]=xn);const hi=VN(u,gn,$n,2),Bi=Math.abs(wn[0])*jD(Qn,I,xn);if(Wn||Bi<=hi){const me=this.textStates[T].textAlign,Tn=(hi-Bi)*bA(I,me),cr=Wse(u,gn,$n,2,I,Tn,nr,Math.abs(wn[0]),jD,Qn,xn,ye?0:this.viewRotation_,Nr);e:if(cr){const pr=[];let ni,Mr,Kr,Vn,$r;if(R)for(ni=0,Mr=cr.length;ni<Mr;++ni){$r=cr[ni],Kr=$r[4],Vn=this.createLabel(Kr,T,"",R),x=$r[2]+(wn[0]<0?-ar:ar),_=$t*Vn.height+(.5-$t)*2*ar*wn[1]/wn[0]-xr;const fi=this.calculateImageOrLabelDimensions_(Vn.width,Vn.height,$r[0],$r[1],Vn.width,Vn.height,x,_,0,0,$r[3],gr,!1,Uf,!1,he);if(l&&E==="declutter"&&l.collides(fi.declutterBox))break e;pr.push([e,t,Vn,fi,1,null,null])}if(L)for(ni=0,Mr=cr.length;ni<Mr;++ni){$r=cr[ni],Kr=$r[4],Vn=this.createLabel(Kr,T,L,""),x=$r[2],_=$t*Vn.height-xr;const fi=this.calculateImageOrLabelDimensions_(Vn.width,Vn.height,$r[0],$r[1],Vn.width,Vn.height,x,_,0,0,$r[3],gr,!1,Uf,!1,he);if(l&&E==="declutter"&&l.collides(fi.declutterBox))break e;pr.push([e,t,Vn,fi,1,null,null])}l&&E!=="none"&&l.load(pr.map(OD));for(let fi=0,Ne=pr.length;fi<Ne;++fi)this.replayImageOrLabel_.apply(this,pr[fi])}}++f;break;case bn.END_GEOMETRY:if(a!==void 0){he=O[1];const me=a(he,Q,E);if(me)return me}++f;break;case bn.FILL:de?D++:this.fill_(e),++f;break;case bn.MOVE_TO_LINE_TO:for(m=O[1],y=O[2],ie=u[m],ue=u[m+1],e.moveTo(ie,ue),S=ie+.5|0,k=ue+.5|0,m+=2;m<y;m+=2)ie=u[m],ue=u[m+1],A=ie+.5|0,P=ue+.5|0,(m==y-2||A!==S||P!==k)&&(e.lineTo(ie,ue),S=A,k=P);++f;break;case bn.SET_FILL_STYLE:this.alignAndScaleFill_=O[2],D&&(this.fill_(e),D=0,V&&(e.stroke(),V=0)),e.fillStyle=O[1],++f;break;case bn.SET_STROKE_STYLE:V&&(e.stroke(),V=0),this.setStrokeStyle_(e,O),++f;break;case bn.STROKE:de?V++:e.stroke(),++f;break;default:++f;break}}D&&this.fill_(e),V&&e.stroke()}execute(e,t,r,i,s,a){this.viewRotation_=i,this.execute_(e,t,r,this.instructions,s,void 0,void 0,a)}executeHitDetection(e,t,r,i,s){return this.viewRotation_=r,this.execute_(e,[e.canvas.width,e.canvas.height],t,this.hitDetectionInstructions,!0,i,s)}}const jf=["Polygon","Circle","LineString","Image","Text","Default"],mE=["Image","Text"],Xse=jf.filter(n=>!mE.includes(n));class OB{constructor(e,t,r,i,s,a,o){this.maxExtent_=e,this.overlaps_=i,this.pixelRatio_=r,this.resolution_=t,this.renderBuffer_=a,this.executorsByZIndex_={},this.hitDetectionContext_=null,this.hitDetectionTransform_=ms(),this.renderedContext_=null,this.deferredZIndexContexts_={},this.createExecutors_(s,o)}clip(e,t){const r=this.getClipCoords(t);e.beginPath(),e.moveTo(r[0],r[1]),e.lineTo(r[2],r[3]),e.lineTo(r[4],r[5]),e.lineTo(r[6],r[7]),e.clip()}createExecutors_(e,t){for(const r in e){let i=this.executorsByZIndex_[r];i===void 0&&(i={},this.executorsByZIndex_[r]=i);const s=e[r];for(const a in s){const o=s[a];i[a]=new qse(this.resolution_,this.pixelRatio_,this.overlaps_,o,t)}}}hasExecutors(e){for(const t in this.executorsByZIndex_){const r=this.executorsByZIndex_[t];for(let i=0,s=e.length;i<s;++i)if(e[i]in r)return!0}return!1}forEachFeatureAtCoordinate(e,t,r,i,s,a){i=Math.round(i);const o=i*2+1,l=bl(this.hitDetectionTransform_,i+.5,i+.5,1/t,-1/t,-r,-e[0],-e[1]),c=!this.hitDetectionContext_;c&&(this.hitDetectionContext_=ss(o,o));const u=this.hitDetectionContext_;u.canvas.width!==o||u.canvas.height!==o?(u.canvas.width=o,u.canvas.height=o):c||u.clearRect(0,0,o,o);let f;this.renderBuffer_!==void 0&&(f=Ka(),Hv(f,e),Ra(f,t*(this.renderBuffer_+i),f));const p=Yse(i);let m;function y(P,z,I){const T=u.getImageData(0,0,o,o).data;for(let R=0,L=p.length;R<L;R++)if(T[p[R]]>0){if(!a||I==="none"||m!=="Image"&&m!=="Text"||a.includes(P)){const D=(p[R]-3)/4,V=i-D%o,j=i-(D/o|0),oe=s(P,z,V*V+j*j);if(oe)return oe}u.clearRect(0,0,o,o);break}}const x=Object.keys(this.executorsByZIndex_).map(Number);x.sort(Fc);let _,E,S,k,A;for(_=x.length-1;_>=0;--_){const P=x[_].toString();for(S=this.executorsByZIndex_[P],E=jf.length-1;E>=0;--E)if(m=jf[E],k=S[m],k!==void 0&&(A=k.executeHitDetection(u,l,r,y,f),A))return A}}getClipCoords(e){const t=this.maxExtent_;if(!t)return null;const r=t[0],i=t[1],s=t[2],a=t[3],o=[r,i,r,a,s,a,s,i];return Dc(o,0,8,2,e,o),o}isEmpty(){return Sh(this.executorsByZIndex_)}execute(e,t,r,i,s,a,o){const l=Object.keys(this.executorsByZIndex_).map(Number);l.sort(o?hie:Fc),a=a||jf;const c=jf.length;for(let u=0,f=l.length;u<f;++u){const p=l[u].toString(),m=this.executorsByZIndex_[p];for(let y=0,x=a.length;y<x;++y){const _=a[y],E=m[_];if(E!==void 0){const S=o===null?void 0:E.getZIndexContext(),k=S?S.getContext():e,A=this.maxExtent_&&_!=="Image"&&_!=="Text";if(A&&(k.save(),this.clip(k,r)),!S||_==="Text"||_==="Image"?E.execute(k,t,r,i,s,o):S.pushFunction(P=>E.execute(P,t,r,i,s,o)),A&&k.restore(),S){S.offset();const P=l[u]*c+jf.indexOf(_);this.deferredZIndexContexts_[P]||(this.deferredZIndexContexts_[P]=[]),this.deferredZIndexContexts_[P].push(S)}}}}this.renderedContext_=e}getDeferredZIndexContexts(){return this.deferredZIndexContexts_}getRenderedContext(){return this.renderedContext_}renderDeferred(){const e=this.deferredZIndexContexts_,t=Object.keys(e).map(Number).sort(Fc);for(let r=0,i=t.length;r<i;++r)e[t[r]].forEach(s=>{s.draw(this.renderedContext_),s.clear()}),e[t[r]].length=0}}const EA={};function Yse(n){if(EA[n]!==void 0)return EA[n];const e=n*2+1,t=n*n,r=new Array(t+1);for(let s=0;s<=n;++s)for(let a=0;a<=n;++a){const o=s*s+a*a;if(o>t)break;let l=r[o];l||(l=[],r[o]=l),l.push(((n+s)*e+(n+a))*4+3),s>0&&l.push(((n-s)*e+(n+a))*4+3),a>0&&(l.push(((n+s)*e+(n-a))*4+3),s>0&&l.push(((n-s)*e+(n-a))*4+3))}const i=[];for(let s=0,a=r.length;s<a;++s)r[s]&&i.push(...r[s]);return EA[n]=i,i}function GD(n){return n[0]>0&&n[1]>0}function Zse(n,e,t){return t===void 0&&(t=[0,0]),t[0]=n[0]*e+.5|0,t[1]=n[1]*e+.5|0,t}function ha(n,e){return Array.isArray(n)?n:(e===void 0?e=[n,n]:(e[0]=n,e[1]=n),e)}class fk{constructor(e){this.opacity_=e.opacity,this.rotateWithView_=e.rotateWithView,this.rotation_=e.rotation,this.scale_=e.scale,this.scaleArray_=ha(e.scale),this.displacement_=e.displacement,this.declutterMode_=e.declutterMode}clone(){const e=this.getScale();return new fk({opacity:this.getOpacity(),scale:Array.isArray(e)?e.slice():e,rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()})}getOpacity(){return this.opacity_}getRotateWithView(){return this.rotateWithView_}getRotation(){return this.rotation_}getScale(){return this.scale_}getScaleArray(){return this.scaleArray_}getDisplacement(){return this.displacement_}getDeclutterMode(){return this.declutterMode_}getAnchor(){return jn()}getImage(e){return jn()}getHitDetectionImage(){return jn()}getPixelRatio(e){return 1}getImageState(){return jn()}getImageSize(){return jn()}getOrigin(){return jn()}getSize(){return jn()}setDisplacement(e){this.displacement_=e}setOpacity(e){this.opacity_=e}setRotateWithView(e){this.rotateWithView_=e}setRotation(e){this.rotation_=e}setScale(e){this.scale_=e,this.scaleArray_=ha(e)}listenImageChange(e){jn()}load(){jn()}unlistenImageChange(e){jn()}ready(){return Promise.resolve()}}class gk extends fk{constructor(e){super({opacity:1,rotateWithView:e.rotateWithView!==void 0?e.rotateWithView:!1,rotation:e.rotation!==void 0?e.rotation:0,scale:e.scale!==void 0?e.scale:1,displacement:e.displacement!==void 0?e.displacement:[0,0],declutterMode:e.declutterMode}),this.hitDetectionCanvas_=null,this.fill_=e.fill!==void 0?e.fill:null,this.origin_=[0,0],this.points_=e.points,this.radius=e.radius,this.radius2_=e.radius2,this.angle_=e.angle!==void 0?e.angle:0,this.stroke_=e.stroke!==void 0?e.stroke:null,this.size_,this.renderOptions_,this.imageState_=this.fill_&&this.fill_.loading()?Kt.LOADING:Kt.LOADED,this.imageState_===Kt.LOADING&&this.ready().then(()=>this.imageState_=Kt.LOADED),this.render()}clone(){const e=this.getScale(),t=new gk({fill:this.getFill()?this.getFill().clone():void 0,points:this.getPoints(),radius:this.getRadius(),radius2:this.getRadius2(),angle:this.getAngle(),stroke:this.getStroke()?this.getStroke().clone():void 0,rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),scale:Array.isArray(e)?e.slice():e,displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()});return t.setOpacity(this.getOpacity()),t}getAnchor(){const e=this.size_,t=this.getDisplacement(),r=this.getScaleArray();return[e[0]/2-t[0]/r[0],e[1]/2+t[1]/r[1]]}getAngle(){return this.angle_}getFill(){return this.fill_}setFill(e){this.fill_=e,this.render()}getHitDetectionImage(){return this.hitDetectionCanvas_||(this.hitDetectionCanvas_=this.createHitDetectionCanvas_(this.renderOptions_)),this.hitDetectionCanvas_}getImage(e){const t=this.fill_?.getKey(),r=`${e},${this.angle_},${this.radius},${this.radius2_},${this.points_},${t}`+Object.values(this.renderOptions_).join(",");let i=pl.get(r,null,null)?.getImage(1);if(!i){const s=this.renderOptions_,a=Math.ceil(s.size*e),o=ss(a,a);this.draw_(s,o,e),i=o.canvas,pl.set(r,null,null,new PB(i,void 0,null,Kt.LOADED,null))}return i}getPixelRatio(e){return e}getImageSize(){return this.size_}getImageState(){return this.imageState_}getOrigin(){return this.origin_}getPoints(){return this.points_}getRadius(){return this.radius}getRadius2(){return this.radius2_}getSize(){return this.size_}getStroke(){return this.stroke_}setStroke(e){this.stroke_=e,this.render()}listenImageChange(e){}load(){}unlistenImageChange(e){}calculateLineJoinSize_(e,t,r){if(t===0||this.points_===1/0||e!=="bevel"&&e!=="miter")return t;let i=this.radius,s=this.radius2_===void 0?i:this.radius2_;if(i<s){const z=i;i=s,s=z}const a=this.radius2_===void 0?this.points_:this.points_*2,o=2*Math.PI/a,l=s*Math.sin(o),c=Math.sqrt(s*s-l*l),u=i-c,f=Math.sqrt(l*l+u*u),p=f/l;if(e==="miter"&&p<=r)return p*t;const m=t/2/p,y=t/2*(u/f),_=Math.sqrt((i+m)*(i+m)+y*y)-i;if(this.radius2_===void 0||e==="bevel")return _*2;const E=i*Math.sin(o),S=Math.sqrt(i*i-E*E),k=s-S,P=Math.sqrt(E*E+k*k)/E;if(P<=r){const z=P*t/2-s-i;return 2*Math.max(_,z)}return _*2}createRenderOptions(){let e=c0,t=u0,r=0,i=null,s=0,a,o=0;this.stroke_&&(a=Rc(this.stroke_.getColor()??z1),o=this.stroke_.getWidth()??V1,i=this.stroke_.getLineDash(),s=this.stroke_.getLineDashOffset()??0,t=this.stroke_.getLineJoin()??u0,e=this.stroke_.getLineCap()??c0,r=this.stroke_.getMiterLimit()??O1);const l=this.calculateLineJoinSize_(t,o,r),c=Math.max(this.radius,this.radius2_||0),u=Math.ceil(2*c+l);return{strokeStyle:a,strokeWidth:o,size:u,lineCap:e,lineDash:i,lineDashOffset:s,lineJoin:t,miterLimit:r}}render(){this.renderOptions_=this.createRenderOptions();const e=this.renderOptions_.size;this.hitDetectionCanvas_=null,this.size_=[e,e]}draw_(e,t,r){if(t.scale(r,r),t.translate(e.size/2,e.size/2),this.createPath_(t),this.fill_){let i=this.fill_.getColor();i===null&&(i=so),t.fillStyle=Rc(i),t.fill()}e.strokeStyle&&(t.strokeStyle=e.strokeStyle,t.lineWidth=e.strokeWidth,e.lineDash&&(t.setLineDash(e.lineDash),t.lineDashOffset=e.lineDashOffset),t.lineCap=e.lineCap,t.lineJoin=e.lineJoin,t.miterLimit=e.miterLimit,t.stroke())}createHitDetectionCanvas_(e){let t;if(this.fill_){let r=this.fill_.getColor(),i=0;typeof r=="string"&&(r=El(r)),r===null?i=1:Array.isArray(r)&&(i=r.length===4?r[3]:1),i===0&&(t=ss(e.size,e.size),this.drawHitDetectionCanvas_(e,t))}return t?t.canvas:this.getImage(1)}createPath_(e){let t=this.points_;const r=this.radius;if(t===1/0)e.arc(0,0,r,0,2*Math.PI);else{const i=this.radius2_===void 0?r:this.radius2_;this.radius2_!==void 0&&(t*=2);const s=this.angle_-Math.PI/2,a=2*Math.PI/t;for(let o=0;o<t;o++){const l=s+o*a,c=o%2===0?r:i;e.lineTo(c*Math.cos(l),c*Math.sin(l))}e.closePath()}}drawHitDetectionCanvas_(e,t){t.translate(e.size/2,e.size/2),this.createPath_(t),t.fillStyle=so,t.fill(),e.strokeStyle&&(t.strokeStyle=e.strokeStyle,t.lineWidth=e.strokeWidth,e.lineDash&&(t.setLineDash(e.lineDash),t.lineDashOffset=e.lineDashOffset),t.lineJoin=e.lineJoin,t.miterLimit=e.miterLimit,t.stroke())}ready(){return this.fill_?this.fill_.ready():Promise.resolve()}}class xs extends gk{constructor(e){e=e||{radius:5},super({points:1/0,fill:e.fill,radius:e.radius,stroke:e.stroke,scale:e.scale!==void 0?e.scale:1,rotation:e.rotation!==void 0?e.rotation:0,rotateWithView:e.rotateWithView!==void 0?e.rotateWithView:!1,displacement:e.displacement!==void 0?e.displacement:[0,0],declutterMode:e.declutterMode})}clone(){const e=this.getScale(),t=new xs({fill:this.getFill()?this.getFill().clone():void 0,stroke:this.getStroke()?this.getStroke().clone():void 0,radius:this.getRadius(),scale:Array.isArray(e)?e.slice():e,rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()});return t.setOpacity(this.getOpacity()),t}setRadius(e){this.radius=e,this.render()}}class Rn{constructor(e){e=e||{},this.patternImage_=null,this.color_=null,e.color!==void 0&&this.setColor(e.color)}clone(){const e=this.getColor();return new Rn({color:Array.isArray(e)?e.slice():e||void 0})}getColor(){return this.color_}setColor(e){if(e!==null&&typeof e=="object"&&"src"in e){const t=fE(null,e.src,"anonymous",void 0,e.offset?null:e.color?e.color:null,!(e.offset&&e.size));t.ready().then(()=>{this.patternImage_=null}),t.getImageState()===Kt.IDLE&&t.load(),t.getImageState()===Kt.LOADING&&(this.patternImage_=t)}this.color_=e}getKey(){const e=this.getColor();return e?e instanceof CanvasPattern||e instanceof CanvasGradient?Dt(e):typeof e=="object"&&"src"in e?e.src+":"+e.offset:El(e).toString():""}loading(){return!!this.patternImage_}ready(){return this.patternImage_?this.patternImage_.ready():Promise.resolve()}}function VD(n,e,t,r){return t!==void 0&&r!==void 0?[t/n,r/e]:t!==void 0?t/n:r!==void 0?r/e:1}class qc extends fk{constructor(e){e=e||{};const t=e.opacity!==void 0?e.opacity:1,r=e.rotation!==void 0?e.rotation:0,i=e.scale!==void 0?e.scale:1,s=e.rotateWithView!==void 0?e.rotateWithView:!1;super({opacity:t,rotation:r,scale:i,displacement:e.displacement!==void 0?e.displacement:[0,0],rotateWithView:s,declutterMode:e.declutterMode}),this.anchor_=e.anchor!==void 0?e.anchor:[.5,.5],this.normalizedAnchor_=null,this.anchorOrigin_=e.anchorOrigin!==void 0?e.anchorOrigin:"top-left",this.anchorXUnits_=e.anchorXUnits!==void 0?e.anchorXUnits:"fraction",this.anchorYUnits_=e.anchorYUnits!==void 0?e.anchorYUnits:"fraction",this.crossOrigin_=e.crossOrigin!==void 0?e.crossOrigin:null;const a=e.img!==void 0?e.img:null;let o=e.src;Er(!(o!==void 0&&a),"`image` and `src` cannot be provided at the same time"),(o===void 0||o.length===0)&&a&&(o=a.src||Dt(a)),Er(o!==void 0&&o.length>0,"A defined and non-empty `src` or `image` must be provided"),Er(!((e.width!==void 0||e.height!==void 0)&&e.scale!==void 0),"`width` or `height` cannot be provided together with `scale`");let l;if(e.src!==void 0?l=Kt.IDLE:a!==void 0&&("complete"in a?a.complete?l=a.src?Kt.LOADED:Kt.IDLE:l=Kt.LOADING:l=Kt.LOADED),this.color_=e.color!==void 0?El(e.color):null,this.iconImage_=fE(a,o,this.crossOrigin_,l,this.color_),this.offset_=e.offset!==void 0?e.offset:[0,0],this.offsetOrigin_=e.offsetOrigin!==void 0?e.offsetOrigin:"top-left",this.origin_=null,this.size_=e.size!==void 0?e.size:null,this.initialOptions_,e.width!==void 0||e.height!==void 0){let c,u;if(e.size)[c,u]=e.size;else{const f=this.getImage(1);if(f.width&&f.height)c=f.width,u=f.height;else if(f instanceof HTMLImageElement){this.initialOptions_=e;const p=()=>{if(this.unlistenImageChange(p),!this.initialOptions_)return;const m=this.iconImage_.getSize();this.setScale(VD(m[0],m[1],e.width,e.height))};this.listenImageChange(p);return}}c!==void 0&&this.setScale(VD(c,u,e.width,e.height))}}clone(){let e,t,r;return this.initialOptions_?(t=this.initialOptions_.width,r=this.initialOptions_.height):(e=this.getScale(),e=Array.isArray(e)?e.slice():e),new qc({anchor:this.anchor_.slice(),anchorOrigin:this.anchorOrigin_,anchorXUnits:this.anchorXUnits_,anchorYUnits:this.anchorYUnits_,color:this.color_&&this.color_.slice?this.color_.slice():this.color_||void 0,crossOrigin:this.crossOrigin_,offset:this.offset_.slice(),offsetOrigin:this.offsetOrigin_,opacity:this.getOpacity(),rotateWithView:this.getRotateWithView(),rotation:this.getRotation(),scale:e,width:t,height:r,size:this.size_!==null?this.size_.slice():void 0,src:this.getSrc(),displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()})}getAnchor(){let e=this.normalizedAnchor_;if(!e){e=this.anchor_;const i=this.getSize();if(this.anchorXUnits_=="fraction"||this.anchorYUnits_=="fraction"){if(!i)return null;e=this.anchor_.slice(),this.anchorXUnits_=="fraction"&&(e[0]*=i[0]),this.anchorYUnits_=="fraction"&&(e[1]*=i[1])}if(this.anchorOrigin_!="top-left"){if(!i)return null;e===this.anchor_&&(e=this.anchor_.slice()),(this.anchorOrigin_=="top-right"||this.anchorOrigin_=="bottom-right")&&(e[0]=-e[0]+i[0]),(this.anchorOrigin_=="bottom-left"||this.anchorOrigin_=="bottom-right")&&(e[1]=-e[1]+i[1])}this.normalizedAnchor_=e}const t=this.getDisplacement(),r=this.getScaleArray();return[e[0]-t[0]/r[0],e[1]+t[1]/r[1]]}setAnchor(e){this.anchor_=e,this.normalizedAnchor_=null}getColor(){return this.color_}getImage(e){return this.iconImage_.getImage(e)}getPixelRatio(e){return this.iconImage_.getPixelRatio(e)}getImageSize(){return this.iconImage_.getSize()}getImageState(){return this.iconImage_.getImageState()}getHitDetectionImage(){return this.iconImage_.getHitDetectionImage()}getOrigin(){if(this.origin_)return this.origin_;let e=this.offset_;if(this.offsetOrigin_!="top-left"){const t=this.getSize(),r=this.iconImage_.getSize();if(!t||!r)return null;e=e.slice(),(this.offsetOrigin_=="top-right"||this.offsetOrigin_=="bottom-right")&&(e[0]=r[0]-t[0]-e[0]),(this.offsetOrigin_=="bottom-left"||this.offsetOrigin_=="bottom-right")&&(e[1]=r[1]-t[1]-e[1])}return this.origin_=e,this.origin_}getSrc(){return this.iconImage_.getSrc()}setSrc(e){this.iconImage_=fE(null,e,this.crossOrigin_,Kt.IDLE,this.color_)}getSize(){return this.size_?this.size_:this.iconImage_.getSize()}getWidth(){const e=this.getScaleArray();if(this.size_)return this.size_[0]*e[0];if(this.iconImage_.getImageState()==Kt.LOADED)return this.iconImage_.getSize()[0]*e[0]}getHeight(){const e=this.getScaleArray();if(this.size_)return this.size_[1]*e[1];if(this.iconImage_.getImageState()==Kt.LOADED)return this.iconImage_.getSize()[1]*e[1]}setScale(e){delete this.initialOptions_,super.setScale(e)}listenImageChange(e){this.iconImage_.addEventListener(In.CHANGE,e)}load(){this.iconImage_.load()}unlistenImageChange(e){this.iconImage_.removeEventListener(In.CHANGE,e)}ready(){return this.iconImage_.ready()}}class cn{constructor(e){e=e||{},this.color_=e.color!==void 0?e.color:null,this.lineCap_=e.lineCap,this.lineDash_=e.lineDash!==void 0?e.lineDash:null,this.lineDashOffset_=e.lineDashOffset,this.lineJoin_=e.lineJoin,this.miterLimit_=e.miterLimit,this.width_=e.width}clone(){const e=this.getColor();return new cn({color:Array.isArray(e)?e.slice():e||void 0,lineCap:this.getLineCap(),lineDash:this.getLineDash()?this.getLineDash().slice():void 0,lineDashOffset:this.getLineDashOffset(),lineJoin:this.getLineJoin(),miterLimit:this.getMiterLimit(),width:this.getWidth()})}getColor(){return this.color_}getLineCap(){return this.lineCap_}getLineDash(){return this.lineDash_}getLineDashOffset(){return this.lineDashOffset_}getLineJoin(){return this.lineJoin_}getMiterLimit(){return this.miterLimit_}getWidth(){return this.width_}setColor(e){this.color_=e}setLineCap(e){this.lineCap_=e}setLineDash(e){this.lineDash_=e}setLineDashOffset(e){this.lineDashOffset_=e}setLineJoin(e){this.lineJoin_=e}setMiterLimit(e){this.miterLimit_=e}setWidth(e){this.width_=e}}class Zt{constructor(e){e=e||{},this.geometry_=null,this.geometryFunction_=BD,e.geometry!==void 0&&this.setGeometry(e.geometry),this.fill_=e.fill!==void 0?e.fill:null,this.image_=e.image!==void 0?e.image:null,this.renderer_=e.renderer!==void 0?e.renderer:null,this.hitDetectionRenderer_=e.hitDetectionRenderer!==void 0?e.hitDetectionRenderer:null,this.stroke_=e.stroke!==void 0?e.stroke:null,this.text_=e.text!==void 0?e.text:null,this.zIndex_=e.zIndex}clone(){let e=this.getGeometry();return e&&typeof e=="object"&&(e=e.clone()),new Zt({geometry:e??void 0,fill:this.getFill()?this.getFill().clone():void 0,image:this.getImage()?this.getImage().clone():void 0,renderer:this.getRenderer()??void 0,stroke:this.getStroke()?this.getStroke().clone():void 0,text:this.getText()?this.getText().clone():void 0,zIndex:this.getZIndex()})}getRenderer(){return this.renderer_}setRenderer(e){this.renderer_=e}setHitDetectionRenderer(e){this.hitDetectionRenderer_=e}getHitDetectionRenderer(){return this.hitDetectionRenderer_}getGeometry(){return this.geometry_}getGeometryFunction(){return this.geometryFunction_}getFill(){return this.fill_}setFill(e){this.fill_=e}getImage(){return this.image_}setImage(e){this.image_=e}getStroke(){return this.stroke_}setStroke(e){this.stroke_=e}getText(){return this.text_}setText(e){this.text_=e}getZIndex(){return this.zIndex_}setGeometry(e){typeof e=="function"?this.geometryFunction_=e:typeof e=="string"?this.geometryFunction_=function(t){return t.get(e)}:e?e!==void 0&&(this.geometryFunction_=function(){return e}):this.geometryFunction_=BD,this.geometry_=e}setZIndex(e){this.zIndex_=e}}function Jse(n){let e;if(typeof n=="function")e=n;else{let t;Array.isArray(n)?t=n:(Er(typeof n.getZIndex=="function","Expected an `Style` or an array of `Style`"),t=[n]),e=function(){return t}}return e}let SA=null;function zB(n,e){if(!SA){const t=new Rn({color:"rgba(255,255,255,0.4)"}),r=new cn({color:"#3399CC",width:1.25});SA=[new Zt({image:new xs({fill:t,stroke:r,radius:5}),fill:t,stroke:r})]}return SA}function UN(){const n={},e=[255,255,255,1],t=[0,153,255,1],r=3;return n.Polygon=[new Zt({fill:new Rn({color:[255,255,255,.5]})})],n.MultiPolygon=n.Polygon,n.LineString=[new Zt({stroke:new cn({color:e,width:r+2})}),new Zt({stroke:new cn({color:t,width:r})})],n.MultiLineString=n.LineString,n.Circle=n.Polygon.concat(n.LineString),n.Point=[new Zt({image:new xs({radius:r*2,fill:new Rn({color:t}),stroke:new cn({color:e,width:r/2})}),zIndex:1/0})],n.MultiPoint=n.Point,n.GeometryCollection=n.Polygon.concat(n.LineString,n.Point),n}function BD(n){return n.getGeometry()}const Qse="#333";class Na{constructor(e){e=e||{},this.font_=e.font,this.rotation_=e.rotation,this.rotateWithView_=e.rotateWithView,this.keepUpright_=e.keepUpright,this.scale_=e.scale,this.scaleArray_=ha(e.scale!==void 0?e.scale:1),this.text_=e.text,this.textAlign_=e.textAlign,this.justify_=e.justify,this.repeat_=e.repeat,this.textBaseline_=e.textBaseline,this.fill_=e.fill!==void 0?e.fill:new Rn({color:Qse}),this.maxAngle_=e.maxAngle!==void 0?e.maxAngle:Math.PI/4,this.placement_=e.placement!==void 0?e.placement:"point",this.overflow_=!!e.overflow,this.stroke_=e.stroke!==void 0?e.stroke:null,this.offsetX_=e.offsetX!==void 0?e.offsetX:0,this.offsetY_=e.offsetY!==void 0?e.offsetY:0,this.backgroundFill_=e.backgroundFill?e.backgroundFill:null,this.backgroundStroke_=e.backgroundStroke?e.backgroundStroke:null,this.padding_=e.padding===void 0?null:e.padding,this.declutterMode_=e.declutterMode}clone(){const e=this.getScale();return new Na({font:this.getFont(),placement:this.getPlacement(),repeat:this.getRepeat(),maxAngle:this.getMaxAngle(),overflow:this.getOverflow(),rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),keepUpright:this.getKeepUpright(),scale:Array.isArray(e)?e.slice():e,text:this.getText(),textAlign:this.getTextAlign(),justify:this.getJustify(),textBaseline:this.getTextBaseline(),fill:this.getFill()instanceof Rn?this.getFill().clone():this.getFill(),stroke:this.getStroke()?this.getStroke().clone():void 0,offsetX:this.getOffsetX(),offsetY:this.getOffsetY(),backgroundFill:this.getBackgroundFill()?this.getBackgroundFill().clone():void 0,backgroundStroke:this.getBackgroundStroke()?this.getBackgroundStroke().clone():void 0,padding:this.getPadding()||void 0,declutterMode:this.getDeclutterMode()})}getOverflow(){return this.overflow_}getFont(){return this.font_}getMaxAngle(){return this.maxAngle_}getPlacement(){return this.placement_}getRepeat(){return this.repeat_}getOffsetX(){return this.offsetX_}getOffsetY(){return this.offsetY_}getFill(){return this.fill_}getRotateWithView(){return this.rotateWithView_}getKeepUpright(){return this.keepUpright_}getRotation(){return this.rotation_}getScale(){return this.scale_}getScaleArray(){return this.scaleArray_}getStroke(){return this.stroke_}getText(){return this.text_}getTextAlign(){return this.textAlign_}getJustify(){return this.justify_}getTextBaseline(){return this.textBaseline_}getBackgroundFill(){return this.backgroundFill_}getBackgroundStroke(){return this.backgroundStroke_}getPadding(){return this.padding_}getDeclutterMode(){return this.declutterMode_}setOverflow(e){this.overflow_=e}setFont(e){this.font_=e}setMaxAngle(e){this.maxAngle_=e}setOffsetX(e){this.offsetX_=e}setOffsetY(e){this.offsetY_=e}setPlacement(e){this.placement_=e}setRepeat(e){this.repeat_=e}setRotateWithView(e){this.rotateWithView_=e}setKeepUpright(e){this.keepUpright_=e}setFill(e){this.fill_=e}setRotation(e){this.rotation_=e}setScale(e){this.scale_=e,this.scaleArray_=ha(e!==void 0?e:1)}setStroke(e){this.stroke_=e}setText(e){this.text_=e}setTextAlign(e){this.textAlign_=e}setJustify(e){this.justify_=e}setTextBaseline(e){this.textBaseline_=e}setBackgroundFill(e){this.backgroundFill_=e}setBackgroundStroke(e){this.backgroundStroke_=e}setPadding(e){this.padding_=e}}class eae extends NB{constructor(e,t,r,i,s,a,o){super(),this.context_=e,this.pixelRatio_=t,this.extent_=r,this.transform_=i,this.transformRotation_=i?H0(Math.atan2(i[1],i[0]),10):0,this.viewRotation_=s,this.squaredTolerance_=a,this.userTransform_=o,this.contextFillState_=null,this.contextStrokeState_=null,this.contextTextState_=null,this.fillState_=null,this.strokeState_=null,this.image_=null,this.imageAnchorX_=0,this.imageAnchorY_=0,this.imageHeight_=0,this.imageOpacity_=0,this.imageOriginX_=0,this.imageOriginY_=0,this.imageRotateWithView_=!1,this.imageRotation_=0,this.imageScale_=[0,0],this.imageWidth_=0,this.text_="",this.textOffsetX_=0,this.textOffsetY_=0,this.textRotateWithView_=!1,this.textRotation_=0,this.textScale_=[0,0],this.textFillState_=null,this.textStrokeState_=null,this.textState_=null,this.pixelCoordinates_=[],this.tmpLocalTransform_=ms()}drawImages_(e,t,r,i){if(!this.image_)return;const s=Dc(e,t,r,i,this.transform_,this.pixelCoordinates_),a=this.context_,o=this.tmpLocalTransform_,l=a.globalAlpha;this.imageOpacity_!=1&&(a.globalAlpha=l*this.imageOpacity_);let c=this.imageRotation_;this.transformRotation_===0&&(c-=this.viewRotation_),this.imageRotateWithView_&&(c+=this.viewRotation_);for(let u=0,f=s.length;u<f;u+=2){const p=s[u]-this.imageAnchorX_,m=s[u+1]-this.imageAnchorY_;if(c!==0||this.imageScale_[0]!=1||this.imageScale_[1]!=1){const y=p+this.imageAnchorX_,x=m+this.imageAnchorY_;bl(o,y,x,1,1,c,-y,-x),a.save(),a.transform.apply(a,o),a.translate(y,x),a.scale(this.imageScale_[0],this.imageScale_[1]),a.drawImage(this.image_,this.imageOriginX_,this.imageOriginY_,this.imageWidth_,this.imageHeight_,-this.imageAnchorX_,-this.imageAnchorY_,this.imageWidth_,this.imageHeight_),a.restore()}else a.drawImage(this.image_,this.imageOriginX_,this.imageOriginY_,this.imageWidth_,this.imageHeight_,p,m,this.imageWidth_,this.imageHeight_)}this.imageOpacity_!=1&&(a.globalAlpha=l)}drawText_(e,t,r,i){if(!this.textState_||this.text_==="")return;this.textFillState_&&this.setContextFillState_(this.textFillState_),this.textStrokeState_&&this.setContextStrokeState_(this.textStrokeState_),this.setContextTextState_(this.textState_);const s=Dc(e,t,r,i,this.transform_,this.pixelCoordinates_),a=this.context_;let o=this.textRotation_;for(this.transformRotation_===0&&(o-=this.viewRotation_),this.textRotateWithView_&&(o+=this.viewRotation_);t<r;t+=i){const l=s[t]+this.textOffsetX_,c=s[t+1]+this.textOffsetY_;o!==0||this.textScale_[0]!=1||this.textScale_[1]!=1?(a.save(),a.translate(l-this.textOffsetX_,c-this.textOffsetY_),a.rotate(o),a.translate(this.textOffsetX_,this.textOffsetY_),a.scale(this.textScale_[0],this.textScale_[1]),this.textStrokeState_&&a.strokeText(this.text_,0,0),this.textFillState_&&a.fillText(this.text_,0,0),a.restore()):(this.textStrokeState_&&a.strokeText(this.text_,l,c),this.textFillState_&&a.fillText(this.text_,l,c))}}moveToLineTo_(e,t,r,i,s){const a=this.context_,o=Dc(e,t,r,i,this.transform_,this.pixelCoordinates_);a.moveTo(o[0],o[1]);let l=o.length;s&&(l-=2);for(let c=2;c<l;c+=2)a.lineTo(o[c],o[c+1]);return s&&a.closePath(),r}drawRings_(e,t,r,i){for(let s=0,a=r.length;s<a;++s)t=this.moveToLineTo_(e,t,r[s],i,!0);return t}drawCircle(e){if(this.squaredTolerance_&&(e=e.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),!!Fi(this.extent_,e.getExtent())){if(this.fillState_||this.strokeState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);const t=cse(e,this.transform_,this.pixelCoordinates_),r=t[2]-t[0],i=t[3]-t[1],s=Math.sqrt(r*r+i*i),a=this.context_;a.beginPath(),a.arc(t[0],t[1],s,0,2*Math.PI),this.fillState_&&a.fill(),this.strokeState_&&a.stroke()}this.text_!==""&&this.drawText_(e.getCenter(),0,2,2)}}setStyle(e){this.setFillStrokeStyle(e.getFill(),e.getStroke()),this.setImageStyle(e.getImage()),this.setTextStyle(e.getText())}setTransform(e){this.transform_=e}drawGeometry(e){switch(e.getType()){case"Point":this.drawPoint(e);break;case"LineString":this.drawLineString(e);break;case"Polygon":this.drawPolygon(e);break;case"MultiPoint":this.drawMultiPoint(e);break;case"MultiLineString":this.drawMultiLineString(e);break;case"MultiPolygon":this.drawMultiPolygon(e);break;case"GeometryCollection":this.drawGeometryCollection(e);break;case"Circle":this.drawCircle(e);break}}drawFeature(e,t){const r=t.getGeometryFunction()(e);r&&(this.setStyle(t),this.drawGeometry(r))}drawGeometryCollection(e){const t=e.getGeometriesArray();for(let r=0,i=t.length;r<i;++r)this.drawGeometry(t[r])}drawPoint(e){this.squaredTolerance_&&(e=e.simplifyTransformed(this.squaredTolerance_,this.userTransform_));const t=e.getFlatCoordinates(),r=e.getStride();this.image_&&this.drawImages_(t,0,t.length,r),this.text_!==""&&this.drawText_(t,0,t.length,r)}drawMultiPoint(e){this.squaredTolerance_&&(e=e.simplifyTransformed(this.squaredTolerance_,this.userTransform_));const t=e.getFlatCoordinates(),r=e.getStride();this.image_&&this.drawImages_(t,0,t.length,r),this.text_!==""&&this.drawText_(t,0,t.length,r)}drawLineString(e){if(this.squaredTolerance_&&(e=e.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),!!Fi(this.extent_,e.getExtent())){if(this.strokeState_){this.setContextStrokeState_(this.strokeState_);const t=this.context_,r=e.getFlatCoordinates();t.beginPath(),this.moveToLineTo_(r,0,r.length,e.getStride(),!1),t.stroke()}if(this.text_!==""){const t=e.getFlatMidpoint();this.drawText_(t,0,2,2)}}}drawMultiLineString(e){this.squaredTolerance_&&(e=e.simplifyTransformed(this.squaredTolerance_,this.userTransform_));const t=e.getExtent();if(Fi(this.extent_,t)){if(this.strokeState_){this.setContextStrokeState_(this.strokeState_);const r=this.context_,i=e.getFlatCoordinates();let s=0;const a=e.getEnds(),o=e.getStride();r.beginPath();for(let l=0,c=a.length;l<c;++l)s=this.moveToLineTo_(i,s,a[l],o,!1);r.stroke()}if(this.text_!==""){const r=e.getFlatMidpoints();this.drawText_(r,0,r.length,2)}}}drawPolygon(e){if(this.squaredTolerance_&&(e=e.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),!!Fi(this.extent_,e.getExtent())){if(this.strokeState_||this.fillState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);const t=this.context_;t.beginPath(),this.drawRings_(e.getOrientedFlatCoordinates(),0,e.getEnds(),e.getStride()),this.fillState_&&t.fill(),this.strokeState_&&t.stroke()}if(this.text_!==""){const t=e.getFlatInteriorPoint();this.drawText_(t,0,2,2)}}}drawMultiPolygon(e){if(this.squaredTolerance_&&(e=e.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),!!Fi(this.extent_,e.getExtent())){if(this.strokeState_||this.fillState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);const t=this.context_,r=e.getOrientedFlatCoordinates();let i=0;const s=e.getEndss(),a=e.getStride();t.beginPath();for(let o=0,l=s.length;o<l;++o){const c=s[o];i=this.drawRings_(r,i,c,a)}this.fillState_&&t.fill(),this.strokeState_&&t.stroke()}if(this.text_!==""){const t=e.getFlatInteriorPoints();this.drawText_(t,0,t.length,2)}}}setContextFillState_(e){const t=this.context_,r=this.contextFillState_;r?r.fillStyle!=e.fillStyle&&(r.fillStyle=e.fillStyle,t.fillStyle=e.fillStyle):(t.fillStyle=e.fillStyle,this.contextFillState_={fillStyle:e.fillStyle})}setContextStrokeState_(e){const t=this.context_,r=this.contextStrokeState_;r?(r.lineCap!=e.lineCap&&(r.lineCap=e.lineCap,t.lineCap=e.lineCap),tu(r.lineDash,e.lineDash)||t.setLineDash(r.lineDash=e.lineDash),r.lineDashOffset!=e.lineDashOffset&&(r.lineDashOffset=e.lineDashOffset,t.lineDashOffset=e.lineDashOffset),r.lineJoin!=e.lineJoin&&(r.lineJoin=e.lineJoin,t.lineJoin=e.lineJoin),r.lineWidth!=e.lineWidth&&(r.lineWidth=e.lineWidth,t.lineWidth=e.lineWidth),r.miterLimit!=e.miterLimit&&(r.miterLimit=e.miterLimit,t.miterLimit=e.miterLimit),r.strokeStyle!=e.strokeStyle&&(r.strokeStyle=e.strokeStyle,t.strokeStyle=e.strokeStyle)):(t.lineCap=e.lineCap,t.setLineDash(e.lineDash),t.lineDashOffset=e.lineDashOffset,t.lineJoin=e.lineJoin,t.lineWidth=e.lineWidth,t.miterLimit=e.miterLimit,t.strokeStyle=e.strokeStyle,this.contextStrokeState_={lineCap:e.lineCap,lineDash:e.lineDash,lineDashOffset:e.lineDashOffset,lineJoin:e.lineJoin,lineWidth:e.lineWidth,miterLimit:e.miterLimit,strokeStyle:e.strokeStyle})}setContextTextState_(e){const t=this.context_,r=this.contextTextState_,i=e.textAlign?e.textAlign:G1;r?(r.font!=e.font&&(r.font=e.font,t.font=e.font),r.textAlign!=i&&(r.textAlign=i,t.textAlign=i),r.textBaseline!=e.textBaseline&&(r.textBaseline=e.textBaseline,t.textBaseline=e.textBaseline)):(t.font=e.font,t.textAlign=i,t.textBaseline=e.textBaseline,this.contextTextState_={font:e.font,textAlign:i,textBaseline:e.textBaseline})}setFillStrokeStyle(e,t){if(!e)this.fillState_=null;else{const r=e.getColor();this.fillState_={fillStyle:Rc(r||so)}}if(!t)this.strokeState_=null;else{const r=t.getColor(),i=t.getLineCap(),s=t.getLineDash(),a=t.getLineDashOffset(),o=t.getLineJoin(),l=t.getWidth(),c=t.getMiterLimit(),u=s||Pu;this.strokeState_={lineCap:i!==void 0?i:c0,lineDash:this.pixelRatio_===1?u:u.map(f=>f*this.pixelRatio_),lineDashOffset:(a||Nu)*this.pixelRatio_,lineJoin:o!==void 0?o:u0,lineWidth:(l!==void 0?l:V1)*this.pixelRatio_,miterLimit:c!==void 0?c:O1,strokeStyle:Rc(r||z1)}}}setImageStyle(e){let t;if(!e||!(t=e.getSize())){this.image_=null;return}const r=e.getPixelRatio(this.pixelRatio_),i=e.getAnchor(),s=e.getOrigin();this.image_=e.getImage(this.pixelRatio_),this.imageAnchorX_=i[0]*r,this.imageAnchorY_=i[1]*r,this.imageHeight_=t[1]*r,this.imageOpacity_=e.getOpacity(),this.imageOriginX_=s[0],this.imageOriginY_=s[1],this.imageRotateWithView_=e.getRotateWithView(),this.imageRotation_=e.getRotation();const a=e.getScaleArray();this.imageScale_=[a[0]*this.pixelRatio_/r,a[1]*this.pixelRatio_/r],this.imageWidth_=t[0]*r}setTextStyle(e){if(!e)this.text_="";else{const t=e.getFill();if(!t)this.textFillState_=null;else{const m=t.getColor();this.textFillState_={fillStyle:Rc(m||so)}}const r=e.getStroke();if(!r)this.textStrokeState_=null;else{const m=r.getColor(),y=r.getLineCap(),x=r.getLineDash(),_=r.getLineDashOffset(),E=r.getLineJoin(),S=r.getWidth(),k=r.getMiterLimit();this.textStrokeState_={lineCap:y!==void 0?y:c0,lineDash:x||Pu,lineDashOffset:_||Nu,lineJoin:E!==void 0?E:u0,lineWidth:S!==void 0?S:V1,miterLimit:k!==void 0?k:O1,strokeStyle:Rc(m||z1)}}const i=e.getFont(),s=e.getOffsetX(),a=e.getOffsetY(),o=e.getRotateWithView(),l=e.getRotation(),c=e.getScaleArray(),u=e.getText(),f=e.getTextAlign(),p=e.getTextBaseline();this.textState_={font:i!==void 0?i:MB,textAlign:f!==void 0?f:G1,textBaseline:p!==void 0?p:gE},this.text_=u!==void 0?Array.isArray(u)?u.reduce((m,y,x)=>m+=x%2?" ":y,""):u:"",this.textOffsetX_=s!==void 0?this.pixelRatio_*s:0,this.textOffsetY_=a!==void 0?this.pixelRatio_*a:0,this.textRotateWithView_=o!==void 0?o:!1,this.textRotation_=l!==void 0?l:0,this.textScale_=[this.pixelRatio_*c[0],this.pixelRatio_*c[1]]}}}const zo=.5;function GB(n,e,t,r,i,s,a,o,l){const c=l?lk(i):i,u=n[0]*zo,f=n[1]*zo,p=ss(u,f);p.imageSmoothingEnabled=!1;const m=p.canvas,y=new eae(p,zo,i,null,a,o,l?qx(ese(),l):null),x=t.length,_=Math.floor((256*256*256-1)/x),E={};for(let k=1;k<=x;++k){const A=t[k-1],P=A.getStyleFunction()||r;if(!P)continue;let z=P(A,s);if(!z)continue;Array.isArray(z)||(z=[z]);const T=(k*_).toString(16).padStart(7,"#00000");for(let R=0,L=z.length;R<L;++R){const D=z[R],V=D.getGeometryFunction()(A);if(!V||!Fi(c,V.getExtent()))continue;const j=D.clone(),oe=j.getFill();oe&&oe.setColor(T);const ye=j.getStroke();ye&&(ye.setColor(T),ye.setLineDash(null)),j.setText(void 0);const ge=D.getImage();if(ge){const ue=ge.getImageSize();if(!ue)continue;const Q=ss(ue[0],ue[1],void 0,{alpha:!1}),O=Q.canvas;Q.fillStyle=T,Q.fillRect(0,0,O.width,O.height),j.setImage(new qc({img:O,anchor:ge.getAnchor(),anchorXUnits:"pixels",anchorYUnits:"pixels",offset:ge.getOrigin(),opacity:1,size:ge.getSize(),scale:ge.getScale(),rotation:ge.getRotation(),rotateWithView:ge.getRotateWithView()}))}const de=j.getZIndex()||0;let he=E[de];he||(he={},E[de]=he,he.Polygon=[],he.Circle=[],he.LineString=[],he.Point=[]);const ie=V.getType();if(ie==="GeometryCollection"){const ue=V.getGeometriesArrayRecursive();for(let Q=0,O=ue.length;Q<O;++Q){const ee=ue[Q];he[ee.getType().replace("Multi","")].push(ee,j)}}else he[ie.replace("Multi","")].push(V,j)}}const S=Object.keys(E).map(Number).sort(Fc);for(let k=0,A=S.length;k<A;++k){const P=E[S[k]];for(const z in P){const I=P[z];for(let T=0,R=I.length;T<R;T+=2){y.setStyle(I[T+1]);for(let L=0,D=e.length;L<D;++L)y.setTransform(e[L]),y.drawGeometry(I[T])}}}return p.getImageData(0,0,m.width,m.height)}function VB(n,e,t){const r=[];if(t){const i=Math.floor(Math.round(n[0])*zo),s=Math.floor(Math.round(n[1])*zo),a=(ai(i,0,t.width-1)+ai(s,0,t.height-1)*t.width)*4,o=t.data[a],l=t.data[a+1],u=t.data[a+2]+256*(l+256*o),f=Math.floor((256*256*256-1)/e.length);u&&u%f===0&&r.push(e[u/f-1])}return r}const tae=.5,BB={Point:cae,LineString:aae,Polygon:dae,MultiPoint:uae,MultiLineString:oae,MultiPolygon:lae,GeometryCollection:sae,Circle:rae};function nae(n,e){return parseInt(Dt(n),10)-parseInt(Dt(e),10)}function ZI(n,e){const t=UB(n,e);return t*t}function UB(n,e){return tae*n/e}function rae(n,e,t,r,i){const s=t.getFill(),a=t.getStroke();if(s||a){const l=n.getBuilder(t.getZIndex(),"Circle");l.setFillStrokeStyle(s,a),l.drawCircle(e,r,i)}const o=t.getText();if(o&&o.getText()){const l=n.getBuilder(t.getZIndex(),"Text");l.setTextStyle(o),l.drawText(e,r)}}function yE(n,e,t,r,i,s,a,o){const l=[],c=t.getImage();if(c){let p=!0;const m=c.getImageState();m==Kt.LOADED||m==Kt.ERROR?p=!1:m==Kt.IDLE&&c.load(),p&&l.push(c.ready())}const u=t.getFill();u&&u.loading()&&l.push(u.ready());const f=l.length>0;return f&&Promise.all(l).then(()=>i(null)),iae(n,e,t,r,s,a,o),f}function iae(n,e,t,r,i,s,a){const o=t.getGeometryFunction()(e);if(!o)return;const l=o.simplifyTransformed(r,i);if(t.getRenderer())$B(n,l,t,e,a);else{const u=BB[l.getType()];u(n,l,t,e,a,s)}}function $B(n,e,t,r,i){if(e.getType()=="GeometryCollection"){const a=e.getGeometries();for(let o=0,l=a.length;o<l;++o)$B(n,a[o],t,r,i);return}n.getBuilder(t.getZIndex(),"Default").drawCustom(e,r,t.getRenderer(),t.getHitDetectionRenderer(),i)}function sae(n,e,t,r,i,s){const a=e.getGeometriesArray();let o,l;for(o=0,l=a.length;o<l;++o){const c=BB[a[o].getType()];c(n,a[o],t,r,i,s)}}function aae(n,e,t,r,i){const s=t.getStroke();if(s){const o=n.getBuilder(t.getZIndex(),"LineString");o.setFillStrokeStyle(null,s),o.drawLineString(e,r,i)}const a=t.getText();if(a&&a.getText()){const o=n.getBuilder(t.getZIndex(),"Text");o.setTextStyle(a),o.drawText(e,r,i)}}function oae(n,e,t,r,i){const s=t.getStroke();if(s){const o=n.getBuilder(t.getZIndex(),"LineString");o.setFillStrokeStyle(null,s),o.drawMultiLineString(e,r,i)}const a=t.getText();if(a&&a.getText()){const o=n.getBuilder(t.getZIndex(),"Text");o.setTextStyle(a),o.drawText(e,r,i)}}function lae(n,e,t,r,i){const s=t.getFill(),a=t.getStroke();if(a||s){const l=n.getBuilder(t.getZIndex(),"Polygon");l.setFillStrokeStyle(s,a),l.drawMultiPolygon(e,r,i)}const o=t.getText();if(o&&o.getText()){const l=n.getBuilder(t.getZIndex(),"Text");l.setTextStyle(o),l.drawText(e,r,i)}}function cae(n,e,t,r,i,s){const a=t.getImage(),o=t.getText(),l=o&&o.getText(),c=s&&a&&l?{}:void 0;if(a){if(a.getImageState()!=Kt.LOADED)return;const u=n.getBuilder(t.getZIndex(),"Image");u.setImageStyle(a,c),u.drawPoint(e,r,i)}if(l){const u=n.getBuilder(t.getZIndex(),"Text");u.setTextStyle(o,c),u.drawText(e,r,i)}}function uae(n,e,t,r,i,s){const a=t.getImage(),o=a&&a.getOpacity()!==0,l=t.getText(),c=l&&l.getText(),u=s&&o&&c?{}:void 0;if(o){if(a.getImageState()!=Kt.LOADED)return;const f=n.getBuilder(t.getZIndex(),"Image");f.setImageStyle(a,u),f.drawMultiPoint(e,r,i)}if(c){const f=n.getBuilder(t.getZIndex(),"Text");f.setTextStyle(l,u),f.drawText(e,r,i)}}function dae(n,e,t,r,i){const s=t.getFill(),a=t.getStroke();if(s||a){const l=n.getBuilder(t.getZIndex(),"Polygon");l.setFillStrokeStyle(s,a),l.drawPolygon(e,r,i)}const o=t.getText();if(o&&o.getText()){const l=n.getBuilder(t.getZIndex(),"Text");l.setTextStyle(o),l.drawText(e,r,i)}}class qv extends Zo{constructor(e,t,r,i){super(e),this.inversePixelTransform=t,this.frameState=r,this.context=i}}const hae=5;class WB extends Wx{constructor(e){super(),this.ready=!0,this.boundHandleImageChange_=this.handleImageChange_.bind(this),this.layer_=e,this.staleKeys_=new Array,this.maxStaleKeys=hae}getStaleKeys(){return this.staleKeys_}prependStaleKey(e){this.staleKeys_.unshift(e),this.staleKeys_.length>this.maxStaleKeys&&(this.staleKeys_.length=this.maxStaleKeys)}getFeatures(e){return jn()}getData(e){return null}prepareFrame(e){return jn()}renderFrame(e,t){return jn()}forEachFeatureAtCoordinate(e,t,r,i,s){}getLayer(){return this.layer_}handleFontsChanged(){}handleImageChange_(e){const t=e.target;(t.getState()===Kt.LOADED||t.getState()===Kt.ERROR)&&this.renderIfReadyAndVisible()}loadImage(e){let t=e.getState();return t!=Kt.LOADED&&t!=Kt.ERROR&&e.addEventListener(In.CHANGE,this.boundHandleImageChange_),t==Kt.IDLE&&(e.load(),t=e.getState()),t==Kt.LOADED}renderIfReadyAndVisible(){const e=this.getLayer();e&&e.getVisible()&&e.getSourceState()==="ready"&&e.changed()}renderDeferred(e){}disposeInternal(){delete this.layer_,super.disposeInternal()}}const UD=[];let Qp=null;function fae(){Qp=ss(1,1,void 0,{willReadFrequently:!0})}class $N extends WB{constructor(e){super(e),this.container=null,this.renderedResolution,this.tempTransform=ms(),this.pixelTransform=ms(),this.inversePixelTransform=ms(),this.context=null,this.deferredContext_=null,this.containerReused=!1,this.frameState=null}getImageData(e,t,r){Qp||fae(),Qp.clearRect(0,0,1,1);let i;try{Qp.drawImage(e,t,r,1,1,0,0,1,1),i=Qp.getImageData(0,0,1,1).data}catch{return Qp=null,null}return i}getBackground(e){let r=this.getLayer().getBackground();return typeof r=="function"&&(r=r(e.viewState.resolution)),r||void 0}useContainer(e,t,r){const i=this.getLayer().getClassName();let s,a;if(e&&e.className===i&&(!r||e&&e.style.backgroundColor&&tu(El(e.style.backgroundColor),El(r)))){const o=e.firstElementChild;Xd(o)&&(a=o.getContext("2d"))}if(a&&sse(a.canvas.style.transform,t)?(this.container=e,this.context=a,this.containerReused=!0):this.containerReused?(this.container=null,this.context=null,this.containerReused=!1):this.container&&(this.container.style.backgroundColor=null),!this.container){s=Ua?TB():document.createElement("div"),s.className=i;let o=s.style;o.position="absolute",o.width="100%",o.height="100%",a=ss();const l=a.canvas;s.appendChild(l),o=l.style,o.position="absolute",o.left="0",o.transformOrigin="top left",this.container=s,this.context=a}!this.containerReused&&r&&!this.container.style.backgroundColor&&(this.container.style.backgroundColor=r)}clipUnrotated(e,t,r){const i=Zu(r),s=sk(r),a=ik(r),o=rk(r);ji(t.coordinateToPixelTransform,i),ji(t.coordinateToPixelTransform,s),ji(t.coordinateToPixelTransform,a),ji(t.coordinateToPixelTransform,o);const l=this.inversePixelTransform;ji(l,i),ji(l,s),ji(l,a),ji(l,o),e.save(),e.beginPath(),e.moveTo(Math.round(i[0]),Math.round(i[1])),e.lineTo(Math.round(s[0]),Math.round(s[1])),e.lineTo(Math.round(a[0]),Math.round(a[1])),e.lineTo(Math.round(o[0]),Math.round(o[1])),e.clip()}prepareContainer(e,t){const r=e.extent,i=e.viewState.resolution,s=e.viewState.rotation,a=e.pixelRatio,o=Math.round(fr(r)/i*a),l=Math.round(ps(r)/i*a);bl(this.pixelTransform,e.size[0]/2,e.size[1]/2,1/a,1/a,s,-o/2,-l/2),F1(this.inversePixelTransform,this.pixelTransform);const c=ise(this.pixelTransform);if(this.useContainer(t,c,this.getBackground(e)),!this.containerReused){const u=this.context.canvas;u.width!=o||u.height!=l?(u.width=o,u.height=l):this.context.clearRect(0,0,o,l),c!==u.style.transform&&(u.style.transform=c)}}dispatchRenderEvent_(e,t,r){const i=this.getLayer();if(i.hasListener(e)){const s=new qv(e,this.inversePixelTransform,r,t);i.dispatchEvent(s)}}preRender(e,t){this.frameState=t,!t.declutter&&this.dispatchRenderEvent_(Us.PRERENDER,e,t)}postRender(e,t){t.declutter||this.dispatchRenderEvent_(Us.POSTRENDER,e,t)}renderDeferredInternal(e){}getRenderContext(e){return e.declutter&&!this.deferredContext_&&(this.deferredContext_=new BN),e.declutter?this.deferredContext_.getContext():this.context}renderDeferred(e){e.declutter&&(this.dispatchRenderEvent_(Us.PRERENDER,this.context,e),e.declutter&&this.deferredContext_&&(this.deferredContext_.draw(this.context),this.deferredContext_.clear()),this.renderDeferredInternal(e),this.dispatchRenderEvent_(Us.POSTRENDER,this.context,e))}getRenderTransform(e,t,r,i,s,a,o){const l=s/2,c=a/2,u=i/t,f=-u,p=-e[0]+o,m=-e[1];return bl(this.tempTransform,l,c,u,f,-r,p,m)}disposeInternal(){delete this.frameState,super.disposeInternal()}}class gae extends $N{constructor(e){super(e),this.boundHandleStyleImageChange_=this.handleStyleImageChange_.bind(this),this.animatingOrInteracting_,this.hitDetectionImageData_=null,this.clipped_=!1,this.renderedFeatures_=null,this.renderedRevision_=-1,this.renderedResolution_=NaN,this.renderedExtent_=Ka(),this.wrappedRenderedExtent_=Ka(),this.renderedRotation_,this.renderedCenter_=null,this.renderedProjection_=null,this.renderedPixelRatio_=1,this.renderedRenderOrder_=null,this.renderedFrameDeclutter_,this.replayGroup_=null,this.replayGroupChanged=!0,this.clipping=!0,this.targetContext_=null,this.opacity_=1}renderWorlds(e,t,r){const i=t.extent,s=t.viewState,a=s.center,o=s.resolution,l=s.projection,c=s.rotation,u=l.getExtent(),f=this.getLayer().getSource(),p=this.getLayer().getDeclutter(),m=t.pixelRatio,y=t.viewHints,x=!(y[ui.ANIMATING]||y[ui.INTERACTING]),_=this.context,E=Math.round(fr(i)/o*m),S=Math.round(ps(i)/o*m),k=f.getWrapX()&&l.canWrapX(),A=k?fr(u):null,P=k?Math.ceil((i[2]-u[2])/A)+1:1;let z=k?Math.floor((i[0]-u[0])/A):0;do{let I=this.getRenderTransform(a,o,0,m,E,S,z*A);t.declutter&&(I=I.slice(0)),e.execute(_,[_.canvas.width,_.canvas.height],I,c,x,r===void 0?jf:r?mE:Xse,r?p&&t.declutter[p]:void 0)}while(++z<P)}setDrawContext_(){this.opacity_!==1&&(this.targetContext_=this.context,this.context=ss(this.context.canvas.width,this.context.canvas.height,UD))}resetDrawContext_(){if(this.opacity_!==1&&this.targetContext_){const e=this.targetContext_.globalAlpha;this.targetContext_.globalAlpha=this.opacity_,this.targetContext_.drawImage(this.context.canvas,0,0),this.targetContext_.globalAlpha=e,Yx(this.context),UD.push(this.context.canvas),this.context=this.targetContext_,this.targetContext_=null}}renderDeclutter(e){!this.replayGroup_||!this.getLayer().getDeclutter()||this.renderWorlds(this.replayGroup_,e,!0)}renderDeferredInternal(e){this.replayGroup_&&(this.replayGroup_.renderDeferred(),this.clipped_&&this.context.restore(),this.resetDrawContext_())}renderFrame(e,t){const r=e.layerStatesArray[e.layerIndex];this.opacity_=r.opacity;const i=e.viewState;this.prepareContainer(e,t);const s=this.context,a=this.replayGroup_;let o=a&&!a.isEmpty();if(!o&&!(this.getLayer().hasListener(Us.PRERENDER)||this.getLayer().hasListener(Us.POSTRENDER)))return this.container;if(this.setDrawContext_(),this.preRender(s,e),i.projection,this.clipped_=!1,o&&r.extent&&this.clipping){const l=Hl(r.extent);o=Fi(l,e.extent),this.clipped_=o&&!Ic(l,e.extent),this.clipped_&&this.clipUnrotated(s,e,l)}return o&&this.renderWorlds(a,e,this.getLayer().getDeclutter()?!1:void 0),!e.declutter&&this.clipped_&&s.restore(),this.postRender(s,e),this.renderedRotation_!==i.rotation&&(this.renderedRotation_=i.rotation,this.hitDetectionImageData_=null),e.declutter||this.resetDrawContext_(),this.container}getFeatures(e){return new Promise(t=>{if(this.frameState&&!this.hitDetectionImageData_&&!this.animatingOrInteracting_){const r=this.frameState.size.slice(),i=this.renderedCenter_,s=this.renderedResolution_,a=this.renderedRotation_,o=this.renderedProjection_,l=this.wrappedRenderedExtent_,c=this.getLayer(),u=[],f=r[0]*zo,p=r[1]*zo;u.push(this.getRenderTransform(i,s,a,zo,f,p,0).slice());const m=c.getSource(),y=o.getExtent();if(m.getWrapX()&&o.canWrapX()&&!Ic(y,l)){let x=l[0];const _=fr(y);let E=0,S;for(;x<y[0];)--E,S=_*E,u.push(this.getRenderTransform(i,s,a,zo,f,p,S).slice()),x+=_;for(E=0,x=l[2];x>y[2];)++E,S=_*E,u.push(this.getRenderTransform(i,s,a,zo,f,p,S).slice()),x-=_}this.hitDetectionImageData_=GB(r,u,this.renderedFeatures_,c.getStyleFunction(),l,s,a,ZI(s,this.renderedPixelRatio_),null)}t(VB(e,this.renderedFeatures_,this.hitDetectionImageData_))})}forEachFeatureAtCoordinate(e,t,r,i,s){if(!this.replayGroup_)return;const a=t.viewState.resolution,o=t.viewState.rotation,l=this.getLayer(),c={},u=function(p,m,y){const x=Dt(p),_=c[x];if(_){if(_!==!0&&y<_.distanceSq){if(y===0)return c[x]=!0,s.splice(s.lastIndexOf(_),1),i(p,l,m);_.geometry=m,_.distanceSq=y}}else{if(y===0)return c[x]=!0,i(p,l,m);s.push(c[x]={feature:p,layer:l,geometry:m,distanceSq:y,callback:i})}},f=this.getLayer().getDeclutter();return this.replayGroup_.forEachFeatureAtCoordinate(e,a,o,r,u,f?t.declutter?.[f]?.all().map(p=>p.value):null)}handleFontsChanged(){const e=this.getLayer();e.getVisible()&&this.replayGroup_&&e.changed()}handleStyleImageChange_(e){this.renderIfReadyAndVisible()}prepareFrame(e){const t=this.getLayer(),r=t.getSource();if(!r)return!1;const i=e.viewHints[ui.ANIMATING],s=e.viewHints[ui.INTERACTING],a=t.getUpdateWhileAnimating(),o=t.getUpdateWhileInteracting();if(this.ready&&!a&&i||!o&&s)return this.animatingOrInteracting_=!0,!0;this.animatingOrInteracting_=!1;const l=e.extent,c=e.viewState,u=c.projection,f=c.resolution,p=e.pixelRatio,m=t.getRevision(),y=t.getRenderBuffer();let x=t.getRenderOrder();x===void 0&&(x=nae);const _=c.center.slice(),E=Ra(l,y*f),S=E.slice(),k=[E.slice()],A=u.getExtent();if(r.getWrapX()&&u.canWrapX()&&!Ic(A,e.extent)){const oe=fr(A),ye=Math.max(fr(E)/2,oe);E[0]=A[0]-ye,E[2]=A[2]+ye,AN(_,u);const ge=sB(k[0],u);ge[0]<A[0]&&ge[2]<A[2]?k.push([ge[0]+oe,ge[1],ge[2]+oe,ge[3]]):ge[0]>A[0]&&ge[2]>A[2]&&k.push([ge[0]-oe,ge[1],ge[2]-oe,ge[3]])}if(this.ready&&this.renderedResolution_==f&&this.renderedRevision_==m&&this.renderedRenderOrder_==x&&this.renderedFrameDeclutter_===!!e.declutter&&Ic(this.wrappedRenderedExtent_,E))return tu(this.renderedExtent_,S)||(this.hitDetectionImageData_=null,this.renderedExtent_=S),this.renderedCenter_=_,this.replayGroupChanged=!1,!0;this.replayGroup_=null;const P=new DB(UB(f,p),E,f,p);let z;for(let oe=0,ye=k.length;oe<ye;++oe)r.loadFeatures(k[oe],f,u);const I=ZI(f,p);let T=!0;const R=(oe,ye)=>{let ge;const de=oe.getStyleFunction()||t.getStyleFunction();if(de&&(ge=de(oe,f)),ge){const he=this.renderFeature(oe,I,ge,P,z,this.getLayer().getDeclutter(),ye);T=T&&!he}},L=lk(E),D=r.getFeaturesInExtent(L);x&&D.sort(x);for(let oe=0,ye=D.length;oe<ye;++oe)R(D[oe],oe);this.renderedFeatures_=D,this.ready=T;const V=P.finish(),j=new OB(E,f,p,r.getOverlaps(),V,t.getRenderBuffer(),!!e.declutter);return this.renderedResolution_=f,this.renderedRevision_=m,this.renderedRenderOrder_=x,this.renderedFrameDeclutter_=!!e.declutter,this.renderedExtent_=S,this.wrappedRenderedExtent_=E,this.renderedCenter_=_,this.renderedProjection_=u,this.renderedPixelRatio_=p,this.replayGroup_=j,this.hitDetectionImageData_=null,this.replayGroupChanged=!0,!0}renderFeature(e,t,r,i,s,a,o){if(!r)return!1;let l=!1;if(Array.isArray(r))for(let c=0,u=r.length;c<u;++c)l=yE(i,e,r[c],t,this.boundHandleStyleImageChange_,s,a,o)||l;else l=yE(i,e,r,t,this.boundHandleStyleImageChange_,s,a,o);return l}}function HB(n,e,t=0,r=n.length-1,i=pae){for(;r>t;){if(r-t>600){const l=r-t+1,c=e-t+1,u=Math.log(l),f=.5*Math.exp(2*u/3),p=.5*Math.sqrt(u*f*(l-f)/l)*(c-l/2<0?-1:1),m=Math.max(t,Math.floor(e-c*f/l+p)),y=Math.min(r,Math.floor(e+(l-c)*f/l+p));HB(n,e,m,y,i)}const s=n[e];let a=t,o=r;for(nv(n,t,e),i(n[r],s)>0&&nv(n,t,r);a<o;){for(nv(n,a,o),a++,o--;i(n[a],s)<0;)a++;for(;i(n[o],s)>0;)o--}i(n[t],s)===0?nv(n,t,o):(o++,nv(n,o,r)),o<=e&&(t=o+1),e<=o&&(r=o-1)}}function nv(n,e,t){const r=n[e];n[e]=n[t],n[t]=r}function pae(n,e){return n<e?-1:n>e?1:0}let KB=class{constructor(e=9){this._maxEntries=Math.max(4,e),this._minEntries=Math.max(2,Math.ceil(this._maxEntries*.4)),this.clear()}all(){return this._all(this.data,[])}search(e){let t=this.data;const r=[];if(!lb(e,t))return r;const i=this.toBBox,s=[];for(;t;){for(let a=0;a<t.children.length;a++){const o=t.children[a],l=t.leaf?i(o):o;lb(e,l)&&(t.leaf?r.push(o):TA(e,l)?this._all(o,r):s.push(o))}t=s.pop()}return r}collides(e){let t=this.data;if(!lb(e,t))return!1;const r=[];for(;t;){for(let i=0;i<t.children.length;i++){const s=t.children[i],a=t.leaf?this.toBBox(s):s;if(lb(e,a)){if(t.leaf||TA(e,a))return!0;r.push(s)}}t=r.pop()}return!1}load(e){if(!(e&&e.length))return this;if(e.length<this._minEntries){for(let r=0;r<e.length;r++)this.insert(e[r]);return this}let t=this._build(e.slice(),0,e.length-1,0);if(!this.data.children.length)this.data=t;else if(this.data.height===t.height)this._splitRoot(this.data,t);else{if(this.data.height<t.height){const r=this.data;this.data=t,t=r}this._insert(t,this.data.height-t.height-1,!0)}return this}insert(e){return e&&this._insert(e,this.data.height-1),this}clear(){return this.data=em([]),this}remove(e,t){if(!e)return this;let r=this.data;const i=this.toBBox(e),s=[],a=[];let o,l,c;for(;r||s.length;){if(r||(r=s.pop(),l=s[s.length-1],o=a.pop(),c=!0),r.leaf){const u=mae(e,r.children,t);if(u!==-1)return r.children.splice(u,1),s.push(r),this._condense(s),this}!c&&!r.leaf&&TA(r,i)?(s.push(r),a.push(o),o=0,l=r,r=r.children[0]):l?(o++,r=l.children[o],c=!1):r=null}return this}toBBox(e){return e}compareMinX(e,t){return e.minX-t.minX}compareMinY(e,t){return e.minY-t.minY}toJSON(){return this.data}fromJSON(e){return this.data=e,this}_all(e,t){const r=[];for(;e;)e.leaf?t.push(...e.children):r.push(...e.children),e=r.pop();return t}_build(e,t,r,i){const s=r-t+1;let a=this._maxEntries,o;if(s<=a)return o=em(e.slice(t,r+1)),Mp(o,this.toBBox),o;i||(i=Math.ceil(Math.log(s)/Math.log(a)),a=Math.ceil(s/Math.pow(a,i-1))),o=em([]),o.leaf=!1,o.height=i;const l=Math.ceil(s/a),c=l*Math.ceil(Math.sqrt(a));$D(e,t,r,c,this.compareMinX);for(let u=t;u<=r;u+=c){const f=Math.min(u+c-1,r);$D(e,u,f,l,this.compareMinY);for(let p=u;p<=f;p+=l){const m=Math.min(p+l-1,f);o.children.push(this._build(e,p,m,i-1))}}return Mp(o,this.toBBox),o}_chooseSubtree(e,t,r,i){for(;i.push(t),!(t.leaf||i.length-1===r);){let s=1/0,a=1/0,o;for(let l=0;l<t.children.length;l++){const c=t.children[l],u=kA(c),f=xae(e,c)-u;f<a?(a=f,s=u<s?u:s,o=c):f===a&&u<s&&(s=u,o=c)}t=o||t.children[0]}return t}_insert(e,t,r){const i=r?e:this.toBBox(e),s=[],a=this._chooseSubtree(i,this.data,t,s);for(a.children.push(e),Sv(a,i);t>=0&&s[t].children.length>this._maxEntries;)this._split(s,t),t--;this._adjustParentBBoxes(i,s,t)}_split(e,t){const r=e[t],i=r.children.length,s=this._minEntries;this._chooseSplitAxis(r,s,i);const a=this._chooseSplitIndex(r,s,i),o=em(r.children.splice(a,r.children.length-a));o.height=r.height,o.leaf=r.leaf,Mp(r,this.toBBox),Mp(o,this.toBBox),t?e[t-1].children.push(o):this._splitRoot(r,o)}_splitRoot(e,t){this.data=em([e,t]),this.data.height=e.height+1,this.data.leaf=!1,Mp(this.data,this.toBBox)}_chooseSplitIndex(e,t,r){let i,s=1/0,a=1/0;for(let o=t;o<=r-t;o++){const l=Ev(e,0,o,this.toBBox),c=Ev(e,o,r,this.toBBox),u=_ae(l,c),f=kA(l)+kA(c);u<s?(s=u,i=o,a=f<a?f:a):u===s&&f<a&&(a=f,i=o)}return i||r-t}_chooseSplitAxis(e,t,r){const i=e.leaf?this.compareMinX:yae,s=e.leaf?this.compareMinY:vae,a=this._allDistMargin(e,t,r,i),o=this._allDistMargin(e,t,r,s);a<o&&e.children.sort(i)}_allDistMargin(e,t,r,i){e.children.sort(i);const s=this.toBBox,a=Ev(e,0,t,s),o=Ev(e,r-t,r,s);let l=ob(a)+ob(o);for(let c=t;c<r-t;c++){const u=e.children[c];Sv(a,e.leaf?s(u):u),l+=ob(a)}for(let c=r-t-1;c>=t;c--){const u=e.children[c];Sv(o,e.leaf?s(u):u),l+=ob(o)}return l}_adjustParentBBoxes(e,t,r){for(let i=r;i>=0;i--)Sv(t[i],e)}_condense(e){for(let t=e.length-1,r;t>=0;t--)e[t].children.length===0?t>0?(r=e[t-1].children,r.splice(r.indexOf(e[t]),1)):this.clear():Mp(e[t],this.toBBox)}};function mae(n,e,t){if(!t)return e.indexOf(n);for(let r=0;r<e.length;r++)if(t(n,e[r]))return r;return-1}function Mp(n,e){Ev(n,0,n.children.length,e,n)}function Ev(n,e,t,r,i){i||(i=em(null)),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(let s=e;s<t;s++){const a=n.children[s];Sv(i,n.leaf?r(a):a)}return i}function Sv(n,e){return n.minX=Math.min(n.minX,e.minX),n.minY=Math.min(n.minY,e.minY),n.maxX=Math.max(n.maxX,e.maxX),n.maxY=Math.max(n.maxY,e.maxY),n}function yae(n,e){return n.minX-e.minX}function vae(n,e){return n.minY-e.minY}function kA(n){return(n.maxX-n.minX)*(n.maxY-n.minY)}function ob(n){return n.maxX-n.minX+(n.maxY-n.minY)}function xae(n,e){return(Math.max(e.maxX,n.maxX)-Math.min(e.minX,n.minX))*(Math.max(e.maxY,n.maxY)-Math.min(e.minY,n.minY))}function _ae(n,e){const t=Math.max(n.minX,e.minX),r=Math.max(n.minY,e.minY),i=Math.min(n.maxX,e.maxX),s=Math.min(n.maxY,e.maxY);return Math.max(0,i-t)*Math.max(0,s-r)}function TA(n,e){return n.minX<=e.minX&&n.minY<=e.minY&&e.maxX<=n.maxX&&e.maxY<=n.maxY}function lb(n,e){return e.minX<=n.maxX&&e.minY<=n.maxY&&e.maxX>=n.minX&&e.maxY>=n.minY}function em(n){return{children:n,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function $D(n,e,t,r,i){const s=[e,t];for(;s.length;){if(t=s.pop(),e=s.pop(),t-e<=r)continue;const a=e+Math.ceil((t-e)/r/2)*r;HB(n,a,e,t,i),s.push(e,a,a,t)}}let Ug=0;const fs=1<<Ug++,Yt=1<<Ug++,Is=1<<Ug++,Ci=1<<Ug++,yo=1<<Ug++,ml=1<<Ug++,cb=Math.pow(2,Ug)-1,WN={[fs]:"boolean",[Yt]:"number",[Is]:"string",[Ci]:"color",[yo]:"number[]",[ml]:"size"},wae=Object.keys(WN).map(Number).sort(Fc);function bae(n){return n in WN}function pm(n){const e=[];for(const t of wae)kv(n,t)&&e.push(WN[t]);return e.length===0?"untyped":e.length<3?e.join(" or "):e.slice(0,-1).join(", ")+", or "+e[e.length-1]}function kv(n,e){return(n&e)===e}function wc(n,e){return n===e}class Cs{constructor(e,t){if(!bae(e))throw new Error(`literal expressions must have a specific type, got ${pm(e)}`);this.type=e,this.value=t}}class qB{constructor(e,t,...r){this.type=e,this.operator=t,this.args=r}}function HN(){return{variables:new Set,properties:new Set,featureId:!1,geometryType:!1,mapState:!1}}function Ws(n,e,t){switch(typeof n){case"boolean":{if(wc(e,Is))return new Cs(Is,n?"true":"false");if(!kv(e,fs))throw new Error(`got a boolean, but expected ${pm(e)}`);return new Cs(fs,n)}case"number":{if(wc(e,ml))return new Cs(ml,ha(n));if(wc(e,fs))return new Cs(fs,!!n);if(wc(e,Is))return new Cs(Is,n.toString());if(!kv(e,Yt))throw new Error(`got a number, but expected ${pm(e)}`);return new Cs(Yt,n)}case"string":{if(wc(e,Ci))return new Cs(Ci,dk(n));if(wc(e,fs))return new Cs(fs,!!n);if(!kv(e,Is))throw new Error(`got a string, but expected ${pm(e)}`);return new Cs(Is,n)}}if(!Array.isArray(n))throw new Error("expression must be an array or a primitive value");if(n.length===0)throw new Error("empty expression");if(typeof n[0]=="string")return Mae(n,e,t);for(const r of n)if(typeof r!="number")throw new Error("expected an array of numbers");if(wc(e,ml)){if(n.length!==2)throw new Error(`expected an array of two values for a size, got ${n.length}`);return new Cs(ml,n)}if(wc(e,Ci)){if(n.length===3)return new Cs(Ci,[...n,1]);if(n.length===4)return new Cs(Ci,n);throw new Error(`expected an array of 3 or 4 values for a color, got ${n.length}`)}if(!kv(e,yo))throw new Error(`got an array of numbers, but expected ${pm(e)}`);return new Cs(yo,n)}const Re={Get:"get",Var:"var",Concat:"concat",GeometryType:"geometry-type",LineMetric:"line-metric",Any:"any",All:"all",Not:"!",Resolution:"resolution",Zoom:"zoom",Time:"time",Equal:"==",NotEqual:"!=",GreaterThan:">",GreaterThanOrEqualTo:">=",LessThan:"<",LessThanOrEqualTo:"<=",Multiply:"*",Divide:"/",Add:"+",Subtract:"-",Clamp:"clamp",Mod:"%",Pow:"^",Abs:"abs",Floor:"floor",Ceil:"ceil",Round:"round",Sin:"sin",Cos:"cos",Atan:"atan",Sqrt:"sqrt",Match:"match",Between:"between",Interpolate:"interpolate",Coalesce:"coalesce",Case:"case",In:"in",Number:"number",String:"string",Array:"array",Color:"color",Id:"id",Band:"band",Palette:"palette",ToString:"to-string",Has:"has"},Eae={[Re.Get]:Dn(er(1,1/0),WD),[Re.Var]:Dn(er(1,1),Sae),[Re.Has]:Dn(er(1,1/0),WD),[Re.Id]:Dn(kae,Lp),[Re.Concat]:Dn(er(2,1/0),Or(Is)),[Re.GeometryType]:Dn(Tae,Lp),[Re.LineMetric]:Dn(Lp),[Re.Resolution]:Dn(CA,Lp),[Re.Zoom]:Dn(CA,Lp),[Re.Time]:Dn(CA,Lp),[Re.Any]:Dn(er(2,1/0),Or(fs)),[Re.All]:Dn(er(2,1/0),Or(fs)),[Re.Not]:Dn(er(1,1),Or(fs)),[Re.Equal]:Dn(er(2,2),Or(cb)),[Re.NotEqual]:Dn(er(2,2),Or(cb)),[Re.GreaterThan]:Dn(er(2,2),Or(Yt)),[Re.GreaterThanOrEqualTo]:Dn(er(2,2),Or(Yt)),[Re.LessThan]:Dn(er(2,2),Or(Yt)),[Re.LessThanOrEqualTo]:Dn(er(2,2),Or(Yt)),[Re.Multiply]:Dn(er(2,1/0),HD),[Re.Coalesce]:Dn(er(2,1/0),HD),[Re.Divide]:Dn(er(2,2),Or(Yt)),[Re.Add]:Dn(er(2,1/0),Or(Yt)),[Re.Subtract]:Dn(er(2,2),Or(Yt)),[Re.Clamp]:Dn(er(3,3),Or(Yt)),[Re.Mod]:Dn(er(2,2),Or(Yt)),[Re.Pow]:Dn(er(2,2),Or(Yt)),[Re.Abs]:Dn(er(1,1),Or(Yt)),[Re.Floor]:Dn(er(1,1),Or(Yt)),[Re.Ceil]:Dn(er(1,1),Or(Yt)),[Re.Round]:Dn(er(1,1),Or(Yt)),[Re.Sin]:Dn(er(1,1),Or(Yt)),[Re.Cos]:Dn(er(1,1),Or(Yt)),[Re.Atan]:Dn(er(1,2),Or(Yt)),[Re.Sqrt]:Dn(er(1,1),Or(Yt)),[Re.Match]:Dn(er(4,1/0),KD,Aae),[Re.Between]:Dn(er(3,3),Or(Yt)),[Re.Interpolate]:Dn(er(6,1/0),KD,Iae),[Re.Case]:Dn(er(3,1/0),Cae,Rae),[Re.In]:Dn(er(2,2),Pae),[Re.Number]:Dn(er(1,1/0),Or(cb)),[Re.String]:Dn(er(1,1/0),Or(cb)),[Re.Array]:Dn(er(1,1/0),Or(Yt)),[Re.Color]:Dn(er(1,4),Or(Yt)),[Re.Band]:Dn(er(1,3),Or(Yt)),[Re.Palette]:Dn(er(2,2),Nae),[Re.ToString]:Dn(er(1,1),Or(fs|Yt|Is|Ci))};function WD(n,e,t){const r=n.length-1,i=new Array(r);for(let s=0;s<r;++s){const a=n[s+1];switch(typeof a){case"number":{i[s]=new Cs(Yt,a);break}case"string":{i[s]=new Cs(Is,a);break}default:throw new Error(`expected a string key or numeric array index for a get operation, got ${a}`)}s===0&&t.properties.add(String(a))}return i}function Sae(n,e,t){const r=n[1];if(typeof r!="string")throw new Error("expected a string argument for var operation");return t.variables.add(r),[new Cs(Is,r)]}function kae(n,e,t){t.featureId=!0}function Tae(n,e,t){t.geometryType=!0}function CA(n,e,t){t.mapState=!0}function Lp(n,e,t){const r=n[0];if(n.length!==1)throw new Error(`expected no arguments for ${r} operation`);return[]}function er(n,e){return function(t,r,i){const s=t[0],a=t.length-1;if(n===e){if(a!==n){const o=n===1?"":"s";throw new Error(`expected ${n} argument${o} for ${s}, got ${a}`)}}else if(a<n||a>e){const o=e===1/0?`${n} or more`:`${n} to ${e}`;throw new Error(`expected ${o} arguments for ${s}, got ${a}`)}}}function HD(n,e,t){const r=n.length-1,i=new Array(r);for(let s=0;s<r;++s){const a=Ws(n[s+1],e,t);i[s]=a}return i}function Or(n){return function(e,t,r){const i=e.length-1,s=new Array(i);for(let a=0;a<i;++a){const o=Ws(e[a+1],n,r);s[a]=o}return s}}function Cae(n,e,t){const r=n[0],i=n.length-1;if(i%2===0)throw new Error(`expected an odd number of arguments for ${r}, got ${i} instead`)}function KD(n,e,t){const r=n[0],i=n.length-1;if(i%2===1)throw new Error(`expected an even number of arguments for operation ${r}, got ${i} instead`)}function Aae(n,e,t){const r=n.length-1,i=Is|Yt|fs,s=Ws(n[1],i,t),a=Ws(n[n.length-1],e,t),o=new Array(r-2);for(let l=0;l<r-2;l+=2){try{const c=Ws(n[l+2],s.type,t);o[l]=c}catch(c){throw new Error(`failed to parse argument ${l+1} of match expression: ${c.message}`)}try{const c=Ws(n[l+3],a.type,t);o[l+1]=c}catch(c){throw new Error(`failed to parse argument ${l+2} of match expression: ${c.message}`)}}return[s,...o,a]}function Iae(n,e,t){const r=n[1];let i;switch(r[0]){case"linear":i=1;break;case"exponential":const l=r[1];if(typeof l!="number"||l<=0)throw new Error(`expected a number base for exponential interpolation, got ${JSON.stringify(l)} instead`);i=l;break;default:throw new Error(`invalid interpolation type: ${JSON.stringify(r)}`)}const s=new Cs(Yt,i);let a;try{a=Ws(n[2],Yt,t)}catch(l){throw new Error(`failed to parse argument 1 in interpolate expression: ${l.message}`)}const o=new Array(n.length-3);for(let l=0;l<o.length;l+=2){try{const c=Ws(n[l+3],Yt,t);o[l]=c}catch(c){throw new Error(`failed to parse argument ${l+2} for interpolate expression: ${c.message}`)}try{const c=Ws(n[l+4],e,t);o[l+1]=c}catch(c){throw new Error(`failed to parse argument ${l+3} for interpolate expression: ${c.message}`)}}return[s,a,...o]}function Rae(n,e,t){const r=Ws(n[n.length-1],e,t),i=new Array(n.length-1);for(let s=0;s<i.length-1;s+=2){try{const a=Ws(n[s+1],fs,t);i[s]=a}catch(a){throw new Error(`failed to parse argument ${s} of case expression: ${a.message}`)}try{const a=Ws(n[s+2],r.type,t);i[s+1]=a}catch(a){throw new Error(`failed to parse argument ${s+1} of case expression: ${a.message}`)}}return i[i.length-1]=r,i}function Pae(n,e,t){let r=n[2];if(!Array.isArray(r))throw new Error('the second argument for the "in" operator must be an array');let i;if(typeof r[0]=="string"){if(r[0]!=="literal")throw new Error('for the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions');if(!Array.isArray(r[1]))throw new Error('failed to parse "in" expression: the literal operator must be followed by an array');r=r[1],i=Is}else i=Yt;const s=new Array(r.length);for(let o=0;o<s.length;o++)try{const l=Ws(r[o],i,t);s[o]=l}catch(l){throw new Error(`failed to parse haystack item ${o} for "in" expression: ${l.message}`)}return[Ws(n[1],i,t),...s]}function Nae(n,e,t){let r;try{r=Ws(n[1],Yt,t)}catch(a){throw new Error(`failed to parse first argument in palette expression: ${a.message}`)}const i=n[2];if(!Array.isArray(i))throw new Error("the second argument of palette must be an array");const s=new Array(i.length);for(let a=0;a<s.length;a++){let o;try{o=Ws(i[a],Ci,t)}catch(l){throw new Error(`failed to parse color at index ${a} in palette expression: ${l.message}`)}if(!(o instanceof Cs))throw new Error(`the palette color at index ${a} must be a literal value`);s[a]=o}return[r,...s]}function Dn(...n){return function(e,t,r){const i=e[0];let s;for(let a=0;a<n.length;a++){const o=n[a](e,t,r);if(a==n.length-1){if(!o)throw new Error("expected last argument validator to return the parsed args");s=o}}return new qB(t,i,...s)}}function Mae(n,e,t){const r=n[0],i=Eae[r];if(!i)throw new Error(`unknown operator: ${r}`);return i(n,e,t)}function KN(n){if(!n)return"";const e=n.getType();switch(e){case"Point":case"LineString":case"Polygon":return e;case"MultiPoint":case"MultiLineString":case"MultiPolygon":return e.substring(5);case"Circle":return"Polygon";case"GeometryCollection":return KN(n.getGeometries()[0]);default:return""}}function XB(){return{variables:{},properties:{},resolution:NaN,featureId:null,geometryType:""}}function Ju(n,e,t){const r=Ws(n,e,t);return ic(r)}function ic(n,e){if(n instanceof Cs){if(n.type===Ci&&typeof n.value=="string"){const r=dk(n.value);return function(){return r}}return function(){return n.value}}const t=n.operator;switch(t){case Re.Number:case Re.String:case Re.Coalesce:return Lae(n);case Re.Get:case Re.Var:case Re.Has:return jae(n);case Re.Id:return r=>r.featureId;case Re.GeometryType:return r=>r.geometryType;case Re.Concat:{const r=n.args.map(i=>ic(i));return i=>"".concat(...r.map(s=>s(i).toString()))}case Re.Resolution:return r=>r.resolution;case Re.Any:case Re.All:case Re.Between:case Re.In:case Re.Not:return Dae(n);case Re.Equal:case Re.NotEqual:case Re.LessThan:case Re.LessThanOrEqualTo:case Re.GreaterThan:case Re.GreaterThanOrEqualTo:return Fae(n);case Re.Multiply:case Re.Divide:case Re.Add:case Re.Subtract:case Re.Clamp:case Re.Mod:case Re.Pow:case Re.Abs:case Re.Floor:case Re.Ceil:case Re.Round:case Re.Sin:case Re.Cos:case Re.Atan:case Re.Sqrt:return Oae(n);case Re.Case:return zae(n);case Re.Match:return Gae(n);case Re.Interpolate:return Vae(n);case Re.ToString:return Bae(n);default:throw new Error(`Unsupported operator ${t}`)}}function Lae(n,e){const t=n.operator,r=n.args.length,i=new Array(r);for(let s=0;s<r;++s)i[s]=ic(n.args[s]);switch(t){case Re.Coalesce:return s=>{for(let a=0;a<r;++a){const o=i[a](s);if(typeof o<"u"&&o!==null)return o}throw new Error("Expected one of the values to be non-null")};case Re.Number:case Re.String:return s=>{for(let a=0;a<r;++a){const o=i[a](s);if(typeof o===t)return o}throw new Error(`Expected one of the values to be a ${t}`)};default:throw new Error(`Unsupported assertion operator ${t}`)}}function jae(n,e){const r=n.args[0].value;switch(n.operator){case Re.Get:return i=>{const s=n.args;let a=i.properties[r];for(let o=1,l=s.length;o<l;++o){const u=s[o].value;a=a[u]}return a};case Re.Var:return i=>i.variables[r];case Re.Has:return i=>{const s=n.args;if(!(r in i.properties))return!1;let a=i.properties[r];for(let o=1,l=s.length;o<l;++o){const u=s[o].value;if(!a||!Object.hasOwn(a,u))return!1;a=a[u]}return!0};default:throw new Error(`Unsupported accessor operator ${n.operator}`)}}function Fae(n,e){const t=n.operator,r=ic(n.args[0]),i=ic(n.args[1]);switch(t){case Re.Equal:return s=>r(s)===i(s);case Re.NotEqual:return s=>r(s)!==i(s);case Re.LessThan:return s=>r(s)<i(s);case Re.LessThanOrEqualTo:return s=>r(s)<=i(s);case Re.GreaterThan:return s=>r(s)>i(s);case Re.GreaterThanOrEqualTo:return s=>r(s)>=i(s);default:throw new Error(`Unsupported comparison operator ${t}`)}}function Dae(n,e){const t=n.operator,r=n.args.length,i=new Array(r);for(let s=0;s<r;++s)i[s]=ic(n.args[s]);switch(t){case Re.Any:return s=>{for(let a=0;a<r;++a)if(i[a](s))return!0;return!1};case Re.All:return s=>{for(let a=0;a<r;++a)if(!i[a](s))return!1;return!0};case Re.Between:return s=>{const a=i[0](s),o=i[1](s),l=i[2](s);return a>=o&&a<=l};case Re.In:return s=>{const a=i[0](s);for(let o=1;o<r;++o)if(a===i[o](s))return!0;return!1};case Re.Not:return s=>!i[0](s);default:throw new Error(`Unsupported logical operator ${t}`)}}function Oae(n,e){const t=n.operator,r=n.args.length,i=new Array(r);for(let s=0;s<r;++s)i[s]=ic(n.args[s]);switch(t){case Re.Multiply:return s=>{let a=1;for(let o=0;o<r;++o)a*=i[o](s);return a};case Re.Divide:return s=>i[0](s)/i[1](s);case Re.Add:return s=>{let a=0;for(let o=0;o<r;++o)a+=i[o](s);return a};case Re.Subtract:return s=>i[0](s)-i[1](s);case Re.Clamp:return s=>{const a=i[0](s),o=i[1](s);if(a<o)return o;const l=i[2](s);return a>l?l:a};case Re.Mod:return s=>i[0](s)%i[1](s);case Re.Pow:return s=>Math.pow(i[0](s),i[1](s));case Re.Abs:return s=>Math.abs(i[0](s));case Re.Floor:return s=>Math.floor(i[0](s));case Re.Ceil:return s=>Math.ceil(i[0](s));case Re.Round:return s=>Math.round(i[0](s));case Re.Sin:return s=>Math.sin(i[0](s));case Re.Cos:return s=>Math.cos(i[0](s));case Re.Atan:return r===2?s=>Math.atan2(i[0](s),i[1](s)):s=>Math.atan(i[0](s));case Re.Sqrt:return s=>Math.sqrt(i[0](s));default:throw new Error(`Unsupported numeric operator ${t}`)}}function zae(n,e){const t=n.args.length,r=new Array(t);for(let i=0;i<t;++i)r[i]=ic(n.args[i]);return i=>{for(let s=0;s<t-1;s+=2)if(r[s](i))return r[s+1](i);return r[t-1](i)}}function Gae(n,e){const t=n.args.length,r=new Array(t);for(let i=0;i<t;++i)r[i]=ic(n.args[i]);return i=>{const s=r[0](i);for(let a=1;a<t-1;a+=2)if(s===r[a](i))return r[a+1](i);return r[t-1](i)}}function Vae(n,e){const t=n.args.length,r=new Array(t);for(let i=0;i<t;++i)r[i]=ic(n.args[i]);return i=>{const s=r[0](i),a=r[1](i);let o,l;for(let c=2;c<t;c+=2){const u=r[c](i);let f=r[c+1](i);const p=Array.isArray(f);if(p&&(f=Ese(f)),u>=a)return c===2?f:p?Uae(s,a,o,l,u,f):Tv(s,a,o,l,u,f);o=u,l=f}return l}}function Bae(n,e){const t=n.operator,r=n.args.length,i=new Array(r);for(let s=0;s<r;++s)i[s]=ic(n.args[s]);switch(t){case Re.ToString:return s=>{const a=i[0](s);return n.args[0].type===Ci?ON(a):a.toString()};default:throw new Error(`Unsupported convert operator ${t}`)}}function Tv(n,e,t,r,i,s){const a=i-t;if(a===0)return r;const o=e-t,l=n===1?o/a:(Math.pow(n,o)-1)/(Math.pow(n,a)-1);return r+l*(s-r)}function Uae(n,e,t,r,i,s){if(i-t===0)return r;const o=PD(r),l=PD(s);let c=l[2]-o[2];c>180?c-=360:c<-180&&(c+=360);const u=[Tv(n,e,t,o[0],i,l[0]),Tv(n,e,t,o[1],i,l[1]),o[2]+Tv(n,e,t,0,i,c),Tv(n,e,t,r[3],i,s[3])];return Sse(u)}function $ae(n){return!0}function Wae(n){const e=HN(),t=Hae(n,e),r=XB();return function(i,s){if(r.properties=i.getPropertiesInternal(),r.resolution=s,e.featureId){const a=i.getId();a!==void 0?r.featureId=a:r.featureId=null}return e.geometryType&&(r.geometryType=KN(i.getGeometry())),t(r)}}function qD(n){const e=HN(),t=n.length,r=new Array(t);for(let a=0;a<t;++a)r[a]=JI(n[a],e);const i=XB(),s=new Array(t);return function(a,o){if(i.properties=a.getPropertiesInternal(),i.resolution=o,e.featureId){const c=a.getId();c!==void 0?i.featureId=c:i.featureId=null}let l=0;for(let c=0;c<t;++c){const u=r[c](i);u&&(s[l]=u,l+=1)}return s.length=l,s}}function Hae(n,e){const t=n.length,r=new Array(t);for(let i=0;i<t;++i){const s=n[i],a="filter"in s?Ju(s.filter,fs,e):$ae;let o;if(Array.isArray(s.style)){const l=s.style.length;o=new Array(l);for(let c=0;c<l;++c)o[c]=JI(s.style[c],e)}else o=[JI(s.style,e)];r[i]={filter:a,styles:o}}return function(i){const s=[];let a=!1;for(let o=0;o<t;++o){const l=r[o].filter;if(l(i)&&!(n[o].else&&a)){a=!0;for(const c of r[o].styles){const u=c(i);u&&s.push(u)}}}return s}}function JI(n,e){const t=B1(n,"",e),r=U1(n,"",e),i=Kae(n,e),s=qae(n,e),a=oo(n,"z-index",e);if(!t&&!r&&!i&&!s&&!Sh(n))throw new Error("No fill, stroke, point, or text symbolizer properties in style: "+JSON.stringify(n));const o=new Zt;return function(l){let c=!0;if(t){const u=t(l);u&&(c=!1),o.setFill(u)}if(r){const u=r(l);u&&(c=!1),o.setStroke(u)}if(i){const u=i(l);u&&(c=!1),o.setText(u)}if(s){const u=s(l);u&&(c=!1),o.setImage(u)}return a&&o.setZIndex(a(l)),c?null:o}}function B1(n,e,t){let r;if(e+"fill-pattern-src"in n)r=Jae(n,e+"fill-",t);else{if(n[e+"fill-color"]==="none")return s=>null;r=qN(n,e+"fill-color",t)}if(!r)return null;const i=new Rn;return function(s){const a=r(s);return a===DN?null:(i.setColor(a),i)}}function U1(n,e,t){const r=oo(n,e+"stroke-width",t),i=qN(n,e+"stroke-color",t);if(!r&&!i)return null;const s=bu(n,e+"stroke-line-cap",t),a=bu(n,e+"stroke-line-join",t),o=YB(n,e+"stroke-line-dash",t),l=oo(n,e+"stroke-line-dash-offset",t),c=oo(n,e+"stroke-miter-limit",t),u=new cn;return function(f){if(i){const p=i(f);if(p===DN)return null;u.setColor(p)}if(r&&u.setWidth(r(f)),s){const p=s(f);if(p!=="butt"&&p!=="round"&&p!=="square")throw new Error("Expected butt, round, or square line cap");u.setLineCap(p)}if(a){const p=a(f);if(p!=="bevel"&&p!=="round"&&p!=="miter")throw new Error("Expected bevel, round, or miter line join");u.setLineJoin(p)}return o&&u.setLineDash(o(f)),l&&u.setLineDashOffset(l(f)),c&&u.setMiterLimit(c(f)),u}}function Kae(n,e){const t="text-",r=bu(n,t+"value",e);if(!r)return null;const i=B1(n,t,e),s=B1(n,t+"background-",e),a=U1(n,t,e),o=U1(n,t+"background-",e),l=bu(n,t+"font",e),c=oo(n,t+"max-angle",e),u=oo(n,t+"offset-x",e),f=oo(n,t+"offset-y",e),p=Lm(n,t+"overflow",e),m=bu(n,t+"placement",e),y=oo(n,t+"repeat",e),x=pk(n,t+"scale",e),_=Lm(n,t+"rotate-with-view",e),E=oo(n,t+"rotation",e),S=bu(n,t+"align",e),k=bu(n,t+"justify",e),A=bu(n,t+"baseline",e),P=Lm(n,t+"keep-upright",e),z=YB(n,t+"padding",e),I=mk(n,t+"declutter-mode"),T=new Na({declutterMode:I});return function(R){if(T.setText(r(R)),i&&T.setFill(i(R)),s&&T.setBackgroundFill(s(R)),a&&T.setStroke(a(R)),o&&T.setBackgroundStroke(o(R)),l&&T.setFont(l(R)),c&&T.setMaxAngle(c(R)),u&&T.setOffsetX(u(R)),f&&T.setOffsetY(f(R)),p&&T.setOverflow(p(R)),m){const L=m(R);if(L!=="point"&&L!=="line")throw new Error("Expected point or line for text-placement");T.setPlacement(L)}if(y&&T.setRepeat(y(R)),x&&T.setScale(x(R)),_&&T.setRotateWithView(_(R)),E&&T.setRotation(E(R)),S){const L=S(R);if(L!=="left"&&L!=="center"&&L!=="right"&&L!=="end"&&L!=="start")throw new Error("Expected left, right, center, start, or end for text-align");T.setTextAlign(L)}if(k){const L=k(R);if(L!=="left"&&L!=="right"&&L!=="center")throw new Error("Expected left, right, or center for text-justify");T.setJustify(L)}if(A){const L=A(R);if(L!=="bottom"&&L!=="top"&&L!=="middle"&&L!=="alphabetic"&&L!=="hanging")throw new Error("Expected bottom, top, middle, alphabetic, or hanging for text-baseline");T.setTextBaseline(L)}return z&&T.setPadding(z(R)),P&&T.setKeepUpright(P(R)),T}}function qae(n,e){return"icon-src"in n?Xae(n,e):"shape-points"in n?Yae(n,e):"circle-radius"in n?Zae(n,e):null}function Xae(n,e){const t="icon-",r=t+"src",i=ZB(n[r],r),s=vE(n,t+"anchor",e),a=pk(n,t+"scale",e),o=oo(n,t+"opacity",e),l=vE(n,t+"displacement",e),c=oo(n,t+"rotation",e),u=Lm(n,t+"rotate-with-view",e),f=YD(n,t+"anchor-origin"),p=ZD(n,t+"anchor-x-units"),m=ZD(n,t+"anchor-y-units"),y=noe(n,t+"color"),x=eoe(n,t+"cross-origin"),_=toe(n,t+"offset"),E=YD(n,t+"offset-origin"),S=xE(n,t+"width"),k=xE(n,t+"height"),A=Qae(n,t+"size"),P=mk(n,t+"declutter-mode"),z=new qc({src:i,anchorOrigin:f,anchorXUnits:p,anchorYUnits:m,color:y,crossOrigin:x,offset:_,offsetOrigin:E,height:k,width:S,size:A,declutterMode:P});return function(I){return o&&z.setOpacity(o(I)),l&&z.setDisplacement(l(I)),c&&z.setRotation(c(I)),u&&z.setRotateWithView(u(I)),a&&z.setScale(a(I)),s&&z.setAnchor(s(I)),z}}function Yae(n,e){const t="shape-",r=t+"points",i=t+"radius",s=QI(n[r],r),a=QI(n[i],i),o=B1(n,t,e),l=U1(n,t,e),c=pk(n,t+"scale",e),u=vE(n,t+"displacement",e),f=oo(n,t+"rotation",e),p=Lm(n,t+"rotate-with-view",e),m=xE(n,t+"radius2"),y=xE(n,t+"angle"),x=mk(n,t+"declutter-mode"),_=new gk({points:s,radius:a,radius2:m,angle:y,declutterMode:x});return function(E){return o&&_.setFill(o(E)),l&&_.setStroke(l(E)),u&&_.setDisplacement(u(E)),f&&_.setRotation(f(E)),p&&_.setRotateWithView(p(E)),c&&_.setScale(c(E)),_}}function Zae(n,e){const t="circle-",r=B1(n,t,e),i=U1(n,t,e),s=oo(n,t+"radius",e),a=pk(n,t+"scale",e),o=vE(n,t+"displacement",e),l=oo(n,t+"rotation",e),c=Lm(n,t+"rotate-with-view",e),u=mk(n,t+"declutter-mode"),f=new xs({radius:5,declutterMode:u});return function(p){return s&&f.setRadius(s(p)),r&&f.setFill(r(p)),i&&f.setStroke(i(p)),o&&f.setDisplacement(o(p)),l&&f.setRotation(l(p)),c&&f.setRotateWithView(c(p)),a&&f.setScale(a(p)),f}}function oo(n,e,t){if(!(e in n))return;const r=Ju(n[e],Yt,t);return function(i){return QI(r(i),e)}}function bu(n,e,t){if(!(e in n))return null;const r=Ju(n[e],Is,t);return function(i){return ZB(r(i),e)}}function Jae(n,e,t){const r=bu(n,e+"pattern-src",t),i=XD(n,e+"pattern-offset",t),s=XD(n,e+"pattern-size",t),a=qN(n,e+"color",t);return function(o){return{src:r(o),offset:i&&i(o),size:s&&s(o),color:a&&a(o)}}}function Lm(n,e,t){if(!(e in n))return null;const r=Ju(n[e],fs,t);return function(i){const s=r(i);if(typeof s!="boolean")throw new Error(`Expected a boolean for ${e}`);return s}}function qN(n,e,t){if(!(e in n))return null;const r=Ju(n[e],Ci,t);return function(i){return JB(r(i),e)}}function YB(n,e,t){if(!(e in n))return null;const r=Ju(n[e],yo,t);return function(i){return Qx(r(i),e)}}function vE(n,e,t){if(!(e in n))return null;const r=Ju(n[e],yo,t);return function(i){const s=Qx(r(i),e);if(s.length!==2)throw new Error(`Expected two numbers for ${e}`);return s}}function XD(n,e,t){if(!(e in n))return null;const r=Ju(n[e],yo,t);return function(i){return QB(r(i),e)}}function pk(n,e,t){if(!(e in n))return null;const r=Ju(n[e],yo|Yt,t);return function(i){return roe(r(i),e)}}function xE(n,e){const t=n[e];if(t!==void 0){if(typeof t!="number")throw new Error(`Expected a number for ${e}`);return t}}function Qae(n,e){const t=n[e];if(t!==void 0){if(typeof t=="number")return ha(t);if(!Array.isArray(t))throw new Error(`Expected a number or size array for ${e}`);if(t.length!==2||typeof t[0]!="number"||typeof t[1]!="number")throw new Error(`Expected a number or size array for ${e}`);return t}}function eoe(n,e){const t=n[e];if(t!==void 0){if(typeof t!="string")throw new Error(`Expected a string for ${e}`);return t}}function YD(n,e){const t=n[e];if(t!==void 0){if(t!=="bottom-left"&&t!=="bottom-right"&&t!=="top-left"&&t!=="top-right")throw new Error(`Expected bottom-left, bottom-right, top-left, or top-right for ${e}`);return t}}function ZD(n,e){const t=n[e];if(t!==void 0){if(t!=="pixels"&&t!=="fraction")throw new Error(`Expected pixels or fraction for ${e}`);return t}}function toe(n,e){const t=n[e];if(t!==void 0)return Qx(t,e)}function mk(n,e){const t=n[e];if(t!==void 0){if(typeof t!="string")throw new Error(`Expected a string for ${e}`);if(t!=="declutter"&&t!=="obstacle"&&t!=="none")throw new Error(`Expected declutter, obstacle, or none for ${e}`);return t}}function noe(n,e){const t=n[e];if(t!==void 0)return JB(t,e)}function Qx(n,e){if(!Array.isArray(n))throw new Error(`Expected an array for ${e}`);const t=n.length;for(let r=0;r<t;++r)if(typeof n[r]!="number")throw new Error(`Expected an array of numbers for ${e}`);return n}function ZB(n,e){if(typeof n!="string")throw new Error(`Expected a string for ${e}`);return n}function QI(n,e){if(typeof n!="number")throw new Error(`Expected a number for ${e}`);return n}function JB(n,e){if(typeof n=="string")return n;const t=Qx(n,e),r=t.length;if(r<3||r>4)throw new Error(`Expected a color with 3 or 4 values for ${e}`);return t}function QB(n,e){const t=Qx(n,e);if(t.length!==2)throw new Error(`Expected an array of two numbers for ${e}`);return t}function roe(n,e){return typeof n=="number"?n:QB(n,e)}const jl={CENTER:"center",RESOLUTION:"resolution",ROTATION:"rotation"};function JD(n,e,t){return(function(r,i,s,a,o){if(!r)return;if(!i&&!e)return r;const l=e?0:s[0]*i,c=e?0:s[1]*i,u=o?o[0]:0,f=o?o[1]:0;let p=n[0]+l/2+u,m=n[2]-l/2+u,y=n[1]+c/2+f,x=n[3]-c/2+f;p>m&&(p=(m+p)/2,m=p),y>x&&(y=(x+y)/2,x=y);let _=ai(r[0],p,m),E=ai(r[1],y,x);if(a&&t&&i){const S=30*i;_+=-S*Math.log(1+Math.max(0,p-r[0])/S)+S*Math.log(1+Math.max(0,r[0]-m)/S),E+=-S*Math.log(1+Math.max(0,y-r[1])/S)+S*Math.log(1+Math.max(0,r[1]-x)/S)}return[_,E]})}function ioe(n){return n}function eU(n){return Math.pow(n,3)}function q0(n){return 1-eU(1-n)}function soe(n){return 3*n*n-2*n*n*n}function aoe(n){return n}function tU(n,e,t,r){let i=0;const s=n[t-r],a=n[t-r+1];let o=0,l=0;for(;e<t;e+=r){const c=n[e]-s,u=n[e+1]-a;i+=l*c-o*u,o=c,l=u}return i/2}function nU(n,e,t,r){let i=0;for(let s=0,a=t.length;s<a;++s){const o=t[s];i+=tU(n,e,o,r),e=o}return i}function ooe(n,e,t,r){let i=0;for(let s=0,a=t.length;s<a;++s){const o=t[s];i+=nU(n,e,o,r),e=o[o.length-1]}return i}function QD(n,e,t,r,i,s,a){const o=n[e],l=n[e+1],c=n[t]-o,u=n[t+1]-l;let f;if(c===0&&u===0)f=e;else{const p=((i-o)*c+(s-l)*u)/(c*c+u*u);if(p>1)f=t;else if(p>0){for(let m=0;m<r;++m)a[m]=jo(n[e+m],n[t+m],p);a.length=r;return}else f=e}for(let p=0;p<r;++p)a[p]=n[f+p];a.length=r}function XN(n,e,t,r,i){let s=n[e],a=n[e+1];for(e+=r;e<t;e+=r){const o=n[e],l=n[e+1],c=Ru(s,a,o,l);c>i&&(i=c),s=o,a=l}return i}function YN(n,e,t,r,i){for(let s=0,a=t.length;s<a;++s){const o=t[s];i=XN(n,e,o,r,i),e=o}return i}function loe(n,e,t,r,i){for(let s=0,a=t.length;s<a;++s){const o=t[s];i=YN(n,e,o,r,i),e=o[o.length-1]}return i}function ZN(n,e,t,r,i,s,a,o,l,c,u){if(e==t)return c;let f,p;if(i===0){if(p=Ru(a,o,n[e],n[e+1]),p<c){for(f=0;f<r;++f)l[f]=n[e+f];return l.length=r,p}return c}u=u||[NaN,NaN];let m=e+r;for(;m<t;)if(QD(n,m-r,m,r,a,o,u),p=Ru(a,o,u[0],u[1]),p<c){for(c=p,f=0;f<r;++f)l[f]=u[f];l.length=r,m+=r}else m+=r*Math.max((Math.sqrt(p)-Math.sqrt(c))/i|0,1);if(s&&(QD(n,t-r,e,r,a,o,u),p=Ru(a,o,u[0],u[1]),p<c)){for(c=p,f=0;f<r;++f)l[f]=u[f];l.length=r}return c}function JN(n,e,t,r,i,s,a,o,l,c,u){u=u||[NaN,NaN];for(let f=0,p=t.length;f<p;++f){const m=t[f];c=ZN(n,e,m,r,i,s,a,o,l,c,u),e=m}return c}function coe(n,e,t,r,i,s,a,o,l,c,u){u=u||[NaN,NaN];for(let f=0,p=t.length;f<p;++f){const m=t[f];c=JN(n,e,m,r,i,s,a,o,l,c,u),e=m[m.length-1]}return c}class $1 extends $h{constructor(e,t){super(),this.maxDelta_=-1,this.maxDeltaRevision_=-1,t!==void 0&&!Array.isArray(e[0])?this.setFlatCoordinates(t,e):this.setCoordinates(e,t)}clone(){return new $1(this.flatCoordinates.slice(),this.layout)}closestPointXY(e,t,r,i){return i<Gg(this.getExtent(),e,t)?i:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(XN(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),ZN(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!0,e,t,r,i))}getArea(){return tU(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getCoordinates(){return Yd(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getSimplifiedGeometryInternal(e){const t=[];return t.length=hk(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,e,t,0),new $1(t,"XY")}getType(){return"LinearRing"}intersectsExtent(e){return!1}setCoordinates(e,t){this.setLayout(t,e,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=uk(this.flatCoordinates,0,e,this.stride),this.changed()}}function uoe(n,e,t,r,i){return!kN(i,function(a){return!Wf(n,e,t,r,a[0],a[1])})}function Wf(n,e,t,r,i,s){let a=0,o=n[t-r],l=n[t-r+1];for(;e<t;e+=r){const c=n[e],u=n[e+1];l<=s?u>s&&(c-o)*(s-l)-(i-o)*(u-l)>0&&a++:u<=s&&(c-o)*(s-l)-(i-o)*(u-l)<0&&a--,o=c,l=u}return a!==0}function QN(n,e,t,r,i,s){if(t.length===0||!Wf(n,e,t[0],r,i,s))return!1;for(let a=1,o=t.length;a<o;++a)if(Wf(n,t[a-1],t[a],r,i,s))return!1;return!0}function doe(n,e,t,r,i,s){if(t.length===0)return!1;for(let a=0,o=t.length;a<o;++a){const l=t[a];if(QN(n,e,l,r,i,s))return!0;e=l[l.length-1]}return!1}function eM(n,e,t,r,i,s,a){let o,l,c,u,f,p,m;const y=i[s+1],x=[];for(let S=0,k=t.length;S<k;++S){const A=t[S];for(u=n[A-r],p=n[A-r+1],o=e;o<A;o+=r)f=n[o],m=n[o+1],(y<=p&&m<=y||p<=y&&y<=m)&&(c=(y-p)/(m-p)*(f-u)+u,x.push(c)),u=f,p=m}let _=NaN,E=-1/0;for(x.sort(Fc),u=x[0],o=1,l=x.length;o<l;++o){f=x[o];const S=Math.abs(f-u);S>E&&(c=(u+f)/2,QN(n,e,t,r,c,y)&&(_=c,E=S)),u=f}return isNaN(_)&&(_=i[s]),a?(a.push(_,y,E),a):[_,y,E]}function rU(n,e,t,r,i){let s=[];for(let a=0,o=t.length;a<o;++a){const l=t[a];s=eM(n,e,l,r,i,2*a,s),e=l[l.length-1]}return s}function iU(n,e,t,r,i){let s;for(e+=r;e<t;e+=r)if(s=i(n.slice(e-r,e),n.slice(e,e+r)),s)return s;return!1}function yk(n,e,t,r,i,s){return s=s??nB(Ka(),n,e,t,r),Fi(i,s)?s[0]>=i[0]&&s[2]<=i[2]||s[1]>=i[1]&&s[3]<=i[3]?!0:iU(n,e,t,r,function(a,o){return wie(i,a,o)}):!1}function hoe(n,e,t,r,i){for(let s=0,a=t.length;s<a;++s){if(yk(n,e,t[s],r,i))return!0;e=t[s]}return!1}function sU(n,e,t,r,i){return!!(yk(n,e,t,r,i)||Wf(n,e,t,r,i[0],i[1])||Wf(n,e,t,r,i[0],i[3])||Wf(n,e,t,r,i[2],i[1])||Wf(n,e,t,r,i[2],i[3]))}function aU(n,e,t,r,i){if(!sU(n,e,t[0],r,i))return!1;if(t.length===1)return!0;for(let s=1,a=t.length;s<a;++s)if(uoe(n,t[s-1],t[s],r,i)&&!yk(n,t[s-1],t[s],r,i))return!1;return!0}function foe(n,e,t,r,i){for(let s=0,a=t.length;s<a;++s){const o=t[s];if(aU(n,e,o,r,i))return!0;e=o[o.length-1]}return!1}function goe(n,e,t,r){for(;e<t-r;){for(let i=0;i<r;++i){const s=n[e+i];n[e+i]=n[t-r+i],n[t-r+i]=s}e+=r,t-=r}}function tM(n,e,t,r){let i=0,s=n[t-r],a=n[t-r+1];for(;e<t;e+=r){const o=n[e],l=n[e+1];i+=(o-s)*(l+a),s=o,a=l}return i===0?void 0:i>0}function nM(n,e,t,r,i){i=i!==void 0?i:!1;for(let s=0,a=t.length;s<a;++s){const o=t[s],l=tM(n,e,o,r);if(s===0){if(i&&l||!i&&!l)return!1}else if(i&&!l||!i&&l)return!1;e=o}return!0}function oU(n,e,t,r,i){for(let s=0,a=t.length;s<a;++s){const o=t[s];if(!nM(n,e,o,r,i))return!1;o.length&&(e=o[o.length-1])}return!0}function _E(n,e,t,r,i){i=i!==void 0?i:!1;for(let s=0,a=t.length;s<a;++s){const o=t[s],l=tM(n,e,o,r);(s===0?i&&l||!i&&!l:i&&!l||!i&&l)&&goe(n,e,o,r),e=o}return e}function eR(n,e,t,r,i){for(let s=0,a=t.length;s<a;++s)e=_E(n,e,t[s],r,i);return e}function rM(n,e){const t=[];let r=0,i=0,s;for(let a=0,o=e.length;a<o;++a){const l=e[a],c=tM(n,r,l,2);if(s===void 0&&(s=c),c===s)t.push(e.slice(i,a+1));else{if(t.length===0)continue;t[t.length-1].push(e[i])}i=a+1,r=l}return t}class qa extends $h{constructor(e,t,r){super(),this.ends_=[],this.flatInteriorPointRevision_=-1,this.flatInteriorPoint_=null,this.maxDelta_=-1,this.maxDeltaRevision_=-1,this.orientedRevision_=-1,this.orientedFlatCoordinates_=null,t!==void 0&&r?(this.setFlatCoordinates(t,e),this.ends_=r):this.setCoordinates(e,t)}appendLinearRing(e){this.flatCoordinates?Fr(this.flatCoordinates,e.getFlatCoordinates()):this.flatCoordinates=e.getFlatCoordinates().slice(),this.ends_.push(this.flatCoordinates.length),this.changed()}clone(){const e=new qa(this.flatCoordinates.slice(),this.layout,this.ends_.slice());return e.applyProperties(this),e}closestPointXY(e,t,r,i){return i<Gg(this.getExtent(),e,t)?i:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(YN(this.flatCoordinates,0,this.ends_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),JN(this.flatCoordinates,0,this.ends_,this.stride,this.maxDelta_,!0,e,t,r,i))}containsXY(e,t){return QN(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,e,t)}getArea(){return nU(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride)}getCoordinates(e){let t;return e!==void 0?(t=this.getOrientedFlatCoordinates().slice(),_E(t,0,this.ends_,this.stride,e)):t=this.flatCoordinates,D1(t,0,this.ends_,this.stride)}getEnds(){return this.ends_}getFlatInteriorPoint(){if(this.flatInteriorPointRevision_!=this.getRevision()){const e=wl(this.getExtent());this.flatInteriorPoint_=eM(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,e,0),this.flatInteriorPointRevision_=this.getRevision()}return this.flatInteriorPoint_}getInteriorPoint(){return new Br(this.getFlatInteriorPoint(),"XYM")}getLinearRingCount(){return this.ends_.length}getLinearRing(e){return e<0||this.ends_.length<=e?null:new $1(this.flatCoordinates.slice(e===0?0:this.ends_[e-1],this.ends_[e]),this.layout)}getLinearRings(){const e=this.layout,t=this.flatCoordinates,r=this.ends_,i=[];let s=0;for(let a=0,o=r.length;a<o;++a){const l=r[a],c=new $1(t.slice(s,l),e);i.push(c),s=l}return i}getOrientedFlatCoordinates(){if(this.orientedRevision_!=this.getRevision()){const e=this.flatCoordinates;nM(e,0,this.ends_,this.stride)?this.orientedFlatCoordinates_=e:(this.orientedFlatCoordinates_=e.slice(),this.orientedFlatCoordinates_.length=_E(this.orientedFlatCoordinates_,0,this.ends_,this.stride)),this.orientedRevision_=this.getRevision()}return this.orientedFlatCoordinates_}getSimplifiedGeometryInternal(e){const t=[],r=[];return t.length=GN(this.flatCoordinates,0,this.ends_,this.stride,Math.sqrt(e),t,0,r),new qa(t,"XY",r)}getType(){return"Polygon"}intersectsExtent(e){return aU(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,e)}setCoordinates(e,t){this.setLayout(t,e,2),this.flatCoordinates||(this.flatCoordinates=[]);const r=Xx(this.flatCoordinates,0,e,this.stride,this.ends_);this.flatCoordinates.length=r.length===0?0:r[r.length-1],this.changed()}}function eO(n){if(Vg(n))throw new Error("Cannot create polygon from empty extent");const e=n[0],t=n[1],r=n[2],i=n[3],s=[e,t,e,i,r,i,r,t,e,t];return new qa(s,"XY",[s.length])}function iM(n,e,t,r){const i=fr(e)/t[0],s=ps(e)/t[1];return r?Math.min(n,Math.max(i,s)):Math.min(n,Math.min(i,s))}function sM(n,e,t){let r=Math.min(n,e);const i=50;return r*=Math.log(1+i*Math.max(0,n/e-1))/i+1,t&&(r=Math.max(r,t),r/=Math.log(1+i*Math.max(0,t/n-1))/i+1),ai(r,t/2,e*2)}function poe(n,e,t,r){return e=e!==void 0?e:!0,(function(i,s,a,o){if(i!==void 0){const l=n[0],c=n[n.length-1],u=t?iM(l,t,a,r):l;if(o)return e?sM(i,u,c):ai(i,c,u);const f=Math.min(u,i),p=Math.floor(nk(n,f,s));return n[p]>u&&p<n.length-1?n[p+1]:n[p]}})}function moe(n,e,t,r,i,s){return r=r!==void 0?r:!0,t=t!==void 0?t:0,(function(a,o,l,c){if(a!==void 0){const u=i?iM(e,i,l,s):e;if(c)return r?sM(a,u,t):ai(a,t,u);const f=1e-9,p=Math.ceil(Math.log(e/u)/Math.log(n)-f),m=-o*(.5-f)+.5,y=Math.min(u,a),x=Math.floor(Math.log(e/y)/Math.log(n)+m),_=Math.max(p,x),E=e/Math.pow(n,_);return ai(E,t,u)}})}function tO(n,e,t,r,i){return t=t!==void 0?t:!0,(function(s,a,o,l){if(s!==void 0){const c=r?iM(n,r,o,i):n;return!t||!l?ai(s,e,c):sM(s,c,e)}})}function aM(n){if(n!==void 0)return 0}function nO(n){if(n!==void 0)return n}function yoe(n){const e=2*Math.PI/n;return(function(t,r){if(r)return t;if(t!==void 0)return t=Math.floor(t/e+.5)*e,t})}function voe(n){const e=yl(5);return(function(t,r){return r||t===void 0?t:Math.abs(t)<=e?0:t})}const lU=42,oM=256,AA=0;class Tc extends nu{constructor(e){super(),this.on,this.once,this.un,e=Object.assign({},e),this.hints_=[0,0],this.animations_=[],this.updateAnimationKey_,this.projection_=MN(e.projection,"EPSG:3857"),this.viewportSize_=[100,100],this.targetCenter_=null,this.targetResolution_,this.targetRotation_,this.nextCenter_=null,this.nextResolution_,this.nextRotation_,this.cancelAnchor_=void 0,e.projection&&pB(),e.center&&(e.center=Li(e.center,this.projection_)),e.extent&&(e.extent=Hl(e.extent,this.projection_)),this.applyOptions_(e)}applyOptions_(e){const t=Object.assign({},e);for(const o in jl)delete t[o];this.setProperties(t,!0);const r=_oe(e);this.maxResolution_=r.maxResolution,this.minResolution_=r.minResolution,this.zoomFactor_=r.zoomFactor,this.resolutions_=e.resolutions,this.padding_=e.padding,this.minZoom_=r.minZoom;const i=xoe(e),s=r.constraint,a=woe(e);this.constraints_={center:i,resolution:s,rotation:a},this.setRotation(e.rotation!==void 0?e.rotation:0),this.setCenterInternal(e.center!==void 0?e.center:null),e.resolution!==void 0?this.setResolution(e.resolution):e.zoom!==void 0&&this.setZoom(e.zoom)}get padding(){return this.padding_}set padding(e){let t=this.padding_;this.padding_=e;const r=this.getCenterInternal();if(r){const i=e||[0,0,0,0];t=t||[0,0,0,0];const s=this.getResolution(),a=s/2*(i[3]-t[3]+t[1]-i[1]),o=s/2*(i[0]-t[0]+t[2]-i[2]);this.setCenterInternal([r[0]+a,r[1]-o])}}getUpdatedOptions_(e){const t=this.getProperties();return t.resolution!==void 0?t.resolution=this.getResolution():t.zoom=this.getZoom(),t.center=this.getCenterInternal(),t.rotation=this.getRotation(),Object.assign({},t,e)}animate(e){this.isDef()&&!this.getAnimating()&&this.resolveConstraints(0);const t=new Array(arguments.length);for(let r=0;r<t.length;++r){let i=arguments[r];i.center&&(i=Object.assign({},i),i.center=Li(i.center,this.getProjection())),i.anchor&&(i=Object.assign({},i),i.anchor=Li(i.anchor,this.getProjection())),t[r]=i}this.animateInternal.apply(this,t)}animateInternal(e){let t=arguments.length,r;t>1&&typeof arguments[t-1]=="function"&&(r=arguments[t-1],--t);let i=0;for(;i<t&&!this.isDef();++i){const u=arguments[i];u.center&&this.setCenterInternal(u.center),u.zoom!==void 0?this.setZoom(u.zoom):u.resolution&&this.setResolution(u.resolution),u.rotation!==void 0&&this.setRotation(u.rotation)}if(i===t){r&&ub(r,!0);return}let s=Date.now(),a=this.targetCenter_.slice(),o=this.targetResolution_,l=this.targetRotation_;const c=[];for(;i<t;++i){const u=arguments[i],f={start:s,complete:!1,anchor:u.anchor,duration:u.duration!==void 0?u.duration:1e3,easing:u.easing||soe,callback:r};if(u.center&&(f.sourceCenter=a,f.targetCenter=u.center.slice(),a=f.targetCenter),u.zoom!==void 0?(f.sourceResolution=o,f.targetResolution=this.getResolutionForZoom(u.zoom),o=f.targetResolution):u.resolution&&(f.sourceResolution=o,f.targetResolution=u.resolution,o=f.targetResolution),u.rotation!==void 0){f.sourceRotation=l;const p=oh(u.rotation-l+Math.PI,2*Math.PI)-Math.PI;f.targetRotation=l+p,l=f.targetRotation}boe(f)?f.complete=!0:s+=f.duration,c.push(f)}this.animations_.push(c),this.setHint(ui.ANIMATING,1),this.updateAnimations_()}getAnimating(){return this.hints_[ui.ANIMATING]>0}getInteracting(){return this.hints_[ui.INTERACTING]>0}cancelAnimations(){this.setHint(ui.ANIMATING,-this.hints_[ui.ANIMATING]);let e;for(let t=0,r=this.animations_.length;t<r;++t){const i=this.animations_[t];if(i[0].callback&&ub(i[0].callback,!1),!e)for(let s=0,a=i.length;s<a;++s){const o=i[s];if(!o.complete){e=o.anchor;break}}}this.animations_.length=0,this.cancelAnchor_=e,this.nextCenter_=null,this.nextResolution_=NaN,this.nextRotation_=NaN}updateAnimations_(){if(this.updateAnimationKey_!==void 0&&(cancelAnimationFrame(this.updateAnimationKey_),this.updateAnimationKey_=void 0),!this.getAnimating())return;const e=Date.now();let t=!1;for(let r=this.animations_.length-1;r>=0;--r){const i=this.animations_[r];let s=!0;for(let a=0,o=i.length;a<o;++a){const l=i[a];if(l.complete)continue;const c=e-l.start;let u=l.duration>0?c/l.duration:1;u>=1?(l.complete=!0,u=1):s=!1;const f=l.easing(u);if(l.sourceCenter){const p=l.sourceCenter[0],m=l.sourceCenter[1],y=l.targetCenter[0],x=l.targetCenter[1];this.nextCenter_=l.targetCenter;const _=p+f*(y-p),E=m+f*(x-m);this.targetCenter_=[_,E]}if(l.sourceResolution&&l.targetResolution){const p=f===1?l.targetResolution:l.sourceResolution+f*(l.targetResolution-l.sourceResolution);if(l.anchor){const m=this.getViewportSize_(this.getRotation()),y=this.constraints_.resolution(p,0,m,!0);this.targetCenter_=this.calculateCenterZoom(y,l.anchor)}this.nextResolution_=l.targetResolution,this.targetResolution_=p,this.applyTargetState_(!0)}if(l.sourceRotation!==void 0&&l.targetRotation!==void 0){const p=f===1?oh(l.targetRotation+Math.PI,2*Math.PI)-Math.PI:l.sourceRotation+f*(l.targetRotation-l.sourceRotation);if(l.anchor){const m=this.constraints_.rotation(p,!0);this.targetCenter_=this.calculateCenterRotate(m,l.anchor)}this.nextRotation_=l.targetRotation,this.targetRotation_=p}if(this.applyTargetState_(!0),t=!0,!l.complete)break}if(s){this.animations_[r]=null,this.setHint(ui.ANIMATING,-1),this.nextCenter_=null,this.nextResolution_=NaN,this.nextRotation_=NaN;const a=i[0].callback;a&&ub(a,!0)}}this.animations_=this.animations_.filter(Boolean),t&&this.updateAnimationKey_===void 0&&(this.updateAnimationKey_=requestAnimationFrame(this.updateAnimations_.bind(this)))}calculateCenterRotate(e,t){let r;const i=this.getCenterInternal();return i!==void 0&&(r=[i[0]-t[0],i[1]-t[1]],CN(r,e-this.getRotation()),Sie(r,t)),r}calculateCenterZoom(e,t){let r;const i=this.getCenterInternal(),s=this.getResolution();if(i!==void 0&&s!==void 0){const a=t[0]-e*(t[0]-i[0])/s,o=t[1]-e*(t[1]-i[1])/s;r=[a,o]}return r}getViewportSize_(e){const t=this.viewportSize_;if(e){const r=t[0],i=t[1];return[Math.abs(r*Math.cos(e))+Math.abs(i*Math.sin(e)),Math.abs(r*Math.sin(e))+Math.abs(i*Math.cos(e))]}return t}setViewportSize(e){this.viewportSize_=Array.isArray(e)?e.slice():[100,100],this.getAnimating()||this.resolveConstraints(0)}getCenter(){const e=this.getCenterInternal();return e&&vg(e,this.getProjection())}getCenterInternal(){return this.get(jl.CENTER)}getConstraints(){return this.constraints_}getConstrainResolution(){return this.get("constrainResolution")}getHints(e){return e!==void 0?(e[0]=this.hints_[0],e[1]=this.hints_[1],e):this.hints_.slice()}calculateExtent(e){const t=this.calculateExtentInternal(e);return lk(t,this.getProjection())}calculateExtentInternal(e){e=e||this.getViewportSizeMinusPadding_();const t=this.getCenterInternal();Er(t,"The view center is not defined");const r=this.getResolution();Er(r!==void 0,"The view resolution is not defined");const i=this.getRotation();return Er(i!==void 0,"The view rotation is not defined"),sE(t,r,i,e)}getMaxResolution(){return this.maxResolution_}getMinResolution(){return this.minResolution_}getMaxZoom(){return this.getZoomForResolution(this.minResolution_)}setMaxZoom(e){this.applyOptions_(this.getUpdatedOptions_({maxZoom:e}))}getMinZoom(){return this.getZoomForResolution(this.maxResolution_)}setMinZoom(e){this.applyOptions_(this.getUpdatedOptions_({minZoom:e}))}setConstrainResolution(e){this.applyOptions_(this.getUpdatedOptions_({constrainResolution:e}))}getProjection(){return this.projection_}getResolution(){return this.get(jl.RESOLUTION)}getResolutions(){return this.resolutions_}getResolutionForExtent(e,t){return this.getResolutionForExtentInternal(Hl(e,this.getProjection()),t)}getResolutionForExtentInternal(e,t){t=t||this.getViewportSizeMinusPadding_();const r=fr(e)/t[0],i=ps(e)/t[1];return Math.max(r,i)}getResolutionForValueFunction(e){e=e||2;const t=this.getConstrainedResolution(this.maxResolution_),r=this.minResolution_,i=Math.log(t/r)/Math.log(e);return(function(s){return t/Math.pow(e,s*i)})}getRotation(){return this.get(jl.ROTATION)}getValueForResolutionFunction(e){const t=Math.log(e||2),r=this.getConstrainedResolution(this.maxResolution_),i=this.minResolution_,s=Math.log(r/i)/t;return(function(a){return Math.log(r/a)/t/s})}getViewportSizeMinusPadding_(e){let t=this.getViewportSize_(e);const r=this.padding_;return r&&(t=[t[0]-r[1]-r[3],t[1]-r[0]-r[2]]),t}getState(){const e=this.getProjection(),t=this.getResolution(),r=this.getRotation();let i=this.getCenterInternal();const s=this.padding_;if(s){const a=this.getViewportSizeMinusPadding_();i=IA(i,this.getViewportSize_(),[a[0]/2+s[3],a[1]/2+s[0]],t,r)}return{center:i.slice(0),projection:e!==void 0?e:null,resolution:t,nextCenter:this.nextCenter_,nextResolution:this.nextResolution_,nextRotation:this.nextRotation_,rotation:r,zoom:this.getZoom()}}getViewStateAndExtent(){return{viewState:this.getState(),extent:this.calculateExtent()}}getZoom(){let e;const t=this.getResolution();return t!==void 0&&(e=this.getZoomForResolution(t)),e}getZoomForResolution(e){let t=this.minZoom_||0,r,i;if(this.resolutions_){const s=nk(this.resolutions_,e,1);t=s,r=this.resolutions_[s],s==this.resolutions_.length-1?i=2:i=r/this.resolutions_[s+1]}else r=this.maxResolution_,i=this.zoomFactor_;return t+Math.log(r/e)/Math.log(i)}getResolutionForZoom(e){if(this.resolutions_?.length){if(this.resolutions_.length===1)return this.resolutions_[0];const t=ai(Math.floor(e),0,this.resolutions_.length-2),r=this.resolutions_[t]/this.resolutions_[t+1];return this.resolutions_[t]/Math.pow(r,ai(e-t,0,1))}return this.maxResolution_/Math.pow(this.zoomFactor_,e-this.minZoom_)}fit(e,t){let r;if(Er(Array.isArray(e)||typeof e.getSimplifiedGeometry=="function","Invalid extent or geometry provided as `geometry`"),Array.isArray(e)){Er(!Vg(e),"Cannot fit empty extent provided as `geometry`");const i=Hl(e,this.getProjection());r=eO(i)}else if(e.getType()==="Circle"){const i=Hl(e.getExtent(),this.getProjection());r=eO(i),r.rotate(this.getRotation(),wl(i))}else r=e;this.fitInternal(r,t)}rotatedExtentForGeometry(e){const t=this.getRotation(),r=Math.cos(t),i=Math.sin(-t),s=e.getFlatCoordinates(),a=e.getStride();let o=1/0,l=1/0,c=-1/0,u=-1/0;for(let f=0,p=s.length;f<p;f+=a){const m=s[f]*r-s[f+1]*i,y=s[f]*i+s[f+1]*r;o=Math.min(o,m),l=Math.min(l,y),c=Math.max(c,m),u=Math.max(u,y)}return[o,l,c,u]}fitInternal(e,t){t=t||{};let r=t.size;r||(r=this.getViewportSizeMinusPadding_());const i=t.padding!==void 0?t.padding:[0,0,0,0],s=t.nearest!==void 0?t.nearest:!1;let a;t.minResolution!==void 0?a=t.minResolution:t.maxZoom!==void 0?a=this.getResolutionForZoom(t.maxZoom):a=0;const o=this.rotatedExtentForGeometry(e);let l=this.getResolutionForExtentInternal(o,[r[0]-i[1]-i[3],r[1]-i[0]-i[2]]);l=isNaN(l)?a:Math.max(l,a),l=this.getConstrainedResolution(l,s?0:1);const c=this.getRotation(),u=Math.sin(c),f=Math.cos(c),p=wl(o);p[0]+=(i[1]-i[3])/2*l,p[1]+=(i[0]-i[2])/2*l;const m=p[0]*f-p[1]*u,y=p[1]*f+p[0]*u,x=this.getConstrainedCenter([m,y],l),_=t.callback?t.callback:L1;t.duration!==void 0?this.animateInternal({resolution:l,center:x,duration:t.duration,easing:t.easing},_):(this.targetResolution_=l,this.targetCenter_=x,this.applyTargetState_(!1,!0),ub(_,!0))}centerOn(e,t,r){this.centerOnInternal(Li(e,this.getProjection()),t,r)}centerOnInternal(e,t,r){this.setCenterInternal(IA(e,t,r,this.getResolution(),this.getRotation()))}calculateCenterShift(e,t,r,i){let s;const a=this.padding_;if(a&&e){const o=this.getViewportSizeMinusPadding_(-r),l=IA(e,i,[o[0]/2+a[3],o[1]/2+a[0]],t,r);s=[e[0]-l[0],e[1]-l[1]]}return s}isDef(){return!!this.getCenterInternal()&&this.getResolution()!==void 0}adjustCenter(e){const t=vg(this.targetCenter_,this.getProjection());this.setCenter([t[0]+e[0],t[1]+e[1]])}adjustCenterInternal(e){const t=this.targetCenter_;this.setCenterInternal([t[0]+e[0],t[1]+e[1]])}adjustResolution(e,t){t=t&&Li(t,this.getProjection()),this.adjustResolutionInternal(e,t)}adjustResolutionInternal(e,t){const r=this.getAnimating()||this.getInteracting(),i=this.getViewportSize_(this.getRotation()),s=this.constraints_.resolution(this.targetResolution_*e,0,i,r);t&&(this.targetCenter_=this.calculateCenterZoom(s,t)),this.targetResolution_*=e,this.applyTargetState_()}adjustZoom(e,t){this.adjustResolution(Math.pow(this.zoomFactor_,-e),t)}adjustRotation(e,t){t&&(t=Li(t,this.getProjection())),this.adjustRotationInternal(e,t)}adjustRotationInternal(e,t){const r=this.getAnimating()||this.getInteracting(),i=this.constraints_.rotation(this.targetRotation_+e,r);t&&(this.targetCenter_=this.calculateCenterRotate(i,t)),this.targetRotation_+=e,this.applyTargetState_()}setCenter(e){this.setCenterInternal(e&&Li(e,this.getProjection()))}setCenterInternal(e){this.targetCenter_=e,this.applyTargetState_()}setHint(e,t){return this.hints_[e]+=t,this.changed(),this.hints_[e]}setResolution(e){this.targetResolution_=e,this.applyTargetState_()}setRotation(e){this.targetRotation_=e,this.applyTargetState_()}setZoom(e){this.setResolution(this.getResolutionForZoom(e))}applyTargetState_(e,t){const r=this.getAnimating()||this.getInteracting()||t,i=this.constraints_.rotation(this.targetRotation_,r),s=this.getViewportSize_(i),a=this.constraints_.resolution(this.targetResolution_,0,s,r),o=this.constraints_.center(this.targetCenter_,a,s,r,this.calculateCenterShift(this.targetCenter_,a,i,s));this.get(jl.ROTATION)!==i&&this.set(jl.ROTATION,i),this.get(jl.RESOLUTION)!==a&&(this.set(jl.RESOLUTION,a),this.set("zoom",this.getZoom(),!0)),(!o||!this.get(jl.CENTER)||!Ga(this.get(jl.CENTER),o))&&this.set(jl.CENTER,o),this.getAnimating()&&!e&&this.cancelAnimations(),this.cancelAnchor_=void 0}resolveConstraints(e,t,r){e=e!==void 0?e:200;const i=t||0,s=this.constraints_.rotation(this.targetRotation_),a=this.getViewportSize_(s),o=this.constraints_.resolution(this.targetResolution_,i,a),l=this.constraints_.center(this.targetCenter_,o,a,!1,this.calculateCenterShift(this.targetCenter_,o,s,a));if(e===0&&!this.cancelAnchor_){this.targetResolution_=o,this.targetRotation_=s,this.targetCenter_=l,this.applyTargetState_();return}r=r||(e===0?this.cancelAnchor_:void 0),this.cancelAnchor_=void 0,(this.getResolution()!==o||this.getRotation()!==s||!this.getCenterInternal()||!Ga(this.getCenterInternal(),l))&&(this.getAnimating()&&this.cancelAnimations(),this.animateInternal({rotation:s,center:l,resolution:o,duration:e,easing:q0,anchor:r}))}beginInteraction(){this.resolveConstraints(0),this.setHint(ui.INTERACTING,1)}endInteraction(e,t,r){r=r&&Li(r,this.getProjection()),this.endInteractionInternal(e,t,r)}endInteractionInternal(e,t,r){this.getInteracting()&&(this.setHint(ui.INTERACTING,-1),this.resolveConstraints(e,t,r))}getConstrainedCenter(e,t){const r=this.getViewportSize_(this.getRotation());return this.constraints_.center(e,t||this.getResolution(),r)}getConstrainedZoom(e,t){const r=this.getResolutionForZoom(e);return this.getZoomForResolution(this.getConstrainedResolution(r,t))}getConstrainedResolution(e,t){t=t||0;const r=this.getViewportSize_(this.getRotation());return this.constraints_.resolution(e,t,r)}}function ub(n,e){setTimeout(function(){n(e)},0)}function xoe(n){if(n.extent!==void 0){const t=n.smoothExtentConstraint!==void 0?n.smoothExtentConstraint:!0;return JD(n.extent,n.constrainOnlyCenter,t)}const e=MN(n.projection,"EPSG:3857");if(n.multiWorld!==!0&&e.isGlobal()){const t=e.getExtent().slice();return t[0]=-1/0,t[2]=1/0,JD(t,!1,!1)}return ioe}function _oe(n){let e,t,r,a=n.minZoom!==void 0?n.minZoom:AA,o=n.maxZoom!==void 0?n.maxZoom:28;const l=n.zoomFactor!==void 0?n.zoomFactor:2,c=n.multiWorld!==void 0?n.multiWorld:!1,u=n.smoothResolutionConstraint!==void 0?n.smoothResolutionConstraint:!0,f=n.showFullExtent!==void 0?n.showFullExtent:!1,p=MN(n.projection,"EPSG:3857"),m=p.getExtent();let y=n.constrainOnlyCenter,x=n.extent;if(!c&&!x&&p.isGlobal()&&(y=!1,x=m),n.resolutions!==void 0){const _=n.resolutions;t=_[a],r=_[o]!==void 0?_[o]:_[_.length-1],n.constrainResolution?e=poe(_,u,!y&&x,f):e=tO(t,r,u,!y&&x,f)}else{const E=(m?Math.max(fr(m),ps(m)):360*pg.degrees/p.getMetersPerUnit())/oM/Math.pow(2,AA),S=E/Math.pow(2,28-AA);t=n.maxResolution,t!==void 0?a=0:t=E/Math.pow(l,a),r=n.minResolution,r===void 0&&(n.maxZoom!==void 0?n.maxResolution!==void 0?r=t/Math.pow(l,o):r=E/Math.pow(l,o):r=S),o=a+Math.floor(Math.log(t/r)/Math.log(l)),r=t/Math.pow(l,o-a),n.constrainResolution?e=moe(l,t,r,u,!y&&x,f):e=tO(t,r,u,!y&&x,f)}return{constraint:e,maxResolution:t,minResolution:r,minZoom:a,zoomFactor:l}}function woe(n){if(n.enableRotation!==void 0?n.enableRotation:!0){const t=n.constrainRotation;return t===void 0||t===!0?voe():t===!1?nO:typeof t=="number"?yoe(t):nO}return aM}function boe(n){return!(n.sourceCenter&&n.targetCenter&&!Ga(n.sourceCenter,n.targetCenter)||n.sourceResolution!==n.targetResolution||n.sourceRotation!==n.targetRotation)}function IA(n,e,t,r,i){const s=Math.cos(-i);let a=Math.sin(-i),o=n[0]*s-n[1]*a,l=n[1]*s+n[0]*a;o+=(e[0]/2-t[0])*r,l+=(t[1]-e[1]/2)*r,a=-a;const c=o*s-l*a,u=l*s+o*a;return[c,u]}const zr={OPACITY:"opacity",VISIBLE:"visible",EXTENT:"extent",Z_INDEX:"zIndex",MAX_RESOLUTION:"maxResolution",MIN_RESOLUTION:"minResolution",MAX_ZOOM:"maxZoom",MIN_ZOOM:"minZoom",SOURCE:"source",MAP:"map"};class cU extends nu{constructor(e){super(),this.on,this.once,this.un,this.background_=e.background;const t=Object.assign({},e);typeof e.properties=="object"&&(delete t.properties,Object.assign(t,e.properties)),t[zr.OPACITY]=e.opacity!==void 0?e.opacity:1,Er(typeof t[zr.OPACITY]=="number","Layer opacity must be a number"),t[zr.VISIBLE]=e.visible!==void 0?e.visible:!0,t[zr.Z_INDEX]=e.zIndex,t[zr.MAX_RESOLUTION]=e.maxResolution!==void 0?e.maxResolution:1/0,t[zr.MIN_RESOLUTION]=e.minResolution!==void 0?e.minResolution:0,t[zr.MIN_ZOOM]=e.minZoom!==void 0?e.minZoom:-1/0,t[zr.MAX_ZOOM]=e.maxZoom!==void 0?e.maxZoom:1/0,this.className_=t.className!==void 0?t.className:"ol-layer",delete t.className,this.setProperties(t),this.state_=null}getBackground(){return this.background_}getClassName(){return this.className_}getLayerState(e){const t=this.state_||{layer:this,managed:e===void 0?!0:e},r=this.getZIndex();return t.opacity=ai(Math.round(this.getOpacity()*100)/100,0,1),t.visible=this.getVisible(),t.extent=this.getExtent(),t.zIndex=r===void 0&&!t.managed?1/0:r,t.maxResolution=this.getMaxResolution(),t.minResolution=Math.max(this.getMinResolution(),0),t.minZoom=this.getMinZoom(),t.maxZoom=this.getMaxZoom(),this.state_=t,t}getLayersArray(e){return jn()}getLayerStatesArray(e){return jn()}getExtent(){return this.get(zr.EXTENT)}getMaxResolution(){return this.get(zr.MAX_RESOLUTION)}getMinResolution(){return this.get(zr.MIN_RESOLUTION)}getMinZoom(){return this.get(zr.MIN_ZOOM)}getMaxZoom(){return this.get(zr.MAX_ZOOM)}getOpacity(){return this.get(zr.OPACITY)}getSourceState(){return jn()}getVisible(){return this.get(zr.VISIBLE)}getZIndex(){return this.get(zr.Z_INDEX)}setBackground(e){this.background_=e,this.changed()}setExtent(e){this.set(zr.EXTENT,e)}setMaxResolution(e){this.set(zr.MAX_RESOLUTION,e)}setMinResolution(e){this.set(zr.MIN_RESOLUTION,e)}setMaxZoom(e){this.set(zr.MAX_ZOOM,e)}setMinZoom(e){this.set(zr.MIN_ZOOM,e)}setOpacity(e){Er(typeof e=="number","Layer opacity must be a number"),this.set(zr.OPACITY,e)}setVisible(e){this.set(zr.VISIBLE,e)}setZIndex(e){this.set(zr.Z_INDEX,e)}disposeInternal(){this.state_&&(this.state_.layer=null,this.state_=null),super.disposeInternal()}}class e_ extends cU{constructor(e){const t=Object.assign({},e);delete t.source,super(t),this.on,this.once,this.un,this.mapPrecomposeKey_=null,this.mapRenderKey_=null,this.sourceChangeKey_=null,this.renderer_=null,this.sourceReady_=!1,this.rendered=!1,e.render&&(this.render=e.render),e.map&&this.setMap(e.map),this.addChangeListener(zr.SOURCE,this.handleSourcePropertyChange_);const r=e.source?e.source:null;this.setSource(r)}getLayersArray(e){return e=e||[],e.push(this),e}getLayerStatesArray(e){return e=e||[],e.push(this.getLayerState()),e}getSource(){return this.get(zr.SOURCE)||null}getRenderSource(){return this.getSource()}getSourceState(){const e=this.getSource();return e?e.getState():"undefined"}handleSourceChange_(){this.changed(),!(this.sourceReady_||this.getSource().getState()!=="ready")&&(this.sourceReady_=!0,this.dispatchEvent("sourceready"))}handleSourcePropertyChange_(){this.sourceChangeKey_&&(si(this.sourceChangeKey_),this.sourceChangeKey_=null),this.sourceReady_=!1;const e=this.getSource();e&&(this.sourceChangeKey_=hr(e,In.CHANGE,this.handleSourceChange_,this),e.getState()==="ready"&&(this.sourceReady_=!0,setTimeout(()=>{this.dispatchEvent("sourceready")},0))),this.changed()}getFeatures(e){return this.renderer_?this.renderer_.getFeatures(e):Promise.resolve([])}getData(e){return!this.renderer_||!this.rendered?null:this.renderer_.getData(e)}isVisible(e){let t;const r=this.getMapInternal();!e&&r&&(e=r.getView()),e instanceof Tc?t={viewState:e.getState(),extent:e.calculateExtent()}:t=e,!t.layerStatesArray&&r&&(t.layerStatesArray=r.getLayerGroup().getLayerStatesArray());let i;if(t.layerStatesArray){if(i=t.layerStatesArray.find(a=>a.layer===this),!i)return!1}else i=this.getLayerState();const s=this.getExtent();return lM(i,t.viewState)&&(!s||Fi(s,t.extent))}getAttributions(e){if(!this.isVisible(e))return[];const t=this.getSource()?.getAttributions();if(!t)return[];const r=e instanceof Tc?e.getViewStateAndExtent():e;let i=t(r);return Array.isArray(i)||(i=[i]),i}render(e,t){const r=this.getRenderer();return r.prepareFrame(e)?(this.rendered=!0,r.renderFrame(e,t)):null}unrender(){this.rendered=!1}getDeclutter(){}renderDeclutter(e,t){}renderDeferred(e){const t=this.getRenderer();t&&t.renderDeferred(e)}setMapInternal(e){e||this.unrender(),this.set(zr.MAP,e)}getMapInternal(){return this.get(zr.MAP)}setMap(e){this.mapPrecomposeKey_&&(si(this.mapPrecomposeKey_),this.mapPrecomposeKey_=null),e||this.changed(),this.mapRenderKey_&&(si(this.mapRenderKey_),this.mapRenderKey_=null),e&&(this.mapPrecomposeKey_=hr(e,Us.PRECOMPOSE,this.handlePrecompose_,this),this.mapRenderKey_=hr(this,In.CHANGE,e.render,e),this.changed())}handlePrecompose_(e){const t=e.frameState.layerStatesArray,r=this.getLayerState(!1);Er(!t.some(i=>i.layer===r.layer),"A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both."),t.push(r)}setSource(e){this.set(zr.SOURCE,e)}getRenderer(){return this.renderer_||(this.renderer_=this.createRenderer()),this.renderer_}hasRenderer(){return!!this.renderer_}createRenderer(){return null}clearRenderer(){this.renderer_&&(this.renderer_.dispose(),delete this.renderer_)}disposeInternal(){this.clearRenderer(),this.setSource(null),super.disposeInternal()}}function lM(n,e){if(!n.visible)return!1;const t=e.resolution;if(t<n.minResolution||t>=n.maxResolution)return!1;const r=e.zoom;return r>n.minZoom&&r<=n.maxZoom}const rO={RENDER_ORDER:"renderOrder"};class t_ extends e_{constructor(e){e=e||{};const t=Object.assign({},e);delete t.style,delete t.renderBuffer,delete t.updateWhileAnimating,delete t.updateWhileInteracting,super(t),this.declutter_=e.declutter?String(e.declutter):void 0,this.renderBuffer_=e.renderBuffer!==void 0?e.renderBuffer:100,this.style_=null,this.styleFunction_=void 0,this.setStyle(e.style),this.updateWhileAnimating_=e.updateWhileAnimating!==void 0?e.updateWhileAnimating:!1,this.updateWhileInteracting_=e.updateWhileInteracting!==void 0?e.updateWhileInteracting:!1}getDeclutter(){return this.declutter_}getFeatures(e){return super.getFeatures(e)}getRenderBuffer(){return this.renderBuffer_}getRenderOrder(){return this.get(rO.RENDER_ORDER)}getStyle(){return this.style_}getStyleFunction(){return this.styleFunction_}getUpdateWhileAnimating(){return this.updateWhileAnimating_}getUpdateWhileInteracting(){return this.updateWhileInteracting_}renderDeclutter(e,t){const r=this.getDeclutter();r in e.declutter||(e.declutter[r]=new KB(9)),this.getRenderer().renderDeclutter(e,t)}setRenderOrder(e){this.set(rO.RENDER_ORDER,e)}setStyle(e){this.style_=e===void 0?zB:e;const t=Eoe(e);this.styleFunction_=e===null?void 0:Jse(t),this.changed()}setDeclutter(e){this.declutter_=e?String(e):void 0,this.changed()}}function Eoe(n){if(n===void 0)return zB;if(!n)return null;if(typeof n=="function"||n instanceof Zt)return n;if(!Array.isArray(n))return qD([n]);if(n.length===0)return[];const e=n.length,t=n[0];if(t instanceof Zt){const i=new Array(e);for(let s=0;s<e;++s){const a=n[s];if(!(a instanceof Zt))throw new Error("Expected a list of style instances");i[s]=a}return i}if("style"in t){const i=new Array(e);for(let s=0;s<e;++s){const a=n[s];if(!("style"in a))throw new Error("Expected a list of rules with a style property");i[s]=a}return Wae(i)}return qD(n)}class wi extends t_{constructor(e){super(e)}createRenderer(){return new gae(this)}}const gs={ADD:"add",REMOVE:"remove"},iO={LENGTH:"length"};class db extends Zo{constructor(e,t,r){super(e),this.element=t,this.index=r}}class $a extends nu{constructor(e,t){if(super(),this.on,this.once,this.un,t=t||{},this.unique_=!!t.unique,this.array_=e??[],this.unique_)for(let r=1,i=this.array_.length;r<i;++r)this.assertUnique_(this.array_[r],r);this.updateLength_()}clear(){for(;this.getLength()>0;)this.pop()}extend(e){for(let t=0,r=e.length;t<r;++t)this.push(e[t]);return this}forEach(e){const t=this.array_;for(let r=0,i=t.length;r<i;++r)e(t[r],r,t)}getArray(){return this.array_}item(e){return this.array_[e]}getLength(){return this.get(iO.LENGTH)}insertAt(e,t){if(e<0||e>this.getLength())throw new Error("Index out of bounds: "+e);this.unique_&&this.assertUnique_(t),this.array_.splice(e,0,t),this.updateLength_(),this.dispatchEvent(new db(gs.ADD,t,e))}pop(){return this.removeAt(this.getLength()-1)}push(e){const t=this.getLength();return this.insertAt(t,e),this.getLength()}remove(e){const t=this.array_;for(let r=0,i=t.length;r<i;++r)if(t[r]===e)return this.removeAt(r)}removeAt(e){if(e<0||e>=this.getLength())return;const t=this.array_[e];return this.array_.splice(e,1),this.updateLength_(),this.dispatchEvent(new db(gs.REMOVE,t,e)),t}setAt(e,t){const r=this.getLength();if(e>=r){this.insertAt(e,t);return}if(e<0)throw new Error("Index out of bounds: "+e);this.unique_&&this.assertUnique_(t,e);const i=this.array_[e];this.array_[e]=t,this.dispatchEvent(new db(gs.REMOVE,i,e)),this.dispatchEvent(new db(gs.ADD,t,e))}updateLength_(){this.set(iO.LENGTH,this.array_.length)}assertUnique_(e,t){const r=this.array_;for(let i=0,s=r.length;i<s;++i)if(r[i]===e&&i!==t)throw new Error("Duplicate item added to a unique collection")}}let Soe=!1;function uU(n,e,t,r,i,s,a){const o=new XMLHttpRequest;o.open("GET",typeof n=="function"?n(t,r,i):n,!0),e.getType()=="arraybuffer"&&(o.responseType="arraybuffer"),o.withCredentials=Soe,o.onload=function(l){if(!o.status||o.status>=200&&o.status<300){const c=e.getType();try{let u;c=="text"||c=="json"?u=o.responseText:c=="xml"?u=o.responseXML||o.responseText:c=="arraybuffer"&&(u=o.response),u?s(e.readFeatures(u,{extent:t,featureProjection:i}),e.readProjection(u)):a()}catch{a()}}else a()},o.onerror=a,o.send()}function sO(n,e){return function(t,r,i,s,a){uU(n,e,t,r,i,(o,l)=>{this.addFeatures(o),s!==void 0&&s(o)},()=>{this.changed(),a!==void 0&&a()})}}function koe(n,e){return[[-1/0,-1/0,1/0,1/0]]}function Toe(n,e){return[n]}function dU(n,e,t,r){const i=[];let s=Ka();for(let a=0,o=t.length;a<o;++a){const l=t[a];s=EN(n,e,l[0],r),i.push((s[0]+s[2])/2,(s[1]+s[3])/2),e=l[l.length-1]}return i}function wE(n,e,t,r,i,s,a){let o,l;const c=(t-e)/r;if(c===1)o=e;else if(c===2)o=e,l=i;else if(c!==0){let u=n[e],f=n[e+1],p=0;const m=[0];for(let _=e+r;_<t;_+=r){const E=n[_],S=n[_+1];p+=Math.sqrt((E-u)*(E-u)+(S-f)*(S-f)),m.push(p),u=E,f=S}const y=i*p,x=die(m,y);x<0?(l=(y-m[-x-2])/(m[-x-1]-m[-x-2]),o=e+(-x-2)*r):o=e+x*r}a=a>1?a:2,s=s||new Array(a);for(let u=0;u<a;++u)s[u]=o===void 0?NaN:l===void 0?n[o+u]:jo(n[o+u],n[o+r+u],l);return s}function tR(n,e,t,r,i,s){if(t==e)return null;let a;if(i<n[e+r-1])return s?(a=n.slice(e,e+r),a[r-1]=i,a):null;if(n[t-1]<i)return s?(a=n.slice(t-r,t),a[r-1]=i,a):null;if(i==n[e+r-1])return n.slice(e,e+r);let o=e/r,l=t/r;for(;o<l;){const p=o+l>>1;i<n[(p+1)*r-1]?l=p:o=p+1}const c=n[o*r-1];if(i==c)return n.slice((o-1)*r,(o-1)*r+r);const u=n[(o+1)*r-1],f=(i-c)/(u-c);a=[];for(let p=0;p<r-1;++p)a.push(jo(n[(o-1)*r+p],n[o*r+p],f));return a.push(i),a}function Coe(n,e,t,r,i,s,a){if(a)return tR(n,e,t[t.length-1],r,i,s);let o;if(i<n[r-1])return s?(o=n.slice(0,r),o[r-1]=i,o):null;if(n[n.length-1]<i)return s?(o=n.slice(n.length-r),o[r-1]=i,o):null;for(let l=0,c=t.length;l<c;++l){const u=t[l];if(e!=u){if(i<n[e+r-1])return null;if(i<=n[u-1])return tR(n,e,u,r,i,!1);e=u}}return null}class vk extends $h{constructor(e,t,r){super(),r!==void 0&&t===void 0?this.setFlatCoordinates(r,e):(t=t||0,this.setCenterAndRadius(e,t,r))}clone(){const e=new vk(this.flatCoordinates.slice(),void 0,this.layout);return e.applyProperties(this),e}closestPointXY(e,t,r,i){const s=this.flatCoordinates,a=e-s[0],o=t-s[1],l=a*a+o*o;if(l<i){if(l===0)for(let c=0;c<this.stride;++c)r[c]=s[c];else{const c=this.getRadius()/Math.sqrt(l);r[0]=s[0]+c*a,r[1]=s[1]+c*o;for(let u=2;u<this.stride;++u)r[u]=s[u]}return r.length=this.stride,l}return i}containsXY(e,t){const r=this.flatCoordinates,i=e-r[0],s=t-r[1];return i*i+s*s<=this.getRadiusSquared_()}getCenter(){return this.flatCoordinates.slice(0,this.stride)}computeExtent(e){const t=this.flatCoordinates,r=t[this.stride]-t[0];return Kc(t[0]-r,t[1]-r,t[0]+r,t[1]+r,e)}getRadius(){return Math.sqrt(this.getRadiusSquared_())}getRadiusSquared_(){const e=this.flatCoordinates[this.stride]-this.flatCoordinates[0],t=this.flatCoordinates[this.stride+1]-this.flatCoordinates[1];return e*e+t*t}getType(){return"Circle"}intersectsExtent(e){const t=this.getExtent();if(Fi(e,t)){const r=this.getCenter();return e[0]<=r[0]&&e[2]>=r[0]||e[1]<=r[1]&&e[3]>=r[1]?!0:kN(e,this.intersectsCoordinate.bind(this))}return!1}setCenter(e){const t=this.stride,r=this.flatCoordinates[t]-this.flatCoordinates[0],i=e.slice();i[t]=i[0]+r;for(let s=1;s<t;++s)i[t+s]=e[s];this.setFlatCoordinates(this.layout,i),this.changed()}setCenterAndRadius(e,t,r){this.setLayout(r,e,0),this.flatCoordinates||(this.flatCoordinates=[]);const i=this.flatCoordinates;let s=_B(i,0,e,this.stride);i[s++]=i[0]+t;for(let a=1,o=this.stride;a<o;++a)i[s++]=i[a];i.length=s,this.changed()}getCoordinates(){return null}setCoordinates(e,t){}setRadius(e){this.flatCoordinates[this.stride]=this.flatCoordinates[0]+e,this.changed()}rotate(e,t){const r=this.getCenter(),i=this.getStride();this.setCenter(jN(r,0,r.length,i,e,t,r)),this.changed()}}vk.prototype.transform;class xl extends xB{constructor(e){super(),this.geometries_=e,this.changeEventsKeys_=[],this.listenGeometriesChange_()}unlistenGeometriesChange_(){this.changeEventsKeys_.forEach(si),this.changeEventsKeys_.length=0}listenGeometriesChange_(){const e=this.geometries_;for(let t=0,r=e.length;t<r;++t)this.changeEventsKeys_.push(hr(e[t],In.CHANGE,this.changed,this))}clone(){const e=new xl(RA(this.geometries_));return e.applyProperties(this),e}closestPointXY(e,t,r,i){if(i<Gg(this.getExtent(),e,t))return i;const s=this.geometries_;for(let a=0,o=s.length;a<o;++a)i=s[a].closestPointXY(e,t,r,i);return i}containsXY(e,t){const r=this.geometries_;for(let i=0,s=r.length;i<s;++i)if(r[i].containsXY(e,t))return!0;return!1}computeExtent(e){W0(e);const t=this.geometries_;for(let r=0,i=t.length;r<i;++r)SN(e,t[r].getExtent());return e}getGeometries(){return RA(this.geometries_)}getGeometriesArray(){return this.geometries_}getGeometriesArrayRecursive(){let e=[];const t=this.geometries_;for(let r=0,i=t.length;r<i;++r)t[r].getType()===this.getType()?e=e.concat(t[r].getGeometriesArrayRecursive()):e.push(t[r]);return e}getSimplifiedGeometry(e){if(this.simplifiedGeometryRevision!==this.getRevision()&&(this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=this.getRevision()),e<0||this.simplifiedGeometryMaxMinSquaredTolerance!==0&&e<this.simplifiedGeometryMaxMinSquaredTolerance)return this;const t=[],r=this.geometries_;let i=!1;for(let s=0,a=r.length;s<a;++s){const o=r[s],l=o.getSimplifiedGeometry(e);t.push(l),l!==o&&(i=!0)}return i?new xl(t):(this.simplifiedGeometryMaxMinSquaredTolerance=e,this)}getType(){return"GeometryCollection"}intersectsExtent(e){const t=this.geometries_;for(let r=0,i=t.length;r<i;++r)if(t[r].intersectsExtent(e))return!0;return!1}isEmpty(){return this.geometries_.length===0}rotate(e,t){const r=this.geometries_;for(let i=0,s=r.length;i<s;++i)r[i].rotate(e,t);this.changed()}scale(e,t,r){r||(r=wl(this.getExtent()));const i=this.geometries_;for(let s=0,a=i.length;s<a;++s)i[s].scale(e,t,r);this.changed()}setGeometries(e){this.setGeometriesArray(RA(e))}setGeometriesArray(e){this.unlistenGeometriesChange_(),this.geometries_=e,this.listenGeometriesChange_(),this.changed()}applyTransform(e){const t=this.geometries_;for(let r=0,i=t.length;r<i;++r)t[r].applyTransform(e);this.changed()}translate(e,t){const r=this.geometries_;for(let i=0,s=r.length;i<s;++i)r[i].translate(e,t);this.changed()}disposeInternal(){this.unlistenGeometriesChange_(),super.disposeInternal()}}function RA(n){return n.map(e=>e.clone())}class Di extends $h{constructor(e,t){super(),this.flatMidpoint_=null,this.flatMidpointRevision_=-1,this.maxDelta_=-1,this.maxDeltaRevision_=-1,t!==void 0&&!Array.isArray(e[0])?this.setFlatCoordinates(t,e):this.setCoordinates(e,t)}appendCoordinate(e){Fr(this.flatCoordinates,e),this.changed()}clone(){const e=new Di(this.flatCoordinates.slice(),this.layout);return e.applyProperties(this),e}closestPointXY(e,t,r,i){return i<Gg(this.getExtent(),e,t)?i:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(XN(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),ZN(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!1,e,t,r,i))}forEachSegment(e){return iU(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,e)}getCoordinateAtM(e,t){return this.layout!="XYM"&&this.layout!="XYZM"?null:(t=t!==void 0?t:!1,tR(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,e,t))}getCoordinates(){return Yd(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getCoordinateAt(e,t){return wE(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,e,t,this.stride)}getLength(){return VN(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getFlatMidpoint(){return this.flatMidpointRevision_!=this.getRevision()&&(this.flatMidpoint_=this.getCoordinateAt(.5,this.flatMidpoint_??void 0),this.flatMidpointRevision_=this.getRevision()),this.flatMidpoint_}getSimplifiedGeometryInternal(e){const t=[];return t.length=hk(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,e,t,0),new Di(t,"XY")}getType(){return"LineString"}intersectsExtent(e){return yk(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,e,this.getExtent())}setCoordinates(e,t){this.setLayout(t,e,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=uk(this.flatCoordinates,0,e,this.stride),this.changed()}}class Sl extends $h{constructor(e,t,r){if(super(),this.ends_=[],this.maxDelta_=-1,this.maxDeltaRevision_=-1,Array.isArray(e[0]))this.setCoordinates(e,t);else if(t!==void 0&&r)this.setFlatCoordinates(t,e),this.ends_=r;else{const i=e,s=[],a=[];for(let l=0,c=i.length;l<c;++l){const u=i[l];Fr(s,u.getFlatCoordinates()),a.push(s.length)}const o=i.length===0?this.getLayout():i[0].getLayout();this.setFlatCoordinates(o,s),this.ends_=a}}appendLineString(e){Fr(this.flatCoordinates,e.getFlatCoordinates().slice()),this.ends_.push(this.flatCoordinates.length),this.changed()}clone(){const e=new Sl(this.flatCoordinates.slice(),this.layout,this.ends_.slice());return e.applyProperties(this),e}closestPointXY(e,t,r,i){return i<Gg(this.getExtent(),e,t)?i:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(YN(this.flatCoordinates,0,this.ends_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),JN(this.flatCoordinates,0,this.ends_,this.stride,this.maxDelta_,!1,e,t,r,i))}getCoordinateAtM(e,t,r){return this.layout!="XYM"&&this.layout!="XYZM"||this.flatCoordinates.length===0?null:(t=t!==void 0?t:!1,r=r!==void 0?r:!1,Coe(this.flatCoordinates,0,this.ends_,this.stride,e,t,r))}getCoordinates(){return D1(this.flatCoordinates,0,this.ends_,this.stride)}getEnds(){return this.ends_}getLineString(e){return e<0||this.ends_.length<=e?null:new Di(this.flatCoordinates.slice(e===0?0:this.ends_[e-1],this.ends_[e]),this.layout)}getLineStrings(){const e=this.flatCoordinates,t=this.ends_,r=this.layout,i=[];let s=0;for(let a=0,o=t.length;a<o;++a){const l=t[a],c=new Di(e.slice(s,l),r);i.push(c),s=l}return i}getLength(){const e=this.ends_;let t=0,r=0;for(let i=0,s=e.length;i<s;++i)r+=VN(this.flatCoordinates,t,e[i],this.stride),t=e[i];return r}getFlatMidpoints(){const e=[],t=this.flatCoordinates;let r=0;const i=this.ends_,s=this.stride;for(let a=0,o=i.length;a<o;++a){const l=i[a],c=wE(t,r,l,s,.5);Fr(e,c),r=l}return e}getSimplifiedGeometryInternal(e){const t=[],r=[];return t.length=FB(this.flatCoordinates,0,this.ends_,this.stride,e,t,0,r),new Sl(t,"XY",r)}getType(){return"MultiLineString"}intersectsExtent(e){return hoe(this.flatCoordinates,0,this.ends_,this.stride,e)}setCoordinates(e,t){this.setLayout(t,e,2),this.flatCoordinates||(this.flatCoordinates=[]);const r=Xx(this.flatCoordinates,0,e,this.stride,this.ends_);this.flatCoordinates.length=r.length===0?0:r[r.length-1],this.changed()}}class Wh extends $h{constructor(e,t){super(),t&&!Array.isArray(e[0])?this.setFlatCoordinates(t,e):this.setCoordinates(e,t)}appendPoint(e){Fr(this.flatCoordinates,e.getFlatCoordinates()),this.changed()}clone(){const e=new Wh(this.flatCoordinates.slice(),this.layout);return e.applyProperties(this),e}closestPointXY(e,t,r,i){if(i<Gg(this.getExtent(),e,t))return i;const s=this.flatCoordinates,a=this.stride;for(let o=0,l=s.length;o<l;o+=a){const c=Ru(e,t,s[o],s[o+1]);if(c<i){i=c;for(let u=0;u<a;++u)r[u]=s[o+u];r.length=a}}return i}getCoordinates(){return Yd(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getPoint(e){const t=this.flatCoordinates.length/this.stride;return e<0||t<=e?null:new Br(this.flatCoordinates.slice(e*this.stride,(e+1)*this.stride),this.layout)}getPoints(){const e=this.flatCoordinates,t=this.layout,r=this.stride,i=[];for(let s=0,a=e.length;s<a;s+=r){const o=new Br(e.slice(s,s+r),t);i.push(o)}return i}getType(){return"MultiPoint"}intersectsExtent(e){const t=this.flatCoordinates,r=this.stride;for(let i=0,s=t.length;i<s;i+=r){const a=t[i],o=t[i+1];if(bN(e,a,o))return!0}return!1}setCoordinates(e,t){this.setLayout(t,e,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=uk(this.flatCoordinates,0,e,this.stride),this.changed()}}class Xc extends $h{constructor(e,t,r){if(super(),this.endss_=[],this.flatInteriorPointsRevision_=-1,this.flatInteriorPoints_=null,this.maxDelta_=-1,this.maxDeltaRevision_=-1,this.orientedRevision_=-1,this.orientedFlatCoordinates_=null,!r&&!Array.isArray(e[0])){const i=e,s=[],a=[];for(let o=0,l=i.length;o<l;++o){const c=i[o],u=s.length,f=c.getEnds();for(let p=0,m=f.length;p<m;++p)f[p]+=u;Fr(s,c.getFlatCoordinates()),a.push(f)}t=i.length===0?this.getLayout():i[0].getLayout(),e=s,r=a}t!==void 0&&r?(this.setFlatCoordinates(t,e),this.endss_=r):this.setCoordinates(e,t)}appendPolygon(e){let t;if(!this.flatCoordinates)this.flatCoordinates=e.getFlatCoordinates().slice(),t=e.getEnds().slice(),this.endss_.push();else{const r=this.flatCoordinates.length;Fr(this.flatCoordinates,e.getFlatCoordinates()),t=e.getEnds().slice();for(let i=0,s=t.length;i<s;++i)t[i]+=r}this.endss_.push(t),this.changed()}clone(){const e=this.endss_.length,t=new Array(e);for(let i=0;i<e;++i)t[i]=this.endss_[i].slice();const r=new Xc(this.flatCoordinates.slice(),this.layout,t);return r.applyProperties(this),r}closestPointXY(e,t,r,i){return i<Gg(this.getExtent(),e,t)?i:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(loe(this.flatCoordinates,0,this.endss_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),coe(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,this.maxDelta_,!0,e,t,r,i))}containsXY(e,t){return doe(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,e,t)}getArea(){return ooe(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride)}getCoordinates(e){let t;return e!==void 0?(t=this.getOrientedFlatCoordinates().slice(),eR(t,0,this.endss_,this.stride,e)):t=this.flatCoordinates,KI(t,0,this.endss_,this.stride)}getEndss(){return this.endss_}getFlatInteriorPoints(){if(this.flatInteriorPointsRevision_!=this.getRevision()){const e=dU(this.flatCoordinates,0,this.endss_,this.stride);this.flatInteriorPoints_=rU(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,e),this.flatInteriorPointsRevision_=this.getRevision()}return this.flatInteriorPoints_}getInteriorPoints(){return new Wh(this.getFlatInteriorPoints().slice(),"XYM")}getOrientedFlatCoordinates(){if(this.orientedRevision_!=this.getRevision()){const e=this.flatCoordinates;oU(e,0,this.endss_,this.stride)?this.orientedFlatCoordinates_=e:(this.orientedFlatCoordinates_=e.slice(),this.orientedFlatCoordinates_.length=eR(this.orientedFlatCoordinates_,0,this.endss_,this.stride)),this.orientedRevision_=this.getRevision()}return this.orientedFlatCoordinates_}getSimplifiedGeometryInternal(e){const t=[],r=[];return t.length=Gse(this.flatCoordinates,0,this.endss_,this.stride,Math.sqrt(e),t,0,r),new Xc(t,"XY",r)}getPolygon(e){if(e<0||this.endss_.length<=e)return null;let t;if(e===0)t=0;else{const s=this.endss_[e-1];t=s[s.length-1]}const r=this.endss_[e].slice(),i=r[r.length-1];if(t!==0)for(let s=0,a=r.length;s<a;++s)r[s]-=t;return new qa(this.flatCoordinates.slice(t,i),this.layout,r)}getPolygons(){const e=this.layout,t=this.flatCoordinates,r=this.endss_,i=[];let s=0;for(let a=0,o=r.length;a<o;++a){const l=r[a].slice(),c=l[l.length-1];if(s!==0)for(let f=0,p=l.length;f<p;++f)l[f]-=s;const u=new qa(t.slice(s,c),e,l);i.push(u),s=c}return i}getType(){return"MultiPolygon"}intersectsExtent(e){return foe(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,e)}setCoordinates(e,t){this.setLayout(t,e,3),this.flatCoordinates||(this.flatCoordinates=[]);const r=wB(this.flatCoordinates,0,e,this.stride,this.endss_);if(r.length===0)this.flatCoordinates.length=0;else{const i=r[r.length-1];this.flatCoordinates.length=i.length===0?0:i[i.length-1]}this.changed()}}const aO=ms();class aa{constructor(e,t,r,i,s,a){this.styleFunction,this.extent_,this.id_=a,this.type_=e,this.flatCoordinates_=t,this.flatInteriorPoints_=null,this.flatMidpoints_=null,this.ends_=r||null,this.properties_=s,this.squaredTolerance_,this.stride_=i,this.simplifiedGeometry_}get(e){return this.properties_[e]}getExtent(){return this.extent_||(this.extent_=this.type_==="Point"?Wv(this.flatCoordinates_):EN(this.flatCoordinates_,0,this.flatCoordinates_.length,2)),this.extent_}getFlatInteriorPoint(){if(!this.flatInteriorPoints_){const e=wl(this.getExtent());this.flatInteriorPoints_=eM(this.flatCoordinates_,0,this.ends_,2,e,0)}return this.flatInteriorPoints_}getFlatInteriorPoints(){if(!this.flatInteriorPoints_){const e=rM(this.flatCoordinates_,this.ends_),t=dU(this.flatCoordinates_,0,e,2);this.flatInteriorPoints_=rU(this.flatCoordinates_,0,e,2,t)}return this.flatInteriorPoints_}getFlatMidpoint(){return this.flatMidpoints_||(this.flatMidpoints_=wE(this.flatCoordinates_,0,this.flatCoordinates_.length,2,.5)),this.flatMidpoints_}getFlatMidpoints(){if(!this.flatMidpoints_){this.flatMidpoints_=[];const e=this.flatCoordinates_;let t=0;const r=this.ends_;for(let i=0,s=r.length;i<s;++i){const a=r[i],o=wE(e,t,a,2,.5);Fr(this.flatMidpoints_,o),t=a}}return this.flatMidpoints_}getId(){return this.id_}getOrientedFlatCoordinates(){return this.flatCoordinates_}getGeometry(){return this}getSimplifiedGeometry(e){return this}simplifyTransformed(e,t){return this}getProperties(){return this.properties_}getPropertiesInternal(){return this.properties_}getStride(){return this.stride_}getStyleFunction(){return this.styleFunction}getType(){return this.type_}transform(e){e=Zn(e);const t=e.getExtent(),r=e.getWorldExtent();if(t&&r){const i=ps(r)/ps(t);bl(aO,r[0],r[3],i,-i,0,0,0),Dc(this.flatCoordinates_,0,this.flatCoordinates_.length,2,aO,this.flatCoordinates_)}}applyTransform(e){e(this.flatCoordinates_,this.flatCoordinates_,this.stride_)}clone(){return new aa(this.type_,this.flatCoordinates_.slice(),this.ends_?.slice(),this.stride_,Object.assign({},this.properties_),this.id_)}getEnds(){return this.ends_}enableSimplifyTransformed(){return this.simplifyTransformed=QV((e,t)=>{if(e===this.squaredTolerance_)return this.simplifiedGeometry_;this.simplifiedGeometry_=this.clone(),t&&this.simplifiedGeometry_.applyTransform(t);const r=this.simplifiedGeometry_.getFlatCoordinates();let i;switch(this.type_){case"LineString":r.length=hk(r,0,this.simplifiedGeometry_.flatCoordinates_.length,this.simplifiedGeometry_.stride_,e,r,0),i=[r.length];break;case"MultiLineString":i=[],r.length=FB(r,0,this.simplifiedGeometry_.ends_,this.simplifiedGeometry_.stride_,e,r,0,i);break;case"Polygon":i=[],r.length=GN(r,0,this.simplifiedGeometry_.ends_,this.simplifiedGeometry_.stride_,Math.sqrt(e),r,0,i);break}return i&&(this.simplifiedGeometry_=new aa(this.type_,r,i,2,this.properties_,this.id_)),this.squaredTolerance_=e,this.simplifiedGeometry_}),this}}aa.prototype.getFlatCoordinates=aa.prototype.getOrientedFlatCoordinates;class nR{constructor(e){this.rbush_=new KB(e),this.items_={}}insert(e,t){const r={minX:e[0],minY:e[1],maxX:e[2],maxY:e[3],value:t};this.rbush_.insert(r),this.items_[Dt(t)]=r}load(e,t){const r=new Array(t.length);for(let i=0,s=t.length;i<s;i++){const a=e[i],o=t[i],l={minX:a[0],minY:a[1],maxX:a[2],maxY:a[3],value:o};r[i]=l,this.items_[Dt(o)]=l}this.rbush_.load(r)}remove(e){const t=Dt(e),r=this.items_[t];return delete this.items_[t],this.rbush_.remove(r)!==null}update(e,t){const r=this.items_[Dt(t)],i=[r.minX,r.minY,r.maxX,r.maxY];kh(i,e)||(this.remove(t),this.insert(e,t))}getAll(){return this.rbush_.all().map(function(t){return t.value})}getInExtent(e){const t={minX:e[0],minY:e[1],maxX:e[2],maxY:e[3]};return this.rbush_.search(t).map(function(i){return i.value})}forEach(e){return this.forEach_(this.getAll(),e)}forEachInExtent(e,t){return this.forEach_(this.getInExtent(e),t)}forEach_(e,t){let r;for(let i=0,s=e.length;i<s;i++)if(r=t(e[i]),r)return r;return r}isEmpty(){return Sh(this.items_)}clear(){this.rbush_.clear(),this.items_={}}getExtent(e){const t=this.rbush_.toJSON();return Kc(t.minX,t.minY,t.maxX,t.maxY,e)}concat(e){this.rbush_.load(e.rbush_.all());for(const t in e.items_)this.items_[t]=e.items_[t]}}class cM extends nu{constructor(e){super(),this.projection=Zn(e.projection),this.attributions_=oO(e.attributions),this.attributionsCollapsible_=e.attributionsCollapsible??!0,this.loading=!1,this.state_=e.state!==void 0?e.state:"ready",this.wrapX_=e.wrapX!==void 0?e.wrapX:!1,this.interpolate_=!!e.interpolate,this.viewResolver=null,this.viewRejector=null;const t=this;this.viewPromise_=new Promise(function(r,i){t.viewResolver=r,t.viewRejector=i})}getAttributions(){return this.attributions_}getAttributionsCollapsible(){return this.attributionsCollapsible_}getProjection(){return this.projection}getResolutions(e){return null}getView(){return this.viewPromise_}getState(){return this.state_}getWrapX(){return this.wrapX_}getInterpolate(){return this.interpolate_}refresh(){this.changed()}setAttributions(e){this.attributions_=oO(e),this.changed()}setState(e){this.state_=e,this.changed()}}function oO(n){return n?typeof n=="function"?n:(Array.isArray(n)||(n=[n]),e=>n):null}const Gs={ADDFEATURE:"addfeature",CHANGEFEATURE:"changefeature",CLEAR:"clear",REMOVEFEATURE:"removefeature",FEATURESLOADSTART:"featuresloadstart",FEATURESLOADEND:"featuresloadend",FEATURESLOADERROR:"featuresloaderror"};class kd extends Zo{constructor(e,t,r){super(e),this.feature=t,this.features=r}}class oi extends cM{constructor(e){e=e||{},super({attributions:e.attributions,interpolate:!0,projection:void 0,state:"ready",wrapX:e.wrapX!==void 0?e.wrapX:!0}),this.on,this.once,this.un,this.loader_=L1,this.format_=e.format||null,this.overlaps_=e.overlaps===void 0?!0:e.overlaps,this.url_=e.url,e.loader!==void 0?this.loader_=e.loader:this.url_!==void 0&&(Er(this.format_,"`format` must be set when `url` is set"),this.loader_=sO(this.url_,this.format_)),this.strategy_=e.strategy!==void 0?e.strategy:koe;const t=e.useSpatialIndex!==void 0?e.useSpatialIndex:!0;this.featuresRtree_=t?new nR:null,this.loadedExtentsRtree_=new nR,this.loadingExtentsCount_=0,this.nullGeometryFeatures_={},this.idIndex_={},this.uidIndex_={},this.featureChangeKeys_={},this.featuresCollection_=null;let r,i;Array.isArray(e.features)?i=e.features:e.features&&(r=e.features,i=r.getArray()),!t&&r===void 0&&(r=new $a(i)),i!==void 0&&this.addFeaturesInternal(i),r!==void 0&&this.bindFeaturesCollection_(r)}addFeature(e){this.addFeatureInternal(e),this.changed()}addFeatureInternal(e){const t=Dt(e);if(!this.addToIndex_(t,e)){this.featuresCollection_&&this.featuresCollection_.remove(e);return}this.setupChangeEvents_(t,e);const r=e.getGeometry();if(r){const i=r.getExtent();this.featuresRtree_&&this.featuresRtree_.insert(i,e)}else this.nullGeometryFeatures_[t]=e;this.dispatchEvent(new kd(Gs.ADDFEATURE,e))}setupChangeEvents_(e,t){t instanceof aa||(this.featureChangeKeys_[e]=[hr(t,In.CHANGE,this.handleFeatureChange_,this),hr(t,s0.PROPERTYCHANGE,this.handleFeatureChange_,this)])}addToIndex_(e,t){let r=!0;if(t.getId()!==void 0){const i=String(t.getId());if(!(i in this.idIndex_))this.idIndex_[i]=t;else if(t instanceof aa){const s=this.idIndex_[i];s instanceof aa?Array.isArray(s)?s.push(t):this.idIndex_[i]=[s,t]:r=!1}else r=!1}return r&&(Er(!(e in this.uidIndex_),"The passed `feature` was already added to the source"),this.uidIndex_[e]=t),r}addFeatures(e){this.addFeaturesInternal(e),this.changed()}addFeaturesInternal(e){const t=[],r=[],i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s],l=Dt(o);this.addToIndex_(l,o)&&r.push(o)}for(let s=0,a=r.length;s<a;s++){const o=r[s],l=Dt(o);this.setupChangeEvents_(l,o);const c=o.getGeometry();if(c){const u=c.getExtent();t.push(u),i.push(o)}else this.nullGeometryFeatures_[l]=o}if(this.featuresRtree_&&this.featuresRtree_.load(t,i),this.hasListener(Gs.ADDFEATURE))for(let s=0,a=r.length;s<a;s++)this.dispatchEvent(new kd(Gs.ADDFEATURE,r[s]))}bindFeaturesCollection_(e){let t=!1;this.addEventListener(Gs.ADDFEATURE,function(r){t||(t=!0,e.push(r.feature),t=!1)}),this.addEventListener(Gs.REMOVEFEATURE,function(r){t||(t=!0,e.remove(r.feature),t=!1)}),e.addEventListener(gs.ADD,r=>{t||(t=!0,this.addFeature(r.element),t=!1)}),e.addEventListener(gs.REMOVE,r=>{t||(t=!0,this.removeFeature(r.element),t=!1)}),this.featuresCollection_=e}clear(e){if(e){for(const r in this.featureChangeKeys_)this.featureChangeKeys_[r].forEach(si);this.featuresCollection_||(this.featureChangeKeys_={},this.idIndex_={},this.uidIndex_={})}else if(this.featuresRtree_){this.featuresRtree_.forEach(r=>{this.removeFeatureInternal(r)});for(const r in this.nullGeometryFeatures_)this.removeFeatureInternal(this.nullGeometryFeatures_[r])}this.featuresCollection_&&this.featuresCollection_.clear(),this.featuresRtree_&&this.featuresRtree_.clear(),this.nullGeometryFeatures_={};const t=new kd(Gs.CLEAR);this.dispatchEvent(t),this.changed()}forEachFeature(e){if(this.featuresRtree_)return this.featuresRtree_.forEach(e);this.featuresCollection_&&this.featuresCollection_.forEach(e)}forEachFeatureAtCoordinateDirect(e,t){const r=[e[0],e[1],e[0],e[1]];return this.forEachFeatureInExtent(r,function(i){const s=i.getGeometry();if(s instanceof aa||s.intersectsCoordinate(e))return t(i)})}forEachFeatureInExtent(e,t){if(this.featuresRtree_)return this.featuresRtree_.forEachInExtent(e,t);this.featuresCollection_&Û®=ã®Ê×¬¢h­µçJÊŠŠOÌNŒ
_K
KÙOHLKYOLÙ›ÜŠÛÛœÝYHÙˆŠ^ØÛÛœÝ\YK™Ù]›Ü\Y\Ê
KÙÙ[ÛY]žN‹‹‘ŸORÚYŠ‹›Û™Ý
^ØÛÛœÝ™OQ‹›Û™ÝOXÝ›Û™Ï‰Þ™K›Øš™XÝ\_OÜÝ›Û™Ï‚ˆ]ˆ]K]›Û™ÝZYH‰Þ™KšYHÙ]‚ˆœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒÝ›Û™Ï“X]\šXX[ÜÝ›Û™Ïˆ	Þ™K›X]\šX[OÜÜ[‚ˆœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒÝ›Û™Ï”\š[ÙNÜÝ›Û™Ïˆ	Þ™Kœ\š[ÙOÜÜ[‚ˆ	Þ™K™\Øœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒÝ›Û™Ï‘Y\NÜÝ›Û™Ïˆ	Þ™K™\HÛOÜÜ[˜ˆˆŸBˆ	Þ™K˜ÛÛ™][Û‰‰ž™K˜ÛÛ™][ÛˆOOH“Û˜™ZÙ[™Øœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒÝ›Û™ÏÛÛ™]YNÜÝ›Û™Ïˆ	Þ™K˜ÛÛ™][ÛŸOÜÜ[˜ˆˆŸBˆ	Þ™KÙZYÚØœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒÝ›Û™Ï‘Ù]ÚXÚÜÝ›Û™Ïˆ	Þ™KÙZYÚHÜ˜[OÜÜ[˜ˆˆŸBˆ	Þ™K››Ý\ÏØœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒÝ›Û™Ï“›Ý]Y\ÎÜÝ›Û™Ïˆ	Þ™K››Ý\ßOÜÜ[˜ˆˆŸBˆœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KM‰Û™]È]J™K[Y\Ý[\
KÓØØ[Q]TÝš[™Ê››S“Š_OÜÜ[˜Ù]œ\Ú
JKÝœ\Ú
[
KYJ™KšY
NØÛÛ[Y_ZYŠ‹›^Y\•\OOOH˜Ý\ÝÛTÚ[‰‰‘‹˜Ý\ÝÛTÚ[
^ØÛÛœÝ™OQ‹˜Ý\ÝÛTÚ[OQ‹˜Ý\ÝÛS^Y\“˜[Y_“ZZ›ˆXYÈ‹Q‹˜Ý\ÝÛS^Y\ÛÛÜŸˆÙŽMÌÌMˆŽÛ]XÝ›Û™Ï‰ÓÙ
J_OÜÝ›Û™Ïœ‹Ï˜ÚYŠ™KœÜ\ÛÛ[ÝŠÏ^™KœÜ\ÛÛ[ŠŠÏXÝ›Û™ÈÝ[OH˜ÛÛÜŽ‰ÓÙ

_H‰ÓÙ
™K›˜[YJ_OÜÝ›Û™Ï˜™K˜Ø]YÛÜžI‰ž™K˜Ø]YÛÜžHOOH“Ý™\šYÈ‰‰ŠŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒÝ›Û™ÏØ]YÛÜšYNÜÝ›Û™Ïˆ	ÓÙ
™K˜Ø]YÛÜžJ_OÜÜ[˜
JK™KœÛ™J^ØÛÛœÝ[™J™KœÛ™JNÝŠÏXœ‹ÏH™YH[‰ÓÙ

_HˆÛ\ÜÏH^\ÛH^X›YKMŒÝ™\Ž[™\›[™H‰ÓÙ
™KœÛ™J_OØO˜ZYŠ™K››Ý\É‰ˆ^™KœÜ\ÛÛ[	‰ŠŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH‰ÓÙ
™K››Ý\Ê_OÜÜ[˜
K™K\›
^ØÛÛœÝXÍ™J™K\›
NÑ	‰ŠŠÏXœ‹ÏH™YH‰ÓÙ

_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H^\ÛH“YY\ˆ[™›ÏØO˜
_]ŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KM‰Û™]È]J™K˜Ü™X]Y]
KÓØØ[Q]TÝš[™Ê››S“Š_OÜÜ[˜]œ\Ú
ŠKÝœ\Ú
Ú\ÓÝÛ“^Y\ŽˆLÝ\ÝÛTÚ[™YŽžÛ^Y\’Y‘‹˜Ý\ÝÛS^Y\’YÚ[Yž™KšY_JNØÛÛ[Y_ZYŠ‹›^Y\•\OOOHš[\ÜY^Y\ˆŠ^ØÛÛœÝ™OR”ŠŠNÙ]œ\Ú
™JKÝœ\Ú
ÙÙ[ÛY]žN’™J
K›Ü\Y\Î‘‹Ü\[ž™K\ÓÝÛ“^Y\ŽˆLJNØÛÛ[Y_ZYŠŠŠJ^ØÛÛœÝ™OUJŠNÙ]œ\Ú
™JKÝœ\Ú
ÙÙ[ÛY]žN’™J
K›Ü\Y\Î‘‹Ü\[ž™_JKÜ‹OLKUÙI‰—ÜOOL	‰ŠÙOHLYOY]›[™Ý›Š™K˜ÛÛÜ™[˜]KË‹‹™]KË‹‹™ÝJJNØÛÛ[Y_ZYŠ‹››ÛYÙ[‰‰‘‹\\Ú]J^ØÛÛœÝ™OQ‹››ÛYÙ[Ÿ™\ØÚ\›YÙXšYY‹J‹\\Ú]_ˆŠKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê˜Û\ÜÈŠNÛ]XÝ›Û™ÈÛ\ÜÏH^YÜ™Y[‹N‰Þ™_OÜÝ›Û™Ï˜ÚYŠŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ™Y[‹MÌ‰ÔÈ”Ú]HÛ\ÜðêH
ÝšZÝ™\ØÚ\›Y
HŽˆ”Ú]H[œØÜš]
™\ØÚ\›Y
HŸOÜÜ[˜‹™]XÜ™XI‰ŠŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML™\ØÚ\›YÚ[™Îˆ	Ñ‹™]XÜ™X_OÜÜ[˜
K‹œÝ\™™ÛJ^ØÛÛœÝ[J‹œÝ\™™ÛKÌYM
KÑš^Y
JNÝŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML“Ü\›ZÝNˆ	Ó[ŸHOÜÜ[˜ZYŠ‹™Ù\Ý›ÛJ^ØÛÛœÝ[Q‹™Ù\Ý›ÛKœ™\XÙJ‘‘PS‹ˆŠKœÜ]
ˆHŠVÌNÝŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML”™YÚ[Îˆ	Ó[ŸOÜÜ[˜]ŠÏIÏ]ˆÛ\ÜÏH›]LˆLˆ›Ü™\‹]›Ü™\‹YÜ˜^KLŒ‰ËŠÏIÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰ËÝŠÏHÝ›Û™Ï”Ú]HÛ\ÜðêOÜÝ›Û™ÏŽˆÛÙÜÝH™\ØÚ\›Z[™ÜÛš]™X]H[ˆœ˜[šÜšZšËˆÙY[ˆÚZžšYÚ[™Ù[ˆÙYÙ\ÝX[ˆ›Û™\ˆÜXÚX[H™\™Ý[›š[™Ëˆ™\™Ù[ZšØ˜X\ˆY]™Y\›[™ÈšZšÜÛ[Û[Y[ˆŽŠÏHÝ›Û™Ï”Ú]H[œØÜš]ÜÝ›Û™ÏŽˆ™\ØÚ\›YÙXšYYØX\ˆÚZžšYÚ[™Ù[ˆ[Ù][ˆÛÜ™[ˆÙ[Y[ˆZ[™\ˆÝ™[™È[ˆÚ]HÛ\ÜðêKˆ‹ŠÏHÜÜ[Ù]ˆ‹ŠÏIÏ]ˆÛ\ÜÏH›]LˆH™YHšÎ‹ËÙœ‹ÚZÚ\YXK›Ü™ËÝÚZÚKÔÚ]WØÛ\ÜÉPÌÉPNWÛÝWÚ[œØÜš]Êœ˜[˜ÙJHˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H^^È“YY\ˆÝ™\ˆÚ]\ÈÛ\Üðê\ÏØOÙ]‰Ë]œ\Ú
ŠKÝœ\Ú
ÙÙ[ÛY]žN’™J
K›Ü\Y\Î‘‹Ü\[ŸJNØÛÛ[Y_ZYŠ‹›^Y\•\OOOHœ›ÛYZ[œÑ›ÜŸ‹›^Y\•\OOOHœ›ÛYZ[œÑ›ÜZ›ˆŠ^ØÛÛœÝ™OQ‹“˜[Y_‹›˜[Y_ˆ‹OV“ÙVÞ™W_[R_“ÙNÛ]XÝ›Û™ÈÛ\ÜÏH^\™YN‰ÒOÔ›˜X[Nž™_”›ÛYZ[œÈ›ÜŸOÜÝ›Û™Ï˜ÚYŠŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\™YMÌ‰ÔSÙVÔ\W_\_OÜÜ[˜ŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KML‰Ôœ\š[Ù_OÜÜ[˜‹›^Y\•\OOOHœ›ÛYZ[œÑ›ÜZ›ˆ‰‰ŠŠÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\™YMŒ¼'äãHÙ\™XÛÛœÝYY\™H›ÜÛ]™ZÏÜÜ[‰ÊKŠÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ]LH›ØÚÈ‰Ô˜™\ØÚšZš[™ßOÜÜ[˜OË˜œ›Û›™[‰‰’K˜œ›Û›™[‹›[™ÝŒ
^ØÛÛœÝRK˜œ›Û›™[–ÌKœ™\XÙJ×šÏÎ—×ËËˆŠKœÜ]
‹ÈŠVÌNÝŠÏXœ‹ÏH™YH‰ÒK˜œ›Û›™[–Ì_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H^^È‰ÑOØO˜Y]œ\Ú
ŠKÝœ\Ú
ÙÙ[ÛY]žN’™J
K›Ü\Y\Î‘‹Ü\[ŸJNØÛÛ[Y_[]Q‹›˜[Y_‹“˜[Y_‹›˜X[_‹]_‹“PS_‹“SQ_‹›X™[‹œ›Ý]WÛ˜[Y_‹œ›ØYÛ˜[YNÞ
‹›Z\Ý\™OOOHœ^YÜ›Ý[™ÞH”ÜY[Z[ˆŽ‘‹›Z\Ý\™OOOHœ\šÈÞH”\šÈŽ‘‹›Z\Ý\™OOOHœÝÚ[[Z[™×Ø\™XHŸ‹œÜÜOOHœÝÚ[[Z[™ÈÞH–Ù[\ZÈŽ‘‹Ý\š\ÛOOOH›]\Ù][HÞH“]\Ù][HŽ‘‹˜[Y[š]OOOH˜ØY™HŸ‹˜[Y[š]OOOHœ™\Ý]\˜[ÞQ‹˜[Y[š]OOOH˜ØY™HÈØY°êHŽˆ”™\Ý]\˜[Ž‘‹š\ÝÜšXÏOOH˜Ø\ÝHÞH’Ø\ÝY[ŽžH’[™›ÈŠK
‹˜[šÙ\—Ý\_‹›˜[YI‰Š‹›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê˜[šÙ\ˆŠ_‹›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\ÊšØ^™[X]Š_‹›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\ÊœØÚZ[X]ÈŠJJI‰ŠH[šÙ\ˆŠK‹š\ÝÜšXÏOOH˜˜]YšY[‰‰ŠH’\ÝÜš\ØÚÛYÝ™[ŠNÛ]™OXÝ›Û™Ï‰ÞOÜÝ›Û™Ï˜›HLNÚYŠ‹˜Ø]YÛÜžI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒØ]YÛÜšYNˆ	Ñ‹˜Ø]YÛÜž_OÜÜ[˜
K‹™œ›ÛWÝÉ‰‘‹™œ›ÛWÝÈOO^	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‰Ñ‹™œ›ÛWÝßOÜÜ[˜
K‹œ›Ý]I‰‘‹œ›Ý]HOO^	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‰Ñ‹œ›Ý]_OÜÜ[˜
K‹œÙYÛY[Ù\Z[HOO]›ÚY	‰Š‹\OOOH“XZ[ˆ›ØYŸ‹\OOOH”ÙXÛÛ™\žH›ØYŠJ^ØÛÛœÝ™OQ‹\OOOH“XZ[ˆ›ØYÈ”›ÛYZ[œÙHÛÙ™ÙYÈŽˆ”ÙXÝ[™Z\™H›ÛYZ[œÙHÙYÈ‹^ÐÙ\Z[Žˆž™ZÙ\ˆ˜XðêH‹ÛÛš™XÝ\™Yˆ™\›[ÙY[ZšÈ˜XðêH‹\Ý]XØ[ˆš\Ý]\ØÚ˜XðêHŸVÔÝš[™Ê‹œÙYÛY[Ù\Z[JW_Ýš[™Ê‹œÙYÛY[Ù\Z[JNÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û[YY][H^\™YMÌ‰Þ™_OÜÜ[˜™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ“YÙÚ[™Îˆ	ÔOÜÜ[˜\[Ùˆ‹—Û[™Ý[’ÛOOH›[X™\ˆ‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ“[™ÝHÙYÛY[ˆ	Ñ‹—Û[™Ý[’ÛKÑš^Y
Š_HÛOÜÜ[˜
K‹š][™\˜\žI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ”›Ý]Xœ›ÛŽˆ	Ñ‹š][™\˜\ž_OÜÜ[˜
K‹˜šX›[ÙÜ˜\I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMLœ›ÛŽˆ	Ñ‹˜šX›[ÙÜ˜\_OÜÜ[˜
_ZYŠ‹•ÔÓ’QSI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN‰Ñ‹•ÔÓ’QS_OÜÜ[˜‹”PUÉ‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ñ‹”PUßOÜÜ[˜
JK
‹PT‘Õ’S‘‹X\™Ýš[™
I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌX\™ˆ	Ñ‹PT‘Õ’S‘‹X\™Ýš[™OÜÜ[˜
K‹‘QÒS—ÔT‰‰‘‹‘RS‘ÔT‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ”\š[ÙNˆ	Ñ‹‘QÒS—ÔTŸHH	Ñ‹‘RS‘ÔTŸOÜÜ[˜
K
‹PT‘ÓÔ_‹X\™ÛÜY\ŠI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ][XÈ‰Ñ‹PT‘ÓÔ_‹X\™ÛÜY\ŸOÜÜ[˜
K‹‘Ù[YY[I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‘Ù[YY[Nˆ	Ñ‹‘Ù[YY[_OÜÜ[˜
K‹œ›Û‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMLœ›ÛŽˆ	Ñ‹œ›ÛŸOÜÜ[˜
K‹œ›Û—Ø™\ØÚ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ñ‹œ›Û—Ø™\ØÚOÜÜ[˜
K‹‘]ÜÝÞ‰‰‘‹‘]ÙZWÞ‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ‘]\š[™Îˆ	Ñ‹‘]ÜÝÞŸHH	Ñ‹‘]ÙZWÞŸOÜÜ[˜
K‹™YÚ[‰‰‘‹‘Z[™I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ”\š[ÙNˆ	Ñ‹™YÚ[ŸHH	Ñ‹‘Z[™_OÜÜ[˜
K‹•Z]\ØX\™	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û‰Ñ‹•Z]\ØX\™OÜÜ[˜
K‹œš]šY\‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^X›YKMŒ”š]šY\Žˆ	Ñ‹œš]šY\ŸOÜÜ[˜
K‹™\ØÚšZšI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ‰Ñ‹™\ØÚšZš_OÜÜ[˜
K‹›Z\Ý\™OOOHœ\šÈŠ^Ó›HL™OXÝ›Û™ÈÛ\ÜÏH^YÜ™Y[‹N‰Ñ‹›˜[Y_”\šÈŸOÜÝ›Û™Ï˜™JÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KN”\šÏÜÜ[‰Ë‹™\ØÜš\[Û‰‰Š™JÏX]ˆÛ\ÜÏH›]Lˆ^\ÛH^YÜ˜^KMÌ‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
K‹˜\™XI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ“Ü\›ZÝNˆ	Ñ‹˜\™X_OÜÜ[˜
NØÛÛœÝOV×NÚYŠ‹™ÙÏOOHžY\È‰‰’Kœ\Ú
’Û™[ˆÙYÙ\ÝX[ˆŠK‹›]OOHžY\È‰‰’Kœ\Ú
•™\›XÚŠK‹˜™[˜ÚOOHžY\È‰‰’Kœ\Ú
˜[šÚ™\ÈŠKK›[™ÝŒ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‰ÒKš›Ú[Šˆ8 (ˆŠ_OÜÜ[˜
K‹›Ü\˜]Ü‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML™ZY\Žˆ	Ñ‹›Ü\˜]ÜŸOÜÜ[˜
K™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•\›ÛÜˆ]XÝYOÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ‘Ü›Ù[™H™\˜›Z™œÜZÚÙ[ˆšZ›ˆÜ[Z\ˆšZˆ]XÝÜš\Ý[‹ˆY[œÙ[ˆ™\›Y^™[ˆY\ˆ][[ˆ[ˆÚY\˜Y[‹ˆœ˜XYÈY\œÝÙ\Ý[[Z[™ÈX[ˆHÙ[YY[HÙˆ™ZY\™\‹Ù]‰Ë‹ÙXœÚ]J^ØÛÛœÝQ‹ÙXœÚ]Kœ™\XÙJ×šÏÎ—×ËËˆŠKœÜ]
‹ÈŠVÌNÛ™JÏX]ˆÛ\ÜÏH›]LˆH™YH‰Ñ‹ÙXœÚ]_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H^\ÛH‰ÔOØOÙ]˜_Y[ÙH‹›Z\Ý\™OOOHœ^YÜ›Ý[™‰‰Š›HL™OXÝ›Û™ÈÛ\ÜÏH^[Ü˜[™ÙKN‰Ñ‹›˜[Y_”ÜY[Z[ˆŸOÜÝ›Û™Ï˜™JÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KN”ÜY[Z[ÜÜ[‰Ë‹™\ØÜš\[Û‰‰Š™JÏX]ˆÛ\ÜÏH›]Lˆ^\ÛH^YÜ˜^KMÌ‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
JNÚYŠ‹Ý\š\ÛOOOH›]\Ù][HŸ‹›]\Ù][J^Ó›HLØÛÛœÝ™OQ‹›˜[Y_“]\Ù][H‹OQ‹›]\Ù][_–È›]\Ù][N\H—_ˆ‹RI‰’HOOHžY\ÈÞØ\ˆ’Ý[œÝ]\Ù][H‹\ÝÜžNˆ‘Ù\ØÚYY[š\Û]\Ù][H‹\˜ÚY[ÛÙÞNˆ\˜Ú[ÛÙÚ\ØÚ]\Ù][H‹ØÚY[˜ÙNˆ•Ù][œØÚ\Û]\Ù][H‹XÚ›ÛÙÞNˆ•XÚšYZÛ]\Ù][H‹˜]\™Nˆ“˜]]\›]\Ù][H‹Ü[—ØZ\Žˆ“Ü[›XÚ]\Ù][H‹ØØ[ˆ”Ý™YZÛ]\Ù][H‹Z[]\žNˆ“Z[]Z\ˆ]\Ù][H‹˜Z[Ø^Nˆ”ÜÛÜÙYÛ]\Ù][H‹X\š][YNˆ“X\š]Y[H]\Ù][H‹Ú[™[Žˆ’Ú[™\›]\Ù][HŸVÒKÓÝÙ\Ø\ÙJ
W_Nˆ“]\Ù][HŽÚYŠ™OXÝ›Û™ÈÛ\ÜÏH^\\œKN‰Þ™_OÜÝ›Û™Ï˜™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMŒ‰ÝŸOÜÜ[˜‹™\ØÜš\[Û‰‰Š™JÏX]ˆÛ\ÜÏH›]Lˆ^\ÛH^YÜ˜^KMÌ‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
K‹™™YJ^ØÛÛœÝQ‹™™YOOOHžY\ÈÈ•ÙYØ[™ÜÜšZœÈŽ‘‹™™YOOOH››ÈÈ‘Ü˜]\ÈÙYØ[™ÈŽ‘‹™™YNÛ™JÏX]ˆÛ\ÜÏH›]LˆÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‰ÑOÜÜ[Ù]˜ZYŠ‹›Ü[š[™×ÚÝ\œÊ^ØÛÛœÝXÕŠÝš[™Ê‹›Ü[š[™×ÚÝ\œÊJNÛ™JÏX]ˆÛ\ÜÏH›]LˆÜ[ˆÛ\ÜÏH^^È^YÜ™Y[‹MŒ“Ü[Žˆ	ÑOÜÜ[Ù]˜ZYŠ‹ÙXœÚ]_‹\›
^ØÛÛœÝQ‹ÙXœÚ]_‹\›Û™JÏX]ˆÛ\ÜÏH›]LHH™YH‰ÑHˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H^\ÛH™^›ÙZÈ	Þ™_OØOÙ]˜ZYŠ‹ÚZÚ\YXJ^ØÛÛœÝQ‹ÚZÚ\YXKœÜ]
ŽˆŠVÌ_››‹[Q‹ÚZÚ\YXKœÜ]
ŽˆŠVÌW_‹ÚZÚ\YXNÛ™JÏX]ˆÛ\ÜÏH^\ÛHH™YHšÎ‹ËÉÑKÚZÚ\YXK›Ü™ËÝÚZÚKÉÙ[˜ÛÙUT’PÛÛ\Û™[
[Š_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H“YY\ˆ[™›ÈÜÚZÚ\YXOØOÙ]˜ZYŠ–È˜YŽœÝ™Y]—_–È˜YŽšÝ\Ù[[X™\ˆ—_–È˜YŽ˜Ú]H—J^ÚYŠ™JÏIÏ]ˆÛ\ÜÏH›]Lˆ^^È^YÜ˜^KM‰Ë–È˜YŽœÝ™Y]—_–È˜YŽšÝ\Ù[[X™\ˆ—J^ØÛÛœÝVÑ–È˜YŽœÝ™Y]—K–È˜YŽšÝ\Ù[[X™\ˆ—WK™š[\Š›ÛÛX[ŠKš›Ú[ŠˆŠNÑ	‰Š™JÏX	ÑOœ‹Ï˜
_Q–È˜YŽ˜Ú]H—I‰Š™JÏX	Ñ–È˜YŽœÜÝÛÙH—_ˆŸH	Ñ–È˜YŽ˜Ú]H—_X
K™JÏHÙ]ˆŸ_ZYŠ‹›Z\Ý\™OOOHœÝÚ[[Z[™×Ø\™XHŸ‹œÜÜOOHœÝÚ[[Z[™ÈŸ‹›˜]\˜[OOH˜™XXÚŠ^Ó›HL™OXÝ›Û™ÈÛ\ÜÏH^XÞX[‹N‰Ñ‹›˜[Y_–Ù[\ZÈŸOÜÝ›Û™Ï˜ØÛÛœÝOQ‹›˜]\˜[OOH˜™XXÚÈ”Ý˜[™Ž‘‹›Z\Ý\™OOOHœÝÚ[[Z[™×Ø\™XHÈ–Ù[\ZÈŽˆ–Ù[]Ø]\ˆŽÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KN‰Ò_OÜÜ[˜‹Ø]\‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ‰ÞÛZÙNˆ“YY\ˆ‹š]™\Žˆ”š]šY\ˆ‹Û™ˆ•šZ™\ˆ‹™\Ù\›Ú\Žˆ”™\Ù\›Ú\ˆ‹Ø[˜[ˆ’Ø[˜X[ŸVÑ‹Ø]\—_‹Ø]\ŸOÜÜ[˜
K‹œÝ\\š\ÙYOOHžY\È‰‰Š™JÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ™Y[‹MÌ“Y]Ù^šXÚÜÜ[‰ÊK‹˜Ú[™Ú[™×Ü›ÛÛ\ÏOOHžY\È‰‰Š™JÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ’ÛYYZ[]HX[Ù^šYÏÜÜ[‰ÊK‹™\ØÜš\[Û‰‰Š™JÏX]ˆÛ\ÜÏH›]Lˆ^\ÛH^YÜ˜^KMÌ‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
K™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•\›ÛÜˆ]XÝYOÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ–Ù[\ZÚÙ[ˆÝ[›™[ˆ[\™\ÜØ[šZ›ˆ›ÛÜˆ]XÝYKˆY[œÙ[ˆ™\›Y^™[ˆY\ˆÚY\˜Y[ˆ[ˆ][[‹ˆ]ÜˆšY]Ý™\˜[\È]XÝ\™[ˆÙYÙ\ÝX[‹Ù]‰ßZYŠ‹›ÜÛWÚY	‰‘‹˜Y™\ÜÈOO]›ÚY	‰Š™JÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^[[YKMÌ’Üš[™ÛÛÜÚ[šÙ[ÜÜ[‰Ë‹˜Y™\ÜÉ‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ñ‹˜Y™\ÜßOÜÜ[˜
K‹œÛ™I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Ñ‹œÛ™_OÜÜ[˜
JK‹œÚ]WÝ\OOOH[][\ÈŠ^Ó›HLØÛÛœÝ™O\YK™Ù]Ù[ÛY]žJ
OË™Ù]ÛÛÜ™[˜]\Ê
NÛ]OHˆ‹HˆŽÚYŠ™J^ØÛÛœÝRŠ™JK]–ÌK[]–ÌWNÑKI‰‘‹ŒÉ‰“[L‰‰“[L‹OÊOH•™[]ÙH‹H‘H™[]ÙHYYHÜ›ÛÝÝHÛÛ˜Ù[˜]YHÜ˜Yš]]™[È˜[ˆ™Y\›[™ˆ™Y[]]™[ÈYÙÙ[ˆ[ˆÜ˜Y™[[ˆY]Y[[[ˆ]]™[ÈšZˆ[ØX\‹ˆŠN‘‹Œ‰‰‘ËŒI‰“[L‹‰‰“[LËŒÏÊOH‘™[H‹H‘™[H\È™\›Ù[YÛHšZ›ˆ™Z\ÝÜš\ØÚH[Û[Y[[‹ˆ˜X\Ý[™X™Y[ˆYÙÙ[ˆY\ˆÛ™\™[ˆÜ˜Yš]]™[ÈZ]Hœ›ÛœÝZ™ˆŠN‘I‰‘‰‰“[LKŒÉ‰“[LKŽOÊOH“›ÛÜ™Pœ˜X˜[‹H“ÜHœ˜X˜[ÙH˜[™Ü›Û™[ˆYÙÙ[ˆ™Y[Ü˜Yš]]™[Ë˜XZÈ[ˆÛZ[™HÜ›Ù\™\ÈÜÙÙ\™HÜ›Û™[‹ˆŠN‘KI‰‘‹ŒÉ‰“[LÉ‰“[LKÊOH“[X\™È‹H‘H[X\™ÜÙH]]™[È[ˆ]X]\È\˜™\™Ù[ˆÜ˜Yš]]™[ÈZ]™\œØÚ[[™H\š[Ù\Ë˜[ˆœ›ÛœÝZ™Ý›ÛYZ[œÙHZ™ˆŠN‘I‰‘K‰‰“[L‰‰“[L‹	‰ŠOH•]™XÚÙH]]™[YÈ‹H‘HÝ]ÝØ[[ˆ˜[ˆH]™XÚÙH]]™[YÈ[ˆ]ÛÛÚHØ\™[ˆ[[ˆH™Z\ÝÜšYH™]ÛÛÛ™ˆÜ˜Yš]]™[ÈX\šÙ\™[ˆHX]ÝH\ÝX]È˜[ˆHœ›ÙYÙH™]ÛÛ™\œËˆŠ_[™JÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^X[X™\‹MÌ‘Ü˜Yš]]™[Z]Hœ›ÛœÝZ™ÙˆRž™\Z™ÜÜ[‰ËI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KML‰Ò_OÜÜ[˜
K™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]šYH™HY\ÏÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‘Y[ˆÜ˜Yš]]™[\ÈY[ˆÝ[œÝX]YÙH]]™[Ý™\ˆY[ˆÙˆYY\™\™HÜ˜]™[‹ˆHYY\ÝH™Y\›[™ÙHÜ˜Yš]]™[ÈšZ›ˆÌÝ˜X\ˆÝYZ]Hœ›ÛœÝZ™
ŒN‹Ú‹ŠHÙˆœ›ÙYÙHRž™\Z™Ù]‰Ë	‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“Ý™\ˆ^™H™YÚ[ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÔOÙ]˜
K™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN’ÙH\šÙ[ˆ™HY[ˆÜ˜Yš]]™[ÏÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‘Ü˜Yš]]™[ÈšZ›ˆ˜XZÈ›Û™KYÙH]]™[È˜[ˆLLÌY]\ˆÛÜœÛ™YH[ˆKLÈY]\ˆÛÙËˆ™HYÙÙ[ˆYY\Ý[Ü˜[™Ü›Û™[‹˜XZÈ[ˆÜ›Ù\™\È
Ü˜Y™[[ŠKˆ]ÜHÙ[›Y\šÙ[™H›Û™H›Ü›H[ˆ][™ØÚ\Ù]‰Ë‹ÚZÚY]OÊ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“YY\ˆ[™›Ü›X]YOÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LHH™YHšÎ‹ËÝÝÝËÚZÚY]K›Ü™ËÝÚZÚKÉÑ‹ÚZÚY]_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H™ZÚZšÈÜÚZÚY]OØOÙ]˜
NŠ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“YY\ˆ[™›Ü›X]YOÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LHH™YHšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÑÜ˜Yš]]™[ˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H“Y\ÈYY\ˆÝ™\ˆÜ˜Yš]]™[ÈÜÚZÚ\YXOØOÙ]‰Ê_ZYŠ‹š\ÝÜšXÏOOH˜Ø\ÝHŸ‹˜Ø\ÝWÝ\J^Ó›HLØÛÛœÝ™O^ÛX[›ÜŽžÛX™[ˆ“[™Z\È‹Z]YÎˆ‘Y[ˆ[™Z\ÈÙˆ]™^˜]HØ\È]ÛÛÛšZ\È˜[ˆY[ˆY[ZšÙH˜[Z[YKˆ˜XZÈY]Y[ˆ[™ÛÙY\›ÛZY[‹ˆ‹›Û™Ý[Žˆ”ÚY\˜Y[‹Ù\Ü[‹][[‹X\™]Ù\šÈ˜[ˆšZšÙH™]ÛÛ™\œÈŸKÝ][NžÛX™[ˆ”Ý]YÈZ\È‹Z]YÎˆ‘Y[ˆÜ›ÛÝ[ˆYYÈÛÛÛšZ\Ë˜XZÈ˜[ˆÙ[Ù\Ý[H˜[Z[Y\ËˆÛÛ\ÈY]Ø\ÝY[XÚYÙHÙ[›Y\šÙ[‹ˆ‹›Û™Ý[Žˆ’Z\ÚÝY[ZšÙH›ÛÜÙ\œ[‹][[‹Û›Ü[‹X\™]Ù\šÈŸK›Ü™\ÜÎžÛX™[ˆ‘›ÜÕ™\Ý[™È‹Z]YÎˆ‘Y[ˆ™\œÝ\šÝHZ[]Z\™H›Ý]ÝÙ\šËÙX›Ý]ÙÛHY[ˆÙXšYYH™\™YYÙ[‹ˆ‹›Û™Ý[Žˆ“Z[]Z\™H›ÛÜÙ\œ[‹ÛÙÙ[ËÙ\Ü[‹[šY›Ü›[Û™\™[[ˆŸKY™[œÚ]™NžÛX™[ˆ•™\™YYÚ[™ÜÚØ\ÝY[‹Z]YÎˆ‘Y[ˆØ\ÝY[ÙX›Ý]Ù›ÛÜˆ™\™YYÚ[™ËY]ZÚÙH]\™[‹Y[ˆÜ˜XÚ[ˆÜ™[œËˆ‹›Û™Ý[Žˆ•Ø\[œË\›˜\ÛÛ™\™[[‹Z›[[‹ZY[Y]]ÜÙH][[ˆŸK[XÙNžÛX™[ˆ”[Z\È‹Z]YÎˆ‘Y[ˆÜ›ÛÝ[ˆ^Y]\ÈÙX›Ý]È›ÛÜˆÛÛš[™Ù[‹š[œÙ[ˆÙˆ™Y\ˆšZšÙH˜[Z[Y\Ëˆ‹›Û™Ý[Žˆ“^H›ÛÜÙ\œ[‹ÚY\˜Y[‹™YÙ[Ë™[˜[YH][[ˆŸKØ\Ý[NžÛX™[ˆ”›ÛYZ[œÈ›Ü‹Z]YÎˆ‘Y[ˆ›ÛYZ[œÈYÙ\šØ[\Ùˆ›Üˆ^™HšZ›ˆšZ›˜HŒ˜X\ˆÝYH‹›Û™Ý[Žˆ”›ÛYZ[œÙH][[‹šX[YKZ[]\šXKX\™]Ù\šÈŸKÚ]Y[žÛX™[ˆÚ]Y[‹Z]YÎˆ‘Y[ˆÝ\šÈ™\œÝ\šÝHÙ\›ˆš[›™[ˆY[ˆÝY[ÈX]ÝH™\™YYÚ[™ÜÛ[šYKˆ‹›Û™Ý[Žˆ“Z[]Z\™H›ÛÜÙ\œ[ˆZ]™\œØÚ[[™H\š[Ù\ÈŸ_KOQ‹˜Ø\ÝWÝ\OÞ™VÑ‹˜Ø\ÝWÝ\WN›[ROË›X™[’Ø\ÝY[ŽÚYŠ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ‰ÔOÜÜ[˜‹œÝ\Ù]I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML›Ý]Ú˜X\Žˆ	Ñ‹œÝ\Ù]_OÜÜ[˜
K‹š\š]YÙI‰Š™JÏIÏœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^X[X™\‹MÌ”šZšÜÛ[Û[Y[ÜÜ[‰ÊK™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]šYH™HY\ÏÜÜ[Ù]‰ËOÛ™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÒKZ]YßOÙ]˜›™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‘Y[ˆ\ÝÜš\ØÚØ\ÝY[ÙˆY[ZšÈZ\ËˆØ\Ý[[ˆØ\™[ˆ˜XZÈ]ZY[[˜[ˆXXÚ[ˆšZšÙÛH[ˆY[ˆÙXšYYÙ]‰Ë™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]Ý[ˆ™HY\ˆš[™[ÏÜÜ[Ù]‰ËOÛ™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÒK›Û™Ý[ŸOÙ]˜›™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH“][[‹ÚY\˜Y[‹Ù\Ü[‹X\™]Ù\šÈ[ˆ[™\™H›ÛÜÙ\œ[ˆ˜[ˆHœ›ÙYÙ\™H™]ÛÛ™\œËÙ]‰Ë‹ÚZÚ\YX_‹ÙXœÚ]J^ÚYŠ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“YY\ˆÙ][ÏÜÜ[Ù]‰Ë‹ÚZÚ\YXJ^ØÛÛœÝQ‹ÚZÚ\YXKœÝ\ÕÚ]
šŠOÑ‹ÚZÚ\YXN˜Î‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÉÑ‹ÚZÚ\YXKœ™\XÙJ×››‹ËˆŠ_XÛ™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LHH™YH‰ÝŸHˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•ÚZÚ\YXOØOÙ]˜Q‹ÙXœÚ]I‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LHH™YH‰Ñ‹ÙXœÚ]_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•ÙXœÚ]H™^›ÙZÙ[ØOÙ]˜
__ZYŠ‹š\ÝÜšXÏOOHœZ[œÈŠ^ØÛÛœÝ™OQ‹œZ[œ×Ý\_ˆŽÛ]OH”pëÛ™H‹H‘Y[ˆpëÛ™H\ÈØ]Ý™\˜›Z™˜[ˆY[ˆÝYÙX›Ý]Ëˆ]Ø[ˆY[ˆÙ\šËØ\ÝY[[Û[ˆÙˆ[™\ˆ›Ý]ÝÙ\šÈšZ›ˆÙ]ÙY\Ýˆ‹H˜ZÜÝY[™œ˜YÛY[[‹X\™]Ù\šËY][[ˆ›ÛÜÙ\œ[ˆ˜[ˆœ›ÙYÙ\™H™]ÛÛ™\œÈÙˆÙXœZZÙ\œÈŽÚYŠ™KÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê˜Ú\˜ÚŠ_™KÓÝÙ\Ø\ÙJ
Kš[˜ÛY\ÊšÙ\šÈŠOÊOH’Ù\šÜpëÛ™H‹H‘HÝ™\˜›Z™œÙ[[ˆ˜[ˆY[ˆÝYHÙ\šËˆ˜XZÈ›ÙÈH\šÙ[›™[ˆX[ˆH[™\š[™ÈÙˆY[ˆX\ˆ]\™[‹ˆ‹H”™[YÚY]^™H›ÛÜÙ\œ[‹][[ˆ˜[ˆÙ\šÙØ[™Ù\œËÛ›Ü[‹Ù\Ü[ˆŠNž™KÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê˜Ø\ÝHŠ_™KÓÝÙ\Ø\ÙJ
Kš[˜ÛY\ÊšØ\ÝY[ŠOÊOH’Ø\ÝY[pëÛ™H‹H‘H™\Ý[ˆ˜[ˆY[ˆZY[Y]]ÜÈØ\ÝY[ˆÛÛ\È\È[Y[ˆHÜ˜XÚÙˆ[™\š[™È›ÙÈšXÚ˜X\‹ˆ‹H“ZY[Y]]ÜÙH][[‹ÚY\˜Y[‹\›˜\ÛÛ™\™[[‹Z›[[ˆŠNž™KÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê›Z[Š_™KÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê›[Û[ˆŠOÊOH“[Û[œpëÛ™H‹H•Ø]™\Ý˜[ˆY[ˆÝYH[Û[‹ˆ˜XZÈ›ÙÈHšY[ˆX[ˆHÝ[™[ˆ[™\š[™ÈÙˆH[Û[˜™\™Ëˆ‹H‘Ù\™YYØÚ\][[‹Z\ÚÝY[ZšÙH›ÛÜÙ\œ[ˆŠNž™KÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê™›ÜŠI‰ŠOH‘›ÜpëÛ™H‹H‘HÝ™\˜›Z™œÙ[[ˆ˜[ˆY[ˆZ[]Z\ˆ›ÜÙˆ™\™YYÚ[™ÜÝÙ\šËˆ‹H“Z[]Z\™H›ÛÜÙ\œ[‹ÛÙÙ[ËÙ\Ü[‹[šY›Ü›[Û™\™[[ˆŠK™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^X[X™\‹MÌ‰Ò_OÜÜ[˜™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]šYH™HY\ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÔOÙ]˜™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]Ý[ˆ™HY\ˆš[™[ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÝŸOÙ]˜‹™\ØÜš\[Û‰‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN™\ØÚšZš[™ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
K‹ÚZÚ\YXJ^ØÛÛœÝQ‹ÚZÚ\YXKœÝ\ÕÚ]
šŠOÑ‹ÚZÚ\YXN˜Î‹ËÉÑ‹ÚZÚ\YXKœÜ]
ŽˆŠVÌ_››ŸKÚZÚ\YXK›Ü™ËÝÚZÚKÉÑ‹ÚZÚ\YXKœ™\XÙJ×–ØK^—^ÌŸN‹ËˆŠ_XÛ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“YY\ˆÙ][ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH“Y\ÈYY\ˆÜH™YH‰ÑHˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•ÚZÚ\YXOØOÙ]˜_ZYŠ‹˜[šÙ\—Ý\_‹›˜[YI‰Š‹›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê˜[šÙ\ˆŠ_‹›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\ÊšØ^™[X]Š_‹›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\ÊœØÚZ[X]ÈŠJJ^Ó›HLØÛÛœÝ™O^Û][š][ÛœÎˆ“][š]YX[šÙ\ˆ‹\œÛÛ›™[ÜÚ[\Žˆ”\œÛÛ™Y[ÜØÚZ[X]È‹\œÛÛ™[ÜÚ[\Žˆ”\œÛÛ™Y[ÜØÚZ[X]È‹ÛÛ[X[™ˆÛÛ[X[™Ø[šÙ\ˆ‹Ý[—Ù[\XÙ[Y[ˆ‘Ù\ØÚ]Ø[šÙ\ˆ‹Y×Û™\Ýˆ“Z]˜Z[]\œÛ™\Ý‹XÚšXØ[ˆ•XÚš\ØÚH[šÙ\ˆ‹ÝÜ˜YÙNˆ“ÜÛYØ[šÙ\ˆ‹ØœZÎˆ•ØœZÈ‹Ø^™[X]ˆ’Ø^™[X]‹›ZÎˆ“XÚYÙY\œÝ[[™È‹\™[™YØZ\˜Ü˜YÜÚ[\Žˆ•›YYÝZYÜÚ[\ˆ‹Ú[\Žˆ”ØÚZ[Ù[\ˆ‹ØœÙ\˜][ÛŽˆ“ØœÙ\˜]YX[šÙ\ˆ‹[WØZ\˜Ü˜Yˆ“XÚYÙY\œÝ[[™ÈŸKOQ‹›˜[Y_ˆ‹Q‹˜[šÙ\—Ý\OÞ™VÑ‹˜[šÙ\—Ý\W_‹˜[šÙ\—Ý\NˆˆŽÒI‰’HOOH[šÙ\ˆ‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KMÌ‰Ò_OÜÜ[˜
K	‰”OORI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰ÔOÜÜ[˜
NØÛÛœÝ\YK™Ù]Ù[ÛY]žJ
OË™Ù]ÛÛÜ™[˜]\Ê
NÛ]Hˆ‹[Hˆ‹\HˆŽÚYŠŠ^ØÛÛœÝšORŠŠKYOTšVÌKOTšVÌWKÙOVYOŽYOKŒ‰‰œOLKŽ	‰œOLËKYOVYOŒ‰‰–YO	‰œOL‰‰œOL‹ŒMKÝVYOI‰–YOÉ‰œOL‹	‰œOL‹K]VYO	‰–YOŒ‰‰œOLKŽMI‰œOL‹ŒKVYOŒ‰‰œOLK‹ÛVYOKŒ‰‰–YOKŽ	‰œOLKŽI‰œOL‹ŒÎÔYOÊH‘^™H[šÙ\ˆXXZÝY[Z]˜[ˆH][ZÝØ[šZˆØÚ]™[š[™Ù[‹ˆHZ]Ù\œÈ›Ý]Ù[ˆY\ˆZ™[œÈÓÒRH›ÉÛˆ[šÙ\œÈ[ˆHZ[™[‹ˆH]\™[ˆšZ›ˆÛÛ\ÈÈY]\ˆZÈ™]Û‹ˆ›ÛÜˆ^™H[šÙ\œÈ[Ù\Ý[ˆLÎŒY[œÙ[ˆZ][ˆXYÈ[ˆØÚ]™[š[™Ù[ˆ[ˆZ\È™\›][‹ˆ‹[HšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÐ][ZÝØ[Ó]\Ù][WÔØÚ]™[š[™Ù[ˆ‹\H][ZÝØ[]\Ù][HØÚ]™[š[™Ù[ˆŠNœÝÊH‘^™H[šÙ\ˆÛÜšZˆ™\Ý[™ÈR›]ZY[‹Y[ˆ˜[ˆHØX\œÝ™\™YYÙH[[ˆ˜[ˆH][ZÝØ[ˆHZ]Ù\œÈ›Ý]Ù[ˆY\ˆ[šÙ\œÈÛHH]™[ÙYØ[™ÈH™\ØÚ\›Y[‹ˆ\ˆšZ›ˆH›Û™ZY[™Ù[ˆÛÜˆ][šÙ\›]\Ù][Kˆ‹[HšÎ‹ËÝÝÝË˜[šÙ\›]\Ù][K››È‹\H[šÙ\›]\Ù][HR›]ZY[ˆŠNœ]ÊH‘^™H[šÙ\ˆXXZÝY[Z]˜[ˆH][ZÝØ[šZˆÙZÈ˜[ˆÛ[™ˆ]Ø\ÈY[ˆÝ˜]YÚ\ØÚ[›ÛÜˆHZ]Ù\œÈ˜[ÙYÙHHšY]]ÙHØ]\ÙYËˆ™Y[[šÙ\œÈšZ›ˆ›ÙÈH™^›ÙZÙ[‹ˆ‹[HšÎ‹ËÝÝÝË˜][ZÝØ[ÙZÝ˜[šÛ[™››È‹\H][ZÝØ[ÙZÈ˜[ˆÛ[™ŠN“ÊH‘^™H[šÙ\ˆÛÜšZˆH][ZÝØ[[ˆ™Y[[™ˆHZ]Ù\œÈ™\™YYÙ[ˆY\ˆHÙ\Ý\œØÚ[H[ˆHÝ\ÝˆšZˆ›Ý][[™H[ˆÙ\ÝØ\[HšZ›ˆ™Y[[šÙ\œÈ™]ØX\™ÙX›]™[‹ˆ‹[HšÎ‹ËÝÝÝË˜[šÙ\›]\Ù][^›Ý][[™K››È‹\H[šÙ\›]\Ù][H›Ý][[™HŠN—ÙOÊH‘^™H[šÙ\ˆXXZÝY[Z]˜[ˆH][ZÝØ[ˆHZ]ÙH™\™YYÚ[™ÜÛ[šYH[™ÜÈH[HÝ\Ý˜[ˆ]\›ÜKˆ[ˆ™Y\›[™›Ý]Ù[ˆHZ]Ù\œÈZ^™[™[ˆ[šÙ\œÈ\ÜÙ[ˆNMˆ[ˆNMˆ‹[HšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÐ][ZÝØ[‹\H][ZÝØ[
ÚZÚ\YXJHŠNÛÊH‘^™H[šÙ\ˆÛÜ[ÙÙ[ZšÈšZˆHÜ™X˜™[[šYHÙˆHšY]]ÙHÛ[™ÙHØ]\›[šYKˆ]Ø\™[ˆ™Y\›[™ÙH™\™YYÚ[™ÜÛ[šY\ÈYHHZ]Ù\œÈ˜HNM™\œÝ\šÝ[ˆY][šÙ\œËˆ‹[HšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÑÜ™X˜™[[šYH‹\H‘Ü™X˜™[[šYH
ÚZÚ\YXJHŠNŠH‘Y[ˆ[šÙ\ˆZ]HÙYYHÙ\™[ÛÜ›ÙËˆHYY\ÝH[šÙ\œÈ[ˆ™Y\›[™šZ›ˆÙX›Ý]Ù\ÜÙ[ˆNM[ˆNM[ÈÛ™\™Y[˜[ˆHZ]ÙH™\™YYÚ[™ÈÙˆ[™ÜÈ™\ÝX[™H™Y\›[™ÙH[šY\Ëˆ‹[HšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÐ][ZÝØ[‹\H•ÓÒRH[šÙ\œÈ
ÚZÚ\YXJHŠ_Y[ÙHH‘Y[ˆ[šÙ\ˆZ]HÙYYHÙ\™[ÛÜ›ÙËˆ‹[HšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÐ][ZÝØ[‹\H•ÓÒRH[šÙ\œÈ
ÚZÚ\YXJHŽÛ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]šYH™HY\ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÑOÙ]˜™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]Ý[ˆ™Hš[™[ÏÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LHšZˆ[šÙ\œÈÛÜ™[ˆÛÛ\È›ÛÜÙ\œ[ˆÙ]›Û™[ˆ›Ø[È]›Û™[‹[šY›Ü›ZÛ›Ü[‹Ù\Ü[ˆ[ˆ\œÛÛÛ›ZšÙHÜ[[ˆ˜[ˆÛÛ][‹Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH›]Lˆ^^È^YÜ˜^KML][XÈ“]Üˆ™]™YY›ÛÚ]Y[ˆ[šÙ\ˆ›Û™\ˆÙ\Ý[[Z[™Ëˆ˜XZÈ][š]Y\™\Ý[ˆšY]X[‹Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KNœ›Û›™[ÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ë™JÏXH™YH‰Ó[ŸHˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H‰Û\ŸOØO˜‹ÙXœÚ]OÛ™JÏXœ‹ÏH™YH‰Ñ‹ÙXœÚ]_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•˜XÙ\ÓÙ•Ø\ØO˜›™JÏIÏœ‹ÏH™YHšÎ‹ËÝÝÝË˜XÙ\ÛÙØ\‹››Èˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•˜XÙ\ÓÙ•Ø\ØO‰Ë™JÏHÙ]ˆŸZYŠ‹š\ÝÜšXÏOOH˜˜]YšY[Š^Ó›HLØÛÛœÝ™OQ‹›˜[Y_“Û˜™ZÙ[™ÛYÝ™[‹^È”ÛYÈÛH\›š[HŽžÜ\š[ÙNˆ”Ù\[X™\ˆNM‹Ø[Y[˜][™Îˆ‘HÛYÈÛH\›š[HØ\ÈÛ™\™Y[˜[ˆÜ\˜]YHX\šÙ]Ø\™[‹ˆÙX[YY\™H\˜XÚ]\Ý[ˆ›Ø™Y\™[ˆHœYÈÝ™\ˆHšZ›ˆH™\›Ý™\™[‹ˆ˜H™YÙ[ˆYÙ[ˆ]šYÙHÙ]™XÚ[ˆ[Ù\Ý[ˆ™HšXÚ\YÝ™ZÚÙ[‹ˆ˜[ˆHLŒœš]ÙHÛÛ][ˆÙ\™[ˆ\ˆKLÙYÛÙ[ˆ‹LÜšZ™ÜÙÙ]˜[™Ù[ˆÙ[XXZÝˆ‹Ø]šYR™Nˆ‘\ˆšZ›ˆ™Y[[Û[Y[[ˆ[ˆ[™›Ø›Ü™[‹ˆ]Z\˜›Ü›™H]\Ù][H[ˆÛÜÝ\˜™YZÈ™\[][H™\šX[ˆ[È˜X\ˆ[ˆÙ\[X™\ˆ\È\ˆY[ˆ\™[šÚ[™Ëˆ‹Z]ÛÛ\Ýˆ‘HÙX[YY\™[ˆ™\›Ü™[ˆHÛYËˆ™Y\›[™›YYˆ›ÙÈÝYZHNMH™^™]ˆ‹ÚZÚU\›ˆšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÔÛY×ÛÛWÐ\›š[HŸK”ÛYÈÛHHÛÙY[HŽžÜ\š[ÙNˆŒKLˆ›Ý™[X™\ˆNM‹Ø[Y[˜][™ÎˆØ[˜Y\ÙHÛÛ][ˆšY[[ˆHÛÙY[HX[ˆÛHØ[Ú\™[ˆH™]œšZ™[‹ˆH[HØ\ÈÛX[[ˆHZ]Ù\œÈ™\™YYÙ[ˆ™[ˆ™Y[ÛÛ][ˆÛ™]]™[[ˆšZˆ^™H›ÙYYÙHX[˜[ˆ‹Ø]šYR™NˆšZˆH[HÝX]Y[ˆ[Û[Y[›ÛÜˆHÙ]˜[[ˆØ[˜Y^™[‹ˆ\ˆšZ›ˆ[™›Ø›Ü™[ˆYHHÛYÈZ]YÙÙ[‹ˆ‹Z]ÛÛ\Ýˆ‘HØ[˜Y^™[ˆÛÛ›™[ˆ˜HØ\™H™\›Y^™[‹ˆ]Ü[™HHÙYÈ˜X\ˆH™]œšZ™[™È˜[ˆØ[Ú\™[‹ˆ‹ÚZÚU\›ˆšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÔÛY×ÛÛWÙWÔÛÙY[HŸK”ÛYÈšZˆZ[YÙ\›YH
MMŽ
HŽžÜ\š[ÙNˆŒŒÈYZHMMŽ‹Ø[Y[˜][™Îˆ‘HY\œÝH™[ÛYÈ˜[ˆHXÚYÚ˜\šYÙHÛÜ›ÙËˆÙ]ÚZšÈ˜[ˆ˜\ÜØ]H™\œÛÙYÈ]ÜX[œÙHYÙ\‹ˆšZ›ˆœ›Ù\ˆYÛˆÛ™]]™[HZ™[œÈHÝšZ™ˆ‹Ø]šYR™Nˆ’[ˆZ[YÙ\›YHÝX]]ÛYÈšZˆZ[YÙ\›YH[Û[Y[ˆ]ÛÛÜÝ\ˆØX\ˆYÛˆ˜[ˆ˜\ÜØ]H™YÜ˜]™[ˆYÝ\È›ÙÈH™^›ÙZÙ[‹ˆ‹Z]ÛÛ\Ýˆ‘HÜÝ[™[[™Ù[ˆÛÛ›™[‹XX\ˆ]Ø\È\È]™YÚ[ˆ˜[ˆ˜X\ˆÛÜ›ÙËˆ‹ÚZÚU\›ˆšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÔÛY×ØšZ—ÒZ[YÙ\›YWÊMMŽ
HŸKÝ™\›ÛÛŽžÜ\š[ÙNˆ“ÚÝØ™\ˆNM‹Ø[Y[˜][™ÎˆšZˆÝ™\›ÛÛˆ›ØÚ[ˆœš][ˆ[ˆ[Y\šZØ[™[ˆYÙ[ˆHZ]Ù\œËˆ]Ø\ÈY[ˆ˜[ˆHØX\œÝH[šÙÙ]™XÚ[ˆÜ™Y\›[™ÙH›Ù[Kˆ]ÜœÙ\™›ÛYYÈ™\ÛÙ\Ýˆ‹Ø]šYR™Nˆ’]ÛÜ›ÙÜÛ]\Ù][HÝ™\›ÛÛˆÝX]Ü]›ÛÜ›X[YÙHÛYÝ™[ˆ™HÝ[[šÜË›YYÝZYÙ[ˆ[ˆ[™\™H›Ù\ZYÙ[ˆšY[‹ˆ‹Z]ÛÛ\Ýˆ‘HÙX[YY\™[ˆÛÛ›™[ˆ˜HÙZÙ[›[™ÙHÙ]™XÚ[‹ˆ‹ÚZÚU\›ˆšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÔÛY×ÛÛWÓÝ™\›ÛÛˆŸK”ÛYÝ™[[˜ZÙ\™[ŽžÜ\š[ÙNˆŒMMŽ‹Ø[Y[˜][™Îˆ“Û™\™Y[˜[ˆH™Y\›[™ÙHÜÝ[™YÙ[ˆÜ[š™KˆY\ˆ›Û™[ˆÙ]™XÚ[ˆX]ÈZ™[œÈH™YÚ[š˜\™[ˆ˜[ˆHXÚYÚ˜\šYÙHÛÜ›ÙËˆ‹Ø]šYR™Nˆ’]ÙXšYY\ÈHÜ›Ý[™Y[È[™›Ý]ÙÜ›Û™ˆÚØX[šZ›ˆ\ˆÛÛ\È[™›Ø›Ü™[‹ˆ‹Z]ÛÛ\Ýˆ“Û™\™Y[˜[ˆH[™ÙHÝšZ™YÙ[ˆHÜX[œÙHÝ™\šY\œÚ[™Ëˆ‹ÚZÚU\›ˆšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÕXÚYÚ˜\šYÙWÓÛÜ›ÙÈŸK›\ÜÙXœYÜØÚ[œÎžÜ\š[ÙNˆ‘]™\œÙH\š[Ù\È‹Ø[Y[˜][™Îˆ‘Y[ˆ\ÝÜš\ØÚHØÚ[œÈYHYY\™\™HÙ\™[ˆÙ\™ÙXœZZÝ[ˆZ[]Z\™HÛÛ™›XÝ[‹ˆ‹Ø]šYR™Nˆ‘H™\Ý[ˆ˜[ˆHØÚ[œÈšZ›ˆ›ÙÈšXÚ˜X\ˆ[ˆ][™ØÚ\ˆ‹Z]ÛÛ\Ýˆ‘HØÚ[œÈÜY[HY[ˆ›Û[ˆ™\œØÚ[[™HÛÛ™›XÝ[‹ˆ‹ÚZÚU\›ˆšÎ‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÔØÚ[œ×Ê™\Ý[™ÝÙ\šÊHŸ_VÞ™WNÚYŠ™HOOH“Û˜™ZÙ[™ÛYÝ™[‰‰ž™HOOH’\ÝÜš\ØÚÛYÝ™[‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^\™YMÌ‰Þ™_OÜÜ[˜
K
[™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ôœ\š[Ù_OÜÜ[˜™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]ÙX™]\™HY\ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÔœØ[Y[˜][™ßOÙ]˜™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN’ÙHY\]YÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÔZ]ÛÛ\ÝOÙ]˜™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]Ý[ˆ™HšY[ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÔØ]šYR™_OÙ]˜™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KNœ›Û›™[ÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ë™JÏXH™YH‰ÔÚZÚU\›Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•ÚZÚ\YXOØO˜™Kš[˜ÛY\Ê\›š[HŠI‰Š™JÏIÏœ‹ÏH™YHšÎ‹ËÝÝÝË˜Z\˜›Ü›™[]\Ù][K››Èˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™HZ\˜›Ü›™H]\Ù][HÛÜÝ\˜™YZÏØO‰ÊK™Kš[˜ÛY\Ê“Ý™\›ÛÛˆŠI‰Š™JÏIÏœ‹ÏH™YHšÎ‹ËÝÝÝË›ÛÜ›ÙÜÛ]\Ù][K››Èˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H“ÛÜ›ÙÜÛ]\Ù][HÝ™\›ÛÛØO‰ÊK™JÏHÙ]ˆŽÙ[ÙHYŠ‹™]I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ñ‹™]_OÜÜ[˜
K‹™\ØÜš\[ÛÊ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]ÙX™]\™HY\ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
NŠ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]ÙX™]\™HY\ÏÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH“Ü^™HZÈ›Û™[ˆ\ÝÜš\ØÚHÙ]™XÚ[ˆX]Ëˆ›ÙZÈÚØX[˜X\ˆ[™›Ø›Ü™[ˆÙˆ[Û[Y[[‹Ù]‰ÊK‹ÚZÚ\YXJ^ØÛÛœÝQ‹ÚZÚ\YXKœÝ\ÕÚ]
šŠOÑ‹ÚZÚ\YXN˜Î‹ËÛ›ÚZÚ\YXK›Ü™ËÝÚZÚKÉÑ‹ÚZÚ\YXKœ™\XÙJ››ˆ‹ˆŠ_XÛ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KNœ›Û›™[ÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LHH™YH‰ÝŸHˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•ÚZÚ\YXOØOÙ]˜_ZYŠ‹˜œ›ÛOOH”[[Øš[ÛÙÞH]X˜\ÙHŠ^ØÛÛœÝ™OQOžØÛÛœÝ[^Ó[Û\ØØNˆÙYZÙY\™[ˆ›Ø[ÈØÚ[[ˆ[ˆÛZÚÙ[ˆ‹œ˜XÚ[ÜÙNˆ˜\›\ÝYÙ[‹ØÚ[XXÚYÙHY\™[ˆ‹XÚ[›Ù\›X]NˆœÝZÙ[ZYYÙ[ˆ›Ø[È™YKYYÙ[È[ˆ™Y\Ý\œ™[ˆ‹ÚÜ™]Nˆ™Ù]Ù\™[HY\™[ˆ‹\›ÜÙNˆ™Ù[YYÝYÙ[ˆ›Ø[ÈÜ™YY[ˆ[ˆš[ØšY][ˆ‹ÛšY\šXNˆ›™][Y\™[ˆ›Ø[ÈÛÜ˜[[ˆ[ˆÝØ[[ˆ‹œž[Þ›ØNˆ›[ÜÙY\™\È‹›Ü˜[Z[šY™\˜Nˆ™Y[˜Ù[YÙHØÚ[Y\™[ˆ‹[YNˆœ[[ˆ‹Üš[›ÚYXNˆž™Y[[Y\È‹Ø\Ý›ÜÙNˆœÛZÚÙ[ˆ‹š]˜[šXNˆÙYZÛ\YÙ[ˆ›Ø[È[ÜÜÙ[È[ˆÙ\Ý\œÈ‹Ù\[ÜÙNˆšÛÜÝYÙ[ˆ›Ø[È[šÝš\ÜÙ[ˆ[ˆ[[[ÛšY][ˆ‹š[Øš]Nˆš[ØšY][‹Z]Ù\ÝÜ™[ˆÜ™YYXÚYÙ[ˆ‹X[[X[XNˆž›ÛÙÙY\™[ˆ‹™\[XNˆœ™\Y[[ˆ‹\ØÙ\Îˆš\ÜÙ[ˆ‹[\XšXNˆ˜[YšXšYpêÛˆŸNÙ›ÜŠÛÛœÝÛ\‹šW[ÙˆØš™XÝ™[šY\Ê[ŠJZYŠÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê\‹ÓÝÙ\Ø\ÙJ
JJ\™]\›ˆšNÜ™]\›ˆˆŸKOQOžØÛÛœÝ[^ÐØ[Xœš][NˆMKMHZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹Ü™ÝšXÚ][NˆKMZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹Ú[]\ŽˆMNHZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹]›ÛÛŽˆNKLÍNHZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹Ø\˜›ÛÛŽˆŒÍNKLŽNHZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹\›NˆŒŽNKLLˆZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹šX\ÎˆŒL‹LŒHZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹\˜NˆŒŒKLMHZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹ÜšZˆŒMKMˆZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹[[ÙÙY[Žˆ‹LŒÈZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹™[ÙÙY[ŽˆŒŒËL‹ˆZ[›Ù[ˆ˜X\ˆÙ[Y[ˆ‹ÝØ\Z\ŽˆŒ‹ˆZ[›Ù[ˆ˜X\ˆHH‹Z\ÝØÙY[ŽˆŒ‹ˆZ[›Ù[ˆHLKÌ˜X\ˆÙ[Y[ˆ‹ÛØÙY[ŽˆŒLKÌ˜X\ˆÙ[Y[ˆHHŸNÙ›ÜŠÛÛœÝÛ\‹šW[ÙˆØš™XÝ™[šY\Ê[ŠJZYŠÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê\‹ÓÝÙ\Ø\ÙJ
JJ\™]\›ˆšNÜ™]\›ˆˆŸKQOžØÛÛœÝ[^Û[Y\ÝÛ™NˆšØ[ÜÝY[ˆ‹Ø[™ÝÛ™Nˆž˜[™ÝY[ˆ‹Ú[NˆœØÚ[YH‹Û^NˆšÛZH‹Ø[™ˆž˜[™‹Ü˜]™[ˆ™Üš[™‹X\›ˆ›Y\™Ù[‹Ú[ÎˆšÜšZ‹]YÝÛ™Nˆ›[Ù\œÝY[ˆ‹Ú[ÝÛ™NˆœÚ[ÝY[ˆŸNÛ]\QÙ›ÜŠÛÛœÝÔšKYW[ÙˆØš™XÝ™[šY\Ê[ŠJ[\[\‹œ™\XÙJ™]È™YÑ^
šK™ÚHŠKYJNÜ™]\›ˆ\ŸKQOžØÛÛœÝ[^ÛX\š[™Nˆž™YH‹ÛØ\Ý[ˆšÝ\Ý‹\œ™\ÝšX[ˆ›[™‹›]šX[ˆœš]šY\ˆ‹XÝ\Ýš[™Nˆ›YY\ˆ‹™YYŽˆœšYˆ‹[ZXÎˆ™[H‹Ú[ÝÎˆ›Û™Y\Ø]\ˆ‹Y\ˆ™Y\Ø]\ˆŸNÛ]\QÙ›ÜŠÛÛœÝÔšKYW[ÙˆØš™XÝ™[šY\Ê[ŠJ[\[\‹œ™\XÙJ™]È™YÑ^
šK™ÚHŠKYJNÜ™]\›ˆ\ŸNÚYŠ‹š[™X]É‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Ñ‹š[™X]ßOÜÜ[˜
K™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]\ÈY\ˆÙ]›Û™[ÏÜÜ[Ù]‰Ë‹^Û›ÛZYI‰‘‹^Û›ÛZYHOOH“Û˜™ZÙ[™Š^ØÛÛœÝ^™J‹^Û›ÛZYJNÑÊ™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰ÑOÙ]˜™JÏX]ˆÛ\ÜÏH^^È^YÜ˜^KML][XÈŠ	Ñ‹^Û›ÛZY_JOÙ]˜
N›™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹^Û›ÛZY_OÙ]˜ZYŠ‹˜X[[Ù›ÜÜÚY[[Š^ØÛÛœÝ\\œÙR[
‹˜X[[Ù›ÜÜÚY[[ŠK[QŒLÈ•™Y[›ÜÜÚY[[ˆÙ]›Û™[ˆÜ^™HØØ]YKˆŽ‘ŒLÈ“YY\™\™H›ÜÜÚY[[ˆÙ]›Û™[ˆÜ^™HØØ]YKˆŽ˜	Ñ‹˜X[[Ù›ÜÜÚY[[ŸH›ÜÜÚY[	ÑŒOÈ™[ˆŽˆˆŸHÙ]›Û™[ˆÜ^™HØØ]YK˜Û™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH‰Ó[ŸOÙ]˜ZYŠ‹œ\š[ÙI‰‘‹œ\š[ÙHOOH“Û˜™ZÙ[™Š^Û™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø[›™Y\ˆYY™[ˆ^™HY\™[ÏÜÜ[Ù]‰ÎØÛÛœÝRJ‹œ\š[ÙJNÛ™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹œ\š[Ù_OÙ]˜	‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‰ÑOÙ]˜
K‹›ÝY\™ÛI‰‘‹›ÝY\™ÛHOOH“Û˜™ZÙ[™‰‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ“ÝY\™ÛNˆ	Ñ‹›ÝY\™Û_OÙ]˜
_J‹™Ù\ÝY[_‹™›Ü›X]Y_‹›Z[Y]JI‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN’[ˆØ]›ÛÜˆÙ\ÝY[OÏÜÜ[Ù]‰Ë‹™Ù\ÝY[I‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ô
‹™Ù\ÝY[J_OÙ]˜
K‹™›Ü›X]YI‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‘›Ü›X]YNˆ	Ñ‹™›Ü›X]Y_OÙ]˜‹›Y	‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ[LÈ“Yˆ	Ñ‹›YOÙ]˜
JK‹›Z[Y]I‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ“YY›ÛYÙ]š[™Îˆ	ÝŠ‹›Z[Y]J_OÙ]˜
J_ZYŠ‹›^Y\•\OOOH™›ÜÜÚY[ÝÜÝŠ^ØÛÛœÝ™OV×NÚYŠ‹\I‰ž™Kœ\Ú
‹\JK‹œ™YÚ[Û‰‰ž™Kœ\Ú
‹œ™YÚ[ÛŠK‹˜ÛÝ[žJ^ØÛÛœÝO^Ó“ˆ“™Y\›[™‹‘Nˆ™[ÚpêÈ‹Nˆ‘Z]Û[™‹”Žˆ‘œ˜[šÜšZšÈŸNÞ™Kœ\Ú
VÑ‹˜ÛÝ[žW_‹˜ÛÝ[žJ_ZYŠ™K›[™ÝŒ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Þ™Kš›Ú[Šˆ0­ÈŠ_OÜÜ[˜
K
‹™š[™ß‹œ\š[Ù
I‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]Ø[ˆZÈ\ˆš[™[ÏÜÜ[Ù]‰Ë‹™š[™É‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹™š[™ßOÙ]˜
K‹œ\š[Ù	‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH”\š[ÙNˆ	Ñ‹œ\š[ÙOÙ]˜
K‹™Ù[ÛÙÞI‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH‘Ù[ÛÙÚYNˆ	Ñ‹™Ù[ÛÙÞ_OÙ]˜
JK‹˜XØÙ\Üß‹\Ê^ÚYŠ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN’ÙHÛÛHZÈ\ÏÜÜ[Ù]‰Ë‹˜XØÙ\ÜÊ^ØÛÛœÝQ‹˜XØÙ\ÜËÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê™\˜›Ù[ˆŠ_‹˜XØÙ\ÜËÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê›šY]ÙYØ[šÙ[ZšÈŠOÈ^\™YMŒŽˆ^YÜ˜^KMÌŽÛ™JÏX]ˆÛ\ÜÏH^\ÛH	ÔH]LH‰Ñ‹˜XØÙ\ÜßOÙ]˜Q‹\É‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH][XÈ•\ˆ	Ñ‹\ßOÙ]˜
__ZYŠ‹›^Y\•\OOOH›Z[™\˜[[’ÝÜÝŠ^ØÛÛœÝ™OV×NÚYŠ‹œ™YÚ[Û‰‰ž™Kœ\Ú
‹œ™YÚ[ÛŠK‹˜ÛÝ[žJ^ØÛÛœÝO^Ó“ˆ“™Y\›[™‹‘Nˆ™[ÚpêÈ‹Nˆ‘Z]Û[™‹”Žˆ‘œ˜[šÜšZšÈŸNÞ™Kœ\Ú
VÑ‹˜ÛÝ[žW_‹˜ÛÝ[žJ_ZYŠ™K›[™ÝŒ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Þ™Kš›Ú[Šˆ0­ÈŠ_OÜÜ[˜
K‹›Z[™\˜[É‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]Ø[ˆZÈ\ˆš[™[ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹›Z[™\˜[ßOÙ]˜‹™Ù[ÛÙÞI‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH‘Ù[ÛÙÚYNˆ	Ñ‹™Ù[ÛÙÞ_OÙ]˜
JK‹˜XØÙ\Üß‹\Ê^ÚYŠ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN’ÙHÛÛHZÈ\ÏÜÜ[Ù]‰Ë‹˜XØÙ\ÜÊ^ØÛÛœÝQ‹˜XØÙ\ÜËÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê™\˜›Ù[ˆŠ_‹˜XØÙ\ÜËÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê›šY]ÙYØ[šÙ[ZšÈŠ_‹˜XØÙ\ÜËÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê™Ù\ÛÝ[ˆŠOÈ^\™YMŒŽˆ^YÜ˜^KMÌŽÛ™JÏX]ˆÛ\ÜÏH^\ÛH	ÔH]LH‰Ñ‹˜XØÙ\ÜßOÙ]˜Q‹\É‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH][XÈ•\ˆ	Ñ‹\ßOÙ]˜
__ZYŠ‹›^Y\•\OOOH™ÛÝYš]šY\ˆŠ^ØÛÛœÝ™OV×NÚYŠ‹œš]™\‰‰ž™Kœ\Ú
‹œš]™\ŠK‹œ™YÚ[Û‰‰ž™Kœ\Ú
‹œ™YÚ[ÛŠK‹˜ÛÝ[žJ^ØÛÛœÝO^Ó“ˆ“™Y\›[™‹‘Nˆ™[ÚpêÈ‹Nˆ‘Z]Û[™‹”Žˆ‘œ˜[šÜšZšÈŸNÞ™Kœ\Ú
VÑ‹˜ÛÝ[žW_‹˜ÛÝ[žJ_ZYŠ™K›[™ÝŒ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Þ™Kš›Ú[Šˆ0­ÈŠ_OÜÜ[˜
K
‹™ÛÛ\_‹›ÜšYÚ[ŠI‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]Ø[ˆZÈ\ˆš[™[ÏÜÜ[Ù]‰Ë‹™ÛÛ\I‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹™ÛÛ\_OÙ]˜
K‹›ÜšYÚ[‰‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH’\šÛÛ\Ýˆ	Ñ‹›ÜšYÚ[ŸOÙ]˜
JK‹›YØ[‹\Ê^ÚYŠ™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“XYÈZÈY\ˆ›ÙZÙ[ÏÜÜ[Ù]‰Ë‹›YØ[
^ØÛÛœÝQ‹›YØ[š[˜ÛY\Ê•‘T“ÑSˆŠOÈ^\™YMŒ›Û\Ù[ZX›ÛŽˆ^YÜ˜^KMÌŽÛ™JÏX]ˆÛ\ÜÏH^\ÛH	ÔH]LH‰Ñ‹›YØ[OÙ]˜Q‹\É‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH][XÈ•\ˆ	Ñ‹\ßOÙ]˜
__ZYŠ‹›^Y\•\OOOHØ[™[›Ý]HŠ^ØÛÛœÝ™OV×NÚYŠ‹œ™YÚ[Û‰‰ž™Kœ\Ú
‹œ™YÚ[ÛŠK‹˜ÛÝ[žJ^ØÛÛœÝO^Ó“ˆ“™Y\›[™‹‘Nˆ™[ÚpêÈŸNÞ™Kœ\Ú
VÑ‹˜ÛÝ[žW_‹˜ÛÝ[žJ_ZYŠ™K›[™ÝŒ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Þ™Kš›Ú[Šˆ0­ÈŠ_OÜÜ[˜
K‹™\Ý[˜Ù_‹™\˜][ÛŠ^ØÛÛœÝOQ‹™\Ý[˜ÙOØ	Ñ‹™\Ý[˜Ù_HÛXˆˆ‹Q‹™\˜][ÛØ	Ñ‹™\˜][ÛŸXˆˆ‹VÒKK™š[\Š›ÛÛX[ŠKš›Ú[Šˆ0­ÈŠNÝ‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ™Y[‹MÌ›Û[YY][H‰ÝŸOÜÜ[˜
_J‹™\ØÜš\[ÛŸ‹šYÚYÚÊI‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]ØH™HšY[ÏÜÜ[Ù]‰Ë‹™\ØÜš\[Û‰‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
K‹šYÚYÚÉ‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ]LH’ÛÙÝ\[[Žˆ	Ñ‹šYÚYÚßOÙ]˜
JK‹œÝ\Y™\ÜÉ‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•ØX\ˆ™YÚ[ˆZÏÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹œÝ\Y™\ÜßOÙ]˜
K‹\›	‰Š™JÏX]ˆÛ\ÜÏH›]LÈH™YH‰Ñ‹\›Hˆ\™Ù]H—Ø›[šÈˆÛ\ÜÏH^\ÛH^X›YKMŒÝ™\Ž[™\›[™H™ZÚZšÈ›Ý]H[ˆÝÛ›ØYÔØOÙ]˜
_ZYŠ‹›^Y\•\OOOHš[™X™YŠ^Ñ‹œ\š[Ù	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ”\š[ÙNˆ	Ñ‹œ\š[ÙOÜÜ[˜
K™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]šYH™HY\ÏÜÜ[Ù]‰Ë‹™\ØÜš\[Û‰‰Š™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹™\ØÜš\[ÛŸOÙ]˜
NØÛÛœÝ™OV×NÚYŠ‹œÝÛ™\Ê^ØÛÛœÝOQ‹œÝÛ™\ËÓÝÙ\Ø\ÙJ
KRK›X]Ú
Ê
ÊWÊ™ZÜÝ×—ËJ‹ÚJKRK›X]Ú
Ê
ÊWÊ™˜XYÜÝ×—ËJ‹ÚJKRK›X]Ú
Ê
ÊWÊœÛZ]Ý×—ËJ‹ÚJK[RK›X]Ú
Ê
ÊWÊœÛÜÝ×—ËJ‹ÚJK\RK›X]Ú
Ê
ÊWÊ™Ø[™ÙZÜÝ×—ËJ‹ÚJKšORK›X]Ú
Ê
ÊWÊ™Ø[™ÞšZœÝ×—ËJ‹ÚJNÔ	‰ž™Kœ\Ú
	ÔÌW_HZÜÝY[‰Ü\œÙR[
ÌWJOŒOÈ™[ˆŽˆˆŸH
HÜ›ÝHÝY[‰Ü\œÙR[
ÌWJOŒOÈ™[ˆŽˆˆŸH›Ý™[›Ü
X
K‰‰ž™Kœ\Ú
	Ý–ÌW_H˜XYÜÝ[™[ˆ
HÝ[™[ˆYHHZÜÝ[™[ˆ˜YÙ[ŠX
K	‰ž™Kœ\Ú
	ÑÌW_HÛZ]ÝY[‰Ü\œÙR[
ÌWJOŒOÈ™[ˆŽˆˆŸH
YœÛZ][™ÈX[ˆHÛÜHšZ™[ŠX
K[‰‰ž™Kœ\Ú
	Ó[–ÌW_HÛÜÝY[‰Ü\œÙR[
[–ÌWJOŒOÈ™[ˆŽˆˆŸH
šZˆH[™Ø[™ÊX
K\‰‰ž™Kœ\Ú
	Û\–ÌW_HØ[™ÙZÜÝY[‰Ü\œÙR[
\–ÌWJOŒOÈ™[ˆŽˆˆŸH
›Ý™[ˆHÙYØ[™ÜÙØ[™ÊX
KšI‰ž™Kœ\Ú
	ÔšVÌW_HØ[™ÞšZœÝ[™[ˆ
[™ÜÈHÙYØ[™ÜÙØ[™ÊX
_ZYŠ‹›[™Ý	‰ž™Kœ\Ú
Y[ˆÜ˜YšØ[Y\ˆ˜[ˆ	Ñ‹›[™ÝH[™Ø
K‹ÚY	‰ž™Kœ\Ú
	Ñ‹ÚYX
K™K›[™ÝŒ	‰Š™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH’][™X™YYYÙ]‰Ë™JÏIÏ[Û\ÜÏH›\ÝY\ØÈ\ÝZ[œÚYH^\ÛH^YÜ˜^KMÌ]LHÜXÙK^KLH‰Ë™K™›Ü‘XXÚ
OOžÛ™JÏXO‰Ò_OÛO˜JK™JÏHÝ[ˆŠK‹››ÝX›J^ØÛÛœÝOQ‹››ÝX›KÓÝÙ\Ø\ÙJ
NÛ]H•Ø]\ÈY\ˆšZž›Û™\ÈŽÒKš[˜ÛY\Ê™Ü›ÛÝÝHŠOÔH•ØX\›ÛH\È]]Ü›ÛÝÝH[™X™YÈŽ’Kš[˜ÛY\ÊšÛZ[ˆŠ_Kš[˜ÛY\ÊšÚ[™[™X™YŠOÔH•ØX\›ÛH\È][™X™Y›ÈÛZ[ÈŽ’Kš[˜ÛY\Ê˜Û\Ý\ˆŠ_Kš[˜ÛY\Ê›˜X\Ý[ØX\ˆŠOÔH•ØX\›ÛHYÙÙ[ˆY\ˆYY\™\™H[™X™Y[ÈŽŠKš[˜ÛY\Ê™[šYÙHŠ_Kš[˜ÛY\ÊÙ\Ý[ZšÈŠ_Kš[˜ÛY\Ê››ÛÜ™[ZšÈŠJI‰ŠH•Ø]XXZÝ^™HØØ]YHšZž›Û™\ÈŠK™JÏX]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN‰ÔOÜÜ[Ù]˜™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹››ÝX›_OÙ]˜[™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]\ÈH™XÚ\˜™ZÙ\ˆÝ[]\ÏÜÜ[Ù]‰Ë™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‘H™XÚ\˜™ZÙ\ˆÝ[]\ˆ\ÈH˜X[H›ÛÜˆHY[œÙ[ˆYHKŒ˜X\ˆÙ[Y[ˆ[ˆ™Y\›[™ÛÛÛ™[‹ˆ™HXXZÝ[ˆÝ[ˆY]Y[ˆ™XÚ\‹]›Ü›KˆX\›ÛH][ˆ™H›Ëˆ^™HY[œÙ[ˆ›Ý]Ù[ˆH[™X™Y[ˆ[ÈÜ˜]™[ˆ›ÛÜˆ[ˆÙ[‹Ù]‰Ë‹™š[™É‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN•Ø]\ÈY\ˆÙ]›Û™[ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹™š[™ßOÙ]˜
K‹›]\Ù][I‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“]\Ù][H[ˆH]\ÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹›]\Ù][_OÙ]˜
K™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN™^›ÙZÙ[ÜÜ[Ù]‰Ë‹˜XØÙ\ÜÏÛ™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH‰Ñ‹˜XØÙ\ÜßOÙ]˜›™JÏIÏ]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH’™HÝ[][™X™YÜ˜]\È™^›ÙZÙ[‹Ù]‰Ë‹ÚZÚ\YXI‰Š™JÏIÏ]ˆÛ\ÜÏH›]LÈÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û^YÜ˜^KN“YY\ˆÙ][ÏÜÜ[Ù]‰Ë™JÏX]ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ]LH“Y\ÈYY\ˆÜH™YH‰Ñ‹ÚZÚ\YX_Hˆ\™Ù]H—Ø›[šÈˆ™[H››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆˆÛ\ÜÏH^X›YKMŒÝ™\Ž[™\›[™H•ÚZÚ\YXOØOÙ]˜
_ZYŠ
‹š[™[\š\Û[[Y\Ÿ‹›ØØ]YWÛ˜X[JI‰Š‹›ØØ]YWÛ˜X[I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û‰Ñ‹›ØØ]YWÛ˜X[_OÜÜ[˜
K‹š[™[\š\Û[[Y\‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMLÐRNˆ	Ñ‹š[™[\š\Û[[Y\ŸOÜÜ[˜
K‹™]\š[™×ÝZÜÝ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ‰Ñ‹™]\š[™×ÝZÜÝOÜÜ[˜
JK
‹™Y[œÛÛÜ‹™ZÝJI‰Š‹™Y[œÛÛÜ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^X[X™\‹MÌ‰Ñ‹™Y[œÛÛÜOÜÜ[˜
K‹™ZÝI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‘ZÝNˆ	Ñ‹™ZÝ_OÜÜ[˜
JK‹›˜]\™I‰‘‹™X]
^Û™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ‰Ñ‹›˜]\™_OÜÜ[˜ØÛÛœÝ™OQ‹™X]OOQ‹™š[Ñ‹™X]˜	Ñ‹™X]HH	Ñ‹™š[ŸXÞ™I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ”\š[ÙNˆ	Þ™_OÜÜ[˜
K‹œÝXÝ\™I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Ñ‹œÝXÝ\™_OÜÜ[˜
K‹˜ÛÛ[][™I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ñ‹˜ÛÛ[][™_OÜÜ[˜
K‹™XÛÝ]™\	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KM“ÛZÝˆ	Ñ‹™XÛÝ]™\OÜÜ[˜
K‹›[Y\›É‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KM‰Ñ‹›[Y\›ßOÜÜ[˜
_ZYŠ
‹“UT‘WÓÔ_‹ÓÑWÓÔTJI‰Š‹•U‘I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û‰Ñ‹•U‘_OÜÜ[˜
K‹“UT‘WÓÔI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^X[X™\‹MÌ‰Ñ‹“UT‘WÓÔ_OÜÜ[˜
K‹UUUT‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ]]]\Žˆ	Ñ‹UUUTŸOÜÜ[˜
K‹‘UI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‘][Nˆ	Ñ‹‘U_OÜÜ[˜
K‹ÓÓSUS‘I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ñ‹ÓÓSUS‘_OÜÜ[˜
JK‹\WÜ›ÝXÝ[Û‰‰Š‹›—ÜÚ]_‹ÜÚ]JJ^ØÛÛœÝ™OQ‹\WÜ›ÝXÝ[ÛOOHÛ\ÜÙHÈ^\™YMÌŽˆ^X[X™\‹MÌŽÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH	Þ™_H‰Ñ‹\WÜ›ÝXÝ[ÛŸOÜÜ[˜‹›—ÜÚ]I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH›Û\Ù[ZX›Û‰Ñ‹›—ÜÚ]_OÜÜ[˜
K‹ÜÚ]I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Ñ‹ÜÚ]_OÜÜ[˜
K‹˜×ÜÚ]I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMLÛÙNˆ	Ñ‹˜×ÜÚ]_OÜÜ[˜
K‹™ØÜ™X][Û‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KM™\ØÚ\›YÚ[™Îˆ	Ñ‹™ØÜ™X][ÛŸOÜÜ[˜
_ZYŠ‹\WÜ›ÝXÝ[Û‰‰‘‹˜ÛÙÙ\™[Š^ØÛÛœÝ™OQ‹\WÜ›ÝXÝ[ÛOOHÛ\ÜÙHÈ^\™YMÌŽˆ^X[X™\‹MÌŽÚYŠ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH	Þ™_H‰Ñ‹\WÜ›ÝXÝ[ÛŸOÜÜ[˜‹œ›ØÙY	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Ñ‹œ›ØÙYOÜÜ[˜
K‹™Ü›ØÙY	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‘]Nˆ	Ñ‹™Ü›ØÙYOÜÜ[˜
K‹˜ÛÛ[Y[
^ØÛÛœÝOTÝš[™Ê‹˜ÛÛ[Y[
KœÛXÙJML
NÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ][XÈ‰Ò_IÔÝš[™Ê‹˜ÛÛ[Y[
K›[™ÝŒMLÈ‹‹‹ˆŽˆˆŸOÜÜ[˜_ZYŠ‹\WÜ›ÝXÝ[Û‰‰‘‹››Û\Ú]J^ØÛÛœÝ™OQ‹\WÜ›ÝXÝ[ÛOOHÛ\ÜÙHÈ^\™YMÌŽˆ^X[X™\‹MÌŽÚYŠ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH	Þ™_H‰Ñ‹\WÜ›ÝXÝ[ÛŸOÜÜ[˜‹˜Ø\˜XÝ\™I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Ñ‹˜Ø\˜XÝ\™_OÜÜ[˜
K‹™]YXÚ\É‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‘]Nˆ	Ñ‹™]YXÚ\ßOÜÜ[˜
K‹™\ØÜš\[Ê^ØÛÛœÝOTÝš[™Ê‹™\ØÜš\[ÊKœÛXÙJML
NÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ][XÈ‰Ò_IÔÝš[™Ê‹™\ØÜš\[ÊK›[™ÝŒMLÈ‹‹‹ˆŽˆˆŸOÜÜ[˜_ZYŠ‹œÙXÝ]\‰‰‘‹œÝ[J^ÚYŠ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMÌ‰Ñ‹œÙXÝ]\ŸOÜÜ[˜–ÈœÛÝ\Ë\ÙXÝ]\ˆ—I‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ‰Ñ–ÈœÛÝ\Ë\ÙXÝ]\ˆ—_OÜÜ[˜
K‹™\ØÜš\[ÛŠ^ØÛÛœÝ™OTÝš[™Ê‹™\ØÜš\[ÛŠKœÛXÙJML
NÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ][XÈ‰Þ™_IÔÝš[™Ê‹™\ØÜš\[ÛŠK›[™ÝŒMLÈ‹‹‹ˆŽˆˆŸOÜÜ[˜Q‹\›	‰Š™JÏXœ‹ÏH™YH‰Ñ‹\›Hˆ\™Ù]H—Ø›[šÈˆÛ\ÜÏH^^È^X›YKMŒÝ™\Ž[™\›[™H“YY\ˆ[™›ÏØO˜
_ZYŠ‹›˜]\™WÛÜ\˜][ÛŸ‹œÞ[\ÙJ^Ñ‹›˜]\™WÛÜ\˜][Û‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\™YMÌ‰Ñ‹›˜]\™WÛÜ\˜][ÛŸOÜÜ[˜
K‹œ™\ÜÛœØX›WÛÜ\˜][Û‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ”™\ÜÛœØX›Nˆ	Ñ‹œ™\ÜÛœØX›WÛÜ\˜][ÛŸOÜÜ[˜
K‹™]WÛÜ\˜][Û‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‘][Nˆ	Ñ‹™]WÛÜ\˜][ÛŸOÜÜ[˜
NØÛÛœÝ™OV×NÚYŠ‹œ™Z\ÝÚ\™OOOH“ÝZH‰‰ž™Kœ\Ú
”™Z\ÝÜšYHŠK‹œ›ÝÚ\ÝÚ\™OOOH“ÝZH‰‰ž™Kœ\Ú
”›ÝÚ\ÝÜšYHŠK‹˜[\]Z]OOOH“ÝZH‰‰ž™Kœ\Ú
”›ÛYZ[œÈŠK‹›[ÞY[—ØYÙOOOH“ÝZH‰‰ž™Kœ\Ú
“ZY[Y]]Ù[ˆŠK‹[\×Û[Ù\›™\ÏOOH“ÝZH‰‰ž™Kœ\Ú
“[Ù\›™HZ™ŠK™K›[™ÝŒ	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^\\œKMÌ‰Þ™Kš›Ú[Š‹Š_OÜÜ[˜
K‹˜Y™\ÜÙI‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Ñ‹˜Y™\ÜÙ_OÜÜ[˜
K‹œÞ[\ÙJ^ØÛÛœÝOTÝš[™Ê‹œÞ[\ÙJKœÛXÙJŒ
NÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KMŒ][XÈ‰Ò_IÔÝš[™Ê‹œÞ[\ÙJK›[™ÝŒŒÈ‹‹‹ˆŽˆˆŸOÜÜ[˜_ZYŠ‹›Ü\˜]Ü‰‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‰Ñ‹›Ü\˜]ÜŸOÜÜ[˜
KS›Š^ÚYŠ‹›Ü[š[™×ÚÝ\œÊ^ØÛÛœÝ™OXÕŠÝš[™Ê‹›Ü[š[™×ÚÝ\œÊJNÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ™Y[‹MŒ“Ü[Žˆ	Þ™_OÜÜ[˜Q‹ÙXœÚ]I‰Š™JÏXœ‹ÏH™YH‰Ñ‹ÙXœÚ]_Hˆ\™Ù]H—Ø›[šÈˆÛ\ÜÏH^^È^X›YKMŒ[™\›[™H•ÙXœÚ]OØO˜
_ZYŠ‹˜Y—ÜÝ™Y]
^ØÛÛœÝ™OVÑ‹˜Y—ÜÝ™Y]‹˜Y—ÚÝ\Ù[[X™\‹‹˜Y—ÜÜÝÛÙWK™š[\Š›ÛÛX[ŠKš›Ú[ŠˆŠNÛ™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^^È^YÜ˜^KML‰Þ™_OÜÜ[˜XÛÛœÝÚOQ‹™\ØÜš\[ÛŸ‹›Û\ØÚšZš[™ß‹™\ØÜŸ‹š[™›ÎÙÚI‰™ÚHOO^	‰Š™JÏXœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ‰ÙÚ_OÜÜ[˜
K]œ\Ú
™JKÝœ\Ú
ÙÙ[ÛY]žN’™J
K›Ü\Y\Î‘‹Ü\[›™_J_XÛÛœÝÙOY]›[™ÝŒÝVË‹‹™]KÝVË‹‹™ÝNÝÙ_›Š™K˜ÛÛÜ™[˜]KØÝ›Û™ÈÛ\ÜÏH^X›YKN’ØX\[™›Ü›X]YOÜÝ›Û™Ï‚ˆœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KMŒ’[™›Ü›X]YHÜ[[¸ )ÜÜ[˜KÛ[JKUÙI‰ÙI‰•›Š™K˜ÛÛÜ™[˜]KÝÝ
KÙI‰“Ý›[™Ý“YI‰•›Š™K˜ÛÛÜ™[˜]KÝÝ
NØÛÛœÝ][‹™Ù]šY]Ê
K™Ù]™\ÛÛ][ÛŠ
_KÑ™KÙWOX]ØZ]›ÛZ\ÙK˜[
ÒÊ™K˜ÛÛÜ™[˜]K]
KM™J™K˜ÛÛÜ™[˜]JWJNÚYŠ	‹˜Ý\œ™[OOP™J\™]\›ŽØÛÛœÝ™OVË‹‹“ÝK™OVË‹‹ÝNÕ™Kœ\Ú
‹‹‘™JNÙ›ÜŠÛÛœÝYHÙˆ™JX™Kœ\Ú
[
NÚYŠ™K›[™ÝOOL	‰œÙHOO[[
^ØÛÛœÝYOXÝ›Û™ÈÛ\ÜÏH^X›YKN•\œ™Z[ÜÝ›Û™Ï‚ˆœ‹Ï]ˆÛ\ÜÏH›]LˆLˆ›Ü™\‹]›Ü™\‹YÜ˜^KLL›^][\ËXÙ[\ˆØ\LH‚ˆÜ[ˆÛ\ÜÏH^^È^YÜ˜^KM’ÛÙÝNÜÜ[‚ˆÜ[ˆÛ\ÜÏH^\ÛH›Û[YY][H^X›YKMŒ‰ÜÙKÑš^Y
Š_HHTÜÜ[‚ˆÙ]˜Õ™Kœ\Ú
YJK™Kœ\Ú
[
_U™K›[™ÝŒ	‰œÙHOO[[	‰Š™VÌJÏXœ‹Ï]ˆÛ\ÜÏH›]LˆLˆ›Ü™\‹]›Ü™\‹YÜ˜^KLL›^][\ËXÙ[\ˆØ\LH‚ˆÜ[ˆÛ\ÜÏH^^È^YÜ˜^KM’ÛÙÝNÜÜ[‚ˆÜ[ˆÛ\ÜÏH^\ÛH›Û[YY][H^X›YKMŒ‰ÜÙKÑš^Y
Š_HHTÜÜ[‚ˆÙ]˜
NØÛÛœÝQ™K›[™ÝŒÙHOO[[Õ™K›[™ÝŒ	‰Š]Ù_
OÕ›Š™K˜ÛÛÜ™[˜]K™K™K]ÙJNÙ_›Š™K˜ÛÛÜ™[˜]KØÝ›Û™ÈÛ\ÜÏH^YÜ˜^KMÌ’ØX\[™›Ü›X]YOÜÝ›Û™Ï‚ˆœ‹ÏÜ[ˆÛ\ÜÏH^\ÛH^YÜ˜^KML“Ü^™HZÈ\ÈÙY[ˆ[™›Ü›X]YHÙ]›Û™[‹ÜÜ[˜KÛ[KLJ_NÜ™]\›ˆ‹›ÛŠœÚ[\™˜YÈ‹JK‹›ÛŠœÚ[\›[Ý™H‹ÙJK‹›ÛŠœÚ[™ÛXÛXÚÈ‹ÙJK

OOžÛ‹[ŠœÚ[\™˜YÈ‹JK‹[ŠœÚ[\›[Ý™H‹ÙJK‹™Ù]\™Ù][[Y[

KœÝ[K˜Ý\œÛÜHˆ‹‹[ŠœÚ[™ÛXÛXÚÈ‹ÙJ__KÛ—JNØÛÛœÝ	J
OOžÜ
[
KJ[
KË˜Ý\œ™[[[Ë˜Ý\œ™[HLK	‹˜Ý\œ™[
ÏLK	˜Ý\œ™[Ë˜X›Ü

K	˜Ý\œ™[[[ŠLJKÛŠš[ˆŠK™J[
K[ŠLJKYJLJKJ[
K‰‰ŠŸÙJI‰ŠL
ŠKŠLJJ_KšOJ™KJOOžØÛÛœÝUK™[ØÚ]KžKÏUK›Ù™œÙ]žNÝ›OOHš[ˆÒÏMLMLÙÛŠ™[ŠNŠÏŒLL
I‰‰Š
NŠÏLŒÌ
I‰™ÛŠš[ˆŠ_NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÈU	‰ŠŸJI‰ž	‰ššœÞÊ™]ˆ‹Ü™YŽ‘K™]K[X\\™]šY]ÈŽˆLÛ\ÜÓ˜[YNˆ™š^Y‹VÌMLHÝ™\™›ÝËX]]È›Ý[™Y^™Ë]Ú]H^YÜ˜^KNLÚYÝË^›Ü™\ˆ›Ü™\‹YÜ˜^KLŒLÈ‹Ý[NžØ›ÞÚ^š[™Îˆ˜›Ü™\‹X›Þ‹Ý™\™›ÝÕÜ˜\ˆ˜[ž]Ú\™HŸK›ÛNˆœÝ]\È‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKX™]ÙY[ˆ][\ËXÙ[\ˆØ\LˆX‹Lˆ‹Ú[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÛ\ÜÓ˜[YNˆ^\ÛH‹Ú[™[Ž™È”[[ˆÜ^™HZÈŽˆ”[[™›Ü›X]YHŸJK‰‰ššœÞ
˜]Ûˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒLH‹ÛÛXÚÎŠ
OOœ
[
K˜\šXK[X™[Žˆ”ÛZ][ˆ‹Ú[™[ŽššœÞ
[ËÜÚ^™NŒNJ_JW_JK
Ÿ_×JKœÛXÙJÊK›X\

™KJOOššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœKLKH›Ü™\‹]›Ü™\‹YÜ˜^KLL^\ÛH‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Ž“™K›^Y\ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Ž“™K›˜[Y_JK™K™]Z[	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒ‹Ú[™[Ž“™K™]Z[JW_KJJK
Ÿ_×JK›[™ÝŒÉ‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Ž–ÈŠÈ‹
Ÿ_×JK›[™ÝLËˆ[™\™H[[ˆ—_JKšœÞ
˜]Ûˆ‹ØÛ\ÜÓ˜[YNˆËY[]Lˆ›Ý[™Y[È™ËX›YKMŒ^]Ú]HKLˆ^\ÛH›Û[YY][H‹ÛÛXÚÎŠ
OOšË˜Ý\œ™[ËŠ
KÚ[™[Žˆ‘]Z[È™ZÚZšÙ[ˆŸJW_JKšœÞ
ËØÚ[™[Ž•	‰ššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^Y[œÙ]L‹VÌMLH‹[š]X[žÛÜXÚ]NŒK[š[X]NžÛÜXÚ]NŒ_K^]žÛÜXÚ]NŒKÛ”Ú[\‘ÝÛŽ‰ŸJKšœÞÊ›‹™]‹È™]K[X\Y]Z[ÈŽˆLÛ\ÜÓ˜[YNˆ™š^Y›ÝÛKLYLšYÚL‹VÌMLWH™Ë]Ú]H›Ý[™Y]LžÚYÝËLžÝ™\™›ÝËZY[ˆ›^›^XÛÛ‹Ý[NžÙ›ÛÚ^™N˜	ÌM
™[‹ÌL\ZYÚ›OOH™[ÈŽLšŽˆ˜]]È‹X^ZYÚ›OOH™[ÈŽLšŽˆŒÍ]šŸK[š]X[žÞNˆŒL	HŸK[š[X]NžÞNŒK^]žÞNˆŒL	HŸK˜[œÚ][ÛŽžÝ\NˆœÜš[™È‹[\[™ÎŒKÝY™›™\ÜÎŒÌK˜YÎˆžH‹˜YÐÛÛœÝ˜Z[ÎžÝÜŒ›ÝÛNŒK˜YÑ[\ÝXÎ‹ŒËÛ‘˜YÑ[™™šKÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆLÈKLˆ™ËYÜ˜YY[]Ë\ˆœ›ÛKX›YKMLËX›YKMŒ^]Ú]HÝ\œÛÜ‹YÜ˜XˆXÝ]™N˜Ý\œÛÜ‹YÜ˜X˜š[™È›Ý[™Y]^Ù[XÝ[›Û™H‹ÛÛXÚÎŠ
OO™ÛŠ›OOHš[ˆÈ™[Žˆš[ˆŠKÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ›^LHZ[‹]ËL‹Ú[™[Ž–Þ‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH›^\Úš[šËL‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ“™OOžÓ™KœÝÜ›ÜYØ][ÛŠ
KŠ
_KÛ\ÜÓ˜[YNˆœLH^]Ú]KÎÝ™\Ž^]Ú]H˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹˜\šXK[X™[Žˆ•›ÜšYÙHXYÈ‹Ú[™[ŽššœÞ
•‹ÜÚ^™NŒNJ_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^]Ú]KÎ›Û[YY][HZ[‹]ËVÌÌœH^XÙ[\ˆ‹Ý[NžÙ›ÛÚ^™NˆŒÍY[HŸKÚ[™[Ž–ÞŠÌK‹È‹K›[™Ý_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ“™OOžÓ™KœÝÜ›ÜYØ][ÛŠ
KšJ
_KÛ\ÜÓ˜[YNˆœLH^]Ú]KÎÝ™\Ž^]Ú]H˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹˜\šXK[X™[Žˆ•›ÛÙ[™HXYÈ‹Ú[™[ŽššœÞ
ÛËÜÚ^™NŒNJ_JW_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^]Ú]H[˜Ø]H‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Ž“œŸ’[™›ÈŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH›^\Úš[šËL‹Ú[™[Ž–ØÙI‰ˆTËš\ÓÝÛ“^Y\‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ™[]]™H‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ“™OOžÓ™KœÝÜ›ÜYØ][ÛŠ
K™JXYJ_KÛ\ÜÓ˜[YN˜LH˜[œÚ][Û‹XÛÛÜœÈ›^\Úš[šËL›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[›Ý[™YÝ™\Ž˜™Ë]Ú]KÌŒ	ÑOÈ^YÜ™Y[‹LÌŽˆ^]Ú]KÎÝ™\Ž^]Ú]HŸX]Nˆ•Ù]›ÙYÙ[ˆX[ˆZZ›ˆXYÈ‹˜\šXK[X™[Žˆ•Ù]›ÙYÙ[ˆX[ˆZZ›ˆXYÈ‹Ú[™[Ž‘OÚšœÞ
ÝKÜÚ^™NŒMŸJNššœÞ
ŒÜÚ^™NŒMŸJ_JKYI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜XœÛÛ]HšYÚLÜY[]LH‹ML™Ë]Ú]H›Ý[™Y[ÈÚYÝË[È›Ü™\ˆ›Ü™\‹YÜ˜^KLŒKLHZ[‹]ËVÌNHX^]ËVÌŒŒH‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLH^^È^YÜ˜^KM›Û[YY][H‹Ú[™[Žˆ•Ù]›ÙYÙ[ˆX[ŽˆŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ›X^ZVÌŒHÝ™\™›ÝË^KX]]È‹Ú[™[ŽK›X\
™OOššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžŠ™K\™Ù]™K›˜[YJKÛ\ÜÓ˜[YNˆËY[LÈKLKH^[Y^\ÛH^YÜ˜^KMÌÝ™\Ž˜™ËX›YKML›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆËLˆLˆ›Ý[™YY[›^\Úš[šËL‹Ý[NžØ˜XÚÙÜ›Ý[™ÛÛÜŽ“™K˜ÛÛÜŸ_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ[˜Ø]H‹Ú[™[Ž“™K›˜[Y_JW_K™KšÙ^JJ_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜›Ü™\‹]›Ü™\‹YÜ˜^KLL]LHLH‹Ú[™[Ž”ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLˆKLH‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNÝÛÚ[™ÙN“™OO—ÛŠ™K\™Ù]˜[YJKXÙZÛ\Žˆ“˜X[HšY]]ÙHXYË‹‹ˆ‹Û\ÜÓ˜[YNˆËY[LˆKLH^\ÛH›Ü™\ˆ›Ü™\‹YÜ˜^KLŒ›Ý[™Y›ØÝ\Î›Ý][™K[›Û™H›ØÝ\Î˜›Ü™\‹[Ü˜[™ÙKM‹]]Ñ›ØÝ\ÎˆLÛ’Ù^QÝÛŽ“™OOžÓ™KšÙ^OOOH‘[\ˆ‰‰Ýš[J
OÚJ
N“™KšÙ^OOOH‘\ØØ\H‰‰Š
LJKÛŠˆŠJ__JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LH]LH‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎšK\ØX›Yˆ]Ýš[J
KÛ\ÜÓ˜[YNˆ™›^LHLˆKLH^^È™Ë[Ü˜[™ÙKML^]Ú]H›Ý[™Y\ØX›Y›ÜXÚ]KML‹Ú[™[Žˆ•Ù]›ÙYÙ[ˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžÞ
LJKÛŠˆŠ_KÛ\ÜÓ˜[YNˆœLˆKLH^^È^YÜ˜^KMLÝ™\Ž^YÜ˜^KMÌ‹Ú[™[Žˆ[›[Y\ˆŸJW_JW_JNššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOž
L
KÛ\ÜÓ˜[YNˆËY[LÈKLKH^[Y^\ÛH^[Ü˜[™ÙKMŒÝ™\Ž˜™Ë[Ü˜[™ÙKML›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ŒÜÚ^™NŒMJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“šY]]ÙHXYÈXZÙ[‹‹‹ˆŸJW_J_JW_JW_JK	‰ššœÞ
˜H‹Ú™YŽ’\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆ‹Û\ÜÓ˜[YNˆœLKH^X[X™\‹MLÝ™\Ž^X[X™\‹MŒ˜[œÚ][Û‹XÛÛÜœÈ›^\Úš[šËL‹]Nˆ“Ü[ˆÝ™Y]šY]È‹˜\šXK[X™[Žˆ“Ü[ˆÝ™Y]šY]È‹Ú[™[ŽššœÞ
‹ÜÚ^™NŒNJ_JKÉ‰ššœÞ
˜H‹Ú™YŽ“Ë\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆ‹ÛÛXÚÎ“™OO“™KœÝÜ›ÜYØ][ÛŠ
KÛ\ÜÓ˜[YNˆœLH^]Ú]KÎÝ™\Ž^]Ú]H˜[œÚ][Û‹XÛÛÜœÈ›^\Úš[šËL›Ý[™YÝ™\Ž˜™Ë]Ú]KÌŒ‹]Nˆ“˜]šYÙY\ˆ˜X\ˆØØ]YH‹˜\šXK[X™[Žˆ“Ü[ˆ[ˆÛÛÙÛHX\È‹Ú[™[ŽššœÞ
ZÜÚ^™NŒMŸJ_JKšœÞ
[™KÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^]Ú]KÍŒ^LHŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ“™OOžÓ™KœÝÜ›ÜYØ][ÛŠ
K	Š
_KÛ\ÜÓ˜[YNˆœLH^]Ú]KÎÝ™\Ž^]Ú]H˜[œÚ][Û‹XÛÛÜœÈ›^\Úš[šËL›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[›Ý[™YÝ™\Ž˜™Ë]Ú]KÌŒ‹˜\šXK[X™[Žˆ”ÛZ][ˆ‹Ú[™[ŽššœÞ
[ËÜÚ^™NŒMŸJ_JW_JW_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YN˜MKLÈÝ™\™›ÝË^KX]]ÈÙ[XÝ]^Z[‹ZL	Ý›OOH™[È™›^LHŽˆˆŸXÝ[NžÝ\Ù\”Ù[XÝˆ^‹ÙXšÚ]\Ù\”Ù[XÝˆ^ŸK[™Ù\›Ý\ÛTÙ][›™\’Sž××Ú[”[Ÿ_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLˆ›Ü™\‹]›Ü™\‹YÜ˜^KLL›^][\ËXÙ[\ˆØ\Lˆ›^\Úš[šËL‹Ú[™[Ž–ÚšœÞ
Ó‹ÜÚ^™NŒMÛ\ÜÓ˜[YNˆ^YÜ˜^KM›^\Úš[šËLŸJKšœÞ
š[œ]‹Ý\Nˆœ˜[™ÙH‹Z[ŽˆŽ‹X^ˆŒML‹˜[YN™[‹ÛÚ[™ÙN“™OO›œŠ\œÙR[
™K\™Ù]˜[YJJKÛ\ÜÓ˜[YNˆ™›^LHLKH™ËYÜ˜^KLŒ›Ý[™Y[È\X\˜[˜ÙK[›Û™HÝ\œÛÜ‹\Ú[\ˆXØÙ[X›YKMLŸJKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMËN^\šYÚ‹Ý[NžÙ›ÛÚ^™NˆŒŽMÙ[HŸKÚ[™[Ž–Ù[‹‰H—_JW_JK›Ë˜YS^Y\’Y	‰ššœÞ
ßJK	‰œ›‰‰ˆVI‰™›Ë˜YT›ÛHOOHœ™XY‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœM‹M›^Ø\Lˆ›^\Úš[šËL‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžÝ[ŠLJK™JÛÜšYÚ[˜[žÛ˜[YNœ›‹›˜[YKÛ™Nœ›‹œÛ™_ˆ‹›Ý\Îœ›‹››Ý\ßˆ‹\›œ›‹\›ˆŸK˜[YNœ›‹›˜[YKÛ™Nœ›‹œÛ™_ˆ‹›Ý\Îœ›‹››Ý\ßˆ‹\›œ›‹\›ˆŸJ_KÛ\ÜÓ˜[YNˆ™›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ^]Ú]H™ËX›YKMLÝ™\Ž˜™ËX›YKMŒ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
ËÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ™]Ù\šÙ[ˆŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžÚYŠT]
^Ý[ŠL
NÜ™]\›ŸXÊ›^Y\’YœÚ[Y
KŠLJK[ŠLJ_KÛ\ÜÓ˜[YN˜›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ^]Ú]H›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	Ô]È˜™Ë\™YMÌÝ™\Ž˜™Ë\™YNŽˆ˜™Ë\™YMLÝ™\Ž˜™Ë\™YMŒŸXÚ[™[Ž–ÚšœÞ
šÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Ž”]È“›ÙÛXX[ÈŽˆ•™\ÚZ™\™[ˆŸJW_JW_JKI‰	‰™›Ë˜YT›ÛHOOHœ™XY‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœM‹MÜXÙK^KLÈ›Ü™\‹]›Ü™\‹YÜ˜^KLLLÈ›^\Úš[šËLÝ™\™›ÝË^KX]]ÈX^ZVÍLšH‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H^X›YKMŒ‹Ú[™[Žˆ”[™]Ù\šÙ[ˆŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“˜X[H
ˆŸJKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YN–K›˜[YKÛÚ[™ÙN“™OO–™JË‹‹–K˜[YN“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LˆKLKH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKMLŸJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ•[Y›ÛÛ›[[Y\ˆŸJKšœÞ
š[œ]‹Ý\Nˆ[‹[œ][ÙNˆ[‹]]ÐÛÛ\]Nˆ[‹˜[YN–KœÛ™KÛÚ[™ÙN“™OO–™JË‹‹–KÛ™N“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LˆKLKH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKMLŸJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“›Ý]YHŸJKšœÞ
^\™XH‹Ý˜[YN–K››Ý\ËÛÚ[™ÙN“™OO–™JË‹‹–K›Ý\Î“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LMˆLˆKLKH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKML™\Ú^™K[›Û™HŸJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“[šÈŸJKšœÞ
š[œ]‹Ý\Nˆ\›‹˜[YN–K\›ÛÚ[™ÙN“™OO–™JË‹‹–K\›“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LˆKLKH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKMLŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO–™J[
KÛ\ÜÓ˜[YNˆ™›^LHLÈKLˆ^YÜ˜^KMŒ™ËYÜ˜^KLLÝ™\Ž˜™ËYÜ˜^KLŒ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H^\ÛH‹Ú[™[Žˆ[›[\™[ˆŸJKšœÞ
˜]Ûˆ‹Ù\ØX›YˆVK›˜[YKš[J
KÛÛXÚÎŠ
OOžØÛÛœÝ™OSØš™XÝ™œ›ÛQ[šY\ÊÈ›˜[YH‹œÛ™H‹››Ý\È‹\›—K™š[\ŠOO–VÕWKš[J
HOOVK›ÜšYÚ[˜[Ë–ÕWJK›X\
OO–ÕKVÕWKš[J
WJJNÛ
›^Y\’YœÚ[Y™JI‰Š™J[
KŠLJJ_KÛ\ÜÓ˜[YNˆ™›^LHLÈKLˆ^]Ú]H™ËX›YKMLÝ™\Ž˜™ËX›YKMŒ\ØX›Y›ÜXÚ]KML›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H^\ÛH‹Ú[™[Žˆ“ÜÛX[ˆŸJW_JW_JKÜ‰‰šI‰ˆ]YI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœM‹M›^Ø\Lˆ›^\Úš[šËL‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžØÛÛœÝ™O\‹™š[™
OO•KšYOOZJNÓ™I‰”J™J_KÛ\ÜÓ˜[YNˆ™›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ^]Ú]H™ËX›YKMLÝ™\Ž˜™ËX›YKMŒ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
ËÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ™]Ù\šÙ[ˆŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžÙJJKŠLJKYJ[
_KÛ\ÜÓ˜[YNˆ™›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ^]Ú]H™Ë\™YMLÝ™\Ž˜™Ë\™YMŒ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
šÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ•™\ÚZ™\™[ˆŸJW_JW_JKYI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœM‹MÜXÙK^KLÈ›Ü™\‹]›Ü™\‹YÜ˜^KLLLÈ›^\Úš[šËLÝ™\™›ÝË^KX]]ÈX^ZVÍšH‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H^X›YKMŒ‹Ú[™[Žˆ•›Û™Ý™]Ù\šÙ[ˆŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“Øš™XÝ\HŸJKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNYK›Øš™XÝ\KÛÚ[™ÙN“™OO”JË‹‹YKØš™XÝ\N“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LˆKLH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKMLŸJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“X]\šXX[ŸJKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNYK›X]\šX[ÛÚ[™ÙN“™OO”JË‹‹YKX]\šX[“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LˆKLH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKMLŸJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ”\š[ÙHŸJKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNYKœ\š[ÙÛÚ[™ÙN“™OO”JË‹‹YK\š[Ù“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LˆKLH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKMLŸJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“›Ý]Y\ÈŸJKšœÞ
^\™XH‹Ý˜[YNYK››Ý\ËÛÚ[™ÙN“™OO”JË‹‹YK›Ý\Î“™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆËY[LˆKLH^\ÛH™ËYÜ˜^KML›Ý[™Y›Ü™\‹LÝ][™K[›Û™H›ØÝ\Î˜™ËX›YKML™\Ú^™K[›Û™HLMˆŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO”J[
KÛ\ÜÓ˜[YNˆ™›^LHLÈKLˆ^YÜ˜^KMŒ™ËYÜ˜^KLLÝ™\Ž˜™ËYÜ˜^KLŒ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H^\ÛH‹Ú[™[Žˆ[›[\™[ˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžÝ
YKšYÛØš™XÝ\NYK›Øš™XÝ\KX]\šX[YK›X]\šX[\š[ÙYKœ\š[Ù›Ý\ÎYK››Ý\ßJKJ[
KŠLJ_KÛ\ÜÓ˜[YNˆ™›^LHLÈKLˆ^]Ú]H™ËX›YKMLÝ™\Ž˜™ËX›YKMŒ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H^\ÛH‹Ú[™[Žˆ“ÜÛX[ˆŸJW_JW_JK‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœM‹M›Ü™\‹]›Ü™\‹YÜ˜^KLL‹Ú[™[Ž–ÕÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ’Ü‹Û\ÜÓ˜[YNˆËY[›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ]LÈ^YÜ˜^KMŒ™ËYÜ˜^KLLÝ™\Ž˜™ËYÜ˜^KLŒ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
ŒÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ’ÛÙÝZØX\™\˜™\™Ù[ˆŸJW_JNššœÞ
˜]Ûˆ‹ÛÛÛXÚÎ“\‹\ØX›Y›ÙKÛ\ÜÓ˜[YN˜ËY[›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ]LÈ^]Ú]H›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÛÙOÈ˜™ËX›YKMÝ\œÛÜ‹]ØZ]Žˆ˜™ËX›YKMLÝ™\Ž˜™ËX›YKMŒŸXÚ[™[Ž›ÙOÚšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
LÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ˜[š[X]K\Ü[ˆŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“Y[‹‹‹ˆŸJW_JNššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
ŒÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Ž™ÙOÈ“ÜšY]]È›Ø™\™[ˆŽˆ’ÛÙÝZØX\Û™[ˆŸJW_J_JKÙI‰ˆU‰‰ššœÞ
œ‹ØÛ\ÜÓ˜[YNˆ›]Lˆ^^È^X[X™\‹MÌ^XÙ[\ˆ‹›ÛNˆœÝ]\È‹˜\šXK[]™HŽˆœÛ]H‹Ú[™[Ž™Ù_JW_JW_JW_J_JW_J_XÛÛœÝTOJ‹JOO˜	ÛŸK	Ù_XÙ[˜Ý[ÛˆÍ™J‹J^Ü™]\›˜Î‹ËÝÝÝË™ÛÛÙÛK˜ÛÛKÛX\ËÜÙX\˜ÚÏÉÛ™]ÈT“ÙX\˜Ú\˜[\ÊØ\NˆŒH‹]Y\žN–TJ‹J_JKÔÝš[™Ê
_XY[˜Ý[Ûˆ™J‹J^Ü™]\›˜Î‹ËÝÝÝË™ÛÛÙÛK˜ÛÛKÛX\ËÐÉÛ™]ÈT“ÙX\˜Ú\˜[\ÊØ\NˆŒH‹X\ØXÝ[ÛŽˆœ[›È‹šY]ÜÚ[–TJ‹J_JKÔÝš[™Ê
_XY[˜Ý[ÛˆM™J
^ØÛÛœÝU\ŠO”‹›X\
KO[]
O”‹›Ü[•›Û™Ý›Ü›JK[]
O”‹›Ü[YÚ[[Ù[
K]ŠO”‹›^Y\œÊNÜZJO”‹›^Y\œÊNØÛÛœÝORŠŠKÜËWOP‹\ÙTÝ]J[
KÛËOP‹\ÙTÝ]JLJKØËWOP‹\ÙTÝ]JLJKÙ‹OP‹\ÙTÝ]JLJKOP‹\ÙT™YŠ[
KOP‹\ÙT™YŠ[
KP‹\ÙT™YŠLJKÏP‹\ÙT™YŠ[
KOP‹\ÙT™YŠLJNÐ‹\ÙQY™™XÝ


OOžÑK˜Ý\œ™[[ßKÛ×JK‹\ÙQY™™XÝ


OOžÚYŠ[Š^ØÛÛœÛÛK›ÙÊ¼'äãHÛ™Ô™\ÜÓY[NˆX\›Ý™XYHŠNÜ™]\›ŸXÛÛœÝ[‹™Ù]šY]ÜÜ

NÚYŠTŠ^ØÛÛœÛÛK›ÙÊ¼'äãHÛ™Ô™\ÜÓY[NˆšY]ÜÜ›Ý™XYHŠNÜ™]\›ŸXÛÛœÛÛK›ÙÊ¼'äãHÛ™Ô™\ÜÓY[Nˆ]XÚYÈšY]ÜÜ‹ŠNØÛÛœÝMŒLMKLYLËJ
OOž×Ë˜Ý\œ™[OO[[	‰ŠÛX\•[Y[Ý]
Ë˜Ý\œ™[
KË˜Ý\œ™[[[
_KÙOJ
OOžÚŠ
KË˜Ý\œ™[]Ú[™ÝËœÙ][Y[Ý]


OOžÞ˜Ý\œ™[HLKË˜Ý\œ™[[[KŠ_KYOYYOOžÚYŠÛÛœÛÛK›ÙÊ¼'äaˆÝXÚÝ\ÝXÚ\Îˆ‹YKÝXÚ\Ë›[™Ý
KYKÝXÚ\Ë›[™ÝOOLJ\™]\›ŽØÛÛœÝYYKÝXÚ\ÖÌNÞK˜Ý\œ™[^Þ’˜ÛY[N’˜ÛY[_K˜Ý\œ™[HLKŠ
KÛÛœÛÛK›ÙÊ¼'äaˆÝ\[™ÈÛ™È™\ÜÈ[Y\ˆ]ˆ‹K˜Ý\œ™[
KK˜Ý\œ™[	‰˜ÛX\•[Y[Ý]
K˜Ý\œ™[
KK˜Ý\œ™[]Ú[™ÝËœÙ][Y[Ý]


OOžÚYŠK˜Ý\œ™[[[ÛÛœÛÛK›ÙÊ¸£ì{î#È[Y\ˆš\™YHÝ\ÜÎˆ‹K˜Ý\œ™[
K^K˜Ý\œ™[
\™]\›ŽØÛÛœÝ]Ú[™ÝË—×ÛÛX\ÚYŠRŠ^ØÛÛœÛÛK›ÙÊ¸§cX\›Ý]˜Z[X›H
ÛØ˜[
HŠNÜ™]\›ŸXÛÛœÝYOT‹™Ù]›Ý[™[™ÐÛY[™XÝ

K™OVÞK˜Ý\œ™[žXYK›YK˜Ý\œ™[žKXYKÜKOR‹™Ù]ÛÛÜ™[˜]Qœ›ÛT^[
™JNÚYŠJ^ØÛÛœÝORŠJNÞ˜Ý\œ™[HLJÜ^[–ÞK˜Ý\œ™[žK˜Ý\œ™[žWKÛÛÜ™[˜]Nž_JK
L
KJLJKÙ][Y[Ý]


OOJL
KÌ
KšXœ˜]Hš[ˆ˜]šYØ]Ü‰‰›˜]šYØ]Ü‹šXœ˜]JL
KÛÛœÛÛK›ÙÊ¼'ã«ÈÛ™È™\ÜÈ]XÝY]ˆ‹J__K
_KÙOYYOOžÚYŠ[K˜Ý\œ™[^K˜Ý\œ™[
\™]\›ŽØÛÛœÝYYKÝXÚ\ÖÌKR˜ÛY[^K˜Ý\œ™[žYOR˜ÛY[K^K˜Ý\œ™[žK™OSX]œÜ\
Š’ŠØYJ˜YJNÚ™O‘	‰ŠÛÛœÛÛK›ÙÊ¼'äaˆÝXÚ[Ý™YÛÈ]XÚØ[˜Ù[[™Ëˆ\Ý[˜ÙNˆ‹™JKÛX\•[Y[Ý]
K˜Ý\œ™[
KK˜Ý\œ™[[[
_KOJ
OOžØÛÛœÛÛK›ÙÊ¼'äaˆÝXÚ[™[Y\ˆXÝ]™Nˆ‹H[K˜Ý\œ™[
KK˜Ý\œ™[	‰ŠÛÛœÛÛK›ÙÊ¼'äaˆØ[˜Ù[[™È[Y\ˆÛˆÝXÚ[™ŠKÛX\•[Y[Ý]
K˜Ý\œ™[
KK˜Ý\œ™[[[
KK˜Ý\œ™[[[˜Ý\œ™[	‰›ÙJ
_KOYYOOžÊ˜Ý\œ™[K˜Ý\œ™[
I‰™YKœ™]™[Y˜][

_KYOYYOOžÙYK˜]ÛOOL	‰ŠÛÛœÛÛK›ÙÊ¼'å¬{î#È[Ý\ÙHÝÛˆŠKK˜Ý\œ™[^Þ™YK˜ÛY[N™YK˜ÛY[_K˜Ý\œ™[HLKŠ
KK˜Ý\œ™[	‰˜ÛX\•[Y[Ý]
K˜Ý\œ™[
KK˜Ý\œ™[]Ú[™ÝËœÙ][Y[Ý]


OOžÚYŠK˜Ý\œ™[[[ÛÛœÛÛK›ÙÊ¸£ì{î#È[Ý\ÙH[Y\ˆš\™YHŠK^K˜Ý\œ™[
\™]\›ŽØÛÛœÝ]Ú[™ÝË—×ÛÛX\ÚYŠÛÛœÛÛK›ÙÊ¼'åî»î#È×ÛÛX\ˆ‹
KÛÛœÛÛK›ÙÊ¼'åî»î#È×ÛÛX\ÛÛœÝXÝÜŽˆ‹Ë˜ÛÛœÝXÝÜË›˜[YJKÛÛœÛÛK›ÙÊ¼'åî»î#È\ÈÙ]ÛÛÜ™[˜]P]^[ˆ‹\[ÙˆË™Ù]ÛÛÜ™[˜]P]^[
KR
^ØÛÛœÛÛK›ÙÊ¸§cX\›Ý]˜Z[X›H
ÛØ˜[
HŠNÜ™]\›ŸXÛÛœÝT‹™Ù]›Ý[™[™ÐÛY[™XÝ

KYOVÞK˜Ý\œ™[žR‹›YK˜Ý\œ™[žKR‹ÜNØÛÛœÛÛK›ÙÊ¼'äãH^[ˆ‹YJNØÛÛœÝ™OR™Ù]ÛÛÜ™[˜]Qœ›ÛT^[
YJNÚYŠÛÛœÛÛK›ÙÊ¼'äãHÛÛÜ™[˜]Nˆ‹™JK™J^ØÛÛœÝORŠ™JNÞ˜Ý\œ™[HLJÜ^[–ÞK˜Ý\œ™[žK˜Ý\œ™[žWKÛÛÜ™[˜]N‘_JK
L
KJLJKÙ][Y[Ý]


OOJL
KÌ
KÛÛœÛÛK›ÙÊ¼'ã«ÈÛ™È™\ÜÈ
[Ý\ÙJH]XÝY]ˆ‹J__K
J_KYOYYOOžÚYŠ[K˜Ý\œ™[^K˜Ý\œ™[
\™]\›ŽØÛÛœÝYYK˜ÛY[^K˜Ý\œ™[žYYK˜ÛY[K^K˜Ý\œ™[žNÓX]œÜ\

’
ÒŠ’ŠO‘	‰ŠÛÛœÛÛK›ÙÊ¼'å¬{î#È[Ý\ÙH[Ý™YØ[˜Ù[[™ÈŠKÛX\•[Y[Ý]
K˜Ý\œ™[
KK˜Ý\œ™[[[
_KOJ
OOžØÛÛœÛÛK›ÙÊ¼'å¬{î#È[Ý\ÙH\ŠKK˜Ý\œ™[	‰ŠÛX\•[Y[Ý]
K˜Ý\œ™[
KK˜Ý\œ™[[[
KK˜Ý\œ™[[[˜Ý\œ™[	‰›ÙJ
_KÏYYOOžÞ˜Ý\œ™[	‰ŠYKœ™]™[Y˜][

K˜Ý\œ™[HLKŠ
J_NÜ™]\›ˆ‹˜Y]™[\Ý[™\ŠÝXÚÝ\‹YKÜ\ÜÚ]™NˆL_JK‹˜Y]™[\Ý[™\ŠÝXÚ[Ý™H‹ÙKÜ\ÜÚ]™NˆLJK‹˜Y]™[\Ý[™\ŠÝXÚ[™‹JK‹˜Y]™[\Ý[™\ŠÝXÚØ[˜Ù[‹JK‹˜Y]™[\Ý[™\Š˜ÛÛ^Y[H‹JK‹˜Y]™[\Ý[™\Š›[Ý\ÙYÝÛˆ‹YJK‹˜Y]™[\Ý[™\Š›[Ý\Ù[[Ý™H‹YJK‹˜Y]™[\Ý[™\Š›[Ý\Ù]\‹JK‹˜Y]™[\Ý[™\Š›[Ý\Ù[X]™H‹JK‹›ÛŠœÚ[\\‹ÊK

OOžÔ‹œ™[[Ý™Q]™[\Ý[™\ŠÝXÚÝ\‹YJK‹œ™[[Ý™Q]™[\Ý[™\ŠÝXÚ[Ý™H‹ÙJK‹œ™[[Ý™Q]™[\Ý[™\ŠÝXÚ[™‹JK‹œ™[[Ý™Q]™[\Ý[™\ŠÝXÚØ[˜Ù[‹JK‹œ™[[Ý™Q]™[\Ý[™\Š˜ÛÛ^Y[H‹JK‹œ™[[Ý™Q]™[\Ý[™\Š›[Ý\ÙYÝÛˆ‹YJK‹œ™[[Ý™Q]™[\Ý[™\Š›[Ý\Ù[[Ý™H‹YJK‹œ™[[Ý™Q]™[\Ý[™\Š›[Ý\Ù]\‹JK‹œ™[[Ý™Q]™[\Ý[™\Š›[Ý\Ù[X]™H‹JK‹[ŠœÚ[\\‹ÊKK˜Ý\œ™[	‰˜ÛX\•[Y[Ý]
K˜Ý\œ™[
KŠ
__KÛ—JNØÛÛœÝÏJ
OOžØÉ‰Š
LJKJ[
KJLJK
LJJ_KÏJ
OOžÛ
LJKJ[
KJLJK
LJ_KOTOžÚYŠ\Ê\™]\›ŽØÛÛœÝÓO\Ë˜ÛÛÜ™[˜]NÝ
‹Û]‘™Î“JKÊ
_KJ
OOžÚYŠ\Ê\™]\›ŽØÛÛœÝÔ‹O\Ë˜ÛÛÜ™[˜]NÙJÛ]“™Î”ŸJK
LJKJ[
KJLJ_KJ
OOžÚYŠ\Ê\™]\›ŽØÛÛœÝÔ‹O\Ë˜ÛÛÜ™[˜]KYÍ™JŠNÝÚ[™ÝË›Ü[Š—Ø›[šÈŠK
LJKJ[
KJLJ_KOJ
OOžÚYŠ\Ê\™]\›ŽØÛÛœÝÔ‹O\Ë˜ÛÛÜ™[˜]NÝÚ[™ÝË›Ü[Š™JŠK—Ø›[šÈŠKÊ
_KTOžØÛÛœÝÓOTŽÜ™]\›˜	ÑÑš^Y
J_p¬‹	ÓÑš^Y
J_p¬XNÜ™]\›ˆšœÞ
ËØÚ[™[Ž›É‰œÉ‰ššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^Y[œÙ]L‹VÌMŒH‹[š]X[žÛÜXÚ]NŒK[š[X]NžÛÜXÚ]NŒ_K^]žÛÜXÚ]NŒKÛÛXÚÎ”ßJKšœÞÊ›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^Y‹VÌMŒWH™Ë]Ú]H›Ý[™Y^ÚYÝË[YÝ™\™›ÝËZY[ˆZ[‹]ËVÌŒH›Ü™\‹LÝ][™K[›Û™H‹Ý[NžÛY“X]›Z[ŠËœ^[ÌKÚ[™ÝËš[›™\•ÚYLŒŒ
KÜŠ

OOžØÛÛœÝYÍŒÌŒÜ™]\›ˆÚ[™ÝËš[›™\’ZYÚ\Ëœ^[ÌWO‰‰œËœ^[ÌWO”ÜËœ^[ÌWKTŠÍ“X]›Z[ŠËœ^[ÌWKÚ[™ÝËš[›™\’ZYÚTŠ_JJ
_K[š]X[žÛÜXÚ]NŒØØ[N‹Ž_K[š[X]NžÛÜXÚ]NŒKØØ[NŒ_K^]žÛÜXÚ]NŒØØ[N‹Ž_K˜[œÚ][ÛŽžÙ\˜][ÛŽ‹ŒM_KÚ[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLÈ™Ë]Ú]H›Ü™\‹Xˆ›Ü™\‹YÜ˜^KLL‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^X›YKMŒ‹Ú[™[Ž–ÚšœÞ
ZKÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È›Û[[Û›È‹Ú[™[Ž•
Ë˜ÛÛÜ™[˜]J_JW_J_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™Ë]Ú]H‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ™[]]™H‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOœ
YŠKÛ\ÜÓ˜[YNˆËY[MKLÈ›^][\ËXÙ[\ˆØ\LÈ˜[œÚ][Û‹XÛÛÜœÈÝ™\Ž˜™ËX›YKML^YÜ˜^KMÌ™Ë]Ú]H›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
˜ËÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^\\œKMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H›^LH^[Y‹Ú[™[Žˆ”[Ù]›ÙYÙ[ˆŸJKšœÞ
ÛËÜÚ^™NŒM‹Û\ÜÓ˜[YN˜^YÜ˜^KM˜[œÚ][Û‹]˜[œÙ›Ü›H	ÙÈœ›Ý]KNLŽˆˆŸXJW_JKšœÞ
ËØÚ[™[Ž™‰‰ššœÞ
›‹™]‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ü™\‹]›Ü™\‹YÜ˜^KLLX^ZMLˆÝ™\™›ÝË^KX]]È‹[š]X[žÛÜXÚ]NŒZYÚŒK[š[X]NžÛÜXÚ]NŒKZYÚˆ˜]]ÈŸK^]žÛÜXÚ]NŒZYÚŒKÚ[™[ŽšK›[™ÝOOLÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLÈLLH^\ÛH^YÜ˜^KML‹Ú[™[Žˆ“XXZÈY\œÝY[ˆXYÈšXHØX\YÙ[ˆŸJNšK›X\
OššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOJ‹\™Ù]
KÛ\ÜÓ˜[YNˆËY[MKL‹HLLH›^][\ËXÙ[\ˆØ\Lˆ^\ÛH^YÜ˜^KMÌÝ™\Ž˜™ËYÜ˜^KLL™Ë]˜[œÜ\™[›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆËLÈLÈ›Ý[™YY[›^\Úš[šËL‹Ý[NžØ˜XÚÙÜ›Ý[™ÛÛÜŽ”‹˜ÛÛÜŸ_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ[˜Ø]H‹Ú[™[Ž”‹›˜[Y_JW_K‹šÙ^JJ_J_JW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ”Û\ÜÓ˜[YNˆËY[MKLÈ›^][\ËXÙ[\ˆØ\LÈ˜[œÚ][Û‹XÛÛÜœÈÝ™\Ž˜™Ë[Ü˜[™ÙKML^YÜ˜^KMÌ™Ë]Ú]H›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^[Ü˜[™ÙKMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Žˆ•›Û™Ý™YÚ\Ý™\™[ˆŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎž‹Û\ÜÓ˜[YNˆËY[MKLÈ›^][\ËXÙ[\ˆØ\LÈ˜[œÚ][Û‹XÛÛÜœÈÝ™\Ž˜™ËX›YKML^YÜ˜^KMÌ™Ë]Ú]H›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
ZÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^X›YKMŒŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Žˆ“Ü[ˆ[ˆÛÛÙÛHX\ÈŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ’KÛ\ÜÓ˜[YNˆËY[MKLÈ›^][\ËXÙ[\ˆØ\LÈ˜[œÚ][Û‹XÛÛÜœÈÝ™\Ž˜™Ë^Y[ÝËML^YÜ˜^KMÌ™Ë]Ú]H›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
‹ÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^^Y[ÝËMŒŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Žˆ”Ý™Y]šY]ÈŸJW_JW_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™Ë]Ú]H‹Ú[™[ŽššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎšËÛ\ÜÓ˜[YNˆËY[MKLÈ›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\Lˆ^YÜ˜^KMLÝ™\Ž˜™ËX›YKML˜[œÚ][Û‹XÛÛÜœÈ™Ë]Ú]H›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
[ËÜÚ^™NŒNJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ[›[\™[ˆŸJW_J_JW_JW_J_J_Y[˜Ý[ÛˆM™JŠ^Ü™]\›ˆŸY[˜Ý[Ûˆ™JŠ^ÚYŠO[[
\™]\›ˆM™NÝ˜\ˆK[‹œØØ[VÌKO[‹œØØ[VÌWKÏ[‹˜[œÛ]VÌKO[‹˜[œÛ]VÌWNÜ™]\›ˆ[˜Ý[ÛŠË
^Û
O]L
NÝ˜\ˆÏL‹O[Ë›[™Ý[™]È\œ˜^JJNÙ›ÜŠ–ÌOJJÏ[ÖÌJJœŠÜË–ÌWOJ
Ï[ÖÌWJJšJØNØÏNÊY–Ø×O[ÖØ×K
ÊØÎÜ™]\›ˆŸ_Y[˜Ý[Ûˆ™J‹J^Ù›ÜŠ˜\ˆ[‹›[™ÝO\‹YNÚOK\ŽÊ][–ÚWK–ÚJÊ×O[–Ü—K–Ü—O]Y[˜Ý[ÛˆÍ™J‹J^Ü™]\›ˆ\[ÙˆOOHœÝš[™È‰‰ŠO[‹›Øš™XÝÖÙWJKK\OOOH‘Ù[ÛY]žPÛÛXÝ[ÛˆÞÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î™K™Ù[ÛY]šY\Ë›X\
[˜Ý[ÛŠ
^Ü™]\›ˆŠ‹
_J_NšŠ‹J_Y[˜Ý[ÛˆŠ‹J^Ý˜\ˆYKšYYK˜˜›ÞOYKœ›Ü\Y\ÏO[[ÞßN™Kœ›Ü\Y\ËÏ]Í™J‹JNÜ™]\›ˆO[[	‰œO[[ÞÝ\Nˆ‘™X]\™H‹›Ü\Y\ÎšKÙ[ÛY]žNœßNœO[[ÞÝ\Nˆ‘™X]\™H‹Y›Ü\Y\ÎšKÙ[ÛY]žNœßNžÝ\Nˆ‘™X]\™H‹Y˜›Þœ‹›Ü\Y\ÎšKÙ[ÛY]žNœß_Y[˜Ý[ÛˆÍ™J‹J^Ý˜\ˆ]™J‹˜[œÙ›Ü›JK[‹˜\˜ÜÎÙ[˜Ý[ÛˆJKŠ^Ù‹›[™Ý	‰™‹œÜ

NÙ›ÜŠ˜\ˆ\–ÝOßNWKOLO\›[™ÝÛONÊÊÛJY‹œ\Ú

ÛWKJJNÝO	‰ž™J‹J_Y[˜Ý[ÛˆÊJ^Ü™]\›ˆ
J_Y[˜Ý[ÛˆJJ^Ù›ÜŠ˜\ˆV×KLO]K›[™ÝÜNÊÊÜ
ZJVÜKŠNÜ™]\›ˆ‹›[™Ý‰‰™‹œ\Ú
–ÌJKŸY[˜Ý[ÛˆÊJ^Ù›ÜŠ˜\ˆXJJNÙ‹›[™ÝÊY‹œ\Ú
–ÌJNÜ™]\›ˆŸY[˜Ý[Ûˆ
J^Ü™]\›ˆK›X\
Ê_Y[˜Ý[ÛˆÊJ^Ý˜\ˆ]K\KÜÝÚ]Ú
Š^ØØ\ÙH‘Ù[ÛY]žPÛÛXÝ[ÛˆŽœ™]\›žÝ\N™‹Ù[ÛY]šY\ÎK™Ù[ÛY]šY\Ë›X\
Ê_NØØ\ÙH”Ú[Žœ\ÊK˜ÛÛÜ™[˜]\ÊNØœ™XZÎØØ\ÙH“][TÚ[Žœ]K˜ÛÛÜ™[˜]\Ë›X\
ÊNØœ™XZÎØØ\ÙH“[™TÝš[™ÈŽœXJK˜\˜ÜÊNØœ™XZÎØØ\ÙH“][S[™TÝš[™ÈŽœ]K˜\˜ÜË›X\
JNØœ™XZÎØØ\ÙH”ÛYÛÛˆŽœ[
K˜\˜ÜÊNØœ™XZÎØØ\ÙH“][TÛYÛÛˆŽœ]K˜\˜ÜË›X\

NØœ™XZÎÙY˜][œ™]\›ˆ[\™]\›žÝ\N™‹ÛÛÜ™[˜]\Îœ_\™]\›ˆÊJ_X\Þ[˜È[˜Ý[Ûˆž™JŠ^Ýž^ØÛÛœÝOX]ØZ]™]Ú
ŠNÚYŠYK›ÚÊ]›ÝÈ™]È\œ›ÜŠ˜Z[YÈØY	ÛŸNˆ	ÙKœÝ]\Õ^X
NØÛÛœÝX]ØZ]KšœÛÛŠ
NÜ™]\›ˆÛÛœÛÛK›ÙÊ8§$ÈØYYÙ[Ò”ÓÓˆœ›ÛH	ÛŸX
KXØ]Ú
J^Ý›ÝÈÛÛœÛÛK™\œ›ÜŠ\œ›ÜˆØY[™ÈÙ[Ò”ÓÓˆœ›ÛH	ÛŸN˜JK__X\Þ[˜È[˜Ý[Ûˆ™JŠ^Ýž^ØÛÛœÝOX]ØZ]™]Ú
ŠNÚYŠYK›ÚÊ]›ÝÈ™]È\œ›ÜŠ˜Z[YÈØY	ÛŸNˆ	ÙKœÝ]\Õ^X
NØÛÛœÝX]ØZ]KšœÛÛŠ
KSØš™XÝšÙ^\Ê›Øš™XÝÊVÌKOWÍ™J›Øš™XÝÖÜ—JNÜ™]\›ˆÛÛœÛÛK›ÙÊ8§$ÈØYY[™ÛÛ™\YÜÒ”ÓÓˆœ›ÛH	ÛŸX
K_XØ]Ú
J^Ý›ÝÈÛÛœÛÛK™\œ›ÜŠ\œ›ÜˆØY[™ÈÜÒ”ÓÓˆœ›ÛH	ÛŸN˜JK__Y[˜Ý[ÛˆM™JŠ^Ü™]\›ˆ™]ÈÛ
Ù™X]\™T›Ú™XÝ[ÛŽˆ‘TÑÎŒÎMÈŸJKœ™XY™X]\™\ÊŠ_XÛÛœÝLÏ^Ø[žÛ˜[YNˆ[H›Ýš[˜ÚY\È‹›Ý[™Î–ÌËŒÍËLÍKËŒŒKLË×_KÜ›Ûš[™Ù[ŽžÛ˜[YNˆ‘Ü›Ûš[™Ù[ˆ‹›Ý[™Î–Í‹Œ‹LËŒKËŒŒKLË×_KœšY\Û[™žÛ˜[YNˆ‘œšY\Û[™‹›Ý[™Î–ÍKŒKL‹ŽK‹ŒKLËW_K™[NžÛ˜[YNˆ‘™[H‹›Ý[™Î–Í‹ŒKL‹KËŒKLËŒMW_KÝ™\šZœÜÙ[žÛ˜[YNˆ“Ý™\šZœÜÙ[‹›Ý[™Î–ÍKŽKL‹ŒMK‹ŽKL‹×_K›]›Û[™žÛ˜[YNˆ‘›]›Û[™‹›Ý[™Î–ÍKŒMKL‹ŒK‹L‹W_KÙ[\›[™žÛ˜[YNˆ‘Ù[\›[™‹›Ý[™Î–ÍKLKÍK‹L‹W_K]™XÚžÛ˜[YNˆ•]™XÚ‹›Ý[™Î–ÍŽKLKŽKKKL‹ŒW_K››ÛÜ™ZÛ[™ŽžÛ˜[YNˆ“›ÛÜ™RÛ[™‹›Ý[™Î–ÍKL‹Œ‹KŒKL‹ŽMW_KžZYZÛ[™ŽžÛ˜[YNˆ–ZYRÛ[™‹›Ý[™Î–ÌËŽKLKŽŽKL‹ŒÍW_K™Y[[™žÛ˜[YNˆ–™Y[[™‹›Ý[™Î–ÌËŒÍËLKŒ‹ŒËLKÍW_K››ÛÜ™Xœ˜X˜[ŽžÛ˜[YNˆ“›ÛÜ™Pœ˜X˜[‹›Ý[™Î–ÍŒÍKLKŒK‹LKŽW_K[X\™ÎžÛ˜[YNˆ“[X\™È‹›Ý[™Î–ÍKMKLÍK‹ŒKLKŽ__NÙ[˜Ý[ÛˆÍ™J‹K
^ÚYŠOOH˜[Š\™]\›ˆLØÛÛœÝULÖÝNÚYŠ\Š\™]\›ˆLØÛÛœÝÚKËK×O\‹˜›Ý[™ÎÜ™]\›ˆZI‰›XI‰™O\É‰™O[ß[]X[[Ø\Þ[˜È[˜Ý[Ûˆ	Ê
^ÚYŠXŠ\™]\›ˆXŽØÛÛœÝX]ØZ]™J‹‹Ù]KØ[Z×Û[Û[Y[[—Ù[ÜÚœÛÛˆŠNÜ™]\›ˆXQM™JŠKXŸY[˜Ý[ÛˆÍ™J‹KML
^ØÛÛœÝ[‹ÓÝÙ\Ø\ÙJ
KOYKÓÝÙ\Ø\ÙJ
KÏ\‹š[™^ÙŠJNÚYŠÏOOKLJ\™]\›ˆ‹œÝXœÝš[™ÊL
JÈ‹‹‹ˆŽØÛÛœÝOSX]›X^
Ë]
KÏSX]›Z[Š‹›[™ÝÊÙK›[™Ý
Ý
NÛ]HˆŽÜ™]\›ˆOŒ	‰Š
ÏH‹‹‹ˆŠK
Ï[‹œÝXœÝš[™ÊKÊKÏ‹›[™Ý	‰Š
ÏH‹‹‹ˆŠKX\Þ[˜È[˜Ý[Ûˆ™J‹OMLH˜[Š^ÚYŠ[Ÿ‹›[™ÝŠ\™]\›–×NØÛÛœÝX]ØZ]	Ê
KOV×KO[‹ÓÝÙ\Ø\ÙJ
KœÜ]
×ÊËÊK™š[\ŠÏO›Ë›[™ÝLŠNÙ›ÜŠÛÛœÝÈÙˆŠ^ØÛÛœÝJË™Ù]
›Û\ØÚšZš[™ÈŠ_ˆŠKÓÝÙ\Ø\ÙJ
KÏJË™Ù]
ÜÛšY[HŠ_ˆŠKÓÝÙ\Ø\ÙJ
KOJË™Ù]
ÛX™[Š_ˆŠKÓÝÙ\Ø\ÙJ
NÚYŠK™]™\žJO›š[˜ÛY\Ê
_Ëš[˜ÛY\Ê
_Kš[˜ÛY\Ê
JJ^ØÛÛœÝ[Ë™Ù]Ù[ÛY]žJ
NÚYŠ\
XÛÛ[YNØÛÛœÝO\™Ù]^[

KO]Û
JKÞ×ORÌ
K‘TÑÎŒÎMÈ‹‘TÑÎÌˆŠNÚYŠTÍ™JË
JXÛÛ[YNØÛÛœÝO[Ë™Ù]
›Û\ØÚšZš[™ÈŠ_ˆŽÚYŠKœ\Ú
ÚY›Ë™Ù]
’QŠ_Ë™Ù]
›[Û[Y[[[Y\ˆŠK[Û[Y[[[Y\Ž›Ë™Ù]
›[Û[Y[[[Y\ˆŠKÜÛšY[N›Ë™Ù]
ÜÛšY[HŠ_“Û˜™ZÙ[™‹ÝØ[]Z]ÝØX\™N›Ë™Ù]
šÝØ[]Z]ÝØX\™HŠ_ˆ‹\š[ÙN›Ë™Ù]
ÛX™[Š_ˆ‹Û\ØÚšZš[™Î‘KX]ÚY^šÍ™JKVÌJKÛÛÜ™[˜]\Î–Þ×K^[›_JKK›[™ÝYJXœ™XZß_\™]\›ˆKœÛÜ

Ë
OOžØÛÛœÝÏ^Èž™Y\ˆÙÙH\˜Ú[ÛÙÚ\ØÚHØX\™HŽŒËšÙÙH\˜Ú[ÛÙÚ\ØÚHØX\™HŽŒ‹˜\˜Ú[ÛÙÚ\ØÚHØX\™HŽŒ_NÜ™]\›ŠÖÛšÝØ[]Z]ÝØX\™W_
KJÖÛËšÝØ[]Z]ÝØX\™W_
_JK_X\Þ[˜È[˜Ý[ÛˆÍ™JŠ^Ü™]\›Š]ØZ]	Ê
JK™š[™
O™Ù]
›[Û[Y[[[Y\ˆŠOOO[Š_[X\Þ[˜È[˜Ý[ÛˆM™JŠ^ØÛÛœÝOX]ØZ]	Ê
K[™]ÈÙ]
ŠNÜ™]\›ˆK™š[\ŠOš\Ê‹™Ù]
›[Û[Y[[[Y\ˆŠJJ_XÛÛœÝ”OXœÊOŠÚÙ^]ÛÜ™ˆˆ‹›Ýš[˜ÙNˆ˜[‹\ÐXÝ]™NˆLKÝ[ÛÝ[Œš[\™YÛÝ[ŒÙ]Ù^]ÛÜ™™OO›ŠÚÙ^]ÛÜ™™_JKÙ]›Ýš[˜ÙN™OO›ŠÜ›Ýš[˜ÙN™_JKÙ]XÝ]™N™OO›ŠÚ\ÐXÝ]™N™_JKÙÙÛPXÝ]™NŠ
OO›ŠOOŠÚ\ÐXÝ]™NˆYKš\ÐXÝ]™_JJKÛX\‘š[\ŽŠ
OO›ŠÚÙ^]ÛÜ™ˆˆ‹›Ýš[˜ÙNˆ˜[‹\ÐXÝ]™NˆL_JK\]PÛÝ[ÎŠK
OO›ŠÝÝ[ÛÝ[™Kš[\™YÛÝ[J_JJNÙ[˜Ý[Ûˆ^™J‹K‹KËJ^ÚYŠË›[™ÝLŠ^ØÛÛœÝ\ËÓÝÙ\Ø\ÙJ
KœÜ]
×ÊËÊK™š[\ŠOO›K›[™ÝLŠKÏ[‹ÓÝÙ\Ø\ÙJ
KOYKÓÝÙ\Ø\ÙJ
K]ÓÝÙ\Ø\ÙJ
NÚYŠ[™]™\žJOO˜Ëš[˜ÛY\ÊJ_Kš[˜ÛY\ÊJ_‹š[˜ÛY\ÊJJJ\™]\›ˆL_ZYŠHOOH˜[Š^ØÛÛœÝÏULÖØWOË˜›Ý[™ÎÚYŠÊ^ØÛÛœÝÛËK—O[ÎÚYŠ_OßO™Š\™]\›ˆL__\™]\›ˆLXÛÛœÝM™O^ÐÛÛ\\ÜÎ›S‹™YT[N’Ü™K[Ý[Z[Ž›ŒØ]™\ÎœšYKÙX\˜ÚÚ\™Ù]œ™K^Y\œÎœ˜ËÜšY•Õ‹X\™YßK™O^ÐÛÛ\\ÜÎˆ^\\œKMŒ‹Ø]™\Îˆ^XÞX[‹MŒ‹™YT[Nˆ^YÜ™Y[‹MŒ‹[Ý[Z[Žˆ^\ÝÛ™KMŒ‹ÙX\˜Úˆ^X[X™\‹MŒ‹\™Ù]ˆ^\™YMŒ‹^Y\œÎˆ^X›YKMŒ‹ÜšYˆ^[[YKMŒ‹X\ˆ^X[X™\‹MÌŸK™O^ÐÛÛ\\ÜÎˆšÝ™\Ž˜™Ë\\œKML‹Ø]™\ÎˆšÝ™\Ž˜™ËXÞX[‹ML‹™YT[NˆšÝ™\Ž˜™ËYÜ™Y[‹ML‹[Ý[Z[ŽˆšÝ™\Ž˜™Ë\ÝÛ™KML‹ÙX\˜ÚˆšÝ™\Ž˜™ËX[X™\‹ML‹\™Ù]ˆšÝ™\Ž˜™Ë\™YML‹^Y\œÎˆšÝ™\Ž˜™ËX›YKML‹ÜšYˆšÝ™\Ž˜™Ë[[YKML‹X\ˆšÝ™\Ž˜™ËX[X™\‹MLŸK•VÈ‘\ÜšH
XÚ
H‹“Ü[”Ý™Y]X\‹“XÚ›ÝÈ‹”Ø][Y]
Ù\™[
H‹’XœšYH
Ù\™[
H‹•RÈNL‹›Û›™X›Y[ˆNL—K™OVÍKŒŽLLËL‹ŒLÌ—KM™ONÙ[˜Ý[Ûˆ™J
^ØÛÛœÝXœŠÏO“ËœÙ]^Y\•š\ÚXš[]JKORJÏO“ËœÝÜ˜XÚÚ[™ÊKV”JÏO“Ë˜ÛX\‘š[\ŠKU\ŠÏO“Ë›X\
KO[]
ÏO“Ë˜XÝ]™UÚ[™ÝÏOOHœ™\Ù]ÈŠKÏ[]
ÏO“ËÙÙÛT™\Ù]Ô[™[
KO[]
ÏO“Ë˜ÛÜÙP[[™[ÊKÜ™\Ù]Î›Ë\T™\Ù]›\]T™\Ù]˜ËÜ™X]T™\Ù]K[]T™\Ù]™‹™\Ù]ÑY˜][ÎœOZ^J
KOXœŠÏO“Ëš\ÚX›JKO^[ŠÏO“Ë™›ÛØØ[JKLM
žKÌLÏ^KÌLÑK×OP‹\ÙTÝ]J[
KÚËWOP‹\ÙTÝ]JLJKÔ—OP‹\ÙTÝ]JˆŠKÒKOP‹\ÙTÝ]JLJKÔ‹OP‹\ÙTÝ]J[
KÑ—OP‹\ÙTÝ]JˆŠKÚ‹ÙWOP‹\ÙTÝ]JLJKYOJ
OOžÚYŠTŸQš[J
J\™]\›ŽØÛÛœÝÏ[Ë™š[™
O’‹šYOOTŠKYO\Ë™Ù]šY]Ê
K™Ù]Ù[\Š
K\Ë™Ù]šY]Ê
K™Ù]›ÛÛJ
NÚ‰‰ˆSÏË›X\šY]É‰ŠYY_\[ÙˆOH›[X™\ˆŠ_
Ê‹Û˜[YN‘š[J
KX\šY]ÎšÓÏË›X\šY]ßØÙ[\Ž’ŠYJK›ÛÛN’N›[JK
[
J_KÙOJ
OOžØJ
KØš™XÝšÙ^\ÊJK™š[\ŠÏOˆY•‹š[˜ÛY\ÊÊJK™›Ü‘XXÚ
ÏO›ŠËLJJK•‹™›Ü‘XXÚ
ÏOžÛŠËÏOOH‘\ÜšH
XÚ
HŠ_JKŠ“X™[ÈÝ™\›^H‹L
NÙ›ÜŠÛÛœÝÈÙ–ÜZK—J^ØÛÛœÝYOSË™Ù]Ý]J
NÙYK›^Y\œË™š[\ŠO’š\ÚX›JK™›Ü‘XXÚ
O™YKÙÙÛUš\ÚXš[]JšY
J_YJ
K

K‰‰œ‹™Ù]šY]Ê
K˜[š[X]JØÙ[\Ž\Š™JK›ÛÛN“M™K\˜][ÛŽLJKÛÛœÛÛK›ÙÊ¼'å!™\Ù]ˆXÚÜšZœË[HYÙ[ˆZ]ÔÈZ]›ÛÛH˜X\ˆ™Y\›[™Š_KOSÏOžÛË™š[™
O’šYOOSÊOË›X\šY]É‰™J
K
ÊK]œÙ]Ý]JÜXÙS\ÝØÛÜN˜™\Ù]‰ÓßXJKJ
_KOJËYK
OOžÚYŠËœÝÜ›ÜYØ][ÛŠ
KXÛÛ™š\›J™\Ù]‰ÒHˆÝ™\œØÚšZ™[ˆY]ZYYÙHYÙ[Ø
J\™]\›ŽØÛÛœÝYRÊ
KYO[Ë™š[™
ÝO—ÝšYOOYYJK™O\Ë™Ù]šY]Ê
KOZ™OË™Ù]Ù[\Š
KOZ™OË™Ù]›ÛÛJ
KÙOXYOË›X\šY]É‰‘I‰\[ÙˆOOH›[X™\ˆÞØÙ[\Ž’ŠJK›ÛÛNž_N˜YOË›X\šY]ÎØÊYKË‹‹’‹X\šY]Î˜Ù_JKÊYJKÙ][Y[Ý]


OO”Ê[
K™LÊKÛÛœÛÛK›ÙÊ¼'ä¯ˆ™\Ù]›ÛYYÈÜÙ\ÛYÙ[Žˆ˜\ÝHYÙ[‹ZZ›ˆYÙ[‹˜\Ú\ÚØX\[ˆ˜[œÜ\˜[YHŠ_KYOJ
OOžÔš[J
I‰ŠJš[J
K“^Y\œÈ‹JKŠˆŠK
LJKJLJJ_KYOJËYJOOžÓËœÝÜ›ÜYØ][ÛŠ
KYYKš\ÐZ[[‰‰˜ÛÛ™š\›J™\Ù]‰ÙYK›˜[Y_Hˆ™\ÚZ™\™[Ø
I‰™ŠYKšY
_KOJ
OOžØÛÛ™š\›J”Ý[™X\™™\Ù]È\œÝ[[È[ˆÜÙ\ÛYÙ[ˆXYÚÙ]^™\È[ˆØX\ÜÚ]YHÛÜ™[ˆ\YÙÙ^™]ˆ™HZYÙ[ˆ™\Ù]È›Z™[ˆ™ZÝY[‹ˆŠI‰œ

_NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹˜]Û‹ÛÛÛXÚÎ™ÙKÛ\ÜÓ˜[YNˆ™š^Y›ÝÛKLˆYLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎL›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH‹Ú[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ”™\Ù]HXÚÜšZž™HØX\[HYÙ[ˆZ]ÔÈZ]‹Ú[™[ŽššœÞ
‹ÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒ›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JKšœÞ
›‹˜]Û‹ÛÛÛXÚÎœËÛ\ÜÓ˜[YNˆ™š^Y›ÝÛKVÍŒHYLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎL›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH‹Ú[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ”™\Ù]È‹Ú[™[ŽšOÚšœÞ
Ó‹ÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒ›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJNššœÞ
‘ÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒ›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JKšœÞ
šKÚ\ÓÜ[ŽšK]Nˆ”™\Ù]È‹XÛÛŽššœÞ
‘ÜÚ^™NŒNJKXÙ[Y[ˆ›Y‹ÛÛÜÙNœË›ÛÝ\ŽšÏÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ^‹˜[YN”ÛÚ[™ÙN“ÏOžŠË\™Ù]˜[YJKÛ’Ù^QÝÛŽ“ÏOžÓËšÙ^OOOH‘[\ˆ‰‰šYJ
KËšÙ^OOOH‘\ØØ\H‰‰Š
LJKJLJJ_KXÙZÛ\Žˆ“˜X[H™\Ù]‹‹ˆ‹]]Ñ›ØÝ\ÎˆLÛ\ÜÓ˜[YNˆ›Z[‹]ËL›^LH›Ý[™Y[È›Ü™\ˆ›Ü™\‹YÜ˜^KLŒ™ËYÜ˜^KMLLÈKLˆÝ][™K[›Û™H›ØÝ\Î˜›Ü™\‹X›YKMŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎšYK\ØX›YˆTš[J
KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]ÛˆLÈ\ØX›Y›ÜXÚ]KML‹˜\šXK[X™[Žˆ”™\Ù]Ù]›ÙYÙ[ˆ‹Ú[™[ŽššœÞ
ÝKÜÚ^™NŒMŸJ_JW_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^^È^YÜ˜^KMŒ‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY’KÛÚ[™ÙN“ÏO•
Ë\™Ù]˜ÚXÚÙY
KÛ\ÜÓ˜[YNˆšMËMXØÙ[X›YKMŒŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“ØØ]YH	ˆ›ÛÛHÛÝY[ˆŸJW_JW_JNššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOJL
KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ŒÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ”™\Ù]Ù]›ÙYÙ[ˆŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ”KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝËZXÛÛ‹X]Ûˆ‹]Nˆ”Ý[™X\™™\Ù]È\œÝ[[ˆ‹˜\šXK[X™[Žˆ”Ý[™X\™™\Ù]È\œÝ[[ˆ‹Ú[™[ŽššœÞ
\™KÜÚ^™NŒMŸJ_JW_JKÚ[™[ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLKH‹Ú[™[Ž›Ë›X\
ÏOžØÛÛœÝYORM™VÓËšXÛÛ—_˜ËT™VÓËšXÛÛ—_^X›YKMŒ‹T™VÓËšXÛÛ—_šÝ™\Ž˜™ËX›YKML‹YOQOOOSËšYÜ™]\›ˆšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ›X‹LH›Ý[™Y[È‹™]K\™\Ù]ZYŽ“ËšYÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OO™JËšY
KÛ\ÜÓ˜[YN˜Z[‹ZVÍHZ[‹]ËL›^LH›^][\ËXÙ[\ˆØ\LKHL‹H	ÒŸH›Ý[™Y[È^[Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[Ý™\™›ÝËZY[ˆ	ØYOÈ˜™ËYÜ™Y[‹MLŽˆˆŸXÝ[NžÙ›ÛÚ^™N˜	Þ\Y[™ÕÜ˜	ÍŠ—ß\Y[™Ð›ÝÛN˜	ÍŠ—ß\KÚ[™[Ž–ÚšœÞ
YKÜÚ^™NŒMKÛ\ÜÓ˜[YN˜	ÒH›^\Úš[šËLJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ[˜Ø]H›^LH‹Ú[™[Ž“Ë›˜[Y_JW_JKšœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝËZXÛÛ‹X]ÛˆÚš[šËL‹Ý[NžÛZ[•ÚYZ[’ZYÚK]Nˆ’ZYYÙHYÙ[ˆÜÛX[ˆ˜X\ˆ^™H™\Ù]‹˜\šXK[X™[Ž˜YÙ[ˆÜÛX[ˆ[ˆ	ÓË›˜[Y_XÛÛXÚÎš™OOšJ™KËšYË›˜[YJKÚ[™[Ž˜YOÚšœÞ
ÝKÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^YÜ™Y[‹MLŸJNššœÞ
Ó‹ÜÚ^™NŒNJ_JKšœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝËZXÛÛ‹X]ÛˆÚš[šËL‹Ý[NžÛZ[•ÚYZ[’ZYÚK˜\šXK[X™[Ž˜™\Ù]	ÓË›˜[Y_H™]Ù\šÙ[˜]Nˆ”™\Ù]™]Ù\šÙ[ˆ‹ÛÛXÚÎŠ
OOžÓ
ËšY
KŠË›˜[YJKÙJHSË›X\šY]Ê_KÚ[™[ŽššœÞ
ËÜÚ^™NŒNJ_JKšœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝËZXÛÛ‹X]ÛˆÚš[šËL‹Ý[NžÛZ[•ÚYZ[’ZYÚK˜\šXK[X™[Ž˜ZœÝ˜[ˆ	ÓË›˜[Y_X]N˜ZœÝ˜[ˆ	ÓË›˜[Y_XÛÛXÚÎŠ
OO›]™Ù]Ý]J
K›Ü[”XÙS\Ý
™\Ù]‰ÓËšYX
KÚ[™[ŽššœÞ
™ËÜÚ^™NŒNJ_JW_JKOOSËšY	‰ššœÞÊ™›Ü›H‹ØÛ\ÜÓ˜[YNˆœLˆÜXÙK^KLˆ‹Û”ÝX›Z]š™OOžÚ™Kœ™]™[Y˜][

KYJ
_KÚ[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH‹Ú[™[Ž–È“˜X[H™\Ù]‹šœÞ
š[œ]‹È˜\šXK[X™[Žˆ“˜X[H™\Ù]‹Û\ÜÓ˜[YNˆ˜›ØÚÈËY[›Ü™\ˆ›Ý[™Y[ÈLˆ‹˜[YN‘ÛÚ[™ÙNš™OO•Š™K\™Ù]˜[YJK™\]Z\™YˆLJW_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LˆZ[‹ZVÍH^\ÛH‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙYš‹ÛÚ[™ÙNš™OO›ÙJ™K\™Ù]˜ÚXÚÙY
_JK“ØØ]YH	ˆ›ÛÛHÛÝY[ˆ—_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹Ý\NˆœÝX›Z]‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]Ûˆ‹\ØX›YˆQš[J
KÚ[™[Žˆ“ÜÛX[ˆŸJKšœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ‹ÛÛXÚÎŠ
OO“
[
KÚ[™[Žˆ[›[\™[ˆŸJKSËš\ÐZ[[‰‰ššœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝËZXÛÛ‹X]Ûˆ‹Ý[NžÛZ[•ÚYZ[’ZYÚK]Nˆ”™\Ù]™\ÚZ™\™[ˆ‹˜\šXK[X™[Ž˜™\Ù]	ÓË›˜[Y_H™\ÚZ™\™[˜ÛÛXÚÎš™OOYJ™KÊKÚ[™[ŽššœÞ
šÜÚ^™NŒNJ_JW_JW_JW_KËšY
_J_J_JW_J_Y[˜Ý[Ûˆ™J
^ØÛÛœÝU\ŠOO˜K›X\
KÙKOP‹\ÙTÝ]J
KÜ‹WOP‹\ÙTÝ]JLJNÐ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝO[‹™Ù]šY]Ê
KÏJ
OOžØÛÛœÝXK™Ù]›Ý][ÛŠ
KÏ[
ŒNÓX]”NÝ
ÊKJX]˜XœÊ
O‹ŒÊ_NÜ™]\›ˆÊ
KK›ÛŠ˜Ú[™ÙNœ›Ý][Ûˆ‹ÊK

OOžØK[Š˜Ú[™ÙNœ›Ý][Ûˆ‹Ê__KÛ—JNØÛÛœÝÏJ
OOžÛ‰‰›‹™Ù]šY]Ê
K˜[š[X]JÜ›Ý][ÛŽŒ\˜][ÛŽŒÌJ_NÜ™]\›ˆšœÞ
ËØÚ[™[Žœ‰‰ššœÞ
›‹˜]Û‹Ú[š]X[žÛÜXÚ]NŒØØ[N‹ŽK[š[X]NžÛÜXÚ]NŒKØØ[NŒ_K^]žÛÜXÚ]NŒØØ[N‹ŽK˜[œÚ][ÛŽžÙ\˜][ÛŽ‹ŒŸKÛÛXÚÎœËÛ\ÜÓ˜[YNˆ™š^YÜVÍŒHšYÚLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎL›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH‹]Nˆ’ÛZÈÛH›ÛÜ™[ˆH\œÝ[[ˆ‹Ú[™[ŽššœÞÊœÝ™È‹ÝÚYˆŒŒˆ‹ZYÚˆŒŒˆ‹šY]Ð›ÞˆŒ‹Ý[NžÝ˜[œÙ›Ü›N˜›Ý]J	ËY_YYÊXKÚ[™[Ž–ÚšœÞ
œ]‹Ùˆ“LLˆˆMHLˆLˆLKHLˆˆ‹š[ˆˆÑPMÌÍHŸJKšœÞ
œ]‹Ùˆ“LLˆŒˆKHLˆLˆMMHLˆˆ‹š[ˆÚ]H‹Ý›ÚÙNˆˆÎPÐLÐQˆ‹Ý›ÚÙUÚYˆŒHŸJKšœÞ
˜Ú\˜ÛH‹ØÞˆŒLˆ‹ÞNˆŒLˆ‹ŽˆŒˆ‹š[ˆˆÌÍÍMLHŸJW_J_J_J_XÛÛœÝ™O[™]ÈÙ]
È‘\ÜšH
XÚ
H‹“Ü[”Ý™Y]X\‹“XÚ›ÝÈ‹”Ø][Y]
Ù\™[
H‹’XœšYH
Ù\™[
H‹“X™[ÈÝ™\›^H‹’XœšY™Y™\™[˜ÙHÝ™\›^H‹“ZZ›ˆ›Û™Ý[ˆ—JNÙ[˜Ý[Ûˆ™J‹KV×J^ØÛÛœÝOSØš™XÝšÙ^\ÊŠK™š[\ŠÏO›–Û×I‰ˆQ™Kš\ÊÊJK™š[\ŠÏO™VÛ×HOO]›ÚYÛ×JK›X\
ÏOŠÚY˜Ý[™\™IÛßX^Y\’Ù^N›Ë˜[YN›ËÚ[™ˆœÝ[™\™‹ÜXÚ]N™VÛ×OÏÝÛ×K™Ù]ÜXÚ]J
_JJKÏ[™]ÈX\
ÕK›X\

Ë
OO–ÛËJJNÜ™]\›–Ë‹‹šK›X\

Ë
OOŠÚ][N›Ë[™^›JJKœÛÜ

Ë
OOžØÛÛœÝÏ\Ë™Ù]
Ëš][K›˜[YJKO\Ë™Ù]
š][K›˜[YJNÜ™]\›ˆÏOO]›ÚY	‰OOO]›ÚYÛËš[™^[š[™^˜ÏOO]›ÚYÌNOOO]›ÚYËLN˜Ë]_JK›X\

Ú][N›ßJOO›ÊK‹‹œ‹™š[\ŠÏO›Ëš\ÚX›JK›X\
ÏOŠÚY˜[\ÜYIÛËšYX^Y\’Ù^N›ËšY˜[YN›Ë›˜[YKÚ[™ˆš[\ÜY‹ÜXÚ]N›Ë›ÜXÚ]_JJW_Y[˜Ý[ÛˆÍ™J
^ØÛÛœÝ[]
OOK˜XÝ]™UÚ[™ÝÏOOH›ÜXÚ]HŠKO[]
OOKÙÙÛUÚ[™ÝÊK[]
OOK˜ÛÜÙUÚ[™ÝÊKXœŠOOKš\ÚX›JKOXœŠOOK›ÜXÚ]JKÏXœŠOOK›^Y\œÊKOXœŠOOKœÙ]^Y\“ÜXÚ]JKÏ\ZJOOK›^Y\œÊK\ZJOOKœÙ]ÜXÚ]JKÏQ™J‹KËÊNÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÛ‰‰˜Ë›[™ÝOOL	‰

_KØË›[™Ý—JK‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝOYOžÙ‹šÙ^OOOH‘\ØØ\H‰‰

_NÜ™]\›ˆØÝ[Y[˜Y]™[\Ý[™\ŠšÙ^YÝÛˆ‹JK

OO™ØÝ[Y[œ™[[Ý™Q]™[\Ý[™\ŠšÙ^YÝÛˆ‹J_KÛ‹JKË›[™ÝOOLÛ[ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™]XÝ[ÜXÚ]KXÛÛ›Û‹Ú[™[Ž–ÚšœÞ
R‹ÛX™[ˆ•˜[œÜ\˜[YH‹ÛÛ›ÛÎˆ›ÜXÚ]K\ÛY\‹[\Ý‹\ÓÜ[Ž›‹ÛÛXÚÎŠ
OO™J›ÜXÚ]HŠKÚ[™[ŽššœÞ
ËÜÚ^™NŒŒ‹Ý›ÚÙUÚYŒ‹˜\šXKZY[ˆŽˆYHŸJ_JKšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ•˜[œÜ\˜[YH‹XÙ[Y[ˆœšYÚ‹ÚÝÔØØ[PÛÛ›ÛˆLKÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝËKXÛÛ\XÝX›ÝÛK\šYÚ‹ÛÛÜÙNÚ[™[ŽššœÞ
™]ˆ‹ÚYˆ›ÜXÚ]K\ÛY\‹[\Ý‹Û\ÜÓ˜[YNˆ™]XÝ[ÜXÚ]K[\Ý‹Ú[™[Ž˜Ë›X\
OOššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™]XÝ[ÜXÚ]K\›ÝÈ‹Ú[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™]XÝ[ÜXÚ]K[X™[‹[›ÜŽ˜ÜXÚ]KIÝKšYXÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[ŽK›˜[Y_JKšœÞÊ›Ý]]‹ØÚ[™[Ž–ÓX]œ›Ý[™
K›ÜXÚ]JŒL
K‰H—_JW_JKšœÞ
š[œ]‹ÚY˜ÜXÚ]KIÝKšYX\Nˆœ˜[™ÙH‹Z[ŽˆŒ‹X^ˆŒL‹Ý\ˆŒH‹˜[YN“X]œ›Ý[™
K›ÜXÚ]JŒL
K˜\šXK]˜[Y]^Ž˜	ÓX]œ›Ý[™
K›ÜXÚ]JŒL
_IXÛÚ[™ÙN™OžØÛÛœÝS[X™\Š‹\™Ù]˜[YJKÌLÝKšÚ[™OOHš[\ÜYÛ
K›^Y\’Ù^K
N˜JK›^Y\’Ù^K
__JW_KKšY
J_J_JW_J_XÛÛœÝÕHšÎ‹ËÙÙ[ØÛÙK˜\˜ÙÚ\Ë˜ÛÛKØ\˜ÙÚ\ËÜ™\ÝÜÙ\šXÙ\ËÕÛÜ›ÑÙ[ØÛÙTÙ\™\ˆŽÙ[˜Ý[Ûˆ™J
^ØÛÛœÝU\ŠO•›X\
KO^[ŠO•œÚÝÕÙX]\]ÛŠKÝ—OP‹\ÙTÝ]JLJKÚK×OP‹\ÙTÝ]JˆŠKØK×OP‹\ÙTÝ]J×JKÛ×OP‹\ÙTÝ]JLJKÝK—OP‹\ÙTÝ]JLJKÜWOP‹\ÙTÝ]J[
KOP‹\ÙT™YŠ[
KP‹\ÙT™YŠ[
KÏP‹\ÙT™YŠ
KOP‹\ÙT™YŠ[
KÏ[]
O•˜XÝ]™UÚ[™ÝÊNÐ‹\ÙQY™™XÝ


OOžÔÉ‰šÊ
_KÔ×JK‹\ÙQY™™XÝ


OOžÝ	‰žK˜Ý\œ™[	‰žK˜Ý\œ™[™›ØÝ\Ê
_KÝJK‹\ÙQY™™XÝ


OOžÚYŠ]
\™]\›ŽØÛÛœÝTOžÞ˜Ý\œ™[	‰ˆ^˜Ý\œ™[˜ÛÛZ[œÊ‹\™Ù]
I‰šÊ
_NÜ™]\›ˆØÝ[Y[˜Y]™[\Ý[™\Š›[Ý\ÙYÝÛˆ‹
K

OO™ØÝ[Y[œ™[[Ý™Q]™[\Ý[™\Š›[Ý\ÙYÝÛˆ‹
_KÝJK‹\ÙQY™™XÝ


OOžÚYŠ]
\™]\›ŽØÛÛœÝTOžÔ‹šÙ^OOOH‘\ØØ\H‰‰šÊ
_NÜ™]\›ˆØÝ[Y[˜Y]™[\Ý[™\ŠšÙ^YÝÛˆ‹
K

OO™ØÝ[Y[œ™[[Ý™Q]™[\Ý[™\ŠšÙ^YÝÛˆ‹
_KÝJK‹\ÙQY™™XÝ


OOž×Ë˜Ý\œ™[	‰˜ÛX\•[Y[Ý]
Ë˜Ý\œ™[
NØÛÛœÝZKš[J
NÚYŠK˜Ý\œ™[Ë˜X›Ü

K›[™ÝŠ^ÛÊ×JKŠLJKJ[
NÜ™]\›Ÿ\™]\›ˆÊ×JKŠL
KJ[
KË˜Ý\œ™[]Ú[™ÝËœÙ][Y[Ý]
\Þ[˜Ê
OOžØÛÛœÝ[™]ÈX›ÜÛÛ›Û\ŽÑK˜Ý\œ™[TŽÝž^ØÛÛœÝ[™]ÈT“ÙX\˜Ú\˜[\ÊÝ^•ŽˆšœÛÛˆ‹X^ÝYÙÙ\Ý[ÛœÎˆÈŸJKX]ØZ]™]Ú
	ÙÕŸKÜÝYÙÙ\ÝÉÓXÜÚYÛ˜[”‹œÚYÛ˜[JNÚYŠQ›ÚÊ]›ÝÈ™]È\œ›ÜŠ›ÙZÙY[œÝØYˆÝ]\È	ÑœÝ]\ßX
NØÛÛœÝX]ØZ]šœÛÛŠ
NÚYŠ‹™\œ›ÜŠ]›ÝÈ™]È\œ›ÜŠ‹™\œ›Ü‹›Y\ÜØYÙ_–›ÙZÙY[œÝšY]™\ØÚZØ˜X\ˆŠNÛÊ\œ˜^Kš\Ð\œ˜^J‹œÝYÙÙ\Ý[ÛœÊOÕ‹œÝYÙÙ\Ý[ÛœÎ–×J_XØ]Ú

^ÚYŠ[œÝ[˜Ù[ÙˆÓQ^Ù\[Û‰‰“›˜[YOOOHX›Ü\œ›ÜˆŠ\™]\›ŽØÛÛœÛÛK™\œ›ÜŠ”ÙX\˜Ú\œ›ÜŽˆ‹
KÊ×JKJ–›ÙZÙ[ˆZÝHšY]ˆ›Ø™Y\ˆ]ÜšY]]ËˆŠ_Yš[˜[^ÑK˜Ý\œ™[OOT‰‰ŠK˜Ý\œ™[[[ŠLJJ__KÍL
K

OOž×Ë˜Ý\œ™[	‰˜ÛX\•[Y[Ý]
Ë˜Ý\œ™[
KK˜Ý\œ™[Ë˜X›Ü

__KÚWJNØÛÛœÝÏJ
OOžÜŠLJKÊˆŠKÊ×JKÊLJKŠLJKJ[
KK˜Ý\œ™[Ë˜X›Ü

_KOX\Þ[˜ÈOžÝž^ØÛÛœÝ[™]ÈT“ÙX\˜Ú\˜[\ÊÔÚ[™ÛS[™N•^XYÚXÒÙ^N•›XYÚXÒÙ^KŽˆšœÛÛˆ‹X^ØØ][ÛœÎˆŒH‹Ý]šY[Îˆ“X]ÚØY‹Y—Ý\KÛÝ[žH‹›Ü”ÝÜ˜YÙNˆ™˜[ÙHŸJKX]ØZ]™]Ú
	ÙÕŸKÙš[™Y™\ÜÐØ[™Y]\ÏÉÔŸX
NÚYŠS›ÚÊ]›ÝÈ™]È\œ›ÜŠ›ÙZÙY[œÝØYˆÝ]\È	ÓœÝ]\ßX
NØÛÛœÝJ]ØZ]šœÛÛŠ
JK˜Ø[™Y]\ÏË–ÌNÚYŠË›ØØ][ÛŠ\™]\›žÛ™Î•‹›ØØ][Û‹ž]•‹›ØØ][Û‹ž__XØ]Ú
Š^ØÛÛœÛÛK™\œ›ÜŠ“ÛÚÝ\\œ›ÜŽˆ‹Š_\™]\›ˆ[KX\Þ[˜ÈOžÚYŠ[Š\™]\›ŽØÛÛœÝX]ØZ]J
NÔÊ‹™Ù]šY]Ê
K˜[š[X]JØÙ[\Ž\ŠÔ‹›™Ë‹›]JK›ÛÛNŒM‹\˜][ÛŽŒYLßJKÊ
JN›J‘^™HØØ]YHÛÛˆšY]ÛÜ™[ˆÙ[Ü[™ˆŠ_KX\Þ[˜ÊŠOOžÔ‹œÝÜ›ÜYØ][ÛŠ
NØÛÛœÝX]ØZ]J
NÚYŠ
^ØÛÛœÝXÎ‹ËÝÝÝË™ÛÛÙÛK˜ÛÛKÛX\ÏÜOIÓ›]K	Ó›™ßXÝÚ[™ÝË›Ü[Š—Ø›[šÈŠKÊ
_Y[ÙHJ‘^™HØØ]YHÛÛˆšY]ÛÜ™[ˆÙ[Ü[™ˆŠ_KO^ÝÜˆ›X^
\™[K[ŠØY™KX\™XKZ[œÙ]]Ü\™[JJHŸNÜ™]\›ˆÚšœÞÊ™]ˆ‹Ü™YŽžÛ\ÜÓ˜[YN˜š^YšYÚLM‹VÌLMLHYLˆ	ÙOÈœÛN›YVÌŒŒHŽˆœÛN›YVÍLœHŸXÝ[N’KÚ[™[Ž–ÚšœÞÊ›‹™]‹Ú[š]X[žÛÜXÚ]NŒØØ[N‹ŽM_K[š[X]NžÛÜXÚ]NŒKØØ[NŒ_K^]žÛÜXÚ]NŒØØ[N‹ŽM_KÛ\ÜÓ˜[YNˆœÙX\˜ÚZ[œ]]Ü˜\\ˆ‹Ú[™[Ž–ÚšœÞ
ÚÜÚ^™NŒNÛ\ÜÓ˜[YNˆœÙX\˜ÚZXÛÛˆŸJKšœÞ
š[œ]‹Ü™YŽžK\Nˆ^‹˜[YNšKÛÚ[™ÙN•OžÜÊ\™Ù]˜[YJKÊL
_KÛ‘›ØÝ\ÎŠ
OO˜ÊL
KXÙZÛ\Žˆ–›ÙZÈY™\ÈÙˆX]È[ˆ]\›ÜK‹‹ˆ‹Û\ÜÓ˜[YNˆœÙX\˜ÚZ[œ]ŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎšËÛ\ÜÓ˜[YNˆœÙX\˜ÚXÛX\ˆ‹]Nˆ”ÛZ][ˆ‹Ú[™[ŽššœÞ
[ËÜÚ^™NŒNJ_JW_JKšœÞ
ËØÚ[™[Ž›	‰˜K›[™ÝŒ	‰ššœÞ
›‹[ØÛ\ÜÓ˜[YNˆœÙX\˜Ú\™\Ý[È‹[š]X[žÛÜXÚ]NŒN‹NK[š[X]NžÛÜXÚ]NŒKNŒK^]žÛÜXÚ]NŒN‹NKÚ[™[Ž˜K›X\
OššœÞÊ›H‹ØÛ\ÜÓ˜[YNˆœÙX\˜Ú\™\Ý[Z][H‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœÙX\˜Ú\™\Ý[XÛÛ[‹ÛÛXÚÎŠ
OO”

KÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆœÙX\˜Ú\™\Ý[]^‹Ú[™[Ž•^J_JKšœÞ
˜]Ûˆ‹ØÛ\ÜÓ˜[YNˆœÙX\˜Ú[˜]šYØ]KXˆ‹ÛÛXÚÎ”OžŠŠK]Nˆ“Ü[ˆ[ˆÛÛÙÛHX\È‹Ú[™[ŽššœÞ
ZÜÚ^™NŒŒJ_JW_K›XYÚXÒÙ^JJ_J_JK	‰I‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœÙX\˜Ú[ØY[™È‹Ú[™[Žˆ–›ÙZÙ[‹‹‹ˆŸJK	‰ˆ]I‰œ	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœÙX\˜Ú[ØY[™ÈÙX\˜ÚY\œ›Üˆ‹Ú[™[ŽœJK	‰ˆ]I‰ˆ\	‰šKš[J
K›[™ÝL‰‰˜K›[™ÝOOL	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœÙX\˜Ú[ØY[™È‹Ú[™[Žˆ‘ÙY[ˆØØ]Y\ÈÙ]›Û™[ˆŸJW_JNššœÞ
›‹˜]Û‹ØÛ\ÜÓ˜[YNˆ™š^YšYÚLM‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]KÎLÝ™\Ž˜™Ë]Ú]H›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH‹Ý[N’KÛÛXÚÎŠ
OOžÛ]™Ù]Ý]J
K˜ÛÜÙP[[™[Ê
KŠL
_KÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ–›ÙZÙ[ˆ[ˆ]\›ÜH‹Ú[™[ŽššœÞ
ÚÜÚ^™NŒŒ‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŒ›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_J_Y[˜Ý[ÛˆÍ™J
^ØÛÛœÝU\ŠOœ‹›X\
KOJ
OOžÚYŠ[Š\™]\›ŽØÛÛœÝ[‹™Ù]šY]Ê
KO\‹™Ù]›ÛÛJ
NÚHOO]›ÚY	‰œ‹˜[š[X]JÞ›ÛÛNšJÌK\˜][ÛŽŒŒJ_KJ
OOžÚYŠ[Š\™]\›ŽØÛÛœÝ[‹™Ù]šY]Ê
KO\‹™Ù]›ÛÛJ
NÚHOO]›ÚY	‰œ‹˜[š[X]JÞ›ÛÛNšKLK\˜][ÛŽŒŒJ_NÜ™]\›ˆšœÞÊ›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^Y›ÝÛKLˆšYÚLˆ‹VÎH›^›^\›ÝË\™]™\œÙHØ\LH‹Ú[™[Ž–ÚšœÞ
›‹˜]Û‹ØÛ\ÜÓ˜[YNˆËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎL›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH‹ÛÛXÚÎÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ•Z]›ÛÛY[ˆ‹Ú[™[ŽššœÞ
Õ‹ÜÚ^™NŒŒ‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŒ›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JKšœÞ
›‹˜]Û‹ØÛ\ÜÓ˜[YNˆËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎL›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH‹ÛÛXÚÎ™KÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ’[ž›ÛÛY[ˆ‹Ú[™[ŽššœÞ
ŒÜÚ^™NŒŒ‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŒ›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JW_J_Y[˜Ý[Ûˆ™JÚ\ÓÜ[Ž›‹ÛÛÜÙN™_J^ØÛÛœÝ]ÊO››Û™Ý[ŠK^ÝÝ[›[™ÝžU\NžßKžSX]\šX[žßKžT\š[ÙžßKžPÛÛ™][ÛŽžßK]™Ñ\ŒÝ[ÙZYÚŒ™XÙ[œÛXÙJMJKœ™]™\œÙJ
_NÛ]OLÏLÝ™›Ü‘XXÚ
OžÜ‹˜žU\VÛ›Øš™XÝ\WOJ‹˜žU\VÛ›Øš™XÝ\W_
JÌK‹˜žSX]\šX[Û›X]\šX[OJ‹˜žSX]\šX[Û›X]\šX[_
JÌK‹˜žT\š[ÙÛœ\š[ÙOJ‹˜žT\š[ÙÛœ\š[Ù_
JÌK˜ÛÛ™][Û‰‰Š‹˜žPÛÛ™][Û–Û˜ÛÛ™][Û—OJ‹˜žPÛÛ™][Û–Û˜ÛÛ™][Û—_
JÌJK™\	‰ŠJÏ[™\ÊÊÊKÙZYÚ	‰Š‹Ý[ÙZYÚ
Ï[ÙZYÚ
_JK‹˜]™Ñ\\ÏŒÓX]œ›Ý[™
KÜÊNŒØÛÛœÝO[O“Øš™XÝ™[šY\Ê
KœÛÜ

ËJOOVÌWKXÖÌWJKÏ[O“X]›X^
‹‹“Øš™XÝ˜[Y\Ê
KJNÜ™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ“ZZ›ˆ›Û™Ý[ˆ‹XÛÛŽššœÞ
Õ‹ÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN™KÛ˜XÚÎ™KÚ[™[ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHÝ™\™›ÝË^KX]]ÈMÜXÙK^KMH‹Ú[™[Ž›[™ÝOOLÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^XÙ[\ˆKN^YÜ˜^KML‹Ú[™[Ž–ÚšœÞ
ZKÜÚ^™NÛ\ÜÓ˜[YNˆ›^X]]ÈX‹LÈÜXÚ]KLÌŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Žˆ“›ÙÈÙY[ˆ›Û™Ý[ˆŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH]LH‹Ú[™[Žˆ•›ÙYÈ™HY\œÝH›Û™ÝÙHšXHHÜ˜[š™HÛ›ÜÙˆÛ™Ë\™\ÜÈÜHØX\ŸJW_JNššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLÈØ\LÈ‹Ú[™[Ž–ÚšœÞ
ÒKÚXÛÛŽššœÞ
ZKÜÚ^™NŒŒJK˜[YNœ‹Ý[X™[ˆ•ÝX[‹ÛÛÜŽˆ˜™Ë[Ü˜[™ÙKLL^[Ü˜[™ÙKMÌŸJKšœÞ
ÒKÚXÛÛŽššœÞ
ÜÚ^™NŒŒJK˜[YNœ‹˜]™Ñ\ŒØ	Ü‹˜]™Ñ\XÛXˆ‹H‹X™[ˆ‘Ù[KˆY\H‹ÛÛÜŽˆ˜™ËX›YKLL^X›YKMÌŸJKšœÞ
ÒKÚXÛÛŽššœÞ
Ü™KÜÚ^™NŒŒJK˜[YNœ‹Ý[ÙZYÚŒØ	Ü‹Ý[ÙZYÚÑš^Y
J_YØˆ‹H‹X™[ˆ•ÝˆÙ]ÚXÚ‹ÛÛÜŽˆ˜™ËYÜ™Y[‹LL^YÜ™Y[‹MÌŸJW_JKšœÞ
L‹Ý]Nˆ”\ˆ\H‹]N˜J‹˜žU\JKX^›Ê‹˜žU\JKÛÛÜŽˆ˜™Ë[Ü˜[™ÙKMLŸJKšœÞ
L‹Ý]Nˆ”\ˆ\š[ÙH‹]N˜J‹˜žT\š[Ù
KX^›Ê‹˜žT\š[Ù
KÛÛÜŽˆ˜™ËX[X™\‹MLŸJKšœÞ
L‹Ý]Nˆ”\ˆX]\šXX[‹]N˜J‹˜žSX]\šX[
KX^›Ê‹˜žSX]\šX[
KÛÛÜŽˆ˜™ËX›YKMLŸJKØš™XÝšÙ^\Ê‹˜žPÛÛ™][ÛŠK›[™ÝŒ	‰ššœÞ
L‹Ý]Nˆ”\ˆÛÛ™]YH‹]N˜J‹˜žPÛÛ™][ÛŠKX^›Ê‹˜žPÛÛ™][ÛŠKÛÛÜŽˆ˜™ËYÜ™Y[‹MLŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û\Ù[ZX›Û^YÜ˜^KMÌX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
“‹ÜÚ^™NŒMJK”™XÙ[H›Û™Ý[ˆ—_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Žœ‹œ™XÙ[›X\
OššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆKLˆLÈ™ËYÜ˜^KML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^\ÛH^YÜ˜^KN‹Ú[™[Ž››Øš™XÝ\_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KM^LH‹Ú[™[Žˆ‹HŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ˜^KMŒ‹Ú[™[Ž››X]\šX[JW_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KM‹Ú[™[Ž›™]È]J[Y\Ý[\
KÓØØ[Q]TÝš[™Ê››S“Š_JW_KšY
J_JW_JW_J_J_J_Y[˜Ý[ÛˆÒJÚXÛÛŽ›‹˜[YN™KX™[ÛÛÜŽœŸJ^Ü™]\›ˆšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YN˜›Ý[™Y[ÈLÈ	ÜŸXÚ[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LˆX‹LHÜXÚ]KMÌ‹Ú[™[Ž›ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^›ÛX›Û‹Ú[™[Ž™_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^ÈÜXÚ]KMÌ‹Ú[™[ŽJW_J_Y[˜Ý[ÛˆLŠÝ]N›‹]N™KX^ÛÛÜŽœŸJ^Ü™]\›ˆK›[™ÝOOLÛ[ššœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û\Ù[ZX›Û^YÜ˜^KMÌX‹Lˆ‹Ú[™[Ž›ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLKH‹Ú[™[Ž™KœÛXÙJŠK›X\

ÚK×JOOššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËL^^È^YÜ˜^KMŒ[˜Ø]H‹]NšKÚ[™[Žš_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHM™ËYÜ˜^KLL›Ý[™YY[Ý™\™›ÝËZY[ˆ‹Ú[™[ŽššœÞ
›‹™]‹ØÛ\ÜÓ˜[YN˜Y[	ÜŸH›Ý[™YY[[š]X[žÝÚYŒK[š[X]NžÝÚY˜	ÜËÝ
ŒLIXK˜[œÚ][ÛŽžÙ\˜][ÛŽ‹KX\ÙNˆ™X\ÙSÝ]Ÿ_J_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËMˆ^^È^YÜ˜^KMŒ^\šYÚ›Û[YY][H‹Ú[™[ŽœßJW_KJJ_JW_J_Y[˜Ý[Ûˆ™JŠ^ØÛÛœÝÝ\N™KÛÛÜ™[˜]\ÎO[‹[ÏO\ŠÊKO[ÏO›Ë›X\
ŠKÏ[ÏO›Ë›X\
JKO[ÏO›Ë›X\
ÊNÜÝÚ]Ú
J^ØØ\ÙH”Ú[Žœ™]\›ˆ™]ÈœŠŠ
JNØØ\ÙH“[™TÝš[™ÈŽœ™]\›ˆ™]ÈJJ
JNØØ\ÙH”ÛYÛÛˆŽœ™]\›ˆ™]ÈXJÊ
JNØØ\ÙH“][S[™TÝš[™ÈŽœ™]\›ˆ™]ÈÛ
Ê
JNØØ\ÙH“][TÛYÛÛˆŽœ™]\›ˆ™]ÈÊJ
JNÙY˜][œ™]\›ˆ[_Y[˜Ý[ÛˆM™J‹J^ØÛÛœÝK×ˆÏÊØKY—^ÌŸJJØKY—^ÌŸJJØKY—^ÌŸJIÚK™^XÊŠNÚYŠ]
\™]\›ˆŽØÛÛœÝ\\œÙR[
ÌWKMŠKO\\œÙR[
Ì—KMŠKÏ\\œÙR[
Ì×KMŠNÜ™]\›˜™Ø˜J	ÜŸK	Ú_K	ÜßK	Ù_JXY[˜Ý[Ûˆ	™J‹KHLJ^Ü™]\›ˆ™]È
Ú[XYÙNÛ™]ÈÊÜ˜Y]\ÎÞJJJÌKš[›™]È›ŠØÛÛÜŽ›‹˜ÛÛÜŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™ˆ‹ÚYŒŸJ_JN•Œ
‹˜ÛÛÜ‹J_J_Y[˜Ý[Ûˆ”J‹KŠ^ØÛÛœÝO\×ÊŠKÏZOOOHœÚ[ÈÛ‹œÝ[KœÚ[Ë˜ÛÛÜŽšOOOH›[™\ÈÛ‹œÝ[K›[™\Ë˜ÛÛÜŽ›‹œÝ[KœÛYÛÛœËœÝ›ÚÙPÛÛÜŽÜ™]\›žË‹‹™Kœ›Ü\Y\ßßK^Y\•\Nˆš[\ÜY^Y\ˆ‹^Y\’Y›‹šY^Y\“˜[YN›‹›˜[YK^Y\ÛÛÜŽœË^Y\”Ü\ÛÛ™šYÎ›‹œÜ\ÛÛ™šYË[\ÜYÙ[ÛY]žU\Nœ‹[\ÜYÙ[ÛY]žQÜ›Ý\šK™X]\™R[™^_Y[˜Ý[ÛˆÍ™J‹J^ÙK™™X]\™\Ë™™X]\™\Ë™›Ü‘XXÚ

ŠOOžÚYŠ]™Ù[ÛY]ž_×Ê™Ù[ÛY]žK\JHOOHœÚ[ÈŠ\™]\›ŽÊ™Ù[ÛY]žK\OOOH”Ú[ÖÝ™Ù[ÛY]žK˜ÛÛÜ™[˜]\×N™Ù[ÛY]žK˜ÛÛÜ™[˜]\ÊK™›Ü‘XXÚ

ËJOOžÛ‹˜Y™X]\™J™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠ\ŠÊJK‹‹’”JK‹™Ù[ÛY]žK\JK[\ÜYÚ[[™^˜_JJ_J_J_Y[˜Ý[ÛˆŠ‹K
^ÙK™™X]\™\Ë™™X]\™\Ë™›Ü‘XXÚ

‹JOOžÚYŠ\‹™Ù[ÛY]ž_×Ê‹™Ù[ÛY]žK\JHOO]
\™]\›ŽØÛÛœÝÏP™J‹™Ù[ÛY]žJNÜÉ‰›‹˜Y™X]\™J™]ÈÜŠÙÙ[ÛY]žNœË‹‹’”JK‹K‹™Ù[ÛY]žK\J_JJ_J_Y[˜Ý[ÛˆUŠ‹J^ÙK›^Y\œË™›Ü‘XXÚ
O›Ëœ™[[Ý™S^Y\Š
J_Y[˜Ý[Ûˆ™J
^ØÛÛœÝU\ŠOœ‹›X\
KO\ZJOœ‹›^Y\œÊKP‹\ÙT™YŠ™]ÈX\
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠŠ\™]\›ˆ˜Ý\œ™[™›Ü‘XXÚ
O›UŠ‹ŠJK˜Ý\œ™[˜ÛX\Š
KK™›Ü‘XXÚ
OžØÛÛœÝOV×KÏ[™]ÈÚNÚYŠŠË‹œÛYÛÛœÈŠKË™Ù]™X]\™\Ê
K›[™ÝŒ
^ØÛÛœÝ[™]ÈÚJÜÛÝ\˜ÙNœË’[™^ŽLš\ÚX›Nœ‹š\ÚX›I‰œ‹œÝ[KœÛYÛÛœËš\ÚX›KÜXÚ]Nœ‹›ÜXÚ]KÝ[N›™]È
Ùš[›™]È›ŠØÛÛÜŽ•M™J‹œÝ[KœÛYÛÛœË™š[ÛÛÜ‹‹œÝ[KœÛYÛÛœË™š[ÜXÚ]J_JKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽœ‹œÝ[KœÛYÛÛœËœÝ›ÚÙPÛÛÜ‹ÚYœ‹œÝ[KœÛYÛÛœËœÝ›ÚÙUÚYJ_JK›Ü\Y\ÎžÝ]N˜	Ü‹›˜[Y_H0­È›ZÚÙ[˜Ý\ÝÛS^Y\’Yœ‹šY_JNÛ‹˜Y^Y\Š
KKœ\Ú

_XÛÛœÝO[™]ÈÚNÚYŠŠK‹›[™\ÈŠKK™Ù]™X]\™\Ê
K›[™ÝŒ
^ØÛÛœÝ[™]ÈÚJÜÛÝ\˜ÙN˜K’[™^ŽLKš\ÚX›Nœ‹š\ÚX›I‰œ‹œÝ[K›[™\Ëš\ÚX›KÜXÚ]Nœ‹›ÜXÚ]KÝ[N›™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽœ‹œÝ[K›[™\Ë˜ÛÛÜ‹ÚYœ‹œÝ[K›[™\ËÚYJ_JK›Ü\Y\ÎžÝ]N˜	Ü‹›˜[Y_H0­ÈZ›™[˜Ý\ÝÛS^Y\’Yœ‹šY_JNÛ‹˜Y^Y\Š
KKœ\Ú

_XÛÛœÝÏ[™]ÈÚNÚYŠÍ™JËŠKË™Ù]™X]\™\Ê
K›[™ÝŒ
^ØÛÛœÝ[™]ÈX\Ï[™]ÈÚJÜÛÝ\˜ÙN›Ë’[™^ŽL‹š\ÚX›Nœ‹š\ÚX›I‰œ‹œÝ[KœÚ[Ëš\ÚX›KÜXÚ]Nœ‹›ÜXÚ]KÝ[NŠKŠOOžØÛÛœÝ]ÞJŠNÜ™]\›ˆš\Ê
_œÙ]
	™J‹œÝ[KœÚ[Ë‹ÛÜYKÚK\Ý
‹›˜[YJJJK™Ù]

_K›Ü\Y\ÎžÝ]N˜	Ü‹›˜[Y_H0­È[[˜Ý\ÝÛS^Y\’Yœ‹šY_JNÛ‹˜Y^Y\ŠÊKKœ\Ú
Ê_]˜Ý\œ™[œÙ]
‹šYÛ^Y\œÎš_J_JK

OOžÝ˜Ý\œ™[™›Ü‘XXÚ
O›UŠ‹ŠJK˜Ý\œ™[˜ÛX\Š
__KÛ‹WJK[ZÜ‹™YœÊ‘TÑÎŒŽNLˆ‹ŠÜ›Ú\Ý\™XH
Û]ÌML‹ŒMMŒMŒMMMMMMMH
ÛÛ—ÌMKŒÎÍŒÎH
ÚÏLŽNNNLÎH
ÞÌLMML
ÞWÌMŒÌ
Ù[ÏX™\ÜÙ[
ÝÝÙÜÎMMKMËLŒÌÌNKKML‹LŒÎNMMËŒÍÎNLKŽÍÍŒÌH
Ý[š]Ï[H
Û›×ÙYœÈŠNÕTJÜŠNÙ[˜Ý[ÛˆÍ™JŠ^ÚYŠ[Ÿ‹›[™ÝŠ\™]\›ˆ[šÛ›ÝÛˆŽØÛÛœÝÙKO[ŽÜ™]\›ˆOMÙLÉ‰™OLÙMI‰LŽYLÉ‰MŒŽYLÏÈ”‘Ž“X]˜XœÊJOLN	‰“X]˜XœÊ
ONLÈ•ÑÔÎŽˆ[šÛ›ÝÛˆŸY[˜Ý[ÛˆM™JŠ^ØÛÛœÝÙKO[ŽÜ™]\›ˆÜŠ‘TÑÎŒŽNLˆ‹‘TÑÎÌˆ‹ÙKJ_Y[˜Ý[ÛˆTJ‹J^Ü™]\›ˆ\[Ùˆ–ÌOOH›[X™\ˆÙJŠN›‹›X\
O”TJJJ_Y[˜Ý[Ûˆ™JŠ^ØÛÛœÝO[‹˜ÛÛÜ™[˜]\ÎÜ™]\›ˆY_\œ˜^Kš\Ð\œ˜^JJI‰™K›[™ÝOOLÛ[›‹\OOOH”Ú[ÙN›‹\OOOH“[™TÝš[™ÈŸ‹\OOOH“][TÚ[ÙVÌN›‹\OOOH”ÛYÛÛˆŸ‹\OOOH“][S[™TÝš[™ÈÙVÌOË–ÌN›‹\OOOH“][TÛYÛÛˆÙVÌOË–ÌOË–ÌN›[X\Þ[˜È[˜Ý[ÛˆM™JŠ^ØÛÛœÝOV×KV×NÝž^ØÛÛœÝX]ØZ]‹^

KOR”ÓÓ‹œ\œÙJŠNÚYŠZK\J\™]\›ˆKœ\Ú
	ÓÛ™Ù[YÈÙ[Ò”ÓÓŽˆÙY[ˆ\Hˆ™[Ù]›Û™[‰ÊKÜÝXØÙ\ÜÎˆLK™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î–×_K\œ›ÜœÎ™KØ\›š[™ÜÎY]Y]NžÙ™X]\™PÛÝ[ŒÙ[ÛY]žU\\Î–×KÛÛÜ™[˜]TÞ\Ý[Nˆ[šÛ›ÝÛˆ‹˜[œÙ›Ü›YYˆL__NÛ]ÏV×NÚK\OOOH‘™X]\™PÛÛXÝ[ÛˆÜÏZK™™X]\™\ß×NšK\OOOH‘™X]\™HÜÏVÚWNšK\OOOH‘Ù[ÛY]žPÛÛXÝ[ÛˆÜÏJK™Ù[ÛY]šY\ß×JK›X\

ËJOOŠÝ\Nˆ‘™X]\™H‹Ù[ÛY]žN˜Ë›Ü\Y\ÎžÚY__JJNœÏVÞÝ\Nˆ‘™X]\™H‹Ù[ÛY]žNšK›Ü\Y\Îžß_WKË›[™ÝOOL	‰œ\Ú
‘ÙY[ˆ™X]\™\ÈÙ]›Û™[ˆ[ˆ™\Ý[™ŠNÛ]OH[šÛ›ÝÛˆ‹ÏHLNÚYŠË›[™ÝŒ	‰œÖÌK™Ù[ÛY]žJ^ØÛÛœÝÏV™JÖÌK™Ù[ÛY]žJNØÉ‰ŠORÍ™JÊJ_XOOOH”‘‰‰Šœ\Ú
”šZšÜÙšYZÙZÈÛÛÜ™[˜][ˆÙY]XÝY\™ÛÜ™[ˆÛYÙ^™]˜X\ˆÑÔÎŠKÏHLÏ\Ë›X\
ÏOžÚYŠXË™Ù[ÛY]žJ\™]\›ˆÎØÛÛœÝOTTJË™Ù[ÛY]žK˜ÛÛÜ™[˜]\ËM™JNÜ™]\›žË‹‹˜ËÙ[ÛY]žNžË‹‹˜Ë™Ù[ÛY]žKÛÛÜ™[˜]\Î___JKOH•ÑÔÎŠNØÛÛœÝVË‹‹›™]ÈÙ]
Ë™š[\ŠÏO˜Ë™Ù[ÛY]žJK›X\
ÏO˜Ë™Ù[ÛY]žK\JJWNÜ™]\›žÜÝXØÙ\ÜÎˆL™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\ÎœßK\œ›ÜœÎ™KØ\›š[™ÜÎY]Y]NžÙ™X]\™PÛÝ[œË›[™ÝÙ[ÛY]žU\\Î›ÛÛÜ™[˜]TÞ\Ý[N˜K˜[œÙ›Ü›YY›ß__XØ]Ú
Š^Ü™]\›ˆKœ\Ú
›Ý]šZˆ\œÙ[Žˆ	Üˆ[œÝ[˜Ù[Ùˆ\œ›ÜÜ‹›Y\ÜØYÙNˆ“Û˜™ZÙ[™H›Ý]ŸX
KÜÝXØÙ\ÜÎˆLK™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î–×_K\œ›ÜœÎ™KØ\›š[™ÜÎY]Y]NžÙ™X]\™PÛÝ[ŒÙ[ÛY]žU\\Î–×KÛÛÜ™[˜]TÞ\Ý[Nˆ[šÛ›ÝÛˆ‹˜[œÙ›Ü›YYˆL____X\Þ[˜È[˜Ý[Ûˆ™JŠ^ØÛÛœÝOV×KV×NÝž^ØÛÛœÝX]ØZ]‹^

KÏ[™]ÈJÙ^˜XÝÝ[\ÎˆL_JKœ™XY™X]\™\Ê‹Ù]T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆ‹™X]\™T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆŸJNÜË›[™ÝOOL	‰œ\Ú
‘ÙY[ˆ™X]\™\ÈÙ]›Û™[ˆ[ˆÓS™\Ý[™ŠNØÛÛœÝ[™]ÈÛ

KÜš]Q™X]\™\ÓØš™XÝ
ËÙ]T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆ‹™X]\™T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆŸJK™™X]\™\Ë›X\

KŠOOžØÛÛœÝ^Ë‹‹Kœ›Ü\Y\ßKO\›˜[Y_“˜[Y_™X]\™H	ÙŠÌ_XO\™\ØÜš\[ÛŸ‘\ØÜš\[ÛŸˆŽÜ™]\›žÝ\Nˆ‘™X]\™H‹Ù[ÛY]žNK™Ù[ÛY]žK›Ü\Y\ÎžË‹‹œ˜[YN›K\ØÜš\[ÛŽž___JKÏVË‹‹›™]ÈÙ]
™š[\ŠOOK™Ù[ÛY]žJK›X\
OOK™Ù[ÛY]žK\JJWNÜ™]\›žÜÝXØÙ\ÜÎˆL™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î›K\œ›ÜœÎ™KØ\›š[™ÜÎY]Y]NžÙ™X]\™PÛÝ[››[™ÝÙ[ÛY]žU\\Î˜ËÛÛÜ™[˜]TÞ\Ý[Nˆ•ÑÔÎ‹˜[œÙ›Ü›YYˆL___XØ]Ú
Š^Ü™]\›ˆKœ\Ú
›Ý]šZˆ\œÙ[ˆÓSˆ	Üˆ[œÝ[˜Ù[Ùˆ\œ›ÜÜ‹›Y\ÜØYÙNˆ“Û˜™ZÙ[™H›Ý]ŸX
KÜÝXØÙ\ÜÎˆLK™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î–×_K\œ›ÜœÎ™KØ\›š[™ÜÎY]Y]NžÙ™X]\™PÛÝ[ŒÙ[ÛY]žU\\Î–×KÛÛÜ™[˜]TÞ\Ý[Nˆ[šÛ›ÝÛˆ‹˜[œÙ›Ü›YYˆL____X\Þ[˜È[˜Ý[Ûˆ™JŠ^ØÛÛœÝOV×KV×NÝž^ØÛÛœÝX]ØZ]‹^

KÏ[™]ÈQ™J
Kœ™XY™X]\™\Ê‹Ù]T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆ‹™X]\™T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆŸJNÜË›[™ÝOOL	‰œ\Ú
‘ÙY[ˆ™X]\™\ÈÙ]›Û™[ˆ[ˆÔ™\Ý[™ŠNØÛÛœÝ[™]ÈÛ

KÜš]Q™X]\™\ÓØš™XÝ
ËÙ]T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆ‹™X]\™T›Ú™XÝ[ÛŽˆ‘TÑÎÌˆŸJK™™X]\™\Ë›X\

KŠOOžØÛÛœÝ^Ë‹‹Kœ›Ü\Y\ßKO\›˜[Y_“˜[Y_Ø^\Ú[	ÙŠÌ_XO\™\Øß™\ØÜš\[ÛŸˆ‹\[Y_[Ï\™[_[Ü™]\›žÝ\Nˆ‘™X]\™H‹Ù[ÛY]žNK™Ù[ÛY]žK›Ü\Y\ÎžË‹‹œ˜[YN›K\ØÜš\[ÛŽžK[YNž[]˜][ÛŽ—ß__JKÏVË‹‹›™]ÈÙ]
™š[\ŠOOK™Ù[ÛY]žJK›X\
OOK™Ù[ÛY]žK\JJWNÜ™]\›ˆËš[˜ÛY\Ê“[™TÝš[™ÈŠI‰œ\Ú
‘Ô˜XÚÈ›Ý]\ÈÛÜ™[ˆ[ÈZ›™[ˆÙY\™ÙYÙ]™[ˆŠKÜÝXØÙ\ÜÎˆL™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î›K\œ›ÜœÎ™KØ\›š[™ÜÎY]Y]NžÙ™X]\™PÛÝ[››[™ÝÙ[ÛY]žU\\Î˜ËÛÛÜ™[˜]TÞ\Ý[Nˆ•ÑÔÎ‹˜[œÙ›Ü›YYˆL___XØ]Ú
Š^Ü™]\›ˆKœ\Ú
›Ý]šZˆ\œÙ[ˆÔˆ	Üˆ[œÝ[˜Ù[Ùˆ\œ›ÜÜ‹›Y\ÜØYÙNˆ“Û˜™ZÙ[™H›Ý]ŸX
KÜÝXØÙ\ÜÎˆLK™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î–×_K\œ›ÜœÎ™KØ\›š[™ÜÎY]Y]NžÙ™X]\™PÛÝ[ŒÙ[ÛY]žU\\Î–×KÛÛÜ™[˜]TÞ\Ý[Nˆ[šÛ›ÝÛˆ‹˜[œÙ›Ü›YYˆL____Y[˜Ý[ÛˆÌÊŠ^ÜÝÚ]Ú
‹œÜ]
‹ˆŠKœÜ

OËÓÝÙ\Ø\ÙJ
J^ØØ\ÙH™Ù[ÚœÛÛˆŽ˜Ø\ÙHšœÛÛˆŽœ™]\›ˆ™Ù[ÚœÛÛˆŽØØ\ÙHšÛ[Ž˜Ø\ÙHšÛ^ˆŽœ™]\›ˆšÛ[ŽØØ\ÙH™ÜŽœ™]\›ˆ™ÜŽÙY˜][œ™]\›ˆ[œÝ\ÜYŸ_Y[˜Ý[ÛˆM™J
^Ü™]\›ˆ‹™Ù[ÚœÛÛ‹šœÛÛ‹šÛ[™ÜŸY[˜Ý[ÛˆÊ
^Ü™]\›ˆ‘Ù[Ò”ÓÓ‹ÓS
ÛÛÙÛH^HX\ÊKÔŸX\Þ[˜È[˜Ý[ÛˆNJŠ^ÜÝÚ]Ú
ÌÊ‹›˜[YJJ^ØØ\ÙH™Ù[ÚœÛÛˆŽœ™]\›ˆM™JŠNØØ\ÙHšÛ[Žœ™]\›ˆ™JŠNØØ\ÙH™ÜŽœ™]\›ˆ™JŠNØØ\ÙH[œÝ\ÜYŽ™Y˜][œ™]\›žÜÝXØÙ\ÜÎˆLK™X]\™\ÎžÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\Î–×_K\œ›ÜœÎ–ØšY][Û™\œÝ][™™\Ý[™Ù›Ü›XX]ˆ	Û‹›˜[Y_KˆÛ™\œÝ][™H›Ü›X][Žˆ	ÒÊ
_XKØ\›š[™ÜÎ–×KY]Y]NžÙ™X]\™PÛÝ[ŒÙ[ÛY]žU\\Î–×KÛÛÜ™[˜]TÞ\Ý[Nˆ[šÛ›ÝÛˆ‹˜[œÙ›Ü›YYˆL____Y[˜Ý[ÛˆJŠ^Ü™]\›ˆ‹œÚ^™OŒLMÍŒÞÝ˜[YˆLK\œ›ÜŽ˜™\Ý[™HÜ›ÛÝ
	Ê‹œÚ^™KÌLÌL
KÑš^Y
J_HPŠKˆX^[][H\ÈLP‹˜N•ÌÊ‹›˜[YJOOOH[œÝ\ÜYÞÝ˜[YˆLK\œ›ÜŽ˜šY][Û™\œÝ][™™\Ý[™Ù›Ü›XX]ˆÛ™\œÝ][™H›Ü›X][Žˆ	ÒÊ
_XN›‹›˜[YKÓÝÙ\Ø\ÙJ
K™[™ÕÚ]
‹šÛ^ˆŠOÞÝ˜[YˆLK\œ›ÜŽˆ’ÓVˆ™\Ý[™[ˆÛÜ™[ˆ›ÙÈšY]Û™\œÝ][™ˆZÈ]™\Ý[™Z][ˆ[\ÜY\ˆ]šÛ[™\Ý[™ˆŸNžÝ˜[YˆL_Y[˜Ý[ÛˆŠŠ^ÚYŠ\œ˜^Kš\Ð\œ˜^JŠJ\™]\›ˆ–ÈŠÛ‹›X\
ŠKš›Ú[Š‹ŠJÈ—HŽÚYŠ‰‰\[ÙˆOH›Øš™XÝŠ^ØÛÛœÝO[ŽÜ™]\›ˆžÈŠÓØš™XÝšÙ^\ÊJKœÛÜ

K›X\
O’”ÓÓ‹œÝš[™ÚYžJ
JÈŽˆŠÙŠVÝJJKš›Ú[Š‹ŠJÈŸHŸ\™]\›ˆ”ÓÓ‹œÝš[™ÚYžJŠ_X\Þ[˜È[˜Ý[ÛˆŽJŠ^ØÛÛœÝO[™]È^[˜ÛÙ\Š
K™[˜ÛÙJŠŠJKX]ØZ]Üž\ËœÝXK™YÙ\Ý
”ÒKLMˆ‹JNÜ™]\›ˆ\œ˜^K™œ›ÛJ™]ÈZ[\œ˜^J
JK›X\
Oœ‹ÔÝš[™ÊMŠKœYÝ\
‹ŒŠJKš›Ú[ŠˆŠ_X\Þ[˜È[˜Ý[ÛˆŽJŠ^Ü™]\›žÝ\Nˆ‘™X]\™PÛÛXÝ[Ûˆ‹™X]\™\ÎŠ]ØZ]×ÊZ
K	ÛŸKØÚ[šÜØ
JJK™ØÜË›X\
Oœ‹™]J
JKœÛÜ

‹JOOŠ‹š[™^
KJKš[™^
JK™›]X\
O\œ˜^Kš\Ð\œ˜^J‹™™X]\™\ÊOÜ‹™™X]\™\Î–×J__Y[˜Ý[ÛˆNJÚ\ÓÜ[Ž›‹ÛÛÜÙN™_J^ØÛÛœÝ\ZJOO™K˜Y^Y\ŠK\ZJOO™K\]S^Y\ŠKO\ZJOO™K›^Y\œÊKÏZK›[™ÝO\ZJOO™Kš[\ÜY˜][ÊKÏP‹\ÙT™YŠ[
KÛ×OP‹\ÙTÝ]JšYHŠKÝK—OP‹\ÙTÝ]J[
KÜWOP‹\ÙTÝ]J[
KÞKOP‹\ÙTÝ]JˆŠK×ËWOP‹\ÙTÝ]J[
KÔË×OP‹\ÙTÝ]JLJKÐKOP‹\ÙTÝ]J[
KP‹\ÙPØ[˜XÚÊ

OOžØÊšYHŠKŠ[
KJ[
K
ˆŠKJ[
K
[
KË˜Ý\œ™[	‰ŠË˜Ý\œ™[˜[YOHˆŠ_K×JKOP‹\ÙPØ[˜XÚÊ

OOžÞŠ
KJ
_KÞ‹WJKP‹\ÙPØ[˜XÚÊ\Þ[˜ÈOOžØÛÛœÝO]JJNÚYŠZK˜[Y
^ÑJK™\œ›ÜŸ“Û™Ù[YÈ™\Ý[™ŠKÊ™\œ›ÜˆŠNÜ™]\›ŸYŠJKÊœ\œÚ[™ÈŠKJ[
NØÛÛœÝYOYK›˜[YKœ™\XÙJ×–×‹Ë—JÉËˆŠNÞ
YJNÝž^ØÛÛœÝYOX]ØZ]NJJNÚYŠ]YKœÝXØÙ\ÜÊ^ÑJYK™\œ›ÜœËš›Ú[Š˜
JKÊ™\œ›ÜˆŠNÜ™]\›ŸZYŠYK™™X]\™\Ë™™X]\™\Ë›[™ÝOOL
^ÑJ‘ÙY[ˆ™X]\™\ÈÙ]›Û™[ˆ[ˆ]™\Ý[™ŠKÊ™\œ›ÜˆŠNÜ™]\›Ÿ[JYJK
JÕJÊKYK™™X]\™\ËJJKÊœ™]šY]ÈŠ_XØ]Ú
YJ^ÑJYH[œÝ[˜Ù[Ùˆ\œ›ÜÝYK›Y\ÜØYÙNˆ“Û˜™ZÙ[™H›Ý]šZˆ\œÙ[ˆŠKÊ™\œ›ÜˆŠ__KØK×JKP‹\ÙPØ[˜XÚÊOOžØÛÛœÝOYK\™Ù]™š[\ÏË–ÌNÚI‰•
J_KÕJKP‹\ÙPØ[˜XÚÊOOžÙKœ™]™[Y˜][

KÊL
_K×JKP‹\ÙPØ[˜XÚÊOOžÙKœ™]™[Y˜][

KÊLJ_K×JKP‹\ÙPØ[˜XÚÊOOžÙKœ™]™[Y˜][

KÊLJNØÛÛœÝOYK™]U˜[œÙ™\‹™š[\ÏË–ÌNÚI‰•
J_KÕJKP‹\ÙPØ[˜XÚÊ
KJOOžÔ
YOOšYI‰žË‹‹šYKÙWNžË‹‹šYVÙWK‹‹š__J_K×JKÙOP‹\ÙPØ[˜XÚÊ\Þ[˜Ê
OOžÚYŠ\P_^Kš[J
J\™]\›ŽØÛÛœÝO]OÕÌÊK›˜[YJNˆ™Ù[ÚœÛÛˆ‹OPKœÚ[Ë˜ÛÛÜŸK›[™\Ë˜ÛÛÜŸKœÛYÛÛœËœÝ›ÚÙPÛÛÜ‹YOX]ØZ]ŽJ™™X]\™\ÊKYO]OË›˜[Y_[šÛ›ÝÛˆ‹OZK™š[™
YOO™YK˜ÛÛ[\ÚOOZY_YYK˜ÛÛ[\Ú	‰™YKœÛÝ\˜ÙQš[S˜[YOOO]YI‰’”ÓÓ‹œÝš[™ÚYžJYK™™X]\™\ÊOOOR”ÓÓ‹œÝš[™ÚYžJ™™X]\™\ÊJKÏ^Û˜[YNžKš[J
K\N™OOOH[œÝ\ÜYÈ™Ù[ÚœÛÛˆŽ™K™X]\™\Îœ™™X]\™\Ëš\ÚX›NˆLÜXÚ]NŒKÛÛÜŽšKÝ[NKÜ\ÛÛ™šYÎžÝ]QšY[›[Y[‘šY[Î–×KÚÝÕXÚšXØ[šY[Î˜KœÜ\œÚÝÕXÚšXØ[šY[ßKÛÝ\˜ÙQš[S˜[YNYKÛÛ[\ÚšY_NÔOÜŠKšYÊN
ÊKJ
_KÜKKKK‹KœÜ\œÚÝÕXÚšXØ[šY[ËWJKYO\×ÓJ™™X]\™\ÊNžÜÚ[ÎŒ[™\ÎŒÛYÛÛœÎŒKÙO^YKœÚ[ÏŒ	‰žYKœÛYÛÛœÏŒÜ™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ“XYÈ[\Ü\™[ˆ‹XÛÛŽššœÞ
žÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN’KÛ˜XÚÎ’K›ÛÝ\Ž›OOHœ™]šY]ÈÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎž‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ›^LH‹Ú[™[Žˆ[›[\™[ˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ›ÙK\ØX›Yˆ^Kš[J
KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]Ûˆ›^LH\ØX›Y›ÜXÚ]KML‹Ú[™[Žˆ’[\Ü\™[ˆŸJW_JN›ÚYÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHÝ™\™›ÝË^KX]]ÈMÜXÙK^KM‹Ú[™[Ž–ÛOOHšYH‰‰ššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YN˜›Ü™\‹Lˆ›Ü™\‹Y\ÚY›Ý[™Y[ÈN^XÙ[\ˆ˜[œÚ][Û‹XÛÛÜœÈ	ÔÏÈ˜›Ü™\‹\\œKML™Ë\\œKMLŽˆ˜›Ü™\‹YÜ˜^KLÌÝ™\Ž˜›Ü™\‹YÜ˜^KMŸXÛ‘˜YÓÝ™\Ž“Û‘˜YÓX]™N‘Û‘›Ü•‹Ú[™[Ž–ÚšœÞ
S‹ÜÚ^™NÛ\ÜÓ˜[YNˆ›^X]]È^YÜ˜^KMX‹LÈŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ”ÛY\Y[ˆ™\Ý[™Y\šY[ˆŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KM^\ÛHX‹M‹Ú[™[Žˆ›ÙˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO›Ë˜Ý\œ™[Ë˜ÛXÚÊ
KÛ\ÜÓ˜[YNˆœMKLˆ™Ë\\œKML^]Ú]H›Ý[™Y[ÈÝ™\Ž˜™Ë\\œKMŒ˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Žˆ™\Ý[™ÚY^™[ˆŸJKšœÞ
š[œ]‹Ü™YŽ›Ë\Nˆ™š[H‹XØÙ\”M™J
KÛÚ[™ÙN”‹Û\ÜÓ˜[YNˆšY[ˆŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML^XÙ[\ˆ‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Žˆ“Û™\œÝ][™H›Ü›X][ŽˆŸJKšœÞ
œ‹ØÚ[™[Ž’Ê
_JW_JW_JKOOHœ\œÚ[™È‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^›^XÛÛ][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆKLLˆ‹Ú[™[Ž–ÚšœÞ
LÜÚ^™NÛ\ÜÓ˜[YNˆ^\\œKML[š[X]K\Ü[ˆX‹MŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒ‹Ú[™[Žˆ™\Ý[™™\Ù\šÙ[‹‹‹ˆŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KM^\ÛH‹Ú[™[ŽOË›˜[Y_JW_JKOOH™\œ›Üˆ‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KM‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\LÈM™Ë\™YML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
‹ÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^\™YML›^\Úš[šËL]LHŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^\™YMÌ‹Ú[™[Žˆ’[\ÜZ\ÛZÝŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^\™YMŒ]LHÚ]\ÜXÙK\™K]Ü˜\‹Ú[™[Ž—ßJW_JW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎž‹Û\ÜÓ˜[YNˆËY[MKLˆ™ËYÜ˜^KLL^YÜ˜^KMÌ›Ý[™Y[ÈÝ™\Ž˜™ËYÜ˜^KLŒ˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Žˆ“ÜšY]]È›Ø™\™[ˆŸJW_JKOOHœ™]šY]È‰‰œ	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KM‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\LÈLÈ™ËYÜ™Y[‹ML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^YÜ™Y[‹ML›^\Úš[šËL]LHŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ™Y[‹MÌ‹Ú[™[Žˆ™\Ý[™Ù[Y[ˆŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ™Y[‹MŒ‹Ú[™[ŽOË›˜[Y_JW_JW_JKØ\›š[™ÜË›[™ÝŒ	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ™ËX[X™\‹ML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^X[X™\‹MÌ^\ÛH‹Ú[™[Žˆ“]ÜˆŸJKšœÞ
[‹ØÛ\ÜÓ˜[YNˆ^\ÛH^X[X™\‹MŒ]LH\ÝY\ØÈ\ÝZ[œÚYH‹Ú[™[ŽœØ\›š[™ÜË›X\

KJOOššœÞ
›H‹ØÚ[™[Ž™_KJJ_JW_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ™ËYÜ˜^KML›Ý[™Y[È^\ÛH‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLˆØ\Lˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ‘™X]\™\ÎˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ›[Lˆ›Û[YY][H‹Ú[™[Žœ›Y]Y]K™™X]\™PÛÝ[JW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ•\\ÎˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ›[Lˆ›Û[YY][H‹Ú[™[Žœ›Y]Y]K™Ù[ÛY]žU\\Ëš›Ú[Š‹Š_‹HŸJW_JW_J_JKI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ›Ý[™Y[È›Ü™\ˆ›Ü™\‹XÞX[‹LLLÈÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H^YÜ˜^KMÌ‹Ú[™[Žˆ•ÙY\™Ø]™HŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ’ÚY\ÈY\ˆHšXÚ˜X\šZY[ˆÛ]\ŽÈX\›˜HÝY™HHXYÈÚ[\[X[ˆÙˆZ]šXHØX\YÙ[‹ˆŸJW_JKYKœÚ[ÏŒ	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ›Ý[™Y™ËYÜ˜^KMLLˆÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙYKœÚ[Ëš\ÚX›KÛÚ[™ÙN™OOšŠœÚ[È‹Ýš\ÚX›N™K\™Ù]˜ÚXÚÙYJ_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LH‹Ú[™[Ž–È”[[ˆ
‹YKœÚ[ËŠH—_JKšœÞ
š[œ]‹Ý\Nˆ˜ÛÛÜˆ‹˜[YNKœÚ[Ë˜ÛÛÜ‹ÛÚ[™ÙN™OOšŠœÚ[È‹ØÛÛÜŽ™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆšMÈËN›Ü™\‹L™Ë]˜[œÜ\™[L‹]Nˆ”[Û]\ˆŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^VÌL\H^YÜ˜^KML‹Ú[™[Žˆ”[Ü›ÛÝHÛÜ™]]ÛX]\ØÚÛÜˆ]XÝ™\X[ˆŸJW_JKYK›[™\ÏŒ	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœ›Ý[™Y™ËYÜ˜^KMLLˆÜXÙK^KLˆ‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙYK›[™\Ëš\ÚX›KÛÚ[™ÙN™OOšŠ›[™\È‹Ýš\ÚX›N™K\™Ù]˜ÚXÚÙYJ_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LH‹Ú[™[Ž–È“Z›™[ˆ
‹YK›[™\ËŠH—_JKšœÞ
š[œ]‹Ý\Nˆ˜ÛÛÜˆ‹˜[YNK›[™\Ë˜ÛÛÜ‹ÛÚ[™ÙN™OOšŠ›[™\È‹ØÛÛÜŽ™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆšMÈËN›Ü™\‹L™Ë]˜[œÜ\™[L‹]Nˆ“Z›šÛ]\ˆŸJW_J_JKYKœÛYÛÛœÏŒ	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ›Ý[™Y™ËYÜ˜^KMLLˆÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙYKœÛYÛÛœËš\ÚX›KÛÚ[™ÙN™OOšŠœÛYÛÛœÈ‹Ýš\ÚX›N™K\™Ù]˜ÚXÚÙYJ_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LH‹Ú[™[Ž–È•›ZÚÙ[ˆ
‹YKœÛYÛÛœËŠH—_JKšœÞ
š[œ]‹Ý\Nˆ˜ÛÛÜˆ‹˜[YNKœÛYÛÛœË™š[ÛÛÜ‹ÛÚ[™ÙN™OOšŠœÛYÛÛœÈ‹Ùš[ÛÛÜŽ™K\™Ù]˜[YKÝ›ÚÙPÛÛÜŽ™K\™Ù]˜[Y_JKÛ\ÜÓ˜[YNˆšMÈËN›Ü™\‹L™Ë]˜[œÜ\™[L‹]Nˆ•›ZÚÛ]\ˆŸJW_JKÙI‰ˆPKœÛYÛÛœËš\ÚX›I‰ššœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^X[X™\‹MŒ‹Ú[™[Žˆ•›ZÚÙ[ˆÝX[ˆZ]ÛY]]™\Ý[™ÛÚÈ[[ˆ™]˜]ˆŸJW_JW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LH‹Ú[™[Žˆ“˜X[H˜[ˆHXYÈŸJKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNžKÛÚ[™ÙN™OOž
K\™Ù]˜[YJKXÙZÛ\ŽˆšZ‹ˆZZ›ˆØØ]Y\È‹Û\ÜÓ˜[YNˆËY[LÈKLˆ›Ü™\ˆ›Ü™\‹YÜ˜^KLÌ›Ý[™Y[È^\ÛH›ØÝ\Î›Ý][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë\\œKML›ØÝ\Î˜›Ü™\‹]˜[œÜ\™[ŸJW_JW_JW_J_J_XÛÛœÝ[OXœÊ

OOŠÝ\]P]˜Z[X›NˆLK\ÞNˆLK\œ›ÜŽ›[JJKYYOH—×Ù]XÝ^]ÝX\™ŽÛ]UHLK”ÏHLK•HLK[[Ù[˜Ý[ÛˆÎJŠ^Ü™]\›ˆ[Ÿ\[ÙˆˆOH›Øš™XÝÈLN›–ÙYYWOOOHLY[˜Ý[ÛˆNJ
^ØÛÛœÝ]Ú[™ÝËš\ÝÜžKœÝ]NÜ™]\›žË‹‹›‰‰\[ÙˆOH›Øš™XÝÛŽžßKÙYYWNˆL_Y[˜Ý[ÛˆÒJ
^ÜÎJÚ[™ÝËš\ÝÜžKœÝ]J_Ú[™ÝËš\ÝÜžKœ\ÚÝ]JNJ
Kˆ‹Ú[™ÝË›ØØ][Û‹š™YŠ_Y[˜Ý[ÛˆŠ
^Ü™]\›ˆÚ[™ÝË›X]ÚYYXJŠ\Ü^K[[ÙNˆÝ[™[Û™JHŠK›X]Ú\ßœÝ[™[Û™Hš[ˆÚ[™ÝË›˜]šYØ]Ü‰‰ˆH]Ú[™ÝË›˜]šYØ]Ü‹œÝ[™[Û™_Y[˜Ý[ÛˆÎJ
^Ò”ÏHLˆOO[[	‰Ú[™ÝË˜ÛX\•[Y[Ý]
ŠK]Ú[™ÝËœÙ][Y[Ý]


OOžÒ”ÏHLK[[K™LÊ_Y[˜Ý[ÛˆJ
^ÚYŠUŸ\[ÙˆÚ[™ÝÏˆHŠ\™]\›ŽÞUHLÒJ
NØÛÛœÝ]OžÒ”ß
œ™]™[Y˜][

Kœ™]\›•˜[YOHˆŠ_KOJ
OOžÚYŠ•Š^ÞŠ
OÝÚ[™ÝË˜ÛÜÙJ
NÚ[™ÝËœÙ][Y[Ý]


OOÚ[™ÝËš\ÝÜžK˜˜XÚÊ
K
NÜ™]\›ŸXÛÛœÝ[]™Ù]Ý]J
NÚYŠ˜XÝ]™UÚ[™ÝÊ^Ý˜ÛÜÙUÚ[™ÝÊ
KÚ[™ÝËœÙ][Y[Ý]
ÒK
NÜ™]\›ŸZYŠ]Ú[™ÝË˜ÛÛ™š\›J•ÙY]™H™ZÙ\ˆ]™H]XÝÚ[ÛZ][ÈŠJ^ÝÚ[™ÝËœÙ][Y[Ý]
ÒK
NÜ™]\›ŸR”ÏHL•HLŠ
OÊÚ[™ÝË˜ÛÜÙJ
KÚ[™ÝËš\ÝÜžK˜˜XÚÊ
JNŠÚ[™ÝËš\ÝÜžK˜˜XÚÊ
KÚ[™ÝËœÙ][Y[Ý]


OOÚ[™ÝË˜ÛÜÙJ
K
J_NÝÚ[™ÝË˜Y]™[\Ý[™\Š˜™Y›Ü™][›ØY‹ŠKÚ[™ÝË˜Y]™[\Ý[™\ŠœÜÝ]H‹J_Y[˜Ý[ÛˆÎJ‹J^Ü™]\›ˆOOXÛÜšØ›Þ\™XØXÚK]Œ‹IÙ_XX\Þ[˜È[˜Ý[ÛˆNJŠ^ÚYŠ[‹›Û›[™J]›ÝÈ™]È\œ›ÜŠ“XXZÈY\œÝ™\˜š[™[™ÈY][\›™]ˆ™HÙ™›[™YÙYÙ]™[œÈ›Z™[ˆ™ZÝY[‹ˆŠNÚYŠ‹˜\ÜÙ\YJ
K]ØZ]‹™\šYžS™]ÛÜšÊ
K‹˜\ÜÙ\YJ
K‹œ™\Z\Š^ØÛÛœÝOX]ØZ]‹˜ØXÚS˜[Y\Ê
NÛ‹˜\ÜÙ\YJ
NÙ›ÜŠÛÛœÝÙˆK™š[\ŠO˜ÎJ‹‹œØÛÜJJJX]ØZ]‹™[]PØXÚJ
_X]ØZ]‹\]J
K‹˜\ÜÙ\YJ
K‹œ™[ØY

_XÛÛœÝXÏ[™]ÈT“
‹‹È‹Ú[™ÝË›ØØ][Û‹›ÜšYÚ[ŠKš™YŽÛ]ÌË	ŽÙ[˜Ý[ÛˆYJŠ^ÒÌÏ[ŽØÛÛœÝOJ
OOžÐ[KœÙ]Ý]JÝ\]P]˜Z[X›NˆH[‹ØZ][™ßJ_NÙJ
K‹˜Y]™[\Ý[™\Š\]Y›Ý[™‹

OOžÛ‹š[œÝ[[™ÏË˜Y]™[\Ý[™\ŠœÝ]XÚ[™ÙH‹J_J_Y[˜Ý[ÛˆJ
^ÈJœÙ\šXÙUÛÜšÙ\ˆš[ˆ˜]šYØ]ÜŠ_	Ÿ
	[˜]šYØ]Ü‹œÙ\šXÙUÛÜšÙ\‹™Ù]™YÚ\Ý˜][ÛŠXÊK[ŠOžØÛÛœÝO[Ë˜XÝ]™OËœØÜš\T“ËØZ][™ÏËœØÜš\T“Ëš[œÝ[[™ÏËœØÜš\T“Ü™]\›ˆËœØÛÜOOOPXÉ‰™I‰›™]ÈT“
JKœ]˜[YOOO[™]ÈT“
œÝËšœÈ‹XÊKœ]˜[YOÛŽ›˜]šYØ]Ü‹œÙ\šXÙUÛÜšÙ\‹œ™YÚ\Ý\Š™]ÈT“
œÝËšœÈ‹XÊKš™Y‹ÜØÛÜNXË\]UšXPØXÚNˆ››Û™HŸJ_JK	‹[ŠOžÝYJŠK‹\]J
K˜Ø]Ú


OOžßJ_JK˜Ø]Ú


OOžÉ]›ÚYJKØÝ[Y[˜Y]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹

OOžÙØÝ[Y[š\ÚXš[]TÝ]OOOHš\ÚX›H‰‰›˜]šYØ]Ü‹›Û“[™I‰’ÌÏË\]J
K˜Ø]Ú


OOžßJ_JJ_Y[˜Ý[Ûˆ™YJ
^ØÛÛœÝQ˜K™Ù]Ý]J
NÚYŠ[‹œ™XY_‹›ØY[™Ê]›ÝÈ™]È\œ›ÜŠ•ØXÚÝ™HXØÛÝ[[ˆ[œÝ[[™Ù[ˆÙ[Y[ˆšZ›‹ˆŠNÚYŠ\Ë™Ù]Ý]J
KœÝ]HOOHšYHŠ]›ÝÈ™]È\œ›ÜŠ”ÛH™H›Ý]HY\œÝÜ›ÛÜ™]™HH\™\›šY]]ÝˆŠNØÛÛœÝO[]™Ù]Ý]J
NÚYŠKš\Ñ˜]Ú[™Ó[Ù_K˜XÝ]™UÚ[™ÝÉ‰ˆVÈœÙ][™ÜÈ‹›Y[H‹˜Ú[™ÙSÙÈ—Kš[˜ÛY\ÊK˜XÝ]™UÚ[™ÝÊJ]›ÝÈ™]È\œ›ÜŠ”›Û™™H[›Ù\ˆÙˆØX\™]Ù\šÚ[™ÈY\œÝYˆ›ÛÜ™]™HH\™\›šY]]ÝˆŠ_X\Þ[˜È[˜Ý[ÛˆJ
^ØÛÛœÝ[™]ÈX›ÜÛÛ›Û\‹O]Ú[™ÝËœÙ][Y[Ý]


OO›‹˜X›Ü

KL™LÊNÝž^ØÛÛœÝ[™]ÈT“
š[™^š[‹XÊNÝœÙX\˜Ú\˜[\ËœÙ]
™]XÝXÚXÚÈ‹Ýš[™Ê]K››ÝÊ
JJNØÛÛœÝX]ØZ]™]Ú
ØØXÚNˆ››Ë\ÝÜ™H‹ÚYÛ˜[›‹œÚYÛ˜[JNÚYŠ\‹›ÚßJ]ØZ]‹^

JKš[˜ÛY\Ê[ŠJ]›ÝÈ™]È\œ›ÜŠ‘ÙY[ˆÙ\šÙ[™H™\˜š[™[™ÈY]]XÝˆ›Ø™Y\ˆ]\ˆÜšY]]ËˆŠ_XØ]ÚÝ›ÝÈ™]È\œ›ÜŠ‘ÙY[ˆÙ\šÙ[™H™\˜š[™[™ÈY]]XÝˆ™H\™\Ý[™[ˆ›Z™[ˆ™ZÝY[‹ˆŠ_Yš[˜[^ÝÚ[™ÝË˜ÛX\•[Y[Ý]
J__Y[˜Ý[ÛˆÕŠ‹J^Ü™]\›ˆ™]È›ÛZ\ÙJ
ŠOOžØÛÛœÝOJ
OOžÛ‹œÝ]OOOY_‹œÝ]OOOH˜XÝ]˜]YØJ
N›‹œÝ]OOOHœ™Y[™[‰‰˜J™]È\œ›ÜŠ‘H\]HÛÛˆšY]ÛÜ™[ˆÙ[Y[‹ˆ›Ø™Y\ˆÜšY]]ËˆŠJ_KÏ]Ú[™ÝËœÙ][Y[Ý]


OO˜J™]È\œ›ÜŠ‘H\]H]\H[™Ëˆ›Ø™Y\ˆÜšY]]ËˆŠJKMYLÊNÙ[˜Ý[ÛˆJÊ^ÝÚ[™ÝË˜ÛX\•[Y[Ý]
ÊK‹œ™[[Ý™Q]™[\Ý[™\ŠœÝ]XÚ[™ÙH‹JKÏÜŠÊN

_[‹˜Y]™[\Ý[™\ŠœÝ]XÚ[™ÙH‹JKJ
_J_X\Þ[˜È[˜Ý[ÛˆŽJHLJ^ÚYŠJœÙ\šXÙUÛÜšÙ\ˆš[ˆ˜]šYØ]ÜŠJ\™]\›ŽÛ]ORÌß]ØZ]	Ÿ]ØZ]˜]šYØ]Ü‹œÙ\šXÙUÛÜšÙ\‹™Ù]™YÚ\Ý˜][ÛŠXÊNÚYŠŠ^ØÛÛœÝ[™]ÈT“
œÝËšœÈ‹XÊNÝœÙX\˜Ú\˜[\ËœÙ]
™]XÝ\™\Z\ˆ‹Ýš[™Ê]K››ÝÊ
JJKOX]ØZ]˜]šYØ]Ü‹œÙ\šXÙUÛÜšÙ\‹œ™YÚ\Ý\Šš™Y‹ÜØÛÜNXË\]UšXPØXÚNˆ››Û™HŸJKYJJ_Y[ÙHI‰˜]ØZ]K\]J
NÚYŠI‰ŠKš[œÝ[[™É‰˜]ØZ]ÕŠKš[œÝ[[™Ëš[œÝ[YŠK™YJ
KKØZ][™ÊJ^ØÛÛœÝYKØZ][™ËWÕŠ˜XÝ]˜]YŠNÝœÜÝY\ÜØYÙJÝ\Nˆ”ÒÒTÕÐRUS‘ÈŸJK]ØZ]Ÿ_X\Þ[˜È[˜Ý[ÛˆÕŠHLJ^ÚYŠP[K™Ù]Ý]J
K˜\ÞJ^Ð[KœÙ]Ý]JØ\ÞNˆL\œ›ÜŽ›[JNÝž^Ø]ØZ]NJÜØÛÜNXË™\Z\Ž›‹Û›[™N›˜]šYØ]Ü‹›Û“[™K\ÜÙ\YN›™YK™\šYžS™]ÛÜšÎšK\]NŠ
OO™ŽJŠKØXÚS˜[Y\ÎŠ
OOˆ˜ØXÚ\Èš[ˆÚ[™ÝÏØØXÚ\ËšÙ^\Ê
N”›ÛZ\ÙKœ™\ÛÛ™J×JK[]PØXÚN™OO˜ØXÚ\Ë™[]JJK™[ØYŠ
OOžÛÎJ
NØÛÛœÝO[™]ÈT“
Ú[™ÝË›ØØ][Û‹š™YŠNÙKœÙX\˜Ú\˜[\ËœÙ]
™]XÝ\™Yœ™\Ú‹Ýš[™Ê]K››ÝÊ
JJKÚ[™ÝË›ØØ][Û‹œ™\XÙJKš™YŠ__J_XØ]Ú
J^Ð[KœÙ]Ý]JÙ\œ›ÜŽ™H[œÝ[˜Ù[Ùˆ\œ›ÜÙK›Y\ÜØYÙNˆ•™\›šY]]Ù[ˆZ\ÛZÝˆ›Ø™Y\ˆÜšY]]ËˆŸJ_Yš[˜[^Ð[KœÙ]Ý]JØ\ÞNˆL_J___XÛÛœÝ]OHŒ‹ŒÌËŒLˆ‹ÎOHšÎ‹ËÙ›Ü›\Ë™ÛKÔSÚÌLPžMVšÐšŽ‹OVÞÚYˆ˜›YH‹X™[ˆ‘]XÝX›]]È‹ÛÛÜŽˆˆÌØŽ™ˆŸKÚYˆ™›Ü™\Ý‹X™[ˆ›ÜÙÜ›Ù[ˆ‹ÛÛÜŽˆˆÌŒŽXHŸKÚYˆ™X\‹X™[ˆX\™][‹ÛÛÜŽˆˆØŽŒÌˆŸKÚYˆœ\œH‹X™[ˆ”X\œÈ‹ÛÛÜŽˆˆÍØÍØHŸWNÙ[˜Ý[ÛˆNJ
^ØÛÛœÝ[]
Oœ˜XÝ]™UÚ[™ÝÏOOHœÙ][™ÜÈŠKO[]
Oœ˜XÝ]™UÚ[™ÝÏOOH›Û™Ý\Ú›Ø\™ŠK[]
Oœ˜XÝ]™UÚ[™ÝÏOOHš[\Ü^Y\ˆŠK[]
OœÙÙÛTÙ][™ÜÔ[™[
KO[]
Oœ›Ü[•Ú[™ÝÊKÏ[]
Oœ˜˜XÚÕÚ[™ÝÊKO^[Š
KÏ]ÊOœ›Û™Ý[ŠKP[J
KØËWOP‹\ÙTÝ]J˜[Ù[YY[ˆŠKVÞÚYˆ˜[Ù[YY[ˆ‹X™[ˆ[Ù[YY[ˆ‹XÛÛŽššœÞ
œ™KÜÚ^™NŒMJ_KÚYˆ›YÙ[ˆ‹X™[ˆ“YÙ[ˆ‹XÛÛŽššœÞ
˜ËÜÚ^™NŒMJ_KÚYˆ›Û™Ý[ˆ‹X™[ˆ•›Û™Ý[ˆ‹XÛÛŽššœÞ
ZKÜÚ^™NŒMJ_WNÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ’[œÝ[[™Ù[ˆ‹XÛÛŽššœÞ
LKÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙNœ‹ÝX’XY\ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^‹Ú[™[Ž™‹›X\
OššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOJšY
KÛ\ÜÓ˜[YN˜›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LKHLÈKL‹H^\ÛH›Û[YY][H˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ØÏOO\šYÈ^VÝ˜\ŠKY]XÝXXØÙ[]^
WH›Ü™\‹X‹Lˆ›Ü™\‹VÝ˜\ŠKY]XÝXXØÙ[
WH™ËVÝ˜\ŠKY]XÝXXØÙ[\ÛÙ
WHŽˆ^YÜ˜^KMLÝ™\Ž^YÜ˜^KMÌÝ™\Ž˜™ËYÜ˜^KMLŸXÚ[™[Ž–ÜšXÛÛ‹›X™[_KšY
J_JK›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLH‹Ú[™[Ž–ÚšœÞÊ˜H‹Ú™YŽ™ÎK\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆ‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ›^ËY[][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
•‹ÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“Y[Y[ˆYÈŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^XÙ[\ˆ^YÜ˜^KM‹Ý[NžÙ›ÛÚ^™NˆŒÍY[HŸKÚ[™[Žˆ’[œÝ[[™Ù[ˆÛÜ™[ˆÚØX[™]ØX\™[ˆšZˆ[›ÙÙÙ[ˆÙ\Þ[˜Ú›Ûš\ÙY\™ŸJW_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈÜXÙK^KMH‹Ú[™[Ž–ØÏOOH˜[Ù[YY[ˆ‰‰ššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
™KÜÚ^™NŒMŸJKˆ]XÝZ\ÜÝZ›—_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLˆØ\Lˆ‹Ú[™[ŽœK›X\
OššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OO˜KœÙ]ZU[YJšY
KÛ\ÜÓ˜[YN˜›^][\ËXÙ[\ˆØ\Lˆ›Ý[™Y[È›Ü™\ˆLˆ^[Y	ØKZU[YOOO\šYÈ˜›Ü™\‹VÝ˜\ŠKY]XÝXXØÙ[
WH™ËVÝ˜\ŠKY]XÝXXØÙ[\ÛÙ
WHŽˆ˜›Ü™\‹YÜ˜^KLŒŸXÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆËMM›Ý[™YY[‹Ý[NžØ˜XÚÙÜ›Ý[™œ˜ÛÛÜŸ_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH‹Ú[™[Žœ›X™[JW_KšY
J_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
QÜÚ^™NŒMŸJKˆÙY\™Ø]™H—_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆØ\LÈ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ’Û]\›[Ù\ÈŸJKšœÞÊœÙ[XÝ‹Ý˜[YN˜K˜ÛÛÜ”ØÚ[YKÛÚ[™ÙNœO˜KœÙ]ÛÛÜ”ØÚ[YJ\™Ù]˜[YJKÚ[™[Ž–ÚšœÞ
›Ü[Ûˆ‹Ý˜[YNˆœÞ\Ý[H‹Ú[™[Žˆ”Þ\ÝY[HŸJKšœÞ
›Ü[Ûˆ‹Ý˜[YNˆ›YÚ‹Ú[™[Žˆ“XÚŸJKšœÞ
›Ü[Ûˆ‹Ý˜[YNˆ™\šÈ‹Ú[™[Žˆ‘ÛšÙ\ˆŸJW_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ”Þ\ÝY[H›ÛÝ]]ÛX]\ØÚHXÚHÙˆÛšÙ\™H[Ù\È˜[ˆ™H[Y›ÛÛ‹ˆŸJW_JKšœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
YËÜÚ^™NŒMŸJKˆØX\—_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ”ØÚX[˜[ÈŸJKšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY˜KœÚÝÔØØ[P˜\‹ÛÚ[™ÙNœO˜KœÙ]ÚÝÔØØ[P˜\Š\™Ù]˜ÚXÚÙY
_JW_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ”Ý[™X\™ØX\ŸJKšœÞÊœÙ[XÝ‹Ý˜[YN˜K™Y˜][˜XÚÙÜ›Ý[™ÛÚ[™ÙNœO˜KœÙ]Y˜][˜XÚÙÜ›Ý[™
\™Ù]˜[YJKÚ[™[Ž–ÚšœÞ
›Ü[Ûˆ‹ØÚ[™[Žˆ‘\ÜšH
XÚ
HŸJKšœÞ
›Ü[Ûˆ‹ØÚ[™[Žˆ“XÚ›ÝÈŸJKšœÞ
›Ü[Ûˆ‹ØÚ[™[Žˆ“Ü[”Ý™Y]X\ŸJKšœÞ
›Ü[Ûˆ‹ØÚ[™[Žˆ’XœšYH
Ù\™[
HŸJW_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ØËÜÚ^™NŒMŸJKˆÔÈ—_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ‘ÔÈ]]ÛX]\ØÚÝ\[ˆŸJKšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY˜K™ÜÐ]]ÔÝ\ÛÚ[™ÙNœO˜KœÙ]ÜÐ]]ÔÝ\
\™Ù]˜ÚXÚÙY
_JW_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“˜]]ÚÙ]\šYÚZYØÚ\šÙ[ŸJKšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY˜KœÚÝÐXØÝ\˜XÞPÚ\˜ÛKÛÚ[™ÙNœO˜KœÙ]ÚÝÐXØÝ\˜XÞPÚ\˜ÛJ\™Ù]˜ÚXÚÙY
_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
QÜÚ^™NŒMŸJKˆ[\™˜XÙH—_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ’\\ØÚH™YY˜XÚÈŸJKšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY˜Kš\XÑ™YY˜XÚËÛÚ[™ÙNœO˜KœÙ]\XÑ™YY˜XÚÊ\™Ù]˜ÚXÚÙY
_JW_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“]\™Ü›ÛÝHŸJKšœÞ
š[œ]‹Ý\Nˆœ˜[™ÙH‹Z[ŽˆŽ‹X^ˆŒLÌ‹Ý\ˆŒL‹˜[YN˜K™›ÛØØ[KÛÚ[™ÙNœO˜KœÙ]›ÛØØ[J[X™\Š\™Ù]˜[YJJ_JW_JW_JW_JKÏOOH˜[Ù[YY[ˆ‰‰ššœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN‹Ú[™[Ž–È\™\›šY]]Ù[ˆ0­È‹]W_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Ž›\]P]˜Z[X›OÈ‘Y[ˆšY]]ÙH™\œÚYHÝX]ÛX\‹ˆŽˆÛÛ›ÛY\ˆÜ\]\È[ˆXYH\ÜšY]]ËˆŸJKšœÞ
˜]Ûˆ‹ØÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]ÛˆËY[‹\ØX›Y›˜\ÞKÛÛXÚÎŠ
OOžÝÕŠ
_KÚ[™[Ž›˜\ÞOÈ‘]™[ˆØXÚ[¸ )ˆŽˆ\™\›šY]]Ù[ˆŸJKšœÞÊ™]Z[È‹ØÚ[™[Ž–ÚšœÞ
œÝ[[X\žH‹ØÛ\ÜÓ˜[YNˆ^\ÛHÝ\œÛÜ‹\Ú[\ˆ‹Ú[™[Žˆ\\œÝ[[ˆŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML^KLˆ‹Ú[™[Žˆ“XY[Y[ˆH\™\Ý[™[ˆÜšY]]Ëˆ™HYÙ[‹[[‹›Ýø &\Ë[œÝ[[™Ù[‹ÙÚ[ˆ[ˆÙ™›[™ZØX\[ˆ›Z™[ˆ™ZÝY[‹ˆ[\›™]\È›ÙYËˆŸJKšœÞ
˜]Ûˆ‹ØÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]ÛˆËY[‹\ØX›Y›˜\ÞKÛÛXÚÎŠ
OOžÝÕŠL
_KÚ[™[Žˆ\™\Ý[™[ˆÜšY]]ÈY[ˆŸJW_JK™\œ›Ü‰‰ššœÞ
œ‹Ü›ÛNˆ˜[\‹Û\ÜÓ˜[YNˆ^\ÛH^\™YMŒ‹Ú[™[Ž›™\œ›ÜŸJW_JKÏOOH›YÙ[ˆ‰‰ššœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
˜ËÜÚ^™NŒMŸJKˆYÙ[ˆ—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ˜^KML‹Ú[™[Žˆ–™]™HZYÙ[ˆYÙ[ˆYž›Û™\›ZšÈX[ˆÙˆZ]šXHØX\YÙ[‹ˆŸJKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ•›Û™Ý[ˆÜØX\Û™[ˆŸJKšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY˜KœÚÝÓØØ[›Û™Ý[‹ÛÚ[™ÙNœO˜KœÙ]ÚÝÓØØ[›Û™Ý[Š\™Ù]˜ÚXÚÙY
_JW_JKšœÞÊ˜]Ûˆ‹ØÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]ÛˆËY[‹ÛÛXÚÎŠ
OOšJš[\Ü^Y\ˆ‹œÙ][™ÜÈŠKÚ[™[Ž–ÚšœÞ
žÜÚ^™NŒMŸJKˆXYÈ[\Ü\™[ˆ—_JW_JKÏOOH›Û™Ý[ˆ‰‰ššœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ZKÜÚ^™NŒMŸJKˆ›Û™Ý[ˆ—_JKšœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ˜^KML‹Ú[™[Ž–ÛË›[™Ýˆ›Û™Ý[ˆÜÙ\ÛYÙ[ˆ—_JKšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ[Y[ˆÚØX[ÜÛX[ˆŸJKšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY˜K›Û™Ý[“ØØ[Û›KÛÚ[™ÙNœO˜KœÙ]›Û™Ý[“ØØ[Û›J\™Ù]˜ÚXÚÙY
_JW_JKšœÞÊ˜]Ûˆ‹ØÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]ÛˆËY[‹ÛÛXÚÎŠ
OOšJ›Û™Ý\Ú›Ø\™‹œÙ][™ÜÈŠKÚ[™[Ž–ÚšœÞ
Õ‹ÜÚ^™NŒMŸJKˆ›Û™Ý[ˆ™Z\™[ˆ—_JW_JW_J_JKšœÞ
™KÚ\ÓÜ[Ž™KÛÛÜÙNœßJKšœÞ
NKÚ\ÓÜ[ŽÛÛÜÙNœßJW_J_Y[˜Ý[Ûˆ•Š‹K
^ØÛÛœÝ[‹œš]˜]T™]š\Ú[ÛŸ—Ê
KOQŒŠÑJ
‹›^Y\œß×JK™š[\ŠÏOˆXË˜YS^Y\’Y
JKÑJK›^Y\œÊK‹›^Y\œË›^Y\œËL
KÏQŒŠ‹›Û™Ý[Ÿ×KK›Û™Ý[‹‹›Û™Ý[‹›Û™Ý[ŠKOQŒŠ‹œ›Ý]\ß×KKœ›Ý]\Ë‹œ›Ý]\Ëœ›Ý]\ÊKÏ]‹™Ù]Ý]J
KY”ŠKš][\ËË‹‹›‹™[]Y^Y\’Yß×K‹‹›Ë™[]Y^Y\’Y×K‹›^Y\ÛX[\™\œÚ[ÛŸ
NÜ™]\›žÙ]NžÛ^Y\œÎ››^Y\œË›Û™Ý[ŽœËš][\Ë›Ý]\Î˜Kš][\ßK™]š\Ú[ÛŽžÛ^Y\œÎšKœ™]š\Ú[Û‹›Û™Ý[ŽœËœ™]š\Ú[Û‹›Ý]\Î˜Kœ™]š\Ú[ÛŸK[]Y^Y\’YÎ›™[]Y^Y\’YË^Y\ÛX[\™\œÚ[ÛŽ“X]›X^
˜ÛX[\™\œÚ[Û‹Ë›^Y\ÛX[\™\œÚ[ÛŠ__X\Þ[˜È[˜Ý[ÛˆNJ‹KJ
OOŠßJJ^ÚYŠYJ
J]›ÝÈ™]È\œ›ÜŠXØÛÝ[\ÈÙ]ÚZžšYÙˆŠNØÛÛœÝT[
K\Ù\œÈ‹ŠKOX]ØZ]YÊK\Þ[˜ÈOOžØÛÛœÝÏX]ØZ]K™Ù]
ŠNÚYŠYJ
J]›ÝÈ™]È\œ›ÜŠXØÛÝ[\ÈÙ]ÚZžšYÙˆŠNØÛÛœÝ[Ë™^\ÝÊ
OÛË™]J
NžßNÐ•Jœš]˜]T™]š\Ú[ÛŸ—Ê
JNØÛÛœÝÏX•Šš

KÔ

JKO]

K^Ë‹‹˜Ë™]Kš]˜]T™]š\Ú[ÛŽ˜Ëœ™]š\Ú[Û‹[]Y^Y\’YÎ˜Ë™[]Y^Y\’YË^Y\ÛX[\™\œÚ[ÛŽ˜Ë›^Y\ÛX[\™\œÚ[Û‹‹‹_NÜ™]\›ˆKœÙ]
‹”ÓÓ‹œ\œÙJ”ÓÓ‹œÝš[™ÚYžJŠJKÛY\™ÙNˆLJKKœÙ]
‹Û^Y\œÕ\]Y]•[Ê
K›Û™Ý[•\]Y]•[Ê
K›Ý]\Õ\]Y]•[Ê
_KÛY\™ÙNˆLJKË‹‹˜ËÛÝY›Y][Û˜[__JNÚYŠYJ
J]›ÝÈ™]È\œ›ÜŠXØÛÝ[\ÈÙ]ÚZžšYÙˆŠNØÛÛœÝÏX•ŠË‹‹šK™]Kš]˜]T™]š\Ú[ÛŽšKœ™]š\Ú[Û‹[]Y^Y\’YÎšK™[]Y^Y\’YË^Y\ÛX[\™\œÚ[ÛŽšK›^Y\ÛX[\™\œÚ[ÛŸKš

KÔ

JNÜ™]\›ˆUJË™]KËœ™]š\Ú[ÛŠK‹œÙ]Ý]JÙ[]Y^Y\’YÎœË™[]Y^Y\’YË^Y\ÛX[\™\œÚ[ÛŽœË›^Y\ÛX[\™\œÚ[ÛŸJK_X\Þ[˜È[˜Ý[ÛˆŽJŠ^ØÛÛœÝOVÊZ
KœÚ\™Y[\ÜY^Y\œÈŠKšÊ›ÝÛ™\•ZY‹OH‹ŠJNÜ™]\›Š]ØZ]×ÊJJK™ØÜË›X\
Oœ‹™]J
J_X\Þ[˜È[˜Ý[ÛˆJŠ^ØÛÛœÝOVÊZ
KœÚ\™Y[\ÜY^Y\œÈŠKšÊœ™XÚ\Y[[XZ[‹OH‹‹š[J
KÓÝÙ\Ø\ÙJ
JJNÜ™]\›Š]ØZ]×ÊJJK™ØÜË›X\
Oœ‹™]J
J_X\Þ[˜È[˜Ý[ÛˆÎJŠ^ÚYŠ‹œ™XYHOOHL
\™]\›ˆ[ØÛÛœÝOX]ØZ]ŽJÚ\™Y[\ÜY^Y\œËÉÛ‹œÚ\™RYX
NÜ™]\›žÚY˜Ú\™YIÛ‹œÚ\™RYX˜[YN›‹›^Y\“˜[YK\N›‹›^Y\•\_™Ù[ÚœÛÛˆ‹™X]\™\Î™Kš\ÚX›NˆLÜXÚ]N\[Ùˆ‹›^Y\“ÜXÚ]OOH›[X™\ˆÛ‹›^Y\“ÜXÚ]NŒKÛÛÜŽ›‹›^Y\ÛÛÜŸˆÎXÙˆ‹Ý[N›‹›^Y\”Ý[KÜ\ÛÛ™šYÎ›‹›^Y\”Ü\ÛÛ™šYËÜ™X]Y]›‹˜Ü™X]Y]™]È]J
KÒTÓÔÝš[™Ê
KÛÝ\˜ÙQš[S˜[YN›‹œÛÝ\˜ÙQš[S˜[Y_ÙYY[ÛÜˆ	Û‹›ÝÛ™\‘[XZ[XÛÛ[\Ú›‹›^Y\’\ÚÚ\™RY›‹œÚ\™RYÚ\™SÝÛ™\•ZY›‹›ÝÛ™\•ZYÚ\™SÝÛ™\‘[XZ[›‹›ÝÛ™\‘[XZ[Ú\™T\›Z\ÜÚ[ÛŽ›‹œ\›Z\ÜÚ[Û‹Ú\™Y™XÚ\Y[[XZ[›‹œ™XÚ\Y[[XZ[_Y[˜Ý[ÛˆÎJ‹J^Ü™]\›žË‹‹›‹›Ý™\›^S^Y\ŸÚY˜Ú\™Y[Ý™\›^KIÛ‹œÚ\™RYX˜[YN›‹›^Y\“˜[YKÛÛÜŽ›‹›^Y\ÛÛÜŸˆÌØŽ™ˆ‹Ø]YÛÜšY\Î–×KÚ[Î–×Kš\ÚX›NˆL\˜Ú]™YˆLKÜ™X]Y]›™]È]J
KÒTÓÔÝš[™Ê
K[šÙY[\ÜY^Y\’\Ú›‹›^Y\’\ÚKY˜Ú\™Y[Ý™\›^KIÛ‹œÚ\™RYX[šÙY[\ÜY^Y\’Y™K[šÙY[\ÜY^Y\’\Ú›‹›^Y\’\ÚÚ\™RY›‹œÚ\™RYÚ\™SÝÛ™\•ZY›‹›ÝÛ™\•ZYÚ\™SÝÛ™\‘[XZ[›‹›ÝÛ™\‘[XZ[Ú\™T\›Z\ÜÚ[ÛŽ›‹œ\›Z\ÜÚ[ÛŸ_XÛÛœÝŽOL™LÎÙ[˜Ý[ÛˆTÊŠ^Ü™]\›ˆ\[ÙˆOH›Øš™XÝ‰‰›ˆOO[[	‰ˆP\œ˜^Kš\Ð\œ˜^JŠ_Y[˜Ý[Ûˆ’J
^ØÛÛœÝÜ™\Ù]Î›‹Ý\ÝÛQY˜][Î™K\]Y]OZ^K™Ù]Ý]J
NÜ™]\›ˆ”ÓÓ‹œ\œÙJ”ÓÓ‹œÝš[™ÚYžJÜ™\Ù]Î›‹Ý\ÝÛQY˜][Î™K\]Y]JJ_Y[˜Ý[ÛˆNJŠ^ÚYŠTTÊŠ_P\œ˜^Kš\Ð\œ˜^J‹œ™\Ù]ÊJ\™]\›ˆLNØÛÛœÝO[J‹œ™\Ù]ÊKP\œ˜^Kš\Ð\œ˜^J‹˜Ý\ÝÛQY˜][ÊOÛJ‹˜Ý\ÝÛQY˜][ÊN›[]\[Ùˆ‹\]Y]OH›[X™\ˆÛ‹\]Y]ŒÜ™]\›ˆ^KœÙ]Ý]JÜ™\Ù]Î™KÝ\ÝÛQY˜][Î\]Y]œŸJKLY[˜Ý[ÛˆÎJŠ^ØÛÛœÝOTTÊŠI‰\[Ùˆ‹˜ÛÙOOHœÝš[™ÈÛ‹˜ÛÙNˆˆŽÜ™]\›ˆOOOHœ\›Z\ÜÚ[Û‹Y[šYYŸOOOH™š\™\ÝÜ™KÜ\›Z\ÜÚ[Û‹Y[šYYÈÛÝYÙYØ[™ÈÙ]ÙZYÙ\™ˆHš\™\ÝÜ™KX™]™Z[YÚ[™ÜÜ™YÙ[È[Ù][ˆÛÜ™[ˆšZ™Ù]Ù\šÝˆŽ™OOOH[˜]˜Z[X›HŸOOOH™š\™\ÝÜ™KÝ[˜]˜Z[X›HÈÛÝYZ™[ZšÈšY]™\™ZZØ˜X\‹ˆ™HÚØ[HÙYÙ]™[œÈ›Z™[ˆ™]ØX\™ˆŽ›ˆ[œÝ[˜Ù[Ùˆ\œ›ÜÛ‹›Y\ÜØYÙNˆ”Þ[˜Ú›Ûš\Ø]YHZ\ÛZÝŸY[˜Ý[ÛˆÎJ
^ØÛÛœÝQ˜JO”\Ù\ŠKO]ŠO”›^Y\œÊK]ŠO”™[]Y^Y\’YÊK]ÊO”›Û™Ý[ŠKOV\ÊO”œØ]™Y›Ý]\ÊKÏ^[Š
KOZ^J
KÛËOP‹\ÙTÝ]JœÚYÛ™Y[Ý]ŠKØËWOP‹\ÙTÝ]J[
KÙ‹OP‹\ÙTÝ]J
KOP‹\ÙT™YŠˆŠKOP‹\ÙT™YŠˆŠKP‹\ÙT™YŠˆŠKÏP‹\ÙT™YŠLJKOP‹\ÙT™YŠ[
KÏJ
OO’”ÓÓ‹œÝš[™ÚYžJÙ]Nžš

KY]Y]NÔ

K[]Y^Y\’YÎ‹™Ù]Ý]J
K™[]Y^Y\’YËÙ][™ÜÎžJ
K™\Ù]Î˜’J
_JKÏP‹\ÙPØ[˜XÚÊ\Þ[˜ÈOžÚYŠ[Ë™[XZ[
\™]\›ŽØÛÛœÝÞ‹WOX]ØZ]›ÛZ\ÙK˜[
ÞJ‹™[XZ[
KŽJ‹ZY
WJNÚYŠT

J\™]\›ŽØÛÛœÝVË‹‹›™]ÈX\
Ë‹‹ž‹‹‹’WK›X\
O–Ô‹œÚ\™RY—JJK˜[Y\Ê
WNÙ›ÜŠÛÛœÝˆÙˆ
^ÚYŠT

J\™]\›ŽØÛÛœÝ]‹™Ù]Ý]J
NÚYŠœ™XÛÝ™\™YYØXÞTÚ\™RYËš[˜ÛY\Ê‹œÚ\™RY
_™[]Y^Y\’YËš[˜ÛY\Ê™XÛÝ™\™YIÔ‹œÚ\™RYX
JXÛÛ[YNÛ]\ZK™Ù]Ý]J
K›^Y\œË™š[™
ÙOO›ÙK˜ÛÛ[\ÚOOT‹›^Y\’\Ú
NÚYŠQ	‰ž‹œÛÛYJÙOO›ÙKœÚ\™RYOOT‹œÚ\™RY
J^ØÛÛœÝÙOX]ØZ]ÎJŠNÚYŠT

J\™]\›ŽÚYŠ[ÙJXÛÛ[YNÑQÛJÙJKZKœÙ]Ý]JYOOŠÛ^Y\œÎ–Ë‹‹žYK›^Y\œË_JJ_XÛÛœÝYŠË‹‹ÎJ‹ËšYˆŠK˜[YN”‹›^Y\“˜[Y_JKU›J‹™Ù]Ý]J
K›^Y\œË‹œÚ[Ë‹œÚ\™RY
NÝ‹œÙ]Ý]JÙOOŠÛ^Y\œÎš‹›[™ÝÖË‹‹›ÙK›^Y\œËË‹‹•‹Y˜™XÛÝ™\™YIÔ‹œÚ\™RYXÚ[ÎšŸWN›ÙK›^Y\œË™XÛÝ™\™YYØXÞTÚ\™RYÎ–Ë‹‹›ÙKœ™XÛÝ™\™YYØXÞTÚ\™RYË‹œÚ\™RY_JJ__KÛ—JKOP‹\ÙPØ[˜XÚÊ

OOžØÛÛœÝQOŠÜÝXØÙ\ÜÎˆLK\ØYYžÛ^Y\œÎŒ›Û™Ý[ŽŒ›Ý]\ÎŒKÝÛ›ØYYžÛ^Y\œÎŒ›Û™Ý[ŽŒ›Ý]\ÎŒK\œ›ÜŽ‘JNÚYŠ[Š\™]\›ˆ›ÛZ\ÙKœ™\ÛÛ™J
“šY][™Ù[ÙÙŠJNÚYŠK˜Ý\œ™[ËZYOO[‹ZY	‰‘K˜Ý\œ™[š\ÐÝ\œ™[

J\™]\›ˆK˜Ý\œ™[œ›ÛZ\ÙNØÛÛœÝU
‹ZY
KOJ
OOžŠ
I‰‘˜K™Ù]Ý]J
K\Ù\ËZYOO[‹ZY^ßKHWË˜Ý\œ™[J\Þ[˜Ê
OOžÛ
˜ÛÛ›™XÝ[™ÈŠKJ[
NÝž^ØÛÛœÝ^š

NÚYŠ‰‰˜]ØZ]ÊJKRJ
J\™]\›ˆ
XØÛÝ[\ÈÙ]ÚZžšYÙˆŠNØÛÛœÝ^J
KX’J
KÙOHT‰‰’”ÓÓ‹œÝš[™ÚYžJŠHOO^K˜Ý\œ™[YOHT‰‰’”ÓÓ‹œÝš[™ÚYžJŠHOO^˜Ý\œ™[ÙOX]ØZ]NJ‹ZYKYOOŠÜÙ][™ÜÎˆ[ÙI‰”TÊYKœÙ][™ÜÊOÚYKœÙ][™ÜÎ•‹™\Ù]Ù][™ÜÎˆ^YI‰”TÊYKœ™\Ù]Ù][™ÜÊI‰\[ÙˆYKœ™\Ù]Ù][™ÜË\]Y]OH›[X™\ˆ‰‰šYKœ™\Ù]Ù][™ÜË\]Y]š‹\]Y]ÚYKœ™\Ù]Ù][™ÜÎš‹™XÛÝ™\™YYØXÞTÚ\™RYÎ–Ë‹‹›™]ÈÙ]
Ë‹‹‹™Ù]Ý]J
Kœ™XÛÝ™\™YYØXÞTÚ\™RYË‹‹šYKœ™XÛÝ™\™YYØXÞTÚ\™RYß×WJW_JJNÚYŠRJ
J\™]\›ˆ
XØÛÝ[\ÈÙ]ÚZžšYÙˆŠNÒ”ÓÓ‹œÝš[™ÚYžJJ
JOOOR”ÓÓ‹œÝš[™ÚYžJŠI‰›JÙK˜Y][Û˜[œÙ][™ÜÊK”ÓÓ‹œÝš[™ÚYžJ’J
JOOOR”ÓÓ‹œÝš[™ÚYžJŠI‰‘NJÙK˜Y][Û˜[œ™\Ù]Ù][™ÜÊNØÛÛœÝOYÙK™]NÛK˜Ý\œ™[R”ÓÓ‹œÝš[™ÚYžJÙ]N™KY]Y]N™ÙKœ™]š\Ú[Û‹[]Y^Y\’YÎ™ÙK™[]Y^Y\’YËÙ][™ÜÎ™ÙK˜Y][Û˜[œÙ][™ÜË™\Ù]Î™ÙK˜Y][Û˜[œ™\Ù]Ù][™ÜßJKK˜Ý\œ™[R”ÓÓ‹œÝš[™ÚYžJÙK˜Y][Û˜[œÙ][™ÜÊK˜Ý\œ™[R”ÓÓ‹œÝš[™ÚYžJÙK˜Y][Û˜[œ™\Ù]Ù][™ÜÊKË˜Ý\œ™[HL
œÞ[˜ÙYŠNØÛÛœÝOJYKYJOOšYK™š[\ŠOO’”ÓÓ‹œÝš[™ÚYžJJHOOR”ÓÓ‹œÝš[™ÚYžJYK™š[™
ÏO“ËšYOOTKšY
JJK›[™ÝÜ™]\›žÜÝXØÙ\ÜÎˆL\ØYYžÛ^Y\œÎšJK›^Y\œËÙK˜ÛÝY›^Y\œß×JK›Û™Ý[ŽšJK›Û™Ý[‹ÙK˜ÛÝY›Û™Ý[Ÿ×JK›Ý]\ÎšJKœ›Ý]\ËÙK˜ÛÝYœ›Ý]\ß×J_KÝÛ›ØYYžÛ^Y\œÎšJK›^Y\œË›^Y\œÊK›Û™Ý[ŽšJK›Û™Ý[‹›Û™Ý[ŠK›Ý]\ÎšJKœ›Ý]\Ëœ›Ý]\Ê___XØ]Ú

^ØÛÛœÝTÎJ
NÜ™]\›ˆJ
I‰Š
™\œ›ÜˆŠKJŠJK
Š_Yš[˜[^ÑK˜Ý\œ™[ËÚÙ[OOU	‰ŠK˜Ý\œ™[[[
KJ
I‰œ
O‘
ÌJ__JJ
NÜ™]\›ˆK˜Ý\œ™[^ÝZY›‹ZY›ÛZ\ÙN“ÚÙ[Ž•\ÐÝ\œ™[’_KKÛ‹×JNÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠË˜Ý\œ™[HLKK˜Ý\œ™[Hˆ‹K˜Ý\œ™[Hˆ‹˜Ý\œ™[Hˆ‹[Š^Û
œÚYÛ™Y[Ý]ŠKJ[
NÜ™]\›ŸUJ
KJ
_KÛËZYWJK‹\ÙQY™™XÝ


OOžÚYŠ[ŸÏOOH™\œ›ÜˆŸWË˜Ý\œ™[K˜Ý\œ™[Ê
OOO[K˜Ý\œ™[
\™]\›ŽØÛÛœÝ\Ù][Y[Ý]


OOžÐJ
_KŽJNÜ™]\›Š
OO˜ÛX\•[Y[Ý]

_KÛ‹K‹KËK‹ËWJK‹\ÙQY™™XÝ


OOžØÛÛœÝJ
OOžÛ‰‰J
_NÝÚ[™ÝË˜Y]™[\Ý[™\Š›Û›[™H‹
NØÛÛœÝJ
OOžÙØÝ[Y[š\ÚXš[]TÝ]OOOHš\ÚX›H‰‰”

_NÜ™]\›ˆØÝ[Y[˜Y]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹ŠK

OOžÝÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š›Û›[™H‹
KØÝ[Y[œ™[[Ý™Q]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹Š__KÛ‹WJKÚ\ÓÙÙÙY[ŽˆH[‹Þ[˜ÔÝ]\Î›ËÞ[˜Ñ\œ›ÜŽ˜ËÞ[˜Ó›ÝÎKÞ[˜Ó^Y\œÕÐÛÝY˜\Þ[˜Ê
OOŠ]ØZ]J
JKœÝXØÙ\ÜËÞ[˜Õ›Û™Ý[•ÐÛÝY˜\Þ[˜Ê
OOŠ]ØZ]J
JKœÝXØÙ\ÜËÞ[˜Ô›Ý]\ÕÐÛÝY˜\Þ[˜Ê
OOŠ]ØZ]J
JKœÝXØÙ\Üß_Y[˜Ý[ÛˆJÜÚ^™N›LNJ^Ü™]\›ˆšœÞÊœÝ™È‹ÝšY]Ð›ÞˆŒ‹ÚY›‹ZYÚ›‹Ú[™[Ž–ÚšœÞ
œ]‹Ùš[ˆˆÍŽQ‹ˆ“LŒ‹MˆL‹ŒXÌKÎKŒËLKLËKŒ‹L‹ŒRLŒšKŽL˜ËKŒˆKŒÍËLKŒ‹LËL‹ŒŒHËŒÌ]Œ‹ÍÚËMØÌ‹ŒLKŽLˆËŒŽMÍËŒŽNŒ^ˆŸJKšœÞ
œ]‹Ùš[ˆˆÌÍNLÈ‹ˆ“LLˆŒØÌ‹ŽMÈK‹KŽNËŒŽL‹›LËMËL‹ÍØËKŽN‹L‹ŒŒÈKŒ‹LËÌHKŒ‹L‹ŽˆMKŒŽKLKŽLËM‹ŒM‹MLÒ‹ŒNŒ‹ŽÌËŽNHŒLÈËÈŒÈLˆŒÞˆŸJKšœÞ
œ]‹Ùš[ˆˆÑÌH‹ˆ“MKŽMŒXËKŒŒ‹K‹KŒÍKLKŒÍ‹KŒÍKL‹Œ\ËŒLËLKËŒÍKL‹ŒUËŒÒ‹ŒNÌKÈMHHLŒŒˆHLœËÈËHKŒNŽLÛ‹ŽKL‹ŒŒ‹ŽKKŒžˆŸJKšœÞ
œ]‹Ùš[ˆˆÑPMÌÍH‹ˆ“LLˆKŒÎÌKŒˆËŒ‹MˆŒŒHKËŒMKLËŒMPÌMËH‹ŒHMŽMÈHLˆHËÈHËŽNHËÈ‹ŒNËŒÛËˆ‹ŽËŽËL‹ˆËŒËMLÈ‹ŒM‹MLÞˆŸJW_J_Y[˜Ý[ÛˆÎJ
^ØÛÛœÝÛ‹WOP‹\ÙTÝ]JLJKÝ—OP‹\ÙTÝ]J[
KÝ\Ù\ŽšKØY[™ÎœËÚYÛ’[•Ú]ÛÛÙÛN˜KÙÛÝ]›ßOQ˜J
K[]
YOO˜YK˜XÝ]™UÚ[™ÝÏOOH›Y[HŠKÏ[]
YOO˜YK›Ü[•Ú[™ÝÊKO[]
YOO˜YKÙÙÛUÚ[™ÝÊK[]
YOO˜YK˜ÛÜÙUÚ[™ÝÊKÜÞ[˜Ó›ÝÎœÞ[˜ÔÝ]\Î›KÞ[˜Ñ\œ›ÜŽž_OZÎJ
K^[ŠYOO˜YK™›ÛØØ[JKÏ^[ŠYOO˜YKœÚÝÑ›ÛÛY\œÊKO^[ŠYOO˜YKœÙ]ÚÝÑ›ÛÛY\œÊKÏ^[ŠYOO˜YKœÚÝÕ›Û™Ý]ÛŠKÏ^[ŠYOO˜YKœÙ]ÚÝÕ›Û™Ý]ÛŠKO^[ŠYOO˜YKœÚÝÔ›Ý]T™XÛÜ™]ÛŠK^[ŠYOO˜YKœÙ]ÚÝÔ›Ý]T™XÛÜ™]ÛŠK^[ŠYOO˜YKœÚÝÕÙX]\]ÛŠKO^[ŠYOO˜YKœÙ]ÚÝÕÙX]\]ÛŠK^[ŠYOO˜YKœÚÝÓYX\Ý\™UÛÛ
K^[ŠYOO˜YKœÙ]ÚÝÓYX\Ý\™UÛÛ
K^[ŠYOO˜YKœÚÝÑ˜]ÕÛÛ
K^[ŠYOO˜YKœÙ]ÚÝÑ˜]ÕÛÛ
K^[ŠYOO˜YKœÚÝÔš[ÛÛ
K^[ŠYOO˜YKœÙ]ÚÝÔš[ÛÛ
KÙO^ÝÜˆ›X^
\™[K[ŠØY™KX\™XKZ[œÙ]]Ü\™[JJHŸKYOY‹ÙOJ
OOžØÊš[™›ÈŠ_KOJ
OOžØÊœÙ][™ÜÈŠ_KOJ
OOžØÊ›[Û[Y[ÙX\˜ÚŠ_KYOJ
OOžØÊ˜Ú[™ÙSÙÈŠ_KYOJ
OOžÞYJ
KJ
_KOJ
OOžÞYJ
KÊ
_KÏX\Þ[˜Ê
OOžÚYŠJZ_ŠJ^ÙJL
KŠ[
NÝž^ØÛÛœÝYOX]ØZ]

NÜŠYJKÙ][Y[Ý]


OOœŠ[
KYLÊ_XØ]Ú
YJ^ÜŠÜÝXØÙ\ÜÎˆLK\ØYYžÛ^Y\œÎŒ›Û™Ý[ŽŒ›Ý]\ÎŒKÝÛ›ØYYžÛ^Y\œÎŒ›Û™Ý[ŽŒ›Ý]\ÎŒK\œ›ÜŽ˜YH[œÝ[˜Ù[Ùˆ\œ›ÜØYK›Y\ÜØYÙNˆ”Þ[˜ÈZ\ÛZÝŸJ_Yš[˜[^ÙJLJ___KYO^ÌL^Ù›ÛÚ^™NˆŒŽMY[H‹[™RZYÚŒKŒÍKY[™ÕÜ˜	ÌL
™Y_\Y[™Ð›ÝÛN˜	ÌL
™Y_\K^Û[™RZYÚŒKŒÍKY[™ÕÜ˜	Î
™Y_\Y[™Ð›ÝÛN˜	Î
™Y_\NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹˜]Û‹ØÛ\ÜÓ˜[YN˜š^YšYÚLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH	ÛÈ˜™ËX›YKMLÝ™\Ž˜™ËX›YKMŒŽˆ˜™Ë]Ú]KÎLÝ™\Ž˜™Ë]Ú]HŸXÝ[N›ÙKÛÛXÚÎŠ
OOJ›Y[HŠKÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ’[œÝ[[™Ù[ˆ[ˆ™ZY\ˆ‹˜\šXK[X™[Žˆ’[œÝ[[™Ù[ˆ[ˆ™ZY\ˆ‹Ú[™[Ž›ÚšœÞ
[ËÜÚ^™NŒŒ‹Û\ÜÓ˜[YNˆ^]Ú]HŸJNššœÞ
LKÜÚ^™NŒŒ‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŒ›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JKšœÞÊšKÚ\ÓÜ[Ž›]Nˆ“Y[H‹XÙ[Y[ˆœšYÚ‹ÛÛÜÙNžYK›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLH‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ™KÛ\ÜÓ˜[YNˆËY[^[Y›^][\ËXÙ[\ˆØ\LÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[˜[œÚ][Û‹XÛÛÜœÈ^YÜ˜^KMÌÝ™\Ž˜™ËYÜ˜^KLL›Ý[™Y[ÈLˆ‹Ý[N’Ú[™[Ž–ÚšœÞ
LKÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^YÜ˜^KMLŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ’[œÝ[[™Ù[ˆŸJW_JKšœÞÊ˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎšYKÛ\ÜÓ˜[YNˆËY[^XÙ[\ˆ^X›YKMŒ[™\›[™H‹Ý[NžÙ›ÛÚ^™NˆŒÎ[HŸK]Nˆ™ZÚZšÈÚZžšYÚ[™Ù[ˆ‹Ú[™[Ž–È‘]XÝˆ‹]Kˆ0­ÈÚZžšYÚ[™Ù[ˆ—_JW_JKÚ[™[Ž–ÜÏÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKM›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ‹Ú[™[ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËMHMH›Ü™\‹Lˆ›Ü™\‹YÜ˜^KLÌ›Ü™\‹]X›YKML›Ý[™YY[[š[X]K\Ü[ˆŸJ_JNšOÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLÈ›Ü™\‹Xˆ›Ü™\‹YÜ˜^KLL‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚKœÝÕT“ÚšœÞ
š[YÈ‹ÜÜ˜ÎšKœÝÕT“[šK™\Ü^S˜[Y_•\Ù\ˆ‹Û\ÜÓ˜[YNˆËNN›Ý[™YY[‹™Y™\œ™\”ÛXÞNˆ››Ë\™Y™\œ™\ˆŸJNššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËNN›Ý[™YY[™ËYÜ™Y[‹ML›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ‹Ú[™[ŽššœÞ
YKÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^]Ú]HŸJ_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHZ[‹]ËL‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN[˜Ø]H‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[ŽšK™\Ü^S˜[Y_‘ÙXœZZÙ\ˆŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YN›OOOH™\œ›ÜˆÈ^\™YMŒŽ›OOOHœÞ[˜ÙYÈ^YÜ™Y[‹MŒŽˆ^X›YKMŒ‹Ý[NžÙ›ÛÚ^™NˆŒÙ[HŸKÚ[™[Ž›OOOH™\œ›ÜˆÈÛÝYšY]™\ØÚZØ˜X\ˆŽ›OOOHœÞ[˜ÙYÈÛÝYÞ[˜Ú›Ûš\Ø]YHÙ\™YYŽ›OOOH˜ÛÛ›™XÝ[™ÈÈÛÝY™\˜š[™[‹‹‹ˆŽˆ‘ÛÛÙÛK[ÙÚ[ˆXÝYYˆŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ”KÛ\ÜÓ˜[YNˆœLKH^YÜ˜^KMÝ™\Ž^\™YMLÝ™\Ž˜™Ë\™YML›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹]Nˆ•Z]ÙÙÙ[ˆ‹Ú[™[ŽššœÞ
[™KÜÚ^™NŒMŸJ_JW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ“Ë\ØX›Y›‹Û\ÜÓ˜[YNˆ›]LˆËY[LÈKLˆ›^][\ËXÙ[\ˆØ\LÈ™ËX›YKMLÝ™\Ž˜™ËX›YKLL›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H\ØX›Y›ÜXÚ]KML‹Ú[™[Ž–ÚšœÞ
’KÜÚ^™NŒM‹Û\ÜÓ˜[YN˜^X›YKML	ÛÈ˜[š[X]K\Ü[ˆŽˆˆŸXJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^X›YKMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Ž›È”Þ[˜Ú›Ûš\Ù\™[‹‹‹ˆŽˆ”Þ[˜Ú›Ûš\Ù\™[ˆŸJW_JKI‰ˆ]	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ›]LˆLˆ›Ý[™Y[È™Ë\™YML^\™YMÌ‹Ý[NžÙ›ÛÚ^™NˆŒÍY[HŸKÚ[™[Žž_JK	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YN˜]LˆLˆ›Ý[™Y[È^^È	ÝœÝXØÙ\ÜÏÈ˜™ËYÜ™Y[‹ML^YÜ™Y[‹MÌŽˆ˜™Ë\™YML^\™YMÌŸXÚ[™[Ž™\œ›ÜÚšœÞ
œ‹ØÚ[™[Ž™\œ›ÜŸJNššœÞÊœ‹ØÚ[™[Ž–Ý\ØYY›^Y\œÊÝ\ØYY›Û™Ý[ŠÝ\ØYYœ›Ý]\ÏŒ	‰ššœÞÊœÜ[ˆ‹ØÚ[™[Ž–Ý\ØYY›^Y\œÊÝ\ØYY›Û™Ý[ŠÝ\ØYYœ›Ý]\ËˆÙ]\ØY—_JK\ØYY›^Y\œÊÝ\ØYY›Û™Ý[ŠÝ\ØYYœ›Ý]\ÏŒ	‰™ÝÛ›ØYY›^Y\œÊÝ™ÝÛ›ØYY›Û™Ý[ŠÝ™ÝÛ›ØYYœ›Ý]\ÏŒ	‰ˆ‹‹™ÝÛ›ØYY›^Y\œÊÝ™ÝÛ›ØYY›Û™Ý[ŠÝ™ÝÛ›ØYYœ›Ý]\ÏŒ	‰ššœÞÊœÜ[ˆ‹ØÚ[™[Ž–Ý™ÝÛ›ØYY›^Y\œÊÝ™ÝÛ›ØYY›Û™Ý[ŠÝ™ÝÛ›ØYYœ›Ý]\ËˆÙYÝÛ›ØY—_JK\ØYY›^Y\œÊÝ\ØYY›Û™Ý[ŠÝ\ØYYœ›Ý]\ÏOOL	‰™ÝÛ›ØYY›^Y\œÊÝ™ÝÛ›ØYY›Û™Ý[ŠÝ™ÝÛ›ØYYœ›Ý]\ÏOOL	‰ššœÞ
œÜ[ˆ‹ØÚ[™[Žˆ[\È\ÈÙ\Þ[˜Ú›Ûš\ÙY\™ŸJW_J_JW_JNššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎYKÛ\ÜÓ˜[YNˆËY[LÈKLÈ›^][\ËXÙ[\ˆØ\LÈÝ™\Ž˜™ËX›YKML˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒNJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ’[›ÙÙÙ[ˆY]ÛÛÙÛHŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœKLH‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OO›]™Ù]Ý]J
K›Ü[”XÙS\Ý
]™Ù]Ý]J
KœXÙS\ÝØÛÜJKÛ\ÜÓ˜[YNˆËY[LÈKL‹H^[Y›^][\ËXÙ[\ˆØ\LÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[^YÜ˜^KMÌÝ™\Ž˜™ËX›YKML‹Ý[N’Ú[™[Ž–ÚšœÞ
™ËÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^X›YKMLŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“ZœÝÙY\™Ø]™HŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ™ÙKÛ\ÜÓ˜[YNˆËY[LÈKL‹H^[Y›^][\ËXÙ[\ˆØ\LÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[˜[œÚ][Û‹XÛÛÜœÈ^YÜ˜^KMÌÝ™\Ž˜™ËX›YKML‹Ý[N’Ú[™[Ž–ÚšœÞ
‘KÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^X›YKMLŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ’[™›È	ˆ[™ZY[™ÈŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ˜YOOžØYKœÝÜ›ÜYØ][ÛŠ
KYJ
_KÛ\ÜÓ˜[YNˆËY[LÈKL‹H^[Y›^][\ËXÙ[\ˆØ\LÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[˜[œÚ][Û‹XÛÛÜœÈ^YÜ˜^KMÌÝ™\Ž˜™ËX›YKML‹Ý[N’Ú[™[Ž–ÚšœÞ
“‹ÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^X›YKMLŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ•ÚZžšYÚ[™Ù[ˆŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎšKÛ\ÜÓ˜[YNˆËY[LÈKL‹H^[Y›^][\ËXÙ[\ˆØ\LÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[˜[œÚ][Û‹XÛÛÜœÈ^YÜ˜^KMÌÝ™\Ž˜™Ë\\œKML‹Ý[N’Ú[™[Ž–ÚšœÞ
‹ÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^\\œKMLŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ–›ÙZÈ[ˆ[Û[Y[[ˆŸJW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœKLH›Ü™\‹]›Ü™\‹YÜ˜^KLL‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ý[N’‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
ZKÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^[Ü˜[™ÙKMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ•›Û™ÝÛ›ÜŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOšÊTÊKÛ\ÜÓ˜[YN˜ËLLMH›Ý[™YY[˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H™[]]™H	ÔÏÈ˜™ËYÜ˜YY[]Ë\ˆœ›ÛK[Ü˜[™ÙKMLË[Ü˜[™ÙKMŒŽˆ˜™ËYÜ˜^KLÌŸXÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜XœÛÛ]HÜLHËMM›Ý[™YY[™Ë]Ú]HÚYÝË\ÛH˜[œÚ][Û‹X[	ÔÏÈ›YVÌŒœHŽˆ›YLHŸXJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ý[N’‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
LÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^YÜ™Y[‹MLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ”›Ý]HÛ›ÜŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO”
PJKÛ\ÜÓ˜[YN˜ËLLMH›Ý[™YY[˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H™[]]™H	ÐOÈ˜™ËYÜ˜YY[]Ë\ˆœ›ÛKYÜ™Y[‹MLËYÜ™Y[‹MŒŽˆ˜™ËYÜ˜^KLÌŸXÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜XœÛÛ]HÜLHËMM›Ý[™YY[™Ë]Ú]HÚYÝË\ÛH˜[œÚ][Û‹X[	ÐOÈ›YVÌŒœHŽˆ›YLHŸXJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ý[N’‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
Y‹ÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^XÞX[‹MLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ•ÙY\ÚYÙ]ŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO’J^ŠKÛ\ÜÓ˜[YN˜ËLLMH›Ý[™YY[˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H™[]]™H	ÞÈ˜™ËYÜ˜YY[]Ë\ˆœ›ÛKXÞX[‹MLËXÞX[‹MŒŽˆ˜™ËYÜ˜^KLÌŸXÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜XœÛÛ]HÜLHËMM›Ý[™YY[™Ë]Ú]HÚYÝË\ÛH˜[œÚ][Û‹X[	ÞÈ›YVÌŒœHŽˆ›YLHŸXJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ý[N’‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
ÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^X›YKMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ“Y][ˆŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO”ŠU
KÛ\ÜÓ˜[YN˜ËLLMH›Ý[™YY[˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H™[]]™H	ÕÈ˜™ËYÜ˜YY[]Ë\ˆœ›ÛKX›YKMLËX›YKMŒŽˆ˜™ËYÜ˜^KLÌŸXÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜XœÛÛ]HÜLHËMM›Ý[™YY[™Ë]Ú]HÚYÝË\ÛH˜[œÚ][Û‹X[	ÕÈ›YVÌŒœHŽˆ›YLHŸXJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ý[N’‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
ËÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^[Ü˜[™ÙKMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ•ZÙ[™[ˆŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO‘
S
KÛ\ÜÓ˜[YN˜ËLLMH›Ý[™YY[˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H™[]]™H	ÓÈ˜™ËYÜ˜YY[]Ë\ˆœ›ÛK[Ü˜[™ÙKMLË[Ü˜[™ÙKMŒŽˆ˜™ËYÜ˜^KLÌŸXÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜XœÛÛ]HÜLHËMM›Ý[™YY[™Ë]Ú]HÚYÝË\ÛH˜[œÚ][Û‹X[	ÓÈ›YVÌŒœHŽˆ›YLHŸXJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ý[N’‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^Z[™YÛËMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ‘^Ü\™[ˆŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOšŠUŠKÛ\ÜÓ˜[YN˜ËLLMH›Ý[™YY[˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H™[]]™H	ÕÈ˜™ËYÜ˜YY[]Ë\ˆœ›ÛKZ[™YÛËMLËZ[™YÛËMŒŽˆ˜™ËYÜ˜^KLÌŸXÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜XœÛÛ]HÜLHËMM›Ý[™YY[™Ë]Ú]HÚYÝË\ÛH˜[œÚ][Û‹X[	ÕÈ›YVÌŒœHŽˆ›YLHŸXJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ý[N’‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
Ó‹ÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^\\œKMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMÌ‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ•ZÜÝÜ›ÛÝHŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO‘JWÊKÛ\ÜÓ˜[YN˜ËLLMH›Ý[™YY[˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H™[]]™H	×ÏÈ˜™ËYÜ˜YY[]Ë\ˆœ›ÛK\\œKMLË\\œKMŒŽˆ˜™ËYÜ˜^KLÌŸXÚ[™[ŽššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜XœÛÛ]HÜLHËMM›Ý[™YY[™Ë]Ú]HÚYÝË\ÛH˜[œÚ][Û‹X[	×ÏÈ›YVÌŒœHŽˆ›YLHŸXJ_JW_JW_JW_JW_J_XÛÛœÝNOHšÎ‹ËÙ›Ü›\Ë™ÛKÔSÚÌLPžMVšÐšŽŽÙ[˜Ý[ÛˆNJ
^ØÛÛœÝ[]
ÏOœË˜XÝ]™UÚ[™ÝÏOOHš[™›ÈŠKO[]
ÏOœËÙÙÛR[™›Ô[™[
KÝ—OP‹\ÙTÝ]Jš[™›ÈŠKOVÞÚYˆš[™›È‹X™[ˆ’[™›È‹XÛÛŽššœÞ
‘KÜÚ^™NŒMJ_KÚYˆ™[˜ÝY\È‹X™[ˆ‘[˜ÝY\È‹XÛÛŽššœÞ
S‹ÜÚ^™NŒMJ_KÚYˆš[™ZY[™È‹X™[ˆ’[™ZY[™È‹XÛÛŽššœÞ
QKÜÚ^™NŒMJ_WNÜ™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]N˜]XÝ‰Ö]_XXÛÛŽššœÞ
‘KÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN™KÝX’XY\ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^‹Ú[™[ŽšK›X\
ÏOššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOœŠËšY
KÛ\ÜÓ˜[YN˜›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LKHLÈKL‹H^\ÛH›Û[YY][H˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÝOO\ËšYÈ^X›YKMŒ›Ü™\‹X‹Lˆ›Ü™\‹X›YKMŒ™ËX›YKMLÍLŽˆ^YÜ˜^KMLÝ™\Ž^YÜ˜^KMÌÝ™\Ž˜™ËYÜ˜^KMLŸXÚ[™[Ž–ÜËšXÛÛ‹Ë›X™[_KËšY
J_JK›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLH‹Ú[™[Ž–ÚšœÞÊ˜H‹Ú™YŽNK\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ›Ü™Y™\œ™\ˆ‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ›^ËY[][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
•‹ÜÚ^™NŒMJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ“Y[Y[ˆYÈÙˆÙYYˆ™YY˜XÚÈŸJW_JKšœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KM^XÙ[\ˆ‹Ú[™[Ž–È‘]XÝˆ‹]Kˆ0­ÈÜ˜]\È[ˆ›Û™\ˆ˜XÚÚ[™È—_JW_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMÜXÙK^KM^\ÛH‹Ú[™[Ž–ÝOOHš[™›È‰‰ššœÞ
ŽKßJKOOH™[˜ÝY\È‰‰ššœÞ
KßJKOOHš[™ZY[™È‰‰ššœÞ
ŽKßJW_J_J_Y[˜Ý[ÛˆŽJ
^Ü™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ“Ý™\ˆ^™H\ŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒ‹Ú[™[Žˆ‘]XÝ\È0êHÜ˜]\ÈØX\\XØ]YH›ÛÜˆY]X[]XÝYK›ÜÜÚY[[ˆ›ÙZÙ[ˆ[ˆ\˜Ú[ÛÙÚ\ØÚH™\šÙ[›š[™È[ˆ™Y\›[™ˆY]Ì
ÈØX\YÙ[‹ÔÈ˜XÚÚ[™ÈY]šXÚ[™ÜÜZ›ZYÙ[ˆYÙ[‹ÛÝYÞ[˜È[ˆZ]ÙXœ™ZY›Û™Ý[˜™ZY\‹ˆŸJW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ‘]Xœ›Û›™[ˆ	ˆXÙ[Y\ÈŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ^YÜ˜^KMŒ‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”ÑHÈÝ[\™Y[\™™ÛÙY››ŸJKˆ
ÐÌÐÐËP–JH‹šœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[ŽˆSRÈ[Û[Y[[‹šZšÜÛ[Û[Y[[‹Ù\™[\™™ÛÙY[[ÚØX\[‹™[YÚY]\È\™™ÛÙY\ÜÙ[‹\˜Ú[ÈÛ™\ž›ÙZÙ[ˆŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”ÒÈÈØY\Ý\ˆŸJKˆ
ÐÌÐÐËP–JH‹šœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ“XÚ›ÝËRˆÛÙÝZØX\[‹RÐUË›Ù[ZØX\Ù[Û[Ü™›ÛÙÚYKØY\Ý˜[HÜ™[ž™[‹Ù]Ø\Ü\˜Ù[[ˆŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“Ü[”Ý™Y]X\ŸJKˆ
Ñ“
H‹šœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ’[™X™Y[‹Ü˜Yš]]™[Ë[šÙ\œËØ\Ý[[‹\œ[‹\šÙ[‹ÜY[Z[™[‹Ý˜[™™\ÈŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’][™\‹QHÈÙ][œØÚ\[ZšÈŸJKˆ
ÐÈ–HŒ
H‹šœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ”›ÛYZ[œÙHÙYÙ[ˆHœYÚX[œËqo›Ý]HÛÝÈ	ˆš™\œ™YØX\™˜ZÝ\ŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“Z[™]›Ü™ÈŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ“Z[™\˜[[ˆÝÜÝÈ[ˆš[™X]Ù[ˆŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”[[ÛXØHÈ›ÜÜÚY[[ˆ]HŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ‘›ÜÜÚY[ÝÜÝÈ[ˆš[™X]Ù[ˆŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“X\K››ÈØY\Ý\ˆŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ’\ÝÜš\ØÚHØX\[ˆ
RÈNL›Û›™X›Y[ˆNL
HŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”›Ýš[˜ÚX[H]HŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ”™[XÝ[šØX\
Ù[\›[™
KØÚY\ÝÜ˜ZÚÙ[ˆ
ZYRÛ[™
K™\™›ÛšÙ[ˆÜœ[ˆ
™Y[[™
HŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•RRÐUˆÈšZšÜÝØ]\œÝX]ŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ•Z]\ØX\™[ˆ\˜Ú[ÛÙÚ\ØÚH]K^\YšY\ËY™™\›YÙ[ˆŸJW_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ”š]˜XÞH	ˆÜÛYÈŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•›ÛYYÈ[›ÛšY[H[ÙÙ[ZšÎˆŸJKˆ™HÝ[^™H\ÙXœZZÙ[ˆ›Û™\ˆ[šYÙH™YÚ\Ý˜]YHÙˆÙÚ[‹ˆ[™H]H›Z™[ˆL	HÜ™HZYÙ[ˆ\\˜X]ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ÙY[ˆ˜XÚÚ[™ÎˆŸJKˆ^™H\™\ž˜[Y[ÙY[ˆ[˜[]XÜËÛÛÚÚY\ËÙXœZZÜÜÝ]\ÝYZÙ[ˆÙˆ\œÛÛÛ›ZšÙHÙYÙ]™[œËˆ\ˆ\ÈÙY[ˆÙ\™\ˆYH™HÙY˜YÈ™YÚ\Ý™Y\ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“ØØ]YYÙYÙ]™[œÎˆŸJKˆ™HÔË\ÜÚ]YHÛÜ™[Y[ˆÙXœZZÝÛH™HØØ]YHÜHØX\HÛ™[‹ˆ^™HÛÜ™šY]ÜÙ\ÛYÙ[ˆÙˆÙYY[Y]\™[‹ˆ—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ‘ÛÛÙÛHÙÚ[ˆHØ]™]ZÙ[]ÈŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ™Y[‹MÌ‹Ú[™[Žˆ¸§$ÈÛÛÙÛHÙÚ[ˆ\È›ÛYYÈÜ[Û™Y[ŸJKšœÞ
œ‹ØÚ[™[ŽššœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•Ø]ÛÜ™Ù\Þ[˜Ú›Ûš\ÙY\™ˆŸJ_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ›\ÝY\ØÈ\ÝZ[œÚYH[Lˆ^^ÈÜXÙK^KLH‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ’™HZYÙ[ˆX[™Ù[XXZÝHYÙ[ˆ
ZZ›ˆYÙ[ŠHŸJKšœÞ
›H‹ØÚ[™[Žˆ’™H›Û™Ý[ˆ™YÚ\Ý˜]Y\ÈŸJKšœÞ
›H‹ØÚ[™[Žˆ’™HÜÙ\ÛYÙ[ˆ›Ý]\ÈŸJKšœÞ
›H‹ØÚ[™[Žˆ’™H™\Ù]Z[œÝ[[™Ù[ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ’™H[Ù[Y[™H\Z[œÝ[[™Ù[ˆŸJW_JKšœÞ
œ‹ØÚ[™[ŽššœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•Ø]’QUÛÜ™ÙYY[ˆŸJ_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ›\ÝY\ØÈ\ÝZ[œÚYH[Lˆ^^ÈÜXÙK^KLH‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ’™HÔË[ØØ]YHÛÜ™šY]ÜÙ\ÛYÙ[ˆ[ˆHÛÝYŸJKšœÞ
›H‹ØÚ[™[Žˆ’™H›ÙZÙÙ\ØÚYY[š\ÈÛÜ™šY]™]ØX\™ŸJKšœÞ
›H‹ØÚ[™[Žˆ•Ù[ÙHØX\YÙ[ˆ™H™ZÚZšÝÛÜ™šY]Ù\™YÚ\Ý™Y\™ŸJKšœÞ
›H‹ØÚ[™[Žˆ“šY[X[™[™\œÈØ[ˆ™H]HšY[ˆH[Y[ˆšZˆŸJW_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•ØX\›ÛH[›ÙÙÙ[ÈŸJKˆ[Y[ˆ›ÛÜˆÞ[˜Ú›Ûš\Ø]YH\ÜÙ[ˆ\\˜][ˆ
[Y›ÛÛ‹ÝX›]ÔÊH[ˆ[È˜XÚÝ\›ÛÜˆ™H›Û™Ý[‹ˆ—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML][XÈ‹Ú[™[Žˆ•\ˆÙXœZZÈH\Ù\\Ý›Û™\ˆÙÚ[ˆ[È™Hš]˜XÞH™[[™ÜšZšÙ\ˆš[™[ˆÞ[˜Ú›Ûš\Ø]YKˆ[H[˜ÝY\ÈÙ\šÙ[ˆÛÚÈÙ™›[™KˆŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ–›Û™\ˆÙÚ[ˆ
[›ÛšY[JHŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^X›YKMÌ‹Ú[™[Žˆ¸§$ÈMIH˜[ˆH[˜ÝY\ÈÙ\šÝ›Û™\ˆÙÚ[ˆŸJKšœÞ
œ‹ØÚ[™[ŽššœÞ
œÝ›Û™È‹ØÚ[™[Žˆ™\ØÚZØ˜X\ˆ›Û™\ˆÙÚ[ŽˆŸJ_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ›\ÝY\ØÈ\ÝZ[œÚYH[Lˆ^^ÈÜXÙK^KLH‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ[HÌ
ÈØX\YÙ[ˆ™ZÚZšÙ[ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ‘ÔÈ˜XÚÚ[™È[ˆ˜]šYØ]YHŸJKšœÞ
›H‹ØÚ[™[Žˆ•›Û™Ý[ˆ™YÚ\Ý™\™[ˆ
ÚØX[ÜÙ\ÛYÙ[ŠHŸJKšœÞ
›H‹ØÚ[™[Žˆ‘ZYÙ[ˆYÙ[ˆX[›XZÙ[ˆ
ÚØX[ÜÙ\ÛYÙ[ŠHŸJKšœÞ
›H‹ØÚ[™[Žˆ‘^Ü˜X\ˆ^Ù[ÐÔÕ‹ÑÙ[Ò”ÓÓ‹ÑÔÒÓSŸJKšœÞ
›H‹ØÚ[™[Žˆ“YÙ[ˆ[\Ü\™[ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ[H™\Ù]È[ˆ[œÝ[[™Ù[ˆŸJW_JKšœÞ
œ‹ØÚ[™[ŽššœÞ
œÝ›Û™È‹ØÚ[™[Žˆ[Y[ˆY]ÙÚ[ŽˆŸJ_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ›\ÝY\ØÈ\ÝZ[œÚYH[Lˆ^^ÈÜXÙK^KLH‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ”Þ[˜Ú›Ûš\Ø]YH\ÜÙ[ˆ\\˜][ˆŸJKšœÞ
›H‹ØÚ[™[ŽˆÛÝY˜XÚÝ\˜[ˆ™H›Û™Ý[ˆŸJW_JW_JW_JW_J_Y[˜Ý[ÛˆJ
^Ü™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
YËÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^X›YKMŒŸJK’ØX\YÙ[ˆ
Ì
ÊH—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ˜\Ú\ÎˆŸJKˆ\ÜšHXÚÜšZœËÜ[”Ý™Y]X\ÒÈXÚ›ÝÈ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’\ÝÜš\ØÚˆŸJKˆRÈNL›Û›™X›Y[ˆNL—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’ÛÙÝZØX\[ŽˆŸJKˆR[ÚYK][KR[ÚYKÛÙÝZØX\Û]\‹Rˆ[H—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ\˜Ú[ÛÙÚYNˆŸJKˆSRÈ[Û[Y[[ˆ
\ˆ\š[ÙJK\˜Ú[ÈÛ™\ž›ÙZÙ[‹RÐUË\ÜÙ[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”›ÛYZ[œÎˆŸJKˆ›ÛYZ[œÙHÙYÙ[‹›ÛYZ[œÙH›Ü[ˆY]\ÝÜš\ØÚH[™›Ë[Y\ÝÙYÈ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”™Z\ÝÜšYNˆŸJKˆ[™X™Y[‹Ü˜Yš]]™[Ë\œ[‹[[ÚØX\[ˆ
È\š[Ù\ÊH—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“Z[]Z\ŽˆŸJKˆÕÒRH[šÙ\œËÛYÝ™[[‹›YYÝ™[[‹™\™YYÚ[™ÜÛ[šY\È—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘\™™ÛÙYˆŸJKˆšZšÜÛ[Û[Y[[‹Ø\Ý[[‹pëÛ™\Ë™[YÚY]\È\™™ÛÙY—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•\œ™Z[ŽˆŸJKˆ™Y[™ÙXšYY[‹Ù[Û[Ü™›ÛÙÚYK›Ù[ZØX\—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”™XÜ™X]YNˆŸJKˆ\šÙ[‹ÜY[Z[™[‹Ý˜[™™\È—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”\˜Ù[[ŽˆŸJKˆÙ]Ø\Ü\˜Ù[[ˆ
Y]›Ý]Ü[Ù[XÚ[™ÊKØY\Ý˜[HÜ™[ž™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”›Ýš[˜ÚXX[ˆŸJKˆ™[XÝ[šØX\ØÚY\ÝÜ˜ZÚÙ[‹™\™›ÛšÙ[ˆÜœ[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•RRÐUŽˆŸJKˆZ]\ØX\™]K^\YšY\Ë›ZÚÙ[‹[[‹Y™™\›YÙ[ˆ—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
[™KÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^\\œKMŒŸJK“Z[™\˜[[ˆ	ˆ›ÜÜÚY[[ˆ—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“Z[™\˜[[ˆÝÜÝÎˆŸJKˆš[™X]Ù[ˆZ]Z[™]›Ü™ÈY]Z[™\˜[[›ZœÝ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ÛÝYš]šY\™[ŽˆŸJKˆ™ZÙ[™HØØ]Y\È›ÛÜˆÛÝY›ÙZÙ[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘›ÜÜÚY[ÝÜÝÎˆŸJKˆš[™X]Ù[ˆY]›ÜÜÚY[\[ˆ[ˆ\š[Ù\È—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ[HYÙ[ŽˆŸJKˆ\™XÝ™\ØÚZØ˜X\ˆš[›™[ˆ]XÝ—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
›™KÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^[Ü˜[™ÙKMŒŸJK“ZZ›ˆYÙ[ˆ—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ZYÙ[ˆYÙ[ŽˆŸJKˆXXZÈYÙ[ˆ›ÛÜˆ˜ZØ[YK›Ú™XÝ[‹]Ëˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•Ù]›ÙYÙ[ŽˆŸJKˆZÈÜ
È[ˆÜ\ÛH[Û[Y[ÛØØ]YHX[ˆXYÈÙHH›ÙYÙ[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”ÛYÛÛ™[ŽˆŸJKˆ[H[Û[Y[ÙXšYY[ˆÛÜ™[ˆÜÙ\ÛYÙ[‹šY][Y[ˆY[ˆ[—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“ÜšYÚ[™[H[™›ÎˆŸJKˆÜ\ÛÛ[›Z™™ZÝY[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’Û]\™[ŽˆŸJKˆšY]]ÙHYÙ[ˆÜšZ™Ù[ˆ]]ÛX]\ØÚY[ˆZYÙ[ˆÛ]\ŽÈšZˆ[\ÜÚY\È™HHÛ]\ˆ›ÛÜ˜Yˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’[\ÜˆŸJKˆXYÙ[Ò”ÓÓ‹ÓSÙˆÔ™\Ý[™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘^ÜˆŸJKˆ^ÜY\ˆYÙ[ˆ[ÈÙ[Ò”ÓÓˆ—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
Y‹ÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹MŒŸJK‘ÛÛÙÛHÛÝYÞ[˜È—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’[›ÙÙÙ[ŽˆŸJKˆšXH[X\™Ù\ˆY[H™XÚØ›Ý™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Þ[˜Ú›Ûš\Ø]YNˆŸJKˆYÙ[ˆ[ˆ›Û™Ý[ˆ]]ÛX]\ØÚ˜X\ˆÛÝY—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“YY\™\™H\\˜][ŽˆŸJKˆ[Z™ÙYØ[™ÈÝ™H]H—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•™Z[YÎˆŸJKˆ[Y[ˆšZˆXÙYØ[™ÈÝ™HÙYÙ]™[œÈ—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ØËÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹MŒŸJK‘ÔÈ	ˆ˜]šYØ]YH—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ“]™HÔÈ˜XÚÚ[™ÈY]˜]]ÚÙ]\šYÚZYØÚ\šÙ[ŸJKšœÞ
›H‹ØÚ[™[Žˆ”šXÚ[™ÜÜZ›˜XZ]YYHY]™H[Y›ÛÛˆŸJKšœÞ
›H‹ØÚ[™[Žˆ’ØX\[™X]YÈ˜XZY[ˆ
ÈÛÛ\\ÚÛ›Ü˜X\ˆ›ÛÜ™[ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ”ØÚX[˜[ÈÛ™\˜X[ˆ
X[‹ÝZ][ˆ[œÝ[[™Ù[ŠHŸJKšœÞ
›H‹ØÚ[™[Žˆ“Ü[ˆØØ]YH[ˆÛÛÙÛHX\È˜[Z]Ü\ŸJKšœÞ
›H‹ØÚ[™[Žˆ–›ÙZØ˜[È›ÛÜˆY™\ÜÙ[ˆ[ˆX]Ù[ˆŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ZKÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^[Ü˜[™ÙKMŒŸJK•›Û™Ý[ˆ—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ•Ù]›ÙYÙ[ˆšXHÔÈØØ]YKÛ™Ë\™\ÜÈÙˆ[™X]YÈŸJKšœÞ
›H‹ØÚ[™[Žˆ•™[[Žˆ\KX]\šXX[\š[ÙKY\KÛÛ™]YKÙ]ÚXÚŸJKšœÞ
›H‹ØÚ[™[Žˆ‘^Üˆ^Ù[ÔÕ‹Ù[Ò”ÓÓ‹ÔÓSŸJKšœÞ
›H‹ØÚ[™[Žˆ‘\Ú›Ø\™Y]Ý]\ÝYZÙ[ˆŸJKšœÞ
›H‹ØÚ[™[ŽˆÛÝYÞ[˜ÈY]ÛÛÙÛHXØÛÝ[ŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
˜ËÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^\\œKMŒŸJK”™\Ù]È—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý[™X\™ˆŸJKˆ]XÝYKÝY[Z™›ÛYZ[œËZY[Y]]Ù[‹ÓÒRK[˜[\ÙK›ÜÜÚY[[‹Z[™\˜[[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[ŽˆX[œ\Ø˜X\ŽˆŸJKˆÝ™\œØÚšZ™ˆ™\Ù]Y]ZYYÙHYÙ[ˆ
\ÚÙ]KZXÛÛÛŠH—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ZYÙ[ˆ™\Ù]ÎˆŸJKˆXXZÈšY]]ÙHšXH[œÝ[[™Ù[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•ZÜÝÜ›ÛÝNˆŸJKˆX[œ\Ø˜X\ˆ\ˆ[™[šXHÛY\ˆ—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
[™KÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^XÞX[‹MŒŸJK”\˜ÙY[[™›Ü›X]YH—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ’ØY\Ý˜[HX[™ZY[™È
Ù[YY[KÙXÝYK[[Y\ŠHŸJKšœÞ
›H‹ØÚ[™[Žˆ“Ü\›ZÝH[ˆp¬ˆ[ˆXÝ\™HŸJKšœÞ
›H‹ØÚ[™[Žˆ‘Ù]Ø\È[ˆ›Ý]Ü[ˆY]Z]YÈŸJKšœÞ
›H‹ØÚ[™[Žˆ›Ù[]\HY]™\ØÚšZš[™ÈŸJKšœÞ
›H‹ØÚ[™[ŽˆRˆÛÙÝH[ˆY]\œÈTŸJKšœÞ
›H‹ØÚ[™[Žˆ’ÛÙÝZØX\\ˆ\˜ÙY[
™\™Ú™KZXÛÛÛŠHŸJKšœÞ
›H‹ØÚ[™[Žˆ“[šÈ˜X\ˆZYÙ[˜X\ˆÜ›ÙZÙ[ˆ
ØY\Ý\ŠHŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
Ü™KÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^\™YMŒŸJK“[Û[Y[[ˆ	ˆ\™™ÛÙY—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[ŽˆSRÎˆŸJKˆ\˜Ú[ÛÙÚ\ØÚH[Û[Y[[ˆ\ˆ\š[ÙH—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”›ÛYZ[œÙH›Ü[ŽˆŸJKˆZ]ÙXœ™ZYH\ÝÜš\ØÚH[™›È\ˆ›Ü—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”šZšÜÛ[Û[Y[[ŽˆŸJKˆY]™\ØÚ\›Z[™È[ˆ\ÝÜšYH—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•™\™YYÚ[™ÜÝÙ\šÙ[ŽˆŸJKˆ[šY\Ë›Ü[‹ØÚ[œÙ[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ü\[™›ÎˆŸJKˆ\™XÝHZ]YÈÝ™\ˆ\˜Ú[ÛÙÚ\ØÚHØX\™H—_JW_JW_JW_J_Y[˜Ý[ÛˆŽJ
^Ü™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ‘Y\œÝHÝ\[ˆŸJKšœÞÊ›Û‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È\ÝYXÚ[X[\ÝZ[œÚYH‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–È•ZÈÜH‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ÔÈÛ›ÜŸJKˆ
™XÚÛÛ™\‹Ü˜[š™JHÛH™HØØ]YHHšY[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–È’ÚY\ÈY[ˆ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆœ™\Ù]ŸJKˆ
[šÜÛÛ™\‹XYÚ™\ËZXÛÛÛŠH›ÛÜˆY[ˆÛ™[HÝ\—_JKšœÞÊ›H‹ØÚ[™[Ž–È“ÙˆÜ[ˆ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’ØX\YÙ[ˆŸJKˆÛH[™]šYY[HYÙ[ˆX[ˆH™][ˆ—_JKšœÞ
›H‹ØÚ[™[Žˆ•ZÈÜØš™XÝ[ˆÜHØX\›ÛÜˆÙY]Z[Y\™H[™›Ü›X]YHŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ’[X\™Ù\ˆY[HŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞ
œ‹ØÚ[™[Žˆ”™XÚØ›Ý™[ˆš[™™H]Y[HY]ˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ›\ÝY\ØÈ\ÝZ[œÚYH[LˆÜXÙK^KLH‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ÛÛÙÛHÙÚ[ŽˆŸJKˆÞ[˜Ú›Ûš\ÙY\ˆ™H]H˜X\ˆHÛÝY—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•›Û™ÝÙ]›ÙYÙ[ŽˆŸJKˆ™YÚ\Ý™Y\ˆY[ˆšY]]ÙH›Û™Ý—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’[™›È	ˆ[™ZY[™ÎˆŸJKˆ]ØÚ\›H—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’[œÝ[[™Ù[ŽˆŸJKˆ™\Ù]Ë^ÜÙY\™Ø]™H—_JW_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ‘ÔÈ	ˆ˜]šYØ]YHŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ÔÈÛ›Ü
Ü˜[š™JNˆŸJKˆX[‹ÝZ]ÙÙÛH›ÛÜˆØØ]YH˜XÚÚ[™Ëˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”šXÚ[™ÜÜZ›ˆŸJKˆ›]]ÙHZ›ÛÛHšXÚ[™È˜[ˆ™H[Y›ÛÛ‹ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’ØX\˜XZY[ŽˆŸJKˆY]ÙYHš[™Ù\œÈÙˆšXHÛÛ\\Ëˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’ÛÛ\\ÚÛ›ÜˆŸJKˆ™\œØÚZ›™XÚØ›Ý™[ˆ[ÈØX\ÙY˜XZY\ËˆZÈÛH˜X\ˆ›ÛÜ™[ˆH˜XZY[‹ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ÛÛÙÛHX\ÎˆŸJKˆ˜[Z][ÙHÜ\Ý[ˆ™H\™XÝ˜]šYÙ\™[‹ˆ—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ“ØØ]Y\ÈÜÛX[ˆ[ˆZZ›ˆYÙ[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\NˆŸJKˆZÈÜY[ˆØš™XÝÜHØX\
[Û[Y[[šÙ\‹]ËŠH—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\ŽˆŸJKˆZÈÜH‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ›Ü˜[š™H
ÈŸJKˆÛ›Ü[ˆHÜ\XY\ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\ÎˆŸJKˆÚY\ÈY[ˆ™\ÝX[™HXYÈÙˆXXZÈY[ˆšY]]ÙHX[ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”™\Ý[X]ˆŸJKˆHØØ]YH[˜Û\ÚYYˆ›Ü›H
ÛYÛÛÛŠH[ˆ[™›ÈÛÜ™ÜÙ\ÛYÙ[ˆH—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML][XÈ‹Ú[™[Žˆ•\ˆXXZÈYÙ[ˆ›ÛÜˆ˜ZØ[YX™\Ý[[Z[™Ù[‹›Ú™XÝ[ˆÙˆ[\™\ÜØ[HØØ]Y\ËˆŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ•›Û™Ý™YÚ\Ý™\™[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•šXHÔÎˆŸJKˆÜ[ˆY[H8¡¤ˆ›Û™ÝÙ]›ÙYÙ[‹ˆ™HØØ]YHÛÜ™]]ÛX]\ØÚ[™Ù][ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•šXHÛ™Ë\™\ÜÎˆŸJK	ÈÝY™Hš[™Ù\ˆÜHØX\8¡¤ˆÚY\È•›Û™Ý™YÚ\Ý™\™[ˆ‹‰×_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’[™X]YÎˆŸJK	È[ˆ]›Ü›][Y\ˆ8¡¤ˆ’ÚY\ÈÜØX\ˆ›ÛÜˆ^XÝHØØ]YK‰×_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ”™\Ù]ÈÙXœZZÙ[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•Ù\\ÜÙ[ŽˆŸJKˆ[šÜÛÛ™\ˆ8¡¤ˆ™\Ù]ÚY^™[‹ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[ŽˆX[œ\ÜÙ[ŽˆŸJKˆ™]Ù]Ù[œÝHYÙ[ˆX[ˆ8¡¤ˆZÈ\ÚÙ]KZXÛÛÛˆ˜X\Ý™\Ù]ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“šY]]ÈXZÙ[ŽˆŸJK	È[œÝ[[™Ù[ˆ8¡¤ˆ™\Ù]È8¡¤ˆ’ZYYÙHYÙ[ˆÜÛX[ˆ‹‰×_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[ŽˆÛÝYÞ[˜È[œÝ[[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\NˆŸJKˆÜ[ˆ[X\™Ù\ˆY[H™XÚØ›Ý™[ˆ—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\ŽˆŸJK	ÈZÈÜ’[›ÙÙÙ[ˆY]ÛÛÙÛH‰×_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\ÎˆŸJKˆÚY\È™HÛÛÙÛHXØÛÝ[—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’ÛX\ˆHŸJKˆ™HYÙ[ˆ[ˆ›Û™Ý[ˆÛÜ™[ˆ]]ÛX]\ØÚÙ\Þ[˜Ú›Ûš\ÙY\™ˆ—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML][XÈ‹Ú[™[Žˆ’™H]H\È™Z[YÈ[ˆ[Y[ˆ›ÛÜˆ›ÝHÙYØ[šÙ[ZšËˆŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ“YÙ[ˆ[\Ü\™[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\NˆŸJKˆØH˜X\ˆ[œÝ[[™Ù[ˆ
[X\™Ù\ˆY[JH—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\ŽˆŸJK	ÈØÜ›Û˜X\ˆ“YÙ[ˆ[\Ü\™[ˆ‰×_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”Ý\ÎˆŸJKˆÚY\ÈY[ˆÙ[Ò”ÓÓ‹ÓSÙˆÔ™\Ý[™—_JKšœÞÊœ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”™\Ý[X]ˆŸJKˆšY]]ÙHXYÈY]™HÙZ[\ÜY\™H]HH—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML][XÈ‹Ú[™[Žˆ’[™YÈ›ÛÜˆ›Ý]\ËØ^\Ú[ÈÙˆZYÙ[ˆ]\Ù]ËˆŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ•\È›ÛÜˆ]XÝYHŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È\ÝY\ØÈ\ÝZ[œÚYH‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–È‘ÙXœZZÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[ŽˆRˆ[ÚYHŸJKˆÛH™[pêÙˆHšY[ˆ
Ü˜Yš]]™[ËØ[[ŠH—_JKšœÞÊ›H‹ØÚ[™[Ž–ÈÛÛXš[™Y\ˆ‹šœÞ
œÝ›Û™È‹ØÚ[™[ŽˆSRÈŸJKˆY]‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘Ù]Ø\Ü\˜Ù[[ˆŸJKˆ›ÛÜˆÛ[[YH›ÙZÛØØ]Y\È—_JKšœÞÊ›H‹ØÚ[™[Ž–ÈÚXÚÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’RÐUÈŸJKˆ›ÛÜˆ\˜Ú[ÛÙÚ\ØÚH™\ØXÚ[™È—_JKšœÞÊ›H‹ØÚ[™[Ž–È‘ÙXœZZÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆš\ÝÜš\ØÚHØX\[ˆŸJKˆ
RÈNL
HÛHÝYHÝXÝ\™[ˆHš[™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–È™ZÚZšÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ\˜Ú[ÈÛ™\ž›ÙZÙ[ˆŸJKˆ›ÛÜˆY\™\™H›Û™Ý[ˆ[ˆ]ÙXšYY—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ›Ù[ZØX\ŸJKˆÛÛÙˆÜ›Û™Ù\ØÚZÝ\È
Ü\YÝZ]
H—_JW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ•\È›ÛÜˆ›ÜÜÚY[[ˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È\ÝY\ØÈ\ÝZ[œÚYH‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–È–™]‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘›ÜÜÚY[ÝÜÝÈŸJKˆX[ˆ›ÛÜˆ™ZÙ[™Hš[™X]Ù[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–È™ZÚZšÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”[[ÚØX\[ˆŸJKˆ›ÛÜˆ\ÝÜš\ØÚHÝ\ÝZ›™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÈÚXÚÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘Ù[Û[Ü™›ÛÙÚYHŸJKˆ›ÛÜˆÝYH™YX›Ù[\È[ˆš]šY\™[ˆ—_JKšœÞ
›H‹ØÚ[™[Žˆ”Ü\ÛÛÙ[ÙH›ÜÜÚY[[ˆÜ[ÙHØØ]YHÙ]›Û™[ˆšZ›ˆŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ•\È›ÛÜˆZ[™\˜[[ˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLH^^È\ÝY\ØÈ\ÝZ[œÚYH‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–È–™]‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“Z[™\˜[[ˆÝÜÝÈŸJKˆX[ˆ›ÛÜˆš[™X]Ù[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–È™ZÚZšÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘ÛÝYš]šY\™[ˆŸJKˆ›ÛÜˆÛÝY›ÙZÛ[ÙÙ[ZšÚY[ˆ—_JKšœÞ
›H‹ØÚ[™[Žˆ”Ü\ÛÛÙ[ÙHZ[™\˜[[ˆÜ[ÙHØØ]YH›ÛÜšÛÛY[ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ“[šÜÈ˜X\ˆZ[™]›Ü™È›ÛÜˆÙY]Z[Y\™H[™›ÈŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ZÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^X›YKMŒŸJK’[™YÙH[šÜÈ—_JKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒÜXÙK^KLˆ^^È‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
˜H‹Ú™YŽˆšÎ‹ËÛYÙ[™YÙ[Û[Ü™›ÛÙÚYKÝ\‹››È‹\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ‹Û\ÜÓ˜[YNˆ^X›YKMŒÝ™\Ž[™\›[™H›Û[YY][H‹Ú[™[Žˆ‘Ù[Û[Ü™›ÛÙÚYHYÙ[™H
ÕTŠHŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ•Z]ÙXœ™ZYHZ]YÈÝ™\ˆ[™›Ü›Y[ˆŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
˜H‹Ú™YŽˆšÎ‹ËÛYÙ[™KX›Ù[ZØX\˜›Ù[Y]K››È‹\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ‹Û\ÜÓ˜[YNˆ^X›YKMŒÝ™\Ž[™\›[™H›Û[YY][H‹Ú[™[Žˆ›Ù[ZØX\YÙ[™H
”“ÊHŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ•›ÛYYÙH›Ù[XÛ\ÜÚYšXØ]YHŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
˜H‹Ú™YŽˆšÎ‹ËÝÝÝË›Z[™]›Ü™ËÈ‹\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ‹Û\ÜÓ˜[YNˆ^X›YKMŒÝ™\Ž[™\›[™H›Û[YY][H‹Ú[™[Žˆ“Z[™]›Ü™ÈHZ[™\˜[[ˆ]X˜\ÙHŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ•Ù\™[ÚZ™HZ[™\˜[[ˆ[™›Ü›X]YHŸJW_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
˜H‹Ú™YŽˆšÎ‹ËÝÝÝË˜Ý[\™Y[\™™ÛÙY››È‹\™Ù]ˆ—Ø›[šÈ‹™[ˆ››ÛÜ[™\ˆ‹Û\ÜÓ˜[YNˆ^X›YKMŒÝ™\Ž[™\›[™H›Û[YY][H‹Ú[™[Žˆ”šZšÜÙY[œÝ›ÛÜˆÝ[\™Y[\™™ÛÙYŸJKšœÞ
˜œˆ‹ßJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ“Ù™šXÚpêÛH[Û[Y[[ˆ[™›Ü›X]YHŸJW_JW_JW_JW_J_[]Z[[LO[[Ù[˜Ý[Ûˆ™YJ
^ÚYŠ\[ÙˆÚ[™ÝÏˆHŸJœÜYXÚÞ[\Ú\Èš[ˆÚ[™ÝÊJ\™]\›ˆLNÚZ]Ú[™ÝËœÜYXÚÞ[\Ú\ÎØÛÛœÝJ
OOžØÛÛœÝOZZË™Ù]›ÚXÙ\Ê
_×NÒLOYK™š[™
O›[™ËœÝ\ÕÚ]
››Š_›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê™]ÚŠ_›˜[YKÓÝÙ\Ø\ÙJ
Kš[˜ÛY\Ê›™Y\›[™ŠJ_[RLI‰™K›[™ÝŒ	‰ŠLOYVÌJ_NÜ™]\›ˆŠ
KZ	‰ŠZ›Û›ÚXÙ\ØÚ[™ÙY[ŠKLY[˜Ý[ÛˆNJ‹J^ÚYŠZZ	‰ˆ\™YJ
_ZZ
\™]\›ŽÚZ˜Ø[˜Ù[

NØÛÛœÝ[™]ÈÜYXÚÞ[\Ú\Õ]\˜[˜ÙJŠNÒLI‰Š›ÚXÙORLJK›[™ÏH››S“‹œ˜]OYOËœ˜]Kœ]ÚYOËœ]ÚÏÌK›Û[YOYOË›Û[YOÏÌKZœÜXZÊ
_Y[˜Ý[ÛˆJŠ^ØÛÛœÝOV×NÙKœ\Ú
	Û‹\_HÙYÙ]›ÙYÙ
K‹›X]\šX[	‰›‹›X]\šX[OOH“Û˜™ZÙ[™‰‰™Kœ\Ú
X]\šXX[ˆ	Û‹›X]\šX[X
K‹œ\š[Ù	‰›‹œ\š[ÙOOH“Û˜™ZÙ[™‰‰™Kœ\Ú
\š[ÙNˆ	Û‹œ\š[ÙX
K‹›^Y\“˜[YI‰›‹›^Y\“˜[YHOOH•›Û™Ý[ˆ‰‰™Kœ\Ú
ÜÙ\ÛYÙ[ˆ[ˆ	Û‹›^Y\“˜[Y_X
NØÛÛœÝYKš›Ú[Š‹ˆŠNÓNJÜ˜]NŒKŒ_J_\™YJ
NÙ[˜Ý[ÛˆRJÛX™[›‹˜[YN™KÛÚ[™ÙNÜ[ÛœÎœ‹™\]Z\™YšOHLKXÙZÛ\ŽœÏH•\Y\‹‹‹ˆŸJ^ØÛÛœÝØK×OP‹\ÙTÝ]JLJKÛ×OP‹\ÙTÝ]JLJKÝK—OP‹\ÙTÝ]JˆŠKYI‰ˆ\‹š[˜ÛY\ÊJKOJ
OOžØÊL
KŠÙNˆˆŠKÊLJ_KOJ
OOžÝKš[J
I‰
Kš[J
JKÊLJ_NÜ™]\›ˆÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LKH‹Ú[™[Ž–Û‹I‰ššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^[Ü˜[™ÙKML[LH‹Ú[™[ŽˆŠˆŸJW_JKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNKÛÚ[™ÙNžO™Š\™Ù]˜[YJKÛ’Ù^QÝÛŽžOžÞšÙ^OOOH‘[\ˆ‰‰Šœ™]™[Y˜][

KJ
JKšÙ^OOOH‘\ØØ\H‰‰˜ÊLJ_KÛ›\ŽžKXÙZÛ\ŽœË]]Ñ›ØÝ\ÎˆLÛ\ÜÓ˜[YNˆËY[LÈKL‹H™ËYÜ˜^KML›Ý[™Y[È^YÜ˜^KMÌ›ØÝ\Î˜™Ë]Ú]H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë[Ü˜[™ÙKML˜[œÚ][Û‹X[‹Ý[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸ_JW_JNššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ™[]]™H‹Ú[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LKH‹Ú[™[Ž–Û‹I‰ššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^[Ü˜[™ÙKML[LH‹Ú[™[ŽˆŠˆŸJW_JKšœÞÊ˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎŠ
OO›ÊXJKÛ\ÜÓ˜[YNˆËY[›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆLÈKL‹H™ËYÜ˜^KML›Ý[™Y[È^YÜ˜^KMÌÝ™\Ž˜™ËYÜ˜^KLL˜[œÚ][Û‹XÛÛÜœÈ^[Y‹Ý[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸKÚ[™[Ž–ÚšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YN™OÈˆŽˆ^YÜ˜^KM‹Ú[™[Ž–Ù_”Ù[XÝY\‹‹‹ˆ‹	‰ššœÞ
QÜÚ^™NŒL‹Û\ÜÓ˜[YNˆš[›[™H[LH^[Ü˜[™ÙKMLŸJW_JKšœÞ
žÜÚ^™NŒM‹Û\ÜÓ˜[YN˜^YÜ˜^KM˜[œÚ][Û‹]˜[œÙ›Ü›H	ØOÈœ›Ý]KLNŽˆˆŸXJW_JKI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜XœÛÛ]H‹MLËY[]LH™Ë]Ú]H›Ý[™Y[ÈÚYÝË[ÈX^ZMÝ™\™›ÝË^KX]]È‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎ›KÛ\ÜÓ˜[YNˆËY[LÈKLˆ^[Y^\ÛH^[Ü˜[™ÙKMŒÝ™\Ž˜™Ë[Ü˜[™ÙKML˜[œÚ][Û‹XÛÛÜœÈ›^][\ËXÙ[\ˆØ\Lˆ‹Ý[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸKÚ[™[Ž–ÚšœÞ
QÜÚ^™NŒLŸJK‘ZYÙ[ˆ[›Ù\‹‹‹ˆ—_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜›Ü™\‹]›Ü™\‹YÜ˜^KLLŸJK‹›X\
OššœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎŠ
OOžÝ

KÊLJ_KÛ\ÜÓ˜[YN˜ËY[LÈKLˆ^[Y^\ÛH˜[œÚ][Û‹XÛÛÜœÈ	ÞOOYOÈ˜™Ë[Ü˜[™ÙKML^[Ü˜[™ÙKMŒŽˆ^YÜ˜^KMŒÝ™\Ž˜™ËYÜ˜^KMLŸXÝ[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸKÚ[™[ŽžK
JW_JW_J_Y[˜Ý[ÛˆYYJÛÛÛÜÙN›‹[š]X[ØØ][ÛŽ™_J^ØÛÛœÝRJO’œÜÚ][ÛŠKU\ŠO’›X\
KO]ŠO’›^Y\œÊKÏ]ŠO’˜YÚ[
KO^[ŠO’›ÚXÙQ™YY˜XÚÑ[˜X›Y
KÏV\ÊO’œÝ]JKV\ÊO’œÝ\[YJKÏJ
OO›ÏOOHšYHŸ[Û[˜›Ý]H	Û™]È]J
KÓØØ[Q]TÝš[™Ê››S“Š_H	Û™]È]J
KÓØØ[U[YTÝš[™Ê››S“‹ÚÝ\ŽˆŒ‹YYÚ]‹Z[]NˆŒ‹YYÚ]ŸJ_XO[ÏOOHœ™XÛÜ™[™ÈŸÏOOHœ]\ÙY‹XÊ
KÜWOP‹\ÙTÝ]JˆŠKÞKOP‹\ÙTÝ]JˆŠK×ËWOP‹\ÙTÝ]JˆŠKÔË×OP‹\ÙTÝ]JˆŠKÐKOP‹\ÙTÝ]JLJKÞ‹WOP‹\ÙTÝ]J›ÚY
KÕ—OP‹\ÙTÝ]J›ÚY
KÓOP‹\ÙTÝ]J

OOšVÌOËšYˆŠKÕ‹—OP‹\ÙTÝ]JOÈ›X\\XÚÈŽÈ™ÜÈŽˆ›X\XÙ[\ˆŠKÛÙKYWOP‹\ÙTÝ]J_[
KÙÙKWOP‹\ÙTÝ]JLJKOJ
OOžÚYŠOOH™ÜÈ‰‰
\™]\›žÛ]›]™Î›™ßNÚYŠOOH›X\\XÚÈ‰‰›ÙJ\™]\›ˆÙNÚYŠŠ^ØÛÛœÝ\‹™Ù]šY]Ê
K™Ù]Ù[\Š
NÚYŠ
^ØÛÛœÝÒ‹YWORŠ
NÜ™]\›žÛ]˜YK™Î’Ÿ__\™]\›ˆ[KYOZJ
NÐ‹\ÙQY™™XÝ


OOžÚKœÛÛYJO’šYOOS
_
VÌOËšYˆŠ_KÚKJK‹\ÙQY™™XÝ


OOžÚYŠYÙ_\Š\™]\›ŽØÛÛœÝROžØÛÛœÝØYK™WORŠ‹˜ÛÛÜ™[˜]JNÞYJÛ]š™K™Î˜Y_JKŠ›X\\XÚÈŠKJLJ_NÜ™]\›ˆ‹›ÛŠ˜ÛXÚÈ‹
K

OOœ‹[Š˜ÛXÚÈ‹
_KÙÙK—JNØÛÛœÝYOJ
OO™JL
KOJ
OOžÝ	‰ŠŠ™ÜÈŠKYJ[
J_KÏX\Þ[˜ÈOžÒœ™]™[Y˜][

NØÛÛœÝZJ
NÚYŠRŠ^Ø[\
‘ÙY[ˆØØ]YH™\ØÚZØ˜X\ˆŠNÜ™]\›ŸZYŠ^J^Ø[\
•[Y[ˆ˜X[KÝ\H[ˆŠNÜ™]\›ŸZYŠS
^Ø[\
“XXZÈY\œÝY[ˆXYÈšXHØX\YÙ[ˆ8¡¤ˆZZ›ˆYÙ[ˆŠNÜ™]\›ŸT
L
NÝž^Û]YO\ˆŽÚYŠOOXÝŠ^ØÛÛœÝOV×N×É‰‘Kœ\Ú
X]\šXX[ˆ	×ßX
KÉ‰‘Kœ\Ú
\š[ÙNˆ	ÔßX
K‰‰‘Kœ\Ú
Ù]ÚXÚˆ	ÞŸYØ
K	‰‘Kœ\Ú
[™ÝNˆ	Õ[[X
KK›[™ÝŒ	‰ŠYOQKš›Ú[ŠˆŠJÊØ	ÜXˆˆŠJ_\ÊØÛÛÜ™[˜]\Î–Ò‹›™Ë‹›]K˜[YNžKØ]YÛÜžN“OOXÝÞNˆ“Ý™\šYÈ‹›Ý\Î˜Y_ˆ‹‹‹I‰›ÞÜ›Ý]RY˜™XÛÜ™[™ËIÛX›Ý]S˜[YN™Ÿ›ÚYNžß_JNØÛÛœÝ™OZK™š[™
OO‘KšYOOS
OË›˜[Y_•›Û™Ý[ˆŽØI‰“JÝ\NžKX]\šX[—ß›ÚY\š[Ù”ß›ÚY^Y\“˜[YNš™_JK[\
ÙYÙ]›ÙYÙX[ˆ	Ú™_HH8§!X
KŠ
_XØ]Ú
YJ^Ø[\
‘›Ý]šZˆÜÛX[ŽˆŠØYK›Y\ÜØYÙJ_Yš[˜[^Ô
LJ__KYOP‹\ÙSY[[Ê

OOšK›X\
OŠÚY’šY˜[YN’›˜[YKÛÛÜŽ’˜ÛÛÜŸJJKÚWJNÜ™]\›ˆÙOÚšœÞ
›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^Y›ÝÛKLYLšYÚL‹VÌŒHM‹[š]X[žÞNŒLK[š[X]NžÞNŒK^]žÞNŒLKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™Ë[Ü˜[™ÙKML^]Ú]H›Ý[™Y^ÚYÝË^M›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆX^]Ë[Y^X]]È‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒÛ\ÜÓ˜[YNˆ˜[š[X]K\[ÙHŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Žˆ•ZÈÜHØX\ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛHÜXÚ]KNL‹Ú[™[Žˆ›ÛHØØ]YHHÚY^™[ˆŸJW_JW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO™JLJKÛ\ÜÓ˜[YNˆœMKLˆ™Ë]Ú]KÌŒÝ™\Ž˜™Ë]Ú]KÌÌ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Žˆ[›[\™[ˆŸJW_J_JNššœÞ
šKÚ\ÓÜ[ŽˆL]Nˆ“šY]]ÙH›Û™Ý‹XÛÛŽššœÞ
ZKÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN›‹›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LÈ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎ›‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ›^LH‹Ú[™[Žˆ[›[\™[ˆŸJKšœÞ
˜]Ûˆ‹Ý\NˆœÝX›Z]‹›Ü›Nˆ™]XÝ]›Û™ÝY›Ü›H‹\ØX›Y_ZY_Ù_^_SÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]Ûˆ›^LH\ØX›Y›ÜXÚ]KML‹Ú[™[ŽOÈ“ÜÛX[‹‹‹ˆŽˆ“ÜÛX[ˆŸJW_JKÚ[™[ŽššœÞ
™›Ü›H‹ÚYˆ™]XÝ]›Û™ÝY›Ü›H‹Û”ÝX›Z]“ËÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMHÜXÙK^KM‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹Lˆ‹Ú[™[Žˆ“ØØ]YHŸJKYI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™Ë[Ü˜[™ÙKML›Ý[™Y^MKLÈX‹Lˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^[Ü˜[™ÙKN›Û[[Û›È‹Ú[™[Ž–ÚYK›]Ñš^Y
ŠK°¬‹‹YK›™ËÑš^Y
ŠK°¬H—_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^[Ü˜[™ÙKMŒ]LH‹Ú[™[Ž•OOH™ÜÈÈ¼'äãHÔÈØØ]YHŽ•OOH›X\\XÚÈÈ¼'ã«ÈÙZÛÞ™[ˆÜØX\Žˆ¼'åî»î#ÈØX\ZY[ˆŸJW_JKZYI‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™Ë\™YML›Ý[™Y^MKLÈX‹Lˆ‹Ú[™[ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^\™YMŒ‹Ú[™[Žˆ‘ÙY[ˆØØ]YH™\ØÚZØ˜X\ˆŸJ_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–Ý	‰•ˆOOH™ÜÈ‰‰ššœÞÊ˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎ”KÛ\ÜÓ˜[YNˆ™›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ^\ÛH™ËYÜ™Y[‹ML^YÜ™Y[‹MÌ›Ý[™Y[ÈÝ™\Ž˜™ËYÜ™Y[‹LL˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
ØËÜÚ^™NŒMŸJK‘ÔÈ—_JKšœÞÊ˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎYKÛ\ÜÓ˜[YNˆ™›^LH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LˆLÈKLˆ^\ÛH™ËX›YKML^X›YKMÌ›Ý[™Y[ÈÝ™\Ž˜™ËX›YKLL˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒMŸJK’ÚY\ÈÜØX\—_JW_JW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹Lˆ‹Ú[™[Žˆ“ÜÛX[ˆ˜X\ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^›^]Ü˜\Ø\Lˆ‹Ú[™[Ž–ÙYK›X\
OššœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎŠ
OO‘
šY
KÛ\ÜÓ˜[YN˜LÈKLˆ›Ý[™Y[È^\ÛH›Û[YY][H˜[œÚ][Û‹X[›Ü™\‹LÝ][™K[›Û™H	ÓOORšYÈ˜™ËYÜ˜^KN^]Ú]HÚYÝË[YŽˆ˜™ËYÜ˜^KLL^YÜ˜^KMŒÝ™\Ž˜™ËYÜ˜^KLŒŸXÚ[™[Ž’›˜[Y_KšY
JKYK›[™ÝOOL	‰ššœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ˜^KML‹Ú[™[Žˆ“XXZÈY\œÝY[ˆXYÈšXHØX\YÙ[ˆ8¡¤ˆZZ›ˆYÙ[‹ˆŸJW_JW_JKOOXÝ‰‰ššœÞ
RKÛX™[ˆ•\H›Û™Ý‹˜[YNžKÛÚ[™ÙNžÜ[ÛœÎ–È“][‹X\™]Ù\šÈ‹‘Ù\Ü‹‘šX[H‹”š[™È‹”Ü[‹”ÚY\˜XY‹‘Ù\™YYØÚ\‹•Ø\[ˆ‹[™\œÈ—K™\]Z\™YˆLXÙZÛ\Žˆ•\\H›Û™Ý‹‹ˆŸJKOOXÝ‰‰ššœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LKH‹Ú[™[Ž–È“˜X[H‹šœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^[Ü˜[™ÙKML[LH‹Ú[™[ŽˆŠˆŸJW_JKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNžKÛÚ[™ÙN’Ož
\™Ù]˜[YJKXÙZÛ\Žˆ“˜X[H˜[ˆ][‹‹ˆ‹Û\ÜÓ˜[YNˆËY[LÈKL‹H™ËYÜ˜^KML›Ý[™Y[È^YÜ˜^KMÌ›ØÝ\Î˜™Ë]Ú]H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë[Ü˜[™ÙKML˜[œÚ][Û‹X[‹Ý[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸ_JW_JKOOXÝ‰‰ššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
RKÛX™[ˆ“X]\šXX[‹˜[YN—ËÛÚ[™ÙN‘KÜ[ÛœÎ–Èœ›ÛœÈ‹’Rž™\ˆ‹–š[™\ˆ‹‘ÛÝY‹’ÛÜ\ˆ‹“ÛÙ‹•[ˆ‹’Ù\˜[ZYZÈ‹”ÝY[ˆ‹‘Û\È‹›Ý‹’Ý]‹“Y\ˆ‹“Û˜™ZÙ[™—KXÙZÛ\Žˆ•\X]\šXX[‹‹ˆŸJKšœÞ
RKÛX™[ˆ”\š[ÙH‹˜[YN”ËÛÚ[™ÙNšËÜ[ÛœÎ–È”ÝY[Z™‹œ›ÛœÝZ™‹’Rž™\Z™‹”›ÛYZ[œÈ‹“ZY[Y]]ÜÈ‹“šY]]Ù]Z™‹“[Ù\›ˆ‹“Û˜™ZÙ[™—KXÙZÛ\Žˆ•\\š[ÙK‹‹ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LH‹Ú[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LKH‹Ú[™[Žˆ‘Ù]ÚXÚ
ÊHŸJKšœÞ
š[œ]‹Ý\Nˆ›[X™\ˆ‹˜[YNžÏÈˆ‹ÛÚ[™ÙN’O’J\™Ù]˜[YOÜ\œÙQ›Ø]
\™Ù]˜[YJN›ÚY
KÛ\ÜÓ˜[YNˆËY[LÈKL‹H™ËYÜ˜^KML›Ý[™Y[È^YÜ˜^KMÌ›ØÝ\Î˜™Ë]Ú]H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë[Ü˜[™ÙKML˜[œÚ][Û‹X[‹Ý[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸKZ[ŽˆŒ‹Ý\ˆŒŒHŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LH‹Ú[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LKH‹Ú[™[Žˆ“[™ÝH
[JHŸJKšœÞ
š[œ]‹Ý\Nˆ›[X™\ˆ‹˜[YN•ÏÈˆ‹ÛÚ[™ÙN’O”Š\™Ù]˜[YOÜ\œÙQ›Ø]
\™Ù]˜[YJN›ÚY
KÛ\ÜÓ˜[YNˆËY[LÈKL‹H™ËYÜ˜^KML›Ý[™Y[È^YÜ˜^KMÌ›ØÝ\Î˜™Ë]Ú]H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë[Ü˜[™ÙKML˜[œÚ][Û‹X[‹Ý[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸKZ[ŽˆŒ‹Ý\ˆŒŒHŸJW_JW_JW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LKH‹Ú[™[Žˆ“›Ý]Y\ÈŸJKšœÞ
^\™XH‹Ý˜[YNœÛÚ[™ÙN’O›J\™Ù]˜[YJKÛ\ÜÓ˜[YNˆËY[LÈKL‹H™ËYÜ˜^KML›Ý[™Y[È^YÜ˜^KMÌ›ØÝ\Î˜™Ë]Ú]H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë[Ü˜[™ÙKML˜[œÚ][Û‹X[™\Ú^™K[›Û™HLŒ‹Ý[NžØ›Ü™\Žˆ››Û™H‹Ý][™Nˆ››Û™HŸKXÙZÛ\Žˆ™\ØÚšZš[™ËÛÛ^š[™X]È]Z[Ë‹‹ˆŸJW_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœ›Ý[™Y^MKLÈ™Ë[Ü˜[™ÙKML‹Ú[™[ŽššœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^[Ü˜[™ÙKMÌ‹Ú[™[Ž‰ü'ä¯ˆÜÙ\ÛYÙ[ˆ[ˆ“ZZ›ˆYÙ[ˆˆÜ]\\˜X]	ßJ_JW_J_J_J_Y[˜Ý[ÛˆŽJ
^ØÛÛœÝÝ\Ù\Ž›‹[š]]]™_OQ˜J
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÙJ
_KÙWJKÝ\Ù\Ž›‹ÙÚ[[›Ûž[[Ý\Î˜\Þ[˜Ê
OOžÝž^Ø]ØZ]ÙJØÊ_XØ]Ú
J^ØÛÛœÛÛK™\œ›ÜŠ“ÙÚ[ˆ˜Z[Yˆ‹J__KÙÛÝ]˜\Þ[˜Ê
OOžÝž^Ø]ØZ]É
ØÊ_XØ]Ú
J^ØÛÛœÛÛK™\œ›ÜŠ“ÙÛÝ]˜Z[Yˆ‹J__K\Ð]][XØ]YˆH[Ÿ_Y[˜Ý[ÛˆŽJ
^ØÛÛœÝÚ\Ð]][XØ]Y›‹ÙÚ[[›Ûž[[Ý\Î™_OZŽJ
K^[ŠÏO˜Ë›Û™Ý[“ØØ[Û›JK^[ŠÏO˜ËœÚÝÕ›Û™Ý]ÛŠKO[]
ÏO˜Ë˜XÝ]™UÚ[™ÝÏOOH›Û™Ý›Ü›HŠKÏ[]
ÏO˜Ë›Û™Ý›Ü›SØØ][ÛŠKO[]
ÏO˜Ë›Ü[•›Û™Ý›Ü›JKÏ[]
ÏO˜Ë˜ÛÜÙU›Û™Ý›Ü›JNÚYŠ\Š\™]\›ˆ[ØÛÛœÝJ
OOžÚYŠ
^ØJ
NÜ™]\›ŸZYŠ[Š^ØÛÛ™š\›J’™H[Ù][™Ù[ÙÙšZ›ˆÛH›Û™Ý[ˆ[ˆHÛÝYÜHÛX[‹ˆ[›ÛšY[H[›ÙÙÙ[ÈŠI‰™J
NÜ™]\›ŸXJ
_NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹˜]Û‹ØÛ\ÜÓ˜[YNˆ™š^Y›ÝÛKLˆšYÚVÌMLœH‹VÌLHËLLHLLH™Ë[Ü˜[™ÙKMLÝ™\Ž˜™Ë[Ü˜[™ÙKMŒ^]Ú]H›Ý[™Y^ÚYÝË\ÛH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆÝ\œÛÜ‹\Ú[\ˆ›Ü™\‹LÝ][™K[›Û™H˜XÚÙ›ÜX›\‹\ÛH‹Ú[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_KÛÛXÚÎ›]Nˆ•›Û™ÝÙ]›ÙYÙ[ˆ‹Ú[™[ŽššœÞ
ZKÜÚ^™NŒŒ‹Ý›ÚÙUÚYŒŸJ_JKšœÞ
ËØÚ[™[ŽšI‰ššœÞ
YYKÛÛÛÜÙN›Ë[š]X[ØØ][ÛŽœß›ÚYJ_JW_J_Y[˜Ý[ÛˆJ
^ØÛÛœÝ^[ŠÙOO˜ÙKœÚÝÔ›Ý]T™XÛÜ™]ÛŠKO^[ŠÙOO˜ÙKœÚÝÕ›Û™Ý]ÛŠK[]
ÙOO˜ÙKÙÙÛT›Ý]Q\Ú›Ø\™
KÜÝ]Nœ‹Ý\™XÛÜ™[™ÎšK]\ÙT™XÛÜ™[™ÎœË™\Ý[YT™XÛÜ™[™Î˜KÝÜ™XÛÜ™[™Î›ËØ[˜Ù[™XÛÜ™[™Î›YÚ[˜ËÙ]Ý\œ™[\Ý[˜ÙNKÙ]Ý\œ™[\˜][ÛŽ™‹Ù]]™\˜YÙTÜYYœÝ\œ™[Ú[Î›KØ]™Y›Ý]\ÎžK]]Ô]\ÙQ[˜X›Yž]]Ô]\ÙTÙXÛÛ™Î—ßOV\Ê
KÑK×OP‹\ÙTÝ]JLJKÚËWOP‹\ÙTÝ]JˆŠKÔ—OP‹\ÙTÝ]JLJKÒKOP‹\ÙTÝ]JLJKP‹\ÙT™YŠ[
KP‹\ÙT™YŠ[
KP‹\ÙT™YŠ[
KXÙOOžØÛÛœÝÝSX]™›ÛÜŠÙKÌYLÊKSX]™›ÛÜŠÝÌÍŒ
KSX]™›ÛÜŠÝ	LÍŒÍŒ
KÝWÝ	MŒÜ™]\›ˆŒØ	ÔN‰ÞÔÝš[™Ê
KœYÝ\
‹ŒŠ_N‰ÝÝÔÝš[™Ê
KœYÝ\
‹ŒŠ_X˜	ÞN‰ÝÝÔÝš[™Ê
KœYÝ\
‹ŒŠ_XKXÙOO˜ÙOYLÏØ	ÓX]œ›Ý[™
ÙJ_HX˜	ÊÙKÌYLÊKÑš^Y
Š_HÛXÙOXÙOO˜	ØÙKÑš^Y
J_HÛKÚYOJÙKÝ
OOžØÛÛœÝÛJWÝ
J“X]”KÌNOJXÙJJ“X]”KÌN™OSX]œÚ[ŠÛ‹ÌŠJ“X]œÚ[ŠÛ‹ÌŠJÓX]˜ÛÜÊÝ
“X]”KÌN
J“X]˜ÛÜÊ
“X]”KÌN
J“X]œÚ[ŠKÌŠJ“X]œÚ[ŠKÌŠNÜ™]\›ˆŒÍÌYLÊŠŠ“X]˜][ŒŠX]œÜ\
™JKX]œÜ\
KV™JJJ_NÚYŠ‹\ÙQY™™XÝ


OOŠOOHœ™XÛÜ™[™ÈÊ
LJK™Ù[ÛØØ][Ûˆš[ˆ˜]šYØ]Ü‰‰”‹˜Ý\œ™[OO[[	‰Š‹˜Ý\œ™[[˜]šYØ]Ü‹™Ù[ÛØØ][Û‹Ø]ÚÜÚ][ÛŠÙOOžØÛÛœÝÝXÙK˜ÛÛÜ™Ë›Û™Ú]YKXÙK˜ÛÛÜ™Ë›]]YKQ]K››ÝÊ
NØÊÝÙK˜ÛÛÜ™Ë˜XØÝ\˜XÞJK	‰“˜Ý\œ™[ÞYJ˜Ý\œ™[›Û‹˜Ý\œ™[›]Ý
OŒÏÊ˜Ý\œ™[^ÛÛŽ—Ý]”[YNžK˜Ý\œ™[	‰ŠÛX\•[Y[Ý]
˜Ý\œ™[
K˜Ý\œ™[[[
JNžS˜Ý\œ™[[YOWÊŒYLÉ‰ŠÊ
K
L
K˜Ý\œ™[[[
N“˜Ý\œ™[^ÛÛŽ—Ý]”[YNž_KÙOOžØÛÛœÛÛK™\œ›ÜŠ‘ÔÈ\œ›ÜŽˆ‹ÙJ_KÙ[˜X›RYÚXØÝ\˜XÞNˆL[Y[Ý]ŒYMX^[][PYÙNŒYLßJJJNŠ‹˜Ý\œ™[OO[[	‰Š˜]šYØ]Ü‹™Ù[ÛØØ][Û‹˜ÛX\•Ø]Ú
‹˜Ý\œ™[
K‹˜Ý\œ™[[[
K˜Ý\œ™[	‰ŠÛX\•[Y[Ý]
˜Ý\œ™[
K˜Ý\œ™[[[
JK

OOžÔ‹˜Ý\œ™[OO[[	‰Š˜]šYØ]Ü‹™Ù[ÛØØ][Û‹˜ÛX\•Ø]Ú
‹˜Ý\œ™[
K‹˜Ý\œ™[[[
K˜Ý\œ™[	‰ŠÛX\•[Y[Ý]
˜Ý\œ™[
K˜Ý\œ™[[[
_JKÜ‹ËË×JK[Š\™]\›ˆ[ØÛÛœÝÙOYOÈœšYÚVÌŒHŽˆœšYÚVÌMLœH‹OYOÈœšYÚVÌHŽˆœšYÚVÌŒH‹OJ
OOžÚJ
KŠL
_KYOJ
OOžÜÊ
_KYOJ
OOžØJ
_KOJ
OOžÐJ›Ý]H	Û™]È]J
KÓØØ[Q]TÝš[™Ê››S“Š_X
KÊL
_KÏJ
OOžØÛÛœÝÙO[ÊÊNÔÊLJKŠLJKJˆŠKÙI‰˜ÛÛ™š\›J›Ý]H‰ØÙK›˜[Y_HˆÜÙ\ÛYÙ[ˆH
	ÚŠÙKÝ[\Ý[˜ÙJ_JB‚‘\™XÝ^Ü\™[ˆ[ÈÔØ
I‰˜–JÙJ_KYOJ
OOžÛK›[™ÝŒ‰‰ˆXÛÛ™š\›J•ÙY]™H™ZÙ\ˆ]™HHÜ˜[YHÚ[[›[\™[ÈH›Ý]HÛÜ™šY]ÜÙ\ÛYÙ[‹ˆŠ_


KÊLJKŠLJJ_K]J
KYŠ
KYO\

K™OXÙOOžÜÝÚ]Ú
ÙJ^ØØ\ÙHœ™XÛÜ™[™ÈŽœ™]\›ˆ˜™Ë\™YMLÝ™\Ž˜™Ë\™YMŒŽØØ\ÙHœ]\ÙYŽœ™]\›ˆ˜™Ë^Y[ÝËMLÝ™\Ž˜™Ë^Y[ÝËMŒŽÙY˜][œ™]\›ˆ˜™ËYÜ™Y[‹MLÝ™\Ž˜™ËYÜ™Y[‹MŒŸ_KOXÙOOžÜÝÚ]Ú
ÙJ^ØØ\ÙHœ™XÛÜ™[™ÈŽœ™]\›ˆšœÞ
U‹ÜÚ^™NŒŒ‹Ý›ÚÙUÚYŒŸJNØØ\ÙHœ]\ÙYŽœ™]\›ˆšœÞ
U‹ÜÚ^™NŒŒ‹Ý›ÚÙUÚYŒŸJNÙY˜][œ™]\›ˆšœÞ
LÜÚ^™NŒŒ‹Ý›ÚÙUÚYŒŸJ__KOJ
OOžÜÝÚ]Ú
Š^ØØ\ÙHšYHŽšJ
NØœ™XZÎØØ\ÙHœ™XÛÜ™[™ÈŽšYJ
NØœ™XZÎØØ\ÙHœ]\ÙYŽYJ
NØœ™XZß_NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊ›‹˜]Û‹ØÛ\ÜÓ˜[YN˜š^Y›ÝÛKLˆ	ÙÙ_H‹VÌLHËLLHLLH	Ú™JŠ_H^]Ú]H›Ý[™Y^ÚYÝË\ÛH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆÝ\œÛÜ‹\Ú[\ˆ›Ü™\‹LÝ][™K[›Û™H˜XÚÙ›ÜX›\‹\ÛXÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_KÛÛXÚÎžK]NœOOHšYHÈ”›Ý]HÜ™[Y[ˆŽœOOHœ™XÛÜ™[™ÈÈ”]^™\™[ˆŽˆ’\˜][ˆ‹Ú[™[Ž–ÑJŠKOOHœ™XÛÜ™[™È‰‰ššœÞ
›‹™]‹ØÛ\ÜÓ˜[YNˆ˜XœÛÛ]H[œÙ]L›Ý[™Y^™Ë\™YM‹[š[X]NžÛÜXÚ]N–ËKW_K˜[œÚ][ÛŽžÙ\˜][ÛŽŒKK™\X]ŒKÌ_JW_JKšœÞ
ËØÚ[™[ŽœOOHšYH‰‰žK›[™ÝŒ	‰ššœÞÊ›‹˜]Û‹ØÛ\ÜÓ˜[YN˜š^Y›ÝÛKLˆ	Ù_H‹VÌLHËLLHLLH™ËYÜ™Y[‹MÝ™\Ž˜™ËYÜ™Y[‹ML^]Ú]H›Ý[™Y^ÚYÝË\ÛH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆÝ\œÛÜ‹\Ú[\ˆ›Ü™\‹LÝ][™K[›Û™X[š]X[žÛÜXÚ]NŒØØ[N‹ŽŒŒK[š[X]NžÛÜXÚ]NŒKØØ[NŒKŒK^]žÛÜXÚ]NŒØØ[N‹ŽŒŒKÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_KÛÛXÚÎ]N˜ZZ›ˆ›Ý]\È
	ÞK›[™ÝJXÚ[™[Ž–ÚšœÞ
™ËÜÚ^™NŒNÝ›ÚÙUÚYŒŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ˜XœÛÛ]H]ÜLH\šYÚLHËMHMH™Ë]Ú]H^YÜ™Y[‹MŒ^^È›ÛX›Û›Ý[™YY[›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆÚYÝË\ÛH‹Ú[™[ŽžK›[™ÝJW_J_JKšœÞ
ËØÚ[™[ŽŠOOHœ™XÛÜ™[™ÈŸOOHœ]\ÙYŠI‰ššœÞ
›‹˜]Û‹ØÛ\ÜÓ˜[YN˜š^Y›ÝÛKLˆ	Ù_H‹VÌLHËLLHLLH™ËYÜ˜^KMÌÝ™\Ž˜™ËYÜ˜^KN^]Ú]H›Ý[™Y^ÚYÝË\ÛH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆÝ\œÛÜ‹\Ú[\ˆ›Ü™\‹LÝ][™K[›Û™X[š]X[žÛÜXÚ]NŒØØ[N‹ŽŒŒK[š[X]NžÛÜXÚ]NŒKØØ[NŒKŒK^]žÛÜXÚ]NŒØØ[N‹ŽŒŒKÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_KÛÛXÚÎ”K]Nˆ”ÝÜ[ˆ[ˆÜÛX[ˆ‹Ú[™[ŽššœÞ
œ™KÜÚ^™NŒNÝ›ÚÙUÚYŒ‹š[ˆ˜Ý\œ™[ÛÛÜˆŸJ_J_JKšœÞ
ËØÚ[™[Ž”	‰œˆOOHšYH‰‰ššœÞÊ›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^Y›ÝÛKLMˆšYÚLˆ‹VÎNNWH™Ë]Ú]KÎMH˜XÚÙ›ÜX›\‹\ÛH›Ý[™Y^ÚYÝË[ÈLÈZ[‹]ËVÌNH‹[š]X[žÛÜXÚ]NŒNŒŒØØ[N‹Ž_K[š[X]NžÛÜXÚ]NŒKNŒØØ[NŒ_K^]žÛÜXÚ]NŒNŒŒØØ[N‹Ž_KÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆX‹Lˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È›Û[YY][H^YÜ˜^KML\\˜Ø\ÙH˜XÚÚ[™Ë]ÚYH‹Ú[™[ŽœOOHœ™XÛÜ™[™ÈÈ¸¥ãÈÜ˜[YHŽ’OÈ¸£î]]Ë\]^™HŽˆ¸£îÙ\]^™Y\™ŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžŠLJKÛ\ÜÓ˜[YNˆœLH^YÜ˜^KMÝ™\Ž^YÜ˜^KMŒ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹Ú[™[ŽššœÞ
[ËÜÚ^™NŒMJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹MLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^[È›Û\Ù[ZX›Û^YÜ˜^KN‹Ú[™[ŽšŠ
_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^X›YKMLŸJKšœÞ
ÎKÙ\˜][ÛŽ’‹™XÛÜ™[™ÔÝ]Nœ‹›Ü›X][YN•ŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
™KÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹MLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ˜^KMŒ‹Ú[™[Ž›ÙJYJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMLH›Ü™\‹]›Ü™\‹YÜ˜^KLL‹Ú[™[Ž–ÛK›[™Ýˆ[[ˆÜÙ[›ÛY[ˆ—_JW_JW_J_JKšœÞ
ËØÚ[™[Ž‘I‰ššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^Y[œÙ]L‹VÌMLH™ËX›XÚËÍL‹[š]X[žÛÜXÚ]NŒK[š[X]NžÛÜXÚ]NŒ_K^]žÛÜXÚ]NŒKÛÛXÚÎŠ
OO”ÊLJ_JKšœÞÊ›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^YYMšYÚMÜLKÌˆ‹VÌMLWH™Ë]Ú]H›Ý[™Y^ÚYÝËLžMX^]Ë\ÛH^X]]È‹[š]X[žÛÜXÚ]NŒØØ[N‹ŽKNˆ‹M	HŸK[š[X]NžÛÜXÚ]NŒKØØ[NŒKNˆ‹ML	HŸK^]žÛÜXÚ]NŒØØ[N‹ŽKNˆ‹M	HŸKÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ^[È›Û\Ù[ZX›Û^YÜ˜^KNX‹LÈ‹Ú[™[Žˆ”›Ý]HÜÛX[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLÈX‹MÜXÙK^KLH‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[ŽˆYœÝ[™ˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[ŽšŠ
_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ‘]\ŽˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Ž•ŠŠ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ‘Ù[KˆÛ™[ZYˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Ž›ÙJYJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Žˆ”[[ŽˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Ž›K›[™ÝJW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ›X‹M‹Ú[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹LH‹Ú[™[Žˆ“˜X[H˜[ˆH›Ý]HŸJKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YNšËÛÚ[™ÙN˜ÙOOJÙK\™Ù]˜[YJKÛ\ÜÓ˜[YNˆËY[LÈKLˆ›Ü™\ˆ›Ü™\‹YÜ˜^KLÌ›Ý[™Y[ÈÝ][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™ËYÜ™Y[‹ML›ØÝ\Î˜›Ü™\‹]˜[œÜ\™[‹XÙZÛ\Žˆ”›Ý]H˜X[K‹‹ˆ‹]]Ñ›ØÝ\ÎˆLJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ™YKÛ\ÜÓ˜[YNˆ™›^LHMKLˆ^\™YMŒÝ™\Ž˜™Ë\™YML›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Žˆ[›[\™[ˆŸJKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ“Ë\ØX›Y›K›[™Ý‹Û\ÜÓ˜[YNˆ™›^LHMKLˆ™ËYÜ™Y[‹MLÝ™\Ž˜™ËYÜ™Y[‹MŒ\ØX›Y˜™ËYÜ˜^KLÌ^]Ú]H›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
Ó‹ÜÚ^™NŒMŸJK“ÜÛX[ˆ—_JW_JKK›[™Ý‰‰ššœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^\™YML^XÙ[\ˆ]Lˆ‹Ú[™[Žˆ“Z[š[XX[ˆ[[ˆ›ÙYÈÛHÜHÛX[ˆŸJW_JW_J_JW_J_Y[˜Ý[ÛˆÎJÙ\˜][ÛŽ›‹™XÛÜ™[™ÔÝ]N™K›Ü›X][YNJ^ØÛÛœÝÜ‹WOP‹\ÙTÝ]JŠNÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠHOOHœ™XÛÜ™[™ÈŠ^ÚJŠNÜ™]\›ŸXÛÛœÝÏ\Ù][\˜[


OOžÚJOO˜JÌYLÊ_KYLÊNÜ™]\›Š
OO˜ÛX\’[\˜[
Ê_KÙK—JK‹\ÙQY™™XÝ


OOžÚJŠ_KÛ—JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^[È›Û\Ù[ZX›Û^YÜ˜^KN‹Ú[™[Ž
Š_J_Y[˜Ý[ÛˆŽJ
^ØÛÛœÝU\ŠÏOœË›X\
KØÝ\œ™[Ú[Î™KÝ]NOV\Ê
KP‹\ÙT™YŠ[
KOP‹\ÙT™YŠ[
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝÏ[™]ÈÚNÚK˜Ý\œ™[\ÎØÛÛœÝO[™]ÈÚJÜÛÝ\˜ÙNœË’[™^ŽNNK›Ü\Y\ÎžÛ˜[YNˆœ›Ý]K\™XÛÜ™[™Ë[^Y\ˆŸ_JNÜ™]\›ˆ‹˜Ý\œ™[XK‹˜Y^Y\ŠJK

OOžÜ‹˜Ý\œ™[	‰›‰‰›‹œ™[[Ý™S^Y\Š‹˜Ý\œ™[
__KÛ—JK‹\ÙQY™™XÝ


OOžÚYŠZK˜Ý\œ™[
K˜Ý\œ™[˜ÛX\Š
KOOHšYHŸK›[™ÝOOL
J\™]\›ŽØÛÛœÝÏYK›X\
OO\ŠK˜ÛÛÜ™[˜]\ÊJNÚYŠË›[™ÝLŠ^ØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈJÊ_JNØKœÙ]Ý[J™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽOOHœ]\ÙYÈœ™Ø˜JŒÍMÎKŽ
HŽˆœ™Ø˜JMŽKËŽ
H‹ÚY[™PØ\ˆœ›Ý[™‹[™R›Ú[Žˆœ›Ý[™ŸJ_JJKK˜Ý\œ™[˜Y™X]\™JJ_ZYŠË›[™ÝLJ^ØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠÖÌJ_JNØKœÙ]Ý[J™]È
Ú[XYÙN›™]ÈÊÜ˜Y]\ÎŽš[›™]È›ŠØÛÛÜŽˆœ™Ø˜JÍNMËMJHŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆÚ]H‹ÚYŒŸJ_J_JJKK˜Ý\œ™[˜Y™X]\™JJ_ZYŠË›[™ÝLJ^ØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠÖÜË›[™ÝLWJ_JNØKœÙ]Ý[J™]È
Ú[XYÙN›™]ÈÊÜ˜Y]\Î‹š[›™]È›ŠØÛÛÜŽOOHœ]\ÙYÈœ™Ø˜JŒÍMÎKJHŽˆœ™Ø˜JMŽKËJHŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆÚ]H‹ÚYŒŸJ_J_JJKK˜Ý\œ™[˜Y™X]\™JJ__KÙKJK[XÛÛœÝUVÈˆØNMYÈ‹ˆÌØŽ™ˆ‹ˆÌŒ˜ÍMYH‹ˆÙŽMÌÌMˆ‹ˆÙXÍNH‹ˆÌMŽMˆ‹ˆÙXXŒÌ‹ˆÎXÙˆ—NÙ[˜Ý[ÛˆÎJ
^ØÛÛœÝU\ŠÏOœË›X\
KÜØ]™Y›Ý]\Î™Kš\ÚX›T›Ý]RYÎOV\Ê
KP‹\ÙT™YŠ[
KOP‹\ÙT™YŠ[
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝÏ[™]ÈÚNÚK˜Ý\œ™[\ÎØÛÛœÝO[™]ÈÚJÜÛÝ\˜ÙNœË’[™^ŽNN›Ü\Y\ÎžÛ˜[YNˆœØ]™Y\›Ý]\Ë[^Y\ˆŸ_JNÜ™]\›ˆ‹˜Ý\œ™[XK‹˜Y^Y\ŠJK

OOžÜ‹˜Ý\œ™[	‰›‰‰›‹œ™[[Ý™S^Y\Š‹˜Ý\œ™[
__KÛ—JK‹\ÙQY™™XÝ


OOžÚYŠZK˜Ý\œ™[
\™]\›ŽÚK˜Ý\œ™[˜ÛX\Š
KK™š[\ŠOOš\ÊKšY
JK™›Ü‘XXÚ

KÊOOžØÛÛœÝQU–ÛÉQU‹›[™ÝKÏXKœÚ[Ë›X\
O\Š˜ÛÛÜ™[˜]\ÊJNÚYŠË›[™ÝŠ\™]\›ŽØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈJÊK›Ý]RY˜KšY›Ý]S˜[YN˜K›˜[Y_JNÝKœÙ]Ý[J™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽ›ÚY[™PØ\ˆœ›Ý[™‹[™R›Ú[Žˆœ›Ý[™ŸJ_JJKK˜Ý\œ™[˜Y™X]\™JJNØÛÛœÝ[™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠÖÌJK›Ý]RY˜KšY\NˆœÝ\ŸJNÙ‹œÙ]Ý[J™]È
Ú[XYÙN›™]ÈÊÜ˜Y]\ÎŽš[›™]È›ŠØÛÛÜŽˆˆÌŒ˜ÍMYHŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆÚ]H‹ÚYŒŸJ_JK^›™]È˜JÝ^ˆ”È‹›Ûˆ˜›ÛLØ[œË\Ù\šYˆ‹š[›™]È›ŠØÛÛÜŽˆÚ]HŸJKÙ™œÙ]NŒ_J_JJKK˜Ý\œ™[˜Y™X]\™JŠNØÛÛœÝ[™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠÖØË›[™ÝLWJK›Ý]RY˜KšY\Nˆ™[™ŸJNÜœÙ]Ý[J™]È
Ú[XYÙN›™]ÈÊÜ˜Y]\ÎŽš[›™]È›ŠØÛÛÜŽˆˆÙYŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆÚ]H‹ÚYŒŸJ_JK^›™]È˜JÝ^ˆ‘H‹›Ûˆ˜›ÛLØ[œË\Ù\šYˆ‹š[›™]È›ŠØÛÛÜŽˆÚ]HŸJKÙ™œÙ]NŒ_J_JJKK˜Ý\œ™[˜Y™X]\™J
NØÛÛœÝOSX]™›ÛÜŠË›[™ÝÌŠKO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠÖÛWJK›Ý]RY˜KšY\Nˆ›X™[ŸJNÞKœÙ]Ý[J™]È
Ý^›™]È˜JÝ^˜K›˜[YK›ÛˆŒLœØ[œË\Ù\šYˆ‹š[›™]È›ŠØÛÛÜŽˆˆÌYŒŽLÍÈŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆÚ]H‹ÚYŒßJKÙ™œÙ]N‹LM_J_JJKK˜Ý\œ™[˜Y™X]\™JJ_J_KÙKJK[Y[˜Ý[ÛˆŽJ
^ØÛÛœÝU\ŠOO˜K›X\
KÜØ]™Y›Ý]\Î™Kš\ÚX›T›Ý]RYÎX]X\[˜X›YœŸOV\Ê
KOP‹\ÙT™YŠ[
KÏP‹\ÙT™YŠ[
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝO[™]ÈÚNÜË˜Ý\œ™[XNØÛÛœÝÏ[™]ÈÐÙJÜÛÝ\˜ÙN˜K›\ŽŒMK˜Y]\ÎŒLÙZYÚŠ
OOŒKÜ˜YY[–ÈˆÌˆ‹ˆÌ™ˆ‹ˆÌŒ‹ˆÙ™Œ‹ˆÙŒ—KÜXÚ]N‹‹’[™^ŽLJNÜ™]\›ˆK˜Ý\œ™[[Ë‹˜Y^Y\ŠÊK

OOžÛ‰‰šK˜Ý\œ™[	‰›‹œ™[[Ý™S^Y\ŠK˜Ý\œ™[
__KÛ—JK‹\ÙQY™™XÝ


OOžÚYŠ\Ë˜Ý\œ™[ZK˜Ý\œ™[
\™]\›ŽÚYŠË˜Ý\œ™[˜ÛX\Š
K\Š^ÚK˜Ý\œ™[œÙ]š\ÚX›JLJNÜ™]\›ŸXÛÛœÝOYK™š[\ŠOš\ÊšY
JKÏV×NÙ›ÜŠÛÛœÝÙˆJY›ÜŠÛÛœÝÈÙˆœÚ[Ê^ØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠ\ŠË˜ÛÛÜ™[˜]\ÊJ_JNÛËœ\Ú
J_\Ë˜Ý\œ™[˜Y™X]\™\ÊÊKK˜Ý\œ™[œÙ]š\ÚX›JË›[™ÝŒ
_KÙK—JK[Y[˜Ý[ÛˆŽJ‹KŠ^ØÛÛœÝOV×KÏYKÌLLYLËOYKÊLLYLÊ“X]˜ÛÜÊ–ÌWJ“X]”KÌN
JKÏSX]™›ÛÜŠÌŠK[–ÌK[Ê˜KÏ[–ÌJÛÊ˜KO[–ÌWK[ÊœË[–ÌWJÛÊœÎÙ›ÜŠ]K[ÎÞ[ÎÞ
ÊÊ^ØÛÛœÝÏ[–ÌJÞ
˜KOVÐ\Š×ËWJK\Š×Ë—JWKÏ[™]ÈÜŠÙÙ[ÛY]žN›™]ÈJJK\Nˆ™ÜšY[[™HŸJNÔËœÙ]Ý[J™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽœ‹ÚYžOOLÌŽŒK[™Q\ÚžOOLÝ›ÚY–ÍKW_J_JJKKœ\Ú
Ê_Y›ÜŠ]K[ÎÞ[ÎÞ
ÊÊ^ØÛÛœÝÏ[–ÌWJÞ
œËOVÐ\ŠÛ×JK\ŠØË×JWKÏ[™]ÈÜŠÙÙ[ÛY]žN›™]ÈJJK\Nˆ™ÜšY[[™HŸJNÔËœÙ]Ý[J™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽœ‹ÚYžOOLÌŽŒK[™Q\ÚžOOLÝ›ÚY–ÍKW_J_JJKKœ\Ú
Ê_XÛÛœÝHPÑQ‘ÒR’ÓS“ÔT”ÕU•ÖVˆŽÙ›ÜŠ]K[ÎÞÎÞ
ÊÊY›ÜŠ]ÏK[Î×ÏÎ×ÊÊÊ^ØÛÛœÝO[–ÌJÊÊËJJ˜KÏ[–ÌWJÊ
ËJJœËÏ^
ÛËOWÊÛÎÚYŠÏL	‰šÏ›[™Ý
^ØÛÛœÝX	ÜÚ×_IÐJÌ_X[™]ÈÜŠÙÙ[ÛY]žN›™]ÈJÐ\ŠÑK×JK\ŠÑK×JWJK\Nˆ™ÜšY[X™[ŸJNÞ‹œÙ]Ý[J™]È
Ý^›™]È˜JÝ^”›ÛˆŒLœØ[œË\Ù\šYˆ‹š[›™]È›ŠØÛÛÜŽœŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆœ™Ø˜JMKMKMKŽ
H‹ÚYŒßJ_J_JJKKœ\Ú
Š__XÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈJÐ\ŠÛ–ÌKXJ‹Œ‹–ÌWWJK\ŠÛ–ÌJØJ‹Œ‹–ÌWWJWJK\Nˆ™ÜšYXÙ[\ˆŸJNÛKœÙ]Ý[J™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙY‹ÚYŒßJ_JJKKœ\Ú
JNØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈJÐ\ŠÛ–ÌK–ÌWK\Ê‹Œ—JK\ŠÛ–ÌK–ÌWJÜÊ‹Œ—JWJK\Nˆ™ÜšYXÙ[\ˆŸJNÜ™]\›ˆKœÙ]Ý[J™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙY‹ÚYŒßJ_JJKKœ\Ú
JK_Y[˜Ý[ÛˆNJ
^ØÛÛœÝU\ŠO››X\
KÙÜšY[˜X›Y™KÜšYÙ[\ŽÜšYÚ^™Nœ‹ÜšYÛÝ[šKÜšYÛÛÜŽœßOV\Ê
KOP‹\ÙT™YŠ[
KÏP‹\ÙT™YŠ[
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝ[™]ÈÚNÛË˜Ý\œ™[[ØÛÛœÝÏ[™]ÈÚJÜÛÝ\˜ÙN›’[™^ŽK›Ü\Y\ÎžÛ˜[YNˆ™ÜšY[Ý™\›^K[^Y\ˆŸ_JNÜ™]\›ˆK˜Ý\œ™[XË‹˜Y^Y\ŠÊK

OOžØK˜Ý\œ™[	‰›‰‰›‹œ™[[Ý™S^Y\ŠK˜Ý\œ™[
__KÛ—JK‹\ÙQY™™XÝ


OOžÚYŠ[Ë˜Ý\œ™[XK˜Ý\œ™[
\™]\›ŽÚYŠË˜Ý\œ™[˜ÛX\Š
KY_]
^ØK˜Ý\œ™[œÙ]š\ÚX›JLJNÜ™]\›ŸXÛÛœÝPŽJ‹KÊNÛË˜Ý\œ™[˜Y™X]\™\Ê
KK˜Ý\œ™[œÙ]š\ÚX›JL
_KÙK‹K×JK[Y[˜Ý[Ûˆ	JŠ^ØÛÛœÝOV×NÛ]LÜ™]\›ˆ‹œÚ[Ë™›Ü‘XXÚ

‹JOOžÚYŠOŒ
^ØÛÛœÝÏ[‹œÚ[ÖÚKLWKMŒÍÌYLËÏJ‹˜ÛÛÜ™[˜]\ÖÌWK[Ë˜ÛÛÜ™[˜]\ÖÌWJJ“X]”KÌNOJ‹˜ÛÛÜ™[˜]\ÖÌK[Ë˜ÛÛÜ™[˜]\ÖÌJJ“X]”KÌNSX]œÚ[ŠËÌŠJ“X]œÚ[ŠËÌŠJÓX]˜ÛÜÊË˜ÛÛÜ™[˜]\ÖÌWJ“X]”KÌN
J“X]˜ÛÜÊ‹˜ÛÛÜ™[˜]\ÖÌWJ“X]”KÌN
J“X]œÚ[ŠKÌŠJ“X]œÚ[ŠKÌŠKLŠ“X]˜][ŒŠX]œÜ\
ŠKX]œÜ\
KYŠJNÝ
Ï[
œXÛÛœÝÏMKOSX]œÚ[ŠÍL
JŒŠÓX]œÚ[ŠÌLŒ
JŒKJÓX]œÚ[ŠÌÌ
Ü‹˜ÛÛÜ™[˜]\ÖÌJŒYLÊJ‹NÙKœ\Ú
Ù\Ý[˜ÙN[]˜][ÛŽ“X]›X^
ÊØJ_J_JK_Y[˜Ý[ÛˆÎJÜ›Ý]N›‹ÛÛÜÙN™_J^ØÛÛœÝP‹\ÙT™YŠ[
KÜ‹WOP‹\ÙTÝ]J×JKÜËWOP‹\ÙTÝ]JÛZ[ŽŒX^ŒØZ[ŽŒÜÜÎŒJNÐ‹\ÙQY™™XÝ


OOžØÛÛœÝIJŠNÚYŠJ
K›[™ÝŒ
^ØÛÛœÝÏ[›X\
OOžK™[]˜][ÛŠKOSX]›Z[Š‹‹˜ÊKSX]›X^
‹‹˜ÊNÛ]LOLÙ›ÜŠ]OLNÞO›[™ÝÞJÊÊ^ØÛÛœÝ[ÞWK™[]˜][Û‹[ÞKLWK™[]˜][ÛŽÞŒÜ
Ï^›JÏSX]˜XœÊ
_XJÛZ[ŽKX^™‹ØZ[ŽœÜÜÎ›_J__KÛ—JK‹\ÙQY™™XÝ


OOžØÛÛœÝ]˜Ý\œ™[ÚYŠ[‹›[™ÝŠ\™]\›ŽØÛÛœÝÏ[™Ù]ÛÛ^
Œ™ŠNÚYŠXÊ\™]\›ŽØÛÛœÝO[ÚY[šZYÚ^ÝÜŒŒšYÚŒŒ›ÝÛNŒÌYNØË™š[Ý[OHˆÙŽY˜Y˜ˆ‹Ë™š[™XÝ
KŠNØÛÛœÝOSX]›X^
‹‹œ‹›X\
O”™\Ý[˜ÙJJKOSX]›Z[Š‹‹œ‹›X\
O”™[]˜][ÛŠJKLKSX]›X^
‹‹œ‹›X\
O”™[]˜][ÛŠJJÌKÏTOœ›Y
ÔÛJŠK\›Y\œšYÚ
KOTO™‹\˜›ÝÛKJ^JKÊ^JJŠ‹\Ü\˜›ÝÛJNØËœÝ›ÚÙTÝ[OHˆÙMYMÙXˆ‹Ë›[™UÚYLNØÛÛœÝÏMNÙ›ÜŠ]LÔTÎÔ
ÊÊ^ØÛÛœÝ^JÊ^JJŠÔÊKOQJŠNØË˜™YÚ[”]

KË›[Ý™UÊ›YJKË›[™UÊK\œšYÚJKËœÝ›ÚÙJ
KË™š[Ý[OHˆÎXØLØYˆ‹Ë™›ÛHŒLØ[œË\Ù\šYˆ‹Ë^[YÛHœšYÚ‹Ë™š[^
	Þ‹Ñš^Y
J_[X›YMKJÌÊ_XÛÛœÝÏMNÙ›ÜŠ]LÔZÎÔ
ÊÊ^ØÛÛœÝ[KÚÊ”OWÊŠNØË™š[Ý[OHˆÎXØLØYˆ‹Ë™›ÛHŒLØ[œË\Ù\šYˆ‹Ë^[YÛH˜Ù[\ˆ‹Ë™š[^
YLÏØ	ÓX]œ›Ý[™
Š_[X˜	Ê‹ÌYLÊKÑš^Y
J_ZÛXK‹LL
_XË˜™YÚ[”]

KË›[Ý™UÊÊ–ÌK™\Ý[˜ÙJK‹\˜›ÝÛJK‹™›Ü‘XXÚ
OžØË›[™UÊÊ™\Ý[˜ÙJKJ™[]˜][ÛŠJ_JKË›[™UÊÊ–Ü‹›[™ÝLWK™\Ý[˜ÙJK‹\˜›ÝÛJKË˜ÛÜÙT]

NØÛÛœÝOXË˜Ü™X]S[™X\‘Ü˜YY[
Ü‹\˜›ÝÛJNÐK˜YÛÛÜ”ÝÜ
œ™Ø˜JLÎKL‹‹ŒÊHŠKK˜YÛÛÜ”ÝÜ
Kœ™Ø˜JLÎKL‹‹ŒJHŠKË™š[Ý[OPKË™š[

KËœÝ›ÚÙTÝ[OHˆÎXÙˆ‹Ë›[™UÚYL‹Ë›[™R›Ú[Hœ›Ý[™‹Ë›[™PØ\Hœ›Ý[™‹Ë˜™YÚ[”]

K‹™›Ü‘XXÚ

ŠOOžØÛÛœÝOWÊ™\Ý[˜ÙJKQJ™[]˜][ÛŠNÞOOLØË›[Ý™UÊK
N˜Ë›[™UÊK
_JKËœÝ›ÚÙJ
_KÜ—JNØÛÛœÝÏ[O›YLÏØ	ÓX]œ›Ý[™

_HX˜	ÊÌYLÊKÑš^Y
Š_HÛXÜ™]\›ˆšœÞÊšKÚ\ÓÜ[ŽˆL]Nˆ’ÛÙÝ\›ÙšY[‹XÛÛŽššœÞ
ŒÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN™KÛ˜XÚÎ™KÝX’XY\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLˆ™Ë\\œKML‹Ú[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN[˜Ø]H‹Ú[™[Ž›‹›˜[Y_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Ž›Ê‹Ý[\Ý[˜ÙJ_JW_JK›ÛÝ\ŽššœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^^È^^Y[ÝËMÌ‹Ú[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“]ÜˆŸJKˆ]šZ›ˆÙ\Ú[][Y\™HÛÙÝ]ØX\™[‹ˆÛÜ[[™ÈY]R‹Y]H›ÛÝ]\‹ˆ—_JKÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËMØ\LˆLÈ›Ü™\‹Xˆ›Ü™\‹YÜ˜^KLL‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^XÙ[\ˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ^X›YKMLX‹LH‹Ú[™[ŽššœÞ
Õ‹ÜÚ^™NŒMJ_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“Z[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H‹Ú[™[Ž–ÜË›Z[‹Ñš^Y
JK›H—_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^XÙ[\ˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ^\\œKMLX‹LH‹Ú[™[ŽššœÞ
ŒÜÚ^™NŒMJ_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ“X^ŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H‹Ú[™[Ž–ÜË›X^Ñš^Y
JK›H—_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^XÙ[\ˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ^YÜ™Y[‹MLX‹LH‹Ú[™[ŽššœÞ
œ™KÜÚ^™NŒMJ_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ”ÝZ™Ú[™ÈŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H‹Ú[™[Ž–ÜË™ØZ[‹Ñš^Y
JK›H—_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^XÙ[\ˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ^\™YMLX‹LH‹Ú[™[ŽššœÞ
™KÜÚ^™NŒMJ_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ‘[[™ÈŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H‹Ú[™[Ž–ÜË›ÜÜËÑš^Y
JK›H—_JW_JW_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHLÈ‹Ú[™[ŽššœÞ
˜Ø[˜\È‹Ü™YŽÚYŒÍLZYÚŒŒÛ\ÜÓ˜[YNˆËY[Y[ŸJ_JW_J_XÛÛœÝO[O›YLÏØ	ÓX]œ›Ý[™
Š_HX˜	Ê‹ÌYLÊKÑš^Y
Š_HÛXÎO[OžØÛÛœÝOSX]™›ÛÜŠ‹ÌYLÊKSX]™›ÛÜŠKÌÍŒ
KSX]™›ÛÜŠILÍŒÍŒ
NÜ™]\›ˆŒØ	Ý]H	ÜŸ[X˜	ÜŸHZ[˜KÕ[O›™]È]JŠKÓØØ[Q]TÝš[™Ê››S“‹Ù^Nˆ›[Y\šXÈ‹[ÛˆœÚÜ‹YX\Žˆ›[Y\šXÈ‹Ý\ŽˆŒ‹YYÚ]‹Z[]NˆŒ‹YYÚ]ŸJNÙ[˜Ý[ÛˆNJÜ›Ý]N›‹ÛÛÜÙN™_J^ØÛÛœÝÝ\]T›Ý]S›Ý\ÎOV\Ê
KÜ‹WOP‹\ÙTÝ]J‹››Ý\ßˆŠKÜËWOP‹\ÙTÝ]Jš[™›ÈŠKÏJ
OOžÝ
‹šYŠ_KV\ÊÏO˜ËœØ]™Y›Ý]\Ë™š[™
OOKšYOO[‹šY
J_ŽÜ™]\›ˆšœÞ
šKÚ\ÓÜ[ŽˆL]N››˜[YKXÛÛŽššœÞ
ZKÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN™KÛ˜XÚÎ™KÝX’XY\ŽššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆœMKLKH^^È^YÜ˜^KML‹Ú[™[Ž”ÕŠ˜Ü™X]Y]
_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^›Ü™\‹]›Ü™\‹YÜ˜^KLL‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OO˜Jš[™›ÈŠKÛ\ÜÓ˜[YN˜›^LHKLˆ^\ÛH›Û[YY][H›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ	ÜÏOOHš[™›ÈÈ^\\œKMŒ›Ü™\‹X‹Lˆ›Ü™\‹\\œKMLŽˆ^YÜ˜^KMLÝ™\Ž^YÜ˜^KMÌŸXÚ[™[Ž–ÚšœÞ
ZKÜÚ^™NŒM‹Û\ÜÓ˜[YNˆš[›[™H\‹LHŸJKˆ[™›È—_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OO˜J››Ý\ÈŠKÛ\ÜÓ˜[YN˜›^LHKLˆ^\ÛH›Û[YY][H›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ	ÜÏOOH››Ý\ÈÈ^\\œKMŒ›Ü™\‹X‹Lˆ›Ü™\‹\\œKMLŽˆ^YÜ˜^KMLÝ™\Ž^YÜ˜^KMÌŸXÚ[™[Ž–ÚšœÞ
S‹ÜÚ^™NŒM‹Û\ÜÓ˜[YNˆš[›[™H\‹LHŸJKˆ›Ý]Y\È—_JW_JW_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHÝ™\™›ÝË^KX]]ÈM‹Ú[™[Ž–ÜÏOOHš[™›È‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KM‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLˆØ\M‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^\\œKMŒX‹LH‹Ú[™[Ž–ÚšœÞ
ÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[ŽˆYœÝ[™ŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^[È›Û\Ù[ZX›Û‹Ú[™[Ž’JÝ[\Ý[˜ÙJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^X›YKMŒX‹LH‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ‘]\ˆŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^[È›Û\Ù[ZX›Û‹Ú[™[Ž’ÎJÝ[\˜][ÛŠ_JW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^YÜ™Y[‹MŒX‹LH‹Ú[™[Ž–ÚšœÞ
ZKÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ”[[ˆŸJW_JKšœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^[È›Û\Ù[ZX›Û‹Ú[™[Ž–ÛœÚ[Ë›[™ÝˆÔÈ[[ˆ—_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^[Ü˜[™ÙKMŒX‹LH‹Ú[™[Ž–ÚšœÞ
“‹ÜÚ^™NŒMŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[ŽˆX[™Ù[XXZÝŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH‹Ú[™[Ž”ÕŠ˜Ü™X]Y]
_JW_JW_JKÏOOH››Ý\È‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KM‹Ú[™[Ž–ÚšœÞ
^\™XH‹Ý˜[YNœ‹ÛÚ[™ÙN˜ÏOšJË\™Ù]˜[YJKXÙZÛ\Žˆ•›ÙYÈ›Ý]Y\ÈÙHÝ™\ˆ^™H›Ý]K‹‹ˆ‹Û\ÜÓ˜[YNˆËY[MLÈ›Ü™\ˆ›Ü™\‹YÜ˜^KLÌ›Ý[™Y[ÈÝ][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë\\œKML›ØÝ\Î˜›Ü™\‹]˜[œÜ\™[™\Ú^™K[›Û™HŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ›ËÛ\ÜÓ˜[YNˆËY[MKLˆ™Ë\\œKMLÝ™\Ž˜™Ë\\œKMŒ^]Ú]H›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹Ú[™[Žˆ“›Ý]Y\ÈÜÛX[ˆŸJW_JW_J_J_Y[˜Ý[ÛˆJÜ›Ý]N›‹Ú^™N™ONJ^ØÛÛœÝP‹\ÙT™YŠ[
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžØÛÛœÝ]˜Ý\œ™[ÚYŠ\Ÿ‹œÚ[Ë›[™ÝŠ\™]\›ŽØÛÛœÝO\‹™Ù]ÛÛ^
Œ™ŠNÚYŠZJ\™]\›ŽÚK™š[Ý[OHˆÙŒÙˆ‹K™š[™XÝ
KJNØÛÛœÝÏ[‹œÚ[Ë›X\
OOK˜ÛÛÜ™[˜]\ÖÌJKO[‹œÚ[Ë›X\
OOK˜ÛÛÜ™[˜]\ÖÌWJKÏSX]›Z[Š‹‹œÊKSX]›X^
‹‹œÊKÏSX]›Z[Š‹‹˜JKOSX]›X^
‹‹˜JKNYKYŠŒ‹OYKYŠŒ‹OPOO›OO[ÏÙKÌŽ™ŠÊK[ÊKÊ[ÊJœPOOOOOXÏÙKÌŽ™ŠÛKJKXÊKÊKXÊJ›NÚKœÝ›ÚÙTÝ[OHˆØNMYÈ‹K›[™UÚYL‹K›[™PØ\Hœ›Ý[™‹K›[™R›Ú[Hœ›Ý[™‹K˜™YÚ[”]

K‹œÚ[Ë™›Ü‘XXÚ

K
OOžØÛÛœÝ^JK˜ÛÛÜ™[˜]\ÖÌJKO^
K˜ÛÛÜ™[˜]\ÖÌWJNÔOOLÚK›[Ý™UÊ‹JNšK›[™UÊ‹J_JKKœÝ›ÚÙJ
NØÛÛœÝÏ^J‹œÚ[ÖÌK˜ÛÛÜ™[˜]\ÖÌJKO^
‹œÚ[ÖÌK˜ÛÛÜ™[˜]\ÖÌWJNÚK™š[Ý[OHˆÌŒ˜ÍMYH‹K˜™YÚ[”]

KK˜\˜ÊËKX]”JŒŠKK™š[

NØÛÛœÝÏ^J‹œÚ[ÖÛ‹œÚ[Ë›[™ÝLWK˜ÛÛÜ™[˜]\ÖÌJKÏ^
‹œÚ[ÖÛ‹œÚ[Ë›[™ÝLWK˜ÛÛÜ™[˜]\ÖÌWJNÚK™š[Ý[OHˆÙY‹K˜™YÚ[”]

KK˜\˜ÊËËX]”JŒŠKK™š[

_KÛ‹WJK‹œÚ[Ë›[™ÝÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KLL›Ý[™Y›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ^YÜ˜^KM‹Ý[NžÝÚY™KZYÚ™_KÚ[™[ŽššœÞ
ZKÜÚ^™NŒŒJ_JNššœÞ
˜Ø[˜\È‹Ü™YŽÚY™KZYÚ™KÛ\ÜÓ˜[YNˆœ›Ý[™YŸJ_XÛÛœÝÒO[O›YLÏØ	ÓX]œ›Ý[™
Š_HX˜	Ê‹ÌYLÊKÑš^Y
Š_HÛXÒO[OžØÛÛœÝOSX]™›ÛÜŠ‹ÌYLÊKSX]™›ÛÜŠKÌÍŒ
KSX]™›ÛÜŠILÍŒÍŒ
NÜ™]\›ˆŒØ	Ý]H	ÜŸ[X˜	ÜŸHZ[˜KÕ[O›™]È]JŠKÓØØ[Q]TÝš[™Ê››S“‹Ù^Nˆ›[Y\šXÈ‹[ÛˆœÚÜ‹YX\Žˆ›[Y\šXÈŸJNÙ[˜Ý[ÛˆNJÚ\ÓÜ[Ž›‹ÛÛÜÙN™KÛ•šY]Ô›Ý]NJ^ØÛÛœÝÜØ]™Y›Ý]\Îœ‹[]T›Ý]NšK™[˜[YT›Ý]NœËÛX\[›Ý]\Î˜Kš\ÚX›T›Ý]RYÎ›ËÙÙÛT›Ý]Uš\ÚXš[]N›ÚÝÐ[›Ý]\Î˜ËYP[›Ý]\ÎKX]X\[˜X›Y™‹ÙÙÛRX]X\œÜšY[˜X›Y›KÙÙÛQÜšYžKÙ[\‘ÜšYÛÝ\œ™[ØØ][ÛŽžÜšYÚ^™N—ËÙ]ÜšYÚ^™N‘K]]Ô]\ÙQ[˜X›Y”ËÙ]]]Ô]\ÙQ[˜X›YšË]]Ô]\ÙTÙXÛÛ™ÎKÙ]]]Ô]\ÙTÙXÛÛ™Î”[\Ü›Ý]Qœ›ÛQÔžŸOV\Ê
KÒKOP‹\ÙTÝ]J[
KÔ‹OP‹\ÙTÝ]JˆŠKÑ—OP‹\ÙTÝ]JLJKÚ‹ÙWOP‹\ÙTÝ]JLJKÞYKÙWOP‹\ÙTÝ]J[
KÙKWOP‹\ÙTÝ]J[
KYOP‹\ÙT™YŠ[
KYOX\Þ[˜ÈOOžØÛÛœÝÙOX<'åî»î#È	ÞK›˜[Y_B‚¼'äãÈYœÝ[™ˆ	ÔÒJKÝ[\Ý[˜ÙJ_B¸£ì{î#È]\Žˆ	ÚÒJKÝ[\˜][ÛŠ_B¼'äãH	ÞKœÚ[Ë›[™ÝHÔÈ[[‚¼'äáH	ÚÕŠK˜Ü™X]Y]
_B‚“ÜÙ[›ÛY[ˆY]]XÝÚYŠ˜]šYØ]Ü‹œÚ\™J]ž^Ø]ØZ]˜]šYØ]Ü‹œÚ\™JÝ]NžK›˜[YK^˜Ù_JNÜ™]\›ŸXØ]Ú
Ý
^×Ý›˜[YHOOHX›Ü\œ›Üˆ‰‰˜ÛÛœÛÛK™\œ›ÜŠ”Ú\™H˜Z[Yˆ‹Ý
_]ž^Ø]ØZ]˜]šYØ]Ü‹˜Û\›Ø\™Üš]U^
ÙJK[\
”›Ý]H[™›ÈÙZÛÜYY\™˜X\ˆÛ[X›Ü™HŠ_XØ]ÚÜ›Û\
’ÛÜYY\ˆH›Ý]H[™›Îˆ‹ÙJ__KOX\Þ[˜ÈOOžØÛÛœÝÙO^K\™Ù]™š[\ÏË–ÌNÚYŠÙJ^Ýž^ØÛÛœÝÝX]ØZ]ÙK^

K^ŠÝÙK›˜[YKœ™\XÙJ‹™Ü‹ˆŠJNÔœÝXØÙ\ÜÏØ[\
›Ý]HÙpëÛ\ÜY\™ˆ	ØÙK›˜[Y_X
N˜[\
[\ÜZ\ÛZÝˆ	Ô™\œ›ÜŸX
_XØ]ÚØ[\
‘›Ý]šZˆ^™[ˆ˜[ˆ™\Ý[™Š_ZYK˜Ý\œ™[	‰ŠYK˜Ý\œ™[˜[YOHˆŠ__KÏ^OOžÕ
KšY
K
K›˜[YJ_KYO^OOžÔ‹š[J
I‰œÊK‹š[J
JK
[
K
ˆŠ_K^OOžØÛÛ™š\›JÙY]™H™ZÙ\ˆ]™H‰ÞK›˜[Y_HˆÚ[™\ÚZ™\™[Ø
I‰šJKšY
_KJ
OOžÜ‹›[™ÝOOL	‰˜ÛÛ™š\›JÙY]™H™ZÙ\ˆ]™H[H	Ü‹›[™ÝH›Ý]\ÈÚ[™\ÚZ™\™[È]Ø[ˆšY]Û™ÙYX[ˆÛÜ™[ˆÙ[XXZÝ˜
I‰˜J
_KYO^OOžÛ
JNØÛÛœÝÙO\‹™š[™
ÝO—ÝšYOO^JNØÙI‰	‰
ÙJ_K™O\‹œ™YXÙJ
KÙJOOžJØÙKÝ[\Ý[˜ÙK
KO\‹œ™YXÙJ
KÙJOOžJØÙKÝ[\˜][Û‹
NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞÊšKÚ\ÓÜ[Ž›‰‰ˆ^YI‰ˆYK]N˜ZZ›ˆ›Ý]\È
	Ü‹›[™ÝJXXÛÛŽššœÞ
LÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN™K›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ü™YŽšYK\Nˆ™š[H‹XØÙ\ˆ‹™Ü‹ÛÚ[™ÙN”KÛ\ÜÓ˜[YNˆšY[ˆŸJKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OOšYK˜Ý\œ™[Ë˜ÛXÚÊ
KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]ÛˆËY[‹Ú[™[Ž–ÚšœÞ
žÜÚ^™NŒMŸJK‘ÔX™\Ý[™[\Ü\™[ˆ—_JK‹›[™ÝŒ	‰ššœÞ
˜]Ûˆ‹ÛÛÛXÚÎ’‹Û\ÜÓ˜[YNˆËY[KLH^\™YMŒ‹Ú[™[Žˆ[H›Ý]\È™\ÚZ™\™[ˆŸJW_JKÚ[™[Ž–Ü‹›[™ÝŒ	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLˆ™Ë\\œKML›Ü™\‹Xˆ›Ü™\‹\\œKLL›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ^\ÛH‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\M‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LKH^\\œKMÌ‹Ú[™[Ž–ÚšœÞ
ÜÚ^™NŒMJKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–È•ÝX[ˆ‹ÒJ™JW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LKH^\\œKMÌ‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒMJKšœÞ
œÜ[ˆ‹ØÚ[™[ŽšÒJJ_JW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LH‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO›ÙJZŠKÛ\ÜÓ˜[YN˜LˆKLH^^È›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÔÏÈ˜™ËYÜ™Y[‹LL^YÜ™Y[‹MŒŽˆ^\\œKMŒÝ™\Ž˜™Ë\\œKLLŸX]N”ÏÈ]]Ë\]^™HZ]Žˆ]]Ë\]^™HX[ˆ‹Ú[™[ŽššœÞ
	™KÜÚ^™NŒMJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO•ŠQ
KÛ\ÜÓ˜[YN˜LˆKLH^^È›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÛOÈ˜™ËX›YKLL^X›YKMŒŽˆ^\\œKMŒÝ™\Ž˜™Ë\\œKLLŸX]N›OÈ‘ÜšY™\˜™\™Ù[ˆŽˆ‘ÜšYÛ™[ˆ‹Ú[™[ŽššœÞ
Õ‹ÜÚ^™NŒMJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎœÛ\ÜÓ˜[YN˜LˆKLH^^È›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÙÈ˜™Ë[Ü˜[™ÙKLL^[Ü˜[™ÙKMŒŽˆ^\\œKMŒÝ™\Ž˜™Ë\\œKLLŸX]N™È’X]X\™\˜™\™Ù[ˆŽˆ’X]X\Û™[ˆ‹Ú[™[ŽššœÞ
™KÜÚ^™NŒMJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ˜ËÛ\ÜÓ˜[YNˆœLˆKLH^^È^\\œKMŒÝ™\Ž˜™Ë\\œKLL›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ[HÛ™[ˆ‹Ú[™[ŽššœÞ
RKÜÚ^™NŒMJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎKÛ\ÜÓ˜[YNˆœLˆKLH^^È^\\œKMŒÝ™\Ž˜™Ë\\œKLL›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ[H™\˜™\™Ù[ˆ‹Ú[™[ŽššœÞ
ÑÜÚ^™NŒMJ_JW_JW_JKšœÞ
ËØÚ[™[Ž‘	‰ššœÞ
›‹™]‹Ú[š]X[žÚZYÚŒÜXÚ]NŒK[š[X]NžÚZYÚˆ˜]]È‹ÜXÚ]NŒ_K^]žÚZYÚŒÜXÚ]NŒKÛ\ÜÓ˜[YNˆ›Ý™\™›ÝËZY[ˆ›Ü™\‹Xˆ›Ü™\‹\\œKLL‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLÈ™ËX›YKMLÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H^X›YKN‹Ú[™[Žˆ‘ÜšY\ÜÚ\Ý[ŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎžKÛ\ÜÓ˜[YN˜LÈKLH^^È›Ý[™YY[˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÛOÈ˜™ËX›YKML^]Ú]HŽˆ˜™ËX›YKLŒ^X›YKMÌŸXÚ[™[Ž›OÈX[ˆŽˆ•Z]ŸJW_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[ŽššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎžÛ\ÜÓ˜[YNˆ™›^LHLÈKLˆ™ËX›YKMLÝ™\Ž˜™ËX›YKMŒ^]Ú]H^\ÛH›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒMJKÙ[™Y\ˆÜZZ›ˆØØ]YH—_J_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLH‹Ú[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMÌ‹Ú[™[Ž–ÈÙ[Ü›ÛÝNˆ‹Ë›H—_JKšœÞ
š[œ]‹Ý\Nˆœ˜[™ÙH‹Z[ŽˆH‹X^ˆL‹Ý\ˆH‹˜[YN—ËÛÚ[™ÙNžOO‘J[X™\ŠK\™Ù]˜[YJJKÛ\ÜÓ˜[YNˆËY[Lˆ™ËX›YKLŒ›Ý[™Y[È\X\˜[˜ÙK[›Û™HÝ\œÛÜ‹\Ú[\ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKX™]ÙY[ˆ^^È^X›YKMŒ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ[HŸJKšœÞ
œÜ[ˆ‹ØÚ[™[ŽˆLHŸJW_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMŒ‹Ú[™[Žˆ‘ÙXœZZÈ]ÜšYÛHÞ\Ý[X]\ØÚY[ˆ™[YˆH›ÙZÙ[‹ˆ[È˜ZÈYYY[ˆX™[
LKŒ‹]ËŠH›ÛÜˆ™Y™\™[YKˆŸJW_J_J_JKšœÞ
ËØÚ[™[Žš‰‰ššœÞ
›‹™]‹Ú[š]X[žÚZYÚŒÜXÚ]NŒK[š[X]NžÚZYÚˆ˜]]È‹ÜXÚ]NŒ_K^]žÚZYÚŒÜXÚ]NŒKÛ\ÜÓ˜[YNˆ›Ý™\™›ÝËZY[ˆ›Ü™\‹Xˆ›Ü™\‹\\œKLL‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLÈ™ËYÜ™Y[‹MLÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H^YÜ™Y[‹N‹Ú[™[Žˆ]]Ë\]^™HŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOšÊTÊKÛ\ÜÓ˜[YN˜LÈKLH^^È›Ý[™YY[˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÔÏÈ˜™ËYÜ™Y[‹ML^]Ú]HŽˆ˜™ËYÜ™Y[‹LŒ^YÜ™Y[‹MÌŸXÚ[™[Ž”ÏÈX[ˆŽˆ•Z]ŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLH‹Ú[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ™Y[‹MÌ‹Ú[™[Ž–È”]^™H˜Nˆ‹OŒØ	Ð_\Ø˜	ÓX]™›ÛÜŠKÍŒ
_[H	ÐIMŒ\Ø_JKšœÞ
š[œ]‹Ý\Nˆœ˜[™ÙH‹Z[ŽˆŒÌ‹X^ˆŒÌ‹Ý\ˆŒÌ‹˜[YNKÛÚ[™ÙNžOO”
[X™\ŠK\™Ù]˜[YJJKÛ\ÜÓ˜[YNˆËY[Lˆ™ËYÜ™Y[‹LŒ›Ý[™Y[È\X\˜[˜ÙK[›Û™HÝ\œÛÜ‹\Ú[\ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKX™]ÙY[ˆ^^È^YÜ™Y[‹MŒ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÚ[™[ŽˆŒÌÈŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ[Z[ˆŸJW_JW_JKšœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ™Y[‹MŒ‹Ú[™[Ž–È‘HÜ˜[YH]^™Y\]]ÛX]\ØÚ[È™H[™Ù\ˆ[ˆ‹OŒØ	Ð_HÙXÛÛ™[˜˜	ÓX]™›ÛÜŠKÍŒ
_HZ[][˜ˆÝ[ÝX]ˆYXX[›ÛÜˆ]^™\ÈZ™[œÈ]]XÝ\™[‹ˆ—_JW_J_J_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHÝ™\™›ÝË^KX]]ÈLÈÜXÙK^KLˆ‹Ú[™[Žœ‹›[™ÝOOLÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^XÙ[\ˆKLLˆ^YÜ˜^KML‹Ú[™[Ž–ÚšœÞ
LÜÚ^™NÛ\ÜÓ˜[YNˆ›^X]]ÈX‹LÈ^YÜ˜^KLÌŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H‹Ú[™[Žˆ“›ÙÈÙY[ˆ›Ý]\ÈŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^\ÛH]LH‹Ú[™[Žˆ”Ý\Y[ˆÜ˜[YHÛH™HY\œÝH›Ý]H˜\ÝHYÙÙ[ˆŸJW_JNœ‹›X\
OOššœÞÊ›‹™]‹Û^[Ý]ˆLÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLÈ›^Ø\LÈ‹Ú[™[Ž–ÚšœÞ
KÜ›Ý]NžKÚ^™NÌJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHZ[‹]ËL‹Ú[™[Ž–ÒOOO^KšYÚšœÞ
š[œ]‹Ý\Nˆ^‹˜[YN”‹ÛÚ[™ÙN˜ÙOO“
ÙK\™Ù]˜[YJKÛ’Ù^QÝÛŽ˜ÙOOžØÙKšÙ^OOOH‘[\ˆ‰‰™YJKšY
KÙKšÙ^OOOH‘\ØØ\H‰‰•
[
_KÛ›\ŽŠ
OO™YJKšY
KÛ\ÜÓ˜[YNˆËY[LˆKLH^\ÛH™Ë]Ú]H›Ü™\ˆ›Ü™\‹\\œKLÌ›Ý[™YÝ][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë\\œKM‹]]Ñ›ØÝ\ÎˆLJNššœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN[˜Ø]H‹Ú[™[ŽžK›˜[Y_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ]LH^^È^YÜ˜^KML‹Ú[™[ŽššœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
“‹ÜÚ^™NŒLŸJKÕŠK˜Ü™X]Y]
W_J_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LÈ]LH^^È^YÜ˜^KMŒ‹Ú[™[Ž–ÚšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
ÜÚ^™NŒLŸJKÒJKÝ[\Ý[˜ÙJW_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒLŸJKÒJKÝ[\˜][ÛŠW_JKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–ÞKœÚ[Ë›[™Ýˆ[[ˆ—_JW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^›^XÛÛØ\LH‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO˜YJKšY
KÛ\ÜÓ˜[YN˜LKH›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÛËš\ÊKšY
OÈ˜™Ë\\œKLL^\\œKMŒŽˆ^YÜ˜^KMÝ™\Ž^\\œKMŒÝ™\Ž˜™Ë\\œKMLŸX]N›Ëš\ÊKšY
OÈ•™\˜™\™Ù[ˆÜØX\Žˆ•Û™[ˆÜØX\‹Ú[™[Ž›Ëš\ÊKšY
OÚšœÞ
RKÜÚ^™NŒMŸJNššœÞ
ÑÜÚ^™NŒMŸJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO“ÊJKÛ\ÜÓ˜[YNˆœLKH^YÜ˜^KMÝ™\Ž^X›YKMŒÝ™\Ž˜™ËX›YKML›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ“˜X[HÚZžšYÙ[ˆ‹Ú[™[ŽššœÞ
ËÜÚ^™NŒMŸJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOšJJKÛ\ÜÓ˜[YNˆœLKH^YÜ˜^KMÝ™\Ž^XÞX[‹MŒÝ™\Ž˜™ËXÞX[‹ML›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ‘]Z[È	ˆ›Ý]Y\È‹Ú[™[ŽššœÞ
‘KÜÚ^™NŒMŸJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO™ÙJJKÛ\ÜÓ˜[YNˆœLKH^YÜ˜^KMÝ™\Ž^[Ü˜[™ÙKMŒÝ™\Ž˜™Ë[Ü˜[™ÙKML›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ’ÛÙÝ\›ÙšY[‹Ú[™[ŽššœÞ
ŒÜÚ^™NŒMŸJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOYJJKÛ\ÜÓ˜[YNˆœLKH^YÜ˜^KMÝ™\Ž^\[šËMŒÝ™\Ž˜™Ë\[šËML›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ‘[[ˆ‹Ú[™[ŽššœÞ
•‹ÜÚ^™NŒMŸJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO˜–JJKÛ\ÜÓ˜[YNˆœLKH^YÜ˜^KMÝ™\Ž^YÜ™Y[‹MŒÝ™\Ž˜™ËYÜ™Y[‹ML›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ‘^ÜY\ˆ[ÈÔ‹Ú[™[ŽššœÞ
•‹ÜÚ^™NŒMŸJ_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO’
JKÛ\ÜÓ˜[YNˆœLKH^YÜ˜^KMÝ™\Ž^\™YMŒÝ™\Ž˜™Ë\™YML›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ•™\ÚZ™\™[ˆ‹Ú[™[ŽššœÞ
šÜÚ^™NŒMŸJ_JW_JW_KKšY
J_JW_JKšœÞ
ËØÚ[™[ŽžYI‰ššœÞ
ÎKÜ›Ý]NžYKÛÛÜÙNŠ
OO™ÙJ[
_J_JKšœÞ
ËØÚ[™[Ž™I‰ššœÞ
NKÜ›Ý]N™KÛÛÜÙNŠ
OOšJ[
_J_JW_J_XÛÛœÝO^Û]L‹ŒLÌ‹ÛŽKŒŽLLßKMŒ
ŒYLËŽOLLÙ[˜Ý[ÛˆÙYJØÛÙN›‹Ú^™N™OLNJ^Ü™]\›ˆOOLÚšœÞ
Ü™KÜÚ^™N™KÛ\ÜÓ˜[YNˆ^^Y[ÝËMLŸJN›LI‰›LÏÚšœÞ
Y‹ÜÚ^™N™KÛ\ÜÓ˜[YNˆ^YÜ˜^KMŸJN›OOM_OOMÚšœÞ
›™KÜÚ^™N™KÛ\ÜÓ˜[YNˆ^YÜ˜^KMŸJN›MLI‰›MßN	‰›NÚšœÞ
‘KÜÚ^™N™KÛ\ÜÓ˜[YNˆ^X›YKMLŸJN›MÌI‰›MÍßNI‰›NÚšœÞ
™KÜÚ^™N™KÛ\ÜÓ˜[YNˆ^XÞX[‹MLŸJN›NMOÚšœÞ
Û™KÜÚ^™N™KÛ\ÜÓ˜[YNˆ^\\œKMLŸJNššœÞ
Y‹ÜÚ^™N™KÛ\ÜÓ˜[YNˆ^YÜ˜^KMŸJ_Y[˜Ý[ÛˆŽJÙYÜ™Y\Î›‹Ú^™N™OLLßJ^Ü™]\›ˆšœÞ
œÜ[ˆ‹ÜÝ[NžÝ˜[œÙ›Ü›N˜›Ý]J	ÛŠÌNYYÊXKÛ\ÜÓ˜[YNˆš[›[™KY›^‹Ú[™[ŽššœÞ
ØËÜÚ^™N™KÛ\ÜÓ˜[YNˆ^X›YKMLŸJ_J_Y[˜Ý[ÛˆNJ‹J^ØÛÛœÝJK›][‹›]
J“X]”KÌNOJK›Û‹[‹›ÛŠJ“X]”KÌNÏ[‹›]
“X]”KÌNOYK›]
“X]”KÌNÏSX]œÚ[Š‹ÌŠJŠŒŠÓX]˜ÛÜÊÊJ“X]˜ÛÜÊJJ“X]œÚ[ŠKÌŠJŠŒŽÜ™]\›ˆŠŒÍÌJ“X]˜\Ú[ŠX]œÜ\
ÊJ_Y[˜Ý[Ûˆ^™JŠ^ÚYŠ[‹›[™Ý
\™]\›ˆ“™Y\œÛYÝ™\ØXÚ[™ÈY[ˆŽØÛÛœÝO[‹™š[™
ÏOœËœ™XÚ\]][ÛKŒJNÚYŠYJ\™]\›ˆ‘›ÛÙÈÛÛY[™Hˆ]\ˆŽØÛÛœÝSX]›X^
X]œ›Ý[™

™]È]JK[YJK™Ù][YJ
KQ]K››ÝÊ
JKÍ™M
JNÚYŠLMJ\™]\›ˆ”™YÙ[ˆš[›™[ˆMHZ[ˆŽØÛÛœÝSX]™›ÛÜŠÍŒ
KO]	MŒÜ™]\›˜™YÙ[ˆÝ™\ˆ0¬IÜØ	ÜŸ]HˆˆŸIÚ_[XY[˜Ý[Ûˆ™JÚÝ\›N›ŸJ^ØÛÛœÝO[‹œÛXÙJLŠNÜ™]\›ˆK›[™ÝÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMLX‹LH‹Ý[NžÙ›ÛÚ^™NˆŒŽÙ[HŸKÚ[™[Žˆ•™[ÙY\ˆ0­ÈÛÛY[™HLˆ]\ˆŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ›Ý™\™›ÝË^X]]È‹LH‹Ú[™[ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LH‹Ý[NžÝÚYˆ›X^XÛÛ[ŸKÚ[™[Ž™K›X\

ŠOOžØÛÛœÝOSX]œ›Ý[™

œÝ[œÚ[™Q\˜][ÛŸ
KÍŒ
NÜ™]\›ˆšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YN˜ËVÍH›^\Úš[šËL›Ý[™Y[ÈLKH^XÙ[\ˆ	ÜOOLÈ˜™ËX›YKLLŽˆ˜™ËYÜ˜^KMLŸXÚ[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ý[NžÙ›ÛÚ^™NˆŒÌ™[HŸKÚ[™[ŽœOOLÈ“HŽ˜	Û™]È]J[YJK™Ù]Ý\œÊ
_]XJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^\ÝYžKXÙ[\ˆ^KLH‹Ú[™[ŽššœÞ
ÙYKØÛÙNÙX]\ÛÙKÚ^™NŒM_J_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Ž–ÓX]œ›Ý[™
[\\˜]\™JK°¬—_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^X›YKMŒ‹Ý[NžÙ›ÛÚ^™NˆŒŽ[HŸKÚ[™[Ž–ÓX]œ›Ý[™
œ™XÚ\]][Û”›Ø˜Xš[]JK‰H0­È‹œ™XÚ\]][Û‹Ñš^Y
JK›[H—_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^X[X™\‹MŒ‹Ý[NžÙ›ÛÚ^™NˆŒŽ[HŸKÚ[™[Ž–È¸¦ ‹K›H—_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ý[NžÙ›ÛÚ^™NˆŒŽ[HŸKÚ[™[Ž–ÓX]œ›Ý[™
Ú[™ÜYY
K‹È‹X]œ›Ý[™
Ú[™Ý\ÝÊW_JW_K[YJ_J_J_JW_JN›[Y[˜Ý[Ûˆž™J
^ØÛÛœÝ^[ŠOO‘KœÚÝÕÙX]\]ÛŠKO^[ŠOO‘KœÚÝÑ›ÛÛY\œÊK^[ŠOO‘KÙX]\‘›ÛØØ[JK^[ŠOO‘KœÙ]ÙX]\‘›ÛØØ[JKORJOO‘KœÜÚ][ÛŠKÏU\ŠOO‘K›X\
KOV”

KÛËOP‹\ÙTÝ]JLJKÏLLŠÌLÐ‹\ÙQY™™XÝ


OOžØKœÚÝÐZY[œ˜Y\‰‰›
LJ_KØKœÚÝÐZY[œ˜Y\—JK‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝOZOÞÛ]šK›]ÛŽšK›™ßN•KÏXKÙX]\‘]KÏHTß]K››ÝÊ
KTË›\Ý\]Y•‹OTÏÔNJKË›ØØ][ÛŠOVŽNˆLÊßJI‰˜K™™]ÚÙX]\ŠK›]K›Û‹OÈ‘ÔË[ØØ]YHŽˆ“™Y\›[™Š_KÛ‹OË›]OË›™×JK‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝO]Ú[™ÝËœÙ][\˜[


OOžØÛÛœÝÏZOÞÛ]šK›]ÛŽšK›™ßN˜KÙX]\‘]OË›ØØ][ÛŸNØK™™]ÚÙX]\ŠË›]Ë›Û‹KÙX]\‘]OË›ØØ][Û‹›˜[YJ_KŠNÜ™]\›Š
OOÚ[™ÝË˜ÛX\’[\˜[
J_KÛ‹OË›]OË›™×JNØÛÛœÝOXKÙX]\‘]OË˜Ý\œ™[XKÙX]\‘]OËšÝ\›_×KXKÙX]\‘]OËœ™XÚ\]][ÛŒM[Z[Ÿ×KOP‹\ÙSY[[Ê

OO™^™J
KÜJKOSX]œ›Ý[™

–ÌOËœÝ[œÚ[™Q\˜][ÛŸ
KÍŒ
NÚYŠ[Š\™]\›ˆ[ØÛÛœÝJ
OOžØÛÛœÝO\ÏË™Ù]šY]Ê
K™Ù]Ù[\Š
NÚYŠQJ\™]\›ŽØÛÛœÝÔË×ORŠJNØK™™]ÚÙX]\ŠËË’ØX\[Š_KÏJ
OOžØÛÛœÝOZOÞÛ]šK›]ÛŽšK›™ßN•NØK™™]ÚÙX]\ŠK›]K›Û‹OÈ‘ÔË[ØØ]YHŽˆ“™Y\›[™Š_NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ØKœÚÝÐZY[œ˜Y\‰‰ššœÞÊ˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹˜\šXK[X™[Žˆ”™YÙ[œ˜Y\ˆZ]™][ˆ‹ÛÛXÚÎŠ
OO˜KœÙ]ÚÝÐZY[œ˜Y\ŠLJKÛ\ÜÓ˜[YNˆ™š^YYLˆ‹VÌMŒWHZ[‹ZLLHLÈ›^][\ËXÙ[\ˆØ\Lˆ™Ë]Ú]H›Ý[™Y^ÚYÝË[È›Ü™\ˆ›Ü™\‹YÜ˜^KLŒ^YÜ˜^KMÌÝXÚ[X[š\[][Ûˆ‹Ý[NžÝÜˆ˜Ø[ÊX^
\™[K[ŠØY™KX\™XKZ[œÙ]]Ü
JH
ÈÍœ
HŸKÚ[™[Ž–ÚšœÞ
‘KÜÚ^™NŒNJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH‹Ú[™[Žˆ”˜Y\ˆZ]ŸJW_JKÉ‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™š^Y[œÙ]L‹VÌLNWH‹ÛÛXÚÎŠ
OO›
LJ_JKšœÞ
›‹™]‹ØÛ\ÜÓ˜[YNˆ™š^YYLˆ‹VÌLLH™Ë]Ú]HÚYÝË[È›Ü™\ˆ›Ü™\‹YÜ˜^KLŒÙ[XÝ[›Û™H›Ý[™Y^‹Ý[NžÝÜˆ›X^
\™[K[ŠØY™KX\™XKZ[œÙ]]Ü\™[JJH‹ÚY›ÏÈ›Z[ŠÌØ[ÊLÈHLLœ
JHŽˆ˜]]È‹X^ÚYˆ˜Ø[ÊLÈHLLœ
H‹X^ZYÚ›ÏÈ˜Ø[ÊLšH
HŽ›ÚYÝ™\™›ÝÖN›ÏÈ˜]]ÈŽ›ÚYK[š]X[žÛÜXÚ]NŒ‹LŒK[š[X]NžÛÜXÚ]NŒKŒK^[Ý]ˆLÚ[™[ŽOÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœL‹H‹Ý[NžÙ›ÛÚ^™N˜	Øß\KÚ[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OO›
[ÊKÛ\ÜÓ˜[YNˆËY[›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[L^[Y‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LKHÝ™\™›ÝËZY[ˆÚ]\ÜXÙK[›ÝÜ˜\‹Ú[™[Ž–ÚšœÞ
ÙYKØÛÙNKÙX]\ÛÙKÚ^™NŒJKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›ÛX›Û^YÜ˜^KN›^\Úš[šËL‹Ý[NžÙ›ÛÚ^™NˆŒKY[HŸKÚ[™[Ž–ÓX]œ›Ý[™
K[\\˜]\™JK°¬—_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMLZ[‹]ËLÝ™\™›ÝËZY[ˆ^Y[\Ú\È‹Ú[™[Ž›_JKOŒ	‰ššœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^X[X™\‹MŒ›^\Úš[šËL‹Ú[™[Ž–È¸¦ ‹K›KÝH—_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH^YÜ˜^KMŒ›^\Úš[šËL‹Ú[™[Ž–ÚšœÞ
ÚYKÜÚ^™NŒLßJKX]œ›Ý[™
KÚ[™ÜYY
KšœÞ
ŽKÙYÜ™Y\ÎKÚ[™\™XÝ[ÛŸJW_JKKš\ÓØY[™É‰ššœÞ
’KÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ˜[š[X]K\Ü[ˆ^X›YKML›^\Úš[šËLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ›[X]]È›^\Úš[šËL‹Ú[™[Ž›ÏÚšœÞ
Ó‹ÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŸJNššœÞ
žÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŸJ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML]LHÝ™\™›ÝËZY[ˆ^Y[\Ú\ÈÚ]\ÜXÙK[›ÝÜ˜\‹Ý[NžÙ›ÛÚ^™NˆŒŽ™[HŸKÚ[™[Ž–ÚS™VÝKÙX]\ÛÙWKˆ0­È›Ù[‹X]œ›Ý[™
K˜\\™[[\\˜]\™JK°¬0­È‹KÙX]\‘]OË›ØØ][Û‹›˜[YW_JW_JKšœÞ
ËØÚ[™[Ž›É‰ššœÞ
›‹™]‹Ú[š]X[žÚZYÚŒÜXÚ]NŒK[š[X]NžÚZYÚˆ˜]]È‹ÜXÚ]NŒ_K^]žÚZYÚŒÜXÚ]NŒKÛ\ÜÓ˜[YNˆ›Ý™\™›ÝËZY[ˆ‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLˆ]Lˆ›Ü™\‹]›Ü™\‹YÜ˜^KLŒÍLÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLÈØ\LKH‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ—ËÛ\ÜÓ˜[YNˆœLˆ›Ý[™Y[È™ËX›YKML^X›YKMÌ›Ü™\‹L›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
KÜÚ^™NŒMJKˆÔÈ—_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎžÛ\ÜÓ˜[YNˆœLˆ›Ý[™Y[È™ËYÜ˜^KML^YÜ˜^KMÌ›Ü™\‹L›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
ZKÜÚ^™NŒMJKˆØX\[—_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎŠ
OO˜KœÙ]ÚÝÐZY[œ˜Y\ŠXKœÚÝÐZY[œ˜Y\ŠKÛ\ÜÓ˜[YNˆœLˆ›Ý[™Y[È™ËYÜ˜^KML^YÜ˜^KMÌ›Ü™\‹L›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
‘KÜÚ^™NŒMJKˆ˜Y\ˆ—_JW_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœ›Ý[™Y[È™ËX›YKMLLˆKLKH^X›YKN›Û[YY][H‹Ú[™[Ž›_JKšœÞ
™KÚÝ\›N™ŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLÈØ\LKH^XÙ[\ˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ý[NžÙ›ÛÚ^™NˆŒÍY[HŸKÚ[™[Žˆ•Ú[™ÝÝ[ˆŸJKšœÞÊ˜ˆ‹ØÚ[™[Ž–ÓX]œ›Ý[™
KÚ[™Ý\ÝÊKˆÛKÝH—_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ý[NžÙ›ÛÚ^™NˆŒÍY[HŸKÚ[™[Žˆ•Ú[™ŸJKšœÞ
˜ˆ‹ØÚ[™[ŽœÓ™JKÚ[™\™XÝ[ÛŠ_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y[ÈLˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ý[NžÙ›ÛÚ^™NˆŒÍY[HŸKÚ[™[Žˆ™]ÛÛÚ[™ÈŸJKšœÞÊ˜ˆ‹ØÚ[™[Ž–ÝK˜ÛÝYÛÝ™\‹‰H—_JW_JW_JKK™\œ›Ü‰‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^X[X™\‹MÌ™ËX[X™\‹ML›Ý[™Y[ÈLˆ‹Ú[™[Žˆ•\]HZ\ÛZÝÈX]ÝHÙYÙ]™[œÈ›Z™[ˆšXÚ˜X\‹ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KM^XÙ[\ˆ‹Ý[NžÙ›ÛÚ^™NˆŒÍY[HŸKÚ[™[Ž–ÈšZ™Ù]Ù\šÝ‹™]È]JKÙX]\‘]K›\Ý\]Y
KÓØØ[U[YTÝš[™Ê››S“‹ÚÝ\ŽˆŒ‹YYÚ]‹Z[]NˆŒ‹YYÚ]ŸJW_JKI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
Ó‹ÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŸJKšœÞ
š[œ]‹Ý\Nˆœ˜[™ÙH‹Z[ŽˆŽ‹X^ˆŒML‹Ý\ˆŒL‹˜[YNÛÚ[™ÙN‘OOœŠ\œÙR[
K\™Ù]˜[YJJKÛ\ÜÓ˜[YNˆ™›^LHŸJKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–Ý‰H—_JW_JW_J_J_JW_JNššœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ—ËÛ\ÜÓ˜[YNˆœLÈ›^][\ËXÙ[\ˆØ\Lˆ›Ü™\‹L™Ë]˜[œÜ\™[‹Ý[NžÙ›ÛÚ^™N˜	Øß\KÚ[™[Ž–ÚšœÞ
’KÜÚ^™NŒM‹Û\ÜÓ˜[YN˜Kš\ÓØY[™ÏÈ˜[š[X]K\Ü[ˆ^X›YKMLŽˆ^YÜ˜^KMLŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒ‹Ú[™[Ž˜Kš\ÓØY[™ÏÈ•ÙY\ˆÜ[[¸ )ˆŽˆ•ÙY\ˆY[ˆŸJW_J_JW_J_Y[˜Ý[Ûˆž™JÚ\Õš\ÚX›N›‹ÛÛÜÙN™_J^ØÛÛœÝU\ŠOOK›X\
KP‹\ÙT™YŠ[
KOP‹\ÙT™YŠ[
KÜËWOP‹\ÙTÝ]J×JKÛËOP‹\ÙTÝ]J
KØËWOP‹\ÙTÝ]JL
KÙ‹OP‹\ÙTÝ]JL
KÛKWOP‹\ÙTÝ]JLJKÞ×OP‹\ÙTÝ]JÌ
NÐ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝOTOžÔšÙ^OOOH‘\ØØ\H‰‰™J
_NÜ™]\›ˆÚ[™ÝË˜Y]™[\Ý[™\ŠšÙ^YÝÛˆ‹JK

OOÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\ŠšÙ^YÝÛˆ‹J_KÛ‹WJNØÛÛœÝOP‹\ÙPØ[˜XÚÊ\Þ[˜Ê
OOžÜ
L
KJLJNÝž^ØÛÛœÝOX]ØZ]™]Ú
šÎ‹ËØ\Kœ˜Z[šY]Ù\‹˜ÛÛKÜX›XËÝÙX]\‹[X\ËšœÛÛˆŠNÚYŠPK›ÚÊ]›ÝÈ™]È\œ›ÜŠ”˜Y\ˆšY]™\™ZZØ˜X\ˆŠNØÛÛœÝJ
]ØZ]KšœÛÛŠ
JKœ˜Y\Ëœ\Ý×JK›X\
OOŠÜ]’Kœ][YN’K[YJŒYLßJJNØJŠK
X]›X^
‹›[™ÝLJJK‹›[™ÝJL
_XØ]ÚÞJL
_Yš[˜[^Ü
LJ__K×JNÐ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽÑJ
NØÛÛœÝO\Ù][\˜[
KÌ
ŒYLÊNÜ™]\›Š
OO˜ÛX\’[\˜[
J_KÛ‹WJK‹\ÙQY™™XÝ


OOžÚYŠ][Ÿ\Ë›[™Ý
\™]\›ŽØÛÛœÝO\ÖÛ×NÚYŠPJ\™]\›ŽØÛÛœÝXÎ‹ËÝ[XØXÚKœ˜Z[šY]Ù\‹˜ÛÛIÐKœ]KÌM‹ÞÞŸKÞÞKÞÞ_KÌ‹ÌWÌKœ™ØÚYŠ‹˜Ý\œ™[
\‹˜Ý\œ™[™Ù]ÛÝ\˜ÙJ
OËœÙ]\›

K‹˜Ý\œ™[™Ù]ÛÝ\˜ÙJ
OËœ™Yœ™\Ú

NÙ[Ù^ØÛÛœÝ[™]ÈJÜÛÝ\˜ÙN›™]È›
Ý\›”Ü›ÜÜÓÜšYÚ[Žˆ˜[›Ûž[[Ý\È‹X^›ÛÛNßJKÜXÚ]NžÌL’[™^ŒML›Ü\Y\ÎžÛ˜[YNˆœ˜Z[‹\˜Y\‹[^Y\ˆ‹]Nˆ”™YÙ[œ˜Y\ˆŸ_JNÜ‹˜Ý\œ™[^‹˜Y^Y\ŠŠ__KÝ‹Ë×JK‹\ÙQY™™XÝ


OOžÜ‹˜Ý\œ™[ËœÙ]ÜXÚ]JÌL
_KÞJK‹\ÙQY™™XÝ


OOžÈ[‰‰œ‹˜Ý\œ™[	‰	‰Šœ™[[Ý™S^Y\Š‹˜Ý\œ™[
K‹˜Ý\œ™[[[
_KÛ‹JK‹\ÙQY™™XÝ


OOŠ
OOžÜ‹˜Ý\œ™[	‰	‰œ™[[Ý™S^Y\Š‹˜Ý\œ™[
KK˜Ý\œ™[	‰˜ÛX\’[\˜[
K˜Ý\œ™[
_KÝJK‹\ÙQY™™XÝ


OOžÚYŠJXß\Ë›[™Ý[ŠJ\™]\›ˆK˜Ý\œ™[\Ù][\˜[


OO›
OOŠJÌJI\Ë›[™Ý
KŒ
K

OOžÚK˜Ý\œ™[	‰˜ÛX\’[\˜[
K˜Ý\œ™[
__KØËË›[™Ý—JNØÛÛœÝÏ\ÖÛ×OÛ™]È]JÖÛ×K[YJKÓØØ[U[YTÝš[™Ê››S“‹ÚÝ\ŽˆŒ‹YYÚ]‹Z[]NˆŒ‹YYÚ]ŸJNˆ‹KN‹KH‹ÏPOOžÝJLJK
OŠ
ÐJÜË›[™Ý
I\Ë›[™Ý
_NÜ™]\›ˆÚšœÞ
ËØÚ[™[ŽššœÞÊ›‹™]‹È˜\šXK[X™[Žˆ”™YÙ[œ˜Y\ˆ‹›ÛNˆœ™YÚ[Ûˆ‹[š]X[žÛÜXÚ]NŒNŒŒK[š[X]NžÛÜXÚ]NŒKNŒK^]žÛÜXÚ]NŒNŒŒKÛ\ÜÓ˜[YNˆ™š^YYLˆšYÚLˆ‹VÌMŒH™Ë]Ú]KÎMH˜XÚÙ›ÜX›\‹\ÛH›Ý[™Y^ÚYÝË^›Ü™\ˆ›Ü™\‹YÜ˜^KLŒ‹Ý[NžØ›ÝÛNˆ˜Ø[Ê
È[ŠØY™KX\™XKZ[œÙ]X›ÝÛK
JH‹X^ÚYˆ‹X\™Ú[ŽˆŒ]]È‹X^ZYÚˆ˜Ø[ÊLšHMŒH[ŠØY™KX\™XKZ[œÙ]X›ÝÛK
JH‹Ý™\™›ÝÖNˆ˜]]ÈŸKÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆLÈKLˆ›Ü™\‹Xˆ›Ü™\‹YÜ˜^KLL‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LˆZ[‹]ËL‹Ú[™[Ž–ÚšœÞ
‘KÜÚ^™NŒMKÛ\ÜÓ˜[YNˆ^X›YKML›^\Úš[šËLŸJKšœÞ
˜ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMÌ‹Ú[™[Žˆ”™YÙ[œ˜Y\ˆ0­ÈY™Ù[Ü[ˆ0¬Lˆ]\ˆŸJW_JKšœÞÊ˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹˜\šXK[X™[Žˆ”™YÙ[œ˜Y\ˆÛZ][ˆ‹ÛÛXÚÎ™KÛ\ÜÓ˜[YNˆ›Z[‹ZLLHZ[‹]ËLLHLˆ[Lˆ›^\Úš[šËL›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LH›Ý[™Y[È›Ü™\‹L™ËYÜ˜^KML^YÜ˜^KMÌÝXÚ[X[š\[][Ûˆ‹Ú[™[Ž–ÚšœÞ
[ËÜÚ^™NŒŒJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È‹Ú[™[Žˆ”ÛZ][ˆŸJW_JW_JKOÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ^\ÛH^X[X™\‹MÌ‹Ú[™[Žˆ”˜Y\ˆZ™[ZšÈšY]™\ØÚZØ˜X\‹ˆHÙY\œÝ™\ØXÚ[™È›Z™Ù[Ù\šÙ[‹ˆŸJNššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈLˆ^^È^YÜ˜^KMŒ‹Ú[™[Ž™È”˜Y\ˆšZÙ\šÙ[¸ )ˆŽ˜	ÔßH0­È\ÝÜš\ØÚH˜Y\‹ÙY[ˆ›ÛÜœÜ[[™ØJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOšÊLJKÛ\ÜÓ˜[YNˆœLKH›Ü™\‹L™ËYÜ˜^KML›Ý[™Y‹Ú[™[ŽššœÞ
•‹ÜÚ^™NŒM_J_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOJXÊKÛ\ÜÓ˜[YNˆœLKH›Ü™\‹L™ËX›YKML^X›YKMŒ›Ý[™Y‹Ú[™[Ž˜ÏÚšœÞ
U‹ÜÚ^™NŒM_JNššœÞ
U‹ÜÚ^™NŒM_J_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOšÊJKÛ\ÜÓ˜[YNˆœLKH›Ü™\‹L™ËYÜ˜^KML›Ý[™Y‹Ú[™[ŽššœÞ
ÛËÜÚ^™NŒM_J_JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^VÌLH^YÜ˜^KM‹Ú[™[Žˆ‹LHŸJKšœÞ
š[œ]‹ØÛ\ÜÓ˜[YNˆ™›^LH‹\Nˆœ˜[™ÙH‹Z[ŽˆŒ‹X^“X]›X^
Ë›[™ÝLJK˜[YN›ËÛÚ[™ÙNOOžÝJLJK
[X™\ŠK\™Ù]˜[YJJ__JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^VÌLH^YÜ˜^KML‹Ú[™[Žˆ›HŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^VÌLH^YÜ˜^KML‹Ú[™[Žˆ‘ZÚÚ[™ÈŸJKšœÞ
š[œ]‹ØÛ\ÜÓ˜[YNˆ™›^LH‹\Nˆœ˜[™ÙH‹Z[ŽˆŒŒ‹X^ˆŒL‹˜[YNžÛÚ[™ÙNOO—Ê[X™\ŠK\™Ù]˜[YJJ_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^VÌLH^YÜ˜^KML‹Ú[™[Ž–Þ‰H—_JW_JW_JW_J_JN›[XÛÛœÝÕ^Ó][ˆˆÙNYLˆ‹X\™]Ù\šÎˆˆØLMŒŒÈ‹Ù\ÜˆˆÍ˜ÌŽ‹šX[NˆˆÎXÙˆ‹š[™ÎˆˆÙXÍNH‹Ü[ˆˆÍŒÍ™ŒH‹ÚY\˜XYˆˆÙÙYH‹Ù\™YYØÚ\ˆˆÍÍˆ‹Ø\[ŽˆˆÙY‹[™\œÎˆˆÌØŽ™ˆŸNÙ[˜Ý[Ûˆ^™J
^ØÛÛœÝU\ŠOOšK›X\
KO]ÊOOšK›Û™Ý[ŠK^[ŠOOšKœÚÝÓØØ[›Û™Ý[ŠKP‹\ÙT™YŠ[
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝO[™]ÈÚNÜ™]\›ˆK™›Ü‘XXÚ
ÏOžØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN›™]ÈœŠ\ŠÜË›ØØ][Û‹›™ËË›ØØ][Û‹›]JJK›Û™ÝœßJKÏPÕ–ÜË›Øš™XÝ\W_Õ‹[™\œÎØKœÙ]Ý[J
ÊOO—ÌÊËÊJKK˜Y™X]\™JJ_JK‹˜Ý\œ™[Ü‹˜Ý\œ™[œÙ]ÛÝ\˜ÙJJNŠ‹˜Ý\œ™[[™]ÈÚJÜÛÝ\˜ÙNšK’[™^ŒYLË›Ü\Y\ÎžÝ]Nˆ“ZZ›ˆ›Û™Ý[ˆŸ_JK‹˜Ý\œ™[œÙ]š\ÚX›J
K‹˜Y^Y\Š‹˜Ý\œ™[
JK

OOžÜ‹˜Ý\œ™[	‰›‰‰Š‹œ™[[Ý™S^Y\Š‹˜Ý\œ™[
K‹˜Ý\œ™[[[
__KÛ‹WJK‹\ÙQY™™XÝ


OOžÜ‹˜Ý\œ™[	‰œ‹˜Ý\œ™[œÙ]š\ÚX›J
_KÝJK[Y[˜Ý[ÛˆÞ™JŠ^ØÛÛœÝÝ\N™KÛÛÜ™[˜]\ÎO[‹\ÏO\[ÙˆÖÌOOH›[X™\ˆÐ\ŠÊNœË›X\
ŠKO\Š
NÜÝÚ]Ú
J^ØØ\ÙH”Ú[Žœ™]\›ˆ™]ÈœŠJNØØ\ÙH“[™TÝš[™ÈŽœ™]\›ˆ™]ÈJJNØØ\ÙH”ÛYÛÛˆŽœ™]\›ˆ™]ÈXJJNØØ\ÙH“][TÚ[Žœ™]\›ˆ™]ÈÚ
JNØØ\ÙH“][S[™TÝš[™ÈŽœ™]\›ˆ™]ÈÛ
JNØØ\ÙH“][TÛYÛÛˆŽœ™]\›ˆ™]ÈÊJNÙY˜][œ™]\›ˆ™]ÈœŠ\Š
J__Y[˜Ý[Ûˆ^™J
^ØÛÛœÝU\ŠOœ‹›X\
KO]ŠOœ‹›^Y\œÊKP‹\ÙT™YŠ™]ÈX\
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝ[™]ÈÙ]
K›X\
OOšKšY
JNÜ™]\›ˆ˜Ý\œ™[™›Ü‘XXÚ

KÊOOžÜ‹š\ÊÊ_
‹œ™[[Ý™S^Y\ŠJK˜Ý\œ™[™[]JÊJ_JKK™›Ü‘XXÚ
OOžØÛÛœÝÏZK›˜[YKOZK˜ÛÛÜ‹ÏZKš\ÚX›K[™]ÈÚNÚKœÚ[Ë™›Ü‘XXÚ
OOžÛ]ŽØÛÛœÝ]K™Ù[ÛY]žI‰K™Ù[ÛY]žK\HOOH”Ú[ŽÝK™Ù[ÛY]žOÙ\Þ™JK™Ù[ÛY]žJN™[™]ÈœŠ\ŠK˜ÛÛÜ™[˜]\ÊJNØÛÛœÝO[™]ÈÜŠÙÙ[ÛY]žN™‹^Y\•\Nˆ˜Ý\ÝÛTÚ[‹Ý\ÝÛTÚ[KÝ\ÝÛS^Y\’YšKšYÝ\ÝÛS^Y\“˜[YNœËÝ\ÝÛS^Y\ÛÛÜŽ˜_JNÚYŠ
^ØÛÛœÝO]K™Ù[ÛY]žK\NÛKœÙ]Ý[J
ÊOOžOOOH”ÛYÛÛˆŸOOOH“][TÛYÛÛˆÛ™]È
Ùš[›™]È›ŠØÛÛÜŽ˜JÈŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽ˜KÚYŒŸJ_JNžOOOH“[™TÝš[™ÈŸOOOH“][S[™TÝš[™ÈÛ™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽ˜KÚYŒßJ_JN›™]È
Ú[XYÙN•Œ
KÊ_JJ_Y[ÙHKœÙ]Ý[J
K
OO›™]È
Ú[XYÙN•Œ
K
_JJNÛ˜Y™X]\™JJ_JNØÛÛœÝÏ]˜Ý\œ™[™Ù]
KšY
NÚYŠÊXËœÙ]ÛÝ\˜ÙJ
KËœÙ]š\ÚX›JÊNÙ[Ù^ØÛÛœÝO[™]ÈÚJÜÛÝ\˜ÙN›’[™^ŽML›Ü\Y\ÎžÝ]NœËÝ\ÝÛTÚ[^Y\’YšKšYKš\ÚX›N›ßJNÛ‹˜Y^Y\ŠJK˜Ý\œ™[œÙ]
KšYJ__JK

OOžÝ˜Ý\œ™[™›Ü‘XXÚ
OOžÛ‰‰›‹œ™[[Ý™S^Y\ŠJ_JK˜Ý\œ™[˜ÛX\Š
__KÛ‹WJK[Y[˜Ý[ÛˆÞ™J
^ØÛÛœÝ[]
ÏO›Ë˜XÝ]™UÚ[™ÝÏOOH˜Ü™X]S^Y\ˆŠKO[]
ÏO›Ë˜˜XÚÕÚ[™ÝÊKØY^Y\ŽO]Š
KÜ‹WOP‹\ÙTÝ]JˆŠKÏJ
OOžÜ‹š[J
I‰Š
‹š[J
K×JKJˆŠKJ
J_KOJ
OOžÚJˆŠKJ
_NÜ™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ“šY]]ÙHXYÈ‹XÛÛŽššœÞ
˜ËÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN˜KÛ˜XÚÎ˜K›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LÈ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ˜KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ›^LH‹Ú[™[Žˆ[›[\™[ˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎœË\ØX›Yˆ\‹š[J
KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]Ûˆ›^LH\ØX›Y›ÜXÚ]KML‹Ú[™[ŽˆX[›XZÙ[ˆŸJW_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœM‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ›X‹M^\ÛH^YÜ˜^KML‹Ú[™[Žˆ‘Y[ˆšY]]ÙH[[›XYÈ\Èš]°êKˆ[[ˆØ[ˆX\›˜HšXHHXYÚ[œÝ[[™Ù[‹ˆŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹Ú[›ÜŽˆ›™]Ë\Ú[[^Y\‹[˜[YH‹Û\ÜÓ˜[YNˆ˜›ØÚÈ›Û[YY][H^YÜ˜^KMÌX‹LH‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ“˜X[H˜[ˆHXYÈŸJKšœÞ
š[œ]‹ÚYˆ›™]Ë\Ú[[^Y\‹[˜[YH‹\Nˆ^‹˜[YNœ‹ÛÚ[™ÙN›ÏOšJË\™Ù]˜[YJKXÙZÛ\Žˆ˜šZ‹ˆÛÛXÝ[[ˆ‹Û\ÜÓ˜[YNˆ™]XÝY›Ü›KYšY[ËY[‹Ý[NžÙ›ÛÚ^™NˆŒY[HŸK]]Ñ›ØÝ\ÎˆLÛ’Ù^QÝÛŽ›ÏO›ËšÙ^OOOH‘[\ˆ‰‰œÊ
_JW_JW_J_J_Y[˜Ý[Ûˆ™J
^ØÛÛœÝ[]
O”˜XÝ]™UÚ[™ÝÏOOH˜YÚ[ŠKO[]
O”˜YÚ[[Ù[^Y\•\™Ù]
K[]
O”˜YÚ[[Ù[ØØ][ÛŠK[]
O”˜ÛÜÙPYÚ[[Ù[
KØYÚ[šKÙ]^Y\ŽœË\]S^Y\Ž˜_O]Š
KÛËOP‹\ÙTÝ]JˆŠKØËWOP‹\ÙTÝ]JˆŠKÙ‹OP‹\ÙTÝ]JˆŠKÛKWOP‹\ÙTÝ]JˆŠKYOËšÚ[™OOHœÚ[ÜÊKšY
N›[Ï^Ë›˜[Y_ˆ‹O^Ë˜ÛÛÜŸˆÌØŽ™ˆ‹Ï^Ë˜YT›ÛOOOHœ™XY‹ÏJ
OOžÚYŠ[Ëš[J
_Y_]WßÊ\™]\›ŽØÛÛœÝXËš[J
K[Kš[J
NÚYŠKšÚ[™OOHœÚ[Š\™]\›ŽØÛÛœÝOYKšYØJKÝš\ÚX›NˆLJKJKÛ˜[YN›Ëš[J
KØ]YÛÜžNˆ“Ý™\šYÈ‹›Ý\Î™‹š[J
KÛÛÜ™[˜]\Î–Ý›™Ë›]K‹‹”ÞÜÛ™N”NžßK‹‹žÞÝ\›žŸNžß_JI‰Š
ˆŠKJˆŠK
ˆŠKJˆŠKŠ
J_KOJ
OOžÛ
ˆŠKJˆŠK
ˆŠKJˆŠKŠ
_NÜ™]\›ˆÏÚšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ”[Ù]›ÙYÙ[ˆ‹XÛÛŽššœÞ
ZKÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙNKÝX’XY\ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœMKLˆ‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËLÈLÈ›Ý[™YY[‹Ý[NžØ˜XÚÙÜ›Ý[™ÛÛÜŽ‘__JKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ˜^KMŒ‹Ú[™[Ž—ßJW_J_JK›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LÈ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎKÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ›^LH‹Ú[™[Žˆ[›[\™[ˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎšË\ØX›Yˆ[Ëš[J
_ËÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]Ûˆ›^LH\ØX›Y›ÜXÚ]KML‹Ú[™[Ž”ÏÈ[Y[ˆ™ZÚZšÙ[ˆŽˆ•Ù]›ÙYÙ[ˆŸJW_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞ
ßJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ›Û[YY][H^YÜ˜^KMÌX‹LH‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ“˜X[H
ˆŸJKšœÞ
š[œ]‹Ý\Nˆ^‹˜[YN›ËÛÚ[™ÙN”O›
\™Ù]˜[YJKÛ\ÜÓ˜[YNˆËY[LÈKLKH™Ë]Ú]H›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™HÝ™\Ž˜™ËX›YKML˜[œÚ][Û‹XÛÛÜœÈ‹Ý[NžÙ›ÛÚ^™NˆŒY[HŸK]]Ñ›ØÝ\ÎˆLJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ›Û[YY][H^YÜ˜^KMÌX‹LH‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ•[Y›ÛÛ›[[Y\ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ™[]]™H‹Ú[™[Ž–ÚšœÞ
Ü™KÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ˜XœÛÛ]HYLÈÜLKÌˆ]˜[œÛ]K^KLKÌˆ^YÜ˜^KMŸJKšœÞ
š[œ]‹Ý\Nˆ[‹˜[YN˜ËÛÚ[™ÙN”OJ\™Ù]˜[YJK[œ][ÙNˆ[‹]]ÐÛÛ\]Nˆ[‹XÙZÛ\Žˆ˜šZ‹ˆˆLŒÍMÎ‹Û\ÜÓ˜[YNˆËY[NH‹LÈKLKH™Ë]Ú]H›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™HÝ™\Ž˜™ËX›YKML˜[œÚ][Û‹XÛÛÜœÈ‹Ý[NžÙ›ÛÚ^™NˆŒY[HŸ_JW_JW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ›Û[YY][H^YÜ˜^KMÌX‹LH‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ“›Ý]Y\ÈŸJKšœÞ
^\™XH‹Ý˜[YN™‹ÛÚ[™ÙN”Oœ
\™Ù]˜[YJKXÙZÛ\Žˆ™\ØÚšZš[™Ë\ËÜY\šÚ[™Ù[‹‹‹ˆ‹›ÝÜÎŒ‹Û\ÜÓ˜[YNˆËY[LÈKLKH™Ë]Ú]H›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™HÝ™\Ž˜™ËX›YKML˜[œÚ][Û‹XÛÛÜœÈ™\Ú^™K[›Û™H‹Ý[NžÙ›ÛÚ^™NˆŒY[HŸ_JW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ›Û[YY][H^YÜ˜^KMÌX‹LH‹Ý[NžÙ›ÛÚ^™NˆŒŽY[HŸKÚ[™[Žˆ“[šÈŸJKšœÞ
š[œ]‹Ý\Nˆ\›‹˜[YN›KÛÚ[™ÙN”OžJ\™Ù]˜[YJKXÙZÛ\ŽˆšÎ‹ËË‹‹ˆ‹Û\ÜÓ˜[YNˆËY[LÈKLKH™Ë]Ú]H›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™HÝ™\Ž˜™ËX›YKML˜[œÚ][Û‹XÛÛÜœÈ‹Ý[NžÙ›ÛÚ^™NˆŒY[HŸ_JW_JW_J_JN›[Y[˜Ý[ÛˆÞ™J
^ØÛÛœÝÛ‹WOP‹\ÙTÝ]J˜]šYØ]Ü‹›Û“[™JKÝ—OP‹\ÙTÝ]JLJKO^[ŠÏOœË™šY[[ÙQ[˜X›Y
NÜ™]\›ˆ‹\ÙQY™™XÝ


OOžØÛÛœÝÏJ
OOžÙJL
KŠLJ_KOJ
OOžÙJLJKŠLJ_NÜ™]\›ˆÚ[™ÝË˜Y]™[\Ý[™\Š›Û›[™H‹ÊKÚ[™ÝË˜Y]™[\Ý[™\Š›Ù™›[™H‹JK

OOžÝÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š›Û›[™H‹ÊKÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š›Ù™›[™H‹J__K×JKŸÛ[ššœÞ
ËØÚ[™[ŽššœÞ
›‹™]‹Ú[š]X[žÞN‹MLÜXÚ]NŒK[š[X]NžÞNŒÜXÚ]NŒ_K^]žÞN‹MLÜXÚ]NŒKÛ\ÜÓ˜[YNˆ™š^YÜLYLšYÚL‹VÌŒH™ËX[X™\‹ML^]Ú]HMKLˆÚYÝË[È‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆX^]Ë[È^X]]È‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ÚYKÜÚ^™NŒNJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û[YY][H‹Ú[™[ŽšOÈ“Ù™›[™H™[[Ù\ÈHØX\[ˆX™[ÈÙ\šÙ[ˆZ]ØXÚHŽˆ“Ù™›[™H[Ù\ÈHØX\Ù\šÝY]ÙXØXÚYH]HŸJW_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOœŠL
KÛ\ÜÓ˜[YNˆœLHÝ™\Ž˜™Ë]Ú]KÌŒ›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹Ú[™[ŽššœÞ
[ËÜÚ^™NŒMŸJ_JW_J_J_J_XÛÛœÝ^™O^Èž™Y\ˆÙÙH\˜Ú[ÛÙÚ\ØÚHØX\™HŽˆ˜™Ë\\œKMŒ‹šÙÙH\˜Ú[ÛÙÚ\ØÚHØX\™HŽˆ˜™Ë\\œKML‹˜\˜Ú[ÛÙÚ\ØÚHØX\™HŽˆ˜™Ë\\œKMŸK™O^Èž™Y\ˆÙÙH\˜Ú[ÛÙÚ\ØÚHØX\™HŽˆ–™Y\ˆÛÙÈ‹šÙÙH\˜Ú[ÛÙÚ\ØÚHØX\™HŽˆ’ÛÙÈ‹˜\˜Ú[ÛÙÚ\ØÚHØX\™HŽˆ•ØX\™HŸNÛ][O[[Ù[˜Ý[ÛˆYYJŠ^Ü™]\›ˆ[_
[O[™]ÈÚJÜÛÝ\˜ÙN›™]ÈÚKÝ[N›™]È
Ùš[›™]È›ŠØÛÛÜŽˆœ™Ø˜JMËLKŒÍJHŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÎLÌÌÙXH‹ÚYŒßJ_JK’[™^ŽNNN_JK‹˜Y^Y\Š[JJK[_Y[˜Ý[Ûˆ™J
^Ò[I‰’[K™Ù]ÛÝ\˜ÙJ
OË˜ÛX\Š
_X\Þ[˜È[˜Ý[Ûˆž™J‹J^ØÛÛœÝX]ØZ]Í™JJNÚYŠ]
\™]\›ŽØÛÛœÝOXYYJŠK™Ù]ÛÝ\˜ÙJ
NÚOË˜ÛX\Š
NØÛÛœÝÏ]˜ÛÛ™J
NÚOË˜Y™X]\™JÊ_Y[˜Ý[ÛˆÞ™JÚ\ÓÜ[Ž›‹ÛÛÜÙN™_J^ØÛÛœÝU\ŠÙOO™ÙK›X\
KÜ‹WOP‹\ÙTÝ]JˆŠKÜËWOP‹\ÙTÝ]J˜[ŠKÛËOP‹\ÙTÝ]J×JKØËWOP‹\ÙTÝ]JLJKÙ‹OP‹\ÙTÝ]JLJKÛKWOP‹\ÙTÝ]J[
KÞ×OP‹\ÙTÝ]J[
KÑK×OP‹\ÙTÝ]JL
KÚËWOP‹\ÙTÝ]JLJKÔ—OP‹\ÙTÝ]JLJKOP‹\ÙT™YŠ[
KP‹\ÙT™YŠ
NÐ‹\ÙQY™™XÝ


OOžÛ‰‰’K˜Ý\œ™[	‰œÙ][Y[Ý]


OO’K˜Ý\œ™[Ë™›ØÝ\Ê
KL
_KÛ—JK‹\ÙQY™™XÝ


OOžÚYŠ˜Ý\œ™[	‰˜ÛX\•[Y[Ý]
˜Ý\œ™[
K‹›[™ÝŠ^Û
×JK
LJNÜ™]\›Ÿ\™]\›ˆ˜Ý\œ™[]Ú[™ÝËœÙ][Y[Ý]
\Þ[˜Ê
OOžÝJL
K
L
NÝž^ØÛÛœÝÙOX]ØZ]™J‹KÊNÛ
ÙJ_XØ]Ú
ÙJ^ØÛÛœÛÛK™\œ›ÜŠ“[Û[Y[ÙX\˜Ú\œ›ÜŽˆ‹ÙJK
×J_Yš[˜[^ÝJLJ__K
K

OOžÕ˜Ý\œ™[	‰˜ÛX\•[Y[Ý]
˜Ý\œ™[
__KÜ‹ËWJNØÛÛœÝX\Þ[˜ÈÙOOžÚYŠ]
\™]\›ŽØÛÛœÝO]™Ù]šY]Ê
NÚYŠOOOYÙKšY
^ØÛÛœÝOT˜JÙK™^[L
NÙK™š]
KÙ\˜][ÛŽLX^›ÛÛNŒNJ_Y[Ù^ØÛÛœÝOT˜JÙK™^[Œ
NÙK™š]
KÙ\˜][ÛŽLX^›ÛÛNŒMŸJK]ØZ]ž™JÙK›[Û[Y[[[Y\ŠKJÙKšY
KÊÙKšY
__KJÙKJOOžÚYŠKœÝÜ›ÜYØ][ÛŠ
K]
\™]\›ŽØÛÛœÝO]™Ù]šY]Ê
KYOT˜JÙK™^[Œ
NÚK™š]
YKÙ\˜][ÛŽLX^›ÛÛNŒNJ_KJÙKJOOžÙKœÝÜ›ÜYØ][ÛŠ
KÊOOYÙOÛ[™ÙJ_KX\Þ[˜Ê
OOžÚYŠJ]Ë›[™ÝOOL
J^ÞŠL
NÝž^ØÛÛœÝÙO[Ë›X\
YOO™YK›[Û[Y[[[Y\ŠKOX]ØZ]M™JÙJNÚYŠK›[™ÝOOL
\™]\›ŽØÛÛœÝYOXYYJ
K™Ù]ÛÝ\˜ÙJ
NÚYOË˜ÛX\Š
NÛ]YORØJ
NÙK™›Ü‘XXÚ
YOOžØÛÛœÝYYK˜ÛÛ™J
NÚYOË˜Y™X]\™J
NØÛÛœÝR™Ù]Ù[ÛY]žJ
NÒ‰‰ŠYOTÓŠYK‹™Ù]^[

JJ_JNØÛÛœÝO]™Ù]šY]Ê
KÏT˜JYKL
NÔK™š]
ËÙ\˜][ÛŽLX^›ÛÛNŒMJKJL
KJ[
KÛÛœÛÛK›ÙÊ<'åî»î#È	ÙK›[™ÝH[Û[Y[[ˆÙ]ÛÛ™ÜØX\
_XØ]Ú
ÙJ^ØÛÛœÛÛK™\œ›ÜŠ‘\œ›ÜˆÚÝÚ[™È[[Û[Y[Îˆ‹ÙJ_Yš[˜[^ÞŠLJ___KJ
OOžÙJ
_KÙOJ
OOžÚ™J
KJˆŠKJ˜[ŠK
×JK
LJKJ[
KÊ[
KÊL
KJLJKJ
_KYOYÙOOžÚYŠ\Ÿ‹›[™ÝŠ\™]\›ˆÙNØÛÛœÝO\‹ÓÝÙ\Ø\ÙJ
KœÜ]
×ÊËÊK™š[\ŠYOOšYK›[™ÝLŠNÛ]OYÙNÜ™]\›ˆK™›Ü‘XXÚ
YOOžØÛÛœÝYOZYKœ™\XÙJÖËŠŠÏ×‰ßJ
_×WKÙË—		ˆŠKO[™]È™YÑ^

	ÝY_JX™ÚHŠNÚOZKœ™\XÙJK	ÏX\šÈÛ\ÜÏH˜™Ë^Y[ÝËLŒLH‰OÛX\šÏ‰Ê_JK_NÜ™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ–›ÙZÈ[ˆ[Û[Y[[ˆ‹XÛÛŽššœÞ
‹ÜÚ^™NŒNJKXÙ[Y[ˆ˜›ÝÛH‹ÛÛÜÙNš‹ÝX’XY\ŽššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLˆ‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ™[]]™H›^LH‹Ú[™[Ž–ÚšœÞ
ÚÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ˜XœÛÛ]HYL‹HÜLKÌˆ]˜[œÛ]K^KLKÌˆ^YÜ˜^KMŸJKšœÞ
š[œ]‹Ü™YŽ’K\Nˆ^‹˜[YNœ‹ÛÚ[™ÙN™ÙOOžÚJÙK\™Ù]˜[YJKJ[
KÊ[
KJLJ_KXÙZÛ\Žˆ˜›Ý]Ý›ÛÜ‹ØÚ\™[‹‹‹ˆ‹Û\ÜÓ˜[YNˆËY[N‹NKLˆ™ËYÜ˜^KLL›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë\\œKML^\ÛHŸJK‰‰ššœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžÚJˆŠKJ[
KÊ[
KJLJ_KÛ\ÜÓ˜[YNˆ˜XœÛÛ]HšYÚLˆÜLKÌˆ]˜[œÛ]K^KLKÌˆ^YÜ˜^KMÝ™\Ž^YÜ˜^KMŒ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹Ú[™[ŽššœÞ
[ËÜÚ^™NŒMJ_JW_JKšœÞ
œÙ[XÝ‹Ý˜[YNœËÛÚ[™ÙN™ÙOOžØJÙK\™Ù]˜[YJKJ[
KÊ[
KJLJ_KÛ\ÜÓ˜[YNˆœKLKHLˆ™ËYÜ˜^KLL›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë\\œKML^\ÛH^YÜ˜^KMÌËLŽ‹Ú[™[Ž“Øš™XÝ™[šY\ÊLÊK›X\

ÙÙKÛ˜[YN™_WJOOššœÞ
›Ü[Ûˆ‹Ý˜[YN™ÙKÚ[™[Ž™_KÙJJ_JW_J_JK›ÛÝ\Ž›_ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ›ÙKÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]ÛˆËY[‹Ú[™[Žˆ•Ú\È›ÙZÛÜ˜XÚ[ˆX\šÙ\š[™ÈŸJN›ÚYÚ[™[ŽššœÞÊ™]ˆ‹ØÚ[™[Ž–ØÉ‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ^XÙ[\ˆ^YÜ˜^KML^\ÛH‹Ú[™[Žˆ–›ÙZÙ[‹‹‹ˆŸJKXÉ‰™‰‰›Ë›[™ÝOOL	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ^XÙ[\ˆ^YÜ˜^KML^\ÛH‹Ú[™[Žˆ‘ÙY[ˆ™\Ý[][ˆŸJKXÉ‰›Ë›[™ÝŒ	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™]šYK^H]šYKYÜ˜^KLL‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈKLKH™ËYÜ˜^KML^^È^YÜ˜^KML›^\ÝYžKX™]ÙY[ˆ][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞÊœÜ[ˆ‹ØÚ[™[Ž–ÛË›[™ÝË›[™ÝQOÈŠÈŽˆˆ‹ˆÙ]›Û™[ˆ—_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÛË›[™ÝQI‰ššœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO”ÊJÍL
KÛ\ÜÓ˜[YNˆ^\\œKMŒÝ™\Ž^\\œKMÌ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹Ú[™[Žˆ“YY\ˆY[ˆŸJKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ•‹\ØX›Y”Û\ÜÓ˜[YN˜›^][\ËXÙ[\ˆØ\LHLˆKLH›Ý[™Y^]Ú]H›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ	ÚÏÈ˜™ËYÜ™Y[‹MLÝ™\Ž˜™ËYÜ™Y[‹MŒŽˆ˜™Ë\\œKMLÝ™\Ž˜™Ë\\œKMŒŸH	ÔÈ›ÜXÚ]KMLÝ\œÛÜ‹]ØZ]ŽˆˆŸXÚ[™[Ž–ÔÚšœÞ
LÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ˜[š[X]K\Ü[ˆŸJNššœÞ
YËÜÚ^™NŒLŸJKšœÞ
œÜ[ˆ‹ØÚ[™[ŽšÏÈ‘Ù]ÛÛ™Žˆ•ÛÛˆ[HŸJW_JW_JW_JKË›X\
ÙOOššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YN˜˜[œÚ][Û‹XÛÛÜœÈ	ÛOOOYÙKšYÈ˜™Ë\\œKMLŽˆ˜™Ë]˜[œÜ\™[ŸXÚ[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OO”ŠÙJKÛ\ÜÓ˜[YNˆËY[^[YLÈKLˆÝ™\Ž˜™Ë\\œKML˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[‹Ú[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\\ÝYžKX™]ÙY[ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHZ[‹]ËL‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KN^\ÛH‹Ú[™[Ž™ÙKÜÛšY[_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^\\œKMŒ]LH‹Ú[™[Ž™ÙKœ\š[Ù_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH›^\Úš[šËL‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN˜LKHKLH›Ý[™Y^]Ú]H^VÎ\H	Ý^™VÙÙKšÝØ[]Z]ÝØX\™W_˜™ËYÜ˜^KMLŸXÚ[™[Ž™™VÙÙKšÝØ[]Z]ÝØX\™W_SRÈŸJKOOOYÙKšY	‰ššœÞ
˜]Ûˆ‹ÛÛÛXÚÎ™OO“
ÙKJKÛ\ÜÓ˜[YNˆœLH™Ë\\œKMLÝ™\Ž˜™Ë\\œKMŒ^]Ú]H›Ý[™Y˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H‹]Nˆ–›ÛÛH[ˆ‹Ú[™[ŽššœÞ
ZYKÜÚ^™NŒLŸJ_JW_JW_J_JKOOOYÙKšY	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ‹Lˆ‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ™OO‘
ÙKšYJKÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LH^^È^\\œKMŒÝ™\Ž^\\œKMÌ›Ü™\‹LÝ][™K[›Û™H™Ë]˜[œÜ\™[X‹LH‹Ú[™[Ž–ÞOOYÙKšYÚšœÞ
Ó‹ÜÚ^™NŒMJNššœÞ
žÜÚ^™NŒMJKOOYÙKšYÈ“Z[™\ˆŽˆ“Û\ØÚšZš[™È—_JKOOYÙKšY	‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMÌ™ËYÜ˜^KML›Ý[™YLˆX^ZLÌˆÝ™\™›ÝË^KX]]ÈÚ]\ÜXÙK\™K]Ü˜\‹[™Ù\›Ý\ÛTÙ][›™\’Sž××Ú[™ž
YJÙK›Û\ØÚšZš[™ÊJ__JW_JW_KÙKšY
JW_JKXÉ‰ˆY‰‰ššœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ^^È^YÜ˜^KML‹Ú[™[Žˆ–›ÙZÈÜ™YÛÛÜ™[ˆ[ˆLËŒ
ÈSRÈ[Û[Y[[ˆŸJW_J_J_XÛÛœÝ™OVÈSRÈ[Û[Y[[ˆ‹SRÈ›ÛYZ[œÈ‹SRÈÝY[Z™‹SRÈœ›ÙYÙHQH‹SRÈ]HQH‹SRÈÝ™\šYÈ—NÙ[˜Ý[Ûˆ^™J
^ØÛÛœÝÚÙ^]ÛÜ™›‹\ÐXÝ]™N™KÝ[ÛÝ[š[\™YÛÝ[œ‹Ù]Ù^]ÛÜ™šKÙ]XÝ]™NœËÛX\‘š[\Ž˜_OV”J
KÏ[]
OOžK˜XÝ]™UÚ[™ÝÏOOH›[Û[Y[š[\ˆŠK[]
OOžKÙÙÛS[Û[Y[š[\ŠKÏ[]
OOžK˜ÛÜÙS[Û[Y[š[\ŠKOXœŠOOžKš\ÚX›JK\™KœÛÛYJOOVÞWJK^OOžÚJJKÊKš[J
K›[™ÝLŠ_KOJ
OOžØJ
_NÜ™]\›ˆÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›‹˜]Û‹ÛÛÛXÚÎ›Û\ÜÓ˜[YN˜š^Y›ÝÛKVÌLMœHYLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH	ÙOÈ˜™Ë\\œKML^]Ú]HŽˆ˜™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎL^\\œKMŒŸXÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]NˆSRÈÛÜž›ÙZÙ[ˆ‹˜\šXK[X™[ŽˆSRÈÛÜž›ÙZÙ[ˆ‹Ú[™[ŽššœÞ
ŒKÜÚ^™NŒŒJ_JKšœÞ
šKÚ\ÓÜ[Ž›Ë]NˆSRÈÛÜž›ÙZÙ[ˆ‹XÛÛŽššœÞ
ŒKÜÚ^™NŒNJKXÙ[Y[ˆ›Y‹ÛÛÜÙN˜ËÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœ™[]]™H‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\NˆœÙX\˜Ú‹˜[YN›‹ÛÚ[™ÙNžOOœ
K\™Ù]˜[YJKXÙZÛ\Žˆ˜šZ‹ˆÜ˜Y™[›ÛYZ[œË\œ8 )ˆ‹]]ÐÛÛ\]Nˆ›Ù™ˆ‹[\’Ù^R[ˆœÙX\˜Ú‹Û\ÜÓ˜[YNˆËY[LÈ‹NHKL‹H^\ÛH™ËYÜ˜^KLL›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™Ë\\œKM‹˜\šXK[X™[Žˆ‘ÛÜž›ÙZÈSRÈÜ™YÛÛÜ™ŸJK‰‰ššœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎ›KÛ\ÜÓ˜[YNˆ˜XœÛÛ]HšYÚLˆÜLKÌˆ]˜[œÛ]K^KLKÌˆLH^YÜ˜^KMÝ™\Ž^YÜ˜^KMÌ™Ë]˜[œÜ\™[›Ü™\‹LÝ][™K[›Û™H‹]Nˆ•Ú\ÜÙ[ˆ‹˜\šXK[X™[ŽˆSRËYš[\ˆÚ\ÜÙ[ˆ‹Ú[™[ŽššœÞ
[ËÜÚ^™NŒMŸJ_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMLXY[™Ë\™[^Y‹Ú[™[Žˆ•\Z[š[XX[ˆZÙ[œËˆYY\™\™HÛÛÜ™[ˆ[Ù][ˆ[[XX[[ˆ][Û[Y[›ÛÜšÛÛY[‹ˆŸJKŒ	‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKX™]ÙY[ˆØ\LÈ^^È‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YN™OÈ^\\œKMŒ›Û[YY][HŽˆ^YÜ˜^KML‹Ú[™[Ž™OØ	ÜŸH˜[ˆ	ÝH[Û[Y[[ˆšXÚ˜X\˜˜	ÝH[Û[Y[[ˆšXÚ˜X\˜JK‰‰ššœÞ
˜]Ûˆ‹Ý\Nˆ˜]Ûˆ‹ÛÛXÚÎ›KÛ\ÜÓ˜[YNˆ^\\œKMŒÝ™\Ž^\\œKMÌ™Ë]˜[œÜ\™[›Ü™\‹LÝ][™K[›Û™H›Û[YY][H‹Ú[™[Žˆ•Ú\ÜÙ[ˆŸJW_JW_J_JW_JN›[Y[˜Ý[Ûˆ^™JÚ\ÓÜ[Ž›‹ÛÛÜÙN™KÛ“Ü[“X[X[J^ØÛÛœÝ^[ŠÏO›ËœÙ]YUÙ[ÛÛYS[Ù[
KOJ
OOžÙJ
_KÏJ
OOžÜŠL
KJ
_KOJ
OOžÝ

_NÜ™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ’ÙHÙ\šÝ]XÝÈ‹XÛÛŽššœÞ
QKÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙNšK›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆ\ÝYžKY[™Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
˜]Ûˆ‹ÛÛÛXÚÎœËÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]Ûˆ‹Ú[™[Žˆ•ÛÛˆšY]YY\ˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎšKÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]Ûˆ‹Ú[™[Žˆ™YÜ™\[ˆŸJW_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMÜXÙK^KM‹Ú[™[Ž–ÚšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û\Ù[ZX›Û^YÜ˜^KMÌX‹Lˆ‹Ú[™[Žˆ’Û›Ü[ˆÜHØX\ŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMLX‹LÈ‹Ú[™[ŽˆX[ˆH[šÙ\‹H[ˆ™XÚ\šØ[š[™™HÛÛÎˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞ
™ÚXÛÛŽššœÞ
˜ËÜÚ^™NŒMŸJK]Nˆ’ØX\YÙ[ˆ‹\ØÜš\[ÛŽˆ”Ù[XÝY\ˆÙ[ÙHYÙ[ˆ™HÚ[šY[ˆŸJKšœÞ
™ÚXÛÛŽššœÞ
ÚÜÚ^™NŒMŸJK]Nˆ–›ÙZÙ[ˆ‹\ØÜš\[ÛŽˆ–›ÙZÈ˜X\ˆY[ˆY™\ÈÙˆX]Û˜X[H[ˆY[]\›ÜHŸJKšœÞ
™ÚXÛÛŽššœÞ
ZKÜÚ^™NŒMŸJK]Nˆ‘ÔÈØØ]YH‹\ØÜš\[ÛŽˆ•›ÛÈ™HÜÚ]YHÜHØX\ŸJKšœÞ
™ÚXÛÛŽššœÞ
S‹ÜÚ^™NŒMŸJK]Nˆ”™\Ù]È‹\ØÜš\[ÛŽˆ”Û™[Ú\ÜÙ[[ˆ\ÜÙ[ˆØX\YÙ[ˆŸJKšœÞ
™ÚXÛÛŽššœÞ
ŒKÜÚ^™NŒMŸJK]Nˆ“[Û[Y[š[\ˆ‹\ØÜš\[ÛŽˆ‘š[\ˆ[Û[Y[[ˆÜ\š[ÙHŸJKšœÞ
™ÚXÛÛŽššœÞ
ËÜÚ^™NŒMŸJK]Nˆ•˜[œÜ\˜[YH‹\ØÜš\[ÛŽˆ”\ÈÛÜžšXÚYÚZYX[ˆŸJKšœÞ
™ÚXÛÛŽššœÞ
KÜÚ^™NŒMŸJK]Nˆ“Y[H‹\ØÜš\[ÛŽˆ’[œÝ[[™Ù[ˆ[ˆYY\ˆŸJKšœÞ
™ÚXÛÛŽššœÞ
‹ÜÚ^™NŒMŸJK]Nˆ”™\Ù]‹\ØÜš\[ÛŽˆ’ØX\˜X\ˆ™YÚ[œÝ[™ŸJW_JW_JKšœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËX›YKML›Ý[™Y^LÈ‹Ú[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û\Ù[ZX›Û^X›YKNX‹LH‹Ú[™[Žˆ’ØX\YÙ[ˆÙXœZZÙ[ˆŸJKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMÌ‹Ú[™[Žˆ’ÛZÈÜY[ˆØØ]YHÛH[™›Ü›X]YHHšY[ˆÝ™\ˆ[Û[Y[[ˆ[ˆ\˜Ú[ÛÙÚ\ØÚHÙYÙ]™[œËˆŸJW_JKšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ˜KÛ\ÜÓ˜[YNˆËY[›^][\Ë\Ý\Ø\LˆLÈ™ËYÜ˜^KMLÝ™\Ž˜™ËYÜ˜^KLL›Ý[™Y^˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H^[Y‹Ú[™[Ž–ÚšœÞ
QKÜÚ^™NŒNÛ\ÜÓ˜[YNˆ^X›YKMŒ›^\Úš[šËL]LHŸJKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û\Ù[ZX›Û^YÜ˜^KMÌX‹LH‹Ú[™[Žˆ’[™ZY[™ÈŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMŒ‹Ú[™[Žˆ™ZÚZšÈ›ÛYYÙH[™ZY[™È8¡¤ˆŸJW_JW_JW_J_J_Y[˜Ý[Ûˆ™
ÚXÛÛŽ›‹]N™K\ØÜš\[ÛŽJ^Ü™]\›ˆšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËMÈMÈ›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™ËX›YKLL^X›YKMŒ›Ý[™Y[È›^\Úš[šËL‹Ú[™[Ž›ŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHZ[‹]ËL‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È›Û[YY][H^YÜ˜^KMÌ‹Ú[™[Ž™_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KM[LH‹Ú[™[Ž–È‹H‹_JW_JW_J_XÛÛœÝž™OVÞÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒLˆ‹]NˆŒMÈÚÝØ™\ˆŒˆ‹]Nˆ“YY\ˆ\ÝÜš\ØÚHØX\[ˆ›ÛÜˆœ˜[šÜšZšÈ‹Ú[™Ù\Î–È“XÚ›Ýø &\ÈNML8 $ÌNMKQÓ‹ZØX\NML[ˆ0â]][XZ›ÜˆNŒ8 $ÌNˆÝX[ˆšZˆœ˜[šÜšZšÈ8¡¤ˆ\ÝÜš\ØÚHØX\[‹Ø[Y[ˆY]Ø\ÜÚ[šKˆ‹“˜\Û[Û\ØÚØY\Ý\ˆÝÙYYÛZØ˜\™HÙ[YY[\[[ˆ˜X\ˆHÙ™šXÚpêÛH\˜ÚYY˜›Y[ŽÈ]\ÈÙY[ˆÛÜ›Ü[™HØX\Ý™\›^Kˆ‹[HšY\ˆšZ›ˆÙYÙ]›ÙYÙX[ˆ0êY\˜XËÛÚÈX[ˆ™\ÝX[™HÜÙ\ÛYÙ[ˆ™\Ù]ËˆÜÙ\ÛYÙ[ˆÚZžšYÚ[™Ù[ˆX\›˜H›Z™[ˆ™ZÝY[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒLH‹]NˆŒMˆÚÝØ™\ˆŒˆ‹]NˆØ\HHØ\ÜÚ[šHÙYÙ]›ÙYÙ‹Ú[™Ù\Î–È‘H\ÝÜš\ØÚHØ\ÜÚ[šKZØX\˜[ˆQÓ‹Ð“‘ˆÝX]šZˆœ˜[šÜšZšÈ8¡¤ˆ\˜Ú[ÛÙÚYH	ˆ\ÝÜšYKY][œÝ[˜\™H˜[œÜ\˜[YKˆ‹‘HXYÈ\ÈÙYÙ]›ÙYÙX[ˆ0êY\˜XÈŒ‹ÛÚÈX[ˆ™\ÝX[™HÜÙ\ÛYÙ[ˆ™\Ù]Ëˆ™HÝ™\šYÙHXYÚÙ]^™\È›Z™[ˆ™ZÝY[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒL‹]NˆŒMˆÚÝØ™\ˆŒˆ‹]Nˆ–›ÙZÚÛ›ÜÙY\ˆœšZˆ‹Ú[™Ù\Î–È‘HÙ]™[™H™\œÚY[[šÈ\È™\ÚZ™\™ˆYHYÈÝ™\ˆ]™\™Ü›ÛÝÛ\È[ˆÜ[™HX\™ÛÜˆHÚZžšYÚ[™Ù[ˆ[ˆX]È˜[ˆ›ÙZÙ[‹ˆ‹•ÚZžšYÚ[™Ù[ˆ›Z™[ˆ™\™ZZØ˜X\ˆšXHH™\œÚY[[šÈÛ™\˜X[ˆ]Y[Kˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽNH‹]NˆŒMˆÚÝØ™\ˆŒˆ‹]Nˆ‘Ù]ÛÛ™HØX\[™›Ü›X]YHÙY\ˆ™\™ZZØ˜X\ˆ‹Ú[™Ù\Î–È’ÛZÚÙ[ˆÜ›ZÚÙ[‹Ù]ÛÛ™HØX\[[ˆ[ˆØX\Y[œÝ[ˆÜ[ÙY\ˆ]™\›Ý]ÙH[™›Ü›X]Y]™[œÝ\‹ˆ‹‘]Z[È™ZÚZšÙ[ˆÙ\šÝÙY\ˆY]XÚH]Z\ÚÛZÚÙ[ˆ[ˆ[Y›ÛÛZÚÙ[‹ˆZYÙ[ˆ[[ˆ™ZÝY[ˆ[ˆÛZ[™H[™›Ü›X]YZØX\™KˆY[ˆZÈ[\œÈÛZ]Y\œÝ]ØX\™NÈØÚZ]™[ˆÜ[ÙY[ˆÜ]\ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽN‹]NˆŒMHÚÝØ™\ˆŒˆ‹]Nˆ’ØX\[™›Ü›X]YHš[›™[ˆ™Y[‹Ú[™Ù\Î–È’]ÛZ[™H[™›Ü›X]YZØX\™H›Z™›ÛYYÈš[›™[ˆ]šXÚ˜\™HØÚ\›KÛÚÈX[ˆH˜[™[ˆšZˆ˜XZY[ˆÙˆ[ž›ÛÛY[ˆÜ™H[Y›ÛÛ‹ˆ‹‘]Z[È™ZÚZšÙ[ˆÜ[\™XÝ]™\›Ý]ÙH]Z[™[œÝ\‹ˆ]^˜HÙ]^™\[™Y[\È™\ÚZ™\™È›Y\™[ˆ\ÜÙ[ˆ™\Ý[][ˆ›Z™™\ØÚZØ˜X\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽMÈ‹]NˆŒMHÚÝØ™\ˆŒˆ‹]Nˆ•™\œÝ\šÝHÛÙÝ\È[ˆÝ[ˆÜ™ÙÛ™H‹Ú[™Ù\Î–È•ØX[ˆØØ]Y\ÈÙYÙ]›ÙYÙX[ˆH\˜Ú[ÛÙÚ\ØÚHZÚÙ[ˆ˜[ˆ0êY\˜XÎˆ]]™[›Ü[‹ÜYKÛ]Ø[H]X]\È[ˆ™\›][ˆZY[Y]]ÜÙHØ\Ý˜Kˆ‹•™\œÝ\šÚ[™Ù[ˆ\šÙ[ˆ™HX[ˆY[ˆ›]]ÙH›Û™HÝ\ÛÚÈ[ˆHZœÝˆšZˆYY\ˆ[ÝX[ˆ\š[ÙKœ›Ûˆ[ˆØØ]Y\™XÚ\ÚYNÈÛž™ZÙ\ˆÙY]Y\™HØ[[ˆÛÜ™[ˆšY][È™]Ù^™[ˆØ[\ØÚ›ÛÜ™Ù\Ý[ˆHYÙ[™HÝX]šZˆ\˜Ú[ÛÙÚYH	ˆ\ÝÜšYKˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽMH‹]NˆŒLHÚÝØ™\ˆŒˆ‹]Nˆ•ÚZžšYÚ[™Ù[ˆÜ›Ý]È[ÛY[‹Ú[™Ù\Î–È“Y]ÚZžšYÚ[™Ù[ˆšY]YY\ˆÛ™[ˆ™]™H]]]ÛX]\ØÚHÚZžšYÚ[™ÜÜØÚ\›HZ]ÛÚÈ›ÛÜˆÙZÛÛ\ÝYÙH™\œÚY\ËˆšXHY[H8¡¤ˆÚZžšYÚ[™Ù[ˆÝ[ˆ™H[\È\YÛ^™[ˆ[ˆ]]ÛX]\ØÚÛ™[ˆÙY\ˆX[ž™][‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽM‹]NˆŒLHÚÝØ™\ˆŒˆ‹]Nˆ”\ÝYÙK[šY›Ü›YHØX\[[ˆ‹Ú[™Ù\Î–È[HØØ]Y\[[ˆšZ›ˆ›Û™Y]]™[™HÝXY[H˜[™™KˆÛ]\ˆÛ™\œØÚZYHYÙ[ˆ[ˆØ]YÛÜšYpêÛ‹ÛÚÈ[ˆ0êY\˜XËˆ‹‘ZYÙ[ˆYÙ[ˆ[ˆ[\ÜÈX˜™[ˆY]ÈÜ›Ý\™H[[‹ˆ[H[[ˆ™\šÛZ[™[ˆšZˆZ]›ÛÛY[ŽÈÛ]\™[‹ØØ]Y\ËÜ]\È[ˆ™\Ù]È›Z™[ˆ™ZÝY[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽLÈ‹]NˆÈÚÝØ™\ˆŒˆ‹]Nˆ”™\Ù]ËZœÝ[ˆ[ˆØX\^Ü™\˜™]\™‹Ú[™Ù\Î–È”Ý[™X\™™\Ù]È\œÝ[[ˆ™]ØX\™HZYÙ[ˆ™\Ù]Ëˆ™\Ù]™\˜™\™ÝÛÚÈZYÙ[ˆYÙ[ˆ[ˆ[\ÜÈ›Û™\ˆ[ˆÙYÙ]™[œÈH™\ÚZ™\™[‹ˆ‹”™\Ù]Û›Ü[ˆšZ›ˆÜ›Ý\‹ˆY]]ÝÛÙÝ[ˆ™HH˜X[H[ˆ]ÛÝY[ˆ˜[ˆØØ]YH[ˆ›ÛÛHX[œ\ÜÙ[‹ÛÚÈšZˆ™\ÝX[™H™\Ù]Ëˆ‹“™Y\›[™ÙH™\Ù]ÈÝ[›™[ˆHSRË[[Û[Y[[ˆ[ˆHZœÝÛ™[‹[˜Û\ÚYYˆ\š[ÙYš[\œË›ÙZÙ[ˆ[ˆÛ™[ˆÜHØX\ˆ‹’ØX\Y˜™Y[[™Ù[ˆ[ˆš[È™[Y[ˆ[HZÙ[›YÙ[ˆ[ˆ[ˆ˜[œÜ\˜[YHYYKˆ›ÙZÙ[ˆÛZ]šZˆ]Ü[™[ˆ˜[ˆY[ˆ[™\ˆ™[œÝ\‹ˆ‹‘H[™ZY[™È™\ØÚšZ™HZ\ÝH™\Ù]™YY[š[™Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽLˆ‹]NˆˆÚÝØ™\ˆŒˆ‹]Nˆ”ØÚ\œ\™HQTˆ›ÛÜˆ™Y\›[™‹Ú[™Ù\Î–È‘H™Y\›[™ÙH[ÚYH[ˆ][Y\™XÝ[Û™[HQTˆÙXœZZÙ[ˆHRY]Y[ˆ™\ÛÛ]YH˜[ˆLÛH[ˆX]È˜[ˆHY]\‹ˆ™\ÝX[™H™\Ù]ËÜÙ\ÛYÙ[ˆ˜[œÜ\˜[YH[ˆXYÚÙ]^™\È›Z™[ˆ^™[™HYÙ[ˆÙXœZZÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽLH‹]NˆˆÚÝØ™\ˆŒˆ‹]Nˆ“Y\Ø˜\™H[™›Ü›X]YHšZˆÝYH›ÜÜÙ[ˆ‹Ú[™Ù\Î–È‘HØX\[™›Ü›X]YHšZˆÝYH›ÜÜÙ[ˆÛÛ™Y\›[™ÙH™[˜[Y[ˆ[ˆ›ÜØØ]YÛÜšYpêÛ‹ˆÜ\›ZÝ[ˆÝX[ˆ[ˆXÝ\™\È[ˆšY\šØ[HY]\œËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽL‹]NˆˆÚÝØ™\ˆŒˆ‹]Nˆ“ÜÙ\ÛYÙ[ˆ™\Ù]Ù]^™\È™ZÝY[ˆ‹Ú[™Ù\Î–È”Þ[˜Ú›Ûš\Ø]YH[ˆ\YÛY[ˆ™ZÝY[ˆHÚZžšYÚ[™Ù[ˆX[ˆÝ[™X\™™\Ù]Ë[˜Û\ÚYYˆ0êY\˜XËˆØ]™H™]ØX\ÛÚÈÙYÙ]›ÙYÙHYÙ[‹Z]Ù\ØÚZÙ[HYÙ[‹˜[œÜ\˜[YH[ˆØX\ÜÚ]YKˆ‹”Ú]\ÈÛ\Üðê\ÈÙXœZZÝÛÛœÙ\]Y[^™[™HXYÛ˜[Y[‹ˆÜÙ\ÛYÙ[ˆYÙ[ˆÛÜ™[ˆšZˆÙ\\ÜÙ[ˆÛÚÈÙ[Y[ˆ[È™H›ÙÈšY][ˆHYÙ[›ZœÝÝÛ™[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽH‹]NˆˆÚÝØ™\ˆŒˆ‹]Nˆ‘ZYÙ[ˆYÙ[ˆ[ˆ[\ÜÈ[šÛ\˜X\ˆ‹Ú[™Ù\Î–È‘ZYÙ[ˆYÙ[ˆ[ˆ[\ÜÈ™YÚ[›™[ˆXÚÙZÛ\ˆZÈÜHÛÜÛHYY\™HÜ›Ù\Yž›Û™\›ZšÈHÜ[™[ˆÙˆÛZ][‹ˆ‹’[šÛ\[ˆ™\˜[™\HØX\šXÚ˜X\šZYšY]ˆšY]]ÙHXYË[\Ü\™[ˆ[ˆY[[™Ù[ˆÝ™\ˆÙYY[HÜÛYÈ›Z™[ˆ™\™ZZØ˜X\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽ‹]NˆˆÚÝØ™\ˆŒˆ‹]Nˆœ›Û›[šÜÈ[ˆ^\›™HØX\[ˆ\œÝ[‹Ú[™Ù\Î–È]\È\È]š[[Ú[™\ÈÜ[šXH]Ù™šXÚpêÛHZØX\Y™\Ëˆœ›ÛœYÚ[˜H[ˆ^\›™HØX\X˜™[ˆYY\ˆY[ˆZYÙ[ˆÛ›ÜÈÛÚÈ”‘ÓH[ˆQÓˆšYY[ˆHY[ˆ\™XÝHØX\[™Ø[™Ëˆ‹œ›Û›™[ˆ›Û™\ˆZYÙ[ˆØX\[][ˆœ›Ûˆ™ZÚZšÙ[‹ˆHZ]Ù\ØÚZÙ[HØX\Û›Ü[ˆHZ\ÛZY[™HY[[™ÈÝ™\ˆY[ˆÛ™Ù[YÙHØØ]YHšZ›ˆX\ˆ™\ÚZ™\™ˆ‹•0êY\˜XËXœ›Û˜Y™\ÜÙ[ˆÙXÛÛ›ÛY\™ÈHœ›Û›[šÈ›ÛÜˆ›Ü°êHÜ°ê\ÚYÛ™H\ÈšZ™Ù]Ù\šÝÛÚÈ[ˆHZœÝ˜[ˆY\™\™H[\ÜËˆZYÙ[ˆØØ]Y\È[ˆ›Ý]Y\È›Z™[ˆ™ZÝY[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽÈ‹]NˆˆÚÝØ™\ˆŒˆ‹]Nˆ•0êY\˜XÎˆYY\ˆ\˜Ú[ÛÙÚYH[ˆZ]ÙXœ™ZY\™HZœÝ‹Ú[™Ù\Î–È–™\ÈÙ\X›XÙY\™H™Z\ÝÜš\ØÚH™\›Y[[™Ù[ˆÙYÙ]›ÙYÙˆH™\ÝX[™H˜ZØ[Y\ZÚÙ[ˆ›Z™[ˆ™ZÝY[ŽÈÛØ˜[HÜÚ]Y\ÈšZ›ˆ\šÙ[˜˜X\ˆ[ÈÙ[YY[XÙ[[Kˆ‹“[™ØÚ\	ˆœ›Û›™[ˆ0­È0êY\˜XÈÛÛšYHØÚ[X]\ØÚHÜšpêÛ]YZØY\œÈ[ˆšYY™\Èœ›Ûš[™Ø[™Ù[‹ˆ]šZ›ˆ[™ØÚ\[ZšÙHX[ÚZžš[™Ù[‹ÙY[ˆÙ™šXÚpêÛH™\ØXÚ[™Ù[šØX\Ùˆ›Û™ÝØ[œÙ[ˆ\ˆ\˜ÙY[ˆ‹‘HZœÝš[\HÛÚÈÜ\š[ÙK™]ÚZœÜÝ]\È[ˆØØ]Y\™XÚ\ÚYKˆ\š[ÙKœ›Ûˆ[ˆ™XÚ\ÚYHÝX[ˆšZˆ\˜Ú[ÛÙÚ\ØÚH][\ÎÈÜ[ˆœ›Ûˆœ™[™Ý™H˜X\ˆHX›XØ]YKˆ‹•ÛÛˆÜØX\\Ý]ØX\™Y[X[ˆY[ˆÙXšYYX[‹ˆœ›Ûš[™Ø[™Ù[ˆ›Û™\ˆØX\ØØ]YHÜšZ™Ù[ˆÙY[ˆ™\ž›Û›™[ˆX\šÙ\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽˆ‹]NˆˆÚÝØ™\ˆŒˆ‹]Nˆ‘›ÜÝÛœÈ[ˆZœÝÙY\™Ø]™H\œÝ[‹Ú[™Ù\Î–È‘HÙ]^™[ZœÝ[ˆÛ™[ˆÙY\ˆ0êpê[ˆZ›™H™XÚËÛÚÈ[ˆÛšÙ\™H[Ù\ÈÜTÛ™Kˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽH‹]NˆHÚÝØ™\ˆŒˆ‹]Nˆ“ZœÝÙY\™Ø]™H›ÛÜˆZÚÙ[ˆ‹Ú[™Ù\Î–È“Ü[ˆHZœÝšZˆY[ˆ™\Ù]ZYÙ[ˆXYÈÙˆ[\ÜÙˆšXHY[H8¡¤ˆZœÝÙY\™Ø]™KˆH˜ZØ[Y\ZÚÙ[ˆ˜[ˆ0êY\˜XÈÝX[ˆ\ˆÛÚÈ[‹ˆ‹–›ÙZÈÜ˜X[H[ˆ›Ý]Y\Ëš[\ˆÜXYÈÙˆØ]YÛÜšYH[ˆÛÜY\ˆÜ˜X[KYœÝ[™˜[˜YˆÔÈÙˆšY]]ÜÝHZËˆ‹™ZÚZšÈH›ÛYYÙH[™›Ü›X]YKÛÛˆY[ˆZÈÜHØX\[ˆÙY\ˆ\YÈ˜X\ˆ^™[™HZœÝˆZYÙ[ˆ[ˆ™]Ù\šØ˜\™HÙYY[H[[ˆšZ›ˆ˜[Z]HZœÝH™]Ù\šÙ[‹ˆ‹‘HZœÝÙXœZZÝ™\ÝX[™HÙYÙ]™[œËˆœ›Û›YÙ[ˆ[ˆ[\ÜÈšZ›ˆ[Y[‹[^™[ŽÈØX\YÙ[‹Û]\™[‹˜[œÜ\˜[YH[ˆ™\Ù][œÝ[[™Ù[ˆ›Z™[ˆ™ZÝY[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽ‹]NˆHÚÝØ™\ˆŒˆ‹]Nˆ”™YÙ[œ˜Y\ˆY[›ÝYYÈÛZ][ˆ‹Ú[™Ù\Î–È”™YÙ[œ˜Y\ˆYYY[ˆZ[YHÛZ][‹ZÛ›Ü[ˆY[ˆ^˜H˜Y\ˆZ]ZÛ›ÜšZˆ]ÙY\ÚYÙ]ˆ‹‘H˜Y\ˆÝ\˜H\›Y[ˆÙ\ÛÝ[‹ˆ™HÙY\œÙÙYÙ]™[œÈ[ˆÜÙ\ÛYÙ[ˆØØ]Y\È›Z™[ˆ™ZÝY[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽÈ‹]NˆHÚÝØ™\ˆŒˆ‹]Nˆ\›Û™\ˆ›ÝË[ÜÛYÈ‹Ú[™Ù\Î–È‘H›ÝÙ[˜ÝYH\È™\ÚZ™\™šZˆ[[‹›Û™Ý[ˆ[ˆ›Ý]\Ëˆ\ˆšZ›ˆÙY[ˆ›ÝË]\ØYÈÙˆ\ØYY[[™Ù[ˆYY\‹ˆ‹‘H\ÙXœZZÝÙY[ˆš\™X˜\ÙHÝÜ˜YÙHYY\‹ˆYÙ[ˆ[[‹[[ˆÜÛX[ˆ[ˆ›Ý][›Ý]Y\È›Z™[ˆ™\ØÚZØ˜X\‹ˆ‹‘Y\™\ˆÜÙ\ÛYÙ[ˆ›ÝÙÙYÙ]™[œÈ›Z™[ˆ™]ØX\™Ü]\\˜X]ˆ\™\›šY]]Ù[ˆÚ\Ý^™HÙYÙ]™[œÈšY]ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽˆ‹]NˆHÚÝØ™\ˆŒˆ‹]Nˆ•™Z[YÙHÜ]\È[ˆ™]›Ý]Ø˜\™H›Ýø &\È‹Ú[™Ù\Î–È”Ü]\[šÝY[ˆ›ÙZÜ™\Ý[][ˆÛÜ™[ˆÙ[˜X[™]™Z[YÙˆX™[[‹ZÜÝ[ˆ™Z[YÙH[šÜÈ›Z™[ˆœZZØ˜X\‹ˆ‹“šY]]ÙH›Ýø &\È™]Ø\™[ˆY\œÝ]›ÛYYÙH™\Ý[™Ü]\\˜X]ˆYY\™\™H›Ýø &\ÈYÙ[ZšÈÚY^™[ˆ™\›Y\ÝÙY[ˆ›Ýø &\ÈYY\‹ˆ‹‘H›ÝÝšY]Ù\ˆÜ[ÚØX[™]ØX\™H›Ýø &\È[ˆÙYY[H›Ýø &\Ëˆ\ØYÝ]\Ë›Ý]Y[[™È[ˆÜšY]]È›Ø™\™[ˆšZ›ˆšXÚ˜X\ˆšZˆHYÙ[ˆ[ˆ[[‹ˆ‹“Ù™›[™H\ØYÈ›Z™[ˆ™]ØX\™ˆXØÛÝ[Ú\ÜÙ[[™È[ˆ™\ÚZ™\š[™È›ÚÚÙ\™[ˆ™\›ÝY\™H\ØY™\Ý[][ŽÈ\œÝ[Ú\ÝÙY[ˆ›Ýø &\Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽH‹]NˆÚÝØ™\ˆŒˆ‹]Nˆ™]›Ý]Ø˜X\ˆÙYY[HYÙ[ˆ™]Ù\šÙ[ˆ‹Ú[™Ù\Î–È‘ÙYY[H[[ˆÛX[ˆ[Y[ˆÙ]ÚZžšYÙH™[[ˆÜˆÙ[ZšÝZ™YÙHÚZžšYÚ[™Ù[ˆX[ˆ™\œØÚ[[™H™[[ˆ›Z™[ˆ™ZYH™ZÝY[‹ˆ‹•ÙYØ[™ÈÙ]™[ˆ[ˆ[™ZÚÙ[ˆÙXœZZÙ[ˆ˜[œØXÝY\Ë›Ù]Ù[ZšÝZ™YÈ™ZY\ˆÙY[ˆ[™\™HYY\ÈÝ™\œØÚšZ™ˆ‹“Ù™›[™H™]Ù\šÚ[™Ù[ˆ›Z™[ˆ\ˆXØÛÝ[Ü]\\˜X]™]ØX\™[ˆÛÜ™[ˆÜšY]]ÈÜÙ\ÛYÙ[ˆ›Ù˜H\ˆ™\˜š[™[™È\ËˆHYÙ[›ZœÝÛÛÜÛYÜÝ]\È[ˆ›Ý][‹ˆ‹šZˆ™\›Ü™[ˆ™]Ù\šÜ™XÚ[ˆÝ[ˆ™HšY]ÜÙ\ÛYÙ[ˆ[ÚZžšYÚ[™Ù[ˆ[Èš]°ê[XYÈ™]Ø\™[‹ˆÜšY]]È›Ø™\™[ˆÚ\ÝÙY[ˆÚØ[HÙYÙ]™[œËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽ‹]NˆÚÝØ™\ˆŒˆ‹]Nˆ”\ÝYÈÜÝ\[ˆ[ˆ™Z[YÈ™\›šY]]Ù[ˆ‹Ú[™Ù\Î–È“ÜÝ\™[œÝ\œÈØXÚ[ˆÜ]Y[ˆ˜[ˆXØÛÝ[[ˆ[œÝ[[™Ù[‹ˆ]ÚZžšYÚ[™ÜÜØÚ\›H™\œØÚZ›Y[›XX[\ˆ™\œÚYKˆ‹‘Y[ˆšY]]ÙH\™\œÚYHÛÜ™ÛX\™Ù^™]›Û™\ˆÛ™\ØXÚ\›Y[ˆZ™[œÈÙXœZZËˆ‹’[œÝ[[™Ù[ˆ™]˜]\™\›šY]]Ù[ˆ[ˆ\™\Ý[™[ˆÜšY]]ÈY[‹ˆ\œÝ[™ZÝY™HÙYÙ]™[œÈ[ˆÙ™›[™ZØX\[ˆ[ˆÛÜ™ÙX›ÚÚÙY\™Z™[œÈÜ˜[YHÙˆ™]Ù\šÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÎH‹]NˆÚÝØ™\ˆŒˆ‹]Nˆ“ÙÚ\ØÚH[ˆÝ™\žšXÚ[ZšÙHØX\YÙ[ˆ‹Ú[™Ù\Î–È‘ZYÙ[ˆYÙ[ˆ[ˆ[\ÜÈX˜™[ˆ[ÈY[ˆ\\HÙXÝYKˆZYÙ[ˆYÙ[ˆÛ™[ˆZY[ZšÈÙˆ™Hš]°êHÙˆÙYY[šZ›‹ˆ‹“ÝYHÛ]\˜ÛÙ\È[ˆ]XÚ\›ÙYÜÙ[ZYÙ[ˆ[[ˆÛÜ™[ˆ\œÝ[˜X\ˆY\Ø˜\™H˜[Y[‹›Û™\ˆ[[ˆH™\ÚZ™\™[‹ˆ‹”š]°ê[YÙ[ˆÝ[›™[ˆšXHH[œÝ[[™Ù[ˆÛÜ™[ˆØ[Y[™Ù]›ÙYÙˆ™\œØÚ[[™H™\œÚY\È˜[ˆ[[ˆ›Z™[ˆ™ZÝY[ˆ[ˆHœ›Û›XYÈÛÛ]šY]\YÈZ]Y[ˆÝYHÛÝYÛÜYKˆ‹“šY]]ÙHXYÈ[ˆ[\Ü\™[ˆÙXœZZÙ[ˆÛÛœÙ\]Y[HÙZÛÞ™[ˆ\Û]\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÎ‹]NˆÚÝØ™\ˆŒˆ‹]Nˆ”š]°êYÙYÙ]™[œÈ™Z[YÈÞ[˜Ú›Ûš\Ù\™[ˆ‹Ú[™Ù\Î–È“Ù™›[™HÚZžšYÚ[™Ù[ˆ›Z™[ˆ™ZÝY[‹ˆÞ[˜Ú›Ûš\Ø]YH›ÙYÝÚZžšYÚ[™Ù[ˆ\ˆ™[[ˆ\ˆ[Ø[Y[ŽÈÙ[ZšÝZ™YÙHÜÛYÈÙXœZZÝY[ˆ˜[œØXÝYKˆ‹•™\ÚZ™\™H[[‹›Û™Ý[ˆ[ˆ›Ý]\ÈÛÛY[ˆšY]\YÈZ]Y[ˆÝY\™HÛÝYÛÜYKˆ‹”š]°êYÙYÙ]™[œË[\ÜÈ[ˆ[œÝ[[™Ù[ˆÛÜ™[ˆ\ˆXØÛÝ[™]ØX\™ˆZ]ÙÙÙ[ˆÜ[Y[ˆ\\HÚØ[HÙ\šÜZ[]NÈ\YÈ[›ÙÙÙ[ˆ\œÝ[™HZYÙ[ˆÙYÙ]™[œËˆ‹“ÝYHÜÛYÝ™\ž›ÙZÙ[ˆ[ˆÙYY[K[XYÝ™\˜š[™[™Ù[ˆÝ[›™[ˆ˜HY[ˆXØÛÝ[Ú\ÜÙ[[™ÈÙY[ˆÙYÙ]™[œÈYY\ˆ[ˆHšY]]ÙHÙ\šÜZ[]H™][‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÍÈ‹]NˆÚÝØ™\ˆŒˆ‹]Nˆ‘ZYÙ[ˆ[[›YÙ[ˆY[›ÝYYÈ[[ˆ‹Ú[™Ù\Î–È“šY]]ÙH[[›YÙ[ˆ™YÚ[›™[ˆš]°êKˆšXH[[ˆÙYYˆ™HÙYØ[™ÈÛHH™ZÚZšÙ[ˆÙˆØ[Y[ˆH™]Ù\šÙ[ŽÈ™\ÝX[™H[[ˆØX[ˆYYKˆ‹’[\ÜÈ›Z™[ˆ™[œÝ[™YÙH[\ÜËˆY\™\ˆÙYÙ]›ÙYÙH[[ˆ›Z™[ˆ™ZÝY[ˆ[ˆY[ˆZYÙ[ˆ[[›XYËÜÈ˜[ˆH[\Üˆ‹•˜[œÜ\˜[YHÙ\šÝÛÚÈ›ÛÜˆšXÚ˜\™H[\ÜËˆ\TØÜš\Y›Ý][ˆšZ›ˆ\œÝ[[ˆX›XØ]YHÛÛ›ÛY\\\È[ˆ™YÜ™\ÜÚY\Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÍˆ‹]NˆŒÈÚÝØ™\ˆŒˆ‹]Nˆ‘[[ˆÜ[ØšY[[ˆ0êpê[ˆÙZÛÞ™[ˆXØÙ[Û]\ˆ‹Ú[™Ù\Î–ÈYH[[ˆYYY[ˆ›ÛYYÈœ™YYY™\Ý™[Y]K[XZ[Ù]Ù[˜›Ü™ZY[ZšÙHX™[È[ˆY[ˆ\\H™XÚ[šÙ]^™Kˆ‹‘Y[ˆÙ\ÛXYÙHY[XÝYHÛÛ\™XÝHYH[ˆY[ˆ™]™\ÝYÚ[™ËˆÛ™Ù[YÙHY™\ÜÙ[‹Ûœ™ZÙ[™HX[›Y[[™È[ˆÜÛYÙ›Ý][ˆÛÜ™[ˆšXÚ˜X\ˆÙ[Y[ˆ‹™YY[š[™È[ˆ™[œÝ\œÈ›ÛÙ[ˆHÙZÛÞ™[ˆXØÙ[Û]\ˆ[ˆXÚH[ˆÛšÙ\™H[Ù\Ëˆ[œÝ[[™Ù[ˆšZ›ˆ™]]˜X[ÈXYÚÛ]\™[ˆÝX[ˆXÚ\ˆXYÚÛ]\ˆÚY^™[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÍH‹]NˆŒÈÚÝØ™\ˆŒˆ‹]NˆYK[YÙ[ˆ™\œØÚZ›™[ˆ˜HX[›XZÙ[ˆ‹Ú[™Ù\Î–È‘Y[ˆÝXØÙ\Ý›ÛX[™Ù[XXZÝHYK[XYÈ™\œØÚZ›\™XÝÛ™\ˆZZ›ˆYÙ[ŽÈHÛÝY™\˜š[™[™ÈÛÜ™ÜšY]]ÈÙ\Ý\ˆ‹‘Y[ˆZ\ÛZÝHY]™\˜š[™[™ÈÛÛY[ˆY[[™ÈY]ÜšY]]È›Ø™\™[ˆ[ˆ\œÝ[šZˆ\YÚÙY\ˆ˜X\ˆH\ˆ‹’[™X]YÈÞ[˜Ú›Ûš\Ù\™[ˆ™ZÝYYK[YÙ[‹ˆYK[YÙ[ˆY][Y[ˆÚZšÜ™XÚ[ˆšZ›ˆÛÚÈšXÚ˜X\ˆ[ˆZZ›ˆYÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÍ‹]NˆŒÈÚÝØ™\ˆŒˆ‹]Nˆ‘š\™X˜\ÙK\™YÙ[È›ÛÜX[ˆ]]ÛX]\ØÚ‹Ú[™Ù\Î–È‘Ú]XˆYYHY[ˆ\\HÛÜšÙ›ÝÈYHš\™\ÝÜ™HÙXÝ\š]H[\È]]ÛX]\ØÚ˜X\ˆš\™X˜\ÙHX›XÙY\ˆ‹“˜HY[ˆY[›X[YÙHÙ\šXÙXXØÛÝ[ZÛÜ[[™ÈÙYš\™X˜\ÙHšY]YY\ˆ[™X]YÈšZ™Ù]Ù\šÝHÛÜ™[ˆšZˆÚZžšYÚ[™Ù[ˆX[ˆš\™\ÝÜ™Kœ[\Ëˆ‹‘Y[ˆYK[XYÈÙYYšZˆY[ˆ™XÚ[™›Ý]›ÛÜX[ˆY[ˆZY[ZšÙHY[[™È]Hš\™\ÝÜ™K\™YÙ[ÈšY]šZ›ˆÙ\X›XÙY\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÌÈ‹]NˆŒÈÚÝØ™\ˆŒˆ‹]Nˆ”™\Ù]ÈÜÙ\ØÚÛÛ™[ˆ0êY\˜XÈ\YÈ‹Ú[™Ù\Î–È‘]XÝYH˜\Ú\È[ˆ\œ™Z[˜[˜[\ÙHšZ›ˆ™\ÚZ™\™È]XÝYHZ]ÙXœ™ZYY]›ÛÜX[ˆ]XÝYH[ˆ\ÈH˜\ÝH]XÝYK\™\Ù]ˆ‹“šY]]ÙH[ˆÙ]ÚZžšYÙH˜\ÝH™\Ù]È™\œØÚZ›™[ˆ˜HY[ˆ\]H]]ÛX]\ØÚÈ™\Ù]\ÈX\›ÛÜˆšY]YY\ˆ›ÙYËˆ‹’ÛÙÝZØX\[ˆQTˆÙXœZZÙ[ˆ0êpê[ˆ\˜ÑÒTÈØX\™Y[[ˆX]È˜[ˆÜÈÙ\Ý™]ÚHYÙ[Ë›Ù]HšXÚ˜\™HÛ]\˜›ÚÚÙ[ˆ[ˆ˜Y[ˆ™\™ÚZ›™[‹ˆ‹SRÈ[Û[Y[[ˆÝX][ˆH™Y\›[™ÙH™[™\Ù]ÈÝ[™X\™ÜŒ	Kˆ‹•0êY\˜XÈŒˆ\È\YÈY]H›ÛYYÙH˜\ÝHÛ™\ž›ÙZÜÜÙ]ˆ\˜Ú[ÛÙÚYK™^šY[œÝØX\™YÚY[‹Z[™\˜[[‹›ÜÜÚY[[‹Ø[™[›Ý]\È[ˆH™[]˜[H\œ™Z[›YÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÌˆ‹]NˆŒÈÚÝØ™\ˆŒˆ‹]NˆŒNL[ˆNL[ÈÛÛXš[™Y\˜˜\™H\ÝÜš\ØÚHYÙ[ˆ‹Ú[™Ù\Î–È•RÈNL[ˆ›Û›™X›Y[ˆNLšZ›ˆšY][™Ù\ˆ^Û\ÚY]™H˜\Ú\ÚØX\[ˆ[ˆÝ[›™[ˆYÙ[ZšÈY]XÚ›ÝÈ“ÛÜ™[ˆÙXœZZÝˆ‹™ZYH\ÝÜš\ØÚHYÙ[ˆX˜™[ˆY[ˆZYÙ[ˆ˜[œÜ\˜[Y\ÛY\ˆ[ˆÝ[›™[ˆ\ÙÙ]Ù[œÝÛÚÈYÙ[ZšÈšXÚ˜X\ˆšZ›‹ˆ‹‘H™\Ù]ÈNL[ˆNLÙXœZZÙ[ˆXÚ›ÝÈ“[ÈÛ™\›XYÈ[ˆÝY[ˆSRÈ[Û[Y[[ˆXÝYY‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÌH‹]NˆŒÈÚÝØ™\ˆŒˆ‹]NˆSRÈ[Z™šXÚ˜X\ˆ[ˆ™[™\Ù]È‹Ú[™Ù\Î–È’ÛÙÝZØX\QT‹Ù[Û[Ü™›ÛÙÚYKNL[ˆNLÛ™[ˆ[Z™ÛÚÈSRÈ[Û[Y[[‹ˆ‹‘HÙZÛÞ™[ˆ\œ™Z[‹HÙˆ\ÝÜš\ØÚHXYÈÝX]ÜL	NÈSRÈ›Z™[ÈZY[™H™Y™\™[Y[XYÈXÝYY‹ˆ‹•Ú\ÜÙ[[ˆ\ÜÙ[ˆ™\Ù]ÈÝY^™[™HØØ]YH[ˆ›ÛÛH˜\Ýˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÌ‹]NˆŒÈÚÝØ™\ˆŒˆ‹]Nˆ”Û™[H™[™\Ù]È›ÛÜˆZÚÙ\›š]™X]H‹Ú[™Ù\Î–È“šY]]ÙH™\Ù]ÈÛÙÝZØX\QTˆ[ˆÙ[Û[Ü™›ÛÙÚYHØÚZÙ[[ˆ\™XÝ˜X\ˆ0êpê[ˆ[˜[\ÙX™Y[ÜL	HZÚÚ[™Ëˆ‹‘[ÙH™[™\Ù]™][™\™HÝ™\›^\ÈZ]›Ù]Ú\ÜÙ[[ˆÙY[ˆ[™X]YÈXYØ™ZY\ˆYY\ˆœ˜XYÝˆ‹‘HZYYÙHØX\ÜÚ]YH[ˆ›ÛÛH›Z™[ˆÝX[ŽÈH™\Ù]ÈšZ›ˆ™YÙ[ÛHÜ^™[™HZÚÙ\ˆÛ™[\ÜÙ[ˆ\œ™Z[˜™Y[[ˆHÚ\ÜÙ[[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽH‹]NˆŒÈÚÝØ™\ˆŒˆ‹]Nˆ‘ZYÙ[ˆ™\Ù]ÈÝ[›™[ˆÙYÈ‹Ú[™Ù\Î–È–™[™Ù[XXZÝH™\Ù]ÈX˜™[ˆHY[ˆ™\ÚZ™\šÛ›Ü[ˆ]™\Ù]™[œÝ\‹ˆ‹“˜H™]™\ÝYÚ[™ÈÛÜ™[Y[ˆYHZYÙ[ˆ™\Ù]™\ÚZ™\™ÈHšYHÝ[™X\™™\Ù]È›Z™[ˆ™\ØÚ\›Yˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽ‹]NˆŒÈÚÝØ™\ˆŒˆ‹]Nˆ‘œ˜[šÜšZšÈŒˆÜšZ™ÝH[Z]Ù^›ØÚH[[ˆ\YÈ‹Ú[™Ù\Î–È‘H™\ÝX[™HXYÈœ˜[šÜšZšÈŒˆÛÜ™0êpê[›X[YÈ]]ÛX]\ØÚÙ][Y]HY\™\ˆØ[Y[™Ù\Ý[H0êY\˜XËÔ]Y\˜ÞK\Ù]ˆ‹‘HÙ]™]˜]\˜Ú[ÛÙÚ\ØÚHZÚÙ[‹™^šY[œÝØX\™YÚY[‹Z[™\˜[[‹ÙÙ[ÛÙÚYK›ÜÜÚY[[ˆ[ˆÝ\[[ˆ˜[ˆØ[™[›Ý]\ÈZ]H[X[Ù^šYÙH]XÝY]Kˆ‹™\ÝX[™HZYÙ[ˆØš™XÝ[ˆ›Z™[ˆÝX[ŽÈ[Y[ˆÛœ™ZÙ[™H˜\ÝH[[ˆÛÜ™[ˆÙYÙ]›ÙYÙ[ˆœ›Ûš[™›Ü›X]YH›Z™[ˆHÜ\™\ØÚZØ˜X\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÈ‹]NˆŒÈÚÝØ™\ˆŒˆ‹]Nˆ•˜[œÜ\˜[YH[Y[ˆ›ÛÜˆØX\YÙ[ˆ‹Ú[™Ù\Î–È‘ZYÙ[ˆYÙ[ˆÛ™\ˆZZ›ˆYÙ[ˆ™\œØÚZ›™[ˆšY]YY\ˆ[ˆ˜[œÜ\˜[YKˆ‹“ZZ›ˆ›Û™Ý[ˆ[ˆÙpëÛ\ÜY\™HYÙ[ˆ›Ø[Èœ˜[šÜšZšÈŒˆÝY[ˆ[ˆ›Ü›X[HšXÚ˜X\šZY›Û™\ˆÝ™\˜›ÙYÙH˜[œÜ\˜[Y\ØÚZY‹ˆ‹•˜[œÜ\˜[YH›Z™™YÙ[›ÛÜˆXÝY]™HØX\H[ˆ[˜[\Ù[YÙ[ˆ›Ø[ÈQT‹Ù[Û[Ü™›ÛÙÚYH[ˆÛÙÝZØX\[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËˆ‹]NˆŒˆÚÝØ™\ˆŒˆ‹]Nˆ“ZZ›ˆYÙ[ˆY[›ÝYYÙ\ˆ™Z\™[ˆ‹Ú[™Ù\Î–È‘ZYÙ[ˆ[YÙ[ˆ[ˆYK[YÙ[ˆÝ[›™[ˆH\™XÝÛ™\ˆZZ›ˆYÙ[ˆÛÜ™[ˆ\››Ù[Y[ˆ˜[ˆÛ]\ˆ™\˜[™\™ˆ‹YX™ZY\ˆÝX]›ÛÜX[ˆ\™XÝšZˆHYK[XYÎÈ[Y[ˆHZYÙ[˜X\ˆØ[ˆ˜X[KÛ]\‹Y[ˆ[ˆ™\ÚZ™\™[ˆ™Z\™[‹ˆ‹‘ÙpëÛ\ÜY\™HYÙ[ˆÝ[›™[ˆH\™XÝÛ™\ˆZZ›ˆYÙ[ˆÛÜ™[ˆ\››Ù[YÈÙZÛÜ[H[™X]YÙH[[ˆ›ÛÙ[ˆ^™[™H˜X[Kˆ‹‘ÙYY[H[\ÜYÙ[ˆ˜[ˆY[X[™[™\œÈ›Z™[ˆÚØX[™\ØÚ\›YYÙ[ˆ\››Ù[Y[ˆÙˆ™\ÚZ™\™[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËH‹]NˆŒÌÙ\[X™\ˆŒˆ‹]Nˆ”\ÝYÙHØX\™YY[š[™È[ˆÛÛ\]H˜[œÜ\˜[YH‹Ú[™Ù\Î–È“XÚ›ÝÈ[ˆØ][Y]™YÚ[›™[ˆY]Y[ˆ˜\ÝHšY\šØ[HZ™™Z\ÚÛ›ÜˆHÛX[H˜X\šÙ]^™HÜ[ÛZÛÙÈ˜X\ÝHØX\Û›Ü[‹ˆ‹•˜[œÜ\˜[YHÛÛ[HXÝY]™H™YÙ[˜\™HYÙ[‹[˜Û\ÚYYˆZYÙ[ˆ[\ÜYÙ[ŽÈ[™ÙHZœÝ[ˆØÜ›Û[ˆš[›™[ˆ][™Y[ˆ‹[HØÚZ]™[‹ÛÚÈZÜÝÜ›ÛÝKÙXœZZÙ[ˆÜ›Ý\™HY™Ù\›Û™HšY\šØ[HÜ™\[ˆ[ˆY[ˆZ[Y\ˆX[œ˜XZÙÙXšYY[ˆHÙZÛÞ™[ˆZ\ÜÝZ›ˆ‹’˜X\šÙ]^™H[ˆ˜[œÜ\˜[YH›ÛÙ[ˆH0êpê[‹]™[œÝ\‹\™YÙ[[ˆÛ™\œÝ][™[ˆXÚH[ˆÛšÙ\™H[Ù\Ëˆ‹–›ÛÛY[ˆÝ™\œØÚšZ™H[™Ù\Ý[HR‹ÓQT‹]˜[œÜ\˜[YHšY]YY\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌË‹]NˆŒÌÙ\[X™\ˆŒˆ‹]NˆYK[XYÈ›Z™XÚÝX[ˆ‹Ú[™Ù\Î–ÈYK[YÙ[ˆ›Z™[ˆHÛÚÈÚØX[™ZÝY[ˆØ[›™Y\ˆHÝYH[\ÜYY[Þ[˜Ú›Ûš\Ø]YH™\™\œÝˆ‹‘HYK[XYÈ›Z™›ÛYYÈZ][ˆHš]°êH\Ù\œË\Þ[˜È[ˆÙXœZZÝ[Y[ˆHZYÙ[ˆYS^Y\œËXÛÛXÝYKˆ‹’Y\›YYH\ÈH›Ý]H›ÛÜˆ0êpê[ˆÙ^˜[Y[›ZšÙHXYÈY]YY\™\™HÙXœZZÙ\œÈXÚš\ØÚÙ\ØÚZY[ˆ˜[ˆHÝYH[\Ü[[™Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÈ‹]NˆŒÌÙ\[X™\ˆŒˆ‹]NˆYK[XYÈ™Z[YÈY™Ù\›Û™‹Ú[™Ù\Î–ÈYK[YÙ[ˆÙXœZZÙ[ˆ0êpê[ˆÙYY[Hš\™\ÝÜ™KXœ›Ûˆ›ÛÜˆ[HY[™[Y\œÎÈZ[™ÙXœZZÙ\œÈÙ]™[ˆ™[ˆÙY[ˆš\™X˜\ÙK\›Ú™XÝ[ˆHšXÚ[‹ˆ‹[Y[ˆHZYÙ[˜X\ˆ™ZY\˜X[KÛ]\ˆ[ˆY[ŽÈ™]Ù\šËXYY\È[ÙÙ[ˆ[[ˆÙ]›ÙYÙ[‹ÚZžšYÙ[ˆ[ˆ™\ÚZ™\™[ˆ[ˆÚZšÙ\œÈšZ›ˆXÚ™XY[Û›Kˆ‹YK[YÙ[ˆ›Z™[ˆ›ÛYYÈZ][ˆHÝYHš]°êKH[ˆ[\ÜXYË\Þ[˜Ëˆ‹‘Hš\™\ÝÜ™K\™YÙ[È™\ØÚ\›Y[ˆ]ZYÙ[˜X\œØÚ\[ˆÙ]™[ˆ[™XÚ[ˆ[Y[ˆX[ˆZYÙ[˜X\ˆ[ˆ^XÚY]H™]Ù\šÙ\œËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒˆ‹]NˆŒÌÙ\[X™\ˆŒˆ‹]NˆYK[XYÈÛX\ˆ›ÛÜˆHY\œÝH\Ý‹Ú[™Ù\Î–È”™XY[Û›HYY\ÈÜšZ™Ù[ˆ™\™Ù[œÈ™]Ù\šËHÙˆ™\ÚZ™\šÛ›Ü[ˆ›ÛÜˆÙYY[H[[‹ˆ‹‘›Ýø &\ÈšZ›ˆ[ˆHY\œÝHYK]™\œÚYH™]Ý\ÝZ]Ù\ØÚZÙ[Ý]ÙYY[H›ÝË[ÜÛYÈ\\\ÈÙ\™YÙ[ˆ‹YK[YÙ[ˆ›Z™[ˆ™ZÝY[ˆØ[›™Y\ˆHÝYH[\ÜYY[Þ[˜Ú›Ûš\Ø]YH™\™\œÝˆ‹•™\ÚZ™\™[ˆ˜[ˆÜ›ÝHYK[YÙ[ˆYYÙY[ˆš\™\ÝÜ™H˜]Ú[ZY]YY\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒH‹]NˆŒÌÙ\[X™\ˆŒˆ‹]NˆYK[YÙ[ˆ‹Ú[™Ù\Î–È“šY]]ÙHZYÙ[ˆYÙ[ˆÝ[›™[ˆH[Èš]°ê[XYÈÙˆ[ÈYK[XYÈÛÜ™[ˆX[™Ù[XXZÝˆ‹YK[YÙ[ˆšZ›ˆ0êpê[ˆÙ^˜[Y[›ZšÙHš\™\ÝÜ™K[XYÎˆ[[ˆÛÜ™[ˆ\ˆ[™X[[YHÙYY[[ˆÝ™\œØÚšZ™[ˆšY]H[HXYËˆ‹‘HZYÙ[˜X\ˆØ[ˆYY\ÈšXHÛÛÙÛKYK[XZ[Y™\ÈÙ]›ÙYÙ[ˆY]™ZÚZšÙ[‹HÙˆ™]Ù\šÜ™XÚ[‹ˆ‹“˜X[H[ˆÛ]\ˆ˜[ˆY[ˆYK[XYÈÛÜ™[ˆÙYY[È™XY[Û›HYY\ÈÝ[›™[ˆÙY[ˆ[[ˆÙ]›ÙYÙ[‹ÚZžšYÙ[ˆÙˆ™\ÚZ™\™[‹ˆ‹YK[YÙ[ˆ›Z™[ˆZ][ˆHÝYH\Ù\œË\Þ[˜È[ˆH™\ÝX[™H[\ÜYY[[˜ÝYKˆ‹”™\Ù]ÈÛÝY[ˆHÛÚÈÙ]ÛÛ™H[YÙ[ˆ[ˆYK[YÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒ‹]NˆŒŽHÙ\[X™\ˆŒˆ‹]Nˆ’ØX\ÜÚ]YH[Y[ˆ[È™H]Ú[‹Ú[™Ù\Î–È‘Y[ˆšY]]ÙH™\Ù]™]ØX\Ý[™X\™ÙY[ˆØX\ÜÚ]YHÙˆ›ÛÛKˆ‹šZˆ]Ù]›ÙYÙ[ˆ˜[ˆY[ˆ™\Ù]Ý[ˆ™HH™]Ý\ÝØØ]YH	ˆ›ÛÛHÛÝY[ˆX[š[šÙ[‹ˆ‹–›Û™\ˆš[šÚ™HÙ\šÝH™\Ù]›Ø[ÈH›Ü›X[H]XÝ\™\Ù]È[ˆ›Z™HØX\ÝX[ˆØX\ˆ™H™[ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËNH‹]NˆŒŽHÙ\[X™\ˆŒˆ‹]Nˆ‘ZYÙ[ˆ™\Ù]ÈÛÝY[ˆÛÚÈHZÈ‹Ú[™Ù\Î–È‘Y[ˆšY]]ÈX[™Ù[XXZÝH™\Ù]™]ØX\›ÛÜX[ˆ]]ÛX]\ØÚHZYYÙHØX\ÜÚ]YH[ˆ›ÛÛKˆ‹‘X\™ÛÜˆØ[ˆY[ˆ˜ZØ[YKHÙˆ›Ú™XÝ™\Ù]Y]0êpê[ˆZÈ›ÝÙ[HZ\ÝHYÙ[ˆ[ÈHZ\ÝH™YÚ[ÈÜ[™[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËN‹]NˆŒŽHÙ\[X™\ˆŒˆ‹]Nˆ“QTˆ›Z™ÜšZ›ˆZÈ‹Ú[™Ù\Î–È‘H™Y\›[™ÙHR‹ÓQT‹[YÙ[ˆÙXœZZÙ[ˆ›ÛÜX[ˆYÙ[ÙY\™Ø]™H[ˆX]È˜[ˆ0êpê[ˆÜ›ÛÝ\˜ÑÒTËX™Y[ˆ‹‘X\™ÛÜˆØÚY]QTˆšZˆ[‹H[ˆZ]›ÛÛY[ˆšY]YY\ˆ\YÈ˜X\ˆH›ÜšYÙH™Y[ÜÚ]YKˆ‹‘^™[™Hš^Ù[›ÛÜˆRˆÛÙÝZØX\[ÚYK][KZ[ÚYKÚYY™[YYˆ[ˆ[[™Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËMÈ‹]NˆŒŽHÙ\[X™\ˆŒˆ‹]Nˆ”™\Ù]È[ˆÙYY[HYÙ[ˆ‹Ú[™Ù\Î–È‘HÝ[™X\™™\Ù]ÈšZ›ˆ\YÙÙXœ˜XÚÝ]XÝYH˜\Ú\Ë]XÝYHZ]ÙXœ™ZY[ˆ\œ™Z[˜[˜[\ÙKˆ‹”™\Ù]È™]Ø\™[ˆ›ÛÜX[ˆH›ÛYYÙHØX\Ý]\Ë[˜Û\ÚYYˆZZ›ˆYÙ[ˆ[ˆ˜[œÜ\˜[YKZ[œÝ[[™Ù[‹ˆ‹‘Y[ˆXYÈZ]ZZ›ˆYÙ[ˆØ[ˆHšXHY[ˆÛÛÙÛKYK[XZ[Y™\ÈÛÜ™[ˆÙYY[[È[Y[ˆ™ZÚZšÙ[ˆÙˆØ[Y[ˆ™]Ù\šÙ[‹ˆ‹‘HÛ˜[™Ù\ˆÜšZ™ÝH›ÛYYÙHÙYY[HXYÈ]]ÛX]\ØÚÛ™\ˆZZ›ˆYÙ[ˆ˜HÞ[˜Ú›Ûš\Ø]YNÈÜšY]]È[\Ü\™[ˆ\ÈšY]YY\ˆ›ÙYËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËMˆ‹]NˆŒŽHÙ\[X™\ˆŒˆ‹]NˆSRÈ™\™šZ›™[ˆ›Û™\ˆÙYÙH‹Ú[™Ù\Î–È“[Û[Y[š[\ˆY]›ÛÜX[ˆSRÈÛÜž›ÙZÙ[ˆ[ˆš[\\™XÝZ™[œÈ\[ŽÈHÝ™\˜›ÙYÙHX[‹ÝZ]\ØÚZÙ[X\ˆ\È™\ÚZ™\™ˆ‹’]™[œÝ\ˆÜ[šY]YY\ˆ]]ÛX]\ØÚ]Ù]Ù[˜›Ü™ØX\™ÛÜˆSÔÈÙY[ˆÛ››ÙYÙHZËH[ˆ›ÝË[ÜY\ÈYY\ˆÝ™\ˆHØX\YÝˆ‹‘H[\ˆX]\™XÝšY[ˆÙ]™Y[[Û[Y[[ˆ˜[ˆ]ÝX[šXÚ˜X\ˆ›Z™[ˆ[ˆÚ\ÜÙ[ˆÝX]ÜY[ˆÙÚ\ØÚHZËˆ‹’]™YÛÛÜ™š[\ˆÙ\šÝHÛÚÈXÚÜSRÈ›ÛYZ[œËÝY[Z™œ›ÙYÙHQK]HQH[ˆÝ™\šYÎÈ›ÛÜšY[ˆ™\œØÚY[ˆHÛ›ÜX\ˆÙ[XX\ˆÙ\™[Y[ˆSRÈ[Û[Y[[ˆÙYš[\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËMH‹]NˆŒŽHÙ\[X™\ˆŒˆ‹]Nˆ”\ÝYÙH\]\È[ˆ™]›Ý]Ø˜\™H™\Ù]È‹Ú[™Ù\Î–È‘]XÝ™Y[]Y[ˆšY]]ÙHÐK]™\œÚYHšY]YY\ˆZ™[œÈÙXœZZÈÝ™\ŽÈY[ˆ\]HÛÜ™\ÈXÝYYˆ˜HY[ˆ›Ü›X[H›ÛÙ[™HÝ\ˆ‹”™\Ù]ÜÛX[ˆ™]ØX\HÛÚÈH˜[œÜ\˜[YH˜[ˆHXÝY]™HYÙ[‹ˆ‹”™\Ù]ÈY]Y[ˆ˜\ÝHØX\Ý[™›Ø[Èœ˜[šÜšZšË™]Ø\™[ˆšZˆÝ™\œØÚšZ™[ˆÛÚÈ[ˆXÝY[HØX\ÜÚ]YH[ˆ›ÛÛKˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËM‹]NˆŒNHÙ\[X™\ˆŒˆ‹]Nˆ‘œ˜[šÜšZšË\™\Ù]›Z™ÝX[ˆ[ˆÜšZ™ÝÙYY[HZYÙ[ˆXYÈ‹Ú[™Ù\Î–È•ÚZžšYÚ[™Ù[ˆX[ˆœ˜[šÜšZšÈ0­È0êY\˜XÈÜšZ™Ù[ˆHY[ˆÚØ[HÚZžšYÚ[™ÜÝZ™ˆšZˆÞ[˜Ú›Ûš\Ù\™[ˆÚ[HšY]]ÜÝH™\œÚYH[ˆX]È˜[ˆ]Y[ˆÝY\™HÛÝYÛÜYHH™\Ù]šZˆ\œÝ\\YÞ™]ˆ‹šZˆ]Ü[™[ˆ˜[ˆHœ˜[šÜšZšË\™\Ù]ÛÜ™Û™\ˆZZ›ˆYÙ[ˆ]]ÛX]\ØÚH˜\ÝHXYÈœ˜[šÜšZšÈ0­È0êY\˜XÈX[™Ù[XXZÝˆ‹‘YHXYÈÙXœZZÝÜYY\ˆ\\˜X]^™[™H[šÝYÚ\Ú[ˆØ[ˆšXHXYÚ[œÝ[[™Ù[ˆY]™]Ù\šÙ[ˆÛÜ™[ˆÙYY[ˆX\™ÛÜˆÝ[›™[ˆšZˆ[ˆ[™H[[ˆX[ˆ^™[™Hœ˜[šÜšZšË[XYÈÙ]›ÙYÙ[ˆ[ˆÞ[˜Ú›Ûš\Ù\™[ˆ›Û™\ˆH[™ÙX›Ý]ÙHÛ™\ž›ÙZÜð«[YÙ[ˆ™[ˆHÚZžšYÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËLÈ‹]NˆŒNHÙ\[X™\ˆŒˆ‹]Nˆ“Y][‹ZÙ[™[ˆ[ˆÙY\ˆ\œÝ[Ü[ØšY[‹Ú[™Ù\Î–È“Y][ˆ[ˆZÙ[™[ˆ][ˆØX\ZÚÙ[ˆÙY\ˆÛÜˆ˜X\ˆÜ[“^Y\œÎÈ]˜[œÜ\˜[HšZ™[œÝ\ˆYÙHÛžšXÚ˜X\ˆY[ˆØÚ\›][[™HÛZÛXYÈÝ™\ˆHØX\ˆ‹•Z™[œÈY][ˆ[ˆZÙ[™[ˆÛÜ™[ˆÙ]ÛÛ™HØX\ÛZÚÙ[ˆšY]YY\ˆYÙ[ZšÈ[ÈÜ\ÛZÈY™ÙZ[™[›Ù]ÝXÚ™YY[š[™ÈÜØY˜\šH[ˆÚ›ÛYH›ÛÜœÜ[˜X\ˆ›Z™ˆ‹‘HÙY\ÚYÙ]ÙXœZZÝšZˆÔË[ØØ]Y\ÈÙY\ˆHZ\ÝH[™ÝYÜ˜XYˆÔÈ™]ØX\™ÎÈHÚYÙ]\È\ˆÛ™Ù[ZÈÛˆ[ˆÝ]\™HX\™ÛÜˆÜ[Y›ÛÛœÈY[ˆÛ™Ù[YÙHÛ™Ú]YH˜X\ˆHÙY\˜œ›Û‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËLˆ‹]NˆŒNHÙ\[X™\ˆŒˆ‹]NˆÛÝYÞ[˜È›ÚÚÙY\šY]YY\ˆÜYÙHÜ[Û™[H™[[ˆ‹Ú[™Ù\Î–È‘š\™\ÝÜ™H™YÙY\›ÛÜX[ˆÜ[Û™[H™[[ˆY]ØX\™H[™Yš[™Y[ˆX]È˜[ˆH›ÛYYÙHÞ[˜Ú›Ûš\Ø]YHYˆHÙ]\™[‹ˆ‹’Y\›YYHÛÜ™H›Ý]8 '[˜Ý[ÛˆÙ]ØÊ
HØ[YÚ][˜[Y]x 'HšZˆÛÝYÞ[˜ÈÜÙ[ÜÝˆ‹‘^™HX[œ\ÜÚ[™ÈÙ[Ù[˜X[›ÛÜˆ[H]XÝXÛÝYÜš]\Ë›Ù]]™[™H›Ø›Y[HšY]ÜY[ˆ[™\ˆÜ[Û™Y[™[\YÚÛÛ]ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËLH‹]NˆŒNHÙ\[X™\ˆŒˆ‹]Nˆ˜\Ú\ÛYÙ[ˆÚØX[šY]]ÙH[[ˆØ[Y[ˆ‹Ú[™Ù\Î–È‘ÙpëÛ\ÜY\™H˜\Ú\ÛYÙ[ˆ›Z™[ˆ›ÛÜX[ˆ›ÛYYÈÚØX[È]XÝÞ[˜Ú›Ûš\ÙY\HØ\™H[\Ü™\Ý[™[ˆšY]YY\ˆ˜X\ˆHÛÝYˆ‹‘^™[™H˜\Ú\ÛXYÈØ[ˆ™HÙ]ÛÛÛˆ\ˆXZ[[[ˆ[ˆÜYY\ˆ\\˜X]\\[\Ü\™[‹ˆ‹‘]XÝ\šÙ[ÙYH[\ÜÈ˜[ˆ]™[™H™\Ý[™X[ˆ^™[™H[šÝYÚ\Ú[ˆÛÜ[X\ˆ]]ÛX]\ØÚ^™[™HÙYY[H[[›XYÈX[‹ˆ‹[Y[ˆ[[ˆYH™H]\ˆX[ˆ›ø &[ˆXYÈÙ]›ÙYÝÛÜ™[ˆY]HÙZÛÞ™[ˆYYX™]Ù\šÙ\ˆÙ\Þ[˜Ú›Ûš\ÙY\™ˆ‹’šZˆ[ˆ[™HÝ[›™[ˆX\™ÛÜˆ^™[™HÙ\Ý[[Z[™Ù[‹H[ˆ›Û™Ý[›XYÈÚØX[X˜™[ˆ\ÚZ›šY]]ÙH[[ˆ˜HÞ[˜Ú›Ûš\Ù\™[ˆšZˆ[X™ZH™\œØÚZ›™[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËL‹]NˆŒNHÙ\[X™\ˆŒˆ‹]NˆÛÝYÞ[˜È›Û™\ˆš\™X˜\ÙHÝÜ˜YÙH‹Ú[™Ù\Î–È‘ÙpëÛ\ÜY\™H[ˆÙYY[HYÙ[ˆÙXœZZÙ[ˆ›ÛÜX[ˆ[Y[ˆš\™\ÝÜ™NÈY[ˆ›^™KX™]X[XØÛÝ[›ÛÜˆš\™X˜\ÙHÝÜ˜YÙH\ÈšY]YY\ˆ›ÙYËˆ‹‘Ü›ÝHYÙ[ˆÛÜ™[ˆ]]ÛX]\ØÚÜÙ\Ü]Ý[ˆÛZ[™Hš\™\ÝÜ™KYØÝ[Y[[‹›Ù]Þ[˜Ú›Ûš\Ø]YHš[›™[ˆHØÝ[Y[[ZY][ˆ›Z™ˆ‹‘ÙYY[HYÙ[ˆY][™H›Z™[ˆ[˜Û\ÚYYˆ[™X]YÈÙYÙ]›ÙYÙH[[ˆÞ[˜Ú›Ûš\ÙY\˜˜X\ˆY][Y[ˆš\™\ÝÜ™K\™YÙ[Ëˆ‹‘Hš\™X˜\ÙKXÛÛ™šYÝ\˜]YHÙXœZZÝÙY\ˆZ]ÛZ][™š\™\ÝÜ™K\ÜÙ[™šZˆHZYYÙHÛZ[™HÙXœZZÙ\œÙÜ›Ù\ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËH‹]NˆŒNHÙ\[X™\ˆŒˆ‹]Nˆ‘ÙYY[HYÙ[ˆ›Z™[ˆXÚÙ[ZšÈ‹Ú[™Ù\Î–È’[™X]YÈÙYÙ]›ÙYÙH[[ˆšZˆY[ˆÙYY[HÙpëÛ\ÜY\™HXYÈÛÜ™[ˆHØ[Y[ˆY]YHXYÈÙ\Þ[˜Ú›Ûš\ÙY\™ˆ‹[ÈšZˆšZ›ÛÜ˜™Y[Y[ˆšY]]ÙHÙ\Ý[[Z[™ÈÙ]›ÙYÝšY]Y[ˆYYX™]Ù\šÙ\ˆYH˜HÞ[˜Ú›Ûš\Ù\™[ˆÛÚÎÈ[™\œÛÛHÙ\šÝ]™[™Kˆ‹“Û˜[™Ù[ˆÙYY[H[[›YÙ[ˆÛÜ™[ˆšY]YY\ˆ[ÈZYÙ[ˆ\œÛÛÛ›ZšÙHÛÝYXYÈÜÙ\ÛYÙ[‹›Ù]\ˆÙY[ˆX˜™[HÛÜYpêÛˆÛÝX[‹ˆ‹‘ZYÙ[ˆYÙ[ˆ˜[ˆ[™\™HÙXœZZÙ\œÈ›Z™[ˆ›ÛYYÈÙ\ØÚZY[ˆ[ˆÛÜ™[ˆ[Y[ˆÙYY[Ø[›™Y\ˆHZYÙ[˜X\ˆ]^XÚY][œÝ[ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌË‹]NˆŒNHÙ\[X™\ˆŒˆ‹]Nˆ‘ÙpëÛ\ÜY\™HYÙ[ˆ[[ˆY][™\™HXØÛÝ[È‹Ú[™Ù\Î–ÈšZˆH[œÝ[[™Ù[ˆ˜[ˆY[ˆÙpëÛ\ÜY\™HXYÈÝX]HXYÈ[[ˆY]Y[ˆÛÛÙÛKYK[XZ[Y™\Ëˆ‹”\ˆÛ˜[™Ù\ˆÝ[ˆ™HÚY^™[ˆ\ÜÙ[ˆ[Y[ˆ^™[ˆ[ˆ™]Ù\šÙ[ŽÈ[[ˆØ[ˆ]\ˆÛÚÈÙY\ˆÛÜ™[ˆ[™Ù]›ÚÚÙ[‹ˆ‹“Û˜[™Ù[ˆYÙ[ˆ™\œØÚZ›™[ˆšXHÛÝY\Þ[˜Ú›Ûš\Ø]YHÜ][™\™HÛÛÙÛKXXØÛÝ[[ˆ›Z™[ˆ\šÙ[˜˜X\ˆ[ÈÙYY[HXYÈY]ZYÙ[˜X\ˆ[ˆ™XÚ[‹ˆ‹™]Ù\šØ˜\™HÙYY[HYÙ[ˆÝ[›™[ˆÛÜˆHÛ˜[™Ù\ˆÛÜ™[ˆX[™Ù\\ÝÈÚZžšYÚ[™Ù[ˆÛÜ™[ˆ\YÙÙZÛÜ[˜X\ˆ^™[™HÙ[˜[HXYËˆ‹‘ZYÙ[ˆ[ˆÛ˜[™Ù[ˆ[\ÜÈ›Z™[ˆXÚš\ØÚÙ\ØÚZY[ˆ›Ù]ÙYY[HYÙ[ˆšY]\ˆÛ™Ù[ZÈ[ÈX˜™[HZYÙ[ˆ[\ÜÛÜ™[ˆÜÙ\ÛYÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÈ‹]NˆŒNHÙ\[X™\ˆŒˆ‹]Nˆ‘ÙpëÛ\ÜY\™HYÙ[ˆHXÚ[ˆHÛÝY‹Ú[™Ù\Î–È‘ÙpëÛ\ÜY\™HYÙ[ˆÞ[˜Ú›Ûš\Ù\™[ˆ›ÛÜX[ˆY][ˆ›ÛYYÙHÙ[Ò”ÓÓ‹Z[šÝYšXHš\™X˜\ÙHÝÜ˜YÙNÈš\™\ÝÜ™H™]ØX\[Y[ˆXÚHY]Y]H[ˆ[œÝ[[™Ù[‹ˆ‹‘Y[ˆ™\ÝX[™\\˜X]Y]H›ÛYYÙHXYË›Ø[È™HÝYH[Y›ÛÛ‹\ØYYH[šÝY]]ÛX]\ØÚ›Ù˜H]XÝY]ÛÛÙÛH\È[™Ù[ÙÙˆ‹[™\™H\\˜][ˆÝÛ›ØY[ˆ^™[™HXYÈX\›˜H]]ÛX]\ØÚ[ˆÛ™[ˆÙY\ˆ[H[[‹›ZÚÙ[ˆ[ˆÜ\[™›Ü›X]YH›Û™\ˆÜšY]]ÈH[\Ü\™[‹ˆ‹‘^™[™H[\ÜÛÜ™›ÛÜX[ˆ\šÙ[™X[ˆY[ˆ[šÝYÚ\Ú[ˆšZ™Ù]Ù\šÝ[ˆX]È˜[ˆ[ÈÙYYKX˜™[HXYÈÙYÙ]›ÙYÙˆ‹•™\ÚZ™\š[™Ù[ˆ˜[ˆÙpëÛ\ÜY\™HYÙ[ˆÛÜ™[ˆ\\šZ™ÙZÝY[ˆ›Ù]Y[ˆÝYHÛÝYÛÜYHšY]ÜšY]]ÈØ[ˆ\YÚÛÛY[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËˆ‹]NˆŒNÙ\[X™\ˆŒˆ‹]Nˆ‘XÚHÛšÙ\™H[Ù\È‹Ú[™Ù\Î–È“Û™\ˆ[œÝ[[™Ù[ˆ8¡¤ˆ[Ù[YY[ˆ8¡¤ˆÙY\™Ø]™HÝX]HÛ]\›[Ù\ÈY]Þ\ÝY[KXÚ[ˆÛšÙ\‹ˆÞ\ÝY[H›ÛÝ]]ÛX]\ØÚHTÛ™KHÙˆœ›ÝÜÙ\š[œÝ[[™Ëˆ‹•™[œÝ\œË›ÙZÙ[˜ÝYKÜ\ËØX\Û›Ü[‹ØÚX[˜[È[ˆÝ™\šYÙH]XÝX™YY[š[™ÈÜšZ™Ù[ˆY[ˆZYÙ[ˆÛšÙ\™H›Ü›YÙ]š[™È›Û™\ˆØX\YÙ[‹XÚ›Ýø &\ÈÙˆ[XZÛ]\™[ˆH™\›Ü›Y[‹ˆ‹‘]XÝ\Ý[ˆÛšÙ\™H[Ù\ÈÛÚÈHœ›ÝÜÙ\ˆ[YKXÛÛÜˆ[ˆÛÛÜ‹\ØÚ[YHX[‹›Ù]ØY˜\šHØX\ˆ[ÙÙ[ZšÈ™]\ˆX[œÛZ]ÜHÛšÙ\™H\ˆ‹‘HÙZÛÞ™[ˆÛ]\›[Ù\ÈÛÜ™ÚØX[ÜÙ\ÛYÙ[ˆ[ˆYYYÙ[›ÛY[ˆ[ˆH™\ÝX[™HÛÝY[œÝ[[™Ù[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËH‹]NˆŒNÙ\[X™\ˆŒˆ‹]NˆšTÛ™KQÔÈ[ˆ˜]šYØ]Y[[Ù\È\œÝ[‹Ú[™Ù\Î–ÈšZˆ]Ü[™[ˆÛÛ]XÝÙY\ˆH\ÜÚY]™HXÝY[HØØ]YH[È›]]ÙHÝ\[ˆ™\™\œÝYHØØ]YHØ[›™Y\ˆH\ÜšY]]ÈšXÚ˜X\ˆÛÜ™ˆ‹‘HY\œÝHÔË\Ý[™ÛÛH›]]ÙHšXÚ[™ÜÜZ›ÜY[ˆ›ÛÜ™X›Ý™[ˆØX\ÈÔÈÝ\ÜTÛ™H\™XÝ[ˆØ[ˆšY]YY\ˆ˜\ÝÜ[ˆÜÙ\Ý[[Z[™È›ÛÜˆ™]ÙYÚ[™È[ˆšXÚ[™Ëˆ‹‘HÙYYHÔË\Ý[™\ÈÙY\ˆXÚH˜]šYØ]Y[[Ù\ÎˆY[ˆÜ›Ù[™HZ››Z™ÙXÙ[™Y\™[ˆ™XÚÛZÛÙÈ\ÚZ›HØX\\›Û™\ˆYYY˜XZ]Y]ÛÛ\\ÜšXÚ[™ÈšZˆYÙHÛ™[ZY[ˆÔËZÛÙ\œÈZ™[œÈ]šZ™[‹ˆ‹‘[˜Ý[Û™[HÚZžšYÚ[™Ù[ˆÜšZ™Ù[ˆ›ÛÜX[ˆ[Z™Y[ˆšY]]È™\œÚY[[[Y\ˆ[ˆY[ˆÚZžšYÚ[™ÜØ™\šXÚ]˜HH\]H0êpê[ˆÙY\ˆ]]ÛX]\ØÚ™\œØÚZ›ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÈ‹]NˆŒMÙ\[X™\ˆŒˆ‹]Nˆ”\ÝYÙ\ˆZÚÙ[ˆ[ˆ™]›Ý]Ø˜\™H\˜ÙY[ÛÙÝH‹Ú[™Ù\Î–È‘Y[ˆÛZ[™HØÚZY˜™]ÙYÚ[™ËX˜™[ZÚÙ[ˆÙˆY[ˆØX\YH›ÙÈ™]ÙYYÝÜ[šY][™Ù\ˆÛ˜™YÙ[Y[ˆÜ\ÈÙ]ÛÛ™HZÚÙ[ˆ[ˆHZ[YH˜XZÞ›Û™H˜[ˆ[[ˆ›Z™[ˆ™ZÝY[‹ˆ‹‘HÛ›ÜÛÙÝZØX\Û™[ˆ›Z™™\ØÚZØ˜X\ˆØ[›™Y\ˆÙ]Ø\Ü\˜Ù[[ˆXÝYYˆ\ËÛÚÈ[ÈH]™H\˜ÙY[[™›Ü›X]YH™\˜XYÙÙˆZ™[ZšÈÛ˜™\™ZZØ˜X\ˆ\Ëˆ‹”™XÙ[ÙXœZZÝH\˜ÙY[Ü™[ž™[ˆÛÜ™[ˆÚØX[\™ÙXœZZÝˆÒËH[ˆR‹[Üœ˜YÙ[ˆÜšZ™Ù[ˆ0êpê[ˆ]]ÛX]\ØÚH\šØ[œÚ[™È[ˆY[ˆZY[ZšÙHY[[™ÈY]ÜšY]]È›Ø™\™[ˆ[ÈY[ˆšY]ZÝˆ‹‘]XÝY[HÛÙÝZØX\\È[ÈšXÚ˜X\ˆ˜Y]]R‹X™Y[Ù\šÙ[ZšÈ\ÈÙ[Y[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËˆ‹]NˆŒMÙ\[X™\ˆŒˆ‹]Nˆ“ZZ›ˆYÙ[ˆÜÙ\ØÚÛÛ™‹Ú[™Ù\Î–È‘HšY\ˆÝYH[YÙ[ˆZZ›ˆ›Û™Ý[‹˜ZØ[YHœ˜[šÜšZšÈŒ‹XZY[[™[ˆ›ÙZÙ[ˆ[ˆ\ÝXYÈÛHH\˜Ú]™\™[ˆÛÜ™[ˆY[›X[YÈ™\ÚZ™\™ÈÙ\Ý[[Z[™È[ˆ›Û™Ý[ˆ[ˆØØ]Y\È›Z™[ˆÝX[‹ˆ‹’YY\™HZYÙ[ˆÙˆÙpëÛ\ÜY\™HXYÈÝYY[ˆ\™XÝHX[‹ÝZ]\ØÚZÙ[X\‹ˆ][™ÚY[™]˜]›ÛÜX[ˆ[Y[ˆXYÈ™\ÚZ™\™[‹Y]Y[ˆZY[ZšÙH™]™\ÝYÚ[™ÈYÙ[ˆ\ˆÛ™Ù[ZÈÚ\ÜÙ[‹ˆ‹•™\ÚZ™\™H[YÙ[ˆÜšZ™Ù[ˆY[ˆÞ[˜Ú›Ûš\Ø]Y[X\šÙ\š[™Ë›Ù]ÛÝY\Þ[˜È™HšY]šZˆY[ˆ›ÛÙ[™HÝ\ÜšY]]È\YÞ™]ˆ‹‘H™[Z\ÜÚ\ÈZ]H›ÙšY[›ÝÈ\ÈH]œšZœÝX[™K˜[œÜ\˜[H˜]šXÛÛˆ[ˆÐKZXÛÛÛˆ˜[ˆ]XÝˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËH‹]NˆŒLÈÙ\[X™\ˆŒˆ‹]Nˆ‘]XÝÜšZ›ˆZYÙ[ˆY™\È‹Ú[™Ù\Î–È‘]XÝ\È›ÛÜ˜™\™ZYÜÎ‹ËÙ]XÝ\›››Ù]]Y™\È[ˆHœ›ÝÜÙ\ˆ›Z™ÝX[ˆ\ÚZ›H\™XÚÝ™YZÜÈZ]^™[™HÚ]X‹\™\ÜÚ]ÜžHÛÛ]ˆ‹™\Ý[™[‹ØX\YÙ[‹ÐK\Ý\Y™\È[ˆÙ™›[™KXØXÚHÙXœZZÙ[ˆ›ÛÜX[ˆ™[]Y]™HY[ˆ[ˆÙ\šÙ[ˆX\™ÛÜˆ›ÝÙ[Ü]šY]]ÙHÛYZ[ˆ[ÈZ™[œÈHÝ™\™Ø[™ÈšXHÚ]XˆYÙ\Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌË‹]NˆŒLÈÙ\[X™\ˆŒˆ‹]Nˆ“ZZ›ˆYÙ[ˆ\YÈ˜X\ˆH˜\Ú\È‹Ú[™Ù\Î–ÈšZˆZYÙ[ˆ[ˆÙpëÛ\ÜY\™HYÙ[ˆÝX]›ÛÜX[ˆHXYÛ˜X[H[ˆH›]]ÙHÜ\ÛÜ[ˆH˜X[H˜[ˆ]ØX\Øš™XÝ[ˆH[šÝYˆ‹–™[™Ù[XXZÝH[YÙ[ˆ[ˆÙpëÛ\ÜY\™HÙ[Ò”ÓÓ‹KÓSH[ˆÔ[YÙ[ˆÝX[ˆØ[Y[ˆÛ™\ˆØX\YÙ[ˆ8¡¤ˆZZ›ˆYÙ[ˆ[ˆšZ›ˆX\ˆYž›Û™\›ZšÈX[ˆÙˆZ]H™][‹ˆ‹’ÝYHØX\[™ÙYZÝÚY\È[Ù]›ÙYÙ[ˆ[ˆÙ[XÝY\ˆX\›˜HYY\™HZYÙ[ˆXYË[˜Û\ÚYYˆY[ˆÙpëÛ\ÜY\™HXYËˆ‹“šY]]ÙH[[ˆÛ™\œÝ][™[ˆ˜X[K[Y›ÛÛ›[[Y\‹›Ý]Y\Ë[šÈ[ˆ›ÝÎÈ[™X]YÈÙYÙ]›ÙYÙH[[ˆšZ›ˆ˜[Z][ˆÜ\H™]Ù\šÙ[ˆÙˆ™\ÚZ™\™[‹ˆ‹‘ÙpëÛ\ÜY\™HÙ[ÛY]šYH›Z™Û˜X[™Ù\˜XZÝˆ^˜H[[ˆšZˆY[ˆ[\ÜÛÜ™[ˆ\\[ˆ™Z[YÈ[ˆH™\ÝX[™HXYË\Þ[˜È™]ØX\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÎH‹]NˆŒLÈÙ\[X™\ˆŒˆ‹]Nˆ‘ZYÙ[ˆ[\ÜÈ\YÙÙXœ˜XÚÝH™YÙ[[™È‹Ú[™Ù\Î–È‘ÙpëÛ\ÜY\™H[[ˆÙXœZZÙ[ˆ]]ÛX]\ØÚY[ˆÛØ™\™H›ÛÛXYš[šÙ[ZšÙHÜ›ÛÝH˜[ˆˆÝH^[ËˆHÜ›ÝHÙ[[[Y\™HÛ\Ý\˜›Û[ˆšZ›ˆ™\ÚZ™\™ˆ‹”\ˆÙ[ÛY]šY\ÛÛÜ›Z™[ˆ[Y[ˆšXÚ˜X\ˆX[‹ÝZ][ˆÛ]\ˆÝ™\ŽÈÜ›ÛÝKZÚÚ[™ËZÝKÚ\ÜÙ[ˆ[ˆÝ[™X\™Û›Ü[ˆšZ›ˆZ]][™Y[™\ÚZ™\™ˆ‹”Ü\[œÝ[[™Ù[ˆ›Z™[ˆ™\ØÚZØ˜X\ˆ›ÛÜˆ][XÚš\ØÚH™[[ˆ[ˆHÙ[XÝYH˜[ˆÙ]ÛÛ™H™[[‹ˆ‹™\ÝX[™H[ˆšY]]ÙH[\ÜÈ›ÛÙ[ˆ]]ÛX]\ØÚ^™[™H[ÙY\™Ø]™NÈÜšY]]È[\Ü\™[ˆ\ÈšY]›ÙYËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÎ‹]NˆŒLˆÙ\[X™\ˆŒˆ‹]Nˆ‘ZYÙ[ˆ[\ÜÈ›Û™\ˆØX\ÛÙ\‹Ú[™Ù\Î–È™\ÝX[™HÙpëÛ\ÜY\™HYÙ[ˆÛÜ™[ˆ]]ÛX]\ØÚ˜X\ˆ]šY]]ÙHÞ\ÝY[HÝ™\™Ù^™]ˆØš™XÝ[ˆ[ˆ]šX][ˆ›Z™[ˆ™ZÝY[ŽÈÜšY]]È[\Ü\™[ˆ\ÈšY]›ÙYËˆ‹”[[‹Z›™[ˆ[ˆ›ZÚÙ[ˆšZ›ˆ›ÛÜX[ˆÛ˜Yš[šÙ[ZšÈšXÚ˜X\ˆ[ˆ[œÝ[˜X\‹ˆšZˆY[ˆÙ[Y[™ÙH[\Ü›Z™[ˆ[[ˆX[ˆ[ˆÝX[ˆ›ZÚÙ[ˆÝ[™X\™Z]ˆ‹‘ÙpëÛ\ÜY\™H[[ˆšZ›ˆÛZ[™\ˆ[ˆÛÜ™[ˆšZˆZ]›ÛÛY[ˆÙXÛ\Ý\™ˆY[ˆZÈÜY[ˆÛ\Ý\ˆ›ÛÛ][ŽÈ˜[˜Yˆ›ÛÛ[š]™X]HLˆ™\œØÚZ›™[ˆHÜÜÙH[[‹ˆ‹‘HšY]]ÙHÜ›Ù\ZYÙ[ˆ[\ÜÈšYYÛ]\‹Ü›ÛÝKZÝK˜[œÜ\˜[YKÜ\™[[ˆ[ˆ\˜œZZØ˜\™HÝ[™X\™[œÝ[[™Ù[ˆ›ÛÜˆ›ÛÙ[™H[\ÜËˆ‹”Ü\ÈÚY^™[ˆY[ˆœZZØ˜\™H][™\˜™\™Ù[ˆXÚš\ØÚH™[[ˆ[ˆÛ™[ˆ\˜ÑÒTÈ[Y[ˆ›ÙÈ[Èœ›Û‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÍÈ‹]NˆŽHÙ\[X™\ˆŒˆ‹]Nˆ‘X˜™[HÛÛÙÛHXÚZÛ›Ü™\ÚZ™\™‹Ú[™Ù\Î–È‘HÜÜÙHÛ›ÜÛÛÙÛHXÚ\ÈZ]]ÛÛ^Y[H™\ÚZ™\™ÛY]YH^XÝ^™[™HÛÛÙÛHX\Ë]šY]Ù\ˆÜ[™H[ÈÝ™Y]šY]Ëˆ‹”Ý™Y]šY]È›Z™H\œÝ[HÙ™šXÚpêÛH[›Ü˜[X[[šÈÙXœZZÙ[‹ˆ˜[Z]YHšY]Ù\ˆÝ[ˆ™H[šÜÛÛ™\ˆ˜X\ˆXÚ›ÝÈØÚZÙ[[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÍˆ‹]NˆŽHÙ\[X™\ˆŒˆ‹]Nˆ‘ÛÛÙÛHXÚ[ˆÝ™Y]šY]ÈÜHZ\ÝHZÈ‹Ú[™Ù\Î–È’]ÛÛ^Y[H™]˜]HÛÛÙÛHXÚˆHÙZÛÞ™[ˆØX\ZÈÜ[™XÚÝ™YZÜÈ[ˆHÙXÛÛXš[™Y\™HÝ™Y]šY]ËH[ˆ[[Y\œÚ]™HšY]Ë]šY]Ù\ŽÈZÈX\ˆ[šÜÛÛ™\ˆÜXÚ›ÝÈ›ÛÜˆH›Û™XXÚYÙHÑ]ÙY\™Ø]™Kˆ‹”Ý™Y]šY]ÈÙXœZZÝ›ÛÜX[ˆÛÛÙÛ\ÈÙ™šXÚpêÛH[›Ü˜[X[[šÈY]]X[™ÙZÛZÝHÛðíœ™[˜X][ÈšY]ÜÚ[ˆÛÛÙÛH›ÙZÝX\›YYH]XÚÝšZžšZ›™H™\ØÚZØ˜\™H[›Ü˜[XH[ˆ˜[šY]YY\ˆ\YÈÜ™HZYYÙHØØ]YKˆ‹“ÛÚÈHÙ]ÛÛ™HÛÛÙÛHX\Ë[[šÈ[ˆ]ÛÛ^Y[HÙXœZZÝHHÙ™šXÚpêÛHØØ]Y^›ÙZÛÜ˜XÚ[ˆÝYHÙZÛÞ™[ˆZÈ^XÝ˜\Ýˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÍH‹]NˆŽHÙ\[X™\ˆŒˆ‹]Nˆ•Ø^X˜XÚÈ[ˆ™\Ù]\Þ[˜È\œÝ[‹Ú[™Ù\Î–È‘\ÜšHØ^X˜XÚÈÛÜ™ÙY\ˆ[™Ù[^™[ˆ˜Y]\ÜšHHÓUË[˜[Y\ÜXÙKUT’x &\È˜[ˆ˜X\ˆÈÚZžšYÙNÈHÙ\™[Ø][Y]Z™™Z\ÈÛÛÜšY]]ÈH™\ØÚZØ˜\™H\˜ÚYYš˜\™[‹ˆ‹‘Y[ˆX[™Ù\\ÝHœ˜[šÜšZšÈ0­È0êY\˜XË\™\Ù]ÛÜ™šZˆ\œÝ\šY]YY\ˆY]H[™ÙX›Ý]ÙHÝ[™X\™YÙ[ˆX[™Ù][ˆÜÙ\ÛYÙ[ˆÚZžšYÚ[™Ù[ˆ›Z™[ˆX\™ÛÜˆÚØX[0ê[ˆšXHÛÛÙÛK\Þ[˜ÈÙ[ZšÈÜ[™\™H\\˜][‹ˆ‹‘H[™ZY[™È™\›Y[HÛÜœ™XÝ]™\Ù]È[ˆ[Ù[Y[™H[œÝ[[™Ù[ˆÛ™\™Y[šZ›ˆ˜[ˆÛÛÙÛK\Þ[˜Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÍ‹]NˆŽHÙ\[X™\ˆŒˆ‹]Nˆ[™›ÚY\šÙ[]šY]]ÙHXÛÛÛˆ‹Ú[™Ù\Î–È‘H˜]šXÛÛ‹H[ˆÐKZXÛÛ™[ˆX˜™[ˆšY]]ÙH™\œÚYYÙX›Û™[ˆ™\Ý[™Û˜[Y[‹›Ù][™›ÚYHÚZžšYÚ[™ÈšY][™Ù\ˆ[È]™[™HÝYHXÛÛÛˆ™Z[™[ˆ‹“ÚØ[HØX\KXYËH[ˆÚ][ÜÛYÈ›Z™šZˆ^™H\]H›ÛYYÈÛ˜X[™Ù\˜XZÝ[ˆÙYšY]HÛÜ™[ˆÙ]Ú\Ýˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÌÈ‹]NˆŽHÙ\[X™\ˆŒˆ‹]Nˆ“šY]]È]XÝZXÛÛÛˆ‹Ú[™Ù\Î–È’]Ù[™\šYZÙHš^šY\ˆXXZÝX]È›ÛÜˆY[ˆZYÙ[ˆ]XÝZXÛÛÛŽˆY[ˆÚ]H]XÝÜœÜÙ[ÜÛšÙ\œX\œËY]0êpê[ˆÛÝYÙ[H›Û™ÝÝ\ˆ‹’]šY]]ÙHÛÙ\œÛÜ™ÙXœZZÝ[Èœ›ÝÜÙ\™˜]šXÛÛ‹\KXX[œ˜XZÚXÛÛÛˆ[ˆÐK\Û™[ÛÜ[[™È[ˆ›Z™ÛÚÈÜÛZ[ˆ›Ü›XX]\šÙ[˜˜X\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÌˆ‹]NˆŽHÙ\[X™\ˆŒˆ‹]Nˆ•˜[œÜ\˜[YHÙY\ˆÛÛ\XÝ‹Ú[™Ù\Î–ÈšZˆYY\ˆ[ˆšYHšXÚ˜\™HYÙ[ˆÛÛ˜[œÜ\˜[YHÝ[™X\™šYHØÚZYœ™YÙ[X\œËY]H™\›Ý]ÙHÛ›Ü[ˆYY\ˆÛ™[ˆ[ˆZ[™\ˆÛ™[‹ˆ‹‘H[™ÙZÛ\HZ™™Z\ÚÛ›Ü[ˆHÜ›ÝHZ™™Z\Ø˜[È™\™ÚZ›™[ˆZ™[ZšÈØ[›™Y\ˆ]˜[œÜ\˜[Y]™[œÝ\ˆÜ[œÝX][ˆÙ\™[ˆ˜HÛZ][ˆ[ˆ^™[™HÝ[™\YËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÌH‹]NˆŽÙ\[X™\ˆŒˆ‹]Nˆ”ØÚX[˜[ÈXÚ›Ý™[ˆHÛ›Ü[ˆ‹Ú[™Ù\Î–È‘HØÚX[˜[ÈÙXœZZÝH^™[™H˜\ÝHØÚ\›[Û™\œ˜[™[ÈÔÈ[ˆ›ÛÛKˆX\™ÛÜˆØ[ˆH[™›ÚYX\[HšY]YY\ˆ˜[Z]Y[ˆYÚZšÙ[™HØX\ÛÛZ[™\ˆÛ™\ˆHÔËZÛ›ÜØÚZ]™[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÌ‹]NˆŽÙ\[X™\ˆŒˆ‹]Nˆ•ÚZžšYÚ[™ÜÝ™[œÝ\ˆÛÛHZ\ÝH™[X\ÙH‹Ú[™Ù\Î–È’]ÚZžšYÚ[™ÜÝ™[œÝ\ˆ™]›ÛÜX[ˆ[Z™HÙ\šÙ[ZšÈXÝY]™H]XÝ]™\œÚYH›Ý™[˜X[ˆ[ˆÙYY[Y[ˆYH™\œÚYH]X™[šY]]Ëˆ‹“ÝY\™H[™X]YÈØ[Y[™Ù\Ý[H™[X\ÙX™\šXÚ[ˆ›Z™[ˆ[ˆHZ\ÝH›ÛÛÜ™H™\ØÚZØ˜X\ˆ›Û™\ˆHXÝY[H\]H˜X\ˆ[™\ÙYÙHHÙ\ØÚYY[š\ÈH]Ù[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŽH‹]NˆŽÙ\[X™\ˆŒˆ‹]Nˆ•Z™™Z\ÈZ]HÙYÈØ[›™Y\ˆšZˆ]Ú[‹Ú[™Ù\Î–È‘HXÚ›ÝËH[ˆØ][Y]Z™™Z\È›Z™šZˆ]Ü[™[ˆ›ÛYYÈ›Ý™[ˆHØX\Ù]™[‹XX\ˆØ[ˆ›ÛÜX[ˆY]H[™Ü™Y\ÛÜ™[ˆX[™Ù]ZÝÙˆÛ[XYÈÙ]™YYÙˆ‹’[™ÙZÛ\›Z™[Y[ˆY[ˆÛÛ\XÝ˜X\[Û›Ü™H™XÚÈ›Ý™[ˆ˜[œÜ\˜[YHÝX[‹ˆ]ÙZÛÞ™[ˆ˜X\ˆ[ˆH[™ÙZÛ\HÝ[™›Z™[ˆ™ZÝY[ˆØ[›™Y\ˆÔÈÙˆY[ˆ™\Ù]ÛÜ™ÙXœZZÝˆ‹‘HÙ]ÛÛ™H[ØšY[Hœ›ÝÜÙ\ˆ[ˆHÙpëÛœÝ[Y\™HÛ™[ÛÜ[[™ÈÙXœZZÙ[ˆH^™[™H[˜[Z\ØÚHØÚ\›ZÛÙÝKˆHØÚX[˜[ÈYY›ÙÈXX\ˆ0êpê[ˆÜÚ]YH[ˆ›Z™X\™ÛÜˆ™]™\È›Ý™[ˆHÛ™\œÝHØX\Û›Ü[ˆÝX[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŽ‹]NˆHÙ\[X™\ˆŒˆ‹]Nˆ”™Y™\™[Y[Z›™[ˆÛ™\ˆH[[ˆ‹Ú[™Ù\Î–È‘HXÚHÙ[H[ˆÚ]HZ›™[ˆÜHXœšYHXÚ›ÝÈšZ›ˆÙYÙ[ˆZ]HÜ[‘œ™YSX\ÓÜ[”Ý™Y]X\\™Y™\™[Y[XYÎÈ]šZ›ˆÙY[ˆÛ™\ž›ÙZÜÜ›Ý]\ÈÙˆ™\˜š[™[™Ù[ˆ\ÜÙ[ˆš[™X]Ù[‹ˆ‹‘H™Y™\™[Y[XYÈ™\šZ\Ý˜[ˆ‹Z[™^LL˜X\ˆMË›Ù]ØX\[[ˆ[ˆ[X]\ØÚHZ›™[ˆ\ˆ›ÛÜX[ˆ›Ý™[ˆÛÜ™[ˆÙ]ZÙ[™ˆ‹•ÙYÙ[ˆ[ˆÝ™\šYÙH™Y™\™[Y[Z›™[ˆšZ›ˆŽ›ØÙ[[›™\ˆÙ[XXZÝˆH›]]ÙH‘ÔQÑK]Ø]\›Ü[ˆ›Z™[ˆÛ™Ù]ÚZžšYÙˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÈ‹]NˆHÙ\[X™\ˆŒˆ‹]Nˆœ™YH™YÚ[ÜØØ[ˆÙYÙ]›ÙYÙ‹Ú[™Ù\Î–È‘Hœ™YH™YÚ[ÜØØ[ˆ›ÙYÝˆ™]Ù^™[ˆ›ÜÜÚY[ØØ]Y\Ëˆ\˜Ú[ÛÙÚ\ØÚHÛÛ^Ú]\È[ˆÙ™šXÚpêÛH™^šY[œÝØX\™YÚY[ˆÙˆÙ[ÜÚ]\ÈÙKˆHZ[™\˜[[›XYÈ›Z™™]Ý\ÝÛ™Ù]ÚZžšYÙÛY]^˜H”‘ÓKZ[™XÙ\ÈÙY[ˆ™]›Ý]Ø˜\™HX›YZÜËHÙˆÜ\›ZÝ\ZÚÙ[ˆÜ]™\™[‹ˆ‹”ÜXÝXÝ[Z\™HØ[™[›Ý]\ÈÜ›ÙZ]˜[ˆLH˜X\ˆMHÙ™šXÚpêÛHÔ[Z›™[ˆY]Ý^\ÜÙx $Ð[›ÝK0à™\˜Ú[™ÙJÊ\žKY\œ™KS]°êYH[™ÜÈšY]^Ø][XXÈ[ˆ[ÛZ[È[™ÜÈHðê[0êKZÛY™™[‹ˆ‹”š]°ê]\œ™Z[‹Ü›Ù]™KH[ˆÙYÙÙ]˜X\‹™\ØÚ\›YH›ËY]XÝÚ]\È[ˆZ™[ZšÙHÛZ][™ÈÛÜ™[ˆ^XÚY]Ù[Y[ˆ›ÝXØYÝ\ˆ›Z™šXÚ˜X\ˆ›ÛÜˆ]\˜Ú[ÛÙÚ\ØÚH™Y[XX\ˆ\ÈšY]™^›ÙZØ˜X\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒˆ‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ“Z[™\˜[[ˆ[ˆ›ÜÜÚY[[ˆY]™]ÚZœÈ‹Ú[™Ù\Î–È•ÙYH\\H[YÙ[ˆ›ÙYÙ[ˆLˆZ[™\˜[ÙÚ\ØÚHØØ]Y\È[ˆŒˆ›ÜÜÚY[š[™X]Ù[ˆÙKÙ\Ù[XÝY\™Z]HÙ™šXÚYY[Ù]˜[YY\™HS”ËZ[™[\š\È[ˆÙ™šXÚpêÛH™^›ÙZÙ\œØœ›Û›™[‹ˆ‹[HZ[™\˜[[›ØØ]Y\ÈYÙÙ[ˆš[›™[ˆÚ\˜ØHp¯H]\‹Y]ÙYH^XÚY]HÔÔ“K\˜[™Ù]˜[[ˆ˜[ˆLˆ[ˆMHZ[][‹ˆÚ[YÈ›ÜÜÚY[ZÚÙ[ˆYÙÙ[ˆš[›™[ˆÚ\˜ØHLZ[][ŽÈ[Y[ˆHZ]›Û™\›ZšÈšZšÙHX›YZÜÝš[™X]Ù[ˆ°ê[Ûˆ[ˆØ[œØ[ˆÝX[ˆ[È[™Ù\™HYÝØÚÜHØX\ˆ‹’YY\™HÜ\™\›Y[\œ™Z[\K™]ÚZœËšXÚ˜X\šZYX[ˆ]Ü\›ZËšZZ™œ›Û‹X\šÙ\œ™XÚ\ÚYKÙYØ[™È[ˆ™\ž˜[Y[™YÙ[Ëˆ™\ØÚ\›YÙˆš]°êH›Z™šXÚ˜X\‹XX\ˆÛÜ™›ÛÚ][ÈÙ\Ý[[Z[™ÈÙ\™\Ù[Y\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒH‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ“Ù™šXÚpêÛHØ[™[›Ý]\È[ÈZ›™[ˆ‹Ú[™Ù\Î–È‘Y[ˆ\\HXYÈÜXÝXÝ[Z\™HØ[™[›Ý]\ÈÛÛ[ˆXÚH›Ý]YÙ[ÛY]šYpêÛˆZ]Ù™šXÚpêÛHÔYÝÛ›ØYÎÈÙY[ˆ[[ˆ[ˆÙY[ˆY]H[™Ù]ZÙ[™H™[˜Y\š[™Ù[‹ˆ‹‘HÙ[XÝYHÛÜ˜[ˆHÛY™™[ˆ[ˆØ]\˜[[ˆ˜[ˆÝ[ˆÜ™ÙÛ™HšXHHÛÝ™[ˆ˜[ˆ]™^\›ÛˆÝH[ØX[œYÙÙ[ˆ˜[ˆHØ[[ˆXZÚÙ[ZšËÙ[ZY[[ˆØX\ˆX˜™[ˆ\šÙ[˜˜\™HÜ›Ù[™KÜ˜[š™H[ˆ›ÙHZ›™[‹ˆ‹‘Y[ˆZÈÜY[ˆ›Ý]HÛÛYœÝ[™
Ë]\‹X\šÙ\š[™Ë[™ØÚ\[ˆÚ[Y™KÛ[KHÙˆÛ]]\Ù\šËÛšYKH[ˆ\œ™Z[ØX\œØÚ]Ú[™Ù[‹›Ý]H˜X\ˆHÝ\Ù™šXÚpêÛHÙXœÚ]H[ˆÙ™šXÚpêÛHÔˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒ‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ™\Ý[[Z[™È™\X[Hš]‹Ú[™Ù\Î–È™^šY[œÝØX\™YÚY[ˆÜ›ÙZ]˜[ˆÍÈ˜X\ˆŽHÙXÛÛ›ÛY\™HZÚÙ[‹ˆHÌˆX[[[™Ù[ˆYÙÙ[ˆH˜YZÈÜ]][YZÙHÜ›ÝÝ[œÝ™Z\ÝÜš\ØÚH[ˆ›ÛYZ[œÙHÚ]\ËpëÛ™\ËÝY›ÜÈ[ˆZ]›Û™\›ZšÈ[™ØÚ\ˆ‹”™Z\ÝÜšYH	ˆ\˜Ú[ÛÙÚYH\ÈY[ˆZYÙ[ˆ™]™[™HØ]YÛÜšYKˆšY]]ÙHÜ\ÈYÙÙ[ˆZ]ØX\›ÛHY[ˆ[™Ù\™Hš]H[ÙZ]HØX\™\È[ˆ™\›Y[[ˆY\›ZšÈ™\XØx &\Ë™\Ù\™\š[™ËÛZ][™Ë˜\[ˆ[ˆØ\™HÙYØ[™Ëˆ‹‘H™Z\ÝZ™\ÈÙY[ˆ\™H]\™Ü™[œÈYY\Žˆˆ™\Ý[[Z[™Ù[ˆYÙÙ[ˆš[›™[ˆÚ\˜ØHšYH]\‹ˆšX]^Ø\™Ø\È[ˆZ\‹[›Û‹TZ\ˆ›Z™[ˆ[È^XÚY]HZ]›Û™\š[™Ù[ˆšXÚ˜X\ˆÜÚ\˜ØHÈ]\ˆˆÝÈ]\ˆLËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒÈ‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ™^šY[œÝØX\™YÚY[ˆ›Û™0êY\˜XÈ‹Ú[™Ù\Î–È‘Y[ˆ\\HXYÈ™^šY[œÝØX\™YÚY[ˆÛÛÍÈXÚH™\Ý[[Z[™Ù[ˆ›Û™0êY\˜XÎˆÜ›Ý[‹Ø\Ý[[ˆ[ˆpëÛ™\Ë\ÝÜš\ØÚHÜœ[‹˜]]\ˆ[ˆÝYH›ÜÜÙ[‹Z]šXÚ[[ˆ[ˆØ]\›[™ØÚ\ˆ‹’YY\ˆ[YYY[ˆZYÙ[ˆØ]YÛÜšY\Þ[X›ÛÛY[ˆX™[šZˆ™\™\ˆ[ž›ÛÛY[ˆ[ˆY[ˆÙY][YÙHÜ\Y]™^›ÙZÚ[™›Ü›X]YKÜ[˜˜\™HÛðíœ™[˜][‹œ›Ûˆ[ˆY[ˆ\™XÝH]]Ü›Ý]H˜[˜Yˆ0êY\˜XËˆ‹‘H›Ý]X™\™ZÙ[š[™È™\›Y[YœÝ[™[ˆšXÚZ™›Û™\ˆ™\šÙY\œÙZÝKˆÍZÚÙ[ˆYÙÙ[ˆš[›™[ˆÚ\˜ØHŒÈZ[][ŽÈØZ[PÚ\œKS\ÜYKY\˜XÈ[ˆ˜\œšpê™\ÈÝX[ˆY\›ZšÈ[È˜[™ÙXšYYÜø $ÍÌHZ[][‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒˆ‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ\˜Ú[ÛÙÚ\ØÚH™YÚ[ÈZ]ÙXœ™ZY‹Ú[™Ù\Î–È‘Hœ›Û›XYÈÜ›ÙZ]˜[ˆŒˆ˜X\ˆÎZÚÙ[‹ˆšY]]ÈšZ›ˆÛ™\ˆYY\ˆHXYÙKÛÝYÛ˜XËÛÛX™H°êÜ™K›ØÈHHØ]™K™\ÈÛY[œËHÜYH˜[ˆ8 &R[\\›˜[[ˆ]\˜Ù[œË]\]XYXÝ˜[ˆ™\œËØ^˜[ËX˜˜^YH›Ý]™[H[ˆ]ÝYHØ\ÝY[\œ™Z[ˆ˜[ˆ^™XÚˆ‹’]Û™\ž›ÙZÜÚØY\ˆ\È™\œZ[YÝÚ\˜ØHÍH0åÈÚ[ÛY]\ˆ›Û™0êY\˜XÎÈHœ˜[šÜšZšË\™\Ù]Ü[Y]ÈZ[Y\ˆ›Ù]ÛÚÈÛÝ\™Û‹^™XÚ[ˆ]\˜Ù[œÈ\™XÝ[ˆ™Y[\ÜÙ[‹ˆ‹‘HÚØ[H‘ÔQÑKYZÚÚ[™È›ÛÝYH™\œZ[Z[™ÈY]MLÛZØ˜\™HØ]\›Ü[‹ØX\˜[ˆÍHY]Y[ˆÙ\X›XÙY\™H˜X[Kˆ™\ØÚ\›YH[ˆ›ËY]XÝZÚÙ[ˆ›Z™[ˆšXÚ˜X\ˆ[È\˜Ú[ÛÙÚ\ØÚHÛÛ^ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒH‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ•Ø]\‹[™™YZÚÚ[™È[ˆ\˜Ú[ÛÙÚYH\œÝ[‹Ú[™Ù\Î–È‘ÔQÑK]Ø]\›Ü[ˆÛÜ™[ˆ›Û™0êY\˜XÈÜÜœÛš]™X]HZY[ZšÈZÚÙ\ˆÙ]ZÙ[™ˆHNHÚØ[HØ]\›Øš™XÝ[ˆšZ›ˆÛZØ˜X\ŽÈšZˆÌÈX\˜[ˆX›XÙY\Hœ›ÛˆY[ˆ˜X[Kˆ‹“ÐÔÈÑH™\X[HÙ™šXÚpêÛHÔËH[ˆTËXÛÙ\È›ÛÜX[ˆ˜X\ˆÙ]ÛÛ™H™Y\›[™ÙH›Ù[X™YZÚÚ[™È[ˆÜ›Û™ÙXœZZËY]Z[˜X\ˆ[ˆÜ\›ZÝH[ˆXÝ\™Kˆ‹‘HYÙHÚØ[H\˜ÚSØØË[XYÈ\È™\ÚZ™\™ˆHÙ™šXÚpêÛHX›YZÜÙ]\Ù]™]˜][Øš™XÝ[ˆ[ˆH™]™[ˆÛ™\ž›ÙZÜÙÙ[YY[[‹ˆHŒˆXÚHœ›Û›ØØ]Y\ÈÝX[ˆ›ÛÜX[ˆ\šÙ[˜˜X\ˆ[È\˜Ú[ÛÙÚ\ØÚHZÚÙ[ˆ0­È0êY\˜XÈ
ŒŠH[ˆH™\Ù]ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒ‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ™ZÙ[™H\˜Ú[ÛÙÚ\ØÚHZÚÙ[ˆÜHØX\‹Ú[™Ù\Î–È‘Hœ˜[šÜšZšÈ0­È0êY\˜XË\™\Ù]ÛÛHY[ˆ\\HØX\XYÈY]Œˆ˜Y\ˆÛ™\ž›ØÚHÝY[Z™KÙ[\ØÚK›ÛYZ[œÙH[ˆZY[Y]]ÜÙHØØ]Y\Ëˆ‹™\ØÚ\›YÙˆ›ËY]XÝ™]ZÙ[›ÛÜX[ˆ[Y[ˆY[ˆZY[ZšÙHØX\œØÚ]Ú[™È[ˆHÜ\ˆ][›Z™šXÚ˜X\ˆ›ÛÜˆ]\˜Ú[ÛÙÚ\ØÚHÝX[™Y[ˆ‹‘^XÝHœ›Ûœ[[‹Y]KY]Ù[˜H[ˆÛØ˜[HÙ[YY[\ÜÚ]Y\ÈÜšZ™Ù[ˆ™\œØÚ[[™HÞ[X›Û[ˆ[ˆYY\™HÜ\™\›Y[HØØ]Y\™XÚ\ÚYH[ˆœ›Û‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒNH‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ‘œ˜[šÜšZšÈ0­È0êY\˜XË\™\Ù]\œÝ[‹Ú[™Ù\Î–È‘œ˜[šÜšZšÈ0­È0êY\˜XÈÝX]›ÛÜX[ˆ[Z™Û™\˜X[ˆ™\Ù]ËÛÚÈØ[›™Y\ˆY[ˆÝY\™HÚØ[HÙˆÛÝYZœÝ^™H™\Ù]›ÙÈšY]™]˜]Kˆ‹‘H™\Ù]ÚY\ÝXœšYHÙ\™[XÝ]™Y\H™\È™]Ù^™[ˆœ˜[œÙH™[YÙ[ˆ[ˆ™\œX]ÝHØX\˜X\ˆHÛ™\ž›ÙZÜÜ™YÚ[È0êY\˜XËˆ‹‘Y[ˆ™\›ÝY\™HÛÝYZœÝÛÜ™˜H]Y[ˆ]]ÛX]\ØÚY]HÛœ™ZÙ[™H™\Ù]Ù\™\\™Y\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒL‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ•™[œÝ\œÈ[ˆ˜[œÜ\˜[YHÜÙ\ØÚÛÛ™‹Ú[™Ù\Î–È–šZ™[œÝ\œÈYÙÙ[ˆ›ÛÜX[ˆ›Ý™[ˆ[HØX\™YY[š[™Ë›Ù]Û™\ˆYY\ˆHÔËZÛ›ÜšY]YY\ˆÛÜˆØX\YÙ[ˆÙˆ]Y[HY[ˆØ[ˆÛÛY[‹ˆ‹•˜[œÜ\˜[YHÜ[ÛÛ\XÝ™XÚÛÛ™\ˆ[ˆÛÛ\™XÝ[HšXÚ˜\™HYÙ[ˆØX\›ÛÜˆY[ˆÜXÚ]KZ[œÝ[[™È™\ÝX]È\ˆÛÜ™[ˆÙY[ˆÛY\œÈYY\ˆÝ[œÝX]YÈ˜HšYH™YÙ[È™\˜›Ü™Ù[‹ˆ‹’]™\Ù]™[œÝ\ˆ\ÈÛÛ\XÝ\ˆÙ[XXZÝ]™\œÚY[[[Y\ˆ[ˆ][X\™Ù\›Y[HÝX]Ü^™[™H™YÙ[[È[œÝ[[™Ù[ˆ[ˆ™\Ù]È™Z[™[[ˆXœšYHÙ\™[›ÛÜX[ˆÛÜœ™XÝ[È˜\Ú\ÚØX\ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽH‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ‘ÔÈ\ÝYÙ\ˆ[ˆÜšY]]È[ž›ÛÛY[ˆ\œÝ[‹Ú[™Ù\Î–È‘HY\œÝHÔË\Ý[™ÛÛ›ÛÜX[ˆ[Y[ˆY[ˆZY[ZšÙH›]]ÙHØØ]Y\[ÈHšXÚ[™ÜZ›[ˆYYY˜XZY[™HØX\™\œØÚZ›™[ˆ\È[ˆHÙYYHÔË\Ý[™ˆ‹“˜HÔÈZ]H[ˆÙY\ˆX[ž™][ˆØXÚ]XÝÜHY\œÝHšY]]ÙHXÝY]™HÔË[Y][™È[ˆ›ÛÛ]X\›˜HÜšY]]È™]›Ý]Ø˜X\ˆ˜X\ˆÝ˜X]š]™X]Kˆ‹’[ˆHYYY˜XZY[™HÔË\Ý[™ÛÜ™[ˆÜÚ]YKÛÙ\œÈ[ˆØX\›Ý]YHšZˆÝ[Ý[™™]œ›Ü™[‹ˆY]\\HÝÜH[ˆÝ\™[\[È›ÛÜšÛÛ]]XÝ]ÛZ[™HÛ™[ZYËH[ˆÔË\ØÚÛ[Y[[™Ù[ˆ]ØÚ\›H™\™]\ÈXZÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŽ‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ•\YÚÛ›Ü[ˆÛZ][ˆ™]™Z[YÙ‹Ú[™Ù\Î–È‘H[™›ÚY]\YÚÛ›ÜÛZ]]XÝšY]YY\ˆ\™XÝˆY[ˆÜ[ˆ™[œÝ\ˆÛZ]Y\œÝ[ˆ˜[˜YˆHØX\œ˜XYÝ]XÝX\›˜H^XÚY]Ùˆ™HXÚÚ[YœÛZ][‹ˆ‹‘^™[™H™]™Z[YÚ[™ÈÙ\šÝØ[›™Y\ˆ]XÝÙ]ÛÛÛˆ[ˆY[ˆœ›ÝÜÙ\Xˆ˜XZ]ÈÛZ][‹™\™\œÙ[ˆÙˆHYÚ[˜H™\›][ˆÜšZ™ÝØX\ˆHœ›ÝÜÙ\ˆ]Ù\ÝX]Y[ˆ^˜HØX\œØÚ]Ú[™Ëˆ‹]]ÛX]\ØÚH\œÝ\È˜HY[ˆ]XÝ]\]H›Z™[ˆ›Û™\ˆÛ››ÙYÙHÛZ]ØX\œØÚ]Ú[™ÈÙ\šÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËÈ‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ•Ø^X˜XÚÈ[ˆX˜™[HØX\X™[È\œÝ[‹Ú[™Ù\Î–È‘\ÜšHÛÜ›[XYÙ\žHØ^X˜XÚÈÙXœZZÝHHÙ™šXÚpêÛHÓUË\›Ý]HY]X\Ù\™\ˆ[ˆ]Y›Ù]]Ù\™[\˜ÚYYˆÙY\ˆ™\™ZZØ˜X\ˆ\Ëˆ‹‘HšZšÙH™Y™\™[Y[XYÈÛÜ™˜H]Y[ˆÜšY]]ÈY]HXÝY]™H˜\Ú\ÚØX\Ù\Þ[˜Ú›Ûš\ÙY\™[ˆØ[ˆX\™ÛÜˆšY]YY\ˆÜ\ÜšHXÚ›Z™[ˆ[™Ù[‹ˆ‹’XœšYHÙ\™[\È^XÚY]ÜÙ[›ÛY[ˆ[ˆH™YÚ[œÝ]\È˜[ˆHXYÝÚ[šÙ[›Ù]ØÚZÙ[[ˆ\ÜÙ[ˆ˜\Ú\ÚØX\[ˆ›ÛÜœÜ[˜X\ˆ›Z™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËˆ‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ™]\™HXœšYHØX\[ˆXÚ›ÝË]Z™™Z\È‹Ú[™Ù\Î–È”Ø][Y]H[ˆXÚ›ÝÚØX\[ˆÜšZ™Ù[ˆ›ÛÜX[ˆY[ˆšZšÙ\™H™Y™\™[Y[XYÈY]Ý˜X]KØ]\‹KX]ËH[ˆÙXšYYÛ˜[Y[ˆZ]Ü[‘œ™YSX\ÓÜ[”Ý™Y]X\È[ÈYHœ›ÛˆšY]™\™ZZØ˜X\ˆ\È˜[]XÝ\YÈÜ\ÜšKˆ‹“XÚ›ÝÈ“YYY[ˆZ™ØÚZYˆY]HÙ™šXÚpêÛHÒËZ˜X\™Ø[™Ù[ˆ˜[˜YˆŒM‹ØX\˜šZˆ]]ÛX]\ØÚH™\ÝH™\ØÚZØ˜\™H™\ÛÛ]YH\ˆ˜X\ˆÛÜ™ÙZÛÞ™[‹ˆ‹”Ø][Y]Ù\™[YYY[ˆZ™ØÚZYˆÜ˜\Ú\È˜[ˆ\ÜšHÛÜ›[XYÙ\žHØ^X˜XÚÈ˜[˜YˆŒMˆ]Ù]ÛÛ™H˜X\ˆ\È]\˜ÚYY‹HÙˆX›XØ]YZ˜X\ŽÈHÚØ[HÜ˜[YHØ[ˆÝY\ˆšZ›‹ˆ‹“Ü[‘œ™YSX\ÒÈ[ˆ\ÜšHØ^X˜XÚÈÛÜ™[ˆYYYÙ[›ÛY[ˆ[ˆH™[ØXÚH[ˆØX\œ›Û™\›Y[[™Ù[ˆšZ›ˆÙY\ˆšXÚ˜X\ˆšXHH[šÛ\˜\™Hœ›ÛšÛ›Üˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËH‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ’XœšYHÙ\™[ØX\ÙYÙ]›ÙYÙ‹Ú[™Ù\Î–È“šY]]ÙH˜\Ú\ÛXYÈXœšYH
Ù\™[
HÛÛXš[™Y\\ÜšHÛÜ›[XYÙ\žHY]HXÝY[HXœšY™Y™\™[˜ÙH^Y\ˆ›ÛÜˆ[˜[Z\ØÚHÙYÙ[‹X]Ù[ˆ[ˆÙXšYYÛ˜[Y[‹ˆ‹‘H™\ÝX[™HØ][Y]
Ù\™[
K[XYÈ›Z™\\™\ØÚZØ˜X\ˆ›ÛÜˆY[ˆØÚÛÛˆØ][Y]™Y[›Û™\ˆ]]ÛX]\ØÚH™Y™\™[Y[XYËˆ‹’XœšYH
Ù\™[
HØ[ˆÛÚÈ[ÈÝ[™X\™ØX\ÛÜ™[ˆÙZÛÞ™[ˆ[ˆ[œÝ[[™Ù[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌË‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ•šY\šÛ]\šYÙH]XÝZZ\ÜÝZ›[ˆ™]›Ý]Ø˜\™HX›XØ]YH‹Ú[™Ù\Î–È‘HÙZÛÞ™[ˆ]XÝZÛ]\ˆ
›]]Ë›ÜÙÜ›Ù[‹X\™HÙˆX\œÊHÛÜHÛÚÈÛÜˆ[ˆ™[œÝ\XœËš[XZ\™HXÝY\È[ˆH™[[™ÜšZšÜÝHØX\Û›Ü[‹ˆ‹‘HÙ[˜[H™[œÝ\›ÙÚXØH›Z™ZY[™ˆY[ˆšY]]È\™[œÝ\ˆ™\˜[™Ý]™\ÝX[™H™[œÝ\ˆ\™XÝ›Û™\ˆÝ™\›\[™HZ]Ý\[š[X]YKˆ‹‘HÛœ™ZÙ[™H[[YKXYš[šÙ[ZšÚY[ˆšZ›ˆ\œÝ[›Ù]HXÚH›ÙXÝYXZ[[ˆÚ]XˆYÙ\Ë\X›XØ]YHÙY\ˆ›ÛYYÈÛYÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒH‹]NˆŒHÙ\[X™\ˆŒˆ‹]Nˆ•™[œÝ\Ú\ÜÙ[ÛZ]]ÝYH™[œÝ\ˆ\™XÝ‹Ú[™Ù\Î–ÈšZˆ]Ú\ÜÙ[[ˆ™\™ÚZ›]ÝYH™[œÝ\ˆH°ìðìÜˆ]šY]]ÙHÜ[ÈÛÚÈÜ˜YÙ\™H[Y›ÛÛœÈÝ[›™[ˆY[H[ˆØX\YÙ[ˆšY]ÛÜÝ™\ˆ[ØX\ˆY[ˆÝX[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒ‹]NˆŒHÙ\[X™\ˆŒˆ‹]Nˆ‘pê[ˆZ\ÜÝZ›[ˆ›ÙÈXX\ˆ0êpê[ˆ™[œÝ\ˆYÙ[ZšÈ‹Ú[™Ù\Î–È“Y[KØX\YÙ[‹™\Ù]Ë[œÝ[[™Ù[‹[™ZY[™ËÚZžšYÚ[™Ù[ˆ[ˆÙ\™YYØÚ\[ˆÙXœZZÙ[ˆ›ÛÜX[ˆ]™[™H™[œÝ\œÚ˜X›ÛÛ‹ˆ‹‘Y[ˆšY]]È™[œÝ\ˆÛZ]]]ÛX]\ØÚ]™[œÝ\ˆ][Ü[œÝÛ™ÈY[H[ˆØX\YÙ[ˆÝ[›™[ˆ\ÈšY]YY\ˆÝ™\ˆ[ØX\ˆY[ˆÝX[‹ˆ‹’ÛÜ[ˆ›Ù]›Z™[ˆ˜\ÝÝX[ˆ[ˆ[Y[ˆ]ZY[™Y[ØÜ›Û›Ù]Û›Ü[ˆ[ˆ™\œÚY[[[Y\ˆ™\™ZZØ˜X\ˆ›Z™[‹ˆ‹‘H[Ù[Y[™HZÜÝÜ›ÛÝHØÚX[HÛÚÈ™YÙ[YœÝ[™[ˆ™\XØ[HZ[]HYYH[ˆ[HšY]]ÙH™[œÝ\œËˆ‹’[ˆ[œÝ[[™Ù[ˆÝ[ˆ™HY[ˆ›]]ËÜ›Ù[‹X\™KHÙˆX\œÈÛ]\™[œØÚ[XH›ÛÜˆ[H™[œÝ\œÈÚY^™[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌ‹ÌH‹]NˆŒHÙ\[X™\ˆŒˆ‹]Nˆ’[X\™Ù\›Y[HÙ\šÝÙY\ˆÜÛZ[™\™HØÚ\›Y[ˆ‹Ú[™Ù\Î–È‘HÛÜ[ˆÛ™\šØ[˜[ˆ]Y[H›Z™[ˆšXÚ˜X\‹\ÚZ›HÜY\È\\ÜÙ[ˆÛÙ\[Ý[›™[ˆØÜ›Û[‹ˆ‹’[œÝ[[™Ù[ˆ[ˆ]™\œÚY[[[Y\ˆ›Z™[ˆ[Z™™\™ZZØ˜X\ˆ[ˆH›ÛÝ\ˆÙXœZZÝHH˜X[H]XÝˆ‹‘H™\XØ[HZ[]H\ÜÙ[ˆY[K[ÜY\ÈÜ›ÙZ][ˆÜš[\›ÛÜX[ˆYYHY]HÙZÛÞ™[ˆZÜÝÜ›ÛÝKˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌ‹Ì‹]NˆŒÌH]YÝ\Ý\ÈŒˆ‹]Nˆ‘]XÝ\È›ÛÜX[ˆ›ÛYYÈ\œÛÛÛ›ZšÈ‹Ú[™Ù\Î–È‘HÛÛ[Y\˜ÚpêÛHX›Û›™[Y[ËH[ˆ™[Z][[ÙÚXØH\È™\ÚZ™\™È[HX[Ù^šYÙHYÙ[ˆšZ›ˆ\™XÝ™\ØÚZØ˜X\‹ˆ‹‘H˜\ÝHÛÙ\œÈ[ˆÛÚZÚÙ[›ÛÛÜ™HšZ›ˆ˜\ÝÙ[YÙ›Û™Y]X[]XÝYKÝY[Z™[™ØÚ\›Ù[KÛÙÝH[ˆQT‹ˆ‹“šY]]ÙHš[Üš]Z][ˆ›ÛÜˆXœšYHØX\[™›ÚY]\YÚÛ›Ü[ˆ™]›Ý]Ø˜X\™\™HÔÈšZ›ˆX[ˆH[›š[™ÈÙYÙ]›ÙYÙˆ‹‘Ú]Xˆ›Ý]Ý[ˆX›XÙY\]XÝ›ÛÜX[ˆ]]ÛX]\ØÚ˜HY[ˆœ›Û˜ÛÙK]\]Kˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌ‹ŽH‹]NˆŒŽH]YÝ\Ý\ÈŒˆ‹]Nˆ•\]\È\™XÝšXÚ˜X\ˆ‹Ú[™Ù\Î–È‘]XÝÛÛ›ÛY\šZˆÜ[™[ˆ[ˆ\YÚÙ\™[ˆ˜X\ˆH\\™XÝÜY[ˆšY]]ÙH™\œÚYKˆ‹‘Y[ˆšY]]ÙHÙ\šXÙ]ÛÜšÙ\ˆ™Y[]H\]]ÛX]\ØÚÝ™\ˆ›Ù]Y[ˆÝYH™\œÚYHZ[™\ˆ[™È›Z™[™Ù[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌ‹Ž‹]NˆŒÈ]YÝ\Ý\ÈŒˆ‹]Nˆ“Û™\ž›ÙZÈ[ˆÞ[˜Ú›Ûš\Ø]YH‹Ú[™Ù\Î–È“˜HYY\™H\]H™\œØÚZ›0êpê[ˆÙY\ˆY[ˆÝ™\žšXÚ[ˆÙ]ÛÛ™HX[ˆšXHY[HˆÚZžšYÚ[™Ù[ˆÝ[ˆ™H]]\ˆÜšY]]È™ZÚZšÙ[‹ˆ‹“šY]]ÙHÛ™\ž›ÙZÜË\™\Ù]ÈXZÙ[ˆÛ™[ØÚZÙ[[ˆ[ÙÙ[ZšÈ\ÜÙ[ˆQTˆ[ˆÛÙÝK›Ù[H[ˆ[™ØÚ\[ˆ\˜Ù[[ˆ[ˆ\ÝÜšYKˆ‹’[œÝ[[™Ù[ˆ[ˆ™\Ù]ÈØX[ˆ›ÛÜX[ˆYYHY]HÛÝY\Þ[˜Ú›Ûš\Ø]YHØ[›™Y\ˆ™HY]ÛÛÙÛH™[[™Ù[ÙÙˆ‹‘HÛÝYÝ]\ÈY[HY\›ZšÈÙˆÞ[˜Ú›Ûš\Ø]YHÙ\šÝÙˆÛÜˆš\™X˜\ÙHÛÜ™Ù]ÙZYÙ\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌ‹È‹]NˆŒÈ]YÝ\Ý\ÈŒˆ‹]Nˆ“šY]]ÙHØX\[ˆ™]\ˆ›ÙZÙ[ˆ‹Ú[™Ù\Î–È‘HY™XÝHÐT•ËX˜\Ú\ÚØX\\È™\˜[™Ù[ˆÛÜˆY[ˆÝXšY[KXÚHÙ\™[ØX\˜[ˆ\ÜšH›Û™\ˆTK\Û]][Y[[™Ëˆ‹Y™\Þ›ÙZÙ[ˆÙ\šÝšY]YY\ˆ[Y[ˆ[ˆ™Y\›[™ˆÛÚÈX]Ù[ˆ[ˆY™\ÜÙ[ˆ[ˆœ˜[šÜšZšÈ[ˆH™\Ý˜[ˆ]\›ÜHÛÜ™[ˆÙ]›Û™[‹ˆ‹’]›ÙZÝ™[œÝ\ˆÙXœZZÝÜY[ˆ[Y›ÛÛˆYY\ˆZ[]H[ˆ[™ÙH™\Ý[][ˆ›Z™[ˆY\Ø˜X\‹ˆ—_WKÙYOH™]XÝ[\Ý\ÙY[‹]™\œÚ[Ûˆ‹YO[™]ÈÙ]Ù[˜Ý[Ûˆ™JŠ^ÚYŠYKš\ÊŠ_\[ÙˆÚ[™ÝÏˆHŠ\™]\›ˆLÝž^Ü™]\›ˆÚ[™ÝË›ØØ[ÝÜ˜YÙK™Ù]][J]XÝXÚ[™Ù[ÙË\ÙY[Ž‰ÛŸX
OOOHžY\ÈŸÚ[™ÝË›ØØ[ÝÜ˜YÙK™Ù]][JÙYJOOO[ŸXØ]ÚÜ™]\›ˆL__Y[˜Ý[ÛˆÙYJŠ^ÚYŠYK˜Y
ŠKJ\[ÙˆÚ[™ÝÏˆHŠJ^Ýž^ÝÚ[™ÝË›ØØ[ÝÜ˜YÙKœÙ]][J]XÝXÚ[™Ù[ÙË\ÙY[Ž‰ÛŸXžY\ÈŠ_XØ]Úß]ž^ÝÚ[™ÝË›ØØ[ÝÜ˜YÙKœÙ]][JÙYKŠ_XØ]Úß__XÛÛœÝYYOH™]XÝZYKX]]ÛX]XËXÚ[™Ù\ÈŽÛ]ZÏ[[Ù[˜Ý[ÛˆYJ
^ÚYŠZÈOO[[
\™]\›ˆZÎÝž^Ü™]\›ˆÚ[™ÝË›ØØ[ÝÜ˜YÙK™Ù]][JYYJOOOHžY\ÈŸXØ]ÚÜ™]\›ˆL__Y[˜Ý[ÛˆÞ™JŠ^ÙZÏ[ŽÝž^Ü™]\›ˆÚ[™ÝË›ØØ[ÝÜ˜YÙKœÙ]][JYYKÈžY\ÈŽˆ››ÈŠKZÏ[[LXØ]ÚÜ™]\›ˆL__Y[˜Ý[ÛˆÞ™JŠ^Ü™]\›ˆYYJ
I‰ˆ^™JŠ_XÛÛœÝž™O^Ý™\œÚ[ÛŽ–]K]NˆŒLÈÚÝØ™\ˆŒˆ‹]Nˆ‘Ù[ÛÙÚYHœ˜[šÜšZšÈ[ˆ™\œÚYH\™XÝšXÚ˜X\ˆ‹Ú[™Ù\Î–È’]XÝY[H™\œÚY[[[Y\ˆÝX]\™XÝ˜X\ÝHY[ZÛ›Ü[ˆÜ[Y]0êpê[ˆZÈ]ÚZžšYÚ[™ÜÛÝ™\žšXÚˆ‹”‘ÓKYÙ[ÛÙÚYHœ˜XYÝHHÙ[ÛÙÚ\ØÚHY[šZYÜšXHÙYHÙYØ[™ÜÜ[[ˆ[ˆšYYHYÙ[™H\™XÝ[ˆHØX\Ü\ˆ‹šZˆY[ˆZ™[ZšÙHÝÜš[™ÈÛÜ™HØX\XYÈšY]Z]Ù^™]ÈšZˆY[ˆšY]]ÙHÛZÈÛÜ™H[™›Ü›X]YHÜšY]]ÈÜÙZX[ˆ—_K^™OVÞÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒÈ‹]NˆHÙ\[X™\ˆŒˆ‹]Nˆœ™YH™YÚ[ÜØØ[ˆÙYÙ]›ÙYÙ‹Ú[™Ù\Î–È‘Hœ™YH™YÚ[ÜØØ[ˆ›ÙYÝˆ™]Ù^™[ˆ›ÜÜÚY[ØØ]Y\Ëˆ\˜Ú[ÛÙÚ\ØÚHÛÛ^Ú]\È[ˆÙ™šXÚpêÛH™^šY[œÝØX\™YÚY[ˆÙˆÙ[ÜÚ]\ÈÙKˆHZ[™\˜[[›XYÈ›Z™™]Ý\ÝÛ™Ù]ÚZžšYÙÛY]^˜H”‘ÓKZ[™XÙ\ÈÙY[ˆ™]›Ý]Ø˜\™HX›YZÜËHÙˆÜ\›ZÝ\ZÚÙ[ˆÜ]™\™[‹ˆ‹”ÜXÝXÝ[Z\™HØ[™[›Ý]\ÈÜ›ÙZ]˜[ˆLH˜X\ˆMHÙ™šXÚpêÛHÔ[Z›™[ˆY]Ý^\ÜÙx $Ð[›ÝK0à™\˜Ú[™ÙJÊ\žKY\œ™KS]°êYH[™ÜÈšY]^Ø][XXÈ[ˆ[ÛZ[È[™ÜÈHðê[0êKZÛY™™[‹ˆ‹”š]°ê]\œ™Z[‹Ü›Ù]™KH[ˆÙYÙÙ]˜X\‹™\ØÚ\›YH›ËY]XÝÚ]\È[ˆZ™[ZšÙHÛZ][™ÈÛÜ™[ˆ^XÚY]Ù[Y[ˆ›ÝXØYÝ\ˆ›Z™šXÚ˜X\ˆ›ÛÜˆ]\˜Ú[ÛÙÚ\ØÚH™Y[XX\ˆ\ÈšY]™^›ÙZØ˜X\‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒˆ‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ“Z[™\˜[[ˆ[ˆ›ÜÜÚY[[ˆY]™]ÚZœÈ‹Ú[™Ù\Î–È•ÙYH\\H[YÙ[ˆ›ÙYÙ[ˆLˆZ[™\˜[ÙÚ\ØÚHØØ]Y\È[ˆŒˆ›ÜÜÚY[š[™X]Ù[ˆÙKÙ\Ù[XÝY\™Z]HÙ™šXÚYY[Ù]˜[YY\™HS”ËZ[™[\š\È[ˆÙ™šXÚpêÛH™^›ÙZÙ\œØœ›Û›™[‹ˆ‹[HZ[™\˜[[›ØØ]Y\ÈYÙÙ[ˆš[›™[ˆÚ\˜ØHp¯H]\‹Y]ÙYH^XÚY]HÔÔ“K\˜[™Ù]˜[[ˆ˜[ˆLˆ[ˆMHZ[][‹ˆÚ[YÈ›ÜÜÚY[ZÚÙ[ˆYÙÙ[ˆš[›™[ˆÚ\˜ØHLZ[][ŽÈ[Y[ˆHZ]›Û™\›ZšÈšZšÙHX›YZÜÝš[™X]Ù[ˆ°ê[Ûˆ[ˆØ[œØ[ˆÝX[ˆ[È[™Ù\™HYÝØÚÜHØX\ˆ‹’YY\™HÜ\™\›Y[\œ™Z[\K™]ÚZœËšXÚ˜X\šZYX[ˆ]Ü\›ZËšZZ™œ›Û‹X\šÙ\œ™XÚ\ÚYKÙYØ[™È[ˆ™\ž˜[Y[™YÙ[Ëˆ™\ØÚ\›YÙˆš]°êH›Z™šXÚ˜X\‹XX\ˆÛÜ™›ÛÚ][ÈÙ\Ý[[Z[™ÈÙ\™\Ù[Y\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒH‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ“Ù™šXÚpêÛHØ[™[›Ý]\È[ÈZ›™[ˆ‹Ú[™Ù\Î–È‘Y[ˆ\\HXYÈÜXÝXÝ[Z\™HØ[™[›Ý]\ÈÛÛ[ˆXÚH›Ý]YÙ[ÛY]šYpêÛˆZ]Ù™šXÚpêÛHÔYÝÛ›ØYÎÈÙY[ˆ[[ˆ[ˆÙY[ˆY]H[™Ù]ZÙ[™H™[˜Y\š[™Ù[‹ˆ‹‘HÙ[XÝYHÛÜ˜[ˆHÛY™™[ˆ[ˆØ]\˜[[ˆ˜[ˆÝ[ˆÜ™ÙÛ™HšXHHÛÝ™[ˆ˜[ˆ]™^\›ÛˆÝH[ØX[œYÙÙ[ˆ˜[ˆHØ[[ˆXZÚÙ[ZšËÙ[ZY[[ˆØX\ˆX˜™[ˆ\šÙ[˜˜\™HÜ›Ù[™KÜ˜[š™H[ˆ›ÙHZ›™[‹ˆ‹‘Y[ˆZÈÜY[ˆ›Ý]HÛÛYœÝ[™
Ë]\‹X\šÙ\š[™Ë[™ØÚ\[ˆÚ[Y™KÛ[KHÙˆÛ]]\Ù\šËÛšYKH[ˆ\œ™Z[ØX\œØÚ]Ú[™Ù[‹›Ý]H˜X\ˆHÝ\Ù™šXÚpêÛHÙXœÚ]H[ˆÙ™šXÚpêÛHÔˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒ‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ™\Ý[[Z[™È™\X[Hš]‹Ú[™Ù\Î–È™^šY[œÝØX\™YÚY[ˆÜ›ÙZ]˜[ˆÍÈ˜X\ˆŽHÙXÛÛ›ÛY\™HZÚÙ[‹ˆHÌˆX[[[™Ù[ˆYÙÙ[ˆH˜YZÈÜ]][YZÙHÜ›ÝÝ[œÝ™Z\ÝÜš\ØÚH[ˆ›ÛYZ[œÙHÚ]\ËpëÛ™\ËÝY›ÜÈ[ˆZ]›Û™\›ZšÈ[™ØÚ\ˆ‹”™Z\ÝÜšYH	ˆ\˜Ú[ÛÙÚYH\ÈY[ˆZYÙ[ˆ™]™[™HØ]YÛÜšYKˆšY]]ÙHÜ\ÈYÙÙ[ˆZ]ØX\›ÛHY[ˆ[™Ù\™Hš]H[ÙZ]HØX\™\È[ˆ™\›Y[[ˆY\›ZšÈ™\XØx &\Ë™\Ù\™\š[™ËÛZ][™Ë˜\[ˆ[ˆØ\™HÙYØ[™Ëˆ‹‘H™Z\ÝZ™\ÈÙY[ˆ\™H]\™Ü™[œÈYY\Žˆˆ™\Ý[[Z[™Ù[ˆYÙÙ[ˆš[›™[ˆÚ\˜ØHšYH]\‹ˆšX]^Ø\™Ø\È[ˆZ\‹[›Û‹TZ\ˆ›Z™[ˆ[È^XÚY]HZ]›Û™\š[™Ù[ˆšXÚ˜X\ˆÜÚ\˜ØHÈ]\ˆˆÝÈ]\ˆLËˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒÈ‹]NˆÙ\[X™\ˆŒˆ‹]Nˆ™^šY[œÝØX\™YÚY[ˆ›Û™0êY\˜XÈ‹Ú[™Ù\Î–È‘Y[ˆ\\HXYÈ™^šY[œÝØX\™YÚY[ˆÛÛÍÈXÚH™\Ý[[Z[™Ù[ˆ›Û™0êY\˜XÎˆÜ›Ý[‹Ø\Ý[[ˆ[ˆpëÛ™\Ë\ÝÜš\ØÚHÜœ[‹˜]]\ˆ[ˆÝYH›ÜÜÙ[‹Z]šXÚ[[ˆ[ˆØ]\›[™ØÚ\ˆ‹’YY\ˆ[YYY[ˆZYÙ[ˆØ]YÛÜšY\Þ[X›ÛÛY[ˆX™[šZˆ™\™\ˆ[ž›ÛÛY[ˆ[ˆY[ˆÙY][YÙHÜ\Y]™^›ÙZÚ[™›Ü›X]YKÜ[˜˜\™HÛðíœ™[˜][‹œ›Ûˆ[ˆY[ˆ\™XÝH]]Ü›Ý]H˜[˜Yˆ0êY\˜XËˆ‹‘H›Ý]X™\™ZÙ[š[™È™\›Y[YœÝ[™[ˆšXÚZ™›Û™\ˆ™\šÙY\œÙZÝKˆÍZÚÙ[ˆYÙÙ[ˆš[›™[ˆÚ\˜ØHŒÈZ[][ŽÈØZ[PÚ\œKS\ÜYKY\˜XÈ[ˆ˜\œšpê™\ÈÝX[ˆY\›ZšÈ[È˜[™ÙXšYYÜø $ÍÌHZ[][‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒˆ‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ\˜Ú[ÛÙÚ\ØÚH™YÚ[ÈZ]ÙXœ™ZY‹Ú[™Ù\Î–È‘Hœ›Û›XYÈÜ›ÙZ]˜[ˆŒˆ˜X\ˆÎZÚÙ[‹ˆšY]]ÈšZ›ˆÛ™\ˆYY\ˆHXYÙKÛÝYÛ˜XËÛÛX™H°êÜ™K›ØÈHHØ]™K™\ÈÛY[œËHÜYH˜[ˆ8 &R[\\›˜[[ˆ]\˜Ù[œË]\]XYXÝ˜[ˆ™\œËØ^˜[ËX˜˜^YH›Ý]™[H[ˆ]ÝYHØ\ÝY[\œ™Z[ˆ˜[ˆ^™XÚˆ‹’]Û™\ž›ÙZÜÚØY\ˆ\È™\œZ[YÝÚ\˜ØHÍH0åÈÚ[ÛY]\ˆ›Û™0êY\˜XÎÈHœ˜[šÜšZšË\™\Ù]Ü[Y]ÈZ[Y\ˆ›Ù]ÛÚÈÛÝ\™Û‹^™XÚ[ˆ]\˜Ù[œÈ\™XÝ[ˆ™Y[\ÜÙ[‹ˆ‹‘HÚØ[H‘ÔQÑKYZÚÚ[™È›ÛÝYH™\œZ[Z[™ÈY]MLÛZØ˜\™HØ]\›Ü[‹ØX\˜[ˆÍHY]Y[ˆÙ\X›XÙY\™H˜X[Kˆ™\ØÚ\›YH[ˆ›ËY]XÝZÚÙ[ˆ›Z™[ˆšXÚ˜X\ˆ[È\˜Ú[ÛÙÚ\ØÚHÛÛ^ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒH‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ•Ø]\‹[™™YZÚÚ[™È[ˆ\˜Ú[ÛÙÚYH\œÝ[‹Ú[™Ù\Î–È‘ÔQÑK]Ø]\›Ü[ˆÛÜ™[ˆ›Û™0êY\˜XÈÜÜœÛš]™X]HZY[ZšÈZÚÙ\ˆÙ]ZÙ[™ˆHNHÚØ[HØ]\›Øš™XÝ[ˆšZ›ˆÛZØ˜X\ŽÈšZˆÌÈX\˜[ˆX›XÙY\Hœ›ÛˆY[ˆ˜X[Kˆ‹“ÐÔÈÑH™\X[HÙ™šXÚpêÛHÔËH[ˆTËXÛÙ\È›ÛÜX[ˆ˜X\ˆÙ]ÛÛ™H™Y\›[™ÙH›Ù[X™YZÚÚ[™È[ˆÜ›Û™ÙXœZZËY]Z[˜X\ˆ[ˆÜ\›ZÝH[ˆXÝ\™Kˆ‹‘HYÙHÚØ[H\˜ÚSØØË[XYÈ\È™\ÚZ™\™ˆHÙ™šXÚpêÛHX›YZÜÙ]\Ù]™]˜][Øš™XÝ[ˆ[ˆH™]™[ˆÛ™\ž›ÙZÜÙÙ[YY[[‹ˆHŒˆXÚHœ›Û›ØØ]Y\ÈÝX[ˆ›ÛÜX[ˆ\šÙ[˜˜X\ˆ[È\˜Ú[ÛÙÚ\ØÚHZÚÙ[ˆ0­È0êY\˜XÈ
ŒŠH[ˆH™\Ù]ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒŒ‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ™ZÙ[™H\˜Ú[ÛÙÚ\ØÚHZÚÙ[ˆÜHØX\‹Ú[™Ù\Î–È‘Hœ˜[šÜšZšÈ0­È0êY\˜XË\™\Ù]ÛÛHY[ˆ\\HØX\XYÈY]Œˆ˜Y\ˆÛ™\ž›ØÚHÝY[Z™KÙ[\ØÚK›ÛYZ[œÙH[ˆZY[Y]]ÜÙHØØ]Y\Ëˆ‹™\ØÚ\›YÙˆ›ËY]XÝ™]ZÙ[›ÛÜX[ˆ[Y[ˆY[ˆZY[ZšÙHØX\œØÚ]Ú[™È[ˆHÜ\ˆ][›Z™šXÚ˜X\ˆ›ÛÜˆ]\˜Ú[ÛÙÚ\ØÚHÝX[™Y[ˆ‹‘^XÝHœ›Ûœ[[‹Y]KY]Ù[˜H[ˆÛØ˜[HÙ[YY[\ÜÚ]Y\ÈÜšZ™Ù[ˆ™\œØÚ[[™HÞ[X›Û[ˆ[ˆYY\™HÜ\™\›Y[HØØ]Y\™XÚ\ÚYH[ˆœ›Û‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒNH‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ‘œ˜[šÜšZšÈ0­È0êY\˜XË\™\Ù]\œÝ[‹Ú[™Ù\Î–È‘œ˜[šÜšZšÈ0­È0êY\˜XÈÝX]›ÛÜX[ˆ[Z™Û™\˜X[ˆ™\Ù]ËÛÚÈØ[›™Y\ˆY[ˆÝY\™HÚØ[HÙˆÛÝYZœÝ^™H™\Ù]›ÙÈšY]™]˜]Kˆ‹‘H™\Ù]ÚY\ÝXœšYHÙ\™[XÝ]™Y\H™\È™]Ù^™[ˆœ˜[œÙH™[YÙ[ˆ[ˆ™\œX]ÝHØX\˜X\ˆHÛ™\ž›ÙZÜÜ™YÚ[È0êY\˜XËˆ‹‘Y[ˆ™\›ÝY\™HÛÝYZœÝÛÜ™˜H]Y[ˆ]]ÛX]\ØÚY]HÛœ™ZÙ[™H™\Ù]Ù\™\\™Y\™ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒN‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ•0êY\˜XËX[˜[\ÙHÜÙ\ØÚÛÛ™‹Ú[™Ù\Î–È‘H™[\Ý˜[ˆHšY]]ÙH0êY\˜XËX[˜[\ÙHØ\ÈšY]ÛÙYÙ[›ÙYÎˆ[[™ÚÛ\ÜÙ[‹Û™\ž›ÙZÜÚØX\[ˆ]ÜÜÙHÛ™\ž›ÙZÜÞ›Û™K]›ZÈšZ›ˆX\›ÛHÙY\ˆ™\ÚZ™\™[ˆX]È˜[ˆ[ÈÙZÛ]\™H˜ZÚÙ[ˆ›Û™\ˆœZZØ˜\™HYY\ØX\™HH›Z™[ˆÝX[‹ˆ‹‘HÚØ[HÛ™\ž›ÙZÜØY˜˜ZÙ[š[™È›Z™[\›ˆ™\ÝX[ˆÛH\˜ÚSØØÈ[Y[ˆ›ÛÜˆ0êY\˜XËØ]\Ë[ÛÙ\ÝK]™\˜Ø[pê™K^\š[\Ë^™XÚ[ˆÚ[™ÝHHY[ŽÈX\›ÛÜˆ\ÈÙY[ˆ^˜HØX\›ZÈ›ÙYËˆ‹‘Hœ˜[šÜšZšË\™\Ù]\ÈÜÙ\ØÚÛÛ™[ˆ™]˜]H[Y[ˆH™]Ù^™[ˆ™[YÙ[ŽˆXœšYHÙ\™[QTˆ‘ÔQÑK]Ø]\›Ü[‹ÐÔÈÑH[™™YZÚÚ[™ËÙ[ÛÙÚYHNLŒ›Ü°êÈ[˜ÚY[›™\È[ˆHÚØ[H\˜ÚSØØË[XYËˆ‹”ÔËX›Üš[™Ù[‹Q‹Ø]š]0ê\È[ˆÙ[ÛÙÚYH
È™[pêÙˆ›Z™[ˆ[™X]YÈ™\ØÚZØ˜X\‹XX\ˆÛÜ™[ˆšY]]]ÛX]\ØÚÛÜˆHœ˜[šÜšZšË\™\Ù]X[™Ù^™]ˆ‹‘Y[ˆšY]]ÙH[˜[\ÙZØX\ÛÛ]\È\YÈ[ÈH[™›Ü›X]YH\ˆØØ]YHZY[ZšÈZ]YØ˜X\ˆ[ˆ[ˆH˜ZÝZšÈœZZØ˜X\ˆ\Ëˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒMÈ‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ•0êY\˜XËX[˜[\ÙH[ˆœ˜[šÜšZšË\™\Ù]‹Ú[™Ù\Î–È•0êY\˜Xø $ÐØ]\ø $Ó[ÛÙ\Ýx $Ó]™\˜Ø[pê™x $Ô^\š[\ø $Õ^™XÚ8 $ÑÚ[™ÝHÙ\™[ÈÚØ[HÛ™\ž›ÙZÜÞ›Û™H[™Ù\šXÚ[ˆ\˜ÚSØØÈÙ\™Ý^™HÙ[YY[[ˆ™\\šÝˆ‹‘Y[ˆY\œÝH™\™ZÙ[™H0êY\˜XËX[˜[\ÙHY][[™Ë™[pêÙ‹Ø]\˜YœÝ[™[ˆ\˜ÚSØØËXÛÛ^Ù\™ÙYÙ]›ÙYÙÈ^™H[˜[\ÙH\È˜H™[\Ý[ˆ‹ŒÌËŒNÙY\ˆ™\ÚZ™\™ÛY]H™\Ù[]YHÛ›ÛÙ[™HœZZØ˜X\ˆ›YZËˆ‹“Û™\˜X[ˆ™\Ù]ÈÙ\™œ˜[šÜšZšÈÙYÙ]›ÙYÙY]XœšYHÙ\™[[ˆH™[[™ÜšZšÜÝHœ˜[œÙHÛ™\ž›ÙZÜÛYÙ[‹ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒMˆ‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ›Ù[KÙ[ÛÙÚYH[ˆÛ™\™Ü›Û™œ˜[šÜšZšÈ‹Ú[™Ù\Î–È”‘ÓKX›Üš[™Ù[ˆ
”ÔÊKQˆ[ˆÙ[ÚØ[\ÙY\™HÛ™\™Ü›Û™ÙHÛ\ÈšZ›ˆÙYÙ]›ÙYÙÛ™\ˆ›Ù[H	ˆÙ[ÛÙÚYKˆ‹”‘ÓK[YÙ[ˆÙXœZZÙ[ˆHÙ™šXÚpêÛHÙ\šXÙ\È[ˆ›Z™[ˆX[[[™HÛ™\ž›ÙZÜÚ[™›Ü›X]YNÈ™HÝX[ˆšY]Ý[™X\™[ˆHœ˜[šÜšZšË\™\Ù]ˆ‹‘HÙ[ÛÙÚYKH[ˆÛ™\™Ü›Û™YÙ[ˆšZ›ˆÛ™\ˆ0êpê[ˆZY[ZšÙHœ˜[šÜšZšËYÜ›Ù\Ù^™]ˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒMH‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ“ÝYH›ÜÜÙ[ˆœ˜[šÜšZšÈ‹Ú[™Ù\Î–È‘HÙ™šXÚpêÛHQÓ‹[XYÈ›Ü°êÈ[˜ÚY[›™\È\ÈÙYÙ]›ÙYÙˆ‹‘X\›YYHÛÜ™[ˆÝYK™XÙ[H[ˆ™\™Ù[™[ˆ›ÜÙÙXšYY[ˆšXÚ˜X\ˆÜ˜\Ú\È˜[ˆHNYKYY]]ÜÙH0â]][XZ›Ü‹X›ÜØ™YZÚÚ[™È[ˆH[Ù\›™H‘›Ü°êˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒM‹]NˆŒÈÙ\[X™\ˆŒˆ‹]Nˆ\˜ÚSØØÈœZZØ˜X\ˆÙ[XXZÝ‹Ú[™Ù\Î–È\˜ÚSØØÈÙXœZZÝHš[XZ\™HÚ]]™[[ˆZ]HÙ™šXÚpêÛH™YÚ[Û˜[H]\Ù][ˆX]È˜[ˆœšZÙ[YÙHÜÜÙHØš™XÝ™[[‹ˆ‹“˜X[KÛ\ØÚšZš[™Ë\š[ÙK]\š[™Ë\HØØ]YKš[™X]ËÙ[YY[K™\ØÚ\›Z[™È[ˆœ›Û™\ÚZžš[™Ù[ˆÛÜ™[ˆØX\ˆX[Ù^šYÈ[ˆHÜ\Ù]ÛÛ™ˆ‹‘Hœ˜[šÜšZšËZÛÙ™ØÚZÙ[X\ˆ™Y[]HÛ™\ž›ÙZÜÛYÙ[ˆYYKˆ—_KÝ™\œÚ[ÛŽˆŒ‹ŒÌËŒLÈ‹]NˆŒˆÙ\[X™\ˆŒˆ‹]Nˆ‘œ˜[šÜšZšË[Û™\ž›ÙZÈÜÙ\ØÚÛÛ™‹Ú[™Ù\Î–È‘HX˜™[HÐÔÈÑK[XYÈ\È\YÙÙXœ˜XÚÝHœZZØ˜\™H[™™YZÚÚ[™ÜÛXYËˆ‹‘HšY\ˆØZÚÙH[™X]YÈ[™Ù]›Ù\™H0êY\˜XË\[[ˆšZ›ˆZ]H[\™˜XÙH™\ÚZ™\™ˆ‹•Ø]\›Ü[ˆ‘ÔQÑHŒˆšZ›ˆ™ZÝY[ˆ[ˆ\˜ÚSØØÈ\È›ÛÜ˜™\™ZYÜ[šÝY[ZšÙHÜ\Ëˆ—_WNÙ[˜Ý[ÛˆÞ™JÚ\ÓÜ[Ž›‹ÛÛÜÙN™_J^ØÛÛœÝÝ—OP‹\ÙTÝ]JYJKÚK×OP‹\ÙTÝ]JLJKOJ
OOžØÙYJ]JKJ
_KÏVØž™K‹‹‘^™WKP\œ˜^K™œ›ÛJ™]ÈX\
Ë‹‹›Ë‹‹ž™WK›X\
ÏO–ØË™\œÚ[Û‹×JJK˜[Y\Ê
JKœÛÜ

ËJOOK™\œÚ[Û‹›ØØ[PÛÛ\\™JË™\œÚ[Û‹›ÚYÛ[Y\šXÎˆLJJNÜ™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ•ÚZžšYÚ[™Ù[ˆ‹XÛÛŽššœÞ
“‹ÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN˜K›ÛÝ\ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LˆZ[‹ZVÍHÝ\œÛÜ‹\Ú[\ˆ^\ÛH‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙYÛÚ[™ÙN˜ÏOžÜŠË\™Ù]˜ÚXÚÙY
KÊWÞ™JË\™Ù]˜ÚXÚÙY
J__JK•ÚZžšYÚ[™Ù[ˆšY]YY\ˆÛ™[ˆ—_JKI‰ššœÞ
œ‹Ü›ÛNˆ˜[\‹Û\ÜÓ˜[YNˆ^\ÛH‹Ú[™[Žˆ‘HÙ]^™HÙ[KXX\ˆÛÛˆšY]Ü]\\˜X]ÛÜ™[ˆÜÙ\ÛYÙ[‹ˆŸJKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎ˜KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]ÛˆËY[‹Ú[™[Žˆ‘Ù^šY[ˆŸJW_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMÜXÙK^KM‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KMŒXY[™Ë\™[^Y‹Ú[™[Žˆ‘]\È\ˆX[™Ù\\ÝˆHšY]]ÜÝH™\œÚYHÝX]›Ý™[˜X[ŽÈY\™\™H\]\È›Z™[ˆY\›Û™\ˆ\YÈH^™[‹ˆŸJK›X\

ËJOOššœÞÊ˜\XÛH‹ØÛ\ÜÓ˜[YN˜›Ý[™Y^LÈ	ÝOOOLÈ˜™ËX›YKMLŽˆ˜™ËYÜ˜^KMLŸXÚ[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\\ÝYžKX™]ÙY[ˆØ\LÈX‹Lˆ‹Ú[™[ŽššœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞÊšˆ‹ØÛ\ÜÓ˜[YNˆ™›Û\Ù[ZX›Û^YÜ˜^KN‹Ú[™[Ž–È•™\œÚYH‹Ë™\œÚ[Û—_JKOOOL	‰ššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆœLKHKLH›Ý[™YY[™ËX›YKML^]Ú]H‹Ý[NžÙ›ÛÚ^™NˆŒÙ[HŸKÚ[™[Žˆ“šY]]ÈŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ý[NžÙ›ÛÚ^™NˆŒÎ[HŸKÚ[™[Ž˜Ë™]_JW_J_JKšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ™›Û[YY][H^YÜ˜^KMÌX‹Lˆ‹Ú[™[Ž˜Ë]_JKšœÞ
[‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž˜Ë˜Ú[™Ù\Ë›X\
OššœÞÊ›H‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\Lˆ^YÜ˜^KMÌXY[™Ë\™[^Y‹Ú[™[Ž–ÚšœÞ
ÝKÜÚ^™NŒMKÛ\ÜÓ˜[YNˆ^YÜ™Y[‹ML]LH›^\Úš[šËLŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Ž™ŸJW_KŠJ_JW_KË™\œÚ[ÛŠJW_J_J_Y[˜Ý[ÛˆÞ™JÚ\ÓÜ[Ž›‹ÛÛÜÙN™_J^Ü™]\›ˆšœÞ
šKÚ\ÓÜ[Ž›‹]Nˆ’[™ZY[™È‹XÛÛŽššœÞ
YËÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN™K›ÛÝ\ŽššœÞ
˜]Ûˆ‹ÛÛÛXÚÎ™KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]ÛˆËY[‹Ú[™[Žˆ”ÛZ][ˆŸJKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœMÜXÙK^KMˆ‹Ú[™[Ž–ÚšœÞ
œÙXÝ[Ûˆ‹ØÚ[™[ŽššœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^\ÛH^YÜ˜^KMŒ‹Ú[™[Ž–È‘]XÝ\ÈY[ˆØX\\›ÛÜˆY]X[]XÝÜš\Ý[‹›ÜÜÚY[[‹H[ˆZ[™\˜[[ž›ÙZÙ\œÈ[ˆ[X]]\‹X\˜Ú[ÛÙÙ[‹ˆH\ÛÛXš[™Y\‹šœÞ
œÝ›Û™È‹ØÚ[™[ŽˆŒL
ÈØX\YÙ[ˆŸJKˆY]ÔË›Ý]\ËZYÙ[ˆYÙ[‹ØX\[\ÜÈ[ˆZ]ÙXœ™ZY›Û™Ý[˜™ZY\‹ˆ—_J_JKšœÞÊËÝ]Nˆ”ØÚ\›Z[™[[™È‹XÛÛŽššœÞ
YËÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹LÈ‹Ú[™[Žˆ‘HÛ›Ü[ˆšZ›ˆ™\™Y[Ý™\ˆ]ØÚ\›H›ÛÜˆÜ[XX[ÙXœZZÎˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞ
‹Ý]Nˆ“[šÜØ›Ý™[ˆ‹][\Î–ÞÚXÛÛŽššœÞ
Y‹ÜÚ^™NŒMJK˜[YNˆ•ÙY\ÚYÙ]‹\ØÎˆ“Ü[Û™Y[ˆXÝYY[ÙY\ˆ[ˆZY[œ˜Y\ˆŸKÚXÛÛŽššœÞ
ÜÚ^™NŒMJK˜[YNˆ“Y][ˆ‹\ØÎˆYœÝ[™[ˆY][ŽÈšXHY[HX[‹ÝZ]ŸKÚXÛÛŽššœÞ
ËÜÚ^™NŒMJK˜[YNˆ•ZÙ[™[ˆ‹\ØÎˆ”[[‹Z›™[ˆ[ˆ›ZÚÙ[ˆZÙ[™[ˆŸKÚXÛÛŽššœÞ
KÜÚ^™NŒMJK˜[YNˆ‘^Ü\™[ˆ‹\ØÎˆ’ØX\ÝÛ›ØY[ˆÙˆš[[ˆŸW_JKšœÞ
‹Ý]Nˆ”™XÚØ›Ý™[ˆ‹][\Î–ÞÚXÛÛŽššœÞ
ÚÜÚ^™NŒMJK˜[YNˆ–›ÙZÙ[ˆ‹\ØÎˆ–›ÙZÈY™\ÜÙ[ˆ[ˆX]Ù[ˆ[ˆY[]\›ÜHŸKÚXÛÛŽššœÞ
KÜÚ^™NŒMJK˜[YNˆ“Y[H‹\ØÎˆ’[œÝ[[™Ù[ˆ[ˆÜY\ÈŸKÚXÛÛŽššœÞ
S‹ÜÚ^™NŒMJK˜[YNˆ’ÛÛ\\È‹\ØÎˆ•™\œØÚZ›šZˆÙY˜XZYHØX\ŸKÚXÛÛŽššœÞ
YËÜÚ^™NŒMJK˜[YNˆ’ØX\YÙ[ˆ‹\ØÎˆ“YÙ[ˆX[‹ÝZ]™][ˆŸW_JKšœÞ
‹Ý]Nˆ”™XÚÛÛ™\ˆ‹][\Î–ÞÚXÛÛŽššœÞ
ØËÜÚ^™NŒMJK˜[YNˆ‘ÔÈ‹\ØÎˆ’™HØØ]YH›ÛÙ[ˆŸKÚXÛÛŽššœÞ
ŒÜÚ^™NŒMJK˜[YNˆ–›ÛÛH‹\ØÎˆ’[‹H[ˆZ]›ÛÛY[ˆŸKÚXÛÛŽššœÞ
ËÜÚ^™NŒMJK˜[YNˆ•˜[œÜ\˜[YH‹\ØÎˆ‘ZÚÚ[™È˜[ˆXÝY]™HYÙ[ˆX[œ\ÜÙ[ˆŸW_JKšœÞ
‹Ý]Nˆ“[šÜÛÛ™\ˆ‹][\Î–ÞÚXÛÛŽššœÞ
‹ÜÚ^™NŒMJK˜[YNˆ”™\Ù]‹\ØÎˆ’ØX\[ˆYÙ[ˆ\YÞ™][ˆŸKÚXÛÛŽššœÞ
PKÜÚ^™NŒMJK˜[YNˆ”™\Ù]È‹\ØÎˆ”Û™[Y[ˆYÙ[˜ÛÛXš[˜]YHÚY^™[ˆŸKÚXÛÛŽššœÞ
ŒKÜÚ^™NŒMJK˜[YNˆ“[Û[Y[š[\ˆ‹\ØÎˆSRË[[Û[Y[[ˆÜ\š[ÙHš[\™[ˆŸW_JKšœÞ
‹Ý]Nˆ“Ü[Û™Y[Û™\˜X[ˆ‹][\Î–ÞÚXÛÛŽššœÞ
ZKÜÚ^™NŒMJK˜[YNˆ•›Û™ÝÛ›Ü‹\ØÎˆ•™\œØÚZ›Ø[›™Y\ˆ[™Ù\ØÚZÙ[[ˆY[HŸKÚXÛÛŽššœÞ
LÜÚ^™NŒMJK˜[YNˆ”›Ý]HÛ›Ü‹\ØÎˆ‘ÔË\›Ý]HÜ™[Y[ˆ[ˆ™Z\™[ˆŸW_JW_JW_JKšœÞÊËÝ]Nˆ“Y[HÜY\È‹XÛÛŽššœÞ
KÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹LÈ‹Ú[™[Žˆ’][X\™Ù\ˆY[H
™XÚØ›Ý™[ŠH™]˜]™[[™ÜšZšÙH[˜ÝY\ÎˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËYÜ˜^KML›Ý[™Y^LÈÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞ
Œ‹ÚXÛÛŽššœÞ
Y‹ÜÚ^™NŒMJK˜[YNˆ‘ÛÛÙÛKXXØÛÝ[‹\ØÎˆ’[›ÙÙÙ[ˆ[ˆ[™X]YÈÞ[˜Ú›Ûš\Ù\™[ˆŸJKšœÞ
Œ‹ÚXÛÛŽššœÞ
PKÜÚ^™NŒMJK˜[YNˆ’[™›È	ˆ[™ZY[™È‹\ØÎˆ\Z[™›Ü›X]YH[ˆ^™H[™ZY[™ÈŸJKšœÞ
Œ‹ÚXÛÛŽššœÞ
ÚÜÚ^™NŒMJK˜[YNˆ–›ÙZÈ[ˆ[Û[Y[[ˆ‹\ØÎˆ–›ÙZÈÜXÚYšYZÙH[Û[Y[[ˆŸJKšœÞ
Œ‹ÚXÛÛŽššœÞ
LKÜÚ^™NŒMJK˜[YNˆ’[œÝ[[™Ù[ˆ‹\ØÎˆ’ØX\YÙ[‹™\Ù]È[ˆ›Û™Ý[ˆ™Z\™[ˆŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ›]LÈLÈ™ËX›YKML›Ý[™Y^‹Ú[™[Ž–ÚšœÞÊš‹ØÛ\ÜÓ˜[YNˆ^^È›Û\Ù[ZX›Û^X›YKNX‹Lˆ›^][\ËXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
RKÜÚ^™NŒLŸJK’Û›Ü[ˆX[‹ÝZ]™][ˆ—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMÌX‹Lˆ‹Ú[™[Žˆ’[ˆ]Y[HÝ[ˆ™HÛ›Ü[ˆÛ™[ˆÙˆ™\˜™\™Ù[ˆÛH™HØÚ\›HÝ™\žšXÚ[ZšÈHÝY[ŽˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMÌÜXÙK^KLH[M\ÝY\ØÈ‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•›Û™ÝÛ›ÜŸJKˆHÛ›Ü›ÛÜˆ›Û™Ý[ˆ˜\ÝYÙÙ[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”›Ý]HÛ›ÜŸJKˆHÛ›Ü›ÛÜˆ›Ý]\ÈÜ™[Y[ˆ[ˆ™Z\™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•ÙY\ÚYÙ]ŸJKˆHXÝYY[ÙY\ˆ[šÜØ›Ý™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’ØX\YÙ[ˆŸJKˆHZYÙ[ˆYÙ[ˆYž›Û™\›ZšÈÛ™[ˆÙˆ™\˜™\™Ù[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“Y][‹ZÙ[™[ˆ[ˆ^Ü\™[ˆŸJKˆHÙ\™YYØÚ\[ˆ[šÜØ›Ý™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•ZÜÝÜ›ÛÝHŸJKˆHØÚZYœ™YÙ[X\œÈ[ˆ[™[[ˆÛ™[ˆ—_JW_JW_JW_JKšœÞÊËÝ]Nˆ‘ÔÈØØ]YH‹XÛÛŽššœÞ
ØËÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ‘HÔËZÛ›ÜYYšYHÝ[™[ˆ
ÛÛÙÛHX\ÈÝZ›
NˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LˆLˆ™ËYÜ˜^KML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËNN›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]H›Ý[™Y[ÈÚYÝË\ÛH‹Ú[™[ŽššœÞ
ØËÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^YÜ˜^KMŸJ_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È›Û[YY][H^YÜ˜^KMÌ‹Ú[™[Žˆ•Z]ŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML[LH‹Ú[™[Žˆ‹HÔÈšY]XÝYYˆŸJW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LˆLˆ™ËX›YKML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËNN›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™ËX›YKML›Ý[™Y[ÈÚYÝË\ÛH‹Ú[™[ŽššœÞ
ØËÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^]Ú]HŸJ_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È›Û[YY][H^X›YKMÌ‹Ú[™[Žˆ•›ÛÙ[ˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMŒ[LH‹Ú[™[Žˆ‹HØX\ÙXÙ[™Y\™Ü™HØØ]YHŸJW_JW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\LˆLˆ™ËYÜ™Y[‹ML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆËNN›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™ËYÜ™Y[‹ML›Ý[™Y[ÈÚYÝË\ÛH‹Ú[™[ŽššœÞ
ØËÜÚ^™NŒM‹Û\ÜÓ˜[YNˆ^]Ú]HŸJ_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È›Û[YY][H^YÜ™Y[‹MÌ‹Ú[™[Žˆ”šZ›[Ù\ÈŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ™Y[‹MŒ[LH‹Ú[™[Žˆ‹HØX\˜XZ]Y]™HYYHŸJW_JW_JW_JW_JKšœÞÊËÝ]Nˆ’ØX\YÙ[ˆ
L
ÊH‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ“Ü[ˆØX\YÙ[ˆ™XÚØ›Ý™[ˆ[ˆÚY\ÈY[ˆ˜\Ú\ÚØX\[XHÙˆ[™ˆYÙ[ˆÛÜ™[ˆ\ÈÙ[Y[ˆØ[›™Y\ˆ™H™H[œØÚZÙ[ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
ÙÛ˜[YNˆ\˜Ú[ÛÙÚYH‹][\Î–ÈSRÈ\ˆ\š[ÙH‹’RÐUÈ‹“Û™\ž›ÙZÙ[ˆ‹’Ø[œÙ[šØX\—_JKšœÞ
ÙÛ˜[YNˆ”™Z\ÝÜšYH‹][\Î–È’[™X™Y[ˆ‹‘Ü˜Yš]]™[È‹•\œ[ˆ‹”[[ÚØX\[ˆ—_JKšœÞ
ÙÛ˜[YNˆ”›ÛYZ[œÈ‹][\Î–È”›ÛYZ[œÙHÙYÙ[ˆ‹‘›Ü[ˆ‹SRÈ›ÛYZ[œÈ—_JKšœÞ
ÙÛ˜[YNˆ•ÓÒRH	ˆZ[]Z\ˆ‹][\Î–È[šÙ\œÈ‹”ÛYÝ™[[ˆ‹•›YYÝ™[[ˆ‹“[šY\È—_JKšœÞ
ÙÛ˜[YNˆ’ÛÙÝH	ˆ\œ™Z[ˆ‹][\Î–ÈRˆ‹’[ÚYH‹›Ù[ZØX\‹‘Ù[Û[Ü™›ÛÙÚYH—_JKšœÞ
ÙÛ˜[YNˆ‘\™™ÛÙY‹][\Î–È”šZšÜÛ[Û[Y[[ˆ‹’Ø\Ý[[ˆ‹”pëÛ™\È‹”™[YÚY]\È\™™ÛÙY—_JKšœÞ
ÙÛ˜[YNˆ‘›ÜÜÚY[[ˆ	ˆÛÝY‹][\Î–È’ÝÜÝÈ‹“Z[™\˜[[ˆ‹‘ÛÝYš]šY\™[ˆ‹‘›ÜÜÚY[]H—_JKšœÞ
ÙÛ˜[YNˆZ][›[™‹][\Î–È™[ÚpêÈ‹‘Z]Û[™‹‘œ˜[šÜšZšÈ‹”™YÚ[Û˜[H]\Ù]È—_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML]Lˆ][XÈ‹Ú[™[Žˆ•\ˆZÈÜHØX\ÛHH[™›Ü›X]YH˜[ˆ[HXÝY]™HYÙ[ˆÜYHØØ]YHH™ZÚZšÙ[‹ˆŸJW_JKšœÞÊËÝ]Nˆ’ØX\[™›Ü›X]YH[ˆÜ\È‹XÛÛŽššœÞ
ZKÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ•ZÈÛÜÜHØX\ÙˆÜY[ˆšXÚ˜X\ˆØš™XÝˆHÜ\ÛÛ\™XÝÚØ[H[™›Ü›X]YH[ˆ[YH›È›ÙYÈX[ˆY]]™HØX\Ù\šXÙ\ËˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒÜXÙK^KLH[M\ÝY\ØÈ‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ‘ÙXœZZÈHZ›[ˆ[ˆH›]]ÙHÛÜØ[›™Y\ˆYY\™\™HYÙ[ˆ[™›Ü›X]YHÙ]™[‹ˆŸJKšœÞÊ›H‹ØÚ[™[Ž–È‘ÙXœZZÈ‹šœÞ
œÝ›Û™È‹ØÚ[™[ŽˆŠÈŸJKˆÛH]Øš™XÝX[ˆY[ˆ™\ÝX[™HÙˆšY]]ÙHXYÈ[ˆZZ›ˆYÙ[ˆÙHH›ÙYÙ[‹ˆ—_JKšœÞ
›H‹ØÚ[™[Žˆ“Ü[ˆHØØ]YH[ˆÛÛÙÛHX\ÈÙˆÝ™Y]šY]ÈšXHHXÝÙÜ˜[[Y[ˆ[ˆHÛÜˆŸJKšœÞ
›H‹ØÚ[™[Žˆ”\ÈHZÜÝÜ›ÛÝHX[ˆY]HØÚZYœ™YÙ[X\ˆÛ™\˜X[ˆHÜ\ˆŸJKšœÞ
›H‹ØÚ[™[ŽˆšZˆÙ\ØÚZÝH\˜Ù[[ˆØ[ˆHÜ\ÛÚÈY[ˆÛÙÝZØX\Û™[‹ˆŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML]Lˆ][XÈ‹Ú[™[Žˆ‘Y[ˆÛ™Ë\™\ÜÈÜ[]ØØ]Y[Y[HY]ÛÛÙÛHX\È[ˆÝ™Y]šY]Ëˆ[ˆÝ™Y]šY]ÈÝ[ˆ™H[šÜÛÛ™\ˆÛÚÈ˜X\ˆXÚ›ÝÈØÚZÙ[[‹ˆŸJW_JKšœÞ
ËÝ]Nˆ“Y][ˆ[ˆZÙ[™[ˆ‹XÛÛŽššœÞ
ÜÚ^™NŒMŸJKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ™ËX›YKML›Ý[™Y^‹Ú[™[Ž–ÚšœÞÊš‹ØÛ\ÜÓ˜[YNˆ^^È›Û\Ù[ZX›Û^X›YKNX‹LH›^][\ËXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
ÜÚ^™NŒLŸJK“YY]Ù\™YYØÚ\—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMÌ‹Ú[™[Žˆ’ÛZÈÛHHY][‹X˜™[ÛZÈÛHHÝÜ[‹ˆHYœÝ[™ÛÜ™]]ÛX]\ØÚ™\™ZÙ[™[ˆY]\œÈÙˆÚ[ÛY]\œËˆŸJW_JKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈ™Ë[Ü˜[™ÙKML›Ý[™Y^‹Ú[™[Ž–ÚšœÞÊš‹ØÛ\ÜÓ˜[YNˆ^^È›Û\Ù[ZX›Û^[Ü˜[™ÙKNX‹LH›^][\ËXÙ[\ˆØ\LH‹Ú[™[Ž–ÚšœÞ
ËÜÚ^™NŒLŸJK•ZÙ[™Ù\™YYØÚ\—_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^[Ü˜[™ÙKMÌX‹Lˆ‹Ú[™[Žˆ•ZÙ[ˆ[[‹Z›™[ˆ[ˆ›ZÚÙ[ˆÜHØX\ˆÚY\ÈZ]ˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È™Ë[Ü˜[™ÙKLLLˆKLH›Ý[™Y‹Ú[™[Žˆ”[ŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È™Ë[Ü˜[™ÙKLLLˆKLH›Ý[™Y‹Ú[™[Žˆ“Z›ˆŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È™Ë[Ü˜[™ÙKLLLˆKLH›Ý[™Y‹Ú[™[Žˆ•›ZÈŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^[Ü˜[™ÙKMŒ]Lˆ‹Ú[™[Žˆ•ZÙ[š[™Ù[ˆÝ[›™[ˆÜÙ\ÛYÙ[ˆÛÜ™[ˆ˜X\ˆ™HZYÙ[ˆYÙ[‹ˆŸJW_JW_J_JKšœÞÊËÝ]Nˆ”™\Ù]È‹XÛÛŽššœÞ
PKÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ”™\Ù]ÈšZ›ˆ›ÛÜ˜Yˆ[™Ù\Ý[HÛÛXš[˜]Y\È˜[ˆØX\YÙ[‹ˆYXX[ÛHÛ™[HÚ\ÜÙ[[ˆ\ÜÙ[ŽˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒÜXÙK^KLH[M\ÝY\ØÈ‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘]XÝYHŸJKˆHSRË\˜Ù[[‹Ù[Û[Ü™›ÛÙÚYKÛÙÝH[ˆØY\Ý\ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”ÝY[Z™ŸJKˆH[™X™Y[‹Ü˜Yš]]™[Ë\œ[‹SRÑKÐSRÈ[ˆ[ÚYH—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”›ÛYZ[œÈHZYœ›ÙYÈŸJKˆH›ÛYZ[œÙHÙYÙ[ˆ[ˆ›Ü[‹SRÈ[ˆ\˜Ù[[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“ZYX]HšY]]ÙHZ™ŸJKˆHØ\Ý[[‹\ÜÙ[‹[Û[Y[[ˆ[ˆÝYHÙ\›™[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•ÓÒRH	ˆZ[]Z\ˆŸJKˆH[šÙ\œËÛYÝ™[[‹›YYÝ™[[‹[šY\È[ˆ[[™]Y\È—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•\œ™Z[ˆ[˜[\ÙHŸJKˆHRÐUË›Ù[KÙ[Û[Ü™›ÛÙÚYH[ˆRˆ—_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML]Lˆ][XÈ‹Ú[™[Žˆ‘ÙXœZZÈ]ÜÛX[‹ZXÛÛÛˆ˜X\ÝY[ˆ™\Ù]ÛHHZYYÙHYÙ[ˆ\š[ˆ˜\ÝHYÙÙ[‹ˆÜ[ˆ™\Ù]ÈÛHY[ˆ™\Ù]ÙHH›ÙYÙ[‹ˆY]]ÝÛÙÝ[ˆ™HH˜X[H[ˆ8 &ØØ]YH	ˆ›ÛÛHÛÝY[¸ &HX[œ\ÜÙ[ˆÙˆY[ˆZYÙ[ˆ™\Ù]™\ÚZ™\™[‹ˆÝ[™X\™™\Ù]È\œÝ[[ˆ™]ØX\™HZYÙ[ˆ™\Ù]ËˆŸJW_JKšœÞÊËÝ]Nˆ“ZZ›ˆYÙ[ˆ‹XÛÛŽššœÞ
ZKÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ–™[™Ù[XXZÝH[ˆÙpëÛ\ÜY\™HYÙ[ˆÝX[ˆØ[Y[ˆÛ™\ˆØX\YÙ[ˆ8¡¤ˆZZ›ˆYÙ[‹ˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒÜXÙK^KLH[M\ÝY\ØÈ‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ’YY\™HXYÈYYY[ˆZYÙ[ˆX[‹ÝZ]Û›ÜˆŸJKšœÞ
›H‹ØÚ[™[Žˆ‘]XÝÛÛ°ìðìÜˆ]ÜÛX[ˆÙ]™Y[[[‹Z›™[ˆ[ˆ›ZÚÙ[ˆšZ›ˆÙ]›Û™[‹ˆŸJKšœÞ
›H‹ØÚ[™[ŽˆšZˆY[ˆÙ[Y[™Ù™\Ý[™›Z™[ˆ[[ˆšXÚ˜X\ˆ[ˆÝX[ˆ›ZÚÙ[ˆÝ[™X\™Z]ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ’Û]\ˆ[ˆÙ[ÛY]šY\ÛÛÜ[ˆÚY\È™HZ™[œÈ][\Ü\™[‹ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ’][™ÚY[™]˜][Y[ˆXYÈ™\ÚZ™\™[‹Y]Y[ˆ™]™\ÝYÚ[™ÈYÙ[ˆ\ˆÛ™Ù[ZÈÚ\ÜÙ[‹ˆŸJW_JKšœÞÊ›Û‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒÜXÙK^KLH[M]LÈ\ÝYXÚ[X[‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ’ÝY™Hš[™Ù\ˆÜHÙ]Ù[œÝHØX\ZËˆŸJKšœÞÊ›H‹ØÚ[™[Ž–È’ÚY\È‹šœÞ
œÝ›Û™È‹ØÚ[™[Žˆ”[Ù]›ÙYÙ[ˆŸJK‹ˆ—_JKšœÞ
›H‹ØÚ[™[Žˆ’ÚY\ÈY[ˆXYËÛÚÈY[ˆÙpëÛ\ÜY\™HXYËˆŸJKšœÞ
›H‹ØÚ[™[Žˆ•[˜X[K[Y›ÛÛ›[[Y\ˆ[ˆ]™[Y[H^˜H[™›Ü›X]YH[‹ˆŸJW_JW_JKšœÞÊËÝ]Nˆ•›Û™Ý[ˆ™YÚ\Ý™\™[ˆ‹XÛÛŽššœÞ
ZKÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ”™YÚ\Ý™Y\ˆ™H›Û™Ý[ˆY]ØØ]YH[ˆ]Z[ÎˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒÜXÙK^KLH[M\ÝY\ØÈ‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•›Û™ÝÛ›ÜˆŸJKˆ™]Y[H8¡¤ˆ›Û™ÝÛ›ÜX[ˆ[ˆÙXœZZÈHÜ˜[š™HÛ›ÜÛ™\˜X[ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“Û™Ë\™\ÜÎˆŸJK	ÈÝYš[™Ù\ˆÜØX\8¡¤ˆ•›Û™Ý™YÚ\Ý™\™[ˆ‰×_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•™[[ŽˆŸJKˆ\KX]\šXX[\š[ÙKY\KÛÛ™]YKÙ]ÚXÚ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘^ÜˆŸJKˆ^Ù[ÔÕ‹Ù[Ò”ÓÓ‹ÔÓS—_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML]Lˆ‹Ú[™[Žˆ“Ü[ˆ[œÝ[[™Ù[ˆ8¡¤ˆ›Û™Ý[ˆ›ÛÜˆ]\Ú›Ø\™[ˆH^ÜÛ›Ü[‹ˆ›Û™Ý[ˆÛÜ™[ˆ[Z™Y\œÝÚØX[Ü]\\˜X]ÜÙ\ÛYÙ[‹ˆŸJW_JKšœÞÊËÝ]Nˆ”›Ý]\ÈÜ™[Y[ˆ‹XÛÛŽššœÞ
LÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ–™]Y[H8¡¤ˆ›Ý]HÛ›ÜX[ˆÛHY[ˆÔË\›Ý]HÜH™[Y[‹ˆŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒÜXÙK^KLH[M\ÝY\ØÈ‹Ú[™[Ž–ÚšœÞ
›H‹ØÚ[™[Žˆ•ZÈÜHÜ›Ù[™H›Ý]ZÛ›ÜÛHHÝ\[ŽÈZÈÜšY]]ÈÛHH]^™\™[ˆÙˆ\˜][‹ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ™ZÚZšÈZ™[œÈHÜ˜[YHZ™YœÝ[™[ˆÙ[ZY[HÛ™[ZYˆŸJKšœÞ
›H‹ØÚ[™[Žˆ“˜HÝÜ[ˆÙYYˆ™HH›Ý]HY[ˆ˜X[H[ˆÝ[ˆ™H[H\™XÝ[ÈÔ^Ü\™[‹ˆŸJKšœÞ
›H‹ØÚ[™[Žˆ“Ü[ˆ]›Ý]Y\Ú›Ø\™ÛHÜÙ\ÛYÙ[ˆ›Ý]\ÈH™ZÚZšÙ[‹[\Ü\™[‹^Ü\™[ˆÙˆ™\ÚZ™\™[‹ˆŸJW_JW_JKšœÞÊËÝ]NˆÛÝYÞ[˜È‹XÛÛŽššœÞ
Y‹ÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒX‹Lˆ‹Ú[™[Žˆ”Þ[˜Ú›Ûš\ÙY\ˆ™H]H\ÜÙ[ˆ\\˜][ˆY]ÛÛÙÛHÙÚ[ŽˆŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLˆ™ËYÜ™Y[‹ML›Ý[™Y[È‹Ú[™[ŽššœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ™Y[‹MÌ‹Ú[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•Ø]ÛÜ™Ù\Þ[˜Ú›Ûš\ÙY\™ˆŸJKšœÞ
˜œˆ‹ßJK¸ (ˆZZ›ˆYÙ[ˆ
ZYÙ[ˆ[[ŠH‹šœÞ
˜œˆ‹ßJK¸ (ˆ›Û™Ý[ˆ™YÚ\Ý˜]Y\È‹šœÞ
˜œˆ‹ßJK¸ (ˆÜÙ\ÛYÙ[ˆ›Ý]\È‹šœÞ
˜œˆ‹ßJK¸ (ˆ™\Ù]È[ˆ[Ù[Y[™H[œÝ[[™Ù[ˆ—_J_JKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœLˆ™ËX›YKML›Ý[™Y[È‹Ú[™[ŽššœÞÊœ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMÌ‹Ú[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“ØØ]YYÙYÙ]™[œÎˆŸJKˆHÜÜÙHÔË\ÜÚ]YHÛÜ™šY][ÈÙ\ØÚYY[š\È™]ØX\™ˆØØ]Y\È˜[ˆ›Û™Ý[ˆ[ˆÜÙ[›ÛY[ˆ›Ý]\ÈÛÜ™[ˆðê[ÜÙ\ÛYÙ[ˆ[ˆšZˆ[™Ù[ÙÙHÛÝY\Þ[˜ÈÙ\Þ[˜Ú›Ûš\ÙY\™ˆ—_J_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML]Lˆ‹Ú[™[Žˆ‘ÙXœZZÈÞ[˜Ú›Ûš\Ù\™[ˆ[ˆ]Y[HÛHÚØ[HÚZžšYÚ[™Ù[ˆ\™XÝY]™H[™\™H\\˜][ˆÙ[ZšÈH™ZÚÙ[‹ˆŸJW_JKšœÞÊËÝ]Nˆ’[œÝ[[™Ù[ˆ[ˆ™[[Ù\È‹XÛÛŽššœÞ
LKÜÚ^™NŒMŸJKÚ[™[Ž–ÚšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒÜXÙK^KLH[M\ÝY\ØÈ‹Ú[™[Ž–ÚšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ[Ù[YY[ŽˆŸJKˆÚY\ÈHÝ[™X\™ØX\ØÚX[˜[ËÔË\Ý\™YY˜XÚÈ[ˆÙY\ÚYÙ]ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•™[[Ù\ÎˆŸJKˆ\™ÙXœZZÝY\™\ˆÙ[Y[ˆØX\YÙ[È[ˆØ[ˆX]Û˜[Y[ˆÛ™[ˆÜXÚ›ÝËØ][Y][ˆ\ÝÜš\ØÚHØX\[‹ˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ“YÙ[ŽˆŸJKˆ™ZY\ˆZZ›ˆYÙ[‹[\ÜY\ˆÙ[Ò”ÓÓ‹ÒÓSÑÔ[ˆ™ZY\ˆ™\Ù]Ëˆ—_JKšœÞÊ›H‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•›Û™Ý[ŽˆŸJKˆÜ[ˆ]\Ú›Ø\™[ˆ^ÜY\ˆ™H™YÚ\Ý˜]Y\Ëˆ—_JW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML]Lˆ][XÈ‹Ú[™[Žˆ”ØÚZÙ[°ìðìÜˆ™\™ZÈÛ›[™HÛÜˆ™HÙ\šÙÙXšYYˆ[Y[ˆÙYÙ]™[œÈYHY\™\ˆšZ›ˆÙ[Y[‹šZ›ˆ]\ˆZ]HÚØ[HØXÚH™\ØÚZØ˜X\‹ˆŸJW_JKšœÞ
ËÝ]Nˆ“[Û[Y[š[\ˆ‹XÛÛŽššœÞ
ŒKÜÚ^™NŒMŸJKÚ[™[ŽššœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒ‹Ú[™[Žˆ‘š[\ˆSRÈ[Û[Y[[ˆÜZ™Ü\š[ÙKˆ[™YÈÛHÜXÚYšYZÙH\š[Ù\ÈHÛ™\ž›ÙZÙ[ˆ›Ø[ÈH›ÛYZ[œÙHZ™ZY[Y]]Ù[ˆÙˆœ›ÛœÝZ™ˆŸJ_JKšœÞ
ËÝ]Nˆ’ØX\^Ü\™[ˆ‹XÛÛŽššœÞ
KÜÚ^™NŒMŸJKÚ[™[ŽššœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMŒ‹Ú[™[Žˆ‘^ÜY\ˆ™HZYYÙHØX\ÙY\™Ø]™H[È‘ÈÙˆ”QËÙˆÜ[ˆ]Y™ZÝ™[œÝ\ˆÛHHš[[ˆÙˆ[ÈˆÜHÛX[‹ˆ™HÝ[Y[ˆ][Ù]›ÙYÙ[ŽÈ][H[ˆZ™ÛÜ™[ˆ]]ÛX]\ØÚ™\›Y[ˆŸJ_JKšœÞÊœÙXÝ[Ûˆ‹ØÛ\ÜÓ˜[YNˆœM™ËYÜ˜YY[]ËXœˆœ›ÛKYÜ™Y[‹MLËX›YKML›Ý[™Y^‹Ú[™[Ž–ÚšœÞ
šÈ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ‹Ú[™[Žˆ•\È›ÛÜˆÙXœZZÈŸJKšœÞÊ[‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMÌÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞÊ›H‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
ÛËÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹ML›^\Úš[šËL]LHŸJKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘]XÝYNˆŸJKˆÛÛXš[™Y\ˆSRÈ
ÈÙ]Ø\Ü\˜Ù[[ˆ
ÈRÐUÈ›ÛÜˆØ[œÜšZšÙHØØ]Y\È—_JW_JKšœÞÊ›H‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
ÛËÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹ML›^\Úš[šËL]LHŸJKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ•\œ™Z[ŽˆŸJKˆRˆ[ÚYHÛÛÜ˜Yš]]™[ËØ[[ˆ[ˆÜ™\[È—_JW_JKšœÞÊ›H‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
ÛËÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹ML›^\Úš[šËL]LHŸJKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ‘›ÜÜÚY[[ŽˆŸJKˆÚXÚÈ›ÜÜÚY[ÝÜÝÈ
ÈÙ[Û[Ü™›ÛÙÚYH›ÛÜˆÝYH™YX›Ù[\È—_JW_JKšœÞÊ›H‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
ÛËÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹ML›^\Úš[šËL]LHŸJKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ’\ÝÜš\ØÚˆŸJKˆRÈNLÛÛ™\™Ù[™[ˆÝXÝ\™[ˆ[ˆÝYHÙYÙ[ˆ—_JW_JKšœÞÊ›H‹ØÛ\ÜÓ˜[YNˆ™›^][\Ë\Ý\Ø\Lˆ‹Ú[™[Ž–ÚšœÞ
ÛËÜÚ^™NŒL‹Û\ÜÓ˜[YNˆ^YÜ™Y[‹ML›^\Úš[šËL]LHŸJKšœÞÊœÜ[ˆ‹ØÚ[™[Ž–ÚšœÞ
œÝ›Û™È‹ØÚ[™[Žˆ–›Û™\ˆÙÚ[ŽˆŸJKˆØX\ÙXœZZËZZ›ˆYÙ[‹›Û™Ý[ˆ[ˆ›Ý]\ÈÙ\šÙ[ˆÚØX[È[Y[ˆÛÝY\Þ[˜È™\™Z\ÝY[ˆÛÛÙÛKXXØÛÝ[—_JW_JW_JW_JW_J_J_Y[˜Ý[ÛˆÊÝ]N›‹XÛÛŽ™KÚ[™[ŽJ^Ü™]\›ˆšœÞÊœÙXÝ[Ûˆ‹ØÚ[™[Ž–ÚšœÞÊšÈ‹ØÛ\ÜÓ˜[YNˆ^\ÛH›Û\Ù[ZX›Û^YÜ˜^KNX‹Lˆ›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÙI‰ššœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^X›YKML‹Ú[™[Ž™_JK—_JK_J_Y[˜Ý[ÛˆŠÝ]N›‹][\Î™_J^Ü™]\›ˆšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLˆ™ËYÜ˜^KML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
š‹ØÛ\ÜÓ˜[YNˆ^^È›Û\Ù[ZX›Û^YÜ˜^KMŒX‹LKH‹Ú[™[Ž›ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆœÜXÙK^KLH‹Ú[™[Ž™K›X\

ŠOOššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^X›YKML‹Ú[™[ŽšXÛÛŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMÌ›Û[YY][H‹Ú[™[Ž›˜[Y_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KM‹Ú[™[Ž–È‹H‹™\Ø×_JW_KŠJ_JW_J_Y[˜Ý[ÛˆŒŠÚXÛÛŽ›‹˜[YN™K\ØÎJ^Ü™]\›ˆšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ‹Ú[™[Ž–ÚšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^YÜ˜^KML‹Ú[™[Ž›ŸJKšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMÌ›Û[YY][H‹Ú[™[Ž™_JKšœÞÊœÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KM‹Ú[™[Ž–È‹H‹_JW_J_Y[˜Ý[ÛˆÙ
Û˜[YN›‹][\Î™_J^Ü™]\›ˆšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLˆ™ËYÜ˜^KML›Ý[™Y[È‹Ú[™[Ž–ÚšœÞ
š‹ØÛ\ÜÓ˜[YNˆ^^È›Û\Ù[ZX›Û^YÜ˜^KMŒX‹LH‹Ú[™[Ž›ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KMLÜXÙK^KLH‹Ú[™[Ž™K›X\

ŠOOššœÞ
™]ˆ‹ØÚ[™[ŽKŠJ_JW_J_Y[˜Ý[ÛˆÚ
‹J^ØÛÛœÝ[‹›[™ÝÜ™]\›ˆOÛ–ÙJÝN™O]Û–ÙK]N›–ÙW_Y[˜Ý[Ûˆ›J‹J^ØÛÛœÝ[‹›[™ÝÛ]SX]™›ÛÜŠJNØÛÛœÝOYK\ŽÜ]Ü‹O]œ	‰ŠŠÏ]
NÛ]Ï\ŠÌNÜÏ]	‰ŠËO]
NØÛÛœÝO[–Ü—KÏXVÌKXVÌWKÏ[–Ü×KOXÖÌK[ËXÖÌWK[Ü™]\›–ÛÊÝJšK
ÙŠšW_XÛÛœÝŒ^Ú[™^‹LK[™[™^“˜S‹ÛÜÙ\Ý\™Ù]\Ý[˜ÙNŒKÌNÙ[˜Ý[ÛˆYJ‹KŠ^ØÛÛœÝO[–ÌKÏ[–ÌWNÛ]OLKÌÏKLKS˜SŽÙ›ÜŠ]LÙK\™Ù]Ë›[™ÝÊÊÙŠ^ØÛÛœÝYK\™Ù]ÖÙ—KO\˜ÛÛÜ™[˜]\ÎÛ]OLKÌÙ›ÜŠ]ÏL×ÏK›[™ÝLNÊÊ×Ê^ØÛÛœÝO[V××KÏ[V×ÊÌWKÏ\YJKËKÊNÚËœÜ]X\™Y\Ý[˜ÙOI‰ŠOZËœÜ]X\™Y\Ý[˜ÙKWÊÚË˜[Û™Ê_^OI‰ŠO^Kœš[™É‰™K\™Ù][™^OOY‰‰Š™[™[™^œœÝ\[™^ÞœÝ\[™^	‰Š
Ï[K›[™Ý
Nœ™[™[™^œÝ\[™^	‰žœœÝ\[™^	‰ŠO[K›[™Ý
JK^ÏYŠ_XÛÛœÝÏYK\™Ù]ÖÛ×NÛ]OXËœš[™ÎÚYŠK\™Ù][™^OO[É‰J^ØÛÛœÝT›JË˜ÛÛÜ™[˜]\Ë
K]™Ù]^[œ›ÛPÛÛÜ™[˜]JŠKO]™Ù]^[œ›ÛPÛÛÜ™[˜]JKœÝ\ÛÛÜ™
NÕ™ŠJOœ‰‰ŠOHLJ_ZYŠJ^ØÛÛœÝXË˜ÛÛÜ™[˜]\ËY‹›[™ÝOXËœÝ\[™^O[ÚYŠOJ^ØÛÛœÝXLŠ‹KJNØLŠ‹KK\
O	‰ŠO\
_Y[Ù^ØÛÛœÝXLŠ‹KJNØLŠ‹KJÜ
O	‰Š
Ï\
__\™]\›ˆŒ‹š[™^[ËŒ‹™[™[™^[Œ‹˜ÛÜÙ\Ý\™Ù]\Ý[˜ÙOXKŒŸY[˜Ý[Ûˆ™YJ‹J^ØÛÛœÝV×NÙ›ÜŠ]LÜK›[™ÝÊÊÜŠ^ØÛÛœÝÏYVÜ—K™Ù]Ù[ÛY]žJ
NÙÙYJ‹Ë
_\™]\›ˆY[˜Ý[ÛˆÙYJ‹K
^ÚYŠH[œÝ[˜Ù[ÙˆJ^ÚLŠ‹K™Ù]ÛÛÜ™[˜]\Ê
KLK
NÜ™]\›ŸZYŠH[œÝ[˜Ù[ÙˆÛ
^ØÛÛœÝYK™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝÚOÎÊÊÚJZLŠ‹–ÚWKLK
NÜ™]\›ŸZYŠH[œÝ[˜Ù[ÙˆXJ^ØÛÛœÝYK™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝÚOÎÊÊÚJZLŠ‹–ÚWKL
NÜ™]\›ŸZYŠH[œÝ[˜Ù[ÙˆÊ^ØÛÛœÝYK™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝÚOÎÊÊÚJ^ØÛÛœÝO\–ÚWNÙ›ÜŠ]ÏLXK›[™ÝÛÏÊÊÛÊZLŠ‹VÛ×KL
_\™]\›ŸZYŠH[œÝ[˜Ù[Ùˆ
^ØÛÛœÝYK™Ù]Ù[ÛY]šY\Ê
NÙ›ÜŠ]OLÚO‹›[™ÝÊÊÚJYÙYJ‹–ÚWK
NÜ™]\›Ÿ_Y[˜Ý[ÛˆLŠ‹KŠ^ØÛÛœÝO[–ÌKÏ[–ÌWNÙ›ÜŠ]OLÏYK›[™ÝLNØOÎÊÊØJ^ØÛÛœÝYVØWKÏYVØJÌWKO\YJKËÊNÚYŠKœÜ]X\™Y\Ý[˜ÙOOOL
^ØÛÛœÝXJÝK˜[Û™ÎÜ‹œ\Ú
ØÛÛÜ™[˜]\Î™Kš[™ÎÝ\[™^™‹[™[™^™ŸJNÜ™]\›Ÿ__Y[˜Ý[ÛˆÌŠ‹J^Ü™]\›ˆJ–ÌK–ÌWKVÌKVÌWJ_Y[˜Ý[ÛˆLŠ‹K
^Û]‹NÙOÊYKO]
NŠ]OYJNØÛÛœÝÏSX]˜ÙZ[
ŠKOSX]™›ÛÜŠJNÚYŠÏ˜J^ØÛÛœÝT›J‹ŠKÏT›J‹JNÜ™]\›ˆÌŠÊ_[]ÏLÚYŠÊ^ØÛÛœÝT›J‹ŠKÏ\Ú
‹ÊNÛÊÏ\ÌŠÊ_ZYŠOJ^ØÛÛœÝ\Ú
‹JKÏT›J‹JNÛÊÏ\ÌŠÊ_Y›ÜŠ]\ÎÛKLNÊÊÛ
^ØÛÛœÝÏ\Ú
‹
KO\Ú
‹
ÌJNÛÊÏ\ÌŠËJ_\™]\›ˆßXÛÛœÝÒO^Ø[Û™ÎŒÜ]X\™Y\Ý[˜ÙNŒNÙ[˜Ý[ÛˆYJ‹KŠ^ØÛÛœÝO]ÌKÏ]ÌWKO\–ÌKÏ\–ÌWKXKZKÏ[Ë\ÎÛ]OLZK\ÎÜ™]\›ŠOOLÈOOL
I‰ŠOXZJ

‹ZJJ›
ÊK\ÊJ˜ÊKÊ
›
ØÊ˜ÊKJKŠÏ[
K
ÏXÊJKÒK˜[Û™Ï]KÒKœÜ]X\™Y\Ý[˜ÙOR
J‹K‹
KL
KÒ_XÛÛœÝÌ^ÑUÔÕT•ˆ™˜]ÜÝ\‹UÑS‘ˆ™˜]Ù[™‹UÐP“Ô•ˆ™˜]ØX›ÜŸNØÛ\ÜÈˆ^[™È›ÞØÛÛœÝXÝÜŠK
^ÜÝ\\ŠJK\Ë™™X]\™O]_XÛ\ÜÈYYH^[™ÈœØÛÛœÝXÝÜŠJ^ØÛÛœÝYNÝœÝÜÝÛŸ
œÝÜÝÛI
KÝ\\Š
K\Ë›Û‹\Ë›Û˜ÙK\Ë[‹\Ë›Ü[Ûœ×ÏYK\ËœÚÝ[[™WÏHLK\Ë™ÝÛ”Ï[[\Ë™ÝÛ•[Y[Ý]Ë\Ë›\Ý˜YÕ[YWË\ËœÚ[\•\WË\Ë™œ™YZ[™ÏHLK\ËœÛÝ\˜ÙWÏYKœÛÝ\˜ÙOÙKœÛÝ\˜ÙN›[\Ë™™X]\™\×ÏYK™™X]\™\ÏÙK™™X]\™\Î›[\ËœÛ˜\Û\˜[˜ÙWÏYKœÛ˜\Û\˜[˜ÙOÙKœÛ˜\Û\˜[˜ÙNŒL‹\Ë\WÏYK\K\Ë›[ÙWÏPÞ™J\Ë\WÊK\ËœÝÜÛXÚ×ÏHHYKœÝÜÛXÚË\ËšYÛ›Ü™S™^\]™[ÏHLK\Ë›Z[”Ú[×ÏYK›Z[”Ú[ÏÙK›Z[”Ú[Î\Ë›[ÙWÏOOH”ÛYÛÛˆÌÎŒ‹\Ë›X^Ú[×Ï]\Ë›[ÙWÏOOHÚ\˜ÛHÌŽ™K›X^Ú[ÏÙK›X^Ú[ÎŒKÌ\Ë™š[š\ÚÛÛ™][Û—ÏYK™š[š\ÚÛÛ™][ÛÙK™š[š\ÚÛÛ™][ÛŽ‘Z\Ë™Ù[ÛY]žS^[Ý]ÏYK™Ù[ÛY]žS^[Ý]ÙK™Ù[ÛY]žS^[Ý]ˆ–HŽÛ]YK™Ù[ÛY]žQ[˜Ý[ÛŽÚYŠ\Š^ØÛÛœÝO]\Ë›[ÙWÎÚYŠOOOHÚ\˜ÛHŠ\JËKÊOOžØÛÛœÝX_™]ÈšÊÓ˜S‹˜S—JKÏSJÖÌJKO[Ì
ËJÖÜË›[™ÝLWJJNÜ™]\›ˆœÙ]Ù[\[™˜Y]\ÊËX]œÜ\
JK\Ë™Ù[ÛY]žS^[Ý]ÊKNÙ[Ù^Û]ÎÚOOOH”Ú[ÜÏPœŽšOOOH“[™TÝš[™ÈÜÏQNšOOOH”ÛYÛÛˆ‰‰ŠÏ\XJKJKË
OOŠÏÚOOOH”ÛYÛÛˆØVÌK›[™ÝÛËœÙ]ÛÛÜ™[˜]\ÊØVÌK˜ÛÛ˜Ø]
ØVÌVÌWJWK\Ë™Ù[ÛY]žS^[Ý]ÊN›ËœÙ]ÛÛÜ™[˜]\Ê×K\Ë™Ù[ÛY]žS^[Ý]ÊN›ËœÙ]ÛÛÜ™[˜]\ÊK\Ë™Ù[ÛY]žS^[Ý]ÊN›Ï[™]ÈÊK\Ë™Ù[ÛY]žS^[Ý]ÊKÊ__]\Ë™Ù[ÛY]žQ[˜Ý[Û—Ï\‹\Ë™˜YÕ™\^[^WÏYK™˜YÕ™\^[^HOO]›ÚYÙK™˜YÕ™\^[^NL\Ë™š[š\ÚÛÛÜ™[˜]WÏ[[\ËœÚÙ]Ú™X]\™WÏ[[\ËœÚÙ]ÚÚ[Ï[[\ËœÚÙ]ÚÛÛÜ™×Ï[[\ËœÚÙ]Ú[™WÏ[[\ËœÚÙ]Ú[™PÛÛÜ™×Ï[[\ËœÜ]X\™YÛXÚÕÛ\˜[˜ÙWÏYK˜ÛXÚÕÛ\˜[˜ÙOÙK˜ÛXÚÕÛ\˜[˜ÙJ™K˜ÛXÚÕÛ\˜[˜ÙNŒÍ‹\Ë›Ý™\›^WÏ[™]ÈÚJÜÛÝ\˜ÙN›™]ÈÚJÝ\ÙTÜ]X[[™^ˆLKÜ˜\™KÜ˜\ÙKÜ˜\ˆL_JKÝ[N™KœÝ[OÙKœÝ[N•™J
K\]UÚ[R[\˜XÝ[™ÎˆLJK\Ë™Ù[ÛY]žS˜[YWÏYK™Ù[ÛY]žS˜[YK\Ë˜ÛÛ™][Û—ÏYK˜ÛÛ™][ÛÙK˜ÛÛ™][ÛŽœË\Ë™œ™YZ[™ÛÛ™][Û—ËK™œ™YZ[™Ý\Ë™œ™YZ[™ÛÛ™][Û—ÏVN\Ë™œ™YZ[™ÛÛ™][Û—ÏYK™œ™YZ[™ÛÛ™][ÛÙK™œ™YZ[™ÛÛ™][ÛŽ‘ÔË\Ë˜XÙPÛÛ™][Û—Ë\ËœÙ]˜XÙJK˜XÙ_LJK\Ë˜XÙTÝ]WÏ^ØXÝ]™NˆL_K\Ë˜XÙTÛÝ\˜ÙWÏYK˜XÙTÛÝ\˜Ù_KœÛÝ\˜Ù_[\Ë˜YÚ[™ÙS\Ý[™\Š	PÕU‘K\Ë\]TÝ]WÊ_\Ù]˜XÙJJ^Û]ÙOÙOOOHLÝVNYN^”Ë\Ë˜XÙPÛÛ™][Û—Ï]\Ù]X\
J^ÜÝ\\‹œÙ]X\
JK\Ë\]TÝ]WÊ
_\Ù]œ™YZ[™
J^Ý\Ë™œ™YZ[™ÏYK\Ë™œ™YZ[™ÏÝ\Ë™œ™YZ[™ÛÛ™][Û—ÏVN\Ë™œ™YZ[™ÛÛ™][Û—Ï]\Ë›Ü[Ûœ×É‰\Ë›Ü[Ûœ×Ë™œ™YZ[™ÛÛ™][ÛÝ\Ë›Ü[Ûœ×Ë™œ™YZ[™ÛÛ™][ÛŽ‘ÔßYÙ]Ý™\›^J
^Ü™]\›ˆ\Ë›Ý™\›^WßYÙ]œ™YZ[™

^Ü™]\›ˆ\Ë™œ™YZ[™ßZ[™Q]™[
J^ÙK›ÜšYÚ[˜[]™[\OOOR[‹ÓÓ•VQS•I‰™K›ÜšYÚ[˜[]™[œ™]™[Y˜][

K\Ë™œ™YZ[™Ï]\Ë›[ÙWÈOOH”Ú[‰‰\Ë™œ™YZ[™ÛÛ™][Û—ÊJNÛ]YK\OOO]Ü‹”ÒS•T“SÕ‘KHLÜ™]\›ˆ]\Ë™œ™YZ[™É‰\Ë›\Ý˜YÕ[YWÉ‰™K\OOO]Ü‹”ÒS•T‘QÉ‰Š]K››ÝÊ
K]\Ë›\Ý˜YÕ[YWÏ]\Ë™˜YÕ™\^[^WÏÊ\Ë™ÝÛ”ÏYKœ^[\ËœÚÝ[[™WÏH]\Ë™œ™YZ[™ËHL
N\Ë›\Ý˜YÕ[YWÏ]›ÚY\ËœÚÝ[[™WÉ‰\Ë™ÝÛ•[Y[Ý]ÈOO]›ÚY	‰ŠÛX\•[Y[Ý]
\Ë™ÝÛ•[Y[Ý]ÊK\Ë™ÝÛ•[Y[Ý]Ï]›ÚY
JK\Ë™œ™YZ[™É‰™K\OOO]Ü‹”ÒS•T‘QÉ‰\ËœÚÙ]Ú™X]\™WÈOO[[Ê\Ë˜YÑ˜]Ú[™×ÊK˜ÛÛÜ™[˜]JKHLJN\Ë™œ™YZ[™É‰™K\OOO]Ü‹”ÒS•T‘ÕÓÜHLN	‰\Ë™Ù]Ú[\ÛÝ[

OÊYK\OOO]Ü‹”ÒS•T“SÕ‘K‰‰\Ë™œ™YZ[™ÏÊ\Ëš[™TÚ[\“[Ý™WÊJK\ËœÚÝ[[™WÉ‰™K›ÜšYÚ[˜[]™[œ™]™[Y˜][

JNŠK›ÜšYÚ[˜[]™[œÚ[\•\OOOH›[Ý\ÙHŸK\OOO]Ü‹”ÒS•T‘QÉ‰\Ë™ÝÛ•[Y[Ý]ÏOO]›ÚY
I‰\Ëš[™TÚ[\“[Ý™WÊJJN™K\OOO]Ü‹‘“ÓPÒÉ‰ŠHLJKÝ\\‹š[™Q]™[
JI‰œŸZ[™QÝÛ‘]™[
J^Ü™]\›ˆ\ËœÚÝ[[™WÏH]\Ë™œ™YZ[™Ë\Ë™œ™YZ[™ÏÊ\Ë™ÝÛ”ÏYKœ^[\Ë™š[š\ÚÛÛÜ™[˜]Wß\ËœÝ\˜]Ú[™×ÊK˜ÛÛÜ™[˜]JKL
N\Ë˜ÛÛ™][Û—ÊJOÊ\Ë›\Ý˜YÕ[YWÏQ]K››ÝÊ
K\Ë™ÝÛ•[Y[Ý]Ï\Ù][Y[Ý]


OOžÝ\Ëš[™TÚ[\“[Ý™WÊ™]ÈÝJÜ‹”ÒS•T“SÕ‘KK›X\K›ÜšYÚ[˜[]™[LKK™œ˜[YTÝ]JJ_K\Ë™˜YÕ™\^[^WÊK\Ë™ÝÛ”ÏYKœ^[L
NŠ\Ë›\Ý˜YÕ[YWÏ]›ÚYLJ_YXXÝ]˜]U˜XÙWÊ
^Ý\Ë˜XÙTÝ]WÏ^ØXÝ]™NˆL__]ÙÙÛU˜XÙTÝ]WÊJ^ÚYŠ]\Ë˜XÙTÛÝ\˜ÙWß]\Ë˜XÙPÛÛ™][Û—ÊJJ\™]\›ŽÚYŠ\Ë˜XÙTÝ]WË˜XÝ]™J^Ý\Ë™XXÝ]˜]U˜XÙWÊ
NÜ™]\›ŸXÛÛœÝ]\Ë™Ù]X\

K]™Ù]ÛÛÜ™[˜]Qœ›ÛT^[
ÙKœ^[ÌK]\ËœÛ˜\Û\˜[˜ÙWËKœ^[ÌWJÝ\ËœÛ˜\Û\˜[˜ÙW×JKO]™Ù]ÛÛÜ™[˜]Qœ›ÛT^[
ÙKœ^[ÌJÝ\ËœÛ˜\Û\˜[˜ÙWËKœ^[ÌWK]\ËœÛ˜\Û\˜[˜ÙW×JKÏ^œÊÜ‹WJKO]\Ë˜XÙTÛÝ\˜ÙWË™Ù]™X]\™\Ò[‘^[
ÊNÚYŠK›[™ÝOOL
\™]\›ŽØÛÛœÝÏY™YJK˜ÛÛÜ™[˜]KJNÛË›[™Ý	‰Š\Ë˜XÙTÝ]WÏ^ØXÝ]™NˆLÝ\ÛÛÜ™™K˜ÛÛÜ™[˜]KœÛXÙJ
K\™Ù]Î›Ë\™Ù][™^‹L_J_XYÜ”™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊK
^ØÛÛœÝYKœÝ\[™^YK™[™[™^OYKœÝ\[™^]ÜOOZOÜ‰‰™K™[™[™^\‰‰K™[™[™^Ý\Ë˜Y˜XÙYÛÛÜ™[˜]\×ÊKK™[™[™^
NŠ‰‰K™[™[™^\‰‰™K™[™[™^
I‰\Ëœ™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊK™[™[™^
NŠ\Ëœ™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊKœÝ\[™^K™[™[™^
K\Ë˜Y˜XÙYÛÛÜ™[˜]\×ÊKKœÝ\[™^
J_\™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊK
^ÚYŠOOO]
\™]\›ŽÛ]LÚYŠO
^ØÛÛœÝOSX]˜ÙZ[
JNÛ]ÏSX]™›ÛÜŠ
NÜÏOO]	‰ŠËOLJK\ËZJÌ_Y[Ù^ØÛÛœÝOSX]™›ÛÜŠJNÛ]ÏSX]˜ÙZ[

NÜÏOO]	‰ŠÊÏLJKZK\ÊÌ_\Œ	‰\Ëœ™[[Ý™S\ÝÚ[×ÊŠ_XY˜XÙYÛÛÜ™[˜]\×ÊKŠ^ÚYŠOO\Š\™]\›ŽØÛÛœÝOV×NÚYŠŠ^ØÛÛœÝÏSX]˜ÙZ[

NÛ]OSX]™›ÛÜŠŠNØOOO\‰‰ŠKOLJNÙ›ÜŠ]Ï\ÎÛÏXNÊÊÛÊZKœ\Ú
Ú
K˜ÛÛÜ™[˜]\ËÊJ_Y[Ù^ØÛÛœÝÏSX]™›ÛÜŠ
NÛ]OSX]˜ÙZ[
ŠNØOOO\‰‰ŠJÏLJNÙ›ÜŠ]Ï\ÎÛÏXNËK[ÊZKœ\Ú
Ú
K˜ÛÛÜ™[˜]\ËÊJ_ZK›[™Ý	‰\Ë˜\[™ÛÛÜ™[˜]\ÊJ_]\]U˜XÙWÊJ^ØÛÛœÝ]\Ë˜XÙTÝ]WÎÚYŠ]˜XÝ]™J\™]\›ŽÚYŠ\™Ù][™^OOKLJ^ØÛÛœÝÏYK›X\™Ù]^[œ›ÛPÛÛÜ™[˜]JœÝ\ÛÛÜ™
NÚYŠ™ŠËKœ^[
O\ËœÛ˜\Û\˜[˜ÙWÊ\™]\›ŸXÛÛœÝZYJK˜ÛÛÜ™[˜]K\Ë™Ù]X\

K\ËœÛ˜\Û\˜[˜ÙWÊNÚYŠ\™Ù][™^OO\‹š[™^
^ÚYŠ\™Ù][™^OOKLJ^ØÛÛœÝ]\™Ù]ÖÝ\™Ù][™^NÝ\Ëœ™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊœÝ\[™^™[™[™^
_XÛÛœÝÏ]\™Ù]ÖÜ‹š[™^NÝ\Ë˜Y˜XÙYÛÛÜ™[˜]\×ÊËËœÝ\[™^‹™[™[™^
_Y[Ù^ØÛÛœÝÏ]\™Ù]ÖÝ\™Ù][™^NÝ\Ë˜YÜ”™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊË‹™[™[™^
_]\™Ù][™^\‹š[™^ØÛÛœÝO]\™Ù]ÖÝ\™Ù][™^NÚK™[™[™^\‹™[™[™^ØÛÛœÝÏT›JK˜ÛÛÜ™[˜]\ËK™[™[™^
KO]\Ë™Ù]X\

K™Ù]^[œ›ÛPÛÛÜ™[˜]JÊNÙK˜ÛÛÜ™[˜]O\ËKœ^[VÓX]œ›Ý[™
VÌJKX]œ›Ý[™
VÌWJW_Z[™Q˜YÑ]™[
J^Ý\ËšYÛ›Ü™S™^\]™[ÏHLÝ\\‹š[™Q˜YÑ]™[
J_Z[™U\]™[
J^Û]HLÚYŠ\Ë™Ù]Ú[\ÛÝ[

OOOL
^Ý\Ë™ÝÛ•[Y[Ý]É‰ŠÛX\•[Y[Ý]
\Ë™ÝÛ•[Y[Ý]ÊK\Ë™ÝÛ•[Y[Ý]Ï]›ÚY
K\Ëš[™TÚ[\“[Ý™WÊJNØÛÛœÝ]\Ë˜XÙTÝ]WË˜XÝ]™NÚYŠ\ËšYÛ›Ü™S™^\]™[ß\ËÙÙÛU˜XÙTÝ]WÊJK\ËœÚÝ[[™WÊ^ØÛÛœÝOH]\Ë™š[š\ÚÛÛÜ™[˜]WÎÚI‰\ËœÝ\˜]Ú[™×ÊK˜ÛÛÜ™[˜]JKZI‰\Ë™œ™YZ[™ÏÝ\Ë™š[š\Ú˜]Ú[™Ê
Nˆ]\Ë™œ™YZ[™É‰ŠZ_\Ë›[ÙWÏOOH”Ú[ŠI‰Š\Ë˜]š[š\ÚÊKœ^[ŠOÝ\Ë™š[š\ÚÛÛ™][Û—ÊJI‰\Ë™š[š\Ú˜]Ú[™Ê
N\Ë˜YÑ˜]Ú[™×ÊK˜ÛÛÜ™[˜]JJKHL_Y[ÙH\Ë™œ™YZ[™É‰\Ë˜X›Ü˜]Ú[™Ê
_\™]\›ˆ\ËšYÛ›Ü™S™^\]™[ÏHLK]	‰\ËœÝÜÛXÚ×É‰™Kœ™]™[Y˜][

KZ[™TÚ[\“[Ý™WÊJ^ÚYŠ\ËœÚ[\•\WÏYK›ÜšYÚ[˜[]™[œÚ[\•\K\Ë™ÝÛ”É‰Š]\Ë™œ™YZ[™É‰\ËœÚÝ[[™Wß\Ë™œ™YZ[™É‰ˆ]\ËœÚÝ[[™WÊJ^ØÛÛœÝ]\Ë™ÝÛ”ËYKœ^[O]ÌK\–ÌKÏ]ÌWK\–ÌWKOZJšJÜÊœÎÚYŠ\ËœÚÝ[[™WÏ]\Ë™œ™YZ[™ÏØO\ËœÜ]X\™YÛXÚÕÛ\˜[˜ÙWÎ˜O]\ËœÜ]X\™YÛXÚÕÛ\˜[˜ÙWË]\ËœÚÝ[[™WÊ\™]\›ŸZYŠ]\Ë™š[š\ÚÛÛÜ™[˜]WÊ^Ý\Ë˜Ü™X]SÜ•\]TÚÙ]ÚÚ[ÊK˜ÛÛÜ™[˜]KœÛXÙJ
JNÜ™]\›Ÿ]\Ë\]U˜XÙWÊJK\Ë›[ÙYžQ˜]Ú[™×ÊK˜ÛÛÜ™[˜]J_X]š[š\ÚÊK
^Û]HLNÚYŠ\ËœÚÙ]Ú™X]\™WÊ^Û]OHLKÏVÝ\Ë™š[š\ÚÛÛÜ™[˜]W×NØÛÛœÝO]\Ë›[ÙWÎÚYŠOOOH”Ú[Š\HLÙ[ÙHYŠOOOHÚ\˜ÛHŠ\]\ËœÚÙ]ÚÛÛÜ™×Ë›[™ÝOOLŽÙ[ÙHYŠOOOH“[™TÝš[™ÈŠZOH]	‰\ËœÚÙ]ÚÛÛÜ™×Ë›[™Ý\Ë›Z[”Ú[×ÎÙ[ÙHYŠOOOH”ÛYÛÛˆŠ^ØÛÛœÝÏ]\ËœÚÙ]ÚÛÛÜ™×ÎÚO[ÖÌK›[™Ý\Ë›Z[”Ú[×ËÏVÛÖÌVÌKÖÌVÛÖÌK›[™ÝL—WKÜÏVÛÖÌVÌWNœÏVÛÖÌVÌKÖÌVÛÖÌK›[™ÝL—W_ZYŠJ^ØÛÛœÝÏ]\Ë™Ù]X\

NÙ›ÜŠ]LÏ\Ë›[™ÝÛÎÛ
ÊÊ^ØÛÛœÝO\ÖÛK[Ë™Ù]^[œ›ÛPÛÛÜ™[˜]JJKYVÌKY–ÌKOYVÌWKY–ÌWKO]\Ë™œ™YZ[™ÏÌN\ËœÛ˜\Û\˜[˜ÙWÎÚYŠSX]œÜ\

œ
ÛJ›JO^KŠ^Ý\Ë™š[š\ÚÛÛÜ™[˜]WÏ]NØœ™XZß___\™]\›ˆŸXÜ™X]SÜ•\]TÚÙ]ÚÚ[ÊJ^Ý\ËœÚÙ]ÚÚ[ÏÝ\ËœÚÙ]ÚÚ[Ë™Ù]Ù[ÛY]žJ
KœÙ]ÛÛÜ™[˜]\ÊJNŠ\ËœÚÙ]ÚÚ[Ï[™]ÈÜŠ™]ÈœŠJJK\Ë\]TÚÙ]Ú™X]\™\×Ê
J_XÜ™X]SÜ•\]PÝ\ÝÛTÚÙ]Ú[™WÊJ^Ý\ËœÚÙ]Ú[™Wß
\ËœÚÙ]Ú[™WÏ[™]ÈÜŠNØÛÛœÝYK™Ù][™X\”š[™Ê
NÛ]]\ËœÚÙ]Ú[™WË™Ù]Ù[ÛY]žJ
NÜÊ‹œÙ]›]ÛÛÜ™[˜]\Ê™Ù]^[Ý]

K™Ù]›]ÛÛÜ™[˜]\Ê
JK‹˜Ú[™ÙY

JNŠ[™]ÈJ™Ù]›]ÛÛÜ™[˜]\Ê
K™Ù]^[Ý]

JK\ËœÚÙ]Ú[™WËœÙ]Ù[ÛY]žJŠJ_\Ý\˜]Ú[™×ÊJ^ØÛÛœÝ]\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
KYJ\Ë™Ù[ÛY]žS^[Ý]ÊNÙ›ÜŠÙK›[™ÝŽÊYKœ\Ú

NÝ\Ë™š[š\ÚÛÛÜ™[˜]WÏYK\Ë›[ÙWÏOOH”Ú[Ý\ËœÚÙ]ÚÛÛÜ™×ÏYKœÛXÙJ
N\Ë›[ÙWÏOOH”ÛYÛÛˆÊ\ËœÚÙ]ÚÛÛÜ™×ÏVÖÙKœÛXÙJ
KKœÛXÙJ
WWK\ËœÚÙ]Ú[™PÛÛÜ™×Ï]\ËœÚÙ]ÚÛÛÜ™×ÖÌJN\ËœÚÙ]ÚÛÛÜ™×ÏVÙKœÛXÙJ
KKœÛXÙJ
WK\ËœÚÙ]Ú[™PÛÛÜ™×É‰Š\ËœÚÙ]Ú[™WÏ[™]ÈÜŠ™]ÈJ\ËœÚÙ]Ú[™PÛÛÜ™×ÊJJNØÛÛœÝO]\Ë™Ù[ÛY]žQ[˜Ý[Û—Ê\ËœÚÙ]ÚÛÛÜ™×Ë›ÚY
NÝ\ËœÚÙ]Ú™X]\™WÏ[™]ÈÜ‹\Ë™Ù[ÛY]žS˜[YWÉ‰\ËœÚÙ]Ú™X]\™WËœÙ]Ù[ÛY]žS˜[YJ\Ë™Ù[ÛY]žS˜[YWÊK\ËœÚÙ]Ú™X]\™WËœÙ]Ù[ÛY]žJJK\Ë\]TÚÙ]Ú™X]\™\×Ê
K\Ë™\Ü]Ú]™[
™]ÈŠÌ‹‘UÔÕT•\ËœÚÙ]Ú™X]\™WÊJ_[[ÙYžQ˜]Ú[™×ÊJ^ØÛÛœÝ]\Ë™Ù]X\

K]\ËœÚÙ]Ú™X]\™WË™Ù]Ù[ÛY]žJ
KO]™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
KÏYJ\Ë™Ù[ÛY]žS^[Ý]ÊNÛ]KÎÙ›ÜŠÙK›[™ÝÎÊYKœ\Ú

NÝ\Ë›[ÙWÏOOH”Ú[ÛÏ]\ËœÚÙ]ÚÛÛÜ™×Î\Ë›[ÙWÏOOH”ÛYÛÛˆÊO]\ËœÚÙ]ÚÛÛÜ™×ÖÌKÏXVØK›[™ÝLWK\Ë˜]š[š\ÚÊ™Ù]^[œ›ÛPÛÛÜ™[˜]JJJI‰ŠO]\Ë™š[š\ÚÛÛÜ™[˜]WËœÛXÙJ
JJNŠO]\ËœÚÙ]ÚÛÛÜ™×ËÏXVØK›[™ÝLWJKÖÌOYVÌKÖÌWOYVÌWK\Ë™Ù[ÛY]žQ[˜Ý[Û—Ê\ËœÚÙ]ÚÛÛÜ™×Ë‹JK\ËœÚÙ]ÚÚ[É‰\ËœÚÙ]ÚÚ[Ë™Ù]Ù[ÛY]žJ
KœÙ]ÛÛÜ™[˜]\ÊJK‹™Ù]\J
OOOH”ÛYÛÛˆ‰‰\Ë›[ÙWÈOOH”ÛYÛÛˆÝ\Ë˜Ü™X]SÜ•\]PÝ\ÝÛTÚÙ]Ú[™WÊŠN\ËœÚÙ]Ú[™PÛÛÜ™×É‰\ËœÚÙ]Ú[™WË™Ù]Ù[ÛY]žJ
KœÙ]ÛÛÜ™[˜]\Ê\ËœÚÙ]Ú[™PÛÛÜ™×ÊK\Ë\]TÚÙ]Ú™X]\™\×Ê
_XYÑ˜]Ú[™×ÊJ^ØÛÛœÝ]\ËœÚÙ]Ú™X]\™WË™Ù]Ù[ÛY]žJ
K]\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
NÛ]KÎØÛÛœÝO]\Ë›[ÙWÎÜ™]\›ˆOOOH“[™TÝš[™ÈŸOOOHÚ\˜ÛHÊ\Ë™š[š\ÚÛÛÜ™[˜]WÏYKœÛXÙJ
KÏ]\ËœÚÙ]ÚÛÛÜ™×ËË›[™Ý]\Ë›X^Ú[×É‰Š\Ë™œ™YZ[™ÏÜËœÜ

NšOHL
KËœ\Ú
KœÛXÙJ
JK\Ë™Ù[ÛY]žQ[˜Ý[Û—ÊËŠJN˜OOOH”ÛYÛÛˆ‰‰ŠÏ]\ËœÚÙ]ÚÛÛÜ™×ÖÌKË›[™Ý]\Ë›X^Ú[×É‰Š\Ë™œ™YZ[™ÏÜËœÜ

NšOHL
KËœ\Ú
KœÛXÙJ
JKI‰Š\Ë™š[š\ÚÛÛÜ™[˜]WÏ\ÖÌJK\Ë™Ù[ÛY]žQ[˜Ý[Û—Ê\ËœÚÙ]ÚÛÛÜ™×ËŠJK\Ë˜Ü™X]SÜ•\]TÚÙ]ÚÚ[ÊKœÛXÙJ
JK\Ë\]TÚÙ]Ú™X]\™\×Ê
KOÝ\Ë™š[š\Ú˜]Ú[™Ê
N\ËœÚÙ]Ú™X]\™Wß\™[[Ý™S\ÝÚ[×ÊJ^ÚYŠ]\ËœÚÙ]Ú™X]\™WÊ\™]\›ŽØÛÛœÝ]\ËœÚÙ]Ú™X]\™WË™Ù]Ù[ÛY]žJ
K]\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
KO]\Ë›[ÙWÎÙ›ÜŠ]ÏLÜÏNÊÊÜÊ^Û]NÚYŠOOOH“[™TÝš[™ÈŸOOOHÚ\˜ÛHŠ^ÚYŠO]\ËœÚÙ]ÚÛÛÜ™×ËKœÜXÙJL‹JKK›[™ÝLŠ^Ý\Ë™š[š\ÚÛÛÜ™[˜]WÏXVØK›[™ÝL—KœÛXÙJ
NØÛÛœÝÏ]\Ë™š[š\ÚÛÛÜ™[˜]WËœÛXÙJ
NØVØK›[™ÝLWO[Ë\Ë˜Ü™X]SÜ•\]TÚÙ]ÚÚ[ÊÊ_]\Ë™Ù[ÛY]žQ[˜Ý[Û—ÊKŠK™Ù]\J
OOOH”ÛYÛÛˆ‰‰\ËœÚÙ]Ú[™WÉ‰\Ë˜Ü™X]SÜ•\]PÝ\ÝÛTÚÙ]Ú[™WÊ
_Y[ÙHYŠOOOH”ÛYÛÛˆŠ^ØO]\ËœÚÙ]ÚÛÛÜ™×ÖÌKKœÜXÙJL‹JNØÛÛœÝÏ]\ËœÚÙ]Ú[™WË™Ù]Ù[ÛY]žJ
NÚYŠK›[™ÝLŠ^ØÛÛœÝXVØK›[™ÝL—KœÛXÙJ
NØVØK›[™ÝLWO[\Ë˜Ü™X]SÜ•\]TÚÙ]ÚÚ[Ê
_[ËœÙ]ÛÛÜ™[˜]\ÊJK\Ë™Ù[ÛY]žQ[˜Ý[Û—Ê\ËœÚÙ]ÚÛÛÜ™×ËŠ_ZYŠK›[™ÝOOLJ^Ý\Ë˜X›Ü˜]Ú[™Ê
NØœ™XZß_]\Ë\]TÚÙ]Ú™X]\™\×Ê
_\™[[Ý™S\ÝÚ[

^Ý\Ëœ™[[Ý™S\ÝÚ[×ÊJ_Yš[š\Ú˜]Ú[™Ê
^ØÛÛœÝO]\Ë˜X›Ü˜]Ú[™×Ê
NÚYŠYJ\™]\›ˆ[Û]]\ËœÚÙ]ÚÛÛÜ™×ÎØÛÛœÝYK™Ù]Ù[ÛY]žJ
KO]\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
NÜ™]\›ˆ\Ë›[ÙWÏOOH“[™TÝš[™ÈÊœÜ

K\Ë™Ù[ÛY]žQ[˜Ý[Û—Ê‹JJN\Ë›[ÙWÏOOH”ÛYÛÛˆ‰‰ŠÌKœÜ

K\Ë™Ù[ÛY]žQ[˜Ý[Û—Ê‹JK\‹™Ù]ÛÛÜ™[˜]\Ê
JK\Ë\WÏOOH“][TÚ[ÙKœÙ]Ù[ÛY]žJ™]ÈÚ
ÝJJN\Ë\WÏOOH“][S[™TÝš[™ÈÙKœÙ]Ù[ÛY]žJ™]ÈÛ
ÝJJN\Ë\WÏOOH“][TÛYÛÛˆ‰‰™KœÙ]Ù[ÛY]žJ™]ÈÊÝJJK\Ë™\Ü]Ú]™[
™]ÈŠÌ‹‘UÑS‘JJK\Ë™™X]\™\×É‰\Ë™™X]\™\×Ëœ\Ú
JK\ËœÛÝ\˜ÙWÉ‰\ËœÛÝ\˜ÙWË˜Y™X]\™JJK_XX›Ü˜]Ú[™×Ê
^Ý\Ë™š[š\ÚÛÛÜ™[˜]WÏ[[ØÛÛœÝO]\ËœÚÙ]Ú™X]\™WÎÜ™]\›ˆ\ËœÚÙ]Ú™X]\™WÏ[[\ËœÚÙ]ÚÚ[Ï[[\ËœÚÙ]Ú[™WÏ[[\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
K˜ÛX\ŠL
K\Ë™XXÝ]˜]U˜XÙWÊ
K_XX›Ü˜]Ú[™Ê
^ØÛÛœÝO]\Ë˜X›Ü˜]Ú[™×Ê
NÙI‰\Ë™\Ü]Ú]™[
™]ÈŠÌ‹‘UÐP“Ô•JJ_X\[™ÛÛÜ™[˜]\ÊJ^ØÛÛœÝ]\Ë›[ÙWËH]\ËœÚÙ]Ú™X]\™WÎÜ‰‰\ËœÝ\˜]Ú[™×ÊVÌJNÛ]NÚYŠOOH“[™TÝš[™ÈŸOOHÚ\˜ÛHŠZO]\ËœÚÙ]ÚÛÛÜ™×ÎÙ[ÙHYŠOOH”ÛYÛÛˆŠZO]\ËœÚÙ]ÚÛÛÜ™×É‰\ËœÚÙ]ÚÛÛÜ™×Ë›[™ÝÝ\ËœÚÙ]ÚÛÛÜ™×ÖÌN–×NÙ[ÙH™]\›ŽÜ‰‰šKœÚY

KKœÜ

NÙ›ÜŠ]OLØOK›[™ÝØJÊÊ]\Ë˜YÑ˜]Ú[™×ÊVØWJNØÛÛœÝÏYVÙK›[™ÝLWNÝ\ËœÚÙ]Ú™X]\™WÏ]\Ë˜YÑ˜]Ú[™×ÊÊK\Ë›[ÙYžQ˜]Ú[™×ÊÊ_Y^[™
J^ØÛÛœÝYK™Ù]Ù[ÛY]žJ
NÝ\ËœÚÙ]Ú™X]\™WÏYK\ËœÚÙ]ÚÛÛÜ™×Ï\‹™Ù]ÛÛÜ™[˜]\Ê
NØÛÛœÝO]\ËœÚÙ]ÚÛÛÜ™×ÖÝ\ËœÚÙ]ÚÛÛÜ™×Ë›[™ÝLWNÝ\Ë™š[š\ÚÛÛÜ™[˜]WÏZKœÛXÙJ
K\ËœÚÙ]ÚÛÛÜ™×Ëœ\Ú
KœÛXÙJ
JK\ËœÚÙ]ÚÚ[Ï[™]ÈÜŠ™]ÈœŠJJK\Ë\]TÚÙ]Ú™X]\™\×Ê
K\Ë™\Ü]Ú]™[
™]ÈŠÌ‹‘UÔÕT•\ËœÚÙ]Ú™X]\™WÊJ_]\]TÚÙ]Ú™X]\™\×Ê
^ØÛÛœÝOV×NÝ\ËœÚÙ]Ú™X]\™WÉ‰™Kœ\Ú
\ËœÚÙ]Ú™X]\™WÊK\ËœÚÙ]Ú[™WÉ‰™Kœ\Ú
\ËœÚÙ]Ú[™WÊK\ËœÚÙ]ÚÚ[É‰™Kœ\Ú
\ËœÚÙ]ÚÚ[ÊNØÛÛœÝ]\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
NÝ˜ÛX\ŠL
K˜Y™X]\™\ÊJ_]\]TÝ]WÊ
^ØÛÛœÝO]\Ë™Ù]X\

K]\Ë™Ù]XÝ]™J
NÊY_]
I‰\Ë˜X›Ü˜]Ú[™Ê
K\Ë›Ý™\›^WËœÙ]X\
ÙN›[
__Y[˜Ý[Ûˆ™J
^ØÛÛœÝUSŠ
NÜ™]\›ˆ[˜Ý[ÛŠK
^Ü™]\›ˆ–ÙK™Ù]Ù[ÛY]žJ
K™Ù]\J
W__Y[˜Ý[ÛˆÞ™JŠ^ÜÝÚ]Ú
Š^ØØ\ÙH”Ú[Ž˜Ø\ÙH“][TÚ[Žœ™]\›ˆ”Ú[ŽØØ\ÙH“[™TÝš[™ÈŽ˜Ø\ÙH“][S[™TÝš[™ÈŽœ™]\›ˆ“[™TÝš[™ÈŽØØ\ÙH”ÛYÛÛˆŽ˜Ø\ÙH“][TÛYÛÛˆŽœ™]\›ˆ”ÛYÛÛˆŽØØ\ÙHÚ\˜ÛHŽœ™]\›ˆÚ\˜ÛHŽÙY˜][›ÝÈ™]È\œ›ÜŠ’[˜[Y\NˆŠÛŠ__XÛÛœÝULŒOLKUVÌKV×KRO^ÓSÑQ–TÕT•ˆ›[ÙYž\Ý\‹SÑQ–QS‘ˆ›[ÙYžY[™ŸNÙ[˜Ý[ÛˆRJ‹K
^Û]ŽÜÝÚ]Ú
J^ØØ\ÙH“[™TÝš[™ÈŽœ[ŽØœ™XZÎØØ\ÙH“][S[™TÝš[™ÈŽ˜Ø\ÙH”ÛYÛÛˆŽœ[–ÝÌWNØœ™XZÎØØ\ÙH“][TÛYÛÛˆŽœ[–ÝÌWWVÝÌWNØœ™XZß\™]\›ˆŸXÛ\ÜÈ’H^[™È›ÞØÛÛœÝXÝÜŠKŠ^ÜÝ\\ŠJK\Ë™™X]\™\Ï]\Ë›X\œ›ÝÜÙ\‘]™[\Ÿ_XÛ\ÜÈ^™H^[™ÈœØÛÛœÝXÝÜŠJ^ÜÝ\\ŠJK\Ë›Û‹\Ë›Û˜ÙK\Ë[‹\Ë˜›Ý[™[™Q™X]\™PÚ[™ÙWÏ]\Ëš[™Q™X]\™PÚ[™ÙWË˜š[™
\ÊK\Ë˜ÛÛ™][Û—ÏYK˜ÛÛ™][ÛÙK˜ÛÛ™][ÛŽ›‹\Ë™Y˜][[]PÛÛ™][Û—ÏY[˜Ý[ÛŠŠ^Ü™]\›ˆ™JŠI‰˜RŠŠ_K\Ë™[]PÛÛ™][Û—ÏYK™[]PÛÛ™][ÛÙK™[]PÛÛ™][ÛŽ\Ë™Y˜][[]PÛÛ™][Û—Ë\Ëš[œÙ\™\^ÛÛ™][Û—ÏYKš[œÙ\™\^ÛÛ™][ÛÙKš[œÙ\™\^ÛÛ™][ÛŽ–K\Ë™\^™X]\™WÏ[[\Ë™\^ÙYÛY[×Ï[[\Ë›\ÝÛÛÜ™[˜]WÏVÌK\ËšYÛ›Ü™S™^Ú[™ÛPÛXÚ×ÏHLK\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÏ[[\Ëœ\ÚÏ[™]È”‹\Ëœ^[Û\˜[˜ÙWÏYKœ^[Û\˜[˜ÙHOO]›ÚYÙKœ^[Û\˜[˜ÙNŒL\ËœÛ˜\YÕ™\^ÏHLK\Ë˜Ú[™Ú[™Ñ™X]\™WÏHLK\Ë™˜YÔÙYÛY[×ÏV×K\Ë›Ý™\›^WÏ[™]ÈÚJÜÛÝ\˜ÙN›™]ÈÚJÝ\ÙTÜ]X[[™^ˆLKÜ˜\ˆHYKÜ˜\JKÝ[N™KœÝ[OÙKœÝ[N”ž™J
K\]UÚ[P[š[X][™ÎˆL\]UÚ[R[\˜XÝ[™ÎˆLJK\Ë”ÑQÓQS•ÕÔ’UT”×Ï^ÔÚ[\ËÜš]TÚ[Ù[ÛY]žWË˜š[™
\ÊK[™TÝš[™Î\ËÜš]S[™TÝš[™ÑÙ[ÛY]žWË˜š[™
\ÊK[™X\”š[™Î\ËÜš]S[™TÝš[™ÑÙ[ÛY]žWË˜š[™
\ÊKÛYÛÛŽ\ËÜš]TÛYÛÛ‘Ù[ÛY]žWË˜š[™
\ÊK][TÚ[\ËÜš]S][TÚ[Ù[ÛY]žWË˜š[™
\ÊK][S[™TÝš[™Î\ËÜš]S][S[™TÝš[™ÑÙ[ÛY]žWË˜š[™
\ÊK][TÛYÛÛŽ\ËÜš]S][TÛYÛÛ‘Ù[ÛY]žWË˜š[™
\ÊKÚ\˜ÛN\ËÜš]PÚ\˜ÛQÙ[ÛY]žWË˜š[™
\ÊKÙ[ÛY]žPÛÛXÝ[ÛŽ\ËÜš]QÙ[ÛY]žPÛÛXÝ[Û‘Ù[ÛY]žWË˜š[™
\Ê_K\ËœÛÝ\˜ÙWÏ[[\Ë˜XÙTÛÝ\˜ÙWÏYK˜XÙTÛÝ\˜Ù_KœÛÝ\˜Ù_[\Ë˜XÙPÛÛ™][Û—Ë\ËœÙ]˜XÙJK˜XÙ_LJK\Ë˜XÙTÝ]WÏ^ØXÝ]™NˆL_K\Ë˜XÙTÙYÛY[×Ï[[\Ëš]]XÝ[Û—Ï[[Û]ÚYŠK™™X]\™\ÏÝYK™™X]\™\Î™KœÛÝ\˜ÙI‰Š\ËœÛÝ\˜ÙWÏYKœÛÝ\˜ÙK[™]È	J\ËœÛÝ\˜ÙWË™Ù]™X]\™\Ê
JK\ËœÛÝ\˜ÙWË˜Y]™[\Ý[™\ŠÜËQ‘PUT‘K\Ëš[™TÛÝ\˜ÙPYË˜š[™
\ÊJK\ËœÛÝ\˜ÙWË˜Y]™[\Ý[™\ŠÜË”‘SSÕ‘Q‘PUT‘K\Ëš[™TÛÝ\˜ÙT™[[Ý™WË˜š[™
\ÊJJK]
]›ÝÈ™]È\œ›ÜŠ•H[ÙYžH[\˜XÝ[Ûˆ™\]Z\™\È™X]\™\ËHÛÝ\˜ÙHÜˆH^Y\ˆŠNÙKš]]XÝ[Û‰‰Š\Ëš]]XÝ[Û—ÏYKš]]XÝ[ÛŠK\Ë™™X]\™\×Ï]\Ë™™X]\™\×Ë™›Ü‘XXÚ
\Ë˜Y™X]\™WË˜š[™
\ÊJK\Ë™™X]\™\×Ë˜Y]™[\Ý[™\ŠÜËQ\Ëš[™Q™X]\™PYË˜š[™
\ÊJK\Ë™™X]\™\×Ë˜Y]™[\Ý[™\ŠÜË”‘SSÕ‘K\Ëš[™Q™X]\™T™[[Ý™WË˜š[™
\ÊJK\Ë›\ÝÚ[\‘]™[Ï[[\Ë™[WÏVÌK\ËœÛ˜\ÔÚ[\—ÏYKœÛ˜\ÔÚ[\OO]›ÚYÈ]\Ëš]]XÝ[Û—Î™KœÛ˜\ÔÚ[\Ÿ\Ù]˜XÙJJ^Û]ÙOÙOOOHLÝVNYN^”Ë\Ë˜XÙPÛÛ™][Û—Ï]XY™X]\™WÊJ^ØÛÛœÝYK™Ù]Ù[ÛY]žJ
NÚYŠ
^ØÛÛœÝO]\Ë”ÑQÓQS•ÕÔ’UT”×ÖÝ™Ù]\J
WNÚI‰šJK
_XÛÛœÝ]\Ë™Ù]X\

NÜ‰‰œ‹š\Ô™[™\™Y

I‰\Ë™Ù]XÝ]™J
I‰\Ëš[™TÚ[\]^[Ê\Ë›\ÝÛÛÜ™[˜]WÊKK˜Y]™[\Ý[™\Š[‹ÒS‘ÑK\Ë˜›Ý[™[™Q™X]\™PÚ[™ÙWÊ_]Ú[[ÙYžQ™X]\™\×ÊK
^ÚYŠ]\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÊ^Ý\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÏ[™]È	NØÛÛœÝ]\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYË™Ù]\œ˜^J
NÙ›ÜŠ]OLÏ]›[™ÝÚOÎÊÊÚJ^ØÛÛœÝO]ÚWK™™X]\™NØI‰ˆ\‹š[˜ÛY\ÊJI‰\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYËœ\Ú
J_]\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYË™Ù][™Ý

OOOLÝ\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÏ[[\Ë™\Ü]Ú]™[
™]È’JRK“SÑQ–TÕT•\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYËJJ__\™[[Ý™Q™X]\™WÊJ^Ý\Ëœ™[[Ý™Q™X]\™TÙYÛY[]WÊJK\Ë™\^™X]\™WÉ‰\Ë™™X]\™\×Ë™Ù][™Ý

OOOL	‰Š\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
Kœ™[[Ý™Q™X]\™J\Ë™\^™X]\™WÊK\Ë™\^™X]\™WÏ[[
KKœ™[[Ý™Q]™[\Ý[™\Š[‹ÒS‘ÑK\Ë˜›Ý[™[™Q™X]\™PÚ[™ÙWÊ_\™[[Ý™Q™X]\™TÙYÛY[]WÊJ^ØÛÛœÝ]\Ëœ\ÚËV×NÝ™›Ü‘XXÚ
[˜Ý[ÛŠJ^ÙOOOZK™™X]\™I‰œ‹œ\Ú
J_JNÙ›ÜŠ]O\‹›[™ÝLNÚOLËKZJ^ØÛÛœÝÏ\–ÚWNÙ›ÜŠ]O]\Ë™˜YÔÙYÛY[×Ë›[™ÝLNØOLËKXJ]\Ë™˜YÔÙYÛY[×ÖØWVÌOOO\É‰\Ë™˜YÔÙYÛY[×ËœÜXÙJKJNÝœ™[[Ý™JÊ__\Ù]XÝ]™JJ^Ý\Ë™\^™X]\™WÉ‰ˆYI‰Š\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
Kœ™[[Ý™Q™X]\™J\Ë™\^™X]\™WÊK\Ë™\^™X]\™WÏ[[
KÝ\\‹œÙ]XÝ]™JJ_\Ù]X\
J^Ý\Ë›Ý™\›^WËœÙ]X\
JKÝ\\‹œÙ]X\
J_YÙ]Ý™\›^J
^Ü™]\›ˆ\Ë›Ý™\›^WßZ[™TÛÝ\˜ÙPYÊJ^ÙK™™X]\™I‰\Ë™™X]\™\×Ëœ\Ú
K™™X]\™J_Z[™TÛÝ\˜ÙT™[[Ý™WÊJ^ÙK™™X]\™I‰\Ë™™X]\™\×Ëœ™[[Ý™JK™™X]\™J_Z[™Q™X]\™PYÊJ^Ý\Ë˜Y™X]\™WÊK™[[Y[
_Z[™Q™X]\™PÚ[™ÙWÊJ^ÚYŠ]\Ë˜Ú[™Ú[™Ñ™X]\™WÊ^ØÛÛœÝYK\™Ù]Ý\Ëœ™[[Ý™Q™X]\™WÊ
K\Ë˜Y™X]\™WÊ
__Z[™Q™X]\™T™[[Ý™WÊJ^Ý\Ëœ™[[Ý™Q™X]\™WÊK™[[Y[
_]Üš]TÚ[Ù[ÛY]žWÊK
^ØÛÛœÝ]™Ù]ÛÛÜ™[˜]\Ê
KO^Ù™X]\™N™KÙ[ÛY]žNÙYÛY[–Ü‹—_NÝ\Ëœ\ÚËš[œÙ\
™Ù]^[

KJ_]Üš]S][TÚ[Ù[ÛY]žWÊK
^ØÛÛœÝ]™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝÚOÎÊÊÚJ^ØÛÛœÝO\–ÚWKÏ^Ù™X]\™N™KÙ[ÛY]žN\–ÚWK[™^šKÙYÛY[–ØKW_NÝ\Ëœ\ÚËš[œÙ\
™Ù]^[

KÊ__]Üš]S[™TÝš[™ÑÙ[ÛY]žWÊK
^ØÛÛœÝ]™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝLNÚOÎÊÊÚJ^ØÛÛœÝO\‹œÛXÙJKJÌŠKÏ^Ù™X]\™N™KÙ[ÛY]žN[™^šKÙYÛY[˜_NÝ\Ëœ\ÚËš[œÙ\
œÊJKÊ__]Üš]S][S[™TÝš[™ÑÙ[ÛY]žWÊK
^ØÛÛœÝ]™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝÚOÎÊÊÚJ^ØÛÛœÝO\–ÚWNÙ›ÜŠ]ÏLXK›[™ÝLNÛÏÊÊÛÊ^ØÛÛœÝÏXKœÛXÙJËÊÌŠKO^Ù™X]\™N™KÙ[ÛY]žN\–ÚWK[™^›ËÙYÛY[˜ßNÝ\Ëœ\ÚËš[œÙ\
œÊÊKJ___]Üš]TÛYÛÛ‘Ù[ÛY]žWÊK
^ØÛÛœÝ]™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝÚOÎÊÊÚJ^ØÛÛœÝO\–ÚWNÙ›ÜŠ]ÏLXK›[™ÝLNÛÏÊÊÛÊ^ØÛÛœÝÏXKœÛXÙJËÊÌŠKO^Ù™X]\™N™KÙ[ÛY]žN\–ÚWK[™^›ËÙYÛY[˜ßNÝ\Ëœ\ÚËš[œÙ\
œÊÊKJ___]Üš]S][TÛYÛÛ‘Ù[ÛY]žWÊK
^ØÛÛœÝ]™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]OLÏ\‹›[™ÝÚOÎÊÊÚJ^ØÛÛœÝO\–ÚWNÙ›ÜŠ]ÏLXK›[™ÝÛÏÊÊÛÊ^ØÛÛœÝÏXVÛ×NÙ›ÜŠ]OLXË›[™ÝLNÝOŽÊÊÝJ^ØÛÛœÝXËœÛXÙJKJÌŠKO^Ù™X]\™N™KÙ[ÛY]žN\–ÛËWK[™^KÙYÛY[œNÝ\Ëœ\ÚËš[œÙ\
œÊ
KJ____]Üš]PÚ\˜ÛQÙ[ÛY]žWÊK
^ØÛÛœÝ]™Ù]Ù[\Š
KO^Ù™X]\™N™KÙ[ÛY]žN[™^U‹ÙYÛY[–Ü‹—_KÏ^Ù™X]\™N™KÙ[ÛY]žN[™^”ŒKÙYÛY[–Ü‹—_KOVÚK×NÚK™™X]\™TÙYÛY[ÏXKË™™X]\™TÙYÛY[ÏXK\Ëœ\ÚËš[œÙ\
ÝŠŠKJNÛ]Ï]Ý\Ëœ\ÚËš[œÙ\
Ë™Ù]^[

KÊ_]Üš]QÙ[ÛY]žPÛÛXÝ[Û‘Ù[ÛY]žWÊK
^ØÛÛœÝ]™Ù]Ù[ÛY]šY\Ð\œ˜^J
NÙ›ÜŠ]OLÚO‹›[™ÝÊÊÚJ^ØÛÛœÝÏ\–ÚWKO]\Ë”ÑQÓQS•ÕÔ’UT”×ÖÜË™Ù]\J
WNØJKÊ__XÜ™X]SÜ•\]U™\^™X]\™WÊK‹J^Û]Ï]\Ë™\^™X]\™WÎÜ™]\›ˆÏÜË™Ù]Ù[ÛY]žJ
KœÙ]ÛÛÜ™[˜]\ÊJNŠÏ[™]ÈÜŠ™]ÈœŠJJK\Ë™\^™X]\™WÏ\Ë\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
K˜Y™X]\™JÊJKËœÙ]
™™X]\™\È‹
KËœÙ]
™Ù[ÛY]šY\È‹ŠKËœÙ]
™^\Ý[™È‹JKßZ[™Q]™[
J^ÚYŠYK›ÜšYÚ[˜[]™[
\™]\›ˆLÝ\Ë›\ÝÚ[\‘]™[ÏYNÛ]Ü™]\›ˆYK›X\™Ù]šY]Ê
K™Ù][\˜XÝ[™Ê
I‰™K\OO]Ü‹”ÒS•T“SÕ‘I‰ˆ]\Ëš[™[™ÑÝÛ•\Ù\]Y[˜ÙI‰\Ëš[™TÚ[\“[Ý™WÊJK\Ë™\^™X]\™WÉ‰\Ë™[]PÛÛ™][Û—ÊJI‰ŠK\HO]Ü‹”ÒS‘ÓPÓPÒß]\ËšYÛ›Ü™S™^Ú[™ÛPÛXÚ×ÏÝ]\Ëœ™[[Ý™TÚ[

NHL
KK\OO]Ü‹”ÒS‘ÓPÓPÒÉ‰Š\ËšYÛ›Ü™S™^Ú[™ÛPÛXÚ×ÏHLJKÝ\\‹š[™Q]™[
JI‰ˆ]Yš[™[œÙ\™\XÙ\Ð[™\]Q˜YÔÙYÛY[×ÊJ^ÚYŠ\Ëš[™TÚ[\]^[ÊJK\Ë™˜YÔÙYÛY[×Ë›[™ÝL\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÏ[[]\Ë™\^™X]\™WÊ\™]\›ŽÝ\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
NØÛÛœÝV×KO]\Ë™\^™X]\™WË™Ù]Ù[ÛY]žJ
K™Ù]ÛÛÜ™[˜]\Ê
KÏ^œÊÚWJKO]\Ëœ\ÚË™Ù][‘^[
ÊKÏ^ßNØKœÛÜ
^™JNÙ›ÜŠ]LÏXK›[™ÝÛÎÊÊÛ
^ØÛÛœÝOXVÛK]KœÙYÛY[Û]Q
K™Ù[ÛY]žJNØÛÛœÝO]K™\ÚYŠI‰Š
ÏH‹HŠÛKš›Ú[Š‹HŠJKÖÜ_
ÖÜO[™]È\œ˜^JŠJKK™Ù[ÛY]žK™Ù]\J
OOOHÚ\˜ÛH‰‰Kš[™^OOTŒJ^ØÛÛœÝOTŠKJNÑØJKJI‰ˆ[ÖÜVÌI‰Š\Ë™˜YÔÙYÛY[×Ëœ\Ú
ÝKJKÖÜVÌO]JNØÛÛ[Y_ZYŠØJ–ÌKJI‰ˆ[ÖÜVÌJ^Ý\Ë™˜YÔÙYÛY[×Ëœ\Ú
ÝKJKÖÜVÌO]NØÛÛ[Y_ZYŠØJ–ÌWKJI‰ˆ[ÖÜVÌWJ^ÚYŠÖÜVÌI‰›ÖÜVÌKš[™^OOL
^Û]O]K™Ù[ÛY]žK™Ù]ÛÛÜ™[˜]\Ê
NÜÝÚ]Ú
K™Ù[ÛY]žK™Ù]\J
J^ØØ\ÙH“[™TÝš[™ÈŽ˜Ø\ÙH“][S[™TÝš[™ÈŽ˜ÛÛ[YNØØ\ÙH“][TÛYÛÛˆŽžO^VÛVÌWWNØØ\ÙH”ÛYÛÛˆŽšYŠKš[™^OO^VÛVÌWK›[™ÝLŠXÛÛ[YNØœ™XZß_]\Ë™˜YÔÙYÛY[×Ëœ\Ú
ÝKWJKÖÜVÌWO]NØÛÛ[Y_Q
ŠZ[ˆ\Ë™\^ÙYÛY[×É‰ˆ[ÖÜVÌI‰ˆ[ÖÜVÌWI‰œ‹œ\Ú
J_\™]\›ˆŸYXXÝ]˜]U˜XÙWÊ
^Ý\Ë˜XÙTÝ]WÏ^ØXÝ]™NˆL__]\]U˜XÙWÊJ^ØÛÛœÝ]\Ë˜XÙTÝ]WÎÚYŠ]˜XÝ]™J\™]\›ŽÚYŠ\™Ù][™^OOKLJ^ØÛÛœÝÏYK›X\™Ù]^[œ›ÛPÛÛÜ™[˜]JœÝ\ÛÛÜ™
NÚYŠ™ŠËKœ^[
O\Ëœ^[Û\˜[˜ÙWÊ\™]\›ŸXÛÛœÝZYJK˜ÛÛÜ™[˜]KK›X\\Ëœ^[Û\˜[˜ÙWÊNÚYŠ\™Ù][™^OOKLI‰“X]œÜ\
‹˜ÛÜÙ\Ý\™Ù]\Ý[˜ÙJKÙK›X\™Ù]šY]Ê
K™Ù]™\ÛÛ][ÛŠ
O\Ëœ^[Û\˜[˜ÙWÊ\™]\›ŽÚYŠ\™Ù][™^OO\‹š[™^
^ÚYŠ\™Ù][™^OOKLJ^ØÛÛœÝO]\™Ù]ÖÝ\™Ù][™^NÝ\Ëœ™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊKœÝ\[™^K™[™[™^
_Y[ÙH›ÜŠÛÛœÝHÙˆ\Ë˜XÙTÙYÛY[×Ê^ØÛÛœÝÏXVÌK[Ë™Ù[ÛY]žKÏXVÌWKO[™Ù]ÛÛÜ™[˜]\Ê
NÒRJK™Ù]\J
KË™\
KœÜXÙJËš[™^
ØËJKœÙ]ÛÛÜ™[˜]\ÊJKÏOOL	‰ŠËš[™^OLJ_XÛÛœÝÏ]\™Ù]ÖÜ‹š[™^NÝ\Ë˜Y˜XÙYÛÛÜ™[˜]\×ÊËËœÝ\[™^‹™[™[™^
_Y[Ù^ØÛÛœÝÏ]\™Ù]ÖÝ\™Ù][™^NÝ\Ë˜YÜ”™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊË‹™[™[™^
_]\™Ù][™^\‹š[™^ØÛÛœÝO]\™Ù]ÖÝ\™Ù][™^NÚK™[™[™^\‹™[™[™^YÙ]˜XÙPØ[™Y]\×ÊJ^ØÛÛœÝ]\Ë™Ù]X\

K]\Ëœ^[Û\˜[˜ÙWËO]™Ù]ÛÛÜ™[˜]Qœ›ÛT^[
ÙKœ^[ÌK\‹Kœ^[ÌWJÜ—JKÏ]™Ù]ÛÛÜ™[˜]Qœ›ÛT^[
ÙKœ^[ÌJÜ‹Kœ^[ÌWK\—JKO^œÊÚK×JNÜ™]\›ˆ\Ë˜XÙTÛÝ\˜ÙWË™Ù]™X]\™\Ò[‘^[
J_]ÙÙÛU˜XÙTÝ]WÊJ^ÚYŠ]\Ë˜XÙTÛÝ\˜ÙWß]\Ë˜XÙPÛÛ™][Û—ÊJJ\™]\›ŽÚYŠ\Ë˜XÙTÝ]WË˜XÝ]™J^Ý\Ë™XXÝ]˜]U˜XÙWÊ
K\Ë˜XÙTÙYÛY[×Ï[[Ü™]\›ŸXÛÛœÝ]\Ë™Ù]˜XÙPØ[™Y]\×ÊJNÚYŠ›[™ÝOOL
\™]\›ŽØÛÛœÝY™YJK˜ÛÛÜ™[˜]K
NÜ‹›[™Ý	‰Š\Ë˜XÙTÝ]WÏ^ØXÝ]™NˆLÝ\ÛÛÜ™™K˜ÛÛÜ™[˜]KœÛXÙJ
K\™Ù]Îœ‹\™Ù][™^‹L_J_XYÜ”™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊK
^ØÛÛœÝYKœÝ\[™^YK™[™[™^OYKœÝ\[™^]ÜOOZOÜ‰‰™K™[™[™^\‰‰K™[™[™^Ý\Ë˜Y˜XÙYÛÛÜ™[˜]\×ÊKK™[™[™^
NŠ‰‰K™[™[™^\‰‰™K™[™[™^
I‰\Ëœ™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊK™[™[™^
NŠ\Ëœ™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊKœÝ\[™^K™[™[™^
K\Ë˜Y˜XÙYÛÛÜ™[˜]\×ÊKKœÝ\[™^
J_\™[[Ý™U˜XÙYÛÛÜ™[˜]\×ÊK
^ÚYŠOOO]
\™]\›ŽÛ]LÚYŠO
^ØÛÛœÝOSX]˜ÙZ[
JNÛ]ÏSX]™›ÛÜŠ
NÜÏOO]	‰ŠËOLJK\ËZJÌ_Y[Ù^ØÛÛœÝOSX]™›ÛÜŠJNÛ]ÏSX]˜ÙZ[

NÜÏOO]	‰ŠÊÏLJKZK\ÊÌ_ZYŠŒ
Y›ÜŠÛÛœÝHÙˆ\Ë˜XÙTÙYÛY[×Ê^ØÛÛœÝÏZVÌKO\Ë™Ù[ÛY]žKÏZVÌWNÛ]ZVÌKš[™^
ÌNÛÏOOLI‰ŠO\ŠNØÛÛœÝÏXK™Ù]ÛÛÜ™[˜]\Ê
NÒRJËK™Ù]\J
KË™\
KœÜXÙJŠKKœÙ]ÛÛÜ™[˜]\ÊÊKÏOOLI‰ŠËš[™^O\Š__XY˜XÙYÛÛÜ™[˜]\×ÊKŠ^ÚYŠOO\Š\™]\›ŽØÛÛœÝOV×NÚYŠŠ^ØÛÛœÝÏSX]˜ÙZ[

NÛ]OSX]™›ÛÜŠŠNØOOO\‰‰ŠKOLJNÙ›ÜŠ]Ï\ÎÛÏXNÊÊÛÊZKœ\Ú
Ú
K˜ÛÛÜ™[˜]\ËÊJ_Y[Ù^ØÛÛœÝÏSX]™›ÛÜŠ
NÛ]OSX]˜ÙZ[
ŠNØOOO\‰‰ŠJÏLJNÙ›ÜŠ]Ï\ÎÛÏXNËK[ÊZKœ\Ú
Ú
K˜ÛÛÜ™[˜]\ËÊJ_ZYŠK›[™Ý
Y›ÜŠÛÛœÝÈÙˆ\Ë˜XÙTÙYÛY[×Ê^ØÛÛœÝO\ÖÌKÏXK™Ù[ÛY]žK\ÖÌWKÏXKš[™^
ÌNÛOOL	‰šKœ™]™\œÙJ
NØÛÛœÝO[Ë™Ù]ÛÛÜ™[˜]\Ê
NÒRJKË™Ù]\J
KK™\
KœÜXÙJË‹‹šJKËœÙ]ÛÛÜ™[˜]\ÊJKOOLI‰ŠKš[™^
ÏZK›[™Ý
__]\]QÙ[ÛY]žWÊK
^ØÛÛœÝ]ÌKO\‹™\Û]ÎØÛÛœÝO\‹œÙYÛY[Ï\‹™Ù[ÛY]žK]ÌWNÙ›ÜŠÙK›[™ÝË™Ù]ÝšYJ
NÊYKœ\Ú
VÛVÙK›[™ÝJNÜÝÚ]Ú
Ë™Ù]\J
J^ØØ\ÙH”Ú[ŽœÏYKVÌOYKVÌWOYNØœ™XZÎØØ\ÙH“][TÚ[ŽœÏ[Ë™Ù]ÛÛÜ™[˜]\Ê
KÖÜ‹š[™^OYKVÌOYKVÌWOYNØœ™XZÎØØ\ÙH“[™TÝš[™ÈŽœÏ[Ë™Ù]ÛÛÜ™[˜]\Ê
KÖÜ‹š[™^
ÛOYKVÛOYNØœ™XZÎØØ\ÙH“][S[™TÝš[™ÈŽœÏ[Ë™Ù]ÛÛÜ™[˜]\Ê
KÖÚVÌWVÜ‹š[™^
ÛOYKVÛOYNØœ™XZÎØØ\ÙH”ÛYÛÛˆŽœÏ[Ë™Ù]ÛÛÜ™[˜]\Ê
KÖÚVÌWVÜ‹š[™^
ÛOYKVÛOYNØœ™XZÎØØ\ÙH“][TÛYÛÛˆŽœÏ[Ë™Ù]ÛÛÜ™[˜]\Ê
KÖÚVÌWWVÚVÌWVÜ‹š[™^
ÛOYKVÛOYNØœ™XZÎØØ\ÙHÚ\˜ÛHŽ˜ÛÛœÝÏ[ÎÚYŠVÌOYKVÌWOYK‹š[™^OOPUŠ]\Ë˜Ú[™Ú[™Ñ™X]\™WÏHLËœÙ]Ù[\ŠJK\Ë˜Ú[™Ú[™Ñ™X]\™WÏHLNÙ[Ù^Ý\Ë˜Ú[™Ú[™Ñ™X]\™WÏHL\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
NÛ]OU™ŠJË™Ù]Ù[\Š
JKJJJNØËœÙ]˜Y]\ÊJK\Ë˜Ú[™Ú[™Ñ™X]\™WÏHL_Xœ™XZß\É‰\ËœÙ]Ù[ÛY]žPÛÛÜ™[˜]\×ÊËÊ_Z[™Q˜YÑ]™[
J^Ý\ËšYÛ›Ü™S™^Ú[™ÛPÛXÚ×ÏHLK\ËÚ[[ÙYžQ™X]\™\×ÊK\Ë™˜YÔÙYÛY[×Ë›X\

ØWJOO˜JJNØÛÛœÝVÙK˜ÛÛÜ™[˜]VÌJÝ\Ë™[WÖÌKK˜ÛÛÜ™[˜]VÌWJÝ\Ë™[WÖÌWWKV×KOV×KÏ]\Ë˜XÙTÝ]WË˜XÝ]™I‰ˆ]\Ë˜XÙTÙYÛY[×ÏÝ\Ë˜XÙTÝ]WËœÝ\ÛÛÜ™›[ÚYŠÊ^Ý\Ë˜XÙTÙYÛY[×ÏV×NÙ›ÜŠÛÛœÝHÙˆ\Ë™˜YÔÙYÛY[×Ê^ØÛÛœÝÏXVÌNÕ™ŠŠËËœÙYÛY[
KÊKÙK›X\™Ù]šY]Ê
K™Ù]™\ÛÛ][ÛŠ
OI‰\Ë˜XÙTÙYÛY[×Ëœ\Ú
J__Y›ÜŠ]OLÏ]\Ë™˜YÔÙYÛY[×Ë›[™ÝØOÎÊÊØJ^ØÛÛœÝ]\Ë™˜YÔÙYÛY[×ÖØWKÏ[ÌKOXË™™X]\™NÜ‹š[˜ÛY\ÊJ_‹œ\Ú
JNØÛÛœÝXË™Ù[ÛY]žNÚKš[˜ÛY\ÊŠ_Kœ\Ú
ŠK\Ë\]QÙ[ÛY]žWÊ
_]\Ë\]U˜XÙWÊJK\Ë˜Ü™X]SÜ•\]U™\^™X]\™WÊ‹KL
_Z[™QÝÛ‘]™[
J^ÚYŠ]\Ë˜ÛÛ™][Û—ÊJJ\™]\›ˆLNØÛÛœÝYK˜ÛÛÜ™[˜]K]\Ë™š[™[œÙ\™\XÙ\Ð[™\]Q˜YÔÙYÛY[×Ê
NÚYŠË›[™Ý	‰\Ëš[œÙ\™\^ÛÛ™][Û—ÊJI‰Š\ËÚ[[ÙYžQ™X]\™\×ÊKŠK\Ë™\^™X]\™WÊJ^ØÛÛœÝO]\Ë™\^™X]\™WË™Ù]Ù[ÛY]žJ
K™Ù]ÛÛÜ™[˜]\Ê
NÙ›ÜŠ]Ï\‹›[™ÝLNÜÏLËK\Ê]\Ëš[œÙ\™\^Ê–Ü×KJNÝ\ËšYÛ›Ü™S™^Ú[™ÛPÛXÚ×ÏHL\™]\›ˆH]\Ë™\^™X]\™WßZ[™U\]™[
J^Ù›ÜŠ]]\Ë™˜YÔÙYÛY[×Ë›[™ÝLNÝLËK]
^ØÛÛœÝ]\Ë™˜YÔÙYÛY[×ÖÝVÌKO\‹™Ù[ÛY]žNÚYŠK™Ù]\J
OOOHÚ\˜ÛHŠ^ØÛÛœÝÏZKO\Ë™Ù]Ù[\Š
KÏ\‹™™X]\™TÙYÛY[ÖÌK\‹™™X]\™TÙYÛY[ÖÌWNÛËœÙYÛY[ÌOXKËœÙYÛY[ÌWOXKœÙYÛY[ÌOXKœÙYÛY[ÌWOXK\Ëœ\ÚË\]JÝŠJKÊNÛ]Ï\ÎÝ\Ëœ\ÚË\]JË™Ù]^[

K
_Y[ÙH\Ëœ\ÚË\]JœÊ‹œÙYÛY[
KŠ_\™]\›ˆ\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÉ‰Š\ËÙÙÛU˜XÙTÝ]WÊJK\Ë™\Ü]Ú]™[
™]È’JRK“SÑQ–QS‘\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYËJJK\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÏ[[
KL_Z[™TÚ[\“[Ý™WÊJ^Ý\Ë›\ÝÛÛÜ™[˜]WÏYK˜ÛÛÜ™[˜]K\Ëš[™TÚ[\]^[Ê\Ë›\ÝÛÛÜ™[˜]WÊ_Z[™TÚ[\]^[ÊJ^ØÛÛœÝ]\Ë™Ù]X\

K]™Ù]^[œ›ÛPÛÛÜ™[˜]JJNÝ™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
NØÛÛœÝOY[˜Ý[ÛŠË
^Ü™]\›ˆ•ŠKÊKT•ŠK
_NÛ]ËNÚYŠ\Ëš]]XÝ[Û—Ê^ØÛÛœÝÏ]\[Ùˆ\Ëš]]XÝ[Û—ÏOH›Øš™XÝÛO›OO]\Ëš]]XÝ[Û—Î›ÚYÝ™›Ü‘XXÚ™X]\™P]^[
‹
ËJOOžÝI‰K™Ù]\J
OOOH”Ú[‰‰ŠO[™]ÈœŠ™ÊK™Ù]ÛÛÜ™[˜]\Ê
JJJNØÛÛœÝ]_™Ù]Ù[ÛY]žJ
NÚYŠ‰‰™‹™Ù]\J
OOOH”Ú[‰‰›[œÝ[˜Ù[ÙˆÜ‰‰\Ë™™X]\™\×Ë™Ù]\œ˜^J
Kš[˜ÛY\Ê
J^ØOYŽØÛÛœÝ[™Ù]Ù[ÛY]žJ
K™Ù]›]ÛÛÜ™[˜]\Ê
KœÛXÙJŠNÜÏVÞÙ™X]\™N›Ù[ÛY]žN˜KÙYÛY[–Ü_W_\™]\›ˆLKÛ^Y\‘š[\Ž›ßJ_ZYŠ\Ê^ØÛÛœÝÏR
ÝŠKUŠJK]™Ù]šY]Ê
K™Ù]™\ÛÛ][ÛŠ
J\Ëœ^[Û\˜[˜ÙWËÏ[Ê˜JËUŠJNÜÏ]\Ëœ\ÚË™Ù][‘^[
Ê_ZYŠÉ‰œË›[™ÝŒ
^ØÛÛœÝÏ\ËœÛÜ
JVÌK[ËœÙYÛY[Û]ÏTŠKÊNØÛÛœÝO]™Ù]^[œ›ÛPÛÛÜ™[˜]JÊNÛ]U™Š‹JNÚYŠ_]\Ëœ^[Û\˜[˜ÙWÊ^ØÛÛœÝ^ßNÚYŠÑ

WOHL\ËœÛ˜\ÔÚ[\—ß
\Ë™[WÖÌOXÖÌKYVÌK\Ë™[WÖÌWOXÖÌWKYVÌWJKË™Ù[ÛY]žK™Ù]\J
OOOHÚ\˜ÛH‰‰›Ëš[™^OOTŒJ]\ËœÛ˜\YÕ™\^ÏHL\Ë˜Ü™X]SÜ•\]U™\^™X]\™WÊËÛË™™X]\™WKÛË™Ù[ÛY]žWK\ËœÛ˜\YÕ™\^ÊNÙ[Ù^ØÛÛœÝO]™Ù]^[œ›ÛPÛÛÜ™[˜]JÌJKO]™Ù]^[œ›ÛPÛÛÜ™[˜]JÌWJK[Ì
KJKÏ[Ì
KJNÚYŠSX]œÜ\
X]›Z[ŠÊJK\ËœÛ˜\YÕ™\^ÏY]\Ëœ^[Û\˜[˜ÙWË]\ËœÛ˜\YÕ™\^É‰ˆ]\Ëš[œÙ\™\^ÛÛ™][Û—Ê\Ë›\ÝÚ[\‘]™[ÊJ^Ý\Ë™\^™X]\™WÉ‰Š\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
Kœ™[[Ý™Q™X]\™J\Ë™\^™X]\™WÊK\Ë™\^™X]\™WÏ[[
NÜ™]\›Ÿ]\ËœÛ˜\YÕ™\^É‰ŠÏ^—ÏÛÌWN›ÌJK\Ë˜Ü™X]SÜ•\]U™\^™X]\™WÊËÛË™™X]\™WKÛË™Ù[ÛY]žWK\ËœÛ˜\YÕ™\^ÊNØÛÛœÝO^ßNÑVÑ
Ë™Ù[ÛY]žJWOHLÙ›ÜŠ]ÏLKÏ\Ë›[™ÝÔÏÎÊÊÔÊ^ØÛÛœÝO\ÖÔ×KœÙYÛY[ÚYŠØJÌKVÌJI‰‘ØJÌWKVÌWJ_ØJÌKVÌWJI‰‘ØJÌWKVÌJJ^ØÛÛœÝQ
ÖÔ×K™Ù[ÛY]žJNÔ[ˆ_
VÔOHLÑ
JWOHL
_Y[ÙHœ™XZß_]\Ë™\^ÙYÛY[×Ï\Ü™]\›Ÿ_]\Ë™\^™X]\™WÉ‰Š\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
Kœ™[[Ý™Q™X]\™J\Ë™\^™X]\™WÊK\Ë™\^™X]\™WÏ[[
_Z[œÙ\™\^ÊK
^ØÛÛœÝYKœÙYÛY[OYK™™X]\™KÏYK™Ù[ÛY]žKOYK™\ÏYKš[™^Û]Ù›ÜŠÝ›[™ÝË™Ù]ÝšYJ
NÊ]œ\Ú

NÜÝÚ]Ú
Ë™Ù]\J
J^ØØ\ÙH“][S[™TÝš[™ÈŽ›\Ë™Ù]ÛÛÜ™[˜]\Ê
KØVÌWKœÜXÙJÊÌK
NØœ™XZÎØØ\ÙH”ÛYÛÛˆŽ›\Ë™Ù]ÛÛÜ™[˜]\Ê
KØVÌWKœÜXÙJÊÌK
NØœ™XZÎØØ\ÙH“][TÛYÛÛˆŽ›\Ë™Ù]ÛÛÜ™[˜]\Ê
KØVÌWWVØVÌWKœÜXÙJÊÌK
NØœ™XZÎØØ\ÙH“[™TÝš[™ÈŽ›\Ë™Ù]ÛÛÜ™[˜]\Ê
KœÜXÙJÊÌK
NØœ™XZÎÙY˜][œ™]\›ˆL_]\ËœÙ]Ù[ÛY]žPÛÛÜ™[˜]\×ÊË
NØÛÛœÝÏ]\Ëœ\ÚÎØËœ™[[Ý™JJK\Ë\]TÙYÛY[[™XÙ\×ÊËËKJNØÛÛœÝO^ÜÙYÛY[–Ü–ÌKK™X]\™NšKÙ[ÛY]žNœË\˜K[™^›ßNØËš[œÙ\
œÊKœÙYÛY[
KJK\Ë™˜YÔÙYÛY[×Ëœ\Ú
ÝKWJNØÛÛœÝ^ÜÙYÛY[–Ý–ÌWWK™X]\™NšKÙ[ÛY]žNœË\˜K[™^›ÊÌ_NÜ™]\›ˆËš[œÙ\
œÊ‹œÙYÛY[
KŠK\Ë™˜YÔÙYÛY[×Ëœ\Ú
Ù‹JKL]\]TÚ[\—ÊJ^Ü™]\›ˆI‰\Ë™š[™[œÙ\™\XÙ\Ð[™\]Q˜YÔÙYÛY[×ÊJK\Ë™\^™X]\™WÏË™Ù]Ù[ÛY]žJ
K™Ù]ÛÛÜ™[˜]\Ê
_YÙ]Ú[

^ØÛÛœÝO]\Ë™\^™X]\™WÏË™Ù]Ù[ÛY]žJ
K™Ù]ÛÛÜ™[˜]\Ê
NÜ™]\›ˆOÝ™ÊK\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
JN›[XØ[”™[[Ý™TÚ[

^ÚYŠ]\Ë™\^™X]\™Wß\Ë™\^™X]\™WË™Ù]
™Ù[ÛY]šY\ÈŠK™]™\žJOœ‹™Ù]\J
OOOHÚ\˜ÛHŸ‹™Ù]\J
K™[™ÕÚ]
”Ú[ŠJJ\™]\›ˆLNØÛÛœÝO]\Ë™\^™X]\™WË™Ù]Ù[ÛY]žJ
K™Ù]ÛÛÜ™[˜]\Ê
NÜ™]\›ˆ\Ëœ\ÚË™Ù][‘^[
œÊÙWJJKœÛÛYJ
ÜÙYÛY[œŸJOO‘ØJ–ÌKJ_ØJ–ÌWKJJ_\™[[Ý™TÚ[
J^ÚYŠI‰ŠOSJK\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
JK\Ë\]TÚ[\—ÊJJK]\Ë›\ÝÚ[\‘]™[ß\Ë›\ÝÚ[\‘]™[É‰\Ë›\ÝÚ[\‘]™[Ë\HO]Ü‹”ÒS•T‘QÊ^ØÛÛœÝ]\Ë›\ÝÚ[\‘]™[ÎÝ\ËÚ[[ÙYžQ™X]\™\×Ê\Ë™˜YÔÙYÛY[×Ë›X\

ÚWJOOšJJNØÛÛœÝ]\Ëœ™[[Ý™U™\^Ê
NÜ™]\›ˆ\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÉ‰\Ë™\Ü]Ú]™[
™]È’JRK“SÑQ–QS‘\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYË
JK\Ë™™X]\™\Ð™Z[™Ó[ÙYšYYÏ[[Ÿ\™]\›ˆL_\™[[Ý™U™\^Ê
^ØÛÛœÝO]\Ë™˜YÔÙYÛY[×Ë^ßNÛ]HLKKËKËËK‹KNÙ›ÜŠYK›[™ÝLNÛLËK[
XOYVÛKOXVÌKOQ
K™™X]\™JKK™\	‰ŠJÏH‹HŠÛK™\š›Ú[Š‹HŠJKH[ˆ
ÞWO^ßJKVÌWOOOLÊÞWKœšYÚ[KÞWKš[™^[Kš[™^
N˜VÌWOOLI‰ŠÞWK›Y[KÞWKš[™^[Kš[™^
ÌJNÙ›ÜŠH[ˆ
^ÜÝÚ]Ú
]ÞWKœšYÚO]ÞWK›YÏ]ÞWKš[™^XËLKHOO]›ÚYÛO]N›O\	‰ŠL
KÏ[K™Ù[ÛY]žKÏ[Ë™Ù]ÛÛÜ™[˜]\Ê
KO\ËHLKË™Ù]\J
J^ØØ\ÙH“][S[™TÝš[™ÈŽœÖÛK™\ÌWK›[™ÝŒ‰‰ŠÖÛK™\ÌWKœÜXÙJËJKHL
NØœ™XZÎØØ\ÙH“[™TÝš[™ÈŽœË›[™ÝŒ‰‰ŠËœÜXÙJËJKHL
NØœ™XZÎØØ\ÙH“][TÛYÛÛˆŽšOZVÛK™\ÌWWNØØ\ÙH”ÛYÛÛˆŽšOZVÛK™\ÌWKK›[™Ý	‰ŠÏOZK›[™ÝLI‰ŠÏL
KKœÜXÙJËJKHLÏOOL	‰ŠKœÜ

KKœ\Ú
VÌJKZK›[™ÝLJJNØœ™XZßZYŠŠ^Ý\ËœÙ]Ù[ÛY]žPÛÛÜ™[˜]\×ÊËÊNØÛÛœÝV×NÚYŠHOO]›ÚY	‰Š\Ëœ\ÚËœ™[[Ý™JJKœ\Ú
KœÙYÛY[ÌJJKOO]›ÚY	‰Š\Ëœ\ÚËœ™[[Ý™J
Kœ\Ú
œÙYÛY[ÌWJJKHOO]›ÚY	‰œOO]›ÚY
^ØÛÛœÝÏ^Ù\›K™\™X]\™N›K™™X]\™KÙ[ÛY]žN›K™Ù[ÛY]žK[™^™‹ÙYÛY[žNÝ\Ëœ\ÚËš[œÙ\
œÊËœÙYÛY[
KÊ_]\Ë\]TÙYÛY[[™XÙ\×ÊËËK™\LJK\Ë™\^™X]\™WÉ‰Š\Ë›Ý™\›^WË™Ù]ÛÝ\˜ÙJ
Kœ™[[Ý™Q™X]\™J\Ë™\^™X]\™WÊK\Ë™\^™X]\™WÏ[[
KK›[™ÝL_\™]\›ˆŸXØ[’[œÙ\Ú[

^ÚYŠ]\Ë™\^™X]\™Wß\Ë™\^™X]\™WË™Ù]
™Ù[ÛY]šY\ÈŠK™]™\žJOœ‹™Ù]\J
OOOHÚ\˜ÛHŸ‹™Ù]\J
K™[™ÕÚ]
”Ú[ŠJJ\™]\›ˆLNØÛÛœÝO]\Ë™\^™X]\™WË™Ù]Ù[ÛY]žJ
K™Ù]ÛÛÜ™[˜]\Ê
NÜ™]\›ˆ\Ëœ\ÚË™Ù][‘^[
œÊÙWJJKœÛÛYJ
ÜÙYÛY[œŸJOOˆJØJ–ÌKJ_ØJ–ÌWKJJJ_Z[œÙ\Ú[
J^ØÛÛœÝYOÓJK\Ë™Ù]X\

K™Ù]šY]Ê
K™Ù]›Ú™XÝ[ÛŠ
JN\Ë™\^™X]\™WÏË™Ù]Ù[ÛY]žJ
K™Ù]ÛÛÜ™[˜]\Ê
NÜ™]\›ˆÝ\Ë™š[™[œÙ\™\XÙ\Ð[™\]Q˜YÔÙYÛY[×Ê
Kœ™YXÙJ
KÊOOš_\Ëš[œÙ\™\^ÊË
KLJNˆL_\Ù]Ù[ÛY]žPÛÛÜ™[˜]\×ÊK
^Ý\Ë˜Ú[™Ú[™Ñ™X]\™WÏHLKœÙ]ÛÛÜ™[˜]\Ê
K\Ë˜Ú[™Ú[™Ñ™X]\™WÏHL_]\]TÙYÛY[[™XÙ\×ÊK‹J^Ý\Ëœ\ÚË™›Ü‘XXÚ[‘^[
K™Ù]^[

K[˜Ý[ÛŠÊ^ÜË™Ù[ÛY]žOOOYI‰ŠOO]›ÚYË™\OO]›ÚYJË™\ŠJI‰œËš[™^	‰ŠËš[™^
ÏZJ_J__Y[˜Ý[Ûˆ^™J‹J^Ü™]\›ˆ‹š[™^YKš[™^Y[˜Ý[Ûˆ•Š‹K
^ØÛÛœÝYK™Ù[ÛY]žNÚYŠ‹™Ù]\J
OOOHÚ\˜ÛHŠ^Û]Ï\ŽÚYŠKš[™^OOTŒJ^ØÛÛœÝO[Ì
Ë™Ù]Ù[\Š
KJŠJKÏSX]œÜ\
JK\Ë™Ù]˜Y]\Ê
NÜ™]\›ˆÊ›ß_XÛÛœÝOSJŠNÜ™]\›ˆÌOSJKœÙYÛY[ÌJKÌWOSJKœÙYÛY[ÌWJKYJK
_Y[˜Ý[ÛˆŠ‹K
^ØÛÛœÝYK™Ù[ÛY]žNÚYŠ‹™Ù]\J
OOOHÚ\˜ÛH‰‰™Kš[™^OOTŒJ\™]\›ˆ™Ê‹™Ù]ÛÜÙ\ÝÚ[
JŠJJNØÛÛœÝOSJŠNÜ™]\›ˆÌOSJKœÙYÛY[ÌJKÌWOSJKœÙYÛY[ÌWJK™ÊŠK
J_Y[˜Ý[Ûˆž™J
^ØÛÛœÝUSŠ
NÜ™]\›ˆ[˜Ý[ÛŠK
^Ü™]\›ˆ‹”Ú[_XÛÛœÝÌ^ÔÑSPÕˆœÙ[XÝŸNØÛ\ÜÈLˆ^[™È›ÞØÛÛœÝXÝÜŠK‹J^ÜÝ\\ŠJK\ËœÙ[XÝY]\Ë™\Ù[XÝY\‹\Ë›X\œ›ÝÜÙ\‘]™[Z__XÛÛœÝ^ßNØÛ\ÜÈLÈ^[™ÈÞ^ØÛÛœÝXÝÜŠJ^ÜÝ\\Š
K\Ë›Û‹\Ë›Û˜ÙK\Ë[‹OY_ßK\Ë˜›Ý[™Y™X]\™WÏ]\Ë˜Y™X]\™WË˜š[™
\ÊK\Ë˜›Ý[™™[[Ý™Q™X]\™WÏ]\Ëœ™[[Ý™Q™X]\™WË˜š[™
\ÊK\Ë˜ÛÛ™][Û—ÏYK˜ÛÛ™][ÛÙK˜ÛÛ™][ÛŽ˜R‹\Ë˜YÛÛ™][Û—ÏYK˜YÛÛ™][ÛÙK˜YÛÛ™][ÛŽž”Ë\Ëœ™[[Ý™PÛÛ™][Û—ÏYKœ™[[Ý™PÛÛ™][ÛÙKœ™[[Ý™PÛÛ™][ÛŽž”Ë\ËÙÙÛPÛÛ™][Û—ÏYKÙÙÛPÛÛ™][ÛÙKÙÙÛPÛÛ™][ÛŽ‘ÔË\Ë›][WÏYK›][OÙK›][NˆLK\Ë™š[\—ÏYK™š[\ÙK™š[\Ž‘Z\Ëš]Û\˜[˜ÙWÏYKš]Û\˜[˜ÙOÙKš]Û\˜[˜ÙNŒ\ËœÝ[WÏYKœÝ[HOO]›ÚYÙKœÝ[N”™J
K\Ë™™X]\™\×ÏYK™™X]\™\ß™]È	NÛ]ÚYŠK›^Y\œÊZYŠ\[ÙˆK›^Y\œÏOH™[˜Ý[ÛˆŠ]YK›^Y\œÎÙ[Ù^ØÛÛœÝYK›^Y\œÎÝY[˜Ý[ÛŠJ^Ü™]\›ˆ‹š[˜ÛY\ÊJ__Y[ÙHQZÝ\Ë›^Y\‘š[\—Ï]\Ë™™X]\™S^Y\\ÜÛØÚX][Û—Ï^ß_XY™X]\™S^Y\\ÜÛØÚX][Û—ÊK
^Ý\Ë™™X]\™S^Y\\ÜÛØÚX][Û—ÖÑ
JWO]YÙ]™X]\™\Ê
^Ü™]\›ˆ\Ë™™X]\™\×ßYÙ]]Û\˜[˜ÙJ
^Ü™]\›ˆ\Ëš]Û\˜[˜ÙWßYÙ]^Y\ŠJ^Ü™]\›ˆ\Ë™™X]\™S^Y\\ÜÛØÚX][Û—ÖÑ
JW_\Ù]]Û\˜[˜ÙJJ^Ý\Ëš]Û\˜[˜ÙWÏY_\Ù]X\
J^Ý\Ë™Ù]X\

I‰\ËœÝ[WÉ‰\Ë™™X]\™\×Ë™›Ü‘XXÚ
\Ëœ™\ÝÜ™T™]š[Ý\ÔÝ[WË˜š[™
\ÊJKÝ\\‹œÙ]X\
JKOÊ\Ë™™X]\™\×Ë˜Y]™[\Ý[™\ŠÜËQ\Ë˜›Ý[™Y™X]\™WÊK\Ë™™X]\™\×Ë˜Y]™[\Ý[™\ŠÜË”‘SSÕ‘K\Ë˜›Ý[™™[[Ý™Q™X]\™WÊK\ËœÝ[WÉ‰\Ë™™X]\™\×Ë™›Ü‘XXÚ
\Ë˜\TÙ[XÝYÝ[WË˜š[™
\ÊJJNŠ\Ë™™X]\™\×Ëœ™[[Ý™Q]™[\Ý[™\ŠÜËQ\Ë˜›Ý[™Y™X]\™WÊK\Ë™™X]\™\×Ëœ™[[Ý™Q]™[\Ý[™\ŠÜË”‘SSÕ‘K\Ë˜›Ý[™™[[Ý™Q™X]\™WÊJ_XY™X]\™WÊJ^ØÛÛœÝYK™[[Y[ÚYŠ\ËœÝ[WÉ‰\Ë˜\TÙ[XÝYÝ[WÊ
K]\Ë™Ù]^Y\Š
J^ØÛÛœÝ]\Ë™š[™^Y\“Ù‘™X]\™WÊ
NÜ‰‰\Ë˜Y™X]\™S^Y\\ÜÛØÚX][Û—ÊŠ__\™[[Ý™Q™X]\™WÊJ^Ý\ËœÝ[WÉ‰\Ëœ™\ÝÜ™T™]š[Ý\ÔÝ[WÊK™[[Y[
_Yš[™^Y\“Ù‘™X]\™WÊJ^Ü™]\›ˆ\Ë™Ù]X\

K™Ù][^Y\œÊ
K™š[™
[˜Ý[ÛŠŠ^ÚYŠˆ[œÝ[˜Ù[ÙˆÚI‰œ‹™Ù]ÛÝ\˜ÙJ
I‰œ‹™Ù]ÛÝ\˜ÙJ
Kš\Ñ™X]\™JJJ\™]\›ˆŸJ_YÙ]Ý[J
^Ü™]\›ˆ\ËœÝ[WßX\TÙ[XÝYÝ[WÊJ^ØÛÛœÝQ
JNÝ[ˆŸ
–ÝOYK™Ù]Ý[J
JKKœÙ]Ý[J\ËœÝ[WÊ_\™\ÝÜ™T™]š[Ý\ÔÝ[WÊJ^ØÛÛœÝ]\Ë™Ù]X\

K™Ù][\˜XÝ[ÛœÊ
K™Ù]\œ˜^J
NÙ›ÜŠ]O]›[™ÝLNÚOLËKZJ^ØÛÛœÝÏ]ÚWNÚYŠÈOO]\É‰œÈ[œÝ[˜Ù[ÙˆLÉ‰œË™Ù]Ý[J
I‰œË™Ù]™X]\™\Ê
K™Ù]\œ˜^J
K›\Ý[™^ÙŠJHOOKLJ^ÙKœÙ]Ý[JË™Ù]Ý[J
JNÜ™]\›Ÿ_XÛÛœÝQ
JNÙKœÙ]Ý[J–Ü—JK[]H–Ü—_\™[[Ý™Q™X]\™S^Y\\ÜÛØÚX][Û—ÊJ^Ù[]H\Ë™™X]\™S^Y\\ÜÛØÚX][Û—ÖÑ
JW_\Ù[XÝ™X]\™R[\›˜[ÊKŠ^ÚYŠJH[œÝ[˜Ù[ÙˆÜŠ_]\Ë™š[\—ÊK
J\™]\›ŽØÛÛœÝO]\Ë™Ù]™X]\™\Ê
NÜ™]\›ˆK™Ù]\œ˜^J
Kš[˜ÛY\ÊJ_
\Ë˜Y™X]\™S^Y\\ÜÛØÚX][Û—ÊK
KKœ\Ú
JKËœ\Ú
JJK_\Ù[XÝ™X]\™JJ^ØÛÛœÝ]\Ë™š[™^Y\“Ù‘™X]\™WÊJNÚYŠ]\Ë›^Y\‘š[\—Ê
J\™]\›ˆLNØÛÛœÝ]\ËœÙ[XÝ™X]\™R[\›˜[ÊK
NÜ™]\›ˆ‰‰\Ë™\Ü]Ú]™[
™]ÈLŠÌ‹”ÑSPÕÜ—K×K›ÚY
JKH\Ÿ\™[[Ý™Q™X]\™R[\›˜[ÊK
^ØÛÛœÝ]\Ë™Ù]™X]\™\Ê
NÚYŠJJH[œÝ[˜Ù[ÙˆÜŠ_\‹™Ù]\œ˜^J
Kš[˜ÛY\ÊJJJ\™]\›ˆ‹œ™[[Ý™JJK\Ëœ™[[Ý™Q™X]\™S^Y\\ÜÛØÚX][Û—ÊJKËœ\Ú
JK_Y\Ù[XÝ™X]\™JJ^ØÛÛœÝ]\Ëœ™[[Ý™Q™X]\™R[\›˜[ÊJNÜ™]\›ˆ	‰\Ë™\Ü]Ú]™[
™]ÈLŠÌ‹”ÑSPÕ×KÝK›ÚY
JKH]]ÙÙÛQ™X]\™JJ^Ý\Ë™\Ù[XÝ™X]\™JJ_\ËœÙ[XÝ™X]\™JJ_XÛX\”Ù[XÝ[ÛŠ
^Þ™Ê\Ë™™X]\™S^Y\\ÜÛØÚX][Û—ÊNØÛÛœÝO]\Ë™Ù]™X]\™\Ê
KYK™Ù]\œ˜^J
KœÛXÙJ
NÙK˜ÛX\Š
K›[™ÝOOL	‰\Ë™\Ü]Ú]™[
™]ÈLŠÌ‹”ÑSPÕ×K›ÚY
J_Z[™Q]™[
J^ÚYŠ]\Ë˜ÛÛ™][Û—ÊJJ\™]\›ˆLØÛÛœÝ]\Ë˜YÛÛ™][Û—ÊJK]\Ëœ™[[Ý™PÛÛ™][Û—ÊJKO]\ËÙÙÛPÛÛ™][Û—ÊJKÏH]	‰ˆ\‰‰ˆZKOYK›X\Ï]\Ë™Ù]™X]\™\Ê
KV×KÏV×NÚYŠÊ^Û]OHLNØK™›Ü‘XXÚ™X]\™P]^[
Kœ^[
‹
OOžÚYŠOHLH]\ËœÙ[XÝ™X]\™R[\›˜[Ê‹ÊJ\™]\›ˆ]\Ë›][WßKÛ^Y\‘š[\Ž\Ë›^Y\‘š[\—Ë]Û\˜[˜ÙN\Ëš]Û\˜[˜ÙWßJNÙ›ÜŠ][Ë™Ù][™Ý

KLNÙLËKYŠ^ØÛÛœÝ[Ëš][JŠNÊË›[™ÝŒ	‰ˆXËš[˜ÛY\Ê
_]JI‰\Ëœ™[[Ý™Q™X]\™R[\›˜[Ê
__Y[ÙHK™›Ü‘XXÚ™X]\™P]^[
Kœ^[
KŠOOžÛ]ÚYŠ
ŸJI‰Š]\Ëœ™[[Ý™Q™X]\™R[\›˜[ÊK
JK
JI‰ˆ\	‰Š]\ËœÙ[XÝ™X]\™R[\›˜[ÊK‹ÊJKH\
\™]\›ˆ]\Ë›][WßKÛ^Y\‘š[\Ž\Ë›^Y\‘š[\—Ë]Û\˜[˜ÙN\Ëš]Û\˜[˜ÙWßJNÜ™]\›ŠË›[™ÝŒ›[™ÝŒ
I‰\Ë™\Ü]Ú]™[
™]ÈLŠÌ‹”ÑSPÕËJJKL_Y[˜Ý[Ûˆ™J
^ØÛÛœÝUSŠ
NÜ™]\›ˆœŠ‹”ÛYÛÛ‹‹“[™TÝš[™ÊKœŠ‹‘Ù[ÛY]žPÛÛXÝ[Û‹‹“[™TÝš[™ÊK[˜Ý[ÛŠJ^Ü™]\›ˆK™Ù]Ù[ÛY]žJ
OÛ–ÙK™Ù]Ù[ÛY]žJ
K™Ù]\J
WN›[_Y[˜Ý[Ûˆž™J
^ØÛÛœÝU\ŠÏO—Ë›X\
KO[]
ÏO—ËœÙ]˜]Ú[™Ó[ÙJK[]
ÏO—Ë˜XÝ]™UÚ[™ÝÏOOH›YX\Ý\™HŠK[]
ÏO—Ë›Ü[•Ú[™ÝÊKO[]
ÏO—Ë˜ÛÜÙUÚ[™ÝÊKÏ^[ŠÏO—ËœÚÝÓYX\Ý\™UÛÛ
KØK×OP‹\ÙTÝ]J[
KÛ×OP‹\ÙTÝ]J
KOP‹\ÙT™YŠ[
KP‹\ÙT™YŠ[
KP‹\ÙT™YŠ[
KOP‹\ÙT™YŠ[
NÐ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝÏ[™]ÈÚNÙ‹˜Ý\œ™[WÎØÛÛœÝO[™]ÈÚJÜÛÝ\˜ÙN—ËÝ[N“^™K’[™^ŒYLË›Ü\Y\ÎžÛ˜[YNˆ›YX\Ý\™K[^Y\ˆŸ_JNÜ™]\›ˆK˜Ý\œ™[QK‹˜Y^Y\ŠJK

OOžÝK˜Ý\œ™[	‰›‹œ™[[Ý™S^Y\ŠK˜Ý\œ™[
__KÛ—JK‹\ÙQY™™XÝ


OOŠJ
K

OOžÝ	‰™JLJ_JKÝWJK‹\ÙQY™™XÝ


OOžÚYŠJ[ŸY‹˜Ý\œ™[
I‰
^ØÛÛœÝÏ[™]ÈYYJÜÛÝ\˜ÙN™‹˜Ý\œ™[\Nˆ“[™TÝš[™È‹Ý[N“™KÝÜÛXÚÎˆLJNÜ˜Ý\œ™[WÎÛ]O[[Ü™]\›ˆË›ÛŠ™˜]ÜÝ\‹ÏOžÑOTË™™X]\™KÊ[
NØÛÛœÝÏQK™Ù]Ù[ÛY]žJ
NÚÉ‰ŠK˜Ý\œ™[ZË›ÛŠ˜Ú[™ÙH‹

OOžØÛÛœÝZŒJËÜ›Ú™XÝ[ÛŽˆ‘TÑÎŒÎMÈŸJNÛÊ•Š
J_JJ_JKË›ÛŠ™˜]Ù[™‹ÏOžÛK˜Ý\œ™[	‰Š’JK˜Ý\œ™[
KK˜Ý\œ™[[[
NØÛÛœÝÏTË™™X]\™K™Ù]Ù[ÛY]žJ
KOZŒJËÜ›Ú™XÝ[ÛŽˆ‘TÑÎŒÎMÈŸJKS•ŠJNÔË™™X]\™KœÙ]
™\Ý[˜ÙH‹
KÊ
KÊOžŠÌJKO[[JK‹˜Y[\˜XÝ[ÛŠÊK

OOžÜ˜Ý\œ™[	‰Š‹œ™[[Ý™R[\˜XÝ[ÛŠ˜Ý\œ™[
K˜Ý\œ™[[[
KK˜Ý\œ™[	‰Š’JK˜Ý\œ™[
KK˜Ý\œ™[[[
___KÛ‹JNØÛÛœÝOJ
OOžÝÊJ
KÊ[
JNœŠ›YX\Ý\™HŠ_KJ
OOžÙ‹˜Ý\œ™[	‰Š‹˜Ý\œ™[˜ÛX\Š
KÊ
KÊ[
J_NÜ™]\›ˆÏÚšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹˜]Û‹ÛÛÛXÚÎžKÛ\ÜÓ˜[YN˜š^YÜVÎLHYLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH	ÝÈ˜™ËX›YKMLŽˆ˜™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎLŸXÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]NˆYœÝ[™[ˆY][ˆ‹Ú[™[ŽššœÞ
ÜÚ^™NŒŒÛ\ÜÓ˜[YNÈ^]Ú]HŽˆ^X›YKML›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JKšœÞ
šKÚ\ÓÜ[Ž]Nˆ“Y][ˆ‹XÛÛŽššœÞ
ÜÚ^™NŒNJKXÙ[Y[ˆ›Y‹[ÝÓX\[\˜XÝ[ÛŽˆLÛÛÜÙNžK›ÛÝ\Ž›ŒÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎžÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\ÙXÛÛ™\žKX]ÛˆËY[^\™YMŒ‹Ú[™[Ž–ÚšœÞ
šÜÚ^™NŒMJK•Ú\ÈY][™Ù[ˆ
‹ŠH—_JN›ÚYÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈÜXÙK^KLˆ‹Ú[™[Ž–ÚšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Žˆ’ÛZÈÛHHY][‹ˆX˜™[ÛZÈÛHHÝÜ[‹ˆŸJKI‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™ËX›YKML›Ý[™Y[ÈLˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^X›YKMŒ›Û[YY][H‹Ú[™[ŽˆYœÝ[™ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^[È›ÛX›Û^X›YKMÌ‹Ú[™[Ž˜_JW_JW_J_JW_JN›[Y[˜Ý[Ûˆ•ŠŠ^Ü™]\›ˆLYLÏØ	Ê‹ÌYLÊKÑš^Y
Š_HÛX˜	ÓX]œ›Ý[™
Š_HXY[˜Ý[Ûˆ^™JŠ^ØÛÛœÝO[‹™Ù]
™\Ý[˜ÙHŠNÜ™]\›ˆ™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÌØŽ™ˆ‹ÚYŒË[™Q\Ú–ÌLL_JK[XYÙN›™]ÈÊÜ˜Y]\ÎKš[›™]È›ŠØÛÛÜŽˆˆÌØŽ™ˆŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™™™™ˆ‹ÚYŒŸJ_JK^™OÛ™]È˜JÝ^™K›Ûˆ˜›ÛLœØ[œË\Ù\šYˆ‹š[›™]È›ŠØÛÛÜŽˆˆÌYMYˆŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™™™™ˆ‹ÚYŒßJKÙ™œÙ]N‹LMKXÙ[Y[ˆ›[™H‹Ý™\™›ÝÎˆLJN›ÚYJ_Y[˜Ý[Ûˆ™J
^Ü™]\›ˆ™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙY‹ÚYŒË[™Q\Ú–ÌLL_JK[XYÙN›™]ÈÊÜ˜Y]\ÎKš[›™]È›ŠØÛÛÜŽˆˆÙYŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™™™™ˆ‹ÚYŒŸJ_J_J_XÛÛœÝOH“ZZ›ˆZÙ[š[™Ù[ˆŽÙ[˜Ý[Ûˆž™J
^ØÛÛœÝU\ŠO•›X\
KO[]
O•œÙ]˜]Ú[™Ó[ÙJK[]
O•˜XÝ]™UÚ[™ÝÏOOH™˜]ÈŠK[]
O•›Ü[•Ú[™ÝÊKO[]
O•˜ÛÜÙUÚ[™ÝÊKÏ^[ŠO•œÚÝÑ˜]ÕÛÛ
KO^[ŠO•œÚÝÓYX\Ý\™UÛÛ
KÛËOP‹\ÙTÝ]JœÙ[XÝŠKØËWOP‹\ÙTÝ]J
KÙ‹OP‹\ÙTÝ]J[
KÛ^Y\œÎ›KYÚ[ž_O]Š
KP‹\ÙT™YŠ[
KÏP‹\ÙT™YŠ[
KOP‹\ÙT™YŠ[
KÏP‹\ÙT™YŠ[
KÏP‹\ÙT™YŠ[
NÐ‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝ[™]ÈÚN×Ë˜Ý\œ™[UØÛÛœÝ[™]ÈÚJÜÛÝ\˜ÙN•Ý[N‘ž™K’[™^ŽNNK›Ü\Y\ÎžÛ˜[YNˆ™˜]Ë\™]šY]Ë[^Y\ˆŸ_JNÜ™]\›ˆ˜Ý\œ™[T‹‹˜Y^Y\ŠŠK

OOžÞ˜Ý\œ™[	‰›‹œ™[[Ý™S^Y\Š˜Ý\œ™[
__KÛ—JK‹\ÙQY™™XÝ


OOŠJ
K

OOžÝ	‰™JLJ_JKÝWJK‹\ÙQY™™XÝ


OOžÚYŠJ[ŸWË˜Ý\œ™[
I‰ŠK˜Ý\œ™[	‰Š‹œ™[[Ý™R[\˜XÝ[ÛŠK˜Ý\œ™[
KK˜Ý\œ™[[[
KË˜Ý\œ™[	‰Š‹œ™[[Ý™R[\˜XÝ[ÛŠË˜Ý\œ™[
KË˜Ý\œ™[[[
KË˜Ý\œ™[	‰Š‹œ™[[Ý™R[\˜XÝ[ÛŠË˜Ý\œ™[
KË˜Ý\œ™[[[
KH]
JZYŠÏOOHœÙ[XÝŠ^ØÛÛœÝ[™]ÈLÊÛ^Y\œÎ–Þ˜Ý\œ™[KÝ[N“Þ™_JNÔË˜Ý\œ™[UØÛÛœÝ[™]È^™JÙ™X]\™\Î•™Ù]™X]\™\Ê
_JNÚË˜Ý\œ™[T‹‹˜Y[\˜XÝ[ÛŠ
K‹˜Y[\˜XÝ[ÛŠŠNØÛÛœÝQOžÚYŠšÙ^OOOH‘[]HŸšÙ^OOOH˜XÚÜÜXÙHŠ^ØÛÛœÝU™Ù]™X]\™\Ê
NÕ‹™›Ü‘XXÚ
Ož×Ë˜Ý\œ™[Ëœ™[[Ý™Q™X]\™JŠ_JK‹˜ÛX\Š
KJË˜Ý\œ™[Ë™Ù]™X]\™\Ê
K›[™Ý
__NÜ™]\›ˆØÝ[Y[˜Y]™[\Ý[™\ŠšÙ^YÝÛˆ‹
K

OOžÙØÝ[Y[œ™[[Ý™Q]™[\Ý[™\ŠšÙ^YÝÛˆ‹
KË˜Ý\œ™[	‰›‹œ™[[Ý™R[\˜XÝ[ÛŠË˜Ý\œ™[
KË˜Ý\œ™[	‰›‹œ™[[Ý™R[\˜XÝ[ÛŠË˜Ý\œ™[
__Y[Ù^ØÛÛœÝ[ÏOOHœÚ[È”Ú[Ž›ÏOOH›[™HÈ“[™TÝš[™ÈŽˆ”ÛYÛÛˆ‹[™]ÈYYJÜÛÝ\˜ÙN—Ë˜Ý\œ™[\N•Ý[N‘™KÝÜÛXÚÎˆLJNÜ™]\›ˆK˜Ý\œ™[T‹‹›ÛŠ™˜]ÜÝ\‹OžÜ
[
NØÛÛœÝS™™X]\™K™Ù]Ù[ÛY]žJ
NÑ	‰‘›ÛŠ˜Ú[™ÙH‹

OOžÚYŠÏOOH›[™HŠ^ØÛÛœÝZŒJÜ›Ú™XÝ[ÛŽˆ‘TÑÎŒÎMÈŸJNÜ
UŠŠJ_Y[ÙHYŠÏOOHœÛYÛÛˆŠ^ØÛÛœÝP’JÜ›Ú™XÝ[ÛŽˆ‘TÑÎŒÎMÈŸJNÜ
ŠŠJ__J_JK‹›ÛŠ™˜]Ù[™‹OžØÛÛœÝS™™X]\™K™Ù]Ù[ÛY]žJ
NÚYŠÏOOH›[™H‰‰‘
^ØÛÛœÝZŒJÜ›Ú™XÝ[ÛŽˆ‘TÑÎŒÎMÈŸJNÓ™™X]\™KœÙ]
›YX\Ý\™[Y[‹UŠŠJ_Y[ÙHYŠÏOOHœÛYÛÛˆ‰‰‘
^ØÛÛœÝP’JÜ›Ú™XÝ[ÛŽˆ‘TÑÎŒÎMÈŸJNÓ™™X]\™KœÙ]
›YX\Ý\™[Y[‹ŠŠJ_S™™X]\™KœÙ]
™˜]Õ\H‹ÊKJO•ŠÌJK
[
_JK‹˜Y[\˜XÝ[ÛŠŠK

OOžÑK˜Ý\œ™[	‰›‹œ™[[Ý™R[\˜XÝ[ÛŠK˜Ý\œ™[
___KÛ‹×JNØÛÛœÝOJ
OOžÚYŠ
^ÚYŠÏŒ	‰ˆXÛÛ™š\›J•ZÙ[š[™Ù[ˆ™\ÚZ™\™[ÈÛZÈY\œÝÜÜÛX[ˆÛHH™]Ø\™[‹ˆŠJ\™]\›ŽÔ

KJ
_Y[ÙHŠ™˜]ÈŠNÛ
œÙ[XÝŠK
[
_KJ
OOž×Ë˜Ý\œ™[	‰ŠË˜Ý\œ™[˜ÛX\Š
KJ
K
[
J_KJ
OOžÚYŠWË˜Ý\œ™[ÏOOL
\™]\›ŽÛ][K™š[™
O‘›˜[YOOOTJNÚYŠU
^ØÛÛœÝ]‹™Ù]Ý]J
K˜Y^Y\ŠKÈ”[‹“Z›ˆ‹•›ZÈ—JNÕ]‹™Ù]Ý]J
K™Ù]^Y\Š
_ZYŠU
^Ø[\
’ÛÛˆZÙ[š[™Ù[ˆXYÈšY]X[›XZÙ[ˆŠNÜ™]\›ŸXÛÛœÝWË˜Ý\œ™[™Ù]™X]\™\Ê
NÛ]LÔ‹™›Ü‘XXÚ

ŠOOžØÛÛœÝQ™Ù]Ù[ÛY]žJ
NÚYŠZŠ\™]\›ŽØÛÛœÝÙOQ™Ù]
™˜]Õ\HŠ_œÚ[‹YOQ™Ù]
›YX\Ý\™[Y[ŠNÛ]ÙKNÚYŠ‹™Ù]\J
OOOH”Ú[Š^ØÛÛœÝYOZ‹™Ù]ÛÛÜ™[˜]\Ê
NÙÙORŠYJ_Y[ÙHYŠ‹™Ù]\J
OOOH“[™TÝš[™ÈŠ^ØÛÛœÝYOZ‹™Ù]ÛÛÜ™[˜]\Ê
KYOSX]™›ÛÜŠYK›[™ÝÌŠNÙÙORŠYVÝYWJKO^Ý\Nˆ“[™TÝš[™È‹ÛÛÜ™[˜]\ÎšYK›X\
OO’ŠJJ__Y[ÙHYŠ‹™Ù]\J
OOOH”ÛYÛÛˆŠ^ØÛÛœÝYOZ‹™Ù]ÛÛÜ™[˜]\Ê
KYOZ‹™Ù]^[

KOVÊYVÌJÝYVÌ—JKÌ‹
YVÌWJÝYVÌ×JKÌ—NÙÙORŠJKO^Ý\Nˆ”ÛYÛÛˆ‹ÛÛÜ™[˜]\ÎšYK›X\
ÏO“Ë›X\
YOO’ŠYJJJ__Y[ÙH™]\›ŽØÛÛœÝO^ÜÚ[ˆ”[‹[™Nˆ“Z›ˆ‹ÛYÛÛŽˆ•›ZÈ‹Ù[XÝˆ”[ŸNÞJšYÛ˜[YN˜ZÙ[š[™È	Û™]È]J
KÓØØ[Q]TÝš[™Ê››S“Š_HÉÕŠÌ_XØ]YÛÜžNšVÛÙWK›Ý\ÎžYOØY›Y][™Îˆ	ÞY_Xˆˆ‹ÛÛÜ™[˜]\Î™ÙKÙ[ÛY]žN™_JK
ÊßJK[\
	ÓHZÙ[š[™Ê[ŠHÜÙ\ÛYÙ[ˆ˜X\ˆ‰Ô_H˜
K

KJ
_NÚYŠ\Ê\™]\›ˆ[ØÛÛœÝONL
ÊOÍŒ
NÜ™]\›ˆšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹˜]Û‹ÛÛÛXÚÎKÛ\ÜÓ˜[YN˜š^YYLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH	ÝÈ˜™Ë[Ü˜[™ÙKMLŽˆ˜™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎLŸXÝ[NžÝÜ˜	Ò_\KÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ•ZÙ[™[ˆÜHØX\‹Ú[™[ŽššœÞ
ËÜÚ^™NŒŒÛ\ÜÓ˜[YNÈ^]Ú]HŽˆ^[Ü˜[™ÙKML›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JKšœÞ
šKÚ\ÓÜ[Ž]Nˆ•ZÙ[™[ˆ‹XÛÛŽššœÞ
ËÜÚ^™NŒNJKXÙ[Y[ˆ›Y‹[ÝÓX\[\˜XÝ[ÛŽˆLÛÛÜÙNK›ÛÝ\Ž˜ÏŒÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\Lˆ‹Ú[™[Ž–ÚšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎž‹Û\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]Ûˆ›^LH‹Ú[™[Ž–ÚšœÞ
Ó‹ÜÚ^™NŒMJK“ÜÛX[ˆ
‹ËŠH—_JKšœÞ
˜]Ûˆ‹ÛÛÛXÚÎŠ
OOžØÛÛ™š\›J[HZÙ[š[™Ù[ˆ™\ÚZ™\™[ÈŠI‰”

_KÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝËZXÛÛ‹X]Ûˆ^\™YMŒ‹˜\šXK[X™[Žˆ[HZÙ[š[™Ù[ˆ™\ÚZ™\™[ˆ‹Ú[™[ŽššœÞ
šÜÚ^™NŒM_J_JW_JN›ÚYÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆœLÈÜXÙK^KLÈ‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^Ø\LH‹Ú[™[Ž–ÚšœÞ
‹ÚXÛÛŽššœÞ
›™KÜÚ^™NŒMŸJKXÝ]™N›ÏOOHœÙ[XÝ‹ÛÛXÚÎŠ
OO›
œÙ[XÝŠK]Nˆ”Ù[XÝ\™[ˆŸJKšœÞ
‹ÚXÛÛŽššœÞ
ZKÜÚ^™NŒMŸJKXÝ]™N›ÏOOHœÚ[‹ÛÛXÚÎŠ
OO›
œÚ[ŠK]Nˆ”[ŸJKšœÞ
‹ÚXÛÛŽššœÞ
\™KÜÚ^™NŒMŸJKXÝ]™N›ÏOOH›[™H‹ÛÛXÚÎŠ
OO›
›[™HŠK]Nˆ“Z›ˆŸJKšœÞ
‹ÚXÛÛŽššœÞ
\™KÜÚ^™NŒMŸJKXÝ]™N›ÏOOHœÛYÛÛˆ‹ÛÛXÚÎŠ
OO›
œÛYÛÛˆŠK]Nˆ•›ZÈŸJW_JKšœÞ
œ‹ØÛ\ÜÓ˜[YNˆ^^È^YÜ˜^KML‹Ú[™[Ž›ÏOOHœÙ[XÝÈ’ÛZÈÛHHÙ[XÝ\™[‹[]HÛHH™\ÚZ™\™[ˆŽ›ÏOOHœÚ[È’ÛZÈÛHY[ˆ[HX]Ù[ˆŽˆ’ÛZÈÛHHZÙ[™[‹X˜™[ÛZÈÛHH›ÛÛÚY[ˆŸJK‰‰ššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ˜™Ë[Ü˜[™ÙKML›Ý[™Y[ÈLˆ‹Ú[™[Ž–ÚšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^^È^[Ü˜[™ÙKMŒ›Û[YY][H‹Ú[™[Ž›ÏOOHœÛYÛÛˆÈ“Ü\›ZÝHŽˆYœÝ[™ŸJKšœÞ
™]ˆ‹ØÛ\ÜÓ˜[YNˆ^[È›ÛX›Û^[Ü˜[™ÙKMÌ‹Ú[™[Ž™ŸJW_JW_J_JW_J_Y[˜Ý[ÛˆŠÚXÛÛŽ›‹XÝ]™N™KÛÛXÚÎ]NœŸJ^Ü™]\›ˆšœÞ
˜]Ûˆ‹ÛÛÛXÚÎÛ\ÜÓ˜[YN˜ËNHNH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÙOÈ˜™Ë[Ü˜[™ÙKML^]Ú]HŽˆ˜™ËYÜ˜^KLL^YÜ˜^KMŒÝ™\Ž˜™ËYÜ˜^KLŒŸX]Nœ‹Ú[™[Ž›ŸJ_Y[˜Ý[ÛˆUŠŠ^Ü™]\›ˆLYLÏØ	Ê‹ÌYLÊKÑš^Y
Š_HÛX˜	ÓX]œ›Ý[™
Š_HXY[˜Ý[ÛˆŠŠ^Ü™]\›ˆLYMØ	Ê‹ÌYM
KÑš^Y
Š_HX˜	ÓX]œ›Ý[™
Š_Hp¬˜Y[˜Ý[Ûˆž™JŠ^ØÛÛœÝO[‹™Ù]
›YX\Ý\™[Y[ŠK[‹™Ù]
™˜]Õ\HŠK^ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙŽMÌÌMˆ‹ÚYŒßJKš[›™]È›ŠØÛÛÜŽˆœ™Ø˜JKLMKŒ‹ŒŠHŸJK[XYÙN›™]ÈÊÜ˜Y]\Î‹š[›™]È›ŠØÛÛÜŽˆˆÙŽMÌÌMˆŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™™™™ˆ‹ÚYŒŸJ_J_NÜ™]\›ˆ™]È
Ë‹‹œ‹^™OÛ™]È˜JÝ^™K›Ûˆ˜›ÛL\Ø[œË\Ù\šYˆ‹š[›™]È›ŠØÛÛÜŽˆˆØÌLÈŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™™™™ˆ‹ÚYŒßJKÙ™œÙ]NOOHœÛYÛÛˆÌ‹LMKXÙ[Y[OOH›[™HÈ›[™HŽˆœÚ[‹Ý™\™›ÝÎˆLJN›ÚYJ_Y[˜Ý[Ûˆ™J
^Ü™]\›ˆ™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙXMNÈ‹ÚYŒË[™Q\Ú–ÌLL_JKš[›™]È›ŠØÛÛÜŽˆœ™Ø˜JŒÍL‹ŒJHŸJK[XYÙN›™]ÈÊÜ˜Y]\ÎKš[›™]È›ŠØÛÛÜŽˆˆÙXMNÈŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™™™™ˆ‹ÚYŒŸJ_J_J_Y[˜Ý[ÛˆÞ™J
^Ü™]\›ˆ™]È
ÜÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÌMŒÙXˆ‹ÚYJKš[›™]È›ŠØÛÛÜŽˆœ™Ø˜JÍËNKŒÍKŒŠHŸJK[XYÙN›™]ÈÊÜ˜Y]\ÎŽš[›™]È›ŠØÛÛÜŽˆˆÌMŒÙXˆŸJKÝ›ÚÙN›™]ÈÛŠØÛÛÜŽˆˆÙ™™™™™ˆ‹ÚYŒŸJ_J_J_Y[˜Ý[Ûˆž™J‹K
^ØÛÛœÝP\œ˜^K™œ›ÛJ‹œ]Y\žTÙ[XÝÜ[
‹›Û[^Y\ˆØ[˜\ÈŠJK™š[\ŠO›ÚYŒ	‰›šZYÚŒ
NÚYŠ\‹›[™Ý
]›ÝÈ™]È\œ›ÜŠ‘ÙY[ˆØX\™Y[™\ØÚZØ˜X\ˆŠNØÛÛœÝOYØÝ[Y[˜Ü™X]Q[[Y[
˜Ø[˜\ÈŠKÏ]Ú[™ÝË™]šXÙT^[˜][ßKO]OO]›ÚYÌLÚKÚYSX]œ›Ý[™
VÌJœÊKKšZYÚSX]œ›Ý[™

VÌWJØJJœÊNØÛÛœÝÏZK™Ù]ÛÛ^
Œ™ŠNÚYŠ[Ê]›ÝÈ™]È\œ›ÜŠ‘ÙY[ˆZÙ[›Ü\›ZÈ™\ØÚZØ˜X\ˆŠNÛËœØØ[JËÊKË™š[Ý[OHˆÙ™™™™™ˆ‹Ë™š[™XÝ
VÌKVÌWJØJKËœØ]™J
KË˜[œÛ]JJKË˜™YÚ[”]

KËœ™XÝ
VÌKVÌWJKË˜Û\

NÙ›ÜŠÛÛœÝÙˆŠ^ÛËœØ]™J
NØÛÛœÝÏ[œ\™[[[Y[ËœÝ[K›ÜXÚ]_œÝ[K›ÜXÚ]NÛË™ÛØ˜[[OXÏOOHˆŸÏOO]›ÚYÌN“[X™\ŠÊNØÛÛœÝO[œÝ[K˜[œÙ›Ü›NÚYŠJ^ØÛÛœÝ[™]ÈÓSX]š^
JNÛË˜[œÙ›Ü›J˜K˜‹˜Ë™™K™Š_Y[ÙHËœØØ[J\œÙQ›Ø]
œÝ[KÚYÝš[™ÊVÌJJKÛÚY\œÙQ›Ø]
œÝ[KšZYÚÝš[™ÊVÌWJJKÛšZYÚ
NØÛÛœÝ[œ\™[[[Y[ËœÝ[K˜˜XÚÙÜ›Ý[™ÛÛÜŽÙ‰‰ŠË™š[Ý[OY‹Ë™š[™XÝ
ÚYšZYÚ
JKË™˜]Ò[XYÙJ
KËœ™\ÝÜ™J
_\™]\›ˆËœ™\ÝÜ™J
KOO]›ÚY	‰ŠË™š[Ý[OHˆÌYŒŽLÍÈ‹Ë™›ÛH˜›ÛÞ\Ý[K]ZH‹Ë^[YÛH˜Ù[\ˆ‹Ë™š[^
VÌKÌ‹ÍJJKË™š[Ý[OHˆÍ˜ÌŽ‹Ë™›ÛHŒLœÞ\Ý[K]ZH‹Ë^[YÛH›Y‹Ë™š[^
‘]XÝ‹LVÌWJØKLL
KË^[YÛHœšYÚ‹Ë™š[^
™]È]J
KÓØØ[TÝš[™Ê››S“ŠKVÌKLLVÌWJØKLL
K_Y[˜Ý[ÛˆÞ™J
^ØÛÛœÝU\ŠOO‘K›X\
KO^[ŠOO‘KœÚÝÔš[ÛÛ
K^[ŠOO‘KœÚÝÓYX\Ý\™UÛÛ
K^[ŠOO‘KœÚÝÑ˜]ÕÛÛ
KO[]
OO‘K˜XÝ]™UÚ[™ÝÏOOHœš[ŠKÏ[]
OO‘KÙÙÛUÚ[™ÝÊKO[]
OO‘K˜ÛÜÙUÚ[™ÝÊKÛËOP‹\ÙTÝ]JLJKØËWOP‹\ÙTÝ]Jœ™ÈŠKÙ‹OP‹\ÙTÝ]JL
KÛKWOP‹\ÙTÝ]J’ØX\^ÜŠKX\Þ[˜Ê
OOžÚYŠŠ^Û
L
NÝž^Û‹œ™[™\”Þ[˜Ê
NØÛÛœÝO[‹™Ù]Ú^™J
NÚYŠQJ]›ÝÈ™]È\œ›ÜŠ’ØX\Ü›ÛÝHÛœ™YZÝŠNØÛÛœÝÏ^ž™J‹™Ù]šY]ÜÜ

KKÛN›ÚY
KÏXØX\IÛ™]È]J
KÒTÓÔÝš[™Ê
KœÜ]
•ŠVÌ_XÚYŠÏOOHœˆŠ^ØÛÛœÝO]Ú[™ÝË›Ü[Šˆ‹—Ø›[šÈŠNÚYŠPJ]›ÝÈ™]È\œ›ÜŠ”š[™[œÝ\ˆÙX›ÚÚÙY\™ŠNÚYŠJ^ØÛÛœÝTËÑ]UT“
š[XYÙKÜ™ÈŠNÐK™ØÝ[Y[Üš]JˆQÐÕTH[‚ˆ[‚ˆXY‚ˆ]O‘]XÝØX\Ý]O‚ˆÝ[O‚ˆYYXHš[Âˆ›ÙHÈX\™Ú[ŽˆÈY[™ÎˆÈBˆ[YÈÈX^]ÚYˆL	NÈZYÚˆ]]ÎÈBˆBˆ›ÙHÂˆ\Ü^Nˆ›^Âˆ\ÝYžKXÛÛ[ˆÙ[\ŽÂˆ[YÛ‹Z][\ÎˆÙ[\ŽÂˆZ[‹ZZYÚˆLšÂˆX\™Ú[ŽˆÂˆ˜XÚÙÜ›Ý[™ˆÚ]NÂˆBˆ[YÈÈX^]ÚYˆL	NÈX^ZZYÚˆLšÈBˆÜÝ[O‚ˆÚXY‚ˆ›ÙO‚ˆ[YÈÜ˜ÏH‰ÔHˆÏ‚ˆØÜš\‚ˆÙ][Y[Ý]


HOˆÂˆÚ[™ÝËœš[

NÂˆKL
NÂˆÜØÜš\‚ˆØ›ÙO‚ˆÚ[‚ˆ
KK™ØÝ[Y[˜ÛÜÙJ
__Y[Ù^ØÛÛœÝOXÏOOHšœYÈÈš[XYÙKÚœYÈŽˆš[XYÙKÜ™È‹XÏOOHšœYÈËŽLŽ›ÚYÔËÐ›ØŠOžÚYŠŠ^ØÛÛœÝOUT“˜Ü™X]SØš™XÝT“
ŠKYØÝ[Y[˜Ü™X]Q[[Y[
˜HŠNÕš™YRK™ÝÛ›ØYX	ÚßK‰ØßXØÝ[Y[˜›ÙK˜\[™Ú[

K˜ÛXÚÊ
KØÝ[Y[˜›ÙKœ™[[Ý™PÚ[

KT“œ™]›ÚÙSØš™XÝT“
J__KK
_XJ
_XØ]Ú
J^ØÛÛœÛÛK™\œ›ÜŠ‘^Ü˜Z[Yˆ‹JK[\
’ÛÛˆHØX\šY]^Ü\™[‹ˆ›Ø™Y\ˆ]ÜšY]]ËˆŠ_Yš[˜[^Û
LJ___NÚYŠYJ\™]\›ˆ[Û]ÏNLÜ™]\›ˆ	‰ŠÊÏM
K‰‰ŠÊÏM
KšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
›‹˜]Û‹ÛÛÛXÚÎŠ
OOœÊœš[ŠKÛ\ÜÓ˜[YNˆ™š^YYLˆ‹VÎHËLLHLLH›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ™Ë]Ú]KÎÝ™\Ž˜™Ë]Ú]KÎL›Ý[™Y^ÚYÝË\ÛH›Ü™\‹LÝ][™K[›Û™H˜[œÚ][Û‹XÛÛÜœÈ˜XÚÙ›ÜX›\‹\ÛH‹Ý[NžÝÜ˜	×ß\KÚ[RÝ™\ŽžÜØØ[NŒKŒ_KÚ[U\žÜØØ[N‹ŽM_K]Nˆ’ØX\š[[‹Ù^Ü\™[ˆ‹Ú[™[ŽššœÞ
KÜÚ^™NŒŒÛ\ÜÓ˜[YNˆ^Z[™YÛËML›Ü\ÚYÝËVÌ\Ì\Ì\Ü™Ø˜JŒMJWHŸJ_JKšœÞ
šKÚ\ÓÜ[ŽšK]Nˆ’ØX\^Ü\™[ˆ‹XÛÛŽššœÞ
KÜÚ^™NŒNJKXÙ[Y[ˆ›[Ù[‹ÛÛÜÙN˜K›ÛÝ\ŽššœÞ
˜]Ûˆ‹ÛÛÛXÚÎž\ØX›Y›ËÛ\ÜÓ˜[YNˆ™]XÝ]Ú[™ÝË\š[X\žKX]ÛˆËY[\ØX›Y›ÜXÚ]KML‹Ú[™[Ž›ÏÚšœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
LÜÚ^™NŒNÛ\ÜÓ˜[YNˆ˜[š[X]K\Ü[ˆŸJKšœÞ
œÜ[ˆ‹ØÚ[™[Žˆ‘^Ü\™[‹‹‹ˆŸJW_JNššœÞÊ‘œ˜YÛY[ØÚ[™[Ž–ÚšœÞ
•‹ÜÚ^™NŒNJKšœÞ
œÜ[ˆ‹ØÚ[™[Ž˜ÏOOHœˆÈ”š[[ˆŽˆ‘ÝÛ›ØY[ˆŸJW_J_JKÚ[™[ŽššœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™›^LHÝ™\™›ÝË^KX]]ÈMÜXÙK^KM‹Ú[™[Ž–ÚšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞÊ›X™[‹ØÛ\ÜÓ˜[YNˆ™›^][\ËXÙ[\ˆØ\Lˆ^\ÛH^YÜ˜^KMÌX‹Lˆ‹Ú[™[Ž–ÚšœÞ
š[œ]‹Ý\Nˆ˜ÚXÚØ›Þ‹ÚXÚÙY™‹ÛÚ[™ÙN‘OOœ
K\™Ù]˜ÚXÚÙY
KÛ\ÜÓ˜[YNˆœ›Ý[™Y›Ü™\‹YÜ˜^KLÌŸJK•][Ù]›ÙYÙ[ˆ—_JK‰‰ššœÞ
š[œ]‹Ý\Nˆ^‹˜[YN›KÛÚ[™ÙN‘OOžJK\™Ù]˜[YJKÛ\ÜÓ˜[YNˆËY[LÈKLˆ™ËYÜ˜^KLL›Ý[™Y[È›Ü™\‹LÝ][™K[›Û™H›ØÝ\Îœš[™ËLˆ›ØÝ\Îœš[™ËYÜ™Y[‹ML^\ÛH‹XÙZÛ\Žˆ•][‹‹ˆŸJW_JKšœÞÊ™]ˆ‹ØÚ[™[Ž–ÚšœÞ
›X™[‹ØÛ\ÜÓ˜[YNˆ˜›ØÚÈ^\ÛH›Û[YY][H^YÜ˜^KMÌX‹Lˆ‹Ú[™[Žˆ‘›Ü›XX]ŸJKšœÞÊ™]ˆ‹ØÛ\ÜÓ˜[YNˆ™ÜšYÜšYXÛÛËLÈØ\Lˆ‹Ú[™[Ž–ÚšœÞ
’KÜÙ[XÝY˜ÏOOHœ™È‹ÛÛXÚÎŠ
OOJœ™ÈŠKXÛÛŽššœÞ
ÜÚ^™NŒMŸJKX™[ˆ”‘ÈŸJKšœÞ
’KÜÙ[XÝY˜ÏOOHšœYÈ‹ÛÛXÚÎŠ
OOJšœYÈŠKXÛÛŽššœÞ
ÜÚ^™NŒMŸJKX™[ˆ’”QÈŸJKšœÞ
’KÜÙ[XÝY˜ÏOOHœˆ‹ÛÛXÚÎŠ
OOJœˆŠKXÛÛŽššœÞ
KÜÚ^™NŒMŸJKX™[ˆ”š[ŸJW_JW_JW_J_JW_J_Y[˜Ý[Ûˆ’JÜÙ[XÝY›‹ÛÛXÚÎ™KXÛÛŽX™[œŸJ^Ü™]\›ˆšœÞÊ˜]Ûˆ‹ÛÛÛXÚÎ™KÛ\ÜÓ˜[YN˜›^›^XÛÛ][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆØ\LHLÈ›Ý[™Y[È˜[œÚ][Û‹XÛÛÜœÈ›Ü™\‹LÝ][™K[›Û™H	ÛÈ˜™ËYÜ™Y[‹ML^]Ú]HŽˆ˜™ËYÜ˜^KLL^YÜ˜^KMŒÝ™\Ž˜™ËYÜ˜^KLŒŸXÚ[™[Ž–ÝšœÞ
œÜ[ˆ‹ØÛ\ÜÓ˜[YNˆ^^È›Û[YY][H‹Ú[™[ŽœŸJW_J_XÛ\ÜÈ•žØY™™\V×NÜÚ^™NÝÙZYÚÎØÛÛœÝXÝÜŠON
^Ý\ËœÚ^™OYK\ËÙZYÚÏP\œ˜^K™œ›ÛJÛ[™Ý™_K
‹JOO“X]œÝÊ‹JJNØÛÛœÝ]\ËÙZYÚËœ™YXÙJ
‹JOOœŠÚK
NÝ\ËÙZYÚÏ]\ËÙZYÚË›X\
Oœ‹Ý
_XY
J^ÚYŠ\Ë˜Y™™\‹›[™ÝŒ
^ØÛÛœÝ]\Ë˜Y™™\–Ý\Ë˜Y™™\‹›[™ÝLWNÛ]YK]ÜŒN	‰ŠKOLÍŒ
KLN	‰ŠJÏLÍŒ
_]\Ë˜Y™™\‹œ\Ú
JK\Ë˜Y™™\‹›[™Ý\ËœÚ^™I‰\Ë˜Y™™\‹œÚY

_YÙ]Û[ÛÝY

^ÚYŠ\Ë˜Y™™\‹›[™ÝOOL
\™]\›ˆ[ÚYŠ\Ë˜Y™™\‹›[™ÝOOLJ\™]\›ˆ\Ë››Ü›X[^™J\Ë˜Y™™\–ÌJNÛ]OLLØÛÛœÝ]\ËœÚ^™K]\Ë˜Y™™\‹›[™ÝÙ›ÜŠ]OLÚO\Ë˜Y™™\‹›[™ÝÚJÊÊ^ØÛÛœÝÏ]\ËÙZYÚÖÜŠÚWNÙJÏ]\Ë˜Y™™\–ÚWJœË
Ï\ß\™]\›ˆ\Ë››Ü›X[^™JKÝ
_[›Ü›X[^™JJ^Ü™]\›ŠILÍŒ
ÌÍŒ
ILÍŒXÛX\Š
^Ý\Ë˜Y™™\V×__Y[˜Ý[Ûˆž™J
^ØÛÛœÝRJÏO˜Ë˜XÚÚ[™ÊKORJÏO˜ËšXY[™ÔÛÝ\˜ÙJKRJÏO˜Ëœ˜]ÑÔÒXY[™ÊKRJÏO˜ËœÙ]Û[ÛÝYXY[™ÊKOP‹\ÙT™YŠ™]È•ŠŠJKÏP‹\ÙT™YŠ™]È•ŠL
JKOP‹\ÙT™YŠ
KÏP‹\ÙT™YŠ[
KLÌÎÐ‹\ÙQY™™XÝ


OOžÚYŠ[ŸHOOH™ÜÈŸOO[[OO[Ë˜Ý\œ™[
\™]\›ŽÛË˜Ý\œ™[]ØÛÛœÝÏ\\™›Ü›X[˜ÙK››ÝÊ
NÚYŠËXK˜Ý\œ™[
\™]\›ŽÚK˜Ý\œ™[˜Y

NØÛÛœÝOZK˜Ý\œ™[™Ù]Û[ÛÝY

NÝHOO[[	‰ŠK˜Ý\œ™[XËŠJJ_KÛ‹K—JK‹\ÙQY™™XÝ


OOžÚYŠ[ŸHOOH˜ÛÛ\\ÜÈŠ\™]\›ŽÛ]ÏLØÛÛœÝON\OžØÛÛœÝO\\™›Ü›X[˜ÙK››ÝÊ
NÚYŠKXÏ_KXK˜Ý\œ™[
\™]\›ŽØÏ[NÛ]O[[ÚYŠÙXšÚ]ÛÛ\\ÜÒXY[™ÈOO]›ÚYÞO\ÙXšÚ]ÛÛ\\ÜÒXY[™Îœ˜[HOO[[	‰ŠOJÍŒ\˜[JILÍŒ
KHOO[[
^ÜË˜Ý\œ™[˜Y
JNØÛÛœÝ\Ë˜Ý\œ™[™Ù]Û[ÛÝY

NÞOO[[	‰ŠK˜Ý\œ™[[KŠ
J__NÜ™]\›ˆÚ[™ÝË˜Y]™[\Ý[™\Š™]šXÙ[ÜšY[][Û˜XœÛÛ]H‹ŠKÚ[™ÝË˜Y]™[\Ý[™\Š™]šXÙ[ÜšY[][Ûˆ‹ŠK

OOžÝÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š™]šXÙ[ÜšY[][Û˜XœÛÛ]H‹ŠKÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š™]šXÙ[ÜšY[][Ûˆ‹Š__KÛ‹K—JK‹\ÙQY™™XÝ


OOžÛŸ
K˜Ý\œ™[˜ÛX\Š
KË˜Ý\œ™[˜ÛX\Š
KË˜Ý\œ™[[[
_KÛ—J_[]œ[[Ù[˜Ý[Ûˆ•Š‹J^ÚYŠYJ
_[˜]šYØ]Ü‹›Û“[™J\™]\›ˆ›ÛZ\ÙKœ™\ÛÛ™J
NÚYŠœËZYOO[‹ZY	‰’œ˜[Y

J\™]\›ˆœœ›ÛZ\ÙNØÛÛœÝX\Þ[˜Ê
OOžÙ›ÜŠÙJ
I‰›˜]šYØ]Ü‹›Û“[™NÊ^ØÛÛœÝO[K™Ù]Ý]J
Kš][\Ë™š[\ŠO›ZYOO[‹ZY
KÏ[™]ÈÙ]
K™š[\ŠO›œÝ]\ÏOOH™˜Z[YŠK›X\
MÊJKO[™]ÈÙ]
K™š[\ŠO›œÝ]\ÏOOH™˜Z[Y‰‰››]]][Û‹šÚ[™OOH™[]S^Y\ˆŠK›X\
O›˜YS^Y\’Y
JKÏZK™š[™
O›œÝ]\ÏOOHœ[™[™È‰‰ˆ\Ëš\ÊMÊ
JI‰ˆXKš\Ê˜YS^Y\’Y
JNÚYŠ[ÊXœ™XZÎÛKœÙ]Ý]JÜÙ[™[™Î›ËšYJNÝž^ÚYŠ]ØZ]“™JËJKYJ
J\™]\›ŽÚYŠ\YJËšY
JXœ™XZßXØ]Ú

^ÚYŠYJ
J\™]\›ŽØÛÛœÝÏ[Ë˜ÛÙOËœ™\XÙJ™š\™\ÝÜ™KÈ‹ˆŠKOH[˜]šYØ]Ü‹›Û“[™_È[˜]˜Z[X›H‹™XY[™KY^ÙYYY‹˜X›ÜY—Kš[˜ÛY\ÊßˆŠKXÏOOHœ\›Z\ÜÚ[Û‹Y[šYYÈ’™HXÙY[ˆ™]Ù\šÜ™XÚ[ˆYY\‹ˆ™HÚØ[HÚZžšYÚ[™Ù[ˆ›Z™[ˆ™]ØX\™ˆŽ›[œÝ[˜Ù[Ùˆ\œ›ÜÛ›Y\ÜØYÙNˆ“ÜÛX[ˆZ\ÛZÝˆ™HÚØ[HÚZžšYÚ[™Ù[ˆ›Z™[ˆ™]ØX\™ˆŽÚYŠ[YJËšY‹JKJXœ™XZßYš[˜[^ÙJ
I‰›KœÙ]Ý]JÜÙ[™[™Î›[J___K^ÝZY›‹ZY˜[Y™K›ÛZ\ÙN”›ÛZ\ÙKœ™\ÛÛ™J
_NÜ™]\›ˆ‹œ›ÛZ\ÙO]

K™š[˜[J

OOžÒœOO\‰‰Šœ[[
_JKœ\‹‹œ›ÛZ\Ù_Y[˜Ý[Ûˆž™J
^ØÛÛœÝQ˜JOœ‹\Ù\ŠKO[JOœ‹š][\ÊKUJOœ‹œ™]š\Ú[ÛŠNÐ‹\ÙQY™™XÝ


OOžØÛÛœÝZOOžÚKšÙ^OËš[˜ÛY\Ê™]XÝÜ˜\XYK]Üš]\ÎˆŠI‰›Kœ\œÚ\Ýœ™ZY˜]J
K˜Ø]Ú


OO›KœÙ]Ý]JÜÝÜ˜YÙQ\œ›ÜŽˆ‘HÚØ[HØXÚšZˆÛÛˆšY]ÛÜ™[ˆÙ[Y[‹ˆŸJJ_NÜ™]\›ˆÚ[™ÝË˜Y]™[\Ý[™\ŠœÝÜ˜YÙH‹ŠK

OOÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\ŠœÝÜ˜YÙH‹Š_K×JK‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝU
‹ZY
KOJ
OOœŠ
I‰‘˜K™Ù]Ý]J
K\Ù\ËZYOO[‹ZYÏ]Ú[™ÝËœÙ][Y[Ý]


OOžÚJ
I‰‘•Š‹J_KŒ
NÜ™]\›Š
OOÚ[™ÝË˜ÛX\•[Y[Ý]
Ê_KÛ‹KJK‹\ÙQY™™XÝ


OOžÚYŠ[Š\™]\›ŽØÛÛœÝU
‹ZY
KOJ
OOžØÛÛœÝÏJ
OOœŠ
I‰‘˜K™Ù]Ý]J
K\Ù\ËZYOO[‹ZYÛÊ
I‰›˜]šYØ]Ü‹›Û“[™I‰ŠR
L
K•Š‹ÊJ_KÏJ
OOžÙØÝ[Y[š\ÚXš[]TÝ]OOOHš\ÚX›H‰‰šJ
_KOYKœÛÛYJÏO›ËZYOO[‹ZY	‰›ËœÝ]\ÏOOH™˜Z[Y‰‰›Ëœ™]žXX›JOÝÚ[™ÝËœÙ][Y[Ý]
KÙM
N›ÚYÜ™]\›ˆÚ[™ÝË˜Y]™[\Ý[™\Š›Û›[™H‹JKØÝ[Y[˜Y]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹ÊK

OOžÝÚ[™ÝË˜ÛX\•[Y[Ý]
JKÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š›Û›[™H‹JKØÝ[Y[œ™[[Ý™Q]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹Ê__KÛ‹WJ_Y[˜Ý[Ûˆ^™J
^ØÛÛœÝQ˜JO\Ù\ŠKOUJOœ™]š\Ú[ÛŠNÐ‹\ÙQY™™XÝ


OOžØÛÛœÝJ
OO•K™Ù]Ý]J
Kœ™Yœ™\Ú

KJ
OOžÙØÝ[Y[š\ÚXš[]TÝ]OOOHš\ÚX›H‰‰

_NÜ™]\›ˆÚ[™ÝË˜Y]™[\Ý[™\Š™]XÝXYK\™Yœ™\Ú‹
KÚ[™ÝË˜Y]™[\Ý[™\Š›Û›[™H‹
KÚ[™ÝË˜Y]™[\Ý[™\ŠœYÙ\ÚÝÈ‹
KØÝ[Y[˜Y]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹ŠK

OOžÝÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š™]XÝXYK\™Yœ™\Ú‹
KÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\Š›Û›[™H‹
KÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\ŠœYÙ\ÚÝÈ‹
KØÝ[Y[œ™[[Ý™Q]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹Š__K×JK‹\ÙQY™™XÝ


OOžÛ]HLØÛÛœÝJ
OO	‰‘˜K™Ù]Ý]J
K\Ù\ËZYOO[ËZYÕKœÙ]Ý]JÙ\œ›ÜŽ›[JNØÛÛœÝO]OOžÜŠ
I‰ŠÛÛœÛÛK™\œ›ÜŠYK[YÙ[ˆY[ˆZ\ÛZÝˆ‹JKKœÙ]Ý]JÙ\œ›ÜŽˆYK[YÙ[ˆÛÛ™[ˆšY]ÛÜ™[ˆÙ[Y[‹ˆ›Ø™Y\ˆÜšY]]ËˆŸJJ_NÚYŠ[Ë™[XZ[
^Ý‹œÙ]Ý]JOOŠÛ^Y\œÎK›^Y\œË™š[\ŠOˆY‹˜YS^Y\’Y
_JJNÜ™]\›ŸXÛÛœÝÏ[K™Ù]Ý]J
Kš][\Ë™š[\ŠOOKZYOO[‹ZY
NÝ‹œÙ]Ý]JOOžØÛÛœÝVË‹‹K›^Y\œ×NÙ›ÜŠÛÛœÝÙˆ™]ÈÙ]
Ë›X\
OO›K˜YS^Y\’Y
JJ^ØÛÛœÝO\Ë™š[\ŠOOžK˜YS^Y\’YOO\
NÛKœÛÛYJOOžK›]]][Û‹šÚ[™OOH™[]S^Y\ˆŠ_‹œÛÛYJOOžK˜YS^Y\’YOO\
_‹œ\Ú
ÍÊË‹‹›VÌK›^Y\‹Ú[Î˜”
×KJ_KJJ_\™]\›žÛ^Y\œÎ™Ÿ_JNØÛÛœÝOYJ‹™[XZ[
KÏ[™]ÈX\VÊZ
K˜YS^Y\œÈŠKšÊ›Y[X™\‘[XZ[È‹˜\œ˜^KXÛÛZ[œÈ‹JJKÏZÎ
Ú[˜ÛYSY]Y]PÚ[™Ù\ÎˆLKOOžÚYŠ\Š
J\™]\›ŽÕKœÙ]Ý]JÙ\œ›ÜŽ›[JNØÛÛœÝ[™]ÈÙ]
K™ØÜË™š[\ŠOˆ\™]J
K™[]Y	‰ˆ[K™Ù]Ý]J
K™[]YYRYËš[˜ÛY\ÊšY
I‰ˆ[K™Ù]Ý]J
Kš][\ËœÛÛYJOO›KZYOO[‹ZY	‰›K˜YS^Y\’YOO\šY	‰›K›]]][Û‹šÚ[™OOH™[]S^Y\ˆŠJK›X\
OœšY
JNÛË™›Ü‘XXÚ

JOOžÙ‹š\ÊJ_


KË™[]JJJ_JKK›Y]Y]K™œ›ÛPØXÚ_‹œÙ]Ý]JOŠÛ^Y\œÎœ›^Y\œË™š[\ŠOOˆ[K˜YS^Y\’Y‹š\ÊK˜YS^Y\’Y
J_JJKK™ØÜË™›Ü‘XXÚ
OžØÛÛœÝO\™]J
NÚYŠKœ™XYOOOHL_Kš[š]X[^š[™É‰›Kœ™XYHOOHLY‹š\ÊšY
J\™]\›ŽØÛÛœÝO\šYÚYŠ‹œÙ]Ý]JÏOŠÛ^Y\œÎ—ÒŠË›^Y\œËË‹‹›KYž_K‹ZYJK›X\
OO‘K˜YS^Y\’YOO^OØÍÊKK™Ù]Ý]J
Kš][\Ë™š[\ŠÏO”ËZYOO[‹ZY	‰”Ë˜YS^Y\’YOO^JJN‘JK[]Y^Y\’YÎ›K›ÝÛ™\•ZYOO[‹ZY	‰›KœÛÝ\˜ÙS^Y\’YÖË‹‹›™]ÈÙ]
Ë‹‹—Ë™[]Y^Y\’Yß×KKœÛÝ\˜ÙS^Y\’YJWN—Ë™[]Y^Y\’YßJJKËš\ÊJJ\™]\›ŽØÛÛœÝZÎ
Z
K˜YS^Y\œÈ‹KœÚ[ÈŠKÏOžÚYŠ\Š
J\™]\›ŽØÛÛœÝOWË™ØÜË™š[\ŠÏOˆTË™]J
K™[]Y
K›X\
ÏOžØÛÛœÝÝÜš]PÝ\œÛÜœÎšË\]Y]K[]Y”‹‹žŸOTË™]J
NÜ™]\›žË‹‹ž‹Y”ËšY_JNÝ‹œÙ]Ý]JÏOŠÛ^Y\œÎ”Ë›^Y\œË›X\
ÏOšË˜YS^Y\’YOO^OÞË‹‹šËÚ[Î˜”
KK™Ù]Ý]J
Kš][\Ë™š[\ŠOOKZYOO[‹ZY	‰K˜YS^Y\’YOO^JJ_NšÊ_JJ_KJNÛËœÙ]
K
_J_KJNÜ™]\›Š
OOžÝHLKÊ
KË™›Ü‘XXÚ
OOJ
J__KÛ‹WJ_Y[˜Ý[Ûˆ	™J
^ØÛÛœÝQ˜JÏO—Ëœ™XYJKO[]
ÏO—Ë˜XÝ]™UÚ[™ÝÊK[]
ÏO—Ë›Ü[•Ú[™ÝÊK[]
ÏO—Ë˜ÛÜÙUÚ[™ÝÊKO^[ŠÏO—ËšYUÙ[ÛÛYS[Ù[
KÏYOOOHÙ[ÛÛYH‹OYOOOH›X[X[‹ÏP‹\ÙT™YŠLJKP‹\ÙT™YŠLJKØËWOP‹\ÙTÝ]JLJK[]
ÏO—Ë˜XÝ]™UÚ[™ÝÏOOH˜Ú[™ÙSÙÈŠK[]
ÏO—Ë›Ü[Ú[™ÙSÙÊKO[]
ÏO—Ë˜ÛÜÙPÚ[™ÙSÙÊNÜ™]\›ˆ‹\ÙQY™™XÝ


OOžÈ[ŸË˜Ý\œ™[
Ë˜Ý\œ™[HLOÝJL
N
Ù[ÛÛYHŠJ_KÛ‹KJK‹\ÙQY™™XÝ


OOžÛ‰‰˜É‰™OOO[[	‰ˆ[˜Ý\œ™[	‰Þ™J]JI‰Š˜Ý\œ™[HLÙYJ]JK

J_KÛ‹KËJKÝÙ[ÛÛYS[Ù[Ü[ŽœËX[X[Ü[Ž˜KÚ[™ÙSÙÓÜ[Ž™‹ÛÜÙPÚ[™ÙSÙÎ›K[™UÙ[ÛÛYPÛÜÙNŠ
OOžÜŠ
KJL
_K[™SÜ[“X[X[Š
OOžÝJL
K
›X[X[Š___Y[˜Ý[ÛˆÞ™J
^ØÛÛœÝQ˜JO“\Ù\ËZY
NÕž™J
K^™J
Kž™J
NØÛÛœÝO\ZJO“›^Y\œÊNÐ‹\ÙQY™™XÝ


OOžÓ›YJ
_KÙWJNØÛÛœÝRJO“™™]Ú\ÜÚ]™TÜÚ][ÛŠNÐ‹\ÙQY™™XÝ


OOžØÛÛœÝJ
OO

KJ
OOžÙØÝ[Y[š\ÚXš[]TÝ]OOOHš\ÚX›H‰‰“

_NÜ™]\›ˆ

KÚ[™ÝË˜Y]™[\Ý[™\ŠœYÙ\ÚÝÈ‹
KØÝ[Y[˜Y]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹
K

OOžÝÚ[™ÝËœ™[[Ý™Q]™[\Ý[™\ŠœYÙ\ÚÝÈ‹
KØÝ[Y[œ™[[Ý™Q]™[\Ý[™\Šš\ÚXš[]XÚ[™ÙH‹
__KÝJNØÛÛœÝ^[ŠO“™›ÛØØ[JKO^[ŠO“ZU[YJKÏ^[ŠO“˜ÛÛÜ”ØÚ[YJKØK×OP‹\ÙTÝ]J

OO\[ÙˆÚ[™ÝÏH‰‰Ú[™ÝË›X]ÚYYXJŠ™Y™\œËXÛÛÜ‹\ØÚ[YNˆ\šÊHŠK›X]Ú\ÊK\ÏOOHœÞ\Ý[HØOÈ™\šÈŽˆ›YÚŽœÎÐ‹\ÙQY™™XÝ


OOžØÛÛœÝ]Ú[™ÝË›X]ÚYYXJŠ™Y™\œËXÛÛÜ‹\ØÚ[YNˆ\šÊHŠKUO›Ê‹›X]Ú\ÊNÜ™]\›ˆÊ›X]Ú\ÊK˜Y]™[\Ý[™\ËŠ˜Ú[™ÙH‹
K

OO“œ™[[Ý™Q]™[\Ý[™\ËŠ˜Ú[™ÙH‹
_K×JK‹\ÙQY™™XÝ


OOžÙØÝ[Y[™ØÝ[Y[[[Y[™]\Ù]™]XÝÛÛÜ”ØÚ[YO[ØÝ[Y[™ØÝ[Y[[[Y[œÝ[K˜ÛÛÜ”ØÚ[YO[Û]YØÝ[Y[œ]Y\žTÙ[XÝÜŠ	ÛY]VÛ˜[YOH[YKXÛÛÜˆ—IÊNÓ
YØÝ[Y[˜Ü™X]Q[[Y[
›Y]HŠK›˜[YOH[YKXÛÛÜˆ‹ØÝ[Y[šXY˜\[™Ú[

JK˜ÛÛ[[OOH™\šÈÈˆÌLLNÈŽˆˆÙ™™™™™ˆŸKÛJNØÛÛœÝÏLM
œ‹ÌLO[]
O“˜XÝ]™UÚ[™ÝÏOOH›Û™Ý›Ü›HŠK[]
O“›Û™Ý›Ü›SØØ][ÛŠK[]
O“˜ÛÜÙU›Û™Ý›Ü›JKO[]
O“˜XÝ]™UÚ[™ÝÏOOHœ›Ý]Q\Ú›Ø\™ŠKO[]
O“ÙÙÛT›Ý]Q\Ú›Ø\™
K[]
O“˜XÝ]™UÚ[™ÝÏOOH›[Û[Y[ÙX\˜ÚŠKÏ[]
O“˜ÛÜÙS[Û[Y[ÙX\˜Ú
KOV”
O“œÚÝÐZY[œ˜Y\ŠKÏV”
O“œÙ]ÚÝÐZY[œ˜Y\ŠKÏ[]
O“˜ÛÜÙUÚ[™ÝÊKÝÙ[ÛÛYS[Ù[Ü[ŽKX[X[Ü[Ž”Ú[™ÙSÙÓÜ[Žž‹ÛÜÙPÚ[™ÙSÙÎ’K[™UÙ[ÛÛYPÛÜÙN•[™SÜ[“X[X[”ŸOI™J
NÜ™]\›ˆšœÞÊ™]ˆ‹È™]KY]XÝ][YHŽšK™]KY]XÝXÛÛÜ‹\ØÚ[YHŽ›Ý[NžÙ›ÛÚ^™N˜	Øß\KÚ[™[Ž–ÚšœÞ
Þ™KßJKšœÞ
Ó™KßJKšœÞ
Ó™KßJKšœÞ
^™KßJKšœÞ
™KßJKšœÞ
^™KßJKšœÞ
ŽKßJKšœÞ
ÎKßJKšœÞ
ŽKßJKšœÞ
NKßJKšœÞ
™KßKŸœÚYÛ™Y[Ý]ŠKšœÞ
M™KßJKšœÞ
™KßJKšœÞ
“™KßJKšœÞ
ŽKßJKšœÞ
KßJKšœÞ
Í™KßJKšœÞ
Ó™KßJKšœÞ
SYKßJKšœÞ
Í™KßJKšœÞ
ÎKßJKšœÞ
™KßJKšœÞ
ž™KßJKšœÞ
ž™KßJKšœÞ
Þ™KßJKšœÞ
NKßJKšœÞ
™KßJKšœÞ
ž™KßJKšœÞ
ÕKßKŸœÚYÛ™Y[Ý]ŠKšœÞ
ž™KÚ\Õš\ÚX›N‘KÛÛÜÙNŠ
OO”ÊLJ_JKšœÞ
NKßJKšœÞ
Þ™KßJKšœÞ
™KßJKšœÞ
NKÚ\ÓÜ[Ž›KÛÛÜÙNž_JKšœÞ
ËØÚ[™[ŽI‰ššœÞ
YYKÛÛÛÜÙNœ[š]X[ØØ][ÛŽ™Ÿ›ÚYJ_JKšœÞ
Þ™KÚ\ÓÜ[ŽžÛÛÜÙN—ßJKšœÞ
^™KßJKšœÞ
^™KÚ\ÓÜ[ŽKÛÛÜÙN•Û“Ü[“X[X[”ŸJKšœÞ
Þ™KÚ\ÓÜ[Ž”ÛÛÜÙNšßJKšœÞ
Þ™KÚ\ÓÜ[Žž‹ÛÛÜÙN’_JW_J_XÛÛœÛÛK›ÙÊ	Xü'æ ]XÝÜ\‰Ö]_X˜˜XÚÙÜ›Ý[™ˆÍÐQLÈÛÛÜŽˆÚ]NÈY[™ÎˆÈ›Ü™\‹\˜Y]\ÎˆÈ›Û]ÙZYÚˆ›ÛÈŠNÛ˜]šYØ]Ü‹œÝÜ˜YÙOËœ\œÚ\Ý	‰›˜]šYØ]Ü‹œÝÜ˜YÙKœ\œÚ\Ý

K˜Ø]Ú


OOžßJNÙJ
NÛJ
NÓK˜Ü™X]T›ÛÝ
ØÝ[Y[™Ù][[Y[žRY
œ›ÛÝŠJKœ™[™\ŠšœÞ
Þ™KßJJNÙ^ÜÓ˜H\ÈK\ˆ\È‹Œ\ÈË›ˆ\È‹Û\ÈËÐÙH\ÈÙH\ÈK—È\Èœˆ\È\ÈËH\ÈÚH\È‹Ûˆ\ÈKÚH\È‹Î\ÈËŽ\ÈÎ\ÈK^™H\È‹Û\ÈËÜˆ\È\ÈK^\È‹Õ\ÈË™H\ÈØH\ÈKÚ\È‹H\ÈËM™H\ÈH\ÈKH\È‹œÙH\ÈËÌ\È”H\ÈKMH\È‹Üˆ\ÈËÌÈ\ÈTH\ÈKž™H\ÈŸNÂ‹ËÈÈÛÝ\˜ÙSX\[™ÕT“Z[™^Q[ÍœPššœË›X\