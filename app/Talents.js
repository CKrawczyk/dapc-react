import React, {Component} from 'react';
import {CheckModal, ModalBlock, ActiveBlock} from './CheckModal';
import {Col, Row, Popover, Input, Button} from 'react-bootstrap';

const talentInfoInner = (level, info) => {
  const title = level.charAt(0).toUpperCase() + level.substr(1).toLowerCase();
  return (
    <div key={level}>
      <Col xs={12}>
        <span className="heading">{title}</span>
      </Col>
      <Col xs={12}>
        {info}
      </Col>
    </div>
  );
};

const talentRequire = (req) => {
  return (
    <div key="req">
      <Col xs={12}>
        <span className="heading">Requirements</span>
      </Col>
      <Col xs={12}>
        {req}
      </Col>
      <Col xs={12}>
        <hr />
      </Col>
    </div>
  );
};

export const talentInfo = (item, level = 'njm') => {
  const fullList = [talentRequire(item.requirement)];
  for (const l of ['novice', 'journeyman', 'master']) {
    if (level.indexOf(l.charAt(0)) >= 0) {
      fullList.push(talentInfoInner(l, item[l]));
      if (l !== 'master') {
        fullList.push(
          <Col xs={12} key={`${l}_hr`}>
            <hr />
          </Col>
        );
      }
    }
  }
  return (
    <Popover id={`${item.label} Information`} title={`${item.label} Information`} className="talent-popover">
      <Row>
        {fullList}
      </Row>
    </Popover>
  );
};

class TalentCheck extends Component {
  render() {
    return (
      <Col xs={2} className={this.props.className}>
        <Input
          type="checkbox"
          label={this.props.level}
          name={this.props.level.charAt(0)}
          id={this.props.id}
          checked={this.props.checked}
          onClick={this.props.handleCheckbox}
          onChange={this.props.doNothing}
        />
      </Col>
    );
  }
}

class TalentModal extends CheckModal {
  modalBlockList = () => {
    const fullList = [];
    let i = 0;
    let j = 0;
    for (const t of this.props.inputList) {
      const block = this.modalBlock(t, i, j);
      if (block) {
        fullList.push(block);
        j++;
      }
      i++;
    }
    return fullList;
  };

  modalBlock = (talent, idx, jdx) => {
    if ((this.props.c !== '') & (talent.classes.indexOf(this.props.c) < 0)) {
      return false;
    }
    const info = talentInfo(talent);
    const check = [
      <TalentCheck
        key="n"
        level="novice"
        id={idx}
        className="reduce-right-pad"
        checked={this.props.talents[idx].n}
        handleCheckbox={this.props.handleCheckbox}
        doNothing={this.doNothing}
      />,
      <TalentCheck
        key="j"
        level="journeyman"
        id={idx}
        className="reduce-right-pad reduce-left-pad"
        checked={this.props.talents[idx].j}
        handleCheckbox={this.props.handleCheckbox}
        doNothing={this.doNothing}
      />,
      <TalentCheck
        key="m"
        level="master"
        id={idx}
        className="reduce-left-pad"
        checked={this.props.talents[idx].m}
        handleCheckbox={this.props.handleCheckbox}
        doNothing={this.doNothing}
      />
    ];
    return (
      <ModalBlock idx={jdx} key={jdx} item={talent} infoRender={info} checkRender={check} />
    );
  };
}

export default class Talents extends Component {
  openModal = () => {
    this.refs.talent_modal.openModal();
  };

  handleCheckbox = (event) => {
    let newTalent = {};
    if (event.target.checked) {
      switch (event.target.name) {
        case 'n':
          newTalent = {n: true, j: false, m: false};
          break;
        case 'j':
          newTalent = {n: true, j: true, m: false};
          break;
        case 'm':
          newTalent = {n: true, j: true, m: true};
          break;
        default:
          break;
      }
    } else {
      switch (event.target.name) {
        case 'n':
          newTalent = {n: false, j: false, m: false};
          break;
        case 'j':
          newTalent = {n: true, j: false, m: false};
          break;
        case 'm':
          newTalent = {n: true, j: true, m: false};
          break;
        default:
          break;
      }
    }
    this.props.onChange(event.target.id, newTalent);
  };

  activeList = () => {
    const active = [];
    let idx = 0;
    let jdx = 0;
    for (const k in this.props.talents) {
      const v = this.props.talents[k];
      let level = '';
      for (const l of ['n', 'j', 'm']) {
        if (v[l]) {
          level += l;
        }
      }
      if (v.n | v.j | v.m) {
        const info = talentInfo(this.props.inputList[jdx], level);
        active.push(
          <ActiveBlock idx={idx} key={idx} item={this.props.inputList[jdx]} infoRender={info} />
        );
        idx++;
      }
      jdx++;
    }
    return active;
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <span className="heading">{this.props.label}</span>
          </Col>
        </Row>
        {this.activeList()}
        <Row>
          <Col xs={12}>
            <Button id="taletns" block={true} onClick={this.openModal} disabled={!this.props.edit}>
            Edit {this.props.label}
            </Button>
          </Col>
        </Row>
        <TalentModal
          ref="talent_modal"
          handleCheckbox={this.handleCheckbox}
          talents={this.props.talents}
          c={this.props.c}
          inputList={this.props.inputList}
          label={this.props.label}
        />
      </div>
    );
  }
}
