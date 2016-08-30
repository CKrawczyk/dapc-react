import './print.css';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Col, Row} from 'react-bootstrap';
import PowersList from '../lib/powers';
import TalentsList from '../lib/talents';
import SpecialsList from '../lib/specializations';
import SpellsCreation from '../lib/spells_creation';
import SpellsSpirit from '../lib/spells_spirit';
import SpellsPrimal from '../lib/spells_primal';
import SpellsEntropy from '../lib/spells_entropy';
import SpellsBlood from '../lib/spells_blood';
const logo = require('./Dragon_age_logo.png');

const spellLookUp = {
  blood: SpellsBlood,
  creation: SpellsCreation,
  spirit: SpellsSpirit,
  primal: SpellsPrimal,
  entropy: SpellsEntropy
};

export const powersLookUp = {};
for (const c of ['mage', 'rogue', 'warrior']) {
  for (const p of PowersList[c]) {
    powersLookUp[`${c} ${p.level}`] = p;
  }
}

const Box = (props) => {
  const mod = props.mod || '';
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
            <div className={`box__value${mod}`}>
              {props.value || '\u00a0'}
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
  let only = '';
  if (props.titles.length === 1) {
    only = '_only';
  }
  for (const idx in props.titles) {
    titles.push(
      <Col xs={props.xs[idx]} key={`title:${idx}`} className={`box_table__title${only}`}>
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
    <div className={`box box_table  ${props.className || ''}`}>
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
              {props.focus.join(', ').replace(/_/g, ' ') || '\u00a0'}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

const spellRow = (spell, school) => {
  const spellOut = (
    <div>
      <span className="bold">Name: </span>
      {spell.label},
      <span className="bold"> School: </span>
      {school},
      <span className="bold"> Spell Type: </span>
      {spell.info.type},
      <span className="bold"> Mana Cost: </span>
      {spell.info.cost},
      <span className="bold"> Casting Time: </span>
      {spell.info.time},
      <span className="bold"> Target Number: </span>
      {spell.info.tn},
      <span className="bold"> Test: </span>
      {spell.info.test},
      <span className="bold"> Requirement: </span>
      {spell.info.requirement}
      <br />
      <span className="bold">Description: </span>
      {spell.info.description}
    </div>
  );
  /* const info = (
    <div>
      {spell.info.description}
    </div>
  );*/
  return [spellOut];
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
        weaponGroups.push(group.replace(/_/g, ' '));
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
    const spells = [];
    for (const school in this.state.spells) {
      for (const section in this.state.spells[school]) {
        switch (section) {
          case 'basic':
            for (const idxSpell in this.state.spells[school][section]) {
              for (const jdxSpell in this.state.spells[school][section][idxSpell]) {
                if (this.state.spells[school][section][idxSpell][jdxSpell]) {
                  const spell = spellLookUp[school][section][idxSpell][jdxSpell];
                  spells.push(spellRow(spell, school));
                }
              }
            }
            break;
          case 'focus':
            for (const level in this.state.spells[school][section]) {
              for (const idxSpell in this.state.spells[school][section][level]) {
                if (this.state.spells[school][section][level][idxSpell]) {
                  const spell = spellLookUp[school][section][level][idxSpell];
                  spells.push(spellRow(spell, school));
                }
              }
            }
            break;
          case 'special':
            for (const sp in this.state.spells[school][section]) {
              for (const level in this.state.spells[school][section][sp]) {
                for (const idxSpell in this.state.spells[school][section][sp][level]) {
                  if (this.state.spells[school][section][sp][level][idxSpell]) {
                    const spell = spellLookUp[school][section][sp][level][idxSpell];
                    spells.push(spellRow(spell, school));
                  }
                }
              }
            }
            break;
          default:
            break;
        }
      }
    }
    let spellBox;
    if (spells.length > 0) {
      spellBox = (
        <BoxTable
          titles={['Spells']}
          xs={[12]}
          values={spells}
          mod="_left"
        />
      );
    }
    return (
      <div>
        <page size="A4">
          <div className="container-fluid root">
            <Row className="row__main">
              <Col xs={4}>
                <img src={logo} role="presentation" />
              </Col>
              <Box xs={3} title="Class" value={this.state.info.class} />
              <Box xs={2} title="Level" value={this.state.info.level} />
              <Box xs={3} title="XP" value={this.state.info.xp} />
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
              <Col xs={5}>
                <BoxTable
                  titles={['Gold', 'Silver', 'Copper']}
                  xs={[4, 4, 4]}
                  values={[[
                    this.state.money.gold,
                    this.state.money.silver,
                    this.state.money.copper
                  ]]}
                  className="inner_space"
                />
              </Col>
            </Row>
            <Row className="row__main">
              <Col xs={4}>
                {stats}
              </Col>
              <Col xs={8}>
                <Row>
                  <BoxSide
                    xs={12}
                    title="Spoken Languages"
                    value={this.state.language.languages_spoken.join(', ').replace(/_/g, ' ')}
                  />
                </Row>
                <Row className="row__inner">
                  <BoxSide
                    xs={12}
                    title="Written Languages"
                    value={this.state.language.languages_written.join(', ').replace(/_/g, ' ')}
                  />
                </Row>
                <Row className="row__main">
                  <BoxSide xs={12} title="Weapon Groups" value={weaponGroups.join(', ')} />
                </Row>
                <Row className="row__inner">
                  <Col xs={12}>
                    <BoxTable
                      titles={['Weapon', 'Attack Roll', 'Damage', 'Short', 'Long']}
                      xs={[3, 3, 2, 2, 2]}
                      values={weapons}
                    />
                  </Col>
                </Row>
                <Row className="row__main">
                  <Box xs={12} title="Equipment" value={this.state.equipment} mod="_left" />
                </Row>
                <Row className="row__inner">
                  <Box xs={12} title="Notes" value={this.state.notes} mod="_left" />
                </Row>
              </Col>
            </Row>
            <Row className="row__main">
              <Col xs={12}>
                <BoxTable
                  titles={['Class Power', 'Info']}
                  xs={[3, 9]}
                  values={classPowers}
                  mod="_left"
                />
              </Col>
            </Row>
            <Row className="row__main">
              <Col xs={12}>
                <BoxTable
                  titles={['Talent/Specialization', 'Info']}
                  xs={[3, 9]}
                  values={talents}
                  mod="_left"
                />
              </Col>
            </Row>
            <Row className="row__main">
              <Col xs={12}>
                {spellBox}
              </Col>
            </Row>
          </div>
        </page>
      </div>
    );
  }
}

render(<Print />, document.getElementById('root'));
