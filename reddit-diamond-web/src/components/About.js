import React, { Component } from 'react';
import Header from './Header';
import '../styles/about.css';
import ReactGA from '../config/Analytics'
import '../styles/about.css'

const americanRedCross = 'https://i.imgur.com/FEnbGHT.png'
const childrenMiracle = 'https://i.imgur.com/zA0W3oO.png'
const stJudes = 'https://i.imgur.com/yIDD1ZY.png'
const donorChoose = 'https://i.imgur.com/CVpJErQ.png'
const humaneSociety = 'https://i.imgur.com/ZQeJUN1.png'

class About extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    ReactGA.pageview("/about");
  }

  render() {
      return (
          <div>
              <Header/>
              <div className="main-contain">
                  <h1 className="about-title">
                      Gilding for a Cause
                  </h1>
                  <h2 className="second-header">
                      
                  </h2>
                  
                  <div align="center">
                  <img className="span-responsive-img" src={americanRedCross}/>
                  <img className="span-responsive-img" src={childrenMiracle}/>
                  <img className="span-responsive-img" src={stJudes}/>
                  <img className="span-responsive-img" src={donorChoose}/>
                  <img className="span-responsive-img" src={humaneSociety}/>

                  </div>
                  <div className="box">
                    <h2>Our Mission Statement</h2>
                    <p className="mission-statement">To donate ALL the monies $$$... Yup.</p>
                    <h2>What is Reddit Diamond?</h2>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Are you a connoisseur of custom coinage? A proponent of priceless pesos? We are RedditDiamond, the latest evolution in <em>gilding technology</em>. Our system, brainchild of /u/deathfaith, but more importantly, conceptualized and painstakingly brought to life by /u/PatrioTech and /u/cmcjacob is designed to change the way we think about charitable donation on the internet. 

    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Since the invention of charity some-odd years ago, people have been donating “in the name of” friends, loved ones, or teachers. This has always been on a grand scale -- a gesture of extravagance. Our system is this same kindness scaled down sevenfold. </p>

    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The concept is simple. There are countless occurrences each day where users go above and beyond their call to dank memes and dickbutts. Whether it’s painstakingly producing several paragraphs of personalized advice on /r/PersonalFinance or crafting a HighQualityGif of cinematic excellence, these gems are <em>destined</em> to be gilded – an imaginary coin designed as a heartfelt thank-you from the consumer, moved so strongly they feel the need to throw their money to prove it. RedditDiamond takes this one step further, providing the infrastructure to gild by donation to any charity around the world (local, national, or international). RedditDiamond is gilding: for a cause.</p>

    <p align="center"><b>Reddit.com sees upwards of 1.69 billion users per month. Once implemented, if RedditDiamond engages only 0.1% of this userbase 2 times per year at the minimum donation amount ($1), worthy charities could see an additional $3,380,000 per year.</b></p>
                    </p>
                    <h2>How It Works</h2>
                    <ol>
                      <li>Summon u/RedditDiamondBot by typing !RedditDiamond as a reply to a worthy post, and the bot will reply with two links.</li>
                      <li>Click the PayPal Giving Fund link and find the charity you'd like to support. Donate however much you can (min is $1).</li>
                      <li>Check your email for an email titled "You donated $ to ___" (usually the second email from PayPal) and copy the "Track Your Donation" link.</li>
                      <li>Click the unique link given by the bot that says "click here", and paste in your PayPal link to verify</li>
                      <li>RDB will validate your donation and respond to the parent of your original post awarding +1 Reddit Diamond.</li>
                    </ol>
                  </div>
              </div>
          </div>
      );
  }
}

export default About;

