import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Verify from './components/Verify';
import Stats from './components/Stats';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/verify/code=:code&donator=:donator" component={Verify} />
          <Route path="/stats/" component={Stats} />
        </Switch>
      </Router>
    );
  }
}

export default App;
