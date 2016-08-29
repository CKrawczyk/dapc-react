import './print.css';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Col, Row} from 'react-bootstrap';
import PowersList from '../lib/powers';
import TalentsList from '../lib/talents';
import SpecialsList from '../lib/specializations';

export const powersLookUp = {};
for (const c of ['mage', 'rogue', 'warrior']) {
  for (const p of PowersList[c]) {
    powersLookUp[`${c} ${p.level}`] = p;
  }
}

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
  const mod = props.mod || '';
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
  }
  for (const jdx in props.values) {
    const r = [];
    for (const idx in props.values[jdx]) {
      r.push(
        <Col xs={props.xs[idx]} key={`value:${idx}`} className={`box_table__title${mod}`}>
          <div className="box__value">
            {props.values[jdx][idx] || '\u00a0'}
          </div>
        </Col>
      );
    }
    let hr;
    if (jdx > 0) {
      hr = (
        <Col xs={12}>
          <hr />
        </Col>);
    }
    values.push(<Row key={`row:${jdx}`}>{hr}{r}</Row>);
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
      {values}
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

const njmLookup = {
  n: 'novice',
  j: 'journeyman',
  m: 'master'
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
      stats.push(
        <Row key={stat} className="row__inner">
          <StatBox xs={12} title={stat} {...this.state.stats[stat]} />
        </Row>
      );
      idx++;
    }
    const classPowers = [];
    for (const power in this.state.potasp.class_powers) {
      if (this.state.potasp.class_powers[power]) {
        const pow = powersLookUp[power];
        classPowers.push([pow.label, pow.info]);
      }
    }
    const weaponGroups = [];
    for (const group in this.state.weapon_groups) {
      if (this.state.weapon_groups[group]) {
        weaponGroups.push(group.replace('_', ' '));
      }
    }
    const weapons = [];
    for (const weapon of this.state.weapons) {
      weapons.push([
        weapon.weapon,
        weapon.attack,
        weapon.damage,
        weapon.range_min,
        weapon.range_max
      ]);
    }
    const talents = [];
    for (const talent in this.state.potasp.talents) {
      let t = '';
      for (const level of ['n', 'j', 'm']) {
        if (this.state.potasp.talents[talent][level]) {
          if (level !== 'n') {
            t += '\n';
          }
          t += `${njmLookup[level]}: ${TalentsList[talent][njmLookup[level]]}`;
        }
      }
      if (t) {
        const out = t.split('\n').map((item, jdx) => {
          const value = item.split(':');
          return (
            <span key={`${TalentsList[talent].label}:${jdx}`}>
              <span className="bold">{value[0]}: </span>
              {value[1]}
              <br />
            </span>
          );
        });
        talents.push([TalentsList[talent].label, out]);
      }
    }
    for (const talent in this.state.potasp.specializations) {
      let t = '';
      for (const level of ['n', 'j', 'm']) {
        if (this.state.potasp.specializations[talent][level]) {
          if (level !== 'n') {
            t += '\n';
          }
          t += `${njmLookup[level]}: ${SpecialsList[talent][njmLookup[level]]}`;
        }
      }
      if (t) {
        const out = t.split('\n').map((item, jdx) => {
          const value = item.split(':');
          return (
            <span key={`${SpecialsList[talent].label}:${jdx}`}>
              <span className="bold">{value[0]}: </span>
              {value[1]}
              <br />
            </span>
          );
        });
        talents.push([SpecialsList[talent].label, out]);
      }
    }
    return (
      <div>
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
              </Col>
              <Col xs={3}>
                <BoxTable
                  titles={['Health', 'Mana']}
                  xs={[6, 6]}
                  values={[[this.state.health.max_health, this.state.health.max_mana]]}
                  blank={true}
                />
              </Col>
              <Col xs={5}>
                <BoxTable
                  titles={['Speed', 'Defense', 'Armor', 'Penalty']}
                  xs={[3, 3, 3, 3]}
                  values={[[
                    this.state.utility.speed,
                    this.state.utility.defense,
                    this.state.utility.armor,
                    this.state.utility.ap
                  ]]}
                />
              </Col>
            </Row>
            <Row className="row__main">
              <Col xs={4}>
                {stats}
              </Col>
              <Col xs={8}>
                <BoxTable
                  titles={['Class Power', 'Info']}
                  xs={[3, 9]}
                  values={classPowers}
                  mod="_left"
                />
              </Col>
            </Row>
            <Row className="row__main">
              <BoxSide xs={12} title="Weapon Groups" value={weaponGroups.join(', ')} />
            </Row>
            <Row className="row__inner">
              <Col xs={12}>
                <BoxTable
                  titles={['Weapon', 'Attack Roll', 'Damage', 'Short Range', 'Long Range']}
                  xs={[3, 3, 2, 2, 2]}
                  values={weapons}
                />
              </Col>
            </Row>
          </div>
        </page>
        <page>
          <Row>
            <Col xs={12}>
              <Col xs={12}>
                <BoxTable
                  titles={['Talent', 'Info']}
                  xs={[2, 10]}
                  values={talents}
                  mod="_left"
                />
              </Col>
            </Col>
          </Row>
        </page>
      </div>
    );
  }
}

render(<Print />, document.getElementById('root'));
