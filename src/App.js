import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import Home from './view/home/home';
import Move from './view/home/move'
import Guide from './view/guide/guide'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Guide}></Route>
            <Route path="/Home" component={Home}></Route>
            <Route path="/Move" component={Move}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
