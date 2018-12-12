import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './home.scss';
import Nav from '../../components/nav/nav'
import HomeContent from './homeContent'
import Login from '../loginandregister/login';
import Move from '../home/move';
import InfoIndex from '../infomation/infoIndex'
export default class Home extends React.Component{
    render(){
        return(
            <div>
                <Route exact path="/home" component={HomeContent}></Route>
                <Route path="/home/Login" component={Login}></Route>
                <Route path="/home/Move" component={Move}></Route>
                <Route path="/home/InfoIndex" component={InfoIndex}></Route>
                <Nav></Nav>
            </div>
        )
    }
}