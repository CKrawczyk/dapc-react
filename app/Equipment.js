import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';
import '../css/equipment.css';

export default class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {equipment: ''};
  }

  getOutput = () => {
    return this.state.equipment;
  };

  getInput = (input) => {
    this.setState({equipment: input});
  };

  handleInputChange = (event) => {
    this.setState({equipment: event.target.value});
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Equipment</span>
          </Col>
          <Col xs={12}>
            <Input
              className="equipment"
              type="textarea"
              rows="8"
              value={this.state.equipment}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
