import React from 'react';
import './home.scss';
import iScroll from 'iscroll/build/iscroll-probe';
import {PromptBox} from '../../components/prompt/prompt'
import ReactIScroll from 'react-iscroll';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {setCommparams} from '../../utils/API'
import {getPullProLt , getgtUrBs} from '../../utils/config'

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
                        <p>1.活动时间：2018年12月22日00:00:00 - 2019年1月3日23:59:59;</p>
                        <p>2.活动期间，用户注册并申请活动页中任意两个贷款及以上</p>
                        <div>可获得10元现金奖励，同时获得赢取2019元锦鲤奖机会；成功下款的用户将额外获得赢取188元现金惊喜奖抽奖机会。
                        <p>①参与奖：注册并申请两个及以上贷款可获得10元现金奖励；</p>
                        <p>②惊喜奖：在成功下款用户中抽取20名幸运儿奖励188元现金；</p>
                        <p>③锦鲤奖：在获得参与奖资格的用户中随机抽取一</p>
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
    const data = props.data;
    if(data.status==='2'){
        return(
            <div className="home-reward">
                <h3 className="flex-between" onClick={props.handLinkBonus}>
                    <span>我的奖金</span>
                    <em>查看更多</em>
                    <img src={require('../../images/more.png')}></img>
                </h3>
                <div className="home-reward-content flex-conter">
                    <img src={require('../../images/money_icon.png')}></img>
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
                <img src={require('../../images/more.png')}></img>
            </h3>
            <div className="home-reward-content flex-conter">
                <img src={require('../../images/money_icon.png')}></img>
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
                <img src={require('../../images/close_icon.png')} onClick={this.props.close} alt="圣诞节快乐" data-index={2}></img>
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
            data:[],
            GtUrBsdata:[],
        }
        document.body.style.background="";
    }
    //跳转登录
    IsGetLogin(){
        const url = window.location.href;
        window.idai.getLogin(url);
    }
    //规则
    handRuleClick(){
        this.setState({
            isOpen:true
        }) 
        document.body.style.touchAction = "none";
        
    }
    //关闭弹出框
    handCloseClick(){
        this.setState({ 
            isOpen:false,
            activeState:false,
            erwer:false
         })
        
        document.body.style.touchAction = "";
    }
    //跳转到奖励页面
    handLinkBonus(){
        this.props.history.push('/bonus')
    }
    //提现
    handCash(){
        this.setState({
            erwer:true
        })
    }
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
        console.log(this.text)
    }
    // 获取数据
    setPullProLt(data){
        getPullProLt(data).then(res=>{
            this.setState({
                data:res.data.result
            })
        })
    }
    //获取奖金
    setGtUrBs(data){
        getgtUrBs(data).then(res=>{
            console.log(res.data);
            this.setState({
                GtUrBsdata: res.data.result
            })
        })
    }

    componentDidMount(){
        const data = setCommparams();
        this.setPullProLt(data);
        this.setGtUrBs(data);
    }
    render(){
       const comMyOrLoing =  this.state.GtUrBsdata ?  <MyRewart 
        data={this.state.GtUrBsdata} handLinkBonus={this.handLinkBonus.bind(this)} handCash = {this.handCash.bind(this)}
                                                        ></MyRewart> : <LoginBtn IsGetLogin={this.IsGetLogin.bind(this)}></LoginBtn>
       return(
            <div className="home">
                {this.state.Prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                {this.state.erwer ? <OpenPrompt close={this.handCloseClick.bind(this)}>
                    <div className="home-erwer flex-column">
                        <img src={require('../../images/ew.png')}></img>
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
                        <img src={require('../../images/activity_notstart.png')}></img>
                        <p>活动已结束</p>
                    </div>
                    </OpenPrompt>:''}
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
                                    <li key={index} >
                                        <a href={item.h5Link} className="flex-around" >
                                            <i>
                                                <img src={item.proIcon}></img>
                                            </i>
                                            <div className="flex-column-left">
                                                <h4>{item.frontName}</h4>
                                                <p>{item.proRecom}</p>
                                                <p>{item.limitText}</p>
                                            </div>
                                            <em>
                                                <img src={require('../../images/Apply_btn.png')}></img>
                                            </em>
                                        </a>
                                    </li>
                                )
                            })}
                            {/* <li className="flex-around">
                                <i>
                                    <img src={require('../../images/logo_1.png')}></img>
                                </i>
                                <div className="flex-column-left">
                                    <h4>360借条</h4>
                                    <p>利率万3起</p>
                                    <p>一分钟放款，随借随还</p>
                                </div>
                                <em>
                                    <img src={require('../../images/Apply_btn.png')}></img>
                                </em>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}