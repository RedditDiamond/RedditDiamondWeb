import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/header.css'

class Header extends Component {
  constructor() {
    super();
    this.dropdown = this.dropdown.bind(this);
    this.state = {
      menuClass: "header-menu"
    }
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
        </div>
        <div className={this.state.menuClass}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <i className="fa fa-bars icon" onClick={this.dropdown}></i>
      </div>
    );
  }
}

export default Header;