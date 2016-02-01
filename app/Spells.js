import React, {Component} from 'react';
import {Col, Row, Button, OverlayTrigger, Popover, Tab, Tabs} from 'react-bootstrap';
import {CheckModal, ActiveBlock} from './CheckModal';
import SpellsCreation from './lib/spells_creation';
import SpellsSpirit from './lib/spells_spirit';
import SpellsPrimal from './lib/spells_primal';
import SpellsEntropy from './lib/spells_entropy';
import SpellsBlood from './lib/spells_blood';
import '../css/spells.css';

const spellLookUp = {
  blood: SpellsBlood,
  creation: SpellsCreation,
  spirit: SpellsSpirit,
  primal: SpellsPrimal,
  entropy: SpellsEntropy
};

class SpellModal extends CheckModal {
  modalBlockList = () => {
    return (
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title="Creation">
          <SpellPage
            spellSchool={SpellsCreation}
            label="Creation"
            name="creation"
            titleCase={this.titleCase}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.creation}
          />
        </Tab>
        <Tab eventKey={2} title="Entropy">
          <SpellPage
            spellSchool={SpellsEntropy}
            label="Entropy"
            name="entropy"
            titleCase={this.titleCase}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.entropy}
          />
        </Tab>
        <Tab eventKey={3} title="Primal">
          <SpellPage
            spellSchool={SpellsPrimal}
            label="Primal"
            name="primal"
            titleCase={this.titleCase}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.primal}
          />
        </Tab>
        <Tab eventKey={4} title="Spirit">
          <SpellPage
            spellSchool={SpellsSpirit}
            label="Spirit"
            name="spirit"
            titleCase={this.titleCase}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.spirit}
          />
        </Tab>
        <Tab eventKey={5} title="Blood">
          <SpellPage
            spellSchool={SpellsBlood}
            label="Blood"
            name="blood"
            titleCase={this.titleCase}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.blood}
          />
        </Tab>
      </Tabs>
    );
  };
}

class SpellPage extends Component {
  render() {
    const special = [];
    let idx = 0;
    for (const s in this.props.spellSchool.special) {
      special.push(
        <GroupSpells
          label={this.props.titleCase(s)}
          idx={`special, ${s}`}
          group={this.props.spellSchool.special[s]}
          type="Specialization"
          key={idx}
          onCheckbox={this.props.onCheckbox}
          name={this.props.name}
          checked={this.props.checked.special[s]}
        />
      );
      idx++;
    }
    let focus = (
      <GroupSpells
        label={this.props.label}
        idx={`focus`}
        group={this.props.spellSchool.focus}
        type="Focus"
        onCheckbox={this.props.onCheckbox}
        name={this.props.name}
        checked={this.props.checked.focus}
      />
    );
    if (this.props.name === 'blood') {
      focus = undefined;
    }
    return (
      <div>
        <SpellHeading name={this.props.name} />
        <BasicSpells
          basic={this.props.spellSchool.basic}
          onCheckbox={this.props.onCheckbox}
          name={this.props.name}
          checked={this.props.checked.basic}
        />
        {focus}
        {special}
      </div>
    );
  }
}

class SpellHeading extends Component {
  render() {
    if (this.props.name === 'blood') {
      return (
        <Row>
          <Col xs={12}>
            <sapn className="heading">Blood Magic Specialization</sapn>
          </Col>
          <Col xs={2} xsOffset={3}>
            <span className="heading">Novice</span>
          </Col>
          <Col xs={2} xsOffset={1}>
            <span className="heading">Journeyman</span>
          </Col>
          <Col xs={2} xsOffset={1}>
            <span className="heading">Master</span>
          </Col>
        </Row>
      );
    }
    return (
      <Row>
        <Col xs={2}>
          <div className="center">
            I
          </div>
        </Col>
        <Col xs={2} xsOffset={1}>
          <div className="center">
            II
          </div>
        </Col>
        <Col xs={2} xsOffset={1}>
          <div className="center">
            III
          </div>
        </Col>
        <Col xs={2} xsOffset={1}>
          <div className="center">
            IV
          </div>
        </Col>
        <Col xs={12}>
          <hr />
        </Col>
      </Row>
    );
  }
}

class BasicSpells extends Component {
  render() {
    const rows = [];
    let idx = 0;
    for (const spells of this.props.basic) {
      rows.push(
        <SpellRow
          spells={spells}
          key={idx}
          idx={`basic, ${idx}`}
          name={this.props.name}
          onCheckbox={this.props.onCheckbox}
          checked={this.props.checked[idx]}
        />
      );
      idx++;
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

class SpellRow extends Component {
  render() {
    const spells = [];
    let idx = 0;
    let jdx = 0;
    for (const s of this.props.spells) {
      if (Object.keys(s).length > 0) {
        spells.push(
          <SpellItem
            width={2}
            spell={s}
            key={idx}
            idx={`${this.props.idx}, ${idx}`}
            onCheckbox={this.props.onCheckbox}
            name={this.props.name}
            checked={this.props.checked[idx]}
          />
        );
        idx++;
        if (s.next.length > 0) {
          spells.push(<Arrow key={`${idx}_arrow`} width={1} type={s.next} />);
        } else {
          spells.push(<Col xs={1} className="blank" key={`${idx}_arrow`} />);
        }
      } else {
        spells.push(<Col xs={3} className="blank" key={`${jdx}_blank`} />);
        jdx++;
      }
    }
    let hr = (
      <Col xs={12}>
        <hr />
      </Col>
    );
    if (this.props.name === 'blood') {
      hr = undefined;
    }
    return (
      <Row>
        {spells}
        {hr}
      </Row>
    );
  }
}

class Arrow extends Component {
  arrowTypes = {
    right: '',
    upRight: '315',
    downRight: '45',
    down: '90'
  };

  render() {
    const arrows = [];
    const num = this.props.type.length;
    for (const a of this.props.type) {
      let className = 'fa fa-long-arrow-right';
      if (this.arrowTypes[a]) {
        className += ` fa-rotate-${this.arrowTypes[a]}`;
      }
      if (a === 'right' & num === 2) {
        className += ' lower';
      }
      arrows.push(<i className={className} key={a}></i>);
    }
    return (
      <Col xs={this.props.width} className="no-left-pad no-right-pad">
        <div className="center arrow">
          {arrows}
        </div>
      </Col>
    );
  }
}

const spellInfo = (item) => {
  return (
    <Popover id={`${item.label} Information`} title={`${item.label} Information`} className="spell-popover">
      <Row>
        <Col xs={12}>
          <b>Spell Type:</b> {item.info.type}
        </Col>
        <Col xs={12}>
          <b>Mana Cost:</b> {item.info.cost}
        </Col>
        <Col xs={12}>
          <b>Casting Time:</b> {item.info.time}
        </Col>
        <Col xs={12}>
          <b>Target Number:</b> {item.info.tn}
        </Col>
        <Col xs={12}>
          <b>Test:</b> {item.info.test}
        </Col>
        <Col xs={12}>
          <b>Requirement:</b> {item.info.requirement}
        </Col>
        <Col xs={12}>
          <hr />
        </Col>
        <Col xs={12}>
          {item.info.description}
        </Col>
      </Row>
    </Popover>
  );
};

class SpellItem extends Component {
  doNothing = () => {
    return false;
  };

  render() {
    const src = require(`./lib/spell_icons/${this.props.spell.icon}`);
    return (
      <Col xs={this.props.width} className="spell-check">
        <div className="center">
          <img src={src} />
        </div>
        <OverlayTrigger trigger="click" placement="left" overlay={spellInfo(this.props.spell)}>
          <Button className="spell-name no-left-pad no-right-pad">{this.props.spell.label}</Button>
        </OverlayTrigger>
        <div className="center">
          <input
            type="checkbox"
            id={this.props.idx}
            name={this.props.name}
            checked={this.props.checked}
            onClick={this.props.onCheckbox}
            onChange={this.doNothing}
          />
        </div>
      </Col>
    );
  }
}

class GroupSpells extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <sapn className="heading">{this.props.label} {this.props.type}</sapn>
          </Col>
          <Col xs={2} xsOffset={3}>
            <span className="heading">Novice</span>
          </Col>
          <Col xs={2} xsOffset={1}>
            <span className="heading">Journeyman</span>
          </Col>
          <Col xs={2} xsOffset={1}>
            <span className="heading">Master</span>
          </Col>
          <SpellCol
            spells={this.props.group.novice}
            idx={`${this.props.idx}, novice`}
            name={this.props.name}
            offset={3}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.novice}
          />
          <SpellCol
            spells={this.props.group.journeyman}
            idx={`${this.props.idx}, journeyman`}
            name={this.props.name}
            offset={1}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.journeyman}
          />
          <SpellCol
            spells={this.props.group.master}
            idx={`${this.props.idx}, master`}
            name={this.props.name}
            offset={1}
            onCheckbox={this.props.onCheckbox}
            checked={this.props.checked.master}
          />
          <Col xs={12}>
            <hr />
          </Col>
        </Row>
      </div>
    );
  }
}

class SpellCol extends Component {
  render() {
    const col = [];
    let idx = 0;
    for (const s of this.props.spells) {
      col.push(
        <SpellItem
          spell={s}
          width={12}
          key={idx}
          idx={`${this.props.idx}, ${idx}`}
          name={this.props.name}
          onCheckbox={this.props.onCheckbox}
          checked={this.props.checked[idx]}
        />
      );
      idx++;
      if (s.next.length > 0) {
        col.push(<Arrow type={s.next} width={12} key={`${idx}_arrow`} />);
      }
    }
    return (
      <Col xs={2} xsOffset={this.props.offset}>
        <Row>
          {col}
        </Row>
      </Col>
    );
  }
}

class ActiveSpell extends ActiveBlock {
  render() {
    return (
      <Row className={this.getClassName()}>
        <Col xs={6} className="no-left-pad">
          <OverlayTrigger trigger="click" placement="left" overlay={spellInfo(this.props.spell)}>
            <Button className="no-left-pad no-right-pad" bsSize="xsmall" block={true}>
              {this.props.spell.label}
            </Button>
          </OverlayTrigger>
        </Col>
        <Col xs={2} className="no-left-pad no-right-pad">
          {this.props.school}
        </Col>
        <Col xs={2}>
          {this.props.spell.info.tn}
        </Col>
        <Col xs={2} className="no-left-pad no-right-pad">
          {this.props.spell.info.cost}
        </Col>
      </Row>
    );
  }
}

export default class Spells extends Component {
  constructor(props) {
    super(props);
    const creation = this.blankState(SpellsCreation);
    const entropy = this.blankState(SpellsEntropy);
    const primal = this.blankState(SpellsPrimal);
    const spirit = this.blankState(SpellsSpirit);
    const blood = this.blankState(SpellsBlood);
    this.state = {
      creation,
      entropy,
      primal,
      spirit,
      blood
    };
  }

  onCheckbox = (event) => {
    const id = event.target.id.split(', ');
    let currentState = [];
    switch (id[0]) {
      case 'basic':
        currentState = [...this.state[event.target.name].basic];
        currentState[id[1]][id[2]] = event.target.checked;
        this.setState({[event.target.name]: {...this.state[event.target.name], basic: currentState}});
        break;
      case 'focus':
        currentState = [...this.state[event.target.name].focus[id[1]]];
        currentState[id[2]] = event.target.checked;
        this.setState(
          {
            [event.target.name]: {
              ...this.state[event.target.name],
              focus: {
                ...this.state[event.target.name].focus,
                [id[1]]: currentState
              }
            }
          }
        );
        break;
      case 'special':
        currentState = [...this.state[event.target.name].special[id[1]][id[2]]];
        currentState[id[3]] = event.target.checked;
        this.setState(
          {
            [event.target.name]: {
              ...this.state[event.target.name],
              special: {
                ...this.state[event.target.name].special,
                [id[1]]: {
                  ...this.state[event.target.name].special[id[1]],
                  [id[2]]: currentState
                }
              }
            }
          }
        );
        break;
      default:
        break;
    }
  };

  getOutput = () => {
    return {...this.state};
  };

  getInput = (input) => {
    this.setState({...input});
  };

  falseArray = (length) => {
    const tmp = Array.apply(null, Array(length));
    for (const idx in tmp) {
      tmp[idx] = false;
    }
    return tmp;
  };

  blankState = (spellSchool) => {
    const blank = {
      basic: [],
      focus: {},
      special: {}
    };
    for (const row of spellSchool.basic) {
      blank.basic.push(this.falseArray(row.length));
    }
    for (const level in spellSchool.focus) {
      blank.focus[level] = this.falseArray(spellSchool.focus[level].length);
    }
    for (const special in spellSchool.special) {
      blank.special[special] = {};
      for (const level in spellSchool.special[special]) {
        blank.special[special][level] = this.falseArray(spellSchool.special[special][level].length);
      }
    }
    return blank;
  };

  openModal = () => {
    this.refs.spell_modal.openModal();
  };

  activeList = () => {
    const active = [];
    let adx = 0;
    for (const school in this.state) {
      for (const section in this.state[school]) {
        switch (section) {
          case 'basic':
            for (const idx in this.state[school][section]) {
              for (const jdx in this.state[school][section][idx]) {
                if (this.state[school][section][idx][jdx]) {
                  let spell = spellLookUp[school][section][idx][jdx];
                  if (Object.keys(spell).length === 0) {
                    // odd bug, not sure why an idex gets skipped in state
                    spell = spellLookUp[school][section][idx][parseInt(jdx, 10) + 1];
                  }
                  active.push(<ActiveSpell spell={spell} idx={adx} key={adx} school={school} />);
                  adx++;
                }
              }
            }
            break;
          case 'focus':
            for (const level in this.state[school][section]) {
              for (const idx in this.state[school][section][level]) {
                if (this.state[school][section][level][idx]) {
                  const spell = spellLookUp[school][section][level][idx];
                  active.push(<ActiveSpell spell={spell} idx={adx} key={adx} school={school} />);
                  adx++;
                }
              }
            }
            break;
          case 'special':
            for (const sp in this.state[school][section]) {
              for (const level in this.state[school][section][sp]) {
                for (const idx in this.state[school][section][sp][level]) {
                  if (this.state[school][section][sp][level][idx]) {
                    const spell = spellLookUp[school][section][sp][level][idx];
                    active.push(<ActiveSpell spell={spell} idx={adx} key={adx} school={school} />);
                    adx++;
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
    return active;
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Spells</span>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            Spell
          </Col>
          <Col xs={2} className="no-left-pad no-right-pad">
            School
          </Col>
          <Col xs={2}>
            TN
          </Col>
          <Col xs={2} className="no-left-pad no-right-pad">
            Cost
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
        </Row>
        {this.activeList()}
        <Row>
          <Col xs={12}>
            <Button id="taletns" block={true} onClick={this.openModal} disabled={!this.props.edit}>
              Edit Spells
            </Button>
          </Col>
        </Row>
        <SpellModal ref="spell_modal" label="Spells" onCheckbox={this.onCheckbox} checked={this.state} />
      </div>
    );
  }
}
