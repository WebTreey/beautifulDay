import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import Home from './view/home/home'
import Bonus from './view/home/bonus';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/Bonus' component={Bonus}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
