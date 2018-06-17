import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import request from 'request';
import '../styles/header.css'

class Header extends Component {
  constructor() {
    super();
    this.dropdown = this.dropdown.bind(this);
    this.state = {
      menuClass: "header-menu",
      status: "Offline"
    }
  }
  
  componentDidMount() {
    request.get("https://reddit-diamond.herokuapp.com/status", function(err, res, body) {
      if (err) {
        this.setState({status: "Offline"});
      } else {
        body = JSON.parse(body)
        this.setState({status: body["status"] == "True" ? "Online" : "Offline"});
      }
    }.bind(this));
    setInterval(function() {
        request.get("https://reddit-diamond.herokuapp.com/status", function(err, res, body) {
          if (err) {
            this.setState({status: "Offline"});
          } else {
            body = JSON.parse(body)
            this.setState({status: body["status"] == "True" ? "Online" : "Offline"});
          }
        }.bind(this));
      }.bind(this), 120000)
    }

  dropdown() {
    if (this.state.menuClass == "header-menu")
      this.setState({menuClass: "header-menu responsive"});
    else {
      this.setState({menuClass: "header-menu"});
    }
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <Link to="/" class="logo-link">
            <img className="logo-diamond" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Emoji_large.png?v=1480481038" />
            <h1 className="logo-name">RedditDiamond</h1>
          </Link>
          <div className="status"><div className={this.state.status == "Online" ? "status-green" : "status-red"}></div> {this.state.status}</div>
        </div>
        <div className={this.state.menuClass}>
          <Link to="/">Home</Link>
          <Link to="/diamonds">Loose Diamonds</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/about">About</Link>
          {/* <Link to="/contact">Contact</Link> */}
          {/* <a href="https://www.reddit.com/r/RedditDiamondBot/wiki">Wiki</a> */}
          <a href="https://www.reddit.com/message/compose?to=%2Fr%2FRedditDiamondBot">PM Us!</a>
        </div>
        <i className="fa fa-bars icon" onClick={this.dropdown}></i>
      </div>
    );
  }
}

export default Header;
