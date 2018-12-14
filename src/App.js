import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import Home from './view/home/home'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
              <Route exact path='/' component={Home}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
