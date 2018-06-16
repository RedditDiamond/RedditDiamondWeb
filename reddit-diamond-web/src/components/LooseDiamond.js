import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../styles/loosediamond.css';

class LooseDiamond extends Component {
  constructor() {
    super();
    this.renderComment = this.renderComment.bind(this);
    this.randomSpeed = this.randomSpeed.bind(this);
    this.flipCard = this.flipCard.bind(this);

    this.state = {
      cardClass: "loose-diamond-card"
    }
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

  flipCard() {
    if (this.state.cardClass == "loose-diamond-card") {
      this.setState({cardClass: "loose-diamond-card flip"});
    } else {
      this.setState({cardClass: "loose-diamond-card"});
    }
  }

  render() {
    return(
      <div className={this.state.cardClass}>
        <div className="loose-diamond-content">
          <div className="loose-diamond-front">
            <div className="loose-diamond-header">
              <a target="_blank" href={"https://www.reddit.com/u/" + this.props.data.initiator}><strong>From</strong> /u/{this.props.data.initiator}</a>
            </div>
            <div className="loose-diamond-body">
              <img src={this.getDiamondImage()}
                style={this.randomSpeed()}/>
              <h1>#{this.props.code}</h1>
              <a target="_blank" href={"https://www.reddit.com/u/" + this.props.data.owner}>/u/{this.props.data.owner}</a>
              <p onClick={this.flipCard}>"{this.renderComment()}"</p>
            </div>
            <Link to={'/verify/' + 'code=' + this.props.code} className="loose-diamond-link">
              <button>Give this Diamond!</button>
            </Link>
          </div>
          <div className="loose-diamond-back">
            <h2>/u/{this.props.data.owner}</h2>
            <p>"{this.props.data.comment}"</p>
            <i onClick={this.flipCard} className="fas fa-times" />
          </div>
        </div>
      </div>
    )
  }
}

export default LooseDiamond;