import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Verify from './components/Verify';
import LooseDiamonds from './components/LooseDiamonds'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/diamonds" component={LooseDiamonds} />
          <Route path="/verify/code=:code&donator=:donator" component={Verify} />
          <Route path="/verify/code=:code" component={Verify} />
        </Switch>
      </Router>
    );
  }
}

export default App;
