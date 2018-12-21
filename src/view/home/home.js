import React from 'react';
import './home.scss';
import iScroll from 'iscroll/build/iscroll-probe';
import {PromptBox} from '../../components/prompt/prompt'
import ReactIScroll from 'react-iscroll';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {setCommparams, ProvingMobile, myStorage} from '../../utils/API'
import {getPullProLt , getGtUrBs ,getClkLg ,getSendSms , getCodelogin} from '../../utils/config'
import {Encrypt} from '../../utils/RSA'


//规则弹出框
const OpneSroll = (props) =>{
    const options = {
        mouseWheel: true,
        scrollbars: true,
      }
    return(
       <div className="open">
            <div className="isroll tran-conter">
            <div className="open-title">
                <span>活动规则</span>
            </div>
            <ReactIScroll iScroll={iScroll} options={options} className="example" style={{height:'5rem',overflow:'hidden',position:'relative'}}>
                <div className='isroll-children'>
                    <p>1.活动时间：2018年12月22日00:00:00-2019年1月3日23:59:59；</p>
                    <p>2.活动期间，用户注册并申请活动页中任意两个贷款及以上可获得10元现金奖励，同时获得赢取2019元锦鲤奖机会；成功下款的用户则可获得赢取188元现金惊喜奖抽奖机会。</p>
                    <div>
                    <p>①参与奖：注册并申请两个及以上贷款可获得10元现金奖励；</p>
                    <p>②惊喜奖：在成功下款用户中抽取20名幸运儿奖励188元现金；（参与奖与惊喜奖不可叠加）</p>
                    <p>③锦鲤奖：在获得参与奖资格的用户中随机抽取一名锦鲤奖励2019元大红包。</p>
                    <p>3.本平台在2019/1/4-2019/1/7进行结果统计，2019/1/8统一发放提现码，2019/1/8起用户需返回本活动页面，添加本平台官方公众号凭提现码领取奖金；</p>
                    <p>4.2019/1/8-2019/1/31，用户需返回本活动页面，凭提现码到本平台官方公众号领取奖金，过期则失效；</p>
                    <p>5.本活动最终解释权归本平台所有。</p>
                    </div>
                </div>
            </ReactIScroll>
            <div className="open-close flex-content">
                <img src={require('../../images/close_icon.png')} onClick={props.close} alt="圣诞节快乐" data-index={1}></img>
            </div>
            </div>
       </div>
    )
}
//登录按钮
const LoginBtn = (props) =>{
    return(
        <div className="home-btn" onClick={props.IsGetLogin}>
            <img alt="圣诞节快乐" src={require('../../images/login_btn.png')}></img>
        </div>
    )
} 
//提现
const MyRewart = (props) =>{
    const data = props.data || {};
    if( data.status ==='2'){
        return(
            <div className="home-reward">
                <h3 className="flex-between" onClick={props.handLinkBonus}>
                    <span>我的奖金</span>
                    <em>查看更多</em>
                    <img alt="圣诞" src={require('../../images/more.png')}></img>
                </h3>
                <div className="home-reward-content flex-conter">
                    <img alt="圣诞" src={require('../../images/money_icon.png')}></img>
                    <span className="Lottery">暂未开奖</span>
                   
                </div>
            </div>
        )
    }
    return(
        <div className="home-reward">
            <h3 className="flex-between" onClick={props.handLinkBonus}>
                <span>我的奖金</span>
                <em>查看更多</em>
                <img alt="圣诞" src={require('../../images/more.png')}></img>
            </h3>
            <div className="home-reward-content flex-conter">
                <img alt="圣诞" src={require('../../images/money_icon.png')}></img>
                <span className="Lottery">{data.rewardAmt}<sup>元</sup></span>
                <button className="home-cash-btn" onClick={props.handCash}>提现</button>
            </div>
        </div>
    )
}
//提示状态
class OpenPrompt extends React.Component{
    render(){
        return(
            <div className="open">
            <div className="tran-conter">
                {this.props.children}
                <div className="open-close flex-content">
                {!this.props.hide? <img src={require('../../images/close_icon.png')} onClick={this.props.close} alt="圣诞节快乐" data-index={2}></img>:''}
                </div>
            </div>
        </div>
        )
    }
}
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            activeState:false,
            erwer:false,
            Prompt:false,
            activePrompt:{},
            data:[],
            GtUrBsdata:{},
            isLogin:false,
            login:false,
            tishi:false,
            phonevaule:'',
            veryCodevalue:'',
            codetext:'获取验证码',
            isSetinterval:false,
            sdate:'',
            edate:''
            
        }
        this.code = 60;
        document.body.style.background="";
    }
    //登录弹出框
    handLogin(){
        try{
            // const url = window.location.href;
            // const lo = window.idai.getLogin(url);
            // this.setState({
            //     isLogin: lo ? true : false
            // })
            if(!myStorage.get('phone')){
                this.setState({
                    login:true,
                })
            }
        }catch(err){
            console.log(err)
        }
    }
    //登录按钮
    handClickLogin(){
        const asephone = Encrypt(this.state.phonevaule);
        getCodelogin(Object.assign({},setCommparams(),{phone:asephone,veryCode:this.state.veryCodevalue})).then(res=>{
            if(res.data.code==='codeError'){
                this.text = '验证失败';
                this.setState({
                    Prompt:true,
                })
                this.times = setTimeout(()=>{
                    this.setState({
                        Prompt:false
                    })
                    clearTimeout(this.times);
                },2000)
            }else if(res.data.code ==='yes' || res.data.code==='no' || res.data.code==='ok' ){
                myStorage.set('phone',this.state.phonevaule);
                myStorage.set('date', new Date())
                window.location.reload();
                this.text = '登录成功';
                this.setState({
                    Prompt:true,
                    login:false,
                    isLogin:true
                })
                this.times = setTimeout(()=>{
                    this.setState({
                        Prompt:false
                    })
                    clearTimeout(this.times);
                },2000)
            }else{
                this.text = '登录失败，请从新登录';
                this.setState({
                    Prompt:true,
                    login:false,
                    isLogin:true
                })
                this.times = setTimeout(()=>{
                    this.setState({
                        Prompt:false
                    })
                    clearTimeout(this.times);
                },2000)
            }
        })
    }
    //产品点击（这里判断活动开始或结束）；
    handISactive(e){
        const phone = myStorage.get('phone');
        if(!phone){
            this.handLogin();
            return false;
        }
        const frontName = e.target.dataset.name;
        const backName = e.target.dataset.backname;
        // alert(Encrypt(myStorage.get('phone')))
        getClkLg(Object.assign({},setCommparams(),{clickType:2,proName:frontName,backName:backName},{phone:Encrypt(myStorage.get('phone'))}))
        // getClkLg(Object.assign({},setCommparams(),{clickType:2,proName:frontName,backName:backName},{phone:Encrypt(myStorage.get('phone'))}));
        const sdate = new Date(this.state.sdate);
        const edata = new Date(this.state.edate);
        const ydata = new Date();
        if(ydata<sdate){
            this.setState({
                activeState:true,
                activePrompt:{
                    imgurl:require('../../images/activity_start.png'),
                    title:'活动未开始'
                }
            })
        }else if(edata<=ydata){
            this.setState({
                activeState:true,
                activePrompt:{
                    imgurl:require('../../images/activity_notstart.png'),
                    title:'活动已结束'
                }
            })
        }else{
            const url = e.target.dataset.url; 
            window.location.href = url ;
        }
    }
    //规则
    handRuleClick(){
        this.setState({
            isOpen:true
        }) 
        document.body.style.touchAction = "none";
        this.setClkLg('活动规则')
    }
    //关闭弹出框
    handCloseClick(){
        this.setState({ 
            isOpen:false,
            activeState:false,
            erwer:false,
            login:false
         })
        
        document.body.style.touchAction = "";
    }
    //跳转到奖励页面
    handLinkBonus(){
        this.props.history.push('/bonus');
        this.setClkLg('查看详情')
    }
    //提现
    handCash(){
        this.setState({
            erwer:true
        })
        this.setClkLg('提现')
    }
    //拷贝
    handCopy(){
        
        this.text="复制成功";
        this.setState({
            Prompt:true
        })
        clearTimeout(this.times)
        this.times = setTimeout(()=>{
            this.setState({
                Prompt:false
            })
        },2000)
        this.setClkLg('复制二维码')
    }
    //获取列表数据数据
    setPullProLt(data){
        getPullProLt(data).then(res=>{
            console.log(res.data)
            this.setState({
                data:res.data.result.proList,
                sdate:res.data.result.startTime,
                edate:res.data.result.endTime
            })
        })
    }
    //获取奖金数据
    setGtUrBs(data){
        getGtUrBs(data).then(res=>{
            console.log(res.data);
            this.setState({
                GtUrBsdata: res.data.result
            })
        })
    }
    //点击日志
    setClkLg(name){
        getClkLg(Object.assign({},setCommparams(),{clickType:2,proName:name}));
    }
    //输入电话号码
    handPhone(e){
        // ProvingMobile
        this.setState({
            phonevaule:ProvingMobile(e.target.value,11)
        })
    }
    //输入验证码
    handVeryCode(e){
        this.setState({
            veryCodevalue:ProvingMobile(e.target.value,6)
        })
    }
    //点击获取验证码
    handCodeClick(){
        if(this.state.phonevaule!==''){
            const asephone = Encrypt(this.state.phonevaule)
            getSendSms(Object.assign({},setCommparams(),{phone:asephone})).then(res=>{
                console.log(res.data)
                if(res.data.code==="ok"){
                    this.text = '验证码发送成功';
                    this.setState({
                        Prompt:true
                    })
                    this.times = setTimeout(()=>{
                        this.setState({
                            Prompt:false
                        })
                        clearTimeout(this.times);
                    },2000)

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
                }else if(res.data.code === 'recountError'){
                    this.text = '超过发送验证码次数';
                    this.setState({
                        Prompt:true
                    })
                    this.times = setTimeout(()=>{
                        this.setState({
                            Prompt:false
                        })
                        clearTimeout(this.times);
                    },2000)
                }
            })
        }else{
            this.text = '请输入正确的手机号码！';
            this.setState({
                Prompt:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    Prompt:false
                })
                clearTimeout(this.times);
            },2000)
        }
        
    }
    setMyStorageRemove(){
        const date = myStorage.get('date');
        console.log(date);
    }
    componentDidMount(){
        this.setMyStorageRemove();
        let data = setCommparams() || {};
        if(Object.keys(data).length===0 || !data ){
            this.setState({
                tishi:true
            })
            return false;
        }
        const that = this;
        if(!myStorage.get('phone')){
            that.setState({
                isLogin:false
            })
        }else{
            that.setState({
                isLogin:true
            })
            data = Object.assign({},setCommparams(),{phone:Encrypt(myStorage.get('phone'))})
            this.handLogin();
            getClkLg(Object.assign({},data,{clickType:1},{phone:Encrypt(myStorage.get('phone'))}));
        }
        this.setPullProLt(data);
        this.setGtUrBs(data);
    }
    render(){
       const comMyOrLoing =  !this.state.isLogin ?  <LoginBtn IsGetLogin={this.handLogin.bind(this,true)}></LoginBtn> : <MyRewart data={this.state.GtUrBsdata} handLinkBonus={this.handLinkBonus.bind(this)} handCash = {this.handCash.bind(this)}></MyRewart> 
       const activePrompt = this.state.activePrompt; 
       const handCodeClick =  !this.state.isSetinterval ? this.handCodeClick.bind(this) : null;
       return(
            <div className="home">
                {this.state.Prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                {this.state.erwer ? <OpenPrompt close={this.handCloseClick.bind(this)}>
                    <div className="home-erwer flex-column">
                        <img alt="圣诞" src={require('../../images/ew.png')}></img>
                        <p>扫码关注，领取现金红包
                            <CopyToClipboard text={'xjzg01'}
                                onCopy={this.handCopy.bind(this)}>
                                <span>公众号：xjzg01<i style={{color:'#ff5b01'}}>【点击复制】</i></span>
                            </CopyToClipboard>  
                        </p>
                    </div>
                    </OpenPrompt>:''}
                {this.state.activeState ? <OpenPrompt close={this.handCloseClick.bind(this)}>
                    <div className="home-acitve-start flex-column">
                        <img alt="圣诞" src={activePrompt.imgurl}></img>
                        <p>{activePrompt.title}</p>
                    </div>
                    </OpenPrompt>:''}
                { this.state.login ? <OpenPrompt close={this.handCloseClick.bind(this)}>
                    <div className="home-login">
                        <h3>验证码登录</h3>
                        <div className="home-form">
                            <div className="home-grount">
                                <label className="flex-between">
                                    <input type="text" placeholder="请输入电话号码" value={this.state.phonevaule} onChange={this.handPhone.bind(this)}></input>
                                </label>
                            </div>
                            <div className="home-grount">
                                <label className="flex-between">
                                    <input type="text" placeholder="请输入验证码" value={this.state.veryCodevalue} onChange={this.handVeryCode.bind(this)}></input>
                                    <span onClick={handCodeClick}>{this.state.codetext}</span>
                                </label>
                            </div>
                            <div className="home-login-btn" onClick={this.handClickLogin.bind(this)}>登录</div>
                        </div>
                    </div>
                </OpenPrompt> : ""}
                { this.state.tishi ? <OpenPrompt close={this.handCloseClick.bind(this)} hide={true}>
                    <div className="home-login">
                        <h3>温馨提示</h3>
                        <div className="home-form">
                            <p>很抱歉，由于您应用版本过低，无法参与活动，可与客服联系了解活动详情！</p>
                            <div className="home-tishi">
                                <p>微信公众号：xjzg01 （现金掌柜）</p>
                                <p>QQ群：878245957</p>
                                <p>客服微信号：daijieyi8</p>
                            </div>
                        </div>
                    </div>
                </OpenPrompt> : ""}
                {this.state.isOpen?  <OpneSroll close={this.handCloseClick.bind(this)}></OpneSroll> :''}
                <div className="home-hreader">
                    <img alt="圣诞节快乐" className="tran-bottom" src={require('../../images/title_box.png')}></img>
                </div>
                <div className="home-main">
                    <div className="home-flow">
                        <img alt="圣诞节快乐" src={require('../../images/res_flow.png')}></img>
                    </div>
                    {comMyOrLoing}
                    <div className="home-rule">
                        <span onClick={this.handRuleClick.bind(this)}>活动规则</span>
                    </div>
                    <div className="home-list">
                        <div className="home-title-line"></div>
                        <h3 className="flex-content">
                            <img alt="圣诞节快乐" src={require('../../images/hot.png')}></img>
                            <span>热销产品</span>
                        </h3>
                        <ul>
                            {this.state.data.map((item,index)=>{
                                return(
                                    <li key={index} className="flex-around">
                                        <i>
                                            <img alt="圣诞" src={item.proIcon}></img>
                                        </i>
                                        <div className="flex-column-left">
                                            <h4>{item.frontName}</h4>
                                            <p>{item.proRecom}</p>
                                            <p>{item.limitText}</p>
                                        </div>
                                        <em>
                                            <img alt="圣诞" src={require('../../images/Apply_btn.png')} data-backname={item.backName} data-name={item.frontName} data-url={item.h5Link} onClick={this.handISactive.bind(this)}></img>
                                        </em>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}