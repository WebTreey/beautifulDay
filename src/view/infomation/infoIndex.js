import React from 'react';
import './info.scss'
import {withRouter} from 'react-router'
class InfoIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            city:'重新获取定位'
        }
    }
    getBaiDuAPI(){
        const that = this
        var BMap = window.BMap;
        var map = new BMap.Map("allmap");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            var point = new BMap.Point(r.point.lng,r.point.lat);
            map.centerAndZoom(point,12);
            var gc = new BMap.Geocoder();  //初始化，Geocoder类
            gc.getLocation(point, function (rs) {   //getLocation函数用来解析地址信息，分别返回省市区街等
                var addComp = rs.addressComponents;
                that.setState({
                    city: addComp.city
                })
        });
    })
    }
    handBaidu(){
        this.getBaiDuAPI();
    }
    handLinkMyinfo(){
        this.props.history.push('/home/myinfo')
    }
    handLinkCarrProving(){
        this.props.history.push('/CarrProving')
    }
    componentDidMount(){
        this.getBaiDuAPI();
    }
    
    render(){
        return(
            <div className="info">
                <div id="allmap" style={{display:'none'}}></div>
                <div className="info-header">
                    <div className="info-position flex-content">
                    <img alt="闪电贷" src={require('../../images/dingwei.png')}></img>
                    <span onClick={this.handBaidu.bind(this)}>{this.state.city}</span>
                    </div>
                    <div className="info-xx">
                        <img alt="闪电贷" src={require('../../images/xiaoxi.png')}></img>
                        <span>12</span>
                    </div>
                    <div className="info-grxx flex-column">
                        <img alt="闪电贷" src={require('../../images/my-photo.jpg')}></img>
                        <span className="flex-content"><em>15989652154</em><img src={require("../../images/right-icon.jpg")}></img></span>
                        <button className="info-grxx-btn">去认证</button>
                    </div>
                </div>
                <div className="info-main">
                    <div className="info-main-1">
                        <ul>
                            <li className="flex-conter" onClick={this.handLinkMyinfo.bind(this)}>
                                <i className="icon icon-1"></i>
                                <h3>个人信息</h3>
                                <span className="flex-content"><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter">
                                <i className="icon icon-2"></i>
                                <h3>黑名单检测</h3>
                                <span className="flex-content"><em>去查询</em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter" onClick={this.handLinkCarrProving.bind(this)}>
                                <i className="icon icon-3"></i>
                                <h3>运营商检测</h3>
                                <span className="flex-content"><em>去查询</em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter">
                                <i className="icon icon-4"></i>
                                <h3>设置密码</h3>
                                <span className="flex-content"><em>去设置</em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                        </ul>
                    </div>
                    <div className="info-main-2">
                        <ul>
                            <li className="flex-conter">
                                <i className="icon icon-5"></i>
                                <h3>关于我们</h3>
                                <span className="flex-content"><em></em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter">
                                <i className="icon icon-6"></i>
                                <h3>帮助中心</h3>
                                <span className="flex-content"><em></em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter">
                                <i className="icon icon-7"></i>
                                <h3>关注微信</h3>
                                <span className="flex-content"><em></em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(InfoIndex)