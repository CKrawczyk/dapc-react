import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';

export default class Utility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defense: '',
      armor: '',
      speed: '',
      ap: ''
    };
  }

  getOutput = () => {
    return {...this.state};
  };

  getInput = (input) => {
    this.setState({...input});
  };

  handleInputChange = (event) => {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="Defense"
              id="defense"
              value={this.state.defense}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="Armor"
              id="armor"
              value={this.state.armor}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="Speed"
              id="speed"
              value={this.state.speed}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="AP"
              id="ap"
              value={this.state.ap}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
        </Row>
    </div>
    );
  }
}
