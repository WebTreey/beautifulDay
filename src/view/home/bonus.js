import React from 'react';
import './home.scss';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {setCommparams} from '../../utils/API'
import {getGtPrges,getGtUrBs,getClkLg} from '../../utils/config'
import {PromptBox} from '../../components/prompt/prompt'
const CashCard = (props) =>{
    const data = props.data
    return(
        <div className="bonus-header">
            <h3 className="flex-between">
                <span>提现码</span>
            </h3>
            <div className="home-reward-content ">
                <span className="Lottery">{data.cashCode}</span>
                <p>收到提现码以后请勿告知他人，以免奖金被冒领</p>
            </div>
           
        </div>
    )
}
//提现
const MyRewart = (props) =>{
    const data = props.data || {} ;
    if(data.status==='2'){
        return(
            <div className="bonus-header">
                <div className="bonus-reward">
                    <h3 className="flex-between" onClick={props.handLinkBonus}>
                        <span>累计奖金</span>
                    </h3>
                    <div className="home-reward-content flex-conter">
                        <span className="Lottery">暂未开奖</span>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="bonus-header">
             <div className="bonus-reward">
            <h3 className="flex-between" onClick={props.handLinkBonus}>
                <span>我的奖金</span>
                <em onClick={props.handCashCode}>查看提现码</em>
                <img alt="s" src={require('../../images/more.png')}></img>
            </h3>
            <div className="home-reward-content flex-conter">
                <img alt="s" src={require('../../images/money_icon.png')}></img>
                <span className="Lottery">{data.rewardAmt}<sup>元</sup></span>
                <button className="home-cash-btn" onClick={props.handCash}>提现</button>
            </div>
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
export default class Bonus extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            GtUrBsdata:[],
            erwer:false,
            Prompt:false,
            code:false
        }
        document.body.style.background =" #fff"
    }
    //获取进度数据
    setGtPrges(data){
        getGtPrges(data).then(res=>{
            console.log(res.data);
            this.setState({
                data:res.data.result
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
        this.setClkLg('复制二维码');
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
    //提现
    handCash(){
        this.setState({
            erwer:true
        })
        this.setClkLg('提现');
    }
    //提现码
    handCashCode(){
        const data = this.state.GtUrBsdata
        if(data.status==='1' && parseInt(data.rewardAmt)!==0)
        this.setState({
            code:true
        })
        this.setClkLg('提现码');
    }
    componentDidMount(){
        const data = setCommparams();
        this.setGtPrges(data);
        this.setGtUrBs(data);
        getClkLg(Object.assign({},data,{clickType:1}));
    }
    render(){
        document.title = '我的奖金'
        const data = this.state.data || [];
        return(
            <div className="bonus">
            {this.state.Prompt ? <PromptBox text={this.text}></PromptBox> : ''}
             {this.state.erwer ? <OpenPrompt close={this.handCloseClick.bind(this)}>
                    <div className="home-erwer flex-column">
                        <img alt="s" src={require('../../images/ew.png')}></img>
                        <p>扫码关注，领取现金红包
                            <CopyToClipboard text={'xjzg01'}
                                onCopy={this.handCopy.bind(this)}>
                                <span>公众号：xjzg01<i style={{color:'#ff5b01'}}>【点击复制】</i></span>
                            </CopyToClipboard>  
                        </p>
                    </div>
                    </OpenPrompt>:''}
                    <div >
                    {this.state.code ? <CashCard data={this.state.GtUrBsdata}></CashCard> : <MyRewart data={this.state.GtUrBsdata} handCashCode={this.handCashCode.bind(this)} handCash = {this.handCash.bind(this)}></MyRewart>}
                    
                    </div>
                
                {/* <CashCard></CashCard> */}
                <div className="bonus-content">
                    <h3>我的进度</h3>
                    <div className="bonus-schedule">
                        <h4 className="flex-between">
                            <span>产品名称</span>
                            <span>状态</span>
                        </h4>
                        <ul>
                            {data.length ? data.map((item,index)=>{
                                item = item ? item : {};
                                return(
                                <li className="flex-between" key={index}>
                                    <span>{item.proName}</span>
                                    <span>{item.loanStatus===1 ? '申请成功': '放款成功'}</span>
                                </li>
                                )
                            }):<li  className="flex-column"><img alt="s" src={require('../../images/not_page.png')}></img><p>暂无数据</p></li>}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}