import axios from "axios";
import { inAPP } from "@/constant";

// 常用数据计算 & SDK功能
export const Http = {
  get: ({ url, data }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: url,
        params: data,
        withCredentials: true, // 允许携带cookie
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
  post: ({ url, data }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: data,
        withCredentials: true, // 允许携带cookie
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
  delete: ({ url }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: url,
        withCredentials: true, // 允许携带cookie
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
  form: ({ url, data }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: data,
        headers: {
          "content-type": "multipart/form-data",
        },
        timeout: 20000,
        withCredentials: false,
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
};

export const toast = {
  error: (txt, time) => {
    let style =
      "display: inline-block;max-width:228px;background: rgb(0,0,0);color:#EA6347;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  info: (txt, time) => {
    let style =
      "display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  suc: (txt, time) => {
    let style =
      "display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  updateHtml: (txt, time) => {
    let style =
      "display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  toast: (txt, time, style) => {
    let body = document.querySelector("body");
    let p = document.createElement("p");
    let span = document.createElement("span");
    // p.style = 'width:100%;position:fixed;top:50%;left:0;transform: translateY(-50%);height:40px;display:flex;flex-direction: row;justify-content: center;align-items: center;z-index:9999'
    p.setAttribute(
      "style",
      "width:100%;position:fixed;top:50%;left:0;transform: translateY(-50%);height:40px;display:flex;flex-direction: row;justify-content: center;align-items: center;z-index:9999"
    );
    span.innerText = txt;
    // span.style = style; //兼容低版本不能这么写
    span.setAttribute("style", style);
    p.appendChild(span);
    body.appendChild(p);
    let timer = setTimeout(() => {
      clearTimeout(timer);
      body.removeChild(p);
    }, time || 1600);
  },
};

export const onReady = (fn) => {
  //监听sdk可用调用
  if (!inAPP) return;
  let timer = setInterval(() => {
    if (window.ly && window.ly.invokeApp) {
      clearInterval(timer);
      fn && fn();
    }
  }, 100);
};

export const setTitle = (title) => {
  //设置标题
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("nav.setTitle", {
      title: title,
      clickable: true, // 默认false 导航是否可点击
      success: function (data) {},
    });
};

export const getUserInfo = (fn) => {
  //获取用户信息
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("account.getUserInfo", {
      success: (data) => {
        /*
          {
          isLogin:true,  // 未登录只有这个唯一属性
          uid:668899, // 用户id
          imgUrl:'用户图像地址',
          token:'',
          isNew:true,  // v6.5.9+
          nickName:'昵称'
          }
      */
        // console.log(data);
        fn && fn(data);
      },
    });
};

export const timeToString = (time, format) => {
  //时间转化
  let t = new Date(time);
  let tf = function (i) {
    return (i < 10 ? "0" : "") + i;
  };
  let tfNoZroe = function (i) {
    return i + "";
  };
  return format.replace(/yyyy|MM|M|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case "yyyy":
        return tf(t.getFullYear());
        break;
      case "MM":
        return tf(t.getMonth() + 1);
        break;
      case "M":
        return tfNoZroe(t.getMonth() + 1);
        break;
      case "mm":
        return tf(t.getMinutes());
        break;
      case "dd":
        return tf(t.getDate());
        break;
      case "HH":
        return tf(t.getHours());
        break;
      case "ss":
        return tf(t.getSeconds());
        break;
    }
  });
};

export const numCalc = (num, unit, fixed) => {
  //数字默认转化
  //num 传入数 fixed 保留小数位数 unit 单位{}
  let result = 0;
  let unitTmp = Object.assign({ k: "", w: "", kw: "", y: "" }, unit || {});
  let fixedTmp = fixed === 0 ? 0 : fixed ? fixed : 1;

  if (num >= 0) {
    if (num >= 100000000 && unit.y) {
      //亿
      result = ratioCalc(num / 100000000, fixedTmp) + unitTmp.y;
    } else if (num >= 10000000 && unit.kw) {
      //千万
      result = ratioCalc(num / 10000000, fixedTmp) + unitTmp.kw;
    } else if (num >= 10000 && unit.w) {
      //万
      result = ratioCalc(num / 10000, fixedTmp) + unitTmp.w;
    } else if (num >= 1000 && unit.k) {
      //千
      result = ratioCalc(num / 1000, fixedTmp) + unitTmp.k;
    } else {
      result = num;
    }
  }
  return result;
};

export const ratioCalc = (num, fixed) => {
  //保留小数 & 去末尾0处理 1.0 -> 1
  //num 传入浮点数 fixed 保留小数位数
  let tmpNum = "0";
  if (num && num !== 0) {
    num = Math.abs(num);
    tmpNum = num + "";
    let index = (num + "").indexOf(".");
    if (index > 0) {
      let arr = tmpNum.split("");
      let left = tmpNum.slice(0, index);
      let right = "";
      arr.forEach((v, i) => {
        if (i > index && i <= index + fixed) {
          right = right + v;
        }
      });
      if (right > 0) {
        tmpNum = left + "." + right;
      } else {
        tmpNum = left;
      }
    }
  }
  return tmpNum;
};

export const timeCalc = (time) => {
  //计算时间距离现在长久
  let str = "";
  if (+time) {
    let newTime = +time;
    let nowTime = Date.now();
    if (nowTime - newTime < 60 * 60 * 1000) {
      //一小时内
      str = "刚刚";
    } else if (nowTime - newTime < 24 * 60 * 60 * 1000) {
      //一天内
      str = Math.floor((nowTime - newTime) / (60 * 60 * 1000)) + "小时前";
    } else {
      //超过一天
      str = Math.floor((nowTime - newTime) / (24 * 60 * 60 * 1000)) + "天前";
    }
  } else {
    str = "刚刚";
  }
  return str;
};

export const openXm = (iting) => {
  //打开站内其他iting
  // window.location.href = iting;
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("page.startPage", {
      url: iting + "&_ka=1",
      target: "_blank",
      fullscreen: true,
    });
};

export const openUrl = (url) => {
  //打开站内 链接
  // window.location.href = iting;
  //iting://open?msg_type=14&url=xx&_ka=1 _ka 客户端销毁H5标记 1保留 0销毁 跳其他H5时加上 作用于当前H5 当前是否销毁 属于iting参数
  if (!inAPP) return;
  // 这种方式_ka=0,会导致页面关闭
  // let iting = `iting://open?msg_type=14&url=${encodeURIComponent(url)}`;
  // openXm(iting);
  // return

  window.ly.invokeApp("util.openLink", {
    url: url, //要打开链接的地址或者schema
    success: function () {},
  });
};

export const share = (
  { link, title, desc, type, imgUrl, shareType, dataUrl },
  fn
) => {
  //分享单渠道
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("util.share", {
      channel: [...shareType], //'weixinGroup', 'weixin', 'qq' 等
      link,
      title,
      desc,
      imgUrl,
      type,
      dataUrl: dataUrl || "",
      success: function success(data) {
        fn && fn(data);
      },
      fail: function (err) {
        // toast.info('分享失败')
      },
    });
};

export const goLogin = (fn) => {
  //登录
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("account.login", {
      halfScreen: false,
      control: false,
      success: (res) => {
        //已登录会执行 未登录则登录不会走这里的回调
        fn && fn(res);
      },
    });
};

export const isIphonex = () => {
  // X XS, XS Max, XR
  const xSeriesConfig = [
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812,
    },
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896,
    },
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896,
    },
  ];
  // h5
  if (typeof window !== "undefined" && window) {
    const isIOS = /iphone/gi.test(window.navigator.userAgent);
    if (!isIOS) return false;
    const { devicePixelRatio, screen } = window;
    const { width, height } = screen;
    // console.log(width,height,devicePixelRatio)
    return xSeriesConfig.some(
      (item) =>
        item.devicePixelRatio === devicePixelRatio &&
        item.width === width &&
        item.height === height
    );
  }
  return false;
};

export const onPageBackShow = (fn) => {
  // 页面从后台进入前台触发
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("page.onPageResume", {
      success: function () {
        //   toast.info('onPageResume')
        fn && fn();
      },
    });
};

export const onPageGoHide = (fn) => {
  // 页面进入后台触发
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("page.onPagePause", {
      success: function () {
        // toast.info('onPagePause')
        fn && fn();
      },
    });
};

export const closeWindow = (txt, fn) => {
  if (!inAPP) return;
  window.ly.invokeApp &&
    window.ly.invokeApp("nav.close", {
      from: txt || "none", // 可选
      success: function (data) {
        fn && fn();
      },
    });
};

export const loadJs = (srcEnd) => {
  //手动加载JS
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = srcEnd;
  document.getElementsByTagName("body")[0].appendChild(script);
};

export const showLoading = () => {
  window.ly.invokeApp &&
    window.ly.invokeApp("ui.showLoading", {
      text: "", //loading显示的字符，空表示不显示文字
      showIcon: true, //是否显示icon，默认true
      success: function () {},
    });
};

export const hideLoading = () => {
  window.ly.invokeApp &&
    window.ly.invokeApp("ui.hideLoading", {
      success: function () {},
    });
};

export const endTime = (endTime) => {
  //计算时间距离现在还有多少年、月、天
  if (!endTime) return "0天";
  let nowTime = Date.now();
  if (nowTime >= endTime) return "已过期";
  let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //闰年
  let simpleYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //平年
  let yearArr = [leapYear, simpleYear];

  let now = new Date(nowTime);
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth();
  let nowDay = now.getDate();
  let nowIsLeap = nowYear % 4 === 0 ? 0 : 1;

  let end = new Date(endTime);
  let endYear = end.getFullYear();
  let endMonth = end.getMonth();
  let endDay = end.getDate();
  // let endIsLeap = endYear % 4 === 0 ? 0 : 1;
  // console.log(endYear,endMonth,endDay);
  // console.log(nowYear,nowMonth,nowDay);

  let day = endDay - nowDay;
  let month = endMonth - nowMonth;
  let year = endYear - nowYear;

  if (day < 0) {
    day += yearArr[nowIsLeap][nowMonth];
    month -= 1;
  }
  if (month < 0) {
    month += 12;
    year -= 1;
  }
  // console.log(year, month, day);
  let str = "";
  year && (str += `${year}年`);
  month && (str += `${month}月`);
  day && (str += `${day}日`);

  return str;
};
