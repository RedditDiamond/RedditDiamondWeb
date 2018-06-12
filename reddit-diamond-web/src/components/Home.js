import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'
import '../styles/home.css'

class Home extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      codeInput: "",
      donatorInput: ""
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, button: "Submit" });
  }

  render() {
    return (
      <div>
        <Header />
        <img className="home-diamond" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Emoji_large.png?v=1480481038" />
        <h1 className="welcome-message">Welcome to <span>Reddit</span> Diamond!</h1>
        <h2 className="home-verify-message">Have a Diamond to verify? Enter your code below!</h2>
        <input
          className="home-input"
          type="text"
          placeholder="Diamond Code"
          value={this.state.codeInput}
          name="codeInput"
          onChange={this.handleChange}/>
        <input
          className="home-input"
          type="text"
          placeholder="Your Reddit Username"
          value={this.state.donatorInput}
          name="donatorInput"
          onChange={this.handleChange}/>
        <Link className="home-button" to={"/verify/code=" + this.state.codeInput + "&donator=" + this.state.donatorInput}>Submit</Link>
      </div>
    );
  }
}

export default Home;