import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Nav from './components/nav/nav'
import Home from './view/home/home'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact to="/" component={Home}></Route>
          </div>
        </Router>
        <Nav></Nav>
      </div>
    );
  }
}

export default App;
