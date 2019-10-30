import React, { Component } from 'react';
import './index.scss';
import { PropTypes } from "prop-types";

export default class Master extends Component {
    static propTypes = {
        children: PropTypes.element,
        // StyleSheet: PropTypes.object.required,
        // onClick: PropTypes.func
    }

    state={}
    componentDidMount(){}
    shouldComponentUpdate(NextProps,NextState){
        return (NextProps!== this.props);
    }
    render(){
        const {show,close,fullScreen,type,width,noAnimation} = this.props;
        /** 
         * show 显示参数 bool
         * close 关闭弹窗 fn
         * fullScreen 是否全屏弹窗 bool 默认false
         * type 出现动画类型 normal silide  默认normal
         * width 非全屏时使用到盒子宽度 默认全屏50%
         * noAnimation 是否禁用伸缩 默认false
        */
        return (
            <React.Fragment>
                <div className={`md-overlay ${show&&!fullScreen?'md-show':''}`} onClick={()=>{close&&close()}}></div>
                {
                    type == 'silide'
                    ? <div 
                        className={`${fullScreen?'md-modal-silide-full': 'md-modal-silide'} ${show?'md-show':''}`} 
                        onClick={()=>{fullScreen&&close&&close()}}
                        style={!fullScreen&&width?{width:width}:{}}
                    >
                            <div className='md-content-silide'>
                                {this.props.children}
                            </div>
                    </div>
                    :<div 
                        className={`${fullScreen?'md-modal-full': 'md-modal'} ${show?'md-show':''}`} 
                        onClick={()=>{fullScreen&&close&&close()}}
                        style={!fullScreen&&width?{width:width}:{}}
                    >
                        <div className='md-content' style={noAnimation?{transform: 'scale(1)',opacity:1}:{}}>
                            {this.props.children}
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}