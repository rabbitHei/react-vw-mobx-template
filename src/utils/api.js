import { env } from '../constant';

const URLMap = {
  //接口
  qf: {
    dev: '',
    test: '//qf.test.ximalaya.com',
    uat: '//qf.uat.ximalaya.com',
    pro: '//qf.ximalaya.com'
  },
  mobile: {
    dev: '',
    test: '//mobile.test.ximalaya.com',
    uat: '//mobile.uat.ximalaya.com',
    pro: '//mobile.ximalaya.com'
  },
  m:{
    dev: '',
    test: '//m.test.ximalaya.com',
    uat: '//m.uat.ximalaya.com',
    pro: '//m.ximalaya.com'
  },
  passport: {
    dev: '',
    test: '//passport.test.ximalaya.com',
    uat: '//passport.uat.ximalaya.com',
    pro: '//passport.ximalaya.com'
  },
  //站外登录页
  login: {
    dev: 'https://passport.test.ximalaya.com/page/m/login?fromUri=',
    test: 'https://passport.test.ximalaya.com/page/m/login?fromUri=',
    uat: 'https://passport.uat.ximalaya.com/page/m/login?fromUri=',
    pro: 'https://passport.ximalaya.com/page/m/login?fromUri='
  },
  

}

export const hostHandler = function(type) {
  return URLMap[type][env]
}

// 静态判断环境取不到值，所以每次需要传入env动态计算一次
const apiMap = {
  weixin:()=>{// 微信SDK
    return `${hostHandler('m')}/x-thirdparty-web/weixinJssdk/config`
  },
}

export const API = (key,data) => {
  return apiMap[key](data)
}