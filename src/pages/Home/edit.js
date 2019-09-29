import React, { Component } from 'react';
import './home.scss';
import appImgs from '@/constant/appImgs.js';
import {observer, inject} from 'mobx-react';

@inject('store') 
@observer
class Edit extends Component {
    setStore=()=>{
        this.props.store.global.set('aaa')
    }
    render() {
        return (
        <div>
            <img src={appImgs.back} alt="" />
            <p className="home" onClick={this.setStore}>set store</p>
        </div>
        )
    }
}
export default Edit