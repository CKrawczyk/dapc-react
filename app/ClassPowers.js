import React, {Component} from 'react';
import {CheckModal, ModalBlock, ActiveBlock} from './CheckModal';
import {Col, Row, Popover, Input, Button} from 'react-bootstrap';
import PowersList from './lib/powers';

export const powersLookUp = {};
for (const c of ['mage', 'rogue', 'warrior']) {
  for (const p of PowersList[c]) {
    powersLookUp[`${c} ${p.level}`] = p;
  }
}

export const powerInfo = (item) => {
  return (
    <Popover
      id={`${item.label} Information`}
      title={`${item.label} Information`}
      className="talent-popover"
    >
      <Row>
        <Col xs={12}>
          {item.info}
        </Col>
      </Row>
    </Popover>
  );
};

class PowerModal extends CheckModal {
  modalBlockList = () => {
    return (
      <Row>
        {(() => {
          const output = [];
          for (const C of ['mage', 'rogue', 'warrior']) {
            if (this.props.c === C | this.props.c === '') {
              output.push(this.modalBlockOuter(C));
            }
            if (!this.props.c & C !== 'warrior') {
              output.push(
                <Col key={`${C}_hr`} xs={12}>
                  <hr />
                </Col>
              );
            }
          }
          return output;
        })()}
      </Row>
    );
  };

  modalBlockOuter = (c) => {
    return (
      <div key={c}>
        <Row>
          <Col xs={12}>
            <span className="heading">{this.titleCase(c)}</span>
          </Col>
        </Row>
        {this.modalBlockInner(c)}
      </div>
    );
  };

  modalBlockInner = (c) => {
    const fullList = [];
    let i = 0;
    for (const p of PowersList[c]) {
      const id = `${c} ${p.level}`;
      const info = powerInfo(p);
      const check = (
        <PowerCheck
          item={p}
          checked={this.props.powers[id]}
          id={id}
          doNothing={this.doNothing}
          handleCheckbox={this.props.handleCheckbox}
        />
      );
      fullList.push(<ModalBlock idx={i} item={p} infoRender={info} checkRender={check} key={i} />);
      i++;
    }
    return fullList;
  };
}

class PowerCheck extends Component {
  render() {
    return (
      <Col xs={2} className="reduce-right-pad">
        <Input
          type="checkbox"
          label={`Level ${this.props.item.level}`}
          checked={this.props.checked}
          id={this.props.id}
          onClick={this.props.handleCheckbox}
          onChange={this.props.doNothing}
        />
      </Col>
    );
  }
}

export default class ClassPowers extends Component {
  openModal = () => {
    this.refs.power_modal.openModal();
  };

  activeList = () => {
    const active = [];
    let idx = 0;
    for (const p in this.props.powers) {
      if (this.props.powers[p]) {
        const info = powerInfo(powersLookUp[p]);
        active.push(
          <ActiveBlock idx={idx} infoRender={info} key={idx} item={powersLookUp[p]} />
        );
        idx++;
      }
    }
    return active;
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <span className="heading">Class Powers</span>
          </Col>
        </Row>
        {this.activeList()}
        <Row>
          <Col xs={12}>
            <Button id="powers" block={true} onClick={this.openModal} disabled={!this.props.edit}>
            Edit Class Powers
            </Button>
          </Col>
        </Row>
        <PowerModal
          ref="power_modal"
          handleCheckbox={this.props.onChange}
          powers={this.props.powers}
          c={this.props.c}
          label="Class Powers"
        />
      </div>
    );
  }
}
