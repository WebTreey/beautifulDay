import React from 'react';
import './home.scss';

const CashCard = (props) =>{
    return(
        <div className="bonus-header">
            <h3 className="flex-between">
                <span>提现码</span>
            </h3>
            <div className="home-reward-content ">
                <span className="Lottery">A23456</span>
                <p>收到提现码以后请勿告知他人，以免奖金被冒领</p>
            </div>
           
        </div>
    )
}

export default class Bonus extends React.Component{
    constructor(props){
        super(props);
        document.body.style.background =" #fff"
    }
    render(){
        return(
            <div className="bonus">
                <div className="bonus-header">
                    <h3 className="flex-between">
                        <span>我的奖金</span>
                        <em>查看更多</em>
                        <img alt="圣诞快乐" src={require('../../images/more.png')}></img>
                    </h3>
                    <div className="home-reward-content flex-conter">
                        <img alt="圣诞快乐" src={require('../../images/money_icon.png')}></img>
                        <span className="Lottery">00.00<sup>元</sup></span>
                        <button>提现</button>
                    </div>
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
                            <li className="flex-between">
                                <span>拍拍贷</span>
                                <span>申请成功</span>
                            </li>
                            <li className="flex-between">
                                <span>拍拍贷</span>
                                <span>申请成功</span>
                            </li>
                            <li className="flex-between">
                                <span>拍拍贷</span>
                                <span>申请成功</span>
                            </li>
                            <li className="flex-between">
                                <span>拍拍贷</span>
                                <span>申请成功</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}