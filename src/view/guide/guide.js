import React from 'react';
import './guide.scss';
import {ProvingMobile} from '../../utils/API'
export default class Guide extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            code:''
        }
    }
    //验证手机号码
    handPhoneChange(e){
        const value = e.target.value;
        console.log(value)
        const str = ProvingMobile(value,11)
        this.setState({
            phone:str
        })
    }
     //验证验证码
    handCodeChange(e){
        const value = e.target.value;
        console.log(value)
        const str = ProvingMobile(value,6)
        this.setState({
            code:str
        })
    }
    render(){
        return(
            <div className="guide">
                <div className="guide-banner">
                    <img src={require('../../images/guide.jpg')}></img>
                    <div className="guide-login tran-bottom">
                        <form className="flex-column-left">
                            <label className="flex-between">
                               <input type="text" placeholder="请输入您的手机号" value={this.state.phone} onChange={this.handPhoneChange.bind(this)}></input>
                            </label>
                            <label className="flex-between">
                               <input type="text" placeholder="请输入短信验证码" value={this.state.code} onChange={this.handCodeChange.bind(this)}></input>
                               <span>获取验证码</span>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}