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

const BoxTable = (props) => {
  const titles = [];
  const values = [];
  for (const idx in props.titles) {
    titles.push(
      <Col xs={props.xs[idx]} key={`title:${idx}`} className="box_table__title">
        <div className="box__title">
          {props.titles[idx]}
        </div>
      </Col>
    );
    values.push(
      <Col xs={props.xs[idx]} key={`value:${idx}`} className="box_table__title">
        <div className="box__value">
          {props.values[idx] || '\u00a0'}
        </div>
      </Col>
    );
  }
  let blank;
  if (props.blank) {
    blank = (
      <Row>
        <Col xs={12}>
          <div className="blank_lines" />
        </Col>
      </Row>
    );
  }
  return (
    <div className="box box_table">
      <Row>
        {titles}
      </Row>
      <Row>
        {values}
      </Row>
      {blank}
    </div>
  );
};

const StatBox = (props) => {
  let title = props.title;
  if (props.primary) {
    title += ' \u2713';
  }
  return (
    <Col xs={props.xs}>
      <div className="box box_stats">
        <Row>
          <Col xs={9} className="box_stats__title">
            <div className="box__title">
              {title}
            </div>
          </Col>
          <Col xs={3} className="box_stats__value">
            <div className="box__value">
              {props.value}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="box__focus">
              {props.focus.join(', ').replace('_', ' ') || '\u00a0'}
            </div>
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
    const stats = [];
    let idx = 0;
    for (const stat in this.state.stats) {
      let className = 'row__inner';
      if (idx === 0) {
        className = 'row__main';
      }
      stats.push(
        <Row key={stat} className={className}>
          <StatBox xs={12} title={stat} {...this.state.stats[stat]} />
        </Row>
      );
      idx++;
    }
    return (
      <page size="A4">
        <div className="container-fluid root">
          <Row className="row__main">
            <Col xs={4}>
              Dragon Age
            </Col>
            <Box xs={3} title="Class" value={this.state.info.class} />
            <Box xs={2} title="Level" value={this.state.info.level} />
            <Box xs={3} title="XP" vlaue={this.state.info.xp} />
          </Row>
          <Row className="row__main">
            <Col xs={4}>
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
              {stats}
            </Col>
            <Col xs={3}>
              <BoxTable
                titles={['Health', 'Mana']}
                xs={[6, 6]}
                values={[this.state.health.max_health, this.state.health.max_mana]}
                blank={true}
              />
            </Col>
            <Col xs={5}>
              <BoxTable
                titles={['Speed', 'Defense', 'Armor', 'Penalty']}
                xs={[3, 3, 3, 3]}
                values={[
                  this.state.utility.speed,
                  this.state.utility.defense,
                  this.state.utility.armor,
                  this.state.utility.ap
                ]}
              />
            </Col>
          </Row>
        </div>
      </page>
    );
  }
}

render(<Print />, document.getElementById('root'));
