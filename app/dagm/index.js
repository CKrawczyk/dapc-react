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

  render() {
    return (
      <div className="container-fluid root">
        <Row>
          <Col xs={3}>
            <Tracker />
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={6}>
                <List type="Players" />
              </Col>
              <Col xs={6}>
                <List type="Foes" multi={true} control={true} />
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
