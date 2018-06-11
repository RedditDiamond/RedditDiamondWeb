import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Verify from './components/Verify';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/verify/code=:code&donator=:donator&recipient=:recipient" component={Verify} />
        </Switch>
      </Router>
    );
  }
}

export default App;
