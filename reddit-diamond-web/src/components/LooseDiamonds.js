import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Header from './Header';
import Fire from '../config/Fire'
import LooseDiamond from './LooseDiamond'
import '../styles/loosediamonds.css';

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
  }

  renderGrid() {
    var i = 1
    var grid = []
    var row = []
    Object.keys(this.state.diamonds).map((diamondKey, index) => {
      row.push(<Col lg={3} sm={6} xs={12}><LooseDiamond key={diamondKey} code={diamondKey} data={this.state.diamonds[diamondKey]} /></Col>)
      if (i % 4 == 0) {
        grid.push(row);
        row = []
      }
      i++;
    })
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
        <h2 className="loose-diamond-subtitle">These diamonds have yet to be completed, consider fulfilling one yourself!</h2>
        {this.renderGrid()}
      </div>
    )
  }
}

export default LooseDiamonds;