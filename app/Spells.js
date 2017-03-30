import React, {Component} from 'react';
import {Col, Row, Button, OverlayTrigger, Popover, Tab, Tabs, Collapse} from 'react-bootstrap';
import {CheckModal, ActiveBlock} from './CheckModal';
import SpellsCreation from './lib/spells_creation';
import SpellsSpirit from './lib/spells_spirit';
import SpellsPrimal from './lib/spells_primal';
import SpellsEntropy from './lib/spells_entropy';
import SpellsBlood from './lib/spells_blood';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
            idx={`${this.props.idx}, ${jdx}`}
            onCheckbox={this.props.onCheckbox}
            name={this.props.name}
            checked={this.props.checked[jdx]}
          />
        );
        idx++;
        jdx++;
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
    <Popover id={`${item.label} Information`} title={`${item.label} Information`} className="talent-popover">
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
        <OverlayTrigger trigger="click" rootClose={true} placement="right" overlay={spellInfo(this.props.spell)}>
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
          <OverlayTrigger trigger="click" rootClose={true} placement="left" overlay={spellInfo(this.props.spell)}>
            <Button className="no-left-pad no-right-pad" bsSize="small" block={true}>
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

export class SpellsStandAlone extends Component {
  onCheckbox = (event) => {
    this.props.setSpell({idx: event.target.name, id: event.target.id.split(', '), value: event.target.checked});
  };

  openModal = () => {
    this.refs.spell_modal.openModal();
  };

  activeList = () => {
    const active = [];
    let adx = 0;
    for (const school in this.props.spells) {
      for (const section in this.props.spells[school]) {
        switch (section) {
          case 'basic':
            for (const idx in this.props.spells[school][section]) {
              for (const jdx in this.props.spells[school][section][idx]) {
                if (this.props.spells[school][section][idx][jdx]) {
                  const spell = spellLookUp[school][section][idx][jdx];
                  active.push(<ActiveSpell spell={spell} idx={adx} key={adx} school={school} />);
                  adx++;
                }
              }
            }
            break;
          case 'focus':
            for (const level in this.props.spells[school][section]) {
              for (const idx in this.props.spells[school][section][level]) {
                if (this.props.spells[school][section][level][idx]) {
                  const spell = spellLookUp[school][section][level][idx];
                  active.push(<ActiveSpell spell={spell} idx={adx} key={adx} school={school} />);
                  adx++;
                }
              }
            }
            break;
          case 'special':
            for (const sp in this.props.spells[school][section]) {
              for (const level in this.props.spells[school][section][sp]) {
                for (const idx in this.props.spells[school][section][sp][level]) {
                  if (this.props.spells[school][section][sp][level][idx]) {
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
    let className = '';
    let heading = undefined;
    let editButton = undefined;
    let spellModal = undefined;
    let line = undefined;
    const active = this.activeList();
    let activeDiv = undefined;
    if (!this.props.overview) {
      className = 'box';
      heading = (
        <Row>
          <Col xs={12}>
            <span className="heading">Spells</span>
          </Col>
        </Row>
      );
      editButton = (
        <Row>
          <Col xs={12}>
            <Button id="taletns" block={true} onClick={this.openModal} disabled={!this.props.edit}>
              Edit Spells
            </Button>
          </Col>
        </Row>
      );
      spellModal = (
        <SpellModal
          ref="spell_modal"
          label="Spells"
          onCheckbox={this.onCheckbox}
          checked={this.props.spells}
        />
      );
      activeDiv = active;
      line = (
        <Col xs={12}>
          <hr />
        </Col>
      );
    } else {
      activeDiv = (
        <Collapse in={this.props.open} timeout={0}>
          <div>
            <Col xs={12} className="no-left-pad no-right-pad">
              <hr className="thin" />
            </Col>
            {active}
          </div>
        </Collapse>
      );
    }
    return (
      <div className={className}>
        {heading}
        <Row>
          <Col xs={6}>
            {this.props.expand}
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
          {line}
        </Row>
        {activeDiv}
        {editButton}
        {spellModal}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {spells: state.spells};
}

function mapDispatchToProps(dispatch) {
  return {setSpell: bindActionCreators(actions.setSpell, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellsStandAlone);
