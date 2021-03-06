import React, {Component} from 'react';
import {Col, Row, Input, OverlayTrigger, Tooltip, Collapse, Button, Popover, ButtonGroup} from 'react-bootstrap';
import {SpellsStandAlone} from '../Spells';
import {ActiveBlock} from '../CheckModal';
import {powersLookUp, powerInfo} from '../ClassPowers';
import {talentInfo} from '../Talents';
import TalentsList from '../lib/talents';
import SpecialList from '../lib/specializations';

class StatCircle extends Component {
  getFocus = () => {
    let focusList = this.props.focus.join(', ');
    focusList = focusList.replace('_', ' ');
    return (
      <Tooltip id={this.props.name}>{focusList}</Tooltip>
    );
  };

  render() {
    const focus = this.getFocus();
    return (
      <OverlayTrigger placement="top" overlay={focus}>
        <div className="stat-circle">
          <span className="stat-name">{this.props.name}</span>
          <br />
          <span className="stat-value">{this.props.value}</span>
        </div>
      </OverlayTrigger>
    );
  }
}

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current,
      max: this.props.max,
      adjust: '0'
    };
  }

  selectText = (event) => {
    event.target.select();
  };

  handleInputChange = (event) => {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  };

  handelPmButton = (event) => {
    const newState = {};
    const multiplier = parseInt(`${event.target.innerHTML}1`, 10);
    const currentValue = parseInt(this.state.current, 10);
    const adjustValue = parseInt(this.state.adjust, 10);
    const maxValue = parseInt(this.state.max, 10);
    let newValue = currentValue + (adjustValue * multiplier);
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    }
    newState.current = (newValue).toString(10);
    newState.adjust = '0';
    this.setState(newState);
    this.refs.popover.hide();
  };

  popover = () => {
    return (
      <Popover id={`Adjust ${this.props.type}`} title={`Adjust ${this.props.type}`}>
        <Row>
          <Col xs={12}>
            <Input
              type="number"
              id="adjust"
              min="0"
              max={this.state.max}
              value={this.state.adjust}
              onChange={this.handleInputChange}
              onFocus={this.selectText}
            />
          </Col>
          <Col xs={12}>
            <ButtonGroup justified={true}>
              <ButtonGroup>
                <Button onClick={this.handelPmButton} id={this.props.type}>+</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={this.handelPmButton} id={this.props.type}>-</Button>
              </ButtonGroup>
            </ButtonGroup>
          </Col>
        </Row>
      </Popover>
    );
  };

  render() {
    return (
      <div>
        <Col xs={4} xsOffset={1}>
          {this.props.type}
        </Col>
        <Col xs={2} className="no-right-pad no-left-pad">
          {`${this.state.current}/${this.state.max}`}
        </Col>
        <Col xs={2} className="no-right-pad no-left-pad">
          <OverlayTrigger
            trigger="click"
            rootClose={true}
            ref="popover"
            placement="bottom"
            overlay={this.popover()}
          >
            <Button block={true} bsSize="xsmall">±</Button>
          </OverlayTrigger>
        </Col>
      </div>
    );
  }
}

class WeaponOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onExpand = () => {
    this.setState({open: !this.state.open});
  };

  getRows = () => {
    const rows = [];
    let idx = 0;
    for (const w of this.props.input) {
      const row = (
        <div key={idx}>
          <Col xs={12}>
            <hr className="thin" />
          </Col>
          <Col xs={4}>
            {w.weapon}
          </Col>
          <Col xs={2}>
            {w.attack}
          </Col>
          <Col xs={3}>
            {w.damage}
          </Col>
          <Col xs={3}>
            {`${w.range_min}/${w.range_max}`}
          </Col>
        </div>
      );
      rows.push(row);
      idx++;
    }
    return rows;
  };

  render() {
    let arrow = <i className="fa fa-chevron-right close pull-left" onClick={this.onExpand}></i>;
    if (this.state.open) {
      arrow = <i className="fa fa-chevron-right close pull-left fa-rotate-90" onClick={this.onExpand}></i>;
    }
    const rows = this.getRows();
    return (
      <Col xs={12}>
        <Row>
          <Col xs={4}>
            {arrow}
            Weapon
          </Col>
          <Col xs={2}>
            Attack
          </Col>
          <Col xs={3}>
            Damage
          </Col>
          <Col xs={3}>
            Range
          </Col>
        </Row>
        <Row>
          <Collapse in={this.state.open} timeout={0}>
            <div>
              {rows}
            </div>
          </Collapse>
        </Row>
        <Row>
          <Col xs={12}>
            <hr className="thin" />
          </Col>
        </Row>
      </Col>
    );
  }
}

class SpellOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onExpand = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    let arrow = <i className="fa fa-chevron-right close pull-left" onClick={this.onExpand}></i>;
    if (this.state.open) {
      arrow = <i className="fa fa-chevron-right close pull-left fa-rotate-90" onClick={this.onExpand}></i>;
    }
    return (
      <div>
        <Col xs={12}>
          <SpellsStandAlone overview={true} expand={arrow} spells={this.props.spells} open={this.state.open} />
        </Col>
        <Col xs={12}>
          <hr className="thin" />
        </Col>
      </div>
    );
  }
}

class PoTaSpOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  onExpand = () => {
    this.setState({open: !this.state.open});
  };

  activePo = (powers, idxStart = 0) => {
    const active = [];
    let idx = idxStart;
    for (const p in powers) {
      if (powers[p]) {
        const info = powerInfo(powersLookUp[p]);
        active.push(
          <ActiveBlock idx={idx} infoRender={info} key={idx} item={powersLookUp[p]} />
        );
        idx++;
      }
    }
    return [active, idx];
  };

  activeTa = (talents, inputList, idxStart = 0) => {
    const active = [];
    let idx = idxStart;
    let jdx = 0;
    for (const k in talents) {
      const v = talents[k];
      let level = '';
      for (const l of ['n', 'j', 'm']) {
        if (v[l]) {
          level += l;
        }
      }
      if (v.n | v.j | v.m) {
        const info = talentInfo(inputList[jdx], level);
        active.push(
          <ActiveBlock idx={idx} key={idx} item={inputList[jdx]} infoRender={info} />
        );
        idx++;
      }
      jdx++;
    }
    return [active, idx];
  };

  render() {
    let arrow = <i className="fa fa-chevron-right close pull-left" onClick={this.onExpand}></i>;
    if (this.state.open) {
      arrow = <i className="fa fa-chevron-right close pull-left fa-rotate-90" onClick={this.onExpand}></i>;
    }
    const [classPowers, idx] = this.activePo(this.props.potasp.class_powers);
    const [talents, jdx] = this.activeTa(this.props.potasp.talents, TalentsList, idx);
    const [special, kdx] = this.activeTa(this.props.potasp.specializations, SpecialList, jdx);
    return (
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            {arrow}
            Class Powers, Talents, and Specializations
          </Col>
          <Col xs={12}>
            <Collapse in={this.state.open} timeout={0}>
              <div>
                <Col xs={12} className="no-left-pad no-right-pad">
                  <hr className="thin" />
                </Col>
                {classPowers}
                {talents}
                {special}
              </div>
            </Collapse>
          </Col>
        </Row>
      </Col>
    );
  }
}

class ItemOverview extends Component {
  render() {
    return (
      <div>
        <Col xs={12}>
          <hr className="thin" />
        </Col>
        <Col xs={3}>
          {this.props.name}
        </Col>
        <Col xs={9}>
          {this.props.value}
        </Col>
      </div>
    );
  }
}

export default class Overiview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      init: 0
    };
  }

  onClose = () => {
    this.props.onClose(this.props.id);
  };

  onExpand = () => {
    this.setState({open: !this.state.open});
  };

  getStats = () => {
    const stats = [];
    for (const s in this.props.input.stats) {
      const name = s.slice(0, 3);
      const value = this.props.input.stats[s].value;
      stats.push(<StatCircle key={s} name={name} value={value} focus={this.props.input.stats[s].focus} />);
    }
    return stats;
  };

  handleInput = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  selectText = (event) => {
    event.target.select();
  };

  render() {
    const stats = this.getStats();
    let arrow = <i className="fa fa-chevron-right close pull-left" onClick={this.onExpand}></i>;
    if (this.state.open) {
      arrow = <i className="fa fa-chevron-right close pull-left fa-rotate-90" onClick={this.onExpand}></i>;
    }
    let health = undefined;
    let mana = undefined;
    let spells = undefined;
    let weapons = undefined;
    let notes = undefined;
    let equipment = undefined;
    let poTaSp = undefined;
    if (this.props.control) {
      if (this.props.input.info.class === 'mage') {
        mana = (
          <Control
            type="mana"
            current={this.props.input.health.mana}
            max={this.props.input.health.max_mana}
          />
        );
        spells = <SpellOverview spells={this.props.input.spells} />;
      }
      health = (
        <Control
          type="health"
          current={this.props.input.health.health}
          max={this.props.input.health.max_health}
        />
      );
      weapons = (
        <WeaponOverview
          input={this.props.input.weapons}
        />
      );
      if (this.props.input.notes) {
        notes = <ItemOverview name="Notes" value={this.props.input.notes} />;
      }
      if (this.props.input.equipment) {
        equipment = <ItemOverview name="Equipment" value={this.props.input.equipment} />;
      }
      poTaSp = <PoTaSpOverview potasp={this.props.input.potasp} />;
    }
    const info = [];
    let idx = 0;
    for (const type of ['class', 'level', 'gender', 'age', 'race']) {
      if (this.props.input.info[type]) {
        const name = type.charAt(0).toUpperCase() + type.substr(1).toLowerCase();
        info.push(<ItemOverview name={name} value={this.props.input.info[type]} key={idx} />);
        idx ++;
      }
    }
    return (
      <Row>
        <Col xs={4} className="no-right-pad">
          {arrow}
          <b>{this.props.input.info.name}</b>
        </Col>
        <Col xs={1} className="no-right-pad no-left-pad">
          {this.props.input.utility.defense}
        </Col>
        <Col xs={1} className="no-right-pad no-left-pad">
          {this.props.input.utility.armor}
        </Col>
        <Col xs={1} className="no-right-pad no-left-pad">
          {this.props.input.utility.speed}
        </Col>
        <Col xs={2} className="no-right-pad no-left-pad fixed-height">
          <Input
            type="number"
            bsSize="small"
            id="init"
            value={this.state.init}
            onChange={this.handleInput}
            onFocus={this.selectText}
          />
        </Col>
        <Col xs={1} xsOffset={2} className="no-left-pad">
          <i className="fa fa-times close" onClick={this.onClose}></i>
        </Col>
        {health}
        {mana}
        <Col xs={12} className="stat-row">
          {stats}
        </Col>
        {weapons}
        {spells}
        {poTaSp}
        <Collapse in={this.state.open} timeout={0}>
          <div>
            {info}
            {equipment}
            {notes}
          </div>
        </Collapse>
        <Col xs={12}>
          <hr />
        </Col>
      </Row>
    );
  }
}
