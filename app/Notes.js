import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {notes: ''};
  }

  getOutput = () => {
    return this.state.notes;
  };

  getInput = (input) => {
    this.setState({notes: input});
  };

  handleInputChange = (event) => {
    this.setState({notes: event.target.value});
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Notes</span>
          </Col>
          <Col xs={12}>
            <Input
              className="notes"
              type="textarea"
              rows="17"
              value={this.state.notes}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
