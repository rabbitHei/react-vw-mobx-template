window.addEventListener('load',()=>{//加载完才不会报错
  window.ly.config({
    appId: "a525d15f921ce389e3dea216665da454", // 必填，应用ID 全民朗读专用
    apiList: [ // 必填，需要使用的jsapi列表
      // "ui.toast", 会导致IOS下 页面样式出错 使用自定义toast
      "nav.setTitle",
      "nav.setMenu",
      "util.share",
      // "device.getDeviceInfo",
      "account.login",
      "account.getUserInfo",
      "nav.back",
      "nav.close",
      "page.startPage",
      // "util.uploadImage",
      "page.onPagePause",
      "page.onPageResume",
      "util.openLink",
      // "util.saveTempData",
      // "ui.setStatusBar",
      // "storage.getItem",
      // "storage.setItem",
      "ui.input",
      "ui.showLoading",
      "ui.hideLoading"
    ]
  });
},false);