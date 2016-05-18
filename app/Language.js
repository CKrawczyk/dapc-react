import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import Select from 'react-select';
import LanguageList from './lib/languages';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Language extends Component {
  constructor(props) {
    super(props);
    const languageList = [];
    for (const l of LanguageList) {
      languageList.push({value: l.toLowerCase().split(' ').join('_'), label: l});
    }
    this.state = {
      languageList
    };
  }

  handleSpokenChange = (value) => {
    const valueList = [];
    for (const f of value) {
      valueList.push(f.value);
    }
    this.props.setLanguage({id: 'languages_spoken', value: valueList});
  };

  handleWrittenChange = (value) => {
    const valueList = [];
    for (const f of value) {
      valueList.push(f.value);
    }
    this.props.setLanguage({id: 'languages_written', value: valueList});
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
              value={this.props.language.languages_spoken}
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
              value={this.props.language.languages_written}
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

function mapStateToProps(state) {
  return {language: state.language};
}

function mapDispatchToProps(dispatch) {
  return {setLanguage: bindActionCreators(actions.setLanguage, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Language);
