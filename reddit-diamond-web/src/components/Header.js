import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/header.css'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img className="logo-diamond" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Emoji_large.png?v=1480481038" />
          <h1 className="logo-name">RedditDiamond</h1>
        </div>
        <div className="header-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    );
  }
}

export default Header;