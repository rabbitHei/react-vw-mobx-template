let envObj= {development:'dev',uat:'uat',test:'test',production:'pro'}

export const env = envObj[process.env.NODE_ENV];//环境 dev || test || pro || uat
export const inAPP = navigator.userAgent.toLowerCase().indexOf('iting') > -1;//是否在APP内
export const inWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;//是否在APP内
export const winW= window.innerWidth;//屏幕宽
export const winH = window.innerHeight;//屏幕高
export const rate = window.innerWidth/375;//比率