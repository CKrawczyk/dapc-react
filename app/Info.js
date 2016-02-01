import React, {Component} from 'react';
import Select from 'react-select';
import {Col, Row, Input} from 'react-bootstrap';

const GENDER = [
  {value: '', label: '', state: 'gender'},
  {value: 'male', label: 'Male', state: 'gender'},
  {value: 'female', label: 'Female', state: 'gender'}
];

const RACE = [
  {value: '', label: '', state: 'race'},
  {value: 'human', label: 'Human', state: 'race'},
  {value: 'elf', label: 'Elf', state: 'race'},
  {value: 'dwarf', label: 'Dwarf', state: 'race'},
  {value: 'qunari', label: 'Qunari', state: 'race'}
];

const CLASS = [
  {value: '', label: '', state: 'class'},
  {value: 'mage', label: 'Mage', state: 'class'},
  {value: 'rogue', label: 'Rogue', state: 'class'},
  {value: 'warrior', label: 'Warrior', state: 'class'}
];

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      race: '',
      class: '',
      age: '',
      background: '',
      level: '',
      xp: ''
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

  handleSelectChange = (value) => {
    const newState = {};
    if (value) {
      newState[value.state] = value.value;
    } else {
      newState[value.state] = '';
    }
    this.setState(newState);
    if (value.state === 'class') {
      this.props.setClass(value.value);
    }
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={6} sm={3}>
            <Input
              type="text"
              addonBefore="Name"
              id="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6} sm={3} className="select-height">
            <div className="input-group">
              <span className="input-group-addon">Gender</span>
              <Select
                className="no-left-radius"
                placeholder=""
                value={this.state.gender}
                options={GENDER}
                onChange={this.handleSelectChange}
                clearable={false}
                disabled={!this.props.edit}
              />
            </div>
          </Col>
          <Col xs={6} sm={3} className="select-height">
            <div className="input-group">
              <span className="input-group-addon">Race</span>
              <Select
                className="no-left-radius"
                placeholder=""
                value={this.state.race}
                options={RACE}
                onChange={this.handleSelectChange}
                clearable={false}
                disabled={!this.props.edit}
              />
            </div>
          </Col>
          <Col xs={6} sm={3} className="select-height">
            <div className="input-group">
              <span className="input-group-addon">Class</span>
              <Select
                className="no-left-radius"
                placeholder=""
                value={this.state.class}
                options={CLASS}
                onChange={this.handleSelectChange}
                clearable={false}
                disabled={!this.props.edit}
              />
            </div>
          </Col>
          <Col xs={6} sm={3}>
            <Input
              type="text"
              addonBefore="Age"
              id="age"
              value={this.state.age}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6} sm={3}>
            <Input
              type="text"
              addonBefore="Back."
              id="background"
              value={this.state.background}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6} sm={3}>
            <Input
              type="number"
              min="1"
              addonBefore="Level"
              id="level"
              value={this.state.level}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6} sm={3}>
            <Input
              type="number"
              min="0"
              addonBefore="XP"
              id="xp"
              value={this.state.xp}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
