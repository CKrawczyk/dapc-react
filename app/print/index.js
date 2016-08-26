import './print.css';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Col, Row} from 'react-bootstrap';

const Box = (props) => {
  const value = props.value || '\u00a0';
  return (
    <Col xs={props.xs}>
      <div className="box">
        <Row>
          <Col xs={12}>
            <div className="box__title">
              {props.title}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="box__value">
              {value}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

const BoxSide = (props) => {
  const value = props.value || '\u00a0';
  return (
    <Col xs={props.xs}>
      <div className="box_side">
        <Row>
          <Col xs={12}>
            <span className="box_side__title">
              {props.title}
            </span>
            <span className="box_side__value">
              {value}
            </span>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {...JSON.parse(window.localStorage.dapcQuickSave)};
  }

  render() {
    return (
      <page size="A4">
        <div className="container-fluid root">
          <Row className="row__main">
            <Col xs={5}>
              Dragon Age
            </Col>
            <Box xs={3} title="Class" value={this.state.info.class} />
            <Box xs={2} title="Level" value={this.state.info.level} />
            <Box xs={2} title="XP" vlaue={this.state.info.xp} />
          </Row>
          <Row className="row__main">
            <Col xs={5}>
              <Row>
                <BoxSide xs={12} title="Name" value={this.state.info.name} />
              </Row>
              <Row className="row__inner">
                <BoxSide xs={12} title="Background" value={this.state.info.backgorund} />
              </Row>
              <Row className="row__inner">
                <BoxSide xs={12} title="Age" value={this.state.info.age} />
              </Row>
              <Row className="row__inner">
                <BoxSide xs={12} title="Gender" value={this.state.info.gender} />
              </Row>
            </Col>
          </Row>
        </div>
      </page>
    );
  }
}

render(<Print />, document.getElementById('root'));
