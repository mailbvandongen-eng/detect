import{M as i,dV as l}from"./index-DbkovvcO.js";function s(e){const t="metric";if(e==null)return t;const r=e.map,n=(r&&"portalItem"in r?r.portalItem?.portal:null)??i.getDefault();switch(n.user?.units??n.units){case t:return t;case"english":return"imperial"}return l(e.spatialReference)??t}export{s as e};
//# sourceMappingURL=getDefaultUnitForView-DnQYeHtO.js.map
