import { observable, action } from 'mobx';

class Global {
  @observable aa = 'xxx'
  
  // 设置登录
  @action set = (status) => {
    this.aa = status
  }
}


export default new Global();
