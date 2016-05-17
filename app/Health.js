import React, {Component} from 'react';
import {Col, Row, Input, Button, OverlayTrigger, Popover, ButtonGroup} from 'react-bootstrap';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Health extends Component {
  selectText = (event) => {
    event.target.select();
  };

  handleInputChange = (event) => {
    this.props.setHealthMana({id: event.target.id, value: event.target.value});
  };

  handelPmButton = (event) => {
    const multiplier = parseInt(`${event.target.innerHTML}1`, 10);
    const currentValue = parseInt(this.props.health[event.target.id], 10);
    const adjustValue = parseInt(this.props.health[`${event.target.id}_adjust`], 10);
    const maxValue = parseInt(this.props.health[`max_${event.target.id}`], 10);
    let newValue = currentValue + (adjustValue * multiplier);
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    }
    this.props.setHealthMana({id: event.target.id, value: (newValue).toString(10)});
    this.props.setHealthMana({id: `${event.target.id}_adjust`, value: '0'});
    this.refs[`${event.target.id}-popover`].hide();
  };

  healthPopover = () => {
    return (
      <Popover id="Adjust Health" title="Adjust Health">
        <Row>
          <Col xs={12}>
            <Input
              type="number"
              id="health_adjust"
              min="0"
              max={this.props.health.max_health}
              value={this.props.health.health_adjust}
              onChange={this.handleInputChange}
              onFocus={this.selectText}
            />
          </Col>
          <Col xs={12}>
            <ButtonGroup justified={true}>
              <ButtonGroup>
                <Button onClick={this.handelPmButton} id="health">+</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={this.handelPmButton} id="health">-</Button>
              </ButtonGroup>
            </ButtonGroup>
          </Col>
        </Row>
      </Popover>
    );
  };

  manaPopover = () => {
    return (
      <Popover id="Adjust Mana" title="Adjust Mana">
        <Input
          type="number"
          id="mana_adjust"
          min="0"
          max={this.props.health.max_mana}
          value={this.props.health.mana_adjust}
          onChange={this.handleInputChange}
          onFocus={this.selectText}
        />
          <ButtonGroup justified={true}>
            <ButtonGroup>
              <Button onClick={this.handelPmButton} id="mana">+</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={this.handelPmButton} id="mana">-</Button>
            </ButtonGroup>
          </ButtonGroup>
      </Popover>
    );
  };

  render() {
    const healthButton = (
      <OverlayTrigger
        trigger="click"
        rootClose={true}
        ref="health-popover"
        placement="bottom"
        overlay={this.healthPopover()}
      >
        <Button id="health" className="pm-button">Health<br/>±</Button>
      </OverlayTrigger>
    );
    const manaButton = (
      <OverlayTrigger
        trigger="click"
        rootClose={true}
        ref="mana-popover"
        placement="bottom"
        overlay={this.manaPopover()}
      >
        <Button id="mana" className="pm-button">Mana<br/>±</Button>
      </OverlayTrigger>
    );
    return (
      <div className="box health-box">
        <Row>
          <Col xs={5} className="no-right-pad">
            <Input buttonBefore={healthButton} wrapperClassName="wrapper">
              <Input
                type="number"
                id="health"
                min="0"
                max={this.props.health.max_health}
                value={this.props.health.health}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
              />
              <Input
                type="number"
                id="max_health"
                min="0"
                value={this.props.health.max_health}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
                disabled={!this.props.edit}
              />
            </Input>
          </Col>
          <Col xs={2} className="no-left-pad no-right-pad">
            <span className="input-group-addon mid-addon">Current</span>
            <span className="input-group-addon mid-addon">Max</span>
          </Col>
          <Col xs={5} className="no-left-pad">
            <Input buttonAfter={manaButton} wrapperClassName="wrapper">
              <Input
                type="number"
                id="mana"
                min="0"
                max={this.props.health.max_mana}
                value={this.props.health.mana}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
              />
              <Input
                type="number"
                id="max_mana"
                min="0"
                value={this.props.health.max_mana}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
                disabled={!this.props.edit}
              />
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {health: state.health};
}

function mapDispatchToProps(dispatch) {
  return {setHealthMana: bindActionCreators(actions.setHealthMana, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Health);
