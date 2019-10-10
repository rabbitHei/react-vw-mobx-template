import { env } from '../constant';

const URLMap = {
  //接口
  base: {
    dev: '/anchor-read-web',
    test: '//m.test.ximalaya.com/anchor-read-web',
    uat: '//m.uat.ximalaya.com/anchor-read-web',
    pro: '//m.ximalaya.com/anchor-read-web'
  }
}

export const hostHandler = function(type) {
  return URLMap[type][env]
}

// 静态判断环境取不到值，所以每次需要传入env动态计算一次
const apiMap = {
  //首页活动入口配置 S
  homeActivity:(topicId) => {
    return `${hostHandler('base')}/topic/getTopicInfo/${topicId}`
  },
}

export const API = (key,data) => {
  return apiMap[key](data)
}