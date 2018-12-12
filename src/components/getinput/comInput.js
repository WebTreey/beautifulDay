import React from 'react';
import './comInput.scss'
export default class ComInput extends React.Component{
    
    render(){
        const icon = this.props.icon;
        let url = '';
        if(icon===1){
            url = require('../../images/bishang.png')
        }else if(icon===2){
            url = require('../../images/zhengkai.png')
        }
        return(
            <div className="com-input flex-between">
                <input type="text" style={{fontSize:'.3rem'}} placeholder={this.props.plac} onClick={this.props.handInput}></input>
                <span><img src={url}></img></span>
            </div>
        )
    }
}