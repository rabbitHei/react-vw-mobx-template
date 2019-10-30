import React, { Component } from 'react';
import './index.scss';
import Modal from '@/components/modal';
import appImgs from '@/constant/appImgs';

export default class Topic extends Component {
    state={}
    componentDidMount(){}
    render(){
        const {show} = this.props;//显示参数
        return (
            <Modal
            show={show} 
            // close={()=>{}} 
            fullScreen={true} 
            type={'normal'}
            noAnimation={true}
            >
                <div className='w-h100per loading-box'>
                    <img src={appImgs.back} alt="bg" className='fl w-h100per loading-img'/>
                </div> 
            </Modal>
        )
    }
}