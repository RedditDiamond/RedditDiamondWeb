import React, { Component } from 'react';
import Header from './Header'
import request from 'request'
import '../styles/verify.css'

// var url = "https://www.reddit.com/u/" + this.props.match.params.recipient;

var tries = 0;

class Verify extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verifyRequest = this.verifyRequest.bind(this);
    this.animateSuccess = this.animateSuccess.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      paypalUrl: "",
      card: false,
      diamond: false,
      input: false,
      button: "Submit",
      message: false,
      charity: ""
    }
  }

  renderUserLink() {
    return "https://www.reddit.com/u/" + this.props.match.params.recipient;
  }

  verifyRequest() {
    if (this.state.message) {return}
    var code = this.props.match.params.code;
    var donator = this.props.match.params.donator;
    var transaction = this.state.paypalUrl

    this.setState({button: <div className="button-loader" />})

    var url = 'https://reddit-diamond.herokuapp.com/API?action=validate&code=' + code + '&transaction=' + transaction + '&donator=' + donator;
    request.get(url, function(err, res, body) {
      if (!err) {
        try {
          this.setState({charity: body.split("<b>")[1].split("</b>")[0]})
          this.animateSuccess();
        } catch(e) {
          request.get('https://reddit-diamond.herokuapp.com/init', function() {
            if (tries != 3) {
              tries += 1;
              console.log("Trying again");
              this.verifyRequest();
            } else {
              this.setState({button: "X"});
            }
          }.bind(this));
        }
      } else {
        alert("fail!");
      }
    }.bind(this));
  }

  animateSuccess() {
    this.setState({diamond: true, button: "✓"});
    setTimeout(function() {
      this.setState({card: true});
    }.bind(this), 800);
    setTimeout(function() {
      this.setState({message: true});
    }.bind(this), 1200);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, button: "Submit" });
  }

  handleKeyPress(e) {
    if (e.key == "Enter") {
      this.verifyRequest();
    }
  }

  render() {
    return (
      <div className="verify">
        <Header />
        <div className={(this.state.card) ? "diamond-card diamond-card-leave" : "diamond-card"}>
          <img
            className={(this.state.diamond) ? "big-diamond big-diamond-fast" : "big-diamond big-diamond-slow"}
            src="https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Emoji_large.png?v=1480481038" />
          <h2 className="diamond-number"><span>#{this.props.match.params.code}</span></h2>
          <h2>to <a href={this.renderUserLink()}>u/{this.props.match.params.recipient}</a></h2>
        </div>
        <h2 className={this.state.message ? "verify-success-message" : "verify-message"}>Thank you for donating to {this.state.charity}!</h2>
        <div className="paypal">
          <input
            className="paypal-input"
            type="text"
            placeholder="Paypal Receipt Link"
            value={this.state.paypalUrl}
            name="paypalUrl"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}/>
          <button className={this.state.button == "✓" ? "button-success" : (this.state.button == "X" ? "button-fail" : "")} onClick={this.verifyRequest}>{this.state.button}</button>
        </div>
      </div>
    );
  }
}

export default Verify;