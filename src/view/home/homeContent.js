import React from 'react';
import {setCommparams} from '../../utils/API'
import {getHomeInof} from '../../utils/config'
import { withRouter } from 'react-router';
import ReactSwiper from 'reactjs-swiper'
import './home.scss';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
const Loding = (props)=>{
    return(
        <div className="home-loding flex-conter">
        {props.IsImg ? <img src={require('../../images/loding.gif')}></img> : ''}
            <span>{props.text}</span>
        </div>
    )
}

const ReactSwiperExample = () => {
    const items = [{
      image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg',
      title: '图片1',
      link: 'http://jd.com'
    }, {
      image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg',
      title: '图片2',
    }, {
      image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg',
      title: '图片3',
      link: 'http://jd.com'
    }, {
      image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
      title: '图片4',
    }];
   
    const swiperOptions = {
      preloadImages: true,
      autoplay: 4000,
      autoplayDisableOnInteraction: false
    };
    return (
      <ReactSwiper swiperOptions={swiperOptions} showPagination items={items}
                   className="swiper-example" />
    );
  };

class HomeContent extends React.Component{
    constructor() {
        super();
        this.state = {
            loding: false,
            list:[1],
            have:true,
            bannerList:[]
        }
      }


    setHomeinfo(){
        getHomeInof(setCommparams).then((res)=>{
            console.log(res.data)
            this.setState({
                bannerList:res.data.result.homeBannerList
            })
        });
        
    }
    
    handBoydScroll(){
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop 
        const clientHeight = document.documentElement.clientHeight;
       
        if((scrollTop+clientHeight)>=scrollHeight){
            this.setState((NewStart)=>({
                    loding: true
                }
            ))
            clearTimeout(this.tiems)
            this.tiems = setTimeout(()=>{
                this.setState((NewStart)=>({
                    loding: false,
                    list:NewStart.list.concat([2,3])
                    
                }))
            },3000)
            if(this.state.count===3){
                this.setState((NewStart)=>({
                    loding: true,
                    have:false
                }
            ))
            }
            console.log(scrollTop,scrollHeight,clientHeight)
        }
       
    }
    handLinkMoves(){
        this.props.history.push('/home/Move')
    }
    componentDidMount(){
        this.setHomeinfo()
        document.addEventListener('scroll',()=>{
            this.handBoydScroll()
        })
    }
    componentWillUnmount(){
        clearTimeout(this.tiems);
    }
    render(){
        const list = this.state.list;
        this.text = this.state.have ? '正在加载更多数据' : '没有数据了';
       
        const bannerList = this.state.bannerList || [];
        //banner数据
        let items =  bannerList.map((item,index)=>{
            let obj = {};
            obj.image = item.bannerImg;
            obj.title = item.bannerName;
            obj.link = item.linkUrl;
            return(obj)
        })
        //配置banner滚动方式
        const swiperOptions = {
            preloadImages: true,
            autoplay: 3000,
            disableOnInteraction: false,
            
          };
        
        return(
            <div className="home">
                {/* <div className="banner">
                    <img src={require('../../images/banner.jpg')}></img>
                </div> */}
                <ReactSwiper swiperOptions={swiperOptions} showPagination items={items}
                   className="swiper-example" />
                <div className="main">
                    <div className="home-header ">
                        <ul className="flex-between">
                            <li>1</li>
                            <li>1</li>
                        </ul>
                    </div>
                    <div className="home-recommend">
                        <div className="home-recommend-header flex-between">
                            <div className="home-recommend-icon"><img src=""></img></div>
                            <div className="home-recommend-title flex-defualt">
                                <h3>麦芒钱包</h3>
                                <span>无需下载APP</span>
                            </div>
                            <div className="home-recommend-replace flex-content">
                                <img src={require('../../images/reload.png')}></img>
                                <span>换一换</span>
                            </div>
                        </div>
                        <div className="home-recommend-content">
                            <div className="home-recommend-money">
                                <em>500000</em>
                                <p>最高可贷额度(元)</p>
                            </div>
                            <div className="home-recommend-adv">
                                <ul className="flex-around">
                                    <li>3分钟到账</li>
                                    <li>日利率0.05%</li>
                                    <li>期限20个月</li>
                                </ul>
                            </div>
                        </div>
                        <div className="home-recommend-btn" onClick={this.handBoydScroll}>立即申请</div>
                    </div>
                    <div className="home-list">
                        <div className="home-list-header flex-between">
                            <h3>精选贷款</h3>
                            <span onClick={this.handLinkMoves.bind(this)}>更多 ></span>
                        </div>
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
                    {this.state.loding ?  <Loding text={this.text} IsImg={this.state.have}></Loding>: ''}
                    <div className="home-footer">
                        <img src={require('../../images/bottom-gg.png')}></img>
                    </div>
                </div>
            </div>
        )
    }
} 
  
export default withRouter(HomeContent)