import React, { Component } from 'react';

export default class Html extends Component {
    render() {
        const {html} = this.props;//html内容
        return <div dangerouslySetInnerHTML={{__html:html}} className={this.props.class}></div>
    }
}