import axios from 'axios';
export const Http = {
    get: ({url,data}) => {
        return new Promise((resolve, reject) => {
            axios({
              method: 'get',
              url: url,
              params: data,
              withCredentials: true // 允许携带cookie
            }).then(resp => {
              resolve(resp)
            }, reject)
        })
    },
    post: ({url,data}) => {
        return new Promise((resolve, reject) => {
            axios({
              method: 'post',
              url: url,
              data: data,
              withCredentials: true // 允许携带cookie
            }).then(resp => {
              resolve(resp)
            }, reject)
        })
    },
    delete: ({url}) => {
        return new Promise((resolve, reject) => {
            axios({
              method: 'delete',
              url: url,
              withCredentials: true // 允许携带cookie
            }).then(resp => {
              resolve(resp)
            }, reject)
        })
    },
    form: ({url,data}) => {
        return new Promise((resolve, reject) => {
            axios({
              method: 'post',
              url: url,
              data: data,
              headers: {
                'content-type': 'multipart/form-data'
              },
              timeout: 20000,
              withCredentials: false
            }).then(resp => {
              resolve(resp)
            }, reject)
          })
    }
}
export const toast = {
  error: (txt,time)=>{
      let style = 'display: inline-block;max-width:228px;background: rgb(0,0,0);color:#EA6347;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;'
      toast.toast(txt,time,style);
  },
  info: (txt,time)=>{
      let style = 'display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;'
      toast.toast(txt,time,style);
  },
  suc: (txt,time)=>{
      let style = 'display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;'
      toast.toast(txt,time,style)
  },
  updateHtml: (txt,time) => {
      let style = 'display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;'
      toast.toast(txt,time,style)
  },
  toast: (txt,time,style)=>{
      let body = document.querySelector('body');
      let p = document.createElement('p');
      let span = document.createElement('span');
      // p.style = 'width:100%;position:fixed;top:50%;left:0;transform: translateY(-50%);height:40px;display:flex;flex-direction: row;justify-content: center;align-items: center;z-index:9999'
      p.setAttribute('style','width:100%;position:fixed;top:50%;left:0;transform: translateY(-50%);height:40px;display:flex;flex-direction: row;justify-content: center;align-items: center;z-index:9999')
      span.innerText = txt;
      // span.style = style; //兼容低版本不能这么写
      span.setAttribute('style',style);
      p.appendChild(span)
      body.appendChild(p);
      let timer = setTimeout(()=>{
          clearTimeout(timer);
          body.removeChild(p);
      },time||1600)
  },
}