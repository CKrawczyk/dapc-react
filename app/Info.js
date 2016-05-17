import React, {Component} from 'react';
import Select from 'react-select';
import {Col, Row, Input} from 'react-bootstrap';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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

class Info extends Component {
  handleInputChange = (event) => {
    this.props.setInfo({id: event.target.id, value: event.target.value});
  };

  handleSelectChange = (value) => {
    if (value) {
      this.props.setInfo({id: value.state, value: value.value});
    } else {
      this.props.setInfo({id: value.state, value: ''});
    }
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
              value={this.props.info.name}
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
                value={this.props.info.gender}
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
                value={this.props.info.race}
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
                value={this.props.info.class}
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
              value={this.props.info.age}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6} sm={3}>
            <Input
              type="text"
              addonBefore="Back."
              id="background"
              value={this.props.info.background}
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
              value={this.props.info.level}
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
              value={this.props.info.xp}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {info: state.info};
}

function mapDispatchToProps(dispatch) {
  return {setInfo: bindActionCreators(actions.setInfo, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
