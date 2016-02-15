import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';

export default class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Initiative Tracker</span>
          </Col>
        </Row>
      </div>
    );
  }
}
