import React from 'react';
import './login.scss'
import {ProvingMobile} from '../../utils/API'
import {PromptBox} from '../../components/prompt/prompt'
import { withRouter } from 'react-router';
class LoginFun1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            codevalue:'',
            codetext:'获取验证码',
            isSetinterval:false,
            prompt:false
        }
        this.code = 60;
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
        const str = ProvingMobile(value,6)
        console.log(str)
        this.setState({
            codevalue:str
        })
    }
     //获取验证码
     handCodeClick(){
        if(this.state.phone!==''){
            clearInterval(this.inTimes);
            this.inTimes = setInterval(()=>{
                if(this.code>0){
                    this.setState({
                        codetext: this.code--,
                        isSetinterval:true
                    })
                }else{
                    this.setState({
                        codetext:'获取验证码',
                        isSetinterval:false
                    })
                    this.code = 60;
                    clearInterval(this.inTimes);
                }
            },1000)
        }else{
            this.text = '请输入正确的手机号码！';
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
    //登录
    handLoginClick(){
        if(this.state.phone===''){
            this.text = '请输入正确的手机号码！';
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
        }
    }
    render(){
        const handCodeClick =  !this.state.isSetinterval ? this.handCodeClick.bind(this) : null;
        return(
            <div className="com-input">
                 {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <form className="flex-column-left">
                    <label className="flex-between">
                    <input type="text" placeholder="请输入您的手机号" value={this.state.phone} onChange={this.handPhoneChange.bind(this)}></input>
                    </label>
                    <label className="flex-between">
                    <input type="text" placeholder="请输入短信验证码" value={this.state.codevalue} onChange={this.handCodeChange.bind(this)}></input>
                    <span onClick={handCodeClick}>{this.state.codetext}</span>
                    </label>
                </form>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>立即登录</div>
            </div>
        )
    }
}

class LoginFun2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            codevalue:'',
            inputtype:'password',
            imgurl:require('../../images/bishang.png')
        }
        this.code = 60;
    }
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
        const str = ProvingMobile(value,6)
        console.log(str)
        this.setState({
            codevalue:str
        })
    }
    handImgClick(){
        if(this.state.inputtype==='password'){
            this.setState({
                inputtype:'text',
                imgurl:require('../../images/zhengkai.png')
            })
        }else{
            this.setState({
                inputtype:'password',
                imgurl:require('../../images/bishang.png')
            })
        }
        
    }
    //登录
    handLoginClick(){
        if(this.state.phone===''){
            this.text = '请输入正确的手机号码！';
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
        }
    }
    render(){
        return(
            <div className="com-input">
                 {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <form className="flex-column-left">
                    <label className="flex-between">
                    <input type="text" placeholder="请输入您的手机号" value={this.state.phone} onChange={this.handPhoneChange.bind(this)}></input>
                    </label>
                    <label className="flex-between">
                    <input type={this.state.inputtype} placeholder="请输入您的登录密码" value={this.state.codevalue}></input>
                    <img src={this.state.imgurl} onClick={this.handImgClick.bind(this)}></img>
                    </label>
                </form>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>立即登录</div>
            </div>
        )
    }
}
 class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Tab:[
                {id:1,value:'验证码登录'},
                {id:2,value:'密码登录'}
            ],
            activeIndex:0,
            prompt:false,
            checked:true,
            checkedclass:'login-checkbox'
        }
       
    }
    handTabClick(e){
        const index = e.target.dataset.index;
        this.setState({
            activeIndex:parseInt(index,10)
        })
    }
    handCheckbox(){
        if(this.state.checked){
            this.setState({
                checked:false,
                checkedclass:'login-checkboxdefault'
            })
        }else{
            this.setState({
                checked:true,
                checkedclass:'login-checkbox'
            })
        }
        
    }
    render(){
        const tab = this.state.Tab;
        const activeIndex = this.state.activeIndex;
        const Loinfun = activeIndex===0 ?  <LoginFun1></LoginFun1> :  <LoginFun2></LoginFun2>
        return(
            <div className="login">
                <div className="login-header flex-content">
                    <div className="login-nav flex-content">
                       {tab.map((item,index)=>{
                           const divactive = activeIndex === index ? 'divactive' : ''
                           return(
                               <div key={index} data-index={index} className={divactive} onClick={this.handTabClick.bind(this)}>{item.value}</div>
                           )
                       })}
                    </div>
                </div>
                <div className="login-main">
                    {Loinfun}
                </div>
                <div className="login-protocol flex-content">
                    <input type="checkbox" className={this.state.checkedclass} defaultChecked={this.state.checked} onClick={this.handCheckbox.bind(this)}></input>
                    <span>我已阅读并同意 <a>《 用户注册协议 》</a></span>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)

