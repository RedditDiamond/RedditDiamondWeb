import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'
import '../styles/home.css'
import ReactGA from '../config/Analytics'

class Home extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      codeInput: "",
      donatorInput: ""
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    ReactGA.pageview("/");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, button: "Submit" });
  }

  handleKeyPress(e) {
    if (e.key == "Enter") {
      document.getElementById("home-button").click();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <img className="home-diamond" src="https://i.imgur.com/YGyrKgd.png" />
        <h1 className="welcome-message">Welcome to <span>Reddit</span> Diamond!</h1>
        <h2 className="home-verify-message">Have a Diamond to verify? Enter your code below!</h2>
        <input
          className="home-input"
          type="text"
          placeholder="Diamond Code"
          value={this.state.codeInput}
          name="codeInput"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}/>
        <input
          className="home-input"
          type="text"
          placeholder="Your Reddit Username"
          value={this.state.donatorInput}
          name="donatorInput"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}/>
        <Link className="home-button" id="home-button" to={"/verify/code=" + this.state.codeInput + "&donator=" + this.state.donatorInput}>Submit</Link>
      </div>
    );
  }
}

export default Home;