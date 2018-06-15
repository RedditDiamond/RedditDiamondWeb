import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../styles/loosediamond.css';

class LooseDiamond extends Component {
  constructor() {
    super();
    this.renderComment = this.renderComment.bind(this);
    this.randomSpeed = this.randomSpeed.bind(this);
  }

  getDiamondImage() {
    var duration = new Date().getTime()/1000 - this.props.data.timestamp
    // If greater than 6 days
    if (duration > 518400) {
      return "assets/RedditDiamondRed.png"
    } else if (duration > 432000) { // 5 days
      return "assets/RedditDiamondYellow.png"
    } else {
      return "assets/RedditDiamondGreen.png"
    }
  }

  randomSpeed() {
    var randomNumber = Math.random()*3+3;
    return {animation: 'spin ' + randomNumber + 's linear infinite'}
  }

  renderComment() {
    var string = this.props.data.comment;
    var length = 48;
    var trimmedString = string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string;
    return trimmedString;
  }

  render() {
    return(
      <div class="loose-diamond">
        <img src={this.getDiamondImage()}
        style={this.randomSpeed()}/>
        <h1>#{this.props.code}</h1>
        <h2>{this.props.data.initiator} → {this.props.data.owner}</h2>
        <a target="_blank" href={"https://www.reddit.com/" + this.props.data.permalink}><p>"{this.renderComment()}"</p></a>
        <Link to={'/verify/' + 'code=' + this.props.code} className="loose-diamond-link">
          <button>Claim Me!</button>
        </Link>
      </div>
    )
  }
}

export default LooseDiamond;