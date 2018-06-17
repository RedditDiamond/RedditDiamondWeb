import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../styles/about.css';
import ReactGA from '../config/Analytics'

class About extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      subject: "",
      body: ""
    }
  }

  componentDidMount() {
    ReactGA.pageview("/about");
  }

  render() {
    return(
      <div className="about">
        <Header />
        <div className="about-content">
          <h1>- Our Mission -</h1>
          <h2>To donate all the monies. Yep.</h2>
        </div>
      </div>
    )
  }
}

export default About;