import React, { Component } from 'react';
import Header from './Header'
import request from 'request'
import Fire from '../config/Fire'
import {Link} from 'react-scroll'
import '../styles/verify.css'
import ReactGA from '../config/Analytics'

class Verify extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verifyRequest = this.verifyRequest.bind(this);
    this.animateSuccess = this.animateSuccess.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderMid = this.renderMid.bind(this);
    this.state = {
      paypalUrl: "",
      card: false,
      diamond: false,
      input: false,
      button: "Submit",
      message: false,
      charity: "",
      amount: 0,
      recepient: "",
      canVerify: false,
      cannotVerifyMessage: "",
      askDonator: false,
      donator: "",
      diamondImage: "https://i.imgur.com/YGyrKgd.png"
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    Fire.database().ref('/unvalidated/' + this.props.match.params.code).once("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({canVerify: true, recipient: snapshot.val().owner})
      } else {
        this.setState({canVerify: false});
        Fire.database().ref('/validated/' + this.props.match.params.code).on("value", (snapshot2) => {
          if (snapshot2.val()) {
            this.setState({cannotVerifyMessage: "This diamond has already been verified!", recipient: snapshot2.val().owner});
          } else {
            this.setState({cannotVerifyMessage: "This diamond does not exist!",
              recipient: "NoOne",
              diamondImage: "https://i.imgur.com/3OuYrDL.png"});
          }
        })
      }
    });
    ReactGA.pageview("/verify");
  }

  componentDidMount() {
    if (this.props.match.params.donator == "" || this.props.match.params.donator == undefined || this.props.match.params.donator == null) {
      this.setState({askDonator: true, donator: ""})
    } else {
      this.setState({askDonator: false, donator: this.props.match.params.donator})
    }
  }

  renderUserLink() {
    return "https://www.reddit.com/u/" + this.state.recipient;
  }

  verifyRequest() {
    if (this.state.message) {return}
    var code = this.props.match.params.code;
    var donator = this.state.donator;
    var transaction = this.state.paypalUrl

    this.setState({button: <div className="button-loader" />})

    var url = 'https://reddit-diamond.herokuapp.com/API?action=validate&code=' + code + '&transaction=' + transaction + '&donator=' + donator;
    request.get(url, function(err, res, body) {
      console.log(err + res + body)
      if (res.statusCode == 200 || res.statusCode == 201) {
        body = JSON.parse(body)
        try {
          this.setState({charity: body["charity"], amount: body["amount"]});
          this.animateSuccess();
        } catch(e) {
          this.setState({button: "X"});
        }
      } else {
        console.log(err)
        this.setState({button: "X"});
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

  renderMid() {
    if (this.state.canVerify) {
      return (
        <div>
          <div className="paypal">
            <input
              className={this.state.askDonator ? "paypal-input" : "paypal-input hidden"}
              type="text"
              placeholder="Your Reddit Username"
              value={this.state.donator}
              name="donator"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}/>
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
          <h2 className="instructions-link"><Link activeClass="active" to="instructions" spy={true} smooth={true} duration={600}>How do I find my Paypal Receipt Link?</Link></h2>
          <div className="instructions" id="instructions">
          <div>
            <img src="https://i.imgur.com/nKQqD6a.png" />
            <h2>Step 1</h2>
            <h3>1) Find the email from Paypal titled "You donated $[amount] USD to benefit [charity]". This will generally be the second email from Paypal after they have sent the initial receipt.</h3>
          </div>
          <div>
            <img src="https://i.imgur.com/GChOZ3D.png" />
            <h2>Step 2</h2>
            <h3>2) Within the email, find the link that says "Track your donation". That's the link you'll need to paste in the Paypal Receipt Link box.</h3>
          </div>
          <div>
            <img src="https://i.imgur.com/oUZnER0.png" />
            <h2>Step 3</h2>
            <h3>Paste in the link and hit enter or click the button!</h3>
          </div>
        </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="cannot-render">{this.state.cannotVerifyMessage}</h1>
        </div>
      )
    }
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
            src={this.state.diamondImage} />
          <h2 className="diamond-number"><span>#{this.props.match.params.code}</span></h2>
          <h2>to <a href={this.renderUserLink()}>u/{this.state.recipient}</a></h2>
        </div>
        <h2 className={this.state.message ? "verify-success-message" : "verify-message"}>Thank you for donating ${this.state.amount} to {this.state.charity}!</h2>
        {this.renderMid()}
      </div>
    );
  }
}

export default Verify;