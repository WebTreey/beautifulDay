import React from 'react';
import './home.scss';

export default class Move extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Tab:[
                {id:1,value:'按额度'},
                {id:2,value:'按排序'},
                {id:3,value:'按推荐'}
            ],
            activeIndex:1,
            list:[1,2,3,4,5,6,7]
        }
    }
    handTabClick(e){
        const index = parseInt(e.target.dataset.index,10);
        this.setState({
            activeIndex:index
        })
    }
    render(){
        const Tab = this.state.Tab;
        const indexs = this.state.activeIndex;
        const list = this.state.list;
        return(
            <div className="move main">
                <div className="move-header">
                    <ul className="flex-around">
                        {Tab.map((item,index)=>{
                            let calssname = indexs === item.id ? 'active' : ''
                            let url = indexs === item.id? require("../../images/sort_icon_active.jpg"):require("../../images/sort_icon.jpg")
                            return(
                                <li key={index} data-index={item.id} className={`${calssname} flex-conter` } onClick={this.handTabClick.bind(this)}>
                                    <span data-index={item.id}>{item.value}</span>
                                    <img className="sort-img" src={url} data-index={item.id}></img>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="move-lamp flex-conter">
                    <img src={require('../../images/horn.jpg')}></img>
                    <span>温馨提示：同时申请多个不同产品，可提高贷款通过率！</span>
                </div>
                <div className="home-list">
                        <div>
                            <ul>
                                {list.map((item,index)=>{
                                    return(
                                        <li key={index}>
                                            <div className="home-item">
                                            <div className="home-item-icon flex-conter">
                                                <span><img></img></span>
                                                <h4>带上钱</h4>
                                            </div>
                                            <div className="flex-between home-item-bottom">
                                                    <div className="home-item-money">
                                                        <span>50000</span>
                                                        <p>最高可贷额度（元）</p>
                                                    </div>
                                                    <div className="home-item-conter">
                                                        <p>6-12个月</p>
                                                        <p>30秒极速放款</p>
                                                    </div>
                                                    <div className="home-item-btn">立即申请</div>
                                            </div>
                                            </div>
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