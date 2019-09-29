let envObj= {development:'dev',uat:'uat',test:'test',production:'pro'}

export const env = envObj[process.env.NODE_ENV];//环境 dev || test || pro || uat