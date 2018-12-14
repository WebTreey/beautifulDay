import React from 'react';
import './home.scss';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll/build/iscroll-probe';
const OpneSroll = (props) =>{
    const options = {
        mouseWheel: true,
        scrollbars: true
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
                <img src={require('../../images/close_icon.png')} onClick={props.close}></img>
            </div>
            </div>
       </div>
    )
}


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false
        }
    }
    handActiveClick(){
        this.setState({
            isOpen:true
        }) 
        document.body.style.touchAction = "none";
        
    }
    handCloseClick(){
        this.setState({
            isOpen:false
        }) 
        document.body.style.touchAction = "";
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="home">
                {this.state.isOpen?  <OpneSroll close={this.handCloseClick.bind(this)}></OpneSroll> :''}
                <div className="home-hreader">
                    <img alt="圣诞节快乐" className="tran-bottom" src={require('../../images/title_box.png')}></img>
                </div>
                <div className="home-main">
                    <div className="home-flow">
                        <img alt="圣诞节快乐" src={require('../../images/res_flow.png')}></img>
                    </div>
                    <div className="home-btn flex-column">
                        <img alt="圣诞节快乐" src={require('../../images/login_btn.png')}></img>
                        <span onClick={this.handActiveClick.bind(this)}>活动规则</span>
                    </div>
                    <div className="home-list">
                        <div className="home-title-line"></div>
                        <h3 className="flex-content">
                            <img alt="圣诞节快乐" src={require('../../images/hot.png')}></img>
                            <span>热销产品</span>
                        </h3>
                        <ul>
                            <li className="flex-around">
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
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}