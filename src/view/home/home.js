import React from 'react';
import './home.scss';
export default class Home extends React.Component{
    render(){
        return(
            <div className="home">
                <div className="banner">
                    <img src={require('../../images/banner.jpg')}></img>
                </div>
            </div>
        )
    }
}