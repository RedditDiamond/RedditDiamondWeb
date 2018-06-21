import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import request from 'request'
import Header from './Header';
import ReactGA from '../config/Analytics'
import ReCAPTCHA from "react-google-recaptcha";
import '../styles/create.css'

class Create extends Component {
  constructor() {
    super();
    this.onRECAPTCHA = this.onRECAPTCHA.bind(this);
    this.onProceed = this.onProceed.bind(this);
    this.state = {  captcha: false, 
                    checked: false, 
                    limited: false,
                    errMsg: '', 
                    didError:false, 
                    commentInput:'',
                    button: 'Proceed',
                    author: '',
                    fullname: '',
                    type: '', 
                    tries: 4}
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    ReactGA.pageview("/create");
  }

  onCommentChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRECAPTCHA(value) {
      if (value == null) {
          this.setState({captcha: false})
      }
      this.setState({captcha: true})
  }

  onProceed() {
    if (this.state.captcha) {
        if (this.state.tries < 1) {
            this.setState( { didError:true, errMsg: "Something is wrong, try later!" } )
        } else {
            var comment = this.state.commentInput
            var to_api = 'https://reddit-diamond.herokuapp.com/API?action=check&comment=' + comment 
            request.get(to_api, function(err, res, json) {
                if (res.statusCode == 200 || res.statusCode == 201) {
                    var json_recv = JSON.parse(json)
                    var author = json_recv["author"]
                    var fullname = json_recv["fullname"]
                    var type = json_recv["type"]

                    console.log("author: " + author + " fullname: " + fullname + " type: " + type)
                    if (author == 'None') {
                        this.setState( {tries: this.state.tries-1})
                        this.setState({ didError: true, errMsg: 'Check your URL/link and try again! ' + this.state.tries + ' tries remaining'})
                        console.log("FATAL ERROR, YO")
                    } else {
                        this.setState({checked: true, author:author, fullname:fullname, type:type});
                        this.setState({ didError: false, errMsg: ''})
                        console.log("HOLY SHIT. Success: " + author + " " + fullname + " " + type) }
                    }
                }.bind(this)); 
            }      
        }
    }

  renderProceedClass() {
    if (this.state.limited) {
        return "create-button-disabled"
    }
    else if ((this.state.captcha) && (this.state.commentInput.length > 5)) {
        return "create-button"
    }
    return "create-button-disabled"
}

  shouldDisableProcess() {
    if (!this.state.captcha) {
        return true
      } else { 
        if (this.state.commentInput.length > 5) {
            return false
        } else { 
            return true
        }
    }
    return true
  }

  // optional error message
  renderErrorMessage() {
      if (this.state.didError) {
          return this.state.errMsg
      } else {
          return null
      }
  }

  render() {
      if (!this.state.checked) {
        return (
            <div>
            <Header />
            <br/><br/><br/><br/>
            <div className = "welcome-container">
                <h1 className="welcome-message">Toss A <span>Loose</span> Diamond!</h1>
                </div>
                <h2 className="create-verify-message">Find a comment you love on Reddit, and paste it below to get started.</h2>
                <div className="containStuff">
                    <div className="example-message">What's the comment URL or ID?<br/>
                    
                    </div>
                    <input
                        className="create-input"
                        type="text"
                        placeholder="https://www.reddit.com/r/RedditDiamondBot/comments/8oj3yy"           
                        name = "commentInput"
                        onChange={e => this.onCommentChange(e)} />
                        
                        <br/>

                    <div align="center">
                        <ReCAPTCHA ref="recaptcha" sitekey="6Lck_18UAAAAADa5ef1Ls4uBPi0Qhy5qr6_6kDyW" onChange={this.onRECAPTCHA} />
                    </div>
        
                    <button className={this.renderProceedClass()} onClick={this.onProceed} disabled={this.shouldDisableProcess()}>{this.renderProceedClass() == 'create-button' ? 'Proceed' : "Everything is Correct"}</button>

                    <div className="error-message">{this.renderErrorMessage()}</div>

                </div>
            </div>
        );} else {
          return (
              <div>
              OMFG RESULTS </div>
          )
      }
    }
}

export default Create;