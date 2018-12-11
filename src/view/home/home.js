import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './home.scss';
import Nav from '../../components/nav/nav'
import HomeContent from './homeContent'
export default class Home extends React.Component{
    render(){
        return(
            <div>
                <Route exact path="/" component={HomeContent}></Route>
                <Nav></Nav>
            </div>
        )
    }
}