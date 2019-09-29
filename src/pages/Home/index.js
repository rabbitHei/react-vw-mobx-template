import React, { Component } from 'react';
import './home.scss';
import appImgs from '@/constant/appImgs.js';
import {observer, inject} from 'mobx-react';
// import { withRouter } from 'react-router';
// @withRouter

@inject('store') 
@observer
class Home extends Component {
  goEdit=()=>{
    this.props.history.push('/edit');
  }
  render() {
    return (
      <div>
        <img src={appImgs.back} alt="" />
        <p className="home" onClick={this.goEdit}>this is home page,go edit</p>
        <p className="home">{this.props.store.global.aa}</p>
      </div>
    )
  }
}
export default Home