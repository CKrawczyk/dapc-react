import '../../css/index.styl';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Col, Row} from 'react-bootstrap';
import List from './List';
import Tracker from './Tracker';

class DAGM extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInit = () => {
    let init = [];
    init = init.concat(this.refs.Players.getInit());
    init = init.concat(this.refs.Foes.getInit());
    return init;
  };

  render() {
    return (
      <div className="container-fluid root">
        <Row>
          <Col xs={3}>
            <Tracker getInit={this.getInit} />
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={6}>
                <List type="Players" ref="Players" />
              </Col>
              <Col xs={6}>
                <List type="Foes" ref="Foes" multi={true} control={true} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

render(
  <DAGM />,
  document.getElementById('root')
);
