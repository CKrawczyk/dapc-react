import 'react-select/dist/react-select.css';
import '../css/stat.css';
import React, {Component} from 'react';
import Select from 'react-select';
import {Col, Row, Input} from 'react-bootstrap';

export default class StatBlock extends Component {
  constructor(props) {
    super(props);
    const focus = [];
    for (const f of this.props.focusList) {
      focus.push({value: f.toLowerCase().split(' ').join('_'), label: f});
    }
    // this.state = {focusValue: [], statValue: 0, focus};
    this.state = {focus};
  }

  selectText = (event) => {
    event.target.select();
  };

  handleSelectChange = (value) => {
    const valueList = [];
    for (const f of value) {
      valueList.push(f.value);
    }
    this.props.updateFocus(this.props.name, valueList);
  };

  handleInputChange = (event) => {
    this.props.updateValue(this.props.name, event.target.value);
  };

  handleNewFocus = (f) => {
    console.log(f);
    return {value: f.toLowerCase().split(' ').join('_'), label: f};
  };

  render() {
    const innerCheckbox = <input type="checkbox" disabled={true} checked={this.props.statValues.primary} />;
    return (
      <div className="statBlock">
        <Row>
          <Col xs={8} className="statName">{this.props.name}</Col>
          <Col xs={4}>
            <Input
              type="number"
              value={this.props.statValues.value}
              onChange={this.handleInputChange}
              onFocus={this.selectText}
              disabled={!this.props.edit}
              addonBefore={innerCheckbox}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Select
              value={this.props.statValues.focus}
              multi={true}
              allowCreate={true}
              clearable={false}
              newOptionCreator={this.handleNewFocus}
              placeholder=""
              options={this.state.focus}
              onChange={this.handleSelectChange}
              disabled={!this.props.edit}
            />
          </Col>
        </Row>
    </div>
    );
  }
}

StatBlock.defaultProps = {
  name: 'Test',
  focusList: ['One Test', 'Two']};
