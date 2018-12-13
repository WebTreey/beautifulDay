import React from 'react';
import './info.scss'
import {ProvingID} from '../../utils/API'
import {PromptBox} from '../../components/prompt/prompt'
import { withRouter } from 'react-router';
class Certification extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            id:'',
        }
       
    }
    handChangeName(e){
        const value = e.target.value;
        this.setState({
            name:value
        })
    }
    handProvingID(e){
        const value = e.target.value;
        const str = ProvingID(value);
        this.setState({
            id:str
        })
    }
    handLoginClick(){
        if(this.state.pass1===''){
            this.text = '密码不能为空';
            this.setState({
                prompt:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    prompt:false
                })
                clearTimeout(this.times);
            },2000)
        }else if(this.state.codevalue===''){
            this.text = '验证码错误，请重新输入！';
            this.setState({
                prompt:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    prompt:false
                })
                clearTimeout(this.times);
            },2000)
        }else if(this.state.pass2===''){
            this.text = '密码不一致';
            this.setState({
                prompt:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    prompt:false
                })
                clearTimeout(this.times);
            },2000)
        }
    }
    render(){
        return(
            <div className="info-me">
             {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <div className="info-input">
                    <form className="flex-column-left">
                        <label className="flex-between">
                        <i>姓名</i>
                        <input type="text" placeholder="请输入您的姓名" data-pass={1}  value={this.state.name} onChange={this.handChangeName.bind(this)} ></input>
                        
                        </label>
                        <label className="flex-between">
                        <i>身份证号</i>
                        <input type="text" placeholder="请输入您的身份证号" data-pass={2}  value={this.state.id} onChange={this.handProvingID.bind(this)}></input>
                        </label>
                    </form>
                </div>
                <div className="info-code-fs">实名认证仅用于验证身份，实名后将不可更改，请确保录入本人信息，否则将影响贷款等业务办理，认证信息将受到严格保密！</div>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>确认提交</div>
            </div>
        )
    }
}
export default withRouter(Certification)