import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';
import Groups from './lib/weaponGroups';
import '../css/weaponGroups.css';

export default class WeaponsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    for (const g of Groups) {
      this.state[g.id] = false;
    }
  }

  getOutput = () => {
    return {...this.state};
  };

  getInput = (input) => {
    this.setState({...input});
  };

  handleCheckbox = (event) => {
    const currentState = this.state;
    currentState[event.target.id] = event.target.checked;
    this.setState(currentState);
  };

  makeCheckboxes = () => {
    const boxes = [];
    let i = 0;
    for (const g of Groups) {
      const box = (
        <Col xs={g.size} xsOffset={g.skip} key={`wgc_${i}`}>
          <Input
            type="checkbox"
            label={g.label}
            id={g.id}
            key={`wg_${i}`}
            checked={this.state[g.id]}
            onClick={this.handleCheckbox}
            disabled={!this.props.edit}
          />
      </Col>
      );
      boxes.push(box);
      i++;
    }
    return boxes;
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12} key={'wgc_0'}>
            <span className="heading" key={'wg_0'}>Weapon Groups</span>
          </Col>
          {this.makeCheckboxes()}
        </Row>
      </div>
    );
  }
}
