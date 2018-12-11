import React from 'react';
import './nav.scss'
import { withRouter } from 'react-router-dom';

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Tab:[
                {id:1,label:'首页'},
                {id:2,label:'贷款'},
                {id:3,label:'我的'}
            ],
            TabIndex:0
        }
    }
    handSetTab(e){
        const index = parseInt(e.target.dataset.index,10);
        this.setState({
            TabIndex:index
        })
        console.log(this.props)
    }
    render(){
        const nav = this.state.Tab;
        return(
            <div className="nav">
                <ul className="flex-around">
                    {nav.map((item,index)=>{
                        const spancolor = this.state.TabIndex === index ? 'spancolor' :''
                        const classname = this.state.TabIndex === index ? '-active' :''
                        return(
                            <li key={index} className="flex-column" data-index={index} onClick={this.handSetTab.bind(this)}>
                                <em className={`icon icon-${index+1}${classname}`} data-index={index}></em>
                                <span className={spancolor} data-index={index}>{item.label}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default withRouter(Nav)