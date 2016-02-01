import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import Select from 'react-select';
import LanguageList from './lib/languages';

export default class Language extends Component {
  constructor(props) {
    super(props);
    const languageList = [];
    for (const l of LanguageList) {
      languageList.push({value: l.toLowerCase().split(' ').join('_'), label: l});
    }
    this.state = {
      languageList,
      languages_spoken: [],
      languages_written: []
    };
  }

  getOutput = () => {
    const output = {...this.state};
    delete output.languageList;
    return output;
  };

  getInput = (input) => {
    this.setState({...input});
  };

  handleSpokenChange = (value) => {
    const valueList = [];
    for (const f of value) {
      valueList.push(f.value);
    }
    this.setState({languages_spoken: valueList});
  };

  handleWrittenChange = (value) => {
    const valueList = [];
    for (const f of value) {
      valueList.push(f.value);
    }
    this.setState({languages_written: valueList});
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Spoken Languages</span>
          </Col>
          <Col xs={12}>
            <Select
              value={this.state.languages_spoken}
              multi={true}
              clearable={false}
              placeholder=""
              options={this.state.languageList}
              onChange={this.handleSpokenChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={12}>
            <span className="heading">Written Languages</span>
          </Col>
          <Col xs={12}>
            <Select
              value={this.state.languages_written}
              multi={true}
              clearable={false}
              placeholder=""
              options={this.state.languageList}
              onChange={this.handleWrittenChange}
              disabled={!this.props.edit}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
