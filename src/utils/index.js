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