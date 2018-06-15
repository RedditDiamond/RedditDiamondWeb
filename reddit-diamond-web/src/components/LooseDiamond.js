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
    var length = 85;
    var trimmedString = string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string;
    return trimmedString;
  }

  render() {
    return(
      <div className="loose-diamond">
        <div className="loose-diamond-header">
          <a target="_blank" href={"https://www.reddit.com/u/" + this.props.data.initiator}><strong>From</strong> /u/{this.props.data.initiator}</a>
        </div>
        <div className="loose-diamond-body">
          <img src={this.getDiamondImage()}
            style={this.randomSpeed()}/>
          <h1>#{this.props.code}</h1>
          <a target="_blank" href={"https://www.reddit.com/u/" + this.props.data.owner}>/u/{this.props.data.owner}</a>
          <p>"{this.renderComment()}"</p>
        </div>
        <Link to={'/verify/' + 'code=' + this.props.code} className="loose-diamond-link">
          <button>Claim Me!</button>
        </Link>
      </div>
    )
  }
}

export default LooseDiamond;