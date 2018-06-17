import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Header from './Header';
import Fire from '../config/Fire'
import LooseDiamond from './LooseDiamond'
import '../styles/loosediamonds.css';
import ReactGA from '../config/Analytics'

class LooseDiamonds extends Component {
  constructor() {
    super();

    this.state = {
      diamonds: {}
    }
  }

  componentDidMount() {
    Fire.database().ref("unvalidated").on("value", (snapshot) => {
      this.setState({diamonds: snapshot.val()})
    })
    ReactGA.pageview("/diamonds");
  }

  renderGrid() {
    var i = 1
    var grid = []
    var row = []
    if (this.state.diamonds) {
      if (Object.keys(this.state.diamonds).length != 0) {
        Object.keys(this.state.diamonds).map((diamondKey, index) => {
          row.push(<Col lg={3} sm={6} xs={12}><LooseDiamond key={diamondKey} code={diamondKey} data={this.state.diamonds[diamondKey]} /></Col>)
          if (i % 4 == 0) {
            grid.push(row);
            row = []
          }
          i++;
        })
      } else {
        return <h1 className="no-diamonds">No Loose Diamonds!</h1>
      }
    } else {
      return <h1 className="no-diamonds">No Loose Diamonds!</h1>
    }
    if (row.length != 0) {grid.push(row);}
    if (Object.keys(this.state.diamonds).length > 3) {
      return(<Container className="loose-diamonds-grid">
        {grid.map(row => {
          return <Row>{row}</Row>
        })}
      </Container>)
    } else {
      return(<Container className="loose-diamonds-grid">
        <Row>{row}</Row>
      </Container>)
    }
  }

  render() {
    return (
      <div className="loose-diamonds">
        <Header />
        <h1 className="loose-diamond-title">Loose Diamonds</h1>
        <h2 className="loose-diamond-subtitle">These diamonds have no home yet. Consider fulfilling one below!</h2>
        {this.renderGrid()}
      </div>
    )
  }
}

export default LooseDiamonds;