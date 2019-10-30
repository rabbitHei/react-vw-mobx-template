import React, { Component } from 'react';
import './index.scss';

export default class Scroll extends Component {
    isEndReached = true

    state = {
        distance: this.props.distance || 0.1,
    }
    componentDidMount() {
        this.onScroll();
    } 
    shouldComponentUpdate(NextProps,NextState){
        if(NextProps.list!== this.props.list){
            this.isEndReached = true
        }
        return (NextProps!== this.props);
    }
    
    onScroll = (e) =>{
        e&&e.stopPropagation();
        let scrollHeight = this.refs.scroll.scrollHeight;//可滚动区域
        let scrollTop = this.refs.scroll.scrollTop;//卷出区域
        let BoxHeight = this.refs.scroll.offsetHeight;//盒子高度
        let gap = this.state.distance * BoxHeight;//距离底部距离
        let noShowHeight = scrollHeight - scrollTop - BoxHeight;//未出现区域
        let contentH = this.refs.contentBox.offsetHeight;//内容高度
        let headerH = this.refs.headerBox.offsetHeight;//头部高度
        // console.log(scrollHeight,scrollTop,BoxHeight,contentH);

        if( noShowHeight <= gap && this.isEndReached){//到底触发事件
            // console.log('onEndReached')
            this.isEndReached = false;
            this.props.onEndReached&&this.props.onEndReached()
        }
        this.props.onScroll&&this.props.onScroll({
            scrollHeight,
            scrollTop,
            BoxHeight,
            gap,
            noShowHeight,
            contentH,
            headerH,
            scrollBox: this.refs.scroll,
        })
    }

    render() {
        /**
         * header 列表顶部模块
         * list 列表
         * render 渲染列表每一项
         * empty 列表为空时
         * footer 列表底部模块
         * content 插入加入自定义组件 在header 和 list之间
         * style 控制外层盒子样式
         * disable 禁止滚动 默认false
         * distance 距离底部多少时触发 onEndReached
         *  */
        const {header,list,footer,render,empty,content,style,disable} = this.props;
        return (
        <div className={`scroll-components-box ${disable?'disable':''}`} onScroll={ (e)=>{this.onScroll(e)} } ref='scroll' style={style?style:{}}>
            <div className="content flex" ref='contentBox'>
                <div className='scroll-header-box' ref='headerBox'>
                    {header&&header()}
                </div>
               {/* 自定义内容 */}
               {
                   content?content():null
               }
                <div className='list flex'>
                    {/* 列表 */}
                    {
                        list&&list.length
                        ? <React.Fragment>
                            {
                                list.map((v,i)=>{
                                    return <div key={i} className='clear'>
                                        {render&&render(v,i)}
                                    </div>
                                })
                            }
                        </React.Fragment>:null
                    }
                    {/* 空列表 */}
                    {
                       (!list || list.length == 0 )
                       ?(empty
                        ?empty()
                        : <p className='flex row a-center j-center' style={{height:'200px'}}>暂无数据</p>
                        )
                       :null
                    }
                </div>
                {list&&list.length&&footer?footer():null}
            </div>
        </div>
        )
    }
}