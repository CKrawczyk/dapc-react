import React, {Component} from 'react';
import {Col, Row, Button, Input} from 'react-bootstrap';
import '../css/weapons.css';
import '../css/health.css';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const button = <Button bsSize="xsmall" block={true}>+</Button>;
    let multi = undefined;
    if (this.props.multi) {
      multi = <input type="checkbox">Multi</input>;
    }
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">{this.props.type}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="no-right-pad">
            <b>Name</b>
          </Col>
          <Col xs={1} className="no-right-pad no-left-pad">
            <b>Def.</b>
          </Col>
          <Col xs={1} className="no-right-pad no-left-pad">
            <b>Arm.</b>
          </Col>
          <Col xs={1} className="no-right-pad no-left-pad">
            <b>Sp.</b>
          </Col>
          <Col xs={2} className="no-right-pad no-left-pad">
            <b>Init</b>
          </Col>
          <Col xs={3} className="no-left-pad">
            <Input addonBefore={multi} bsSize="xsmall" wrapperClassName="input-group-xs">
              {button}
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}
