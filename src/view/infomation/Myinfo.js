import React from 'react';
import './info.scss'
import {withRouter} from 'react-router';
import { Picker, List, WhiteSpace,DatePicker } from 'antd-mobile';


const seasons = [
    {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      },
  ];

class Myinfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sValue:[],
            date: ''
        }
    }
    handLinkCertification(){
        this.props.history.push('/home/certification')
    }
    render(){
        console.log(this.state.sValue,this.state.date);
        const minDate = new Date('1930/01/01');
        const maxDate = new Date();
        return(
            <div className="info-me">
                <div className="info-main">
                    <ul className="info-me-ul">
                        <li className="flex-conter" onClick={this.handLinkCertification.bind(this)}>
                            <label>姓名</label>
                            <input type="text" placeholder="立即去实名认证" readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')}></img></span>
                        </li>
                        <li className="flex-conter">
                            {/* <label>性别</label> */}
                            <div className="Picker">
                                <Picker
                                data={seasons}
                                cols={1}
                                title="性别"
                                value={this.state.sValue}
                                onChange={v => this.setState({ sValue: v })}
                                onOk={v => this.setState({ sValue: v })}
                                >
                                <List.Item arrow="horizontal">性别</List.Item>
                                </Picker>
                            </div>
                            {/* <input type="text" placeholder="请选择" readOnly></input> */}
                            {/* <span><img src={require('../../images/right-icon.jpg')}></img></span> */}
                        </li>
                        <li className="flex-conter" onClick={this.handLinkCertification.bind(this)}>
                            <label>身份证号</label>
                            <input type="text" placeholder="立即去实名认证" readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')} ></img></span>
                        </li>
                        <li className="flex-conter">
                            <label>手机号码</label>
                            <input type="text" placeholder="158****1251" readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')}></img></span>
                        </li>
                        <li className="flex-conter">
                            <div className="Picker">
                            <DatePicker
                            mode="date"
                            minDate= {minDate}
                            maxDate = {maxDate}
                            title="选择出生日期"
                            value={this.state.date}
                            onChange={date => this.setState({ date:date })}
                            >
                            <List.Item arrow="horizontal">出生年月</List.Item>
                            </DatePicker>
                            </div>
                            {/* <label>出生年月</label>
                            <input type="text" placeholder="请选择" readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')}></img></span> */}
                        </li>
                    </ul>
                </div>
                <button className="info-btn">安全退出</button>
            </div>
        )
    }
}
export default withRouter(Myinfo)